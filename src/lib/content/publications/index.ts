import { moshiPiHerdrTailscale } from './moshi-pi-herdr-tailscale';
import { qaAiSeries } from './qa-ai-series';
import type { Lang, Publication } from './types';

export type { Block, Lang, Publication } from './types';

// Newest first. The QA + AI series keeps its own reading order (day 1 to 31).
export const publications: Publication[] = [
  ...qaAiSeries,
  moshiPiHerdrTailscale,
];

export const getPublication = (slug: string) =>
  publications.find((p) => p.slug === slug);

export const toLang = (language: string | undefined): Lang =>
  language?.startsWith('es') ? 'es' : 'en';

export const formatPublicationDate = (date: string, lang: Lang) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString(
    lang === 'es' ? 'es-AR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
  );
