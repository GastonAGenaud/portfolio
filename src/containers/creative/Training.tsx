'use client';
import FitnessSection from '@/components/fitness/FitnessSection';

import { motion } from 'framer-motion';

/**
 * Training / body section. Mounted by CreativeHome only when the persona is
 * `creative`, the `sport` feature flag is enabled, and the Sport switch is on.
 * Renders the full data-driven fitness experience.
 */
const Training = () => {
  return (
    <motion.section
      id="training"
      className="border-t border-dark-3/20 py-16 sm:py-24"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
    >
      <FitnessSection />
    </motion.section>
  );
};

export default Training;
