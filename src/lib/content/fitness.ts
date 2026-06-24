'use client';
import {
  BloodPanel,
  Comparison,
  FitnessMilestone,
  GoalTarget,
  Locale,
  LocalizedText,
  NutritionProtocol,
  TrendPoint,
} from '@/lib/types/fitness';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

/**
 * All figures sourced first-hand from the personal tracking tables (InBody +
 * scale + bloodwork). Nothing pharmacological is represented here by design.
 */

// Curated milestones for the carousel (start → latest → goal).
export const milestones: FitnessMilestone[] = [
  {
    id: '2026-04-12',
    date: '2026-04-12',
    tag: { en: 'DAY 0', es: 'DÍA 0' },
    title: { en: 'Baseline', es: 'Punto de partida' },
    note: {
      en: 'Where it started — a broad frame with a natural V-taper hidden under fat on the flanks and lower back.',
      es: 'El punto de partida — una estructura ancha con un V-taper natural escondido bajo la grasa de los flancos y la zona lumbar.',
    },
    weight: 92.2,
    bodyFatPct: 28.7,
    fatKg: 26.5,
    muscleKg: 62.2,
    skeletalKg: 33.0,
    visceral: 14,
    restingHr: 53,
    measures: { chest: 104.8, waist: 103, hip: 96, arm: 34 },
  },
  {
    id: '2026-04-14',
    date: '2026-04-14',
    title: { en: 'First InBody', es: 'Primer InBody' },
    note: {
      en: 'Lean mass holds while the scale barely moves — the muscle is being preserved from the very first week.',
      es: 'La masa magra se sostiene mientras la balanza casi no se mueve — el músculo se preserva desde la primera semana.',
    },
    weight: 92.3,
    bodyFatPct: 28.3,
    fatKg: 26.1,
    leanKg: 66.1,
    muscleKg: 62.6,
    skeletalKg: 33.9,
    visceral: 13,
    bmi: 29.8,
    vo2: 42,
  },
  {
    id: '2026-04-26',
    date: '2026-04-26',
    title: { en: 'Dialed in', es: 'Recorte afinado' },
    note: {
      en: '−3.4 kg in two weeks, almost entirely from fat. The cut is working exactly as planned.',
      es: '−3.4 kg en dos semanas, casi todo de grasa. El recorte funciona exactamente como se planeó.',
    },
    weight: 88.8,
    bodyFatPct: 27.6,
    fatKg: 24.5,
    leanKg: 64.3,
    visceral: 13,
  },
  {
    id: '2026-04-29',
    date: '2026-04-29',
    tag: { en: 'VISCERAL 12', es: 'VISCERAL 12' },
    title: { en: 'First breakthrough', es: 'Primera ruptura' },
    note: {
      en: 'Visceral fat drops from 13 to 12 for the first time after three weeks stuck — the internal change shows up.',
      es: 'La grasa visceral baja de 13 a 12 por primera vez tras tres semanas estancada — el cambio interno aparece.',
    },
    weight: 89.8,
    bodyFatPct: 27.6,
    fatKg: 24.8,
    leanKg: 65.0,
    muscleKg: 61.5,
    skeletalKg: 33.6,
    visceral: 12,
  },
  {
    id: '2026-05-07',
    date: '2026-05-07',
    tag: { en: 'THE BACK', es: 'LA ESPALDA' },
    title: { en: 'The back appeared', es: 'Apareció la espalda' },
    note: {
      en: 'Week 4, the most important change — first real separation across traps, rhomboids and rear delts. The V-taper is visually confirmed.',
      es: 'Semana 4, el cambio más importante — primera separación real en trapecios, romboides y deltoides posteriores. El V-taper queda confirmado.',
    },
    weight: 86.6,
    bodyFatPct: 26.2,
    leanKg: 63.9,
    visceral: 12,
  },
  {
    id: '2026-05-29',
    date: '2026-05-29',
    title: { en: 'Clean recomposition', es: 'Recomposición limpia' },
    note: {
      en: 'Weight keeps falling while muscle percentage climbs measurement after measurement — fat down, muscle preserved.',
      es: 'El peso sigue bajando mientras el porcentaje de músculo sube medición tras medición — grasa abajo, músculo preservado.',
    },
    weight: 83.5,
    bodyFatPct: 25.1,
    leanKg: 62.5,
    musclePct: 70.9,
  },
  {
    id: '2026-06-04',
    date: '2026-06-04',
    tag: { en: 'RECORD', es: 'RÉCORD' },
    title: { en: 'Under 25%', es: 'Debajo del 25%' },
    note: {
      en: 'Body fat crosses below 25% for the first time and muscle hits a record 71.2%. The direction is locked in.',
      es: 'La grasa cruza por primera vez debajo del 25% y el músculo marca un récord de 71.2%. La dirección está fija.',
    },
    weight: 82.7,
    bodyFatPct: 24.8,
    musclePct: 71.2,
  },
  {
    id: '2026-06-11',
    date: '2026-06-11',
    tag: { en: '−10.4 KG', es: '−10.4 KG' },
    title: { en: 'New low', es: 'Nuevo mínimo' },
    note: {
      en: '81.8 kg at 24.2% fat with a record 71.8% muscle — −10.4 kg from baseline, and most of it was fat.',
      es: '81.8 kg con 24.2% de grasa y un récord de 71.8% de músculo — −10.4 kg desde el inicio, y casi todo fue grasa.',
    },
    weight: 81.8,
    bodyFatPct: 24.2,
    musclePct: 71.8,
  },
  {
    id: 'goal',
    date: '2026-09-23',
    tag: { en: 'IN PROGRESS', es: 'EN PROGRESO' },
    title: { en: 'The Goal', es: 'La meta' },
    note: {
      en: 'The target — 78 kg at 14% body fat. Lean, defined, athletic. Still climbing.',
      es: 'La meta — 78 kg al 14% de grasa. Magro, definido, atlético. Todavía en camino.',
    },
    weight: 78,
    bodyFatPct: 14,
    isGoal: true,
    targetDate: '2026-09-23',
  },
];

