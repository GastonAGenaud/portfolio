import { ProjectsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper';


export const projectsSection: ProjectsSectionType = {
    title: 'my projects',
    projects: [
    {
        id: getId(),
        name: 'Nextjs Project with TypeScript, Next, Material-UI, TailwindCSS',
        url: 'https://gastongenaud.com/',
        repo: 'https://github.com/GastonAGenaud/portfolio',
        img: 'https://fmontes.com/_next/image?url=%2Fimages%2Fblog%2Fdifference-between-reactjs-and-nextjs%2Freact-vs-next.jpg&w=1200&q=75',
        year: 2023,
        tags: ['CSS Animations', 'Nextjs', 'TypeScript', 'Material-UI', 'TailwindCSS'],
    },
    {
        id: getId(),
        name: 'Java Project with Selenium, TestNG, Maven, and Allure Reports',
        url: 'https://github.com/GastonAGenaud/automation-selenium-java',
        repo: 'https://github.com/GastonAGenaud/automation-selenium-java',
        img: 'https://media.licdn.com/dms/image/D5612AQH4WDGQz3KWwg/article-cover_image-shrink_600_2000/0/1664433478843?e=2147483647&v=beta&t=rwXj2b_6BM3Lqh-y6DoquA_UL7q3aH1ND0FxDBeijN8',
        year: 2023,
        tags: ['Java', 'Selenium', 'TestNG', 'Maven', 'Allure Reports'],
    },
    ],
};