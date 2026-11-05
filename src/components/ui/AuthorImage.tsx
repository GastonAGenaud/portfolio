'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { MouseEvent } from 'react';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

type Props = {
  src: string;
  alt: string;
  caption?: string;
  lottie?: string;
};

const spring = { stiffness: 150, damping: 20 };

/**
 * Portrait card: tilts toward the cursor, sits on a soft accent glow, keeps
 * the offset accent frame and floats a small Lottie badge over one corner.
 */
const AuthorImage = ({
  src,
  alt,
  caption,
  lottie = '/lotties/coding.json',
}: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), spring);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-64 sm:w-80 lg:w-[22rem] shrink-0"
      style={{ perspective: 1000 }}
    >
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[2rem] bg-accent/20 blur-3xl"
        animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative group"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-accent transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />

        <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-dark-3/40">
          <Image
            src={src}
            alt={alt}
            width={480}
            height={480}
            priority={false}
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent" />
          {caption && (
            <p className="absolute bottom-3 right-3 max-w-[80%] rounded-full bg-slate-900/60 px-3 py-1.5 font-mono text-[11px] text-slate-100 backdrop-blur-sm sm:text-xs">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              {caption}
            </p>
          )}
        </div>

        <motion.div
          aria-hidden
          className="absolute -top-7 -left-7 h-24 w-24 rounded-2xl bg-bg-secondary p-1 shadow-xl ring-1 ring-dark-3/40 sm:h-28 sm:w-28"
          style={{ translateZ: 40 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Player
            autoplay
            loop
            src={lottie}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthorImage;
