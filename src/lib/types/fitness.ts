// Types for the /fitness athletic-transformation experience.
// Numeric data is language-independent; narrative strings carry both locales.

export type Locale = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface BodyMeasures {
  chest?: number; // cm
  waist?: number; // cm
  hip?: number; // cm
  arm?: number; // cm
}

export interface MilestoneNutrition {
  kcal?: number;
  proteinG?: number;
}

export interface FitnessMilestone {
  /** ISO date, also used to resolve the optional photo: public/fitness/<id>.jpg */
  id: string;
  /** Pretty date already split so we can localize month names in the component. */
  date: string; // ISO yyyy-mm-dd (formatted for display in the component)
  /** Short uppercase tag shown like a chip (kept neutral, can be localized). */
  tag?: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;

  weight?: number; // kg
  bodyFatPct?: number; // %
  fatKg?: number; // kg
  leanKg?: number; // lean / fat-free mass kg
  muscleKg?: number; // skeletal/muscle mass kg (InBody)
  musclePct?: number; // % muscle
  skeletalKg?: number; // skeletal muscle mass kg
  visceral?: number; // visceral fat index
  restingHr?: number; // bpm
  bmi?: number;
  vo2?: number;

  measures?: BodyMeasures;
  nutrition?: MilestoneNutrition;

  /** Optional photo file under public/fitness/. When absent → BodySilhouette. */
  image?: string;

  /** Aspirational target slide (renders differently). */
  isGoal?: boolean;
  /** ISO target date for the goal slide. */
  targetDate?: string;
}

export interface TrendPoint {
  date: string; // ISO
  weight: number; // kg
  bodyFat: number; // %
}

export interface BloodMarker {
  label: LocalizedText;
  value: string; // pre-formatted (e.g. "84 mg/dL")
  ref: string; // reference range
  status: 'good' | 'watch';
}

export interface BloodPanel {
  date: string; // ISO extraction date
  markers: BloodMarker[];
}

export interface NutritionProtocol {
  kcal: string; // e.g. "1800"
  protein: LocalizedText; // e.g. "1.8–2 g/kg"
  carbs: LocalizedText;
  fat: LocalizedText;
  fiber: string; // e.g. "≥20 g"
  steps: string; // e.g. "10.000"
}

export interface GoalTarget {
  weight: number;
  bodyFatPct: number;
  targetDate: string;
}

export interface FitnessHeroStat {
  value: string;
  label: LocalizedText;
}

export interface ComparisonSnapshot {
  date: string; // ISO
  weight: number; // kg
  bodyFatPct: number; // %
  visceral?: number;
  muscleKg?: number;
  musclePct?: number;
}

export interface Comparison {
  then: ComparisonSnapshot;
  now: ComparisonSnapshot;
}
