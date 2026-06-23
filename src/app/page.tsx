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

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={persona}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {persona === 'creative' ? <CreativeHome /> : <EngineerHome />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Home;
