'use client';

import { cn } from '@/components/animata/utils';

import { useSplitReveal } from './context';
import type { ComponentProps } from 'react';

export function SplitRevealShutter({
  side,
  className,
  style,
  ...props
}: ComponentProps<'div'> & { side: 'top' | 'bottom' }) {
  const { backgroundColor } = useSplitReveal();

  return (
    <div
      className={cn(
        'absolute inset-x-0 h-1/2 will-change-transform',
        side === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{ backgroundColor, ...style }}
      data-split-reveal-shutter={side}
      {...props}
    />
  );
}
