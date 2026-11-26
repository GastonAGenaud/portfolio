// Builds the narrated video of every guide in the "31 days of QA + AI" series:
// an MP4, its WebVTT captions and a poster, per guide and language.
//
//   node scripts/guide-videos/build.mjs [--days 1,2] [--langs es,en] [--force] [--keep]
//                                        [--voice <export folder>]
//
// --keep leaves the slide images of each video in the cache, to look at them.
// --voice rebuilds, with a recorded voice, the videos exported by the
// narration recorder (tools/narration-recorder): <folder>/dNN-xx/voice.json
// and one WAV per slide. Each slide lasts as long as its take, so audio and
// slides line up by construction. Videos without a complete export are left
// as they are.
//
// Needs ffmpeg, the Playwright Chromium and Piper (https://github.com/rhasspy/piper)
// with the voices below. Sentence audio is cached, so a rerun only renders what
// changed.
import { chromium } from '@playwright/test';
import { execFile, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { planVideo } from './plan.mjs';
import { HEIGHT, WIDTH, renderSlides } from './slides.mjs';
import {
  chunkCaption,
  splitSentences,
  toDisplay,
  toSpoken,
} from './speech.mjs';

const run = promisify(execFile);

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
);
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'publications/qa-ai/videos');
const contentDir = path.join(root, 'src/lib/content/publications/qa-ai-series');

const piperHome =
  process.env.PIPER_HOME ?? path.join(homedir(), '.cache/piper');
const cacheDir =
  process.env.GUIDE_VIDEOS_CACHE ?? path.join(homedir(), '.cache/guide-videos');
const voices = { es: 'es_AR-daniela-high', en: 'en_US-lessac-high' };

// Piper speaks at 22.05 kHz; a recorded voice keeps 44.1 kHz.
const SAMPLE_RATE = { tts: 22050, voice: 44100 };
const bytesPerSecond = (rate) => rate * 2; // 16-bit mono
const PAUSE = {
  sentence: 0.3,
  paragraph: 0.55,
  slideStart: 0.5,
  slideEnd: 0.8,
};
const FPS = 5;

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
};
const onlyDays = option('days')?.split(',').map(Number);
const langs = option('langs')?.split(',') ?? ['es', 'en'];
const force = args.includes('--force');
const keep = args.includes('--keep');
const voiceDir = option('voice') && path.resolve(option('voice'));

const hash = (text) => createHash('sha1').update(text).digest('hex');
const pad = (n) => String(n).padStart(2, '0');

const loadGuides = async () => {
  const weeks = await Promise.all(
    [1, 2, 3, 4, 5].map((n) => import(path.join(contentDir, `week${n}.ts`)))
  );
  return weeks
    .flatMap((week, i) => week[`week${i + 1}`])
    .sort((a, b) => a.day - b.day);
};

// Synthesizes the sentences that are not cached yet, in one Piper run.
const synthesize = async (sentences, lang) => {
  const dir = path.join(cacheDir, 'speech', voices[lang]);
  await mkdir(dir, { recursive: true });
  const jobs = sentences.map((sentence) => ({
    ...sentence,
    wav: path.join(dir, `${hash(sentence.spoken)}.wav`),
  }));
  const missing = jobs.filter((job) => !existsSync(job.wav));
  if (missing.length) {
    await new Promise((resolve, reject) => {
      const piper = spawn(
        path.join(piperHome, 'piper/piper'),
        [
          '--model',
          path.join(piperHome, 'voices', `${voices[lang]}.onnx`),
          '--json-input',
          '--quiet',
        ],
        { stdio: ['pipe', 'ignore', 'inherit'] }
      );
      piper.on('error', reject);
      piper.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`piper exited with ${code}`))
      );
      piper.stdin.end(
        missing
          .map((job) =>
            JSON.stringify({ text: job.spoken, output_file: job.wav })
          )
          .join('\n')
      );
    });
  }
  return jobs;
};

const pcmOf = async (wav) => {
  const buffer = await readFile(wav);
  const data = buffer.indexOf('data', 12, 'ascii');
  return buffer.subarray(data + 8, data + 8 + buffer.readUInt32LE(data + 4));
};

const silence = (seconds, rate) => Buffer.alloc(Math.round(seconds * rate) * 2);

const wavHeader = (dataLength, rate) => {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVEfmt ', 8, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(bytesPerSecond(rate), 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(dataLength, 40);
  return header;
};

