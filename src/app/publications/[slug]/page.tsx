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
      ...(publication.cover && {
        images: [{ url: publication.cover.en, width: 1200, height: 630 }],
      }),
    },
    ...(publication.cover && {
      twitter: {
        card: 'summary_large_image',
        title: publication.title.en,
        description: publication.summary.en,
        images: [publication.cover.en],
      },
    }),
  };
};

const Page = ({ params }: Props) => {
  const publication = getPublication(params.slug);
  if (!publication) notFound();
  return <PublicationArticle publication={publication} />;
};

export default Page;
