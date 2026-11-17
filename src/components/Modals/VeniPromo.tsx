'use client';
import { VENI_DOMAIN, VENI_URL } from '@/lib/config/veni';

import ShowLottie from '@/components/ui/ShowLottie';
import VeniLogo from '@/components/ui/VeniLogo';

import { tokens } from '@/locales/tokens';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'veni-promo-dismissed';
const SHOW_DELAY_MS = 3500;

const t$ = tokens.veniPromo;

// Storage can throw in private windows; the card then simply shows again next visit.
const wasDismissed = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const rememberDismissal = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Nothing to do: the card will come back on the next visit.
  }
};

/** Corner card promoting Veni a Ver. Slides in a few seconds after load, once per visitor. */
const VeniPromo = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (wasDismissed()) return;
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => {
    rememberDismissal();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          aria-label={t(t$.label)}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-accent bg-bg-secondary shadow-2xl sm:bottom-5 sm:left-auto sm:right-5 sm:w-[340px]"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t(t$.close)}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-dark-3 bg-bg-secondary text-lg leading-none text-dark-1 transition-colors hover:border-accent"
          >
            ×
          </button>
          <div className="hidden bg-slate-100 sm:block" aria-hidden="true">
            <ShowLottie path="/lotties/veni.json" className="mx-auto" />
          </div>
          <div className="flex flex-col items-start gap-2 p-5 pr-12 sm:pr-5">
            <a
              href={VENI_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={VENI_DOMAIN}
              onClick={rememberDismissal}
              className="transition-opacity hover:opacity-70"
            >
              <VeniLogo className="h-6" />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t(t$.eyebrow)}
            </p>
            <h2 className="text-lg font-bold tracking-tight text-dark-1">
              {t(t$.title)}
            </h2>
            <p className="text-sm leading-relaxed text-text">{t(t$.text)}</p>
            <a
              href={VENI_URL}
              target="_blank"
              rel="noreferrer"
              onClick={rememberDismissal}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t(t$.cta)} ↗
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default VeniPromo;
