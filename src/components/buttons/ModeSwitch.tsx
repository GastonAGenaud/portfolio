'use client';
import { useTheme } from '@/lib/hooks/use-theme';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  /** Called right before navigating away (e.g. to close a mobile menu). */
  onNavigate?: () => void;
  /** Palette: 'site' for the portfolio navbar, 'greek' for the fitness page. */
  variant?: 'site' | 'greek';
  className?: string;
}

const segmentBase =
  'relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-mono lowercase tracking-wide duration-200 focus:outline-none';

/**
 * Three-state mode switch used as the site's section transition:
 *  - Dev    → dark theme  (portfolio)
 *  - Studio → light theme (portfolio)
 *  - Greek  → the /fitness page (crown). On the portfolio it only appears in
 *             Studio; on the fitness page all three show and Greek is active.
 * The switch is the single transition mechanism: from /fitness, Dev/Studio
 * navigate back home with that theme applied.
 */
const ModeSwitch = ({ onNavigate, variant = 'site', className }: Props) => {
  const { isDarkMode, enableDarkMode, disableDarkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onFitness = !!pathname && pathname.startsWith('/fitness');
  const greek = variant === 'greek';

  const devActive = !onFitness && (!mounted || isDarkMode);
  const studioActive = !onFitness && mounted && !isDarkMode;
  const greekActive = onFitness;
  const showGreek = onFitness || (mounted && !isDarkMode);

  // Dev/Studio return to the portfolio (only needed when leaving /fitness);
  // Greek enters /fitness. The switch is the single transition mechanism.
  const goHome = () => {
    onNavigate?.();
    if (onFitness) router.push('/');
  };
  const goFitness = () => {
    onNavigate?.();
    if (!onFitness) router.push('/fitness');
  };

  const activeCls = greek
    ? 'bg-[var(--gk-bronze-soft)] text-[var(--gk-bronze)]'
    : 'bg-accent-light text-accent';
  const idleCls = greek
    ? 'text-[var(--gk-muted)] hover:text-[var(--gk-marble)]'
    : 'text-dark-3 hover:text-accent';

  return (
    <div
      role="group"
      aria-label="Mode switch"
      className={clsx(
        'flex items-center gap-0.5 rounded-full border p-1 w-fit',
        greek
          ? 'border-[var(--gk-border)] bg-[var(--gk-surface)]'
          : 'border-dark-3 bg-bg-secondary',
        className
      )}
    >
      <button
        type="button"
        onClick={() => {
          enableDarkMode(true);
          goHome();
        }}
        aria-pressed={devActive}
        title="Dev"
        className={clsx(segmentBase, devActive ? activeCls : idleCls)}
      >
        <Icon icon="ph:moon" width="16" height="16" />
        <span className="hidden sm:inline">dev</span>
      </button>

      <button
        type="button"
        onClick={() => {
          disableDarkMode(false);
          goHome();
        }}
        aria-pressed={studioActive}
        title="Studio"
        className={clsx(segmentBase, studioActive ? activeCls : idleCls)}
      >
        <Icon icon="carbon:sun" width="16" height="16" />
        <span className="hidden sm:inline">studio</span>
      </button>

      <AnimatePresence initial={false}>
        {showGreek && (
          <motion.button
            type="button"
            key="greek"
            layout
            initial={{ opacity: 0, width: 0, scale: 0.7 }}
            animate={{ opacity: 1, width: 'auto', scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={goFitness}
            aria-pressed={greekActive}
            title="Greek"
            className={clsx(
              segmentBase,
              'overflow-hidden whitespace-nowrap',
              greek
                ? greekActive
                  ? 'bg-[var(--gk-bronze-soft)] text-[var(--gk-bronze)] ring-1 ring-inset ring-[var(--gk-bronze)]/40'
                  : 'text-[var(--gk-muted)] hover:text-[var(--gk-bronze)]'
                : 'bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/30 hover:text-amber-400'
            )}
          >
            <Icon icon="ph:crown-fill" width="16" height="16" />
            <span>{t(tokens.fitness.switchLabel)}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeSwitch;
