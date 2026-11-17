'use client';
import { FEATURES } from '@/lib/config/features';
import { type Persona, usePersona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type Option = { key: Persona; icon: string; token: string };

const allOptions: Option[] = [
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
  {
    key: 'services',
    icon: 'ph:rocket-launch-bold',
    token: tokens.servicesSectionType.switchLabel,
  },
  {
    key: 'training',
    icon: 'ph:crown-fill',
    token: tokens.creativeSectionType.sport.switchLabel,
  },
];

const options = FEATURES.sport
  ? allOptions
  : allOptions.filter((opt) => opt.key !== 'training');

const PersonaSwitch = ({ className = '' }: { className?: string }) => {
  const { persona, setPersona } = usePersona();
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);

  // When the header runs out of room the switch scrolls inside its pill
  // (see the classes below), so keep the selected option in sight.
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [persona]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Persona"
      // min-w-0 + overflow-x-auto: on a narrow screen, or when the logo font
      // falls back to a wider one or the visitor enlarges the text, the switch
      // gives up width and scrolls instead of pushing the menu off-screen.
      className={`relative inline-flex min-w-0 max-w-full items-center overflow-x-auto rounded-full border border-dark-3/40 bg-bg-secondary/60 p-0.5 sm:p-1 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {options.map((opt) => {
        const active = persona === opt.key;
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={active}
            data-testid={`persona-${opt.key}`}
            onClick={() => setPersona(opt.key)}
            className={`relative z-10 flex shrink-0 items-center gap-1.5 rounded-full px-1 min-[390px]:px-1.5 min-[412px]:px-2 sm:px-3 py-1.5 text-xs font-medium capitalize transition-colors duration-300 ${
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
            <span className="hidden sm:inline lg:hidden 2xl:inline">
              {t(opt.token)}
            </span>
          </button>
        );
      })}
      <a
        href="https://veniaver.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Veni a Ver"
        title="Veni a Ver"
        className="relative z-10 flex shrink-0 items-center rounded-full px-1 min-[390px]:px-1.5 min-[412px]:px-2 sm:px-3 py-1.5 text-text transition-colors duration-300 hover:text-accent"
      >
        <Icon icon="ph:storefront-bold" width="15" height="15" />
      </a>
      <a
        href="https://thevirginia.site/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="The Virginia"
        title="The Virginia"
        className="relative z-10 flex shrink-0 items-center rounded-full px-1 min-[390px]:px-1.5 min-[412px]:px-2 sm:px-3 py-1.5 text-text transition-colors duration-300 hover:text-accent"
      >
        <Icon icon="ph:shield-check-bold" width="15" height="15" />
      </a>
    </div>
  );
};

export default PersonaSwitch;
