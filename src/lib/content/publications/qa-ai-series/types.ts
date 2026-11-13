import type { Localized } from '../types';

export interface SeriesSnippet {
  code: string;
  lang?: string;
  caption?: Localized<string>;
}

export interface SeriesStepDetail {
  title: string;
  body: string[];
}

// Card-level data of a guide: what listings and search need.
export interface SeriesMeta {
  day: number;
  slug: string;
  minutes: number;
  tags: string[];
  title: Localized<string>;
  summary: Localized<string>;
  cover: Localized<string>;
  // Step titles, so search also matches what a guide covers.
  keywords: Localized<string>;
}

// One day of the "31 days of QA + AI" series. Code and diagrams are shared
// between languages; prose is localized.
export interface SeriesGuide extends SeriesMeta {
  // Opening paragraphs: the problem this guide solves.
  intro: Localized<string[]>;
  requirements: Localized<string[]>;
  snippets?: SeriesSnippet[];
  extra?: Localized<{ title: string; items: string[] }>;
  // One-line version of each step; `details` holds the long form, same order.
  steps: Localized<string[]>;
  details: Localized<SeriesStepDetail[]>;
  example: Localized<string[]>;
  mistakes: Localized<string[]>;
  checklist: Localized<string[]>;
  faq: Localized<{ q: string; a: string }[]>;
  // Text version of the diagram, kept as an accessible alternative.
  diagram: string;
  diagramImage: { light: string; dark: string; width: number; height: number };
  pitfall: Localized<string>;
}
