'use client';
import { CoursesSectionType } from '@/lib/types/sections';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useCoursesSection = (): CoursesSectionType => {
  const { t } = useTranslation();

  const coursesSection: CoursesSectionType = {
    title: t(tokens.coursesSectionType.title),
    subtitle: t(tokens.coursesSectionType.subtitle),
    paragraphs: [t(tokens.coursesSectionType.paragraphs[0])],
    link: `https://academy-frontend-kappa.vercel.app/`,
    ctaTitle: t(tokens.coursesSectionType.ctaTitle),
  };

  return coursesSection;
};
