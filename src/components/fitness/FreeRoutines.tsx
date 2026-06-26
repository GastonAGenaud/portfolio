'use client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Lang = 'es' | 'en';

type Routine = {
  tag: string;
  title: string;
  desc: string;
  href: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  days: string;
  nutrition: string;
  dietsTitle: string;
  dietsDesc: string;
  soon: string;
  routines: Routine[];
};

const COPY: Record<Lang, Copy> = {
  es: {
    eyebrow: 'Contenido gratuito',
    title: 'Rutinas de Gym',
    intro:
      'Las rutinas que uso y comparto, gratis. Abrí el PDF, seguí la tabla de progreso, anotá tus observaciones y mirá la técnica de cada ejercicio con los códigos QR. — Gastón Genaud',
    cta: 'Ver / Descargar PDF',
    days: '5 días + 2 de descanso',
    nutrition: 'Nutrición',
    dietsTitle: 'Dietas',
    dietsDesc:
      'Las dietas que apliqué para bajar 41 kg. El documento está en escritura — estén atentos.',
    soon: 'Próximamente',
    routines: [
      {
        tag: 'Push / Pull / Legs',
        title: 'Rutina Meadows · PPL v3',
        desc: 'Split de 5 días con overlay Meadows. Pecho alto, hombros (cluster de laterales), espalda en ancho, brazos y pierna. Tabla de progreso para anotar tus cargas + videos de técnica por QR.',
        href: '/rutinas/rutina-meadows-ppl-v3.html',
      },
      {
        tag: 'Foco V-Taper',
        title: 'Rutina Meadows · PPL v4 — Bloque 2',
        desc: 'Bloque enfocado en ancho de espalda (lats) y deltoide lateral en estiramiento. Lengthened partials, myo-reps y progresión por RIR. Grupos musculares claros por día.',
        href: '/rutinas/rutina-meadows-ppl-bloque2.html',
      },
    ],
  },
  en: {
    eyebrow: 'Free content',
    title: 'Gym Routines',
    intro:
      "The routines I use and share, for free. Open the PDF, follow the progress table, jot down your own notes and check each exercise's technique with the QR codes. — Gastón Genaud",
    cta: 'View / Download PDF',
    days: '5 days + 2 rest',
    nutrition: 'Nutrition',
    dietsTitle: 'Diets',
    dietsDesc:
      'The diets I used to lose 41 kg. The document is being written — stay tuned.',
    soon: 'Coming soon',
    routines: [
      {
        tag: 'Push / Pull / Legs',
        title: 'Meadows Routine · PPL v3',
        desc: '5-day split with a Meadows overlay. Upper chest, shoulders (lateral cluster), back width, arms and legs. A progress table to log your own loads + technique videos via QR.',
        href: '/rutinas/rutina-meadows-ppl-v3-en.html',
      },
      {
        tag: 'V-Taper focus',
        title: 'Meadows Routine · PPL v4 — Block 2',
        desc: 'Block focused on back width (lats) and the side delt in the stretched position. Lengthened partials, myo-reps and RIR-based progression. Clear muscle groups per day.',
        href: '/rutinas/rutina-meadows-ppl-bloque2-en.html',
      },
    ],
  },
};

const cardV = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const FreeRoutines = () => {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  const c = COPY[lang];

  return (
    <section id="rutinas" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <Icon icon="ph:barbell-fill" width="15" />
          {c.eyebrow}
        </span>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-dark-1 sm:text-4xl">
          {c.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text">{c.intro}</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {c.routines.map((r, i) => (
          <motion.a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            custom={i}
            variants={cardV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="group flex flex-col rounded-xl border border-white/[0.07] bg-bg-secondary/40 p-5 transition-colors hover:border-accent/50 hover:bg-bg-secondary/70"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                {r.tag}
              </span>
              <Icon
                icon="tabler:file-type-pdf"
                width="20"
                height="20"
                className="text-dark-3 transition-colors group-hover:text-accent"
              />
            </div>
            <h3 className="mt-3 font-serif text-xl text-dark-1">{r.title}</h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-text">{r.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-dark-3">
                {c.days}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                {c.cta}
                <Icon
                  icon="tabler:arrow-up-right"
                  width="14"
                  height="14"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </motion.a>
        ))}

        {/* Diets — coming soon */}
        <motion.div
          custom={2}
          variants={cardV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col rounded-xl border border-dashed border-white/[0.1] bg-bg-secondary/20 p-5 sm:col-span-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dark-3">
              {c.nutrition}
            </span>
            <Icon icon="tabler:salad" width="20" height="20" className="text-dark-3" />
          </div>
          <h3 className="mt-3 font-serif text-xl text-dark-2">{c.dietsTitle}</h3>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-text">{c.dietsDesc}</p>
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-dark-3">
            <Icon icon="tabler:clock" width="12" height="12" />
            {c.soon}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeRoutines;
