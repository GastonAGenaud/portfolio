'use client';
import { Locale, TrendPoint } from '@/lib/types/fitness';

interface Props {
  series: TrendPoint[];
  highlightDate?: string;
  labels: { title: string; weight: string; bodyFat: string };
  locale: Locale;
}

const W = 720;
const H = 240;
const PAD = { t: 26, r: 16, b: 34, l: 16 };

const niceRange = (vals: number[]) => {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pad = (max - min) * 0.18 || 1;
  return { min: min - pad, max: max + pad };
};

const TrendChart = ({ series, highlightDate, labels, locale }: Props) => {
  const n = series.length;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const wRange = niceRange(series.map((p) => p.weight));
  const fRange = niceRange(series.map((p) => p.bodyFat));

  const x = (i: number) => PAD.l + (n > 1 ? (i / (n - 1)) * innerW : innerW / 2);
  const yW = (v: number) => PAD.t + innerH - ((v - wRange.min) / (wRange.max - wRange.min)) * innerH;
  const yF = (v: number) => PAD.t + innerH - ((v - fRange.min) / (fRange.max - fRange.min)) * innerH;

  const line = (acc: (p: TrendPoint) => number, sc: (v: number) => number) =>
    series.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${sc(acc(p)).toFixed(1)}`).join(' ');

  const weightPath = line((p) => p.weight, yW);
  const fatPath = line((p) => p.bodyFat, yF);
  const areaPath = `${weightPath} L${x(n - 1)} ${PAD.t + innerH} L${x(0)} ${PAD.t + innerH} Z`;

  let hi = series.findIndex((p) => p.date === highlightDate);
  if (hi < 0) hi = n - 1;
  const anchor: 'start' | 'middle' | 'end' = hi === 0 ? 'start' : hi === n - 1 ? 'end' : 'middle';

  const fmt = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-2xl text-dark-1">{labels.title}</h3>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-dark-1">
            <span className="h-0.5 w-4 rounded-full bg-accent" />
            {labels.weight}
          </span>
          <span className="flex items-center gap-1.5 text-dark-3">
            <span className="h-0 w-4 border-t border-dashed border-dark-2" />
            {labels.bodyFat}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={labels.title}>
        <defs>
          <linearGradient id="ft-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(231,229,228,0.14)" />
            <stop offset="100%" stopColor="rgba(231,229,228,0)" />
          </linearGradient>
        </defs>

        <line x1={x(hi)} y1={PAD.t - 8} x2={x(hi)} y2={PAD.t + innerH} stroke="var(--color-dark-3)" strokeDasharray="3 4" strokeWidth="1" opacity="0.6" />

        <path d={areaPath} fill="url(#ft-area)" />
        <path d={fatPath} fill="none" stroke="var(--color-dark-2)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
        <path d={weightPath} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />

        <circle cx={x(hi)} cy={yW(series[hi].weight)} r="5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="2" />
        <circle cx={x(hi)} cy={yF(series[hi].bodyFat)} r="4" fill="var(--color-dark-2)" stroke="var(--color-bg)" strokeWidth="2" />

        <text x={x(hi)} y={yW(series[hi].weight) - 12} textAnchor={anchor} className="fill-[var(--color-dark-1)] font-lexend" fontSize="13">
          {series[hi].weight} kg
        </text>
        <text x={x(hi)} y={yF(series[hi].bodyFat) + 22} textAnchor={anchor} className="fill-[var(--color-dark-3)] font-lexend" fontSize="12">
          {series[hi].bodyFat}%
        </text>

        <text x={x(0)} y={H - 10} textAnchor="start" className="fill-[var(--color-dark-3)] font-mono" fontSize="11">{fmt(series[0].date)}</text>
        <text x={x(n - 1)} y={H - 10} textAnchor="end" className="fill-[var(--color-dark-3)] font-mono" fontSize="11">{fmt(series[n - 1].date)}</text>
      </svg>
    </div>
  );
};

export default TrendChart;
