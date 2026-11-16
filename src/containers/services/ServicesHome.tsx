'use client';
import { author, socialLinks } from '@/lib/content/portfolio';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const t$ = tokens.servicesSectionType;

type SectorKey = keyof typeof t$.sectors;

const sectorIcons: Record<SectorKey, string> = {
  gastro: 'ph:fork-knife-bold',
  commerce: 'ph:storefront-bold',
  tourism: 'ph:house-line-bold',
  health: 'ph:first-aid-kit-bold',
  pro: 'ph:student-bold',
};

type Case = {
  slug: string;
  url: string;
  image: string;
  alt: string;
  sector: SectorKey;
  featured?: boolean;
  title: string;
  description: string;
  bullets: string[];
};

const cases: Case[] = [
  {
    slug: 'tomas-mercado',
    url: 'https://tomasmercado.vercel.app',
    image: '/services/tomasmercado-hero.jpg',
    alt: 'Tomás Mercado — sitio web',
    sector: 'pro',
    featured: true,
    ...t$.cases[0],
  },
  {
    slug: 'control-insumos',
    url: 'https://control-insumos-bay.vercel.app',
    image: '/services/control-insumos-hero.jpg',
    alt: 'Control de Insumos — stock por sector para clínicas',
    sector: 'health',
    featured: true,
    ...t$.cases[4],
  },
  {
    slug: 'pizza-calda',
    url: 'https://pizzacalda.vercel.app',
    image: '/services/pizza-calda-hero.jpg',
    alt: 'Pizza Calda — pizzería y bodegón en Recoleta',
    sector: 'gastro',
    featured: true,
    ...t$.cases[9],
  },
  {
    slug: 'multirubro-anisacate',
    url: 'https://multirubro-anisacate.vercel.app',
    image: '/services/multirubro-anisacate-hero.jpg',
    alt: 'Multirubro Anisacate — tienda online',
    sector: 'commerce',
    ...t$.cases[1],
  },
  {
    slug: 'pya-guapy',
    url: 'https://pya-guapy-web.vercel.app',
    image: '/services/pya-guapy-hero.jpg',
    alt: "Cabañas Py'a Guapy — alojamiento en Anisacate",
    sector: 'tourism',
    ...t$.cases[5],
  },
  {
    slug: 'gastongenaudfitness',
    url: 'https://www.gastongenaudfitness.com',
    image: '/services/gastongenaudfitness-hero.jpg',
    alt: 'Gaston Genaud Fitness — asesorías online',
    sector: 'pro',
    ...t$.cases[2],
  },
  {
    slug: 'virginia-academy',
    url: 'https://academy-frontend-kappa.vercel.app',
    image: '/services/virginia-academy-hero.jpg',
    alt: 'Virginia Academy — plataforma de cursos',
    sector: 'pro',
    ...t$.cases[3],
  },
  {
    slug: 'souriana',
    url: 'https://souriana-ar.vercel.app',
    image: '/services/souriana-hero.jpg',
    alt: 'Souriana — comida árabe en Recoleta',
    sector: 'gastro',
    ...t$.cases[6],
  },
  {
    slug: 'fergus',
    url: 'https://fergus-pancheria.vercel.app',
    image: '/services/fergus-hero.jpg',
    alt: 'Fergus — panchería en Recoleta',
    sector: 'gastro',
    ...t$.cases[7],
  },
  {
    slug: 'la-morada',
    url: 'https://la-morada.veniaver.com',
    image: '/services/la-morada-hero.jpg',
    alt: 'La Morada — cocina regional en Recoleta',
    sector: 'gastro',
    ...t$.cases[10],
  },
  {
    slug: 'miro',
    url: 'https://miro.veniaver.com',
    image: '/services/miro-hero.jpg',
    alt: 'Miro — cafetín en Recoleta',
    sector: 'gastro',
    ...t$.cases[11],
  },
  {
    slug: 'la-tolva',
    url: 'https://la-tolva.veniaver.com',
    image: '/services/veniaver-la-tolva-hero.jpg',
    alt: 'La Tolva — cafetería en Av. Santa Fe',
    sector: 'gastro',
    ...t$.cases[12],
  },
  {
    slug: 'optica-la-rochelle',
    url: 'https://optica-la-rochelle.veniaver.com',
    image: '/services/veniaver-optica-la-rochelle-hero.jpg',
    alt: 'Óptica La Rochelle — óptica en Recoleta',
    sector: 'commerce',
    ...t$.cases[13],
  },
  {
    slug: 'farmacia-vantage',
    url: 'https://farmacia-vantage-franco-alemana.veniaver.com',
    image: '/services/veniaver-farmacia-vantage-hero.jpg',
    alt: 'Farmacia Vantage Franco Alemana — farmacia 24 horas',
    sector: 'commerce',
    ...t$.cases[14],
  },
  {
    slug: 'farmacia-san-fernando',
    url: 'https://farmacia-san-fernando-cabrera-3161-scs.veniaver.com',
    image: '/services/veniaver-farmacia-san-fernando-hero.jpg',
    alt: 'Farmacia San Fernando — farmacia en Av. Santa Fe',
    sector: 'commerce',
    ...t$.cases[15],
  },
  {
    slug: 'the-virginia',
    url: 'https://thevirginia.site',
    image: '/services/the-virginia-hero.jpg',
    alt: 'The Virginia — estudio de ingeniería de calidad',
    sector: 'pro',
    ...t$.cases[8],
  },
];

