import Signature from '@/components/ui/Signature';

import { footerSection } from '@/lib/content/footer';

import SocialLinks from '../Social/SocialLinks';

const Footer = () => {
  return (
    <footer className="max-w-lg mx-auto mb-5 font-mono text-xs text-center">
      <SocialLinks className="flex justify-center gap-3 mb-3 md:hidden" />
      <a
        href={footerSection.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${footerSection.title} Gaston Genaud`}
        className="group inline-flex items-center gap-2 transition hover:text-accent"
      >
        <span>{footerSection.title}</span>
        <Signature className="signature h-8 w-auto text-accent transition-transform duration-500 group-hover:scale-[1.03]" />
      </a>
    </footer>
  );
};

export default Footer;
