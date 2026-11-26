// Writes the narration of every video as a script to read aloud, one file per
// guide and language, with the time each slide starts and ends in the video:
//
//   node scripts/guide-videos/narration.mjs
//
// Timing comes from the sentence audio cached by build.mjs, so run that first.
// The pauses below mirror build.mjs: keep both in sync.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

import { planVideo } from './plan.mjs';
import { splitSentences, toDisplay, toSpoken } from './speech.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const outDir = path.join(here, 'narration');
const contentDir = path.join(root, 'src/lib/content/publications/qa-ai-series');
const cacheDir =
  process.env.GUIDE_VIDEOS_CACHE ?? path.join(homedir(), '.cache/guide-videos');
const voices = { es: 'es_AR-daniela-high', en: 'en_US-lessac-high' };

const BYTES_PER_SECOND = 22050 * 2;
const PAUSE = {
  sentence: 0.3,
  paragraph: 0.55,
  slideStart: 0.5,
  slideEnd: 0.8,
};
const TAIL = PAUSE.slideEnd + 0.7;

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

const hash = (value) => createHash('sha1').update(value).digest('hex');
const pad = (n) => String(n).padStart(2, '0');
const clock = (seconds) => {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${pad(whole % 60)}`;
};

const wavSeconds = async (file) => {
  const buffer = await readFile(file);
  const data = buffer.indexOf('data', 12, 'ascii');
  return buffer.readUInt32LE(data + 4) / BYTES_PER_SECOND;
};

const timeline = async (slides, lang) => {
  let time = 0;
  let speech = 0;
  const timed = [];
  for (const [index, slide] of slides.entries()) {
    if (index > 0) time += PAUSE.slideEnd;
    const start = time;
    time += PAUSE.slideStart;
    const paragraphs = [];
    for (const [p, paragraph] of slide.say.entries()) {
      const sentences = splitSentences(paragraph);
      for (const [s, sentence] of sentences.entries()) {
        if (s > 0) time += PAUSE.sentence;
        else if (p > 0) time += PAUSE.paragraph;
        const wav = path.join(
          cacheDir,
          'speech',
          voices[lang],
          `${hash(toSpoken(sentence, lang))}.wav`
        );
        if (!existsSync(wav)) {
          throw new Error(`Missing cached audio, run build.mjs first: ${wav}`);
        }
        const seconds = await wavSeconds(wav);
        time += seconds;
        speech += seconds;
      }
      paragraphs.push(sentences.map(toDisplay).join(' '));
    }
    timed.push({ slide, start, end: time, paragraphs });
  }
  return { slides: timed, total: time + TAIL, speech };
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
      ...paragraphs.flatMap((paragraph) => [paragraph, ''])
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
