'use client';
import { Locale, TrendPoint } from '@/lib/types/fitness';

import { useId } from 'react';

interface Props {
  series: TrendPoint[];
  highlightDate?: string;
  labels: { title: string; weight: string; bodyFat: string };
  locale: Locale;
}

const W = 720;
const H = 240;
const PAD = { t: 24, r: 16, b: 34, l: 16 };

const niceRange = (vals: number[]) => {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pad = (max - min) * 0.18 || 1;
  return { min: min - pad, max: max + pad };
};

const TrendChart = ({ series, highlightDate, labels, locale }: Props) => {
  const uid = useId().replace(/:/g, '');
  const n = series.length;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const wRange = niceRange(series.map((p) => p.weight));
  const fRange = niceRange(series.map((p) => p.bodyFat));

  const x = (i: number) => PAD.l + (n > 1 ? (i / (n - 1)) * innerW : innerW / 2);
  const yW = (v: number) =>
    PAD.t + innerH - ((v - wRange.min) / (wRange.max - wRange.min)) * innerH;
  const yF = (v: number) =>
    PAD.t + innerH - ((v - fRange.min) / (fRange.max - fRange.min)) * innerH;

  const line = (accessor: (p: TrendPoint) => number, scale: (v: number) => number) =>
    series
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${scale(accessor(p)).toFixed(1)}`)
      .join(' ');

  const weightPath = line((p) => p.weight, yW);
  const fatPath = line((p) => p.bodyFat, yF);
  const areaPath = `${weightPath} L${x(n - 1)} ${PAD.t + innerH} L${x(0)} ${PAD.t + innerH} Z`;

  let hi = series.findIndex((p) => p.date === highlightDate);
  if (hi < 0) hi = n - 1;

  // Keep highlighted value labels inside the chart at the extremes.
  const labelAnchor: 'start' | 'middle' | 'end' =
    hi === 0 ? 'start' : hi === n - 1 ? 'end' : 'middle';

  const fmt = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(
      locale === 'es' ? 'es-ES' : 'en-US',
      { day: 'numeric', month: 'short' }
    );
  };

  return (
    <div className="rounded-3xl border border-[var(--gk-border)] bg-[var(--gk-glass)] p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[var(--gk-marble)]">
          {labels.title}
        </h3>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-[var(--gk-bronze)]">
            <span className="h-2 w-2 rounded-full bg-[var(--gk-bronze)]" />
            {labels.weight}
          </span>
          <span className="flex items-center gap-1.5 text-[var(--gk-teal)]">
            <span className="h-2 w-2 rounded-full bg-[var(--gk-teal)]" />
            {labels.bodyFat}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={labels.title}>
        <defs>
          <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(224,170,78,0.22)" />
            <stop offset="100%" stopColor="rgba(224,170,78,0)" />
          </linearGradient>
        </defs>

        {/* highlight marker */}
        <line
          x1={x(hi)}
          y1={PAD.t - 6}
          x2={x(hi)}
          y2={PAD.t + innerH}
          stroke="var(--gk-muted)"
          strokeDasharray="3 4"
          strokeWidth="1"
          opacity="0.5"
        />

        <path d={areaPath} fill={`url(#area-${uid})`} />
        <path d={weightPath} fill="none" stroke="var(--gk-bronze)" strokeWidth="2.5" />
        <path d={fatPath} fill="none" stroke="var(--gk-teal)" strokeWidth="2.5" />

        {/* highlighted points */}
        <circle cx={x(hi)} cy={yW(series[hi].weight)} r="5" fill="var(--gk-bronze)" stroke="var(--gk-bg)" strokeWidth="2" />
        <circle cx={x(hi)} cy={yF(series[hi].bodyFat)} r="5" fill="var(--gk-teal)" stroke="var(--gk-bg)" strokeWidth="2" />

        {/* highlighted value labels */}
        <text
          x={x(hi)}
          y={yW(series[hi].weight) - 12}
          textAnchor={labelAnchor}
          className="fill-[var(--gk-bronze)] font-mono"
          fontSize="13"
        >
          {series[hi].weight} kg
        </text>
        <text
          x={x(hi)}
          y={yF(series[hi].bodyFat) + 22}
          textAnchor={labelAnchor}
          className="fill-[var(--gk-teal)] font-mono"
          fontSize="13"
        >
          {series[hi].bodyFat}%
        </text>

        {/* x axis: first / highlight / last */}
        <text x={x(0)} y={H - 10} textAnchor="start" className="fill-[var(--gk-muted)] font-mono" fontSize="11">
          {fmt(series[0].date)}
        </text>
        <text x={x(n - 1)} y={H - 10} textAnchor="end" className="fill-[var(--gk-muted)] font-mono" fontSize="11">
          {fmt(series[n - 1].date)}
        </text>
      </svg>
    </div>
  );
};

export default TrendChart;
