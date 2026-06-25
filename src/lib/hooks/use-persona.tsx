'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Persona = 'engineer' | 'creative' | 'training';

export const PERSONA_COOKIE = 'persona';
// One year — refreshed on every change.
const PERSONA_MAX_AGE = 60 * 60 * 24 * 365;

type PersonaState = {
  persona: Persona;
  isCreative: boolean;
  isTraining: boolean;
  setPersona: (persona: Persona) => void;
};

const initialState: PersonaState = {
  persona: 'engineer',
  isCreative: false,
  isTraining: false,
  setPersona: () => {
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
   * first client render matches the server HTML — no hydration mismatch/flash
   * for returning Studio/Training visitors.
   */
  initialPersona?: Persona;
}) {
  const [persona, setPersonaState] = useState<Persona>(initialPersona);

  const setPersona = useCallback((next: Persona) => {
    setPersonaState(next);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    // Persist to a cookie so the next server render resolves the same persona.
    document.cookie = `${PERSONA_COOKIE}=${persona}; path=/; max-age=${PERSONA_MAX_AGE}; SameSite=Lax`;
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  return (
    <PersonaContext.Provider
      value={{
        persona,
        isCreative: persona === 'creative',
        isTraining: persona === 'training',
        setPersona,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
