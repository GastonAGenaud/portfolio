// src/lib/content/projects.ts (or a similar path)
import { ProjectsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useProjectsSection = (): ProjectsSectionType => {
  const { t } = useTranslation();

  const projectsSection: ProjectsSectionType = {
    title: t(tokens.projectsSectionType.title),
    projects: [
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[0].name),
        url: 'https://gastongenaud.com/',
        repo: 'https://github.com/GastonAGenaud/portfolio',
        img: 'https://github.com/user-attachments/assets/f24ee56e-8bdc-46d4-8399-d5e5d361b476',
        year: 2023,
        tags: [
          'CSS Animations',
          'Nextjs',
          'TypeScript',
          'Material-UI',
          'TailwindCSS',
        ],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[1].name),
        url: 'https://github.com/GastonAGenaud/automation-selenium-java',
        repo: 'https://github.com/GastonAGenaud/automation-selenium-java',
        img: 'https://media.licdn.com/dms/image/D5612AQH4WDGQz3KWwg/article-cover_image-shrink_600_2000/0/1664433478843?e=2147483647&v=beta&t=rwXj2b_6BM3Lqh-y6DoquA_UL7q3aH1ND0FxDBeijN8',
        year: 2023,
        tags: ['Java', 'Selenium', 'TestNG', 'Maven', 'Allure Reports'],
      },
    ],
  };

  return projectsSection;
};
