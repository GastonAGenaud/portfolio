'use client';
import { usePersona } from '@/lib/hooks/use-persona';

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
import CreativeHome from '@/containers/creative/CreativeHome';
import TrainingHome from '@/containers/training/TrainingHome';

import '../locales/i18n';
import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import React from 'react';

/**
 * TODO: Create separate page for all the projects with filters (vercel | netlify | github api for automation)
 * TODO: Switch to next13 app dir feature, when lottie files start working in app dir
 * TODO: Try test cases
 */

const EngineerHome = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <FeaturedProjects />
    <Projects />
    <LifeProjects />
    <Contact />
    <Courses />
  </>
);

const Home: NextPage = () => {
  const { persona } = usePersona();

  // Land at the top whenever the persona changes — otherwise the previous
  // scroll position carries into the new view, dropping you mid-page (or into
  // an empty area below shorter content) instead of at its hero.
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [persona]);

  return (
    <Layout>
      {/* mode="wait" + no exit anim: the old view unmounts at once so it never
          lingers under the new persona's theme (which flips instantly), then the
          new view fades in. Avoids the "mixed text / wrong colors" flash. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={persona}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {persona === 'training' ? (
            <TrainingHome />
          ) : persona === 'creative' ? (
            <CreativeHome />
          ) : (
            <EngineerHome />
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Home;
