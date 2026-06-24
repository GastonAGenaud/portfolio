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
        img: '/projects/01.png',
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
        img: '/projects/02.png',
        year: 2023,
        tags: ['Java', 'Selenium', 'TestNG', 'Maven', 'Allure Reports'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[2].name),
        url: 'https://github.com/GastonAGenaud/playwright-e2e',
        repo: 'https://github.com/GastonAGenaud/playwright-e2e',
        img: '/projects/03.png',
        year: 2024,
        tags: ['Playwright', 'TypeScript', 'E2E Testing'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[3].name),
        url: 'https://github.com/GastonAGenaud/academy-python-playwright',
        repo: 'https://github.com/GastonAGenaud/academy-python-playwright',
        img: '/projects/04.png',
        year: 2024,
        tags: ['Python', 'Playwright', 'BDD', 'Pytest'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[4].name),
        url: 'https://github.com/GastonAGenaud/api-automation-petstore',
        repo: 'https://github.com/GastonAGenaud/api-automation-petstore',
        img: '/projects/05.png',
        year: 2024,
        tags: ['REST API', 'Testing', 'Automation'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[5].name),
        url: 'https://github.com/GastonAGenaud/turbo-monorepo',
        repo: 'https://github.com/GastonAGenaud/turbo-monorepo',
        img: '/projects/06.png',
        year: 2024,
        tags: ['Turborepo', 'TypeScript', 'Monorepo', 'Full Stack'],
      },
    ],
  };

  return projectsSection;
};
