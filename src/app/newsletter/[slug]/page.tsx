import { getNewsletterIssue, newsletterIssues } from '@/lib/content/newsletter';

import NewsletterArticle from '@/containers/newsletter/NewsletterArticle';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export const generateStaticParams = () =>
  newsletterIssues.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const issue = getNewsletterIssue(params.slug);
  if (!issue) return {};
  return {
    title: `${issue.title} | Gaston Genaud`,
    description: issue.summary,
    alternates: { canonical: `/newsletter/${issue.slug}` },
    openGraph: {
      type: 'article',
      title: issue.title,
      description: issue.summary,
      publishedTime: issue.date,
      locale: issue.lang === 'es' ? 'es_AR' : 'en_US',
    },
  };
};

const Page = ({ params }: Props) => {
  if (!getNewsletterIssue(params.slug)) notFound();
  return <NewsletterArticle slug={params.slug} />;
};

export default Page;
