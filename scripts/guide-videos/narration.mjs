// Writes the narration of every video as a script to read aloud, one file per
// guide and language, with the time each slide starts and ends in the video:
//
//   node scripts/guide-videos/narration.mjs
//
// Timing comes from the sentence audio cached by build.mjs, so run that first.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { planVideo } from './plan.mjs';
import { timeline } from './timing.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const outDir = path.join(here, 'narration');
const contentDir = path.join(root, 'src/lib/content/publications/qa-ai-series');

const text = {
  es: {
    title: (day) => `Guion del video · Día ${day}`,
    intro:
      'Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.',
    video: 'Video',
    total: 'Duración del video',
    speech: 'Voz sin pausas',
    slide: 'Slide',
  },
  en: {
    title: (day) => `Video script · Day ${day}`,
    intro:
      'What the video narrates, slide by slide. Times match the published video: if your reading runs longer or shorter, the slides can be re-synced to your audio.',
    video: 'Video',
    total: 'Video length',
    speech: 'Speech without pauses',
    slide: 'Slide',
  },
};

const pad = (n) => String(n).padStart(2, '0');
const clock = (seconds) => {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${pad(whole % 60)}`;
};

const toMarkdown = (guide, lang, result) => {
  const t = text[lang];
  const lines = [
    `# ${t.title(guide.day)}: ${guide.title[lang]}`,
    '',
    t.intro,
    '',
    `- ${t.video}: \`public/publications/qa-ai/videos/d${pad(
      guide.day
    )}-${lang}.mp4\``,
    `- ${t.total}: ${clock(result.total)}`,
    `- ${t.speech}: ${clock(result.speech)}`,
    '',
  ];
  for (const [
    i,
    { slide, start, end, paragraphs },
  ] of result.slides.entries()) {
    lines.push(
      `## ${clock(start)}–${clock(end)} · ${t.slide} ${i + 1}: ${
        slide.section
      }`,
      '',
      ...paragraphs.flatMap((sentences) => [
        sentences.map(({ text }) => text).join(' '),
        '',
      ])
    );
  }
  return lines.join('\n');
};

const weeks = await Promise.all(
  [1, 2, 3, 4, 5].map((n) => import(path.join(contentDir, `week${n}.ts`)))
);
const guides = weeks
  .flatMap((week, i) => week[`week${i + 1}`])
  .sort((a, b) => a.day - b.day);

await mkdir(outDir, { recursive: true });
const totals = { es: { total: 0, speech: 0 }, en: { total: 0, speech: 0 } };
for (const [index, guide] of guides.entries()) {
  for (const lang of ['es', 'en']) {
    const result = await timeline(
      planVideo(guide, lang, guides[index + 1]),
      lang
    );
    totals[lang].total += result.total;
    totals[lang].speech += result.speech;
    await writeFile(
      path.join(outDir, `d${pad(guide.day)}-${lang}.md`),
      toMarkdown(guide, lang, result)
    );
  }
}
for (const [lang, { total, speech }] of Object.entries(totals)) {
  console.log(
    `${lang}: video ${(total / 3600).toFixed(2)} h, speech ${(
      speech / 3600
    ).toFixed(2)} h`
  );
}
