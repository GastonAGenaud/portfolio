'use client';
import { HeroSectionType } from '@/lib/types/sections';

import { tokens } from '../../../src/locales/tokens';
import { useTranslation } from 'react-i18next';

export const useHeroSection = (): HeroSectionType => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const resumeFileName = 'resume_' + currentLanguage + '.pdf';

  const heroSection: HeroSectionType = {
    subtitle: t(tokens.heroSectionType.subtitle),
    title: t(tokens.heroSectionType.title),
    tagline: t(tokens.heroSectionType.tagline),
    description: t(tokens.heroSectionType.description),
    specialText: t(tokens.heroSectionType.specialText),
    cta: {
      title: t(tokens.heroSectionType.ctaTitle),
      url: `/${resumeFileName}`,
      hideInDesktop: false,
    },
  };

  return heroSection;
};
