'use client';
import { usePersona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Sports / training toggle. Rendered by the Navbar only when the persona is
 * `creative` AND the `sport` feature flag is enabled — so it stays hidden by
 * default.
 */
const SportSwitch = ({ className = '' }: { className?: string }) => {
  const { sportActive, toggleSport } = usePersona();
  const { t } = useTranslation();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={toggleSport}
      aria-pressed={sportActive}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors duration-300 ${
        sportActive
          ? 'border-accent bg-accent text-bg'
          : 'border-dark-3/40 text-text hover:text-accent'
      } ${className}`}
    >
      <Icon icon="tabler:barbell" width="15" height="15" />
      <span className="hidden xs:inline">
        {t(tokens.creativeSectionType.sport.switchLabel)}
      </span>
    </motion.button>
  );
};

export default SportSwitch;
