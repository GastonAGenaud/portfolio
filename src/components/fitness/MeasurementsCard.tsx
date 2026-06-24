'use client';
import { MeasurementPoint } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';

interface Props {
  data: MeasurementPoint[];
  labels: {
    title: string;
    subtitle: string;
    waist: string;
    hip: string;
    chest: string;
    bicep: string;
  };
}

const SPARK_W = 220;
const SPARK_H = 44;

const lastDefined = (data: MeasurementPoint[], key: keyof MeasurementPoint) => {
  for (let i = data.length - 1; i >= 0; i--) {
    const v = data[i][key];
    if (typeof v === 'number') return v;
  }
  return undefined;
};
const firstDefined = (data: MeasurementPoint[], key: keyof MeasurementPoint) => {
  for (let i = 0; i < data.length; i++) {
    const v = data[i][key];
    if (typeof v === 'number') return v;
  }
  return undefined;
};

const MeasurementsCard = ({ data, labels }: Props) => {
  const waists = data.map((d) => d.waist);
  const min = Math.min(...waists) - 3;
  const max = Math.max(...waists) + 3;
  const n = waists.length;
  const px = (i: number) => (n > 1 ? (i / (n - 1)) * (SPARK_W - 6) + 3 : SPARK_W / 2);
  const py = (v: number) => SPARK_H - 4 - ((v - min) / (max - min)) * (SPARK_H - 8);
  const path = waists.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');

  const waistDelta = +(waists[n - 1] - waists[0]).toFixed(1);

  const others = [
    { key: 'hip' as const, label: labels.hip },
    { key: 'chest' as const, label: labels.chest },
    { key: 'bicep' as const, label: labels.bicep },
  ]
    .map((o) => {
      const last = lastDefined(data, o.key);
      const first = firstDefined(data, o.key);
      if (typeof last !== 'number' || typeof first !== 'number') return null;
      return { label: o.label, last, delta: +(last - first).toFixed(1) };
    })
    .filter(Boolean) as { label: string; last: number; delta: number }[];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon icon="tabler:ruler-2" width="18" />
        </span>
        <div>
          <h3 className="font-serif text-xl leading-tight text-dark-1">{labels.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{labels.subtitle}</p>
        </div>
      </div>

      <div className="flex items-end gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">{labels.waist}</p>
          <p className="mt-1 font-mono text-3xl font-semibold text-dark-1">
            {waists[n - 1]}
            <span className="ml-1 text-xs font-normal text-dark-3">cm</span>
          </p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent-light px-2 py-0.5 font-mono text-[10px] text-accent">
            ▼ {Math.abs(waistDelta)} cm
          </span>
        </div>
        <svg viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} className="h-11 flex-1" preserveAspectRatio="none">
          <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <circle cx={px(n - 1)} cy={py(waists[n - 1])} r="2.5" fill="var(--color-accent)" />
        </svg>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-dark-3/20 pt-4">
        {others.map((o) => (
          <div key={o.label}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{o.label}</p>
            <p className="mt-1 font-mono text-base text-dark-1">
              {o.last}
              <span className="text-xs text-dark-3"> cm</span>
            </p>
            <p className="font-mono text-[10px] text-dark-3">
              {o.delta > 0 ? '+' : ''}
              {o.delta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeasurementsCard;
