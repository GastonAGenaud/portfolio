// When each slide and sentence is heard in a published video, from the sentence
// audio cached by build.mjs. The pauses mirror build.mjs: keep both in sync.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

import { splitSentences, toDisplay, toSpoken } from './speech.mjs';

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

const hash = (value) => createHash('sha1').update(value).digest('hex');

const wavSeconds = async (file) => {
  const buffer = await readFile(file);
  const data = buffer.indexOf('data', 12, 'ascii');
  return buffer.readUInt32LE(data + 4) / BYTES_PER_SECOND;
};

export const timeline = async (slides, lang) => {
  let time = 0;
  let speech = 0;
  const timed = [];
  for (const [index, slide] of slides.entries()) {
    if (index > 0) time += PAUSE.slideEnd;
    const start = time;
    time += PAUSE.slideStart;
    const paragraphs = [];
    for (const [p, paragraph] of slide.say.entries()) {
      const sentences = [];
      for (const [s, sentence] of splitSentences(paragraph).entries()) {
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
        sentences.push({
          text: toDisplay(sentence),
          start: time,
          end: time + seconds,
        });
        time += seconds;
        speech += seconds;
      }
      paragraphs.push(sentences);
    }
    timed.push({ slide, start, end: time, paragraphs });
  }
  return { slides: timed, total: time + TAIL, speech };
};
