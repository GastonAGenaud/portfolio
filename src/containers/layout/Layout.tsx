'use client';
import { usePersona } from '@/lib/hooks/use-persona';

import { Email, Footer, Navbar, Social } from '@/containers';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className = '' }: Props) => {
  const { isCreative } = usePersona();

  return (
    <>
      <Navbar />
      <main
        className={
          isCreative
            ? `w-full ${className}`
            : `mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg ${className}`
        }
      >
        {children}
      </main>
      {!isCreative && <Footer />}
      <Social />
      <Email />
    </>
  );
};

export default Layout;
