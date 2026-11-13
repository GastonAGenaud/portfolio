import type { SeriesGuide } from './types';

export const week5: SeriesGuide[] = [
  {
    day: 28,
    title: {
      es: 'Evals en CI: quality gates para features con IA',
      en: 'Evals in CI: quality gates for AI features',
    },
    summary: {
      es: 'Cómo llevar los evals al pipeline en tres niveles (PR, nocturno y release) con un gate que bloquea el merge y un costo controlado.',
      en: 'How to bring evals into the pipeline at three tiers (PR, nightly and release) with a gate that blocks merges and controlled cost.',
    },
    pitfall: {
      es: 'El mismo código puede pasar un gate y fallar horas después. Con modelos, un verde puntual no reemplaza a la tendencia.',
      en: "The same code can pass a gate and fail hours later. With models, a single green doesn't replace the trend.",
    },
    requirements: {
      es: [
        'Un repo con evals (día 8) y golden dataset (día 17).',
        'CI: GitHub Actions o Jenkins.',
        'Una API key guardada como secreto del CI, con límite de gasto.',
      ],
      en: [
        'A repo with evals (day 8) and a golden dataset (day 17).',
        'CI: GitHub Actions or Jenkins.',
        'An API key stored as a CI secret, with a spending cap.',
      ],
    },
    steps: {
      es: [
        'Empezá por el nivel PR: un subset chico y rápido que corre solo cuando cambian prompts, evals o código de IA.',
        'El comando de eval devuelve un código de salida distinto de cero si hay casos que fallan. Eso alcanza para bloquear el merge.',
        'Guardá el resultado como artefacto siempre, también cuando falla. Sin el detalle nadie puede diagnosticar.',
        'Controlá el costo: filtro por paths, caché de respuestas, subset en PR y una API key de CI con tope de gasto.',
        'Sumá el nivel nocturno con el set completo, cinco corridas, el juez y el red teaming. Ahí mirás tendencia, no un PR puntual.',
        'En release corré regresión y performance, y dejá la decisión final a una persona con el reporte adelante.',
      ],
      en: [
        'Start with the PR tier: a small, fast subset that runs only when prompts, evals or AI code change.',
        "The eval command returns a non-zero exit code when cases fail. That's enough to block the merge.",
        'Always save the result as an artifact, including on failure. Without the detail nobody can diagnose.',
        'Control cost: path filters, response caching, a subset on PRs and a CI API key with a spending cap.',
        "Add the nightly tier with the full set, five runs, the judge and red teaming. That's where you watch the trend, not a single PR.",
        'At release run regression and performance, and leave the final call to a person with the report in front of them.',
      ],
    },
    snippets: [
      {
        code: 'name: evals\non:\n  pull_request:\n    paths: ["prompts/**", "evals/**", "src/ai/**"]\njobs:\n  evals:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci\n      - name: Run evals\n        env:\n          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}\n          PROMPTFOO_CACHE_PATH: .promptfoo-cache\n        run: npx promptfoo eval -c evals/bug-triage.yaml --repeat 3 -o results.json\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with: { name: eval-results, path: results.json }',
        lang: 'yaml',
        caption: {
          es: '.github/workflows/evals.yml',
          en: '.github/workflows/evals.yml',
        },
      },
      {
        code: "stage('Evals') {\n  when { anyOf { changeset 'prompts/**'; changeset 'evals/**'; changeset 'src/ai/**' } }\n  steps {\n    withCredentials([string(credentialsId: 'llm-api-key', variable: 'OPENAI_API_KEY')]) {\n      sh 'npm ci && npx promptfoo eval -c evals/bug-triage.yaml --repeat 3 -o results.json'\n    }\n  }\n  post { always { archiveArtifacts artifacts: 'results.json' } }\n}",
        lang: 'groovy',
        caption: {
          es: 'Jenkinsfile (stage equivalente)',
          en: 'Jenkinsfile (equivalent stage)',
        },
      },
    ],
    extra: {
      es: {
        title: 'Los tres niveles',
        items: [
          '**PR**: corre cuando cambian prompts, evals o código de IA. Set dev reducido, 3 corridas, checks de formato y contenido. Bloquea el merge.',
          '**Nocturno**: todas las noches. Set de test completo x5, juez y red teaming. Alerta al equipo y muestra tendencia.',
          '**Release**: antes de publicar. Regresión completa más performance. Aprueba una persona.',
        ],
      },
      en: {
        title: 'The three tiers',
        items: [
          '**PR**: runs when prompts, evals or AI code change. Reduced dev set, 3 runs, format and content checks. Blocks the merge.',
          '**Nightly**: every night. Full test set x5, judge and red teaming. Alerts the team and shows the trend.',
          '**Release**: before shipping. Full regression plus performance. A person signs off.',
        ],
      },
    },
    slug: 'qa-ai-28-evals-in-ci-quality-gates',
    minutes: 5,
    tags: ['CI/CD', 'Evals', 'DevOps'],
    diagram:
      'pull request touching prompts / evals / AI code\n   ▼\nPR tier: dev subset x3 ▶ exit code 0?\n                           ├─ no  ▶ merge blocked + artifact\n                           └─ yes ▶ merge\n                                      ▼\n            nightly: full test set x5 + judge + red team ▶ trend + alert\n                                      ▼\n            release: regression + performance ▶ human sign-off ▶ production',
  },
  {
    day: 29,
    title: {
      es: 'Infra de QA con IA: runners efímeros, modelos locales, secretos y costos',
      en: 'QA infra for AI: ephemeral runners, local models, secrets and cost',
    },
    summary: {
      es: 'Las cinco decisiones de infraestructura que hacen que las pruebas con IA sean reproducibles, seguras y pagables.',
      en: 'The five infrastructure decisions that keep AI testing reproducible, safe and affordable.',
    },
    pitfall: {
      es: 'Un modelo local chico alcanza para smoke y formato, no para evaluar criterio. Elegir el modelo por costo sin medir calidad sale caro.',
      en: 'A small local model is enough for smoke and format, not for judgment. Choosing a model on cost without measuring quality gets expensive.',
    },
    requirements: {
      es: ['El pipeline del día 28.', 'Docker en el runner.'],
      en: ['The pipeline from day 28.', 'Docker on the runner.'],
    },
    steps: {
      es: [
        'Decidí dónde corre el modelo en CI. Un modelo local como servicio sirve para smoke y checks de formato sin costo; los evals con juez necesitan un modelo más capaz.',
        'Usá runners efímeros: cada corrida arranca limpia. El estado que queda de una corrida anterior es una causa frecuente de resultados que no se pueden reproducir.',
        'Si un agente ejecuta comandos en CI, que lo haga en un sandbox: contenedor sin credenciales de producción y con salida de red restringida.',
        'Secretos: una API key por ambiente, con permisos mínimos y tope de gasto, y verificá que no aparezca en logs ni en artefactos.',
        'Costo como métrica: reportá tokens y gasto por corrida junto al pass rate. Lo que no se mide, crece.',
        'Reproducibilidad: versiones fijas de herramientas (lockfile) y de modelos, y los resultados archivados con su ficha de corrida.',
      ],
      en: [
        'Decide where the model runs in CI. A local model as a service covers smoke and format checks at no cost; judged evals need a more capable model.',
        "Use ephemeral runners: every run starts clean. Leftover state from a previous run is a frequent cause of results you can't reproduce.",
        'If an agent executes commands in CI, have it do so in a sandbox: a container with no production credentials and restricted network egress.',
        "Secrets: one API key per environment, with least privilege and a spending cap, and verify it doesn't show up in logs or artifacts.",
        "Cost as a metric: report tokens and spend per run next to the pass rate. What isn't measured grows.",
        'Reproducibility: pinned tool versions (lockfile) and model versions, and results archived with their run card.',
      ],
    },
    snippets: [
      {
        code: 'jobs:\n  smoke-evals:\n    runs-on: ubuntu-latest\n    services:\n      ollama:\n        image: ollama/ollama\n        ports: ["11434:11434"]\n    steps:\n      - uses: actions/checkout@v4\n      - run: |\n          curl -s http://localhost:11434/api/pull -d \'{"model":"llama3.2"}\'\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci && npx promptfoo eval -c evals/smoke.yaml',
        lang: 'yaml',
        caption: {
          es: 'Job de CI con un modelo local como servicio',
          en: 'CI job with a local model as a service',
        },
      },
    ],
    extra: {
      es: {
        title: 'Las cinco decisiones',
        items: [
          '**Dónde corre el modelo**: API en la nube (simple, paga por token, los datos salen) o modelo local en el runner (gratis, privado, más lento y menos capaz). Mi criterio: local para smoke y formato, nube para evals con juez.',
          '**Runners**: persistentes o efímeros (un contenedor limpio por corrida). Mi criterio: efímeros siempre.',
          '**Dónde trabaja un agente**: en el runner con credenciales o en un sandbox sin credenciales de producción y con salida de red limitada. Mi criterio: sandbox.',
          '**Secretos**: una key compartida o una por ambiente, con permisos mínimos y tope de gasto. Mi criterio: por ambiente.',
          '**Datos**: copia de producción o sintéticos y anonimizados. Mi criterio: nunca producción.',
        ],
      },
      en: {
        title: 'The five decisions',
        items: [
          '**Where the model runs**: cloud API (simple, pay per token, data leaves) or a local model on the runner (free, private, slower and less capable). My rule: local for smoke and format, cloud for judged evals.',
          '**Runners**: persistent or ephemeral (a clean container per run). My rule: always ephemeral.',
          '**Where an agent works**: on the runner with credentials or in a sandbox with no production credentials and limited network egress. My rule: sandbox.',
          '**Secrets**: one shared key or one per environment, with least privilege and a spending cap. My rule: per environment.',
          '**Data**: a production copy or synthetic and anonymized. My rule: never production.',
        ],
      },
    },
    slug: 'qa-ai-29-qa-infra-for-ai',
    minutes: 5,
    tags: ['Infra', 'CI/CD', 'SRE'],
    diagram:
      'ephemeral runner\n   ├─ agent sandbox: no prod credentials, limited egress\n   ├─ local model service: smoke + format evals\n   └─ test and eval runners ◀── secrets manager (per-environment key + spend cap)\n            │               ◀── synthetic / anonymized datasets\n            ├─▶ cloud model: judged evals\n            └─▶ artifacts: results + run card + tokens and cost\n                     ▼\n            trend: pass rate and cost per run',
  },
  {
    day: 30,
    title: {
      es: 'Observabilidad de LLM en producción: traces, evals online y alertas',
      en: 'LLM observability in production: traces, online evals and alerts',
    },
    summary: {
      es: 'Qué registrar de cada llamada a un modelo en producción, cómo evaluar una muestra de forma continua y qué alertas justifican despertar a alguien.',
      en: 'What to record for every production model call, how to continuously evaluate a sample and which alerts justify waking someone up.',
    },
    pitfall: {
      es: 'El modelo que responde puede no ser el que pediste si usás un alias. Registrá ambos o no vas a poder explicar un cambio de comportamiento.',
      en: "The model that answers may not be the one you requested if you use an alias. Record both or you won't be able to explain a behavior change.",
    },
    requirements: {
      es: [
        'Una feature con LLM en un ambiente con tráfico (staging sirve).',
        'Una herramienta de trazas para LLM; Langfuse es open source y se puede levantar en local.',
        'Los scorers del eval harness (días 8 y 16).',
      ],
      en: [
        'An LLM feature in an environment with traffic (staging works).',
        'An LLM tracing tool; Langfuse is open source and can run locally.',
        'The scorers from the eval harness (days 8 and 16).',
      ],
    },
    steps: {
      es: [
        'Instrumentá cada llamada al modelo como un span con modelo, versión de prompt, tokens, latencia y resultado. Las convenciones GenAI de OpenTelemetry te dan los nombres.',
        'Cuidá lo que guardás: los prompts y respuestas pueden traer datos personales. Enmascará o muestreá, y definí retención.',
        'Evals online: corré los checks deterministas sobre todo el tráfico y el juez sobre una muestra. Son los mismos scorers que usás en CI.',
        'Definí cuatro indicadores (calidad, latencia, errores y costo) con objetivo y alerta. Alertá por tendencia sostenida, no por un caso.',
        'Cerrá el circuito: cada fallo de producción, anonimizado, entra al set de regresión.',
        'Tené el plan de vuelta atrás escrito: prompt y modelo con versión fija y un flag para volver a la versión anterior sin deploy.',
      ],
      en: [
        'Instrument every model call as a span with model, prompt version, tokens, latency and outcome. The OpenTelemetry GenAI conventions give you the names.',
        'Mind what you store: prompts and responses can carry personal data. Mask or sample, and set retention.',
        "Online evals: run deterministic checks on all traffic and the judge on a sample. They're the same scorers you use in CI.",
        'Define four indicators (quality, latency, errors and cost) with a target and an alert. Alert on sustained trend, not on one case.',
        'Close the loop: every production failure, anonymized, joins the regression set.',
        'Have the rollback plan written: pinned prompt and model versions and a flag to return to the previous version without a deploy.',
      ],
    },
    snippets: [
      {
        code: 'git clone https://github.com/langfuse/langfuse.git\ncd langfuse && docker compose up -d',
        lang: 'bash',
      },
    ],
    extra: {
      es: {
        title: 'Qué registrar y qué medir',
        items: [
          '**Modelo pedido y modelo que respondió**: `gen_ai.request.model` y `gen_ai.response.model` (convenciones GenAI de OpenTelemetry).',
          '**Tokens de entrada y salida**: `gen_ai.usage.input_tokens` y `gen_ai.usage.output_tokens`.',
          '**Operación**: `gen_ai.operation.name`.',
          '**Versión del prompt, latencia total y al primer token**: atributos propios y la duración del span.',
          '**Llamadas a herramientas y resultado**: spans hijos.',
          '**Indicador de calidad**: pass rate de los evals online. Alerta ante una caída sostenida, no un punto aislado.',
          '**Indicador de latencia**: TTFT p95, según el objetivo del día 25.',
          '**Indicador de errores**: 429, 5xx y timeouts por debajo del máximo acordado.',
          '**Indicador de costo**: gasto por hora contra el presupuesto diario.',
        ],
      },
      en: {
        title: 'What to record and what to measure',
        items: [
          '**Requested model and responding model**: `gen_ai.request.model` and `gen_ai.response.model` (OpenTelemetry GenAI conventions).',
          '**Input and output tokens**: `gen_ai.usage.input_tokens` and `gen_ai.usage.output_tokens`.',
          '**Operation**: `gen_ai.operation.name`.',
          '**Prompt version, total latency and time to first token**: custom attributes and the span duration.',
          '**Tool calls and outcome**: child spans.',
          '**Quality indicator**: pass rate of online evals. Alert on a sustained drop, not an isolated point.',
          '**Latency indicator**: TTFT p95, per the day 25 target.',
          '**Error indicator**: 429, 5xx and timeouts below the agreed maximum.',
          '**Cost indicator**: hourly spend against the daily budget.',
        ],
      },
    },
    slug: 'qa-ai-30-llm-observability-in-production',
    minutes: 5,
    tags: ['Observability', 'SRE', 'LLM'],
    diagram:
      'app with LLM feature\n   ▼\ntraces: model · prompt version · tokens · latency · tool calls\n   ▼\nmask / sample personal data ▶ trace store\n   ▼\nonline evals: checks on all traffic, judge on a sample\n   ├─▶ SLIs: quality · latency · errors · cost ▶ sustained breach? ▶ alert + rollback via flag\n   └─▶ failed traces, anonymized ▶ regression set ▶ CI evals',
  },
  {
    day: 31,
    title: {
      es: 'Capstone: el pipeline completo de calidad con IA y tu hoja de ruta 2027',
      en: 'Capstone: the full AI quality pipeline and your 2027 roadmap',
    },
    summary: {
      es: 'Los 30 días anteriores unidos en un solo pipeline, un checklist de 12 puntos para autoevaluarte y un plan de 90 días con evidencia pública.',
      en: 'The previous 30 days tied into a single pipeline, a 12-point checklist to self-assess and a 90-day plan with public evidence.',
    },
    pitfall: {
      es: 'Resume bien y no prioriza. Decidir qué riesgo va primero en tu producto sigue siendo trabajo de una persona.',
      en: "It summarizes well and doesn't prioritize. Deciding which risk comes first in your product is still a person's job.",
    },
    requirements: {
      es: [
        'El repo `qa-ai-lab` con lo que hayas construido en la serie.',
        'La matriz de habilidades del día 2.',
      ],
      en: [
        'The `qa-ai-lab` repo with whatever you built during the series.',
        'The skills matrix from day 2.',
      ],
    },
    steps: {
      es: [
        'Recorré el diagrama de punta a punta: un cambio entra por el repo, lo produce un agente o una persona, y pasa por tests, evals, seguridad y performance antes de llegar a producción, donde se sigue midiendo.',
        'Completá el checklist con honestidad. "Lo vi en un video" no cuenta; cuenta lo que corre en un repo.',
        'Elegí tres piezas faltantes y ordenalas por riesgo de tu producto, no por lo que más te divierte.',
        'Armá el plan de 90 días: una pieza por mes, con un entregable verificable para cada una.',
        'Publicá evidencia: el repo con un README que explique qué mide cada parte, y un caso escrito con números propios.',
        'Actualizá la matriz del día 2 y fijá una fecha para repetir la autoevaluación.',
      ],
      en: [
        'Walk the diagram end to end: a change enters through the repo, produced by an agent or a person, and goes through tests, evals, security and performance before reaching production, where measuring continues.',
        'Fill in the checklist honestly. "I saw it in a video" doesn\'t count; what runs in a repo does.',
        "Pick three missing pieces and order them by your product's risk, not by what's most fun.",
        'Build the 90-day plan: one piece per month, each with a verifiable deliverable.',
        'Publish evidence: the repo with a README explaining what each part measures, and a written case with your own numbers.',
        'Update the day 2 matrix and set a date to repeat the self-assessment.',
      ],
    },
    extra: {
      es: {
        title: 'Checklist de 12 piezas',
        items: [
          'Regla de delegación: verificable, barato de revisar, reversible (día 1).',
          'Repo con reglas para agentes, herramientas y permisos (día 9).',
          'Tests escritos por personas, implementación por agentes, con guardrails (días 13 y 14).',
          'Agentes de Playwright con revisión del plan y del diff (días 10 y 11).',
          'Eval harness con prompt versionado (día 8).',
          'Modelos con versión fija y juez calibrado (días 15 y 16).',
          'Golden dataset con dev, test y regresión (día 17).',
          'Corridas repetidas, rangos y costo por llamada (días 18 y 19).',
          'Regresión de prompts antes de cada cambio (día 20).',
          'Threat model, red teaming y tests de inyección (días 22 a 24).',
          'Objetivos y pruebas de performance con métricas de tokens (días 25 a 27).',
          'Gates en CI, infra reproducible y observabilidad (días 28 a 30).',
        ],
      },
      en: {
        title: '12-piece checklist',
        items: [
          'Delegation rule: verifiable, cheap to review, reversible (day 1).',
          'Repo with rules for agents, tools and permissions (day 9).',
          'Tests written by people, implementation by agents, with guardrails (days 13 and 14).',
          'Playwright agents with plan and diff review (days 10 and 11).',
          'Eval harness with a versioned prompt (day 8).',
          'Pinned model versions and a calibrated judge (days 15 and 16).',
          'Golden dataset with dev, test and regression (day 17).',
          'Repeated runs, ranges and cost per call (days 18 and 19).',
          'Prompt regression before every change (day 20).',
          'Threat model, red teaming and injection tests (days 22 to 24).',
          'Performance targets and tests with token metrics (days 25 to 27).',
          'CI gates, reproducible infra and observability (days 28 to 30).',
        ],
      },
    },
    slug: 'qa-ai-31-capstone-full-ai-quality-pipeline',
    minutes: 5,
    tags: ['QA', 'SDET', 'Quality Engineering'],
    diagram:
      'change: code, prompt, model or tool\n   ▼\nagent or person, working under repo rules\n   ▼\ntests: TDD + guardrails + Playwright\n   ▼\nevals: golden dataset, calibrated judge, repeated runs ◀──────────────┐\n   ▼                                                                  │\nprompt regression + cost                                              │\n   ▼                                                                  │\nsecurity: threat model, red team, injection tests                     │\n   ▼                                                                  │\nperformance: TTFT, tokens/s, goodput                                  │\n   ▼                                                                  │\nCI gates + human sign-off ▶ production ▶ observability ───────────────┘\n                                         (failures become regression cases)',
  },
];
