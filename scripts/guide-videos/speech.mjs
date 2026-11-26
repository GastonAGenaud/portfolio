import { lexicon } from './lexicon.mjs';

const words = {
  es: { slash: ' barra ', dot: ' punto ', flag: 'doble guion ' },
  en: { slash: ' slash ', dot: ' dot ', flag: 'dash dash ' },
};

// How a `code` span is read aloud: file names and commands, not prose.
const sayCode = (code, lang) =>
  code
    .replace(/\/$/, '')
    .replace(/^--/, words[lang].flag)
    .replace(/\//g, words[lang].slash)
    .replace(/\.(?=[\p{L}\p{N}])/gu, words[lang].dot)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ');

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rules = Object.fromEntries(
  Object.entries(lexicon).map(([lang, entries]) => [
    lang,
    Object.entries(entries)
      // Longest first, so "user story" wins over "user".
      .sort(([a], [b]) => b.length - a.length)
      .map(([term, spoken]) => [
        new RegExp(
          `(?<![\\p{L}\\p{N}])${escapeRegExp(term)}(?![\\p{L}\\p{N}])`,
          term === term.toLowerCase() ? 'giu' : 'gu'
        ),
        spoken,
      ]),
  ])
);

const stripMarkup = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');

// Text as shown in captions.
export const toDisplay = (markdown) => stripMarkup(markdown).trim();

// Text as handed to the voice.
export const toSpoken = (markdown, lang) => {
  const text = stripMarkup(
    markdown.replace(/`([^`]+)`/g, (_, code) => sayCode(code, lang))
  ).replace(/\s\/\s/g, ', ');
  return rules[lang]
    .reduce((out, [pattern, spoken]) => out.replace(pattern, spoken), text)
    .replace(/\s+/g, ' ')
    .trim();
};

// Sentence boundaries: closing punctuation, then a capital, digit or opener.
export const splitSentences = (markdown) =>
  markdown
    .split(/(?<=[.!?…][*`"')]{0,3})\s+(?=[¿¡"'(*`A-ZÁÉÍÓÚÑ0-9])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

// Caption lines of at most `max` characters, broken at word boundaries.
export const chunkCaption = (text, max = 84) => {
  const chunks = [];
  let current = '';
  for (const word of text.split(/\s+/)) {
    if (current && `${current} ${word}`.length > max) {
      chunks.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};
