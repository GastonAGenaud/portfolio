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
    slug: 'qa-ai-15-setting-up-models-for-quality-testing',
    minutes: 5,
    tags: ['LLM', 'Evals', 'Reproducibility'],
    diagram:
      'config: pinned version + temperature + max tokens + schema\n   ├─▶ system under test ──▶ outputs ──┐\n   ├─▶ generator (data / tests)        │\n   └─▶ judge ◀─────────────────────────┘\n          ▼\n   run card: model · prompt version · params · date · dataset',
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
    slug: 'qa-ai-16-llm-as-a-judge-calibration',
    minutes: 5,
    tags: ['Evals', 'LLM Judge', 'QA'],
    diagram:
      '30 real outputs\n   ├─▶ human labels (pass / fail + reason) ──┐\n   └─▶ judge with rubric ────────────────────┴─▶ agreement = matches / total\n                                                     ▼\n                                              above minimum?\n                                   ├─ no  ▶ refine rubric ▶ run the judge again\n                                   └─ yes ▶ use in CI ▶ recalibrate on judge change',
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
    slug: 'qa-ai-17-golden-datasets',
    minutes: 5,
    tags: ['Evals', 'Data Quality', 'Datasets'],
    diagram:
      'real usage (anonymized) ─┐\nedge cases ──────────────┼─▶ case pool ▶ labeling guide + two labelers ▶ balance\nadverse cases ───────────┘                                                  │\n                                 ┌──────────────────────────────────────────┤\n                                 ▼                                          ▼\n                          dev (iterate)                     test (never tune on it)\n\nproduction failures ─▶ regression (grows forever)\n\ndev · test · regression ─▶ Git + CHANGELOG',
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
    slug: 'qa-ai-18-how-to-test-a-model',
    minutes: 5,
    tags: ['Evals', 'LLM', 'Data Quality'],
    diagram:
      'test set (~100 labeled cases)\n   ▼\nrun x5 per configuration (model A · model B, same prompt)\n   ├─ accuracy: mean and min-max\n   ├─ precision per action\n   ├─ costly errors per run\n   └─ cost per call\n   ▼\nranges overlap?\n   ├─ yes ▶ the difference is noise: decide on cost\n   └─ no  ▶ real difference: weigh quality against cost',
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
    slug: 'qa-ai-19-top-k-prefilter-cost',
    minutes: 5,
    tags: ['LLM', 'Cost', 'Evals'],
    diagram:
      'input name ──┐\nfull catalog ┴─▶ local prefilter: top-K candidates ─▶ model call ─▶ decision\n                       │                                  │\n                       ▼                                  ▼\n            recall at K (labeled set)      accuracy x5 + costly errors\n                                           input tokens and cost per call',
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
    slug: 'qa-ai-20-prompt-regression',
    minutes: 5,
    tags: ['Prompting', 'Evals', 'Regression'],
    diagram:
      'prompt v6 ──────────────┐\nprompt v7 (one change) ─┴─▶ eval x5 on test + regression\n                               ▼\n        test improves beyond noise? ──── no ──▶ reject or iterate\n                               ▼ yes\n        regression holds? ────────────── no ──▶ reject or iterate\n                               ▼ yes\n        no error type got worse? ─────── no ──▶ reject or iterate\n                               ▼ yes\n        merge v7 + add fixed cases to regression',
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
    slug: 'qa-ai-21-testing-rag',
    minutes: 5,
    tags: ['RAG', 'Evals', 'DeepEval'],
    diagram:
      'question ─▶ retriever ◀── knowledge base\n                ▼\n        retrieved chunks ─────▶ Layer 1: right document retrieved?\n                ▼                    └─ low ▶ fix chunking / index / search\n            generator\n                ▼\n             answer ──────────▶ Layer 2: claims supported by chunks?\n                │                    └─ low ▶ fix prompt / model\n                └─────────────▶ Layer 3: answers the question, matches expected?',
  },
];
