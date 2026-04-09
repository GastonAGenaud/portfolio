'use client';
import { LifeProjectsSectionType } from '@/lib/types/sections';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useLifeProjectsSection = (): LifeProjectsSectionType => {
  const { t } = useTranslation();

  const lifeProjectsSection: LifeProjectsSectionType = {
    title: t(tokens.lifeProjectsSectionType.title),
    experiences: [
      {
        company: t(tokens.lifeProjectsSectionType.experiences[0].company),
        companyUrl: '',
        role: t(tokens.lifeProjectsSectionType.experiences[0].role),
        started: t(tokens.lifeProjectsSectionType.experiences[0].started),
        upto: t(tokens.lifeProjectsSectionType.experiences[0].upto),
        tasks: [
          t(tokens.lifeProjectsSectionType.experiences[0].tasks[0]),
          t(tokens.lifeProjectsSectionType.experiences[0].tasks[1]),
          t(tokens.lifeProjectsSectionType.experiences[0].tasks[2]),
        ],
      },
      {
        company: t(tokens.lifeProjectsSectionType.experiences[1].company),
        companyUrl: '',
        role: t(tokens.lifeProjectsSectionType.experiences[1].role),
        started: t(tokens.lifeProjectsSectionType.experiences[1].started),
        upto: t(tokens.lifeProjectsSectionType.experiences[1].upto),
        tasks: [
          t(tokens.lifeProjectsSectionType.experiences[1].tasks[0]),
          t(tokens.lifeProjectsSectionType.experiences[1].tasks[1]),
          t(tokens.lifeProjectsSectionType.experiences[1].tasks[2]),
        ],
      },
      {
        company: t(tokens.lifeProjectsSectionType.experiences[2].company),
        companyUrl: '',
        role: t(tokens.lifeProjectsSectionType.experiences[2].role),
        started: t(tokens.lifeProjectsSectionType.experiences[2].started),
        upto: t(tokens.lifeProjectsSectionType.experiences[2].upto),
        tasks: [
          t(tokens.lifeProjectsSectionType.experiences[2].tasks[0]),
          t(tokens.lifeProjectsSectionType.experiences[2].tasks[1]),
          t(tokens.lifeProjectsSectionType.experiences[2].tasks[2]),
        ],
      },
    ],
  };

  return lifeProjectsSection;
};
