'use client';
import { aboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';
import { getId } from '@/lib/utils/helper';

import { AuthorImage, Link, ListItem, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';

const About = () => {
  const { title, img, list } = aboutSection;
  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper id="about" {...getSectionAnimation}>
      <h2 className="heading-secondary">{title}</h2>
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <p>
            Hi, my name is Gaston Alejandro Genaud, an SDET as well as DevOps Engineer who wants to explore every tech stack.
          </p>
          <p>
            Fast-forward to today, and I’ve had the privilege of working at
            <br />

            <Link
              href="https://www.claro.com.ar/personas"
              target="_blank"
              className="text-accent"
            >
              CLARO
            </Link>
            <br />
            <Link
              href="https://caylent.com/"
              target="_blank"
              className="text-accent"
            >
              Caylent
            </Link>
            <br />
            <Link
              href="https://www.globant.com/es"
              target="_blank"
              className="text-accent"
            >
              Globant
            </Link>
            <br />

            <Link
              href="https://carejourney.com/"
              target="_blank"
              className="text-accent"
            >
              Carejourney
            </Link>

          </p>
          <p>
            My focus these days is to continue to grow as QA Automation
            and expand my knowledge of AWS.
          </p>

          {list && (
            <>
              <p>{list.title}</p>
              <ul className="grid w-2/3 grid-cols-2 gap-1 text-sm">
                {list.items.map((item) => (
                  <ListItem key={getId()}>{item}</ListItem>
                ))}
              </ul>
            </>
          )}
        </div>
        <AuthorImage src={img} alt={author.name} />
      </main>
    </Wrapper>
  ) : (
    <></>
  );
};

export default About;
