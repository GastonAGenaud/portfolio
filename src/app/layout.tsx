import { seoData } from '@/lib/content/portfolio';
import PersonaProvider, { type Persona } from '@/lib/hooks/use-persona';
import ThemeProvider from '@/lib/hooks/use-theme';
import fontVariables from '@/lib/utils/fonts';

import Cursor from '@/components/ui/Cursor';

import '../styles/globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: seoData.title,
  authors: [
    {
      name: seoData.author,
    },
  ],
  description: seoData.description,
  keywords: seoData.keywords.join(','),
  metadataBase: new URL(seoData.url),
  alternates: {
    canonical: seoData.url,
  },
  openGraph: {
    type: 'website',
    url: seoData.url,
    title: seoData.title,
    description: seoData.description,
    images: seoData.image,
    siteName: seoData.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoData.title,
    description: seoData.description,
    images: seoData.image,
    site: seoData.url,
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      url: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/favicons/android-chrome-512x512.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/favicons/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicons/favicon-16x16.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve the persona on the server from the cookie so the SSR HTML matches
  // the client's first render (no hydration mismatch for returning Studio users).
  const initialPersona: Persona =
    cookies().get('persona')?.value === 'creative' ? 'creative' : 'engineer';

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-persona={initialPersona}
      suppressHydrationWarning
    >
      <head>
        <script src="/scripts/no-flash.js" async />
      </head>
      <body className={`text-text bg-bg ${fontVariables}`}>
        <Cursor className="hidden dark:lg:block" />
        <PersonaProvider initialPersona={initialPersona}>
          <ThemeProvider>{children}</ThemeProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
