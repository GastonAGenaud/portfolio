'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BodySilhouette from './BodySilhouette';
import StatMetric from './StatMetric';

export interface SlideLabels {
  weight: string;
  bodyFat: string;
  muscle: string;
  lean: string;
  muscleMass: string;
  skeletal: string;
  visceral: string;
  restingHr: string;
  bmi: string;
  vo2: string;
  measuresTitle: string;
  chest: string;
  waist: string;
  hip: string;
  arm: string;
  details: string;
  hideDetails: string;
  vsBaseline: string;
  target: string;
  photoPlaceholder: string;
}

interface Props {
  milestone: FitnessMilestone;
  index: number;
  total: number;
  locale: Locale;
  baseline: { weight: number; bodyFatPct: number };
  localize: (t: { en: string; es: string }) => string;
  labels: SlideLabels;
}

const formatDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-dark-3/20 py-2">
    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
      {label}
    </span>
    <span className="font-mono text-sm text-dark-1">{value}</span>
  </div>
);

const MilestoneSlide = ({
  milestone,
  index,
  total,
  locale,
  baseline,
  localize,
  labels,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const m = milestone;

  const weightDelta =
    typeof m.weight === 'number' ? m.weight - baseline.weight : undefined;
  const fatDelta =
    typeof m.bodyFatPct === 'number'
      ? m.bodyFatPct - baseline.bodyFatPct
      : undefined;
  const hasDeltas =
    !m.isGoal &&
    ((typeof weightDelta === 'number' && Math.abs(weightDelta) > 0.05) ||
      (typeof fatDelta === 'number' && Math.abs(fatDelta) > 0.05));

  const muscleValue =
    typeof m.musclePct === 'number'
      ? m.musclePct
      : typeof m.muscleKg === 'number'
      ? m.muscleKg
      : typeof m.leanKg === 'number'
      ? m.leanKg
      : '—';
  const muscleUnit =
    typeof m.musclePct === 'number' ? '%' : muscleValue === '—' ? '' : 'kg';

  // Composition breakdown (height-derived BMI intentionally omitted).
  const rows: { label: string; value: string }[] = [];
  if (typeof m.weight === 'number') rows.push({ label: labels.weight, value: `${m.weight} kg` });
  if (typeof m.bodyFatPct === 'number') rows.push({ label: labels.bodyFat, value: `${m.bodyFatPct} %` });
  if (typeof m.musclePct === 'number') rows.push({ label: labels.muscle, value: `${m.musclePct} %` });
  if (typeof m.leanKg === 'number') rows.push({ label: labels.lean, value: `${m.leanKg} kg` });
  if (typeof m.muscleKg === 'number') rows.push({ label: labels.muscleMass, value: `${m.muscleKg} kg` });
  if (typeof m.skeletalKg === 'number') rows.push({ label: labels.skeletal, value: `${m.skeletalKg} kg` });
  if (typeof m.visceral === 'number') rows.push({ label: labels.visceral, value: `${m.visceral}` });
  if (typeof m.restingHr === 'number') rows.push({ label: labels.restingHr, value: `${m.restingHr} bpm` });
  if (typeof m.vo2 === 'number') rows.push({ label: labels.vo2, value: `${m.vo2}` });

  const measureRows: { label: string; value: string }[] = [];
  if (m.measures?.chest) measureRows.push({ label: labels.chest, value: `${m.measures.chest} cm` });
  if (m.measures?.waist) measureRows.push({ label: labels.waist, value: `${m.measures.waist} cm` });
  if (m.measures?.hip) measureRows.push({ label: labels.hip, value: `${m.measures.hip} cm` });
  if (m.measures?.arm) measureRows.push({ label: labels.arm, value: `${m.measures.arm} cm` });

  const canOpen = rows.length > 0 || measureRows.length > 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      {/* DATA */}
      <div className="relative order-2 lg:order-1">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 -left-1 select-none font-mono text-[5rem] font-bold leading-none text-accent opacity-[0.07] sm:-top-3 sm:text-[6.5rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-dark-3">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {m.tag && (
              <span className="rounded-full border border-dark-3/30 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-accent">
                {localize(m.tag)}
              </span>
            )}
          </div>

          <h3 className="font-serif text-3xl text-dark-1 sm:text-4xl">
            {localize(m.title)}
          </h3>
          <p className="mt-1 font-mono text-xs text-dark-3">
            {formatDate(m.date, locale)}
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-text">
            {localize(m.note)}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            <StatMetric
              label={m.isGoal ? `${labels.target} · ${labels.weight}` : labels.weight}
              value={m.weight ?? '—'}
              unit="kg"
              size="lg"
              delta={m.isGoal ? undefined : weightDelta}
              deltaUnit=" kg"
            />
            <StatMetric
              label={m.isGoal ? `${labels.target} · ${labels.bodyFat}` : labels.bodyFat}
              value={m.bodyFatPct ?? '—'}
              unit="%"
              size="lg"
              delta={m.isGoal ? undefined : fatDelta}
              deltaUnit=" pp"
            />
            <StatMetric label={labels.muscle} value={muscleValue} unit={muscleUnit} size="lg" />
          </div>

          <div className="mt-5 flex items-center gap-4">
            {hasDeltas && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
                {labels.vsBaseline}
              </span>
            )}
            {canOpen && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-dark-3/40 px-3.5 py-1.5 font-mono text-xs text-accent transition-colors duration-200 hover:border-accent hover:bg-accent-light focus:outline-none"
              >
                {labels.details}
                <Icon icon="tabler:layout-grid" width="14" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FIGURE */}
      <div className="order-1 flex items-center justify-center lg:order-2">
        <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-white/[0.06] bg-bg-secondary lg:max-w-[330px]">
          {m.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/fitness/${m.image}`} alt={localize(m.title)} className="h-full w-full object-cover" />
          ) : (
            <BodySilhouette goal={m.isGoal} className="p-3" />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
          {!m.image && (
            <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dark-3">
              {labels.photoPlaceholder}
            </span>
          )}
        </div>
      </div>

      {/* DETAILS MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-dark-3/30 bg-bg-secondary p-6 shadow-2xl sm:rounded-2xl"
                  initial={{ y: 30, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  data-persona-scope
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      {m.tag && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          {localize(m.tag)}
                        </span>
                      )}
                      <h4 className="font-serif text-2xl text-dark-1">{localize(m.title)}</h4>
                      <p className="font-mono text-[11px] text-dark-3">{formatDate(m.date, locale)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="rounded-full p-1 text-dark-3 transition-colors hover:text-accent focus:outline-none"
                    >
                      <Icon icon="tabler:x" width="22" />
                    </button>
                  </div>

                  <div className="grid gap-x-8 sm:grid-cols-2">
                    <div>
                      {rows.map((r) => (
                        <DetailRow key={r.label} {...r} />
                      ))}
                    </div>
                    {measureRows.length > 0 && (
                      <div>
                        <p className="border-b border-dark-3/20 pb-2 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:pt-0">
                          {labels.measuresTitle}
                        </p>
                        {measureRows.map((r) => (
                          <DetailRow key={r.label} {...r} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default MilestoneSlide;
