import { AboutSectionType } from '@/lib/types/sections';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useAboutSection = (): AboutSectionType => {
  const { t } = useTranslation();

  const aboutSection: AboutSectionType = {
    title: t(tokens.aboutSectionType.title),
    list: {
      title: t(tokens.aboutSectionType.list.title),
      items: [
        t(tokens.aboutSectionType.list.items.item1),
        t(tokens.aboutSectionType.list.items.item2),
        t(tokens.aboutSectionType.list.items.item3),
        t(tokens.aboutSectionType.list.items.item4),
        t(tokens.aboutSectionType.list.items.item5),
        t(tokens.aboutSectionType.list.items.item6),
        t(tokens.aboutSectionType.list.items.item7),
        t(tokens.aboutSectionType.list.items.item8),
        t(tokens.aboutSectionType.list.items.item9),
        t(tokens.aboutSectionType.list.items.item10),
        t(tokens.aboutSectionType.list.items.item11),
        t(tokens.aboutSectionType.list.items.item12),
        t(tokens.aboutSectionType.list.items.item13),
        t(tokens.aboutSectionType.list.items.item14),
      ],
    },
    img: '/perfil.jpg',
  };

  return aboutSection;
};
