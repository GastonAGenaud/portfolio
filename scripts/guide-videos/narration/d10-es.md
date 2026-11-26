# Guion del video · Día 10: Playwright MCP: un agente que navega tu app y propone tests

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d10-es.mp4`
- Duración del video: 6:34
- Voz sin pausas: 5:42

## 0:00–0:15 · Slide 1: Video guía

Día 10 de la serie 31 días de QA + IA.

Playwright MCP: un agente que navega tu app y propone tests.

Conectá Playwright MCP a tu agente, hacé una exploración guiada y terminá con un plan de pruebas y un test que usa los roles reales de la página.

## 0:16–0:33 · Slide 2: El problema

Durante años, generar tests de UI con IA significó pegar HTML en un chat y recibir selectores adivinados. El modelo nunca veía la aplicación funcionando: no sabía qué aparece después de un clic, qué botón queda deshabilitado ni cuánto tarda en cargar una lista. Los tests resultantes compilaban y fallaban en la primera corrida.

## 0:34–0:54 · Slide 3: Cómo encaja

El servidor MCP de Playwright cambia ese punto de partida: le da al agente un navegador que puede manejar. Navega, hace clic, completa formularios y lee el estado real de la página. Esta guía muestra cómo usarlo con orden, primero para explorar y recién al final para escribir código, y qué límites ponerle, porque un agente que lee páginas también lee lo que alguien haya escrito en ellas.

## 0:55–1:08 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Node.js 22+ y un agente compatible con MCP.

App de práctica: https://demo.playwright.dev/todomvc.

Solo ambientes y cuentas de prueba.

## 1:09–1:14 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:15–1:18 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:18–1:54 · Slide 7: Paso 1 de 6

Paso 1. Conectar y comprobar.

Conectá el servidor MCP de Playwright a tu agente y verificá que aparezcan las herramientas del navegador.

Agregá el servidor a tu agente con el comando de la guía y, antes de pedir nada, listá las herramientas disponibles. Tienen que aparecer las de navegador: navegar, hacer clic, escribir, tomar un snapshot. Si no aparecen, el agente va a responder igual, pero de memoria, y vas a creer que exploró la página cuando no lo hizo. Esa comprobación de diez segundos evita la confusión más común. Después pedile algo trivial, como abrir una URL y decir el título, para confirmar que el navegador responde.

## 1:55–2:32 · Slide 8: Paso 2 de 6

Paso 2. Qué ve el agente.

Entendé qué ve el agente: un snapshot de accesibilidad con roles y nombres, no una imagen. Por eso sus locators salen mejor.

No ve una captura de pantalla sino un snapshot de accesibilidad: un árbol de texto con el rol de cada elemento, su nombre accesible y su estado. Un botón aparece como botón con su etiqueta, un campo como textbox con su label. Tiene dos consecuencias. La primera es que los locators que propone se basan en roles y nombres, que son más estables que las clases CSS. La segunda es que una página con mala accesibilidad le resulta tan difícil como a un lector de pantalla, y ese ya es un hallazgo.

## 2:33–3:09 · Slide 9: Paso 3 de 6

Paso 3. Explorar sin escribir código.

Explorá primero, sin código. Usá el prompt de exploración y leé el reporte de roles, estados y posibles defectos.

Pedile que recorra un flujo y que reporte lo que encuentra, con la instrucción explícita de no escribir tests todavía. El reporte debería listar los elementos por rol, los estados que observó, como listas vacías, errores o elementos deshabilitados, y lo que le pareció raro. Leelo como leerías las notas de alguien que usa el producto por primera vez. Sirve para descubrir estados que no tenías en mente. No sirve como lista de bugs: el agente no conoce tus reglas de negocio.

## 3:09–3:43 · Slide 10: Paso 4 de 6

Paso 4. Un plan en Markdown, corregido por vos.

Pedí un plan de pruebas en Markdown a partir de lo observado y corregilo vos: prioridades y casos faltantes.

Con la exploración hecha, pedí un plan de pruebas en Markdown basado solo en lo observado. Un plan es barato de corregir y un conjunto de tests no. Revisalo con tres preguntas: qué casos faltan que solo conoce quien sabe del negocio, cuáles sobran porque repiten lo mismo y cuál es la prioridad real de cada uno. Guardá el plan corregido en el repo. Es la especificación de lo que vas a pedir después, y deja registro de qué decidiste probar y qué no.

## 3:44–4:16 · Slide 11: Paso 5 de 6

Paso 5. Un test por vez.

Pedí un solo test del plan, con los roles que vio, y correlo tres veces.

Pedí un solo test del plan, indicando que use los roles y nombres que vio en la página. Correlo tres veces seguidas antes de pedir el siguiente. Generar de a uno parece lento, pero cada test que pasa confirma que las convenciones se entendieron, y cada fallo se corrige una vez en lugar de veinte. Cuando un test falle, mirá primero si el problema es del test o de la aplicación. Si el agente explora y el test falla igual, puede que haya encontrado un defecto de verdad.

## 4:17–4:56 · Slide 12: Paso 6 de 6

Paso 6. Límites de seguridad.

Fijá límites: nunca producción ni credenciales reales, y recordá que el agente lee todo el contenido de la página, incluido texto malicioso.

Dos reglas fijas. Primera: nunca producción ni credenciales reales. El agente puede hacer clic en cualquier cosa que vea, incluidos los botones de borrar y de pagar. Segunda: todo el texto de la página entra a su contexto, y eso incluye contenido escrito por terceros, como comentarios, nombres de usuario o descripciones de producto. Si alguien escribió ahí una instrucción, el agente puede intentar seguirla. Usá un entorno de prueba con datos controlados y revisá cualquier acción que no hayas pedido.

## 4:57–5:31 · Slide 13: Ejemplo

Un ejemplo.

Una tester conecta el servidor y le pide al agente explorar una aplicación de lista de tareas. El reporte lista un campo de texto, una casilla por tarea, tres filtros y un contador. Marca dos sospechas: el contador dice "1 items left" con una sola tarea, y no hay forma visible de editar una tarea. La primera es un defecto de texto menor; la segunda no es un defecto, se edita con doble clic y el agente no lo descubrió. Ella corrige el plan agregando el caso de edición, pide el primer test, "agregar una tarea", y pasa tres veces. En veinte minutos tiene un plan revisado y un test confiable.

## 5:32–5:49 · Slide 14: Errores comunes

Los errores más comunes.

Pedir tests antes de explorar y de tener un plan revisado.

No comprobar que las herramientas de navegador estén cargadas.

Tratar el reporte de exploración como una lista de bugs confirmados.

Apuntar el agente a un entorno con datos o credenciales reales.

## 5:50–6:07 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Las herramientas de navegador aparecen en la lista del agente.

Hay un reporte de exploración con roles, estados y sospechas.

El plan en Markdown está corregido y guardado en el repo.

Un test generado pasó tres corridas seguidas.

## 6:08–6:19 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Confunde comportamiento esperado con defecto cuando no conoce las reglas del producto. El reporte de exploración es una lista de sospechas, no de bugs.

## 6:19–6:32 · Slide 17: La guía escrita

Eso fue el día 10. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 11: Playwright Test Agents: planner, generator y healer en acción.
