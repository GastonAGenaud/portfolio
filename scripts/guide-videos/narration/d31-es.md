# Guion del video · Día 31: Capstone: el pipeline completo de calidad con IA y tu hoja de ruta 2027

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d31-es.mp4`
- Duración del video: 7:07
- Voz sin pausas: 6:08

## 0:00–0:16 · Slide 1: Video guía

Día 31 de la serie 31 días de QA + IA.

Capstone: el pipeline completo de calidad con IA y tu hoja de ruta 2027.

Los 30 días anteriores unidos en un solo pipeline, un checklist de 12 puntos para autoevaluarte y un plan de 90 días con evidencia pública.

## 0:17–0:36 · Slide 2: El problema

Durante treinta días viste piezas sueltas: una regla para delegar, un eval, un agente configurado, un modelo de amenazas, una prueba de carga, un gate. Cada una resuelve un problema concreto. El valor mayor aparece cuando se conectan, porque ahí dejan de ser experimentos y pasan a ser un sistema de calidad para software que usa IA.

## 0:37–0:56 · Slide 3: Cómo encaja

Este último día no agrega herramientas. Arma el mapa completo, te pide una evaluación honesta de qué tenés funcionando de verdad y te ayuda a elegir qué construir primero. La serie no pretende que implementes las doce piezas. Pretende que sepas cuáles le importan a tu producto, en qué orden, y que dentro de tres meses puedas mostrar evidencia de haber avanzado.

## 0:57–1:05 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo qa-ai-lab con lo que hayas construido en la serie.

La matriz de habilidades del día 2.

## 1:06–1:59 · Slide 5: Checklist de 12 piezas

Checklist de 12 piezas.

Regla de delegación: verificable, barato de revisar, reversible (día 1).

Repo con reglas para agentes, herramientas y permisos (día 9).

Tests escritos por personas, implementación por agentes, con guardrails (días 13 y 14).

Agentes de Playwright con revisión del plan y del diff (días 10 y 11).

Eval harness con prompt versionado (día 8).

Modelos con versión fija y juez calibrado (días 15 y 16).

Golden dataset con dev, test y regresión (día 17).

Corridas repetidas, rangos y costo por llamada (días 18 y 19).

Regresión de prompts antes de cada cambio (día 20).

Threat model, red teaming y tests de inyección (días 22 a 24).

Objetivos y pruebas de performance con métricas de tokens (días 25 a 27).

Gates en CI, infra reproducible y observabilidad (días 28 a 30).

## 1:59–2:42 · Slide 6: Paso 1 de 6

Paso 1. El recorrido completo.

Recorré el diagrama de punta a punta: un cambio entra por el repo, lo produce un agente o una persona, y pasa por tests, evals, seguridad y performance antes de llegar a producción, donde se sigue midiendo.

Seguí un cambio de punta a punta sobre el diagrama. Entra por el repositorio, escrito por una persona o por un agente que trabaja con reglas y permisos. Pasa por los tests deterministas y los guardrails. Si toca algo relacionado con un modelo, pasa por los evals con su dataset y su juez calibrado. Antes del release, por seguridad y por performance. En producción sigue medido con trazas y evals en línea, y cada fallo vuelve al conjunto de regresión. El circuito cerrado es lo que hace que el sistema mejore con el uso.

## 2:43–3:16 · Slide 7: Paso 2 de 6

Paso 2. Un checklist honesto.

Completá el checklist con honestidad. "Lo vi en un video" no cuenta; cuenta lo que corre en un repo.

Completá el checklist de doce piezas con una regla estricta: una pieza cuenta solo si corre en un repositorio y alguien la usa. Haberla leído, haberla visto en un video o haberla probado una tarde no cuenta. La regla incomoda, y por eso sirve. La mayoría de los equipos descubre que tiene dos o tres piezas reales y varias a medio hacer. No es un mal resultado. Es un punto de partida preciso, y es lo que necesitás para planificar sin engañarte.

## 3:17–3:48 · Slide 8: Paso 3 de 6

Paso 3. Tres piezas, por riesgo.

Elegí tres piezas faltantes y ordenalas por riesgo de tu producto, no por lo que más te divierte.

De las que faltan, elegí tres y ordenalas según el riesgo de tu producto, no según lo que te resulte más interesante. Si tu sistema tiene un agente con herramientas y no hay tests de inyección, eso va antes que optimizar costos. Si una funcionalidad con un modelo está en producción sin ningún eval, eso va primero. Preguntate qué fallo te haría más daño mañana y qué pieza lo habría detectado. Esa es la primera.

## 3:49–4:22 · Slide 9: Paso 4 de 6

Paso 4. Un plan de noventa días.

Armá el plan de 90 días: una pieza por mes, con un entregable verificable para cada una.

Asigná una pieza por mes, cada una con un entregable verificable. "Aprender sobre evals" no es un entregable. "Un eval de treinta casos para el clasificador, corriendo en el pipeline de PR" sí. Un mes por pieza parece lento. Es realista si lo hacés junto con tu trabajo habitual. Poné las fechas en el calendario y contale el plan a alguien de tu equipo. Un compromiso que conoce otra persona se cumple bastante más que uno privado.

## 4:23–4:58 · Slide 10: Paso 5 de 6

Paso 5. Publicar evidencia.

Publicá evidencia: el repo con un README que explique qué mide cada parte, y un caso escrito con números propios.

A medida que termines cada pieza, dejala visible. Un repositorio con un README que explique qué mide cada parte y cómo correrla. Un caso escrito con tus propios números: qué problema había, qué mediste, qué decidiste y qué pasó después. Usá datos propios o sintéticos, nunca información de un cliente. Esa evidencia sirve dentro de tu equipo, para que otros adopten lo que armaste, y hacia afuera, porque muestra criterio aplicado y no solo conocimiento de herramientas.

## 4:58–5:30 · Slide 11: Paso 6 de 6

Paso 6. Volver a la matriz.

Actualizá la matriz del día 2 y fijá una fecha para repetir la autoevaluación.

Abrí la matriz de habilidades del día dos y actualizala con lo que hiciste en este mes. Las filas que estaban en cero o en uno deberían tener ahora evidencia enlazada. Poné una fecha para repetir la autoevaluación dentro de tres meses, al terminar el plan. Las herramientas concretas de esta serie van a cambiar, algunas en pocos meses. Lo que se mantiene es el método: definir qué es correcto, medirlo de forma repetible y decidir con datos.

## 5:31–6:08 · Slide 12: Ejemplo

Un ejemplo.

Una SDET completa el checklist al terminar la serie. Piezas reales: la regla de delegación, un repo con reglas para agentes y el ciclo de TDD con guardrails. A medio hacer: un eval que corre a mano. Faltantes: todo lo demás. Su producto tiene un asistente con acceso a datos de clientes y a una herramienta de mail. Ordena por riesgo. Primer mes, tests de inyección sobre las acciones del agente. Segundo mes, el eval con dataset versionado dentro del pipeline. Tercer mes, trazas y una alerta de calidad en producción. Deja costos y performance para el trimestre siguiente, y lo anota como una decisión, no como un olvido.

## 6:09–6:25 · Slide 13: Errores comunes

Los errores más comunes.

Marcar como hecha una pieza que solo viste o probaste una vez.

Elegir qué construir por interés y no por riesgo del producto.

Planear las doce piezas para el mismo trimestre.

Publicar evidencia con datos o detalles de un cliente.

## 6:26–6:43 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

El checklist está completo con la regla de que solo cuenta lo que corre.

Hay tres piezas elegidas y ordenadas por riesgo.

El plan de noventa días tiene un entregable verificable por mes.

La matriz del día dos está actualizada y tiene fecha de revisión.

## 6:44–6:53 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Resume bien y no prioriza. Decidir qué riesgo va primero en tu producto sigue siendo trabajo de una persona.

## 6:53–7:05 · Slide 16: La guía escrita

Eso fue el día 31. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Con esta guía se cierra la serie. Gracias por llegar hasta acá.
