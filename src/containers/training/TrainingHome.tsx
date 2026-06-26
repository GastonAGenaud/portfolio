'use client';
import FitnessSection from '@/components/fitness/FitnessSection';
import FreeRoutines from '@/components/fitness/FreeRoutines';

/**
 * Training persona home — a full-page view (like CreativeHome) that fully
 * replaces the page content when the Training mode is selected. Its palette is
 * scoped to [data-persona='training'] in globals.css. The header animates in
 * (see FitnessSection) like the Studio hero; the free-routines block reveals on
 * scroll.
 */
const TrainingHome = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 sm:pt-32">
      <FitnessSection />
      <div className="mt-16">
        <FreeRoutines />
      </div>
    </div>
  );
};

export default TrainingHome;
