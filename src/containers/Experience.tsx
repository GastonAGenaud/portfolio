'use client';
import { TabList } from '@/components';

import { useExperienceSection } from '../lib/content/experience';
import { getSectionAnimation } from '../styles/animations';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="max-w-3xl py-32 mx-auto"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary">{useExperienceSection().title}</h2>
      <TabList experiences={useExperienceSection().experiences} />
    </motion.section>
  );
};

export default Experience;
