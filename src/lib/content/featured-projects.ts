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
        img: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4b6d6bae-e617-4e96-b9d1-79fa542b8207/appium-architecture-opt.png',
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
        img: 'https://miro.medium.com/v2/resize:fit:564/1*BTN81ohJEdFHP2LUQ-rDkQ.png',
        tags: ['Cypress', 'Cucumber', 'BDD', 'TDD', 'JavaScript'],
      },
    ],
  };

  return featuredProjectsSection;
};
