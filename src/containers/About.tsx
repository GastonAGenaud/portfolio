'use client';
import { useAboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';
import { getId } from '@/lib/utils/helper';

import { AuthorImage, Link, ListItem, Wrapper } from '@/components';

import { tokens } from '@/locales/tokens';
import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const About = () => {
  const { title, img, list } = useAboutSection();
  const list2 = {
    list2: {
      list: {
        items: {
          item1: 'Selenium',
          item2: 'Terraform',
          item3: 'Cypress',
          item4: 'Docker',
          item5: 'Playwright',
          item6: 'Azure DevOps',
          item7: 'Mocha',
          item8: 'Jenkins',
          item9: 'Pytest',
          item10: 'AWS',
          item11: 'Cucumber',
          item12: 'Kubernetes',
          item13: 'Appium',
          item14: 'GitHub Actions',
        },
      },
    },
  };

  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper id="about" {...getSectionAnimation}>
      <h2 className="heading-secondary">{title}</h2>
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <p>{t(tokens.aboutSectionType.intro)}</p>
          <p>
            {t(tokens.aboutSectionType.history)}
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
            <br />
            <Link
              href="https://arcadia.io/"
              target="_blank"
              className="text-accent"
            >
              Arcadia
            </Link>
            <br />
            <Link
              href="https://www.naranjax.com/"
              target="_blank"
              className="text-accent"
            >
              Naranja X
            </Link>
            <br />
            <Link
              href="https://www.coca-cola.com/ar"
              target="_blank"
              className="text-accent"
            >
              Coca-Cola
            </Link>
            <br />
            <Link
              href="https://www.nbch.com.ar/"
              target="_blank"
              className="text-accent"
            >
              Banco del Chaco
            </Link>
            <br />
            <Link
              href="https://cordoba.gob.ar/"
              target="_blank"
              className="text-accent"
            >
              Municipalidad de Córdoba
            </Link>
            <br />
            <span>ProdEng (Vaca Muerta)</span>
          </p>
          <p>{t(tokens.aboutSectionType.focus)}</p>

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
          {list && (
            <>
              <p>Frameworks</p>
              <ul className="grid w-2/3 grid-cols-2 gap-1 text-sm">
                {Object.values(list2.list2.list.items).map((item) => (
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
