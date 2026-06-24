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
  goalEta: string;
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
  <div className="flex items-baseline justify-between gap-3 border-b border-[var(--gk-border)] py-1.5">
    <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--gk-muted)]">
      {label}
    </span>
    <span className="font-mono text-sm text-[var(--gk-marble)]">{value}</span>
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

  const detailRows: { label: string; value: string }[] = [];
  if (typeof m.leanKg === 'number')
    detailRows.push({ label: labels.lean, value: `${m.leanKg} kg` });
  if (typeof m.muscleKg === 'number')
    detailRows.push({ label: labels.muscleMass, value: `${m.muscleKg} kg` });
  if (typeof m.skeletalKg === 'number')
    detailRows.push({ label: labels.skeletal, value: `${m.skeletalKg} kg` });
  if (typeof m.visceral === 'number')
    detailRows.push({ label: labels.visceral, value: `${m.visceral}` });
  if (typeof m.restingHr === 'number')
    detailRows.push({ label: labels.restingHr, value: `${m.restingHr} bpm` });
  if (typeof m.bmi === 'number')
    detailRows.push({ label: labels.bmi, value: `${m.bmi}` });
  if (typeof m.vo2 === 'number')
    detailRows.push({ label: labels.vo2, value: `${m.vo2}` });

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      {/* ---------- DATA ---------- */}
      <div className="relative order-2 lg:order-1">
        {/* giant index */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-2 select-none font-mono text-[7rem] font-bold leading-none text-[var(--gk-bronze)] opacity-10 sm:-top-20 sm:text-[9rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-[var(--gk-bronze)]">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {m.tag && (
              <span className="rounded-full bg-[var(--gk-bronze-soft)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-[var(--gk-bronze)]">
                {localize(m.tag)}
              </span>
            )}
          </div>

          <h2 className="text-3xl font-semibold text-[var(--gk-marble)] sm:text-4xl">
            {localize(m.title)}
          </h2>
          <p className="mt-1 font-mono text-sm text-[var(--gk-muted)]">
            {m.isGoal ? `${labels.goalEta}: ` : ''}
            {formatDate(m.date, locale)}
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--gk-muted)]">
            {localize(m.note)}
          </p>

          {/* metric trio */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            <StatMetric
              label={m.isGoal ? `${labels.target} · ${labels.weight}` : labels.weight}
              value={m.weight ?? '—'}
              unit="kg"
              size="lg"
              delta={m.isGoal ? undefined : weightDelta}
              positiveIsGood={false}
              deltaUnit=" kg"
            />
            <StatMetric
              label={m.isGoal ? `${labels.target} · ${labels.bodyFat}` : labels.bodyFat}
              value={m.bodyFatPct ?? '—'}
              unit="%"
              size="lg"
              delta={m.isGoal ? undefined : fatDelta}
              positiveIsGood={false}
              deltaUnit=" pp"
            />
            <StatMetric
              label={labels.muscle}
              value={muscleValue}
              unit={muscleUnit}
              size="lg"
            />
          </div>

          {/* baseline reference + details toggle */}
          <div className="mt-5 flex items-center gap-4">
            {hasDeltas && (
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--gk-muted)]">
                {labels.vsBaseline}
              </span>
            )}
            {(detailRows.length > 0 || m.measures) && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-[var(--gk-bronze)] duration-200 hover:opacity-80 focus:outline-none"
              >
                {open ? labels.hideDetails : labels.details}
                <Icon
                  icon="ph:caret-down"
                  className={clsx('duration-200', open && 'rotate-180')}
                  width="14"
                />
              </button>
            )}
          </div>

          {open && (detailRows.length > 0 || m.measures) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 grid gap-x-8 gap-y-0 sm:grid-cols-2"
            >
              <div>
                {detailRows.map((row) => (
                  <DetailRow key={row.label} {...row} />
                ))}
              </div>
              {m.measures && (
                <div>
                  <p className="border-b border-[var(--gk-border)] py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--gk-bronze)]">
                    {labels.measuresTitle}
                  </p>
                  {typeof m.measures.chest === 'number' && (
                    <DetailRow label={labels.chest} value={`${m.measures.chest} cm`} />
                  )}
                  {typeof m.measures.waist === 'number' && (
                    <DetailRow label={labels.waist} value={`${m.measures.waist} cm`} />
                  )}
                  {typeof m.measures.hip === 'number' && (
                    <DetailRow label={labels.hip} value={`${m.measures.hip} cm`} />
                  )}
                  {typeof m.measures.arm === 'number' && (
                    <DetailRow label={labels.arm} value={`${m.measures.arm} cm`} />
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* ---------- FIGURE ---------- */}
      <div className="order-1 flex items-center justify-center lg:order-2">
        <div
          className={clsx(
            'relative aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-2xl border lg:max-w-[360px]',
            'border-[var(--gk-border)] bg-[var(--gk-surface)]'
          )}
        >
          {m.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/fitness/${m.image}`}
              alt={localize(m.title)}
              className="h-full w-full object-cover"
            />
          ) : (
            <BodySilhouette goal={m.isGoal} className="p-2" />
          )}

          {/* bottom gradient + caption */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
          {!m.image && (
            <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--gk-muted)]">
              {labels.photoPlaceholder}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestoneSlide;
