import type { Block, Lang } from '@/lib/content/publications';

export type NewsletterCategory = 'taxes';

export interface NewsletterIssue {
  slug: string;
  date: string; // YYYY-MM-DD
  category: NewsletterCategory;
  // Each issue is written in a single language.
  lang: Lang;
  readingMinutes: number;
  title: string;
  summary: string;
  body: Block[];
}
