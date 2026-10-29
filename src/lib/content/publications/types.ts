export type Lang = 'es' | 'en';

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; code: string; lang?: string; caption?: string }
  | { type: 'note'; text: string };

export type Localized<T> = Record<Lang, T>;

export interface Publication {
  slug: string;
  date: string; // YYYY-MM-DD
  readingMinutes: number;
  kind: Localized<string>;
  tags: string[];
  title: Localized<string>;
  summary: Localized<string>;
  body: Localized<Block[]>;
}
