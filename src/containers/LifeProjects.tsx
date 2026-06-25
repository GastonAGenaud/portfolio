'use client';
import { ShowLottie, Link, ListItem, Carousel } from '@/components';
import { getId } from '@/lib/utils/helper';

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

  const { role, company, companyUrl, started, upto, tasks, images } =
    experiences[activeTab];

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
              className={images && images.length > 0 ? 'w-full max-w-[340px]' : ''}
            >
              {images && images.length > 0 ? (
                <Carousel images={images} alt={`${company} build photo`} />
              ) : (
                <ShowLottie
                  path={lotties[activeTab]}
                  className="max-w-[300px] md:max-w-[350px]"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Tabs + Content */}
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col sm:flex-row text-sm md:text-base gap-6 md:gap-10 min-h-[250px]">
            {/* Sidebar — per-item indicator so long, wrapping labels never overlap */}
            <div className="font-mono text-xs sm:text-sm flex flex-row sm:flex-col overflow-x-auto sm:overflow-visible sm:min-w-[200px] shrink-0">
              {experiences.map(({ company }, i) => (
                <button
                  key={`tab-${i}`}
                  onClick={() => setActiveTab(i)}
                  className={`shrink-0 whitespace-nowrap sm:whitespace-normal text-left capitalize px-4 py-3 border-b-2 sm:border-b-0 sm:border-l-2 sm:rounded-r-md transition-colors duration-200 hover:bg-accent-light hover:text-accent focus:outline-none focus:bg-accent-light focus:text-accent ${
                    i === activeTab
                      ? 'border-accent text-accent bg-accent-light/30'
                      : 'border-dark-3/40'
                  }`}
                >
                  {company}
                </button>
              ))}
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
