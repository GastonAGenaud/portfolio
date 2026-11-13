import type { SeriesGuide } from './types';

export const week3: SeriesGuide[] = [
  {
    day: 15,
    title: {
      es: 'Cómo setear modelos para pruebas de calidad',
      en: 'How to set up models for quality testing',
    },
    summary: {
      es: 'Configurar un modelo para pruebas de forma reproducible: versión fija, parámetros explícitos, salida estructurada y un juez separado del modelo evaluado.',
      en: 'Configuring a model for testing reproducibly: pinned version, explicit parameters, structured output and a judge separate from the model under test.',
    },
    pitfall: {
      es: 'Temperatura cero no garantiza la misma respuesta. La reproducibilidad en LLMs es estadística: se mide con corridas repetidas.',
      en: "Temperature zero doesn't guarantee the same answer. Reproducibility with LLMs is statistical: you measure it with repeated runs.",
    },
    requirements: {
      es: [
        'El eval harness del día 8.',
        'Opcional: API key de un proveedor para el segundo modelo y el juez.',
      ],
      en: [
        'The eval harness from day 8.',
        'Optional: a provider API key for the second model and the judge.',
      ],
    },
    steps: {
      es: [
        'Definí el rol del modelo en la prueba: sistema bajo prueba, generador (datos o tests) o juez. Cada rol se configura distinto.',
        'Fijá la versión exacta. Nada de alias tipo "latest": si el proveedor actualiza el modelo, tus resultados cambian sin que toques nada.',
        'Parámetros explícitos: temperatura baja para clasificar y juzgar, límite de tokens de salida y seed si el proveedor lo soporta. Si un modelo no expone algún parámetro, anotalo.',
        'Salida estructurada: pedí JSON con schema. Te ahorra buena parte de los fallos de formato.',
        'Juez separado: el modelo que evalúa no debería ser el mismo que se evalúa, y conviene que sea igual o más capaz.',
        'Registrá la ficha de cada corrida: modelo y versión, versión del prompt, parámetros, fecha y dataset. Sin ficha no hay comparación válida.',
      ],
      en: [
        "Define the model's role in the test: system under test, generator (data or tests) or judge. Each role is configured differently.",
        'Pin the exact version. No "latest" aliases: if the provider updates the model, your results change without you touching anything.',
        "Explicit parameters: low temperature for classifying and judging, an output token limit and a seed if the provider supports it. If a model doesn't expose a parameter, write that down.",
        'Structured output: request JSON with a schema. It removes a good share of your format failures.',
        "Separate judge: the grading model shouldn't be the one being graded, and should be equally or more capable.",
        'Record a run card for each run: model and version, prompt version, parameters, date and dataset. No card, no valid comparison.',
      ],
    },
    snippets: [
      {
        code: 'providers:\n  - id: ollama:chat:llama3.2\n    label: sut-small\n    config:\n      temperature: 0\n  - id: openai:chat:YOUR_PINNED_MODEL_ID\n    label: sut-large\n    config:\n      temperature: 0\n      max_tokens: 300\n\ndefaultTest:\n  options:\n    provider: openai:chat:YOUR_JUDGE_MODEL_ID   # grader for llm-rubric asserts',
        lang: 'yaml',
        caption: {
          es: 'evals/bug-triage.yaml (sección providers)',
          en: 'evals/bug-triage.yaml (providers section)',
        },
      },
    ],
    intro: {
      es: [
        'Cuando un test con un modelo da resultados distintos de un día para el otro, la primera sospecha suele ser el modelo. La segunda debería ser la configuración. Un alias que apunta a la última versión, una temperatura que quedó en el valor por defecto, un límite de tokens que corta la respuesta o un juez que cambió sin aviso explican buena parte de las diferencias inexplicables.',
        'Configurar un modelo para pruebas de calidad es tratarlo como cualquier otra dependencia de un entorno de test: versión fija, parámetros explícitos y registro de con qué corrió cada cosa. Esta guía recorre las seis decisiones que hacen que dos corridas sean comparables, y deja en claro qué significa reproducibilidad cuando el sistema bajo prueba no es determinista.',
      ],
      en: [
        'When a test involving a model gives different results from one day to the next, the first suspect is usually the model. The second should be the configuration. An alias pointing to the latest version, a temperature left at its default, a token limit that cuts the answer off or a judge that changed without notice explain a good share of the unexplained differences.',
        "Setting up a model for quality testing means treating it like any other dependency of a test environment: pinned version, explicit parameters and a record of what each thing ran with. This guide walks through the six decisions that make two runs comparable, and makes clear what reproducibility means when the system under test isn't deterministic.",
      ],
    },
    details: {
      es: [
        {
          title: 'El rol define la configuración',
          body: [
            'Un mismo modelo puede cumplir tres roles en tu proceso, y cada uno pide otra cosa. Como sistema bajo prueba, se configura igual que en producción, porque querés medir lo que el usuario recibe. Como generador de datos o tests, puede usar más temperatura para producir variedad. Como juez, necesita la configuración más estable posible. Mezclar roles en una sola configuración es un error frecuente: terminás midiendo el producto con parámetros que el producto no usa.',
          ],
        },
        {
          title: 'Versión exacta, sin alias',
          body: [
            'Los proveedores ofrecen alias que apuntan a la versión más reciente de un modelo. Son cómodos para desarrollar y malos para medir: el día que el alias cambia, tus resultados cambian sin que hayas tocado nada, y no tenés forma de saber por qué. Usá siempre el identificador completo con su versión o fecha. Cuando quieras actualizar, hacelo como un cambio deliberado: corré el eval con la versión vieja y con la nueva, compará y recién después cambiá el identificador.',
          ],
        },
        {
          title: 'Parámetros a la vista',
          body: [
            'Escribí en la configuración los parámetros que afectan la salida, aunque coincidan con los valores por defecto: temperatura, límite de tokens de salida y semilla si el proveedor la soporta. Para clasificar y juzgar, temperatura baja. El límite de tokens merece atención: una respuesta cortada a la mitad puede parecer un fallo de formato cuando es un límite mal puesto. Algunos modelos no exponen ciertos parámetros o los ignoran. Anotalo también, para no atribuirle a la configuración un control que no tenés.',
          ],
        },
        {
          title: 'Salida estructurada',
          body: [
            'Si tu código va a parsear la respuesta, pedila en JSON con un schema, usando el mecanismo de salida estructurada del proveedor cuando exista. Reduce una clase entera de fallos: texto antes o después del JSON, campos con otro nombre, valores fuera de la lista permitida. No reemplaza a la validación de tu lado, que sigue siendo necesaria, pero cambia la proporción. Vas a dedicar los evals a medir si el contenido es correcto, en lugar de gastar casos en descubrir que el formato vino roto.',
          ],
        },
        {
          title: 'Un juez separado',
          body: [
            'El modelo que califica no debería ser el mismo que está siendo calificado, y conviene que sea igual o más capaz. Un modelo que evalúa su propia salida tiende a encontrarla razonable, porque comparte los mismos sesgos que la produjeron. Declaralo como un provider aparte, con su versión fija y su etiqueta. Cambiar el juez es cambiar el instrumento de medición: después de hacerlo, las métricas nuevas no son comparables con las anteriores hasta volver a calibrar.',
          ],
        },
        {
          title: 'La ficha de corrida',
          body: [
            'Cada corrida debería dejar un registro con modelo y versión, versión del prompt, parámetros, fecha, dataset y, si hay, juez. Es un archivo chico que se guarda junto a los resultados. Sin esa ficha, una comparación entre dos corridas no dice nada, porque no sabés qué más cambió entre una y otra. Con ella podés responder la pregunta que siempre llega: por qué la semana pasada daba noventa y hoy da ochenta y cuatro.',
          ],
        },
      ],
      en: [
        {
          title: 'The role defines the config',
          body: [
            "The same model can play three roles in your process, and each asks for something different. As the system under test, it's configured the same as in production, because you want to measure what the user gets. As a generator of data or tests, it can use more temperature to produce variety. As a judge, it needs the most stable configuration possible. Mixing roles in a single config is a frequent mistake: you end up measuring the product with parameters the product doesn't use.",
          ],
        },
        {
          title: 'Exact version, no aliases',
          body: [
            "Providers offer aliases pointing to a model's most recent version. They're convenient for development and bad for measuring: the day the alias moves, your results change without you touching anything, and you have no way of knowing why. Always use the full identifier with its version or date. When you want to upgrade, do it as a deliberate change: run the eval with the old and the new version, compare, and only then change the identifier.",
          ],
        },
        {
          title: 'Parameters in plain sight',
          body: [
            "Write into the config the parameters that affect the output, even when they match the defaults: temperature, output token limit and seed if the provider supports it. For classifying and judging, low temperature. The token limit deserves attention: an answer cut off halfway can look like a format failure when it's a badly set limit. Some models don't expose certain parameters or ignore them. Note that too, so you don't credit the config with control you don't have.",
          ],
        },
        {
          title: 'Structured output',
          body: [
            "If your code is going to parse the answer, request it as JSON with a schema, using the provider's structured output mechanism where one exists. It reduces a whole class of failures: text before or after the JSON, fields with another name, values outside the allowed list. It doesn't replace validation on your side, which is still necessary, but it changes the proportion. You'll spend evals measuring whether content is correct, instead of spending cases discovering the format came back broken.",
          ],
        },
        {
          title: 'A separate judge',
          body: [
            "The model that grades shouldn't be the one being graded, and it should be equally or more capable. A model evaluating its own output tends to find it reasonable, because it shares the same biases that produced it. Declare it as a separate provider, with its pinned version and its label. Changing the judge is changing the measuring instrument: after doing so, new metrics aren't comparable with earlier ones until you recalibrate.",
          ],
        },
        {
          title: 'The run card',
          body: [
            "Each run should leave a record with model and version, prompt version, parameters, date, dataset and, if any, judge. It's a small file stored next to the results. Without that card, a comparison between two runs says nothing, because you don't know what else changed between them. With it you can answer the question that always arrives: why it scored ninety last week and eighty-four today.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo nota que su eval de clasificación bajó cinco puntos sin que nadie tocara el prompt. Buscan las fichas de corrida y no existen. Reconstruyen lo que pueden: el provider usaba un alias y el proveedor había publicado una versión nueva esa semana. Fijan la versión anterior, corren de nuevo y el resultado vuelve al valor original. Después corren la versión nueva a propósito: es mejor en los casos ambiguos y peor en dos casos críticos. Deciden no actualizar todavía. A partir de ahí, cada corrida guarda su ficha y el identificador del modelo incluye la fecha.',
      ],
      en: [
        "A team notices their classification eval dropped five points with nobody touching the prompt. They look for the run cards and there are none. They reconstruct what they can: the provider used an alias and the vendor had released a new version that week. They pin the previous version, run again and the result returns to its original value. Then they run the new version on purpose: it's better on ambiguous cases and worse on two critical ones. They decide not to upgrade yet. From then on, every run stores its card and the model identifier includes the date.",
      ],
    },
    mistakes: {
      es: [
        'Usar un alias de versión en evals o en CI.',
        'Evaluar el producto con parámetros distintos a los de producción.',
        'Usar como juez el mismo modelo que se evalúa.',
        'Comparar dos corridas sin saber qué cambió entre ellas.',
      ],
      en: [
        'Using a version alias in evals or in CI.',
        'Evaluating the product with parameters different from production.',
        'Using the model under evaluation as its own judge.',
        'Comparing two runs without knowing what changed between them.',
      ],
    },
    checklist: {
      es: [
        'Cada provider tiene un rol y una etiqueta que lo dice.',
        'Todos los modelos están fijados a una versión exacta.',
        'Temperatura, límite de tokens y semilla están escritos.',
        'Cada corrida guarda su ficha junto a los resultados.',
      ],
      en: [
        'Each provider has a role and a label that states it.',
        'Every model is pinned to an exact version.',
        'Temperature, token limit and seed are written down.',
        'Each run stores its card next to the results.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Con temperatura cero y semilla obtengo siempre lo mismo?',
          a: 'No de forma garantizada. Reduce la variación, pero el hardware, las actualizaciones del proveedor y el procesamiento en paralelo pueden producir diferencias. Por eso la reproducibilidad con modelos se mide con varias corridas y rangos, no se da por hecha.',
        },
        {
          q: '¿Cada cuánto debería actualizar la versión del modelo?',
          a: 'Cuando tengas un motivo: mejor calidad, menor costo o una versión que deja de estar disponible. Revisá las fechas de retiro que publica el proveedor para no enterarte el mismo día. Toda actualización pasa antes por el eval.',
        },
        {
          q: '¿Un modelo local se configura igual?',
          a: 'Sí, con un detalle: la versión es la etiqueta exacta del modelo y también su cuantización. Dos descargas con el mismo nombre general pueden ser archivos distintos. Anotá el identificador completo en la ficha.',
        },
      ],
      en: [
        {
          q: 'With temperature zero and a seed, do I always get the same thing?',
          a: "Not guaranteed. It reduces variation, but hardware, provider updates and parallel processing can produce differences. That's why reproducibility with models is measured with several runs and ranges, not taken for granted.",
        },
        {
          q: 'How often should I upgrade the model version?',
          a: "When you have a reason: better quality, lower cost or a version being retired. Check the retirement dates the provider publishes so you don't find out on the day. Every upgrade goes through the eval first.",
        },
        {
          q: 'Is a local model configured the same way?',
          a: "Yes, with one detail: the version is the model's exact tag and also its quantization. Two downloads under the same general name can be different files. Note the full identifier on the card.",
        },
      ],
    },
    slug: 'qa-ai-15-setting-up-models-for-quality-testing',
    minutes: 6,
    tags: ['LLM', 'Evals', 'Reproducibility'],
    diagram:
      'config: pinned version + temperature + max tokens + schema\n   ├─▶ system under test ──▶ outputs ──┐\n   ├─▶ generator (data / tests)        │\n   └─▶ judge ◀─────────────────────────┘\n          ▼\n   run card: model · prompt version · params · date · dataset',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d15-light.webp',
      dark: '/publications/qa-ai/diagrams/d15-dark.webp',
      width: 1800,
      height: 296,
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
    title: {
      es: 'LLM como juez: rúbricas y calibración contra humanos',
      en: 'LLM-as-a-judge: rubrics and calibration against humans',
    },
    summary: {
      es: 'Cómo escribir una rúbrica observable para un modelo juez y medir cuánto coincide con tu criterio antes de confiar en él.',
      en: 'How to write an observable rubric for a judge model and measure how much it agrees with your judgment before trusting it.',
    },
    pitfall: {
      es: 'El juez explica muy bien veredictos incorrectos. No confíes en la justificación: medí la coincidencia.',
      en: "The judge explains wrong verdicts very well. Don't trust the justification: measure agreement.",
    },
    requirements: {
      es: [
        'Un eval harness con juez configurado (días 8 y 15).',
        '30 salidas reales del modelo evaluado.',
        'Una planilla con columnas: id, veredicto humano, veredicto del juez, motivo.',
      ],
      en: [
        'An eval harness with a judge configured (days 8 and 15).',
        '30 real outputs from the model under test.',
        'A sheet with columns: id, human verdict, judge verdict, reason.',
      ],
    },
    steps: {
      es: [
        'Escribí criterios observables. "¿Es buena la respuesta?" no sirve. "Menciona el componente del reporte" sí.',
        'Etiquetá vos 30 salidas a mano, pasa o falla, con el motivo. Hacelo antes de mirar lo que dice el juez.',
        'Corré el juez sobre las mismas 30.',
        'Calculá la coincidencia: casos donde coinciden dividido el total. Y mirá el sentido del desacuerdo: ¿el juez es más blando o más duro que vos?',
        'Arreglá la rúbrica donde no coinciden: un criterio más preciso o un ejemplo de pasa y uno de falla.',
        'Volvé a medir. Definí un mínimo de coincidencia para usar el juez en CI y repetí la calibración cada vez que cambies de modelo juez.',
      ],
      en: [
        'Write observable criteria. "Is the answer good?" doesn\'t work. "Mentions the component from the report" does.',
        'Hand-label 30 outputs yourself, pass or fail, with the reason. Do it before looking at what the judge says.',
        'Run the judge on the same 30.',
        'Compute agreement: matching cases divided by total. And check the direction of disagreement: is the judge more lenient or stricter than you?',
        'Fix the rubric where you disagree: a sharper criterion or one pass and one fail example.',
        'Measure again. Set a minimum agreement to use the judge in CI and recalibrate whenever you change the judge model.',
      ],
    },
    snippets: [
      {
        code: 'assert:\n  - type: llm-rubric\n    value: |\n      PASS only if ALL are true:\n      1. States the severity explicitly.\n      2. Mentions the affected component named in the report.\n      3. Adds no steps or facts that are absent from the report.\n      Otherwise FAIL and name the criterion that failed.',
        lang: 'yaml',
        caption: {
          es: 'Rúbrica observable',
          en: 'Observable rubric',
        },
      },
    ],
    intro: {
      es: [
        'Hay cualidades de una respuesta que ninguna regla captura: si la explicación es clara, si el tono corresponde, si contesta lo que se preguntó. Revisarlas a mano no escala más allá de unas decenas de casos. La solución habitual es pedirle a otro modelo que las califique, lo que se conoce como LLM como juez.',
        'El problema es que ese juez es otro sistema no determinista con sus propios errores, y sus veredictos vienen acompañados de justificaciones muy convincentes. Usarlo sin calibrar equivale a medir con un instrumento que nunca comparaste contra un patrón. Esta guía muestra cómo escribir una rúbrica que se pueda verificar, cómo medir el acuerdo entre el juez y vos, y cuándo ese acuerdo alcanza para confiarle un gate.',
      ],
      en: [
        "Some qualities of an answer are captured by no rule: whether the explanation is clear, whether the tone fits, whether it answers what was asked. Reviewing them by hand doesn't scale beyond a few dozen cases. The usual solution is asking another model to grade them, known as LLM as a judge.",
        'The problem is that this judge is another non-deterministic system with its own errors, and its verdicts come with very convincing justifications. Using it uncalibrated is like measuring with an instrument you never compared against a standard. This guide shows how to write a rubric that can be verified, how to measure agreement between the judge and you, and when that agreement is enough to trust it with a gate.',
      ],
    },
    details: {
      es: [
        {
          title: 'Criterios observables',
          body: [
            'Una rúbrica funciona cuando dos personas que la leen llegan al mismo veredicto sobre la misma respuesta. "¿Es buena la respuesta?" no cumple. "Menciona el componente que figura en el reporte" sí, porque se puede comprobar mirando el texto. Escribí pocos criterios, cada uno verificable, y definí el resultado como pasa o falla con todos los criterios cumplidos. Evitá las escalas del uno al cinco: nadie sabe qué separa un tres de un cuatro, y el juez tampoco.',
          ],
        },
        {
          title: 'Treinta etiquetas tuyas, primero',
          body: [
            'Tomá treinta salidas reales del sistema y etiquetalas a mano, pasa o falla, anotando el motivo en una línea. Hacelo antes de correr el juez y sin mirar lo que diría. Si ves primero su veredicto, tu etiqueta se contamina y el acuerdo que midas después va a salir inflado. Treinta casos son un piso razonable para empezar. Buscá que haya aprobados y rechazados en proporciones parecidas: con casi todos aprobados no vas a saber si el juez detecta los malos.',
          ],
        },
        {
          title: 'Correr el juez sobre los mismos casos',
          body: [
            'Ejecutá el juez con la rúbrica sobre esas mismas treinta salidas, con la configuración estable que definiste ayer. Guardá el veredicto y la justificación de cada caso. Si podés, corré dos o tres veces para ver si el juez es consistente consigo mismo. Un juez que cambia de veredicto sobre la misma entrada entre corridas tiene un problema anterior al acuerdo con vos: la rúbrica deja demasiado margen o la configuración no es estable.',
          ],
        },
        {
          title: 'Acuerdo y dirección',
          body: [
            'El cálculo es simple: casos donde coinciden dividido por el total. Pero el número solo no alcanza. Mirá la dirección del desacuerdo. Si el juez aprueba casos que vos rechazaste, es indulgente y tu gate va a dejar pasar defectos. Si rechaza casos que vos aprobaste, es estricto y va a bloquear trabajo válido. Son riesgos distintos y se corrigen distinto. Armá la tabla de dos por dos, vos contra el juez, y leé las dos celdas de desacuerdo por separado.',
          ],
        },
        {
          title: 'Corregir la rúbrica',
          body: [
            'Leé cada desacuerdo y preguntate quién tiene razón. A veces es el juez, y corregís tu etiqueta. Lo más frecuente es que el criterio fuera ambiguo. Hay dos arreglos que funcionan: reescribir el criterio para que sea más preciso, o agregar a la rúbrica un ejemplo que pasa y uno que falla. No agregues diez ejemplos, porque el juez empieza a copiar los ejemplos en lugar de aplicar el criterio. Y no uses como ejemplo ninguno de los treinta casos que después vas a medir.',
          ],
        },
        {
          title: 'Medir de nuevo y fijar un mínimo',
          body: [
            'Corré otra vez y recalculá. Decidí por adelantado qué acuerdo mínimo necesitás para usar el juez en CI y dejalo escrito. Si no llegás, el juez sirve para ordenar qué revisar a mano, pero no para bloquear un merge. La calibración vence: cada vez que cambies el modelo juez, su versión o la rúbrica, volvé a medir contra tus etiquetas. Guardá esas treinta etiquetas como un activo, porque son tu patrón de referencia.',
          ],
        },
      ],
      en: [
        {
          title: 'Observable criteria',
          body: [
            'A rubric works when two people reading it reach the same verdict on the same answer. "Is the answer good?" doesn\'t qualify. "Mentions the component named in the report" does, because it can be checked by looking at the text. Write few criteria, each verifiable, and define the result as pass or fail with all criteria met. Avoid one-to-five scales: nobody knows what separates a three from a four, and neither does the judge.',
          ],
        },
        {
          title: 'Thirty labels of your own, first',
          body: [
            "Take thirty real outputs from the system and label them by hand, pass or fail, noting the reason in one line. Do it before running the judge and without looking at what it would say. If you see its verdict first, your label gets contaminated and the agreement you measure afterwards will come out inflated. Thirty cases are a reasonable floor to start. Aim for passes and fails in similar proportions: with almost everything passing you won't know whether the judge detects the bad ones.",
          ],
        },
        {
          title: 'Run the judge on the same cases',
          body: [
            "Run the judge with the rubric on those same thirty outputs, with the stable configuration you defined yesterday. Save the verdict and justification for each case. If you can, run two or three times to see whether the judge is consistent with itself. A judge that changes its verdict on the same input between runs has a problem that comes before agreement with you: the rubric leaves too much room or the config isn't stable.",
          ],
        },
        {
          title: 'Agreement and direction',
          body: [
            "The calculation is simple: matching cases divided by the total. But the number alone isn't enough. Look at the direction of disagreement. If the judge passes cases you failed, it's lenient and your gate will let defects through. If it fails cases you passed, it's strict and will block valid work. Those are different risks and they're fixed differently. Build the two-by-two table, you against the judge, and read the two disagreement cells separately.",
          ],
        },
        {
          title: 'Fix the rubric',
          body: [
            "Read each disagreement and ask who is right. Sometimes it's the judge, and you correct your label. Most often the criterion was ambiguous. Two fixes work: rewriting the criterion to make it sharper, or adding to the rubric one example that passes and one that fails. Don't add ten examples, because the judge starts copying the examples instead of applying the criterion. And don't use as an example any of the thirty cases you'll measure afterwards.",
          ],
        },
        {
          title: 'Measure again and set a minimum',
          body: [
            "Run again and recompute. Decide in advance which minimum agreement you need to use the judge in CI and write it down. If you don't reach it, the judge is useful for ordering what to review by hand, but not for blocking a merge. Calibration expires: every time you change the judge model, its version or the rubric, measure again against your labels. Keep those thirty labels as an asset, because they are your reference standard.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo evalúa resúmenes de tickets de soporte. Etiquetan treinta a mano: dieciocho pasan y doce fallan. El juez coincide en veintitrés, un acuerdo del setenta y siete por ciento. De los siete desacuerdos, seis son casos que el juez aprobó y ellos no: es indulgente. Al leerlos encuentran el patrón. El criterio decía "incluye el problema del cliente" y el juez aceptaba menciones vagas. Lo reescriben como "nombra el producto y el síntoma concreto" y agregan un ejemplo de cada veredicto. En la segunda medición coinciden veintiocho de treinta. Fijan ese nivel como mínimo para usarlo en el pipeline.',
      ],
      en: [
        'A team evaluates summaries of support tickets. They label thirty by hand: eighteen pass and twelve fail. The judge matches on twenty-three, an agreement of seventy-seven percent. Of the seven disagreements, six are cases the judge passed and they didn\'t: it\'s lenient. Reading them, they find the pattern. The criterion said "includes the customer\'s problem" and the judge accepted vague mentions. They rewrite it as "names the product and the concrete symptom" and add one example of each verdict. In the second measurement, twenty-eight out of thirty match. They set that level as the minimum for using it in the pipeline.',
      ],
    },
    mistakes: {
      es: [
        'Etiquetar después de ver el veredicto del juez.',
        'Usar escalas numéricas en lugar de pasa o falla.',
        'Mirar solo el porcentaje de acuerdo y no su dirección.',
        'Cambiar el modelo juez sin volver a calibrar.',
      ],
      en: [
        "Labeling after seeing the judge's verdict.",
        'Using numeric scales instead of pass or fail.',
        'Looking only at the agreement percentage and not its direction.',
        'Changing the judge model without recalibrating.',
      ],
    },
    checklist: {
      es: [
        'La rúbrica tiene criterios que se verifican mirando el texto.',
        'Hay treinta casos etiquetados a mano antes de correr el juez.',
        'Calculaste el acuerdo y sabés si el juez es indulgente o estricto.',
        'Hay un acuerdo mínimo escrito para usarlo en CI.',
      ],
      en: [
        'The rubric has criteria that can be checked by looking at the text.',
        'There are thirty cases labeled by hand before running the judge.',
        'You computed agreement and know whether the judge is lenient or strict.',
        'There is a written minimum agreement for using it in CI.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Qué acuerdo es suficiente?',
          a: 'Depende de qué decisión tome el juez. Como referencia práctica, medí primero cuánto coinciden dos personas de tu equipo sobre los mismos casos: no tiene sentido exigirle al juez más acuerdo del que hay entre humanos con la misma rúbrica.',
        },
        {
          q: '¿Y si no tengo tiempo para etiquetar treinta casos?',
          a: 'Entonces no tenés forma de saber si el juez funciona. Treinta casos de pasa o falla llevan menos de una hora. Es la inversión más chica que convierte una opinión automática en una medición.',
        },
        {
          q: '¿Puedo usar varios jueces y promediar?',
          a: 'Podés, y a veces reduce errores, pero multiplica el costo y no reemplaza a la calibración. Tres jueces sin calibrar que coinciden entre sí pueden estar equivocados de la misma manera.',
        },
      ],
      en: [
        {
          q: 'What agreement is enough?',
          a: 'It depends on which decision the judge makes. As a practical reference, first measure how much two people on your team agree on the same cases: it makes no sense to demand more agreement from the judge than humans reach with the same rubric.',
        },
        {
          q: "What if I don't have time to label thirty cases?",
          a: "Then you have no way of knowing whether the judge works. Thirty pass-or-fail cases take under an hour. It's the smallest investment that turns an automatic opinion into a measurement.",
        },
        {
          q: 'Can I use several judges and average them?',
          a: "You can, and it sometimes reduces errors, but it multiplies the cost and doesn't replace calibration. Three uncalibrated judges agreeing with each other can be wrong in the same way.",
        },
      ],
    },
    slug: 'qa-ai-16-llm-as-a-judge-calibration',
    minutes: 6,
    tags: ['Evals', 'LLM Judge', 'QA'],
    diagram:
      '30 real outputs\n   ├─▶ human labels (pass / fail + reason) ──┐\n   └─▶ judge with rubric ────────────────────┴─▶ agreement = matches / total\n                                                     ▼\n                                              above minimum?\n                                   ├─ no  ▶ refine rubric ▶ run the judge again\n                                   └─ yes ▶ use in CI ▶ recalibrate on judge change',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d16-light.webp',
      dark: '/publications/qa-ai/diagrams/d16-dark.webp',
      width: 1150,
      height: 1566,
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
    title: {
      es: 'Golden datasets: cómo etiquetar, balancear y versionar',
      en: 'Golden datasets: how to label, balance and version',
    },
    summary: {
      es: 'Un golden dataset chico pero confiable: con guía de etiquetado, tres particiones y versionado en Git.',
      en: 'A small but reliable golden dataset: with a labeling guide, three splits and Git versioning.',
    },
    pitfall: {
      es: 'Un modelo evaluado contra etiquetas que él mismo generó siempre sale bien. Las etiquetas del test las pone una persona.',
      en: 'A model graded against labels it generated always looks good. Test labels come from a person.',
    },
    requirements: {
      es: [
        'El repo `qa-ai-lab`, carpeta `data/`.',
        'Entre 50 y 100 casos reales anonimizados o sintéticos.',
        'Idealmente, una segunda persona para etiquetar una muestra.',
      ],
      en: [
        'The `qa-ai-lab` repo, `data/` folder.',
        '50 to 100 anonymized real or synthetic cases.',
        'Ideally, a second person to label a sample.',
      ],
    },
    steps: {
      es: [
        'Juntá casos de tres fuentes: uso real anonimizado, casos borde y casos adversos (relleno, duplicados, entradas vacías).',
        'Escribí la guía de etiquetado: definición de cada etiqueta, dos ejemplos por etiqueta y qué hacer en caso de duda.',
        'Dos personas etiquetan por separado una muestra de 20. Donde no coinciden, la guía está incompleta: corregila.',
        'Balanceá: que todas las clases y todos los tipos difíciles estén representados. Si el 90% es fácil, tu accuracy miente.',
        'Partí en tres: dev para iterar, test que nunca se usa para ajustar ni aparece en ejemplos del prompt, y regresión con todo lo que alguna vez falló.',
        'Versioná en JSONL con CHANGELOG. Corregir una etiqueta es un commit, y después de corregir se recalculan las métricas anteriores.',
      ],
      en: [
        'Collect cases from three sources: anonymized real usage, edge cases and adverse cases (filler, duplicates, empty inputs).',
        'Write the labeling guide: definition of each label, two examples per label and what to do when in doubt.',
        'Two people independently label a sample of 20. Where they disagree, the guide is incomplete: fix it.',
        'Balance: every class and every hard type must be represented. If 90% is easy, your accuracy lies.',
        'Split in three: dev to iterate, test never used for tuning nor quoted in prompt examples, and regression with everything that ever failed.',
        'Version as JSONL with a CHANGELOG. Fixing a label is a commit, and after a fix you recompute earlier metrics.',
      ],
    },
    snippets: [
      {
        code: '{"id":"case-001","input":"ACME Intl. Corp","expected":"map_to_existing:ACME","tags":["abbreviation"],"labeler":"gg","label_version":2}\n{"id":"case-002","input":"N/A","expected":"map_to_other","tags":["filler"],"labeler":"gg","label_version":1}',
        lang: 'json',
        caption: {
          es: 'Un caso por línea (JSONL)',
          en: 'One case per line (JSONL)',
        },
      },
      {
        code: 'data/\n  golden/dev.jsonl         # iterate prompts here\n  golden/test.jsonl        # never used to tune, never quoted in prompts\n  golden/regression.jsonl  # every case that failed in the past\n  LABELING_GUIDE.md\n  CHANGELOG.md',
        lang: 'text',
        caption: {
          es: 'Estructura',
          en: 'Structure',
        },
      },
    ],
    intro: {
      es: [
        'Todo lo que medimos en los últimos días depende de una pieza que suele recibir poca atención: el conjunto de casos con su respuesta correcta. Si las etiquetas están mal, el mejor harness del mundo mide con precisión algo equivocado. Si el conjunto solo tiene casos fáciles, cualquier modelo parece excelente. Y si los casos se filtran al prompt, el número deja de significar algo.',
        'Un golden dataset es ese conjunto tratado con el cuidado que merece un instrumento de medición. Esta guía cubre cómo juntar los casos, cómo etiquetarlos con criterio compartido, cómo balancearlos, cómo separarlos para no engañarte y cómo versionarlos. Es trabajo artesanal, y es el que más mejora la calidad de todas las decisiones posteriores.',
      ],
      en: [
        'Everything we measured over the last few days depends on a piece that usually gets little attention: the set of cases with their correct answer. If the labels are wrong, the best harness in the world measures the wrong thing precisely. If the set has only easy cases, any model looks excellent. And if cases leak into the prompt, the number stops meaning anything.',
        "A golden dataset is that set treated with the care a measuring instrument deserves. This guide covers how to gather the cases, how to label them with shared criteria, how to balance them, how to split them so you don't fool yourself and how to version them. It's craft work, and it's what most improves the quality of every later decision.",
      ],
    },
    details: {
      es: [
        {
          title: 'Tres fuentes de casos',
          body: [
            'La primera fuente es el uso real, anonimizado: muestra cómo son de verdad las entradas, con sus errores de tipeo y sus ambigüedades. La segunda son los casos de borde que vos sabés que existen aunque aparezcan poco: valores límite, formatos raros, entradas muy largas. La tercera son los casos adversos, pensados para molestar: texto de relleno, duplicados, entradas vacías o en otro idioma. Un dataset hecho solo con la primera fuente describe el promedio y no dice nada sobre los fallos.',
          ],
        },
        {
          title: 'La guía de etiquetado',
          body: [
            'Antes de etiquetar en volumen, escribí una guía corta: la definición de cada etiqueta, dos ejemplos por etiqueta y qué hacer ante la duda. Esa última parte es la que más se olvida. Sin una regla para los casos dudosos, cada persona resuelve distinto y el dataset acumula inconsistencias. La guía también obliga a tomar decisiones de negocio que estaban implícitas. Si escribir la definición de una etiqueta resulta difícil, es probable que el sistema tampoco pueda aplicarla.',
          ],
        },
        {
          title: 'Dos personas, veinte casos',
          body: [
            'Tomá una muestra de veinte casos y que dos personas la etiqueten por separado, sin verse las respuestas. Después comparen. Los desacuerdos no son errores de las personas: son huecos de la guía. Discutan cada uno, decidan y actualicen la guía con la regla nueva o con un ejemplo. Repitan hasta que los desacuerdos sean pocos. Recién ahí conviene etiquetar el resto. Ese acuerdo entre personas marca además el techo razonable de cualquier modelo.',
          ],
        },
        {
          title: 'Balance',
          body: [
            'Contá cuántos casos hay por clase y por tipo de dificultad. Si el noventa por ciento es fácil, un sistema que resuelve solo lo fácil saca noventa y parece listo para producción. Cada clase y cada tipo difícil necesita representación suficiente como para que su tasa de aciertos diga algo. Eso implica sobrerrepresentar a propósito los casos raros. Está bien: un dataset de evaluación no busca reflejar las proporciones de producción, sino exponer dónde falla el sistema.',
          ],
        },
        {
          title: 'Tres particiones',
          body: [
            'Separá el conjunto en tres. Dev es para iterar: ahí probás prompts y mirás fallos todas las veces que quieras. Test no se usa para ajustar nada ni se cita en los ejemplos del prompt, y se consulta solo para tomar una decisión. Regresión junta todo lo que alguna vez falló y se arregló, para que no vuelva. La disciplina con test es lo difícil. Cada vez que ajustás algo mirando esos resultados, deja de medir cómo se va a comportar el sistema con casos nuevos.',
          ],
        },
        {
          title: 'Versionado',
          body: [
            'Guardá cada partición como JSONL, un caso por línea con un identificador estable, y llevá un CHANGELOG. Corregir una etiqueta es un commit con su motivo, igual que un cambio de código. Después de una corrección hay que recalcular las métricas anteriores, porque el instrumento cambió y los números viejos ya no son comparables. Anotá la versión del dataset en la ficha de cada corrida. Sin ese dato, una mejora de dos puntos puede ser solo una etiqueta corregida.',
          ],
        },
      ],
      en: [
        {
          title: 'Three sources of cases',
          body: [
            'The first source is real usage, anonymized: it shows what inputs are really like, with their typos and ambiguities. The second is the edge cases you know exist even though they rarely show up: boundary values, odd formats, very long inputs. The third is adverse cases, designed to cause trouble: filler text, duplicates, empty inputs or ones in another language. A dataset built only from the first source describes the average and says nothing about the failures.',
          ],
        },
        {
          title: 'The labeling guide',
          body: [
            "Before labeling in volume, write a short guide: the definition of each label, two examples per label and what to do when in doubt. That last part is the one most often forgotten. Without a rule for doubtful cases, each person resolves them differently and the dataset piles up inconsistencies. The guide also forces business decisions that were implicit. If writing a label's definition proves hard, the system probably can't apply it either.",
          ],
        },
        {
          title: 'Two people, twenty cases',
          body: [
            "Take a sample of twenty cases and have two people label it separately, without seeing each other's answers. Then compare. Disagreements aren't the people's errors: they're gaps in the guide. Discuss each one, decide and update the guide with the new rule or an example. Repeat until disagreements are few. Only then is it worth labeling the rest. That agreement between people also marks the reasonable ceiling for any model.",
          ],
        },
        {
          title: 'Balance',
          body: [
            "Count how many cases there are per class and per difficulty type. If ninety percent is easy, a system that solves only the easy part scores ninety and looks ready for production. Each class and each hard type needs enough representation for its hit rate to mean something. That implies over-representing rare cases on purpose. That's fine: an evaluation dataset doesn't aim to mirror production proportions, but to expose where the system fails.",
          ],
        },
        {
          title: 'Three splits',
          body: [
            "Split the set in three. Dev is for iterating: there you try prompts and look at failures as often as you like. Test isn't used for tuning anything nor quoted in prompt examples, and is consulted only to make a decision. Regression collects everything that ever failed and got fixed, so it doesn't come back. Discipline with test is the hard part. Every time you adjust something while looking at those results, it stops measuring how the system will behave on new cases.",
          ],
        },
        {
          title: 'Versioning',
          body: [
            'Store each split as JSONL, one case per line with a stable identifier, and keep a CHANGELOG. Fixing a label is a commit with its reason, just like a code change. After a fix, earlier metrics must be recomputed, because the instrument changed and the old numbers are no longer comparable. Note the dataset version on each run card. Without that fact, a two-point improvement may be nothing more than a corrected label.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un equipo arma un dataset para un sistema que decide si un proveedor nuevo ya existe en el catálogo. Juntan ciento veinte casos: sesenta de uso real anonimizado, cuarenta de borde y veinte adversos. Dos personas etiquetan veinte y discrepan en seis. El origen es una sola pregunta sin responder: si una sucursal cuenta como el mismo proveedor. Lo deciden, lo agregan a la guía y en la segunda ronda discrepan en uno. Al contar, descubren que solo ocho casos son del tipo "nombre casi idéntico, empresa distinta", el error más costoso. Suman doce más. Parten en sesenta de dev, cuarenta de test y veinte de regresión.',
      ],
      en: [
        'A team builds a dataset for a system that decides whether a new supplier already exists in the catalog. They gather one hundred and twenty cases: sixty from anonymized real usage, forty edge cases and twenty adverse. Two people label twenty and disagree on six. The origin is a single unanswered question: whether a branch counts as the same supplier. They decide it, add it to the guide and disagree on one in the second round. Counting, they discover only eight cases are of the "nearly identical name, different company" type, the costliest error. They add twelve more. They split into sixty dev, forty test and twenty regression.',
      ],
    },
    mistakes: {
      es: [
        'Dejar que el modelo genere las etiquetas contra las que se lo evalúa.',
        'Etiquetar todo con una sola persona y sin guía escrita.',
        'Ajustar el prompt mirando los resultados del conjunto de test.',
        'Corregir etiquetas sin registro y comparar métricas viejas con nuevas.',
      ],
      en: [
        "Letting the model generate the labels it's evaluated against.",
        'Labeling everything with a single person and no written guide.',
        'Tuning the prompt while looking at test set results.',
        'Fixing labels with no record and comparing old metrics with new ones.',
      ],
    },
    checklist: {
      es: [
        'El dataset tiene casos reales, de borde y adversos.',
        'Hay una guía de etiquetado con regla para los casos dudosos.',
        'Dos personas etiquetaron una muestra y resolvieron los desacuerdos.',
        'Existen dev, test y regresión en JSONL con CHANGELOG.',
      ],
      en: [
        'The dataset has real, edge and adverse cases.',
        'There is a labeling guide with a rule for doubtful cases.',
        'Two people labeled a sample and resolved their disagreements.',
        'Dev, test and regression exist as JSONL with a CHANGELOG.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Cuántos casos necesita un golden dataset?',
          a: 'Los suficientes para que cada clase y cada tipo difícil tenga varios casos. Para muchas tareas de clasificación, entre cien y trescientos bien elegidos sirven más que miles tomados al azar. Calidad de etiqueta y balance pesan más que el volumen.',
        },
        {
          q: '¿Puedo usar un modelo para ayudar a etiquetar?',
          a: 'Para proponer una primera etiqueta que una persona revisa, en la partición de dev, puede ahorrar tiempo. En test, la etiqueta final tiene que ser de una persona. Si no, estás midiendo cuánto se parece un modelo a otro.',
        },
        {
          q: '¿Cómo anonimizo los casos de uso real?',
          a: 'Reemplazá nombres, documentos, mails y cualquier identificador por valores sintéticos del mismo formato, y revisá los campos de texto libre a mano. Si un caso no se puede anonimizar sin perder lo que lo hace interesante, escribí uno equivalente desde cero.',
        },
      ],
      en: [
        {
          q: 'How many cases does a golden dataset need?',
          a: 'Enough for each class and each hard type to have several cases. For many classification tasks, one to three hundred well-chosen cases serve better than thousands picked at random. Label quality and balance weigh more than volume.',
        },
        {
          q: 'Can I use a model to help with labeling?',
          a: "To propose a first label that a person reviews, in the dev split, it can save time. In test, the final label must come from a person. Otherwise you're measuring how much one model resembles another.",
        },
        {
          q: 'How do I anonymize real usage cases?',
          a: "Replace names, ID numbers, emails and any identifier with synthetic values in the same format, and review free-text fields by hand. If a case can't be anonymized without losing what makes it interesting, write an equivalent one from scratch.",
        },
      ],
    },
    slug: 'qa-ai-17-golden-datasets',
    minutes: 6,
    tags: ['Evals', 'Data Quality', 'Datasets'],
    diagram:
      'real usage (anonymized) ─┐\nedge cases ──────────────┼─▶ case pool ▶ labeling guide + two labelers ▶ balance\nadverse cases ───────────┘                                                  │\n                                 ┌──────────────────────────────────────────┤\n                                 ▼                                          ▼\n                          dev (iterate)                     test (never tune on it)\n\nproduction failures ─▶ regression (grows forever)\n\ndev · test · regression ─▶ Git + CHANGELOG',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d17-light.webp',
      dark: '/publications/qa-ai/diagrams/d17-dark.webp',
      width: 1800,
      height: 307,
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
    title: {
      es: 'Cómo testear un modelo: accuracy, N corridas y rangos',
      en: 'How to test a model: accuracy, N runs and ranges',
    },
    summary: {
      es: 'Cómo medir un modelo que toma decisiones (un agente que mapea nombres desordenados contra un catálogo maestro) con corridas repetidas, rangos y métricas por tipo de error.',
      en: 'How to measure a decision-making model (an agent mapping messy names to a master catalog) with repeated runs, ranges and per-error-type metrics.',
    },
    pitfall: {
      es: 'El mismo modelo con la misma entrada varía varios puntos entre corridas, y algunos modelos fallan directamente con contextos grandes. Un número suelto no describe a un modelo.',
      en: "The same model on the same input varies several points between runs, and some models fail outright on large contexts. A single number doesn't describe a model.",
    },
    requirements: {
      es: [
        'El golden dataset del día 17 (unos 100 casos de test).',
        'Un eval harness con versión de modelo fija (días 8 y 15).',
      ],
      en: [
        'The golden dataset from day 17 (about 100 test cases).',
        'An eval harness with a pinned model version (days 8 and 15).',
      ],
    },
    steps: {
      es: [
        'Definí la tarea y las acciones posibles con precisión. En este caso: mapear a un registro existente, aprobar como nuevo o mandar a revisión.',
        'Corré cada configuración 5 veces sobre el mismo set de test. Una sola corrida no es una medición.',
        'Reportá media y rango (mínimo y máximo). Si dos configuraciones se pisan en el rango, la diferencia es ruido.',
        'Mirá más allá del accuracy: precisión por acción y cantidad de errores caros por corrida. Mapear mal a un registro existente ensucia datos; mandar a revisión de más solo cuesta tiempo.',
        'Compará modelos con el mismo prompt y dataset, calidad contra costo por llamada.',
        'Decidí con la tabla completa. El modelo más caro no siempre gana, y a veces gana por menos que el ruido.',
      ],
      en: [
        'Define the task and possible actions precisely. In this case: map to an existing record, approve as new or send to review.',
        "Run each configuration 5 times on the same test set. A single run isn't a measurement.",
        'Report mean and range (min and max). If two configurations overlap in range, the difference is noise.',
        'Look beyond accuracy: per-action precision and number of costly errors per run. A wrong map to an existing record pollutes data; over-sending to review only costs time.',
        'Compare models with the same prompt and dataset, quality against cost per call.',
        "Decide with the full table. The most expensive model doesn't always win, and sometimes wins by less than the noise.",
      ],
    },
    snippets: [
      {
        code: 'npx promptfoo eval -c evals/mapping.yaml --repeat 5 -o results/run.json',
        lang: 'bash',
      },
      {
        code: 'config                accuracy mean (min-max)   costly errors / run   precision map_to_existing   cost / call\nmodel A, prompt v1    71% (68-75)               4.0                   85%                         low\nmodel B, prompt v1    70% (66-74)               3.6                   86%                         several times more',
        lang: 'text',
        caption: {
          es: 'Tabla de resultados (cifras ilustrativas)',
          en: 'Results table (illustrative figures)',
        },
      },
    ],
    intro: {
      es: [
        '"¿Qué modelo es mejor para esto?" es una pregunta que casi siempre se responde con un ranking público o con la impresión de quien lo probó una tarde. Ninguna de las dos cosas dice cómo se va a comportar en tu tarea, con tus datos y tu prompt. Y cuando alguien lo mide, suele hacerlo con una sola corrida y reportar un solo número.',
        'Probar un modelo en serio se parece más a un experimento que a un test. Hay una tarea definida, un conjunto fijo, varias repeticiones y un resultado con su rango. Esta guía usa un caso de mapeo de registros para mostrar el método completo: qué medir además del accuracy, cómo distinguir una diferencia real del ruido y cómo decidir cuando el modelo más caro no es claramente el mejor. Las cifras que aparecen son ilustrativas.',
      ],
      en: [
        '"Which model is best for this?" is a question almost always answered with a public leaderboard or the impression of whoever tried it one afternoon. Neither says how it will behave on your task, with your data and your prompt. And when someone does measure it, they usually do it with a single run and report a single number.',
        "Testing a model seriously is closer to an experiment than to a test. There is a defined task, a fixed set, several repetitions and a result with its range. This guide uses a record-mapping case to show the full method: what to measure besides accuracy, how to tell a real difference from noise and how to decide when the most expensive model isn't clearly the best. The figures shown are illustrative.",
      ],
    },
    details: {
      es: [
        {
          title: 'Tarea y acciones definidas',
          body: [
            'Escribí con precisión qué recibe el modelo y cuáles son las únicas salidas válidas. En el caso de ejemplo llega un registro nuevo y hay tres acciones posibles: mapearlo a uno existente, aprobarlo como nuevo o enviarlo a revisión humana. Definir las acciones como una lista cerrada vuelve medible la tarea. También obliga a decidir qué se espera en cada situación dudosa. Si la definición es vaga, vas a estar midiendo la interpretación del modelo y no su capacidad.',
          ],
        },
        {
          title: 'Cinco corridas por configuración',
          body: [
            'Corré cada configuración cinco veces sobre el mismo conjunto de test, sin cambiar nada entre corridas. El mismo modelo con la misma entrada puede moverse varios puntos de una corrida a otra. Si medís una sola vez, no sabés si viste su mejor día, el peor o uno típico. Cinco repeticiones es un compromiso razonable entre costo e información. Si los resultados quedan muy dispersos, esa dispersión ya es un hallazgo sobre la estabilidad del modelo en tu tarea.',
          ],
        },
        {
          title: 'Media y rango',
          body: [
            'Reportá el promedio junto con el mínimo y el máximo de las cinco corridas. Después aplicá una regla simple: si los rangos de dos configuraciones se superponen, no podés afirmar que una sea mejor. Esa diferencia es compatible con el ruido. Muchas decisiones de cambiar de modelo o de prompt se toman sobre diferencias de uno o dos puntos que desaparecen al repetir la medición. Mostrar el rango en la tabla evita esa discusión antes de que empiece.',
          ],
        },
        {
          title: 'Más allá del accuracy',
          body: [
            'El accuracy trata todos los errores como iguales, y no lo son. En el ejemplo, mapear un registro a uno existente que no corresponde contamina los datos y es difícil de detectar después. Enviar de más a revisión solo cuesta tiempo de una persona. Por eso conviene mirar la precisión por acción y, sobre todo, contar los errores costosos por corrida. Un modelo con un poco menos de accuracy y la mitad de errores costosos puede ser la mejor elección.',
          ],
        },
        {
          title: 'Mismas condiciones, calidad contra costo',
          body: [
            'Para comparar modelos, mantené fijo todo lo demás: el mismo prompt, el mismo dataset, los mismos parámetros y el mismo juez si lo hay. Agregá a la tabla el costo por llamada y la latencia. La comparación útil no es qué modelo tiene el número más alto sino cuánta calidad adicional obtenés por cada unidad de costo. A veces esa calidad adicional existe, y a veces queda dentro del margen de ruido, pagando varias veces más.',
          ],
        },
        {
          title: 'Decidir con la tabla completa',
          body: [
            'La decisión sale de leer todas las columnas juntas: media, rango, errores costosos, costo y latencia. No siempre gana el más caro, y cuando gana puede hacerlo por menos que el ruido. Dejá la decisión escrita junto con la tabla y la ficha de corrida. Dentro de tres meses, cuando salga un modelo nuevo, vas a poder repetir exactamente el mismo experimento y comparar contra una referencia propia, en lugar de empezar la discusión de cero.',
          ],
        },
      ],
      en: [
        {
          title: 'Task and actions defined',
          body: [
            "Write down precisely what the model receives and which are the only valid outputs. In the sample case a new record arrives and there are three possible actions: map it to an existing one, approve it as new or send it to human review. Defining the actions as a closed list makes the task measurable. It also forces a decision on what is expected in each doubtful situation. If the definition is vague, you'll be measuring the model's interpretation and not its capability.",
          ],
        },
        {
          title: 'Five runs per configuration',
          body: [
            "Run each configuration five times on the same test set, changing nothing between runs. The same model on the same input can move several points from one run to the next. If you measure once, you don't know whether you saw its best day, its worst or a typical one. Five repetitions is a reasonable trade-off between cost and information. If results come out widely spread, that spread is already a finding about the model's stability on your task.",
          ],
        },
        {
          title: 'Mean and range',
          body: [
            "Report the mean together with the minimum and maximum of the five runs. Then apply a simple rule: if the ranges of two configurations overlap, you can't claim one is better. That difference is compatible with noise. Many decisions to switch model or prompt are made on one- or two-point differences that vanish when the measurement is repeated. Showing the range in the table avoids that argument before it starts.",
          ],
        },
        {
          title: 'Beyond accuracy',
          body: [
            "Accuracy treats all errors as equal, and they aren't. In the example, mapping a record to an existing one that doesn't correspond pollutes the data and is hard to detect later. Over-sending to review only costs a person's time. That's why it's worth looking at per-action precision and, above all, counting costly errors per run. A model with slightly lower accuracy and half the costly errors may be the best choice.",
          ],
        },
        {
          title: 'Same conditions, quality against cost',
          body: [
            "To compare models, hold everything else fixed: the same prompt, the same dataset, the same parameters and the same judge if there is one. Add cost per call and latency to the table. The useful comparison isn't which model has the highest number but how much additional quality you get per unit of cost. Sometimes that additional quality exists, and sometimes it sits within the noise margin, at several times the price.",
          ],
        },
        {
          title: 'Decide with the full table',
          body: [
            "The decision comes from reading all the columns together: mean, range, costly errors, cost and latency. The most expensive doesn't always win, and when it does it may win by less than the noise. Leave the decision in writing together with the table and the run card. Three months from now, when a new model comes out, you'll be able to repeat exactly the same experiment and compare against a reference of your own, instead of starting the discussion from zero.",
          ],
        },
      ],
    },
    example: {
      es: [
        'Con cifras inventadas para ilustrar el método: un equipo compara tres configuraciones sobre cuarenta casos de test, cinco corridas cada una. El modelo chico promedia 71% con rango de 68 a 75 y seis errores costosos por corrida. El mediano, 84% con rango de 81 a 86 y dos errores costosos. El grande, 85% con rango de 82 a 88, también dos errores costosos y un costo cinco veces mayor que el mediano. Los rangos del mediano y del grande se superponen casi por completo, así que la diferencia de un punto no es evidencia. Eligen el mediano y documentan que el grande no justificó su costo en esta tarea.',
      ],
      en: [
        "With made-up figures to illustrate the method: a team compares three configurations on forty test cases, five runs each. The small model averages 71% with a range of 68 to 75 and six costly errors per run. The medium one, 84% with a range of 81 to 86 and two costly errors. The large one, 85% with a range of 82 to 88, also two costly errors and five times the cost of the medium one. The medium and large ranges overlap almost entirely, so the one-point difference isn't evidence. They choose the medium one and document that the large one didn't justify its cost on this task.",
      ],
    },
    mistakes: {
      es: [
        'Decidir con una sola corrida por modelo.',
        'Reportar un promedio sin su rango.',
        'Mirar solo accuracy cuando los errores tienen costos distintos.',
        'Comparar modelos con prompts o datasets diferentes.',
      ],
      en: [
        'Deciding with a single run per model.',
        'Reporting a mean without its range.',
        'Looking only at accuracy when errors have different costs.',
        'Comparing models with different prompts or datasets.',
      ],
    },
    checklist: {
      es: [
        'La tarea tiene una lista cerrada de acciones válidas.',
        'Cada configuración corrió cinco veces sobre el mismo test.',
        'La tabla muestra media, rango, errores costosos, costo y latencia.',
        'La decisión quedó escrita junto a la tabla y la ficha de corrida.',
      ],
      en: [
        'The task has a closed list of valid actions.',
        'Each configuration ran five times on the same test set.',
        'The table shows mean, range, costly errors, cost and latency.',
        'The decision is written down next to the table and the run card.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Cinco corridas alcanzan para afirmar algo con rigor estadístico?',
          a: 'Alcanzan para una regla práctica: descartar diferencias que caen dentro del rango. Para decisiones de alto impacto conviene sumar corridas y casos y usar un test estadístico formal. Lo que no sirve en ningún caso es una sola corrida.',
        },
        {
          q: '¿Los benchmarks públicos no alcanzan?',
          a: 'Sirven para armar una lista corta de candidatos. No dicen cómo rinde un modelo con tu prompt, tu formato de salida y tus casos difíciles. La decisión final sale de tu dataset.',
        },
        {
          q: '¿Qué hago si un modelo falla directamente con entradas grandes?',
          a: 'Registralo como resultado, no lo descartes en silencio. Un modelo que no puede procesar el contexto que tu tarea necesita queda fuera por ese motivo, y esa es una conclusión válida del experimento.',
        },
      ],
      en: [
        {
          q: 'Are five runs enough to claim something with statistical rigor?',
          a: "They're enough for a practical rule: discarding differences that fall within the range. For high-impact decisions, add runs and cases and use a formal statistical test. What never works is a single run.",
        },
        {
          q: "Aren't public benchmarks enough?",
          a: "They help build a shortlist of candidates. They don't say how a model performs with your prompt, your output format and your hard cases. The final decision comes from your dataset.",
        },
        {
          q: 'What do I do if a model fails outright on large inputs?',
          a: "Record it as a result, don't discard it silently. A model that can't process the context your task needs is out for that reason, and that's a valid conclusion of the experiment.",
        },
      ],
    },
    slug: 'qa-ai-18-how-to-test-a-model',
    minutes: 6,
    tags: ['Evals', 'LLM', 'Data Quality'],
    diagram:
      'test set (~100 labeled cases)\n   ▼\nrun x5 per configuration (model A · model B, same prompt)\n   ├─ accuracy: mean and min-max\n   ├─ precision per action\n   ├─ costly errors per run\n   └─ cost per call\n   ▼\nranges overlap?\n   ├─ yes ▶ the difference is noise: decide on cost\n   └─ no  ▶ real difference: weigh quality against cost',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d18-light.webp',
      dark: '/publications/qa-ai/diagrams/d18-dark.webp',
      width: 1800,
      height: 1258,
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
    title: {
      es: 'Costo como métrica de calidad: prefiltro top-K antes del modelo',
      en: 'Cost as a quality metric: top-K prefiltering before the model',
    },
    summary: {
      es: 'Cómo reducir los tokens de entrada de un agente con un prefiltro local de candidatos y demostrar con mediciones que la calidad no baja.',
      en: "How to cut an agent's input tokens with a local candidate prefilter and prove with measurements that quality doesn't drop.",
    },
    pitfall: {
      es: 'Con muchos candidatos parecidos en contexto, el modelo elige mal con más frecuencia. El contexto se diseña y se mide, no se acumula.',
      en: 'With many similar candidates in context, the model picks wrong more often. Context is designed and measured, not piled up.',
    },
    requirements: {
      es: [
        'El caso del día 18: nombres a mapear contra un catálogo.',
        'Un set etiquetado con la respuesta correcta por nombre.',
      ],
      en: [
        'The day 18 case: names to map against a catalog.',
        'A labeled set with the correct answer per name.',
      ],
    },
    steps: {
      es: [
        'Medí el punto de partida: tokens de entrada por llamada y qué parte es contexto fijo (por ejemplo, el catálogo entero).',
        'Armá un prefiltro local que elija los K candidatos más parecidos. Empezá por uno léxico simple: es gratis y no llama a ningún modelo.',
        'Medí el recall del prefiltro: en cuántos casos etiquetados la respuesta correcta queda entre los K. Si no está ahí, el modelo no puede acertar.',
        'Compará métodos (léxico contra embeddings) y valores de K con ese mismo recall. No des por hecho que embeddings gana.',
        'Corré el eval completo, 5 veces, con lista entera y con cada K. Compará accuracy, errores caros, tokens y costo.',
        'Elegí el K más chico que mantiene recall y accuracy. Más candidatos parecidos pueden confundir al modelo y empeorar el resultado.',
      ],
      en: [
        'Measure the baseline: input tokens per call and how much is fixed context (for example, the whole catalog).',
        "Build a local prefilter that picks the K most similar candidates. Start with a simple lexical one: it's free and calls no model.",
        "Measure prefilter recall: in how many labeled cases the correct answer is among the K. If it isn't there, the model can't get it right.",
        "Compare methods (lexical versus embeddings) and K values on that same recall. Don't assume embeddings win.",
        'Run the full eval, 5 times, with the full list and with each K. Compare accuracy, costly errors, tokens and cost.',
        'Pick the smallest K that keeps recall and accuracy. More similar candidates can confuse the model and make results worse.',
      ],
    },
    snippets: [
      {
        code: 'const grams = (s) => {\n  const t = "  " + s.toLowerCase() + " ";\n  const g = new Set();\n  for (let i = 0; i < t.length - 2; i++) g.add(t.slice(i, i + 3));\n  return g;\n};\n\nconst sim = (a, b) => {\n  const A = grams(a);\n  const B = grams(b);\n  let inter = 0;\n  A.forEach((x) => B.has(x) && inter++);\n  return inter / (A.size + B.size - inter);\n};\n\nexport const topK = (query, catalog, k = 10) =>\n  catalog\n    .map((c) => ({ c, s: sim(query, c) }))\n    .sort((x, y) => y.s - x.s)\n    .slice(0, k)\n    .map((x) => x.c);',
        lang: 'js',
        caption: {
          es: 'scripts/topk.mjs (prefiltro léxico, sin llamadas a modelos)',
          en: 'scripts/topk.mjs (lexical prefilter, no model calls)',
        },
      },
    ],
    intro: {
      es: [
        'En QA estamos acostumbrados a que la calidad se mida en defectos. Con sistemas que usan modelos, el costo se vuelve una dimensión de calidad igual de concreta: una funcionalidad que acierta pero cuesta demasiado por llamada no se puede sostener en producción, y una que es barata y falla tampoco sirve. Alguien tiene que medir las dos cosas juntas.',
        'El caso más común de costo innecesario es mandar al modelo todo el contexto disponible, por las dudas. Esta guía muestra una técnica para evitarlo: un prefiltro local que elige los K candidatos más relevantes antes de llamar al modelo. Y muestra cómo probarlo, porque un prefiltro mal medido baja el costo y también la calidad sin que nadie lo note.',
      ],
      en: [
        "In QA we're used to quality being measured in defects. With systems that use models, cost becomes an equally concrete quality dimension: a feature that gets it right but costs too much per call can't be sustained in production, and one that's cheap and fails is no good either. Someone has to measure both together.",
        'The most common case of unnecessary cost is sending the model all the available context, just in case. This guide shows a technique to avoid it: a local prefilter that picks the K most relevant candidates before calling the model. And it shows how to test it, because a badly measured prefilter lowers cost and quality alike without anyone noticing.',
      ],
    },
    details: {
      es: [
        {
          title: 'La línea de base',
          body: [
            'Antes de optimizar, medí. Para una muestra de llamadas, registrá cuántos tokens de entrada usa cada una y cuántos corresponden a contexto fijo que se repite siempre, como un catálogo entero o un documento completo. En muchos sistemas esa parte fija es la mayor parte del costo. Anotá también la calidad actual con el eval que ya tenés. Sin esos dos números, tokens y calidad, no vas a poder decir después si el cambio fue una mejora o solo un cambio.',
          ],
        },
        {
          title: 'Un prefiltro local y simple',
          body: [
            'El prefiltro recibe la entrada y la lista completa de candidatos, y devuelve los K más parecidos. Empezá con un método léxico, por ejemplo similitud por trigramas de caracteres: se escribe en pocas líneas, corre en milisegundos y no llama a ningún modelo. Es además determinista, así que se puede probar con tests clásicos. La tentación es saltar directo a algo más sofisticado. Resistila hasta tener un número que muestre que lo simple no alcanza.',
          ],
        },
        {
          title: 'Recall del prefiltro',
          body: [
            'Esta es la medición central. Para cada caso etiquetado, verificá si la respuesta correcta está entre los K candidatos que devolvió el prefiltro. El porcentaje de casos donde está es el recall. Funciona como techo de todo el sistema: si la respuesta correcta no llega al contexto, el modelo no tiene forma de elegirla, por bueno que sea. Es un test determinista, barato y rápido, y te dice si el problema está antes del modelo o en el modelo.',
          ],
        },
        {
          title: 'Comparar métodos y valores de K',
          body: [
            'Con el recall como métrica podés comparar opciones de forma justa: método léxico contra embeddings, y distintos valores de K para cada uno. Armá una tabla. No asumas que los embeddings ganan. En tareas con nombres propios, códigos o abreviaturas, la similitud léxica suele rendir igual o mejor, y además es gratis. Los embeddings ayudan cuando la relación es de significado y no de escritura. Dejá que tus datos lo decidan.',
          ],
        },
        {
          title: 'El eval completo con cada K',
          body: [
            'El recall mide el prefiltro, no el resultado final. Corré el eval de punta a punta, cinco veces, con la lista completa y con cada valor de K. Compará accuracy, errores costosos, tokens y costo. Vas a ver algo que suele sorprender: más contexto no siempre da mejor resultado. Con muchos candidatos parecidos en el prompt, el modelo se confunde más. Hay un punto a partir del cual agregar candidatos empeora la calidad y sube el costo al mismo tiempo.',
          ],
        },
        {
          title: 'Elegir el K más chico que alcanza',
          body: [
            'La regla de decisión es elegir el menor K que mantiene el recall y el accuracy dentro del rango de la línea de base. Documentá la tabla completa y el valor elegido. Agregá el recall del prefiltro como test permanente en CI: si alguien cambia el método o el catálogo crece mucho, el recall puede bajar sin aviso. Ese test tarda segundos, y protege una pieza que, cuando falla, hace fallar a todo lo que viene después.',
          ],
        },
      ],
      en: [
        {
          title: 'The baseline',
          body: [
            "Before optimizing, measure. For a sample of calls, record how many input tokens each one uses and how many correspond to fixed context repeated every time, such as a whole catalog or a full document. In many systems that fixed part is most of the cost. Also note current quality with the eval you already have. Without those two numbers, tokens and quality, you won't be able to say afterwards whether the change was an improvement or merely a change.",
          ],
        },
        {
          title: 'A simple local prefilter',
          body: [
            "The prefilter takes the input and the full candidate list, and returns the K most similar. Start with a lexical method, for example character trigram similarity: it takes a few lines to write, runs in milliseconds and calls no model. It's also deterministic, so it can be tested with classic tests. The temptation is to jump straight to something more sophisticated. Resist it until you have a number showing the simple approach falls short.",
          ],
        },
        {
          title: 'Prefilter recall',
          body: [
            "This is the central measurement. For each labeled case, check whether the correct answer is among the K candidates the prefilter returned. The percentage of cases where it is, is recall. It works as the ceiling for the whole system: if the correct answer doesn't reach the context, the model has no way of choosing it, however good it is. It's a deterministic, cheap, fast test, and it tells you whether the problem lies before the model or in the model.",
          ],
        },
        {
          title: 'Compare methods and K values',
          body: [
            "With recall as the metric you can compare options fairly: lexical method against embeddings, and different K values for each. Build a table. Don't assume embeddings win. In tasks with proper names, codes or abbreviations, lexical similarity often performs as well or better, and it's free. Embeddings help when the relationship is one of meaning rather than spelling. Let your data decide.",
          ],
        },
        {
          title: 'The full eval with each K',
          body: [
            "Recall measures the prefilter, not the final result. Run the eval end to end, five times, with the full list and with each K value. Compare accuracy, costly errors, tokens and cost. You'll see something that tends to surprise: more context doesn't always give a better result. With many similar candidates in the prompt, the model gets confused more. There's a point beyond which adding candidates worsens quality and raises cost at the same time.",
          ],
        },
        {
          title: 'Choose the smallest K that suffices',
          body: [
            'The decision rule is choosing the smallest K that keeps recall and accuracy within the baseline range. Document the full table and the chosen value. Add prefilter recall as a permanent test in CI: if someone changes the method or the catalog grows a lot, recall can drop without notice. That test takes seconds, and it protects a piece that, when it fails, makes everything after it fail.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Con números ilustrativos: un sistema envía en cada llamada un catálogo de dos mil registros, unos sesenta mil tokens de entrada. El equipo arma un prefiltro por trigramas y mide el recall sobre ochenta casos etiquetados. Con K igual a cinco, la respuesta correcta está en el 90% de los casos; con diez, en el 97%; con veinte, en el 99%; con cincuenta, también en el 99%. Prueban embeddings y con K igual a veinte obtienen 98%: no mejora. En el eval completo, K igual a veinte da el mismo accuracy que la lista entera, con un error costoso menos por corrida y alrededor de un tres por ciento de los tokens. Con cincuenta, el accuracy baja dos puntos.',
      ],
      en: [
        'With illustrative numbers: a system sends a catalog of two thousand records on every call, about sixty thousand input tokens. The team builds a trigram prefilter and measures recall on eighty labeled cases. With K equal to five, the correct answer is present in 90% of cases; with ten, in 97%; with twenty, in 99%; with fifty, also 99%. They try embeddings and with K equal to twenty get 98%: no improvement. In the full eval, K equal to twenty gives the same accuracy as the full list, with one fewer costly error per run and around three percent of the tokens. With fifty, accuracy drops two points.',
      ],
    },
    mistakes: {
      es: [
        'Reducir el contexto sin medir el recall del prefiltro.',
        'Asumir que los embeddings superan a un método léxico.',
        'Evaluar solo el costo y no la calidad de punta a punta.',
        'Elegir un K grande "para estar seguros".',
      ],
      en: [
        'Shrinking context without measuring prefilter recall.',
        'Assuming embeddings beat a lexical method.',
        'Evaluating only cost and not end-to-end quality.',
        'Choosing a large K "to be safe".',
      ],
    },
    checklist: {
      es: [
        'Tenés tokens de entrada y calidad de la línea de base.',
        'El recall del prefiltro está medido para varios valores de K.',
        'El eval completo corrió con la lista entera y con cada K.',
        'El recall del prefiltro corre como test en CI.',
      ],
      en: [
        'You have baseline input tokens and quality.',
        'Prefilter recall is measured for several K values.',
        'The full eval ran with the full list and with each K.',
        'Prefilter recall runs as a test in CI.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Esto es lo mismo que RAG?',
          a: 'Es la misma idea aplicada a una lista de candidatos: recuperar primero y generar después. Por eso las mediciones se parecen. En el día veintiuno vemos el caso con documentos, donde además hay que verificar que la respuesta sea fiel a lo recuperado.',
        },
        {
          q: '¿El caché de prompts no resuelve el costo?',
          a: 'Ayuda con el contexto fijo que se repite y conviene activarlo cuando el proveedor lo ofrece. No resuelve el segundo problema: muchos candidatos parecidos siguen confundiendo al modelo. Prefiltro y caché se complementan.',
        },
        {
          q: '¿Qué pasa si el catálogo cambia seguido?',
          a: 'El prefiltro léxico no necesita reentrenarse, solo recibir la lista actualizada. Lo que sí hay que repetir es la medición de recall cuando el catálogo crece mucho o cambia de naturaleza, porque el K que alcanzaba puede quedar corto.',
        },
      ],
      en: [
        {
          q: 'Is this the same as RAG?',
          a: "It's the same idea applied to a list of candidates: retrieve first and generate afterwards. That's why the measurements look alike. On day twenty-one we cover the case with documents, where you also need to verify the answer is faithful to what was retrieved.",
        },
        {
          q: "Doesn't prompt caching solve the cost?",
          a: "It helps with fixed, repeated context and is worth enabling when the provider offers it. It doesn't solve the second problem: many similar candidates still confuse the model. Prefilter and cache complement each other.",
        },
        {
          q: 'What if the catalog changes often?',
          a: 'The lexical prefilter needs no retraining, only the updated list. What does need repeating is the recall measurement when the catalog grows a lot or changes in nature, because the K that was enough may fall short.',
        },
      ],
    },
    slug: 'qa-ai-19-top-k-prefilter-cost',
    minutes: 7,
    tags: ['LLM', 'Cost', 'Evals'],
    diagram:
      'input name ──┐\nfull catalog ┴─▶ local prefilter: top-K candidates ─▶ model call ─▶ decision\n                       │                                  │\n                       ▼                                  ▼\n            recall at K (labeled set)      accuracy x5 + costly errors\n                                           input tokens and cost per call',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d19-light.webp',
      dark: '/publications/qa-ai/diagrams/d19-dark.webp',
      width: 1800,
      height: 465,
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
    title: {
      es: 'Regresión de prompts: versionar, comparar y no romper lo que andaba',
      en: "Prompt regression: version, compare and don't break what worked",
    },
    summary: {
      es: 'Tratar cada cambio de prompt como un cambio de código: versión, comparación lado a lado y un set de regresión que decide el merge.',
      en: 'Treating every prompt change as a code change: version, side-by-side comparison and a regression set that decides the merge.',
    },
    pitfall: {
      es: 'El cumplimiento de una regla del prompt es probabilístico. Hay que medir en qué porcentaje de corridas se respeta.',
      en: "Adherence to a prompt rule is probabilistic. Measure in what percentage of runs it's honored.",
    },
    requirements: {
      es: [
        'Un golden dataset con `test` y `regression` (día 17).',
        'Dos versiones del prompt en archivos separados.',
      ],
      en: [
        'A golden dataset with `test` and `regression` (day 17).',
        'Two prompt versions in separate files.',
      ],
    },
    steps: {
      es: [
        'Cada versión del prompt es un archivo, con una línea de changelog que diga qué regla cambió y por qué.',
        'Un cambio por versión. Si cambiás tres cosas juntas, no sabés cuál movió el resultado.',
        'Corré las dos versiones lado a lado sobre el set de test, 5 veces, y sobre el de regresión.',
        'Mirá el movimiento por tipo de error, no solo el total. Arreglar un tipo suele subir otro.',
        'Controlá fugas: los ejemplos que ponés en el prompt no pueden ser casos del set de test.',
        'Regla de merge: test mejora por encima del ruido y regresión no baja. Después, los casos recién arreglados entran al set de regresión.',
      ],
      en: [
        'Each prompt version is a file, with a changelog line stating which rule changed and why.',
        "One change per version. If you change three things at once, you don't know which one moved the result.",
        'Run both versions side by side on the test set, 5 times, and on the regression set.',
        'Look at movement per error type, not just the total. Fixing one type often raises another.',
        "Check for leakage: examples you put in the prompt can't be test set cases.",
        "Merge rule: test improves beyond noise and regression doesn't drop. Then the newly fixed cases join the regression set.",
      ],
    },
    snippets: [
      {
        code: 'prompts:\n  - file://../prompts/classifier.v6.txt\n  - file://../prompts/classifier.v7.txt\nproviders:\n  - id: openai:chat:YOUR_PINNED_MODEL_ID\n    config: { temperature: 0 }\ntests: file://../data/golden/test.jsonl',
        lang: 'yaml',
        caption: {
          es: 'evals/classifier-regression.yaml',
          en: 'evals/classifier-regression.yaml',
        },
      },
      {
        code: 'npx promptfoo eval -c evals/classifier-regression.yaml --repeat 5\nnpx promptfoo view',
        lang: 'bash',
      },
      {
        code: '## v7\n- Added rule: performance complaints with no blocked flow are "medium", not "high".\n- "critical" is now only for blocked payment, login or data loss.\n- Examples in the prompt are NOT taken from the test set.',
        lang: 'markdown',
        caption: {
          es: 'prompts/CHANGELOG.md',
          en: 'prompts/CHANGELOG.md',
        },
      },
    ],
    intro: {
      es: [
        'Un prompt en producción es código que se modifica seguido y casi nunca se prueba. Alguien encuentra un caso que falla, agrega una frase para arreglarlo, lo prueba con ese mismo caso, ve que funciona y lo publica. Una semana después aparecen tres casos que antes andaban y ahora no. Nadie conecta una cosa con la otra, porque no hay registro de qué cambió ni de cómo estaba antes.',
        'Es un problema clásico de regresión, y se resuelve con las herramientas clásicas adaptadas: versiones, cambios chicos, comparación lado a lado y un conjunto de regresión que crece. Esta guía arma ese flujo y agrega dos cuidados propios de los modelos: mirar los errores por tipo y vigilar que los ejemplos del prompt no se filtren desde el conjunto de test.',
      ],
      en: [
        "A prompt in production is code that gets modified often and almost never tested. Someone finds a failing case, adds a sentence to fix it, tries it on that same case, sees it works and ships it. A week later three cases that used to work no longer do. Nobody connects one thing with the other, because there's no record of what changed or how it was before.",
        "It's a classic regression problem, and it's solved with the classic tools adapted: versions, small changes, side-by-side comparison and a regression set that grows. This guide builds that flow and adds two cautions specific to models: looking at errors by type and watching that prompt examples don't leak from the test set.",
      ],
    },
    details: {
      es: [
        {
          title: 'Una versión, un archivo, una línea de changelog',
          body: [
            'Cada versión del prompt es un archivo propio con su número, y cada una tiene una línea en el changelog que dice qué regla cambió y por qué. No sobrescribas el archivo anterior, porque lo vas a necesitar para comparar. El porqué importa tanto como el qué. "Se agregó regla para quejas de rendimiento" no alcanza. Sumale qué caso la motivó. Dentro de unos meses, alguien va a querer quitar esa regla, y sin el motivo no va a saber qué puede romper.',
          ],
        },
        {
          title: 'Un cambio por versión',
          body: [
            'Si en una misma versión reescribís una regla, agregás un ejemplo y cambiás el formato de salida, y el resultado se mueve, no sabés cuál de las tres cosas lo movió. Puede incluso que una haya mejorado y otra empeorado, y veas un empate. Un cambio por versión hace que cada medición tenga una sola explicación posible. Parece más lento. En la práctica es más rápido, porque no perdés tiempo desarmando cambios mezclados para encontrar el que causó el problema.',
          ],
        },
        {
          title: 'Lado a lado, cinco veces',
          body: [
            'Configurá el eval con las dos versiones como prompts del mismo archivo, de modo que corran sobre los mismos casos. Usá el conjunto de test y también el de regresión, con cinco repeticiones. El visor muestra las dos columnas y permite filtrar los casos donde una versión pasa y la otra no. Esos casos son los que hay que leer. Ahí aparece lo que arreglaste, lo que rompiste y lo que cambió de respuesta sin cambiar de veredicto.',
          ],
        },
        {
          title: 'Movimiento por tipo de error',
          body: [
            'El total puede quedar igual mientras por debajo cambia todo. Clasificá los fallos por tipo y compará la cantidad de cada tipo entre versiones. Es habitual que una regla nueva arregle una categoría y empeore otra. Una instrucción que vuelve al modelo más cauto con las quejas, por ejemplo, puede hacer que marque de menos los bloqueos reales. Si solo mirás el porcentaje global, ese intercambio queda oculto, y lo vas a descubrir en producción.',
          ],
        },
        {
          title: 'Fugas entre prompt y test',
          body: [
            'Los ejemplos que ponés en el prompt no pueden ser casos del conjunto de test, ni casi iguales. Si lo son, el modelo ve la respuesta antes de la pregunta y la métrica sube sin que haya mejorado nada. Es una fuga fácil de cometer: el caso que falla es justo el que uno quiere usar de ejemplo. Sacá los ejemplos del conjunto de dev o escribilos desde cero, y verificá con una búsqueda de texto que ninguno aparezca en test.',
          ],
        },
        {
          title: 'La regla de merge',
          body: [
            'Definí por adelantado cuándo una versión nueva reemplaza a la anterior: el conjunto de test mejora por encima del ruido, es decir sin superposición de rangos, y el de regresión no baja. Si cumple, se mergea. Después, los casos recién arreglados pasan al conjunto de regresión. Así cada problema resuelto queda protegido para siempre. Si no cumple, la versión se descarta o se sigue trabajando, pero no se publica "porque parece mejor".',
          ],
        },
      ],
      en: [
        {
          title: 'One version, one file, one changelog line',
          body: [
            "Each prompt version is its own file with its number, and each has a changelog line stating which rule changed and why. Don't overwrite the previous file, because you'll need it to compare. The why matters as much as the what. \"Added rule for performance complaints\" isn't enough. Add which case motivated it. Months from now someone will want to remove that rule, and without the reason they won't know what it might break.",
          ],
        },
        {
          title: 'One change per version',
          body: [
            "If in a single version you rewrite a rule, add an example and change the output format, and the result moves, you don't know which of the three moved it. One may even have improved things and another worsened them, and you see a tie. One change per version means each measurement has a single possible explanation. It looks slower. In practice it's faster, because you don't waste time untangling mixed changes to find the one that caused the problem.",
          ],
        },
        {
          title: 'Side by side, five times',
          body: [
            "Set up the eval with both versions as prompts in the same file, so they run on the same cases. Use the test set and the regression set as well, with five repetitions. The viewer shows the two columns and lets you filter the cases where one version passes and the other doesn't. Those are the cases to read. That's where you see what you fixed, what you broke and what changed its answer without changing its verdict.",
          ],
        },
        {
          title: 'Movement by error type',
          body: [
            "The total can stay the same while everything shifts underneath. Classify failures by type and compare the count of each type across versions. It's common for a new rule to fix one category and worsen another. An instruction making the model more cautious with complaints, for example, can make it under-flag real blockers. If you look only at the overall percentage, that trade stays hidden, and you'll discover it in production.",
          ],
        },
        {
          title: 'Leaks between prompt and test',
          body: [
            "The examples you put in the prompt can't be test set cases, nor nearly identical ones. If they are, the model sees the answer before the question and the metric rises with nothing having improved. It's an easy leak to commit: the failing case is exactly the one you want to use as an example. Take examples from the dev set or write them from scratch, and verify with a text search that none appears in test.",
          ],
        },
        {
          title: 'The merge rule',
          body: [
            "Define in advance when a new version replaces the previous one: the test set improves beyond noise, meaning no overlapping ranges, and the regression set doesn't drop. If it qualifies, it merges. Afterwards, the newly fixed cases join the regression set. That way every solved problem stays protected for good. If it doesn't qualify, the version is discarded or worked on further, but it doesn't ship \"because it looks better\".",
          ],
        },
      ],
    },
    example: {
      es: [
        'Un clasificador de tickets marca como bloqueante cualquier queja de lentitud. El equipo crea la versión siete con una sola regla nueva: las quejas de rendimiento sin un flujo bloqueado son de severidad media. La corren contra la versión seis, cinco veces. En test, el promedio sube de 82 a 88 sin superposición de rangos. En regresión, baja un caso: un ticket que decía "tarda tanto que no puedo pagar" ahora sale como medio. Es un bloqueo real. Ajustan la redacción de la regla en una versión ocho, vuelven a correr, y regresión queda completa. Mergean la ocho y suman cuatro casos nuevos al conjunto de regresión. Las cifras son ilustrativas.',
      ],
      en: [
        "A ticket classifier marks any slowness complaint as blocking. The team creates version seven with a single new rule: performance complaints with no blocked flow are medium severity. They run it against version six, five times. On test, the mean rises from 82 to 88 with no overlapping ranges. On regression, one case drops: a ticket saying \"it takes so long I can't pay\" now comes out as medium. That's a real blocker. They adjust the rule's wording in a version eight, run again, and regression is complete. They merge eight and add four new cases to the regression set. The figures are illustrative.",
      ],
    },
    mistakes: {
      es: [
        'Sobrescribir el prompt sin conservar la versión anterior.',
        'Meter varios cambios en una misma versión.',
        'Probar el cambio solo con el caso que lo motivó.',
        'Usar casos del conjunto de test como ejemplos del prompt.',
      ],
      en: [
        'Overwriting the prompt without keeping the previous version.',
        'Putting several changes into a single version.',
        'Trying the change only on the case that motivated it.',
        'Using test set cases as prompt examples.',
      ],
    },
    checklist: {
      es: [
        'Cada versión del prompt es un archivo con su línea de changelog.',
        'La versión nueva tiene un solo cambio respecto de la anterior.',
        'Las dos versiones corrieron lado a lado en test y en regresión.',
        'Los casos arreglados se sumaron al conjunto de regresión.',
      ],
      en: [
        'Each prompt version is a file with its changelog line.',
        'The new version has a single change from the previous one.',
        'Both versions ran side by side on test and on regression.',
        'The fixed cases were added to the regression set.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Cuántas versiones viejas conviene guardar?',
          a: 'Todas están en el historial de git, así que no hay costo en conservarlas. En la carpeta de trabajo alcanza con la versión en producción y la candidata. Lo importante es poder reconstruir cualquier versión anterior para comparar.',
        },
        {
          q: '¿Qué pasa cuando cambia el modelo en lugar del prompt?',
          a: 'Es el mismo procedimiento. Un cambio de modelo es una versión nueva que se compara lado a lado contra la actual con el mismo prompt, y se mergea con la misma regla. Conviene no cambiar las dos cosas a la vez.',
        },
        {
          q: '¿El conjunto de regresión no crece demasiado?',
          a: 'Crece despacio, un puñado de casos por cambio. Si un día se vuelve caro de correr, podés agrupar casos equivalentes y conservar uno representativo de cada tipo. No lo recortes eliminando los que pasan siempre: esa es justamente su función.',
        },
      ],
      en: [
        {
          q: 'How many old versions should I keep?',
          a: "They're all in git history, so keeping them costs nothing. In the working folder, the production version and the candidate are enough. What matters is being able to reconstruct any earlier version to compare.",
        },
        {
          q: 'What happens when the model changes instead of the prompt?',
          a: "Same procedure. A model change is a new version compared side by side against the current one with the same prompt, and merged under the same rule. It's best not to change both at once.",
        },
        {
          q: "Doesn't the regression set grow too large?",
          a: "It grows slowly, a handful of cases per change. If it ever becomes expensive to run, you can group equivalent cases and keep one representative of each type. Don't trim it by removing the ones that always pass: that is exactly their job.",
        },
      ],
    },
    slug: 'qa-ai-20-prompt-regression',
    minutes: 6,
    tags: ['Prompting', 'Evals', 'Regression'],
    diagram:
      'prompt v6 ──────────────┐\nprompt v7 (one change) ─┴─▶ eval x5 on test + regression\n                               ▼\n        test improves beyond noise? ──── no ──▶ reject or iterate\n                               ▼ yes\n        regression holds? ────────────── no ──▶ reject or iterate\n                               ▼ yes\n        no error type got worse? ─────── no ──▶ reject or iterate\n                               ▼ yes\n        merge v7 + add fixed cases to regression',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d20-light.webp',
      dark: '/publications/qa-ai/diagrams/d20-dark.webp',
      width: 1000,
      height: 2338,
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
    title: {
      es: 'Testing de RAG: retrieval, fidelidad y respuesta por separado',
      en: 'Testing RAG: retrieval, faithfulness and answer, separately',
    },
    summary: {
      es: 'Cómo probar un sistema RAG en tres capas para saber, cuando falla, si el problema está en la búsqueda, en la generación o en la base de conocimiento.',
      en: 'How to test a RAG system in three layers so that, when it fails, you know whether the problem is retrieval, generation or the knowledge base.',
    },
    pitfall: {
      es: 'Con la fuente correcta en contexto, igual altera cifras. La fidelidad se mide, no se supone.',
      en: 'With the right source in context, it still alters figures. Faithfulness is measured, not assumed.',
    },
    requirements: {
      es: [
        'Python 3.10+ y una app RAG que exponga la respuesta y los fragmentos recuperados.',
        '20 preguntas con respuesta esperada y documento fuente.',
        'DeepEval usa por defecto un modelo de OpenAI como juez (requiere `OPENAI_API_KEY`); su documentación explica cómo usar otro.',
      ],
      en: [
        'Python 3.10+ and a RAG app exposing the answer and the retrieved chunks.',
        '20 questions with expected answer and source document.',
        'DeepEval defaults to an OpenAI model as judge (needs `OPENAI_API_KEY`); its docs explain how to use another.',
      ],
    },
    steps: {
      es: [
        '**Capa 1, retrieval**: para cada pregunta, verificá si el documento correcto aparece entre los fragmentos recuperados. Es determinista y no necesita un modelo.',
        '**Capa 2, fidelidad**: cada afirmación de la respuesta tiene que estar respaldada por los fragmentos recuperados. Acá se detectan las invenciones.',
        '**Capa 3, respuesta**: ¿responde lo que se preguntó y coincide con lo esperado?',
        'Sumá casos negativos: preguntas cuya respuesta no está en la base. El sistema tiene que decir que no sabe.',
        'Diagnosticá por capa: retrieval bajo se arregla en chunking, índice o búsqueda; fidelidad baja se arregla en prompt o modelo. Cambiar el prompt no arregla un mal retrieval.',
        'Llevá las tres métricas a CI con umbrales y seguí su evolución en cada cambio de documentos.',
      ],
      en: [
        "**Layer 1, retrieval**: for each question, check whether the right document shows up among the retrieved chunks. It's deterministic and needs no model.",
        '**Layer 2, faithfulness**: every claim in the answer must be supported by the retrieved chunks. This is where fabrications get caught.',
        "**Layer 3, answer**: does it answer what was asked and match what's expected?",
        "Add negative cases: questions whose answer isn't in the knowledge base. The system must say it doesn't know.",
        "Diagnose per layer: low retrieval is fixed in chunking, index or search; low faithfulness is fixed in prompt or model. Changing the prompt doesn't fix bad retrieval.",
        'Bring the three metrics into CI with thresholds and track them on every document change.',
      ],
    },
    snippets: [
      {
        code: 'pip install deepeval\ndeepeval test run tests/test_rag.py',
        lang: 'bash',
      },
      {
        code: 'from deepeval import assert_test\nfrom deepeval.test_case import LLMTestCase\nfrom deepeval.metrics import (\n    ContextualRecallMetric, FaithfulnessMetric, AnswerRelevancyMetric,\n)\nfrom my_app import ask  # returns (answer, retrieved_chunks)\n\ndef test_refund_policy():\n    question = "How many days do I have to request a refund?"\n    answer, chunks = ask(question)\n    case = LLMTestCase(\n        input=question,\n        actual_output=answer,\n        expected_output="30 days from delivery.",\n        retrieval_context=chunks,\n    )\n    assert_test(case, [\n        ContextualRecallMetric(threshold=0.8),\n        FaithfulnessMetric(threshold=0.9),\n        AnswerRelevancyMetric(threshold=0.8),\n    ])',
        lang: 'python',
        caption: {
          es: 'tests/test_rag.py',
          en: 'tests/test_rag.py',
        },
      },
    ],
    intro: {
      es: [
        'Un sistema RAG responde preguntas buscando primero en tus documentos y generando después una respuesta con lo que encontró. Cuando contesta mal, la reacción habitual es retocar el prompt. A veces funciona. Muchas veces no, porque el problema estaba antes: el documento correcto nunca llegó al modelo y ninguna instrucción puede compensar eso.',
        'Probar un RAG de punta a punta, con una sola métrica, mezcla dos sistemas distintos: un buscador y un generador. Esta guía los separa en tres capas que se miden por separado, y agrega los casos negativos, donde la respuesta correcta es admitir que la información no está. El resultado es un diagnóstico que dice dónde hay que arreglar, no solo que algo anda mal.',
      ],
      en: [
        "A RAG system answers questions by first searching your documents and then generating an answer with what it found. When it answers badly, the usual reaction is to tweak the prompt. Sometimes that works. Often it doesn't, because the problem came earlier: the right document never reached the model, and no instruction can make up for that.",
        "Testing a RAG end to end, with a single metric, mixes two different systems: a search engine and a generator. This guide splits them into three layers measured separately, and adds negative cases, where the correct answer is admitting the information isn't there. The result is a diagnosis that says where to fix things, not just that something is wrong.",
      ],
    },
    details: {
      es: [
        {
          title: 'Capa uno: recuperación',
          body: [
            'Para cada pregunta del dataset, anotá qué documento contiene la respuesta. El test verifica si ese documento aparece entre los fragmentos recuperados. No hace falta ningún modelo para evaluarlo: es una comparación de identificadores, determinista y rápida. Esta métrica es el techo del sistema. Si el fragmento correcto aparece en siete de cada diez preguntas, la respuesta final no puede acertar con fundamento en más de siete. Empezar por acá evita semanas de ajustes en el lugar equivocado.',
          ],
        },
        {
          title: 'Capa dos: fidelidad',
          body: [
            'La fidelidad pregunta si cada afirmación de la respuesta está respaldada por los fragmentos recuperados. No evalúa si la respuesta es verdadera en general, sino si sale del contexto que el sistema tenía. Acá se detectan las invenciones: un dato que el modelo agregó de su conocimiento previo, una cifra alterada, una condición que el documento no menciona. Se mide con un juez que descompone la respuesta en afirmaciones y verifica cada una. Para cifras y fechas, sumá chequeos deterministas.',
          ],
        },
        {
          title: 'Capa tres: respuesta',
          body: [
            'Recién en la tercera capa se evalúa si la respuesta contesta lo que se preguntó y coincide con lo esperado. Una respuesta puede ser fiel al contexto y no servir: habla del tema, cita bien el documento y no responde la pregunta concreta. O puede responder correctamente por conocimiento general sin apoyarse en tus documentos, lo cual es un riesgo distinto. Por eso las tres capas se miran juntas: cada combinación de resultados apunta a un problema diferente.',
          ],
        },
        {
          title: 'Casos negativos',
          body: [
            'Agregá preguntas cuya respuesta no está en la base de conocimiento. El comportamiento esperado es que el sistema lo diga, en lugar de armar una respuesta plausible con fragmentos vagamente relacionados. Es el caso que más daño hace en producción y el que menos se prueba, porque los datasets suelen construirse a partir de los documentos existentes. Incluí también preguntas casi cubiertas: el documento habla del tema, pero no trae el dato específico que se pide.',
          ],
        },
        {
          title: 'Diagnosticar por capa',
          body: [
            'Con las tres métricas separadas, cada arreglo tiene su lugar. Recuperación baja se corrige en el tamaño de los fragmentos, en el índice o en la búsqueda. Fidelidad baja con buena recuperación se corrige en el prompt o cambiando de modelo. Respuesta baja con las otras dos altas suele ser un problema de formato o de instrucciones. La regla práctica es no tocar el prompt hasta confirmar que la recuperación funciona: cambiar el prompt no arregla una búsqueda que no encuentra.',
          ],
        },
        {
          title: 'Métricas en CI',
          body: [
            'Llevá las tres métricas al pipeline con un umbral para cada una, y corré el eval cada vez que cambien los documentos, no solo el código. En un RAG, la base de conocimiento es parte del sistema. Un documento nuevo que contradice a otro, o una reorganización de carpetas, puede bajar la recuperación sin que nadie haya tocado una línea. Registrá la evolución de las métricas con cada cambio de contenido para poder ubicar cuándo empezó una caída.',
          ],
        },
      ],
      en: [
        {
          title: 'Layer one: retrieval',
          body: [
            "For each question in the dataset, note which document holds the answer. The test checks whether that document shows up among the retrieved chunks. No model is needed to evaluate it: it's a comparison of identifiers, deterministic and fast. This metric is the system's ceiling. If the right chunk shows up for seven questions in ten, the final answer can't be right with grounding in more than seven. Starting here avoids weeks of adjustments in the wrong place.",
          ],
        },
        {
          title: 'Layer two: faithfulness',
          body: [
            "Faithfulness asks whether every claim in the answer is supported by the retrieved chunks. It doesn't evaluate whether the answer is true in general, but whether it comes from the context the system had. This is where fabrications get caught: a fact the model added from prior knowledge, an altered figure, a condition the document doesn't mention. It's measured with a judge that breaks the answer into claims and verifies each one. For figures and dates, add deterministic checks.",
          ],
        },
        {
          title: 'Layer three: answer',
          body: [
            "Only in the third layer do you evaluate whether the answer addresses what was asked and matches what's expected. An answer can be faithful to the context and still useless: it talks about the topic, quotes the document well and doesn't answer the specific question. Or it can answer correctly from general knowledge without relying on your documents, which is a different risk. That's why the three layers are read together: each combination of results points to a different problem.",
          ],
        },
        {
          title: 'Negative cases',
          body: [
            "Add questions whose answer isn't in the knowledge base. The expected behavior is for the system to say so, instead of assembling a plausible answer from vaguely related chunks. It's the case that does the most damage in production and the least tested, because datasets tend to be built from existing documents. Also include nearly covered questions: the document discusses the topic but doesn't carry the specific fact being asked for.",
          ],
        },
        {
          title: 'Diagnose per layer',
          body: [
            "With the three metrics separated, each fix has its place. Low retrieval is fixed in chunk size, the index or the search. Low faithfulness with good retrieval is fixed in the prompt or by changing models. A low answer score with the other two high is usually a format or instructions problem. The practical rule is not to touch the prompt until you've confirmed retrieval works: changing the prompt doesn't fix a search that doesn't find.",
          ],
        },
        {
          title: 'Metrics in CI',
          body: [
            'Bring the three metrics into the pipeline with a threshold for each, and run the eval every time documents change, not just code. In a RAG, the knowledge base is part of the system. A new document contradicting another, or a folder reorganization, can lower retrieval without anyone having touched a line. Record how the metrics evolve with each content change so you can locate when a drop began.',
          ],
        },
      ],
    },
    example: {
      es: [
        'Un asistente interno responde preguntas sobre políticas de la empresa. El equipo arma cuarenta preguntas con su documento fuente y diez negativas. Primera medición, con cifras ilustrativas: recuperación 65%, fidelidad 92%, respuesta 60%. El equipo venía ajustando el prompt hacía dos semanas. Los números muestran que el generador es fiel a lo que recibe y que el problema está en la búsqueda. Revisan y encuentran que los fragmentos cortaban las tablas por la mitad. Cambian la estrategia de fragmentación y la recuperación sube a 90%; la respuesta, a 84%, sin tocar el prompt. En las negativas, tres de diez todavía inventan. Eso sí se corrige con una instrucción.',
      ],
      en: [
        'An internal assistant answers questions about company policies. The team builds forty questions with their source document and ten negatives. First measurement, with illustrative figures: retrieval 65%, faithfulness 92%, answer 60%. The team had been tuning the prompt for two weeks. The numbers show the generator is faithful to what it receives and that the problem lies in search. They check and find chunks were cutting tables in half. They change the chunking strategy and retrieval rises to 90%; the answer score, to 84%, without touching the prompt. On the negatives, three out of ten still make things up. That one does get fixed with an instruction.',
      ],
    },
    mistakes: {
      es: [
        'Medir solo la respuesta final y no saber qué capa falla.',
        'Ajustar el prompt cuando el problema es de recuperación.',
        'No incluir preguntas sin respuesta en la base de conocimiento.',
        'Correr el eval solo cuando cambia el código y no los documentos.',
      ],
      en: [
        'Measuring only the final answer and not knowing which layer fails.',
        'Tuning the prompt when the problem is retrieval.',
        'Not including questions with no answer in the knowledge base.',
        'Running the eval only when code changes and not documents.',
      ],
    },
    checklist: {
      es: [
        'Cada pregunta tiene anotado su documento fuente.',
        'Recuperación, fidelidad y respuesta se miden por separado.',
        'El dataset incluye casos negativos y casi cubiertos.',
        'El eval corre en CI ante cambios de documentos.',
      ],
      en: [
        'Each question has its source document noted.',
        'Retrieval, faithfulness and answer are measured separately.',
        'The dataset includes negative and nearly covered cases.',
        'The eval runs in CI on document changes.',
      ],
    },
    faq: {
      es: [
        {
          q: '¿Cuántos fragmentos conviene recuperar?',
          a: 'Es la misma pregunta que el K del día diecinueve, y se responde igual: midiendo recuperación y respuesta final con distintos valores. Más fragmentos suben la probabilidad de incluir el correcto y también el ruido que recibe el modelo.',
        },
        {
          q: '¿La fidelidad medida por un juez es confiable?',
          a: 'Tanto como su calibración. Aplicá el método del día dieciséis: etiquetá a mano una muestra de respuestas como fieles o no y medí el acuerdo. Para datos duros como montos y fechas, no dependas del juez.',
        },
        {
          q: '¿Sirve si uso un producto de RAG ya armado?',
          a: 'Sí. Aunque no controles la búsqueda, podés medir las tres capas desde afuera si el producto expone qué fragmentos usó. Si no los expone, pedilo: sin esa información no podés distinguir un problema de búsqueda de uno de generación.',
        },
      ],
      en: [
        {
          q: 'How many chunks should I retrieve?',
          a: "It's the same question as the K from day nineteen, and it's answered the same way: by measuring retrieval and final answer at different values. More chunks raise the chance of including the right one and also the noise the model receives.",
        },
        {
          q: 'Is faithfulness measured by a judge reliable?',
          a: "As reliable as its calibration. Apply the day sixteen method: hand-label a sample of answers as faithful or not and measure agreement. For hard facts such as amounts and dates, don't depend on the judge.",
        },
        {
          q: 'Does it help if I use an off-the-shelf RAG product?',
          a: "Yes. Even without control over search, you can measure the three layers from outside if the product exposes which chunks it used. If it doesn't expose them, ask for it: without that information you can't tell a search problem from a generation problem.",
        },
      ],
    },
    slug: 'qa-ai-21-testing-rag',
    minutes: 7,
    tags: ['RAG', 'Evals', 'DeepEval'],
    diagram:
      'question ─▶ retriever ◀── knowledge base\n                ▼\n        retrieved chunks ─────▶ Layer 1: right document retrieved?\n                ▼                    └─ low ▶ fix chunking / index / search\n            generator\n                ▼\n             answer ──────────▶ Layer 2: claims supported by chunks?\n                │                    └─ low ▶ fix prompt / model\n                └─────────────▶ Layer 3: answers the question, matches expected?',
    diagramImage: {
      light: '/publications/qa-ai/diagrams/d21-light.webp',
      dark: '/publications/qa-ai/diagrams/d21-dark.webp',
      width: 1800,
      height: 254,
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
];
