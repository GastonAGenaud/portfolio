'use client';
import FitnessSection from '@/components/fitness/FitnessSection';

/**
 * Training persona home — a full-page view (like CreativeHome) that fully
 * replaces the page content when the Training mode is selected. Its palette is
 * scoped to [data-persona='training'] in globals.css.
 */
const TrainingHome = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 sm:pt-32">
      <FitnessSection />
    </div>
  );
};

export default TrainingHome;
