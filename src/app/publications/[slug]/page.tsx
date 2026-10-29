import { getPublication, publications } from '@/lib/content/publications';

import PublicationArticle from '@/containers/publications/PublicationArticle';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export const generateStaticParams = () =>
  publications.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const publication = getPublication(params.slug);
  if (!publication) return {};
  return {
    title: `${publication.title.en} | Gaston Genaud`,
    description: publication.summary.en,
    alternates: { canonical: `/publications/${publication.slug}` },
    openGraph: {
      type: 'article',
      title: publication.title.en,
      description: publication.summary.en,
      publishedTime: publication.date,
    },
  };
};

const Page = ({ params }: Props) => {
  if (!getPublication(params.slug)) notFound();
  return <PublicationArticle slug={params.slug} />;
};

export default Page;
