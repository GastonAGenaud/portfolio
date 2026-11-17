import { cn } from '@/components/animata/utils';

import type { ComponentProps } from 'react';

export function SplitRevealProgressSlot({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-center',
        className
      )}
      data-split-reveal-progress=""
      {...props}
    >
      <div className="w-[min(18rem,70vw)]">{children}</div>
    </div>
  );
}
