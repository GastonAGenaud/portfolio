'use client';
import { useAboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';

import { AuthorImage, Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const organizations = [
  { name: 'CLARO', url: 'https://www.claro.com.ar/personas' },
  { name: 'Caylent', url: 'https://caylent.com/' },
  { name: 'Globant', url: 'https://www.globant.com/es' },
  { name: 'CareJourney', url: 'https://arcadia.io/carejourney/' },
  { name: 'Arcadia', url: 'https://arcadia.io/' },
  { name: 'Naranja X', url: 'https://www.naranjax.com/' },
  { name: 'Coca-Cola Andina', url: 'https://www.koandina.com/' },
  { name: 'Banco Supervielle', url: 'https://www.supervielle.com.ar/' },
  { name: 'Banco de Córdoba (Bancor)', url: 'https://www.bancor.com.ar/' },
  { name: 'Banco del Chaco', url: 'https://www.nbch.com.ar/' },
  { name: 'Municipalidad de Córdoba', url: 'https://cordoba.gob.ar/' },
  { name: 'ProdEng (Vaca Muerta)', url: 'https://www.prodeng.com.ar/' },
];

const tools = [
  'Playwright',
  'Cypress',
  'Selenium',
  'Appium',
  'Pytest',
  'Mocha',
  'Cucumber',
  'AWS',
  'Kubernetes',
  'Docker',
  'Terraform',
  'GitHub Actions',
  'Jenkins',
  'Azure DevOps',
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
};

/** The site's ▹ list, in columns, each entry sliding in on scroll. */
const ItemGrid = ({
  items,
  columns = 'grid-cols-2 sm:grid-cols-3',
}: {
  items: { name: string; url?: string }[];
  columns?: string;
}) => (
  <motion.ul
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-40px' }}
    className={`grid gap-x-6 gap-y-1.5 text-sm ${columns}`}
  >
    {items.map(({ name, url }) => (
      <motion.li
        key={name}
        variants={item}
        className="flex before:mr-3 before:block before:text-accent before:content-['▹']"
      >
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-accent"
          >
            {name}
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-accent duration-300 group-hover:w-full group-focus:w-full" />
          </a>
        ) : (
          name
        )}
      </motion.li>
    ))}
  </motion.ul>
);

const About = () => {
  const { title, img, list } = useAboutSection();
  const { t } = useTranslation();

  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return <></>;

  return (
    <Wrapper id="about" {...getSectionAnimation}>
      <h2 className="heading-secondary">{title}</h2>

      <main className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
        <div className="space-y-8 lg:w-3/5">
          <div className="space-y-4 leading-relaxed">
            <p>{t(tokens.aboutSectionType.intro)}</p>
            <p>{t(tokens.aboutSectionType.focus)}</p>
          </div>

          <div className="space-y-3">
            <p>{t(tokens.aboutSectionType.history)}</p>
            <ItemGrid
              items={organizations}
              columns="grid-cols-1 sm:grid-cols-2"
            />
          </div>

          {list && (
            <div className="space-y-3">
              <p>{list.title}</p>
              <ItemGrid items={list.items.map((name) => ({ name }))} />
            </div>
          )}

          <div className="space-y-3">
            <p>{t(tokens.aboutSectionType.tools)}</p>
            <ItemGrid items={tools.map((name) => ({ name }))} />
          </div>
        </div>

        <div className="order-first pt-6 lg:order-none lg:pt-10">
          <AuthorImage
            src={img}
            alt={author.name}
            stats={[
              {
                value: 8,
                suffix: '+',
                label: t(tokens.aboutSectionType.stats.years),
              },
              {
                value: 10,
                suffix: '+',
                label: t(tokens.aboutSectionType.stats.clients),
              },
              { value: 4, label: t(tokens.aboutSectionType.stats.sectors) },
            ]}
          />
        </div>
      </main>
    </Wrapper>
  );
};

export default About;