const caseBySlug = Object.fromEntries(cases.map((c) => [c.slug, c]));

const services = [
  {
    key: 'web',
    icon: 'ph:browser-bold',
    examples: ['tomas-mercado', 'multirubro-anisacate', 'pya-guapy'],
    ...t$.items.web,
  },
  {
    key: 'systems',
    icon: 'ph:squares-four-bold',
    examples: ['control-insumos', 'gastongenaudfitness', 'virginia-academy'],
    ...t$.items.systems,
  },
  { key: 'ads', icon: 'ph:megaphone-bold', examples: [], ...t$.items.ads },
  {
    key: 'automation',
    icon: 'ph:robot-bold',
    examples: [],
    ...t$.items.automation,
  },
];

// Published Veni a Ver sites, linked from the offer block. `copyUrl`: the case
// keeps its own URL and Veni a Ver serves a copy, so the link goes to the copy.
const veniSites: { slug: string; copyUrl?: string }[] = [
  { slug: 'miro' },
  { slug: 'la-morada' },
  { slug: 'fergus', copyUrl: 'https://fergus.veniaver.com' },
  { slug: 'la-tolva' },
  { slug: 'optica-la-rochelle' },
  { slug: 'farmacia-vantage' },
  { slug: 'farmacia-san-fernando' },
];

const sectorKeys = Object.keys(t$.sectors) as SectorKey[];
const countBySector = (sector: SectorKey) =>
  cases.filter((c) => c.sector === sector).length;

const stats = [
  { value: String(cases.length), label: t$.stats.projects },
  { value: String(sectorKeys.length), label: t$.stats.sectors },
  { value: '14', label: t$.stats.prototype },
  { value: '3', label: t$.stats.languages },
];

const shortName = (title: string) => title.split(' — ')[0];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
    {children}
  </p>
);

const CheckList = ({ items }: { items: string[] }) => {
  const { t } = useTranslation();
  return (
    <ul className="space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5 text-sm text-dark-2">
          <Icon icon="ph:check-bold" className="mt-0.5 shrink-0 text-accent" />
          {t(b)}
        </li>
      ))}
    </ul>
  );
};

const BrowserFrame = ({
  c,
  sizes,
  className = '',
}: {
  c: Case;
  sizes: string;
  className?: string;
}) => (
  <a
    href={c.url}
    target="_blank"
    rel="noreferrer"
    className={`block overflow-hidden rounded-xl border border-dark-3/60 bg-bg-secondary shadow-2xl shadow-black/40 transition-transform hover:-translate-y-1 ${className}`}
  >
    <div className="flex items-center gap-2 border-b border-dark-3/60 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
      <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
      <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
      <span className="ml-3 truncate font-mono text-[11px] text-text">
        {c.url.replace('https://', '')}
      </span>
    </div>
    <Image
      src={c.image}
      alt={c.alt}
      width={2160}
      height={1350}
      className="h-auto w-full"
      sizes={sizes}
    />
  </a>
);

