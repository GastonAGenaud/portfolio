'use client';
import { useTheme } from '@/lib/hooks/use-theme';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  /** Called right before navigating away (e.g. to close a mobile menu). */
  onNavigate?: () => void;
  className?: string;
}

const segmentBase =
  'relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-mono lowercase tracking-wide duration-200 focus:outline-none';

/**
 * Three-state mode switch shown in the navbar.
 *  - Dev    → dark theme (default)
 *  - Studio → light theme
 *  - Greek  → only appears in Studio; navigates to /fitness
 */
const ModeSwitch = ({ onNavigate, className }: Props) => {
  const { isDarkMode, enableDarkMode, disableDarkMode } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  // Avoid SSR/CSR divergence for the theme-derived reveal.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const devActive = !mounted || isDarkMode;
  const studioActive = mounted && !isDarkMode;

  return (
    <div
      role="group"
      aria-label="Mode switch"
      className={clsx(
        'flex items-center gap-0.5 rounded-full border border-dark-3 bg-bg-secondary p-1 w-fit',
        className
      )}
    >
      <button
        type="button"
        onClick={() => enableDarkMode(true)}
        aria-pressed={devActive}
        title="Dev"
        className={clsx(
          segmentBase,
          devActive
            ? 'bg-accent-light text-accent'
            : 'text-dark-3 hover:text-accent'
        )}
      >
        <Icon icon="ph:moon" width="16" height="16" />
        <span className="hidden sm:inline">dev</span>
      </button>

      <button
        type="button"
        onClick={() => disableDarkMode(false)}
        aria-pressed={studioActive}
        title="Studio"
        className={clsx(
          segmentBase,
          studioActive
            ? 'bg-accent-light text-accent'
            : 'text-dark-3 hover:text-accent'
        )}
      >
        <Icon icon="carbon:sun" width="16" height="16" />
        <span className="hidden sm:inline">studio</span>
      </button>

      <AnimatePresence initial={false}>
        {studioActive && (
          <motion.button
            type="button"
            key="greek"
            layout
            initial={{ opacity: 0, width: 0, scale: 0.7 }}
            animate={{ opacity: 1, width: 'auto', scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={() => {
              onNavigate?.();
              router.push('/fitness');
            }}
            title="Greek"
            className={clsx(
              segmentBase,
              'overflow-hidden whitespace-nowrap text-amber-500 hover:text-amber-400',
              'bg-amber-500/10 ring-1 ring-inset ring-amber-500/30'
            )}
          >
            <Icon icon="game-icons:laurel-crown" width="17" height="17" />
            <span>{t(tokens.fitness.switchLabel)}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeSwitch;
