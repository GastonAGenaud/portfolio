'use client';
import clsx from 'clsx';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  /** Signed delta vs baseline (already computed). */
  delta?: number;
  /** Whether a positive delta is the "good" direction (muscle up = true). */
  positiveIsGood?: boolean;
  deltaUnit?: string;
  size?: 'lg' | 'sm';
  className?: string;
}

const StatMetric = ({
  label,
  value,
  unit,
  delta,
  positiveIsGood = false,
  deltaUnit = '',
  size = 'sm',
  className,
}: Props) => {
  const hasDelta = typeof delta === 'number' && Math.abs(delta) > 0.001;
  const isGood = hasDelta
    ? positiveIsGood
      ? (delta as number) > 0
      : (delta as number) < 0
    : false;

  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--gk-muted)]">
        {label}
      </span>
      <span
        className={clsx(
          'font-mono font-semibold leading-none text-[var(--gk-marble)]',
          size === 'lg' ? 'text-4xl sm:text-5xl mt-2' : 'text-2xl mt-1.5'
        )}
      >
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-[var(--gk-muted)]">
            {unit}
          </span>
        )}
      </span>
      {hasDelta && (
        <span
          className={clsx(
            'mt-1.5 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-mono',
            isGood
              ? 'bg-[var(--gk-teal-soft)] text-[var(--gk-teal)]'
              : 'bg-white/5 text-[var(--gk-muted)]'
          )}
        >
          {(delta as number) > 0 ? '▲' : '▼'}{' '}
          {Math.abs(delta as number).toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })}
          {deltaUnit}
        </span>
      )}
    </div>
  );
};

export default StatMetric;
