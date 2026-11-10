'use client';
import {
  formatPublicationDate,
  getPublication,
  toLang,
} from '@/lib/content/publications';

import { Layout } from '@/containers';
import { renderBlock } from '@/containers/publications/blocks';

import { tokens } from '@/locales/tokens';

import '@/locales/i18n';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const PublicationArticle = ({ slug }: { slug: string }) => {
  const { t, i18n } = useTranslation();
  const lang = toLang(i18n.language);
  const publication = getPublication(slug);

  return (
    <Layout>
      <article className="max-w-3xl pt-32 pb-24 mx-auto md:pt-40">
        <Link
          href="/#publications"
          className="font-mono text-sm text-accent hover:underline"
        >
          ← {t(tokens.publicationsSectionType.back)}
        </Link>

        {publication ? (
          <>
            <header className="mt-8 mb-10">
              <p className="mb-3 font-mono text-xs text-accent">
                {publication.kind[lang]} ·{' '}
                {formatPublicationDate(publication.date, lang)} ·{' '}
                {publication.readingMinutes}{' '}
                {t(tokens.publicationsSectionType.minutes)}
              </p>
              <h1 className="text-3xl font-medium leading-tight sm:text-4xl text-dark-2">
                {publication.title[lang]}
              </h1>
              <p className="mt-4 text-lg leading-relaxed">
                {publication.summary[lang]}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {publication.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 font-mono text-xs rounded-full bg-accent-light text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            {publication.body[lang].map(renderBlock)}
          </>
        ) : (
          <p className="mt-8">{t(tokens.publicationsSectionType.notFound)}</p>
        )}
      </article>
    </Layout>
  );
};

export default PublicationArticle;
