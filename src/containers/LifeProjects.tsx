'use client';
import { ShowLottie, Link, ListItem } from '@/components';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth, getId } from '@/lib/utils/helper';

import { useLifeProjectsSection } from '../lib/content/life-projects';
import { getSectionAnimation } from '../styles/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const lotties = [
  '/lotties/smarthome.json',
  '/lotties/garden.json',
  '/lotties/keyboard.json',
  '/lotties/cloudinfra.json',
];

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

const lottieVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
};

const LifeProjects = () => {
  const { title, experiences } = useLifeProjectsSection();
  const [activeTab, setActiveTab] = useState(0);
  const windowWidth = useWindowWidth();
  const sm = getBreakpointsWidth('sm');

  const { role, company, companyUrl, started, upto, tasks } =
    experiences[activeTab];

  const sliderStyle =
    windowWidth <= sm
      ? { left: `calc(${activeTab}*120px)` }
      : { top: `calc(${activeTab}*2.5rem)` };

  return (
    <motion.section
      id="life-projects"
      className="max-w-5xl py-32 mx-auto"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary">{title}</h2>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left: Lottie animation */}
        <div className="w-full lg:w-2/5 flex justify-center min-h-[250px] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={lottieVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ShowLottie
                path={lotties[activeTab]}
                className="max-w-[300px] md:max-w-[350px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Tabs + Content */}
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col sm:flex-row text-sm md:text-base gap-6 md:gap-10 min-h-[250px]">
            {/* Sidebar */}
            <div className="font-mono text-xs sm:text-sm relative flex justify-start sm:flex-col overflow-scroll sm:overflow-auto sm:min-w-[180px]">
              {experiences.map(({ company }, i) => (
                <button
                  key={`tab-${i}`}
                  className={`h-10 min-w-[120px] sm:w-auto sm:px-5 sm:!text-left capitalize hover:bg-accent-light hover:text-accent focus:outline-none focus:bg-accent-light focus:text-accent transition-colors duration-200 ${
                    i === activeTab ? 'text-accent' : ''
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  {company}
                </button>
              ))}
              {/* Slider background */}
              <div className="absolute h-0.5 w-full sm:w-0.5 sm:h-full rounded-full bottom-0 sm:inset-0 left-0 bg-dark-3"></div>
              {/* Active slider */}
              <div
                style={sliderStyle}
                className="absolute h-0.5 w-[120px] sm:w-0.5 sm:h-10 rounded-full bg-accent bottom-0 left-0 sm:inset-0 transition-all duration-300 ease-in-out"
              ></div>
            </div>

            {/* Content with fade transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-1 space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-medium capitalize text-dark-2">
                    {role}{' '}
                    {companyUrl ? (
                      <Link
                        href={companyUrl}
                        target="_blank"
                        className="text-accent"
                      >
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
        </div>
      </div>
    </motion.section>
  );
};

export default LifeProjects;
