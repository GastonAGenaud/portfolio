'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
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
  const drag = useRef<{ startX: number; startLeft: number } | null>(null);
  const [active, setActive] = useState(0);
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

  // Sync active index from native scroll (touch / trackpad / wheel).
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

  // Mouse drag-to-scroll (touch uses native scrolling). Snaps to nearest on release.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft };
    el.style.scrollSnapType = 'none';
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!drag.current || !el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    const el = trackRef.current;
    if (!drag.current || !el) return;
    drag.current = null;
    el.style.scrollSnapType = '';
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSafe(i);
    scrollToIndex(i);
  };

  // Keyboard arrows when the carousel is focused.
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

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-4 sm:p-6">
      {/* track */}
      <div
        ref={trackRef}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory overflow-x-auto outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
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

      {/* controls */}
      <div className="mt-5 flex items-center gap-4 border-t border-dark-3/20 pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-full border border-dark-3/30 duration-200',
              active === 0 ? 'cursor-not-allowed opacity-30' : 'text-dark-1 hover:border-accent hover:text-accent'
            )}
          >
            <Icon icon="tabler:arrow-left" width="17" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === total - 1}
            aria-label="Next"
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-full border border-dark-3/30 duration-200',
              active === total - 1 ? 'cursor-not-allowed opacity-30' : 'text-dark-1 hover:border-accent hover:text-accent'
            )}
          >
            <Icon icon="tabler:arrow-right" width="17" />
          </button>
        </div>

        {/* date dots — snap points */}
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {milestones.map((m, i) => {
            const on = i === active;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={shortDate(m.date, locale)}
                aria-current={on}
                className="group flex shrink-0 flex-col items-center gap-1.5 px-1.5 py-1"
              >
                <span
                  className={clsx(
                    'h-1.5 rounded-full duration-300',
                    on ? 'w-6 bg-accent' : 'w-1.5 bg-dark-3/50 group-hover:bg-dark-2'
                  )}
                />
                <span
                  className={clsx(
                    'whitespace-nowrap font-mono text-[9px] tracking-wide duration-200',
                    on ? 'text-accent' : 'text-dark-3/0 group-hover:text-dark-3 sm:text-dark-3/60'
                  )}
                >
                  {m.isGoal ? '◆' : shortDate(m.date, locale)}
                </span>
              </button>
            );
          })}
        </div>

        <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dark-3 sm:flex">
          <Icon icon="tabler:hand-finger" width="13" />
          {dragHint}
        </span>
      </div>
    </div>
  );
};

export default MilestoneCarousel;
