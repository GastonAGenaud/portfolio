'use client';
import { Routes } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';

interface Props {
  routes: Routes;
  labels: {
    title: string;
    subtitle: string;
    routes: string;
    km: string;
    hours: string;
    elev: string;
  };
}

const RoutesCard = ({ routes, labels }: Props) => {
  const stats = [
    { value: routes.count, label: labels.routes },
    { value: routes.totalKm, label: labels.km },
    { value: routes.totalHours, label: labels.hours },
    { value: routes.elevGain.toLocaleString(), label: labels.elev },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon icon="tabler:route" width="18" />
        </span>
        <div>
          <h3 className="font-serif text-xl leading-tight text-dark-1">{labels.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">
            {labels.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-mono text-xl font-semibold text-dark-1 sm:text-2xl">{s.value}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-dark-3">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-dark-3/20 pt-4 sm:grid-cols-3">
        {routes.shapes.map((s) => (
          <div
            key={s.date}
            className="group/route relative aspect-square rounded-lg border border-white/[0.05] bg-bg/40 p-1.5"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
              <path
                d={s.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="pointer-events-none absolute bottom-1 right-1.5 font-mono text-[9px] text-dark-3">
              {s.km}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesCard;
