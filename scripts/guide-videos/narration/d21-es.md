# Guion del video · Día 21: Testing de RAG: retrieval, fidelidad y respuesta por separado

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d21-es.mp4`
- Duración del video: 6:39
- Voz sin pausas: 5:46

## 0:00–0:15 · Slide 1: Video guía

Día 21 de la serie 31 días de QA + IA.

Testing de RAG: retrieval, fidelidad y respuesta por separado.

Cómo probar un sistema RAG en tres capas para saber, cuando falla, si el problema está en la búsqueda, en la generación o en la base de conocimiento.

## 0:16–0:34 · Slide 2: El problema

Un sistema RAG responde preguntas buscando primero en tus documentos y generando después una respuesta con lo que encontró. Cuando contesta mal, la reacción habitual es retocar el prompt. A veces funciona. Muchas veces no, porque el problema estaba antes: el documento correcto nunca llegó al modelo y ninguna instrucción puede compensar eso.

## 0:35–0:54 · Slide 3: Cómo encaja

Probar un RAG de punta a punta, con una sola métrica, mezcla dos sistemas distintos: un buscador y un generador. Esta guía los separa en tres capas que se miden por separado, y agrega los casos negativos, donde la respuesta correcta es admitir que la información no está. El resultado es un diagnóstico que dice dónde hay que arreglar, no solo que algo anda mal.

## 0:55–1:13 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Python 3.10+ y una app RAG que exponga la respuesta y los fragmentos recuperados.

20 preguntas con respuesta esperada y documento fuente.

DeepEval usa por defecto un modelo de OpenAI como juez (requiere OPENAI_API_KEY); su documentación explica cómo usar otro.

## 1:14–1:19 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:20–1:22 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:23–2:03 · Slide 7: Paso 1 de 6

Paso 1. Capa uno: recuperación.

Capa 1, retrieval: para cada pregunta, verificá si el documento correcto aparece entre los fragmentos recuperados. Es determinista y no necesita un modelo.

Para cada pregunta del dataset, anotá qué documento contiene la respuesta. El test verifica si ese documento aparece entre los fragmentos recuperados. No hace falta ningún modelo para evaluarlo: es una comparación de identificadores, determinista y rápida. Esta métrica es el techo del sistema. Si el fragmento correcto aparece en siete de cada diez preguntas, la respuesta final no puede acertar con fundamento en más de siete. Empezar por acá evita semanas de ajustes en el lugar equivocado.

## 2:03–2:41 · Slide 8: Paso 2 de 6

Paso 2. Capa dos: fidelidad.

Capa 2, fidelidad: cada afirmación de la respuesta tiene que estar respaldada por los fragmentos recuperados. Acá se detectan las invenciones.

La fidelidad pregunta si cada afirmación de la respuesta está respaldada por los fragmentos recuperados. No evalúa si la respuesta es verdadera en general, sino si sale del contexto que el sistema tenía. Acá se detectan las invenciones: un dato que el modelo agregó de su conocimiento previo, una cifra alterada, una condición que el documento no menciona. Se mide con un juez que descompone la respuesta en afirmaciones y verifica cada una. Para cifras y fechas, sumá chequeos deterministas.

## 2:42–3:13 · Slide 9: Paso 3 de 6

Paso 3. Capa tres: respuesta.

Capa 3, respuesta: ¿responde lo que se preguntó y coincide con lo esperado?

Recién en la tercera capa se evalúa si la respuesta contesta lo que se preguntó y coincide con lo esperado. Una respuesta puede ser fiel al contexto y no servir: habla del tema, cita bien el documento y no responde la pregunta concreta. O puede responder correctamente por conocimiento general sin apoyarse en tus documentos, lo cual es un riesgo distinto. Por eso las tres capas se miran juntas: cada combinación de resultados apunta a un problema diferente.

## 3:14–3:48 · Slide 10: Paso 4 de 6

Paso 4. Casos negativos.

Sumá casos negativos: preguntas cuya respuesta no está en la base. El sistema tiene que decir que no sabe.

Agregá preguntas cuya respuesta no está en la base de conocimiento. El comportamiento esperado es que el sistema lo diga, en lugar de armar una respuesta plausible con fragmentos vagamente relacionados. Es el caso que más daño hace en producción y el que menos se prueba, porque los datasets suelen construirse a partir de los documentos existentes. Incluí también preguntas casi cubiertas: el documento habla del tema, pero no trae el dato específico que se pide.

## 3:48–4:25 · Slide 11: Paso 5 de 6

Paso 5. Diagnosticar por capa.

Diagnosticá por capa: retrieval bajo se arregla en chunking, índice o búsqueda; fidelidad baja se arregla en prompt o modelo. Cambiar el prompt no arregla un mal retrieval.

Con las tres métricas separadas, cada arreglo tiene su lugar. Recuperación baja se corrige en el tamaño de los fragmentos, en el índice o en la búsqueda. Fidelidad baja con buena recuperación se corrige en el prompt o cambiando de modelo. Respuesta baja con las otras dos altas suele ser un problema de formato o de instrucciones. La regla práctica es no tocar el prompt hasta confirmar que la recuperación funciona: cambiar el prompt no arregla una búsqueda que no encuentra.

## 4:26–4:57 · Slide 12: Paso 6 de 6

Paso 6. Métricas en CI.

Llevá las tres métricas a CI con umbrales y seguí su evolución en cada cambio de documentos.

Llevá las tres métricas al pipeline con un umbral para cada una, y corré el eval cada vez que cambien los documentos, no solo el código. En un RAG, la base de conocimiento es parte del sistema. Un documento nuevo que contradice a otro, o una reorganización de carpetas, puede bajar la recuperación sin que nadie haya tocado una línea. Registrá la evolución de las métricas con cada cambio de contenido para poder ubicar cuándo empezó una caída.

## 4:57–5:40 · Slide 13: Ejemplo

Un ejemplo.

Un asistente interno responde preguntas sobre políticas de la empresa. El equipo arma cuarenta preguntas con su documento fuente y diez negativas. Primera medición, con cifras ilustrativas: recuperación 65%, fidelidad 92%, respuesta 60%. El equipo venía ajustando el prompt hacía dos semanas. Los números muestran que el generador es fiel a lo que recibe y que el problema está en la búsqueda. Revisan y encuentran que los fragmentos cortaban las tablas por la mitad. Cambian la estrategia de fragmentación y la recuperación sube a 90%; la respuesta, a 84%, sin tocar el prompt. En las negativas, tres de diez todavía inventan. Eso sí se corrige con una instrucción.

## 5:40–5:57 · Slide 14: Errores comunes

Los errores más comunes.

Medir solo la respuesta final y no saber qué capa falla.

Ajustar el prompt cuando el problema es de recuperación.

No incluir preguntas sin respuesta en la base de conocimiento.

Correr el eval solo cuando cambia el código y no los documentos.

## 5:57–6:14 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Cada pregunta tiene anotado su documento fuente.

Recuperación, fidelidad y respuesta se miden por separado.

El dataset incluye casos negativos y casi cubiertos.

El eval corre en CI ante cambios de documentos.

## 6:14–6:23 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Con la fuente correcta en contexto, igual altera cifras. La fidelidad se mide, no se supone.

## 6:23–6:37 · Slide 17: La guía escrita

Eso fue el día 21. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 22: Modelo para pruebas de seguridad (1): threat model con OWASP LLM y Agentic Top 10.
