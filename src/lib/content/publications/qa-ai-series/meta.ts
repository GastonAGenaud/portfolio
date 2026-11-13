import type { SeriesMeta } from './types';

// Card-level data only, so listings don't have to bundle guide bodies.
export const seriesMeta: SeriesMeta[] = [
  {
    day: 1,
    slug: 'qa-ai-01-llms-in-qa-map',
    minutes: 6,
    tags: ['QA', 'LLM', 'AI Testing'],
    title: {
      es: 'LLMs en QA: el mapa 2026, dónde sirven y dónde no',
      en: "LLMs in QA: the 2026 map, where they help and where they don't",
    },
    summary: {
      es: 'Seis usos de LLM en QA que hoy funcionan, tres que no, y una regla simple para decidir cuándo delegar.',
      en: "Six LLM uses in QA that work today, three that don't, and a simple rule to decide when to delegate.",
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
    slug: 'qa-ai-02-sdet-role-reshaped-by-ai',
    minutes: 6,
    tags: ['SDET', 'Career', 'AI Testing'],
    title: {
      es: 'Cómo se está reorientando el rol SDET en el mundo de la IA',
      en: 'How the SDET role is being reshaped by AI',
    },
    summary: {
      es: 'Qué cambia y qué no en el rol SDET, y cómo armar tu matriz de habilidades para los próximos 30 días.',
      en: "What changes and what doesn't in the SDET role, and how to build your skills matrix for the next 30 days.",
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
    slug: 'qa-ai-03-from-asserts-to-evals',
    minutes: 6,
    tags: ['Evals', 'LLM', 'Test Automation'],
    title: {
      es: 'Las nuevas formas de probar: de asserts a evals',
      en: 'The new ways of testing: from asserts to evals',
    },
    summary: {
      es: 'Cómo convertir un test con assert exacto sobre una salida de IA en un eval de tres capas que no sea frágil.',
      en: "How to turn a test with an exact assert on an AI output into a three-layer eval that isn't brittle.",
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
    slug: 'qa-ai-04-ai-qa-lab-setup',
    minutes: 7,
    tags: ['Setup', 'promptfoo', 'Playwright', 'Ollama'],
    title: {
      es: 'Tu laboratorio de QA con IA: setup completo en 30 minutos',
      en: 'Your AI QA lab: full setup in 30 minutes',
    },
    summary: {
      es: 'El repo de laboratorio que se usa el resto de la serie: modelo local, herramienta de evals, Playwright y manejo de secretos.',
      en: 'The lab repo used for the rest of the series: local model, eval tool, Playwright and secrets handling.',
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
    slug: 'qa-ai-05-test-cases-from-user-stories',
    minutes: 6,
    tags: ['Test Design', 'Prompting', 'QA'],
    title: {
      es: 'Casos de prueba desde user stories: el prompt que sí funciona',
      en: 'Test cases from user stories: the prompt that actually works',
    },
    summary: {
      es: 'Una plantilla de prompt versionada que genera casos por técnica de diseño y te dice qué no cubrió.',
      en: "A versioned prompt template that generates cases by design technique and tells you what it didn't cover.",
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
    slug: 'qa-ai-06-synthetic-test-data',
    minutes: 7,
    tags: ['Test Data', 'LLM', 'Zod'],
    title: {
      es: 'Datos de prueba sintéticos con LLM: realistas, válidos y sin PII',
      en: 'Synthetic test data with LLMs: realistic, valid and PII-free',
    },
    summary: {
      es: 'Un dataset de prueba que combina Faker para volumen y un LLM para casos borde, validado contra un schema y sin datos de producción.',
      en: 'A test dataset combining Faker for volume and an LLM for edge cases, validated against a schema and with no production data.',
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
    slug: 'qa-ai-07-harnesses-101',
    minutes: 6,
    tags: ['Harness', 'Evals', 'AI Agents'],
    title: {
      es: 'Arneses 101: test harness, eval harness y agent harness',
      en: 'Harnesses 101: test harness, eval harness and agent harness',
    },
    summary: {
      es: 'Los tres arneses que hoy conviven en QA, qué envuelve cada uno y cómo ubicar qué le falta a tu stack.',
      en: 'The three harnesses that coexist in QA today, what each one wraps and how to spot what your stack lacks.',
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
  {
    day: 8,
    slug: 'qa-ai-08-first-eval-harness-promptfoo',
    minutes: 7,
    tags: ['Evals', 'promptfoo', 'LLM'],
    title: {
      es: 'Tu primer eval harness con promptfoo',
      en: 'Your first eval harness with promptfoo',
    },
    summary: {
      es: 'Un eval harness real para un clasificador de bugs: prompt versionado, dataset, asserts, corridas repetidas y comparación entre dos modelos.',
      en: 'A real eval harness for a bug classifier: versioned prompt, dataset, asserts, repeated runs and a two-model comparison.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d08-es.jpg',
      en: '/publications/qa-ai/covers/d08-en.jpg',
    },
    keywords: {
      es: 'El prompt como archivo · La configuración mínima · Diez casos etiquetados por vos · Tres corridas por caso · Leer los fallos uno por uno · Un segundo provider',
      en: 'The prompt as a file · The minimal config · Ten cases labeled by you · Three runs per case · Reading failures one by one · A second provider',
    },
  },
  {
    day: 9,
    slug: 'qa-ai-09-agent-harness-for-qa',
    minutes: 7,
    tags: ['AI Agents', 'Playwright', 'MCP'],
    title: {
      es: 'Agent harness para QA: reglas, skills y MCP en tu repo de automation',
      en: 'Agent harness for QA: rules, skills and MCP in your automation repo',
    },
    summary: {
      es: 'Cómo preparar un repo de automation para que cualquier agente de código escriba tests siguiendo tus convenciones, con herramientas y permisos acotados.',
      en: 'How to prepare an automation repo so any coding agent writes tests following your conventions, with scoped tools and permissions.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d09-es.jpg',
      en: '/publications/qa-ai/covers/d09-en.jpg',
    },
    keywords: {
      es: 'Reglas en la raíz del repo · Skills para lo que se repite · Herramientas para ver la aplicación · Permisos antes del primer uso · El gate es un comando · Probar y realimentar',
      en: 'Rules at the repo root · Skills for what repeats · Tools to see the application · Permissions before first use · The gate is a command · Try it and feed back',
    },
  },
  {
    day: 10,
    slug: 'qa-ai-10-playwright-mcp',
    minutes: 6,
    tags: ['Playwright', 'MCP', 'AI Agents'],
    title: {
      es: 'Playwright MCP: un agente que navega tu app y propone tests',
      en: 'Playwright MCP: an agent that browses your app and proposes tests',
    },
    summary: {
      es: 'Conectá Playwright MCP a tu agente, hacé una exploración guiada y terminá con un plan de pruebas y un test que usa los roles reales de la página.',
      en: "Connect Playwright MCP to your agent, run a guided exploration and end with a test plan and one test built on the page's real roles.",
    },
    cover: {
      es: '/publications/qa-ai/covers/d10-es.jpg',
      en: '/publications/qa-ai/covers/d10-en.jpg',
    },
    keywords: {
      es: 'Conectar y comprobar · Qué ve el agente · Explorar sin escribir código · Un plan en Markdown, corregido por vos · Un test por vez · Límites de seguridad',
      en: 'Connect and confirm · What the agent sees · Explore without writing code · A Markdown plan, corrected by you · One test at a time · Safety limits',
    },
  },
  {
    day: 11,
    slug: 'qa-ai-11-playwright-test-agents',
    minutes: 6,
    tags: ['Playwright', 'AI Agents', 'Test Automation'],
    title: {
      es: 'Playwright Test Agents: planner, generator y healer en acción',
      en: 'Playwright Test Agents: planner, generator and healer in action',
    },
    summary: {
      es: 'El ciclo completo planner, generator y healer en un repo real, y los dos puntos donde tiene que intervenir una persona.',
      en: 'The full planner, generator and healer cycle in a real repo, and the two points where a person must step in.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d11-es.jpg',
      en: '/publications/qa-ai/covers/d11-en.jpg',
    },
    keywords: {
      es: 'Inicializar y commitear · El test semilla · Planner y la primera intervención · Generator · Healer y la segunda intervención · Regenerar en cada upgrade',
      en: 'Initialize and commit · The seed test · Planner and the first intervention · Generator · Healer and the second intervention · Regenerate on every upgrade',
    },
  },
  {
    day: 12,
    slug: 'qa-ai-12-failure-triage-with-llms',
    minutes: 7,
    tags: ['CI/CD', 'Playwright', 'LLM'],
    title: {
      es: 'Triage de fallos con LLM: de 40 tests rojos a 3 causas',
      en: 'Failure triage with LLMs: from 40 red tests to 3 root causes',
    },
    summary: {
      es: 'Un paso de triage que agrupa los fallos de una corrida por causa probable, con evidencia, y que dice "no sé" cuando no alcanza.',
      en: 'A triage step that groups a run\'s failures by probable cause, with evidence, and says "unknown" when there isn\'t enough.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d12-es.jpg',
      en: '/publications/qa-ai/covers/d12-en.jpg',
    },
    keywords: {
      es: 'Resultados estructurados · Extraer solo lo necesario · El prompt de triage · Verificar el grupo más grande · Guardar cada triage · El cierre es humano',
      en: "Structured results · Extract only what's needed · The triage prompt · Verify the largest group · Save every triage · Closure is human",
    },
  },
  {
    day: 13,
    slug: 'qa-ai-13-tdd-with-ai-red-green-refactor',
    minutes: 7,
    tags: ['TDD', 'AI Agents', 'Vitest'],
    title: {
      es: 'TDD con IA (1): red, green, refactor con un agente',
      en: 'TDD with AI (1): red, green, refactor with an agent',
    },
    summary: {
      es: 'Tres ciclos de TDD donde vos escribís el test y el agente escribe la implementación mínima, sin tocar el test.',
      en: 'Three TDD cycles where you write the test and the agent writes the minimal implementation, without touching the test.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d13-es.jpg',
      en: '/publications/qa-ai/covers/d13-en.jpg',
    },
    keywords: {
      es: 'Rojo: un test, escrito por vos · Fallar por la razón correcta · Verde: lo mínimo, sin tocar tests · Verificar el verde vos · Refactor con la red puesta · Un ciclo, un commit',
      en: 'Red: one test, written by you · Failing for the right reason · Green: the minimum, without touching tests · Verify the green yourself · Refactor with the net in place · One cycle, one commit',
    },
  },
  {
    day: 14,
    slug: 'qa-ai-14-tdd-with-ai-guardrails',
    minutes: 7,
    tags: ['TDD', 'Mutation Testing', 'AI Agents'],
    title: {
      es: 'TDD con IA (2): guardrails para que el agente no haga trampa',
      en: "TDD with AI (2): guardrails so the agent can't cheat",
    },
    summary: {
      es: 'Las cinco trampas típicas de un agente frente a un test rojo y un control automático para cada una.',
      en: 'The five typical ways an agent cheats on a red test and an automatic control for each.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d14-es.jpg',
      en: '/publications/qa-ai/covers/d14-en.jpg',
    },
    keywords: {
      es: 'Tests de solo lectura · El guard en CI · Property tests fuera del contexto · Lint contra tests desactivados · Mutation testing sobre lo tocado · Todo en el pipeline',
      en: 'Read-only tests · The CI guard · Property tests out of context · Lint against disabled tests · Mutation testing on what was touched · Everything in the pipeline',
    },
  },
  {
    day: 15,
    slug: 'qa-ai-15-setting-up-models-for-quality-testing',
    minutes: 6,
    tags: ['LLM', 'Evals', 'Reproducibility'],
    title: {
      es: 'Cómo setear modelos para pruebas de calidad',
      en: 'How to set up models for quality testing',
    },
    summary: {
      es: 'Configurar un modelo para pruebas de forma reproducible: versión fija, parámetros explícitos, salida estructurada y un juez separado del modelo evaluado.',
      en: 'Configuring a model for testing reproducibly: pinned version, explicit parameters, structured output and a judge separate from the model under test.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d15-es.jpg',
      en: '/publications/qa-ai/covers/d15-en.jpg',
    },
    keywords: {
      es: 'El rol define la configuración · Versión exacta, sin alias · Parámetros a la vista · Salida estructurada · Un juez separado · La ficha de corrida',
      en: 'The role defines the config · Exact version, no aliases · Parameters in plain sight · Structured output · A separate judge · The run card',
    },
  },
  {
    day: 16,
    slug: 'qa-ai-16-llm-as-a-judge-calibration',
    minutes: 6,
    tags: ['Evals', 'LLM Judge', 'QA'],
    title: {
      es: 'LLM como juez: rúbricas y calibración contra humanos',
      en: 'LLM-as-a-judge: rubrics and calibration against humans',
    },
    summary: {
      es: 'Cómo escribir una rúbrica observable para un modelo juez y medir cuánto coincide con tu criterio antes de confiar en él.',
      en: 'How to write an observable rubric for a judge model and measure how much it agrees with your judgment before trusting it.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d16-es.jpg',
      en: '/publications/qa-ai/covers/d16-en.jpg',
    },
    keywords: {
      es: 'Criterios observables · Treinta etiquetas tuyas, primero · Correr el juez sobre los mismos casos · Acuerdo y dirección · Corregir la rúbrica · Medir de nuevo y fijar un mínimo',
      en: 'Observable criteria · Thirty labels of your own, first · Run the judge on the same cases · Agreement and direction · Fix the rubric · Measure again and set a minimum',
    },
  },
  {
    day: 17,
    slug: 'qa-ai-17-golden-datasets',
    minutes: 6,
    tags: ['Evals', 'Data Quality', 'Datasets'],
    title: {
      es: 'Golden datasets: cómo etiquetar, balancear y versionar',
      en: 'Golden datasets: how to label, balance and version',
    },
    summary: {
      es: 'Un golden dataset chico pero confiable: con guía de etiquetado, tres particiones y versionado en Git.',
      en: 'A small but reliable golden dataset: with a labeling guide, three splits and Git versioning.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d17-es.jpg',
      en: '/publications/qa-ai/covers/d17-en.jpg',
    },
    keywords: {
      es: 'Tres fuentes de casos · La guía de etiquetado · Dos personas, veinte casos · Balance · Tres particiones · Versionado',
      en: 'Three sources of cases · The labeling guide · Two people, twenty cases · Balance · Three splits · Versioning',
    },
  },
  {
    day: 18,
    slug: 'qa-ai-18-how-to-test-a-model',
    minutes: 6,
    tags: ['Evals', 'LLM', 'Data Quality'],
    title: {
      es: 'Cómo testear un modelo: accuracy, N corridas y rangos',
      en: 'How to test a model: accuracy, N runs and ranges',
    },
    summary: {
      es: 'Cómo medir un modelo que toma decisiones (un agente que mapea nombres desordenados contra un catálogo maestro) con corridas repetidas, rangos y métricas por tipo de error.',
      en: 'How to measure a decision-making model (an agent mapping messy names to a master catalog) with repeated runs, ranges and per-error-type metrics.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d18-es.jpg',
      en: '/publications/qa-ai/covers/d18-en.jpg',
    },
    keywords: {
      es: 'Tarea y acciones definidas · Cinco corridas por configuración · Media y rango · Más allá del accuracy · Mismas condiciones, calidad contra costo · Decidir con la tabla completa',
      en: 'Task and actions defined · Five runs per configuration · Mean and range · Beyond accuracy · Same conditions, quality against cost · Decide with the full table',
    },
  },
  {
    day: 19,
    slug: 'qa-ai-19-top-k-prefilter-cost',
    minutes: 7,
    tags: ['LLM', 'Cost', 'Evals'],
    title: {
      es: 'Costo como métrica de calidad: prefiltro top-K antes del modelo',
      en: 'Cost as a quality metric: top-K prefiltering before the model',
    },
    summary: {
      es: 'Cómo reducir los tokens de entrada de un agente con un prefiltro local de candidatos y demostrar con mediciones que la calidad no baja.',
      en: "How to cut an agent's input tokens with a local candidate prefilter and prove with measurements that quality doesn't drop.",
    },
    cover: {
      es: '/publications/qa-ai/covers/d19-es.jpg',
      en: '/publications/qa-ai/covers/d19-en.jpg',
    },
    keywords: {
      es: 'La línea de base · Un prefiltro local y simple · Recall del prefiltro · Comparar métodos y valores de K · El eval completo con cada K · Elegir el K más chico que alcanza',
      en: 'The baseline · A simple local prefilter · Prefilter recall · Compare methods and K values · The full eval with each K · Choose the smallest K that suffices',
    },
  },
  {
    day: 20,
    slug: 'qa-ai-20-prompt-regression',
    minutes: 6,
    tags: ['Prompting', 'Evals', 'Regression'],
    title: {
      es: 'Regresión de prompts: versionar, comparar y no romper lo que andaba',
      en: "Prompt regression: version, compare and don't break what worked",
    },
    summary: {
      es: 'Tratar cada cambio de prompt como un cambio de código: versión, comparación lado a lado y un set de regresión que decide el merge.',
      en: 'Treating every prompt change as a code change: version, side-by-side comparison and a regression set that decides the merge.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d20-es.jpg',
      en: '/publications/qa-ai/covers/d20-en.jpg',
    },
    keywords: {
      es: 'Una versión, un archivo, una línea de changelog · Un cambio por versión · Lado a lado, cinco veces · Movimiento por tipo de error · Fugas entre prompt y test · La regla de merge',
      en: 'One version, one file, one changelog line · One change per version · Side by side, five times · Movement by error type · Leaks between prompt and test · The merge rule',
    },
  },
  {
    day: 21,
    slug: 'qa-ai-21-testing-rag',
    minutes: 7,
    tags: ['RAG', 'Evals', 'DeepEval'],
    title: {
      es: 'Testing de RAG: retrieval, fidelidad y respuesta por separado',
      en: 'Testing RAG: retrieval, faithfulness and answer, separately',
    },
    summary: {
      es: 'Cómo probar un sistema RAG en tres capas para saber, cuando falla, si el problema está en la búsqueda, en la generación o en la base de conocimiento.',
      en: 'How to test a RAG system in three layers so that, when it fails, you know whether the problem is retrieval, generation or the knowledge base.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d21-es.jpg',
      en: '/publications/qa-ai/covers/d21-en.jpg',
    },
    keywords: {
      es: 'Capa uno: recuperación · Capa dos: fidelidad · Capa tres: respuesta · Casos negativos · Diagnosticar por capa · Métricas en CI',
      en: 'Layer one: retrieval · Layer two: faithfulness · Layer three: answer · Negative cases · Diagnose per layer · Metrics in CI',
    },
  },
  {
    day: 22,
    slug: 'qa-ai-22-threat-modeling-owasp-llm-agentic',
    minutes: 7,
    tags: ['AI Security', 'OWASP', 'Threat Modeling'],
    title: {
      es: 'Modelo para pruebas de seguridad (1): threat model con OWASP LLM y Agentic Top 10',
      en: 'A model for security testing (1): threat modeling with the OWASP LLM and Agentic Top 10',
    },
    summary: {
      es: 'Cómo armar el modelo de amenazas de una feature con IA y convertirlo en casos de abuso que se pueden probar.',
      en: 'How to build the threat model of an AI feature and turn it into testable abuse cases.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d22-es.jpg',
      en: '/publications/qa-ai/covers/d22-en.jpg',
    },
    keywords: {
      es: 'Dibujar el sistema · Fronteras de confianza · El Top 10 para aplicaciones con LLM · El Top 10 para aplicaciones agénticas · Casos de abuso concretos · Priorizar y decidir',
      en: 'Draw the system · Trust boundaries · The Top 10 for LLM applications · The Top 10 for agentic applications · Concrete abuse cases · Prioritize and decide',
    },
  },
  {
    day: 23,
    slug: 'qa-ai-23-automated-red-teaming',
    minutes: 7,
    tags: ['AI Security', 'Red Teaming', 'promptfoo'],
    title: {
      es: 'Modelo para pruebas de seguridad (2): red teaming automatizado',
      en: 'A model for security testing (2): automated red teaming',
    },
    summary: {
      es: 'Un esquema de tres modelos (atacante, objetivo y evaluador) que genera pruebas adversas a partir de tu threat model y reporta la tasa de éxito por categoría.',
      en: 'A three-model scheme (attacker, target and grader) that generates adversarial tests from your threat model and reports the success rate per category.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d23-es.jpg',
      en: '/publications/qa-ai/covers/d23-en.jpg',
    },
    keywords: {
      es: 'Autorización y entorno · Tres roles · El propósito, con sus límites · Plugins y estrategias desde el threat model · Leer el reporte y las conversaciones · Corregir, repetir y programar',
      en: 'Authorization and environment · Three roles · The purpose, with its limits · Plugins and strategies from the threat model · Read the report and the conversations · Fix, repeat and schedule',
    },
  },
  {
    day: 24,
    slug: 'qa-ai-24-prompt-injection-in-tool-using-agents',
    minutes: 6,
    tags: ['AI Security', 'AI Agents', 'MCP'],
    title: {
      es: 'Seguridad (3): prompt injection en agentes con herramientas y cómo probar los controles',
      en: 'Security (3): prompt injection in tool-using agents and how to test the controls',
    },
    summary: {
      es: 'Tests que verifican que un agente no ejecuta acciones indebidas cuando el contenido que lee trae instrucciones inyectadas.',
      en: "Tests that verify an agent doesn't execute improper actions when the content it reads carries injected instructions.",
    },
    cover: {
      es: '/publications/qa-ai/covers/d24-es.jpg',
      en: '/publications/qa-ai/covers/d24-en.jpg',
    },
    keywords: {
      es: 'Inventario de herramientas · La combinación peligrosa · Fixtures con inyecciones en cada canal · Aserciones sobre acciones · Cada control por separado · MCP y regresión',
      en: 'Tool inventory · The dangerous combination · Fixtures with injections in every channel · Assertions on actions · Each control separately · MCP and regression',
    },
  },
  {
    day: 25,
    slug: 'qa-ai-25-llm-performance-metrics',
    minutes: 8,
    tags: ['Performance', 'LLM', 'SRE'],
    title: {
      es: 'Modelo para pruebas de performance (1): las métricas que importan en un LLM',
      en: 'A model for performance testing (1): the metrics that matter for an LLM',
    },
    summary: {
      es: 'El modelo de performance de una feature con LLM: perfil de carga, métricas propias de generación de texto y objetivos por percentil.',
      en: 'The performance model of an LLM feature: workload profile, text-generation-specific metrics and percentile targets.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d25-es.jpg',
      en: '/publications/qa-ai/covers/d25-en.jpg',
    },
    keywords: {
      es: 'Por qué las métricas clásicas engañan · El perfil de carga · Objetivos por percentil · La línea de base con un usuario · Goodput · El costo por request',
      en: 'Why classic metrics mislead · The workload profile · Targets per percentile · The single-user baseline · Goodput · Cost per request',
    },
  },
  {
    day: 26,
    slug: 'qa-ai-26-load-testing-an-llm-endpoint-k6',
    minutes: 7,
    tags: ['Performance', 'k6', 'LLM'],
    title: {
      es: 'Performance (2): prueba de carga a un endpoint LLM con k6',
      en: 'Performance (2): load testing an LLM endpoint with k6',
    },
    summary: {
      es: 'Una prueba de carga escalonada contra un endpoint LLM, con métricas de tokens y goodput, para encontrar el punto donde el sistema deja de escalar.',
      en: 'A staged load test against an LLM endpoint, with token and goodput metrics, to find the point where the system stops scaling.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d26-es.jpg',
      en: '/publications/qa-ai/covers/d26-en.jpg',
    },
    keywords: {
      es: 'Umbrales desde los objetivos · Una mezcla de prompts realista · Carga por etapas · Encontrar la rodilla · Separar los errores · Umbrales como criterio y ejecución programada',
      en: 'Thresholds from the targets · A realistic prompt mix · Load in stages · Finding the knee · Separating errors · Thresholds as the criterion and scheduled runs',
    },
  },
  {
    day: 27,
    slug: 'qa-ai-27-ai-generating-and-analyzing-load-tests',
    minutes: 6,
    tags: ['Performance', 'k6', 'LLM'],
    title: {
      es: 'Performance (3): IA generando y analizando pruebas de carga',
      en: 'Performance (3): AI generating and analyzing load tests',
    },
    summary: {
      es: 'Cómo usar un LLM para escribir un script de carga desde una especificación y para proponer hipótesis sobre los resultados, con un método para verificar cada una.',
      en: 'How to use an LLM to write a load script from a specification and to propose hypotheses about the results, with a method to verify each.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d27-es.jpg',
      en: '/publications/qa-ai/covers/d27-en.jpg',
    },
    keywords: {
      es: 'Tres entradas obligatorias · Requisitos explícitos en el pedido · Revisión con checklist · Corrida en seco y corrida real · Análisis con métricas del servidor · Verificar la primera hipótesis',
      en: 'Three required inputs · Explicit requirements in the request · Review with a checklist · Dry run and real run · Analysis with server metrics · Verify the top hypothesis',
    },
  },
  {
    day: 28,
    slug: 'qa-ai-28-evals-in-ci-quality-gates',
    minutes: 7,
    tags: ['CI/CD', 'Evals', 'DevOps'],
    title: {
      es: 'Evals en CI: quality gates para features con IA',
      en: 'Evals in CI: quality gates for AI features',
    },
    summary: {
      es: 'Cómo llevar los evals al pipeline en tres niveles (PR, nocturno y release) con un gate que bloquea el merge y un costo controlado.',
      en: 'How to bring evals into the pipeline at three tiers (PR, nightly and release) with a gate that blocks merges and controlled cost.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d28-es.jpg',
      en: '/publications/qa-ai/covers/d28-en.jpg',
    },
    keywords: {
      es: 'El nivel de PR · El código de salida como gate · Artefactos siempre, también en fallo · Controlar el costo · El nivel nocturno · El nivel de release',
      en: 'The PR tier · The exit code as the gate · Artifacts always, on failure too · Controlling cost · The nightly tier · The release tier',
    },
  },
  {
    day: 29,
    slug: 'qa-ai-29-qa-infra-for-ai',
    minutes: 7,
    tags: ['Infra', 'CI/CD', 'SRE'],
    title: {
      es: 'Infra de QA con IA: runners efímeros, modelos locales, secretos y costos',
      en: 'QA infra for AI: ephemeral runners, local models, secrets and cost',
    },
    summary: {
      es: 'Las cinco decisiones de infraestructura que hacen que las pruebas con IA sean reproducibles, seguras y pagables.',
      en: 'The five infrastructure decisions that keep AI testing reproducible, safe and affordable.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d29-es.jpg',
      en: '/publications/qa-ai/covers/d29-en.jpg',
    },
    keywords: {
      es: 'Dónde corre el modelo · Runners efímeros · Sandbox para agentes · Secretos · El costo como métrica · Reproducibilidad',
      en: 'Where the model runs · Ephemeral runners · Sandbox for agents · Secrets · Cost as a metric · Reproducibility',
    },
  },
  {
    day: 30,
    slug: 'qa-ai-30-llm-observability-in-production',
    minutes: 7,
    tags: ['Observability', 'SRE', 'LLM'],
    title: {
      es: 'Observabilidad de LLM en producción: traces, evals online y alertas',
      en: 'LLM observability in production: traces, online evals and alerts',
    },
    summary: {
      es: 'Qué registrar de cada llamada a un modelo en producción, cómo evaluar una muestra de forma continua y qué alertas justifican despertar a alguien.',
      en: 'What to record for every production model call, how to continuously evaluate a sample and which alerts justify waking someone up.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d30-es.jpg',
      en: '/publications/qa-ai/covers/d30-en.jpg',
    },
    keywords: {
      es: 'Un span por llamada al modelo · Qué se guarda y por cuánto tiempo · Evals en línea · Cuatro indicadores con alerta · Cerrar el circuito · El plan de rollback',
      en: 'One span per model call · What gets stored and for how long · Online evals · Four indicators with alerts · Closing the loop · The rollback plan',
    },
  },
  {
    day: 31,
    slug: 'qa-ai-31-capstone-full-ai-quality-pipeline',
    minutes: 7,
    tags: ['QA', 'SDET', 'Quality Engineering'],
    title: {
      es: 'Capstone: el pipeline completo de calidad con IA y tu hoja de ruta 2027',
      en: 'Capstone: the full AI quality pipeline and your 2027 roadmap',
    },
    summary: {
      es: 'Los 30 días anteriores unidos en un solo pipeline, un checklist de 12 puntos para autoevaluarte y un plan de 90 días con evidencia pública.',
      en: 'The previous 30 days tied into a single pipeline, a 12-point checklist to self-assess and a 90-day plan with public evidence.',
    },
    cover: {
      es: '/publications/qa-ai/covers/d31-es.jpg',
      en: '/publications/qa-ai/covers/d31-en.jpg',
    },
    keywords: {
      es: 'El recorrido completo · Un checklist honesto · Tres piezas, por riesgo · Un plan de noventa días · Publicar evidencia · Volver a la matriz',
      en: 'The full journey · An honest checklist · Three pieces, by risk · A ninety-day plan · Publish evidence · Back to the matrix',
    },
  },
];
