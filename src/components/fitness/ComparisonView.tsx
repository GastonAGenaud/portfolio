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
  bp: string;
}

interface Props {
  comparison: Comparison;
  locale: Locale;
  labels: Labels;
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

const Stat = ({ label, value, unit }: { label: string; value: string | number; unit?: string }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-dark-3/20 py-2 last:border-b-0">
    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{label}</span>
    <span className="font-mono text-base text-dark-1">
      {value}
      {unit && <span className="ml-0.5 text-xs text-dark-3">{unit}</span>}
    </span>
  </div>
);

const Column = ({
  badge,
  date,
  dim,
  children,
}: {
  badge: string;
  date: string;
  dim?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <div className="mb-3 flex items-center justify-between gap-2">
      <span className="rounded-full border border-dark-3/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        {badge}
      </span>
      <span className="font-mono text-[10px] text-dark-3">{date}</span>
    </div>
    <div className="relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-bg-secondary">
      <BodySilhouette className="p-3" dim={dim} />
    </div>
    {children}
  </div>
);

const Gain = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-2 rounded-full border border-dark-3/30 bg-accent-light px-3 py-1.5">
    <span className="font-mono text-sm font-semibold text-accent">{value}</span>
    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dark-3">{label}</span>
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
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="font-serif text-2xl text-dark-1">{labels.title}</h3>
        <p className="font-mono text-[11px] text-dark-3">{labels.subtitle}</p>
      </div>

      <div className="relative grid grid-cols-2 gap-4 sm:gap-8">
        <Column badge={labels.then} date={fmtDate(then.date, locale)} dim>
          <Stat label={labels.weight} value={then.weight} unit="kg" />
          <Stat label={labels.bodyFat} value={then.bodyFatPct} unit="%" />
          {typeof then.visceral === 'number' && <Stat label={labels.visceral} value={then.visceral} />}
          {then.bp && <Stat label={labels.bp} value={then.bp} />}
        </Column>

        <div className="pointer-events-none absolute left-1/2 top-[40%] z-10 -translate-x-1/2 -translate-y-1/2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-3/30 bg-bg text-accent">
            <Icon icon="tabler:arrow-right" width="16" />
          </span>
        </div>

        <Column badge={labels.now} date={fmtDate(now.date, locale)}>
          <Stat label={labels.weight} value={now.weight} unit="kg" />
          <Stat label={labels.bodyFat} value={now.bodyFatPct} unit="%" />
          {typeof now.visceral === 'number' && <Stat label={labels.visceral} value={now.visceral} />}
          {now.bp && <Stat label={labels.bp} value={now.bp} />}
        </Column>
      </div>

      <div className="mt-6 border-t border-dark-3/20 pt-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{labels.gains}</p>
        <div className="flex flex-wrap gap-2.5">
          <Gain value={`${weightDelta} kg`} label={labels.weight} />
          <Gain value={`${fatDelta} pp`} label={labels.bodyFat} />
          {typeof visceralDelta === 'number' && <Gain value={`${visceralDelta}`} label={labels.visceral} />}
          {typeof now.musclePct === 'number' && <Gain value={`${now.musclePct}%`} label={labels.muscle} />}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
