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
    slug: 'qa-ai-01-llms-in-qa-map',
    minutes: 4,
    tags: ['QA', 'LLM', 'AI Testing'],
    diagram:
      'QA task\n  └─ Verifiable? ── no ──▶ do not delegate\n        │ yes\n        ▼\n     Cheap to review? ── no ──▶ do not delegate\n        │ yes\n        ▼\n     Reversible? ── no ──▶ human decides, LLM assists\n        │ yes\n        ▼\n     Delegate to LLM + review ──▶ log hits and misses (your first eval)',
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
    slug: 'qa-ai-02-sdet-role-reshaped-by-ai',
    minutes: 4,
    tags: ['SDET', 'Career', 'AI Testing'],
    diagram:
      'SDET before: writes every test\n        │\n        ▼\nSDET now: designs and validates testing systems\n   ├─ context for agents (rules, skills, specs)\n   ├─ evals for non-deterministic outputs\n   ├─ review of AI-generated tests\n   └─ cost and infrastructure\n\nUnchanged: risk thinking · test design · system knowledge',
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
    slug: 'qa-ai-03-from-asserts-to-evals',
    minutes: 4,
    tags: ['Evals', 'LLM', 'Test Automation'],
    diagram:
      'model output\n   ▼\nLayer 1: format     (deterministic: JSON, fields, length)\n   ▼\nLayer 2: content    (contains / regex on key facts)\n   ▼\nLayer 3: judgment   (rubric graded by a judge model)\n   ▼\nrun N times ──▶ pass rate >= threshold?\n                  ├─ yes ▶ pass\n                  └─ no  ▶ fail + inspect the failed runs',
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
    slug: 'qa-ai-04-ai-qa-lab-setup',
    minutes: 5,
    tags: ['Setup', 'promptfoo', 'Playwright', 'Ollama'],
    diagram:
      'qa-ai-lab/\n   ├─ evals/     promptfoo configs ──▶ local model (Ollama)\n   │                              └─▶ cloud model (optional, key in .env)\n   ├─ tests/     Playwright\n   ├─ data/      datasets\n   └─ prompts/   versioned prompt templates',
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
    slug: 'qa-ai-05-test-cases-from-user-stories',
    minutes: 4,
    tags: ['Test Design', 'Prompting', 'QA'],
    diagram:
      'QA  ──▶ LLM   rules + user story\nQA  ◀── LLM   ambiguities and questions\nQA  ──▶ LLM   answers\nQA  ◀── LLM   cases by technique (table)\nQA  ◀── LLM   what was NOT covered\nQA            review: duplicates · invented rules · missing negatives',
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
    slug: 'qa-ai-06-synthetic-test-data',
    minutes: 5,
    tags: ['Test Data', 'LLM', 'Zod'],
    diagram:
      'Zod schema ─────────────────────────┐\nFaker + seed (volume) ──────────────┤\nLLM (edge cases as JSON) ───────────┴─▶ validate\n                                         ├─ valid   ▶ data/customers.json ▶ tests and evals\n                                         └─ invalid ▶ discard + count',
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
    slug: 'qa-ai-07-harnesses-101',
    minutes: 4,
    tags: ['Harness', 'Evals', 'AI Agents'],
    diagram:
      'Agent harness (model + tools + rules + permissions)\n        │ writes tests and code\n        ▼\n      repo\n   ├─▶ Test harness (runner + fixtures + reports) ── pass / fail ──┐\n   └─▶ Eval harness (dataset + scorers + report)  ── pass rate ────┤\n                                                                   ▼\n                                                             quality gate\n                                                                   │ feedback\n                                                                   └──▶ agent',
  },
];
