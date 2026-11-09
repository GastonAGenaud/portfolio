'use client';
import {
  getNewsletterIssue,
  newsletterCategories,
} from '@/lib/content/newsletter';
import { formatPublicationDate, toLang } from '@/lib/content/publications';

import { Layout } from '@/containers';
import { renderBlock } from '@/containers/publications/blocks';

import { tokens } from '@/locales/tokens';

import '@/locales/i18n';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const NewsletterArticle = ({ slug }: { slug: string }) => {
  const { t, i18n } = useTranslation();
  const lang = toLang(i18n.language);
  const issue = getNewsletterIssue(slug);

  return (
    <Layout>
      <article
        lang={issue?.lang}
        className="max-w-3xl pt-32 pb-24 mx-auto md:pt-40"
      >
        <Link
          href="/#newsletter"
          className="font-mono text-sm text-accent hover:underline"
        >
          ← {t(tokens.publicationsSectionType.back)}
        </Link>

        {issue ? (
          <>
            <header className="mt-8 mb-10">
              <p className="mb-3 font-mono text-xs text-accent">
                {newsletterCategories[issue.category][lang]} ·{' '}
                {formatPublicationDate(issue.date, lang)} ·{' '}
                {issue.readingMinutes}{' '}
                {t(tokens.publicationsSectionType.minutes)}
              </p>
              <h1 className="text-3xl font-medium leading-tight sm:text-4xl text-dark-2">
                {issue.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed">{issue.summary}</p>
              {issue.lang !== lang && (
                <p className="mt-5 font-mono text-xs text-accent">
                  {t(tokens.newsletterSectionType.spanishOnly)}
                </p>
              )}
            </header>
            {issue.body.map(renderBlock)}
          </>
        ) : (
          <p className="mt-8">{t(tokens.newsletterSectionType.notFound)}</p>
        )}
      </article>
    </Layout>
  );
};

export default NewsletterArticle;