// Full daily series for the trend chart (scale + InBody points).
export const dailySeries: TrendPoint[] = [
  { date: '2026-04-12', weight: 92.2, bodyFat: 28.7 },
  { date: '2026-04-14', weight: 92.3, bodyFat: 28.3 },
  { date: '2026-04-26', weight: 88.8, bodyFat: 27.6 },
  { date: '2026-04-29', weight: 89.8, bodyFat: 27.6 },
  { date: '2026-05-06', weight: 87.9, bodyFat: 26.9 },
  { date: '2026-05-07', weight: 86.6, bodyFat: 26.2 },
  { date: '2026-05-22', weight: 84.8, bodyFat: 25.8 },
  { date: '2026-05-23', weight: 84.6, bodyFat: 25.6 },
  { date: '2026-05-24', weight: 84.6, bodyFat: 25.6 },
  { date: '2026-05-25', weight: 87.1, bodyFat: 25.9 },
  { date: '2026-05-26', weight: 86.3, bodyFat: 25.8 },
  { date: '2026-05-27', weight: 84.4, bodyFat: 25.6 },
  { date: '2026-05-28', weight: 84.1, bodyFat: 25.5 },
  { date: '2026-05-29', weight: 83.5, bodyFat: 25.1 },
  { date: '2026-06-04', weight: 82.7, bodyFat: 24.8 },
  { date: '2026-06-09', weight: 82.4, bodyFat: 24.5 },
  { date: '2026-06-11', weight: 81.8, bodyFat: 24.2 },
];

// Neutral blood markers only (metabolic / lipids / renal / vitamins). No hormones.
export const bloodPanel: BloodPanel = {
  date: '2026-06-01',
  markers: [
    {
      label: { en: 'Glucose', es: 'Glucemia' },
      value: '84 mg/dL',
      ref: '60–110',
      status: 'good',
    },
    {
      label: { en: 'HbA1c', es: 'HbA1c' },
      value: '5.20%',
      ref: '< 5.7',
      status: 'good',
    },
    {
      label: { en: 'Total cholesterol', es: 'Colesterol total' },
      value: '149',
      ref: '< 200',
      status: 'good',
    },
    {
      label: { en: 'HDL', es: 'HDL' },
      value: '55',
      ref: '60+',
      status: 'watch',
    },
    {
      label: { en: 'LDL', es: 'LDL' },
      value: '84.2',
      ref: '< 130',
      status: 'good',
    },
    {
      label: { en: 'Triglycerides', es: 'Triglicéridos' },
      value: '49',
      ref: '< 150',
      status: 'good',
    },
    {
      label: { en: 'Creatinine', es: 'Creatinina' },
      value: '0.8',
      ref: '0.7–1.3',
      status: 'good',
    },
    {
      label: { en: 'Vitamin D', es: 'Vitamina D' },
      value: '29.1',
      ref: '30+',
      status: 'watch',
    },
  ],
};

export const nutritionProtocol: NutritionProtocol = {
  kcal: '1800',
  protein: { en: '1.8–2 g/kg', es: '1.8–2 g/kg' },
  carbs: { en: '~120 g rest · ~160 g training', es: '~120 g descanso · ~160 g entreno' },
  fat: { en: 'maintained', es: 'mantenidas' },
  fiber: '≥ 20 g',
  steps: '10.000',
};

export const goalTarget: GoalTarget = {
  weight: 78,
  bodyFatPct: 14,
  targetDate: '2026-09-23',
};

// Baseline ("that era") vs latest measured — for the side-by-side comparison.
// Visceral on `now` is the latest value that was actually measured (5/7).
export const comparison: Comparison = {
  then: {
    date: '2026-04-12',
    weight: 92.2,
    bodyFatPct: 28.7,
    visceral: 14,
    muscleKg: 62.2,
  },
  now: {
    date: '2026-06-11',
    weight: 81.8,
    bodyFatPct: 24.2,
    visceral: 12,
    musclePct: 71.8,
  },
};

// Baseline references for delta computations.
export const baseline = {
  weight: 92.2,
  bodyFatPct: 28.7,
};

export const pick = (text: LocalizedText, locale: Locale): string =>
  text[locale] ?? text.en;

export const useFitnessContent = () => {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language === 'es' ? 'es' : 'en';

  return {
    locale,
    t,
    tokens: tokens.fitness,
    milestones,
    dailySeries,
    bloodPanel,
    nutritionProtocol,
    goalTarget,
    comparison,
    baseline,
    /** localize a LocalizedText with the current language */
    localize: (text: LocalizedText) => pick(text, locale),
  };
};
