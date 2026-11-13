import type { Publication } from './types';

// Commands and outputs below were run for real on 2026-11-13 (Node 22.23.4,
// @playwright/test 1.65.0, VERA v0.3.0). Update them together if you rerun.
export const veraPlaywrightTestAnalytics: Publication = {
  slug: 'vera-playwright-test-analytics',
  date: '2026-11-13',
  readingMinutes: 13,
  kind: {
    es: 'Guía',
    en: 'Guide',
  },
  tags: [
    'Playwright',
    'Test Analytics',
    'Flaky Tests',
    'VERA',
    'Vitest',
    'PGlite',
  ],
  title: {
    es: 'De la corrida al dashboard: analítica de pruebas con Playwright, el caso VERA',
    en: 'From test run to dashboard: Playwright test analytics, the VERA case',
  },
  summary: {
    es: 'Cómo convertir cada ejecución de Playwright en pass rate y ranking de tests flaky: un reporter que se queda con el último intento, un receptor local para verlo viajar, y cómo se prueba VERA (dominio, reporter e ingesta contra Postgres embebido).',
    en: 'How to turn every Playwright run into a pass rate and a flaky-test ranking: a reporter that keeps the last attempt, a local receiver to watch it travel, and how VERA is tested (domain, reporter and ingestion against embedded Postgres).',
  },
  keywords: {
    es: 'Cómo encaja · Requisitos · Setup · Paso a paso · 1. Tres tests que se comportan distinto · 2. Un reporter que se queda con el último intento · 3. Verlo viajar: un receptor de 15 líneas · 4. Lo mismo contra VERA · 5. Verificar que la ingesta funcionó · 6. Leer el dashboard · Cómo se prueba VERA · Lo que encontró el dogfooding · Errores comunes · Checklist: cómo saber que quedó bien · Lo que la IA no hizo bien acá · Preguntas frecuentes · ¿Sirve si no uso Playwright? · ¿Por qué no usar directamente el reporter HTML de Playwright? · ¿Conviene subir `retries` para tener menos rojos?',
    en: "How it fits together · Requirements · Setup · Step by step · 1. Three tests that behave differently · 2. A reporter that keeps the last attempt · 3. Watch it travel: a 15-line receiver · 4. The same against VERA · 5. Verify that ingestion worked · 6. Read the dashboard · How VERA itself is tested · What dogfooding found · Common mistakes · Checklist: how to know it is done · Where AI fell short · Frequently asked questions · Does it help if I do not use Playwright? · Why not just use Playwright's HTML reporter? · Should I raise `retries` to get fewer reds?",
  },
  body: {
    es: [
      {
        type: 'p',
        text: 'Una suite de Playwright que corre en CI deja un veredicto por ejecución: verde o rojo. Lo que no deja es memoria. Para saber si un test falla una vez cada diez, si el pass rate viene bajando o si un rojo es nuevo o lleva tres semanas ahí, hay que guardar cada ejecución y compararla con las anteriores.',
      },
      {
        type: 'p',
        text: 'Eso es lo que hace **VERA**, el producto de analítica de pruebas que estoy construyendo en The Virginia: un reporter sube cada ejecución y un dashboard la convierte en pass rate, tendencia, ranking de tests flaky y detalle de fallas. En esta guía lo uso como caso de estudio en dos sentidos: cómo se conecta una suite real, y cómo se prueba un producto cuyo trabajo es juzgar pruebas ajenas.',
      },
      {
        type: 'note',
        text: 'El repositorio de VERA es privado, así que no vas a poder clonarlo. Para que la guía igual sea reproducible, los pasos 1 a 3 arman un reporter equivalente y un receptor local con código completo: con eso ves viajar un run de punta a punta en tu máquina. Los pasos 4 a 6 muestran lo mismo contra VERA (v0.3.0), con las salidas que obtuve.',
      },
      {
        type: 'h2',
        text: 'Cómo encaja',
      },
      {
        type: 'code',
        code: 'suite de Playwright (tu CI)\n   │  onTestEnd por cada intento → el reporter se queda con el último\n   ▼\nreporter ── POST /api/v1/runs (JSON + API key del proyecto)\n   ▼\nVERA\n   ├─ valida el payload (zod) y resume: total, passed, failed, skipped, flaky\n   ├─ guarda el run y sus resultados (Postgres)\n   └─ dashboard: pass rate, tendencia, ranking de flaky, detalle de fallas',
        caption: 'El recorrido de una ejecución',
      },
      {
        type: 'h2',
        text: 'Requisitos',
      },
      {
        type: 'list',
        items: [
          'Node.js 22 o superior (usé 22.23.4).',
          '`@playwright/test`. Todo lo de esta guía corrió con la versión 1.65.0.',
          'Diez minutos para los pasos 1 a 3. No hace falta instalar navegadores: los tests de ejemplo no abren ninguno.',
        ],
      },
      {
        type: 'h2',
        text: 'Setup',
      },
      {
        type: 'code',
        code: 'mkdir reporter-demo && cd reporter-demo\nnpm init -y\nnpm install -D @playwright/test\nnpx playwright --version      # Version 1.65.0',
        lang: 'bash',
      },
      {
        type: 'code',
        code: 'import { defineConfig } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests",\n  retries: 1,\n  reporter: [["list"], ["./run-reporter.ts"]],\n  projects: [{ name: "api" }],\n  use: { baseURL: process.env.TARGET_URL ?? "http://localhost:3100" },\n});',
        lang: 'ts',
        caption:
          'playwright.config.ts: un retry y dos reporters, el de consola y el nuestro',
      },
      {
        type: 'h2',
        text: 'Paso a paso',
      },
      {
        type: 'h3',
        text: '1. Tres tests que se comportan distinto',
      },
      {
        type: 'p',
        text: 'Para ver qué hace un reporter hacen falta los tres casos que importan: un test estable, uno que pasa recién en el reintento y uno roto. Los dos últimos fallan a propósito.',
      },
      {
        type: 'code',
        code: 'import { expect, test } from "@playwright/test";\n\ntest("adds two prices", () => {\n  expect(1999 + 501).toBe(2500);\n});\n\n// Fails on the first attempt on purpose: this is what a flaky test looks like to a reporter.\ntest("passes only on retry", ({}, testInfo) => {\n  expect(testInfo.retry).toBe(1);\n});\n\n// Wrong on purpose, to see a failure travel to the receiver.\ntest("expects the wrong total", () => {\n  expect(1999 + 501).toBe(2600);\n});',
        lang: 'ts',
        caption: 'tests/demo.spec.ts',
      },
      {
        type: 'h3',
        text: '2. Un reporter que se queda con el último intento',
      },
      {
        type: 'p',
        text: 'Playwright llama a `onTestEnd` una vez por intento, no una vez por test. Si subís cada llamada, un test que pasó al segundo intento cuenta como una falla y un pase. La decisión de diseño de VERA es guardar el resultado final de cada test y anotar cuántos reintentos necesitó: como la clave del `Map` es `test.id`, el último intento pisa a los anteriores.',
      },
      {
        type: 'code',
        code: 'import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";\n\ntype Status = "passed" | "failed" | "skipped";\ninterface ResultRow {\n  testKey: string;\n  title: string;\n  file: string;\n  browser: string;\n  status: Status;\n  retries: number;\n  durationMs: number;\n  error: string | null;\n}\n\nconst ANSI = /\\u001b\\[[0-9;]*[A-Za-z]/g;\n\nexport default class RunReporter implements Reporter {\n  private readonly results = new Map<string, ResultRow>();\n  private startedAt = new Date();\n\n  printsToStdio() {\n    return false; // keep the "list" reporter output on screen\n  }\n\n  onBegin() {\n    this.startedAt = new Date();\n  }\n\n  onTestEnd(test: TestCase, result: TestResult) {\n    const browser = test.parent.project()?.name ?? "";\n    // titlePath(): ["", project, file, ...describes, title]\n    const [, , file = "", ...path] = test.titlePath();\n    const title = path.join(" › ");\n    const status: Status = result.status === "passed" ? "passed" : result.status === "skipped" ? "skipped" : "failed";\n    const error = result.errors.map((e) => e.message ?? "").join("\\n").replace(ANSI, "").slice(0, 10_000);\n\n    // onTestEnd fires once per attempt. Same test.id → the last attempt overwrites the earlier ones.\n    this.results.set(test.id, {\n      testKey: [browser, file, title].filter(Boolean).join(" › "),\n      title,\n      file,\n      browser,\n      status,\n      retries: result.retry,\n      durationMs: Math.round(result.duration),\n      error: error || null,\n    });\n  }\n\n  async onEnd(full: FullResult) {\n    const url = process.env.VERA_URL;\n    const apiKey = process.env.VERA_API_KEY;\n    if (!url || !apiKey) return console.log("[reporter] VERA_URL or VERA_API_KEY not set, skipping upload.");\n\n    try {\n      const res = await fetch(new URL("/api/v1/runs", url), {\n        method: "POST",\n        headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },\n        body: JSON.stringify({\n          branch: process.env.GITHUB_REF_NAME ?? "",\n          commitSha: process.env.GITHUB_SHA ?? "",\n          startedAt: this.startedAt.toISOString(),\n          durationMs: Math.round(full.duration),\n          results: [...this.results.values()],\n        }),\n      });\n      console.log(res.ok ? `[reporter] Run uploaded (${res.status}).` : `[reporter] Upload failed: HTTP ${res.status}`);\n    } catch (err) {\n      // Reporting must never turn a green run red.\n      console.log(`[reporter] Upload failed: ${err instanceof Error ? err.message : err}`);\n    }\n  }\n}',
        lang: 'ts',
        caption: 'run-reporter.ts: versión reducida del reporter de VERA',
      },
      {
        type: 'p',
        text: 'Tres detalles que salen de usarlo en serio. `printsToStdio()` devuelve `false` para no tapar la salida del reporter `list`. Los mensajes de `expect()` llegan con códigos de color de terminal, así que hay que limpiarlos antes de guardarlos. Y el `try/catch` de `onEnd` no es prolijidad: un reporter que rompe el pipeline cuando el servidor de métricas está caído dura una semana instalado.',
      },
      {
        type: 'h3',
        text: '3. Verlo viajar: un receptor de 15 líneas',
      },
      {
        type: 'p',
        text: 'Antes de apuntar a un servicio real conviene mirar qué sale por el cable. Este receptor acepta el mismo `POST /api/v1/runs` y resume lo que recibió:',
      },
      {
        type: 'code',
        code: 'import { createServer } from "node:http";\n\ncreateServer(async (req, res) => {\n  if (req.method !== "POST" || req.url !== "/api/v1/runs") return res.writeHead(404).end();\n  let body = "";\n  for await (const chunk of req) body += chunk;\n  const run = JSON.parse(body);\n  const count = (status) => run.results.filter((r) => r.status === status).length;\n  const flaky = run.results.filter((r) => r.status === "passed" && r.retries > 0);\n  console.log(`run: ${run.results.length} tests, ${count("passed")} passed, ${count("failed")} failed, ${flaky.length} flaky`);\n  for (const r of flaky) console.log(`  flaky: ${r.testKey} (retries: ${r.retries})`);\n  for (const r of run.results.filter((r) => r.status === "failed")) console.log(`  failed: ${r.testKey}\\n    ${r.error?.split("\\n")[0]}`);\n  res.writeHead(201, { "content-type": "application/json" }).end(JSON.stringify({ id: "local" }));\n}).listen(4000, () => console.log("receiver listening on http://localhost:4000"));',
        lang: 'js',
        caption: 'receiver.mjs',
      },
      {
        type: 'code',
        code: 'node receiver.mjs               # terminal 1\nVERA_URL=http://localhost:4000 VERA_API_KEY=local npx playwright test   # terminal 2',
        lang: 'bash',
      },
      {
        type: 'code',
        code: 'Running 3 tests using 1 worker\n  ✓  1 [api] › tests/demo.spec.ts:3:1 › adds two prices (6ms)\n  ✘  2 [api] › tests/demo.spec.ts:8:1 › passes only on retry (5ms)\n  ✓  3 [api] › tests/demo.spec.ts:8:1 › passes only on retry (retry #1) (7ms)\n  ✘  4 [api] › tests/demo.spec.ts:13:1 › expects the wrong total (5ms)\n  ✘  5 [api] › tests/demo.spec.ts:13:1 › expects the wrong total (retry #1) (10ms)\n  1 failed\n  1 flaky\n  1 passed (1.7s)\n[reporter] Run uploaded (201).',
        caption: 'Terminal 2: Playwright corrió cinco intentos de tres tests',
      },
      {
        type: 'code',
        code: 'receiver listening on http://localhost:4000\nrun: 3 tests, 2 passed, 1 failed, 1 flaky\n  flaky: api › demo.spec.ts › passes only on retry (retries: 1)\n  failed: api › demo.spec.ts › expects the wrong total\n    Error: expect(received).toBe(expected) // Object.is equality',
        caption: 'Terminal 1: el receptor vio tres resultados, no cinco',
      },
      {
        type: 'p',
        text: 'Ahí está el punto de toda la guía: Playwright mostró cinco líneas y el receptor recibió tres resultados. `passes only on retry` llegó como `passed` con `retries: 1`. En la consola eso se pierde entre líneas; en los datos queda marcado. Sin las variables de entorno el reporter avisa y no sube nada (`[reporter] VERA_URL or VERA_API_KEY not set, skipping upload.`), y con el receptor apagado loguea `[reporter] Upload failed: fetch failed` sin tocar el exit code de la suite.',
      },
      {
        type: 'h3',
        text: '4. Lo mismo contra VERA',
      },
      {
        type: 'p',
        text: 'Con VERA el reporter ya viene empaquetado y la configuración es una línea. Cada proyecto tiene su API key, que se muestra una sola vez al crearlo: el servidor guarda solo su hash SHA-256.',
      },
      {
        type: 'code',
        code: '// playwright.config.ts\nexport default defineConfig({\n  retries: 1,\n  reporter: [["list"], ["@vera/playwright-reporter", { environment: "local" }]],\n});',
        lang: 'ts',
      },
      {
        type: 'code',
        code: 'VERA_URL=http://localhost:3100 VERA_API_KEY=vera_... npx playwright test',
        lang: 'bash',
      },
      {
        type: 'p',
        text: 'Para esta guía corrí contra una instancia local una suite de cinco tests sobre la propia API de VERA: tres pasan, uno pasa solo en el reintento y uno espera un status que la API nunca devuelve.',
      },
      {
        type: 'code',
        code: 'import { expect, test } from "@playwright/test";\n\ntest.describe("ingestion API", () => {\n  test("health check answers ok", async ({ request }) => {\n    const res = await request.get("/api/health");\n    expect(res.status()).toBe(200);\n    expect(await res.json()).toEqual({ status: "ok" });\n  });\n\n  test("rejects uploads without an API key", async ({ request }) => {\n    const res = await request.post("/api/v1/runs", { data: {} });\n    expect(res.status()).toBe(401);\n  });\n\n  test("rejects an empty run", async ({ request }) => {\n    const res = await request.post("/api/v1/runs", {\n      headers: { authorization: `Bearer ${process.env.VERA_API_KEY}` },\n      data: { startedAt: new Date().toISOString(), durationMs: 0, results: [] },\n    });\n    expect(res.status()).toBe(400);\n  });\n\n  // Fails on the first attempt on purpose, to see how a flaky test is reported.\n  test("passes only on retry", async ({}, testInfo) => {\n    expect(testInfo.retry).toBe(1);\n  });\n\n  // Wrong on purpose, to see a failure in the dashboard.\n  test("expects a status the API never returns", async ({ request }) => {\n    expect((await request.get("/api/health")).status()).toBe(418);\n  });\n});',
        lang: 'ts',
        caption: 'La suite que corrí contra VERA',
      },
      {
        type: 'code',
        code: '  1 failed\n  1 flaky\n  3 passed (2.1s)\n[vera] Run uploaded: http://localhost:3100/projects/web-store/runs/<id>',
        caption: 'Salida de cada una de las tres corridas',
      },
      {
        type: 'h3',
        text: '5. Verificar que la ingesta funcionó',
      },
      {
        type: 'p',
        text: 'No des por hecho que subió porque la suite terminó. Hay tres comprobaciones baratas, en este orden: la línea `[vera] Run uploaded` con la URL del run en el log de CI; `GET /api/health`, que en v0.3.0 responde `{"status":"ok"}` si la app llega a la base; y abrir la URL del run para confirmar que los contadores coinciden con el resumen de Playwright (acá: 5 tests, 1 failed, 1 flaky).',
      },
      {
        type: 'p',
        text: 'La API contesta con códigos que se pueden asertar, y de hecho tres de los cinco tests de arriba hacen eso: `401` sin API key, `400` con un run sin resultados, `201` con el run guardado. Un cuerpo de más de 10 MB recibe `413`.',
      },
      {
        type: 'h3',
        text: '6. Leer el dashboard',
      },
      {
        type: 'image',
        src: '/publications/vera/dashboard.webp',
        alt: 'Dashboard de VERA con tres ejecuciones: pass rate 80%, un test flaky',
        width: 1600,
        height: 1274,
        caption: 'El proyecto después de tres corridas de la suite',
      },
      {
        type: 'list',
        items: [
          '**Pass rate 80%**: pasados sobre ejecutados, 4 de 5. Los tests salteados no entran en la cuenta, así que saltear tests no sube el número. El test que pasó en el reintento cuenta como pasado.',
          '**Flaky tests: 1**: `passes only on retry` aparece con `0 failed, 3 retried of 3` y 100% de inestabilidad. Nunca falló el resultado final, pero necesitó reintento las tres veces.',
          '**El test roto no es flaky**: `expects a status the API never returns` falla siempre, y por eso no figura en el ranking. Un test que falla siempre está roto, no es inestable, y mezclarlos esconde a los dos.',
          '**Detalle del run**: las fallas primero, con su mensaje de error; después los flaky, los pasados y los salteados.',
        ],
      },
      {
        type: 'p',
        text: 'La regla completa de flaky, tal como está en el dominio de VERA, mira una ventana de las últimas 20 ejecuciones:',
      },
      {
        type: 'code',
        code: '// packages/core/src/flaky-tests.ts (extracto)\nconst mixed = e.passes > 0 && e.failures > 0;\nif (!mixed && e.retriedPasses === 0) continue;          // estable, o roto siempre: no es flaky\nconst executions = e.passes + e.failures;               // los skipped no cuentan\nconst unstable = mixed ? e.failures + e.retriedPasses : e.retriedPasses;\nflakinessRate = Math.min(unstable / executions, 1);',
        lang: 'ts',
      },
      {
        type: 'h2',
        text: 'Cómo se prueba VERA',
      },
      {
        type: 'p',
        text: 'Un producto que mide la calidad de las pruebas de otros no puede tener las propias flojas. La suite de VERA tiene tres capas más una prueba de punta a punta, y ninguna necesita Docker ni servicios externos.',
      },
      {
        type: 'list',
        items: [
          '**Dominio** (`packages/core`): funciones puras, sin base ni red. Acá viven las reglas que definen el producto: qué cuenta en el pass rate y qué es flaky. Cada regla tiene su caso: pasa y falla entre runs, pasa solo con reintentos, siempre roto, siempre estable.',
          '**Reporter** (`packages/playwright-reporter`): se instancia con un `fetch` inyectado y objetos `TestCase` mínimos. Verifica que el último intento gana, que sin credenciales no sube nada y que un error de red nunca tira una excepción.',
          '**Ingesta** (`apps/web`): los casos de uso corren contra Postgres de verdad, pero embebido. PGlite levanta un Postgres en memoria dentro del proceso de test y le aplica las mismas migraciones que producción.',
          '**Dogfooding**: una suite de Playwright real reporta a VERA con el reporter compilado. El repo trae una contra el sitio de The Virginia (`examples/playwright-demo`); para esta guía usé la del paso 4, contra la propia API.',
        ],
      },
      {
        type: 'code',
        code: '// apps/web/src/modules/runs/ingest-run.test.ts (extracto)\ndescribe("run ingestion (embedded Postgres)", () => {\n  let db: Database;\n\n  beforeAll(async () => {\n    db = await createDatabase("memory:");   // PGlite en memoria + las migraciones reales\n  });\n\n  it("rejects missing or unknown API keys", async () => {\n    const payload = { startedAt: new Date(), durationMs: 1, results: [result("a", "passed")] };\n    expect(await ingestRun(db, null, payload)).toMatchObject({ ok: false, status: 401 });\n    expect(await ingestRun(db, "vera_nope", payload)).toMatchObject({ ok: false, status: 401 });\n  });\n});',
        lang: 'ts',
      },
      {
        type: 'p',
        text: 'La decisión que más rinde es la tercera. Los casos de uso reciben la base como parámetro, así que el test inyecta una en memoria y prueba SQL real (constraints, cascadas, transacciones) sin mocks del ORM. El costo es bajo: la suite completa de la v0.3.0 corre en unos tres segundos.',
      },
      {
        type: 'code',
        code: '$ npm test\n RUN  v5.1.0\n\n Test Files  5 passed (5)\n      Tests  25 passed (25)\n   Duration  3.14s',
        caption: 'Vitest 5.1.0 sobre la v0.3.0',
      },
      {
        type: 'h3',
        text: 'Lo que encontró el dogfooding',
      },
      {
        type: 'p',
        text: 'Las tres capas estaban en verde y aun así la primera corrida real mostró dos cosas que ningún test unitario veía.',
      },
      {
        type: 'p',
        text: 'La primera: los errores se guardaban con códigos ANSI. El test del reporter usaba mensajes de error escritos a mano (`boom`, `timeout`), y los que produce `expect()` vienen coloreados para la terminal. En el dashboard una falla se leía así:',
      },
      {
        type: 'code',
        code: 'Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m\n\nExpected: [32m418[39m\nReceived: [31m200[39m',
        caption: 'Lo que se guardaba antes del fix',
      },
      {
        type: 'p',
        text: 'El fix fue una expresión regular y un test nuevo que usa el mensaje exacto que emitió Playwright, no uno inventado.',
      },
      {
        type: 'p',
        text: 'La segunda: creé el proyecto por línea de comandos con el servidor de desarrollo ya corriendo, y las tres primeras corridas terminaron así:',
      },
      {
        type: 'code',
        code: '[vera] Upload failed: HTTP 401 {"error":"Invalid or missing API key."}',
      },
      {
        type: 'p',
        text: 'La key era válida. PGlite atiende a un solo proceso por vez: el servidor tenía su copia de la base abierta y no vio el proyecto que el otro proceso acababa de crear hasta que lo reinicié. Con Postgres real no pasa. Quedó documentado, y de paso confirmó que el diseño del reporter funciona: la suite reportó su resultado normal y el problema de subida quedó en una línea de log.',
      },
      {
        type: 'h2',
        text: 'Errores comunes',
      },
      {
        type: 'list',
        items: [
          'Subir un resultado por intento en lugar de uno por test: infla las fallas y hace desaparecer a los flaky.',
          'Contar los salteados en el denominador del pass rate, o tratar un test siempre roto como flaky.',
          'Dejar que el reporter falle el pipeline cuando el servicio de métricas no responde.',
          'Probar el reporter solo con mensajes de error inventados y nunca con una corrida real.',
          'Cambiar el título de un test o el nombre del proyecto de Playwright y esperar que conserve su historial: la identidad es `proyecto › archivo › título`.',
          'Guardar la API key en el repo. Va en los secretos de CI.',
        ],
      },
      {
        type: 'h2',
        text: 'Checklist: cómo saber que quedó bien',
      },
      {
        type: 'list',
        items: [
          'El receptor (o VERA) recibe un resultado por test aunque haya reintentos.',
          'El test que pasa en el reintento llega como `passed` con `retries` mayor a cero.',
          'Con el servidor apagado, la suite termina con el mismo exit code que sin reporter.',
          'El mensaje de error guardado se lee como texto plano.',
          'Después de tres corridas, el test inestable figura en el ranking de flaky y el roto no.',
        ],
      },
      {
        type: 'h2',
        text: 'Lo que la IA no hizo bien acá',
      },
      {
        type: 'note',
        text: 'Armé y verifiqué esta guía con un agente de IA, y falló en lo mismo en que falla una persona apurada: dio por buena una verificación que no estaba mirando lo que creía. Asumió que la API key creada por CLI servía con el servidor corriendo y tuvo tres corridas con 401 antes de revisar el supuesto. Dio por sano el reporter porque sus tests unitarios pasaban; los códigos ANSI aparecieron recién al abrir el dashboard. Escribió un chequeo de navegador con una espera frágil que marcó como roto un login que funcionaba. Y probó un endpoint nuevo contra un proceso viejo que seguía vivo, lo que le devolvió un 404 falso. Ninguno de esos errores era del producto: los cuatro eran de la prueba. Por eso cada resultado de esta guía está contrastado con una corrida real y no con lo que el agente esperaba ver.',
      },
      {
        type: 'h2',
        text: 'Preguntas frecuentes',
      },
      {
        type: 'h3',
        text: '¿Sirve si no uso Playwright?',
      },
      {
        type: 'p',
        text: 'La idea sí: cualquier framework que exponga el resultado de cada intento permite armar el mismo payload. El formato JUnit XML es el camino habitual para Selenium, Cypress o pytest, con una salvedad que conviene conocer: varios generadores de JUnit solo guardan el resultado final, así que un test que pasó en el reintento llega como un pase común y el flaky solo se detecta comparando ejecuciones.',
      },
      {
        type: 'h3',
        text: '¿Por qué no usar directamente el reporter HTML de Playwright?',
      },
      {
        type: 'p',
        text: 'Porque responde otra pregunta. El reporte HTML explica una ejecución con mucho detalle; no sabe nada de la anterior. Flaky, tendencia y regresiones son propiedades de una serie de ejecuciones, y para eso hay que guardarlas en algún lado.',
      },
      {
        type: 'h3',
        text: '¿Conviene subir `retries` para tener menos rojos?',
      },
      {
        type: 'p',
        text: 'Solo si mirás lo que los reintentos esconden. Con reintentos y sin registro, un test inestable se vuelve invisible hasta el día que falla dos veces seguidas. Con el número de reintentos guardado, el mismo test aparece primero en un ranking.',
      },
      {
        type: 'p',
        text: 'Gastón Genaud · [gastongenaud.com](https://gastongenaud.com) · [The Virginia](https://thevirginia.site)',
      },
    ],
    en: [
      {
        type: 'p',
        text: 'A Playwright suite running in CI leaves one verdict per run: green or red. What it does not leave is memory. To know whether a test fails one time in ten, whether the pass rate is drifting down, or whether a red is new or has been there for three weeks, you have to store every run and compare it with the earlier ones.',
      },
      {
        type: 'p',
        text: "That is what **VERA** does, the test analytics product I am building at The Virginia: a reporter uploads each run and a dashboard turns it into pass rate, trend, a flaky-test ranking and failure detail. In this guide I use it as a case study in two ways: how a real suite gets connected, and how you test a product whose job is to judge other people's tests.",
      },
      {
        type: 'note',
        text: "VERA's repository is private, so you will not be able to clone it. To keep the guide reproducible anyway, steps 1 to 3 build an equivalent reporter and a local receiver with complete code: that is enough to watch a run travel end to end on your machine. Steps 4 to 6 show the same against VERA (v0.3.0), with the output I got.",
      },
      {
        type: 'h2',
        text: 'How it fits together',
      },
      {
        type: 'code',
        code: 'Playwright suite (your CI)\n   │  onTestEnd once per attempt → the reporter keeps the last one\n   ▼\nreporter ── POST /api/v1/runs (JSON + project API key)\n   ▼\nVERA\n   ├─ validates the payload (zod) and summarizes: total, passed, failed, skipped, flaky\n   ├─ stores the run and its results (Postgres)\n   └─ dashboard: pass rate, trend, flaky ranking, failure detail',
        caption: 'The path of a run',
      },
      {
        type: 'h2',
        text: 'Requirements',
      },
      {
        type: 'list',
        items: [
          'Node.js 22 or newer (I used 22.23.4).',
          '`@playwright/test`. Everything in this guide ran on version 1.65.0.',
          'Ten minutes for steps 1 to 3. No browsers to install: the example tests do not open one.',
        ],
      },
      {
        type: 'h2',
        text: 'Setup',
      },
      {
        type: 'code',
        code: 'mkdir reporter-demo && cd reporter-demo\nnpm init -y\nnpm install -D @playwright/test\nnpx playwright --version      # Version 1.65.0',
        lang: 'bash',
      },
      {
        type: 'code',
        code: 'import { defineConfig } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests",\n  retries: 1,\n  reporter: [["list"], ["./run-reporter.ts"]],\n  projects: [{ name: "api" }],\n  use: { baseURL: process.env.TARGET_URL ?? "http://localhost:3100" },\n});',
        lang: 'ts',
        caption:
          'playwright.config.ts: one retry and two reporters, the console one and ours',
      },
      {
        type: 'h2',
        text: 'Step by step',
      },
      {
        type: 'h3',
        text: '1. Three tests that behave differently',
      },
      {
        type: 'p',
        text: 'To see what a reporter does you need the three cases that matter: a stable test, one that only passes on retry and a broken one. The last two fail on purpose.',
      },
      {
        type: 'code',
        code: 'import { expect, test } from "@playwright/test";\n\ntest("adds two prices", () => {\n  expect(1999 + 501).toBe(2500);\n});\n\n// Fails on the first attempt on purpose: this is what a flaky test looks like to a reporter.\ntest("passes only on retry", ({}, testInfo) => {\n  expect(testInfo.retry).toBe(1);\n});\n\n// Wrong on purpose, to see a failure travel to the receiver.\ntest("expects the wrong total", () => {\n  expect(1999 + 501).toBe(2600);\n});',
        lang: 'ts',
        caption: 'tests/demo.spec.ts',
      },
      {
        type: 'h3',
        text: '2. A reporter that keeps the last attempt',
      },
      {
        type: 'p',
        text: "Playwright calls `onTestEnd` once per attempt, not once per test. Upload every call and a test that passed on its second attempt counts as one failure and one pass. VERA's design decision is to store the final outcome of each test and record how many retries it took: since the `Map` key is `test.id`, the last attempt overwrites the earlier ones.",
      },
      {
        type: 'code',
        code: 'import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";\n\ntype Status = "passed" | "failed" | "skipped";\ninterface ResultRow {\n  testKey: string;\n  title: string;\n  file: string;\n  browser: string;\n  status: Status;\n  retries: number;\n  durationMs: number;\n  error: string | null;\n}\n\nconst ANSI = /\\u001b\\[[0-9;]*[A-Za-z]/g;\n\nexport default class RunReporter implements Reporter {\n  private readonly results = new Map<string, ResultRow>();\n  private startedAt = new Date();\n\n  printsToStdio() {\n    return false; // keep the "list" reporter output on screen\n  }\n\n  onBegin() {\n    this.startedAt = new Date();\n  }\n\n  onTestEnd(test: TestCase, result: TestResult) {\n    const browser = test.parent.project()?.name ?? "";\n    // titlePath(): ["", project, file, ...describes, title]\n    const [, , file = "", ...path] = test.titlePath();\n    const title = path.join(" › ");\n    const status: Status = result.status === "passed" ? "passed" : result.status === "skipped" ? "skipped" : "failed";\n    const error = result.errors.map((e) => e.message ?? "").join("\\n").replace(ANSI, "").slice(0, 10_000);\n\n    // onTestEnd fires once per attempt. Same test.id → the last attempt overwrites the earlier ones.\n    this.results.set(test.id, {\n      testKey: [browser, file, title].filter(Boolean).join(" › "),\n      title,\n      file,\n      browser,\n      status,\n      retries: result.retry,\n      durationMs: Math.round(result.duration),\n      error: error || null,\n    });\n  }\n\n  async onEnd(full: FullResult) {\n    const url = process.env.VERA_URL;\n    const apiKey = process.env.VERA_API_KEY;\n    if (!url || !apiKey) return console.log("[reporter] VERA_URL or VERA_API_KEY not set, skipping upload.");\n\n    try {\n      const res = await fetch(new URL("/api/v1/runs", url), {\n        method: "POST",\n        headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },\n        body: JSON.stringify({\n          branch: process.env.GITHUB_REF_NAME ?? "",\n          commitSha: process.env.GITHUB_SHA ?? "",\n          startedAt: this.startedAt.toISOString(),\n          durationMs: Math.round(full.duration),\n          results: [...this.results.values()],\n        }),\n      });\n      console.log(res.ok ? `[reporter] Run uploaded (${res.status}).` : `[reporter] Upload failed: HTTP ${res.status}`);\n    } catch (err) {\n      // Reporting must never turn a green run red.\n      console.log(`[reporter] Upload failed: ${err instanceof Error ? err.message : err}`);\n    }\n  }\n}',
        lang: 'ts',
        caption: "run-reporter.ts: a reduced version of VERA's reporter",
      },
      {
        type: 'p',
        text: "Three details that come from using it for real. `printsToStdio()` returns `false` so it does not hide the `list` reporter's output. `expect()` messages arrive with terminal color codes, so they have to be cleaned before storing them. And the `try/catch` in `onEnd` is not tidiness: a reporter that breaks the pipeline when the metrics server is down stays installed for about a week.",
      },
      {
        type: 'h3',
        text: '3. Watch it travel: a 15-line receiver',
      },
      {
        type: 'p',
        text: 'Before pointing at a real service, look at what goes over the wire. This receiver accepts the same `POST /api/v1/runs` and summarizes what it got:',
      },
      {
        type: 'code',
        code: 'import { createServer } from "node:http";\n\ncreateServer(async (req, res) => {\n  if (req.method !== "POST" || req.url !== "/api/v1/runs") return res.writeHead(404).end();\n  let body = "";\n  for await (const chunk of req) body += chunk;\n  const run = JSON.parse(body);\n  const count = (status) => run.results.filter((r) => r.status === status).length;\n  const flaky = run.results.filter((r) => r.status === "passed" && r.retries > 0);\n  console.log(`run: ${run.results.length} tests, ${count("passed")} passed, ${count("failed")} failed, ${flaky.length} flaky`);\n  for (const r of flaky) console.log(`  flaky: ${r.testKey} (retries: ${r.retries})`);\n  for (const r of run.results.filter((r) => r.status === "failed")) console.log(`  failed: ${r.testKey}\\n    ${r.error?.split("\\n")[0]}`);\n  res.writeHead(201, { "content-type": "application/json" }).end(JSON.stringify({ id: "local" }));\n}).listen(4000, () => console.log("receiver listening on http://localhost:4000"));',
        lang: 'js',
        caption: 'receiver.mjs',
      },
      {
        type: 'code',
        code: 'node receiver.mjs               # terminal 1\nVERA_URL=http://localhost:4000 VERA_API_KEY=local npx playwright test   # terminal 2',
        lang: 'bash',
      },
      {
        type: 'code',
        code: 'Running 3 tests using 1 worker\n  ✓  1 [api] › tests/demo.spec.ts:3:1 › adds two prices (6ms)\n  ✘  2 [api] › tests/demo.spec.ts:8:1 › passes only on retry (5ms)\n  ✓  3 [api] › tests/demo.spec.ts:8:1 › passes only on retry (retry #1) (7ms)\n  ✘  4 [api] › tests/demo.spec.ts:13:1 › expects the wrong total (5ms)\n  ✘  5 [api] › tests/demo.spec.ts:13:1 › expects the wrong total (retry #1) (10ms)\n  1 failed\n  1 flaky\n  1 passed (1.7s)\n[reporter] Run uploaded (201).',
        caption: 'Terminal 2: Playwright ran five attempts of three tests',
      },
      {
        type: 'code',
        code: 'receiver listening on http://localhost:4000\nrun: 3 tests, 2 passed, 1 failed, 1 flaky\n  flaky: api › demo.spec.ts › passes only on retry (retries: 1)\n  failed: api › demo.spec.ts › expects the wrong total\n    Error: expect(received).toBe(expected) // Object.is equality',
        caption: 'Terminal 1: the receiver saw three results, not five',
      },
      {
        type: 'p',
        text: "That is the point of the whole guide: Playwright printed five lines and the receiver got three results. `passes only on retry` arrived as `passed` with `retries: 1`. On the console that gets lost between lines; in the data it is flagged. Without the environment variables the reporter says so and uploads nothing (`[reporter] VERA_URL or VERA_API_KEY not set, skipping upload.`), and with the receiver stopped it logs `[reporter] Upload failed: fetch failed` without touching the suite's exit code.",
      },
      {
        type: 'h3',
        text: '4. The same against VERA',
      },
      {
        type: 'p',
        text: 'With VERA the reporter comes packaged and the configuration is one line. Each project has its own API key, shown once when it is created: the server only stores its SHA-256 hash.',
      },
      {
        type: 'code',
        code: '// playwright.config.ts\nexport default defineConfig({\n  retries: 1,\n  reporter: [["list"], ["@vera/playwright-reporter", { environment: "local" }]],\n});',
        lang: 'ts',
      },
      {
        type: 'code',
        code: 'VERA_URL=http://localhost:3100 VERA_API_KEY=vera_... npx playwright test',
        lang: 'bash',
      },
      {
        type: 'p',
        text: "For this guide I ran a five-test suite against a local instance, targeting VERA's own API: three pass, one passes only on retry and one expects a status the API never returns.",
      },
      {
        type: 'code',
        code: 'import { expect, test } from "@playwright/test";\n\ntest.describe("ingestion API", () => {\n  test("health check answers ok", async ({ request }) => {\n    const res = await request.get("/api/health");\n    expect(res.status()).toBe(200);\n    expect(await res.json()).toEqual({ status: "ok" });\n  });\n\n  test("rejects uploads without an API key", async ({ request }) => {\n    const res = await request.post("/api/v1/runs", { data: {} });\n    expect(res.status()).toBe(401);\n  });\n\n  test("rejects an empty run", async ({ request }) => {\n    const res = await request.post("/api/v1/runs", {\n      headers: { authorization: `Bearer ${process.env.VERA_API_KEY}` },\n      data: { startedAt: new Date().toISOString(), durationMs: 0, results: [] },\n    });\n    expect(res.status()).toBe(400);\n  });\n\n  // Fails on the first attempt on purpose, to see how a flaky test is reported.\n  test("passes only on retry", async ({}, testInfo) => {\n    expect(testInfo.retry).toBe(1);\n  });\n\n  // Wrong on purpose, to see a failure in the dashboard.\n  test("expects a status the API never returns", async ({ request }) => {\n    expect((await request.get("/api/health")).status()).toBe(418);\n  });\n});',
        lang: 'ts',
        caption: 'The suite I ran against VERA',
      },
      {
        type: 'code',
        code: '  1 failed\n  1 flaky\n  3 passed (2.1s)\n[vera] Run uploaded: http://localhost:3100/projects/web-store/runs/<id>',
        caption: 'Output of each of the three runs',
      },
      {
        type: 'h3',
        text: '5. Verify that ingestion worked',
      },
      {
        type: 'p',
        text: 'Do not assume it uploaded because the suite finished. There are three cheap checks, in this order: the `[vera] Run uploaded` line with the run URL in the CI log; `GET /api/health`, which in v0.3.0 answers `{"status":"ok"}` when the app reaches the database; and opening the run URL to confirm the counters match Playwright\'s summary (here: 5 tests, 1 failed, 1 flaky).',
      },
      {
        type: 'p',
        text: 'The API answers with status codes you can assert on, and three of the five tests above do exactly that: `401` without an API key, `400` for a run with no results, `201` when the run is stored. A body over 10 MB gets `413`.',
      },
      {
        type: 'h3',
        text: '6. Read the dashboard',
      },
      {
        type: 'image',
        src: '/publications/vera/dashboard.webp',
        alt: 'VERA dashboard with three runs: 80% pass rate, one flaky test',
        width: 1600,
        height: 1274,
        caption: 'The project after three runs of the suite',
      },
      {
        type: 'list',
        items: [
          '**Pass rate 80%**: passed over executed, 4 out of 5. Skipped tests are left out, so skipping tests does not raise the number. The test that passed on retry counts as passed.',
          '**Flaky tests: 1**: `passes only on retry` shows `0 failed, 3 retried of 3` and 100% instability. Its final outcome never failed, but it needed a retry all three times.',
          '**The broken test is not flaky**: `expects a status the API never returns` always fails, which is why it is not in the ranking. A test that always fails is broken, not unstable, and mixing them hides both.',
          '**Run detail**: failures first, with their error message; then flaky, passed and skipped tests.',
        ],
      },
      {
        type: 'p',
        text: "The full flaky rule, as it lives in VERA's domain, looks at a window of the last 20 runs:",
      },
      {
        type: 'code',
        code: '// packages/core/src/flaky-tests.ts (excerpt)\nconst mixed = e.passes > 0 && e.failures > 0;\nif (!mixed && e.retriedPasses === 0) continue;          // stable, or always broken: not flaky\nconst executions = e.passes + e.failures;               // skipped runs do not count\nconst unstable = mixed ? e.failures + e.retriedPasses : e.retriedPasses;\nflakinessRate = Math.min(unstable / executions, 1);',
        lang: 'ts',
      },
      {
        type: 'h2',
        text: 'How VERA itself is tested',
      },
      {
        type: 'p',
        text: "A product that measures the quality of other people's tests cannot have weak ones of its own. VERA's suite has three layers plus an end-to-end check, and none of them needs Docker or external services.",
      },
      {
        type: 'list',
        items: [
          '**Domain** (`packages/core`): pure functions, no database, no network. The rules that define the product live here: what counts toward the pass rate and what is flaky. Each rule has its case: passes and fails across runs, passes only with retries, always broken, always stable.',
          '**Reporter** (`packages/playwright-reporter`): instantiated with an injected `fetch` and minimal `TestCase` objects. It checks that the last attempt wins, that nothing is uploaded without credentials and that a network error never throws.',
          '**Ingestion** (`apps/web`): the use cases run against real Postgres, but embedded. PGlite starts an in-memory Postgres inside the test process and applies the same migrations production uses.',
          "**Dogfooding**: a real Playwright suite reports to VERA through the compiled reporter. The repo ships one against The Virginia's site (`examples/playwright-demo`); for this guide I used the one from step 4, against VERA's own API.",
        ],
      },
      {
        type: 'code',
        code: '// apps/web/src/modules/runs/ingest-run.test.ts (excerpt)\ndescribe("run ingestion (embedded Postgres)", () => {\n  let db: Database;\n\n  beforeAll(async () => {\n    db = await createDatabase("memory:");   // in-memory PGlite + the real migrations\n  });\n\n  it("rejects missing or unknown API keys", async () => {\n    const payload = { startedAt: new Date(), durationMs: 1, results: [result("a", "passed")] };\n    expect(await ingestRun(db, null, payload)).toMatchObject({ ok: false, status: 401 });\n    expect(await ingestRun(db, "vera_nope", payload)).toMatchObject({ ok: false, status: 401 });\n  });\n});',
        lang: 'ts',
      },
      {
        type: 'p',
        text: 'The third decision pays off the most. Use cases take the database as a parameter, so the test injects an in-memory one and exercises real SQL (constraints, cascades, transactions) with no ORM mocks. The cost is low: the full v0.3.0 suite runs in about three seconds.',
      },
      {
        type: 'code',
        code: '$ npm test\n RUN  v5.1.0\n\n Test Files  5 passed (5)\n      Tests  25 passed (25)\n   Duration  3.14s',
        caption: 'Vitest 5.1.0 on v0.3.0',
      },
      {
        type: 'h3',
        text: 'What dogfooding found',
      },
      {
        type: 'p',
        text: 'All three layers were green, and the first real run still showed two things no unit test could see.',
      },
      {
        type: 'p',
        text: "First: errors were stored with ANSI codes. The reporter's test used hand-written error messages (`boom`, `timeout`), while the ones `expect()` produces are colored for the terminal. In the dashboard a failure read like this:",
      },
      {
        type: 'code',
        code: 'Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m\n\nExpected: [32m418[39m\nReceived: [31m200[39m',
        caption: 'What was stored before the fix',
      },
      {
        type: 'p',
        text: 'The fix was one regular expression and a new test that uses the exact message Playwright emitted, not an invented one.',
      },
      {
        type: 'p',
        text: 'Second: I created the project from the command line with the development server already running, and the first three runs ended like this:',
      },
      {
        type: 'code',
        code: '[vera] Upload failed: HTTP 401 {"error":"Invalid or missing API key."}',
      },
      {
        type: 'p',
        text: "The key was valid. PGlite serves one process at a time: the server had its own copy of the database open and did not see the project the other process had just created until I restarted it. Real Postgres does not behave that way. It is documented now, and it also confirmed that the reporter's design works: the suite reported its normal result and the upload problem stayed in one log line.",
      },
      {
        type: 'h2',
        text: 'Common mistakes',
      },
      {
        type: 'list',
        items: [
          'Uploading one result per attempt instead of one per test: it inflates failures and makes flaky tests disappear.',
          'Counting skipped tests in the pass-rate denominator, or treating an always-broken test as flaky.',
          'Letting the reporter fail the pipeline when the metrics service does not answer.',
          'Testing the reporter only with invented error messages and never with a real run.',
          'Renaming a test or the Playwright project and expecting it to keep its history: identity is `project › file › title`.',
          'Committing the API key. It belongs in CI secrets.',
        ],
      },
      {
        type: 'h2',
        text: 'Checklist: how to know it is done',
      },
      {
        type: 'list',
        items: [
          'The receiver (or VERA) gets one result per test even when there are retries.',
          'The test that passes on retry arrives as `passed` with `retries` above zero.',
          'With the server stopped, the suite ends with the same exit code as without the reporter.',
          'The stored error message reads as plain text.',
          'After three runs, the unstable test is in the flaky ranking and the broken one is not.',
        ],
      },
      {
        type: 'h2',
        text: 'Where AI fell short',
      },
      {
        type: 'note',
        text: 'I built and verified this guide with an AI agent, and it failed where a person in a hurry fails: it trusted a check that was not looking at what it thought. It assumed the API key created from the CLI worked with the server running, and got three runs with 401 before questioning that. It considered the reporter healthy because its unit tests passed; the ANSI codes only showed up when the dashboard was opened. It wrote a browser check with a brittle wait that flagged a working login as broken. And it tested a new endpoint against an old process that was still alive, which returned a false 404. None of those were product bugs: all four were test bugs. That is why every result in this guide was checked against a real run and not against what the agent expected to see.',
      },
      {
        type: 'h2',
        text: 'Frequently asked questions',
      },
      {
        type: 'h3',
        text: 'Does it help if I do not use Playwright?',
      },
      {
        type: 'p',
        text: 'The idea does: any framework that exposes the result of each attempt lets you build the same payload. JUnit XML is the usual route for Selenium, Cypress or pytest, with one caveat worth knowing: several JUnit generators only keep the final outcome, so a test that passed on retry arrives as a plain pass and flakiness is only detected by comparing runs.',
      },
      {
        type: 'h3',
        text: "Why not just use Playwright's HTML reporter?",
      },
      {
        type: 'p',
        text: 'Because it answers a different question. The HTML report explains one run in great detail; it knows nothing about the previous one. Flakiness, trend and regressions are properties of a series of runs, and for that you have to store them somewhere.',
      },
      {
        type: 'h3',
        text: 'Should I raise `retries` to get fewer reds?',
      },
      {
        type: 'p',
        text: 'Only if you look at what the retries hide. With retries and no record, an unstable test becomes invisible until the day it fails twice in a row. With the retry count stored, the same test shows up first in a ranking.',
      },
      {
        type: 'p',
        text: 'Gastón Genaud · [gastongenaud.com](https://gastongenaud.com) · [The Virginia](https://thevirginia.site)',
      },
    ],
  },
};