// Lays the sentences on a single track. Returns the audio, when each slide
// starts and when each sentence is heard.
const assemble = async (slides, lang) => {
  const sentences = slides.flatMap((slide, slideIndex) =>
    slide.say.flatMap((paragraph, paragraphIndex) =>
      splitSentences(paragraph).map((sentence, sentenceIndex) => ({
        slideIndex,
        startsParagraph: sentenceIndex === 0 && paragraphIndex > 0,
        text: toDisplay(sentence),
        spoken: toSpoken(sentence, lang),
      }))
    )
  );
  const jobs = await synthesize(sentences, lang);
  const track = createTrack(SAMPLE_RATE.tts);

  for (const [index, job] of jobs.entries()) {
    const previous = jobs[index - 1];
    if (previous?.slideIndex !== job.slideIndex) {
      if (previous) track.pause(PAUSE.slideEnd);
      track.startSlide();
      track.pause(PAUSE.slideStart);
    } else {
      track.pause(job.startsParagraph ? PAUSE.paragraph : PAUSE.sentence);
    }
    const start = track.now();
    track.push(await pcmOf(job.wav));
    track.cues.push({ start, end: track.now(), text: job.text });
  }
  track.pause(PAUSE.slideEnd + 0.7);
  return track.finish();
};

// A mono 16-bit track built piece by piece, with slide starts and captions.
const createTrack = (rate) => {
  const parts = [];
  const cues = [];
  const slideStarts = [];
  let bytes = 0;
  const now = () => bytes / bytesPerSecond(rate);
  const push = (buffer) => {
    parts.push(buffer);
    bytes += buffer.length;
  };
  return {
    cues,
    now,
    push,
    pause: (seconds) => push(silence(seconds, rate)),
    startSlide: () => slideStarts.push(now()),
    finish: () => ({
      wav: Buffer.concat([wavHeader(bytes, rate), ...parts]),
      duration: now(),
      slideStarts,
      cues,
      sampleRate: rate,
    }),
  };
};

// The recorded voice: one take per slide, already trimmed by the recorder.
// Captions split each take among its sentences by length, since the recording
// has no sentence timing.
const assembleVoice = async (slides, voice, workDir) => {
  const track = createTrack(SAMPLE_RATE.voice);
  for (const [index, slide] of slides.entries()) {
    const take = path.join(voice.dir, voice.manifest.slides[index].file);
    const wav = path.join(workDir, `voice-${pad(index)}.wav`);
    await run('ffmpeg', [
      '-y',
      '-loglevel',
      'error',
      ...['-i', take, '-ac', '1', '-ar', String(SAMPLE_RATE.voice)],
      ...['-c:a', 'pcm_s16le', wav],
    ]);
    if (index > 0) track.pause(PAUSE.slideEnd);
    track.startSlide();
    track.pause(PAUSE.slideStart);
    const start = track.now();
    track.push(await pcmOf(wav));
    const end = track.now();
    const texts = slide.say.flatMap(splitSentences).map(toDisplay);
    const total = texts.reduce((sum, text) => sum + text.length, 0);
    let from = start;
    for (const text of texts) {
      const to = from + ((end - start) * text.length) / total;
      track.cues.push({ start: from, end: to, text });
      from = to;
    }
  }
  track.pause(PAUSE.slideEnd + 0.7);
  return track.finish();
};

// The export of a video, if it is complete and matches today's script.
const loadVoice = async (name, slides) => {
  const dir = path.join(voiceDir, name);
  const manifestPath = path.join(dir, 'voice.json');
  if (!existsSync(manifestPath)) return { skip: 'no export' };
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (manifest.slides.length !== slides.length) {
    return {
      skip: 'the script changed: the export has a different number of slides',
    };
  }
  const missing = manifest.slides.filter((slide) => !slide.file);
  if (missing.length) {
    return { skip: `incomplete: ${missing.length} slides without a take` };
  }
  const takes = await Promise.all(
    manifest.slides.map((slide) => readFile(path.join(dir, slide.file)))
  );
  return { dir, manifest, hash: hash(Buffer.concat(takes).toString('base64')) };
};

const timestamp = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const part = (value, size = 2) => String(value).padStart(size, '0');
  return `${part(Math.floor(ms / 3_600_000))}:${part(
    Math.floor(ms / 60_000) % 60
  )}:${part(Math.floor(ms / 1000) % 60)}.${part(ms % 1000, 3)}`;
};

// One caption per screenful: long sentences are split, each part timed by
// its share of the characters.
const toVtt = (cues) => {
  const lines = ['WEBVTT', ''];
  for (const cue of cues) {
    const chunks = chunkCaption(cue.text);
    const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    let start = cue.start;
    for (const chunk of chunks) {
      const end = start + ((cue.end - cue.start) * chunk.length) / total;
      lines.push(`${timestamp(start)} --> ${timestamp(end)}`, chunk, '');
      start = end;
    }
  }
  return lines.join('\n');
};

// The web fonts come from the network, and that request stalls now and then.
const retry = async (task, attempts = 3) => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      if (attempt === attempts) throw error;
    }
  }
};

