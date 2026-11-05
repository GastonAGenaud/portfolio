import { moshiPiHerdrTailscale } from './moshi-pi-herdr-tailscale';
import type { Lang, Publication } from './types';

export type { Block, Lang, Publication } from './types';

// Newest first.
export const publications: Publication[] = [moshiPiHerdrTailscale];

export const getPublication = (slug: string) =>
  publications.find((p) => p.slug === slug);

export const toLang = (language: string | undefined): Lang =>
  language?.startsWith('es') ? 'es' : 'en';

export const formatPublicationDate = (date: string, lang: Lang) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString(
    lang === 'es' ? 'es-AR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
  );
