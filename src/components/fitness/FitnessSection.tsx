'use client';
import { useFitnessData } from '@/lib/content/fitness';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ActivityCard from './ActivityCard';
import BloodPressureCard from './BloodPressureCard';
import CoachCredit from './CoachCredit';
import ComparisonView from './ComparisonView';
import MeasurementsCard from './MeasurementsCard';
import MilestoneCarousel from './MilestoneCarousel';
import TrendChart from './TrendChart';
import VitalsPanel from './VitalsPanel';

const daysBetween = (a: string, b: string) => {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round(
    (new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime()) / 86400000
  );
};

const FitnessSection = () => {
  const { t } = useTranslation();
  const tk = tokens.fitnessSectionType;
  const {
    locale,
    localize,
    baseline,
    milestones,
    dailySeries,
    bpSeries,
    bloodPanel,
    nutritionProtocol,
    comparison,
    measurements,
    activity,
    nutritionLog,
    coach,
  } = useFitnessData();

  const [active, setActive] = useState(0);

  const lastRealIndex = useMemo(
    () => milestones.map((m) => !m.isGoal).lastIndexOf(true),
    [milestones]
  );
  const latest = milestones[lastRealIndex] ?? milestones[0];

  const heroStats = useMemo(() => {
    const kgLost = baseline.weight - (latest.weight ?? baseline.weight);
    const fatDown = baseline.bodyFatPct - (latest.bodyFatPct ?? baseline.bodyFatPct);
    const days = daysBetween(milestones[0].date, latest.date);
    return [
      { value: `−${kgLost.toFixed(1)}`, unit: 'kg', label: t(tk.hero.lost) },
      { value: `−${fatDown.toFixed(1)}`, unit: 'pp', label: t(tk.hero.fatDown) },
      { value: `${latest.musclePct ?? 71.8}`, unit: '%', label: t(tk.hero.muscleUp) },
      { value: `${days}`, unit: '', label: t(tk.hero.days) },
    ];
  }, [baseline, latest, milestones, t, tk]);

  const slideLabels = {
    weight: t(tk.metrics.weight),
    bodyFat: t(tk.metrics.bodyFat),
    muscle: t(tk.metrics.muscle),
    lean: t(tk.metrics.lean),
    muscleMass: t(tk.metrics.muscleMass),
    skeletal: t(tk.metrics.skeletal),
    visceral: t(tk.metrics.visceral),
    restingHr: t(tk.metrics.restingHr),
    bmi: t(tk.metrics.bmi),
    vo2: t(tk.metrics.vo2),
    measuresTitle: t(tk.measures.title),
    chest: t(tk.measures.chest),
    waist: t(tk.measures.waist),
    hip: t(tk.measures.hip),
    arm: t(tk.measures.arm),
    details: t(tk.details),
    hideDetails: t(tk.hideDetails),
    vsBaseline: t(tk.vsBaseline),
    target: t(tk.target),
    photoPlaceholder: t(tk.photoPlaceholder),
  };

  return (
    <div className="space-y-12">
      {/* header */}
      <div>
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <Icon icon="ph:crown-fill" width="15" />
          {t(tk.eyebrow)}
        </span>
        <h2 className="mt-3 font-serif text-4xl tracking-tight text-dark-1 sm:text-5xl">
          {t(tk.title)}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text sm:text-base">
          {t(tk.subtitle)}
        </p>
      </div>

      {/* hero stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {heroStats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/[0.06] bg-bg-secondary/40 px-4 py-4 text-center"
          >
            <p className="font-mono text-2xl font-semibold text-dark-1 sm:text-3xl">
              {s.value}
              {s.unit && <span className="ml-0.5 text-sm text-dark-3">{s.unit}</span>}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dark-3">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* carousel (draggable + snap) */}
      <MilestoneCarousel
        milestones={milestones}
        locale={locale}
        baseline={baseline}
        localize={localize}
        labels={slideLabels}
        dragHint={t(tk.dragHint)}
        onActiveChange={setActive}
      />

      {/* comparison */}
      <ComparisonView
        comparison={comparison}
        locale={locale}
        labels={{
          title: t(tk.compare.title),
          subtitle: t(tk.compare.subtitle),
          then: t(tk.compare.then),
          now: t(tk.compare.now),
          gains: t(tk.compare.gains),
          weight: t(tk.metrics.weight),
          bodyFat: t(tk.metrics.bodyFat),
          visceral: t(tk.metrics.visceral),
          muscle: t(tk.metrics.muscle),
          bp: t(tk.bp.title),
        }}
      />

      {/* measurements + activity */}
      <div className="grid gap-5 lg:grid-cols-2">
        <MeasurementsCard
          data={measurements}
          labels={{
            title: t(tk.measureTrend.title),
            subtitle: t(tk.measureTrend.subtitle),
            waist: t(tk.measures.waist),
            hip: t(tk.measures.hip),
            chest: t(tk.measures.chest),
            bicep: t(tk.measures.arm),
          }}
        />
        <ActivityCard
          activity={activity}
          locale={locale}
          labels={{
            title: t(tk.activity.title),
            subtitle: t(tk.activity.subtitle),
            strength: t(tk.activity.strength),
            minutes: t(tk.activity.minutes),
            walked: t(tk.activity.walked),
            energy: t(tk.activity.energy),
            steps: t(tk.activity.steps),
            strengthLabel: t(tk.activity.strengthLabel),
            cyclingLabel: t(tk.activity.cyclingLabel),
          }}
        />
      </div>

      {/* trend + blood pressure */}
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <TrendChart
          series={dailySeries}
          highlightDate={milestones[active]?.date}
          labels={{
            title: t(tk.trend.title),
            weight: t(tk.trend.weight),
            bodyFat: t(tk.trend.bodyFat),
          }}
          locale={locale}
        />
        <BloodPressureCard
          series={bpSeries}
          labels={{
            title: t(tk.bp.title),
            subtitle: t(tk.bp.subtitle),
            latest: t(tk.bp.latest),
            average: t(tk.bp.average),
            restingHr: t(tk.bp.restingHr),
          }}
        />
      </div>

      {/* bloodwork + nutrition */}
      <VitalsPanel
        blood={{
          title: t(tk.blood.title),
          subtitle: t(tk.blood.subtitle),
          disclaimer: t(tk.blood.disclaimer),
          markers: bloodPanel.markers.map((mk) => ({
            label: localize(mk.label),
            value: mk.value,
            ref: mk.ref,
            status: mk.status,
          })),
        }}
        nutrition={{
          title: t(tk.nutrition.title),
          rows: [
            { label: t(tk.nutrition.kcal), value: nutritionProtocol.kcal },
            { label: t(tk.nutrition.protein), value: localize(nutritionProtocol.protein) },
            { label: t(tk.nutrition.carbs), value: localize(nutritionProtocol.carbs) },
            { label: t(tk.nutrition.fat), value: localize(nutritionProtocol.fat) },
            { label: t(tk.nutrition.fiber), value: nutritionProtocol.fiber },
            { label: t(tk.nutrition.steps), value: nutritionProtocol.steps },
            {
              label: t(tk.nutrition.logged),
              value: `${nutritionLog.days} d · ${nutritionLog.kcal} kcal · ${nutritionLog.protein} g P`,
            },
          ],
        }}
      />

      {/* coach credit + thanks */}
      <CoachCredit
        coach={coach}
        labels={{ label: t(tk.coach.label), thanks: t(tk.coach.thanks) }}
      />
    </div>
  );
};

export default FitnessSection;
