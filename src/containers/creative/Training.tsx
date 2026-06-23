'use client';
import { author } from '@/lib/content/portfolio';

import { tokens } from '@/locales/tokens';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Training-advisory section. Only mounted by CreativeHome when the persona is
 * `creative`, the `sport` feature flag is enabled, and the user toggled it on.
 */
const Training = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="training"
      className="border-t border-dark-3/20 py-16 sm:py-24"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(tokens.creativeSectionType.sport.subtitle)}
        </p>
        <h2 className="mb-5 flex items-center gap-3 font-serif text-3xl text-dark-1 sm:text-4xl">
          <Icon icon="tabler:barbell" />
          {t(tokens.creativeSectionType.sport.title)}
        </h2>
        <p className="mb-8 text-base leading-relaxed text-text">
          {t(tokens.creativeSectionType.sport.description)}
        </p>
        <a
          href={`mailto:${author.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-dark-1 transition-colors hover:bg-accent hover:text-bg"
        >
          {t(tokens.creativeSectionType.sport.cta)}
          <Icon icon="tabler:arrow-right" width="16" height="16" />
        </a>
      </div>
    </motion.section>
  );
};

export default Training;
