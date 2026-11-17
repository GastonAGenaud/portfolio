'use client';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type OrbitStat = {
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  src: string;
  alt: string;
  stats?: OrbitStat[];
};

// Distance from the center to the stat chips, as a percentage of the box.
const ORBIT_RADIUS = 46;
// Share of the inner ring that gets drawn once the portrait is in view.
const ARC_LENGTH = 0.78;

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.5 + i * 0.12,
    },
  }),
};

/** Position of chip `index` out of `count`, spread evenly and kept clear of the top and bottom of the face. */
const orbitPosition = (index: number, count: number) => {
  const degrees = 180 / count + (360 / count) * index;
  const angle = (degrees * Math.PI) / 180;
  return {
    left: `${(50 + ORBIT_RADIUS * Math.sin(angle)).toFixed(2)}%`,
    top: `${(50 - ORBIT_RADIUS * Math.cos(angle)).toFixed(2)}%`,
  };
};

const StatChip = ({
  stat,
  index,
  count,
  active,
}: {
  stat: OrbitStat;
  index: number;
  count: number;
  active: boolean;
}) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, stat.value, {
      duration: 1.2,
      delay: 0.5 + index * 0.12,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, stat.value, index]);

  return (
    <li
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={orbitPosition(index, count)}
    >
      <motion.div
        custom={index}
        variants={chip}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        whileHover={{ scale: 1.08 }}
        className="flex w-max min-w-[5.25rem] max-w-[7rem] flex-col items-center gap-0.5 rounded-2xl border border-dark-3 bg-bg-secondary px-3 py-2 text-center shadow-xl"
      >
        <span className="text-xl font-bold tracking-tight text-accent">
          {n}
          {stat.suffix}
        </span>
        <span className="font-mono text-[10px] leading-tight text-dark-2">
          {stat.label}
        </span>
      </motion.div>
    </li>
  );
};

/**
 * Circular portrait with the key figures in orbit: a dashed ring that turns
 * slowly, an accent arc that draws itself in, and one chip per stat placed
 * radially around the photo.
 */
const AuthorImage = ({ src, alt, stats = [] }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative aspect-square w-72 shrink-0 sm:w-80 lg:w-[22rem]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-accent/20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          strokeWidth="1"
          strokeDasharray="1.5 5"
          strokeLinecap="round"
          className="stroke-dark-2"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
        <g transform="rotate(-90 100 100)">
          <motion.circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-accent"
            initial={{ pathLength: reduceMotion ? ARC_LENGTH : 0 }}
            animate={{ pathLength: inView ? ARC_LENGTH : 0 }}
            transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          />
        </g>
      </svg>

      <div className="absolute inset-[15%] overflow-hidden rounded-full shadow-2xl ring-1 ring-dark-3/40">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 250px, 225px"
          className="object-cover object-[50%_26%]"
        />
      </div>

      <ul>
        {stats.map((stat, i) => (
          <StatChip
            key={stat.label}
            stat={stat}
            index={i}
            count={stats.length}
            active={inView}
          />
        ))}
      </ul>
    </div>
  );
};

export default AuthorImage;
