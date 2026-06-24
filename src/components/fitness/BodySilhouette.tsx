'use client';
import clsx from 'clsx';

interface Props {
  className?: string;
  /** Stronger, brighter look for the aspirational goal slide. */
  goal?: boolean;
  /** Faded/less-defined look for "before" snapshots. */
  dim?: boolean;
}

/**
 * Athletic male musculature figure used as the placeholder whenever a milestone
 * has no photo yet. Source: a CC0 anatomical figure (freesvg.org), pre-rendered
 * to a bronze-tinted transparent PNG (muscle shading preserved via luminance)
 * so it paints cheaply even when repeated across the page.
 */
const BodySilhouette = ({ className, goal, dim }: Props) => {
  const filter = dim
    ? 'grayscale(0.35) brightness(0.9) drop-shadow(0 12px 22px rgba(0,0,0,0.45))'
    : `brightness(${goal ? 1.08 : 1}) drop-shadow(0 16px 26px rgba(0,0,0,0.5))`;

  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center',
        className
      )}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: goal
            ? 'radial-gradient(60% 55% at 50% 36%, rgba(224,170,78,0.30), rgba(67,201,180,0.05) 60%, transparent 75%)'
            : 'radial-gradient(58% 52% at 50% 36%, rgba(224,170,78,0.18), transparent 72%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fitness/_assets/figure.png"
        alt="Athletic male figure placeholder"
        loading="lazy"
        className="relative h-full w-auto max-w-full object-contain"
        style={{ filter, opacity: dim ? 0.6 : 0.96 }}
      />
    </div>
  );
};

export default BodySilhouette;
