import type { Lang } from './types';

export const toLang = (language: string | undefined): Lang =>
  language?.startsWith('es') ? 'es' : 'en';

export const formatPublicationDate = (date: string, lang: Lang) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString(
    lang === 'es' ? 'es-AR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
  );
