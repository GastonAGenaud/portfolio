# Guion del video · Día 25: Modelo para pruebas de performance (1): las métricas que importan en un LLM

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d25-es.mp4`
- Duración del video: 7:06
- Voz sin pausas: 6:08

## 0:00–0:16 · Slide 1: Video guía

Día 25 de la serie 31 días de QA + IA.

Modelo para pruebas de performance (1): las métricas que importan en un LLM.

El modelo de performance de una feature con LLM: perfil de carga, métricas propias de generación de texto y objetivos por percentil.

## 0:16–0:36 · Slide 2: El problema

Quien viene de pruebas de performance tradicionales llega a un endpoint con un modelo y aplica lo que sabe: requests por segundo, latencia promedio y tasa de errores. Los números salen, y describen mal el sistema. Dos requests al mismo endpoint pueden generar veinte tokens o dos mil, y tardar medio segundo o cuarenta. Promediarlos mezcla cosas que no se parecen.

## 0:37–0:56 · Slide 3: Cómo encaja

La unidad de trabajo de un modelo es el token. La experiencia del usuario depende de cuándo llega el primero y de qué tan fluido llega el resto. Esta guía presenta las métricas que describen eso, cómo definir objetivos por percentil y cómo medir una línea de base con un solo usuario. Sin esa base, cualquier prueba de carga posterior es un número sin referencia.

## 0:57–1:05 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un endpoint compatible con la API de OpenAI (Ollama local sirve).

Python 3.10+.

## 1:06–1:12 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:12–1:15 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:16–1:54 · Slide 7: Las métricas

Las métricas.

TTFT (time to first token): tiempo hasta el primer token. Es lo que el usuario siente como "respondió".

ITL (inter-token latency): tiempo entre tokens. Mide la fluidez del texto en streaming.

Output tokens/s: velocidad de generación. Es la capacidad real del sistema.

Latencia total p95 y p99: la cola es la que genera quejas.

Tasa de error (429, 5xx, timeouts): límites de cuota y saturación.

Goodput: porcentaje de requests que cumple todos los objetivos a la vez.

Costo por request: tokens de entrada y salida. La carga también se paga.

## 1:55–2:35 · Slide 8: Paso 1 de 6

Paso 1. Por qué las métricas clásicas engañan.

Entendé por qué las métricas clásicas engañan: dos requests al mismo endpoint pueden generar 20 o 2.000 tokens. Requests por segundo y latencia promedio mezclan cosas distintas.

En una API tradicional, las requests al mismo endpoint cuestan más o menos lo mismo. Con un modelo, el costo de cada request depende de cuántos tokens entran y, sobre todo, de cuántos salen, porque la generación es secuencial. Diez requests por segundo con respuestas cortas y con respuestas largas son dos cargas completamente distintas para el mismo servidor. Si reportás solo requests por segundo y latencia promedio, dos pruebas con igual resultado pueden haber medido cosas diferentes.

## 2:36–3:12 · Slide 9: Paso 2 de 6

Paso 2. El perfil de carga.

Definí el perfil de carga: tamaños de prompt, largo de salida esperado, con o sin streaming, y concurrencia en hora pico.

Antes de medir, describí la carga real. Qué tamaños de prompt llegan y en qué proporción. Qué largo de respuesta se espera. Si se usa streaming o se espera la respuesta entera. Cuál es la concurrencia pico. Sacá estos datos de los registros de producción si existen, o estimalos con el equipo de producto si no. Un perfil con tres o cuatro tipos de request y sus proporciones es suficiente. Sin perfil vas a probar con un prompt cualquiera y obtener números que no predicen nada.

## 3:13–3:49 · Slide 10: Paso 3 de 6

Paso 3. Objetivos por percentil.

Fijá objetivos por percentil, no por promedio: por ejemplo TTFT p95, latencia total p95 y tasa de error máxima.

Un promedio esconde la cola, y la cola es donde están los usuarios que se quejan. Definí los objetivos como percentiles: por ejemplo, tiempo al primer token en el percentil noventa y cinco, latencia total en el percentil noventa y cinco y una tasa de error máxima. Los valores salen de la experiencia que el producto necesita, no de lo que el sistema da hoy. Escribilos antes de medir. Si los definís después, se van a parecer sospechosamente a lo que mediste.

## 3:50–4:25 · Slide 11: Paso 4 de 6

Paso 4. La línea de base con un usuario.

Medí la línea base con un solo usuario usando el script. Si con un usuario ya no cumplís, no hay prueba de carga que hacer todavía.

Corré el script con un solo usuario y sin concurrencia, varias veces por cada tipo de request del perfil. Eso te da el mejor caso: lo que el sistema hace cuando no compite con nadie. Si con un usuario no cumplís los objetivos, no hay prueba de carga que correr todavía, porque el problema está en el modelo elegido, en el tamaño del prompt o en la infraestructura, y la carga solo lo va a empeorar. La línea de base es además la referencia para leer todo lo que viene después.

## 4:26–4:57 · Slide 12: Paso 5 de 6

Paso 5. Goodput.

Sumá goodput: el porcentaje de requests que cumple todos los objetivos a la vez.

El goodput es el porcentaje de requests que cumplen todos los objetivos a la vez: primer token a tiempo, latencia total dentro del límite y sin error. Importa porque las métricas por separado pueden verse bien mientras la experiencia es mala. Un sistema puede sostener muchas requests por segundo y tener un goodput bajo si buena parte de ellas llega tarde. Es el número que mejor resume si la carga se está atendiendo de forma aceptable, y sirve para comparar configuraciones.

## 4:58–5:31 · Slide 13: Paso 6 de 6

Paso 6. El costo por request.

Anotá costo por request. Una prueba de carga contra una API paga consume presupuesto real.

Registrá los tokens de entrada y de salida de cada request y convertilos en costo. Tiene dos usos. El primero es de producto: saber cuánto cuesta atender a un usuario con la carga esperada. El segundo es práctico. Una prueba de carga contra una API paga consume presupuesto real, y una prueba mal dimensionada puede gastar en una hora lo previsto para un mes. Estimá el costo de la prueba antes de correrla y usá una clave con tope de gasto.

## 5:32–6:06 · Slide 14: Ejemplo

Un ejemplo.

Con valores ilustrativos: un equipo define tres tipos de request para su asistente, corta, media y larga, en proporción de sesenta, treinta y diez. Los objetivos son primer token en menos de un segundo y medio y latencia total bajo doce segundos, ambos en el percentil noventa y cinco. La línea de base con un usuario muestra que las cortas y las medias cumplen. Las largas tardan dieciocho segundos en total, aunque el primer token llega a tiempo. Antes de cualquier prueba de carga ya hay un hallazgo. Lo discuten con producto y acuerdan limitar el largo de esas respuestas, lo que las deja en once segundos.

## 6:06–6:22 · Slide 15: Errores comunes

Los errores más comunes.

Reportar solo requests por segundo y latencia promedio.

Probar con un único prompt que no representa la carga real.

Fijar los objetivos después de ver las mediciones.

Lanzar una prueba de carga sin estimar cuánto va a costar.

## 6:23–6:40 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El perfil de carga tiene tipos de request y proporciones.

Los objetivos están escritos por percentil antes de medir.

Hay una línea de base con un usuario para cada tipo de request.

Cada medición incluye tokens y costo por request.

## 6:41–6:51 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Los asistentes proponen por defecto métricas de API clásica (RPS, promedio). Hay que pedir explícitamente métricas de generación.

## 6:52–7:05 · Slide 18: La guía escrita

Eso fue el día 25. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 26: Performance (2): prueba de carga a un endpoint LLM con k6.
