'use client'
import { ExperienceSectionType } from '@/lib/types/sections';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useExperienceSection = (): ExperienceSectionType => {
  const { t } = useTranslation();

  const experienceSection: ExperienceSectionType = {
    title: t(tokens.experienceSectionType.title),
    experiences: [
      {
        company: t(tokens.experienceSectionType.experiences[0].company),
        companyUrl: 'https://www.darwoft.com/',
        role: t(tokens.experienceSectionType.experiences[0].role),
        started: t(tokens.experienceSectionType.experiences[0].started),
        upto: t(tokens.experienceSectionType.experiences[0].upto),
        tasks: [
          t(tokens.experienceSectionType.experiences[0].tasks[0]),
          t(tokens.experienceSectionType.experiences[0].tasks[1]),
          t(tokens.experienceSectionType.experiences[0].tasks[2]),
          t(tokens.experienceSectionType.experiences[0].tasks[3]),
          t(tokens.experienceSectionType.experiences[0].tasks[4]),
        ],
      },
      {
        company: t(tokens.experienceSectionType.experiences[1].company),
        companyUrl: 'https://coderio.co/',
        role: t(tokens.experienceSectionType.experiences[1].role),
        started: t(tokens.experienceSectionType.experiences[1].started),
        upto: t(tokens.experienceSectionType.experiences[1].upto),
        tasks: [
          t(tokens.experienceSectionType.experiences[1].tasks[0]),
          t(tokens.experienceSectionType.experiences[1].tasks[1]),
          t(tokens.experienceSectionType.experiences[1].tasks[2]),
          t(tokens.experienceSectionType.experiences[1].tasks[3]),
        ],
      },
      {
        company: t(tokens.experienceSectionType.experiences[2].company),
        companyUrl: '',
        role: t(tokens.experienceSectionType.experiences[2].role),
        started: t(tokens.experienceSectionType.experiences[2].started),
        upto: t(tokens.experienceSectionType.experiences[2].upto),
        tasks: [
          t(tokens.experienceSectionType.experiences[2].tasks[0]),
          t(tokens.experienceSectionType.experiences[2].tasks[1]),
          t(tokens.experienceSectionType.experiences[2].tasks[2]),
          t(tokens.experienceSectionType.experiences[2].tasks[3]),
        ],
      },
      {
        company: t(tokens.experienceSectionType.experiences[3].company),
        companyUrl: 'https://www.globant.com/',
        role: t(tokens.experienceSectionType.experiences[3].role),
        started: t(tokens.experienceSectionType.experiences[3].started),
        upto: t(tokens.experienceSectionType.experiences[3].upto),
        tasks: [
          t(tokens.experienceSectionType.experiences[3].tasks[0]),
          t(tokens.experienceSectionType.experiences[3].tasks[1]),
          t(tokens.experienceSectionType.experiences[3].tasks[2]),
        ],
      },
      {
        company: t(tokens.experienceSectionType.experiences[4].company),
        companyUrl: 'https://www.vates.com/',
        role: t(tokens.experienceSectionType.experiences[4].role),
        started: t(tokens.experienceSectionType.experiences[4].started),
        upto: t(tokens.experienceSectionType.experiences[4].upto),
        tasks: [
          t(tokens.experienceSectionType.experiences[4].tasks[0]),
          t(tokens.experienceSectionType.experiences[4].tasks[1]),
          t(tokens.experienceSectionType.experiences[4].tasks[2]),
        ],
      },
    ],
  };

  return experienceSection;
};
