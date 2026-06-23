'use client';
import { author, socialLinks } from '@/lib/content/portfolio';
import { usePersona } from '@/lib/hooks/use-persona';

import { tokens } from '@/locales/tokens';

import Gallery from '@/components/creative/Gallery';

import Training from './Training';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const socials = [
  { icon: 'mdi:instagram', url: socialLinks.instagram },
  { icon: 'fa-brands:adobe', url: socialLinks.lightroom },
  { icon: 'lucide:linkedin', url: socialLinks.linkedin },
];

const CreativeHome = () => {
  const { t } = useTranslation();
  const { sportEnabled, sportActive } = usePersona();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* Editorial hero */}
      <section className="flex min-h-[88vh] flex-col justify-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          {t(tokens.creativeSectionType.role)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-serif text-6xl leading-[0.95] tracking-tight text-dark-1 sm:text-8xl"
        >
          {author.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-6 max-w-xl font-serif text-xl italic text-dark-2 sm:text-2xl"
        >
          {t(tokens.creativeSectionType.tagline)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-lg text-sm text-text"
        >
          {t(tokens.creativeSectionType.intro)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center gap-5"
        >
          {socials.map((s) => (
            <a
              key={s.icon}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-dark-3 transition-colors hover:text-accent"
            >
              <Icon icon={s.icon} width="22" height="22" />
            </a>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-dark-3"
        >
          <Icon icon="tabler:chevron-down" className="animate-bounce" />
          {t(tokens.creativeSectionType.scrollHint)}
        </motion.div>
      </section>

      <Gallery />

      <AnimatePresence>
        {sportEnabled && sportActive && <Training />}
      </AnimatePresence>
    </div>
  );
};

export default CreativeHome;
