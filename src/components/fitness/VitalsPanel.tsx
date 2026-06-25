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
  blood: { title: string; subtitle: string; disclaimer: string; markers: Marker[] };
  nutrition: { title: string; rows: { label: string; value: string }[] };
}

const VitalsPanel = ({ blood, nutrition }: Props) => {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
            <Icon icon="tabler:droplet" width="18" />
          </span>
          <div>
            <h3 className="font-serif text-xl leading-tight text-dark-1">{blood.title}</h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{blood.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3">
          {blood.markers.map((mk) => (
            <div key={mk.label} className="flex flex-col">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-dark-3">
                <span className={clsx('h-1.5 w-1.5 rounded-full', mk.status === 'good' ? 'bg-accent' : 'bg-dark-2')} />
                {mk.label}
              </span>
              <span className="mt-1 font-mono text-base text-dark-1">{mk.value}</span>
              <span className="font-mono text-[9px] text-dark-3">ref {mk.ref}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-dark-3/20 pt-3 text-[11px] leading-relaxed text-dark-3">
          {blood.disclaimer}
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
            <Icon icon="tabler:flame" width="18" />
          </span>
          <h3 className="font-serif text-xl text-dark-1">{nutrition.title}</h3>
        </div>
        <dl>
          {nutrition.rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-dark-3/20 py-2 last:border-b-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{row.label}</dt>
              <dd className="text-right font-mono text-sm text-dark-1">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default VitalsPanel;
