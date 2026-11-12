'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type MouseEvent, useEffect, useState } from 'react';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

type Props = {
  images: string[];
  alt: string;
  lottie?: string;
};

const spring = { stiffness: 150, damping: 20 };
const ROTATE_MS = 5000;

/**
 * Portrait card: crossfades between portraits, tilts toward the cursor, sits on a soft accent glow, keeps
 * the offset accent frame and floats a small Lottie badge over one corner.
 */
const AuthorImage = ({
  images,
  alt,
  lottie = '/lotties/coding.json',
}: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [images.length, paused]);

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
    setPaused(false);
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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-accent transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />

        <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-dark-3/40">
          <div className="relative aspect-square w-full transition-transform duration-700 ease-out group-hover:scale-105">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={i === active ? alt : ''}
                aria-hidden={i !== active}
                width={480}
                height={480}
                priority={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent" />
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
