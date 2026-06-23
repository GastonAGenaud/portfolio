'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { FEATURES } from '@/lib/config/features';

export type Persona = 'engineer' | 'creative';

type PersonaState = {
  persona: Persona;
  isCreative: boolean;
  togglePersona: () => void;
  setPersona: (persona: Persona) => void;
  /** Feature flag — when false the sports switch + section never render. */
  sportEnabled: boolean;
  /** User toggle, only meaningful inside the creative persona. */
  sportActive: boolean;
  toggleSport: () => void;
};

const initialState: PersonaState = {
  persona: 'engineer',
  isCreative: false,
  togglePersona: () => {
    return;
  },
  setPersona: () => {
    return;
  },
  sportEnabled: FEATURES.sport,
  sportActive: false,
  toggleSport: () => {
    return;
  },
};

const PersonaContext = createContext(initialState);

export default function PersonaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read synchronously (mirrors use-theme) so a reload while in creative mode
  // doesn't flash the engineer layout. The no-flash script sets the matching
  // `data-persona` attribute before paint.
  const [persona, setPersonaState] = useState<Persona>(
    typeof window !== 'undefined' &&
      localStorage.getItem('persona') === 'creative'
      ? 'creative'
      : 'engineer'
  );
  const [sportActive, setSportActive] = useState<boolean>(false);

  const setPersona = useCallback((next: Persona) => {
    setPersonaState(next);
  }, []);

  const togglePersona = useCallback(() => {
    setPersonaState((prev) => (prev === 'engineer' ? 'creative' : 'engineer'));
  }, []);

  const toggleSport = useCallback(() => {
    setSportActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    localStorage.setItem('persona', persona);
    document.documentElement.dataset.persona = persona;
    // Leaving the creative persona always collapses the sports view.
    if (persona !== 'creative') setSportActive(false);
  }, [persona]);

  return (
    <PersonaContext.Provider
      value={{
        persona,
        isCreative: persona === 'creative',
        togglePersona,
        setPersona,
        sportEnabled: FEATURES.sport,
        sportActive,
        toggleSport,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
