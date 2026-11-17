'use client';
import { socialLinks } from '@/lib/content/portfolio';

import Gallery from '@/components/creative/Gallery';
import PhotographerHero from '@/components/creative/PhotographerHero';

import { Icon } from '@iconify/react';

const socials = [
  { icon: 'mdi:instagram', url: socialLinks.instagram },
  { icon: 'fa-brands:adobe', url: socialLinks.lightroom },
  { icon: 'lucide:linkedin', url: socialLinks.linkedin },
];

const CreativeHome = () => {
  return (
    <>
      <PhotographerHero />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex items-center gap-5 pt-16">
          {socials.map((s) => (
            <a
              key={s.icon}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-dark-3 transition-colors hover:text-accent"
            >
              <Icon icon={s.icon} width="22" height="22" />
            </a>
          ))}
        </div>

        <Gallery />
      </div>
    </>
  );
};

export default CreativeHome;
