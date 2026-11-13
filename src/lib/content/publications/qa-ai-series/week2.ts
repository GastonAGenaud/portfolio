import type { SeriesGuide } from './types';

export const week2: SeriesGuide[] = [
  {
    day: 8,
    title: {
      es: 'Tu primer eval harness con promptfoo',
      en: 'Your first eval harness with promptfoo',
    },
    summary: {
      es: 'Un eval harness real para un clasificador de bugs: prompt versionado, dataset, asserts, corridas repetidas y comparación entre dos modelos.',
      en: 'A real eval harness for a bug classifier: versioned prompt, dataset, asserts, repeated runs and a two-model comparison.',
    },
    pitfall: {
      es: 'Los modelos chicos agregan texto alrededor del JSON. Validá formato antes que contenido o vas a diagnosticar mal.',
      en: "Small models wrap JSON in extra text. Validate format before content or you'll misdiagnose.",
    },
    requirements: {
      es: [
        'El repo `qa-ai-lab` con promptfoo (día 4).',
        'Ollama con `llama3.2`; opcional, un segundo modelo.',
      ],
      en: [
        'The `qa-ai-lab` repo with promptfoo (day 4).',
        'Ollama with `llama3.2`; optionally a second model.',
      ],
    },
    steps: {
      es: [
        'Escribí el prompt en un archivo aparte, con las reglas de clasificación y el formato de salida. El prompt es código: se versiona.',
        'Creá la config: prompt, provider y un `defaultTest` con el assert de formato que aplica a todos los casos.',
        'Cargá al menos 10 casos etiquetados por vos: 3 críticos, 3 bajos y 4 ambiguos. Los ambiguos son los que enseñan.',
        'Corré con `--repeat 3`. Un caso que pasa una vez de tres no está pasando.',
        'Abrí el visor y leé las fallas una por una. Clasificalas: error del modelo, error del prompt o error de tu etiqueta.',
        'Agregá un segundo provider y compará lado a lado calidad, latencia y costo.',
      ],
      en: [
        'Write the prompt in its own file, with classification rules and output format. The prompt is code: version it.',
        'Create the config: prompt, provider and a `defaultTest` with the format assert that applies to every case.',
        'Load at least 10 cases labeled by you: 3 critical, 3 low and 4 ambiguous. The ambiguous ones teach the most.',
        'Run with `--repeat 3`. A case that passes one out of three times is not passing.',
        'Open the viewer and read failures one by one. Classify them: model error, prompt error or labeling error.',
        'Add a second provider and compare quality, latency and cost side by side.',
      ],
    },
    snippets: [
      {
        code: 'You are a bug triage assistant. Classify the report.\nReturn only JSON: {"severity": "critical|high|medium|low", "component": "string"}\nRules: payment or login blocked = critical. Cosmetic = low.\nReport: {{report}}',
        lang: 'text',
        caption: {
          es: 'prompts/bug-triage.txt',
          en: 'prompts/bug-triage.txt',
        },
      },
      {
        code: 'description: bug triage classifier\nprompts:\n  - file://../prompts/bug-triage.txt\nproviders:\n  - ollama:chat:llama3.2\ndefaultTest:\n  assert:\n    - type: is-json\ntests:\n  - vars: { report: "Checkout button does nothing on Safari, users cannot pay" }\n    assert:\n      - type: javascript\n        value: JSON.parse(output).severity === \'critical\'\n  - vars: { report: "Typo in the footer: Contcat us" }\n    assert:\n      - type: javascript\n        value: JSON.parse(output).severity === \'low\'',
        lang: 'yaml',
        caption: {
          es: 'evals/bug-triage.yaml',
          en: 'evals/bug-triage.yaml',
        },
      },
      {
        code: 'npx promptfoo eval -c evals/bug-triage.yaml --repeat 3\nnpx promptfoo view',
        lang: 'bash',
      },
    ],
    slug: 'qa-ai-08-first-eval-harness-promptfoo',
    minutes: 5,
    tags: ['Evals', 'promptfoo', 'LLM'],
    diagram:
      'prompts/bug-triage.txt ──┐\nlabeled cases ───────────┤\nmodel A · model B ───────┴─▶ promptfoo runner\n                               ▼\n                    scorers: is-json + severity check\n                               ▼\n                    viewer: pass rate · latency · cost\n                               ▼\n                    failure analysis: model / prompt / label',
  },
  {
    day: 9,
    title: {
      es: 'Agent harness para QA: reglas, skills y MCP en tu repo de automation',
      en: 'Agent harness for QA: rules, skills and MCP in your automation repo',
    },
    summary: {
      es: 'Cómo preparar un repo de automation para que cualquier agente de código escriba tests siguiendo tus convenciones, con herramientas y permisos acotados.',
      en: 'How to prepare an automation repo so any coding agent writes tests following your conventions, with scoped tools and permissions.',
    },
    pitfall: {
      es: 'Ante un test rojo, tiende a debilitar el assert en lugar de investigar. Hay que prohibirlo por escrito y revisarlo en el diff.',
      en: 'Facing a red test, it tends to weaken the assertion instead of investigating. Forbid it in writing and check it in the diff.',
    },
    requirements: {
      es: [
        'Un repo con Playwright (día 4).',
        'Un agente de código: Claude Code, Copilot agent, Cursor u otro.',
      ],
      en: [
        'A repo with Playwright (day 4).',
        'A coding agent: Claude Code, Copilot agent, Cursor or another.',
      ],
    },
    steps: {
      es: [
        '**Reglas**: creá `AGENTS.md` en la raíz con cómo correr, convenciones y qué significa "terminado". Si usás Claude Code, el archivo equivalente es `CLAUDE.md`.',
        '**Skills**: pasá a un archivo los procedimientos que repetís, por ejemplo "cómo escribir un test nuevo" con tu estructura de Page Objects.',
        '**Herramientas**: declará el servidor MCP de Playwright en `.mcp.json` para que el agente pueda abrir la app y mirar la página real.',
        '**Permisos**: negá lo destructivo (borrar, push, tocar `.env`) y pedí confirmación para instalar dependencias.',
        '**Gate**: "terminado" se verifica con un comando y su exit code, no con el resumen del agente.',
        'Probalo: pedí un test nuevo y revisá si respetó locators, Page Objects y las tres corridas. Lo que no respetó vuelve a `AGENTS.md` como regla más clara.',
      ],
      en: [
        '**Rules**: create `AGENTS.md` at the root with how to run, conventions and what "done" means. With Claude Code, the equivalent file is `CLAUDE.md`.',
        '**Skills**: move repeated procedures into a file, for example "how to write a new test" with your Page Object structure.',
        '**Tools**: declare the Playwright MCP server in `.mcp.json` so the agent can open the app and look at the real page.',
        '**Permissions**: deny destructive actions (delete, push, touching `.env`) and require confirmation to install dependencies.',
        '**Gate**: "done" is verified with a command and its exit code, not with the agent\'s summary.',
        'Try it: ask for a new test and check whether it honored locators, Page Objects and the three runs. Whatever it missed goes back into `AGENTS.md` as a clearer rule.',
      ],
    },
    snippets: [
      {
        code: '# AGENTS.md\n## Run\n- All tests: npx playwright test\n- One file: npx playwright test tests/login.spec.ts\n\n## Conventions\n- Locators: getByRole or getByTestId only. No CSS or XPath.\n- No waitForTimeout. Use web-first assertions.\n- Page Objects live in tests/pages.\n\n## Done means\n- The test passes 3 times in a row: npx playwright test --repeat-each=3\n- No secrets or real user data in code.\n- Never edit an assertion just to make a test pass.',
        lang: 'markdown',
        caption: {
          es: 'AGENTS.md',
          en: 'AGENTS.md',
        },
      },
      {
        code: '{\n  "mcpServers": {\n    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }\n  }\n}',
        lang: 'json',
        caption: {
          es: '.mcp.json',
          en: '.mcp.json',
        },
      },
    ],
    slug: 'qa-ai-09-agent-harness-for-qa',
    minutes: 5,
    tags: ['AI Agents', 'Playwright', 'MCP'],
    diagram:
      'task ──▶ agent loop ◀── AGENTS.md rules\n                    ◀── skills (procedures)\n                    ◀── MCP tools (browser)\n                    ◀── permissions (deny destructive)\n              │\n              ▼\n        change in repo\n              ▼\n   gate: npx playwright test --repeat-each=3\n      ├─ exit 0   ▶ pull request + human review\n      └─ non-zero ▶ back to the agent',
  },
  {
    day: 10,
    title: {
      es: 'Playwright MCP: un agente que navega tu app y propone tests',
      en: 'Playwright MCP: an agent that browses your app and proposes tests',
    },
    summary: {
      es: 'Conectá Playwright MCP a tu agente, hacé una exploración guiada y terminá con un plan de pruebas y un test que usa los roles reales de la página.',
      en: "Connect Playwright MCP to your agent, run a guided exploration and end with a test plan and one test built on the page's real roles.",
    },
    pitfall: {
      es: 'Confunde comportamiento esperado con defecto cuando no conoce las reglas del producto. El reporte de exploración es una lista de sospechas, no de bugs.',
      en: "It confuses expected behavior with defects when it doesn't know the product rules. The exploration report is a list of suspicions, not bugs.",
    },
    requirements: {
      es: [
        'Node.js 22+ y un agente compatible con MCP.',
        'App de práctica: `https://demo.playwright.dev/todomvc`.',
        'Solo ambientes y cuentas de prueba.',
      ],
      en: [
        'Node.js 22+ and an MCP-capable agent.',
        'Practice app: `https://demo.playwright.dev/todomvc`.',
        'Test environments and test accounts only.',
      ],
    },
    steps: {
      es: [
        'Conectá el servidor MCP de Playwright a tu agente y verificá que aparezcan las herramientas del navegador.',
        'Entendé qué ve el agente: un snapshot de accesibilidad con roles y nombres, no una imagen. Por eso sus locators salen mejor.',
        'Explorá primero, sin código. Usá el prompt de exploración y leé el reporte de roles, estados y posibles defectos.',
        'Pedí un plan de pruebas en Markdown a partir de lo observado y corregilo vos: prioridades y casos faltantes.',
        'Pedí un solo test del plan, con los roles que vio, y correlo tres veces.',
        'Fijá límites: nunca producción ni credenciales reales, y recordá que el agente lee todo el contenido de la página, incluido texto malicioso.',
      ],
      en: [
        'Connect the Playwright MCP server to your agent and confirm the browser tools show up.',
        "Understand what the agent sees: an accessibility snapshot with roles and names, not an image. That's why its locators come out better.",
        'Explore first, no code. Use the exploration prompt and read the report of roles, states and possible defects.',
        'Ask for a Markdown test plan based on what it observed and fix it yourself: priorities and missing cases.',
        'Ask for a single test from the plan, using the roles it saw, and run it three times.',
        'Set limits: never production or real credentials, and remember the agent reads all page content, including malicious text.',
      ],
    },
    snippets: [
      {
        code: '# Claude Code\nclaude mcp add playwright npx @playwright/mcp@latest\n\n# Any MCP client: .mcp.json\n# { "mcpServers": { "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] } } }',
        lang: 'bash',
        caption: {
          es: 'Conectar el servidor MCP',
          en: 'Connect the MCP server',
        },
      },
      {
        code: 'Open https://demo.playwright.dev/todomvc. Explore adding, completing, filtering and deleting todos.\nDo NOT write code yet. Report: elements by role and name, states you observed,\nand anything that looks like a defect.',
        lang: 'text',
        caption: {
          es: 'Prompt de exploración',
          en: 'Exploration prompt',
        },
      },
    ],
    slug: 'qa-ai-10-playwright-mcp',
    minutes: 5,
    tags: ['Playwright', 'MCP', 'AI Agents'],
    diagram:
      'QA    ──▶ agent   explore, no code\nagent ──▶ MCP     navigate / click / type\nMCP   ──▶ app     browser actions\nMCP   ◀── app     accessibility snapshot\nagent ◀── MCP     roles, names, states\nQA    ◀── agent   exploration report\nQA    ──▶ agent   plan, then one test\nQA    ◀── agent   specs plan + test file',
  },
  {
    day: 11,
    title: {
      es: 'Playwright Test Agents: planner, generator y healer en acción',
      en: 'Playwright Test Agents: planner, generator and healer in action',
    },
    summary: {
      es: 'El ciclo completo planner, generator y healer en un repo real, y los dos puntos donde tiene que intervenir una persona.',
      en: 'The full planner, generator and healer cycle in a real repo, and the two points where a person must step in.',
    },
    pitfall: {
      es: 'El healer puede poner un test en verde modificando la aserción. Un test reparado sin revisar el diff es un falso verde.',
      en: 'The healer can turn a test green by modifying the assertion. A healed test with an unreviewed diff is a false green.',
    },
    requirements: {
      es: [
        'Playwright actualizado (los agentes vienen desde la versión 1.56).',
        'Un agente de código: Claude Code, VS Code con Copilot u OpenCode.',
      ],
      en: [
        'Up-to-date Playwright (agents ship since version 1.56).',
        'A coding agent: Claude Code, VS Code with Copilot or OpenCode.',
      ],
    },
    steps: {
      es: [
        'Actualizá Playwright y corré `init-agents` con el loop de tu agente. Genera las definiciones de los tres agentes, un `seed.spec.ts`, la carpeta `specs/` y la config del servidor MCP de tests. Commiteá todo.',
        'Escribí el seed test: deja la página en el estado inicial que necesitan todos los flujos (por ejemplo, logueado con un usuario de prueba).',
        '**Planner**: pedile que explore un flujo y guarde el plan en `specs/`. **Intervención 1**: revisá el plan antes de generar nada.',
        '**Generator**: pedile los tests del plan aprobado. Verifica los selectores contra la página real mientras escribe.',
        '**Healer**: rompé un locator a propósito y corré el healer. **Intervención 2**: revisá el diff. Arreglar un locator está bien; cambiar una aserción no.',
        'En cada upgrade de Playwright, volvé a correr `init-agents` en el mismo PR para regenerar las definiciones.',
      ],
      en: [
        "Upgrade Playwright and run `init-agents` with your agent's loop. It generates the three agent definitions, a `seed.spec.ts`, the `specs/` folder and the test MCP server config. Commit everything.",
        'Write the seed test: it leaves the page in the initial state every flow needs (for example, logged in as a test user).',
        '**Planner**: ask it to explore a flow and save the plan in `specs/`. **Intervention 1**: review the plan before generating anything.',
        '**Generator**: ask for the tests from the approved plan. It checks selectors against the live page while writing.',
        '**Healer**: break a locator on purpose and run the healer. **Intervention 2**: review the diff. Fixing a locator is fine; changing an assertion is not.',
        'On every Playwright upgrade, rerun `init-agents` in the same PR to regenerate the definitions.',
      ],
    },
    snippets: [
      {
        code: 'npm i -D @playwright/test@latest\nnpx playwright install chromium\n\n# pick your agent loop\nnpx playwright init-agents --loop=claude\n# npx playwright init-agents --loop=vscode\n# npx playwright init-agents --loop=opencode',
        lang: 'bash',
      },
    ],
    slug: 'qa-ai-11-playwright-test-agents',
    minutes: 5,
    tags: ['Playwright', 'AI Agents', 'Test Automation'],
    diagram:
      'seed.spec.ts ▶ Planner ▶ specs/plan.md\n                             ▼\n                  human review 1: the plan\n                             ▼ approved\n                         Generator ▶ tests/*.spec.ts ▶ run suite\n                                                          │ failing\n                                                          ▼\n                                                        Healer\n                                                          ▼\n                                             human review 2: the diff\n                                               ├─ locator fix       ▶ accept\n                                               └─ assertion changed ▶ reject',
  },
  {
    day: 12,
    title: {
      es: 'Triage de fallos con LLM: de 40 tests rojos a 3 causas',
      en: 'Failure triage with LLMs: from 40 red tests to 3 root causes',
    },
    summary: {
      es: 'Un paso de triage que agrupa los fallos de una corrida por causa probable, con evidencia, y que dice "no sé" cuando no alcanza.',
      en: 'A triage step that groups a run\'s failures by probable cause, with evidence, and says "unknown" when there isn\'t enough.',
    },
    pitfall: {
      es: 'Si no le das la salida "desconocido", fabrica una causa plausible. Una causa inventada es peor que ninguna.',
      en: 'If you don\'t give it the "unknown" exit, it fabricates a plausible cause. An invented cause is worse than none.',
    },
    requirements: {
      es: [
        'Una suite de Playwright con algunos fallos.',
        'Traces activados en reintentos.',
      ],
      en: [
        'A Playwright suite with some failures.',
        'Traces enabled on retries.',
      ],
    },
    steps: {
      es: [
        'Sacá los resultados en formato estructurado con el reporter JSON y mantené los traces de los reintentos.',
        'Extraé solo los fallos: título, archivo y los primeros 400 caracteres del error. Menos tokens, mejor agrupación.',
        'Corré el prompt de triage. Exigí categoría, tests del grupo y la línea exacta de evidencia.',
        'Verificá a mano el grupo más grande abriendo un trace con `npx playwright show-trace`.',
        'Guardá cada triage con tu veredicto final. En pocas semanas tenés un dataset para evaluar el prompt.',
        'No automatices el cierre: el modelo propone, una persona confirma antes de poner en cuarentena o abrir un bug.',
      ],
      en: [
        'Emit results in a structured format with the JSON reporter and keep traces from retries.',
        'Extract failures only: title, file and the first 400 characters of the error. Fewer tokens, better grouping.',
        'Run the triage prompt. Require category, tests in the group and the exact evidence line.',
        'Manually verify the largest group by opening a trace with `npx playwright show-trace`.',
        'Save each triage with your final verdict. In a few weeks you have a dataset to evaluate the prompt.',
        "Don't automate closure: the model proposes, a person confirms before quarantining or filing a bug.",
      ],
    },
    snippets: [
      {
        code: 'npx playwright test --reporter=json > results.json\nnode scripts/failures.js > failures.json',
        lang: 'bash',
      },
      {
        code: 'const report = require("../results.json");\nconst out = [];\n\nfunction walk(suite) {\n  (suite.suites || []).forEach(walk);\n  (suite.specs || []).forEach((spec) =>\n    spec.tests.forEach((t) =>\n      t.results\n        .filter((r) => r.status !== "passed" && r.status !== "skipped")\n        .forEach((r) =>\n          out.push({\n            title: spec.title,\n            file: spec.file,\n            error: (r.error?.message || "").slice(0, 400),\n          })\n        )\n    )\n  );\n}\n\nwalk(report);\nconsole.log(JSON.stringify(out, null, 1));',
        lang: 'js',
        caption: {
          es: 'scripts/failures.js',
          en: 'scripts/failures.js',
        },
      },
      {
        code: 'Group these failures by probable root cause. For each group give:\ncategory (product bug | test bug | environment | flaky | unknown), the tests in it,\nand the exact error line that supports it.\nIf evidence is insufficient, use "unknown". Do not guess.',
        lang: 'text',
        caption: {
          es: 'Prompt de triage',
          en: 'Triage prompt',
        },
      },
    ],
    slug: 'qa-ai-12-failure-triage-with-llms',
    minutes: 5,
    tags: ['CI/CD', 'Playwright', 'LLM'],
    diagram:
      'CI run ▶ results.json + traces ▶ extract failures only\n                                        ▼\n                    LLM: group by root cause + evidence line\n        ┌────────────┬──────────────┬────────────┬─────────┐\n   product bug    test bug     environment     flaky    unknown\n        └────────────┴──────┬───────┴────────────┴─────────┘\n                            ▼\n          human verifies the largest group in a trace\n                            ▼\n                 labeled triage history (dataset)',
  },
  {
    day: 13,
    title: {
      es: 'TDD con IA (1): red, green, refactor con un agente',
      en: 'TDD with AI (1): red, green, refactor with an agent',
    },
    summary: {
      es: 'Tres ciclos de TDD donde vos escribís el test y el agente escribe la implementación mínima, sin tocar el test.',
      en: 'Three TDD cycles where you write the test and the agent writes the minimal implementation, without touching the test.',
    },
    pitfall: {
      es: 'Tiende a implementar de más: funciones y casos que ningún test pide. Código sin test que lo pida es código sin dueño.',
      en: 'It tends to overbuild: functions and cases no test asks for. Code no test demands is code with no owner.',
    },
    requirements: {
      es: ['Node.js 22+, un agente de código y un repo vacío.'],
      en: ['Node.js 22+, a coding agent and an empty repo.'],
    },
    steps: {
      es: [
        '**Rojo**: escribí vos un solo test. El test es la especificación y es tuyo.',
        'Corré `npx vitest run` y confirmá que falla por el motivo correcto (la función no existe o devuelve otra cosa), no por un error de import.',
        '**Verde**: pedí al agente el código mínimo para pasar ese test, con la instrucción explícita de no modificar tests.',
        'Verificá vos el verde corriendo el comando. Revisá el diff: solo debería haber cambiado `src/discount.ts`.',
        '**Refactor**: pedí una mejora de legibilidad manteniendo los tests en verde. Commit.',
        'Repetí con el segundo y el tercer test. Un commit por ciclo deja un historial que se puede auditar.',
      ],
      en: [
        "**Red**: you write a single test. The test is the specification and it's yours.",
        "Run `npx vitest run` and confirm it fails for the right reason (the function doesn't exist or returns something else), not an import error.",
        '**Green**: ask the agent for the minimum code to pass that test, explicitly instructing it not to modify tests.',
        'Verify the green yourself by running the command. Review the diff: only `src/discount.ts` should have changed.',
        '**Refactor**: ask for a readability improvement keeping tests green. Commit.',
        'Repeat with the second and third tests. One commit per cycle leaves an auditable history.',
      ],
    },
    snippets: [
      {
        code: 'mkdir tdd-ai && cd tdd-ai && git init && npm init -y\nnpm i -D vitest typescript',
        lang: 'bash',
      },
      {
        code: 'import { describe, it, expect } from "vitest";\nimport { applyDiscount } from "./discount";\n\ndescribe("applyDiscount", () => {\n  it("applies 10% with code SAVE10", () => {\n    expect(applyDiscount(200, "SAVE10")).toBe(180);\n  });\n  it("rejects unknown codes", () => {\n    expect(() => applyDiscount(200, "NOPE")).toThrow("invalid coupon");\n  });\n  it("never returns a negative total", () => {\n    expect(applyDiscount(5, "MINUS10")).toBe(0);\n  });\n});',
        lang: 'ts',
        caption: {
          es: 'src/discount.test.ts',
          en: 'src/discount.test.ts',
        },
      },
      {
        code: 'Make the failing test in src/discount.test.ts pass with the minimum code in src/discount.ts.\nDo not modify any test file. Run npx vitest run and show me the output.',
        lang: 'text',
        caption: {
          es: 'Prompt para el agente, un test a la vez',
          en: 'Agent prompt, one test at a time',
        },
      },
    ],
    slug: 'qa-ai-13-tdd-with-ai-red-green-refactor',
    minutes: 5,
    tags: ['TDD', 'AI Agents', 'Vitest'],
    diagram:
      'RED: human writes one test\n   ▼\nfails for the right reason? ── no ──▶ fix the test setup\n   │ yes\n   ▼\nGREEN: agent writes minimal code\n   ▼\ntests pass and only src changed? ── no ──▶ back to the agent\n   │ yes\n   ▼\nREFACTOR: agent improves, tests stay green ▶ commit ▶ next test',
  },
  {
    day: 14,
    title: {
      es: 'TDD con IA (2): guardrails para que el agente no haga trampa',
      en: "TDD with AI (2): guardrails so the agent can't cheat",
    },
    summary: {
      es: 'Las cinco trampas típicas de un agente frente a un test rojo y un control automático para cada una.',
      en: 'The five typical ways an agent cheats on a red test and an automatic control for each.',
    },
    pitfall: {
      es: 'Produce suites con cobertura total que casi no detectan mutantes. Hay que medir si el test falla cuando el código está mal.',
      en: 'It produces full-coverage suites that barely catch mutants. Measure whether the test fails when the code is wrong.',
    },
    requirements: {
      es: ['El repo `tdd-ai` del día 13.'],
      en: ['The `tdd-ai` repo from day 13.'],
    },
    steps: {
      es: [
        'Marcá los archivos de test como no editables en los permisos del agente.',
        'Agregá el guard de CI para PRs de implementación.',
        'Escribí un test de propiedades por función crítica y dejalo fuera del contexto del agente.',
        'Activá la regla de lint contra `.skip` y `.only`.',
        'Corré Stryker y mirá el mutation score de los archivos que tocó el agente.',
        'Sumá todo al pipeline: si un control falla, el PR no se mergea.',
      ],
      en: [
        "Mark test files as non-editable in the agent's permissions.",
        'Add the CI guard for implementation PRs.',
        "Write one property test per critical function and keep it out of the agent's context.",
        'Enable the lint rule against `.skip` and `.only`.',
        'Run Stryker and check the mutation score for files the agent touched.',
        "Add everything to the pipeline: if a control fails, the PR doesn't merge.",
      ],
    },
    snippets: [
      {
        code: 'npm i -D fast-check @stryker-mutator/core @stryker-mutator/vitest-runner\nnpx stryker init',
        lang: 'bash',
      },
      {
        code: 'import { it } from "vitest";\nimport fc from "fast-check";\nimport { applyDiscount } from "./discount";\n\nit("total is never negative and never above the original", () => {\n  fc.assert(\n    fc.property(fc.integer({ min: 0, max: 100000 }), (total) => {\n      const result = applyDiscount(total, "SAVE10");\n      return result >= 0 && result <= total;\n    })\n  );\n});',
        lang: 'ts',
        caption: {
          es: 'src/discount.property.test.ts (holdout: el agente no lo ve)',
          en: 'src/discount.property.test.ts (holdout: the agent never sees it)',
        },
      },
      {
        code: '# implementation PRs must not touch tests\ngit diff --name-only origin/main...HEAD | grep -E \'\\.test\\.ts$\' && exit 1 || echo "tests untouched"\nnpx stryker run',
        lang: 'bash',
        caption: {
          es: 'Guard de CI y mutation testing',
          en: 'CI guard and mutation testing',
        },
      },
    ],
    extra: {
      es: {
        title: 'Trampa y control',
        items: [
          '**Editar el test para que pase**: tests en solo lectura para el agente, más un guard en CI que falla si un PR de implementación toca tests.',
          '**Hardcodear el valor esperado**: tests de propiedades en un archivo que el agente no ve (holdout).',
          '**Poner .skip o .only**: regla de lint que prohíbe tests deshabilitados o enfocados.',
          '**Mockear lo que se está probando**: revisión de diff, ningún mock nuevo de la unidad bajo prueba.',
          '**Tests que no prueban nada**: mutation testing. Si los mutantes sobreviven, el test no valida.',
        ],
      },
      en: {
        title: 'Cheat and control',
        items: [
          '**Editing the test so it passes**: read-only tests for the agent, plus a CI guard that fails if an implementation PR touches tests.',
          '**Hardcoding the expected value**: property-based tests in a file the agent never sees (holdout).',
          '**Adding .skip or .only**: a lint rule banning disabled or focused tests.',
          '**Mocking the unit under test**: diff review, no new mock of the unit under test.',
          "**Tests that test nothing**: mutation testing. If mutants survive, the test doesn't validate.",
        ],
      },
    },
    slug: 'qa-ai-14-tdd-with-ai-guardrails',
    minutes: 5,
    tags: ['TDD', 'Mutation Testing', 'AI Agents'],
    diagram:
      'agent PR\n   ▼\ntests untouched? ───────────────── no ──▶ block\n   ▼ yes\nlint: no skip / only? ──────────── no ──▶ block\n   ▼ yes\nholdout property tests pass? ───── no ──▶ block\n   ▼ yes\nmutation score above threshold? ── no ──▶ block\n   ▼ yes\nhuman review and merge',
  },
];
