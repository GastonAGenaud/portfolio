'use client';
import { BloodPressurePoint } from '@/lib/types/fitness';

import { avg } from '@/lib/content/fitness';

import { Icon } from '@iconify/react';

interface Props {
  series: BloodPressurePoint[];
  labels: {
    title: string;
    subtitle: string;
    latest: string;
    average: string;
    restingHr: string;
  };
}

const SPARK_W = 200;
const SPARK_H = 48;

const BloodPressureCard = ({ series, labels }: Props) => {
  const latest = series[series.length - 1];
  const sys = series.map((p) => p.sys);
  const dia = series.map((p) => p.dia);
  const pulses = series.filter((p) => typeof p.pulse === 'number').map((p) => p.pulse as number);

  const avgSys = avg(sys);
  const avgDia = avg(dia);
  const avgPulse = avg(pulses);

  // systolic sparkline (trends down → improvement)
  const min = Math.min(...sys) - 4;
  const max = Math.max(...sys) + 4;
  const n = sys.length;
  const px = (i: number) => (n > 1 ? (i / (n - 1)) * (SPARK_W - 6) + 3 : SPARK_W / 2);
  const py = (v: number) => SPARK_H - 4 - ((v - min) / (max - min)) * (SPARK_H - 8);
  const path = sys.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon icon="tabler:heartbeat" width="19" />
        </span>
        <div>
          <h3 className="font-serif text-xl leading-tight text-dark-1">{labels.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">
            {labels.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-end gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
            {labels.latest}
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold text-dark-1">
            {latest.sys}
            <span className="text-dark-3">/{latest.dia}</span>
            <span className="ml-1 text-xs font-normal text-dark-3">mmHg</span>
          </p>
        </div>
        <svg viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} className="h-12 flex-1" preserveAspectRatio="none">
          <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <circle cx={px(n - 1)} cy={py(sys[n - 1])} r="2.5" fill="var(--color-accent)" />
        </svg>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dark-3/20 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
            {labels.average}
          </p>
          <p className="mt-1 font-mono text-lg text-dark-1">
            {avgSys}/{avgDia}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3">
            {labels.restingHr}
          </p>
          <p className="mt-1 font-mono text-lg text-dark-1">
            {avgPulse}
            <span className="ml-1 text-xs font-normal text-dark-3">bpm</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureCard;
