import type { SeriesGuide } from './types';

export const week1: SeriesGuide[] = [
  {
    day: 1,
    title: {
      es: 'LLMs en QA: el mapa 2026, dónde sirven y dónde no',
      en: "LLMs in QA: the 2026 map, where they help and where they don't",
    },
    summary: {
      es: 'Seis usos de LLM en QA que hoy funcionan, tres que no, y una regla simple para decidir cuándo delegar.',
      en: "Six LLM uses in QA that work today, three that don't, and a simple rule to decide when to delegate.",
    },
    pitfall: {
      es: 'Inventa reglas de negocio con mucha seguridad. Sin una fuente de verdad al lado, no sirve de oráculo.',
      en: 'It makes up business rules with full confidence. Without a source of truth next to it, it is not an oracle.',
    },
    requirements: {
      es: [
        'Una user story real de tu backlog.',
        'Un LLM a mano: Claude, ChatGPT o un modelo local con Ollama.',
        '20 minutos.',
      ],
      en: [
        'A real user story from your backlog.',
        'Any LLM: Claude, ChatGPT or a local model with Ollama.',
        '20 minutes.',
      ],
    },
    steps: {
      es: [
        'Listá tus tareas de QA de la última semana y marcá las que son texto a texto: analizar, redactar, clasificar, resumir.',
        'Ubicalas en los seis usos que funcionan: análisis de requisitos y ambigüedades, diseño de casos desde user stories, datos de prueba, escritura y refactor de automation con agentes, triage de fallos sobre logs y traces, y evals de features que usan IA.',
        'Tachá los tres que no funcionan: decidir un release sin una persona, usar el modelo como oráculo sin fuente de verdad, y mergear tests de UI generados sin revisar.',
        'Aplicá la regla: delego solo si el resultado es **verificable**, **barato de revisar** y **reversible**.',
        'Probalo: pegá tu user story y pedí "antes de escribir casos, listá ambigüedades y preguntas para el PO".',
        'Anotá qué acertó y qué inventó. Ese registro es tu primer eval.',
      ],
      en: [
        "List last week's QA tasks and flag the text-to-text ones: analyze, draft, classify, summarize.",
        'Place them in the six uses that work: requirements and ambiguity analysis, test design from user stories, test data, writing and refactoring automation with agents, failure triage over logs and traces, and evals for AI-powered features.',
        "Cross out the three that don't: release decisions with no human, the model as an oracle with no source of truth, and merging generated UI tests unreviewed.",
        'Apply the rule: delegate only if the result is **verifiable**, **cheap to review** and **reversible**.',
        'Try it: paste your user story and ask "before writing cases, list ambiguities and questions for the PO".',
        'Write down what it got right and what it made up. That log is your first eval.',
      ],
    },
    intro: {
      es: [
        'En 2026 casi todos los equipos de QA usan algún LLM, pero pocos pueden decir en qué tareas les ahorra tiempo de verdad y en cuáles les suma riesgo. El resultado típico es usarlo para todo durante dos semanas, encontrarse con casos de prueba inventados y un par de tests frágiles, y volver a trabajar como antes.',
        'Esta guía ordena ese terreno. No parte de la herramienta sino de tus tareas: cuáles son de texto a texto, cuáles tienen una fuente de verdad contra la que comparar y cuáles se pueden deshacer si salen mal. Con eso alcanza para armar un mapa propio y una regla de decisión que vas a usar durante toda la serie.',
      ],
      en: [
        'In 2026 almost every QA team uses some LLM, but few can say which tasks it really speeds up and which ones it makes riskier. The usual outcome is to use it for everything for two weeks, run into invented test cases and a couple of brittle tests, and go back to working as before.',
        "This guide sorts that ground out. It doesn't start from the tool but from your tasks: which are text to text, which have a source of truth to compare against, and which can be undone if they go wrong. That is enough to build your own map and a decision rule you will use for the whole series.",
      ],
    },
    details: {
      es: [
        {
          title: 'Inventario de tareas reales',
          body: [
            'Abrí tu calendario y tu tablero de la semana pasada y anotá cada tarea con un verbo: revisar un requisito, escribir casos, preparar datos, automatizar un flujo, analizar un pipeline rojo, reportar un bug. No anotes lo que te gustaría hacer, sino lo que hiciste. Al lado de cada una poné cuánto tiempo te llevó. Las tareas de texto a texto que además te consumen horas son las primeras candidatas, porque ahí el modelo produce un borrador en segundos y vos pasás a revisar en lugar de redactar.',
          ],
        },
        {
          title: 'Los seis usos que rinden',
          body: [
            'Cada uno funciona por la misma razón: hay algo contra qué comparar. En análisis de requisitos, comparás contra el product owner. En diseño de casos, contra las reglas de negocio. En datos de prueba, contra un schema. En automation, contra la ejecución del test. En triage, contra el trace. En evals, contra un dataset etiquetado. Si para una tarea no podés nombrar ese punto de comparación, todavía no pertenece a esta lista, por más que el resultado se vea prolijo.',
          ],
        },
        {
          title: 'Los tres usos que fallan',
          body: [
            'Decidir un release es un juicio de riesgo de negocio y el modelo no conoce tu contexto ni responde por la decisión. Usarlo de oráculo sin fuente de verdad produce respuestas seguras y a veces falsas, que es la peor combinación para QA. Y los tests de UI generados en lote suelen pasar una vez y fallar a la semana, porque dependen de selectores adivinados y esperas fijas. No están prohibidos: necesitan una persona que mire el resultado antes de darlo por bueno.',
          ],
        },
        {
          title: 'La regla de tres preguntas',
          body: [
            'Verificable significa que existe un chequeo objetivo: un test que corre, un schema, una regla escrita. Barato de revisar significa que leerlo te cuesta bastante menos que hacerlo vos; si revisar cuarenta casos generados te lleva más que escribir quince buenos, no ganaste nada. Reversible significa que un error no deja consecuencias: un borrador se descarta, un merge a producción no. Si falla una de las tres, la IA puede asistir, pero la decisión y la firma son tuyas.',
          ],
        },
        {
          title: 'Primera prueba con una user story',
          body: [
            'Elegí una story que ya esté en desarrollo, así podés comparar con lo que el equipo descubrió por las malas. Pegá el texto completo con sus criterios de aceptación y pedí solo ambigüedades y preguntas, no casos. Tomá nota de cuántas preguntas son reales, cuántas ya estaban respondidas en otro lado y cuántas no aplican. Esa proporción te dice si para tu dominio conviene usarlo en refinamiento o si primero necesita más contexto escrito.',
          ],
        },
        {
          title: 'El registro de aciertos y errores',
          body: [
            'Armá una tabla simple con cuatro columnas: tarea, qué pediste, qué acertó y qué inventó. Completala durante dos semanas cada vez que uses un modelo para algo de QA. Sin ese registro tu opinión sobre la herramienta va a depender del último resultado que viste. Con el registro tenés evidencia para decidir dónde seguir usándola, y además el primer borrador de un dataset de evaluación, que es justo lo que vamos a construir más adelante.',
          ],
        },
      ],
      en: [
        {
          title: 'Inventory of real tasks',
          body: [
            "Open last week's calendar and board and write each task down with a verb: review a requirement, write cases, prepare data, automate a flow, analyze a red pipeline, report a bug. Don't list what you'd like to do, list what you did. Next to each one, note how long it took. Text-to-text tasks that also eat hours are the first candidates, because the model produces a draft in seconds and you move from writing to reviewing.",
          ],
        },
        {
          title: 'The six uses that pay off',
          body: [
            "Each one works for the same reason: there is something to compare against. In requirements analysis you compare against the product owner. In test design, against the business rules. In test data, against a schema. In automation, against the test run. In triage, against the trace. In evals, against a labeled dataset. If you can't name that point of comparison for a task, it doesn't belong on this list yet, however neat the output looks.",
          ],
        },
        {
          title: 'The three uses that fail',
          body: [
            "A release decision is a business risk judgment, and the model neither knows your context nor answers for the decision. Using it as an oracle with no source of truth produces confident and sometimes false answers, the worst combination for QA. And UI tests generated in bulk tend to pass once and fail a week later, because they rely on guessed selectors and fixed waits. They aren't forbidden: they need a person to look at the result before calling it good.",
          ],
        },
        {
          title: 'The three-question rule',
          body: [
            "Verifiable means an objective check exists: a test that runs, a schema, a written rule. Cheap to review means reading it costs you much less than doing it yourself; if reviewing forty generated cases takes longer than writing fifteen good ones, you gained nothing. Reversible means a mistake leaves no consequences: a draft gets discarded, a merge to production doesn't. If one of the three fails, AI can assist, but the decision and the signature are yours.",
          ],
        },
        {
          title: 'First trial with a user story',
          body: [
            "Pick a story already in development, so you can compare with what the team found out the hard way. Paste the full text with its acceptance criteria and ask only for ambiguities and questions, not cases. Note how many questions are real, how many were already answered elsewhere and how many don't apply. That ratio tells you whether, in your domain, it's worth using in refinement or whether it first needs more written context.",
          ],
        },
        {
          title: 'The log of hits and misses',
          body: [
            'Build a simple table with four columns: task, what you asked, what it got right and what it made up. Fill it in for two weeks every time you use a model for something in QA. Without that log, your opinion of the tool will depend on the last result you saw. With it you have evidence to decide where to keep using it, plus the first draft of an evaluation dataset, which is exactly what we build later on.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Una analista toma la story "aplicar cupón de descuento en el checkout". Le pide al modelo ambigüedades y recibe siete preguntas. Tres son reales y nadie las había hecho: qué pasa si el cupón vence durante la compra, si se combina con envío gratis y cómo se redondea. Dos ya estaban respondidas en el documento de reglas. Las otras dos asumen una regla de "un cupón por cliente" que no existe. Resultado en la tabla: tres aciertos, dos sobras y dos inventos. Diez minutos de trabajo y tres preguntas que evitaron un bug en producción. Ese es un uso que pasa la regla: verificable con el PO, barato de leer y sin consecuencias si se descarta.',
      ],
      en: [
        'An analyst takes the story "apply a discount coupon at checkout". She asks the model for ambiguities and gets seven questions. Three are real and nobody had asked them: what happens if the coupon expires mid-purchase, whether it combines with free shipping and how rounding works. Two were already answered in the rules document. The other two assume a "one coupon per customer" rule that doesn\'t exist. Result in the table: three hits, two leftovers and two inventions. Ten minutes of work and three questions that prevented a production bug. That use passes the rule: verifiable with the PO, cheap to read and with no consequences if discarded.',
      ],
    },
    mistakes: {
      es: [
        'Evaluar la herramienta por una demo o por el último resultado, sin registro de aciertos y errores.',
        'Pedir el entregable final (casos, tests) antes de pedir preguntas y ambigüedades.',
        'Dar por bueno un resultado porque está bien redactado, sin compararlo contra una fuente de verdad.',
        'Medir el ahorro solo en tiempo de escritura y olvidar el tiempo de revisión.',
      ],
      en: [
        'Judging the tool by a demo or the last result, with no log of hits and misses.',
        'Asking for the final deliverable (cases, tests) before asking for questions and ambiguities.',
        'Accepting a result because it reads well, without comparing it against a source of truth.',
        'Measuring savings only in writing time and forgetting review time.',
      ],
    },
    checklist: {
      es: [
        'Tenés diez tareas reales clasificadas en delegables y no delegables.',
        'Cada tarea delegable tiene nombrado contra qué se verifica.',
        'Corriste el prompt de ambigüedades sobre una story real.',
        'Tu tabla tiene al menos tres aciertos y un error anotados.',
      ],
      en: [
        'You have ten real tasks classified as delegable or not.',
        'Each delegable task names what it gets verified against.',
        'You ran the ambiguity prompt on a real story.',
        'Your table has at least three hits and one error logged.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Qué modelo conviene usar para empezar?',
          a: 'El que ya tengas disponible. Para este ejercicio importa más el método que el modelo: las mismas tres preguntas sirven con un modelo local chico o con uno comercial. Cambiar de modelo después es fácil; cambiar el hábito de no verificar, no.',
        },
        {
          q: '¿Sirve si mi equipo todavía no automatiza?',
          a: 'Sí. Cuatro de los seis usos (requisitos, diseño de casos, datos y triage) no necesitan un framework de automatización. De hecho son un buen punto de entrada, porque el resultado es texto que podés revisar con lo que ya sabés.',
        },
        {
          q: '¿Cuánto tiempo lleva armar el mapa?',
          a: 'Una hora para el inventario y la clasificación, y dos semanas de uso para que la tabla de aciertos y errores tenga datos suficientes. No lo cierres antes: las primeras impresiones suelen ser demasiado optimistas o demasiado negativas.',
        },
      ],
      en: [
        {
          q: 'Which model should I start with?',
          a: 'Whichever you already have available. For this exercise the method matters more than the model: the same three questions work with a small local model or a commercial one. Switching models later is easy; switching the habit of not verifying is not.',
        },
        {
          q: "Does it help if my team doesn't automate yet?",
          a: 'Yes. Four of the six uses (requirements, test design, data and triage) need no automation framework. They are in fact a good entry point, because the output is text you can review with what you already know.',
        },
        {
          q: 'How long does building the map take?',
          a: "One hour for the inventory and classification, and two weeks of use for the hits-and-misses table to hold enough data. Don't close it earlier: first impressions tend to be either too optimistic or too negative. Review the table with your team at the end, because other people's entries usually show uses and failures you didn't run into yourself.",
        },
      ],
    },
    slug: 'qa-ai-01-llms-in-qa-map',
    minutes: 6,
    tags: ['QA', 'LLM', 'AI Testing'],
    diagram:
      'QA task\n  └─ Verifiable? ── no ──▶ do not delegate\n        │ yes\n        ▼\n     Cheap to review? ── no ──▶ do not delegate\n        │ yes\n        ▼\n     Reversible? ── no ──▶ human decides, LLM assists\n        │ yes\n        ▼\n     Delegate to LLM + review ──▶ log hits and misses (your first eval)',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d01-light.webp',
      dark: '/publications/qa-ai/diagrams/d01-dark.webp',
      width: 1130,
      height: 1882,
    },
    cover: {
      es: '/publications/qa-ai/covers/d01-es.jpg',
      en: '/publications/qa-ai/covers/d01-en.jpg',
    },
    keywords: {
      es: 'Inventario de tareas reales · Los seis usos que rinden · Los tres usos que fallan · La regla de tres preguntas · Primera prueba con una user story · El registro de aciertos y errores',
      en: 'Inventory of real tasks · The six uses that pay off · The three uses that fail · The three-question rule · First trial with a user story · The log of hits and misses',
    },
  },
  {
    day: 2,
    title: {
      es: 'Cómo se está reorientando el rol SDET en el mundo de la IA',
      en: 'How the SDET role is being reshaped by AI',
    },
    summary: {
      es: 'Qué cambia y qué no en el rol SDET, y cómo armar tu matriz de habilidades para los próximos 30 días.',
      en: "What changes and what doesn't in the SDET role, and how to build your skills matrix for the next 30 days.",
    },
    pitfall: {
      es: 'Le pedí a un modelo que evaluara mi nivel y me puso todo en "avanzado". No sirve para autoevaluarte: te halaga.',
      en: 'I asked a model to rate my level and it marked everything "advanced". It\'s useless for self-assessment: it flatters you.',
    },
    requirements: {
      es: [
        'Una hoja de cálculo o una página de notas.',
        'Tu descripción de puesto actual.',
        '30 minutos de honestidad.',
      ],
      en: [
        'A spreadsheet or a notes page.',
        'Your current job description.',
        '30 honest minutes.',
      ],
    },
    steps: {
      es: [
        'Escribí qué hacías hace dos años y qué hacés hoy. El cambio de fondo: de escribir cada test a diseñar, guiar, revisar y validar sistemas que testean.',
        'Sumá las cuatro competencias nuevas: contexto para agentes (reglas, skills, specs), evals para salidas no deterministas, revisión de tests generados por IA, y costo e infraestructura (tokens, CI, runners).',
        'Marcá lo que no cambia: pensar en riesgo, diseñar buenos casos y conocer el sistema. Eso es lo que la IA no trae.',
        'Armá la matriz: una fila por competencia, columnas Nivel hoy (0 a 3), Evidencia y Próximo paso.',
        'Elegí dos competencias con nivel 0 o 1 y atales un día de esta serie.',
        'Actualizá tu perfil con evidencia concreta: un repo con evals vale más que "experiencia con IA".',
      ],
      en: [
        'Write what you did two years ago and what you do today. The core shift: from writing every test to designing, guiding, reviewing and validating systems that test.',
        'Add the four new competencies: context for agents (rules, skills, specs), evals for non-deterministic outputs, reviewing AI-generated tests, and cost and infrastructure (tokens, CI, runners).',
        "Flag what doesn't change: risk thinking, good test design and knowing the system. That is what AI doesn't bring.",
        'Build the matrix: one row per competency, columns Level today (0 to 3), Evidence and Next step.',
        'Pick two competencies at level 0 or 1 and tie each to a day of this series.',
        'Update your profile with concrete evidence: a repo with evals beats "experience with AI".',
      ],
    },
    intro: {
      es: [
        'La pregunta que más se repite en la comunidad de testing es si la IA va a reemplazar al SDET. Es una pregunta mal planteada: el trabajo no desaparece, cambia de lugar. Escribir un test dejó de ser la parte escasa, porque un agente lo hace en segundos. Lo escaso ahora es saber qué vale la pena probar, darle contexto a quien lo escribe y poder afirmar que el resultado es confiable.',
        'Esta guía describe ese corrimiento con cuatro competencias nuevas y tres que no cambian, y termina con una matriz para medirte sin autoengaño. No es una lista de herramientas de moda: es un mapa de habilidades con evidencia verificable para cada una.',
      ],
      en: [
        "The most repeated question in the testing community is whether AI will replace the SDET. It's the wrong question: the work doesn't disappear, it moves. Writing a test stopped being the scarce part, because an agent does it in seconds. What's scarce now is knowing what is worth testing, giving context to whoever writes it and being able to state that the result is trustworthy.",
        "This guide describes that shift with four new competencies and three that don't change, and ends with a matrix to measure yourself without self-deception. It isn't a list of trendy tools: it's a skills map with verifiable evidence for each one.",
      ],
    },
    details: {
      es: [
        {
          title: 'Antes y ahora, por escrito',
          body: [
            'Tomá tu descripción de puesto y tus últimas diez tareas. Para cada una preguntate qué parte fue producir (escribir código de test, datos, reportes) y qué parte fue decidir (qué cubrir, qué riesgo aceptar, qué resultado creer). Hace dos años la mayor parte del tiempo se iba en producir. Hoy esa parte se abarata y la de decidir pesa más. Verlo escrito con tus propias tareas evita discutir en abstracto y te muestra cuánto de tu semana ya cambió.',
          ],
        },
        {
          title: 'Las cuatro competencias nuevas',
          body: [
            'Contexto para agentes es escribir reglas, convenciones y especificaciones que un agente pueda seguir sin vos al lado. Evals es medir salidas que no son iguales dos veces, con datasets y umbrales. Revisión de tests generados es detectar relleno: aserciones débiles, casos duplicados, mocks de lo que se debería probar. Costo e infraestructura es saber cuánto cuesta cada corrida en tokens y minutos de CI, y dónde corre cada cosa. Ninguna reemplaza a la automatización clásica: se apoyan en ella.',
          ],
        },
        {
          title: 'Lo que no cambia',
          body: [
            'Pensar en riesgo es decidir dónde un fallo le duele al negocio y concentrar ahí el esfuerzo. Diseñar buenos casos es conocer técnicas como particiones, bordes y tablas de decisión, y saber cuándo aplicar cada una. Conocer el sistema es entender sus dependencias, sus datos y sus puntos frágiles. Un agente sin estas tres cosas genera cobertura numérica, no calidad. Son además las habilidades que te permiten revisar lo que el agente produce, así que su valor sube, no baja.',
          ],
        },
        {
          title: 'La matriz de habilidades',
          body: [
            'Usá una fila por competencia: las cuatro nuevas y las tres que no cambian. En la columna de nivel poné un número de cero a tres, donde cero es no lo hice nunca, uno es lo probé, dos es lo uso en un proyecto real y tres es puedo enseñarlo. En evidencia, un enlace o un artefacto concreto: un repo, un pipeline, un reporte. Si no hay evidencia, el nivel no puede ser mayor que uno. Esa regla es la que vuelve honesta a la matriz.',
          ],
        },
        {
          title: 'Dos focos, no siete',
          body: [
            'Mejorar todo a la vez no funciona. Elegí las dos filas con nivel más bajo que además importen para tu trabajo actual o para el que buscás. A cada una asignale un día de esta serie y una fecha: por ejemplo, evals con el día ocho y costo e infraestructura con el día veintinueve. El próximo paso tiene que ser un entregable chico y visible, como un eval harness con diez casos o un job que publique tokens por corrida.',
          ],
        },
        {
          title: 'Evidencia en tu perfil',
          body: [
            'Un perfil que dice "experiencia con IA aplicada a testing" no se distingue de otros mil. Uno que enlaza un repositorio con un eval harness, un pipeline con un quality gate y un caso escrito de triage sí. Cuando termines cada entregable, sumalo con una frase que diga qué mide y qué decisión permitió tomar. En entrevistas, esa evidencia te deja hablar de experiencia propia en lugar de repetir teoría, y eso es lo que un entrevistador técnico busca.',
          ],
        },
      ],
      en: [
        {
          title: 'Before and now, in writing',
          body: [
            'Take your job description and your last ten tasks. For each one, ask which part was producing (writing test code, data, reports) and which part was deciding (what to cover, what risk to accept, which result to believe). Two years ago most of the time went into producing. Today that part gets cheaper and deciding weighs more. Seeing it written with your own tasks avoids arguing in the abstract and shows how much of your week has already changed.',
          ],
        },
        {
          title: 'The four new competencies',
          body: [
            'Context for agents is writing rules, conventions and specifications an agent can follow without you beside it. Evals is measuring outputs that are never the same twice, with datasets and thresholds. Reviewing generated tests is spotting filler: weak assertions, duplicated cases, mocks of what should be tested. Cost and infrastructure is knowing what each run costs in tokens and CI minutes, and where each thing runs. None replaces classic automation: they build on it.',
          ],
        },
        {
          title: "What doesn't change",
          body: [
            'Risk thinking is deciding where a failure hurts the business and focusing effort there. Good test design is knowing techniques such as partitions, boundaries and decision tables, and when to apply each. Knowing the system is understanding its dependencies, its data and its fragile points. An agent without these three produces numeric coverage, not quality. They are also the skills that let you review what the agent produces, so their value goes up, not down.',
          ],
        },
        {
          title: 'The skills matrix',
          body: [
            "Use one row per competency: the four new ones and the three unchanged. In the level column put a number from zero to three, where zero is never done it, one is tried it, two is use it on a real project and three is can teach it. Under evidence, a link or a concrete artifact: a repo, a pipeline, a report. With no evidence, the level can't be above one. That rule is what makes the matrix honest.",
          ],
        },
        {
          title: 'Two focus areas, not seven',
          body: [
            "Improving everything at once doesn't work. Pick the two lowest rows that also matter for your current job or the one you're after. Assign each a day from this series and a date: for example, evals with day eight and cost and infrastructure with day twenty-nine. The next step must be a small, visible deliverable, such as an eval harness with ten cases or a job that publishes tokens per run.",
          ],
        },
        {
          title: 'Evidence on your profile',
          body: [
            'A profile saying "experience with AI applied to testing" is indistinguishable from a thousand others. One that links a repository with an eval harness, a pipeline with a quality gate and a written triage case is not. When you finish each deliverable, add it with one sentence saying what it measures and which decision it enabled. In interviews, that evidence lets you speak from your own experience instead of repeating theory, which is what a technical interviewer looks for.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un SDET con seis años de experiencia completa la matriz. En diseño de casos y conocimiento del sistema se pone tres, con evidencia de sobra. En contexto para agentes se pone uno: usó un asistente, pero nunca escribió reglas para el repo. En evals, cero. En revisión de tests generados, uno. En costo, cero. Elige evals y contexto para agentes como focos. En tres semanas arma un `AGENTS.md` para su repo de automation y un eval de diez casos para el clasificador de bugs del equipo. Su perfil pasa de una frase genérica a dos enlaces con una línea de explicación cada uno.',
      ],
      en: [
        "An SDET with six years of experience fills in the matrix. For test design and system knowledge he gives himself a three, with plenty of evidence. For context for agents, a one: he has used an assistant but never wrote rules for the repo. For evals, zero. For reviewing generated tests, one. For cost, zero. He picks evals and context for agents as focus areas. In three weeks he builds an `AGENTS.md` for his automation repo and a ten-case eval for the team's bug classifier. His profile goes from one generic sentence to two links with one line of explanation each.",
      ],
    },
    mistakes: {
      es: [
        'Ponerte nivel alto sin un artefacto que lo respalde.',
        'Elegir como foco la herramienta de moda en lugar de la competencia que te falta.',
        'Abandonar diseño de casos y riesgo porque "eso lo hace la IA".',
        'Planear siete mejoras en paralelo y no terminar ninguna.',
      ],
      en: [
        'Giving yourself a high level with no artifact to back it.',
        'Picking the trendy tool as a focus instead of the competency you lack.',
        'Dropping test design and risk because "AI does that".',
        'Planning seven improvements in parallel and finishing none.',
      ],
    },
    checklist: {
      es: [
        'La matriz tiene siete filas con nivel, evidencia y próximo paso.',
        'Ningún nivel mayor a uno carece de evidencia enlazada.',
        'Elegiste dos focos con fecha y entregable.',
        'Tu perfil enlaza al menos un artefacto verificable.',
      ],
      en: [
        'The matrix has seven rows with level, evidence and next step.',
        'No level above one lacks linked evidence.',
        'You picked two focus areas with a date and a deliverable.',
        'Your profile links at least one verifiable artifact.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Hace falta saber machine learning para ser SDET hoy?',
          a: 'No hace falta entrenar modelos. Sí hace falta entender cómo se comportan: que no son deterministas, que cuestan por token, que tienen un límite de contexto y que pueden afirmar cosas falsas. Con eso alcanza para diseñar evaluaciones y revisar lo que producen.',
        },
        {
          q: '¿La automatización clásica pierde valor?',
          a: 'No. Los evals, los gates y los agentes se apoyan en runners, fixtures, reportes y pipelines. Quien domina eso aprende las competencias nuevas mucho más rápido, porque ya sabe qué es un test confiable y qué es uno frágil.',
        },
        {
          q: '¿Por dónde empiezo si mis siete filas están en cero o uno?',
          a: 'Por evals. Es la competencia más transferible, la más pedida y la que menos depende de una herramienta en particular. Un eval chico sobre algo real de tu trabajo ya es evidencia para la matriz.',
        },
      ],
      en: [
        {
          q: 'Do I need to know machine learning to be an SDET today?',
          a: "You don't need to train models. You do need to understand how they behave: that they aren't deterministic, that they cost per token, that they have a context limit and that they can state false things. That is enough to design evaluations and review what they produce.",
        },
        {
          q: 'Does classic automation lose value?',
          a: 'No. Evals, gates and agents build on runners, fixtures, reports and pipelines. Whoever masters those learns the new competencies much faster, because they already know what a trustworthy test is and what a brittle one looks like.',
        },
        {
          q: 'Where do I start if my seven rows are at zero or one?',
          a: "With evals. It's the most transferable competency, the most requested and the least tied to a particular tool. A small eval on something real from your job already counts as evidence for the matrix, and it gives you a concrete story to tell in an interview: what you measured, what threshold you chose and what you decided with the result.",
        },
      ],
    },
    slug: 'qa-ai-02-sdet-role-reshaped-by-ai',
    minutes: 6,
    tags: ['SDET', 'Career', 'AI Testing'],
    diagram:
      'SDET before: writes every test\n        │\n        ▼\nSDET now: designs and validates testing systems\n   ├─ context for agents (rules, skills, specs)\n   ├─ evals for non-deterministic outputs\n   ├─ review of AI-generated tests\n   └─ cost and infrastructure\n\nUnchanged: risk thinking · test design · system knowledge',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d02-light.webp',
      dark: '/publications/qa-ai/diagrams/d02-dark.webp',
      width: 1752,
      height: 734,
    },
    cover: {
      es: '/publications/qa-ai/covers/d02-es.jpg',
      en: '/publications/qa-ai/covers/d02-en.jpg',
    },
    keywords: {
      es: 'Antes y ahora, por escrito · Las cuatro competencias nuevas · Lo que no cambia · La matriz de habilidades · Dos focos, no siete · Evidencia en tu perfil',
      en: "Before and now, in writing · The four new competencies · What doesn't change · The skills matrix · Two focus areas, not seven · Evidence on your profile",
    },
  },
  {
    day: 3,
    title: {
      es: 'Las nuevas formas de probar: de asserts a evals',
      en: 'The new ways of testing: from asserts to evals',
    },
    summary: {
      es: 'Cómo convertir un test con assert exacto sobre una salida de IA en un eval de tres capas que no sea frágil.',
      en: "How to turn a test with an exact assert on an AI output into a three-layer eval that isn't brittle.",
    },
    pitfall: {
      es: 'El modelo juez aprobó una respuesta con un dato incorrecto. Los hechos se validan con reglas, no con otro modelo.',
      en: 'The judge model approved an answer with a wrong fact. Facts get validated with rules, not with another model.',
    },
    requirements: {
      es: [
        'Node.js 22 o superior.',
        'Un test tuyo que compare texto exacto.',
        'Opcional: Ollama con un modelo local.',
      ],
      en: [
        'Node.js 22 or later.',
        'One of your tests that compares exact text.',
        'Optional: Ollama with a local model.',
      ],
    },
    steps: {
      es: [
        'Entendé la diferencia: un assert compara contra un valor exacto; un eval mide si la salida cumple criterios, varias veces, y da un porcentaje.',
        '**Capa 1, formato**: validá estructura con checks deterministas (es JSON válido, tiene los campos, respeta el largo).',
        '**Capa 2, contenido**: verificá hechos clave con contains o regex, sin exigir la frase exacta.',
        '**Capa 3, criterio**: usá una rúbrica evaluada por otro modelo para lo que no se puede expresar con reglas (tono, completitud).',
        'Corré N veces y fijá un umbral: por ejemplo, pasa si 9 de 10 corridas cumplen las tres capas.',
        'Ubicalo en tu pirámide: unit y contract siguen siendo deterministas; los evals son una capa más para todo lo que toca un modelo.',
      ],
      en: [
        'Understand the difference: an assert compares against an exact value; an eval measures whether the output meets criteria, several times, and yields a percentage.',
        '**Layer 1, format**: validate structure with deterministic checks (valid JSON, required fields, length).',
        '**Layer 2, content**: verify key facts with contains or regex, without demanding the exact sentence.',
        "**Layer 3, judgment**: use a rubric graded by another model for what rules can't express (tone, completeness).",
        'Run N times and set a threshold: for example, pass if 9 of 10 runs satisfy all three layers.',
        'Place it in your pyramid: unit and contract stay deterministic; evals are an extra layer for anything that touches a model.',
      ],
    },
    snippets: [
      {
        code: 'node -v\nnpx promptfoo@latest --version',
        lang: 'bash',
      },
    ],
    intro: {
      es: [
        'Cuando una funcionalidad incluye un modelo, el test clásico deja de servir tal como está. Un assert que compara contra un texto exacto falla aunque la respuesta sea correcta, porque el modelo la redacta distinto cada vez. La reacción habitual es marcar el test como flaky, agregarle reintentos y seguir. Eso tapa el problema: el test dejó de medir.',
        'La salida no es abandonar la automatización sino cambiar la pregunta. En lugar de "¿es igual a esto?", preguntamos "¿cumple estos criterios, la mayoría de las veces?". Eso es un eval. Esta guía muestra cómo armarlo en tres capas, de la más barata y determinista a la más cara, y cómo decidir un umbral.',
      ],
      en: [
        'When a feature includes a model, the classic test stops working as is. An assert comparing against exact text fails even when the answer is right, because the model words it differently every time. The usual reaction is to mark the test as flaky, add retries and move on. That hides the problem: the test stopped measuring.',
        'The way out isn\'t abandoning automation but changing the question. Instead of "is it equal to this?", we ask "does it meet these criteria, most of the time?". That is an eval. This guide shows how to build one in three layers, from the cheapest and most deterministic to the most expensive, and how to choose a threshold.',
      ],
    },
    details: {
      es: [
        {
          title: 'Assert contra eval',
          body: [
            'Un assert tiene una entrada, una salida esperada y un resultado binario. Un eval tiene un conjunto de entradas, criterios en lugar de una salida única, varias corridas por entrada y un resultado en porcentaje que se compara contra un umbral. Cambia también cómo se lee un fallo: en un assert, rojo significa bug; en un eval, una corrida mala puede ser ruido y cinco seguidas son una regresión. Por eso hace falta registrar la tasa de aprobación en el tiempo y no solo el último resultado.',
          ],
        },
        {
          title: 'Capa uno: formato',
          body: [
            'Es la capa más barata y la que más atrapa. Verificá que la salida sea JSON válido, que tenga los campos obligatorios con el tipo correcto, que respete largos máximos y que no traiga texto fuera de la estructura. Todo eso se resuelve con un schema y sin llamar a ningún modelo. Si esta capa falla, no tiene sentido evaluar las siguientes: una respuesta que tu aplicación no puede parsear ya es un defecto, diga lo que diga.',
          ],
        },
        {
          title: 'Capa dos: contenido',
          body: [
            'Acá verificás hechos, no redacción. Si la respuesta tiene que mencionar un monto, una fecha y un estado, buscá esos tres datos con contains o con una expresión regular. También sirve verificar lo contrario: que no aparezca información que no debería estar, como un dato de otro cliente o un paso inexistente. Esta capa sigue siendo determinista y barata. La regla práctica es que todo dato duro se valida acá, nunca con la opinión de otro modelo.',
          ],
        },
        {
          title: 'Capa tres: criterio',
          body: [
            'Queda lo que no se puede expresar con reglas: si el tono es el adecuado, si la explicación está completa, si la respuesta realmente contesta lo que se preguntó. Para eso se usa una rúbrica que evalúa otro modelo, con criterios observables y resultado pasa o falla. Es la capa más cara y la menos confiable, así que conviene mantenerla chica. El día dieciséis muestra cómo calibrar ese juez contra tu propio criterio antes de creerle.',
          ],
        },
        {
          title: 'Corridas y umbral',
          body: [
            'Corré cada caso varias veces: tres para trabajo diario, cinco o diez cuando vas a tomar una decisión. El umbral depende del riesgo. Para una capa de formato conviene exigir cien por ciento, porque un JSON roto rompe la aplicación. Para criterio, un noventa por ciento puede ser razonable. Lo importante es fijar el número antes de mirar los resultados y escribir por qué, para no acomodarlo después a lo que dio.',
          ],
        },
        {
          title: 'El lugar en la pirámide',
          body: [
            'Los evals no reemplazan nada de lo que ya tenés. Los tests unitarios y de contrato siguen siendo deterministas y siguen corriendo en cada commit. Los evals son una capa adicional que cubre solo lo que toca un modelo, y suelen correr con otra frecuencia porque cuestan más. Un error común es intentar cubrir con evals lógica que no depende del modelo: eso se prueba mejor, más rápido y más barato con un test clásico.',
          ],
        },
      ],
      en: [
        {
          title: 'Assert versus eval',
          body: [
            'An assert has one input, one expected output and a binary result. An eval has a set of inputs, criteria instead of a single output, several runs per input and a percentage result compared against a threshold. How you read a failure changes too: in an assert, red means bug; in an eval, one bad run may be noise and five in a row are a regression. That is why you need to record the pass rate over time and not just the latest result.',
          ],
        },
        {
          title: 'Layer one: format',
          body: [
            "It's the cheapest layer and the one that catches the most. Check that the output is valid JSON, that required fields exist with the right type, that maximum lengths hold and that no text sits outside the structure. All of that is solved with a schema and no model call. If this layer fails, evaluating the next ones is pointless: an answer your application can't parse is already a defect, whatever it says.",
          ],
        },
        {
          title: 'Layer two: content',
          body: [
            "Here you verify facts, not wording. If the answer must mention an amount, a date and a status, look for those three with contains or a regular expression. Checking the opposite also helps: that information which shouldn't be there doesn't appear, such as another customer's data or a nonexistent step. This layer is still deterministic and cheap. The practical rule is that every hard fact gets validated here, never by another model's opinion.",
          ],
        },
        {
          title: 'Layer three: judgment',
          body: [
            "What remains is what rules can't express: whether the tone fits, whether the explanation is complete, whether the answer really addresses the question. For that you use a rubric graded by another model, with observable criteria and a pass or fail result. It's the most expensive and least reliable layer, so keep it small. Day sixteen shows how to calibrate that judge against your own judgment before trusting it.",
          ],
        },
        {
          title: 'Runs and threshold',
          body: [
            "Run each case several times: three for daily work, five or ten when you're about to make a decision. The threshold depends on risk. For the format layer, demand one hundred percent, because broken JSON breaks the application. For judgment, ninety percent can be reasonable. What matters is setting the number before looking at results and writing down why, so you don't adjust it afterwards to whatever came out.",
          ],
        },
        {
          title: 'Its place in the pyramid',
          body: [
            "Evals replace nothing you already have. Unit and contract tests stay deterministic and keep running on every commit. Evals are an extra layer covering only what touches a model, and they usually run at a different frequency because they cost more. A common mistake is trying to cover logic that doesn't depend on the model with evals: that is tested better, faster and cheaper with a classic test.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo tiene un test que compara el resumen de un pedido contra un texto fijo y falla una de cada tres corridas. Lo reescriben así. Capa uno: la salida es JSON con los campos `resumen` y `estado`, y el resumen no supera las 280 letras. Capa dos: el resumen contiene el número de pedido y el monto total. Capa tres: una rúbrica verifica que no agregue pasos que el pedido no tiene. Lo corren diez veces. La capa uno pasa diez de diez, la dos también, la tres nueve de diez. Con umbral de noventa por ciento, pasa, y la corrida fallida queda guardada para revisar.',
      ],
      en: [
        "A team has a test comparing an order summary against fixed text, failing one run in three. They rewrite it like this. Layer one: the output is JSON with `summary` and `status` fields, and the summary stays within 280 characters. Layer two: the summary contains the order number and the total amount. Layer three: a rubric checks that it adds no steps the order doesn't have. They run it ten times. Layer one passes ten out of ten, so does layer two, layer three nine out of ten. With a ninety percent threshold it passes, and the failed run is saved for review.",
      ],
    },
    mistakes: {
      es: [
        'Tapar un assert exacto con reintentos en lugar de cambiar lo que se mide.',
        'Usar un modelo juez para validar datos duros como montos o fechas.',
        'Fijar el umbral después de ver los resultados.',
        'Sacar conclusiones de una sola corrida.',
      ],
      en: [
        'Covering an exact assert with retries instead of changing what is measured.',
        'Using a judge model to validate hard facts such as amounts or dates.',
        'Setting the threshold after seeing the results.',
        'Drawing conclusions from a single run.',
      ],
    },
    checklist: {
      es: [
        'El test original quedó reescrito en tres capas separadas.',
        'Formato y contenido se validan sin llamar a un modelo.',
        'Hay un umbral escrito con su justificación.',
        'Guardaste y revisaste al menos una corrida fallida.',
      ],
      en: [
        'The original test is rewritten into three separate layers.',
        'Format and content are validated without calling a model.',
        'There is a written threshold with its justification.',
        'You saved and reviewed at least one failed run.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Poner temperatura en cero no resuelve la variación?',
          a: 'La reduce, no la elimina. Sigue habiendo diferencias entre versiones del modelo, entre proveedores y a veces entre corridas. Además, en producción no siempre vas a usar temperatura cero. Conviene que tu forma de medir tolere variación en lugar de depender de que no exista.',
        },
        {
          q: '¿Cuántos casos necesito para empezar?',
          a: 'Diez casos bien elegidos alcanzan para ver el patrón de fallos. El dataset crece después, con casos reales que aparecen en uso. Más adelante en la serie vemos cómo construir uno de cincuenta o más con criterio de selección.',
        },
        {
          q: '¿Los evals tienen que correr en cada commit?',
          a: 'No necesariamente. Las capas deterministas son baratas y pueden correr siempre. La capa con juez cuesta tokens y tiempo, así que suele correr solo cuando cambian prompts, modelo o datos, y de forma programada una vez por día.',
        },
      ],
      en: [
        {
          q: "Doesn't setting temperature to zero solve the variation?",
          a: "It reduces it, it doesn't remove it. Differences remain across model versions, across providers and sometimes across runs. Besides, in production you won't always use temperature zero. Your way of measuring should tolerate variation instead of depending on its absence.",
        },
        {
          q: 'How many cases do I need to start?',
          a: 'Ten well-chosen cases are enough to see the failure pattern. The dataset grows afterwards, with real cases that show up in use. Later in the series we see how to build one with fifty or more using selection criteria.',
        },
        {
          q: 'Do evals have to run on every commit?',
          a: "Not necessarily. The deterministic layers are cheap and can always run. The judge layer costs tokens and time, so it usually runs only when prompts, model or data change, plus on a schedule once a day. Start by running everything by hand for a week: you'll learn how long it takes and what it costs before deciding where it belongs in the pipeline.",
        },
      ],
    },
    slug: 'qa-ai-03-from-asserts-to-evals',
    minutes: 6,
    tags: ['Evals', 'LLM', 'Test Automation'],
    diagram:
      'model output\n   ▼\nLayer 1: format     (deterministic: JSON, fields, length)\n   ▼\nLayer 2: content    (contains / regex on key facts)\n   ▼\nLayer 3: judgment   (rubric graded by a judge model)\n   ▼\nrun N times ──▶ pass rate >= threshold?\n                  ├─ yes ▶ pass\n                  └─ no  ▶ fail + inspect the failed runs',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d03-light.webp',
      dark: '/publications/qa-ai/diagrams/d03-dark.webp',
      width: 788,
      height: 1854,
    },
    cover: {
      es: '/publications/qa-ai/covers/d03-es.jpg',
      en: '/publications/qa-ai/covers/d03-en.jpg',
    },
    keywords: {
      es: 'Assert contra eval · Capa uno: formato · Capa dos: contenido · Capa tres: criterio · Corridas y umbral · El lugar en la pirámide',
      en: 'Assert versus eval · Layer one: format · Layer two: content · Layer three: judgment · Runs and threshold · Its place in the pyramid',
    },
  },
  {
    day: 4,
    title: {
      es: 'Tu laboratorio de QA con IA: setup completo en 30 minutos',
      en: 'Your AI QA lab: full setup in 30 minutes',
    },
    summary: {
      es: 'El repo de laboratorio que se usa el resto de la serie: modelo local, herramienta de evals, Playwright y manejo de secretos.',
      en: 'The lab repo used for the rest of the series: local model, eval tool, Playwright and secrets handling.',
    },
    pitfall: {
      es: 'Los asistentes sugieren flags y versiones viejas. Un comando no corrido es una hipótesis.',
      en: "Assistants suggest outdated flags and versions. A command you haven't run is a hypothesis.",
    },
    requirements: {
      es: [
        'Node.js 22+ y Python 3.10+.',
        'Git.',
        'Ollama, para correr un modelo local sin costo.',
        'Opcional: API key de un proveedor.',
      ],
      en: [
        'Node.js 22+ and Python 3.10+.',
        'Git.',
        'Ollama, to run a local model at no cost.',
        'Optional: a provider API key.',
      ],
    },
    steps: {
      es: [
        'Verificá versiones de Node, Python y Git. Si Node es menor a 22, actualizá primero.',
        'Instalá Ollama, bajá `llama3.2` y probá que responde. Con esto tenés un modelo gratis y sin mandar datos afuera.',
        'Creá el repo `qa-ai-lab` con las carpetas `evals`, `tests`, `data` y `prompts`.',
        'Instalá promptfoo y Playwright como dependencias de desarrollo, así las versiones viajan con el repo.',
        'Secretos: las API keys van en `.env`, y `.env` va en `.gitignore` antes del primer commit.',
        'Corré el smoke eval. Si ves un caso en verde en la tabla y en el visor web, el laboratorio está listo.',
      ],
      en: [
        'Check Node, Python and Git versions. If Node is below 22, upgrade first.',
        'Install Ollama, pull `llama3.2` and confirm it replies. You now have a free model with no data leaving your machine.',
        'Create the `qa-ai-lab` repo with `evals`, `tests`, `data` and `prompts` folders.',
        'Install promptfoo and Playwright as dev dependencies so versions travel with the repo.',
        'Secrets: API keys go in `.env`, and `.env` goes in `.gitignore` before the first commit.',
        'Run the smoke eval. One green case in the table and in the web viewer means the lab is ready.',
      ],
    },
    snippets: [
      {
        code: 'node -v && python3 --version && git --version\nollama pull llama3.2\nollama run llama3.2 "Reply with OK"\n\nmkdir qa-ai-lab && cd qa-ai-lab && git init\nnpm init -y\nnpm i -D promptfoo @playwright/test\nnpx playwright install chromium\nmkdir evals tests data prompts\nprintf ".env\\nnode_modules\\n" > .gitignore',
        lang: 'bash',
        caption: {
          es: 'Setup del laboratorio',
          en: 'Lab setup',
        },
      },
      {
        code: 'description: lab smoke test\nprompts:\n  - "Answer briefly: what is the capital of {{country}}?"\nproviders:\n  - ollama:chat:llama3.2\ntests:\n  - vars: { country: Argentina }\n    assert:\n      - type: icontains\n        value: Buenos Aires',
        lang: 'yaml',
        caption: {
          es: 'evals/smoke.yaml',
          en: 'evals/smoke.yaml',
        },
      },
      {
        code: 'npx promptfoo eval -c evals/smoke.yaml\nnpx promptfoo view',
        lang: 'bash',
      },
    ],
    intro: {
      es: [
        'La mayoría de los tutoriales de IA aplicada a testing asumen que ya tenés un entorno funcionando, una API key con crédito y tiempo para pelear con versiones. En la práctica, ese arranque es donde mucha gente abandona. Esta guía resuelve el punto de partida: un repositorio chico, reproducible y gratuito, que vas a reutilizar en todos los días que siguen.',
        'La decisión central es trabajar con un modelo local. No es el más capaz, pero tiene tres ventajas para aprender: no cuesta nada, ningún dato sale de tu máquina y sus errores son frecuentes, lo cual es ideal para practicar cómo medirlos. Cuando necesites más calidad, cambiar a un modelo en la nube es una línea de configuración.',
      ],
      en: [
        'Most tutorials on AI applied to testing assume you already have a working environment, an API key with credit and time to wrestle with versions. In practice, that start is where many people give up. This guide solves the starting point: a small, reproducible, free repository you will reuse on every day that follows.',
        "The central decision is to work with a local model. It isn't the most capable, but it has three advantages for learning: it costs nothing, no data leaves your machine and its errors are frequent, which is ideal for practicing how to measure them. When you need more quality, switching to a cloud model is one configuration line.",
      ],
    },
    details: {
      es: [
        {
          title: 'Versiones primero',
          body: [
            'Corré los tres comandos de versión antes de instalar nada. Las herramientas de evals y los agentes de código piden versiones recientes de Node, y buena parte de los errores raros de instalación vienen de un Node viejo. Si usás un gestor de versiones, fijá la versión en un archivo como `.nvmrc` para que cualquiera que clone el repo use la misma. Python lo vas a necesitar más adelante para evals de RAG y para medir performance, así que conviene dejarlo verificado desde ahora.',
          ],
        },
        {
          title: 'Un modelo local',
          body: [
            'Ollama corre modelos en tu máquina y expone una API compatible con la de OpenAI en el puerto 11434. Eso significa que casi cualquier herramienta que sepa hablar con un proveedor en la nube puede hablar con tu modelo local cambiando la URL. Un modelo chico alcanza para empezar y corre sin placa de video dedicada, más lento. Probá que responda desde la terminal antes de seguir: si ese paso falla, todo lo demás va a fallar con errores menos claros.',
          ],
        },
        {
          title: 'Estructura del repo',
          body: [
            'Cuatro carpetas con un propósito cada una. En `evals` van las configuraciones de evaluación. En `tests`, los tests de Playwright. En `data`, los datasets y los schemas. En `prompts`, las plantillas de prompt como archivos de texto. Separar los prompts del código tiene una razón práctica: se pueden versionar, comparar entre versiones y revisar en un pull request igual que cualquier otro cambio. Un prompt embebido en un string dentro del código no se revisa nunca.',
          ],
        },
        {
          title: 'Dependencias de desarrollo',
          body: [
            'Instalá promptfoo y Playwright como dependencias de desarrollo del proyecto, no de forma global. Así las versiones quedan registradas en el lockfile y dos personas con el mismo repo obtienen el mismo resultado. Con herramientas que cambian cada pocas semanas, una instalación global distinta en cada máquina es una fuente constante de diferencias inexplicables. Instalá solo Chromium por ahora: para lo que sigue no hacen falta los otros navegadores y la descarga es bastante más liviana.',
          ],
        },
        {
          title: 'Secretos fuera del repo',
          body: [
            'Aunque hoy trabajes solo con un modelo local, dejá resuelto el manejo de secretos antes del primer commit. Las API keys van en un archivo `.env` que está en `.gitignore`. Subí en cambio un `.env.example` con los nombres de las variables y sin valores, para documentar qué hace falta. Una key que llega a un repositorio, aunque sea privado, hay que darla por comprometida y rotarla; prevenirlo cuesta una línea.',
          ],
        },
        {
          title: 'El smoke eval',
          body: [
            'El archivo de ejemplo tiene un prompt con una variable, un provider local y un test con un assert que no depende de mayúsculas. Correrlo verifica toda la cadena: la herramienta instalada, el modelo respondiendo y el assert evaluando. El visor web muestra cada caso con su entrada, su salida y el resultado. Dejalo como primer paso de cualquier sesión de trabajo: si el smoke eval falla, el problema es de entorno y no de lo que estés probando.',
          ],
        },
      ],
      en: [
        {
          title: 'Versions first',
          body: [
            "Run the three version commands before installing anything. Eval tools and coding agents ask for recent Node versions, and a good share of odd install errors come from an old Node. If you use a version manager, pin the version in a file such as `.nvmrc` so anyone cloning the repo uses the same one. You will need Python later for RAG evals and for measuring performance, so it's worth verifying now.",
          ],
        },
        {
          title: 'A local model',
          body: [
            'Ollama runs models on your machine and exposes an OpenAI-compatible API on port 11434. That means almost any tool that can talk to a cloud provider can talk to your local model by changing the URL. A small model is enough to start and runs without a dedicated graphics card, only slower. Confirm it replies from the terminal before moving on: if that step fails, everything else will fail with less clear errors.',
          ],
        },
        {
          title: 'Repo structure',
          body: [
            'Four folders with one purpose each. `evals` holds evaluation configs. `tests`, the Playwright tests. `data`, datasets and schemas. `prompts`, prompt templates as text files. Keeping prompts apart from code has a practical reason: they can be versioned, compared across versions and reviewed in a pull request like any other change. A prompt embedded in a string inside code never gets reviewed.',
          ],
        },
        {
          title: 'Development dependencies',
          body: [
            "Install promptfoo and Playwright as project dev dependencies, not globally. That way versions are recorded in the lockfile and two people with the same repo get the same result. With tools that change every few weeks, a different global install on each machine is a constant source of unexplained differences. Install only Chromium for now: what follows doesn't need the other browsers and the download is much lighter.",
          ],
        },
        {
          title: 'Secrets out of the repo',
          body: [
            'Even if today you only work with a local model, settle secrets handling before the first commit. API keys go in a `.env` file listed in `.gitignore`. Commit a `.env.example` instead, with variable names and no values, to document what is needed. A key that reaches a repository, even a private one, must be considered compromised and rotated; preventing it costs one line.',
          ],
        },
        {
          title: 'The smoke eval',
          body: [
            'The sample file has a prompt with one variable, a local provider and a test with a case-insensitive assert. Running it verifies the whole chain: the tool installed, the model answering and the assert evaluating. The web viewer shows each case with its input, output and result. Keep it as the first step of any work session: if the smoke eval fails, the problem is the environment and not whatever you are testing.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Una tester sigue los pasos en una notebook de trabajo sin placa de video. Node estaba en la versión 18 y la instalación de promptfoo mostraba advertencias; actualiza a la 22 y desaparecen. Baja el modelo local y la primera respuesta tarda varios segundos, lo cual es esperable en esa máquina. Crea el repo, agrega `.env` al `.gitignore` y corre el smoke eval: un caso en verde. Después agrega un segundo test con otro país y lo corre de nuevo. En media hora tiene un entorno que puede clonar en otra máquina y obtener el mismo resultado.',
      ],
      en: [
        'A tester follows the steps on a work laptop with no graphics card. Node was on version 18 and the promptfoo install showed warnings; she upgrades to 22 and they disappear. She pulls the local model and the first reply takes several seconds, which is expected on that machine. She creates the repo, adds `.env` to `.gitignore` and runs the smoke eval: one green case. Then she adds a second test with another country and runs it again. In half an hour she has an environment she can clone on another machine and get the same result.',
      ],
    },
    mistakes: {
      es: [
        'Instalar las herramientas de forma global y perder el control de versiones.',
        'Hacer el primer commit antes de agregar `.env` al `.gitignore`.',
        'Saltear la prueba del modelo en la terminal y depurar después errores confusos.',
        'Dejar los prompts como strings dentro del código.',
      ],
      en: [
        'Installing tools globally and losing control of versions.',
        'Making the first commit before adding `.env` to `.gitignore`.',
        'Skipping the terminal check of the model and debugging confusing errors later.',
        'Leaving prompts as strings inside code.',
      ],
    },
    checklist: {
      es: [
        'Node 22 o superior, Python y Git verificados.',
        'El modelo local responde desde la terminal.',
        'El repo tiene las cuatro carpetas y `.env` ignorado.',
        'El smoke eval muestra dos casos en verde en el visor.',
      ],
      en: [
        'Node 22 or later, Python and Git verified.',
        'The local model replies from the terminal.',
        'The repo has the four folders and `.env` ignored.',
        'The smoke eval shows two green cases in the viewer.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Puedo hacer la serie sin placa de video?',
          a: 'Sí. Un modelo chico corre en CPU, más lento: las respuestas tardan segundos en lugar de décimas. Para aprender alcanza. Si tu máquina tiene poca memoria, usá un modelo todavía más chico o un proveedor en la nube con un límite de gasto bajo.',
        },
        {
          q: '¿Y si en mi empresa no puedo instalar Ollama?',
          a: 'Usá el proveedor que tu empresa ya tenga aprobado y cambiá solo la línea del provider en la configuración. Todo lo demás del repo queda igual. Consultá antes qué datos está permitido enviar: para estos ejercicios no hace falta ningún dato real.',
        },
        {
          q: '¿Por qué promptfoo y Playwright y no otras herramientas?',
          a: 'Porque son de código abierto, corren en local y se integran fácil en CI. Los conceptos de la serie no dependen de ellas: dataset, scorers, umbral y gate existen igual en otras herramientas, y vas a poder trasladar lo aprendido.',
        },
        {
          q: '¿Conviene usar un contenedor para el laboratorio?',
          a: 'Para empezar no hace falta. Cuando lo lleves a CI sí, y lo vemos en el día de infraestructura. Por ahora alcanza con fijar versiones en el lockfile y en `.nvmrc`.',
        },
      ],
      en: [
        {
          q: 'Can I follow the series without a graphics card?',
          a: "Yes. A small model runs on CPU, only slower: replies take seconds instead of tenths of a second. That's enough for learning. If your machine is short on memory, use an even smaller model or a cloud provider with a low spending limit.",
        },
        {
          q: "What if I can't install Ollama at my company?",
          a: 'Use the provider your company has already approved and change only the provider line in the config. Everything else in the repo stays the same. Ask first which data you are allowed to send: these exercises need no real data at all.',
        },
        {
          q: 'Why promptfoo and Playwright and not other tools?',
          a: "Because they are open source, run locally and integrate easily into CI. The concepts in the series don't depend on them: dataset, scorers, threshold and gate exist just the same in other tools, and you'll be able to carry over what you learn.",
        },
        {
          q: 'Should I use a container for the lab?',
          a: 'Not to begin with. When you take it to CI you will, and we cover that on the infrastructure day. For now, pinning versions in the lockfile and in `.nvmrc` is enough. If two people on the team get different results from the same repo, compare Node and tool versions first: that explains most differences.',
        },
      ],
    },
    slug: 'qa-ai-04-ai-qa-lab-setup',
    minutes: 7,
    tags: ['Setup', 'promptfoo', 'Playwright', 'Ollama'],
    diagram:
      'qa-ai-lab/\n   ├─ evals/     promptfoo configs ──▶ local model (Ollama)\n   │                              └─▶ cloud model (optional, key in .env)\n   ├─ tests/     Playwright\n   ├─ data/      datasets\n   └─ prompts/   versioned prompt templates',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d04-light.webp',
      dark: '/publications/qa-ai/diagrams/d04-dark.webp',
      width: 1376,
      height: 782,
    },
    cover: {
      es: '/publications/qa-ai/covers/d04-es.jpg',
      en: '/publications/qa-ai/covers/d04-en.jpg',
    },
    keywords: {
      es: 'Versiones primero · Un modelo local · Estructura del repo · Dependencias de desarrollo · Secretos fuera del repo · El smoke eval',
      en: 'Versions first · A local model · Repo structure · Development dependencies · Secrets out of the repo · The smoke eval',
    },
  },
  {
    day: 5,
    title: {
      es: 'Casos de prueba desde user stories: el prompt que sí funciona',
      en: 'Test cases from user stories: the prompt that actually works',
    },
    summary: {
      es: 'Una plantilla de prompt versionada que genera casos por técnica de diseño y te dice qué no cubrió.',
      en: "A versioned prompt template that generates cases by design technique and tells you what it didn't cover.",
    },
    pitfall: {
      es: 'Asigna riesgo alto a casi todo. Priorizar es una decisión de negocio, no de redacción.',
      en: 'It assigns high risk to almost everything. Prioritizing is a business decision, not a writing task.',
    },
    requirements: {
      es: [
        'El repo `qa-ai-lab` del día 4.',
        'Una user story con criterios de aceptación.',
        'Las reglas de negocio escritas, aunque sean cinco líneas.',
      ],
      en: [
        'The `qa-ai-lab` repo from day 4.',
        'A user story with acceptance criteria.',
        'Business rules in writing, even five lines.',
      ],
    },
    steps: {
      es: [
        'Escribí las reglas de negocio primero. Son la fuente de verdad; sin eso el modelo las inventa.',
        'Guardá la plantilla en `prompts/test-design.md`. Funciona igual si la traducís al español.',
        '**Paso 1**: pedí solo ambigüedades y preguntas. Respondelas vos o el PO antes de seguir.',
        '**Paso 2**: pedí casos por técnica (particiones, bordes, tabla de decisión, estados de error) en tabla con riesgo.',
        '**Paso 3**: pedí la lista de lo no cubierto. Es la parte más útil para tu revisión.',
        'Revisá con tres preguntas: ¿hay casos duplicados?, ¿alguna regla inventada?, ¿faltan negativos? Lo que sobreviva va al gestor de casos.',
      ],
      en: [
        'Write the business rules first. They are the source of truth; without them the model invents some.',
        'Save the template in `prompts/test-design.md`.',
        '**Step 1**: ask only for ambiguities and questions. You or the PO answer them before moving on.',
        '**Step 2**: ask for cases by technique (partitions, boundaries, decision table, error states) in a table with risk.',
        "**Step 3**: ask for the not-covered list. It's the most useful part for your review.",
        'Review with three questions: any duplicates? any invented rule? any missing negatives? Whatever survives goes to your test management tool.',
      ],
    },
    snippets: [
      {
        code: 'Role: senior QA engineer. Source of truth: the BUSINESS RULES below. Do not invent rules.\n\nBUSINESS RULES:\n{{rules}}\n\nUSER STORY:\n{{story}}\n\nStep 1: list ambiguities and questions for the PO. Stop and wait.\nStep 2 (after answers): design test cases using equivalence partitioning,\nboundary values, decision table and error states.\nOutput a table: ID | Technique | Precondition | Steps | Expected | Risk (H/M/L).\nStep 3: list what you did NOT cover and why.',
        lang: 'text',
        caption: {
          es: 'prompts/test-design.md',
          en: 'prompts/test-design.md',
        },
      },
    ],
    intro: {
      es: [
        'Pedirle a un modelo "generame casos de prueba para esta historia" devuelve siempre lo mismo: una lista larga, pareja, con casos repetidos y dos o tres reglas que nadie definió. No es un problema de capacidad del modelo. Es que el pedido no le dice contra qué reglas trabajar, qué técnica usar ni cuándo detenerse.',
        'Esta guía reemplaza ese pedido por un flujo de tres pasos que imita cómo trabaja un buen analista: primero pregunta, después diseña con técnica y al final declara qué dejó afuera. El resultado no es una lista más larga sino una más corta y defendible, donde cada caso tiene un motivo y vos sabés qué huecos quedan.',
      ],
      en: [
        'Asking a model to "generate test cases for this story" always returns the same thing: a long, even list with repeated cases and two or three rules nobody defined. It isn\'t a model capability problem. The request doesn\'t say which rules to work against, which technique to use or when to stop.',
        "This guide replaces that request with a three-step flow that mirrors how a good analyst works: ask first, then design with technique and finally declare what was left out. The result isn't a longer list but a shorter, defensible one, where each case has a reason and you know which gaps remain.",
      ],
    },
    details: {
      es: [
        {
          title: 'Reglas de negocio como fuente de verdad',
          body: [
            'Antes de abrir el chat, escribí las reglas que gobiernan la funcionalidad, aunque sean cinco líneas: límites, estados posibles, quién puede hacer qué. Si no existen por escrito, ese es tu primer hallazgo y vale más que cualquier caso. En el prompt, decí de forma explícita que esas reglas son la única fuente de verdad y que no debe inventar otras. Sin esa frase el modelo completa los huecos con lo que es habitual en otros sistemas, no en el tuyo.',
          ],
        },
        {
          title: 'La plantilla en el repo',
          body: [
            'Guardá el prompt como archivo con variables para las reglas y la historia. Tenerlo versionado permite mejorarlo de a poco: cada vez que el resultado falla de una forma nueva, agregás una instrucción y queda para todo el equipo. También vuelve comparable el trabajo entre personas, porque todos parten del mismo pedido. Funciona igual en español; lo que importa es que las tres etapas estén separadas y que la primera termine con una orden de esperar.',
          ],
        },
        {
          title: 'Paso uno: preguntas',
          body: [
            'Esta etapa es la que más valor entrega y la que casi todos saltean. Pedí ambigüedades, contradicciones entre criterios y datos faltantes, y nada más. Llevá las preguntas reales al product owner antes de seguir. Cada ambigüedad resuelta acá es un defecto que no llega a escribirse. Si el modelo no encuentra ninguna pregunta en una historia que vos sabés incompleta, es una señal de que le falta contexto y de que los casos que genere después van a ser superficiales.',
          ],
        },
        {
          title: 'Paso dos: casos por técnica',
          body: [
            'Con las respuestas en mano, pedí casos nombrando las técnicas: particiones de equivalencia, valores de borde, tabla de decisión y estados de error. Exigí una tabla con la técnica de cada caso. Eso te permite ver de un vistazo si falta alguna: una tabla sin bordes o sin estados de error está incompleta. También reduce los duplicados, porque dos casos de la misma partición saltan a la vista cuando están etiquetados.',
          ],
        },
        {
          title: 'Paso tres: lo que no cubrió',
          body: [
            'Pedí una lista de lo que quedó afuera y por qué. Suelen aparecer concurrencia, accesibilidad, performance, permisos y migración de datos existentes. No es un defecto del resultado: es información para decidir. Algunas cosas las vas a cubrir con otro tipo de prueba y otras las vas a aceptar como riesgo, pero la decisión queda explícita. Esta lista es además el mejor insumo para la conversación con el equipo sobre qué se prueba y qué no.',
          ],
        },
        {
          title: 'La revisión con tres preguntas',
          body: [
            'Revisá la tabla buscando tres cosas. Duplicados: casos que ejercitan la misma partición con otro valor. Reglas inventadas: cualquier resultado esperado que no puedas rastrear a una regla escrita. Negativos faltantes: entradas inválidas, permisos insuficientes, estados imposibles. Es normal descartar un tercio. La prioridad también la ponés vos, porque el modelo tiende a marcar todo como riesgo alto. Lo que sobrevive pasa a tu gestor de casos con tu nombre.',
          ],
        },
      ],
      en: [
        {
          title: 'Business rules as the source of truth',
          body: [
            "Before opening the chat, write the rules governing the feature, even if it's five lines: limits, possible states, who can do what. If they don't exist in writing, that's your first finding and it's worth more than any case. In the prompt, say explicitly that those rules are the only source of truth and that it must not invent others. Without that sentence the model fills gaps with what's common in other systems, not yours.",
          ],
        },
        {
          title: 'The template in the repo',
          body: [
            'Save the prompt as a file with variables for the rules and the story. Having it versioned lets you improve it gradually: every time the result fails in a new way, you add an instruction and the whole team gets it. It also makes work comparable across people, because everyone starts from the same request. It works the same in Spanish; what matters is that the three stages are separate and the first one ends with an order to wait.',
          ],
        },
        {
          title: 'Step one: questions',
          body: [
            'This stage delivers the most value and almost everyone skips it. Ask for ambiguities, contradictions between criteria and missing data, and nothing else. Take the real questions to the product owner before continuing. Every ambiguity resolved here is a defect that never gets written. If the model finds no questions in a story you know is incomplete, that signals missing context, and the cases it generates afterwards will be shallow.',
          ],
        },
        {
          title: 'Step two: cases by technique',
          body: [
            'With answers in hand, ask for cases naming the techniques: equivalence partitioning, boundary values, decision table and error states. Require a table with the technique for each case. That lets you see at a glance whether one is missing: a table with no boundaries or no error states is incomplete. It also reduces duplicates, because two cases from the same partition stand out when labeled.',
          ],
        },
        {
          title: "Step three: what it didn't cover",
          body: [
            "Ask for a list of what was left out and why. Concurrency, accessibility, performance, permissions and migration of existing data usually show up. That isn't a flaw in the result: it's information for deciding. Some things you'll cover with another kind of test and others you'll accept as risk, but the decision becomes explicit. This list is also the best input for the team conversation about what gets tested and what doesn't.",
          ],
        },
        {
          title: 'The three-question review',
          body: [
            "Review the table looking for three things. Duplicates: cases exercising the same partition with another value. Invented rules: any expected result you can't trace to a written rule. Missing negatives: invalid inputs, insufficient permissions, impossible states. Discarding a third is normal. Priority is yours to set as well, because the model tends to mark everything as high risk. What survives goes into your test management tool under your name.",
          ],
        },
      ],
    },
    example: {
      es: [
        'La historia dice: "como cliente quiero transferir dinero a otra cuenta". Las reglas escritas son cuatro: monto mínimo, tope diario, cuenta destino activa y saldo suficiente. En el paso uno el modelo pregunta qué pasa si el tope diario se alcanza a mitad de una transferencia programada y si el tope es por cliente o por cuenta; nadie lo había definido. En el paso dos devuelve veintidós casos etiquetados. En la revisión se descartan cinco duplicados de la partición "monto válido" y dos que asumían una comisión inexistente. Quedan quince. El paso tres declara que no cubrió concurrencia entre dos sesiones, y el equipo decide probarlo aparte.',
      ],
      en: [
        'The story says: "as a customer I want to transfer money to another account". There are four written rules: minimum amount, daily cap, active destination account and sufficient balance. In step one the model asks what happens if the daily cap is reached in the middle of a scheduled transfer and whether the cap is per customer or per account; nobody had defined it. In step two it returns twenty-two labeled cases. In review, five duplicates from the "valid amount" partition and two assuming a nonexistent fee are discarded. Fifteen remain. Step three declares it didn\'t cover concurrency between two sessions, and the team decides to test that separately.',
      ],
    },
    mistakes: {
      es: [
        'Pedir casos sin pasar las reglas de negocio.',
        'Juntar los tres pasos en un solo pedido y perder la etapa de preguntas.',
        'Cargar los casos al gestor sin revisar duplicados ni reglas inventadas.',
        'Aceptar la prioridad que asigna el modelo.',
      ],
      en: [
        'Asking for cases without passing the business rules.',
        'Merging the three steps into one request and losing the questions stage.',
        'Loading cases into the tool without checking duplicates or invented rules.',
        'Accepting the priority the model assigns.',
      ],
    },
    checklist: {
      es: [
        'La plantilla está versionada en `prompts/`.',
        'Al menos una ambigüedad real llegó al product owner.',
        'Cada caso final tiene técnica y se rastrea a una regla escrita.',
        'Hay una lista de descartes con el motivo de cada uno.',
      ],
      en: [
        'The template is versioned under `prompts/`.',
        'At least one real ambiguity reached the product owner.',
        'Each final case has a technique and traces to a written rule.',
        'There is a discard list with the reason for each.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Esto reemplaza al analista de pruebas?',
          a: 'No. Reemplaza la parte de redactar la primera versión. Las preguntas correctas al product owner, la priorización y la decisión de qué descartar siguen siendo trabajo de una persona que conoce el negocio. Sin esa revisión, el resultado es una lista larga sin dueño.',
        },
        {
          q: '¿Sirve con historias mal escritas?',
          a: 'Sirve sobre todo ahí, pero solo el paso uno. Con una historia pobre, el modelo devuelve muchas preguntas, y eso es justamente lo que necesitás llevar al refinamiento. No pases al paso dos hasta tener respuestas: generar casos sobre supuestos multiplica el error.',
        },
        {
          q: '¿Cómo evito pegar información sensible en el prompt?',
          a: 'Describí las reglas sin datos reales de clientes y usá un proveedor aprobado por tu empresa o un modelo local. Las reglas de negocio suelen poder compartirse dentro de las herramientas aprobadas; los datos de personas, no.',
        },
      ],
      en: [
        {
          q: 'Does this replace the test analyst?',
          a: 'No. It replaces the part of drafting the first version. The right questions to the product owner, prioritization and the decision about what to discard remain the work of a person who knows the business. Without that review, the result is a long list nobody owns.',
        },
        {
          q: 'Does it work with badly written stories?',
          a: "It works especially there, but only step one. With a poor story the model returns many questions, and that is exactly what you need to bring to refinement. Don't move to step two until you have answers: generating cases on top of assumptions multiplies the error.",
        },
        {
          q: 'How do I avoid pasting sensitive information into the prompt?',
          a: "Describe the rules without real customer data and use a provider approved by your company or a local model. Business rules can usually be shared within approved tools; people's data cannot. If in doubt, ask your security team before the first prompt, not after, and write the answer down next to the template so the whole team follows the same rule.",
        },
      ],
    },
    slug: 'qa-ai-05-test-cases-from-user-stories',
    minutes: 6,
    tags: ['Test Design', 'Prompting', 'QA'],
    diagram:
      'QA  ──▶ LLM   rules + user story\nQA  ◀── LLM   ambiguities and questions\nQA  ──▶ LLM   answers\nQA  ◀── LLM   cases by technique (table)\nQA  ◀── LLM   what was NOT covered\nQA            review: duplicates · invented rules · missing negatives',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d05-light.webp',
      dark: '/publications/qa-ai/diagrams/d05-dark.webp',
      width: 1022,
      height: 710,
    },
    cover: {
      es: '/publications/qa-ai/covers/d05-es.jpg',
      en: '/publications/qa-ai/covers/d05-en.jpg',
    },
    keywords: {
      es: 'Reglas de negocio como fuente de verdad · La plantilla en el repo · Paso uno: preguntas · Paso dos: casos por técnica · Paso tres: lo que no cubrió · La revisión con tres preguntas',
      en: "Business rules as the source of truth · The template in the repo · Step one: questions · Step two: cases by technique · Step three: what it didn't cover · The three-question review",
    },
  },
  {
    day: 6,
    title: {
      es: 'Datos de prueba sintéticos con LLM: realistas, válidos y sin PII',
      en: 'Synthetic test data with LLMs: realistic, valid and PII-free',
    },
    summary: {
      es: 'Un dataset de prueba que combina Faker para volumen y un LLM para casos borde, validado contra un schema y sin datos de producción.',
      en: 'A test dataset combining Faker for volume and an LLM for edge cases, validated against a schema and with no production data.',
    },
    pitfall: {
      es: 'Devuelve JSON que parece válido y no lo es (fechas, formatos). Sin validación automática, esos errores llegan a tus tests.',
      en: "It returns JSON that looks valid and isn't (dates, formats). Without automatic validation, those errors reach your tests.",
    },
    requirements: {
      es: ['El repo `qa-ai-lab`.', 'Un modelo local con Ollama.'],
      en: ['The `qa-ai-lab` repo.', 'A local model with Ollama.'],
    },
    steps: {
      es: [
        'Definí el schema primero. Es la fuente de verdad de qué es un dato válido.',
        'Usá Faker con seed fija para el volumen: es rápido, gratis y reproducible.',
        'Usá el LLM para lo que Faker no da: casos borde realistas (apellidos con apóstrofo, nombres con ñ y tildes, emails con subdominios, notas con emojis o comillas).',
        'Pedile al modelo salida en JSON y validá cada fila contra el schema. Lo que no valida se descarta y se cuenta.',
        'Nunca pegues datos de producción en el prompt. Describí la forma del dato, no el dato.',
        'Versioná en `data/` el seed, el prompt y el dataset final. Un dataset que no se puede regenerar es deuda.',
      ],
      en: [
        "Define the schema first. It's the source of truth for what valid data is.",
        'Use Faker with a fixed seed for volume: fast, free and reproducible.',
        "Use the LLM for what Faker can't give: realistic edge cases (apostrophes in surnames, accented names, emails with subdomains, notes with emojis or quotes).",
        'Ask the model for JSON output and validate every row against the schema. Whatever fails gets discarded and counted.',
        'Never paste production data into the prompt. Describe the shape of the data, not the data.',
        "Version the seed, the prompt and the final dataset in `data/`. A dataset you can't regenerate is debt.",
      ],
    },
    snippets: [
      {
        code: 'npm i -D @faker-js/faker zod tsx',
        lang: 'bash',
      },
      {
        code: 'import { z } from "zod";\n\nexport const Customer = z.object({\n  name: z.string().min(1).max(80),\n  email: z.string().email(),\n  birthDate: z.string().date(),\n  notes: z.string().max(280),\n});',
        lang: 'ts',
        caption: {
          es: 'data/customer.schema.ts',
          en: 'data/customer.schema.ts',
        },
      },
      {
        code: 'import { faker } from "@faker-js/faker";\nimport { Customer } from "./customer.schema";\n\nfaker.seed(42);\nconst rows = Array.from({ length: 100 }, () => ({\n  name: faker.person.fullName(),\n  email: faker.internet.email(),\n  birthDate: faker.date.birthdate().toISOString().slice(0, 10),\n  notes: faker.lorem.sentence(),\n}));\nconsole.log(rows.filter((r) => Customer.safeParse(r).success).length, "valid rows");',
        lang: 'ts',
        caption: {
          es: 'data/generate.ts',
          en: 'data/generate.ts',
        },
      },
    ],
    intro: {
      es: [
        'Los datos de prueba son uno de los cuellos de botella más viejos de QA. O usás una copia de producción, con todo el riesgo legal que implica, o usás datos tan prolijos que nunca disparan un bug: nombres sin acentos, direcciones perfectas, montos redondos. Los defectos reales aparecen con el apellido que tiene apóstrofo, el mail con subdominio o la nota que alguien completó con un emoji.',
        'Un LLM es bueno justamente para eso: producir variedad realista. Pero también produce filas inválidas con mucha seguridad. Esta guía combina tres piezas para quedarse con lo mejor de cada una: un schema que define qué es válido, Faker para el volumen y el modelo solo para los casos raros, con validación automática de cada fila.',
      ],
      en: [
        'Test data is one of the oldest bottlenecks in QA. Either you use a copy of production, with all the legal risk that implies, or you use data so tidy it never triggers a bug: names without accents, perfect addresses, round amounts. Real defects show up with the surname that has an apostrophe, the email with a subdomain or the note someone filled in with an emoji.',
        'An LLM is good at exactly that: producing realistic variety. But it also produces invalid rows with great confidence. This guide combines three pieces to keep the best of each: a schema that defines what is valid, Faker for volume and the model only for the odd cases, with automatic validation of every row.',
      ],
    },
    details: {
      es: [
        {
          title: 'El schema manda',
          body: [
            'Escribí el schema antes de generar una sola fila. Es el contrato de tus datos: qué campos existen, de qué tipo son, qué rangos aceptan y cuáles son obligatorios. Con Zod o JSON Schema lo expresás una vez y lo usás en tres lugares: para validar lo que produce Faker, para validar lo que produce el modelo y como documentación para el equipo. Si el schema está flojo, por ejemplo acepta cualquier string como fecha, los datos inválidos pasan de largo y los vas a descubrir en un test que falla por la razón equivocada.',
          ],
        },
        {
          title: 'Faker para el volumen',
          body: [
            'Para las miles de filas "normales" no hace falta un modelo. Faker las genera en milisegundos, sin costo y sin red. Lo importante es fijar la semilla: con la misma semilla obtenés exactamente los mismos datos en tu máquina, en la de tu compañero y en CI. Eso convierte un fallo intermitente en uno reproducible. Elegí además el locale que corresponde a tus usuarios, porque cambia el formato de nombres, teléfonos y direcciones, y esos formatos son parte de lo que querés probar.',
          ],
        },
        {
          title: 'El modelo para los casos raros',
          body: [
            'Pedile al modelo lo que una librería no sabe inventar: variantes creíbles que rompen supuestos. Sé específico en el pedido. En lugar de "generá datos raros", listá las categorías que te interesan: apellidos compuestos y con apóstrofo, nombres de una sola letra, mails con subdominios y signos más, textos libres con comillas, saltos de línea o emojis, fechas en el límite de un rango. Pedí pocas filas por categoría. Diez casos bien pensados valen más que quinientos parecidos, y son más baratos de revisar.',
          ],
        },
        {
          title: 'Validación fila por fila',
          body: [
            'Pedí la salida en JSON y pasá cada fila por el schema antes de aceptarla. Lo que no valida se descarta y se cuenta. Ese contador es una métrica útil: si el modelo falla una de cada cuatro filas, el prompt necesita un ejemplo de formato o el schema tiene una regla que no explicaste. No corrijas a mano las filas inválidas, porque rompe la reproducibilidad. Tampoco confíes en una revisión visual: una fecha como 2026-02-30 se ve perfecta y no existe.',
          ],
        },
        {
          title: 'Producción no entra al prompt',
          body: [
            'La regla es simple y no tiene excepciones: en el prompt va la forma de los datos, nunca los datos. Describí campos, formatos y rarezas que querés ver, sin pegar registros reales ni siquiera "anonimizados a mano", porque esa anonimización casi siempre deja algo identificable. Si necesitás que los datos sintéticos se parezcan estadísticamente a los reales, describí las distribuciones con palabras. Y verificá el resultado: revisá que no aparezcan nombres o documentos que coincidan con personas reales de tu base.',
          ],
        },
        {
          title: 'Semilla, prompt y dataset versionados',
          body: [
            'Guardá en `data/` las tres cosas que permiten regenerar el conjunto: la semilla de Faker, el prompt usado con el modelo y el archivo final ya validado. La parte generada por el modelo no es reproducible bit a bit, por eso se versiona el resultado y no solo la receta. Anotá también el modelo y la fecha. Cuando un test falle dentro de seis meses, vas a poder saber con qué datos corrió, y si hay que ampliar el conjunto vas a partir de algo conocido.',
          ],
        },
      ],
      en: [
        {
          title: 'The schema rules',
          body: [
            "Write the schema before generating a single row. It's the contract for your data: which fields exist, what type they are, which ranges they accept and which are required. With Zod or JSON Schema you express it once and use it in three places: to validate what Faker produces, to validate what the model produces and as documentation for the team. If the schema is loose, for example it accepts any string as a date, invalid data slips through and you'll discover it in a test failing for the wrong reason.",
          ],
        },
        {
          title: 'Faker for volume',
          body: [
            'For the thousands of "normal" rows you don\'t need a model. Faker generates them in milliseconds, at no cost and with no network. What matters is pinning the seed: with the same seed you get exactly the same data on your machine, on your teammate\'s and in CI. That turns an intermittent failure into a reproducible one. Also choose the locale matching your users, because it changes the format of names, phone numbers and addresses, and those formats are part of what you want to test.',
          ],
        },
        {
          title: 'The model for the odd cases',
          body: [
            'Ask the model for what a library can\'t invent: believable variants that break assumptions. Be specific in the request. Instead of "generate weird data", list the categories you care about: compound surnames and ones with apostrophes, single-letter names, emails with subdomains and plus signs, free text with quotes, line breaks or emojis, dates at the edge of a range. Ask for a few rows per category. Ten well-thought-out cases are worth more than five hundred similar ones, and they are cheaper to review.',
          ],
        },
        {
          title: 'Row-by-row validation',
          body: [
            "Ask for JSON output and pass every row through the schema before accepting it. Whatever doesn't validate gets discarded and counted. That counter is a useful metric: if the model fails one row in four, the prompt needs a format example or the schema has a rule you didn't explain. Don't fix invalid rows by hand, because that breaks reproducibility. Don't trust a visual review either: a date such as 2026-02-30 looks perfect and doesn't exist.",
          ],
        },
        {
          title: 'Production stays out of the prompt',
          body: [
            'The rule is simple and has no exceptions: the prompt carries the shape of the data, never the data. Describe fields, formats and oddities you want to see, without pasting real records, not even "hand-anonymized" ones, because that anonymization almost always leaves something identifiable. If you need synthetic data to resemble the real data statistically, describe the distributions in words. And verify the result: check that no names or ID numbers match real people in your database.',
          ],
        },
        {
          title: 'Seed, prompt and dataset versioned',
          body: [
            "Store in `data/` the three things that let you regenerate the set: the Faker seed, the prompt used with the model and the final, already validated file. The part generated by the model isn't reproducible bit for bit, which is why you version the result and not just the recipe. Also note the model and the date. When a test fails six months from now, you'll be able to tell which data it ran with, and if the set needs extending you'll start from something known.",
          ],
        },
      ],
    },
    example: {
      es: [
        "Un equipo prueba un formulario de alta de clientes. Con Faker y semilla fija generan mil clientes válidos en menos de un segundo. Después le piden al modelo veinte casos raros en cinco categorías. De las veinte filas, el schema rechaza cuatro: dos fechas de nacimiento imposibles, un teléfono con letras y un mail sin dominio. Quedan dieciséis. Al correr la suite con esos dieciséis, dos tests fallan: el apellido O'Connor rompe una consulta mal escapada y un nombre con emoji se guarda truncado. Ninguno de los mil registros prolijos había encontrado esos dos defectos.",
      ],
      en: [
        "A team tests a customer sign-up form. With Faker and a fixed seed they generate a thousand valid customers in under a second. Then they ask the model for twenty odd cases across five categories. Of the twenty rows, the schema rejects four: two impossible birth dates, a phone number with letters and an email with no domain. Sixteen remain. Running the suite with those sixteen, two tests fail: the surname O'Connor breaks a badly escaped query and a name with an emoji gets stored truncated. None of the thousand tidy records had found those two defects.",
      ],
    },
    mistakes: {
      es: [
        'Generar todo con el modelo, incluso el volumen que Faker resuelve gratis.',
        'Aceptar las filas por cómo se ven, sin validarlas contra el schema.',
        'Pegar un registro real "como ejemplo de formato".',
        'No guardar el dataset final y no poder repetir una corrida.',
      ],
      en: [
        'Generating everything with the model, even the volume Faker handles for free.',
        'Accepting rows by how they look, without validating them against the schema.',
        'Pasting a real record "as a format example".',
        'Not saving the final dataset and being unable to repeat a run.',
      ],
    },
    checklist: {
      es: [
        'El schema rechaza fechas, mails y rangos inválidos.',
        'Faker corre con semilla fija y da el mismo resultado dos veces.',
        'Cada fila del modelo pasó por el schema y hay un conteo de descartes.',
        'Semilla, prompt, modelo, fecha y dataset están en `data/`.',
      ],
      en: [
        'The schema rejects invalid dates, emails and ranges.',
        'Faker runs with a fixed seed and gives the same result twice.',
        'Every model row went through the schema and there is a discard count.',
        'Seed, prompt, model, date and dataset are in `data/`.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Datos sintéticos alcanzan para pruebas de performance?',
          a: 'Para volumen sí, y ahí Faker es la herramienta correcta. Lo que hay que cuidar es la distribución: si todos los clientes tienen la misma cantidad de pedidos, las consultas se comportan distinto que en producción. Describí esas proporciones y generalas a propósito.',
        },
        {
          q: '¿Cómo sé que no quedó un dato personal real?',
          a: 'No pegando ninguno en el prompt, que es la única garantía de origen. Como control adicional, cruzá los valores sensibles del dataset contra tu base y revisá las coincidencias. Si usás un proveedor en la nube, confirmá además qué política de retención tiene.',
        },
        {
          q: '¿Qué pasa con las relaciones entre tablas?',
          a: 'Generá primero las entidades padre con identificadores estables y después las hijas referenciando esos identificadores. Validá la integridad con un chequeo propio, porque el schema de una fila no ve las relaciones entre archivos.',
        },
      ],
      en: [
        {
          q: 'Is synthetic data enough for performance tests?',
          a: 'For volume, yes, and Faker is the right tool there. What needs care is the distribution: if every customer has the same number of orders, queries behave differently than in production. Describe those proportions and generate them on purpose.',
        },
        {
          q: 'How do I know no real personal data slipped in?',
          a: 'By not pasting any into the prompt, which is the only guarantee at the source. As an extra control, cross-check the sensitive values in the dataset against your database and review any matches. If you use a cloud provider, also confirm its retention policy.',
        },
        {
          q: 'What about relationships between tables?',
          a: "Generate parent entities first with stable identifiers, then the children referencing those identifiers. Validate integrity with a check of your own, because a row-level schema doesn't see relationships across files.",
        },
      ],
    },
    slug: 'qa-ai-06-synthetic-test-data',
    minutes: 7,
    tags: ['Test Data', 'LLM', 'Zod'],
    diagram:
      'Zod schema ─────────────────────────┐\nFaker + seed (volume) ──────────────┤\nLLM (edge cases as JSON) ───────────┴─▶ validate\n                                         ├─ valid   ▶ data/customers.json ▶ tests and evals\n                                         └─ invalid ▶ discard + count',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d06-light.webp',
      dark: '/publications/qa-ai/diagrams/d06-dark.webp',
      width: 1800,
      height: 495,
    },
    cover: {
      es: '/publications/qa-ai/covers/d06-es.jpg',
      en: '/publications/qa-ai/covers/d06-en.jpg',
    },
    keywords: {
      es: 'El schema manda · Faker para el volumen · El modelo para los casos raros · Validación fila por fila · Producción no entra al prompt · Semilla, prompt y dataset versionados',
      en: 'The schema rules · Faker for volume · The model for the odd cases · Row-by-row validation · Production stays out of the prompt · Seed, prompt and dataset versioned',
    },
  },
  {
    day: 7,
    title: {
      es: 'Arneses 101: test harness, eval harness y agent harness',
      en: 'Harnesses 101: test harness, eval harness and agent harness',
    },
    summary: {
      es: 'Los tres arneses que hoy conviven en QA, qué envuelve cada uno y cómo ubicar qué le falta a tu stack.',
      en: 'The three harnesses that coexist in QA today, what each one wraps and how to spot what your stack lacks.',
    },
    pitfall: {
      es: 'Sin un gate externo, el agente reporta éxito sin haber ejecutado. Verificá con el exit code, no con el resumen.',
      en: 'Without an external gate, the agent reports success without having run anything. Verify with the exit code, not the summary.',
    },
    requirements: {
      es: [
        'Conocer tu stack actual de automation.',
        'La lista de abajo para completar con tus herramientas.',
      ],
      en: [
        'Know your current automation stack.',
        'The list below, to fill in with your tools.',
      ],
    },
    steps: {
      es: [
        'Quedate con la definición: un arnés es todo lo que rodea a lo que probás para poder ejecutarlo, controlarlo y medirlo.',
        'Test harness: ya lo tenés. Runner, fixtures, mocks y reportes alrededor de tu aplicación.',
        'Eval harness: lo mismo, pero alrededor de un modelo o un prompt. Cambia el assert por scorers y el caso por un dataset.',
        'Agent harness: el loop que convierte un modelo en un agente, con herramientas, instrucciones, permisos y memoria. Acá el agente hace trabajo de QA.',
        'Relación clave: el agent harness produce tests y cambios; el test harness y el eval harness verifican lo que produjo. Nunca al revés.',
        'Completá la lista con tu stack y marcá el arnés que no tenés. Ese es tu próximo paso.',
      ],
      en: [
        'Keep the definition: a harness is everything around the thing under test that lets you run, control and measure it.',
        'Test harness: you already have it. Runner, fixtures, mocks and reports around your app.',
        'Eval harness: the same idea around a model or prompt. Asserts become scorers and cases become a dataset.',
        'Agent harness: the loop that turns a model into an agent, with tools, instructions, permissions and memory. Here the agent does QA work.',
        'Key relationship: the agent harness produces tests and changes; the test harness and eval harness verify what it produced. Never the other way round.',
        "Fill the list with your stack and flag the harness you lack. That's your next step.",
      ],
    },
    extra: {
      es: {
        title: 'Los tres arneses',
        items: [
          '**Test harness**: envuelve tu aplicación. Runner, fixtures, mocks y reporters. Ejemplos: Playwright Test, JUnit, pytest.',
          '**Eval harness**: envuelve un modelo o un prompt. Dataset, runner, scorers y reporte. Ejemplos: promptfoo, DeepEval, Inspect AI.',
          '**Agent harness**: envuelve un modelo que actúa. Loop, tools, contexto, permisos y memoria. Ejemplos: Claude Code, Copilot agent, Cursor.',
        ],
      },
      en: {
        title: 'The three harnesses',
        items: [
          '**Test harness**: wraps your app. Runner, fixtures, mocks and reporters. Examples: Playwright Test, JUnit, pytest.',
          '**Eval harness**: wraps a model or prompt. Dataset, runner, scorers and report. Examples: promptfoo, DeepEval, Inspect AI.',
          '**Agent harness**: wraps a model that acts. Loop, tools, context, permissions and memory. Examples: Claude Code, Copilot agent, Cursor.',
        ],
      },
    },
    intro: {
      es: [
        'La palabra "harness" aparece en casi todas las conversaciones sobre IA y testing, y casi siempre con un significado distinto. Para algunos es el framework de automatización de siempre. Para otros, la herramienta que evalúa un prompt. Para otros, el programa que convierte un modelo en un agente capaz de editar código. Las tres cosas existen y las tres se llaman igual, y esa confusión hace que los equipos compren o construyan lo que no necesitan.',
        'Esta guía separa los tres significados con una sola definición común y muestra la relación entre ellos. No hay código hoy: el objetivo es que puedas mirar tu propio stack y decir qué harness tenés, cuál te falta y, sobre todo, cuál verifica a cuál.',
      ],
      en: [
        'The word "harness" shows up in almost every conversation about AI and testing, and almost always with a different meaning. For some it\'s the usual automation framework. For others, the tool that evaluates a prompt. For others, the program that turns a model into an agent able to edit code. All three exist and all three share the name, and that confusion makes teams buy or build what they don\'t need.',
        'This guide separates the three meanings with a single common definition and shows how they relate. There is no code today: the goal is for you to look at your own stack and say which harness you have, which one you lack and, above all, which one verifies which.',
      ],
    },
    details: {
      es: [
        {
          title: 'Una sola definición',
          body: [
            'Un harness es todo lo que rodea a la cosa bajo prueba para poder ejecutarla, controlarla y medirla. Ejecutarla significa ponerla en marcha de forma repetible. Controlarla, fijar sus entradas y su entorno. Medirla, obtener un resultado comparable. La definición sirve para los tres tipos; lo único que cambia es qué hay en el centro: tu aplicación, un modelo o un agente. Cuando alguien use la palabra, preguntá qué está en el centro y la conversación se ordena sola.',
          ],
        },
        {
          title: 'Test harness: el que ya tenés',
          body: [
            'Si corrés tests automatizados, ya tenés uno. El runner ejecuta, las fixtures preparan el estado, los mocks aíslan dependencias y los reportes muestran el resultado. Es determinista: la misma entrada da la misma salida y un fallo significa algo. Vale la pena reconocerlo como harness porque es la base de los otros dos. Un equipo con un test harness lento, frágil o que nadie mira va a trasladar esos mismos problemas a todo lo que construya con IA encima.',
          ],
        },
        {
          title: 'Eval harness: lo mismo alrededor de un modelo',
          body: [
            'Acá la cosa bajo prueba es un modelo o un prompt. Las piezas tienen equivalentes directos: los casos de prueba pasan a ser un dataset, los asserts pasan a ser scorers que puntúan una salida, y el reporte muestra tasas de aprobación en lugar de verde o rojo. Se agregan dos cosas que el test harness no necesitaba: repetir cada caso varias veces y registrar costo y latencia. Lo vas a necesitar el día que una funcionalidad de tu producto dependa de un modelo.',
          ],
        },
        {
          title: 'Agent harness: el que trabaja',
          body: [
            'Es el bucle que convierte un modelo en un agente: recibe una tarea, decide qué herramienta usar, lee el resultado y vuelve a decidir, hasta terminar. A su alrededor hay instrucciones del repositorio, herramientas disponibles, permisos y memoria. La diferencia clave con los otros dos es de rol: este no mide, produce. Escribe tests, modifica código, investiga un fallo. Por eso su configuración se parece más a incorporar a un compañero nuevo que a configurar una herramienta.',
          ],
        },
        {
          title: 'Quién verifica a quién',
          body: [
            'La relación es de una sola dirección. El agent harness produce tests y cambios; el test harness y el eval harness verifican lo producido. Si invertís la flecha y dejás que el agente juzgue su propio trabajo, perdés la verificación independiente, que es la razón de ser de QA. En la práctica esto se traduce en una regla concreta: lo que cuenta como terminado es el resultado de un comando que corre fuera del agente, con su código de salida, y no el resumen que el agente escribe.',
          ],
        },
        {
          title: 'Tu stack en la lista',
          body: [
            'Completá la lista de los tres harnesses con nombres propios. Qué runner, qué fixtures y qué reportes usás. Si evaluás algún modelo, con qué dataset y qué scorers. Si usás un agente, qué reglas, herramientas y permisos tiene. Las celdas vacías son información. Si te falta el eval harness y tu producto ya usa un modelo, ese es el próximo paso, y es el tema de mañana. Si te falta el de agentes, puede esperar: es productividad, no verificación.',
          ],
        },
      ],
      en: [
        {
          title: 'A single definition',
          body: [
            "A harness is everything around the thing under test that lets you run, control and measure it. Running it means starting it in a repeatable way. Controlling it, fixing its inputs and its environment. Measuring it, getting a comparable result. The definition works for all three types; the only thing that changes is what sits in the middle: your application, a model or an agent. When someone uses the word, ask what's in the middle and the conversation sorts itself out.",
          ],
        },
        {
          title: 'Test harness: the one you already have',
          body: [
            "If you run automated tests, you already have one. The runner executes, fixtures prepare state, mocks isolate dependencies and reports show the result. It's deterministic: the same input gives the same output and a failure means something. It's worth recognizing as a harness because it's the base for the other two. A team with a slow, brittle test harness that nobody looks at will carry those same problems into everything it builds with AI on top.",
          ],
        },
        {
          title: 'Eval harness: the same around a model',
          body: [
            "Here the thing under test is a model or a prompt. The pieces have direct equivalents: test cases become a dataset, asserts become scorers that grade an output, and the report shows pass rates instead of green or red. Two things are added that the test harness didn't need: repeating each case several times and recording cost and latency. You'll need it the day a feature of your product depends on a model.",
          ],
        },
        {
          title: 'Agent harness: the one that works',
          body: [
            "It's the loop that turns a model into an agent: it receives a task, decides which tool to use, reads the result and decides again, until done. Around it are repository instructions, available tools, permissions and memory. The key difference from the other two is the role: this one doesn't measure, it produces. It writes tests, modifies code, investigates a failure. That's why configuring it feels more like onboarding a new teammate than setting up a tool.",
          ],
        },
        {
          title: 'Who verifies whom',
          body: [
            'The relationship runs in one direction only. The agent harness produces tests and changes; the test harness and the eval harness verify what was produced. If you reverse the arrow and let the agent judge its own work, you lose independent verification, which is the whole point of QA. In practice this becomes a concrete rule: what counts as done is the result of a command running outside the agent, with its exit code, and not the summary the agent writes.',
          ],
        },
        {
          title: 'Your stack on the list',
          body: [
            "Fill in the list of three harnesses with real names. Which runner, fixtures and reports you use. If you evaluate a model, with which dataset and scorers. If you use an agent, which rules, tools and permissions it has. Empty cells are information. If you lack the eval harness and your product already uses a model, that's the next step, and it's tomorrow's topic. If you lack the agent one, it can wait: it's productivity, not verification.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo de producto completa la lista. Test harness: Playwright, fixtures de login, reporte HTML en CI; completo. Eval harness: vacío, aunque el producto tiene un asistente que responde consultas de clientes desde hace tres meses. Agent harness: dos personas usan un agente de código sin reglas compartidas. El diagnóstico es claro. La funcionalidad con más riesgo, el asistente, no tiene ninguna medición, mientras el equipo discutía qué agente adoptar. Deciden armar primero un eval de veinte casos para el asistente y después escribir un archivo de reglas común para los agentes.',
      ],
      en: [
        'A product team fills in the list. Test harness: Playwright, login fixtures, HTML report in CI; complete. Eval harness: empty, even though the product has had an assistant answering customer queries for three months. Agent harness: two people use a coding agent with no shared rules. The diagnosis is clear. The riskiest feature, the assistant, has no measurement at all, while the team was debating which agent to adopt. They decide to build a twenty-case eval for the assistant first and then write a common rules file for the agents.',
      ],
    },
    mistakes: {
      es: [
        'Usar "harness" sin aclarar qué hay en el centro.',
        'Dejar que el agente declare terminado su propio trabajo.',
        'Invertir en un agent harness teniendo un test harness frágil.',
        'Evaluar un modelo con asserts exactos en lugar de un eval harness.',
      ],
      en: [
        'Using "harness" without saying what sits in the middle.',
        'Letting the agent declare its own work done.',
        'Investing in an agent harness while the test harness is brittle.',
        'Evaluating a model with exact asserts instead of an eval harness.',
      ],
    },
    checklist: {
      es: [
        'Podés explicar los tres harnesses con la misma definición.',
        'Tu lista tiene nombres concretos en cada celda o un vacío explícito.',
        'Identificaste cuál te falta y por qué importa.',
        'Tenés escrita la regla de que el gate corre fuera del agente.',
      ],
      en: [
        'You can explain the three harnesses with the same definition.',
        'Your list has concrete names in each cell or an explicit gap.',
        'You identified which one you lack and why it matters.',
        'You have the rule written down that the gate runs outside the agent.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Un framework de automatización es un harness?',
          a: 'Es una parte. El framework aporta el runner y las utilidades; el harness completo incluye además las fixtures, los datos, los mocks, el entorno y los reportes de tu proyecto. Por eso dos equipos con el mismo framework pueden tener harnesses de calidad muy distinta.',
        },
        {
          q: '¿Necesito los tres?',
          a: 'El test harness, siempre. El eval harness, solo si algo de tu producto o de tu proceso depende de la salida de un modelo. El agent harness es opcional: mejora la productividad, pero no agrega verificación por sí mismo.',
        },
        {
          q: '¿Puedo usar el mismo modelo en el agente y en el eval?',
          a: 'Podés, pero conviene que la verificación no dependa solo de él. Las capas deterministas del eval y el test harness clásico son las que dan independencia. Un modelo evaluando su propia salida tiende a aprobarla.',
        },
      ],
      en: [
        {
          q: 'Is an automation framework a harness?',
          a: "It's a part of one. The framework provides the runner and utilities; the full harness also includes your project's fixtures, data, mocks, environment and reports. That's why two teams with the same framework can have harnesses of very different quality.",
        },
        {
          q: 'Do I need all three?',
          a: "The test harness, always. The eval harness, only if something in your product or process depends on a model's output. The agent harness is optional: it improves productivity but adds no verification by itself.",
        },
        {
          q: 'Can I use the same model in the agent and in the eval?',
          a: "You can, but verification shouldn't depend on it alone. The deterministic layers of the eval and the classic test harness are what provide independence. A model grading its own output tends to approve it.",
        },
      ],
    },
    slug: 'qa-ai-07-harnesses-101',
    minutes: 6,
    tags: ['Harness', 'Evals', 'AI Agents'],
    diagram:
      'Agent harness (model + tools + rules + permissions)\n        │ writes tests and code\n        ▼\n      repo\n   ├─▶ Test harness (runner + fixtures + reports) ── pass / fail ──┐\n   └─▶ Eval harness (dataset + scorers + report)  ── pass rate ────┤\n                                                                   ▼\n                                                             quality gate\n                                                                   │ feedback\n                                                                   └──▶ agent',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d07-light.webp',
      dark: '/publications/qa-ai/diagrams/d07-dark.webp',
      width: 1270,
      height: 1108,
    },
    cover: {
      es: '/publications/qa-ai/covers/d07-es.jpg',
      en: '/publications/qa-ai/covers/d07-en.jpg',
    },
    keywords: {
      es: 'Una sola definición · Test harness: el que ya tenés · Eval harness: lo mismo alrededor de un modelo · Agent harness: el que trabaja · Quién verifica a quién · Tu stack en la lista',
      en: 'A single definition · Test harness: the one you already have · Eval harness: the same around a model · Agent harness: the one that works · Who verifies whom · Your stack on the list',
    },
  },
];
