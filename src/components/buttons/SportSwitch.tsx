'use client';
import { usePersona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Sport / training toggle (the crown). Rendered by the Navbar only when the
 * persona is `creative` AND the `sport` feature flag is enabled. Reveals the
 * fitness section. Appears with a soft width/opacity morph so it slides in
 * naturally next to the persona switch.
 */
const SportSwitch = ({ className = '' }: { className?: string }) => {
  const { sportActive, toggleSport } = usePersona();
  const { t } = useTranslation();

  return (
    <motion.button
      layout
      initial={{ opacity: 0, width: 0, scale: 0.85 }}
      animate={{ opacity: 1, width: 'auto', scale: 1 }}
      exit={{ opacity: 0, width: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 230, damping: 28, mass: 0.7 }}
      onClick={toggleSport}
      aria-pressed={sportActive}
      title={t(tokens.creativeSectionType.sport.switchLabel)}
      className={`flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors duration-300 ${
        sportActive
          ? 'border-accent bg-accent text-bg'
          : 'border-dark-3/40 text-text hover:text-accent'
      } ${className}`}
    >
      <Icon icon="ph:crown-fill" width="15" height="15" />
      <span className="hidden sm:inline">
        {t(tokens.creativeSectionType.sport.switchLabel)}
      </span>
    </motion.button>
  );
};

export default SportSwitch;
