# Guion del video · Día 18: Cómo testear un modelo: accuracy, N corridas y rangos

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d18-es.mp4`
- Duración del video: 6:31
- Voz sin pausas: 5:40

## 0:00–0:16 · Slide 1: Video guía

Día 18 de la serie 31 días de QA + IA.

Cómo testear un modelo: accuracy, N corridas y rangos.

Cómo medir un modelo que toma decisiones (un agente que mapea nombres desordenados contra un catálogo maestro) con corridas repetidas, rangos y métricas por tipo de error.

## 0:17–0:33 · Slide 2: El problema

"¿Qué modelo es mejor para esto?" es una pregunta que casi siempre se responde con un ranking público o con la impresión de quien lo probó una tarde. Ninguna de las dos cosas dice cómo se va a comportar en tu tarea, con tus datos y tu prompt. Y cuando alguien lo mide, suele hacerlo con una sola corrida y reportar un solo número.

## 0:34–0:57 · Slide 3: Cómo encaja

Probar un modelo en serio se parece más a un experimento que a un test. Hay una tarea definida, un conjunto fijo, varias repeticiones y un resultado con su rango. Esta guía usa un caso de mapeo de registros para mostrar el método completo: qué medir además del accuracy, cómo distinguir una diferencia real del ruido y cómo decidir cuando el modelo más caro no es claramente el mejor. Las cifras que aparecen son ilustrativas.

## 0:58–1:07 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El golden dataset del día 17 (unos 100 casos de test).

Un eval harness con versión de modelo fija (días 8 y 15).

## 1:08–1:14 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:14–1:17 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:18–1:54 · Slide 7: Paso 1 de 6

Paso 1. Tarea y acciones definidas.

Definí la tarea y las acciones posibles con precisión. En este caso: mapear a un registro existente, aprobar como nuevo o mandar a revisión.

Escribí con precisión qué recibe el modelo y cuáles son las únicas salidas válidas. En el caso de ejemplo llega un registro nuevo y hay tres acciones posibles: mapearlo a uno existente, aprobarlo como nuevo o enviarlo a revisión humana. Definir las acciones como una lista cerrada vuelve medible la tarea. También obliga a decidir qué se espera en cada situación dudosa. Si la definición es vaga, vas a estar midiendo la interpretación del modelo y no su capacidad.

## 1:55–2:30 · Slide 8: Paso 2 de 6

Paso 2. Cinco corridas por configuración.

Corré cada configuración 5 veces sobre el mismo set de test. Una sola corrida no es una medición.

Corré cada configuración cinco veces sobre el mismo conjunto de test, sin cambiar nada entre corridas. El mismo modelo con la misma entrada puede moverse varios puntos de una corrida a otra. Si medís una sola vez, no sabés si viste su mejor día, el peor o uno típico. Cinco repeticiones es un compromiso razonable entre costo e información. Si los resultados quedan muy dispersos, esa dispersión ya es un hallazgo sobre la estabilidad del modelo en tu tarea.

## 2:31–3:05 · Slide 9: Paso 3 de 6

Paso 3. Media y rango.

Reportá media y rango (mínimo y máximo). Si dos configuraciones se pisan en el rango, la diferencia es ruido.

Reportá el promedio junto con el mínimo y el máximo de las cinco corridas. Después aplicá una regla simple: si los rangos de dos configuraciones se superponen, no podés afirmar que una sea mejor. Esa diferencia es compatible con el ruido. Muchas decisiones de cambiar de modelo o de prompt se toman sobre diferencias de uno o dos puntos que desaparecen al repetir la medición. Mostrar el rango en la tabla evita esa discusión antes de que empiece.

## 3:06–3:43 · Slide 10: Paso 4 de 6

Paso 4. Más allá del accuracy.

Mirá más allá del accuracy: precisión por acción y cantidad de errores caros por corrida. Mapear mal a un registro existente ensucia datos; mandar a revisión de más solo cuesta tiempo.

El accuracy trata todos los errores como iguales, y no lo son. En el ejemplo, mapear un registro a uno existente que no corresponde contamina los datos y es difícil de detectar después. Enviar de más a revisión solo cuesta tiempo de una persona. Por eso conviene mirar la precisión por acción y, sobre todo, contar los errores costosos por corrida. Un modelo con un poco menos de accuracy y la mitad de errores costosos puede ser la mejor elección.

## 3:44–4:15 · Slide 11: Paso 5 de 6

Paso 5. Mismas condiciones, calidad contra costo.

Compará modelos con el mismo prompt y dataset, calidad contra costo por llamada.

Para comparar modelos, mantené fijo todo lo demás: el mismo prompt, el mismo dataset, los mismos parámetros y el mismo juez si lo hay. Agregá a la tabla el costo por llamada y la latencia. La comparación útil no es qué modelo tiene el número más alto sino cuánta calidad adicional obtenés por cada unidad de costo. A veces esa calidad adicional existe, y a veces queda dentro del margen de ruido, pagando varias veces más.

## 4:16–4:49 · Slide 12: Paso 6 de 6

Paso 6. Decidir con la tabla completa.

Decidí con la tabla completa. El modelo más caro no siempre gana, y a veces gana por menos que el ruido.

La decisión sale de leer todas las columnas juntas: media, rango, errores costosos, costo y latencia. No siempre gana el más caro, y cuando gana puede hacerlo por menos que el ruido. Dejá la decisión escrita junto con la tabla y la ficha de corrida. Dentro de tres meses, cuando salga un modelo nuevo, vas a poder repetir exactamente el mismo experimento y comparar contra una referencia propia, en lugar de empezar la discusión de cero.

## 4:50–5:29 · Slide 13: Ejemplo

Un ejemplo.

Con cifras inventadas para ilustrar el método: un equipo compara tres configuraciones sobre cuarenta casos de test, cinco corridas cada una. El modelo chico promedia 71% con rango de 68 a 75 y seis errores costosos por corrida. El mediano, 84% con rango de 81 a 86 y dos errores costosos. El grande, 85% con rango de 82 a 88, también dos errores costosos y un costo cinco veces mayor que el mediano. Los rangos del mediano y del grande se superponen casi por completo, así que la diferencia de un punto no es evidencia. Eligen el mediano y documentan que el grande no justificó su costo en esta tarea.

## 5:30–5:45 · Slide 14: Errores comunes

Los errores más comunes.

Decidir con una sola corrida por modelo.

Reportar un promedio sin su rango.

Mirar solo accuracy cuando los errores tienen costos distintos.

Comparar modelos con prompts o datasets diferentes.

## 5:46–6:04 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

La tarea tiene una lista cerrada de acciones válidas.

Cada configuración corrió cinco veces sobre el mismo test.

La tabla muestra media, rango, errores costosos, costo y latencia.

La decisión quedó escrita junto a la tabla y la ficha de corrida.

## 6:04–6:16 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El mismo modelo con la misma entrada varía varios puntos entre corridas, y algunos modelos fallan directamente con contextos grandes. Un número suelto no describe a un modelo.

## 6:17–6:30 · Slide 17: La guía escrita

Eso fue el día 18. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 19: Costo como métrica de calidad: prefiltro top-K antes del modelo.
