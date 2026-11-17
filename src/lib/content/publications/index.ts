import { moshiPiHerdrTailscale } from './moshi-pi-herdr-tailscale';
import { qaAiSeries } from './qa-ai-series';
import type { Publication } from './types';
import { veraPlaywrightTestAnalytics } from './vera-playwright-test-analytics';

export { formatPublicationDate, toLang } from './format';
export type { Block, Lang, Publication, PublicationSummary } from './types';

// Newest first. The QA + AI series keeps its own reading order (day 1 to 31).
export const publications: Publication[] = [
  ...qaAiSeries,
  veraPlaywrightTestAnalytics,
  moshiPiHerdrTailscale,
];

export const getPublication = (slug: string) =>
  publications.find((p) => p.slug === slug);
