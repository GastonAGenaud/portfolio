'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface Props {
  milestones: FitnessMilestone[];
  index: number;
  setIndex: (i: number) => void;
  locale: Locale;
}

const shortDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'short' }
  );
};

const TimelineScrubber = ({ milestones, index, setIndex, locale }: Props) => {
  const total = milestones.length;
  const progress = total > 1 ? (index / (total - 1)) * 100 : 0;

  return (
    <div className="gk-hide-scrollbar overflow-x-auto pb-1">
      <div className="relative mx-auto min-w-[560px] px-2 pt-4">
        {/* base line */}
        <div className="absolute left-2 right-2 top-[26px] h-px bg-[var(--gk-border)]" />
        {/* progress line */}
        <div
          className="absolute left-2 top-[26px] h-px bg-[var(--gk-bronze)] duration-500"
          style={{ width: `${progress}%` }}
        />

        <ol className="relative flex items-start justify-between">
          {milestones.map((m, i) => {
            const active = i === index;
            const done = i < index;
            return (
              <li key={m.id} className="flex flex-1 flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={shortDate(m.date, locale)}
                  aria-current={active}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <span
                    className={clsx(
                      'flex h-3.5 w-3.5 items-center justify-center rounded-full border duration-200',
                      active
                        ? 'scale-125 border-[var(--gk-bronze)] bg-[var(--gk-bronze)]'
                        : done
                        ? 'border-[var(--gk-bronze)] bg-[var(--gk-bronze-dim)]'
                        : 'border-[var(--gk-border)] bg-[var(--gk-surface)] group-hover:border-[var(--gk-bronze)]'
                    )}
                  >
                    {m.isGoal && (
                      <Icon
                        icon="ph:flag-banner-fill"
                        width="9"
                        className={active ? 'text-[var(--gk-bg)]' : 'text-[var(--gk-bronze)]'}
                      />
                    )}
                  </span>
                  <span
                    className={clsx(
                      'mt-2 whitespace-nowrap font-mono text-[10px] tracking-wide duration-200',
                      active
                        ? 'text-[var(--gk-bronze)]'
                        : 'text-[var(--gk-muted)] group-hover:text-[var(--gk-marble)]'
                    )}
                  >
                    {shortDate(m.date, locale)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default TimelineScrubber;
