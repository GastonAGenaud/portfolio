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
  Routes,
  TrendPoint,
} from '@/lib/types/fitness';

import { ecg } from '@/lib/content/ecg-data';

import { useTranslation } from 'react-i18next';

/**
 * All figures sourced first-hand from personal tracking tables (InBody + scale +
 * blood-pressure log + bloodwork). Nothing pharmacological is represented here.
 */

// True starting point — the obesity peak (May 2024, ~122 kg). Body-fat at that
// weight is an estimate; the tracked daily data begins in April 2026.
export const baseline = { weight: 122, bodyFatPct: 38 };

export const milestones: FitnessMilestone[] = [
  {
    id: '2024-05-01',
    date: '2024-05-01',
    tag: { en: 'DAY 0', es: 'DÍA 0' },
    title: { en: 'The start', es: 'El inicio' },
    note: {
      en: 'The real starting line — around 122 kg at the obesity peak, waist 124 cm. Everything below is what came after.',
      es: 'La verdadera línea de largada — cerca de 122 kg en el pico de obesidad, cintura 124 cm. Todo lo de abajo es lo que vino después.',
    },
    weight: 122,
    bodyFatPct: 38,
    measures: { chest: 120, waist: 124, hip: 111.5, arm: 38 },
  },
  {
    id: '2026-04-12',
    date: '2026-04-12',
    tag: { en: 'CUT START', es: 'INICIO CORTE' },
    title: { en: 'The cut begins', es: 'Arranca el corte' },
    note: {
      en: 'The measured cut kicks off at 92.2 kg / 28.7% fat — roughly 30 kg already gone. From here it is tracked daily.',
      es: 'Arranca el corte medido en 92.2 kg / 28.7% de grasa — con unos 30 kg ya perdidos. De acá en más, registrado a diario.',
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
  then: { date: '2024-05-01', weight: 122, bodyFatPct: 38 },
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
  avgSteps: 10400,
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

// Coach credit.
export const coach = {
  name: 'Sebastián',
  brand: 'THA CBO',
  instagram: 'https://www.instagram.com/tha_cbo.ar/',
  website: 'https://www.thacbo.com/',
};

// Earlier-stage support.
export const coachSecondary = {
  name: 'Matías Rosakesque',
  handle: '@mati_00_d',
  instagram: 'https://www.instagram.com/mati_00_d/',
};

// GPS workout routes (Apple Health export) — aggregates + representative shapes.
export const routes: Routes = {
  count: 188,
  totalKm: 256,
  totalHours: 78,
  elevGain: 13375,
  firstDate: '2024-04-11',
  lastDate: '2026-06-23',
  shapes: [
  { date: '2026-05-01', km: 8.5, d: 'M91.1 78.6 L91.3 78.8 L95.1 73.7 L94.7 68.0 L85.3 65.3 L82.9 64.7 L81.3 63.1 L81.3 63.1 L77.3 62.5 L67.6 59.5 L59.6 55.3 L58.7 54.7 L52.4 50.0 L48.5 47.4 L46.2 45.6 L44.8 43.3 L46.1 38.0 L46.8 35.0 L40.0 30.1 L38.8 29.6 L36.0 27.5 L31.2 28.3 L27.9 26.2 L22.7 21.0 L13.8 17.8 L6.9 19.0 L4.0 22.9 L9.3 24.1 L9.2 23.4 L9.2 23.4 L9.8 24.4 L8.6 26.6 L7.2 28.4 L13.2 30.9 L20.9 34.6 L23.0 34.9 L32.0 39.8 L42.3 44.5 L45.8 46.1 L51.2 48.6 L54.6 51.6 L59.3 55.4 L63.9 58.3 L75.3 62.0 L81.2 61.3 L82.0 60.6 L82.1 60.6 L81.8 62.5 L88.1 64.9 L88.0 65.0 L88.8 66.6 L90.7 67.8 L94.4 67.9 L96.0 70.7 L95.5 73.4 L93.2 75.1 L91.0 77.6 L90.7 79.2 L88.7 82.2 L85.7 81.1 L82.9 80.1' },
  { date: '2026-03-01', km: 7.8, d: 'M57.3 85.2 L61.6 83.6 L64.7 81.4 L70.8 82.2 L75.6 78.8 L76.9 72.8 L78.8 69.1 L83.1 67.1 L84.7 62.4 L89.1 58.2 L92.8 53.2 L96.0 51.1 L95.4 50.3 L94.9 46.5 L93.1 43.3 L93.1 39.8 L92.7 37.7 L89.9 35.8 L87.9 35.0 L83.6 30.8 L79.7 27.1 L75.4 23.9 L71.2 21.2 L67.5 18.8 L62.7 16.7 L62.5 14.8 L58.9 15.5 L57.8 16.9 L52.9 18.5 L50.7 19.9 L49.7 21.9 L48.5 24.8 L44.2 25.3 L41.1 23.3 L38.7 22.9 L39.0 26.0 L38.0 29.5 L35.6 26.6 L33.0 24.4 L32.9 24.0 L32.9 23.9 L32.9 23.9 L33.0 23.9 L28.8 24.3 L27.6 27.0 L29.1 31.7 L29.6 36.6 L30.1 41.1 L30.5 45.5 L27.3 45.5 L23.0 48.0 L20.4 49.8 L17.8 50.7 L13.2 50.8 L8.3 51.1 L5.8 51.6 L4.4 47.9 L4.0 43.6 L4.0 40.6 L4.0 40.5 L4.3 40.5' },
  { date: '2026-02-07', km: 7.8, d: 'M19.5 92.6 L20.4 92.2 L20.1 92.5 L22.9 93.2 L26.1 94.3 L30.2 95.2 L33.4 88.8 L40.8 78.8 L46.7 71.6 L49.6 68.1 L58.8 56.8 L56.6 49.9 L61.8 49.9 L70.6 49.3 L57.8 43.7 L44.9 37.6 L40.1 35.2 L35.2 32.8 L39.3 27.9 L40.2 22.9 L32.0 16.9 L22.1 11.9 L20.3 4.8 L18.2 7.5 L12.3 9.2 L5.9 9.1 L4.0 12.5 L12.0 18.3 L19.5 22.8 L27.4 27.3 L36.2 31.7 L46.3 36.3 L56.3 41.1 L63.1 42.2 L65.5 43.3 L65.9 43.5 L66.7 43.9 L66.9 43.9 L66.9 44.2 L66.9 44.2 L67.0 44.1 L68.2 45.1 L72.6 48.1 L71.5 46.9 L76.8 50.5 L89.4 56.5 L96.0 59.9 L83.9 53.8 L71.3 47.9 L70.3 46.7 L69.0 48.6 L64.4 53.4 L58.8 56.2 L58.8 56.2 L57.8 58.4 L55.3 60.7 L53.2 63.1 L51.7 65.8 L50.2 66.7 L47.7 70.1 L46.0 71.7' },
  { date: '2026-05-24', km: 7.6, d: 'M18.5 42.7 L29.1 40.4 L35.3 38.0 L35.6 34.3 L32.9 33.2 L35.2 25.7 L40.6 21.6 L35.5 17.0 L32.8 16.7 L32.2 17.8 L29.1 17.8 L23.2 16.7 L19.1 15.3 L25.8 12.9 L36.6 7.9 L40.5 4.0 L40.6 4.6 L32.9 8.9 L31.6 9.6 L25.9 14.6 L21.7 13.8 L18.8 16.5 L20.6 24.9 L23.3 27.2 L24.9 33.4 L26.7 40.6 L32.6 47.4 L38.4 55.0 L43.0 62.2 L42.9 62.2 L45.4 65.5 L51.0 70.4 L52.3 70.2 L52.3 74.7 L52.8 77.7 L53.9 84.3 L63.9 88.5 L66.8 88.2 L67.6 89.7 L75.2 95.8 L81.0 96.0 L81.7 95.9 L87.7 88.9 L89.4 88.2 L91.5 86.1 L87.9 85.5 L83.3 88.1 L79.6 95.9 L72.7 93.6 L62.4 88.7 L53.1 85.1 L46.6 77.7 L42.1 68.9 L37.1 56.4 L31.9 48.8 L21.4 48.3 L14.8 44.8 L8.5 45.1 L12.5 54.7 L11.8 60.3 L9.5 61.0' },
  { date: '2025-05-25', km: 7.4, d: 'M18.3 4.8 L18.3 4.8 L18.4 4.7 L17.9 4.0 L17.0 5.0 L18.8 7.5 L20.8 9.8 L21.9 11.3 L24.6 13.8 L27.1 16.2 L29.5 18.4 L31.9 20.7 L33.9 22.8 L35.8 24.6 L36.7 25.6 L39.0 27.4 L40.7 30.2 L42.1 32.9 L42.7 34.2 L44.3 36.9 L46.3 39.9 L48.1 42.6 L51.1 46.9 L53.2 50.0 L55.2 52.3 L57.3 54.9 L60.6 58.7 L62.6 61.0 L63.6 62.3 L65.7 64.6 L67.7 66.9 L69.7 69.2 L71.8 71.6 L73.9 73.9 L76.0 76.3 L78.2 78.8 L80.2 81.2 L83.0 84.3 L81.9 88.9 L81.8 91.6 L80.5 94.5 L77.0 93.7 L75.2 92.8 L70.2 90.2 L67.0 92.6 L66.3 95.1 L71.1 95.7 L71.6 93.8 L69.9 91.0 L67.6 91.8 L66.0 93.7 L64.1 95.7 L63.7 96.0 L63.7 96.0 L63.8 95.9 L63.9 95.7 L64.0 95.6 L64.0 95.6 L64.0 95.7 L61.7 91.8 L56.6 82.0' },
  { date: '2025-11-23', km: 6.7, d: 'M96.0 69.8 L95.6 69.5 L94.9 69.1 L94.3 68.7 L93.7 68.3 L92.9 67.9 L92.1 67.5 L91.4 67.1 L90.6 66.7 L90.0 66.4 L89.2 66.0 L88.6 65.5 L87.9 65.3 L87.2 65.6 L86.9 66.1 L86.9 66.1 L87.1 65.8 L87.6 65.3 L87.5 64.9 L87.2 64.8 L87.0 64.7 L86.7 64.5 L86.3 64.3 L86.0 64.0 L85.8 63.4 L85.9 62.7 L85.7 62.2 L85.8 62.1 L85.9 61.7 L86.1 61.1 L85.8 60.6 L85.2 60.3 L84.6 60.0 L83.9 59.6 L83.2 59.4 L82.5 59.0 L81.8 58.6 L81.1 58.3 L80.6 58.0 L80.6 58.0 L80.6 58.0 L80.6 58.0 L80.6 58.0 L80.3 57.8 L77.1 58.3 L74.8 61.1 L72.2 63.2 L66.9 60.6 L62.0 58.1 L56.7 55.4 L51.1 52.5 L46.2 50.1 L44.2 49.1 L39.8 46.9 L34.1 44.0 L28.7 41.3 L23.6 38.7 L17.9 35.8 L14.1 34.9 L12.7 36.6 L8.9 33.9 L4.0 30.2' },
  { date: '2025-02-01', km: 5.2, d: 'M4.0 55.5 L10.7 58.2 L17.4 59.8 L24.9 62.0 L32.2 64.2 L39.3 66.6 L46.6 67.0 L50.9 63.6 L50.7 63.7 L52.0 66.4 L58.7 63.1 L65.6 59.9 L72.6 56.7 L76.3 52.2 L76.9 51.3 L76.9 51.8 L79.5 55.7 L86.9 56.6 L90.0 55.8 L86.8 50.9 L92.0 46.5 L94.6 43.7 L95.0 37.8 L94.3 33.5 L95.7 33.1 L96.0 33.0 L94.3 34.4 L95.3 40.3 L93.2 45.5 L88.1 49.6 L83.5 48.9 L78.7 47.8 L78.7 48.9 L78.1 49.2 L78.1 49.2 L78.0 49.0 L77.9 49.9 L78.0 50.0 L78.1 50.0 L78.1 50.0 L78.0 49.9 L78.6 52.0 L79.2 52.1 L78.8 52.3 L78.8 52.6 L78.3 52.7 L77.5 51.5 L78.0 51.9 L78.4 52.0 L78.9 51.9 L80.0 51.6 L80.0 51.8 L79.4 51.8 L79.6 51.9 L79.6 51.7 L79.5 51.4 L79.3 51.5 L79.4 51.4 L79.2 51.4 L79.3 52.3 L79.6 51.9' },
  { date: '2026-06-06', km: 5.1, d: 'M39.9 11.3 L40.1 10.1 L41.4 9.6 L42.7 10.1 L43.9 10.1 L45.3 9.7 L46.1 8.6 L47.0 7.6 L47.5 6.3 L49.0 5.9 L50.5 6.1 L51.6 6.9 L52.1 7.3 L52.1 7.3 L52.8 6.6 L53.7 5.7 L54.1 4.9 L55.0 4.0 L55.2 4.0 L55.4 4.0 L54.9 4.6 L54.6 4.9 L52.0 8.0 L48.3 13.2 L45.6 17.1 L45.7 17.2 L46.7 19.0 L48.5 19.5 L56.1 21.2 L56.3 24.2 L56.1 24.8 L56.3 26.9 L55.7 31.7 L55.9 34.5 L55.9 34.6 L56.4 37.2 L56.4 37.2 L56.9 39.7 L57.5 43.1 L57.7 46.0 L57.9 47.9 L58.2 50.2 L58.2 51.1 L58.7 53.7 L59.3 61.8 L59.3 62.1 L59.3 63.8 L59.3 63.8 L59.7 65.8 L59.6 68.2 L59.6 69.6 L59.6 73.4 L59.9 76.9 L60.0 77.5 L60.1 78.8 L60.1 82.8 L60.0 85.5 L60.0 88.4 L59.9 89.6 L60.0 89.8 L60.1 96.0' },
  { date: '2026-03-03', km: 4.8, d: 'M32.5 94.9 L31.8 95.2 L32.0 95.6 L32.0 95.3 L30.2 95.6 L31.8 90.1 L34.6 83.6 L37.9 76.8 L41.5 70.2 L46.1 67.0 L52.4 62.1 L59.4 58.7 L61.6 57.4 L68.7 53.7 L75.3 50.6 L75.6 48.3 L76.2 45.0 L79.1 38.9 L82.2 33.7 L75.6 31.6 L67.2 28.3 L59.0 26.7 L58.6 24.9 L52.4 22.9 L44.5 20.8 L45.1 16.4 L46.7 15.8 L42.3 13.1 L44.1 9.5 L44.6 9.2 L41.3 10.1 L36.8 7.0 L33.4 4.5 L28.9 4.0 L26.6 7.1 L28.1 6.4 L26.1 8.9 L22.4 7.9 L17.8 11.7 L20.7 14.2 L19.9 16.7 L25.4 18.8 L32.3 20.8 L38.3 22.8 L45.5 25.0 L53.1 26.1 L54.6 29.8 L48.2 34.1 L42.9 38.1 L42.7 43.4 L42.1 47.9 L41.6 53.0 L49.0 56.9 L50.5 62.3 L46.6 65.4 L40.5 69.3 L40.5 71.7 L37.7 78.1 L34.1 84.6 L31.4 90.8 L30.9 96.0' },
  ],
};

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
    routes,
    ecg,
    coach,
    coachSecondary,
  };
};
