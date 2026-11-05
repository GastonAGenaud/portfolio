'use client';
import {
  formatPublicationDate,
  publications,
  toLang,
} from '@/lib/content/publications';

import { Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Publications = () => {
  const { t, i18n } = useTranslation();
  const lang = toLang(i18n.language);

  return (
    <Wrapper
      id="publications"
      className="max-w-5xl mx-auto"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary !mb-3">
        {t(tokens.publicationsSectionType.title)}
      </h2>
      <p className="mb-10 sm:mb-12">
        {t(tokens.publicationsSectionType.subtitle)}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {publications.map((p) => (
          <Link
            key={p.slug}
            href={`/publications/${p.slug}`}
            className="flex flex-col gap-3 p-6 transition-all duration-200 border rounded-md shadow-xl group bg-bg-secondary border-dark-3/30 hover:border-accent hover:-translate-y-1 focus:border-accent focus:outline-none dark:shadow-2xl"
          >
            <p className="font-mono text-xs text-accent">
              {p.kind[lang]} · {formatPublicationDate(p.date, lang)} ·{' '}
              {p.readingMinutes} {t(tokens.publicationsSectionType.minutes)}
            </p>
            <h3 className="text-xl font-medium duration-200 text-dark-2 group-hover:text-accent">
              {p.title[lang]}
            </h3>
            <p className="text-sm">{p.summary[lang]}</p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
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
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default Publications;
