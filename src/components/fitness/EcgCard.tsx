'use client';
import { Ecg, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Props {
  ecg: Ecg;
  locale: Locale;
  labels: { title: string; subtitle: string; rhythm: string; recordings: string };
}

const fmtDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Faint ECG-paper grid behind the trace.
const grid = {
  backgroundImage:
    'linear-gradient(var(--color-accent-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-light) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
};

const EcgCard = ({ ecg, locale, labels }: Props) => {
  const rhythm = (cls: string) => (/sinus|sinusal/i.test(cls) ? labels.rhythm : cls);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon icon="tabler:activity-heartbeat" width="19" />
        </span>
        <div>
          <h3 className="font-serif text-xl leading-tight text-dark-1">{labels.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">
            {labels.subtitle}
          </p>
        </div>
      </div>

      {/* main trace */}
      <div className="overflow-hidden rounded-xl border border-dark-3/20 bg-bg/40">
        <div className="flex items-center justify-between gap-3 px-4 pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-light px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            <Icon icon="tabler:heart" width="11" />
            {rhythm(ecg.main.cls)}
          </span>
          <span className="font-mono text-[11px] text-dark-3">
            {fmtDate(ecg.main.date, locale)}
          </span>
        </div>
        <div style={grid}>
          <svg viewBox="0 0 900 120" className="w-full" preserveAspectRatio="none" role="img" aria-label="ECG">
            <motion.path
              d={ecg.main.d}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </div>

      {/* all recordings */}
      <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-dark-3">
        {ecg.ecgs.length} {labels.recordings}
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {ecg.ecgs.map((e) => (
          <div
            key={e.date}
            className="rounded-lg border border-white/[0.05] bg-bg/40 p-3"
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-dark-1">{fmtDate(e.date, locale)}</span>
              <span className="font-mono text-[9px] text-dark-3">{e.durationSec}s</span>
            </div>
            <svg viewBox="0 0 240 44" className="w-full" preserveAspectRatio="none">
              <path
                d={e.thumb}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity="0.8"
              />
            </svg>
            <p className="mt-1.5 font-mono text-[10px] text-dark-3">{rhythm(e.cls)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcgCard;
