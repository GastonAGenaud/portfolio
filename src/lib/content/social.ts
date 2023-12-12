import { socialLinks } from '@/lib/content/portfolio';
import { SocialSectionType } from '@/lib/types/sections';


export const socialSection: SocialSectionType = {
    socialLinks: [
    {
        icon: 'tabler:brand-github',
        url: socialLinks.github,
    },
    {
        icon: 'mdi:instagram',
        url: socialLinks.instagram,
    },
    {
        icon: 'lucide:linkedin',
        url: socialLinks.linkedin,
    },
    ],
};