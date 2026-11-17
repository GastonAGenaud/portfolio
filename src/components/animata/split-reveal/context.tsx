'use client';

import type {
  SplitRevealContextValue,
  SplitRevealInternalContextValue,
} from './types';
import { createContext, useContext } from 'react';

export const SplitRevealContext = createContext<SplitRevealContextValue | null>(
  null
);
export const SplitRevealInternalContext =
  createContext<SplitRevealInternalContextValue | null>(null);

export function useSplitReveal() {
  const context = useContext(SplitRevealContext);
  if (!context) {
    throw new Error(
      'SplitReveal primitives must be used within <SplitReveal>.'
    );
  }
  return context;
}

export function useSplitRevealInternal() {
  const context = useContext(SplitRevealInternalContext);
  if (!context) {
    throw new Error(
      'SplitReveal.Task and SplitReveal.Images must be used within <SplitReveal>.'
    );
  }
  return context;
}
