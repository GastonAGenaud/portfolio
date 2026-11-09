import type { Lang } from '@/lib/content/publications';

import { arcaPymesNoviembre2026 } from './arca-pymes-noviembre-2026';
import type { NewsletterCategory, NewsletterIssue } from './types';

export type { NewsletterCategory, NewsletterIssue } from './types';

export const newsletterCategories: Record<
  NewsletterCategory,
  Record<Lang, string>
> = {
  taxes: { es: 'Impuestos y ARCA', en: 'Taxes & ARCA' },
};

// Newest first.
export const newsletterIssues: NewsletterIssue[] = [arcaPymesNoviembre2026];

export const getNewsletterIssue = (slug: string) =>
  newsletterIssues.find((issue) => issue.slug === slug);
