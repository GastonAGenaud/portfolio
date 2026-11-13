import type { Block, Lang, Publication } from '../types';
import { SERIES_TOTAL, toSummary } from './summary';
import type { SeriesGuide } from './types';

const labels = {
  es: {
    diagram: 'Cómo encaja',
    diagramAlt: 'Diagrama',
    textVersion: 'Ver el diagrama en texto',
    requirements: 'Requisitos',
    setup: 'Setup',
    steps: 'Paso a paso',
    example: 'Ejemplo ilustrativo',
    mistakes: 'Errores comunes',
    checklist: 'Checklist: cómo saber que quedó bien',
    faq: 'Preguntas frecuentes',
    pitfall: 'Lo que la IA no hizo bien',
    previous: 'Anterior',
    next: 'Siguiente',
    footer: (day: number) =>
      `Día ${day} de ${SERIES_TOTAL} de la serie **31 días de QA + IA**. Comandos y versiones revisados en noviembre de 2026: volvé a correrlos antes de usarlos, las herramientas de IA cambian rápido.`,
  },
  en: {
    diagram: 'How it fits together',
    diagramAlt: 'Diagram',
    textVersion: 'Show the diagram as text',
    requirements: 'Requirements',
    setup: 'Setup',
    steps: 'Step by step',
    example: 'Illustrative example',
    mistakes: 'Common mistakes',
    checklist: 'Checklist: how to know it is done',
    faq: 'Frequently asked questions',
    pitfall: 'Where AI fell short',
    previous: 'Previous',
    next: 'Next',
    footer: (day: number) =>
      `Day ${day} of ${SERIES_TOTAL} of the **31 days of QA + AI** series. Commands and versions reviewed in November 2026: rerun them before relying on them, AI tooling changes fast.`,
  },
};

const paragraphs = (texts: string[]): Block[] =>
  texts.map((text) => ({ type: 'p', text }));

const body = (
  guide: SeriesGuide,
  lang: Lang,
  previous?: SeriesGuide,
  next?: SeriesGuide
): Block[] => {
  const l = labels[lang];
  const blocks: Block[] = [
    ...paragraphs(guide.intro[lang]),
    { type: 'h2', text: l.diagram },
    {
      type: 'image',
      src: guide.diagramImage.light,
      darkSrc: guide.diagramImage.dark,
      alt: `${l.diagramAlt}: ${guide.title[lang]}`,
      width: guide.diagramImage.width,
      height: guide.diagramImage.height,
      textVersion: { label: l.textVersion, text: guide.diagram },
    },
    { type: 'h2', text: l.requirements },
    { type: 'list', items: guide.requirements[lang] },
  ];

  if (guide.snippets?.length) {
    blocks.push({ type: 'h2', text: l.setup });
    guide.snippets.forEach((snippet) =>
      blocks.push({
        type: 'code',
        code: snippet.code,
        lang: snippet.lang,
        caption: snippet.caption?.[lang],
      })
    );
  }

  if (guide.extra) {
    blocks.push(
      { type: 'h2', text: guide.extra[lang].title },
      { type: 'list', items: guide.extra[lang].items }
    );
  }

  blocks.push({ type: 'h2', text: l.steps });
  guide.steps[lang].forEach((step, i) => {
    const detail = guide.details[lang][i];
    blocks.push(
      { type: 'h3', text: `${i + 1}. ${detail.title}` },
      { type: 'p', text: step },
      ...paragraphs(detail.body)
    );
  });

  blocks.push(
    { type: 'h2', text: l.example },
    ...paragraphs(guide.example[lang]),
    { type: 'h2', text: l.mistakes },
    { type: 'list', items: guide.mistakes[lang] },
    { type: 'h2', text: l.checklist },
    { type: 'list', items: guide.checklist[lang] },
    { type: 'h2', text: l.pitfall },
    { type: 'note', text: guide.pitfall[lang] },
    { type: 'h2', text: l.faq }
  );
  guide.faq[lang].forEach(({ q, a }) =>
    blocks.push({ type: 'h3', text: q }, { type: 'p', text: a })
  );
  blocks.push({ type: 'p', text: l.footer(guide.day) });

  const nav = [
    previous &&
      `← ${l.previous}: [${previous.title[lang]}](/publications/${previous.slug})`,
    next && `${l.next}: [${next.title[lang]}](/publications/${next.slug}) →`,
  ].filter((text): text is string => Boolean(text));
  blocks.push(...paragraphs(nav));

  return blocks;
};

export const toPublication = (
  guide: SeriesGuide,
  index: number,
  all: SeriesGuide[]
): Publication => {
  const previous = all[index - 1];
  const next = all[index + 1];
  return {
    ...toSummary(guide),
    body: {
      es: body(guide, 'es', previous, next),
      en: body(guide, 'en', previous, next),
    },
  };
};
