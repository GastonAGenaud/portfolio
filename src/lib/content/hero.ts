import { HeroSectionType } from '@/lib/types/sections'
import { resumeFileName } from '@/lib/utils/config'

export const heroSection: HeroSectionType = {
    subtitle: 'Hello, I am',
    title: 'Gaston Genaud.',
    tagline: 'DevOps and Testing: A Perfect Match for Software Innovation.',
    description:
    "As a seasoned Senior Software Developer Engineer in Test and DevOps Engineer, I specialize in creating robust, scalable, and efficient software solutions. My expertise lies in AWS for reliable cloud infrastructure, along with JavaScript, TypeScript, and Python for automation and backend development. With a strong focus on quality and innovation, I deliver exceptional results in both automated testing and DevOps practices.",
    specialText: 'Eager to explore new opportunities and challenges in software development in test and DevOps.',
    cta: {
        title: 'View My Resume',
        url: `/${resumeFileName}`,
        hideInDesktop: false,
    },
};
