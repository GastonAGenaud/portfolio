export type Lang = 'es' | 'en';

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; code: string; lang?: string; caption?: string }
  | { type: 'note'; text: string }
  | {
      type: 'image';
      src: string;
      // Variant shown when the dark theme is active.
      darkSrc?: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      // Plain-text version of the image, shown in a collapsible block.
      textVersion?: { label: string; text: string };
    };

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
  // 1200x630 cover, also used as the social preview image.
  cover?: Localized<string>;
  // Extra terms the search matches on (section titles); never displayed.
  keywords?: Localized<string>;
}

// What listings need: everything except the article body.
export type PublicationSummary = Omit<Publication, 'body'>;
