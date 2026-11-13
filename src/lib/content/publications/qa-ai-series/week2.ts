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
    intro: {
      es: [
        'Hasta acá hablamos de evals como idea. Hoy construís uno que funciona, de punta a punta, sobre un problema que cualquier equipo de QA reconoce: clasificar reportes de bugs por severidad. Es un buen primer caso porque la salida es chica, el criterio se puede discutir y los errores tienen consecuencias claras: un bug crítico clasificado como bajo se pierde en el backlog.',
        'Vas a escribir el prompt como archivo, armar la configuración, etiquetar diez casos con tu propio criterio, correr todo varias veces y leer los fallos. La parte que más enseña no es la herramienta sino la lectura de fallos: ahí descubrís si el problema está en el modelo, en el prompt o en tus propias etiquetas.',
      ],
      en: [
        "So far we've talked about evals as an idea. Today you build one that works, end to end, on a problem any QA team recognizes: classifying bug reports by severity. It's a good first case because the output is small, the criteria are debatable and mistakes have clear consequences: a critical bug classified as low gets lost in the backlog.",
        "You will write the prompt as a file, build the config, label ten cases with your own judgment, run everything several times and read the failures. The part that teaches the most isn't the tool but reading failures: that's where you find out whether the problem lies in the model, in the prompt or in your own labels.",
      ],
    },
    details: {
      es: [
        {
          title: 'El prompt como archivo',
          body: [
            'Escribí el prompt en `prompts/` con tres partes: el rol, las reglas de clasificación y el formato exacto de salida. Las reglas tienen que ser las tuyas, escritas como se las explicarías a alguien nuevo: qué hace que un bug sea crítico, qué lo hace bajo. Cuanto más explícitas, menos interpreta el modelo. El formato de salida también va escrito, con los valores permitidos. Tenerlo en un archivo aparte permite ver en un diff qué palabra cambió cuando la calidad sube o baja.',
          ],
        },
        {
          title: 'La configuración mínima',
          body: [
            'La configuración une tres cosas: qué prompt, contra qué provider y con qué casos. El bloque `defaultTest` es la pieza más útil para empezar: ahí va el assert de formato que se aplica a todos los casos sin repetirlo. Si la salida no es JSON válido con una severidad permitida, el caso falla ahí y no se evalúa nada más. Mantené la configuración corta. Un archivo que entra en una pantalla lo lee todo el equipo; uno de trescientas líneas, nadie.',
          ],
        },
        {
          title: 'Diez casos etiquetados por vos',
          body: [
            'Elegí diez reportes reales o realistas y escribí la severidad esperada antes de correr nada. La mezcla importa: tres claramente críticos, tres claramente bajos y cuatro ambiguos. Los claros verifican que lo básico funciona. Los ambiguos son los que discriminan: un reporte que dice "la app se cierra" sin decir en qué flujo, o uno cosmético en la pantalla de pago. Si te cuesta etiquetar un caso, anotá por qué. Esa duda suele ser una regla que falta en el prompt.',
          ],
        },
        {
          title: 'Tres corridas por caso',
          body: [
            'Una sola corrida no dice nada sobre un sistema que varía. Con tres repeticiones cada caso queda en una de tres situaciones: pasa siempre, falla siempre o es inestable. Los inestables son los más interesantes, porque muestran dónde el prompt deja margen de interpretación. Tratá un caso que pasa una de tres veces como fallido: en producción, ese caso va a clasificar mal buena parte de las veces. Anotá el tiempo y el costo total de la corrida, que más adelante vas a necesitar.',
          ],
        },
        {
          title: 'Leer los fallos uno por uno',
          body: [
            'Abrí el visor y leé cada fallo con su entrada y su salida completas. Clasificalo en una de tres causas. Error del modelo: las reglas eran claras y no las siguió. Error del prompt: la regla no estaba o era ambigua. Error de etiquetado: al releer, la respuesta del modelo es defendible y tu etiqueta no. La tercera causa aparece más de lo que uno espera, y encontrarla mejora tu criterio. Corregí primero el prompt y las etiquetas, y recién después pensá en cambiar de modelo.',
          ],
        },
        {
          title: 'Un segundo provider',
          body: [
            'Agregá otro modelo a la lista de providers y corré de nuevo. El visor muestra los dos lado a lado sobre los mismos casos. Compará tres cosas: tasa de aprobación, latencia y costo por corrida. Es frecuente que el modelo más grande gane por poco en calidad y pierda por mucho en las otras dos. Con diez casos no alcanza para una decisión definitiva, pero sí para descartar opciones y para tener, por primera vez, una comparación basada en tus datos y no en un ranking público.',
          ],
        },
      ],
      en: [
        {
          title: 'The prompt as a file',
          body: [
            "Write the prompt under `prompts/` in three parts: the role, the classification rules and the exact output format. The rules must be yours, written the way you'd explain them to someone new: what makes a bug critical, what makes it low. The more explicit they are, the less the model interprets. The output format is written down too, with the allowed values. Keeping it in a separate file lets you see in a diff which word changed when quality goes up or down.",
          ],
        },
        {
          title: 'The minimal config',
          body: [
            "The config joins three things: which prompt, against which provider and with which cases. The `defaultTest` block is the most useful piece to start with: it holds the format assert that applies to every case without repeating it. If the output isn't valid JSON with an allowed severity, the case fails there and nothing else is evaluated. Keep the config short. A file that fits on one screen gets read by the whole team; a three-hundred-line one, by nobody.",
          ],
        },
        {
          title: 'Ten cases labeled by you',
          body: [
            'Pick ten real or realistic reports and write the expected severity before running anything. The mix matters: three clearly critical, three clearly low and four ambiguous. The clear ones verify that the basics work. The ambiguous ones discriminate: a report saying "the app closes" without saying in which flow, or a cosmetic one on the payment screen. If labeling a case is hard, note why. That doubt is usually a rule missing from the prompt.',
          ],
        },
        {
          title: 'Three runs per case',
          body: [
            'A single run says nothing about a system that varies. With three repetitions each case lands in one of three situations: always passes, always fails or is unstable. The unstable ones are the most interesting, because they show where the prompt leaves room for interpretation. Treat a case that passes one time in three as failed: in production that case will be misclassified a good part of the time. Note the total time and cost of the run, which you will need later.',
          ],
        },
        {
          title: 'Reading failures one by one',
          body: [
            "Open the viewer and read each failure with its full input and output. Classify it under one of three causes. Model error: the rules were clear and it didn't follow them. Prompt error: the rule was missing or ambiguous. Labeling error: on rereading, the model's answer is defensible and your label isn't. The third cause shows up more than you'd expect, and finding it improves your judgment. Fix the prompt and the labels first, and only then think about changing models.",
          ],
        },
        {
          title: 'A second provider',
          body: [
            "Add another model to the providers list and run again. The viewer shows both side by side on the same cases. Compare three things: pass rate, latency and cost per run. Often the larger model wins by a little on quality and loses by a lot on the other two. Ten cases aren't enough for a final decision, but they are enough to rule options out and to have, for the first time, a comparison based on your data and not on a public leaderboard.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Una QA lead arma el eval con diez reportes de su backlog. En la primera corrida, con tres repeticiones, siete casos pasan siempre, uno falla siempre y dos son inestables. El que falla siempre es un error de etiquetado: ella lo había marcado como bajo, pero afecta al login y el modelo lo marcó crítico con buen motivo. Los dos inestables son reportes sin pasos de reproducción. Agrega al prompt una regla: "si faltan datos para decidir, clasificá como medio y pedí los pasos". En la segunda corrida, los diez casos pasan las tres veces. El cambio fue una línea de prompt y una etiqueta.',
      ],
      en: [
        'A QA lead builds the eval with ten reports from her backlog. In the first run, with three repetitions, seven cases always pass, one always fails and two are unstable. The one that always fails is a labeling error: she had marked it low, but it affects login and the model marked it critical with good reason. The two unstable ones are reports with no reproduction steps. She adds a rule to the prompt: "if data is missing to decide, classify as medium and ask for the steps". In the second run, all ten cases pass three times. The change was one prompt line and one label.',
      ],
    },
    mistakes: {
      es: [
        'Etiquetar los casos después de ver la respuesta del modelo.',
        'Usar solo casos fáciles y concluir que el prompt funciona.',
        'Evaluar contenido cuando el formato ya falló.',
        'Cambiar de modelo antes de revisar el prompt y las etiquetas.',
      ],
      en: [
        "Labeling cases after seeing the model's answer.",
        'Using only easy cases and concluding the prompt works.',
        'Evaluating content when the format already failed.',
        'Switching models before reviewing the prompt and the labels.',
      ],
    },
    checklist: {
      es: [
        'El prompt está en un archivo con reglas y formato de salida.',
        'Hay diez casos etiquetados, cuatro de ellos ambiguos.',
        'Cada caso corrió tres veces y sabés cuáles son inestables.',
        'Cada fallo tiene una causa asignada: modelo, prompt o etiqueta.',
      ],
      en: [
        'The prompt is in a file with rules and output format.',
        'There are ten labeled cases, four of them ambiguous.',
        'Each case ran three times and you know which are unstable.',
        'Each failure has an assigned cause: model, prompt or label.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Diez casos no son muy pocos?',
          a: 'Para decidir un release, sí. Para aprender el ciclo y encontrar los primeros problemas del prompt, alcanzan. Lo importante es que el eval exista y corra; después crece con casos reales. El día diecisiete trata cómo llevarlo a un dataset serio.',
        },
        {
          q: '¿Qué hago si el modelo local devuelve texto alrededor del JSON?',
          a: 'Primero pedí en el prompt que devuelva solo el JSON, con un ejemplo. Si sigue pasando, es un dato sobre ese modelo para esa tarea. No lo arregles limpiando la salida dentro del eval sin registrarlo, porque tu aplicación va a recibir lo mismo.',
        },
        {
          q: '¿Sirve para otra tarea que no sea clasificar?',
          a: 'Sí. La estructura es la misma para extraer campos, resumir o responder preguntas: prompt en archivo, assert de formato común, casos etiquetados, varias corridas y lectura de fallos. Cambian los scorers, no el método.',
        },
      ],
      en: [
        {
          q: "Aren't ten cases too few?",
          a: "For a release decision, yes. For learning the cycle and finding the prompt's first problems, they're enough. What matters is that the eval exists and runs; it then grows with real cases. Day seventeen covers how to turn it into a serious dataset.",
        },
        {
          q: 'What do I do if the local model returns text around the JSON?',
          a: "First ask in the prompt for the JSON only, with an example. If it keeps happening, that's a fact about that model for that task. Don't fix it by cleaning the output inside the eval without recording it, because your application will receive the same thing.",
        },
        {
          q: 'Does it work for a task other than classification?',
          a: 'Yes. The structure is the same for extracting fields, summarizing or answering questions: prompt in a file, shared format assert, labeled cases, several runs and reading failures. The scorers change, not the method.',
        },
      ],
    },
    slug: 'qa-ai-08-first-eval-harness-promptfoo',
    minutes: 7,
    tags: ['Evals', 'promptfoo', 'LLM'],
    diagram:
      'prompts/bug-triage.txt ──┐\nlabeled cases ───────────┤\nmodel A · model B ───────┴─▶ promptfoo runner\n                               ▼\n                    scorers: is-json + severity check\n                               ▼\n                    viewer: pass rate · latency · cost\n                               ▼\n                    failure analysis: model / prompt / label',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d08-light.webp',
      dark: '/publications/qa-ai/diagrams/d08-dark.webp',
      width: 1800,
      height: 467,
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
    intro: {
      es: [
        'Darle a un agente de código acceso a tu repositorio de automatización sin configurarlo es como sumar a alguien al equipo sin contarle cómo se trabaja. Va a escribir tests, pero con selectores CSS frágiles, sin tus Page Objects, con esperas fijas y sin correrlos. Después la conclusión suele ser que "el agente no sirve", cuando el problema es que nadie le dio contexto.',
        'Esta guía arma ese contexto en cinco piezas: reglas, skills, herramientas, permisos y un gate. Cada una responde a un fallo concreto que vas a ver si no está. El resultado es un repo donde un agente puede producir un test que respeta tus convenciones, y donde vos podés comprobarlo con un comando en lugar de confiar en su palabra.',
      ],
      en: [
        'Giving a coding agent access to your automation repository without configuring it is like adding someone to the team without telling them how you work. It will write tests, but with brittle CSS selectors, without your Page Objects, with fixed waits and without running them. The conclusion afterwards is usually that "the agent is no good", when the problem is that nobody gave it context.',
        "This guide builds that context in five pieces: rules, skills, tools, permissions and a gate. Each one answers a concrete failure you'll see when it's missing. The result is a repo where an agent can produce a test that follows your conventions, and where you can confirm it with a command instead of taking its word.",
      ],
    },
    details: {
      es: [
        {
          title: 'Reglas en la raíz del repo',
          body: [
            'El archivo de reglas es lo primero que el agente lee en cada sesión, así que tiene que ser corto y concreto. Tres secciones alcanzan: cómo correr los tests, qué convenciones seguir y qué significa terminado. En convenciones, escribí lo que le marcarías a una persona en un code review: locators por rol, sin esperas fijas, un Page Object por pantalla. Evitá los párrafos de filosofía. Cada línea debería poder verificarse mirando un diff, y cada regla nueva debería nacer de un error que ya viste.',
          ],
        },
        {
          title: 'Skills para lo que se repite',
          body: [
            'Hay procedimientos que no entran en una regla de una línea: cómo crear un test nuevo con su Page Object, cómo agregar un dato de prueba, cómo investigar un fallo en CI. Escribilos como archivos separados, paso a paso, con un ejemplo real del repo. El agente los carga cuando la tarea lo pide, sin ocupar contexto el resto del tiempo. Un buen indicio de que algo merece una skill es que ya se lo explicaste dos veces, a una persona o a un agente.',
          ],
        },
        {
          title: 'Herramientas para ver la aplicación',
          body: [
            'Sin acceso a un navegador, el agente escribe selectores de memoria, adivinando la estructura de la página. Con el servidor MCP de Playwright puede abrir la aplicación, leer los roles y nombres reales de los elementos y escribir locators que existen. Declararlo en `.mcp.json` dentro del repo hace que todo el equipo tenga la misma configuración. Apuntalo siempre a un entorno de prueba: la herramienta le da al agente la capacidad de hacer clic, y eso incluye botones que no querés que toque.',
          ],
        },
        {
          title: 'Permisos antes del primer uso',
          body: [
            'Definí qué no puede hacer antes de pedirle nada. Lo mínimo es denegar acciones destructivas o irreversibles: borrar archivos fuera de la carpeta de tests, hacer push, leer o modificar `.env`. Instalar dependencias debería pedir confirmación, porque cambia el proyecto para todos. Los permisos no reemplazan a la revisión, pero achican el daño posible de un error. Pensalo como los accesos de alguien que recién ingresa: puede proponer cualquier cosa y ejecutar pocas sin que alguien mire.',
          ],
        },
        {
          title: 'El gate es un comando',
          body: [
            'Escribí en las reglas qué comando define que el trabajo está terminado, por ejemplo correr el test nuevo tres veces seguidas sin fallos. Y verificalo vos, o tu pipeline, mirando el código de salida. Un agente puede escribir "todos los tests pasan" sin haberlos corrido, o habiéndolos corrido con un filtro que excluye el que falla. No es mala intención, es un resumen optimista. La diferencia entre un flujo confiable y uno que no lo es está en quién ejecuta la verificación final.',
          ],
        },
        {
          title: 'Probar y realimentar',
          body: [
            'Pedile un test nuevo para un flujo simple y revisá el resultado contra tus reglas: ¿usó locators por rol?, ¿creó o reutilizó el Page Object?, ¿corrió las tres veces? Cada cosa que haya salteado es una regla poco clara o que falta. Corregí el archivo, no solo el test, porque el archivo es lo que mejora la próxima sesión. Después de cuatro o cinco iteraciones, las reglas reflejan cómo trabaja tu equipo de verdad, y sirven también para sumar personas.',
          ],
        },
      ],
      en: [
        {
          title: 'Rules at the repo root',
          body: [
            "The rules file is the first thing the agent reads in every session, so it has to be short and concrete. Three sections are enough: how to run the tests, which conventions to follow and what done means. Under conventions, write what you would flag to a person in a code review: role-based locators, no fixed waits, one Page Object per screen. Avoid paragraphs of philosophy. Each line should be verifiable by looking at a diff, and each new rule should come from a mistake you've already seen.",
          ],
        },
        {
          title: 'Skills for what repeats',
          body: [
            "Some procedures don't fit in a one-line rule: how to create a new test with its Page Object, how to add test data, how to investigate a CI failure. Write them as separate files, step by step, with a real example from the repo. The agent loads them when the task calls for it, without taking up context the rest of the time. A good sign that something deserves a skill is that you've already explained it twice, to a person or to an agent.",
          ],
        },
        {
          title: 'Tools to see the application',
          body: [
            "Without access to a browser, the agent writes selectors from memory, guessing the page structure. With the Playwright MCP server it can open the application, read the real roles and names of elements and write locators that exist. Declaring it in `.mcp.json` inside the repo gives the whole team the same setup. Always point it at a test environment: the tool gives the agent the ability to click, and that includes buttons you don't want it to touch.",
          ],
        },
        {
          title: 'Permissions before first use',
          body: [
            "Define what it can't do before asking for anything. The minimum is denying destructive or irreversible actions: deleting files outside the tests folder, pushing, reading or modifying `.env`. Installing dependencies should ask for confirmation, because it changes the project for everyone. Permissions don't replace review, but they shrink the possible damage of a mistake. Think of it as the access of someone who just joined: free to propose anything and to execute few things without someone looking.",
          ],
        },
        {
          title: 'The gate is a command',
          body: [
            "Write in the rules which command defines that the work is done, for example running the new test three times in a row with no failures. And verify it yourself, or have your pipeline do it, by looking at the exit code. An agent can write \"all tests pass\" without having run them, or having run them with a filter that excludes the failing one. It isn't bad intent, it's an optimistic summary. The difference between a trustworthy flow and one that isn't lies in who runs the final verification.",
          ],
        },
        {
          title: 'Try it and feed back',
          body: [
            'Ask for a new test for a simple flow and check the result against your rules: did it use role-based locators? did it create or reuse the Page Object? did it run three times? Whatever it skipped is an unclear or missing rule. Fix the file, not just the test, because the file is what improves the next session. After four or five iterations the rules reflect how your team really works, and they also help when onboarding people.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo le pide al agente un test de "agregar producto al carrito" sin ninguna configuración. El resultado usa selectores como `div.card:nth-child(3) button`, una espera de dos segundos y ningún Page Object. Escriben un archivo de reglas de veinte líneas, una skill para tests nuevos y declaran el servidor MCP. Repiten el pedido. Ahora el test usa `getByRole`, reutiliza el Page Object del carrito y el agente lo corre tres veces. Se saltea una cosa: no agrega el test al tag de smoke. Suman esa línea a las reglas. La tercera vez sale completo.',
      ],
      en: [
        'A team asks the agent for an "add product to cart" test with no setup at all. The result uses selectors such as `div.card:nth-child(3) button`, a two-second wait and no Page Object. They write a twenty-line rules file, a skill for new tests and declare the MCP server. They repeat the request. Now the test uses `getByRole`, reuses the cart Page Object and the agent runs it three times. It skips one thing: it doesn\'t add the test to the smoke tag. They add that line to the rules. The third time it comes out complete.',
      ],
    },
    mistakes: {
      es: [
        'Escribir un archivo de reglas largo y general que nadie puede verificar.',
        'Corregir el test a mano sin actualizar la regla que faltaba.',
        'Dar permisos amplios "para probar" en un repo real.',
        'Aceptar el resumen del agente como evidencia de que los tests pasan.',
      ],
      en: [
        'Writing a long, generic rules file nobody can verify.',
        'Fixing the test by hand without updating the missing rule.',
        'Granting broad permissions "just to try" on a real repo.',
        "Accepting the agent's summary as evidence that tests pass.",
      ],
    },
    checklist: {
      es: [
        'El archivo de reglas tiene cómo correr, convenciones y definición de terminado.',
        'Hay al menos una skill con un ejemplo real del repo.',
        'El servidor MCP apunta a un entorno de prueba.',
        'El test generado pasó tres veces en una corrida que ejecutaste vos.',
      ],
      en: [
        'The rules file has how to run, conventions and a definition of done.',
        'There is at least one skill with a real example from the repo.',
        'The MCP server points to a test environment.',
        'The generated test passed three times in a run you executed yourself.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Qué largo debería tener el archivo de reglas?',
          a: 'El que se pueda leer en un minuto. Si pasa de una pantalla o dos, mové los procedimientos a skills y dejá en las reglas solo lo que aplica siempre. Un archivo largo no falla de forma visible: el agente simplemente respeta menos cada línea.',
        },
        {
          q: '¿Sirve con cualquier agente de código?',
          a: 'El enfoque sí. Cambian los nombres de los archivos y el formato de permisos según la herramienta, pero las cinco piezas existen en casi todas. Si tu equipo usa más de un agente, mantené una fuente única de reglas y referenciala desde cada uno.',
        },
        {
          q: '¿Las reglas reemplazan al code review?',
          a: 'No. Reducen los errores repetidos y hacen que la revisión se concentre en lo importante: si el test verifica lo correcto. Un test que cumple todas las convenciones puede igual tener una aserción que no prueba nada.',
        },
      ],
      en: [
        {
          q: 'How long should the rules file be?',
          a: "Whatever can be read in a minute. If it goes past a screen or two, move procedures into skills and leave in the rules only what always applies. A long file doesn't fail visibly: the agent simply respects each line less.",
        },
        {
          q: 'Does it work with any coding agent?',
          a: 'The approach does. File names and the permissions format change by tool, but the five pieces exist in almost all of them. If your team uses more than one agent, keep a single source of rules and reference it from each.',
        },
        {
          q: 'Do rules replace code review?',
          a: 'No. They reduce repeated mistakes and let review focus on what matters: whether the test verifies the right thing. A test that follows every convention can still have an assertion that proves nothing.',
        },
      ],
    },
    slug: 'qa-ai-09-agent-harness-for-qa',
    minutes: 7,
    tags: ['AI Agents', 'Playwright', 'MCP'],
    diagram:
      'task ──▶ agent loop ◀── AGENTS.md rules\n                    ◀── skills (procedures)\n                    ◀── MCP tools (browser)\n                    ◀── permissions (deny destructive)\n              │\n              ▼\n        change in repo\n              ▼\n   gate: npx playwright test --repeat-each=3\n      ├─ exit 0   ▶ pull request + human review\n      └─ non-zero ▶ back to the agent',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d09-light.webp',
      dark: '/publications/qa-ai/diagrams/d09-dark.webp',
      width: 1800,
      height: 1191,
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
    intro: {
      es: [
        'Durante años, generar tests de UI con IA significó pegar HTML en un chat y recibir selectores adivinados. El modelo nunca veía la aplicación funcionando: no sabía qué aparece después de un clic, qué botón queda deshabilitado ni cuánto tarda en cargar una lista. Los tests resultantes compilaban y fallaban en la primera corrida.',
        'El servidor MCP de Playwright cambia ese punto de partida: le da al agente un navegador que puede manejar. Navega, hace clic, completa formularios y lee el estado real de la página. Esta guía muestra cómo usarlo con orden, primero para explorar y recién al final para escribir código, y qué límites ponerle, porque un agente que lee páginas también lee lo que alguien haya escrito en ellas.',
      ],
      en: [
        "For years, generating UI tests with AI meant pasting HTML into a chat and getting guessed selectors back. The model never saw the application running: it didn't know what appears after a click, which button ends up disabled or how long a list takes to load. The resulting tests compiled and failed on the first run.",
        'The Playwright MCP server changes that starting point: it gives the agent a browser it can drive. It navigates, clicks, fills in forms and reads the real state of the page. This guide shows how to use it in order, first to explore and only at the end to write code, and which limits to set, because an agent that reads pages also reads whatever someone wrote on them.',
      ],
    },
    details: {
      es: [
        {
          title: 'Conectar y comprobar',
          body: [
            'Agregá el servidor a tu agente con el comando de la guía y, antes de pedir nada, listá las herramientas disponibles. Tienen que aparecer las de navegador: navegar, hacer clic, escribir, tomar un snapshot. Si no aparecen, el agente va a responder igual, pero de memoria, y vas a creer que exploró la página cuando no lo hizo. Esa comprobación de diez segundos evita la confusión más común. Después pedile algo trivial, como abrir una URL y decir el título, para confirmar que el navegador responde.',
          ],
        },
        {
          title: 'Qué ve el agente',
          body: [
            'No ve una captura de pantalla sino un snapshot de accesibilidad: un árbol de texto con el rol de cada elemento, su nombre accesible y su estado. Un botón aparece como botón con su etiqueta, un campo como textbox con su label. Tiene dos consecuencias. La primera es que los locators que propone se basan en roles y nombres, que son más estables que las clases CSS. La segunda es que una página con mala accesibilidad le resulta tan difícil como a un lector de pantalla, y ese ya es un hallazgo.',
          ],
        },
        {
          title: 'Explorar sin escribir código',
          body: [
            'Pedile que recorra un flujo y que reporte lo que encuentra, con la instrucción explícita de no escribir tests todavía. El reporte debería listar los elementos por rol, los estados que observó, como listas vacías, errores o elementos deshabilitados, y lo que le pareció raro. Leelo como leerías las notas de alguien que usa el producto por primera vez. Sirve para descubrir estados que no tenías en mente. No sirve como lista de bugs: el agente no conoce tus reglas de negocio.',
          ],
        },
        {
          title: 'Un plan en Markdown, corregido por vos',
          body: [
            'Con la exploración hecha, pedí un plan de pruebas en Markdown basado solo en lo observado. Un plan es barato de corregir y un conjunto de tests no. Revisalo con tres preguntas: qué casos faltan que solo conoce quien sabe del negocio, cuáles sobran porque repiten lo mismo y cuál es la prioridad real de cada uno. Guardá el plan corregido en el repo. Es la especificación de lo que vas a pedir después, y deja registro de qué decidiste probar y qué no.',
          ],
        },
        {
          title: 'Un test por vez',
          body: [
            'Pedí un solo test del plan, indicando que use los roles y nombres que vio en la página. Correlo tres veces seguidas antes de pedir el siguiente. Generar de a uno parece lento, pero cada test que pasa confirma que las convenciones se entendieron, y cada fallo se corrige una vez en lugar de veinte. Cuando un test falle, mirá primero si el problema es del test o de la aplicación. Si el agente explora y el test falla igual, puede que haya encontrado un defecto de verdad.',
          ],
        },
        {
          title: 'Límites de seguridad',
          body: [
            'Dos reglas fijas. Primera: nunca producción ni credenciales reales. El agente puede hacer clic en cualquier cosa que vea, incluidos los botones de borrar y de pagar. Segunda: todo el texto de la página entra a su contexto, y eso incluye contenido escrito por terceros, como comentarios, nombres de usuario o descripciones de producto. Si alguien escribió ahí una instrucción, el agente puede intentar seguirla. Usá un entorno de prueba con datos controlados y revisá cualquier acción que no hayas pedido.',
          ],
        },
      ],
      en: [
        {
          title: 'Connect and confirm',
          body: [
            "Add the server to your agent with the command in the guide and, before asking for anything, list the available tools. The browser ones must show up: navigate, click, type, take a snapshot. If they don't, the agent will answer anyway, but from memory, and you'll believe it explored the page when it didn't. That ten-second check prevents the most common confusion. Then ask for something trivial, such as opening a URL and stating the title, to confirm the browser responds.",
          ],
        },
        {
          title: 'What the agent sees',
          body: [
            "It doesn't see a screenshot but an accessibility snapshot: a text tree with each element's role, its accessible name and its state. A button appears as a button with its label, a field as a textbox with its label. That has two consequences. First, the locators it proposes are based on roles and names, which are more stable than CSS classes. Second, a page with poor accessibility is as hard for it as for a screen reader, and that is already a finding.",
          ],
        },
        {
          title: 'Explore without writing code',
          body: [
            "Ask it to walk through a flow and report what it finds, with the explicit instruction not to write tests yet. The report should list elements by role, the states it observed, such as empty lists, errors or disabled elements, and whatever seemed odd. Read it the way you'd read the notes of someone using the product for the first time. It's useful for discovering states you hadn't thought of. It isn't useful as a bug list: the agent doesn't know your business rules.",
          ],
        },
        {
          title: 'A Markdown plan, corrected by you',
          body: [
            "With exploration done, ask for a test plan in Markdown based only on what was observed. A plan is cheap to correct and a set of tests isn't. Review it with three questions: which cases are missing that only someone who knows the business would know, which are redundant because they repeat the same thing, and what the real priority of each one is. Save the corrected plan in the repo. It's the specification of what you'll ask for next, and it records what you decided to test and what you didn't.",
          ],
        },
        {
          title: 'One test at a time',
          body: [
            'Ask for a single test from the plan, stating that it must use the roles and names it saw on the page. Run it three times in a row before asking for the next one. Generating one at a time looks slow, but each passing test confirms the conventions were understood, and each failure gets fixed once instead of twenty times. When a test fails, first check whether the problem is the test or the application. If the agent explored and the test still fails, it may have found a real defect.',
          ],
        },
        {
          title: 'Safety limits',
          body: [
            "Two fixed rules. First: never production or real credentials. The agent can click anything it sees, including delete and pay buttons. Second: all page text enters its context, and that includes content written by third parties, such as comments, user names or product descriptions. If someone wrote an instruction there, the agent may try to follow it. Use a test environment with controlled data and review any action you didn't ask for.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Una tester conecta el servidor y le pide al agente explorar una aplicación de lista de tareas. El reporte lista un campo de texto, una casilla por tarea, tres filtros y un contador. Marca dos sospechas: el contador dice "1 items left" con una sola tarea, y no hay forma visible de editar una tarea. La primera es un defecto de texto menor; la segunda no es un defecto, se edita con doble clic y el agente no lo descubrió. Ella corrige el plan agregando el caso de edición, pide el primer test, "agregar una tarea", y pasa tres veces. En veinte minutos tiene un plan revisado y un test confiable.',
      ],
      en: [
        'A tester connects the server and asks the agent to explore a to-do list application. The report lists a text field, a checkbox per task, three filters and a counter. It flags two suspicions: the counter says "1 items left" with a single task, and there is no visible way to edit a task. The first is a minor copy defect; the second isn\'t a defect, you edit by double-clicking and the agent didn\'t discover it. She corrects the plan by adding the edit case, asks for the first test, "add a task", and it passes three times. In twenty minutes she has a reviewed plan and a trustworthy test.',
      ],
    },
    mistakes: {
      es: [
        'Pedir tests antes de explorar y de tener un plan revisado.',
        'No comprobar que las herramientas de navegador estén cargadas.',
        'Tratar el reporte de exploración como una lista de bugs confirmados.',
        'Apuntar el agente a un entorno con datos o credenciales reales.',
      ],
      en: [
        'Asking for tests before exploring and having a reviewed plan.',
        'Not confirming that the browser tools are loaded.',
        'Treating the exploration report as a list of confirmed bugs.',
        'Pointing the agent at an environment with real data or credentials.',
      ],
    },
    checklist: {
      es: [
        'Las herramientas de navegador aparecen en la lista del agente.',
        'Hay un reporte de exploración con roles, estados y sospechas.',
        'El plan en Markdown está corregido y guardado en el repo.',
        'Un test generado pasó tres corridas seguidas.',
      ],
      en: [
        "The browser tools show up in the agent's list.",
        'There is an exploration report with roles, states and suspicions.',
        'The Markdown plan is corrected and saved in the repo.',
        'One generated test passed three runs in a row.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Esto reemplaza al testing exploratorio?',
          a: 'No. El agente recorre lo visible y describe lo que encuentra, pero no tiene tu intuición sobre dónde suele romperse el producto ni conoce las reglas. Sirve como primera pasada que te deja un mapa, para que tu sesión exploratoria empiece en lo interesante.',
        },
        {
          q: '¿Funciona con aplicaciones que requieren login?',
          a: 'Sí, con un usuario de prueba. Lo más ordenado es dejar la sesión iniciada mediante un estado guardado o un paso previo, sin pegar la contraseña en el chat. Las credenciales nunca deberían quedar escritas en la conversación ni en el plan.',
        },
        {
          q: '¿Por qué no usar capturas de pantalla?',
          a: 'Se puede, pero cuesta más tokens y produce locators peores, porque una imagen no dice qué rol tiene un elemento. El snapshot de accesibilidad es texto estructurado, más barato y directamente utilizable para escribir locators por rol.',
        },
      ],
      en: [
        {
          q: 'Does this replace exploratory testing?',
          a: "No. The agent walks through what's visible and describes what it finds, but it lacks your intuition about where the product tends to break and doesn't know the rules. It works as a first pass that leaves you a map, so your exploratory session starts at the interesting part.",
        },
        {
          q: 'Does it work with applications that require login?',
          a: 'Yes, with a test user. The tidiest way is to have the session already started through a saved state or a setup step, without pasting the password into the chat. Credentials should never end up written in the conversation or in the plan.',
        },
        {
          q: 'Why not use screenshots?',
          a: "You can, but it costs more tokens and yields worse locators, because an image doesn't say which role an element has. The accessibility snapshot is structured text, cheaper and directly usable for writing role-based locators.",
        },
      ],
    },
    slug: 'qa-ai-10-playwright-mcp',
    minutes: 6,
    tags: ['Playwright', 'MCP', 'AI Agents'],
    diagram:
      'QA    ──▶ agent   explore, no code\nagent ──▶ MCP     navigate / click / type\nMCP   ──▶ app     browser actions\nMCP   ◀── app     accessibility snapshot\nagent ◀── MCP     roles, names, states\nQA    ◀── agent   exploration report\nQA    ──▶ agent   plan, then one test\nQA    ◀── agent   specs plan + test file',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d10-light.webp',
      dark: '/publications/qa-ai/diagrams/d10-dark.webp',
      width: 1800,
      height: 851,
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
    intro: {
      es: [
        'Ayer el flujo de explorar, planear y generar lo armaste a mano, con prompts propios. Playwright trae ese mismo flujo empaquetado como tres agentes con responsabilidades separadas: uno planifica, otro genera y otro repara. La ventaja no es que sean más inteligentes, sino que cada uno tiene instrucciones acotadas y deja un artefacto que el siguiente usa.',
        'El riesgo también viene empaquetado. Un sistema que repara tests solo puede dejar la suite en verde por la razón equivocada. Esta guía recorre los tres agentes y marca los dos puntos donde una persona tiene que intervenir sí o sí: antes de generar y después de reparar. Sin esas dos revisiones, lo que ganás en velocidad lo perdés en confianza.',
      ],
      en: [
        "Yesterday you built the explore, plan and generate flow by hand, with your own prompts. Playwright ships that same flow packaged as three agents with separate responsibilities: one plans, one generates and one heals. The advantage isn't that they're smarter, but that each has narrow instructions and leaves an artifact the next one uses.",
        'The risk comes packaged too. A system that repairs tests on its own can leave the suite green for the wrong reason. This guide walks through the three agents and marks the two points where a person must step in no matter what: before generating and after healing. Without those two reviews, what you gain in speed you lose in trust.',
      ],
    },
    details: {
      es: [
        {
          title: 'Inicializar y commitear',
          body: [
            'El comando de inicialización genera las definiciones de los tres agentes para el bucle que uses, un test semilla, la carpeta de planes y la configuración del servidor MCP de tests. Commiteá todo eso junto. Las definiciones son instrucciones en texto: conviene leerlas una vez para entender qué va a hacer cada agente y con qué herramientas. Al estar en el repo, todo el equipo usa las mismas, y cualquier ajuste que hagas queda en el historial igual que un cambio de código.',
          ],
        },
        {
          title: 'El test semilla',
          body: [
            'El semilla es un test común que deja la aplicación en el estado desde el cual empiezan todos los flujos: sesión iniciada, datos mínimos cargados, pantalla inicial. Los agentes lo ejecutan antes de explorar o generar, así que también sirve como ejemplo de estilo: los tests generados tienden a parecerse a él. Escribilo con el mismo cuidado que tu mejor test. Si usa locators por rol y fixtures claras, lo que venga después hereda eso. Si es descuidado, también.',
          ],
        },
        {
          title: 'Planner y la primera intervención',
          body: [
            'El planner explora la aplicación a partir del semilla y escribe un plan en Markdown dentro de la carpeta de planes: escenarios, pasos y resultados esperados. Acá va la primera intervención humana, y es la más barata de toda la cadena. Leé el plan antes de generar nada. Sacá escenarios que no aportan, sumá los que dependen de reglas de negocio y corregí los resultados esperados que el planner supuso. Todo error que dejes pasar se multiplica en código.',
          ],
        },
        {
          title: 'Generator',
          body: [
            'El generator toma el plan aprobado y escribe los tests. La diferencia con un generador clásico es que verifica contra la página viva: ejecuta los pasos mientras escribe y comprueba que cada locator encuentra su elemento. Por eso el resultado suele correr a la primera. Aun así, revisá las aserciones. Un test puede navegar bien todo el flujo y terminar verificando algo trivial, como que la URL cambió, en lugar de la regla que el escenario quería probar.',
          ],
        },
        {
          title: 'Healer y la segunda intervención',
          body: [
            'Rompé un locator a propósito, por ejemplo cambiando el nombre de un botón, y corré el healer. Va a ejecutar el test, ver el fallo, inspeccionar la página y proponer una corrección. Acá va la segunda intervención: revisar el diff. Hay dos tipos de cambio. Actualizar un locator porque la interfaz cambió es mantenimiento legítimo. Modificar o quitar una aserción para que el test pase es ocultar un posible defecto. El primero se acepta; el segundo se rechaza y se investiga.',
          ],
        },
        {
          title: 'Regenerar en cada upgrade',
          body: [
            'Las definiciones de los agentes están atadas a la versión de Playwright: cambian las herramientas disponibles y las instrucciones. Cuando subas de versión, volvé a correr la inicialización en el mismo pull request y revisá qué cambió en las definiciones. Si les habías hecho ajustes propios, vas a tener que reaplicarlos, así que conviene documentarlos en un archivo aparte. Dejar definiciones viejas con una versión nueva produce fallos difíciles de diagnosticar.',
          ],
        },
      ],
      en: [
        {
          title: 'Initialize and commit',
          body: [
            "The init command generates the three agent definitions for the loop you use, a seed test, the plans folder and the test MCP server config. Commit all of that together. The definitions are instructions in text: it's worth reading them once to understand what each agent will do and with which tools. Being in the repo, the whole team uses the same ones, and any adjustment you make stays in history just like a code change.",
          ],
        },
        {
          title: 'The seed test',
          body: [
            "The seed is an ordinary test that leaves the application in the state every flow starts from: session started, minimum data loaded, initial screen. The agents run it before exploring or generating, so it also serves as a style example: generated tests tend to resemble it. Write it with the same care as your best test. If it uses role-based locators and clear fixtures, whatever comes next inherits that. If it's sloppy, that too.",
          ],
        },
        {
          title: 'Planner and the first intervention',
          body: [
            "The planner explores the application starting from the seed and writes a Markdown plan into the plans folder: scenarios, steps and expected results. This is the first human intervention, and it's the cheapest in the whole chain. Read the plan before generating anything. Remove scenarios that add nothing, add the ones that depend on business rules and fix expected results the planner assumed. Every error you let through gets multiplied in code.",
          ],
        },
        {
          title: 'Generator',
          body: [
            "The generator takes the approved plan and writes the tests. The difference from a classic generator is that it verifies against the live page: it executes the steps while writing and checks that each locator finds its element. That's why the result usually runs first time. Even so, review the assertions. A test can navigate the whole flow correctly and end up verifying something trivial, such as the URL having changed, instead of the rule the scenario meant to prove.",
          ],
        },
        {
          title: 'Healer and the second intervention',
          body: [
            'Break a locator on purpose, for example by renaming a button, and run the healer. It will run the test, see the failure, inspect the page and propose a fix. This is the second intervention: reviewing the diff. There are two kinds of change. Updating a locator because the interface changed is legitimate maintenance. Modifying or removing an assertion so the test passes is hiding a possible defect. The first gets accepted; the second gets rejected and investigated.',
          ],
        },
        {
          title: 'Regenerate on every upgrade',
          body: [
            "The agent definitions are tied to the Playwright version: available tools and instructions change. When you upgrade, rerun the initialization in the same pull request and review what changed in the definitions. If you had made your own adjustments, you'll have to reapply them, so it's worth documenting them in a separate file. Leaving old definitions with a new version produces failures that are hard to diagnose.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo prueba el flujo de alta de usuario. El planner propone nueve escenarios. En la revisión sacan dos repetidos y agregan uno que no podía saber: los mails de un dominio bloqueado deben rechazarse. El generator escribe ocho tests y siete pasan a la primera. Una semana después, un rediseño cambia el texto de un botón y fallan cuatro. El healer corrige los cuatro locators. En el diff, tres cambios son solo de locator. El cuarto además cambió una aserción de "muestra el error" a "el botón está visible". Rechazan ese cambio, investigan y descubren que el mensaje de error había desaparecido en el rediseño.',
      ],
      en: [
        'A team tests the user sign-up flow. The planner proposes nine scenarios. In review they remove two repeated ones and add one it couldn\'t know: emails from a blocked domain must be rejected. The generator writes eight tests and seven pass first time. A week later a redesign changes a button\'s text and four fail. The healer fixes the four locators. In the diff, three changes are locator-only. The fourth also changed an assertion from "shows the error" to "the button is visible". They reject that change, investigate and discover the error message had disappeared in the redesign.',
      ],
    },
    mistakes: {
      es: [
        'Generar tests sin haber leído y corregido el plan.',
        'Aceptar el resultado del healer porque la suite quedó en verde.',
        'Escribir un test semilla descuidado que después todos los tests imitan.',
        'Subir Playwright sin regenerar las definiciones de los agentes.',
      ],
      en: [
        'Generating tests without having read and corrected the plan.',
        "Accepting the healer's result because the suite turned green.",
        'Writing a sloppy seed test that every later test imitates.',
        'Upgrading Playwright without regenerating the agent definitions.',
      ],
    },
    checklist: {
      es: [
        'Las definiciones, el semilla y la configuración están commiteados.',
        'El plan fue revisado por una persona antes de generar.',
        'Cada test generado tiene una aserción que prueba una regla.',
        'El diff del healer se revisó separando locators de aserciones.',
      ],
      en: [
        'The definitions, the seed and the config are committed.',
        'The plan was reviewed by a person before generating.',
        'Each generated test has an assertion that proves a rule.',
        "The healer's diff was reviewed separating locators from assertions.",
      ],
    },
    faq: {
      es: [
        {
          q: '¿Puedo correr el healer automáticamente en CI?',
          a: 'Podés, siempre que su salida sea un pull request y no un commit directo. La reparación automática sin revisión es la forma más rápida de acumular tests que ya no prueban nada. El valor está en que proponga el arreglo, no en que lo apruebe.',
        },
        {
          q: '¿Cuántos escenarios conviene pedirle al planner?',
          a: 'Un flujo por vez. Pedir "toda la aplicación" produce planes largos que nadie revisa bien. Con un flujo, el plan entra en una pantalla y la revisión lleva minutos, que es lo que hace que la primera intervención realmente ocurra.',
        },
        {
          q: '¿Los tests generados quedan atados a los agentes?',
          a: 'No. Son tests de Playwright comunes, en tu repo, que corren con el runner de siempre. Podés dejar de usar los agentes y los tests siguen funcionando. Lo que sí queda atado a la versión son las definiciones.',
        },
      ],
      en: [
        {
          q: 'Can I run the healer automatically in CI?',
          a: 'You can, as long as its output is a pull request and not a direct commit. Automatic repair without review is the fastest way to pile up tests that no longer prove anything. The value is in it proposing the fix, not approving it.',
        },
        {
          q: 'How many scenarios should I ask the planner for?',
          a: 'One flow at a time. Asking for "the whole application" produces long plans nobody reviews well. With one flow, the plan fits on a screen and review takes minutes, which is what makes the first intervention really happen.',
        },
        {
          q: 'Do generated tests stay tied to the agents?',
          a: 'No. They are ordinary Playwright tests, in your repo, running with the usual runner. You can stop using the agents and the tests keep working. What does stay tied to the version are the definitions.',
        },
      ],
    },
    slug: 'qa-ai-11-playwright-test-agents',
    minutes: 6,
    tags: ['Playwright', 'AI Agents', 'Test Automation'],
    diagram:
      'seed.spec.ts ▶ Planner ▶ specs/plan.md\n                             ▼\n                  human review 1: the plan\n                             ▼ approved\n                         Generator ▶ tests/*.spec.ts ▶ run suite\n                                                          │ failing\n                                                          ▼\n                                                        Healer\n                                                          ▼\n                                             human review 2: the diff\n                                               ├─ locator fix       ▶ accept\n                                               └─ assertion changed ▶ reject',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d11-light.webp',
      dark: '/publications/qa-ai/diagrams/d11-dark.webp',
      width: 1800,
      height: 188,
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
    intro: {
      es: [
        'Un pipeline con cuarenta tests en rojo casi nunca tiene cuarenta problemas. Tiene dos o tres: un servicio caído, un cambio de interfaz y, con suerte, un defecto real. El trabajo de quien hace el triage es descubrir esa agrupación, y es un trabajo lento y repetitivo: abrir fallo por fallo, leer el error y reconocer que ya lo viste diez veces esa mañana.',
        'Agrupar texto parecido es algo que un LLM hace bien y rápido. Lo que no hace bien es admitir que no sabe. Esta guía arma un triage asistido que aprovecha lo primero y se protege de lo segundo: entrada estructurada y chica, salida con evidencia textual, una categoría "desconocido" obligatoria y una persona que confirma antes de cerrar nada.',
      ],
      en: [
        "A pipeline with forty red tests almost never has forty problems. It has two or three: a service that's down, an interface change and, with luck, a real defect. The job of whoever does triage is to discover that grouping, and it's slow, repetitive work: opening failure after failure, reading the error and recognizing you've already seen it ten times that morning.",
        'Grouping similar text is something an LLM does well and fast. What it doesn\'t do well is admit it doesn\'t know. This guide builds an assisted triage that uses the former and guards against the latter: small, structured input, output with textual evidence, a mandatory "unknown" category and a person who confirms before closing anything.',
      ],
    },
    details: {
      es: [
        {
          title: 'Resultados estructurados',
          body: [
            'El punto de partida es que tu runner emita los resultados en un formato que una máquina pueda leer, no solo un reporte HTML para personas. El reporter JSON de Playwright incluye para cada test su título, archivo, estado, error y reintentos. Activá también los traces en el primer reintento: son la evidencia que vas a necesitar para verificar lo que el modelo proponga. Sin datos estructurados terminás pegando logs enteros en un chat, que es caro, lento y mezcla ruido con señal.',
          ],
        },
        {
          title: 'Extraer solo lo necesario',
          body: [
            'Un script corto recorre el JSON y se queda con los tests fallidos: título, archivo y los primeros cuatrocientos caracteres del error. Ese recorte tiene dos efectos. Baja el costo, porque un log completo puede tener miles de líneas irrelevantes. Y mejora el resultado, porque la primera parte del mensaje suele contener lo que distingue una causa de otra: el tipo de error, el locator, el código HTTP. Con stack traces enteros, el modelo tiende a agrupar por coincidencias superficiales del stack.',
          ],
        },
        {
          title: 'El prompt de triage',
          body: [
            'Pedí tres cosas por grupo: una categoría de una lista cerrada, los tests que lo integran y la línea exacta del error que justifica la agrupación. La lista cerrada es importante: entorno, datos, cambio de interfaz, defecto probable y desconocido. La línea de evidencia tiene que ser una cita literal de la entrada, no una explicación. Así podés comprobar en segundos si el grupo tiene sentido, y un grupo cuya evidencia no aparece en los datos queda descartado de inmediato.',
          ],
        },
        {
          title: 'Verificar el grupo más grande',
          body: [
            'Antes de actuar sobre el resultado, abrí el trace de un test del grupo más grande. Mirá la línea de tiempo, las llamadas de red y la captura del momento del fallo. Si la causa propuesta coincide con lo que ves, el grupo queda confirmado y probablemente resolviste la mayor parte del pipeline en rojo. Si no coincide, tomá el resultado completo con más cautela. Esa verificación lleva pocos minutos y es la que convierte una sugerencia en un diagnóstico.',
          ],
        },
        {
          title: 'Guardar cada triage',
          body: [
            'Guardá la entrada, la salida del modelo y tu veredicto final en un archivo por corrida. Parece burocracia y es lo más valioso del proceso. En pocas semanas tenés decenas de casos reales etiquetados por alguien que conoce el sistema: exactamente el dataset que hace falta para evaluar el prompt de triage con el método del día ocho. También vas a ver patrones que un día suelto no muestra, como un test que cae siempre en la categoría de entorno.',
          ],
        },
        {
          title: 'El cierre es humano',
          body: [
            'El modelo propone grupos y causas; una persona confirma antes de poner un test en cuarentena, abrir un bug o reintentar el pipeline. La razón es de costo del error. Cuarentenar por error un test que detectaba un defecto real deja pasar ese defecto. Abrir veinte bugs duplicados le quita credibilidad a QA. Automatizar la propuesta ahorra la parte tediosa; automatizar la decisión traslada el riesgo a un sistema que no responde por ella.',
          ],
        },
      ],
      en: [
        {
          title: 'Structured results',
          body: [
            "The starting point is having your runner emit results in a format a machine can read, not just an HTML report for people. Playwright's JSON reporter includes each test's title, file, status, error and retries. Also enable traces on first retry: they are the evidence you'll need to verify whatever the model proposes. Without structured data you end up pasting whole logs into a chat, which is expensive, slow and mixes noise with signal.",
          ],
        },
        {
          title: "Extract only what's needed",
          body: [
            'A short script walks the JSON and keeps the failed tests: title, file and the first four hundred characters of the error. That trimming has two effects. It lowers cost, because a full log can hold thousands of irrelevant lines. And it improves the result, because the first part of the message usually holds what tells one cause from another: the error type, the locator, the HTTP code. With full stack traces, the model tends to group by superficial stack matches.',
          ],
        },
        {
          title: 'The triage prompt',
          body: [
            "Ask for three things per group: a category from a closed list, the tests in it and the exact error line justifying the grouping. The closed list matters: environment, data, interface change, probable defect and unknown. The evidence line must be a literal quote from the input, not an explanation. That way you can check in seconds whether the group makes sense, and a group whose evidence doesn't appear in the data gets discarded immediately.",
          ],
        },
        {
          title: 'Verify the largest group',
          body: [
            "Before acting on the result, open the trace of one test from the largest group. Look at the timeline, the network calls and the screenshot at the moment of failure. If the proposed cause matches what you see, the group is confirmed and you've probably resolved most of the red pipeline. If it doesn't match, treat the whole result with more caution. That check takes a few minutes and is what turns a suggestion into a diagnosis.",
          ],
        },
        {
          title: 'Save every triage',
          body: [
            "Save the input, the model's output and your final verdict in one file per run. It looks like bureaucracy and it's the most valuable part of the process. In a few weeks you have dozens of real cases labeled by someone who knows the system: exactly the dataset needed to evaluate the triage prompt with the day eight method. You'll also see patterns a single day doesn't show, such as a test that always lands in the environment category.",
          ],
        },
        {
          title: 'Closure is human',
          body: [
            "The model proposes groups and causes; a person confirms before quarantining a test, filing a bug or retrying the pipeline. The reason is the cost of error. Wrongly quarantining a test that was catching a real defect lets that defect through. Filing twenty duplicate bugs costs QA its credibility. Automating the proposal saves the tedious part; automating the decision moves the risk to a system that doesn't answer for it.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un lunes el pipeline nocturno muestra cuarenta y dos fallos. El script extrae los cuarenta y dos errores recortados y el prompt devuelve cuatro grupos. Treinta y uno comparten la línea de un error 503 del servicio de autenticación: entorno. Siete tienen un timeout esperando un botón cuyo nombre cambió: cambio de interfaz. Tres muestran un total distinto del esperado en el carrito: defecto probable. Uno queda como desconocido. La QA abre un trace del primer grupo y confirma el 503. Reintenta el pipeline cuando el servicio vuelve, actualiza un locator y abre un solo bug con tres tests como evidencia. El caso desconocido resulta ser un dato de prueba vencido.',
      ],
      en: [
        'On a Monday the nightly pipeline shows forty-two failures. The script extracts the forty-two trimmed errors and the prompt returns four groups. Thirty-one share the line of a 503 error from the authentication service: environment. Seven have a timeout waiting for a button whose name changed: interface change. Three show a cart total different from the expected one: probable defect. One stays as unknown. The QA opens a trace from the first group and confirms the 503. She retries the pipeline once the service is back, updates one locator and files a single bug with three tests as evidence. The unknown case turns out to be expired test data.',
      ],
    },
    mistakes: {
      es: [
        'Pegar el log completo en lugar de los errores recortados.',
        'No ofrecer la categoría desconocido y obtener causas inventadas.',
        'Aceptar la explicación del modelo sin abrir ningún trace.',
        'Automatizar la cuarentena o la creación de bugs sin confirmación.',
      ],
      en: [
        'Pasting the full log instead of the trimmed errors.',
        'Not offering the unknown category and getting invented causes.',
        "Accepting the model's explanation without opening any trace.",
        'Automating quarantine or bug filing without confirmation.',
      ],
    },
    checklist: {
      es: [
        'El runner emite JSON y guarda traces en los reintentos.',
        'El script extrae título, archivo y error recortado de cada fallo.',
        'Cada grupo trae una línea de evidencia literal.',
        'El triage quedó guardado con tu veredicto final.',
      ],
      en: [
        'The runner emits JSON and keeps traces on retries.',
        'The script extracts title, file and trimmed error for each failure.',
        'Each group comes with a literal evidence line.',
        'The triage is saved with your final verdict.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Y si los errores incluyen datos sensibles?',
          a: 'Revisá qué contienen antes de enviarlos. Los mensajes de error pueden traer mails, tokens o identificadores de clientes. Filtralos en el script de extracción o usá un modelo local para esta tarea. El recorte a cuatrocientos caracteres ayuda, pero no reemplaza al filtro.',
        },
        {
          q: '¿Sirve con pocos fallos?',
          a: 'Con tres o cuatro fallos, leerlos lleva menos que armar el flujo. El triage asistido rinde cuando hay decenas, o cuando lo corrés todos los días y querés que el registro acumulado te muestre tendencias.',
        },
        {
          q: '¿Puede detectar tests flaky?',
          a: 'Puede sugerirlo si le pasás el historial de reintentos, pero la señal confiable es estadística: un test que falla y pasa sin cambios de código en varias corridas. Usá esos datos del runner y dejá al modelo la tarea de agrupar por causa.',
        },
      ],
      en: [
        {
          q: 'What if the errors include sensitive data?',
          a: "Check what they contain before sending them. Error messages can carry emails, tokens or customer identifiers. Filter them in the extraction script or use a local model for this task. Trimming to four hundred characters helps, but doesn't replace the filter.",
        },
        {
          q: 'Does it help with few failures?',
          a: 'With three or four failures, reading them takes less than setting up the flow. Assisted triage pays off when there are dozens, or when you run it every day and want the accumulated record to show you trends.',
        },
        {
          q: 'Can it detect flaky tests?',
          a: 'It can suggest it if you pass the retry history, but the reliable signal is statistical: a test that fails and passes with no code changes across several runs. Use that runner data and leave the model the task of grouping by cause.',
        },
      ],
    },
    slug: 'qa-ai-12-failure-triage-with-llms',
    minutes: 7,
    tags: ['CI/CD', 'Playwright', 'LLM'],
    diagram:
      'CI run ▶ results.json + traces ▶ extract failures only\n                                        ▼\n                    LLM: group by root cause + evidence line\n        ┌────────────┬──────────────┬────────────┬─────────┐\n   product bug    test bug     environment     flaky    unknown\n        └────────────┴──────┬───────┴────────────┴─────────┘\n                            ▼\n          human verifies the largest group in a trace\n                            ▼\n                 labeled triage history (dataset)',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d12-light.webp',
      dark: '/publications/qa-ai/diagrams/d12-dark.webp',
      width: 1612,
      height: 1382,
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
    intro: {
      es: [
        'TDD siempre tuvo un costo de disciplina: escribir el test antes cuando la solución ya está en tu cabeza cuesta. Con un agente que escribe la implementación en segundos, la tentación se invierte. Lo fácil es pedir "implementá esta función con sus tests" y recibir todo junto, con tests que pasan porque fueron escritos mirando el código que tenían que verificar.',
        'El ciclo rojo, verde, refactor ordena esa relación con una regla de autoría: el test es tuyo y la implementación es del agente. El test se vuelve la especificación ejecutable y también el control de calidad de lo que el agente produce. Esta guía recorre el ciclo completo con una función chica, para que el hábito quede antes de aplicarlo a algo grande.',
      ],
      en: [
        'TDD always had a discipline cost: writing the test first when the solution is already in your head is hard. With an agent that writes the implementation in seconds, the temptation flips. The easy thing is to ask "implement this function with its tests" and get everything together, with tests that pass because they were written while looking at the code they had to verify.',
        "The red, green, refactor cycle orders that relationship with an authorship rule: the test is yours and the implementation is the agent's. The test becomes the executable specification and also the quality control for what the agent produces. This guide walks the full cycle with a small function, so the habit sticks before you apply it to something big.",
      ],
    },
    details: {
      es: [
        {
          title: 'Rojo: un test, escrito por vos',
          body: [
            'Escribí un solo test que describa un comportamiento concreto, con un nombre que se lea como una regla de negocio. Uno solo, no la suite completa. Al escribirlo tomás decisiones de diseño que no conviene delegar: cómo se llama la función, qué recibe, qué devuelve y qué pasa con una entrada inválida. Ese es el trabajo de pensar. Si le pedís el test al agente, esas decisiones las toma él, y después vas a estar revisando una especificación que no escribiste.',
          ],
        },
        {
          title: 'Fallar por la razón correcta',
          body: [
            'Corré el test y leé el mensaje. Tiene que fallar porque la función no existe o porque devuelve otra cosa, no por un error de import, de configuración o de sintaxis. Es un paso que se saltea con frecuencia y que evita un problema clásico: un test que nunca pudo fallar por la razón que importa. Si el mensaje de error es confuso, mejoralo ahora. Ese mismo mensaje es lo que el agente va a leer para saber qué tiene que construir.',
          ],
        },
        {
          title: 'Verde: lo mínimo, sin tocar tests',
          body: [
            'Pedile al agente el código mínimo para pasar ese test, con dos instrucciones explícitas: no modificar archivos de test y no agregar nada que el test no pida. La palabra mínimo importa. Sin ella vas a recibir validaciones, casos y parámetros opcionales que nadie especificó y que ningún test cubre. Es código que parece útil y que queda sin dueño: nadie sabe si funciona ni si debería existir. Si después hace falta, lo agregás con su propio test.',
          ],
        },
        {
          title: 'Verificar el verde vos',
          body: [
            'Corré el comando vos y mirá el resultado. Después revisá el diff. En este ejercicio solo debería haber cambiado el archivo de implementación. Si cambió el test, la configuración o apareció un archivo nuevo, preguntate por qué antes de seguir. Son treinta segundos que sostienen todo el método: el verde vale porque lo produjo un test que el agente no pudo ajustar y porque lo comprobaste por fuera de su resumen.',
          ],
        },
        {
          title: 'Refactor con la red puesta',
          body: [
            'Con el test en verde, pedí una mejora de legibilidad sin cambio de comportamiento: nombres más claros, una constante en lugar de un número suelto, una función extraída. Volvé a correr los tests. Este es el paso donde el agente aporta más con menos riesgo, porque cualquier error lo detecta el test al instante. Commiteá al terminar. Si el refactor rompe algo y no es evidente por qué, descartarlo cuesta un comando, y volvés a un estado conocido.',
          ],
        },
        {
          title: 'Un ciclo, un commit',
          body: [
            'Repetí el ciclo con el segundo y el tercer comportamiento, y hacé un commit por ciclo. El historial queda como una secuencia de reglas agregadas de a una, cada una con su test y su implementación. Eso sirve para revisar y para auditar: quien lea el historial puede ver qué se pidió, qué se construyó y en qué orden. También te da puntos de retorno baratos si un ciclo sale mal, algo que con cambios grandes generados de una vez no tenés.',
          ],
        },
      ],
      en: [
        {
          title: 'Red: one test, written by you',
          body: [
            "Write a single test describing a concrete behavior, with a name that reads like a business rule. One only, not the full suite. While writing it you make design decisions that shouldn't be delegated: what the function is called, what it takes, what it returns and what happens with invalid input. That is the thinking work. If you ask the agent for the test, it makes those decisions, and afterwards you'll be reviewing a specification you didn't write.",
          ],
        },
        {
          title: 'Failing for the right reason',
          body: [
            "Run the test and read the message. It must fail because the function doesn't exist or returns something else, not because of an import, configuration or syntax error. It's a step often skipped and it prevents a classic problem: a test that could never fail for the reason that matters. If the error message is confusing, improve it now. That same message is what the agent will read to know what it has to build.",
          ],
        },
        {
          title: 'Green: the minimum, without touching tests',
          body: [
            "Ask the agent for the minimum code to pass that test, with two explicit instructions: don't modify test files and don't add anything the test doesn't ask for. The word minimum matters. Without it you'll receive validations, cases and optional parameters nobody specified and no test covers. It's code that looks useful and ends up ownerless: nobody knows whether it works or whether it should exist. If it's needed later, you add it with its own test.",
          ],
        },
        {
          title: 'Verify the green yourself',
          body: [
            "Run the command yourself and look at the result. Then review the diff. In this exercise only the implementation file should have changed. If the test changed, or the config, or a new file appeared, ask yourself why before going on. Those thirty seconds hold up the whole method: the green counts because it came from a test the agent couldn't adjust and because you confirmed it outside its summary.",
          ],
        },
        {
          title: 'Refactor with the net in place',
          body: [
            "With the test green, ask for a readability improvement with no change in behavior: clearer names, a constant instead of a loose number, an extracted function. Run the tests again. This is the step where the agent contributes the most with the least risk, because any error is caught by the test instantly. Commit when done. If the refactor breaks something and it isn't obvious why, discarding it costs one command, and you're back to a known state.",
          ],
        },
        {
          title: 'One cycle, one commit',
          body: [
            "Repeat the cycle with the second and third behaviors, and make one commit per cycle. The history becomes a sequence of rules added one at a time, each with its test and its implementation. That helps with reviewing and auditing: whoever reads the history can see what was asked, what was built and in what order. It also gives you cheap return points if a cycle goes wrong, something you don't have with large changes generated all at once.",
          ],
        },
      ],
    },
    example: {
      es: [
        'La función a construir aplica descuentos. Primer test, escrito a mano: un cupón del diez por ciento sobre cien devuelve noventa. Falla porque la función no existe. El agente escribe cuatro líneas y el test pasa; el diff toca un solo archivo. Refactor: extrae el cálculo del porcentaje. Commit. Segundo test: un descuento mayor al cien por ciento lanza un error. El agente agrega la validación. Tercer test: el resultado se redondea a dos decimales. En el segundo ciclo, el agente había sumado además soporte para cupones de monto fijo que nadie pidió. Se quita, porque ningún test lo exige. Quedan tres commits y tres reglas.',
      ],
      en: [
        "The function to build applies discounts. First test, written by hand: a ten percent coupon on one hundred returns ninety. It fails because the function doesn't exist. The agent writes four lines and the test passes; the diff touches a single file. Refactor: it extracts the percentage calculation. Commit. Second test: a discount above one hundred percent throws an error. The agent adds the validation. Third test: the result is rounded to two decimals. In the second cycle the agent had also added support for fixed-amount coupons nobody asked for. It gets removed, because no test demands it. Three commits and three rules remain.",
      ],
    },
    mistakes: {
      es: [
        'Pedir implementación y tests en el mismo pedido.',
        'No comprobar que el test falla antes de implementar.',
        'Dejar código extra que ningún test exige.',
        'Juntar varios ciclos en un solo commit.',
      ],
      en: [
        'Asking for implementation and tests in the same request.',
        'Not confirming the test fails before implementing.',
        'Leaving extra code no test demands.',
        'Squashing several cycles into a single commit.',
      ],
    },
    checklist: {
      es: [
        'Cada test fue escrito por vos antes que su implementación.',
        'Viste cada test fallar por la razón esperada.',
        'Ningún diff de implementación tocó archivos de test.',
        'El historial tiene un commit por ciclo.',
      ],
      en: [
        'Each test was written by you before its implementation.',
        'You saw each test fail for the expected reason.',
        'No implementation diff touched test files.',
        'The history has one commit per cycle.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿No es más lento que pedir todo de una vez?',
          a: 'En el momento, sí. En total, no. El código generado de una vez se revisa entero y sin una especificación contra la cual compararlo. Con ciclos chicos, cada revisión lleva segundos y el test ya dice qué es correcto.',
        },
        {
          q: '¿Puedo pedirle ideas de tests al agente?',
          a: 'Sí, como lista de casos a considerar, igual que con las user stories del día cinco. Lo que no conviene delegar es la escritura del test que define el comportamiento, porque ahí están las decisiones de diseño y el control sobre lo que se construye.',
        },
        {
          q: '¿Funciona en código existente sin tests?',
          a: 'Empezá por un test de caracterización: uno que fije el comportamiento actual, lo quieras o no. Con esa red podés pedir cambios en ciclos. Sin ninguna red, el agente modifica código cuyo comportamiento nadie puede verificar.',
        },
      ],
      en: [
        {
          q: "Isn't it slower than asking for everything at once?",
          a: 'In the moment, yes. Overall, no. Code generated in one go is reviewed whole and with no specification to compare it against. With small cycles each review takes seconds and the test already says what is correct.',
        },
        {
          q: 'Can I ask the agent for test ideas?',
          a: "Yes, as a list of cases to consider, just as with the user stories on day five. What shouldn't be delegated is writing the test that defines the behavior, because that's where the design decisions and the control over what gets built live.",
        },
        {
          q: 'Does it work on existing code without tests?',
          a: 'Start with a characterization test: one that pins current behavior, whether you like it or not. With that net you can request changes in cycles. With no net at all, the agent modifies code whose behavior nobody can verify.',
        },
      ],
    },
    slug: 'qa-ai-13-tdd-with-ai-red-green-refactor',
    minutes: 7,
    tags: ['TDD', 'AI Agents', 'Vitest'],
    diagram:
      'RED: human writes one test\n   ▼\nfails for the right reason? ── no ──▶ fix the test setup\n   │ yes\n   ▼\nGREEN: agent writes minimal code\n   ▼\ntests pass and only src changed? ── no ──▶ back to the agent\n   │ yes\n   ▼\nREFACTOR: agent improves, tests stay green ▶ commit ▶ next test',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d13-light.webp',
      dark: '/publications/qa-ai/diagrams/d13-dark.webp',
      width: 1800,
      height: 337,
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
    intro: {
      es: [
        'Ayer el ciclo funcionó porque vos estabas mirando cada paso. En cuanto el agente trabaja más tiempo solo, aparece un problema conocido: su objetivo operativo es que los tests pasen, y hay varias formas de lograrlo sin que el código sea correcto. Puede editar el test, devolver justo el valor esperado, desactivar el caso molesto o simular la misma unidad que se suponía bajo prueba.',
        'No es malicia. Es optimización hacia la métrica que le diste. La respuesta no es vigilarlo más sino hacer que cada atajo sea imposible o visible. Esta guía empareja cinco trampas con cinco controles automáticos y los lleva al pipeline, de modo que la confianza en el verde no dependa de que alguien revise cada diff con lupa.',
      ],
      en: [
        'Yesterday the cycle worked because you were watching every step. As soon as the agent works longer on its own, a known problem appears: its operating goal is for tests to pass, and there are several ways to achieve that without the code being correct. It can edit the test, return exactly the expected value, disable the annoying case or mock the very unit that was supposed to be under test.',
        "It isn't malice. It's optimization toward the metric you gave it. The answer isn't watching it more closely but making every shortcut impossible or visible. This guide pairs five cheats with five automatic controls and takes them into the pipeline, so that trust in green doesn't depend on someone reviewing every diff with a magnifying glass.",
      ],
    },
    details: {
      es: [
        {
          title: 'Tests de solo lectura',
          body: [
            'El control más directo es que el agente no pueda escribir en los archivos de test. Casi todos los agentes de código permiten reglas de permisos por ruta: denegá la edición de los patrones de test y dejá libre la carpeta de implementación. Con eso, la trampa más frecuente deja de ser posible en lugar de depender de una instrucción en lenguaje natural. Una instrucción como "no toques los tests" se cumple casi siempre; un permiso denegado se cumple siempre. Cuando haga falta cambiar un test, lo hace una persona.',
          ],
        },
        {
          title: 'El guard en CI',
          body: [
            'Los permisos locales protegen tu sesión, no las de todo el equipo. Por eso se suma un chequeo en el pipeline: si un pull request marcado como de implementación modifica archivos de test, falla. Es un script de pocas líneas que compara la lista de archivos cambiados contra un patrón. La idea de fondo es separar los cambios de especificación de los cambios de implementación. Un PR que toca las dos cosas no está prohibido, pero pasa a necesitar una revisión humana explícita.',
          ],
        },
        {
          title: 'Property tests fuera del contexto',
          body: [
            'Un test con ejemplos fijos se puede satisfacer con un `if` que devuelva el valor esperado. Un property test no: genera cientos de entradas y verifica una propiedad general, por ejemplo que el total con descuento nunca supera al original ni es negativo. Escribí uno por función crítica y mantenelo fuera de lo que el agente lee, como un conjunto de validación apartado. Corre en CI, no en su sesión. Si la implementación solo memorizó los ejemplos, falla ahí.',
          ],
        },
        {
          title: 'Lint contra tests desactivados',
          body: [
            'Agregar `.skip` a un test que falla o dejar un `.only` que hace que el resto no corra son cambios de una palabra que pasan desapercibidos en un diff largo. Una regla de lint los detecta sin esfuerzo y de forma determinista. Activala como error, no como advertencia, y corré el lint en el pipeline. Si tu equipo necesita desactivar un test temporalmente, que sea con un mecanismo distinto que exija un comentario con el motivo y un ticket asociado.',
          ],
        },
        {
          title: 'Mutation testing sobre lo tocado',
          body: [
            'Cobertura alta no significa que los tests verifiquen algo. Mutation testing lo mide directamente: introduce cambios chicos en el código, como invertir una condición o cambiar un operador, y comprueba si algún test falla. Si el mutante sobrevive, ese comportamiento no está protegido. Correrlo sobre todo el proyecto es lento, así que limitalo a los archivos que cambió el PR. Mirá los mutantes sobrevivientes en la lógica de negocio: cada uno es un test que falta o una aserción débil.',
          ],
        },
        {
          title: 'Todo en el pipeline',
          body: [
            'Los cinco controles valen cuando bloquean. Sumalos como pasos obligatorios: el guard de archivos, el lint, la suite normal, los property tests apartados y mutation testing con un umbral mínimo para los archivos tocados. Si alguno falla, el PR no se mergea. Ordená los pasos del más rápido al más lento para que los errores baratos aparezcan primero. El resultado es que el verde vuelve a significar algo, lo haya escrito una persona o un agente.',
          ],
        },
      ],
      en: [
        {
          title: 'Read-only tests',
          body: [
            'The most direct control is that the agent can\'t write to test files. Almost every coding agent supports path-based permission rules: deny edits to the test patterns and leave the implementation folder open. With that, the most frequent cheat stops being possible instead of depending on a natural-language instruction. An instruction such as "don\'t touch the tests" is followed almost always; a denied permission is followed always. When a test needs to change, a person does it.',
          ],
        },
        {
          title: 'The CI guard',
          body: [
            "Local permissions protect your session, not the whole team's. That's why you add a check in the pipeline: if a pull request labeled as implementation modifies test files, it fails. It's a script of a few lines comparing the list of changed files against a pattern. The underlying idea is to separate specification changes from implementation changes. A PR touching both isn't forbidden, but it now requires an explicit human review.",
          ],
        },
        {
          title: 'Property tests out of context',
          body: [
            "A test with fixed examples can be satisfied by an `if` returning the expected value. A property test can't: it generates hundreds of inputs and checks a general property, for example that the discounted total never exceeds the original and is never negative. Write one per critical function and keep it out of what the agent reads, as a held-out validation set. It runs in CI, not in the agent's session. If the implementation only memorized the examples, it fails there.",
          ],
        },
        {
          title: 'Lint against disabled tests',
          body: [
            'Adding `.skip` to a failing test or leaving an `.only` that stops the rest from running are one-word changes that go unnoticed in a long diff. A lint rule catches them effortlessly and deterministically. Enable it as an error, not a warning, and run lint in the pipeline. If your team needs to disable a test temporarily, do it through a different mechanism that requires a comment with the reason and a linked ticket.',
          ],
        },
        {
          title: 'Mutation testing on what was touched',
          body: [
            "High coverage doesn't mean tests verify anything. Mutation testing measures that directly: it introduces small changes in the code, such as flipping a condition or swapping an operator, and checks whether any test fails. If the mutant survives, that behavior isn't protected. Running it across the whole project is slow, so limit it to the files the PR changed. Look at surviving mutants in business logic: each one is a missing test or a weak assertion.",
          ],
        },
        {
          title: 'Everything in the pipeline',
          body: [
            "The five controls count when they block. Add them as required steps: the file guard, lint, the normal suite, the held-out property tests and mutation testing with a minimum threshold for touched files. If any fails, the PR doesn't merge. Order the steps from fastest to slowest so cheap errors show up first. The result is that green means something again, whether a person or an agent wrote the code.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un agente trabaja una hora sobre un módulo de precios y entrega un PR con todos los tests en verde y cobertura del noventa y cinco por ciento. El pipeline con guardrails cuenta otra historia. El guard de archivos pasa. El lint encuentra un `.skip` agregado a un test de redondeo. El property test apartado falla con un precio de cero. Mutation testing muestra que sobrevive la mitad de los mutantes en la función de impuestos: los tests la ejecutaban sin verificar el resultado. Tres hallazgos que una revisión rápida del diff no habría visto. El PR vuelve con tres pedidos concretos.',
      ],
      en: [
        "An agent works for an hour on a pricing module and delivers a PR with all tests green and ninety-five percent coverage. The pipeline with guardrails tells a different story. The file guard passes. Lint finds a `.skip` added to a rounding test. The held-out property test fails on a price of zero. Mutation testing shows half the mutants in the tax function survive: the tests executed it without verifying the result. Three findings a quick diff review wouldn't have seen. The PR goes back with three concrete requests.",
      ],
    },
    mistakes: {
      es: [
        'Confiar en una instrucción en texto en lugar de un permiso denegado.',
        'Medir la calidad de los tests solo con cobertura.',
        'Dejar los property tests al alcance del agente.',
        'Tener los controles como advertencias que no bloquean el merge.',
      ],
      en: [
        'Relying on a text instruction instead of a denied permission.',
        'Measuring test quality with coverage alone.',
        "Leaving property tests within the agent's reach.",
        "Having the controls as warnings that don't block the merge.",
      ],
    },
    checklist: {
      es: [
        'El agente no puede editar archivos de test.',
        'El pipeline falla si un PR de implementación toca tests.',
        'Hay un property test apartado por cada función crítica.',
        'Mutation testing corre sobre los archivos tocados con un umbral.',
      ],
      en: [
        "The agent can't edit test files.",
        'The pipeline fails if an implementation PR touches tests.',
        'There is a held-out property test per critical function.',
        'Mutation testing runs on touched files with a threshold.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Mutation testing no es demasiado lento?',
          a: 'Sobre todo el proyecto puede serlo. Limitado a los archivos que cambió el PR suele tardar pocos minutos. También podés correrlo completo una vez por semana, de forma programada, para ver la tendencia sin frenar el trabajo diario.',
        },
        {
          q: '¿Qué umbral de mutation score conviene?',
          a: 'Empezá midiendo el valor actual y no permitas que baje. Subilo de a poco en los módulos con lógica de negocio. Un número alto exigido de golpe solo consigue que el equipo desactive el control.',
        },
        {
          q: '¿Estos controles sirven sin agentes?',
          a: 'Sí. Las mismas cinco trampas las comete una persona apurada. La diferencia es de volumen: un agente produce más código por hora, así que la falta de controles se nota antes.',
        },
      ],
      en: [
        {
          q: "Isn't mutation testing too slow?",
          a: 'Across the whole project it can be. Limited to the files the PR changed, it usually takes a few minutes. You can also run it in full once a week, on a schedule, to see the trend without slowing daily work.',
        },
        {
          q: 'Which mutation score threshold makes sense?',
          a: "Start by measuring the current value and don't let it drop. Raise it gradually in modules with business logic. A high number demanded all at once only gets the team to disable the control.",
        },
        {
          q: 'Do these controls help without agents?',
          a: 'Yes. A person in a hurry commits the same five cheats. The difference is volume: an agent produces more code per hour, so missing controls show sooner.',
        },
      ],
    },
    slug: 'qa-ai-14-tdd-with-ai-guardrails',
    minutes: 7,
    tags: ['TDD', 'Mutation Testing', 'AI Agents'],
    diagram:
      'agent PR\n   ▼\ntests untouched? ───────────────── no ──▶ block\n   ▼ yes\nlint: no skip / only? ──────────── no ──▶ block\n   ▼ yes\nholdout property tests pass? ───── no ──▶ block\n   ▼ yes\nmutation score above threshold? ── no ──▶ block\n   ▼ yes\nhuman review and merge',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d14-light.webp',
      dark: '/publications/qa-ai/diagrams/d14-dark.webp',
      width: 1076,
      height: 2712,
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
];
