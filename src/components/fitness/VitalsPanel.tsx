'use client';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface Marker {
  label: string;
  value: string;
  ref: string;
  status: 'good' | 'watch';
}

interface Props {
  blood: {
    title: string;
    subtitle: string;
    disclaimer: string;
    markers: Marker[];
  };
  nutrition: {
    title: string;
    rows: { label: string; value: string }[];
  };
}

const VitalsPanel = ({ blood, nutrition }: Props) => {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      {/* Bloodwork */}
      <div className="rounded-3xl border border-[var(--gk-border)] bg-[var(--gk-glass)] p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gk-teal-soft)] text-[var(--gk-teal)]">
            <Icon icon="healthicons:blood-drop" width="20" />
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-tight text-[var(--gk-marble)]">
              {blood.title}
            </h3>
            <p className="font-mono text-[11px] text-[var(--gk-muted)]">
              {blood.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3">
          {blood.markers.map((mk) => (
            <div key={mk.label} className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[var(--gk-muted)]">
                <span
                  className={clsx(
                    'h-1.5 w-1.5 rounded-full',
                    mk.status === 'good'
                      ? 'bg-[var(--gk-teal)]'
                      : 'bg-[var(--gk-bronze)]'
                  )}
                />
                {mk.label}
              </span>
              <span className="mt-1 font-mono text-base text-[var(--gk-marble)]">
                {mk.value}
              </span>
              <span className="font-mono text-[10px] text-[var(--gk-muted)]">
                ref {mk.ref}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-[var(--gk-border)] pt-3 text-[11px] leading-relaxed text-[var(--gk-muted)]">
          {blood.disclaimer}
        </p>
      </div>

      {/* Fuel protocol */}
      <div className="rounded-3xl border border-[var(--gk-border)] bg-[var(--gk-glass)] p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gk-bronze-soft)] text-[var(--gk-bronze)]">
            <Icon icon="game-icons:knife-fork" width="18" />
          </span>
          <h3 className="text-lg font-semibold text-[var(--gk-marble)]">
            {nutrition.title}
          </h3>
        </div>

        <dl className="space-y-0">
          {nutrition.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-3 border-b border-[var(--gk-border)] py-2 last:border-b-0"
            >
              <dt className="text-[11px] uppercase tracking-[0.12em] text-[var(--gk-muted)]">
                {row.label}
              </dt>
              <dd className="text-right font-mono text-sm text-[var(--gk-marble)]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default VitalsPanel;
