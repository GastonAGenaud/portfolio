'use client';
import { Icon } from '@iconify/react';

interface Props {
  coach: { name: string; brand: string; instagram: string; website: string };
  secondary: { name: string; handle: string; instagram: string };
  labels: {
    label: string;
    thanks: string;
    secondaryLabel: string;
    secondaryThanks: string;
  };
}

const CoachCredit = ({ coach, secondary, labels }: Props) => {
  const webHost = coach.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/40 p-6 text-center sm:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        {labels.label}
      </p>
      <p className="mt-3 font-serif text-2xl text-dark-1 sm:text-3xl">
        {coach.name} <span className="text-dark-3">·</span> {coach.brand}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={coach.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-dark-3/40 px-4 py-2 font-mono text-xs text-dark-2 transition-colors hover:border-accent hover:text-accent"
        >
          <Icon icon="mdi:instagram" width="16" />
          @tha_cbo.ar
        </a>
        <a
          href={coach.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-dark-3/40 px-4 py-2 font-mono text-xs text-dark-2 transition-colors hover:border-accent hover:text-accent"
        >
          <Icon icon="tabler:world" width="16" />
          {webHost}
        </a>
      </div>

      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-text">
        {labels.thanks}
      </p>

      {/* Secondary, earlier-stage credit */}
      <div className="mx-auto mt-7 max-w-md border-t border-dark-3/20 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-dark-3">
          {labels.secondaryLabel}
        </p>
        <p className="mt-2 text-sm text-text">
          {labels.secondaryThanks}{' '}
          <a
            href={secondary.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-dark-2 underline decoration-dark-3/40 underline-offset-2 transition-colors hover:text-accent"
          >
            {secondary.handle}
          </a>
        </p>
      </div>
    </div>
  );
};

export default CoachCredit;
