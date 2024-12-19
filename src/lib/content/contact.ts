'use client';
import { author } from '@/lib/content/portfolio';
import { ContactSectionType } from '@/lib/types/sections';

import { tokens } from '@/locales/tokens';

import { useTranslation } from 'react-i18next';

export const useContactSection = (): ContactSectionType => {
  const { t } = useTranslation();

  const contactSection: ContactSectionType = {
    title: t(tokens.contactSectionType.title),
    subtitle: t(tokens.contactSectionType.subtitle),
    paragraphs: [
      t(tokens.contactSectionType.paragraphs[0]),
      t(tokens.contactSectionType.paragraphs[1]),
    ],
    link: `mailto:${author.email}`, // This remains the same, as it's not translated text.
  };

  return contactSection;
};
