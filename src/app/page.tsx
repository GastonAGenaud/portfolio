'use client';
import {
  About,
  Contact,
  Courses,
  Experience,
  FeaturedProjects,
  Hero,
  Layout,
  LifeProjects,
  Projects,
  Skills,
} from '@/containers';

import '../locales/i18n';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';

/**
 * TODO: Create separate page for all the projects with filters (vercel | netlify | github api for automation)
 * TODO: Switch to next13 app dir feature, when lottie files start working in app dir
 * TODO: Try test cases
 */

const Home: NextPage = () => {
  //const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    //setShowPopup(true);
  }, []);

  return (
    <>
      {/*<ChristmasPopup
    isVisible={showPopup}
    onClose={() => setShowPopup(false)}
  />
   Resto del contenido de tu página */}

      <Layout>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <FeaturedProjects />
        <Projects />
        <LifeProjects />
        <Contact />
        <Courses />
      </Layout>
    </>
  );
};

export default Home;
