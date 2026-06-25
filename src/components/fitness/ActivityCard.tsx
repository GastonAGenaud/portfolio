'use client';
import { Activity, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';

interface Props {
  activity: Activity;
  locale: Locale;
  labels: {
    title: string;
    subtitle: string;
    strength: string;
    minutes: string;
    walked: string;
    energy: string;
    steps: string;
    strengthLabel: string;
    cyclingLabel: string;
  };
}

const shortDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
  });
};

const ActivityCard = ({ activity, locale, labels }: Props) => {
  const stats = [
    { value: activity.strengthSessions, label: labels.strength },
    { value: activity.totalMinutes, label: labels.minutes },
    { value: activity.walkKm, label: labels.walked },
    { value: activity.avgSteps.toLocaleString(), label: labels.steps },
    { value: activity.activeKcal.toLocaleString(), label: labels.energy },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon icon="tabler:activity-heartbeat" width="18" />
        </span>
        <div>
          <h3 className="font-serif text-xl leading-tight text-dark-1">{labels.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">{labels.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="min-w-0 text-center">
            <p className="whitespace-nowrap font-mono text-base font-semibold tabular-nums text-dark-1 sm:text-lg">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-dark-3">{s.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 space-y-1 border-t border-dark-3/20 pt-3">
        {activity.sessions.map((s) => (
          <li key={s.date} className="flex items-center gap-3 py-1 font-mono text-[11px]">
            <Icon
              icon={s.type === 'strength' ? 'tabler:barbell' : 'tabler:bike'}
              width="14"
              className="shrink-0 text-accent"
            />
            <span className="w-12 shrink-0 text-dark-3">{shortDate(s.date, locale)}</span>
            <span className="w-20 shrink-0 text-dark-2">
              {s.type === 'strength' ? labels.strengthLabel : labels.cyclingLabel}
            </span>
            <span className="text-dark-3">{s.minutes}′</span>
            <span className="ml-auto text-dark-2">{s.kcal} kcal</span>
            <span className="w-16 shrink-0 text-right text-dark-3">♥ {s.hrAvg}/{s.hrMax}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityCard;
