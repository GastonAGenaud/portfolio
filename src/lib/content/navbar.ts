'use client';
import { NavbarSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useNavbarSection = (): NavbarSectionType => {
  const { t } = useTranslation();

  const navbarSection: NavbarSectionType = {
    navLinks: [
      { name: t(tokens.header.about), url: '/#about' },
      { name: t(tokens.header.skills), url: '/#skills' },
      { name: t(tokens.header.experience), url: '/#experience' },
      { name: t(tokens.header.projects), url: '/#projects' },
      { name: t(tokens.header.contact), url: '/contact' },
    ],
    cta: {
      title: t(tokens.header.resume),
      url: `/${resumeFileName}`,
    },
  };

  return navbarSection;
};
