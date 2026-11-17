'use client';

// Adapted from Animata's "Photographer portfolio" hero demo
// (https://animata.design/demo/hero/photographer-portfolio, MIT), with the
// creative persona palette and photos from public/gallery/hero.
import { author } from '@/lib/content/portfolio';

import CardStack, {
  type CardStackItem,
  useCardStack,
} from '@/components/animata/card-stack';
import { MapPinIcon } from '@/components/animata/icons/map-pin';
import { SwitchCameraIcon } from '@/components/animata/icons/switch-camera';
import SplitReveal from '@/components/animata/split-reveal';
import TrailingImage from '@/components/animata/trailing-image';
import { cn } from '@/components/animata/utils';

import { tokens } from '@/locales/tokens';

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

const t$ = tokens.creativeSectionType.hero;

// The creative persona palette (see globals.css).
const CANVAS = 'var(--color-bg)';
const INK = 'var(--color-dark-1)';
const PRINT_WIDTH = 900;
const PRINT_HEIGHT = 1125;

const AVATAR = '/gallery/hero/avatar.webp';
// 4:5 crops of the gallery photos, in the same order as `hero.frames` in the locales.
const PRINTS = ['33', '54', '92', '78', '46', '35'];
const TRAIL_IMAGES = [
  '10',
  '13',
  '22',
  '25',
  '39',
  '49',
  '51',
  '62',
  '69',
  '73',
  '74',
  '76',
].map((id) => `/gallery/hero/trail-${id}.webp`);
const PRINT_IMAGES = PRINTS.map((id) => `/gallery/hero/print-${id}.webp`);
const PRELOAD_IMAGES = [AVATAR, ...PRINT_IMAGES, ...TRAIL_IMAGES];

const TONE = {
  mute: 'text-text',
  ink: 'text-dark-1',
} as const;

type PortfolioItem = CardStackItem & {
  image: string;
  title: string;
  tagline: string;
};

const HERO_MARK =
  'mx-1 inline-flex size-[clamp(1.75rem,1.286em,2.25rem)] shrink-0 items-center justify-center align-middle';

function HeroMark({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(HERO_MARK, className)} aria-hidden>
      {children}
    </div>
  );
}

