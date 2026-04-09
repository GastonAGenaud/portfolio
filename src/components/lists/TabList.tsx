'use client';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { ExperienceType } from '@/lib/types';
import { getBreakpointsWidth, getId } from '@/lib/utils/helper';

import { Link, ListItem } from '@/components';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  experiences: ExperienceType[];
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

const TabList = ({ experiences }: Props) => {
  const [activeExperience, setActiveExperience] = useState(0);
  const windowWidth = useWindowWidth();

  const { role, company, companyUrl, started, upto, tasks } =
    experiences[activeExperience];

  const sm = getBreakpointsWidth('sm');

  const sliderStyle =
    windowWidth <= sm
      ? {
          left: `calc(${activeExperience}*120px)`,
        }
      : {
          top: `calc(${activeExperience}*2.5rem)`,
        };

  return (
    <div className="flex flex-col sm:flex-row text-sm md:text-base gap-6 md:gap-10 min-h-[250px]">
      {/* Sidebar */}
      <div className="font-mono text-xs sm:text-sm relative flex justify-start sm:flex-col overflow-scroll sm:overflow-auto sm:min-w-[180px]">
        {experiences.map(({ company }, i) => (
          <button
            key={`tab-${i}`}
            className={`h-10 min-w-[120px] sm:w-auto sm:px-5 sm:!text-left capitalize hover:bg-accent-light hover:text-accent focus:outline-none focus:bg-accent-light focus:text-accent transition-colors duration-200 ${
              i === activeExperience ? 'text-accent' : ''
            }`}
            onClick={() => setActiveExperience(i)}
          >
            {company}
          </button>
        ))}
        {/* Slider */}
        <div className="absolute h-0.5 w-full sm:w-0.5 sm:h-full rounded-full bottom-0 sm:inset-0 left-0 bg-dark-3"></div>
        <div
          style={sliderStyle}
          className="absolute h-0.5 w-[120px] sm:w-0.5 sm:h-10 rounded-full bg-accent bottom-0 left-0 sm:inset-0 transition-all duration-300 ease-in-out"
        ></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeExperience}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-1 space-y-5"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-medium capitalize text-dark-2">
              {role}{' '}
              {companyUrl ? (
                <Link href={companyUrl} target="_blank" className="text-accent">
                  @{company}
                </Link>
              ) : (
                <span className="text-accent">{company}</span>
              )}
            </h3>
            <p className="font-mono text-xs capitalize">
              {String(started)} - {String(upto)}
            </p>
          </div>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <ListItem key={getId()}>{task}</ListItem>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabList;