const screenshotSlides = async (html, workDir, count) => {
  const htmlPath = path.join(workDir, 'slides.html');
  await writeFile(htmlPath, html);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
    });
    page.setDefaultTimeout(20_000);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'domcontentloaded' });
    // Set by the page once web fonts are in and overflowing slides are fitted.
    await page.waitForSelector('body[data-ready]');
    const slides = page.locator('section.slide');
    const files = [];
    for (let i = 0; i < count; i += 1) {
      const file = path.join(workDir, `slide-${pad(i)}.png`);
      await slides.nth(i).screenshot({ path: file });
      files.push(file);
    }
    return files;
  } finally {
    await browser.close();
  }
};

const encode = async ({ images, audio, workDir, target }) => {
  const durations = audio.slideStarts.map(
    (start, i) => (audio.slideStarts[i + 1] ?? audio.duration) - start
  );
  // The concat demuxer needs the last image listed twice to honor its duration.
  const list = [
    ...images.flatMap((image, i) => [
      `file '${image}'`,
      `duration ${durations[i].toFixed(3)}`,
    ]),
    `file '${images.at(-1)}'`,
  ].join('\n');
  const listPath = path.join(workDir, 'slides.txt');
  const wavPath = path.join(workDir, 'audio.wav');
  await writeFile(listPath, list);
  await writeFile(wavPath, audio.wav);

  await run(
    'ffmpeg',
    [
      '-y',
      '-loglevel',
      'error',
      ...['-f', 'concat', '-safe', '0', '-i', listPath],
      ...['-i', wavPath],
      ...['-vf', `fps=${FPS},format=yuv420p`],
      ...['-c:v', 'libx264', '-preset', 'veryslow', '-tune', 'stillimage'],
      ...['-crf', '32', '-g', String(FPS * 60)],
      // A keyframe at every slide change, so seeking lands on a clean frame.
      ...[
        '-force_key_frames',
        audio.slideStarts.map((s) => s.toFixed(3)).join(','),
      ],
      ...['-af', 'loudnorm=I=-16:TP=-1.5:LRA=11'],
      ...['-c:a', 'aac', '-b:a', audio.sampleRate > 22050 ? '64k' : '32k'],
      ...['-ar', String(audio.sampleRate), '-ac', '1'],
      ...['-movflags', '+faststart', '-t', audio.duration.toFixed(3)],
      `${target}.mp4`,
    ],
    { maxBuffer: 64 * 1024 * 1024 }
  );
  await run('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    ...['-i', images[0], '-vf', 'scale=1280:-2', '-q:v', '4'],
    `${target}.jpg`,
  ]);
};

const buildVideo = async (guide, lang, next) => {
  const name = `d${pad(guide.day)}-${lang}`;
  const target = path.join(outDir, name);
  const slides = planVideo(guide, lang, next);
  const html = renderSlides(slides, { guide, lang, publicDir });

  // Everything the result depends on; unchanged means nothing to do.
  const sources = await Promise.all(
    ['build', 'lexicon', 'plan', 'slides', 'speech'].map((file) =>
      readFile(path.join(root, 'scripts/guide-videos', `${file}.mjs`), 'utf8')
    )
  );
  let voice = null;
  if (voiceDir) {
    voice = await loadVoice(name, slides);
    if (voice.skip) return console.log(`${name}  skipped (${voice.skip})`);
  }
  const stamp = hash(
    JSON.stringify([slides, sources, voice ? voice.hash : voices[lang]])
  );
  const stampPath = path.join(cacheDir, 'stamps', name);
  const upToDate =
    !force &&
    ['mp4', 'vtt', 'jpg'].every((ext) => existsSync(`${target}.${ext}`)) &&
    existsSync(stampPath) &&
    (await readFile(stampPath, 'utf8')) === stamp;
  if (upToDate) return console.log(`${name}  up to date`);

  const workDir = path.join(cacheDir, 'work', name);
  await rm(workDir, { recursive: true, force: true });
  await mkdir(workDir, { recursive: true });

  const audio = voice
    ? await assembleVoice(slides, voice, workDir)
    : await assemble(slides, lang);
  const images = await retry(() =>
    screenshotSlides(html, workDir, slides.length)
  );
  await encode({ images, audio, workDir, target });
  await writeFile(`${target}.vtt`, toVtt(audio.cues));

  await mkdir(path.dirname(stampPath), { recursive: true });
  await writeFile(stampPath, stamp);
  if (!keep) await rm(workDir, { recursive: true, force: true });
  console.log(
    `${name}  ${Math.floor(audio.duration / 60)}:${pad(
      Math.round(audio.duration % 60)
    )}  ${slides.length} slides${voice ? '  (recorded voice)' : ''}`
  );
};

const guides = await loadGuides();
await mkdir(outDir, { recursive: true });
for (const [index, guide] of guides.entries()) {
  if (onlyDays && !onlyDays.includes(guide.day)) continue;
  for (const lang of langs) {
    await buildVideo(guide, lang, guides[index + 1]);
  }
}
