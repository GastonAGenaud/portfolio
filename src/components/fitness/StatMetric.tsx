'use client';
import clsx from 'clsx';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
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
  const hasDelta = typeof delta === 'number' && Math.abs(delta) > 0.05;
  const isGood = hasDelta
    ? positiveIsGood
      ? (delta as number) > 0
      : (delta as number) < 0
    : false;

  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dark-3">
        {label}
      </span>
      <span
        className={clsx(
          'font-lexend font-semibold leading-none text-dark-1',
          size === 'lg' ? 'mt-2 text-4xl sm:text-5xl' : 'mt-1.5 text-2xl'
        )}
      >
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-dark-3">{unit}</span>
        )}
      </span>
      {hasDelta && (
        <span
          className={clsx(
            'mt-2 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px]',
            isGood
              ? 'bg-accent-light text-accent'
              : 'bg-white/5 text-dark-3'
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
