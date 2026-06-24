'use client';
import { useFitnessContent } from '@/lib/content/fitness';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ComparisonView from './ComparisonView';
import MilestoneCarousel from './MilestoneCarousel';
import TimelineScrubber from './TimelineScrubber';
import TrendChart from './TrendChart';
import VitalsPanel from './VitalsPanel';

const daysBetween = (a: string, b: string) => {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const da = new Date(ay, am - 1, ad).getTime();
  const db = new Date(by, bm - 1, bd).getTime();
  return Math.round((db - da) / 86400000);
};

const FitnessExperience = () => {
  const {
    t,
    locale,
    milestones,
    dailySeries,
    bloodPanel,
    nutritionProtocol,
    comparison,
    baseline,
    localize,
  } = useFitnessContent();
  const router = useRouter();
  const tk = tokens.fitness;

  // Story flows baseline → goal; the carousel opens on the first slide.
  const [index, setIndex] = useState(0);

  const lastRealIndex = useMemo(() => {
    const idx = milestones.map((m) => !m.isGoal).lastIndexOf(true);
    return idx >= 0 ? idx : 0;
  }, [milestones]);
  const latest = milestones[lastRealIndex];

  const heroStats = useMemo(() => {
    const kgLost =
      typeof latest.weight === 'number' ? baseline.weight - latest.weight : 0;
    const fatDown =
      typeof latest.bodyFatPct === 'number'
        ? baseline.bodyFatPct - latest.bodyFatPct
        : 0;
    const muscle = latest.musclePct ?? 71.8;
    const days = daysBetween(milestones[0].date, latest.date);
    return [
      { value: `−${kgLost.toFixed(1)}`, unit: 'kg', label: t(tk.hero.lost) },
      { value: `−${fatDown.toFixed(1)}`, unit: 'pp', label: t(tk.hero.fatDown) },
      { value: `${muscle}`, unit: '%', label: t(tk.hero.muscleUp) },
      { value: `${days}`, unit: '', label: t(tk.hero.days) },
    ];
  }, [latest, baseline, milestones, t, tk]);

  const labels = {
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
    goalEta: t(tk.goal.eta),
    photoPlaceholder: t(tk.photoPlaceholder),
  };

  const compareLabels = {
    title: t(tk.compare.title),
    subtitle: t(tk.compare.subtitle),
    then: t(tk.compare.then),
    now: t(tk.compare.now),
    gains: t(tk.compare.gains),
    weight: t(tk.metrics.weight),
    bodyFat: t(tk.metrics.bodyFat),
    visceral: t(tk.metrics.visceral),
    muscle: t(tk.metrics.muscle),
  };

  const fuel = {
    title: t(tk.nutrition.title),
    items: [
      { value: nutritionProtocol.kcal, label: t(tk.nutrition.kcal) },
      {
        value: localize(nutritionProtocol.protein),
        label: t(tk.nutrition.protein),
      },
    ],
  };

  const bloodData = {
    title: t(tk.blood.title),
    subtitle: t(tk.blood.subtitle),
    disclaimer: t(tk.blood.disclaimer),
    markers: bloodPanel.markers.map((mk) => ({
      label: localize(mk.label),
      value: mk.value,
      ref: mk.ref,
      status: mk.status,
    })),
  };

  const nutritionData = {
    title: t(tk.nutrition.title),
    rows: [
      { label: t(tk.nutrition.kcal), value: nutritionProtocol.kcal },
      { label: t(tk.nutrition.protein), value: localize(nutritionProtocol.protein) },
      { label: t(tk.nutrition.carbs), value: localize(nutritionProtocol.carbs) },
      { label: t(tk.nutrition.fat), value: localize(nutritionProtocol.fat) },
      { label: t(tk.nutrition.fiber), value: nutritionProtocol.fiber },
      { label: t(tk.nutrition.steps), value: nutritionProtocol.steps },
    ],
  };

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-8 sm:px-8 sm:py-10">
      {/* header */}
      <header className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--gk-border)] px-4 py-2 font-mono text-xs text-[var(--gk-muted)] duration-200 hover:border-[var(--gk-bronze)] hover:text-[var(--gk-marble)] focus:outline-none"
        >
          <Icon icon="ph:arrow-left" width="15" />
          {t(tk.back)}
        </button>

        <LanguageToggle locale={locale} />
      </header>

      {/* title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 text-center"
      >
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--gk-bronze)]">
          <Icon icon="game-icons:laurel-crown" width="18" />
          {t(tk.eyebrow)}
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--gk-marble)] sm:text-6xl">
          {t(tk.pageTitle)}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--gk-muted)] sm:text-base">
          {t(tk.pageSubtitle)}
        </p>
      </motion.div>

      {/* hero stats */}
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {heroStats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[var(--gk-border)] bg-[var(--gk-glass)] px-4 py-4 text-center"
          >
            <p className="font-mono text-2xl font-semibold text-[var(--gk-bronze)] sm:text-3xl">
              {s.value}
              {s.unit && (
                <span className="ml-0.5 text-sm text-[var(--gk-muted)]">
                  {s.unit}
                </span>
              )}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--gk-muted)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* carousel */}
      <div className="mt-12">
        <MilestoneCarousel
          milestones={milestones}
          index={index}
          setIndex={setIndex}
          locale={locale}
          baseline={baseline}
          localize={localize}
          labels={labels}
          fuel={fuel}
        />
        <div className="mt-6">
          <TimelineScrubber
            milestones={milestones}
            index={index}
            setIndex={setIndex}
            locale={locale}
          />
        </div>
      </div>

      {/* comparison */}
      <div className="mt-12">
        <ComparisonView
          comparison={comparison}
          locale={locale}
          labels={compareLabels}
        />
      </div>

      {/* trend + vitals */}
      <div className="mt-12 space-y-5">
        <TrendChart
          series={dailySeries}
          highlightDate={milestones[index].date}
          labels={{
            title: t(tk.trend.title),
            weight: t(tk.trend.weight),
            bodyFat: t(tk.trend.bodyFat),
          }}
          locale={locale}
        />
        <VitalsPanel blood={bloodData} nutrition={nutritionData} />
      </div>

      <footer className="mt-14 border-t border-[var(--gk-border)] pt-6 text-center font-mono text-[11px] text-[var(--gk-muted)]">
        Gaston Genaud · {t(tk.pageTitle)}
      </footer>
    </div>
  );
};

/* ---- language toggle (no toast; standalone route) ---- */
const LanguageToggle = ({ locale }: { locale: 'en' | 'es' }) => {
  const { i18n } = useTranslation();
  const change = (lng: 'en' | 'es') => i18n.changeLanguage(lng);
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-[var(--gk-border)] p-1 font-mono text-xs">
      {(['en', 'es'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => change(lng)}
          className={clsx(
            'rounded-full px-3 py-1.5 uppercase duration-200 focus:outline-none',
            locale === lng
              ? 'bg-[var(--gk-bronze-soft)] text-[var(--gk-bronze)]'
              : 'text-[var(--gk-muted)] hover:text-[var(--gk-marble)]'
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

export default FitnessExperience;
