import { FeaturedProjectsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useFeaturedProjectsSection = (): FeaturedProjectsSectionType => {
  const { t } = useTranslation();

  const featuredProjectsSection: FeaturedProjectsSectionType = {
    title: t(tokens.featuredProjectsSectionType.title),
    projects: [
      {
        id: getId(),
        name: t(tokens.featuredProjectsSectionType.projects[0].name),
        description: t(
          tokens.featuredProjectsSectionType.projects[0].description
        ),
        tasks: t(tokens.featuredProjectsSectionType.projects[0].tasks),
        url: 'https://github.com/GastonAGenaud/appium-python-automation',
        img: '/projects/07.png',
        tags: ['Selenium', 'Appium', 'behave', 'Python', 'BDD', 'TDD'],
      },
      {
        id: getId(),
        name: t(tokens.featuredProjectsSectionType.projects[1].name),
        description: t(
          tokens.featuredProjectsSectionType.projects[1].description
        ),
        tasks: t(tokens.featuredProjectsSectionType.projects[1].tasks),
        url: 'https://github.com/GastonAGenaud/cypress-cucumber',
        img: '/projects/08.png',
        tags: ['Cypress', 'Cucumber', 'BDD', 'TDD', 'JavaScript'],
      },
    ],
  };

  return featuredProjectsSection;
};
