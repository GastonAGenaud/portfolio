'use client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const STORE_URL = 'https://recoleta-suplementos.vercel.app/';
const LIME = '#a3e635';

const products = [
  { file: 's1.webp', name: 'CELLUCOR C4 Original Pre Entreno' },
  { file: 's2.webp', name: 'ATLHETICA Creatine 100% Pure' },
  { file: 's3.webp', name: 'BODY ADVANCE Glutamina' },
  { file: 's4.webp', name: 'AMPK Proteína Vegana' },
  { file: 's5.webp', name: 'AL FALLO Barras Proteicas' },
  { file: 's6.webp', name: 'BODY ADVANCE Whey Protein 3kg' },
];

const COPY = {
  es: {
    eyebrow: 'Suplementación deportiva',
    tagline: 'Rendí más. Pagá menos.',
    desc: 'Tienda de suplementación deportiva online — proteínas, creatina, pre-entreno y más, con envíos.',
    cta: 'Visitar tienda',
  },
  en: {
    eyebrow: 'Sports supplements',
    tagline: 'Perform more. Pay less.',
    desc: 'Online sports-supplement store — protein, creatine, pre-workout and more, with shipping.',
    cta: 'Visit store',
  },
};

const SupplementsStore = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  const c = COPY[lang];

  return (
    <section id="tienda" className="space-y-5">
      {/* store banner */}
      <motion.a
        href={STORE_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="group relative block overflow-hidden rounded-2xl border p-8 sm:p-10"
        style={{
          borderColor: `${LIME}33`,
          background: `radial-gradient(120% 130% at 100% 0%, ${LIME}16, transparent 55%), linear-gradient(180deg, #101207, #0a0a0c)`,
        }}
      >
        <span
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: LIME }}
        >
          {c.eyebrow}
        </span>
        <h2 className="mt-3 font-serif text-4xl tracking-tight text-white sm:text-5xl">
          Recoleta Suplementos
        </h2>
        <p className="mt-2 font-mono text-sm" style={{ color: LIME }}>
          {c.tagline}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-dark-2">{c.desc}</p>
        <span
          className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black transition-transform group-hover:translate-x-0.5"
          style={{ backgroundColor: LIME }}
        >
          {c.cta}
          <Icon icon="tabler:arrow-up-right" width="16" height="16" />
        </span>
      </motion.a>

      {/* product images */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {products.map((p, i) => (
          <motion.a
            key={p.file}
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            title={p.name}
            aria-label={p.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group aspect-square overflow-hidden rounded-xl bg-white p-2 ring-1 ring-white/10 transition-transform hover:-translate-y-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/tienda/${p.file}`}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default SupplementsStore;