const SectorTag = ({ sector }: { sector: SectorKey }) => {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent-light px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
      <Icon icon={sectorIcons[sector]} />
      {t(t$.sectors[sector].title)}
    </span>
  );
};

const VisitLink = ({ url }: { url: string }) => {
  const { t } = useTranslation();
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
    >
      {t(t$.caseCta)}
      <Icon icon="ph:arrow-up-right-bold" />
    </a>
  );
};

const FeaturedCase = ({ c, flip }: { c: Case; flip: boolean }) => {
  const { t } = useTranslation();
  return (
    <div
      id={`case-${c.slug}`}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-[1.35fr_1fr]"
    >
      <motion.div {...fadeUp} className={flip ? 'lg:order-2' : ''}>
        <BrowserFrame c={c} sizes="(min-width: 1024px) 580px, 100vw" />
      </motion.div>
      <motion.div {...fadeUp}>
        <SectorTag sector={c.sector} />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-1">
          {t(c.title)}
        </h2>
        <p className="mt-4 leading-relaxed text-text">{t(c.description)}</p>
        <div className="mt-6">
          <CheckList items={c.bullets} />
        </div>
        <div className="mt-8">
          <VisitLink url={c.url} />
        </div>
      </motion.div>
    </div>
  );
};

const CaseCard = ({ c }: { c: Case }) => {
  const { t } = useTranslation();
  return (
    <motion.article
      {...fadeUp}
      id={`case-${c.slug}`}
      className="flex min-w-0 scroll-mt-24 flex-col"
    >
      <BrowserFrame
        c={c}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-5 flex flex-1 flex-col">
        <SectorTag sector={c.sector} />
        <h3 className="mt-3 text-lg font-semibold text-dark-1">{t(c.title)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text">
          {t(c.description)}
        </p>
        <div className="mt-4">
          <VisitLink url={c.url} />
        </div>
      </div>
    </motion.article>
  );
};

const ServicesHome = () => {
  const { t } = useTranslation();
  const [sector, setSector] = useState<SectorKey | 'all'>('all');
  const mailto = `mailto:${author.email}?subject=${encodeURIComponent(
    t(t$.mailSubject)
  )}`;
  const whatsapp = `${socialLinks.whatsapp}?text=${encodeURIComponent(
    t(t$.whatsappMessage)
  )}`;
  const prototypeWhatsapp = `${socialLinks.whatsapp}?text=${encodeURIComponent(
    t(t$.prototypeWhatsappMessage)
  )}`;
  const veniWhatsapp = `${socialLinks.whatsapp}?text=${encodeURIComponent(
    t(t$.veni.whatsappMessage)
  )}`;

  const visible = cases.filter((c) => sector === 'all' || c.sector === sector);
  const featured = visible.filter((c) => c.featured);
  const rest = visible.filter((c) => !c.featured);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="flex min-h-[86vh] flex-col justify-start pb-16 pt-32 sm:justify-center sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          {t(t$.eyebrow)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[2.6rem] font-bold leading-[1.04] tracking-tight text-dark-1 sm:text-7xl"
        >
          {t(t$.title)}
          <br />
          <span className="text-accent">{t(t$.titleAccent)}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-text"
        >
          {t(t$.intro)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            <Icon icon="mdi:whatsapp" width="18" height="18" />
            {t(t$.ctaPrimary)}
          </a>
          <a
            href="#caso"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-3 px-6 py-3 text-sm font-medium text-dark-2 transition-colors hover:border-accent hover:text-accent"
          >
            {t(t$.ctaSecondary)}
          </a>
        </motion.div>
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-dark-3/60 pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{t(s.label)}</dt>
              <dd className="text-3xl font-bold tracking-tight text-dark-1">
                {s.value}
              </dd>
              <dd className="mt-1 text-xs leading-snug text-text">
                {t(s.label)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </section>

      {/* Problem */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.problemEyebrow)}</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.problemTitle)}
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t$.problems.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-dark-3/60 p-6"
            >
              <Icon
                icon="ph:warning-circle-bold"
                width="22"
                height="22"
                className="text-accent"
              />
              <h3 className="mt-4 font-semibold text-dark-1">{t(p.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text">
                {t(p.description)}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          {...fadeUp}
          className="mt-8 max-w-2xl text-lg font-medium text-dark-2"
        >
          {t(t$.problemClosing)}
        </motion.p>
      </section>

      {/* Services */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.offerEyebrow)}</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.offerTitle)}
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.key}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-dark-3/60 bg-bg-secondary p-7 transition-colors hover:border-accent/60"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
                <Icon icon={s.icon} width="22" height="22" />
              </div>
              <h3 className="text-xl font-semibold text-dark-1">
                {t(s.title)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text">
                {t(s.description)}
              </p>
              <div className="mt-6 flex-1 border-t border-dark-3/60 pt-6">
                <CheckList items={s.bullets} />
              </div>
              {s.examples.length > 0 && (
                <p className="mt-6 text-xs text-text">
                  <span className="font-mono uppercase tracking-wider">
                    {t(t$.examplesLabel)}:
                  </span>{' '}
                  {s.examples.map((slug, j) => (
                    <span key={slug}>
                      {j > 0 && ' · '}
                      <a
                        href={`#case-${slug}`}
                        onClick={() => setSector('all')}
                        className="text-dark-2 underline decoration-dark-3 underline-offset-4 hover:text-accent hover:decoration-accent"
                      >
                        {shortName(t(caseBySlug[slug].title))}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.sectorsEyebrow)}</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.sectorsTitle)}
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectorKeys.map((key, i) => (
            <motion.a
              key={key}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              href="#caso"
              onClick={() => setSector(key)}
              className="group flex flex-col rounded-2xl border border-dark-3/60 p-6 transition-colors hover:border-accent/60 hover:bg-bg-secondary"
            >
              <Icon
                icon={sectorIcons[key]}
                width="24"
                height="24"
                className="text-accent"
              />
              <h3 className="mt-4 font-semibold text-dark-1">
                {t(t$.sectors[key].title)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text">
                {t(t$.sectors[key].outcome)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {t(t$.sectorsCta)} ({countBySector(key)})
                <Icon
                  icon="ph:arrow-down-bold"
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section id="caso" className="scroll-mt-24 py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.caseEyebrow)}</Eyebrow>
        </motion.div>
        <div
          role="group"
          aria-label={t(t$.filterLabel)}
          className="mb-12 flex flex-wrap gap-2"
        >
          {(['all', ...sectorKeys] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={sector === key}
              onClick={() => setSector(key)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                sector === key
                  ? 'border-accent bg-accent text-bg'
                  : 'border-dark-3 text-dark-2 hover:border-accent hover:text-accent'
              }`}
            >
              {key === 'all' ? t(t$.filterAll) : t(t$.sectors[key].title)}
            </button>
          ))}
        </div>
        {featured.length > 0 && (
          <div className="space-y-20">
            {featured.map((c, i) => (
              <FeaturedCase key={c.slug} c={c} flip={i % 2 === 1} />
            ))}
          </div>
        )}
        {rest.length > 0 && (
          <div
            className={`grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 ${
              featured.length > 0 ? 'mt-24' : ''
            }`}
          >
            {rest.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        )}
      </section>

      {/* Veni a Ver: the offer, without prices (they only go in the proposal) */}
      <section id="veni-a-ver" className="scroll-mt-24 py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.veni.eyebrow)}</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.veni.title)}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-text">
            {t(t$.veni.description)}
          </p>
          <p className="mt-6 text-xs text-text">
            <span className="font-mono uppercase tracking-wider">
              {t(t$.veni.sitesLabel)}:
            </span>{' '}
            {veniSites.map(({ slug, copyUrl }, j) => (
              <span key={slug}>
                {j > 0 && ' · '}
                <a
                  {...(copyUrl
                    ? { href: copyUrl, target: '_blank', rel: 'noreferrer' }
                    : {
                        href: `#case-${slug}`,
                        onClick: () => setSector('all'),
                      })}
                  className="text-dark-2 underline decoration-dark-3 underline-offset-4 hover:text-accent hover:decoration-accent"
                >
                  {shortName(t(caseBySlug[slug].title))}
                </a>
              </span>
            ))}
          </p>
        </motion.div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <motion.ul
            {...fadeUp}
            className="grid gap-px overflow-hidden rounded-2xl border border-dark-3/60 bg-dark-3/60 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t$.veni.benefits.map((b) => (
              <li key={b.title} className="bg-bg p-6">
                <h3 className="font-semibold text-dark-1">{t(b.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text">
                  {t(b.text)}
                </p>
              </li>
            ))}
          </motion.ul>
          <motion.div
            {...fadeUp}
            className="flex flex-col rounded-2xl border border-accent/30 bg-bg-secondary p-7"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(t$.veni.plansTitle)}
            </h3>
            <dl className="mt-4 flex-1 divide-y divide-dark-3/60">
              {t$.veni.plans.map((plan) => (
                <div key={plan.name} className="py-4">
                  <dt className="font-semibold text-dark-1">{t(plan.name)}</dt>
                  <dd className="mt-1 text-sm text-text">{t(plan.detail)}</dd>
                </div>
              ))}
            </dl>
            <a
              href={veniWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              <Icon icon="mdi:whatsapp" width="18" height="18" />
              {t(t$.veni.cta)}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Free prototype */}
      <motion.section
        {...fadeUp}
        id="prototipo"
        className="scroll-mt-24 rounded-3xl border border-accent/30 bg-bg-secondary p-8 sm:p-10"
      >
        <Eyebrow>{t(t$.prototypeEyebrow)}</Eyebrow>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
              {t(t$.prototypeTitle)}
            </h2>
            <p className="mt-4 leading-relaxed text-text">
              {t(t$.prototypeDescription)}
            </p>
          </div>
          <a
            href={prototypeWhatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            <Icon icon="mdi:whatsapp" width="18" height="18" />
            {t(t$.prototypeCta)}
          </a>
        </div>
      </motion.section>

      {/* Process */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.processEyebrow)}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.processTitle)}
          </h2>
        </motion.div>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-dark-3/60 bg-dark-3/60 sm:grid-cols-2 lg:grid-cols-4">
          {t$.steps.map((step, i) => (
            <motion.li
              key={step.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-bg p-6"
            >
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-dark-1">
                {t(step.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text">
                {t(step.description)}
              </p>
            </motion.li>
          ))}
        </ol>
        <motion.div
          {...fadeUp}
          className="mt-6 flex flex-col gap-4 rounded-2xl bg-accent-light p-6 sm:flex-row sm:items-center"
        >
          <Icon
            icon="ph:shield-check-bold"
            width="32"
            height="32"
            className="shrink-0 text-accent"
          />
          <div>
            <h3 className="font-semibold text-dark-1">{t(t$.edgeTitle)}</h3>
            <p className="mt-1 text-sm text-text">{t(t$.edgeDescription)}</p>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.faqEyebrow)}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.faqTitle)}
          </h2>
        </motion.div>
        <div className="mt-10 divide-y divide-dark-3/60 border-y border-dark-3/60">
          {t$.faq.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-dark-1 [&::-webkit-details-marker]:hidden">
                {t(f.question)}
                <Icon
                  icon="ph:plus-bold"
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text">
                {t(f.answer)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        {...fadeUp}
        className="mt-8 rounded-3xl border border-accent/30 bg-bg-secondary px-8 py-16 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight text-dark-1 sm:text-5xl">
          {t(t$.finalTitle)}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text">
          {t(t$.finalDescription)}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            <Icon icon="mdi:whatsapp" width="18" height="18" />
            WhatsApp
          </a>
          <a
            href={mailto}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-3 px-6 py-3 text-sm font-medium text-dark-2 transition-colors hover:border-accent hover:text-accent"
          >
            <Icon icon="ph:envelope-simple-bold" />
            {author.email}
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-3 px-6 py-3 text-sm font-medium text-dark-2 transition-colors hover:border-accent hover:text-accent"
          >
            <Icon icon="mdi:instagram" />
            @gastongenaud
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesHome;
