import { expect, open, test } from './fixtures';

test.describe('long-form content', () => {
  test('a guide opens from the home page', async ({ page }) => {
    await open(page);

    const guide = page
      .locator('#publications a[href^="/publications/"]')
      .first();
    const href = await guide.getAttribute('href');
    await guide.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('a series guide plays its video with captions', async ({
    page,
    request,
  }) => {
    await open(page, '/publications/qa-ai-01-llms-in-qa-map');

    const video = page.locator('article video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('poster', /d01-en\.jpg$/);

    const src = await video.locator('source').getAttribute('src');
    const captions = await video
      .locator('track[kind="captions"]')
      .getAttribute('src');
    expect(src).toMatch(/d01-en\.mp4$/);

    const media = await request.head(src ?? '');
    expect(media.status()).toBe(200);
    expect(media.headers()['content-type']).toContain('video/mp4');
    expect(await (await request.get(captions ?? '')).text()).toMatch(/^WEBVTT/);
  });

  test('every series guide has its video in both languages', async ({
    request,
  }) => {
    for (let day = 1; day <= 31; day += 1) {
      for (const lang of ['es', 'en']) {
        const base = `/publications/qa-ai/videos/d${String(day).padStart(
          2,
          '0'
        )}-${lang}`;
        for (const ext of ['mp4', 'vtt', 'jpg']) {
          const response = await request.head(`${base}.${ext}`);
          expect.soft(response.status(), `${base}.${ext}`).toBe(200);
        }
      }
    }
  });

  test('newsletter issue renders', async ({ page }) => {
    const response = await open(page, '/newsletter/arca-pymes-noviembre-2026');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('unknown route returns 404 and links back home', async ({ page }) => {
    const response = await open(page, '/this-page-does-not-exist');

    expect(response?.status()).toBe(404);
    await page.getByRole('link', { name: 'Go Home' }).click();
    await expect(page.locator('#hero')).toBeVisible();
  });
});
