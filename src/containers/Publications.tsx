'use client';
import {
  formatPublicationDate,
  toLang,
} from '@/lib/content/publications/format';
import { publicationSummaries as publications } from '@/lib/content/publications/summaries';
import type {
  Lang,
  PublicationSummary,
} from '@/lib/content/publications/types';

import { Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Cards shown before the visitor asks for the full list.
const INITIAL_COUNT = 6;

// Lowercase and strip accents so "evaluacion" finds "evaluación".
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// Both languages are indexed, so a search in Spanish also works while the
// site is shown in English (and the other way round).
const LANGS: Lang[] = ['es', 'en'];

const searchableText = (p: PublicationSummary) =>
  normalize(
    [
      ...LANGS.flatMap((lang) => [
        p.title[lang],
        p.summary[lang],
        p.kind[lang],
        p.keywords?.[lang] ?? '',
      ]),
      p.tags.join(' '),
    ].join(' ')
  );

const searchIndex = publications.map((p) => ({ p, text: searchableText(p) }));

const Publications = () => {
  const { t, i18n } = useTranslation();
  const lang = toLang(i18n.language);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState('');

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const matches = searching
    ? searchIndex
        .filter(({ text }) => terms.every((term) => text.includes(term)))
        .map(({ p }) => p)
    : publications;
  const visible =
    searching || showAll ? matches : matches.slice(0, INITIAL_COUNT);

  return (
    <Wrapper
      id="publications"
      className="max-w-5xl mx-auto"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary !mb-3">
        {t(tokens.publicationsSectionType.title)}
      </h2>
      <p className="mb-8">{t(tokens.publicationsSectionType.subtitle)}</p>

      <div className="mb-8 sm:mb-10">
        <div className="relative">
          <input
            type="text"
            role="searchbox"
            enterKeyHint="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(tokens.publicationsSectionType.search)}
            aria-label={t(tokens.publicationsSectionType.search)}
            className="w-full px-4 py-3 pr-12 font-mono text-sm duration-200 border rounded-md bg-bg-secondary border-dark-3/30 text-dark-2 placeholder:text-text/60 focus:border-accent focus:outline-none"
          />
          {searching && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t(tokens.publicationsSectionType.clearSearch)}
              className="absolute inset-y-0 right-0 px-4 font-mono text-lg text-accent hover:opacity-70 focus:outline-none"
            >
              ×
            </button>
          )}
        </div>
        <p
          className="mt-2 font-mono text-xs min-h-[1rem] text-accent"
          aria-live="polite"
        >
          {searching &&
            (matches.length > 0
              ? `${matches.length} ${t(
                  matches.length === 1
                    ? tokens.publicationsSectionType.result
                    : tokens.publicationsSectionType.results
                )}`
              : t(tokens.publicationsSectionType.noResults))}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/publications/${p.slug}`}
            className="flex flex-col overflow-hidden transition-all duration-200 border rounded-md shadow-xl group bg-bg-secondary border-dark-3/30 hover:border-accent hover:-translate-y-1 focus:border-accent focus:outline-none dark:shadow-2xl"
          >
            {p.cover && (
              <Image
                src={p.cover[lang]}
                alt=""
                width={1200}
                height={630}
                loading="lazy"
                className="w-full h-auto border-b border-dark-3/30"
              />
            )}
            <div className="flex flex-col flex-1 gap-3 p-6">
              <p className="font-mono text-xs text-accent">
                {p.kind[lang]} · {formatPublicationDate(p.date, lang)} ·{' '}
                {p.readingMinutes} {t(tokens.publicationsSectionType.minutes)}
              </p>
              <h3 className="text-xl font-medium duration-200 text-dark-2 group-hover:text-accent">
                {p.title[lang]}
              </h3>
              <p className="text-sm">{p.summary[lang]}</p>
              <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 font-mono text-xs rounded-full bg-accent-light text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-sm text-accent">
                {t(tokens.publicationsSectionType.read)} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!searching && publications.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="px-5 py-2 font-mono text-sm duration-200 border rounded-md border-accent text-accent hover:bg-accent-light focus:bg-accent-light focus:outline-none"
          >
            {showAll
              ? t(tokens.publicationsSectionType.showLess)
              : `${t(tokens.publicationsSectionType.showAll)} (${
                  publications.length
                })`}
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Publications;
