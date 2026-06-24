'use client';
import { Comparison, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';

import BodySilhouette from './BodySilhouette';

interface Labels {
  title: string;
  subtitle: string;
  then: string;
  now: string;
  gains: string;
  weight: string;
  bodyFat: string;
  visceral: string;
  muscle: string;
}

interface Props {
  comparison: Comparison;
  locale: Locale;
  labels: Labels;
}

const fmtDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );
};

const Stat = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-[var(--gk-border)] py-2 last:border-b-0">
    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--gk-muted)]">
      {label}
    </span>
    <span className="font-mono text-base text-[var(--gk-marble)]">
      {value}
      {unit && <span className="ml-0.5 text-xs text-[var(--gk-muted)]">{unit}</span>}
    </span>
  </div>
);

const Column = ({
  badge,
  date,
  accent,
  dim,
  children,
}: {
  badge: string;
  date: string;
  accent: 'muted' | 'bronze';
  dim?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <div className="mb-3 flex items-center justify-between gap-2">
      <span
        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={
          accent === 'bronze'
            ? { background: 'var(--gk-bronze-soft)', color: 'var(--gk-bronze)' }
            : { background: 'rgba(255,255,255,0.06)', color: 'var(--gk-muted)' }
        }
      >
        {badge}
      </span>
      <span className="font-mono text-[11px] text-[var(--gk-muted)]">{date}</span>
    </div>
    <div className="relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[var(--gk-border)] bg-[var(--gk-surface)]">
      <BodySilhouette className="p-2" dim={dim} />
    </div>
    {children}
  </div>
);

const GainChip = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-2 rounded-full bg-[var(--gk-teal-soft)] px-3 py-1.5">
    <span className="font-mono text-sm font-semibold text-[var(--gk-teal)]">
      {value}
    </span>
    <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--gk-muted)]">
      {label}
    </span>
  </div>
);

const ComparisonView = ({ comparison, locale, labels }: Props) => {
  const { then, now } = comparison;
  const weightDelta = +(now.weight - then.weight).toFixed(1);
  const fatDelta = +(now.bodyFatPct - then.bodyFatPct).toFixed(1);
  const visceralDelta =
    typeof now.visceral === 'number' && typeof then.visceral === 'number'
      ? now.visceral - then.visceral
      : undefined;

  return (
    <div className="rounded-3xl border border-[var(--gk-border)] bg-[var(--gk-glass)] p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[var(--gk-marble)]">
          {labels.title}
        </h3>
        <p className="font-mono text-[11px] text-[var(--gk-muted)]">
          {labels.subtitle}
        </p>
      </div>

      {/* then vs now */}
      <div className="relative grid grid-cols-2 gap-4 sm:gap-8">
        <Column badge={labels.then} date={fmtDate(then.date, locale)} accent="muted" dim>
          <Stat label={labels.weight} value={then.weight} unit="kg" />
          <Stat label={labels.bodyFat} value={then.bodyFatPct} unit="%" />
          {typeof then.visceral === 'number' && (
            <Stat label={labels.visceral} value={then.visceral} />
          )}
        </Column>

        {/* center arrow */}
        <div className="pointer-events-none absolute left-1/2 top-[42%] z-10 -translate-x-1/2 -translate-y-1/2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gk-border)] bg-[var(--gk-bg)] text-[var(--gk-bronze)]">
            <Icon icon="ph:arrow-right" width="16" />
          </span>
        </div>

        <Column badge={labels.now} date={fmtDate(now.date, locale)} accent="bronze">
          <Stat label={labels.weight} value={now.weight} unit="kg" />
          <Stat label={labels.bodyFat} value={now.bodyFatPct} unit="%" />
          {typeof now.visceral === 'number' && (
            <Stat label={labels.visceral} value={now.visceral} />
          )}
        </Column>
      </div>

      {/* gains */}
      <div className="mt-6 border-t border-[var(--gk-border)] pt-5">
        <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gk-bronze)]">
          {labels.gains}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <GainChip value={`${weightDelta} kg`} label={labels.weight} />
          <GainChip value={`${fatDelta} pp`} label={labels.bodyFat} />
          {typeof visceralDelta === 'number' && (
            <GainChip value={`${visceralDelta}`} label={labels.visceral} />
          )}
          {typeof now.musclePct === 'number' && (
            <GainChip value={`${now.musclePct}%`} label={labels.muscle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
