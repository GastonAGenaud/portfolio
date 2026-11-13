import type { Localized } from '../types';

export interface SeriesSnippet {
  code: string;
  lang?: string;
  caption?: Localized<string>;
}

// One day of the "31 days of QA + AI" series. Code and diagrams are shared
// between languages; prose is localized.
export interface SeriesGuide {
  day: number;
  slug: string;
  minutes: number;
  tags: string[];
  title: Localized<string>;
  summary: Localized<string>;
  requirements: Localized<string[]>;
  snippets?: SeriesSnippet[];
  extra?: Localized<{ title: string; items: string[] }>;
  steps: Localized<string[]>;
  diagram: string;
  pitfall: Localized<string>;
}
