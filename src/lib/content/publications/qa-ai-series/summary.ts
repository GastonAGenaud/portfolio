import type { PublicationSummary } from '../types';
import type { SeriesMeta } from './types';

export const SERIES_TOTAL = 31;
const SERIES_DATE = '2026-11-13';

const kind = {
  es: 'Guía · Serie QA + IA',
  en: 'Guide · QA + AI series',
};

export const toSummary = (meta: SeriesMeta): PublicationSummary => ({
  slug: meta.slug,
  date: SERIES_DATE,
  readingMinutes: meta.minutes,
  kind: {
    es: `${kind.es} · ${meta.day}/${SERIES_TOTAL}`,
    en: `${kind.en} · ${meta.day}/${SERIES_TOTAL}`,
  },
  tags: meta.tags,
  title: meta.title,
  summary: meta.summary,
  cover: meta.cover,
  keywords: meta.keywords,
});
