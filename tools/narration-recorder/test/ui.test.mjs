// Drives the recorder page in Chromium with a fake microphone and an in-memory
// stand-in for the Electron bridge:
//
//   node tools/narration-recorder/test/ui.test.mjs
//
// Covers recording, pause, "next" while recording, several takes, delete,
// trim, export and the video preview (needs the network for the video).
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const page = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../app/index.html'
);

const browser = await chromium.launch({
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--autoplay-policy=no-user-gesture-required',
  ],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1600, height: 980 },
  });
  await context.addInitScript(() => {
    const files = new Map();
    let state = null;
    window.__files = files;
    window.__state = () => state;
    window.recorder = {
      storagePath: async () => '/fake',
      loadState: async () => state,
      saveState: async (next) => {
        state = JSON.parse(JSON.stringify(next));
      },
      writeFile: async (file, data) => files.set(file, data.slice(0)),
      readFile: async (file) => files.get(file).slice(0),
      deleteFile: async (file) => files.delete(file),
      openFolder: async () => '',
    };
    window.confirm = () => true;
  });
  const tab = await context.newPage();
  const errors = [];
  tab.on('pageerror', (error) => errors.push(error.message));
  tab.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await tab.goto(`file://${page}`);
  await tab.waitForTimeout(1000);
  const takes = () =>
    tab.evaluate(() => {
      const videos = window.__state()?.takes ?? {};
      return Object.fromEntries(
        Object.entries(videos['d01-es'] ?? {}).map(([slide, entry]) => [
          slide,
          entry.list.length,
        ])
      );
    });

  // Record slide 1, pause and resume, then "next" keeps recording slide 2.
  await tab.click('body');
  await tab.keyboard.press('r');
  await tab.waitForTimeout(2000);
  await tab.keyboard.press(' ');
  await tab.waitForTimeout(500);
  await tab.keyboard.press(' ');
  await tab.keyboard.press('ArrowRight');
  await tab.waitForTimeout(2000);
  await tab.keyboard.press('r');
  await tab.waitForTimeout(1000);
  // A second take of slide 2.
  await tab.keyboard.press('r');
  await tab.waitForTimeout(1500);
  await tab.keyboard.press('r');
  await tab.waitForTimeout(1000);
  assert.deepEqual(await takes(), { 0: 1, 1: 2 });

  // Delete the take in use: the earlier one comes back.
  await tab.keyboard.press('Delete');
  await tab.waitForTimeout(300);
  assert.deepEqual(await takes(), { 0: 1, 1: 1 });

  // Trim by dragging the start edge.
  const before = await tab.evaluate(
    () => Object.values(window.__state().takes['d01-es'][1].list)[0].trimStart
  );
  const box = await tab.locator('#wave').boundingBox();
  await tab.mouse.move(box.x + 2, box.y + 60);
  await tab.mouse.down();
  await tab.mouse.move(box.x + 120, box.y + 60);
  await tab.mouse.up();
  await tab.waitForTimeout(500);
  const after = await tab.evaluate(
    () => Object.values(window.__state().takes['d01-es'][1].list)[0].trimStart
  );
  assert.ok(after > before, `trim start moved (${before} -> ${after})`);

  // Export writes the trimmed takes and a manifest.
  await tab.click('#export');
  await tab.waitForTimeout(1000);
  const manifest = await tab.evaluate(() =>
    JSON.parse(
      new TextDecoder().decode(window.__files.get('export/d01-es/voice.json'))
    )
  );
  assert.equal(manifest.complete, false);
  assert.equal(manifest.slides[0].file, 'slide-01.wav');
  assert.equal(manifest.slides[2].file, null);

  // The preview plays the published video under the take; Escape stops it.
  await tab.locator('#slides button').nth(0).click();
  await tab.keyboard.press('v');
  await tab.waitForTimeout(2500);
  assert.equal(
    await tab.evaluate(() => document.getElementById('video').paused),
    false
  );
  await tab.keyboard.press('Escape');
  await tab.waitForTimeout(300);
  assert.equal(
    await tab.evaluate(() => document.getElementById('video').paused),
    true
  );

  assert.deepEqual(errors, []);
  console.log('narration recorder UI: ok');
} finally {
  await browser.close();
}
