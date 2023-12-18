import { FeaturedProjectsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

const featuredProjectsSection: FeaturedProjectsSectionType = {
  title: "projects i've worked on",
  projects: [
    {
      id: getId(),
      name: 'GastonAGenaud/appium-selenium-python',
      description: 'Mobile Automation Testing with Appium, Selenium, and Python',
      tasks:
        'Appium and Python are a great combination of Mobile automation. Python existing as an Interpreted, high-level programming language proposes a quicker development.',
      url: 'https://github.com/GastonAGenaud/appium-python-automation',
      img: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4b6d6bae-e617-4e96-b9d1-79fa542b8207/appium-architecture-opt.png',
      tags: ['Selenium', 'Appium', 'behave', 'Python', 'BDD', 'TDD'],
    },
    {
      id: getId(),
      name: 'GastonAGenaud/cypress-cucumber',
      description: 'Automation Project with Cypress and Cucumber.',
      tasks:
        'Cypress is a JavaScript-based end-to-end testing framework that doesn’t use Selenium at all. Cypress is a next-generation front end testing tool built for the modern web. Cypress is most often compared to Selenium; however Cypress is both fundamentally and architecturally different.',
      url: 'https://github.com/GastonAGenaud/cypress-cucumber',
      img: 'https://miro.medium.com/v2/resize:fit:564/1*BTN81ohJEdFHP2LUQ-rDkQ.png',
      tags: ['Cypress', 'Cucumber', 'BDD', 'TDD', 'JavaScript'],
    },
  ],
};

export default featuredProjectsSection;
