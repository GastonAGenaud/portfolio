# Guion del video · Día 11: Playwright Test Agents: planner, generator y healer en acción

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d11-es.mp4`
- Duración del video: 6:28
- Voz sin pausas: 5:36

## 0:00–0:14 · Slide 1: Video guía

Día 11 de la serie 31 días de QA + IA.

Playwright Test Agents: planner, generator y healer en acción.

El ciclo completo planner, generator y healer en un repo real, y los dos puntos donde tiene que intervenir una persona.

## 0:15–0:34 · Slide 2: El problema

Ayer el flujo de explorar, planear y generar lo armaste a mano, con prompts propios. Playwright trae ese mismo flujo empaquetado como tres agentes con responsabilidades separadas: uno planifica, otro genera y otro repara. La ventaja no es que sean más inteligentes, sino que cada uno tiene instrucciones acotadas y deja un artefacto que el siguiente usa.

## 0:35–0:53 · Slide 3: Cómo encaja

El riesgo también viene empaquetado. Un sistema que repara tests solo puede dejar la suite en verde por la razón equivocada. Esta guía recorre los tres agentes y marca los dos puntos donde una persona tiene que intervenir sí o sí: antes de generar y después de reparar. Sin esas dos revisiones, lo que ganás en velocidad lo perdés en confianza.

## 0:53–1:05 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Playwright actualizado (los agentes vienen desde la versión 1.56).

Un agente de código: Claude Code, VS Code con Copilot u OpenCode.

## 1:05–1:11 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:11–1:51 · Slide 6: Paso 1 de 6

Paso 1. Inicializar y commitear.

Actualizá Playwright y corré init-agents con el loop de tu agente. Genera las definiciones de los tres agentes, un seed.spec.ts, la carpeta specs/ y la config del servidor MCP de tests. Commiteá todo.

El comando de inicialización genera las definiciones de los tres agentes para el bucle que uses, un test semilla, la carpeta de planes y la configuración del servidor MCP de tests. Commiteá todo eso junto. Las definiciones son instrucciones en texto: conviene leerlas una vez para entender qué va a hacer cada agente y con qué herramientas. Al estar en el repo, todo el equipo usa las mismas, y cualquier ajuste que hagas queda en el historial igual que un cambio de código.

## 1:52–2:27 · Slide 7: Paso 2 de 6

Paso 2. El test semilla.

Escribí el seed test: deja la página en el estado inicial que necesitan todos los flujos (por ejemplo, logueado con un usuario de prueba).

El semilla es un test común que deja la aplicación en el estado desde el cual empiezan todos los flujos: sesión iniciada, datos mínimos cargados, pantalla inicial. Los agentes lo ejecutan antes de explorar o generar, así que también sirve como ejemplo de estilo: los tests generados tienden a parecerse a él. Escribilo con el mismo cuidado que tu mejor test. Si usa locators por rol y fixtures claras, lo que venga después hereda eso. Si es descuidado, también.

## 2:28–3:03 · Slide 8: Paso 3 de 6

Paso 3. Planner y la primera intervención.

Planner: pedile que explore un flujo y guarde el plan en specs/. Intervención 1: revisá el plan antes de generar nada.

El planner explora la aplicación a partir del semilla y escribe un plan en Markdown dentro de la carpeta de planes: escenarios, pasos y resultados esperados. Acá va la primera intervención humana, y es la más barata de toda la cadena. Leé el plan antes de generar nada. Sacá escenarios que no aportan, sumá los que dependen de reglas de negocio y corregí los resultados esperados que el planner supuso. Todo error que dejes pasar se multiplica en código.

## 3:03–3:37 · Slide 9: Paso 4 de 6

Paso 4. Generator.

Generator: pedile los tests del plan aprobado. Verifica los selectores contra la página real mientras escribe.

El generator toma el plan aprobado y escribe los tests. La diferencia con un generador clásico es que verifica contra la página viva: ejecuta los pasos mientras escribe y comprueba que cada locator encuentra su elemento. Por eso el resultado suele correr a la primera. Aun así, revisá las aserciones. Un test puede navegar bien todo el flujo y terminar verificando algo trivial, como que la URL cambió, en lugar de la regla que el escenario quería probar.

## 3:38–4:18 · Slide 10: Paso 5 de 6

Paso 5. Healer y la segunda intervención.

Healer: rompé un locator a propósito y corré el healer. Intervención 2: revisá el diff. Arreglar un locator está bien; cambiar una aserción no.

Rompé un locator a propósito, por ejemplo cambiando el nombre de un botón, y corré el healer. Va a ejecutar el test, ver el fallo, inspeccionar la página y proponer una corrección. Acá va la segunda intervención: revisar el diff. Hay dos tipos de cambio. Actualizar un locator porque la interfaz cambió es mantenimiento legítimo. Modificar o quitar una aserción para que el test pase es ocultar un posible defecto. El primero se acepta; el segundo se rechaza y se investiga.

## 4:18–4:51 · Slide 11: Paso 6 de 6

Paso 6. Regenerar en cada upgrade.

En cada upgrade de Playwright, volvé a correr init-agents en el mismo PR para regenerar las definiciones.

Las definiciones de los agentes están atadas a la versión de Playwright: cambian las herramientas disponibles y las instrucciones. Cuando subas de versión, volvé a correr la inicialización en el mismo pull request y revisá qué cambió en las definiciones. Si les habías hecho ajustes propios, vas a tener que reaplicarlos, así que conviene documentarlos en un archivo aparte. Dejar definiciones viejas con una versión nueva produce fallos difíciles de diagnosticar.

## 4:52–5:27 · Slide 12: Ejemplo

Un ejemplo.

Un equipo prueba el flujo de alta de usuario. El planner propone nueve escenarios. En la revisión sacan dos repetidos y agregan uno que no podía saber: los mails de un dominio bloqueado deben rechazarse. El generator escribe ocho tests y siete pasan a la primera. Una semana después, un rediseño cambia el texto de un botón y fallan cuatro. El healer corrige los cuatro locators. En el diff, tres cambios son solo de locator. El cuarto además cambió una aserción de "muestra el error" a "el botón está visible". Rechazan ese cambio, investigan y descubren que el mensaje de error había desaparecido en el rediseño.

## 5:28–5:44 · Slide 13: Errores comunes

Los errores más comunes.

Generar tests sin haber leído y corregido el plan.

Aceptar el resultado del healer porque la suite quedó en verde.

Escribir un test semilla descuidado que después todos los tests imitan.

Subir Playwright sin regenerar las definiciones de los agentes.

## 5:45–6:03 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

Las definiciones, el semilla y la configuración están commiteados.

El plan fue revisado por una persona antes de generar.

Cada test generado tiene una aserción que prueba una regla.

El diff del healer se revisó separando locators de aserciones.

## 6:04–6:13 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El healer puede poner un test en verde modificando la aserción. Un test reparado sin revisar el diff es un falso verde.

## 6:14–6:26 · Slide 16: La guía escrita

Eso fue el día 11. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 12: Triage de fallos con LLM: de 40 tests rojos a 3 causas.
