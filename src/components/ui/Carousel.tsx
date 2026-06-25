'use client';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  images: string[];
  alt?: string;
  /** Auto-advance interval in ms. Set to 0 to disable. */
  interval?: number;
  className?: string;
};

const variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '55%' : '-55%', opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '-55%' : '55%', opacity: 0, scale: 0.98 }),
};

/**
 * Small, self-contained image carousel. Slides with a spring transition,
 * auto-advances (pausing on hover/focus), and exposes arrows + dot controls.
 */
const Carousel = ({ images, alt = '', interval = 4500, className = '' }: Props) => {
  const count = images.length;
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(0);
  const [paused, setPaused] = useState(false);

  const paginate = (step: number) => {
    setDir(step);
    setCurrent((c) => (c + step + count) % count);
  };
  const goTo = (target: number) => {
    setDir(target > current ? 1 : -1);
    setCurrent(target);
  };

  useEffect(() => {
    if (paused || count <= 1 || interval <= 0) return;
    const id = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [paused, count, interval, current]);

  if (!count) return null;

  return (
    <div
      className={`group relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-dark-3/40 bg-bg-secondary shadow-lg ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt={alt ? `${alt} — ${current + 1} of ${count}` : `Slide ${current + 1}`}
          loading="lazy"
          draggable={false}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 32 },
            opacity: { duration: 0.25 },
            scale: { duration: 0.3 },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Bottom gradient so the dots stay legible over bright photos */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/90 opacity-0 backdrop-blur transition-opacity duration-200 hover:bg-black/60 focus:opacity-100 focus:outline-none group-hover:opacity-100"
          >
            <Icon icon="ph:caret-left-bold" width="16" height="16" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/90 opacity-0 backdrop-blur transition-opacity duration-200 hover:bg-black/60 focus:opacity-100 focus:outline-none group-hover:opacity-100"
          >
            <Icon icon="ph:caret-right-bold" width="16" height="16" />
          </button>

          <div className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === current}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  i === current ? 'w-5 bg-accent' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
