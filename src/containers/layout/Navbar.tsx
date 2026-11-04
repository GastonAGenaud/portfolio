'use client';
import { useNavbarSection } from '@/lib/content/navbar';
import { author } from '@/lib/content/portfolio';
import { usePersona } from '@/lib/hooks/use-persona';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth } from '@/lib/utils/helper';

import {
  Button,
  DarkModeButton,
  Link as CLink,
  NavButton,
  PersonaSwitch,
} from '@/components';

import { fadeIn, slideIn } from '@/styles/animations';

import { Icon } from '@iconify/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

/**
 * Hides the navbar while scrolling down
 * @param {Object} config
 * @param {String} [config.id=navbar] - id of navbar
 * @param {Number} [config.offset=100] - offset of navbar in px
 */

const hideNavWhileScrolling = ({
  id = 'navbar',
  offset = 100,
  when = true,
}: {
  id?: string;
  offset?: number;
  when: boolean;
}) => {
  const nav = document.getElementById(id);
  if (!nav) return () => undefined;

  let prevScrollPos = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const cur = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    // Always show near the very top or bottom; otherwise hide on the way down
    // and reveal on the way up. (Fixes: header staying hidden after reaching
    // the bottom and scrolling back up.)
    if (!when || cur <= offset || cur >= max - 8) {
      nav.style.top = '0';
    } else if (cur > prevScrollPos + 4) {
      nav.style.top = `-${offset}px`;
    } else if (cur < prevScrollPos - 4) {
      nav.style.top = '0';
    }
    prevScrollPos = cur;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
};

type NavItemsProps = {
  href?: string;
  children: React.ReactNode;
  index: number;
  delay: number;
  onClick?: (event: React.MouseEvent) => void;
};

const NavItem = ({ href, children, onClick, index, delay }: NavItemsProps) => {
  return (
    <motion.li
      className="group"
      variants={slideIn({ delay: delay + index / 10, direction: 'down' })}
      initial="hidden"
      animate="show"
    >
      <CLink
        href={href || `/#${children}`}
        className="block p-2 duration-500 hover:text-accent"
        onClick={onClick}
        withPadding
      >
        {children}
      </CLink>
    </motion.li>
  );
};

const Navbar = () => {
  const { cta, navLinks } = useNavbarSection();
  const { persona } = usePersona();
  const isEngineer = persona === 'engineer';
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  const windowWidth = useWindowWidth();
  const lg = getBreakpointsWidth('lg');
  const ANIMATION_DELAY = windowWidth <= lg ? 0 : 0.8;

  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = useCallback(
    async (language: 'en' | 'es') => {
      handleClose();
      await i18n.changeLanguage(language);
      toast.success(t('Language changed successfully'));
    },
    [i18n, t]
  );

  useEffect(() => {
    const cleanup = hideNavWhileScrolling({ when: !navbarCollapsed });
    return cleanup;
  }, [navbarCollapsed]);

  const showDevNav = isEngineer && (navbarCollapsed || windowWidth > lg);

  return (
    <motion.header
      variants={fadeIn(0.5)}
      initial="hidden"
      animate="show"
      id="navbar"
      className="fixed inset-x-0 top-0 right-0 z-50 flex items-center justify-between gap-2 px-3 min-[360px]:px-4 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg"
    >
      <h1 className="relative shrink-0 whitespace-nowrap text-base min-[360px]:text-xl sm:text-2xl capitalize font-signature text-accent group top-1">
        <Link href="/#hero" className="block">
          {author.name}
          <div className="absolute bottom-1.5 left-0 h-[1px] w-0 group-hover:w-full bg-accent duration-300"></div>
        </Link>
      </h1>

      {/* Right cluster */}
      <div className="flex min-w-0 items-center gap-1 min-[360px]:gap-1.5 sm:gap-3 xl:gap-4">
        {/* Developer nav links (engineer persona only) */}
        {showDevNav && (
          <nav className="whitespace-nowrap capitalize absolute text-sm duration-200 lg:bg-transparent z-50 w-[90%] left-1/2 -translate-x-1/2 top-full h-max rounded-xl shadow-xl p-6 bg-bg-secondary lg:block lg:static lg:w-auto lg:left-auto lg:translate-x-0 lg:top-auto lg:rounded-none lg:shadow-none lg:p-0 lg:h-auto">
            <ul className="flex flex-col items-stretch gap-3 list-style-none lg:gap-2 xl:gap-4 lg:flex-row lg:items-center">
              {navLinks.map(({ name, url }, i) => (
                <NavItem
                  key={i}
                  href={url}
                  index={i}
                  delay={ANIMATION_DELAY}
                  onClick={() => setNavbarCollapsed(false)}
                >
                  {name}
                </NavItem>
              ))}

              <div className="flex items-center justify-between gap-5 lg:gap-3 xl:gap-4">
                {cta && (
                  <Button
                    type="link"
                    href={cta.url}
                    sameTab={cta?.sameTab}
                    variants={slideIn({
                      delay: ANIMATION_DELAY + navLinks.length / 10,
                      direction: 'down',
                    })}
                    initial="hidden"
                    animate="show"
                  >
                    {cta.title}
                  </Button>
                )}
                <DarkModeButton
                  onClick={() => setNavbarCollapsed(false)}
                  variants={slideIn({
                    delay: ANIMATION_DELAY + (navLinks.length + 1) / 10,
                    direction: 'down',
                  })}
                  initial="hidden"
                  animate="show"
                />
              </div>
            </ul>
          </nav>
        )}

        {/* Persona switch — Dev / Studio / Training (the botonera) */}
        <PersonaSwitch />

        {/* Language menu — available in every persona */}
        <div>
          <Button
            aria-controls={open ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="!px-1.5 min-[360px]:!px-2 2xl:!px-4"
          >
            <Icon
              icon="ph:globe-bold"
              width="18"
              height="18"
              className="2xl:hidden"
              aria-label={t('Language')}
            />
            <span className="hidden 2xl:inline">{t('Language')}</span>
          </Button>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'language-button',
            }}
          >
            <MenuItem onClick={() => handleChangeLanguage('en')}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleChangeLanguage('es')}>
              Spanish
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile hamburger — engineer persona only */}
        {isEngineer && (
          <NavButton
            onClick={() => {
              setNavbarCollapsed((prev) => !prev);
            }}
            navbarCollapsed={navbarCollapsed}
            className="shrink-0 lg:hidden"
          />
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
