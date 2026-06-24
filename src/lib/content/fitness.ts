'use client';
import {
  Activity,
  BloodPanel,
  BloodPressurePoint,
  Comparison,
  FitnessMilestone,
  Locale,
  LocalizedText,
  MeasurementPoint,
  NutritionLog,
  NutritionProtocol,
  TrendPoint,
} from '@/lib/types/fitness';

import { useTranslation } from 'react-i18next';

/**
 * All figures sourced first-hand from personal tracking tables (InBody + scale +
 * blood-pressure log + bloodwork). Nothing pharmacological is represented here.
 */

export const baseline = { weight: 92.2, bodyFatPct: 28.7 };

export const milestones: FitnessMilestone[] = [
  {
    id: '2026-04-12',
    date: '2026-04-12',
    tag: { en: 'DAY 0', es: 'DÍA 0' },
    title: { en: 'Baseline', es: 'Punto de partida' },
    note: {
      en: 'Where it started — a broad frame with a natural V-taper hidden under fat on the flanks and lower back.',
      es: 'El punto de partida — estructura ancha con un V-taper natural escondido bajo la grasa de los flancos y la zona lumbar.',
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
      en: 'Lean mass holds while the scale barely moves — muscle preserved from week one.',
      es: 'La masa magra se sostiene mientras la balanza casi no se mueve — músculo preservado desde la primera semana.',
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
      en: '−3.4 kg in two weeks, almost entirely from fat. The cut is working.',
      es: '−3.4 kg en dos semanas, casi todo de grasa. El recorte funciona.',
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
      en: 'Visceral fat drops from 13 to 12 for the first time after three weeks stuck.',
      es: 'La grasa visceral baja de 13 a 12 por primera vez tras tres semanas estancada.',
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
    id: '2026-05-06',
    date: '2026-05-06',
    title: { en: 'Holding form', es: 'Sosteniendo' },
    note: {
      en: 'Weight under 88 kg, body fat under 27% — steady, controlled decline.',
      es: 'Peso debajo de 88 kg, grasa debajo de 27% — bajada constante y controlada.',
    },
    weight: 87.9,
    bodyFatPct: 26.9,
    leanKg: 64.3,
    skeletalKg: 32.7,
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
    id: '2026-05-22',
    date: '2026-05-22',
    title: { en: 'Lean and lighter', es: 'Más magro y liviano' },
    note: {
      en: 'Under 85 kg with body fat near 25% — the deficit keeps eating fat, not muscle.',
      es: 'Debajo de 85 kg con grasa cerca del 25% — el déficit sigue comiendo grasa, no músculo.',
    },
    weight: 84.8,
    bodyFatPct: 25.8,
    leanKg: 62.9,
  },
  {
    id: '2026-05-29',
    date: '2026-05-29',
    title: { en: 'Clean recomposition', es: 'Recomposición limpia' },
    note: {
      en: 'Weight down, muscle percentage climbing measurement after measurement.',
      es: 'El peso baja y el porcentaje de músculo sube medición tras medición.',
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
      en: 'Body fat crosses below 25% for the first time and muscle hits a record 71.2%.',
      es: 'La grasa cruza por primera vez debajo del 25% y el músculo marca un récord de 71.2%.',
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
      en: '81.8 kg at 24.2% fat with a record 71.8% muscle — −10.4 kg from baseline, mostly fat.',
      es: '81.8 kg con 24.2% de grasa y un récord de 71.8% de músculo — −10.4 kg desde el inicio, casi todo grasa.',
    },
    weight: 81.8,
    bodyFatPct: 24.2,
    musclePct: 71.8,
  },
  {
    id: '2026-06-24',
    date: '2026-06-24',
    tag: { en: 'LATEST', es: 'HOY' },
    title: { en: 'Sharpest yet', es: 'Lo más afilado' },
    note: {
      en: '80.9 kg at 23.9% fat — muscle a record 72.1%, visceral down to 10, waist 89 cm. −11.3 kg from baseline.',
      es: '80.9 kg al 23.9% de grasa — músculo récord 72.1%, visceral en 10, cintura 89 cm. −11.3 kg desde el inicio.',
    },
    weight: 80.9,
    bodyFatPct: 23.9,
    musclePct: 72.1,
    muscleKg: 58.3,
    visceral: 10,
    restingHr: 73,
    measures: { chest: 101.5, waist: 89, hip: 87, arm: 39.5 },
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
  },
];

// Full daily series (scale + InBody log) for the weight / body-fat trend.
export const dailySeries: TrendPoint[] = [
  { date: '2026-04-10', weight: 94.4, bodyFat: 28.9 },
  { date: '2026-04-12', weight: 92.2, bodyFat: 28.7 },
  { date: '2026-04-16', weight: 92.3, bodyFat: 28.4 },
  { date: '2026-04-17', weight: 91.4, bodyFat: 28.4 },
  { date: '2026-04-19', weight: 90.1, bodyFat: 28.0 },
  { date: '2026-04-21', weight: 90.6, bodyFat: 28.0 },
  { date: '2026-04-28', weight: 89.8, bodyFat: 27.7 },
  { date: '2026-04-29', weight: 89.8, bodyFat: 27.6 },
  { date: '2026-04-30', weight: 89.5, bodyFat: 27.4 },
  { date: '2026-05-04', weight: 89.6, bodyFat: 27.5 },
  { date: '2026-05-05', weight: 89.1, bodyFat: 27.3 },
  { date: '2026-05-06', weight: 87.9, bodyFat: 26.9 },
  { date: '2026-05-08', weight: 87.6, bodyFat: 26.9 },
  { date: '2026-05-09', weight: 87.2, bodyFat: 26.7 },
  { date: '2026-05-10', weight: 86.7, bodyFat: 26.7 },
  { date: '2026-05-12', weight: 86.6, bodyFat: 26.7 },
  { date: '2026-05-14', weight: 86.3, bodyFat: 26.5 },
  { date: '2026-05-17', weight: 85.6, bodyFat: 26.2 },
  { date: '2026-05-18', weight: 85.9, bodyFat: 26.2 },
  { date: '2026-05-22', weight: 84.8, bodyFat: 25.8 },
  { date: '2026-05-29', weight: 83.5, bodyFat: 25.1 },
  { date: '2026-06-04', weight: 82.7, bodyFat: 24.8 },
  { date: '2026-06-05', weight: 82.8, bodyFat: 24.8 },
  { date: '2026-06-07', weight: 82.7, bodyFat: 24.8 },
  { date: '2026-06-09', weight: 82.4, bodyFat: 24.5 },
  { date: '2026-06-10', weight: 83.7, bodyFat: 24.9 },
  { date: '2026-06-11', weight: 81.8, bodyFat: 24.2 },
  { date: '2026-06-24', weight: 80.9, bodyFat: 23.9 },
];

// Blood-pressure log (fasted AM). Improves from elevated → optimal.
export const bpSeries: BloodPressurePoint[] = [
  { date: '2026-05-06', sys: 131, dia: 82, pulse: 58 },
  { date: '2026-05-08', sys: 130, dia: 83, pulse: 70 },
  { date: '2026-05-10', sys: 130, dia: 80, pulse: 61 },
  { date: '2026-05-11', sys: 121, dia: 79, pulse: 61 },
  { date: '2026-05-13', sys: 124, dia: 72, pulse: 57 },
  { date: '2026-05-14', sys: 118, dia: 80, pulse: 55 },
  { date: '2026-05-17', sys: 127, dia: 78, pulse: 55 },
  { date: '2026-05-20', sys: 115, dia: 72, pulse: 57 },
  { date: '2026-05-21', sys: 120, dia: 63, pulse: 51 },
  { date: '2026-05-29', sys: 116, dia: 65, pulse: 65 },
  { date: '2026-06-08', sys: 125, dia: 76 },
];

// Neutral blood markers only (metabolic / lipids / renal / vitamins).
export const bloodPanel: BloodPanel = {
  date: '2026-06-01',
  markers: [
    { label: { en: 'Glucose', es: 'Glucemia' }, value: '84 mg/dL', ref: '60–110', status: 'good' },
    { label: { en: 'HbA1c', es: 'HbA1c' }, value: '5.20%', ref: '< 5.7', status: 'good' },
    { label: { en: 'Total cholesterol', es: 'Colesterol' }, value: '149', ref: '< 200', status: 'good' },
    { label: { en: 'HDL', es: 'HDL' }, value: '55', ref: '60+', status: 'watch' },
    { label: { en: 'LDL', es: 'LDL' }, value: '84.2', ref: '< 130', status: 'good' },
    { label: { en: 'Triglycerides', es: 'Triglicéridos' }, value: '49', ref: '< 150', status: 'good' },
    { label: { en: 'Creatinine', es: 'Creatinina' }, value: '0.8', ref: '0.7–1.3', status: 'good' },
    { label: { en: 'Vitamin D', es: 'Vitamina D' }, value: '29.1', ref: '30+', status: 'watch' },
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

export const comparison: Comparison = {
  then: { date: '2026-04-12', weight: 92.2, bodyFatPct: 28.7, visceral: 14, muscleKg: 62.2, bp: '131/82' },
  now: { date: '2026-06-24', weight: 80.9, bodyFatPct: 23.9, visceral: 10, musclePct: 72.1, bp: '116/65' },
};

// Tape measurements (cm). Includes the older 2024/2025 records for the full
// arc. Notes intentionally omitted (chemistry).
export const measurements: MeasurementPoint[] = [
  { date: '2024-05-01', waist: 124, hip: 111.5, chest: 120, bicep: 38, thigh: 71 },
  { date: '2025-06-01', waist: 102.2, hip: 108, chest: 108.5, thigh: 67.5 },
  { date: '2026-04-12', waist: 103, hip: 96, chest: 104.8, bicep: 34 },
  { date: '2026-04-28', waist: 101, hip: 97, chest: 105.5, bicep: 41, thigh: 57.5 },
  { date: '2026-05-05', waist: 101, hip: 95, chest: 104, bicep: 41.4, thigh: 58 },
  { date: '2026-05-14', waist: 97.6, hip: 92.5, bicep: 41 },
  { date: '2026-06-10', waist: 94.3, hip: 89, chest: 101, bicep: 39.1 },
  { date: '2026-06-24', waist: 89, hip: 87, chest: 101.5, bicep: 39.5, thigh: 57 },
];

// Objective device data (Apple Watch) — 7-day window.
export const activity: Activity = {
  weekStart: '2026-05-22',
  weekEnd: '2026-05-29',
  strengthSessions: 4,
  totalMinutes: 388,
  walks: 17,
  walkKm: 31.2,
  activeKcal: 5823,
  sessions: [
    { date: '2026-05-25', type: 'strength', minutes: 97, kcal: 820, hrAvg: 122, hrMax: 153 },
    { date: '2026-05-26', type: 'strength', minutes: 106, kcal: 779, hrAvg: 118, hrMax: 152 },
    { date: '2026-05-27', type: 'strength', minutes: 98, kcal: 594, hrAvg: 107, hrMax: 151 },
    { date: '2026-05-28', type: 'strength', minutes: 87, kcal: 625, hrAvg: 117, hrMax: 149 },
    { date: '2026-05-23', type: 'cycling', minutes: 30, kcal: 239, hrAvg: 121, hrMax: 152 },
  ],
};

// Food-log adherence — average across 80 logged days (Apr–Jun).
export const nutritionLog: NutritionLog = { days: 80, kcal: 1758, protein: 207 };

export const pick = (text: LocalizedText, locale: Locale): string =>
  text[locale] ?? text.en;

/** Mean of a numeric list, rounded to `digits`. */
export const avg = (values: number[], digits = 0): number => {
  if (!values.length) return 0;
  const m = values.reduce((a, b) => a + b, 0) / values.length;
  const f = 10 ** digits;
  return Math.round(m * f) / f;
};

export const useFitnessData = () => {
  const { i18n } = useTranslation();
  const locale: Locale = i18n.language === 'es' ? 'es' : 'en';
  return {
    locale,
    localize: (text: LocalizedText) => pick(text, locale),
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
  };
};
