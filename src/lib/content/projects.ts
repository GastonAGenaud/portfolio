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
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[2].name),
        url: 'https://github.com/GastonAGenaud/playwright-e2e',
        repo: 'https://github.com/GastonAGenaud/playwright-e2e',
        img: 'https://opengraph.githubassets.com/1/GastonAGenaud/playwright-e2e',
        year: 2024,
        tags: ['Playwright', 'TypeScript', 'E2E Testing'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[3].name),
        url: 'https://github.com/GastonAGenaud/academy-python-playwright',
        repo: 'https://github.com/GastonAGenaud/academy-python-playwright',
        img: 'https://opengraph.githubassets.com/1/GastonAGenaud/academy-python-playwright',
        year: 2024,
        tags: ['Python', 'Playwright', 'BDD', 'Pytest'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[4].name),
        url: 'https://github.com/GastonAGenaud/api-automation-petstore',
        repo: 'https://github.com/GastonAGenaud/api-automation-petstore',
        img: 'https://opengraph.githubassets.com/1/GastonAGenaud/api-automation-petstore',
        year: 2024,
        tags: ['REST API', 'Testing', 'Automation'],
      },
      {
        id: getId(),
        name: t(tokens.projectsSectionType.projects[5].name),
        url: 'https://github.com/GastonAGenaud/turbo-monorepo',
        repo: 'https://github.com/GastonAGenaud/turbo-monorepo',
        img: 'https://opengraph.githubassets.com/1/GastonAGenaud/turbo-monorepo',
        year: 2024,
        tags: ['Turborepo', 'TypeScript', 'Monorepo', 'Full Stack'],
      },
    ],
  };

  return projectsSection;
};