function ProfileGlyph({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      className={cn(
        HERO_MARK,
        'overflow-hidden rounded-full ring-1 ring-dark-3'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="size-full object-cover"
        decoding="async"
      />
    </span>
  );
}

function HeroStory() {
  const { t } = useTranslation();
  const type =
    'text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-[1.55] tracking-[-0.02em]';

  return (
    <div className="flex flex-col gap-[1.15em]">
      <h1 className={type}>
        <span className={TONE.mute}>{t(t$.hi)}</span>
        <span className={TONE.ink}>{t(t$.name)}</span>
        <ProfileGlyph src={AVATAR} alt={author.name} />
        <span className={TONE.mute}>{t(t$.shoot)}</span>
        <HeroMark className="text-dark-1">
          <SwitchCameraIcon className="size-full [&_svg]:size-full" />
        </HeroMark>
        <span className={TONE.mute}> </span>
        <span className={TONE.ink}>{t(t$.subjects)}</span>
        <span className={TONE.mute}>{t(t$.in)}</span>
        <HeroMark className="text-text">
          <MapPinIcon className="size-full [&_svg]:size-full" />
        </HeroMark>
        <span className={TONE.mute}> </span>
        <span className={TONE.ink}>{t(t$.location)}</span>
        <span className={TONE.mute}>{t(t$.outro)}</span>
      </h1>

      <p className={type} style={{ textBoxTrim: 'trim-both' } as CSSProperties}>
        <span className={TONE.mute}>{t(t$.ask)}</span>
        <a
          href={`mailto:${author.email}`}
          className={cn(TONE.ink, 'underline-offset-[4px] hover:underline')}
        >
          {t(t$.cta)}
        </a>
      </p>
    </div>
  );
}

function ViewfinderFrame() {
  const corner = 'absolute size-4 border-white/80';
  return (
    <div
      className="pointer-events-none absolute inset-3 sm:inset-4"
      aria-hidden
    >
      <span className={cn(corner, 'left-0 top-0 border-l-2 border-t-2')} />
      <span className={cn(corner, 'right-0 top-0 border-r-2 border-t-2')} />
      <span className={cn(corner, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={cn(corner, 'bottom-0 right-0 border-b-2 border-r-2')} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.16]">
        <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white" />
        <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
      </div>
    </div>
  );
}

function PrintCaption({ items }: { items: PortfolioItem[] }) {
  const { activeItem } = useCardStack<PortfolioItem>();
  if (!activeItem) return null;

  const rawIndex = items.findIndex((item) => item.id === activeItem.id);
  const index = rawIndex === -1 ? 1 : rawIndex + 1;
  // The caption follows the language even while the stack keeps its own order.
  const current = items[index - 1];

  return (
    <figcaption className="relative z-10 shrink-0 border-b border-dark-2 pb-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-dark-1">
          {current.title}
        </p>
        <p className="shrink-0 text-[11px] font-medium tabular-nums tracking-[0.1em] text-text">
          {String(index).padStart(2, '0')}
          <span className="text-dark-3">/</span>
          {String(items.length).padStart(2, '0')}
        </p>
      </div>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-text">
        {current.tagline}
      </p>
    </figcaption>
  );
}

/** Stack peek is 10% of print height — at 4:5 that is an 8:1 strip */
const STACK_PEEK = 'aspect-[8/1]';

function PrintStack() {
  const { t } = useTranslation();

  return (
    <section
      className="absolute inset-0 overflow-visible"
      aria-label={t(t$.stackLabel)}
    >
      <CardStack.Viewport className="absolute inset-0 overflow-visible pt-[14%] sm:pt-0">
        <CardStack.List>
          {(item: PortfolioItem, index, layer) => (
            <CardStack.Card
              key={item.id}
              layer={layer}
              stackIndex={index}
              className="!inset-x-0 !top-0 !h-fit !w-full overflow-visible rounded-none p-0 shadow-none ring-0"
            >
              <figure className="relative aspect-[4/5] w-full overflow-hidden bg-bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${author.name} — ${item.title}`}
                  width={PRINT_WIDTH}
                  height={PRINT_HEIGHT}
                  decoding="async"
                  draggable={false}
                  className="size-full object-cover object-center"
                />
                {index === 0 ? <ViewfinderFrame /> : null}
              </figure>
            </CardStack.Card>
          )}
        </CardStack.List>
      </CardStack.Viewport>
      <CardStack.Trigger full aria-label={t(t$.next)} />
    </section>
  );
}

function PrintProof({
  items,
  stackRef,
  captionRef,
}: {
  items: PortfolioItem[];
  stackRef: RefObject<HTMLElement>;
  captionRef: RefObject<HTMLDivElement>;
}) {
  return (
    <figure
      ref={stackRef}
      className="flex w-full min-w-0 flex-col md:items-end"
    >
      <div
        className={cn(
          'flex w-full min-w-0 flex-col',
          'md:w-[min(100cqw,calc((100cqh-4.5rem)*8/11))]'
        )}
      >
        <div ref={captionRef} className="relative z-30 w-full shrink-0">
          <PrintCaption items={items} />
        </div>

        <div aria-hidden="true" className={cn('w-full shrink-0', STACK_PEEK)} />
        <div className="relative w-full shrink-0">
          <div className="relative w-full overflow-visible pb-[125%] sm:aspect-[4/5] sm:pb-0">
            <div className="absolute inset-0 overflow-visible">
              <PrintStack />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

// Top padding clears the fixed navbar; from md up the side padding clears the
// fixed social and email rails (left-6 / xl:left-12, see ui/Sidebar).
const SHELL =
  'px-6 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28 md:px-16 lg:pb-14 xl:px-28';

export default function PhotographerHero() {
  const { t } = useTranslation();
  const stackRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const items = useMemo<PortfolioItem[]>(
    () =>
      PRINTS.map((id, i) => ({
        id,
        image: PRINT_IMAGES[i],
        title: t(t$.frames[i].title),
        tagline: t(t$.frames[i].tagline),
      })),
    [t]
  );

  return (
    <>
      <section
        className="relative isolate min-h-svh overflow-x-hidden md:h-svh md:overflow-hidden"
        style={{ backgroundColor: CANVAS, color: INK }}
      >
        <TrailingImage
          edgeToEdge
          layerOnly
          contained
          tapToDrop
          // Mouse trails run under the content; on touch screens the dropped
          // photo has to land on top of it to be seen.
          className="isolate z-10 [@media(hover:none)_and_(pointer:coarse)]:z-30"
          images={TRAIL_IMAGES}
          threshold={88}
          maxTrailZIndex={12}
          excludeRefs={[heroRef, captionRef]}
        />

        <CardStack
          items={items}
          depth={3}
          autoplay={preloaderDone}
          autoplayInterval={4500}
        >
          <div
            className={cn(
              'relative isolate z-20 mx-auto flex w-full max-w-[92rem] flex-col md:h-full md:min-h-0 md:flex-1',
              SHELL
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-8',
                'md:h-full md:min-h-0 md:flex-1 md:flex-row md:gap-6'
              )}
            >
              <div className="relative z-20 min-w-0 md:flex md:flex-[2] md:basis-0 md:flex-col md:justify-end">
                <div ref={heroRef}>
                  <HeroStory />
                </div>
              </div>

              <div className="w-full min-w-0 shrink-0 md:flex md:min-h-0 md:flex-[3] md:basis-0 md:flex-col md:justify-end md:[container-type:size]">
                <PrintProof
                  items={items}
                  stackRef={stackRef}
                  captionRef={captionRef}
                />
              </div>
            </div>
          </div>
        </CardStack>
      </section>

      <SplitReveal
        backgroundColor={CANVAS}
        foregroundColor={INK}
        zIndex={120}
        lockScroll
        onComplete={() => setPreloaderDone(true)}
      >
        <SplitReveal.Images urls={PRELOAD_IMAGES} />
        <SplitReveal.Overlay>
          <SplitReveal.Shutter side="top" />
          <SplitReveal.Shutter side="bottom" />
          <SplitReveal.Progress />
        </SplitReveal.Overlay>
      </SplitReveal>
    </>
  );
}
