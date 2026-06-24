'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  <div className="flex items-baseline justify-between gap-3 border-b border-dark-3/20 py-1.5">
    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
      {label}
    </span>
    <span className="font-lexend text-sm text-dark-1">{value}</span>
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

  const rows: { label: string; value: string }[] = [];
  if (typeof m.leanKg === 'number') rows.push({ label: labels.lean, value: `${m.leanKg} kg` });
  if (typeof m.muscleKg === 'number') rows.push({ label: labels.muscleMass, value: `${m.muscleKg} kg` });
  if (typeof m.skeletalKg === 'number') rows.push({ label: labels.skeletal, value: `${m.skeletalKg} kg` });
  if (typeof m.visceral === 'number') rows.push({ label: labels.visceral, value: `${m.visceral}` });
  if (typeof m.restingHr === 'number') rows.push({ label: labels.restingHr, value: `${m.restingHr} bpm` });
  if (typeof m.bmi === 'number') rows.push({ label: labels.bmi, value: `${m.bmi}` });
  if (typeof m.vo2 === 'number') rows.push({ label: labels.vo2, value: `${m.vo2}` });

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      {/* DATA */}
      <div className="relative order-2 lg:order-1">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-14 -left-1 select-none font-lexend text-[6rem] font-bold leading-none text-accent opacity-[0.06] sm:-top-20 sm:text-[8rem]"
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
            {(rows.length > 0 || m.measures) && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity duration-200 hover:opacity-70 focus:outline-none"
              >
                {open ? labels.hideDetails : labels.details}
                <Icon icon="tabler:chevron-down" className={clsx('duration-200', open && 'rotate-180')} width="14" />
              </button>
            )}
          </div>

          {open && (rows.length > 0 || m.measures) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 grid gap-x-8 sm:grid-cols-2"
            >
              <div>
                {rows.map((r) => (
                  <DetailRow key={r.label} {...r} />
                ))}
              </div>
              {m.measures && (
                <div>
                  <p className="border-b border-dark-3/20 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {labels.measuresTitle}
                  </p>
                  {typeof m.measures.chest === 'number' && <DetailRow label={labels.chest} value={`${m.measures.chest} cm`} />}
                  {typeof m.measures.waist === 'number' && <DetailRow label={labels.waist} value={`${m.measures.waist} cm`} />}
                  {typeof m.measures.hip === 'number' && <DetailRow label={labels.hip} value={`${m.measures.hip} cm`} />}
                  {typeof m.measures.arm === 'number' && <DetailRow label={labels.arm} value={`${m.measures.arm} cm`} />}
                </div>
              )}
            </motion.div>
          )}
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
    </div>
  );
};

export default MilestoneSlide;
