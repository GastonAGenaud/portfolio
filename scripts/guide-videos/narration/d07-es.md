# Guion del video · Día 7: Arneses 101: test harness, eval harness y agent harness

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d07-es.mp4`
- Duración del video: 6:42
- Voz sin pausas: 5:47

## 0:00–0:13 · Slide 1: Video guía

Día 7 de la serie 31 días de QA + IA.

Arneses 101: test harness, eval harness y agent harness.

Los tres arneses que hoy conviven en QA, qué envuelve cada uno y cómo ubicar qué le falta a tu stack.

## 0:14–0:38 · Slide 2: El problema

La palabra "harness" aparece en casi todas las conversaciones sobre IA y testing, y casi siempre con un significado distinto. Para algunos es el framework de automatización de siempre. Para otros, la herramienta que evalúa un prompt. Para otros, el programa que convierte un modelo en un agente capaz de editar código. Las tres cosas existen y las tres se llaman igual, y esa confusión hace que los equipos compren o construyan lo que no necesitan.

## 0:38–0:52 · Slide 3: Cómo encaja

Esta guía separa los tres significados con una sola definición común y muestra la relación entre ellos. No hay código hoy: el objetivo es que puedas mirar tu propio stack y decir qué harness tenés, cuál te falta y, sobre todo, cuál verifica a cuál.

## 0:53–1:01 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Conocer tu stack actual de automation.

La lista de abajo para completar con tus herramientas.

## 1:02–1:29 · Slide 5: Los tres arneses

Los tres arneses.

Test harness: envuelve tu aplicación. Runner, fixtures, mocks y reporters. Ejemplos: Playwright Test, JUnit, pytest.

Eval harness: envuelve un modelo o un prompt. Dataset, runner, scorers y reporte. Ejemplos: promptfoo, DeepEval, Inspect AI.

Agent harness: envuelve un modelo que actúa. Loop, tools, contexto, permisos y memoria. Ejemplos: Claude Code, Copilot agent, Cursor.

## 1:30–2:05 · Slide 6: Paso 1 de 6

Paso 1. Una sola definición.

Quedate con la definición: un arnés es todo lo que rodea a lo que probás para poder ejecutarlo, controlarlo y medirlo.

Un harness es todo lo que rodea a la cosa bajo prueba para poder ejecutarla, controlarla y medirla. Ejecutarla significa ponerla en marcha de forma repetible. Controlarla, fijar sus entradas y su entorno. Medirla, obtener un resultado comparable. La definición sirve para los tres tipos; lo único que cambia es qué hay en el centro: tu aplicación, un modelo o un agente. Cuando alguien use la palabra, preguntá qué está en el centro y la conversación se ordena sola.

## 2:06–2:41 · Slide 7: Paso 2 de 6

Paso 2. Test harness: el que ya tenés.

Test harness: ya lo tenés. Runner, fixtures, mocks y reportes alrededor de tu aplicación.

Si corrés tests automatizados, ya tenés uno. El runner ejecuta, las fixtures preparan el estado, los mocks aíslan dependencias y los reportes muestran el resultado. Es determinista: la misma entrada da la misma salida y un fallo significa algo. Vale la pena reconocerlo como harness porque es la base de los otros dos. Un equipo con un test harness lento, frágil o que nadie mira va a trasladar esos mismos problemas a todo lo que construya con IA encima.

## 2:42–3:18 · Slide 8: Paso 3 de 6

Paso 3. Eval harness: lo mismo alrededor de un modelo.

Eval harness: lo mismo, pero alrededor de un modelo o un prompt. Cambia el assert por scorers y el caso por un dataset.

Acá la cosa bajo prueba es un modelo o un prompt. Las piezas tienen equivalentes directos: los casos de prueba pasan a ser un dataset, los asserts pasan a ser scorers que puntúan una salida, y el reporte muestra tasas de aprobación en lugar de verde o rojo. Se agregan dos cosas que el test harness no necesitaba: repetir cada caso varias veces y registrar costo y latencia. Lo vas a necesitar el día que una funcionalidad de tu producto dependa de un modelo.

## 3:18–3:57 · Slide 9: Paso 4 de 6

Paso 4. Agent harness: el que trabaja.

Agent harness: el loop que convierte un modelo en un agente, con herramientas, instrucciones, permisos y memoria. Acá el agente hace trabajo de QA.

Es el bucle que convierte un modelo en un agente: recibe una tarea, decide qué herramienta usar, lee el resultado y vuelve a decidir, hasta terminar. A su alrededor hay instrucciones del repositorio, herramientas disponibles, permisos y memoria. La diferencia clave con los otros dos es de rol: este no mide, produce. Escribe tests, modifica código, investiga un fallo. Por eso su configuración se parece más a incorporar a un compañero nuevo que a configurar una herramienta.

## 3:57–4:33 · Slide 10: Paso 5 de 6

Paso 5. Quién verifica a quién.

Relación clave: el agent harness produce tests y cambios; el test harness y el eval harness verifican lo que produjo. Nunca al revés.

La relación es de una sola dirección. El agent harness produce tests y cambios; el test harness y el eval harness verifican lo producido. Si invertís la flecha y dejás que el agente juzgue su propio trabajo, perdés la verificación independiente, que es la razón de ser de QA. En la práctica esto se traduce en una regla concreta: lo que cuenta como terminado es el resultado de un comando que corre fuera del agente, con su código de salida, y no el resumen que el agente escribe.

## 4:34–5:08 · Slide 11: Paso 6 de 6

Paso 6. Tu stack en la lista.

Completá la lista con tu stack y marcá el arnés que no tenés. Ese es tu próximo paso.

Completá la lista de los tres harnesses con nombres propios. Qué runner, qué fixtures y qué reportes usás. Si evaluás algún modelo, con qué dataset y qué scorers. Si usás un agente, qué reglas, herramientas y permisos tiene. Las celdas vacías son información. Si te falta el eval harness y tu producto ya usa un modelo, ese es el próximo paso, y es el tema de mañana. Si te falta el de agentes, puede esperar: es productividad, no verificación.

## 5:09–5:44 · Slide 12: Ejemplo

Un ejemplo.

Un equipo de producto completa la lista. Test harness: Playwright, fixtures de login, reporte HTML en CI; completo. Eval harness: vacío, aunque el producto tiene un asistente que responde consultas de clientes desde hace tres meses. Agent harness: dos personas usan un agente de código sin reglas compartidas. El diagnóstico es claro. La funcionalidad con más riesgo, el asistente, no tiene ninguna medición, mientras el equipo discutía qué agente adoptar. Deciden armar primero un eval de veinte casos para el asistente y después escribir un archivo de reglas común para los agentes.

## 5:45–6:01 · Slide 13: Errores comunes

Los errores más comunes.

Usar "harness" sin aclarar qué hay en el centro.

Dejar que el agente declare terminado su propio trabajo.

Invertir en un agent harness teniendo un test harness frágil.

Evaluar un modelo con asserts exactos en lugar de un eval harness.

## 6:01–6:19 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

Podés explicar los tres harnesses con la misma definición.

Tu lista tiene nombres concretos en cada celda o un vacío explícito.

Identificaste cuál te falta y por qué importa.

Tenés escrita la regla de que el gate corre fuera del agente.

## 6:19–6:28 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Sin un gate externo, el agente reporta éxito sin haber ejecutado. Verificá con el exit code, no con el resumen.

## 6:29–6:40 · Slide 16: La guía escrita

Eso fue el día 7. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 8: Tu primer eval harness con promptfoo.
