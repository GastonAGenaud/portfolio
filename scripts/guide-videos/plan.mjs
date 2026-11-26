// Turns one guide into the list of slides of its video: what each slide shows
// and what the voice says over it (`say`, one entry per paragraph).

export const SERIES_TOTAL = 31;
const CODE_LINES_PER_SLIDE = 30;

export const labels = {
  es: {
    series: 'Serie QA + IA',
    day: 'Día',
    videoGuide: 'Video guía',
    problem: 'El problema',
    diagram: 'Cómo encaja',
    requirements: 'Requisitos',
    setup: 'Setup',
    step: 'Paso',
    of: 'de',
    example: 'Ejemplo',
    mistakes: 'Errores comunes',
    checklist: 'Checklist',
    pitfall: 'Lo que la IA no hizo bien',
    next: 'Siguiente',
    written: 'La guía escrita',
    sayTitle: (day) => `Día ${day} de la serie 31 días de QA + IA.`,
    sayRequirements: 'Para seguir esta guía necesitás:',
    saySetup:
      'Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.',
    saySetupNext: 'Y este es el siguiente archivo del setup.',
    saySetupMore: 'El mismo archivo sigue acá.',
    sayStep: (i) => `Paso ${i}.`,
    sayExample: 'Un ejemplo.',
    sayMistakes: 'Los errores más comunes.',
    sayChecklist: 'Para saber que quedó bien, revisá esto.',
    sayPitfall: 'Y lo que la IA no hizo bien.',
    sayOutro: (day) =>
      `Eso fue el día ${day}. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.`,
    sayNext: (day, title) => `Seguí con el día ${day}: ${title}`,
    sayLast: 'Con esta guía se cierra la serie. Gracias por llegar hasta acá.',
  },
  en: {
    series: 'QA + AI series',
    day: 'Day',
    videoGuide: 'Video guide',
    problem: 'The problem',
    diagram: 'How it fits together',
    requirements: 'Requirements',
    setup: 'Setup',
    step: 'Step',
    of: 'of',
    example: 'Example',
    mistakes: 'Common mistakes',
    checklist: 'Checklist',
    pitfall: 'Where AI fell short',
    next: 'Next',
    written: 'The written guide',
    sayTitle: (day) => `Day ${day} of the 31 days of QA + AI series.`,
    sayRequirements: 'To follow this guide you need:',
    saySetup:
      'This is the setup. Pause the video if you want to copy it: the full version is in the written guide.',
    saySetupNext: 'And this is the next setup file.',
    saySetupMore: 'The same file continues here.',
    sayStep: (i) => `Step ${i}.`,
    sayExample: 'An example.',
    sayMistakes: 'The most common mistakes.',
    sayChecklist: 'To know it is done, check this.',
    sayPitfall: 'And where AI fell short.',
    sayOutro: (day) =>
      `That was day ${day}. The written guide, at gastongenaud.com, has the code to copy and the frequently asked questions.`,
    sayNext: (day, title) => `Continue with day ${day}: ${title}`,
    sayLast: 'This guide closes the series. Thanks for making it this far.',
  },
};

// A sentence the voice can end on, even when the source has no final period.
const closed = (text) => (/[.!?…:]$/.test(text.trim()) ? text : `${text}.`);

// Pages of at most `max` items and about the same length, so the last page is
// never a stray line.
const paginate = (items, max) => {
  const size = Math.ceil(items.length / Math.ceil(items.length / max));
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, (i + 1) * size)
  );
};

const setupSlides = (guide, lang) => {
  const l = labels[lang];
  return (guide.snippets ?? []).flatMap((snippet, index) => {
    const caption = snippet.caption?.[lang];
    const pages = paginate(snippet.code.split('\n'), CODE_LINES_PER_SLIDE);
    return pages.map((lines, page) => ({
      kind: 'code',
      section: l.setup,
      heading: caption ?? l.setup,
      lang: snippet.lang,
      code: lines.join('\n'),
      say: [
        page > 0 ? l.saySetupMore : index === 0 ? l.saySetup : l.saySetupNext,
      ],
    }));
  });
};

export const planVideo = (guide, lang, next) => {
  const l = labels[lang];
  const [problem, ...approach] = guide.intro[lang];
  const steps = guide.steps[lang];

  return [
    {
      kind: 'title',
      section: l.videoGuide,
      title: guide.title[lang],
      summary: guide.summary[lang],
      tags: guide.tags,
      say: [
        l.sayTitle(guide.day),
        closed(guide.title[lang]),
        guide.summary[lang],
      ],
    },
    {
      kind: 'text',
      section: l.problem,
      heading: l.problem,
      paragraphs: [problem],
      say: [problem],
    },
    {
      kind: 'diagram',
      section: l.diagram,
      heading: l.diagram,
      image: guide.diagramImage,
      say: approach,
    },
    {
      kind: 'list',
      section: l.requirements,
      heading: l.requirements,
      items: guide.requirements[lang],
      say: [l.sayRequirements, ...guide.requirements[lang].map(closed)],
    },
    ...setupSlides(guide, lang),
    ...(guide.extra
      ? [
          {
            kind: 'list',
            section: guide.extra[lang].title,
            heading: guide.extra[lang].title,
            items: guide.extra[lang].items,
            say: [
              closed(guide.extra[lang].title),
              ...guide.extra[lang].items.map(closed),
            ],
          },
        ]
      : []),
    ...steps.map((step, i) => {
      const detail = guide.details[lang][i];
      return {
        kind: 'step',
        section: `${l.step} ${i + 1} ${l.of} ${steps.length}`,
        number: i + 1,
        heading: detail.title,
        lead: step,
        paragraphs: detail.body,
        say: [
          `${l.sayStep(i + 1)} ${closed(detail.title)}`,
          step,
          ...detail.body,
        ],
      };
    }),
    {
      kind: 'text',
      section: l.example,
      heading: l.example,
      paragraphs: guide.example[lang],
      say: [l.sayExample, ...guide.example[lang]],
    },
    {
      kind: 'list',
      marker: 'cross',
      section: l.mistakes,
      heading: l.mistakes,
      items: guide.mistakes[lang],
      say: [l.sayMistakes, ...guide.mistakes[lang].map(closed)],
    },
    {
      kind: 'list',
      marker: 'check',
      section: l.checklist,
      heading: l.checklist,
      items: guide.checklist[lang],
      say: [l.sayChecklist, ...guide.checklist[lang].map(closed)],
    },
    {
      kind: 'quote',
      section: l.pitfall,
      heading: l.pitfall,
      text: guide.pitfall[lang],
      say: [l.sayPitfall, guide.pitfall[lang]],
    },
    {
      kind: 'outro',
      section: l.written,
      heading: l.written,
      url: `gastongenaud.com/publications/${guide.slug}`,
      next: next && {
        label: `${l.next} · ${l.day} ${next.day}`,
        title: next.title[lang],
      },
      say: [
        l.sayOutro(guide.day),
        next ? closed(l.sayNext(next.day, next.title[lang])) : l.sayLast,
      ],
    },
  ];
};
