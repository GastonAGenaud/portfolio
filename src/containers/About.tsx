'use client';
import { useAboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';

import { AuthorImage, Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import { animate, motion, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const organizations = [
  { name: 'CLARO', url: 'https://www.claro.com.ar/personas' },
  { name: 'Caylent', url: 'https://caylent.com/' },
  { name: 'Globant', url: 'https://www.globant.com/es' },
  { name: 'CareJourney', url: 'https://carejourney.com/' },
  { name: 'Arcadia', url: 'https://arcadia.io/' },
  { name: 'Naranja X', url: 'https://www.naranjax.com/' },
  { name: 'Coca-Cola Andina', url: 'https://www.koandina.com/' },
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

const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const chipClass =
  'inline-flex items-center gap-1.5 rounded-full border border-dark-3/50 bg-bg-secondary px-3 py-1 font-mono text-xs text-dark-2 transition-colors duration-200 hover:border-accent hover:text-accent';

const Chips = ({ items }: { items: { name: string; url?: string }[] }) => (
  <motion.ul
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-40px' }}
    className="flex flex-wrap gap-2"
  >
    {items.map(({ name, url }) => (
      <motion.li key={name} variants={chip}>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={chipClass}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {name}
          </a>
        ) : (
          <span className={chipClass}>{name}</span>
        )}
      </motion.li>
    ))}
  </motion.ul>
);

/** Counts from 0 to `value` the first time it scrolls into view. */
const Stat = ({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      variants={chip}
      className="rounded-xl border border-dark-3/40 bg-bg-secondary px-4 py-3"
    >
      <p className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
        {n}
        {suffix}
      </p>
      <p className="mt-0.5 text-xs leading-snug text-dark-2">{label}</p>
    </motion.div>
  );
};

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

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-3 gap-3"
          >
            <Stat
              value={8}
              suffix="+"
              label={t(tokens.aboutSectionType.stats.years)}
            />
            <Stat
              value={10}
              suffix="+"
              label={t(tokens.aboutSectionType.stats.clients)}
            />
            <Stat value={4} label={t(tokens.aboutSectionType.stats.sectors)} />
          </motion.div>

          <div className="space-y-3">
            <p className="text-sm text-dark-2">
              {t(tokens.aboutSectionType.history)}
            </p>
            <Chips items={organizations} />
          </div>

          {list && (
            <div className="space-y-3">
              <p className="text-sm text-dark-2">{list.title}</p>
              <Chips items={list.items.map((name) => ({ name }))} />
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-dark-2">
              {t(tokens.aboutSectionType.tools)}
            </p>
            <Chips items={tools.map((name) => ({ name }))} />
          </div>
        </div>

        <div className="order-first pt-6 lg:order-none lg:pt-10">
          <AuthorImage
            src={img}
            alt={author.name}
            caption={t(tokens.aboutSectionType.stats.location)}
          />
        </div>
      </main>
    </Wrapper>
  );
};

export default About;
