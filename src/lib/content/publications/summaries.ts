import { moshiPiHerdrTailscale } from './moshi-pi-herdr-tailscale';
import { seriesMeta } from './qa-ai-series/meta';
import { toSummary } from './qa-ai-series/summary';
import type { Publication, PublicationSummary } from './types';
import { veraPlaywrightTestAnalytics } from './vera-playwright-test-analytics';

const withoutBody = ({
  body: _body,
  ...summary
}: Publication): PublicationSummary => summary;

// Card data for listings and search, in the same order as `publications`.
// Kept apart from `index.ts` so pages that only list publications don't bundle
// the body of every guide in the series.
export const publicationSummaries: PublicationSummary[] = [
  ...seriesMeta.map(toSummary),
  withoutBody(veraPlaywrightTestAnalytics),
  withoutBody(moshiPiHerdrTailscale),
];
