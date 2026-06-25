'use client';
import clsx from 'clsx';

interface Props {
  className?: string;
  goal?: boolean;
  dim?: boolean;
}

/**
 * Athletic male musculature figure used as the placeholder until real photos
 * are added. Source: a CC0 anatomical figure (freesvg.org), pre-rendered to a
 * marble-toned transparent PNG so it reads like a classical sculpture against
 * the editorial dark palette.
 */
const BodySilhouette = ({ className, goal, dim }: Props) => {
  const filter = dim
    ? 'grayscale(0.4) brightness(0.85) drop-shadow(0 12px 22px rgba(0,0,0,0.5))'
    : `brightness(${goal ? 1.08 : 1}) drop-shadow(0 18px 30px rgba(0,0,0,0.55))`;

  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: goal
            ? 'radial-gradient(58% 52% at 50% 34%, rgba(231,229,228,0.16), transparent 72%)'
            : 'radial-gradient(56% 50% at 50% 34%, rgba(231,229,228,0.10), transparent 72%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fitness/_assets/figure.png"
        alt="Athletic figure placeholder"
        loading="lazy"
        className="relative h-full w-auto max-w-full object-contain"
        style={{ filter, opacity: dim ? 0.55 : 0.94 }}
      />
    </div>
  );
};

export default BodySilhouette;
