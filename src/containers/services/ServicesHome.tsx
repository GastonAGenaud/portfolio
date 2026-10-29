'use client';
import { author, socialLinks } from '@/lib/content/portfolio';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const t$ = tokens.servicesSectionType;

const services = [
  { key: 'web', icon: 'ph:browser-bold', ...t$.items.web },
  { key: 'ads', icon: 'ph:megaphone-bold', ...t$.items.ads },
  { key: 'automation', icon: 'ph:robot-bold', ...t$.items.automation },
];

const CASE_URL = 'https://tomasmercado.vercel.app';

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

const ServicesHome = () => {
  const { t } = useTranslation();
  const mailto = `mailto:${author.email}?subject=${encodeURIComponent(
    t(t$.mailSubject)
  )}`;
  const whatsapp = `${socialLinks.whatsapp}?text=${encodeURIComponent(
    t(t$.whatsappMessage)
  )}`;

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
      </section>

      {/* Services */}
      <section className="py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.offerEyebrow)}</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-dark-1 sm:text-4xl">
            {t(t$.offerTitle)}
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
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
              <ul className="mt-6 space-y-2.5 border-t border-dark-3/60 pt-6">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-dark-2">
                    <Icon
                      icon="ph:check-bold"
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {t(b)}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Case study */}
      <section id="caso" className="scroll-mt-24 py-16">
        <motion.div {...fadeUp}>
          <Eyebrow>{t(t$.caseEyebrow)}</Eyebrow>
        </motion.div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <motion.a
            {...fadeUp}
            href={CASE_URL}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-xl border border-dark-3/60 bg-bg-secondary shadow-2xl shadow-black/40 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 border-b border-dark-3/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-dark-3" />
              <span className="ml-3 truncate font-mono text-[11px] text-text">
                tomasmercado.vercel.app
              </span>
            </div>
            <Image
              src="/services/tomasmercado-hero.jpg"
              alt="Tomás Mercado — sitio web"
              width={2160}
              height={1350}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 580px, 100vw"
            />
          </motion.a>
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold tracking-tight text-dark-1">
              {t(t$.caseTitle)}
            </h2>
            <p className="mt-4 leading-relaxed text-text">
              {t(t$.caseDescription)}
            </p>
            <ul className="mt-6 space-y-2.5">
              {t$.caseBullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-dark-2">
                  <Icon
                    icon="ph:check-bold"
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  {t(b)}
                </li>
              ))}
            </ul>
            <a
              href={CASE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              {t(t$.caseCta)}
              <Icon icon="ph:arrow-up-right-bold" />
            </a>
          </motion.div>
        </div>
      </section>

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
