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
    ],
};