import type { Publication } from '../types';
import { toPublication } from './build';
import { week1 } from './week1';
import { week2 } from './week2';
import { week3 } from './week3';
import { week4 } from './week4';
import { week5 } from './week5';

// "31 days of QA + AI": one guide per day, in reading order (day 1 first).
export const qaAiSeries: Publication[] = [
  ...week1,
  ...week2,
  ...week3,
  ...week4,
  ...week5,
]
  .sort((a, b) => a.day - b.day)
  .map(toPublication);
