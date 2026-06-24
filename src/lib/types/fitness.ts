// Types for the fitness / training section (Creative persona → Sport).
// Numeric data is language-independent; narrative strings carry both locales.
// Nothing pharmacological is represented here by design.

export type Locale = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface BodyMeasures {
  chest?: number;
  waist?: number;
  hip?: number;
  arm?: number;
}

export interface FitnessMilestone {
  id: string; // ISO date; also resolves an optional photo public/fitness/<id>.jpg
  date: string; // ISO yyyy-mm-dd
  tag?: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;

  weight?: number; // kg
  bodyFatPct?: number; // %
  fatKg?: number;
  leanKg?: number;
  muscleKg?: number;
  musclePct?: number;
  skeletalKg?: number;
  visceral?: number;
  restingHr?: number;
  bmi?: number;
  vo2?: number;

  measures?: BodyMeasures;
  image?: string;

  isGoal?: boolean;
}

export interface TrendPoint {
  date: string;
  weight: number;
  bodyFat: number;
}

export interface BloodPressurePoint {
  date: string;
  sys: number; // systolic mmHg
  dia: number; // diastolic mmHg
  pulse?: number; // bpm
}

export interface BloodMarker {
  label: LocalizedText;
  value: string;
  ref: string;
  status: 'good' | 'watch';
}

export interface BloodPanel {
  date: string;
  markers: BloodMarker[];
}

export interface NutritionProtocol {
  kcal: string;
  protein: LocalizedText;
  carbs: LocalizedText;
  fat: LocalizedText;
  fiber: string;
  steps: string;
}

export interface ComparisonSnapshot {
  date: string;
  weight: number;
  bodyFatPct: number;
  visceral?: number;
  muscleKg?: number;
  musclePct?: number;
  bp?: string; // e.g. "131/82"
}

export interface Comparison {
  then: ComparisonSnapshot;
  now: ComparisonSnapshot;
}
