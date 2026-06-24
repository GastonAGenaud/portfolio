'use client';
import { usePersona, type Persona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
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
 * Three-state mode switch — the site's single section-transition control:
 *  - Dev    → engineer portfolio    (persona 'engineer')
 *  - Studio → photography gallery    (persona 'creative', editorial dark)
 *  - Greek  → the /fitness page (crown). On the portfolio Greek only appears in
 *             Studio; on /fitness all three show and Greek is active. From
 *             /fitness, Dev/Studio navigate back home with that persona applied.
 * Persona (not theme) drives Dev/Studio so it composes with the dark/light
 * toggle; the editorial palette is forced via [data-persona='creative'].
 */
const ModeSwitch = ({ onNavigate, variant = 'site', className }: Props) => {
  const { persona, setPersona } = usePersona();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const onFitness = !!pathname && pathname.startsWith('/fitness');
  const greek = variant === 'greek';

  const devActive = !onFitness && persona === 'engineer';
  const studioActive = !onFitness && persona === 'creative';
  const greekActive = onFitness;
  // Greek is reachable from the Studio (creative) side, and always shown on the
  // fitness page itself. persona is SSR-resolved (cookie) so this is stable.
  const showGreek = onFitness || persona === 'creative';

  // Dev/Studio set the persona; when on /fitness they also navigate back home.
  // Switching mode lands you at the top of the page rather than keeping the
  // previous scroll position. A route change (from /fitness) already scrolls to
  // top; an in-place persona swap on home does not, so reset it explicitly.
  const selectPersona = (next: Persona) => {
    onNavigate?.();
    setPersona(next);
    if (onFitness) router.push('/');
    else window.scrollTo({ top: 0, left: 0 });
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
        onClick={() => selectPersona('engineer')}
        aria-pressed={devActive}
        title="Dev"
        className={clsx(segmentBase, devActive ? activeCls : idleCls)}
      >
        <Icon icon="ph:code-bold" width="16" height="16" />
        <span className="hidden sm:inline">
          {t(tokens.creativeSectionType.personaDev)}
        </span>
      </button>

      <button
        type="button"
        onClick={() => selectPersona('creative')}
        aria-pressed={studioActive}
        title="Studio"
        className={clsx(segmentBase, studioActive ? activeCls : idleCls)}
      >
        <Icon icon="ph:camera-bold" width="16" height="16" />
        <span className="hidden sm:inline">
          {t(tokens.creativeSectionType.personaStudio)}
        </span>
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
