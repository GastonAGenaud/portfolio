'use client';
import {
  type Block,
  formatPublicationDate,
  getPublication,
  toLang,
} from '@/lib/content/publications';

import { Layout } from '@/containers';

import { tokens } from '@/locales/tokens';

import '@/locales/i18n';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// Inline markup used in the content files: `code` and **bold**.
const inline = (text: string): ReactNode[] =>
  text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`'))
      return (
        <code
          key={i}
          className="px-1 py-0.5 font-mono text-[0.85em] rounded bg-accent-light text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith('**') && part.endsWith('**'))
      return (
        <strong key={i} className="font-semibold text-dark-2">
          {part.slice(2, -2)}
        </strong>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={i}
          className="mt-12 mb-4 text-2xl font-medium sm:text-3xl text-dark-2"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} className="mt-8 mb-3 text-xl font-medium text-dark-2">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={i} className="my-4 leading-relaxed">
          {inline(block.text)}
        </p>
      );
    case 'note':
      return (
        <p
          key={i}
          className="px-4 py-3 my-6 text-sm leading-relaxed border-l-4 rounded-r-md border-accent bg-accent-light"
        >
          {inline(block.text)}
        </p>
      );
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          key={i}
          className={`my-4 space-y-2 pl-6 ${
            block.ordered ? 'list-decimal' : 'list-disc'
          } marker:text-accent`}
        >
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {inline(item)}
            </li>
          ))}
        </Tag>
      );
    }
    case 'code':
      return (
        <figure key={i} className="my-6">
          <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed border rounded-md sm:text-sm bg-bg-secondary border-dark-3/30 text-dark-2">
            <code>{block.code}</code>
          </pre>
          {block.caption && (
            <figcaption className="mt-2 font-mono text-xs text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
};

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
