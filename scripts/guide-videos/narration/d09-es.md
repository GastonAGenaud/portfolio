# Guion del video · Día 9: Agent harness para QA: reglas, skills y MCP en tu repo de automation

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d09-es.mp4`
- Duración del video: 6:29
- Voz sin pausas: 5:38

## 0:00–0:16 · Slide 1: Video guía

Día 9 de la serie 31 días de QA + IA.

Agent harness para QA: reglas, skills y MCP en tu repo de automation.

Cómo preparar un repo de automation para que cualquier agente de código escriba tests siguiendo tus convenciones, con herramientas y permisos acotados.

## 0:16–0:35 · Slide 2: El problema

Darle a un agente de código acceso a tu repositorio de automatización sin configurarlo es como sumar a alguien al equipo sin contarle cómo se trabaja. Va a escribir tests, pero con selectores CSS frágiles, sin tus Page Objects, con esperas fijas y sin correrlos. Después la conclusión suele ser que "el agente no sirve", cuando el problema es que nadie le dio contexto.

## 0:36–0:54 · Slide 3: Cómo encaja

Esta guía arma ese contexto en cinco piezas: reglas, skills, herramientas, permisos y un gate. Cada una responde a un fallo concreto que vas a ver si no está. El resultado es un repo donde un agente puede producir un test que respeta tus convenciones, y donde vos podés comprobarlo con un comando en lugar de confiar en su palabra.

## 0:55–1:03 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un repo con Playwright (día 4).

Un agente de código: Claude Code, Copilot agent, Cursor u otro.

## 1:04–1:10 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:10–1:13 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:14–1:53 · Slide 7: Paso 1 de 6

Paso 1. Reglas en la raíz del repo.

Reglas: creá AGENTS.md en la raíz con cómo correr, convenciones y qué significa "terminado". Si usás Claude Code, el archivo equivalente es CLAUDE.md.

El archivo de reglas es lo primero que el agente lee en cada sesión, así que tiene que ser corto y concreto. Tres secciones alcanzan: cómo correr los tests, qué convenciones seguir y qué significa terminado. En convenciones, escribí lo que le marcarías a una persona en un code review: locators por rol, sin esperas fijas, un Page Object por pantalla. Evitá los párrafos de filosofía. Cada línea debería poder verificarse mirando un diff, y cada regla nueva debería nacer de un error que ya viste.

## 1:54–2:27 · Slide 8: Paso 2 de 6

Paso 2. Skills para lo que se repite.

Skills: pasá a un archivo los procedimientos que repetís, por ejemplo "cómo escribir un test nuevo" con tu estructura de Page Objects.

Hay procedimientos que no entran en una regla de una línea: cómo crear un test nuevo con su Page Object, cómo agregar un dato de prueba, cómo investigar un fallo en CI. Escribilos como archivos separados, paso a paso, con un ejemplo real del repo. El agente los carga cuando la tarea lo pide, sin ocupar contexto el resto del tiempo. Un buen indicio de que algo merece una skill es que ya se lo explicaste dos veces, a una persona o a un agente.

## 2:28–3:05 · Slide 9: Paso 3 de 6

Paso 3. Herramientas para ver la aplicación.

Herramientas: declará el servidor MCP de Playwright en .mcp.json para que el agente pueda abrir la app y mirar la página real.

Sin acceso a un navegador, el agente escribe selectores de memoria, adivinando la estructura de la página. Con el servidor MCP de Playwright puede abrir la aplicación, leer los roles y nombres reales de los elementos y escribir locators que existen. Declararlo en .mcp.json dentro del repo hace que todo el equipo tenga la misma configuración. Apuntalo siempre a un entorno de prueba: la herramienta le da al agente la capacidad de hacer clic, y eso incluye botones que no querés que toque.

## 3:06–3:43 · Slide 10: Paso 4 de 6

Paso 4. Permisos antes del primer uso.

Permisos: negá lo destructivo (borrar, push, tocar .env) y pedí confirmación para instalar dependencias.

Definí qué no puede hacer antes de pedirle nada. Lo mínimo es denegar acciones destructivas o irreversibles: borrar archivos fuera de la carpeta de tests, hacer push, leer o modificar .env. Instalar dependencias debería pedir confirmación, porque cambia el proyecto para todos. Los permisos no reemplazan a la revisión, pero achican el daño posible de un error. Pensalo como los accesos de alguien que recién ingresa: puede proponer cualquier cosa y ejecutar pocas sin que alguien mire.

## 3:43–4:16 · Slide 11: Paso 5 de 6

Paso 5. El gate es un comando.

Gate: "terminado" se verifica con un comando y su exit code, no con el resumen del agente.

Escribí en las reglas qué comando define que el trabajo está terminado, por ejemplo correr el test nuevo tres veces seguidas sin fallos. Y verificalo vos, o tu pipeline, mirando el código de salida. Un agente puede escribir "todos los tests pasan" sin haberlos corrido, o habiéndolos corrido con un filtro que excluye el que falla. No es mala intención, es un resumen optimista. La diferencia entre un flujo confiable y uno que no lo es está en quién ejecuta la verificación final.

## 4:17–4:54 · Slide 12: Paso 6 de 6

Paso 6. Probar y realimentar.

Probalo: pedí un test nuevo y revisá si respetó locators, Page Objects y las tres corridas. Lo que no respetó vuelve a AGENTS.md como regla más clara.

Pedile un test nuevo para un flujo simple y revisá el resultado contra tus reglas: ¿usó locators por rol?, ¿creó o reutilizó el Page Object?, ¿corrió las tres veces? Cada cosa que haya salteado es una regla poco clara o que falta. Corregí el archivo, no solo el test, porque el archivo es lo que mejora la próxima sesión. Después de cuatro o cinco iteraciones, las reglas reflejan cómo trabaja tu equipo de verdad, y sirven también para sumar personas.

## 4:55–5:28 · Slide 13: Ejemplo

Un ejemplo.

Un equipo le pide al agente un test de "agregar producto al carrito" sin ninguna configuración. El resultado usa selectores como div.card:nth-child(3) button, una espera de dos segundos y ningún Page Object. Escriben un archivo de reglas de veinte líneas, una skill para tests nuevos y declaran el servidor MCP. Repiten el pedido. Ahora el test usa getByRole, reutiliza el Page Object del carrito y el agente lo corre tres veces. Se saltea una cosa: no agrega el test al tag de smoke. Suman esa línea a las reglas. La tercera vez sale completo.

## 5:29–5:46 · Slide 14: Errores comunes

Los errores más comunes.

Escribir un archivo de reglas largo y general que nadie puede verificar.

Corregir el test a mano sin actualizar la regla que faltaba.

Dar permisos amplios "para probar" en un repo real.

Aceptar el resumen del agente como evidencia de que los tests pasan.

## 5:46–6:04 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

El archivo de reglas tiene cómo correr, convenciones y definición de terminado.

Hay al menos una skill con un ejemplo real del repo.

El servidor MCP apunta a un entorno de prueba.

El test generado pasó tres veces en una corrida que ejecutaste vos.

## 6:05–6:14 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Ante un test rojo, tiende a debilitar el assert en lugar de investigar. Hay que prohibirlo por escrito y revisarlo en el diff.

## 6:15–6:27 · Slide 17: La guía escrita

Eso fue el día 9. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 10: Playwright MCP: un agente que navega tu app y propone tests.
