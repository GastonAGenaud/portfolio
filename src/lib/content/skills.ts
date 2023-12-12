import { SkillsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper'

export const skillsSection: SkillsSectionType = {
    title: 'what i do',
    skills: [
    {
        id: getId(),
        title: 'Software Development in Test',
        // animation lottie file: https://lottiefiles.com/
        lottie: {
        light: '/lotties/frontend.json',
        dark: '/lotties/frontend-dark.json',
        },
        points: [
        'Building E2E automations, functional testing and test setup such as regression and smoke.',
        'CI/CD implementation of test automations.',
        'Building test scripts to validate API compare responses between api from different environments and schema validation.',
        'Building load and performance tests.',
        'Career path follow-up, QA team management.'
        ],
        softwareSkills: [
          // iconify icons: https://icon-sets.iconify.design/
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
          // { name: 'angularjs', icon: 'logos:angular-icon' },
        { name: 'Cucumber', icon: 'logos:cucumber' },
        { name: 'Appium', icon: 'logos:appium' },
        { name: 'database', icon: 'vscode-icons:file-type-sql' },
        { name: 'AWS', icon: 'skill-icons:aws-light' },
        ],
    },
    {
        id: getId(),
        title: 'DevOps Engineer',
        lottie: {
        light: '/lotties/designing.json',
        dark: '/lotties/designing-dark.json',
        },
        points: [
        'Experience in designing interfaces with Lucidchart',
        'Experience in the design, development and implementation of high quality and scalable software solutions.',
        'I have worked with tools and technologies such as AWS, software architecture/cloud, terraform, Docker, Kubernetes, Jenkins, Git, and Python.',
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
