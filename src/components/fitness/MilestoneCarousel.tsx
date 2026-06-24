'use client';
import { FitnessMilestone, Locale } from '@/lib/types/fitness';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import MilestoneSlide, { SlideLabels } from './MilestoneSlide';

interface FuelItem {
  label: string;
  value: string;
}

interface Props {
  milestones: FitnessMilestone[];
  index: number;
  setIndex: (i: number) => void;
  locale: Locale;
  baseline: { weight: number; bodyFatPct: number };
  localize: (t: { en: string; es: string }) => string;
  labels: SlideLabels;
  fuel: { title: string; items: FuelItem[] };
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
};

const EqualizerBar = ({ i }: { i: number }) => (
  <motion.span
    className="w-[3px] rounded-full bg-[var(--gk-bronze)]"
    style={{ transformOrigin: 'bottom', height: 22 }}
    animate={{ scaleY: [0.3, 1, 0.5, 0.85, 0.35] }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: (i % 7) * 0.12,
    }}
  />
);

const MilestoneCarousel = ({
  milestones,
  index,
  setIndex,
  locale,
  baseline,
  localize,
  labels,
  fuel,
}: Props) => {
  const prevIndex = useRef(index);
  const direction = index >= prevIndex.current ? 1 : -1;
  useEffect(() => {
    prevIndex.current = index;
  }, [index]);

  const total = milestones.length;
  const go = (dir: number) => {
    const next = Math.min(Math.max(index + dir, 0), total - 1);
    setIndex(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const milestone = milestones[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--gk-border)] bg-[var(--gk-glass)] p-5 backdrop-blur-sm sm:p-8">
      {/* slide stage */}
      <div className="relative min-h-[460px] sm:min-h-[440px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={milestone.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.645, 0.045, 0.355, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="h-full cursor-grab active:cursor-grabbing"
          >
            <MilestoneSlide
              milestone={milestone}
              index={index}
              total={total}
              locale={locale}
              baseline={baseline}
              localize={localize}
              labels={labels}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom control bar */}
      <div className="mt-6 flex flex-col gap-4 border-t border-[var(--gk-border)] pt-5 sm:flex-row sm:items-center">
        {/* prev / next */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous"
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gk-border)] duration-200',
              index === 0
                ? 'cursor-not-allowed opacity-30'
                : 'text-[var(--gk-marble)] hover:border-[var(--gk-bronze)] hover:text-[var(--gk-bronze)]'
            )}
          >
            <Icon icon="ph:arrow-left" width="18" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Next"
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gk-border)] duration-200',
              index === total - 1
                ? 'cursor-not-allowed opacity-30'
                : 'text-[var(--gk-marble)] hover:border-[var(--gk-bronze)] hover:text-[var(--gk-bronze)]'
            )}
          >
            <Icon icon="ph:arrow-right" width="18" />
          </button>
        </div>

        {/* fuel "player" strip */}
        <div className="flex flex-1 items-center gap-4 rounded-full border border-[var(--gk-border)] bg-[var(--gk-glass-2)] px-4 py-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gk-bronze-soft)] text-[var(--gk-bronze)]">
            <Icon icon="game-icons:meal" width="16" />
          </span>
          <div className="flex h-6 shrink-0 items-end gap-[3px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <EqualizerBar key={i} i={i} />
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-[var(--gk-marble)]">
              {fuel.title}
            </p>
            <p className="truncate font-mono text-[11px] text-[var(--gk-muted)]">
              {fuel.items.map((it) => `${it.value} ${it.label}`).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCarousel;
