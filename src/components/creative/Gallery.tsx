'use client';
import {
  creativePhotos,
  lightroomAlbumUrl,
  type PhotoSpan,
} from '@/lib/content/creative-photos';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const placeholderRatio: Record<PhotoSpan, string> = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
};

const Placeholder = ({ index }: { index: number }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg-secondary to-bg p-6 text-center">
    <Icon icon="tabler:camera" width="22" height="22" className="text-dark-3" />
    <span className="font-mono text-[10px] uppercase tracking-widest text-dark-3">
      Frame {String(index).padStart(2, '0')}
    </span>
  </div>
);

const Gallery = () => {
  const { t } = useTranslation();
  const photos = creativePhotos;
  const real = photos.filter((p) => p.src);
  const [active, setActive] = useState<number | null>(null);
  // Portal target — the lightbox must escape the persona-transition wrapper,
  // whose blur filter would otherwise become the containing block for `fixed`.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null || real.length === 0
          ? cur
          : (cur + dir + real.length) % real.length
      ),
    [real.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close, go]);

  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-4xl tracking-tight text-dark-1 sm:text-5xl">
            {t(tokens.creativeSectionType.galleryTitle)}
          </h2>
          <p className="mt-2 text-sm text-text">
            {t(tokens.creativeSectionType.gallerySubtitle)}
          </p>
        </div>
        <a
          href={lightroomAlbumUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm text-dark-2 transition-colors hover:text-accent"
        >
          <Icon icon="fa-brands:adobe" width="18" height="18" />
          {t(tokens.creativeSectionType.albumCta)}
          <Icon
            icon="tabler:arrow-up-right"
            width="16"
            height="16"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <div className="gap-3 [column-fill:_balance] sm:gap-4 columns-2 md:columns-3">
        {photos.map((photo, i) => {
          const realIndex = real.findIndex((r) => r.id === photo.id);
          return (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              onClick={() =>
                photo.src
                  ? setActive(realIndex)
                  : window.open(lightroomAlbumUrl, '_blank')
              }
              className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm bg-bg-secondary sm:mb-4 ${
                photo.src
                  ? ''
                  : `${placeholderRatio[photo.span]} border border-white/[0.06]`
              }`}
            >
              {photo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Placeholder index={i + 1} />
              )}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          );
        })}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active !== null && real[active] && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              >
                <button
                  className="absolute right-5 top-5 text-white/70 transition-colors hover:text-white"
                  onClick={close}
                  aria-label="Close"
                >
                  <Icon icon="tabler:x" width="28" height="28" />
                </button>
                <button
                  className="absolute left-3 text-white/60 transition-colors hover:text-white sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                >
                  <Icon icon="tabler:chevron-left" width="36" height="36" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={real[active].id}
                  src={real[active].full}
                  alt={real[active].alt}
                  className="max-h-[85vh] max-w-[90vw] object-contain"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute right-3 text-white/60 transition-colors hover:text-white sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                >
                  <Icon icon="tabler:chevron-right" width="36" height="36" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Gallery;
