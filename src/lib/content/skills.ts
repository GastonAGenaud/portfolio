// src/lib/content/skills.ts
import { SkillsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useSkillsSection = (): SkillsSectionType => {
  const { t } = useTranslation();

  const skillsSection: SkillsSectionType = {
    title: t(tokens.skillsSectionType.title),
    skills: [
      {
        id: getId(),
        title: t(tokens.skillsSectionType.skill1.title),
        lottie: {
          light: '/lotties/frontend.json',
          dark: '/lotties/frontend-dark.json',
        },
        points: [
          t(tokens.skillsSectionType.skill1.points.point1),
          t(tokens.skillsSectionType.skill1.points.point2),
          t(tokens.skillsSectionType.skill1.points.point3),
          t(tokens.skillsSectionType.skill1.points.point4),
          t(tokens.skillsSectionType.skill1.points.point5),
        ],
        softwareSkills: [
          { name: 'html-5', icon: 'vscode-icons:file-type-html' },
          { name: 'CSS-3', icon: 'vscode-icons:file-type-css' },
          { name: 'Cypress', icon: 'vscode-icons:file-type-light-cypress' },
          { name: 'javaScript', icon: 'vscode-icons:file-type-js-official' },
          {
            name: 'typeScript',
            icon: 'vscode-icons:file-type-typescript-official',
          },
          { name: 'python', icon: 'vscode-icons:file-type-python' },
          { name: 'nodejs', icon: 'logos:nodejs-icon' },
          { name: 'Selenium', icon: 'skill-icons:selenium' },
          { name: 'nextjs', icon: 'logos:nextjs-icon' },
          { name: 'Cucumber', icon: 'logos:cucumber' },
          { name: 'Appium', icon: 'logos:appium' },
          { name: 'database', icon: 'vscode-icons:file-type-sql' },
          { name: 'AWS', icon: 'skill-icons:aws-light' },
        ],
      },
      {
        id: getId(),
        title: t(tokens.skillsSectionType.skill2.title),
        lottie: {
          light: '/lotties/designing.json',
          dark: '/lotties/designing-dark.json',
        },
        points: [
          t(tokens.skillsSectionType.skill2.points.point1),
          t(tokens.skillsSectionType.skill2.points.point2),
          t(tokens.skillsSectionType.skill2.points.point3),
        ],
        softwareSkills: [
          { name: 'Lucidchart', icon: 'carbon:script' },
          { name: 'CircleCI', icon: 'devicon-plain:circleci-wordmark' },
          { name: 'AWS', icon: 'skill-icons:aws-light' },
          { name: 'Terraform', icon: 'devicon:terraform-wordmark' },
        ],
      },
    ],
  };

  return skillsSection;
};
