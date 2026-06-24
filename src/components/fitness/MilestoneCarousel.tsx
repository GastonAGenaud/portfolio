'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import MilestoneSlide, { SlideLabels } from './MilestoneSlide';

interface Props {
  milestones: FitnessMilestone[];
  locale: Locale;
  baseline: { weight: number; bodyFatPct: number };
  localize: (t: { en: string; es: string }) => string;
  labels: SlideLabels;
  dragHint: string;
  onActiveChange?: (index: number) => void;
}

const shortDate = (iso: string, locale: Locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'short' }
  );
};

const MilestoneCarousel = ({
  milestones,
  locale,
  baseline,
  localize,
  labels,
  dragHint,
  onActiveChange,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startLeft: number; active: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [grabbing, setGrabbing] = useState(false);
  const total = milestones.length;

  const setActiveSafe = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(i, 0), total - 1);
      setActive(clamped);
      onActiveChange?.(clamped);
    },
    [total, onActiveChange]
  );

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (drag.current) return;
        setActiveSafe(Math.round(el.scrollLeft / el.clientWidth));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setActiveSafe]);

  // Mouse drag-to-scroll. The pointer is only captured once it actually MOVES,
  // so a plain click still reaches inner buttons/links (e.g. the Details modal).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, active: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!drag.current || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.active) {
      if (Math.abs(dx) < 6) return; // a click, not a drag — let it through
      drag.current.active = true;
      setGrabbing(true);
      el.style.scrollSnapType = 'none';
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!drag.current || !el) return;
    const wasActive = drag.current.active;
    drag.current = null;
    if (!wasActive) return;
    setGrabbing(false);
    el.style.scrollSnapType = '';
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSafe(i);
    scrollToIndex(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndex(active - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndex(active + 1);
    }
  };

  const progress = total > 1 ? (active / (total - 1)) * 100 : 0;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-4 sm:p-6">
      {/* stage */}
      <div className="group relative">
        <div
          ref={trackRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          className={clsx(
            'flex snap-x snap-mandatory overflow-x-auto outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            grabbing ? 'cursor-grabbing select-none' : 'cursor-grab'
          )}
        >
          {milestones.map((m, i) => (
            <div
              key={m.id}
              className="min-h-[440px] w-full shrink-0 snap-center px-1 sm:min-h-[420px]"
            >
              <MilestoneSlide
                milestone={m}
                index={i}
                total={total}
                locale={locale}
                baseline={baseline}
                localize={localize}
                labels={labels}
              />
            </div>
          ))}
        </div>

        {/* desktop-only "drag" affordance, revealed on hover */}
        <div className="pointer-events-none absolute top-2 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-dark-3/40 bg-bg/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dark-2 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <Icon icon="tabler:arrows-horizontal" width="14" className="text-accent" />
          {dragHint}
        </div>
      </div>

      {/* ---------- scrubber ---------- */}
      <div className="mt-6 flex items-center gap-3 border-t border-dark-3/20 pt-5 sm:gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className={clsx(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dark-3/30 duration-200',
            active === 0 ? 'cursor-not-allowed opacity-30' : 'text-dark-1 hover:border-accent hover:text-accent'
          )}
        >
          <Icon icon="tabler:arrow-left" width="17" />
        </button>

        {/* animated dot timeline */}
        <div className="relative min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto flex min-w-[480px] items-start justify-between px-2 pt-2 sm:min-w-0">
            {/* base + progress line */}
            <div className="absolute left-3 right-3 top-[14px] h-px bg-dark-3/30" />
            <div
              className="absolute left-3 top-[14px] h-px bg-accent duration-500"
              style={{ width: `calc((100% - 24px) * ${progress / 100})` }}
            />
            {milestones.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={shortDate(m.date, locale)}
                  aria-current={on}
                  className="group/dot relative z-10 flex flex-col items-center"
                >
                  <motion.span
                    animate={{ scale: on ? 1.15 : 1 }}
                    whileHover={{ scale: 1.55 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className={clsx(
                      'flex items-center justify-center rounded-full border-2',
                      on
                        ? 'h-4 w-4 border-accent bg-accent'
                        : 'h-3 w-3 border-dark-3/60 bg-bg-secondary group-hover/dot:border-accent'
                    )}
                  >
                    {m.isGoal && (
                      <Icon
                        icon="ph:flag-banner-fill"
                        width="8"
                        className={on ? 'text-bg' : 'text-accent'}
                      />
                    )}
                  </motion.span>
                  <span
                    className={clsx(
                      'mt-2 whitespace-nowrap font-mono text-[10px] tracking-wide duration-200',
                      on
                        ? 'font-medium text-accent'
                        : 'text-dark-3 group-hover/dot:text-dark-1'
                    )}
                  >
                    {shortDate(m.date, locale)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === total - 1}
          aria-label="Next"
          className={clsx(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dark-3/30 duration-200',
            active === total - 1 ? 'cursor-not-allowed opacity-30' : 'text-dark-1 hover:border-accent hover:text-accent'
          )}
        >
          <Icon icon="tabler:arrow-right" width="17" />
        </button>
      </div>
    </div>
  );
};

export default MilestoneCarousel;
