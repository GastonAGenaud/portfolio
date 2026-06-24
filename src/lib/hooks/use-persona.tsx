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

export const PERSONA_COOKIE = 'persona';
// One year — refreshed on every toggle.
const PERSONA_MAX_AGE = 60 * 60 * 24 * 365;

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
  initialPersona = 'engineer',
}: {
  children: React.ReactNode;
  /**
   * Resolved on the server from the `persona` cookie (see app/layout.tsx) so the
   * first client render matches the server HTML. Reading localStorage in the
   * initializer instead would make the server render `engineer` while the client
   * hydrates as `creative`, causing a hydration mismatch + flash for returning
   * Studio visitors.
   */
  initialPersona?: Persona;
}) {
  const [persona, setPersonaState] = useState<Persona>(initialPersona);
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
    // Persist to a cookie so the next server render resolves the same persona.
    document.cookie = `${PERSONA_COOKIE}=${persona}; path=/; max-age=${PERSONA_MAX_AGE}; SameSite=Lax`;
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
