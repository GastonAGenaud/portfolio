'use client';
import { usePersona, type Persona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Option = { key: Persona; icon: string; token: string };

const options: Option[] = [
  {
    key: 'engineer',
    icon: 'ph:code-bold',
    token: tokens.creativeSectionType.personaDev,
  },
  {
    key: 'creative',
    icon: 'ph:camera-bold',
    token: tokens.creativeSectionType.personaStudio,
  },
];

const PersonaSwitch = ({ className = '' }: { className?: string }) => {
  const { persona, setPersona } = usePersona();
  const { t } = useTranslation();

  return (
    <div
      role="tablist"
      aria-label="Persona"
      className={`relative inline-flex items-center rounded-full border border-dark-3/40 bg-bg-secondary/60 p-1 backdrop-blur ${className}`}
    >
      {options.map((opt) => {
        const active = persona === opt.key;
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={active}
            onClick={() => setPersona(opt.key)}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors duration-300 ${
              active ? 'text-bg' : 'text-text hover:text-accent'
            }`}
          >
            {active && (
              <motion.span
                layoutId="persona-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <Icon icon={opt.icon} width="15" height="15" />
            <span className="hidden xs:inline">{t(opt.token)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PersonaSwitch;
