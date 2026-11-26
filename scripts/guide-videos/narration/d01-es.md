# Guion del video · Día 1: LLMs en QA: el mapa 2026, dónde sirven y dónde no

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d01-es.mp4`
- Duración del video: 6:22
- Voz sin pausas: 5:35

## 0:00–0:14 · Slide 1: Video guía

Día 1 de la serie 31 días de QA + IA.

LLMs en QA: el mapa 2026, dónde sirven y dónde no.

Seis usos de LLM en QA que hoy funcionan, tres que no, y una regla simple para decidir cuándo delegar.

## 0:15–0:32 · Slide 2: El problema

En 2026 casi todos los equipos de QA usan algún LLM, pero pocos pueden decir en qué tareas les ahorra tiempo de verdad y en cuáles les suma riesgo. El resultado típico es usarlo para todo durante dos semanas, encontrarse con casos de prueba inventados y un par de tests frágiles, y volver a trabajar como antes.

## 0:33–0:49 · Slide 3: Cómo encaja

Esta guía ordena ese terreno. No parte de la herramienta sino de tus tareas: cuáles son de texto a texto, cuáles tienen una fuente de verdad contra la que comparar y cuáles se pueden deshacer si salen mal. Con eso alcanza para armar un mapa propio y una regla de decisión que vas a usar durante toda la serie.

## 0:50–1:00 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Una user story real de tu backlog.

Un LLM a mano: Claude, ChatGPT o un modelo local con Ollama.

20 minutos.

## 1:01–1:38 · Slide 5: Paso 1 de 6

Paso 1. Inventario de tareas reales.

Listá tus tareas de QA de la última semana y marcá las que son texto a texto: analizar, redactar, clasificar, resumir.

Abrí tu calendario y tu tablero de la semana pasada y anotá cada tarea con un verbo: revisar un requisito, escribir casos, preparar datos, automatizar un flujo, analizar un pipeline rojo, reportar un bug. No anotes lo que te gustaría hacer, sino lo que hiciste. Al lado de cada una poné cuánto tiempo te llevó. Las tareas de texto a texto que además te consumen horas son las primeras candidatas, porque ahí el modelo produce un borrador en segundos y vos pasás a revisar en lugar de redactar.

## 1:38–2:23 · Slide 6: Paso 2 de 6

Paso 2. Los seis usos que rinden.

Ubicalas en los seis usos que funcionan: análisis de requisitos y ambigüedades, diseño de casos desde user stories, datos de prueba, escritura y refactor de automation con agentes, triage de fallos sobre logs y traces, y evals de features que usan IA.

Cada uno funciona por la misma razón: hay algo contra qué comparar. En análisis de requisitos, comparás contra el product owner. En diseño de casos, contra las reglas de negocio. En datos de prueba, contra un schema. En automation, contra la ejecución del test. En triage, contra el trace. En evals, contra un dataset etiquetado. Si para una tarea no podés nombrar ese punto de comparación, todavía no pertenece a esta lista, por más que el resultado se vea prolijo.

## 2:23–2:59 · Slide 7: Paso 3 de 6

Paso 3. Los tres usos que fallan.

Tachá los tres que no funcionan: decidir un release sin una persona, usar el modelo como oráculo sin fuente de verdad, y mergear tests de UI generados sin revisar.

Decidir un release es un juicio de riesgo de negocio y el modelo no conoce tu contexto ni responde por la decisión. Usarlo de oráculo sin fuente de verdad produce respuestas seguras y a veces falsas, que es la peor combinación para QA. Y los tests de UI generados en lote suelen pasar una vez y fallar a la semana, porque dependen de selectores adivinados y esperas fijas. No están prohibidos: necesitan una persona que mire el resultado antes de darlo por bueno.

## 3:00–3:35 · Slide 8: Paso 4 de 6

Paso 4. La regla de tres preguntas.

Aplicá la regla: delego solo si el resultado es verificable, barato de revisar y reversible.

Verificable significa que existe un chequeo objetivo: un test que corre, un schema, una regla escrita. Barato de revisar significa que leerlo te cuesta bastante menos que hacerlo vos; si revisar cuarenta casos generados te lleva más que escribir quince buenos, no ganaste nada. Reversible significa que un error no deja consecuencias: un borrador se descarta, un merge a producción no. Si falla una de las tres, la IA puede asistir, pero la decisión y la firma son tuyas.

## 3:36–4:08 · Slide 9: Paso 5 de 6

Paso 5. Primera prueba con una user story.

Probalo: pegá tu user story y pedí "antes de escribir casos, listá ambigüedades y preguntas para el PO".

Elegí una story que ya esté en desarrollo, así podés comparar con lo que el equipo descubrió por las malas. Pegá el texto completo con sus criterios de aceptación y pedí solo ambigüedades y preguntas, no casos. Tomá nota de cuántas preguntas son reales, cuántas ya estaban respondidas en otro lado y cuántas no aplican. Esa proporción te dice si para tu dominio conviene usarlo en refinamiento o si primero necesita más contexto escrito.

## 4:09–4:41 · Slide 10: Paso 6 de 6

Paso 6. El registro de aciertos y errores.

Anotá qué acertó y qué inventó. Ese registro es tu primer eval.

Armá una tabla simple con cuatro columnas: tarea, qué pediste, qué acertó y qué inventó. Completala durante dos semanas cada vez que uses un modelo para algo de QA. Sin ese registro tu opinión sobre la herramienta va a depender del último resultado que viste. Con el registro tenés evidencia para decidir dónde seguir usándola, y además el primer borrador de un dataset de evaluación, que es justo lo que vamos a construir más adelante.

## 4:41–5:18 · Slide 11: Ejemplo

Un ejemplo.

Una analista toma la story "aplicar cupón de descuento en el checkout". Le pide al modelo ambigüedades y recibe siete preguntas. Tres son reales y nadie las había hecho: qué pasa si el cupón vence durante la compra, si se combina con envío gratis y cómo se redondea. Dos ya estaban respondidas en el documento de reglas. Las otras dos asumen una regla de "un cupón por cliente" que no existe. Resultado en la tabla: tres aciertos, dos sobras y dos inventos. Diez minutos de trabajo y tres preguntas que evitaron un bug en producción. Ese es un uso que pasa la regla: verificable con el PO, barato de leer y sin consecuencias si se descarta.

## 5:19–5:41 · Slide 12: Errores comunes

Los errores más comunes.

Evaluar la herramienta por una demo o por el último resultado, sin registro de aciertos y errores.

Pedir el entregable final (casos, tests) antes de pedir preguntas y ambigüedades.

Dar por bueno un resultado porque está bien redactado, sin compararlo contra una fuente de verdad.

Medir el ahorro solo en tiempo de escritura y olvidar el tiempo de revisión.

## 5:41–5:59 · Slide 13: Checklist

Para saber que quedó bien, revisá esto.

Tenés diez tareas reales clasificadas en delegables y no delegables.

Cada tarea delegable tiene nombrado contra qué se verifica.

Corriste el prompt de ambigüedades sobre una story real.

Tu tabla tiene al menos tres aciertos y un error anotados.

## 6:00–6:08 · Slide 14: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Inventa reglas de negocio con mucha seguridad. Sin una fuente de verdad al lado, no sirve de oráculo.

## 6:09–6:21 · Slide 15: La guía escrita

Eso fue el día 1. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 2: Cómo se está reorientando el rol SDET en el mundo de la IA.
