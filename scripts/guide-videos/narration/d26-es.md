# Guion del video · Día 26: Performance (2): prueba de carga a un endpoint LLM con k6

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d26-es.mp4`
- Duración del video: 6:51
- Voz sin pausas: 5:56

## 0:00–0:15 · Slide 1: Video guía

Día 26 de la serie 31 días de QA + IA.

Performance (2): prueba de carga a un endpoint LLM con k6.

Una prueba de carga escalonada contra un endpoint LLM, con métricas de tokens y goodput, para encontrar el punto donde el sistema deja de escalar.

## 0:16–0:31 · Slide 2: El problema

Con la línea de base y los objetivos de ayer ya podés hacer la pregunta que le importa a quien opera el sistema: cuántos usuarios soporta antes de que la experiencia se degrade. La respuesta es una curva con un punto de quiebre, y encontrarlo requiere cargar de forma gradual y mirar las métricas correctas.

## 0:32–0:53 · Slide 3: Cómo encaja

k6 sirve bien para esto. Los scripts son código, corren en local y en CI, y los umbrales convierten la prueba en un criterio de pasa o falla. Pero una prueba de carga contra un modelo tiene trampas propias: el caché que maquilla los resultados, los límites de cuota del proveedor que parecen saturación y los timeouts por defecto que cortan respuestas largas. Esta guía arma la prueba evitando esas tres.

## 0:54–1:15 · Slide 4: Requisitos

Para seguir esta guía necesitás:

k6 instalado.

Un endpoint compatible con OpenAI y los objetivos del día 25.

Presupuesto aprobado si la API es paga: limitá max_tokens, duración y usuarios.

k6 no mide streaming de forma nativa: para TTFT bajo carga hace falta una extensión de SSE o una herramienta específica para LLM.

## 1:16–1:21 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:22–1:24 · Slide 6: Setup

El mismo archivo sigue acá.

## 1:25–1:27 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:28–2:04 · Slide 8: Paso 1 de 6

Paso 1. Umbrales desde los objetivos.

Partí de la línea base del día 25 y de objetivos escritos. Los thresholds del script salen de ahí.

Los umbrales del script son los objetivos que escribiste ayer, traducidos a código: el percentil noventa y cinco del tiempo al primer token, el de la latencia total y la tasa máxima de errores. No los inventes al escribir el script ni aceptes los que traiga un ejemplo. Un umbral sin origen es decoración: nadie sabe qué significa que falle. Con los objetivos del producto como umbrales, un resultado en rojo quiere decir que los usuarios van a tener una experiencia peor que la acordada.

## 2:04–2:40 · Slide 9: Paso 2 de 6

Paso 2. Una mezcla de prompts realista.

Usá una mezcla de prompts parecida a la real. Con un solo prompt repetido, el caché te da números que producción no va a ver.

Cargá los prompts desde un archivo con la mezcla del perfil de carga: tipos y proporciones. Si repetís un único prompt, pasan dos cosas. El caché del proveedor o de tu propia aplicación responde mucho más rápido que en uso real, y los números salen mejores de lo que producción va a ver. Además, todas las respuestas tienen el mismo largo, y perdés la variabilidad que estresa al sistema. Usá suficientes prompts distintos como para que no se repitan durante la prueba.

## 2:41–3:15 · Slide 10: Paso 3 de 6

Paso 3. Carga por etapas.

Cargá por etapas: subís, sostenés, subís de nuevo. Las mesetas son donde se lee el comportamiento.

Subí la carga en escalones: rampa hasta un nivel, mantenelo unos minutos, rampa hasta el siguiente. Las mesetas son donde se lee el comportamiento, porque el sistema tuvo tiempo de estabilizarse. Durante las rampas, los números mezclan dos estados. Mantené cada meseta el tiempo suficiente como para completar varias veces la request más larga del perfil. Si una respuesta larga tarda cuarenta segundos, una meseta de un minuto apenas alcanza a mostrar una ronda.

## 3:16–3:52 · Slide 11: Paso 4 de 6

Paso 4. Encontrar la rodilla.

Buscá la rodilla: el punto donde los tokens por segundo totales dejan de crecer y la latencia empieza a subir. Esa es tu capacidad.

Graficá para cada meseta los tokens totales por segundo y la latencia. Al principio, más usuarios producen más tokens por segundo con una latencia estable. En algún punto, los tokens por segundo dejan de crecer y la latencia empieza a subir. Esa es la rodilla, y marca la capacidad real del sistema. Más allá de ese punto, cada usuario adicional solo hace esperar más a los demás. Tu capacidad utilizable queda un poco por debajo, con margen para picos.

## 3:53–4:31 · Slide 12: Paso 5 de 6

Paso 5. Separar los errores.

Separá los errores: 429 es límite de cuota del proveedor; 5xx y timeouts son saturación. Se arreglan distinto.

No todos los errores significan lo mismo. Un 429 es el límite de cuota del proveedor: llegaste al máximo de requests o de tokens por minuto que tu cuenta permite, y se resuelve pidiendo más cuota o agregando una cola con reintentos. Un 5xx o un timeout es saturación, de tu infraestructura o de la del proveedor, y se resuelve con capacidad o reduciendo el trabajo por request. Contalos por separado en el script. Mezclados en una sola tasa de error, llevan a la solución equivocada.

## 4:32–5:07 · Slide 13: Paso 6 de 6

Paso 6. Umbrales como criterio y ejecución programada.

Dejá los thresholds como criterio de pasa o falla y corré la prueba de forma programada, no en cada PR.

Dejá los umbrales como criterio automático de pasa o falla, así la prueba puede correr sin que alguien interprete gráficos cada vez. Programala de forma periódica o antes de cada release, no en cada pull request: es lenta, cuesta dinero si usás una API paga y necesita un entorno estable para ser comparable. Guardá el resumen de cada corrida. La tendencia de la rodilla a lo largo del tiempo te avisa de una degradación antes de que se convierta en un incidente.

## 5:07–5:47 · Slide 14: Ejemplo

Un ejemplo.

Con cifras ilustrativas: un equipo carga su asistente en mesetas de cinco, diez, veinte y cuarenta usuarios, tres minutos cada una, con cincuenta prompts distintos. Hasta veinte usuarios, los tokens por segundo crecen de forma casi proporcional y el percentil noventa y cinco de latencia se mantiene en nueve segundos. Con cuarenta, los tokens por segundo quedan iguales que con veinte y la latencia sube a veintidós segundos. La rodilla está alrededor de veinte. En la última meseta aparecen errores. Al separarlos, casi todos son 429. No es saturación del modelo sino el límite de cuota de la cuenta. La acción correcta es gestionar la cuota y sumar una cola, no agregar servidores.

## 5:48–6:05 · Slide 15: Errores comunes

Los errores más comunes.

Repetir un solo prompt y medir el caché en lugar del sistema.

Subir la carga en una sola rampa sin mesetas.

Sumar los 429 y los 5xx en una única tasa de error.

Dejar el timeout por defecto y cortar las respuestas largas.

## 6:06–6:24 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

Los umbrales del script coinciden con los objetivos escritos.

Los prompts salen de un archivo con la mezcla del perfil.

La prueba tiene mesetas y ubicaste la rodilla.

Los errores 429 se cuentan aparte de 5xx y timeouts.

## 6:25–6:35 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Los scripts generados suelen venir sin timeout, sin mezcla de prompts y con thresholds inventados. Se revisan contra tus objetivos antes de correr.

## 6:36–6:49 · Slide 18: La guía escrita

Eso fue el día 26. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 27: Performance (3): IA generando y analizando pruebas de carga.
