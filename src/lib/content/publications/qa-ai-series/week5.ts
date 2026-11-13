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
    intro: {
      es: [
        'Un eval que corre solo cuando alguien se acuerda termina sin correr. La forma de que la calidad de una funcionalidad con IA se sostenga en el tiempo es la misma que para el resto del software: un gate en el pipeline que bloquea el cambio cuando algo empeora. Lo que cambia son las restricciones. Los evals cuestan dinero por corrida, tardan más que un test unitario y su resultado varía.',
        'Meter todos los evals en cada pull request vuelve el pipeline lento y caro, y el equipo termina salteándolo. No meter ninguno deja pasar regresiones. Esta guía organiza los evals en tres niveles, por PR, nocturno y por release, cada uno con un alcance, un costo y una consecuencia distintos, y muestra cómo mantener el gasto bajo control.',
      ],
      en: [
        'An eval that runs only when someone remembers ends up not running. The way to sustain the quality of an AI feature over time is the same as for the rest of software: a gate in the pipeline that blocks the change when something gets worse. What changes are the constraints. Evals cost money per run, take longer than a unit test and their result varies.',
        'Putting every eval on every pull request makes the pipeline slow and expensive, and the team ends up skipping it. Putting in none lets regressions through. This guide organizes evals into three tiers, per PR, nightly and per release, each with a different scope, cost and consequence, and shows how to keep spending under control.',
      ],
    },
    details: {
      es: [
        {
          title: 'El nivel de PR',
          body: [
            'Es un subconjunto chico y rápido, pensado para dar una respuesta en pocos minutos. Corre solo cuando el cambio toca prompts, configuración de evals o código que llama al modelo. Para un cambio de estilos en el frontend no tiene sentido gastar tokens. Incluí los chequeos deterministas de formato y contenido, y un conjunto reducido de casos con pocas repeticiones. Su función no es medir la calidad con precisión, sino atrapar las roturas evidentes antes del merge.',
          ],
        },
        {
          title: 'El código de salida como gate',
          body: [
            'El mecanismo es el mismo de cualquier test. El comando de evaluación termina con un código distinto de cero cuando hay casos fallidos, y el pipeline marca el paso en rojo. Con eso alcanza para bloquear el merge mediante las reglas de protección de la rama. No hace falta construir nada especial. Sí hay que verificar que funciona: forzá un fallo a propósito en una rama de prueba y confirmá que el pull request queda bloqueado.',
          ],
        },
        {
          title: 'Artefactos siempre, también en fallo',
          body: [
            'Configurá el paso que guarda los resultados para que se ejecute aunque el eval falle. Es un detalle de configuración que se olvida seguido, y entonces el pipeline queda en rojo sin ninguna información sobre qué caso falló ni qué respondió el modelo. El artefacto tiene que incluir entradas, salidas y veredictos por caso. Con ese archivo, quien abrió el PR puede diagnosticar en minutos sin volver a correr todo en su máquina.',
          ],
        },
        {
          title: 'Controlar el costo',
          body: [
            'Hay cuatro palancas. Filtros por ruta, para no correr evals en cambios que no los afectan. Caché de respuestas, para no pagar dos veces por la misma entrada con el mismo prompt. Un subconjunto en el nivel de PR en lugar del conjunto completo. Y una clave de API exclusiva de CI con tope de gasto, de modo que un error de configuración o un bucle no consuman el presupuesto del mes. Publicá el gasto de cada corrida junto al resultado.',
          ],
        },
        {
          title: 'El nivel nocturno',
          body: [
            'Una vez por día, con el conjunto de test completo, cinco repeticiones, el juez calibrado y el red teaming. Acá sí se mide con precisión. El resultado no bloquea un PR en particular: alerta al equipo y alimenta un gráfico de tendencia. Es donde vas a detectar los problemas que ningún PR introdujo, como una actualización silenciosa del proveedor o una degradación gradual. Como corre de noche, el tiempo y el costo son más tolerables.',
          ],
        },
        {
          title: 'El nivel de release',
          body: [
            'Antes de publicar corren la regresión completa y las pruebas de performance. La diferencia con los otros niveles es quién decide. Acá el resultado es un reporte que una persona lee y firma. Los gates automáticos cubren lo que se puede expresar como umbral. La decisión de salir con una métrica en el límite o con un riesgo conocido es un juicio de negocio, y alguien tiene que hacerse responsable de ella con la información delante.',
          ],
        },
      ],
      en: [
        {
          title: 'The PR tier',
          body: [
            "It's a small, fast subset designed to answer within a few minutes. It runs only when the change touches prompts, eval config or code that calls the model. For a frontend style change, spending tokens makes no sense. Include the deterministic format and content checks, and a reduced set of cases with few repetitions. Its job isn't measuring quality precisely, but catching obvious breakage before the merge.",
          ],
        },
        {
          title: 'The exit code as the gate',
          body: [
            "The mechanism is the same as for any test. The eval command ends with a non-zero code when cases fail, and the pipeline marks the step red. That's enough to block the merge through branch protection rules. Nothing special needs building. You do need to verify it works: force a failure on purpose on a test branch and confirm the pull request ends up blocked.",
          ],
        },
        {
          title: 'Artifacts always, on failure too',
          body: [
            "Configure the step that saves results to run even when the eval fails. It's a config detail often forgotten, and then the pipeline goes red with no information about which case failed or what the model answered. The artifact must include inputs, outputs and verdicts per case. With that file, whoever opened the PR can diagnose in minutes without rerunning everything on their machine.",
          ],
        },
        {
          title: 'Controlling cost',
          body: [
            "There are four levers. Path filters, so evals don't run on changes that don't affect them. Response caching, so you don't pay twice for the same input with the same prompt. A subset at the PR tier instead of the full set. And a CI-only API key with a spending cap, so a config error or a loop doesn't consume the month's budget. Publish each run's spend next to the result.",
          ],
        },
        {
          title: 'The nightly tier',
          body: [
            "Once a day, with the full test set, five repetitions, the calibrated judge and red teaming. This is where you measure precisely. The result doesn't block a particular PR: it alerts the team and feeds a trend chart. It's where you'll detect problems no PR introduced, such as a silent provider update or gradual degradation. Since it runs at night, time and cost are more tolerable.",
          ],
        },
        {
          title: 'The release tier',
          body: [
            'Before shipping, full regression and performance tests run. The difference from the other tiers is who decides. Here the result is a report a person reads and signs. Automatic gates cover what can be expressed as a threshold. The decision to ship with a metric at the limit or with a known risk is a business judgment, and someone has to take responsibility for it with the information in front of them.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo arma los tres niveles. El de PR corre quince casos con tres repeticiones, solo ante cambios en las carpetas de prompts y evals, y tarda cuatro minutos. La primera semana bloquea un pull request donde un cambio de redacción rompía el formato JSON en dos casos. El autor abre el artefacto, ve las dos salidas y lo corrige en diez minutos. El nivel nocturno corre ciento veinte casos con cinco repeticiones. Un martes, la tasa de aprobación cae cuatro puntos sin que hubiera ningún PR mergeado. La ficha de corrida muestra que el modelo que respondió no era el esperado, por un alias sin fijar que nadie había notado.',
      ],
      en: [
        "A team sets up the three tiers. The PR one runs fifteen cases with three repetitions, only on changes to the prompts and evals folders, and takes four minutes. In the first week it blocks a pull request where a wording change broke the JSON format in two cases. The author opens the artifact, sees the two outputs and fixes it in ten minutes. The nightly tier runs one hundred and twenty cases with five repetitions. One Tuesday the pass rate drops four points with no PR merged. The run card shows the model that answered wasn't the expected one, because of an unpinned alias nobody had noticed.",
      ],
    },
    mistakes: {
      es: [
        'Correr el conjunto completo en cada pull request.',
        'No guardar artefactos cuando el eval falla.',
        'Usar en CI una clave de API sin tope de gasto.',
        'Tratar un verde aislado como prueba de que la calidad se mantiene.',
      ],
      en: [
        'Running the full set on every pull request.',
        'Not saving artifacts when the eval fails.',
        'Using an API key with no spending cap in CI.',
        'Treating a single green as proof that quality holds.',
      ],
    },
    checklist: {
      es: [
        'El nivel de PR corre solo ante cambios relevantes y en pocos minutos.',
        'Un fallo forzado bloquea el merge.',
        'Los resultados se guardan como artefacto también cuando falla.',
        'Existe un nivel nocturno con tendencia y una clave con tope.',
      ],
      en: [
        'The PR tier runs only on relevant changes and within minutes.',
        'A forced failure blocks the merge.',
        'Results are saved as an artifact on failure too.',
        'A nightly tier with a trend and a capped key exists.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Qué hago con un eval que a veces pasa y a veces falla en PR?',
          a: 'Primero mirá si el caso es inestable por diseño, y entonces va al nivel nocturno con repeticiones, o si el umbral del nivel de PR es demasiado exigente para tan pocas corridas. Un gate que falla al azar pierde la confianza del equipo muy rápido.',
        },
        {
          q: '¿Sirve con cualquier sistema de CI?',
          a: 'Sí. Lo único que se necesita es correr un comando, leer su código de salida, filtrar por rutas y guardar archivos. La guía trae ejemplos para dos sistemas, y la misma estructura se traslada al resto.',
        },
        {
          q: '¿Quién mira el nivel nocturno?',
          a: 'Tiene que tener un dueño con nombre. Una alerta que llega a un canal donde nadie responde equivale a no tener alerta. Definí quién la revisa cada mañana y qué hace cuando la tendencia baja.',
        },
      ],
      en: [
        {
          q: 'What do I do with an eval that sometimes passes and sometimes fails on PRs?',
          a: "First check whether the case is unstable by design, in which case it goes to the nightly tier with repetitions, or whether the PR tier's threshold is too demanding for so few runs. A gate that fails at random loses the team's trust very fast.",
        },
        {
          q: 'Does it work with any CI system?',
          a: 'Yes. All you need is to run a command, read its exit code, filter by paths and save files. The guide carries examples for two systems, and the same structure carries over to the rest.',
        },
        {
          q: 'Who watches the nightly tier?',
          a: 'It must have a named owner. An alert landing in a channel where nobody answers is the same as having no alert. Define who reviews it every morning and what they do when the trend drops.',
        },
      ],
    },
    slug: 'qa-ai-28-evals-in-ci-quality-gates',
    minutes: 7,
    tags: ['CI/CD', 'Evals', 'DevOps'],
    diagram:
      'pull request touching prompts / evals / AI code\n   ▼\nPR tier: dev subset x3 ▶ exit code 0?\n                           ├─ no  ▶ merge blocked + artifact\n                           └─ yes ▶ merge\n                                      ▼\n            nightly: full test set x5 + judge + red team ▶ trend + alert\n                                      ▼\n            release: regression + performance ▶ human sign-off ▶ production',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d28-light.webp',
      dark: '/publications/qa-ai/diagrams/d28-dark.webp',
      width: 1800,
      height: 176,
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
    intro: {
      es: [
        'Los evals, los agentes y las pruebas de seguridad de los últimos días corren sobre algo: runners, contenedores, modelos, claves y datos. Esa infraestructura rara vez se diseña. Se va armando con lo que hay, y un día el pipeline cuesta el triple, un resultado no se puede reproducir o una clave aparece en un log.',
        'Las decisiones de infraestructura para QA con IA son pocas y tienen consecuencias largas. Dónde corre el modelo define el costo y la privacidad. Cómo son los runners define la reproducibilidad. Dónde trabaja un agente define cuánto daño puede causar un error. Esta guía recorre esas decisiones con una regla práctica para cada una, y con dos métricas que casi nadie publica y que conviene tener desde el primer día: tokens y gasto por corrida.',
      ],
      en: [
        "The evals, agents and security tests from the last few days run on something: runners, containers, models, keys and data. That infrastructure is rarely designed. It gets assembled from whatever is at hand, and one day the pipeline costs three times as much, a result can't be reproduced or a key shows up in a log.",
        'Infrastructure decisions for QA with AI are few and have long consequences. Where the model runs defines cost and privacy. What runners are like defines reproducibility. Where an agent works defines how much damage a mistake can cause. This guide walks through those decisions with a practical rule for each, and with two metrics almost nobody publishes that are worth having from day one: tokens and spend per run.',
      ],
    },
    details: {
      es: [
        {
          title: 'Dónde corre el modelo',
          body: [
            'Hay dos opciones, y lo habitual es combinarlas. Un modelo local, levantado como servicio dentro del runner, no cuesta por token y no saca datos de tu infraestructura, pero es más lento y menos capaz. Una API en la nube ofrece modelos más capaces, cobra por uso y recibe tus datos. La regla que mejor funciona es asignar cada trabajo al modelo más barato que lo resuelve: chequeos de humo y de formato con el modelo local, evals con juez con un modelo más capaz. Medí antes de asumir que el chico alcanza.',
          ],
        },
        {
          title: 'Runners efímeros',
          body: [
            'Un runner efímero arranca limpio en cada corrida: un contenedor nuevo, sin archivos, cachés ni procesos de la corrida anterior. Los runners persistentes acumulan estado, como una dependencia instalada a mano, un archivo temporal o un modelo que alguien actualizó. Ese estado hace que el mismo commit dé resultados distintos según en qué máquina cayó. Con modelos, que ya aportan su propia variación, sumar la del entorno hace imposible saber qué cambió. Efímero siempre, con las versiones fijadas en la imagen.',
          ],
        },
        {
          title: 'Sandbox para agentes',
          body: [
            'Si un agente ejecuta comandos dentro del pipeline, por ejemplo para reparar un test o investigar un fallo, tiene que hacerlo en un entorno aislado: un contenedor sin credenciales de producción, con el sistema de archivos limitado al repositorio y con la salida de red restringida a los destinos necesarios. El agente lee contenido que puede traer instrucciones maliciosas, como vimos en el día veinticuatro. El sandbox garantiza que, si una de esas instrucciones tiene efecto, no haya nada valioso a su alcance.',
          ],
        },
        {
          title: 'Secretos',
          body: [
            'Usá una clave de API por entorno: una para desarrollo, otra para CI y otra para producción. Cada una con los permisos mínimos y con un tope de gasto. Así una clave filtrada o un bucle descontrolado en CI no afectan a producción ni agotan el presupuesto general. Guardalas en el gestor de secretos del sistema de CI, nunca en el repositorio. Y verificá de forma activa que no aparezcan en los logs ni en los artefactos, porque algunas herramientas imprimen la configuración completa al fallar.',
          ],
        },
        {
          title: 'El costo como métrica',
          body: [
            'Publicá en cada corrida los tokens consumidos y el gasto, al lado de la tasa de aprobación. Lo que no se mide crece. Un dataset que se duplica, un juez que se agrega o una repetición más son todos cambios razonables que nadie suma. Con el número a la vista, cada cambio muestra su costo y el equipo puede decidir si vale la pena. También permite detectar anomalías: una corrida que cuesta diez veces lo habitual suele indicar un error, no más trabajo.',
          ],
        },
        {
          title: 'Reproducibilidad',
          body: [
            'Dos cosas hacen reproducible una corrida. La primera es fijar versiones: las herramientas mediante el lockfile y la imagen del contenedor, y los modelos mediante su identificador exacto. La segunda es archivar los resultados con su ficha de corrida, la del día quince, durante un tiempo definido. Cuando alguien pregunte por qué un resultado cambió entre dos fechas, vas a poder comparar qué versión de cada cosa se usó en cada una, en lugar de intentar recordarlo.',
          ],
        },
      ],
      en: [
        {
          title: 'Where the model runs',
          body: [
            "There are two options, and the usual thing is to combine them. A local model, started as a service inside the runner, has no per-token cost and takes no data out of your infrastructure, but it's slower and less capable. A cloud API offers more capable models, charges per use and receives your data. The rule that works best is assigning each job to the cheapest model that solves it: smoke and format checks with the local model, judged evals with a more capable one. Measure before assuming the small one is enough.",
          ],
        },
        {
          title: 'Ephemeral runners',
          body: [
            "An ephemeral runner starts clean on every run: a new container, with no files, caches or processes from the previous run. Persistent runners accumulate state, such as a dependency installed by hand, a temporary file or a model someone updated. That state makes the same commit give different results depending on which machine it landed on. With models, which already bring their own variation, adding the environment's makes it impossible to know what changed. Always ephemeral, with versions pinned in the image.",
          ],
        },
        {
          title: 'Sandbox for agents',
          body: [
            'If an agent executes commands inside the pipeline, for example to repair a test or investigate a failure, it must do so in an isolated environment: a container with no production credentials, with the file system limited to the repository and with network egress restricted to the necessary destinations. The agent reads content that may carry malicious instructions, as we saw on day twenty-four. The sandbox guarantees that, if one of those instructions takes effect, nothing valuable is within its reach.',
          ],
        },
        {
          title: 'Secrets',
          body: [
            "Use one API key per environment: one for development, one for CI and one for production. Each with least privilege and a spending cap. That way a leaked key or a runaway loop in CI affects neither production nor the overall budget. Store them in the CI system's secrets manager, never in the repository. And actively verify they don't show up in logs or artifacts, because some tools print the full configuration when they fail.",
          ],
        },
        {
          title: 'Cost as a metric',
          body: [
            "Publish tokens consumed and spend on every run, next to the pass rate. What isn't measured grows. A dataset that doubles, a judge that gets added or one more repetition are all reasonable changes nobody adds up. With the number in view, each change shows its cost and the team can decide whether it's worth it. It also lets you detect anomalies: a run costing ten times the usual tends to indicate an error, not more work.",
          ],
        },
        {
          title: 'Reproducibility',
          body: [
            "Two things make a run reproducible. The first is pinning versions: tools through the lockfile and the container image, and models through their exact identifier. The second is archiving results with their run card, the one from day fifteen, for a defined period. When someone asks why a result changed between two dates, you'll be able to compare which version of each thing was used on each, instead of trying to remember.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo revisa su pipeline de evals después de un mes con gastos más altos de lo previsto. Al publicar los tokens por corrida, descubren que el chequeo de formato, que corre en cada pull request, usa el modelo más caro. Lo pasan a un modelo local levantado como servicio en el runner. El formato se valida igual, y ese paso deja de tener costo. Los evals con juez siguen en la nube. Encuentran además que dos de sus tres runners eran persistentes y tenían versiones distintas de una herramienta, lo que explicaba resultados diferentes para el mismo commit. Los reemplazan por contenedores efímeros con la imagen fijada.',
      ],
      en: [
        'A team reviews its eval pipeline after a month with higher spending than planned. On publishing tokens per run, they discover the format check, which runs on every pull request, uses the most expensive model. They move it to a local model started as a service on the runner. Format is validated just the same, and that step stops costing anything. Judged evals stay in the cloud. They also find that two of their three runners were persistent and had different versions of a tool, which explained different results for the same commit. They replace them with ephemeral containers with a pinned image.',
      ],
    },
    mistakes: {
      es: [
        'Usar el modelo más caro para chequeos que resuelve uno local.',
        'Mantener runners persistentes con estado acumulado.',
        'Dejar que un agente corra en CI con credenciales de producción.',
        'Compartir una sola clave de API entre todos los entornos.',
      ],
      en: [
        'Using the most expensive model for checks a local one handles.',
        'Keeping persistent runners with accumulated state.',
        'Letting an agent run in CI with production credentials.',
        'Sharing a single API key across all environments.',
      ],
    },
    checklist: {
      es: [
        'Cada tipo de eval tiene asignado un modelo, con su justificación.',
        'Los runners son efímeros y la imagen fija las versiones.',
        'Los agentes corren en un sandbox sin credenciales de producción.',
        'Cada corrida publica tokens y gasto junto al resultado.',
      ],
      en: [
        'Each type of eval has an assigned model, with its justification.',
        'Runners are ephemeral and the image pins versions.',
        'Agents run in a sandbox with no production credentials.',
        'Each run publishes tokens and spend next to the result.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Un modelo local en CI no hace más lento el pipeline?',
          a: 'La descarga del modelo es lo que más tarda. Se resuelve incluyéndolo en la imagen del runner o guardándolo en caché. Después, para chequeos de formato con respuestas cortas, el tiempo es aceptable incluso sin GPU.',
        },
        {
          q: '¿Qué datos puedo usar en CI?',
          a: 'Sintéticos o anonimizados. Los datos de producción no deberían llegar a un pipeline ni enviarse a un proveedor externo desde ahí. El día seis cubre cómo generarlos y el diecisiete, cómo anonimizar casos reales.',
        },
        {
          q: '¿Conviene alojar modelos grandes en infraestructura propia?',
          a: 'Solo si el volumen o los requisitos de privacidad lo justifican. Operar GPUs tiene un costo fijo y exige experiencia. Para la mayoría de los equipos de QA, un modelo local chico más una API con tope de gasto es la combinación más simple.',
        },
      ],
      en: [
        {
          q: "Doesn't a local model in CI make the pipeline slower?",
          a: "Downloading the model is what takes longest. It's solved by including it in the runner image or caching it. After that, for format checks with short answers, the time is acceptable even without a GPU.",
        },
        {
          q: 'Which data can I use in CI?',
          a: "Synthetic or anonymized. Production data shouldn't reach a pipeline or be sent to an external provider from there. Day six covers how to generate it and day seventeen, how to anonymize real cases.",
        },
        {
          q: 'Is it worth hosting large models on your own infrastructure?',
          a: 'Only if volume or privacy requirements justify it. Operating GPUs has a fixed cost and demands expertise. For most QA teams, a small local model plus an API with a spending cap is the simplest combination.',
        },
      ],
    },
    slug: 'qa-ai-29-qa-infra-for-ai',
    minutes: 7,
    tags: ['Infra', 'CI/CD', 'SRE'],
    diagram:
      'ephemeral runner\n   ├─ agent sandbox: no prod credentials, limited egress\n   ├─ local model service: smoke + format evals\n   └─ test and eval runners ◀── secrets manager (per-environment key + spend cap)\n            │               ◀── synthetic / anonymized datasets\n            ├─▶ cloud model: judged evals\n            └─▶ artifacts: results + run card + tokens and cost\n                     ▼\n            trend: pass rate and cost per run',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d29-light.webp',
      dark: '/publications/qa-ai/diagrams/d29-dark.webp',
      width: 1800,
      height: 904,
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
    intro: {
      es: [
        'Todo lo que probaste antes del release describe cómo se comportaba el sistema con tus casos, en tu entorno, ese día. En producción llegan entradas que nadie imaginó, el proveedor actualiza el modelo, los documentos cambian y los usuarios encuentran usos nuevos. Un sistema con IA puede degradarse sin que nadie haya hecho un deploy.',
        'Por eso la calidad en estos sistemas no termina en el gate. Sigue en producción, con las mismas preguntas y otros instrumentos: trazas en lugar de reportes, evals sobre tráfico real en lugar de datasets, alertas en lugar de umbrales de CI. Esta guía arma ese circuito y lo cierra, de modo que cada fallo encontrado en producción vuelva como un caso de prueba y no se repita.',
      ],
      en: [
        'Everything you tested before release describes how the system behaved with your cases, in your environment, on that day. In production, inputs nobody imagined arrive, the provider updates the model, documents change and users find new uses. An AI system can degrade without anyone having deployed anything.',
        "That's why quality in these systems doesn't end at the gate. It continues in production, with the same questions and different instruments: traces instead of reports, evals on real traffic instead of datasets, alerts instead of CI thresholds. This guide builds that circuit and closes it, so that every failure found in production comes back as a test case and doesn't repeat.",
      ],
    },
    details: {
      es: [
        {
          title: 'Un span por llamada al modelo',
          body: [
            'Instrumentá cada llamada al modelo como un span que registre qué modelo se pidió y cuál respondió, la versión del prompt, los tokens de entrada y de salida, la latencia y el resultado. Las convenciones de OpenTelemetry para IA generativa definen nombres estándar para esos atributos. Usarlas evita inventar un esquema propio y permite cambiar de herramienta de observabilidad sin reinstrumentar. Las llamadas a herramientas y las búsquedas de un RAG van como spans hijos, para poder ver la cadena completa de una respuesta.',
          ],
        },
        {
          title: 'Qué se guarda y por cuánto tiempo',
          body: [
            'Los prompts y las respuestas pueden contener datos personales, y una traza completa los guarda en texto plano. Decidí de forma explícita qué se almacena. Las opciones son enmascarar los campos sensibles antes de guardar, guardar el contenido completo solo de una muestra, o conservar solo los metadatos por defecto. Definí además un plazo de retención y quién tiene acceso. Es una decisión para tomar junto con seguridad y legales, y conviene tomarla antes de instrumentar.',
          ],
        },
        {
          title: 'Evals en línea',
          body: [
            'Los mismos scorers que usás en CI pueden correr sobre el tráfico real. Los chequeos deterministas, de formato, campos obligatorios y largos, son baratos y se aplican a todas las respuestas. El juez cuesta tokens, así que se aplica a una muestra. El resultado es una tasa de aprobación continua sobre lo que los usuarios reciben de verdad. Es la señal que te avisa de una degradación que ningún dataset podía anticipar, porque sale de entradas que no tenías.',
          ],
        },
        {
          title: 'Cuatro indicadores con alerta',
          body: [
            'Definí cuatro indicadores, cada uno con su objetivo y su alerta. Calidad: la tasa de aprobación de los evals en línea. Latencia: el tiempo al primer token en el percentil noventa y cinco. Errores: límites de cuota, errores del servidor y timeouts. Costo: el gasto por hora contra el presupuesto diario. Las alertas se configuran sobre tendencia sostenida, no sobre un caso aislado. Con un sistema que varía por naturaleza, alertar por cada respuesta mala genera ruido hasta que nadie mira.',
          ],
        },
        {
          title: 'Cerrar el circuito',
          body: [
            'Cada fallo encontrado en producción, por una alerta, por un eval en línea o por el reclamo de un usuario, se anonimiza y se suma al conjunto de regresión. Este paso convierte la observabilidad en mejora. Sin él, el mismo tipo de fallo vuelve con el próximo cambio de prompt. Con él, tu dataset se va pareciendo cada vez más al uso real. Asigná un responsable y una frecuencia: revisar los fallos de la semana y decidir cuáles entran.',
          ],
        },
        {
          title: 'El plan de rollback',
          body: [
            'Tené escrito cómo se vuelve atrás antes de necesitarlo. Requiere tres cosas: la versión del prompt y la del modelo fijadas y registradas, la versión anterior todavía disponible, y un flag que permita volver sin hacer un deploy. Probá el rollback una vez, en un entorno de prueba. Un plan que nunca se ejecutó suele fallar en el peor momento. Cuando la alerta de calidad se dispare, la primera acción tiene que ser volver a un estado conocido, y el análisis viene después.',
          ],
        },
      ],
      en: [
        {
          title: 'One span per model call',
          body: [
            "Instrument every model call as a span recording which model was requested and which one answered, the prompt version, input and output tokens, latency and outcome. The OpenTelemetry conventions for generative AI define standard names for those attributes. Using them avoids inventing your own schema and lets you change observability tools without re-instrumenting. Tool calls and a RAG's searches go as child spans, so you can see the full chain behind an answer.",
          ],
        },
        {
          title: 'What gets stored and for how long',
          body: [
            "Prompts and responses can contain personal data, and a full trace stores them in plain text. Decide explicitly what gets stored. The options are masking sensitive fields before saving, storing full content only for a sample, or keeping only metadata by default. Also define a retention period and who has access. It's a decision to make together with security and legal, and it's best made before instrumenting.",
          ],
        },
        {
          title: 'Online evals',
          body: [
            "The same scorers you use in CI can run on real traffic. Deterministic checks, for format, required fields and lengths, are cheap and apply to every response. The judge costs tokens, so it applies to a sample. The result is a continuous pass rate on what users really receive. It's the signal that warns you of a degradation no dataset could anticipate, because it comes from inputs you didn't have.",
          ],
        },
        {
          title: 'Four indicators with alerts',
          body: [
            'Define four indicators, each with its target and its alert. Quality: the pass rate of online evals. Latency: time to first token at the ninety-fifth percentile. Errors: quota limits, server errors and timeouts. Cost: hourly spend against the daily budget. Alerts are configured on sustained trend, not on an isolated case. With a system that varies by nature, alerting on every bad response generates noise until nobody looks.',
          ],
        },
        {
          title: 'Closing the loop',
          body: [
            "Every failure found in production, through an alert, an online eval or a user complaint, gets anonymized and added to the regression set. This step turns observability into improvement. Without it, the same kind of failure returns with the next prompt change. With it, your dataset looks more and more like real usage. Assign an owner and a cadence: review the week's failures and decide which ones go in.",
          ],
        },
        {
          title: 'The rollback plan',
          body: [
            'Have it written down how to go back before you need it. It requires three things: the prompt and model versions pinned and recorded, the previous version still available, and a flag that lets you go back without a deploy. Try the rollback once, in a test environment. A plan that was never executed tends to fail at the worst moment. When the quality alert fires, the first action must be returning to a known state, and analysis comes afterwards.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un asistente de soporte lleva dos meses en producción con trazas y evals en línea. Un jueves, la tasa de aprobación del juez sobre la muestra baja de forma sostenida durante tres horas, sin ningún deploy. Salta la alerta de calidad. Las trazas muestran que el modelo que responde tiene un identificador distinto del de la semana anterior: el alias que usaban apuntó a una versión nueva. Activan el flag para volver a la versión fijada anterior y la tasa se recupera. Después anonimizan doce conversaciones fallidas, las suman a regresión y corren el eval completo contra la versión nueva antes de decidir si la adoptan.',
      ],
      en: [
        "A support assistant has been in production for two months with traces and online evals. One Thursday, the judge's pass rate on the sample drops steadily for three hours, with no deploy. The quality alert fires. Traces show the model answering has a different identifier from last week's: the alias they used pointed to a new version. They flip the flag back to the previous pinned version and the rate recovers. Then they anonymize twelve failed conversations, add them to regression and run the full eval against the new version before deciding whether to adopt it.",
      ],
    },
    mistakes: {
      es: [
        'Guardar prompts y respuestas completos sin enmascarar ni definir retención.',
        'Alertar por cada respuesta fallida en lugar de por tendencia.',
        'Registrar solo el modelo pedido y no el que respondió.',
        'No sumar los fallos de producción al conjunto de regresión.',
      ],
      en: [
        'Storing full prompts and responses with no masking or retention policy.',
        'Alerting on every failed response instead of on trend.',
        'Recording only the requested model and not the one that answered.',
        'Not adding production failures to the regression set.',
      ],
    },
    checklist: {
      es: [
        'Cada llamada al modelo genera un span con modelo, versión de prompt y tokens.',
        'Hay una política escrita de enmascarado, muestreo y retención.',
        'Los evals en línea corren con chequeos deterministas y juez sobre muestra.',
        'El rollback por flag se probó al menos una vez.',
      ],
      en: [
        'Each model call generates a span with model, prompt version and tokens.',
        'There is a written policy for masking, sampling and retention.',
        'Online evals run with deterministic checks and a judge on a sample.',
        'The flag-based rollback was tried at least once.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Qué porcentaje del tráfico conviene pasar por el juez?',
          a: 'El que tu presupuesto permita y alcance para ver una tendencia en pocas horas. Empezá con una muestra chica y subila si el indicador resulta demasiado ruidoso. Los chequeos deterministas, en cambio, van sobre todo el tráfico.',
        },
        {
          q: '¿Necesito una herramienta específica de observabilidad para LLM?',
          a: 'Ayuda, porque muestra prompts, respuestas y costos de forma cómoda. Pero si instrumentás con convenciones estándar, podés empezar con la herramienta de trazas que ya uses y cambiar después sin tocar el código.',
        },
        {
          q: '¿Cómo distingo una degradación real del ruido?',
          a: 'Con ventanas de tiempo y comparación contra la línea de base, igual que en el día dieciocho. Una caída que se sostiene durante varias ventanas consecutivas y supera la variación habitual es una señal. Un punto bajo aislado, no.',
        },
      ],
      en: [
        {
          q: 'What share of traffic should go through the judge?',
          a: 'Whatever your budget allows and is enough to see a trend within a few hours. Start with a small sample and raise it if the indicator turns out too noisy. Deterministic checks, on the other hand, go on all traffic.',
        },
        {
          q: 'Do I need an LLM-specific observability tool?',
          a: 'It helps, because it shows prompts, responses and costs conveniently. But if you instrument with standard conventions, you can start with the tracing tool you already use and switch later without touching code.',
        },
        {
          q: 'How do I tell real degradation from noise?',
          a: "With time windows and comparison against the baseline, just as on day eighteen. A drop that holds across several consecutive windows and exceeds usual variation is a signal. A single low point isn't.",
        },
      ],
    },
    slug: 'qa-ai-30-llm-observability-in-production',
    minutes: 7,
    tags: ['Observability', 'SRE', 'LLM'],
    diagram:
      'app with LLM feature\n   ▼\ntraces: model · prompt version · tokens · latency · tool calls\n   ▼\nmask / sample personal data ▶ trace store\n   ▼\nonline evals: checks on all traffic, judge on a sample\n   ├─▶ SLIs: quality · latency · errors · cost ▶ sustained breach? ▶ alert + rollback via flag\n   └─▶ failed traces, anonymized ▶ regression set ▶ CI evals',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d30-light.webp',
      dark: '/publications/qa-ai/diagrams/d30-dark.webp',
      width: 1800,
      height: 246,
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
    intro: {
      es: [
        'Durante treinta días viste piezas sueltas: una regla para delegar, un eval, un agente configurado, un modelo de amenazas, una prueba de carga, un gate. Cada una resuelve un problema concreto. El valor mayor aparece cuando se conectan, porque ahí dejan de ser experimentos y pasan a ser un sistema de calidad para software que usa IA.',
        'Este último día no agrega herramientas. Arma el mapa completo, te pide una evaluación honesta de qué tenés funcionando de verdad y te ayuda a elegir qué construir primero. La serie no pretende que implementes las doce piezas. Pretende que sepas cuáles le importan a tu producto, en qué orden, y que dentro de tres meses puedas mostrar evidencia de haber avanzado.',
      ],
      en: [
        "For thirty days you saw separate pieces: a rule for delegating, an eval, a configured agent, a threat model, a load test, a gate. Each solves a concrete problem. The greater value appears when they connect, because that's where they stop being experiments and become a quality system for software that uses AI.",
        "This last day adds no tools. It assembles the full map, asks you for an honest assessment of what you really have working and helps you choose what to build first. The series doesn't expect you to implement all twelve pieces. It expects you to know which ones matter to your product, in what order, and to be able to show evidence of progress three months from now.",
      ],
    },
    details: {
      es: [
        {
          title: 'El recorrido completo',
          body: [
            'Seguí un cambio de punta a punta sobre el diagrama. Entra por el repositorio, escrito por una persona o por un agente que trabaja con reglas y permisos. Pasa por los tests deterministas y los guardrails. Si toca algo relacionado con un modelo, pasa por los evals con su dataset y su juez calibrado. Antes del release, por seguridad y por performance. En producción sigue medido con trazas y evals en línea, y cada fallo vuelve al conjunto de regresión. El circuito cerrado es lo que hace que el sistema mejore con el uso.',
          ],
        },
        {
          title: 'Un checklist honesto',
          body: [
            'Completá el checklist de doce piezas con una regla estricta: una pieza cuenta solo si corre en un repositorio y alguien la usa. Haberla leído, haberla visto en un video o haberla probado una tarde no cuenta. La regla incomoda, y por eso sirve. La mayoría de los equipos descubre que tiene dos o tres piezas reales y varias a medio hacer. No es un mal resultado. Es un punto de partida preciso, y es lo que necesitás para planificar sin engañarte.',
          ],
        },
        {
          title: 'Tres piezas, por riesgo',
          body: [
            'De las que faltan, elegí tres y ordenalas según el riesgo de tu producto, no según lo que te resulte más interesante. Si tu sistema tiene un agente con herramientas y no hay tests de inyección, eso va antes que optimizar costos. Si una funcionalidad con un modelo está en producción sin ningún eval, eso va primero. Preguntate qué fallo te haría más daño mañana y qué pieza lo habría detectado. Esa es la primera.',
          ],
        },
        {
          title: 'Un plan de noventa días',
          body: [
            'Asigná una pieza por mes, cada una con un entregable verificable. "Aprender sobre evals" no es un entregable. "Un eval de treinta casos para el clasificador, corriendo en el pipeline de PR" sí. Un mes por pieza parece lento. Es realista si lo hacés junto con tu trabajo habitual. Poné las fechas en el calendario y contale el plan a alguien de tu equipo. Un compromiso que conoce otra persona se cumple bastante más que uno privado.',
          ],
        },
        {
          title: 'Publicar evidencia',
          body: [
            'A medida que termines cada pieza, dejala visible. Un repositorio con un README que explique qué mide cada parte y cómo correrla. Un caso escrito con tus propios números: qué problema había, qué mediste, qué decidiste y qué pasó después. Usá datos propios o sintéticos, nunca información de un cliente. Esa evidencia sirve dentro de tu equipo, para que otros adopten lo que armaste, y hacia afuera, porque muestra criterio aplicado y no solo conocimiento de herramientas.',
          ],
        },
        {
          title: 'Volver a la matriz',
          body: [
            'Abrí la matriz de habilidades del día dos y actualizala con lo que hiciste en este mes. Las filas que estaban en cero o en uno deberían tener ahora evidencia enlazada. Poné una fecha para repetir la autoevaluación dentro de tres meses, al terminar el plan. Las herramientas concretas de esta serie van a cambiar, algunas en pocos meses. Lo que se mantiene es el método: definir qué es correcto, medirlo de forma repetible y decidir con datos.',
          ],
        },
      ],
      en: [
        {
          title: 'The full journey',
          body: [
            'Follow a change end to end on the diagram. It enters through the repository, written by a person or by an agent working with rules and permissions. It goes through deterministic tests and guardrails. If it touches anything related to a model, it goes through evals with their dataset and calibrated judge. Before release, through security and performance. In production it stays measured with traces and online evals, and every failure returns to the regression set. The closed loop is what makes the system improve with use.',
          ],
        },
        {
          title: 'An honest checklist',
          body: [
            "Fill in the twelve-piece checklist with a strict rule: a piece counts only if it runs in a repository and someone uses it. Having read about it, seen it in a video or tried it one afternoon doesn't count. The rule is uncomfortable, and that's why it works. Most teams discover they have two or three real pieces and several half done. That isn't a bad result. It's a precise starting point, and it's what you need to plan without fooling yourself.",
          ],
        },
        {
          title: 'Three pieces, by risk',
          body: [
            "From the missing ones, pick three and order them by your product's risk, not by what you find most interesting. If your system has a tool-using agent and there are no injection tests, that goes before optimizing costs. If a feature with a model is in production with no eval at all, that goes first. Ask yourself which failure would hurt you most tomorrow and which piece would have caught it. That's the first one.",
          ],
        },
        {
          title: 'A ninety-day plan',
          body: [
            'Assign one piece per month, each with a verifiable deliverable. "Learn about evals" isn\'t a deliverable. "A thirty-case eval for the classifier, running in the PR pipeline" is. One month per piece looks slow. It\'s realistic if you do it alongside your usual work. Put the dates on the calendar and tell someone on your team about the plan. A commitment another person knows about gets kept far more often than a private one.',
          ],
        },
        {
          title: 'Publish evidence',
          body: [
            "As you finish each piece, leave it visible. A repository with a README explaining what each part measures and how to run it. A written case with your own numbers: what the problem was, what you measured, what you decided and what happened next. Use your own or synthetic data, never a client's information. That evidence works inside your team, so others adopt what you built, and outside it, because it shows applied judgment and not just knowledge of tools.",
          ],
        },
        {
          title: 'Back to the matrix',
          body: [
            'Open the skills matrix from day two and update it with what you did this month. Rows that were at zero or one should now have linked evidence. Set a date to repeat the self-assessment three months from now, when the plan ends. The specific tools in this series will change, some within a few months. What holds is the method: define what correct means, measure it repeatably and decide with data.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Una SDET completa el checklist al terminar la serie. Piezas reales: la regla de delegación, un repo con reglas para agentes y el ciclo de TDD con guardrails. A medio hacer: un eval que corre a mano. Faltantes: todo lo demás. Su producto tiene un asistente con acceso a datos de clientes y a una herramienta de mail. Ordena por riesgo. Primer mes, tests de inyección sobre las acciones del agente. Segundo mes, el eval con dataset versionado dentro del pipeline. Tercer mes, trazas y una alerta de calidad en producción. Deja costos y performance para el trimestre siguiente, y lo anota como una decisión, no como un olvido.',
      ],
      en: [
        "An SDET fills in the checklist at the end of the series. Real pieces: the delegation rule, a repo with rules for agents and the TDD cycle with guardrails. Half done: an eval run by hand. Missing: everything else. Her product has an assistant with access to customer data and an email tool. She orders by risk. First month, injection tests on the agent's actions. Second month, the eval with a versioned dataset inside the pipeline. Third month, traces and a quality alert in production. She leaves cost and performance for the following quarter, and writes that down as a decision, not an oversight.",
      ],
    },
    mistakes: {
      es: [
        'Marcar como hecha una pieza que solo viste o probaste una vez.',
        'Elegir qué construir por interés y no por riesgo del producto.',
        'Planear las doce piezas para el mismo trimestre.',
        'Publicar evidencia con datos o detalles de un cliente.',
      ],
      en: [
        'Marking as done a piece you only saw or tried once.',
        'Choosing what to build by interest and not by product risk.',
        'Planning all twelve pieces for the same quarter.',
        "Publishing evidence with a client's data or details.",
      ],
    },
    checklist: {
      es: [
        'El checklist está completo con la regla de que solo cuenta lo que corre.',
        'Hay tres piezas elegidas y ordenadas por riesgo.',
        'El plan de noventa días tiene un entregable verificable por mes.',
        'La matriz del día dos está actualizada y tiene fecha de revisión.',
      ],
      en: [
        'The checklist is filled in under the rule that only what runs counts.',
        'Three pieces are chosen and ordered by risk.',
        'The ninety-day plan has one verifiable deliverable per month.',
        'The day two matrix is updated and has a review date.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Por dónde empiezo si mi producto todavía no usa IA?',
          a: 'Por las piezas que mejoran tu trabajo actual: la regla de delegación, el repo con reglas para agentes y TDD con guardrails. El resto queda como preparación para cuando tu producto incorpore un modelo, que suele ocurrir antes de lo previsto.',
        },
        {
          q: '¿Hace falta todo esto en un equipo chico?',
          a: 'No todo. Un equipo chico con una funcionalidad de IA necesita, como mínimo, un eval con dataset versionado en el pipeline, y controles sobre las acciones si hay un agente. Lo demás se suma a medida que el riesgo crece.',
        },
        {
          q: '¿Las guías van a quedar desactualizadas?',
          a: 'Los comandos y las versiones, sí, y por eso cada guía indica cuándo se revisó. Los conceptos cambian mucho más despacio: dataset, scorers, umbral, gate, mínimo privilegio y trazas van a seguir siendo la base con cualquier herramienta.',
        },
      ],
      en: [
        {
          q: "Where do I start if my product doesn't use AI yet?",
          a: 'With the pieces that improve your current work: the delegation rule, the repo with rules for agents and TDD with guardrails. The rest stays as preparation for when your product takes on a model, which tends to happen sooner than planned.',
        },
        {
          q: 'Is all of this needed in a small team?',
          a: 'Not all of it. A small team with one AI feature needs, at minimum, an eval with a versioned dataset in the pipeline, and controls on actions if there is an agent. The rest gets added as risk grows.',
        },
        {
          q: 'Will the guides go out of date?',
          a: 'The commands and versions will, which is why each guide states when it was reviewed. The concepts change far more slowly: dataset, scorers, threshold, gate, least privilege and traces will remain the base with any tool.',
        },
      ],
    },
    slug: 'qa-ai-31-capstone-full-ai-quality-pipeline',
    minutes: 7,
    tags: ['QA', 'SDET', 'Quality Engineering'],
    diagram:
      'change: code, prompt, model or tool\n   ▼\nagent or person, working under repo rules\n   ▼\ntests: TDD + guardrails + Playwright\n   ▼\nevals: golden dataset, calibrated judge, repeated runs ◀──────────────┐\n   ▼                                                                  │\nprompt regression + cost                                              │\n   ▼                                                                  │\nsecurity: threat model, red team, injection tests                     │\n   ▼                                                                  │\nperformance: TTFT, tokens/s, goodput                                  │\n   ▼                                                                  │\nCI gates + human sign-off ▶ production ▶ observability ───────────────┘\n                                         (failures become regression cases)',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d31-light.webp',
      dark: '/publications/qa-ai/diagrams/d31-dark.webp',
      width: 1800,
      height: 196,
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
