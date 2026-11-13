import type { Block, Lang, Publication } from '../types';
import type { SeriesGuide } from './types';

export const SERIES_TOTAL = 31;
const SERIES_DATE = '2026-11-13';

const labels = {
  es: {
    kind: 'Guía · Serie QA + IA',
    requirements: 'Requisitos',
    setup: 'Setup',
    steps: 'Paso a paso',
    diagram: 'Cómo encaja',
    pitfall: 'Lo que la IA no hizo bien',
    footer: (day: number) =>
      `Día ${day} de ${SERIES_TOTAL} de la serie **31 días de QA + IA**. Comandos y versiones revisados en noviembre de 2026: volvé a correrlos antes de usarlos, las herramientas de IA cambian rápido.`,
  },
  en: {
    kind: 'Guide · QA + AI series',
    requirements: 'Requirements',
    setup: 'Setup',
    steps: 'Step by step',
    diagram: 'How it fits together',
    pitfall: 'Where AI fell short',
    footer: (day: number) =>
      `Day ${day} of ${SERIES_TOTAL} of the **31 days of QA + AI** series. Commands and versions reviewed in November 2026: rerun them before relying on them, AI tooling changes fast.`,
  },
};

const body = (guide: SeriesGuide, lang: Lang): Block[] => {
  const l = labels[lang];
  const blocks: Block[] = [
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

  blocks.push(
    { type: 'h2', text: l.steps },
    { type: 'list', ordered: true, items: guide.steps[lang] },
    { type: 'h2', text: l.diagram },
    { type: 'code', code: guide.diagram },
    { type: 'h2', text: l.pitfall },
    { type: 'note', text: guide.pitfall[lang] },
    { type: 'p', text: l.footer(guide.day) }
  );

  return blocks;
};

export const toPublication = (guide: SeriesGuide): Publication => ({
  slug: guide.slug,
  date: SERIES_DATE,
  readingMinutes: guide.minutes,
  kind: {
    es: `${labels.es.kind} · ${guide.day}/${SERIES_TOTAL}`,
    en: `${labels.en.kind} · ${guide.day}/${SERIES_TOTAL}`,
  },
  tags: guide.tags,
  title: guide.title,
  summary: guide.summary,
  body: { es: body(guide, 'es'), en: body(guide, 'en') },
});
