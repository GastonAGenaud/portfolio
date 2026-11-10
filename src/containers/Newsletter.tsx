'use client';
import {
  type NewsletterCategory,
  newsletterCategories,
  newsletterIssues,
} from '@/lib/content/newsletter';
import { formatPublicationDate, toLang } from '@/lib/content/publications';

import { Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const t$ = tokens.newsletterSectionType;

const chipClass = (active: boolean) =>
  `px-3 py-1 font-mono text-xs rounded-full border transition-colors duration-200 ${
    active
      ? 'border-accent bg-accent-light text-accent'
      : 'border-dark-3/30 hover:border-accent hover:text-accent'
  }`;

const Newsletter = () => {
  const { t, i18n } = useTranslation();
  const lang = toLang(i18n.language);
  const [category, setCategory] = useState<NewsletterCategory | 'all'>('all');

  // Only offer categories that already have at least one issue.
  const categories = Array.from(
    new Set(newsletterIssues.map((issue) => issue.category))
  );
  const issues = newsletterIssues.filter(
    (issue) => category === 'all' || issue.category === category
  );

  return (
    <Wrapper
      id="newsletter"
      className="max-w-5xl mx-auto"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary !mb-3">{t(t$.title)}</h2>
      <p className="mb-8">{t(t$.subtitle)}</p>

      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
        <button
          type="button"
          className={chipClass(category === 'all')}
          onClick={() => setCategory('all')}
        >
          {t(t$.all)}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={chipClass(category === c)}
            onClick={() => setCategory(c)}
          >
            {newsletterCategories[c][lang]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {issues.map((issue) => (
          <Link
            key={issue.slug}
            href={`/newsletter/${issue.slug}`}
            lang={issue.lang}
            className="flex flex-col gap-3 p-6 transition-all duration-200 border rounded-md shadow-xl group bg-bg-secondary border-dark-3/30 hover:border-accent hover:-translate-y-1 focus:border-accent focus:outline-none dark:shadow-2xl"
          >
            <p className="font-mono text-xs text-accent">
              {newsletterCategories[issue.category][lang]} ·{' '}
              {formatPublicationDate(issue.date, lang)} · {issue.readingMinutes}{' '}
              {t(tokens.publicationsSectionType.minutes)}
            </p>
            <h3 className="text-xl font-medium duration-200 text-dark-2 group-hover:text-accent">
              {issue.title}
            </h3>
            <p className="text-sm">{issue.summary}</p>
            {issue.lang !== lang && (
              <span className="self-start px-2 py-0.5 mt-auto font-mono text-xs rounded-full bg-accent-light text-accent">
                {t(t$.spanishOnly)}
              </span>
            )}
            <span className="font-mono text-sm text-accent">
              {t(t$.read)} →
            </span>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default Newsletter;
