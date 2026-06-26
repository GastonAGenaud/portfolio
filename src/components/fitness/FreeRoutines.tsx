'use client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

type Routine = {
  title: string;
  tag: string;
  desc: string;
  href: string;
  days: string;
};

const routines: Routine[] = [
  {
    title: 'Rutina Meadows · PPL v3',
    tag: 'Push / Pull / Legs',
    desc: 'Split de 5 días con overlay Meadows. Pecho alto, hombros (cluster de laterales), espalda en ancho, brazos y pierna. Tabla de progreso para anotar tus cargas + videos de técnica por QR.',
    href: '/rutinas/rutina-meadows-ppl-v3.html',
    days: '5 días + 2 de descanso',
  },
  {
    title: 'Rutina Meadows · PPL v4 — Bloque 2',
    tag: 'Foco V-Taper',
    desc: 'Bloque enfocado en ancho de espalda (lats) y deltoide lateral en estiramiento. Lengthened partials, myo-reps y progresión por RIR. Grupos musculares claros por día.',
    href: '/rutinas/rutina-meadows-ppl-bloque2.html',
    days: '5 días + 2 de descanso',
  },
];

const cardV = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const FreeRoutines = () => {
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
          Contenido gratuito
        </span>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-dark-1 sm:text-4xl">
          Rutinas de Gym
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text">
          Las rutinas que uso y comparto, gratis. Abrí el PDF, seguí la tabla de
          progreso, anotá tus observaciones y mirá la técnica de cada ejercicio
          con los códigos QR. — Gastón Genaud
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {routines.map((r, i) => (
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
                {r.days}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                Ver / Descargar PDF
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

        {/* Dietas — próximamente */}
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
              Nutrición
            </span>
            <Icon icon="tabler:salad" width="20" height="20" className="text-dark-3" />
          </div>
          <h3 className="mt-3 font-serif text-xl text-dark-2">Dietas</h3>
          <p className="mt-2 text-xs leading-relaxed text-text">
            Planes de alimentación para acompañar el entrenamiento.
          </p>
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-dark-3">
            <Icon icon="tabler:clock" width="12" height="12" />
            Próximamente
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeRoutines;
