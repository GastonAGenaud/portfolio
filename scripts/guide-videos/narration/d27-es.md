# Guion del video · Día 27: Performance (3): IA generando y analizando pruebas de carga

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d27-es.mp4`
- Duración del video: 6:56
- Voz sin pausas: 6:01

## 0:00–0:16 · Slide 1: Video guía

Día 27 de la serie 31 días de QA + IA.

Performance (3): IA generando y analizando pruebas de carga.

Cómo usar un LLM para escribir un script de carga desde una especificación y para proponer hipótesis sobre los resultados, con un método para verificar cada una.

## 0:17–0:35 · Slide 2: El problema

Escribir un script de carga desde cero y leer después un resumen con cientos de métricas son las dos partes más lentas de las pruebas de performance, y las dos son texto. Un modelo puede acelerar ambas. Lo que no puede hacer es saber cómo es tu tráfico, cuáles son tus objetivos ni qué estaba pasando en tus servidores durante la prueba.

## 0:35–0:58 · Slide 3: Cómo encaja

Si no le das esa información, la completa con valores razonables y la presenta con seguridad. El script resultante corre, y prueba una carga que no es la tuya. El análisis resultante suena experto, y describe cuellos de botella genéricos. Esta guía muestra qué entradas hacen útil a la IA en performance, cómo revisar lo que genera antes de gastar una corrida y cómo convertir su análisis en hipótesis que se verifican.

## 0:59–1:13 · Slide 4: Requisitos

Para seguir esta guía necesitás:

k6 y una API de práctica con especificación OpenAPI.

Un perfil de tráfico agregado (porcentaje por endpoint), nunca logs crudos con datos personales.

Objetivos de servicio escritos.

## 1:14–1:19 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:20–1:22 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:23–1:26 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:27–2:07 · Slide 8: Paso 1 de 6

Paso 1. Tres entradas obligatorias.

Dale al modelo tres insumos: la especificación de la API, la mezcla de tráfico agregada y los objetivos. Sin eso inventa los tres.

El modelo necesita tres cosas para escribir un script que sirva. La especificación de la API, para conocer los endpoints, los parámetros y los formatos reales. La mezcla de tráfico agregada, es decir qué porcentaje de las llamadas va a cada operación, sacada de tus registros sin datos de usuarios. Y los objetivos de latencia y error. Si falta cualquiera de las tres, la va a inventar. Y lo va a hacer de forma verosímil, que es peor que hacerlo mal: una mezcla de tráfico inventada no se ve distinta de una real.

## 2:08–2:44 · Slide 9: Paso 2 de 6

Paso 2. Requisitos explícitos en el pedido.

Pedí el script con requisitos explícitos: escenarios, think time, datos desde archivo, variables de entorno, thresholds y timeouts.

Pedí el script con una lista de requisitos, no con una descripción general: escenarios separados por tipo de operación, tiempo de espera entre acciones de un mismo usuario, datos leídos desde un archivo, URLs y claves por variables de entorno, umbrales con tus objetivos y timeouts adecuados al largo de las respuestas. Cada requisito corresponde a un defecto frecuente en los scripts generados. Guardá el pedido como plantilla en el repo, igual que los prompts de los días anteriores.

## 2:45–3:26 · Slide 10: Paso 3 de 6

Paso 3. Revisión con checklist.

Revisalo con checklist antes de correr: ¿la mezcla coincide?, ¿hay think time?, ¿los datos no se repiten?, ¿cero secretos en el código?, ¿los thresholds son los tuyos?

Antes de correr nada, revisá el script con cinco preguntas. ¿La mezcla de escenarios coincide con la que pasaste? ¿Hay tiempo de espera entre acciones, o cada usuario virtual dispara sin pausa? ¿Los datos varían, o se repite el mismo registro? ¿Hay algún secreto escrito en el código? ¿Los umbrales son los tuyos, o aparecieron otros? Son cinco minutos de lectura. Correr un script equivocado cuesta una hora de prueba, presupuesto de API y, sobre todo, conclusiones sacadas de datos que no representan nada.

## 3:27–4:00 · Slide 11: Paso 4 de 6

Paso 4. Corrida en seco y corrida real.

Dry run con un usuario y una iteración para ver que funciona, y después la corrida real exportando el resumen.

Ejecutá primero con un usuario y una iteración. Sirve para confirmar que el script funciona: que autentica, que las respuestas son las esperadas y que los checks pasan. Encontrar un error de autenticación con mil usuarios virtuales es una forma cara de enterarse. Recién después lanzá la corrida real y exportá el resumen a un archivo. Ese archivo, junto con la ventana exacta de tiempo de la prueba, es la entrada del paso siguiente.

## 4:01–4:39 · Slide 12: Paso 5 de 6

Paso 5. Análisis con métricas del servidor.

Para el análisis, pasá el resumen junto con métricas del servidor de la misma ventana. Pedí hipótesis ordenadas, con la métrica que las respalda y cómo confirmarlas.

Para el análisis, pasale al modelo el resumen de la prueba junto con las métricas del servidor de la misma ventana: CPU, memoria, conexiones a la base, longitud de colas, uso de GPU si corresponde. Pedí hipótesis ordenadas por probabilidad, cada una con la métrica que la respalda y la forma de confirmarla. Ese formato lo obliga a citar datos en lugar de enumerar causas típicas. Una hipótesis que no nombra una métrica de tus datos se descarta sin más análisis.

## 4:40–5:14 · Slide 13: Paso 6 de 6

Paso 6. Verificar la primera hipótesis.

Verificá la hipótesis principal con una medición dirigida. Un cuello de botella no confirmado es una sospecha.

Tomá la hipótesis mejor ubicada y diseñá una medición dirigida para confirmarla o descartarla. Si dice que el cuello de botella es el pool de conexiones, repetí la prueba con el pool ampliado y mirá si la rodilla se mueve. Si no se mueve, la hipótesis era incorrecta y pasás a la siguiente. Hasta que una medición lo confirma, un cuello de botella es una sospecha. Reportarlo como hallazgo sin verificar hace que el equipo optimice algo que no era el problema.

## 5:15–5:56 · Slide 14: Ejemplo

Un ejemplo.

Un equipo le pide a un modelo un script para su API con la especificación, la mezcla de tráfico y los objetivos. La revisión con checklist encuentra dos problemas: no hay tiempo de espera entre acciones y el umbral de latencia es de quinientos milisegundos, cuando su objetivo era dos segundos. Corrigen ambos. La corrida en seco pasa. La corrida real muestra una rodilla en ciento veinte usuarios. Para el análisis entregan el resumen y las métricas del servidor. La primera hipótesis: el pool de conexiones a la base se agota, porque las conexiones activas llegan al máximo justo cuando sube la latencia. Amplían el pool, repiten, y la rodilla pasa a ciento ochenta. Hipótesis confirmada, con cifras ilustrativas.

## 5:57–6:14 · Slide 15: Errores comunes

Los errores más comunes.

Pedir el script sin especificación, mezcla de tráfico ni objetivos.

Correr el script generado sin revisarlo contra el checklist.

Pedir el análisis solo con el resumen de la herramienta de carga.

Reportar como cuello de botella una hipótesis sin verificar.

## 6:14–6:31 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El pedido incluye especificación, mezcla de tráfico y objetivos.

El script pasó el checklist de cinco preguntas.

Hubo una corrida en seco antes de la corrida real.

La primera hipótesis se confirmó o descartó con una medición.

## 6:32–6:41 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Sin métricas del servidor, diagnostica con seguridad causas genéricas. El análisis vale lo que valen los datos que le das.

## 6:42–6:54 · Slide 18: La guía escrita

Eso fue el día 27. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 28: Evals en CI: quality gates para features con IA.
