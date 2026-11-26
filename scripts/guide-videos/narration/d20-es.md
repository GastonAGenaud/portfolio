# Guion del video · Día 20: Regresión de prompts: versionar, comparar y no romper lo que andaba

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d20-es.mp4`
- Duración del video: 6:18
- Voz sin pausas: 5:25

## 0:00–0:15 · Slide 1: Video guía

Día 20 de la serie 31 días de QA + IA.

Regresión de prompts: versionar, comparar y no romper lo que andaba.

Tratar cada cambio de prompt como un cambio de código: versión, comparación lado a lado y un set de regresión que decide el merge.

## 0:15–0:36 · Slide 2: El problema

Un prompt en producción es código que se modifica seguido y casi nunca se prueba. Alguien encuentra un caso que falla, agrega una frase para arreglarlo, lo prueba con ese mismo caso, ve que funciona y lo publica. Una semana después aparecen tres casos que antes andaban y ahora no. Nadie conecta una cosa con la otra, porque no hay registro de qué cambió ni de cómo estaba antes.

## 0:36–0:55 · Slide 3: Cómo encaja

Es un problema clásico de regresión, y se resuelve con las herramientas clásicas adaptadas: versiones, cambios chicos, comparación lado a lado y un conjunto de regresión que crece. Esta guía arma ese flujo y agrega dos cuidados propios de los modelos: mirar los errores por tipo y vigilar que los ejemplos del prompt no se filtren desde el conjunto de test.

## 0:56–1:05 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un golden dataset con test y regression (día 17).

Dos versiones del prompt en archivos separados.

## 1:06–1:11 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:12–1:14 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:15–1:18 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:19–1:53 · Slide 8: Paso 1 de 6

Paso 1. Una versión, un archivo, una línea de changelog.

Cada versión del prompt es un archivo, con una línea de changelog que diga qué regla cambió y por qué.

Cada versión del prompt es un archivo propio con su número, y cada una tiene una línea en el changelog que dice qué regla cambió y por qué. No sobrescribas el archivo anterior, porque lo vas a necesitar para comparar. El porqué importa tanto como el qué. "Se agregó regla para quejas de rendimiento" no alcanza. Sumale qué caso la motivó. Dentro de unos meses, alguien va a querer quitar esa regla, y sin el motivo no va a saber qué puede romper.

## 1:54–2:27 · Slide 9: Paso 2 de 6

Paso 2. Un cambio por versión.

Un cambio por versión. Si cambiás tres cosas juntas, no sabés cuál movió el resultado.

Si en una misma versión reescribís una regla, agregás un ejemplo y cambiás el formato de salida, y el resultado se mueve, no sabés cuál de las tres cosas lo movió. Puede incluso que una haya mejorado y otra empeorado, y veas un empate. Un cambio por versión hace que cada medición tenga una sola explicación posible. Parece más lento. En la práctica es más rápido, porque no perdés tiempo desarmando cambios mezclados para encontrar el que causó el problema.

## 2:28–2:59 · Slide 10: Paso 3 de 6

Paso 3. Lado a lado, cinco veces.

Corré las dos versiones lado a lado sobre el set de test, 5 veces, y sobre el de regresión.

Configurá el eval con las dos versiones como prompts del mismo archivo, de modo que corran sobre los mismos casos. Usá el conjunto de test y también el de regresión, con cinco repeticiones. El visor muestra las dos columnas y permite filtrar los casos donde una versión pasa y la otra no. Esos casos son los que hay que leer. Ahí aparece lo que arreglaste, lo que rompiste y lo que cambió de respuesta sin cambiar de veredicto.

## 3:00–3:33 · Slide 11: Paso 4 de 6

Paso 4. Movimiento por tipo de error.

Mirá el movimiento por tipo de error, no solo el total. Arreglar un tipo suele subir otro.

El total puede quedar igual mientras por debajo cambia todo. Clasificá los fallos por tipo y compará la cantidad de cada tipo entre versiones. Es habitual que una regla nueva arregle una categoría y empeore otra. Una instrucción que vuelve al modelo más cauto con las quejas, por ejemplo, puede hacer que marque de menos los bloqueos reales. Si solo mirás el porcentaje global, ese intercambio queda oculto, y lo vas a descubrir en producción.

## 3:34–4:04 · Slide 12: Paso 5 de 6

Paso 5. Fugas entre prompt y test.

Controlá fugas: los ejemplos que ponés en el prompt no pueden ser casos del set de test.

Los ejemplos que ponés en el prompt no pueden ser casos del conjunto de test, ni casi iguales. Si lo son, el modelo ve la respuesta antes de la pregunta y la métrica sube sin que haya mejorado nada. Es una fuga fácil de cometer: el caso que falla es justo el que uno quiere usar de ejemplo. Sacá los ejemplos del conjunto de dev o escribilos desde cero, y verificá con una búsqueda de texto que ninguno aparezca en test.

## 4:05–4:40 · Slide 13: Paso 6 de 6

Paso 6. La regla de merge.

Regla de merge: test mejora por encima del ruido y regresión no baja. Después, los casos recién arreglados entran al set de regresión.

Definí por adelantado cuándo una versión nueva reemplaza a la anterior: el conjunto de test mejora por encima del ruido, es decir sin superposición de rangos, y el de regresión no baja. Si cumple, se mergea. Después, los casos recién arreglados pasan al conjunto de regresión. Así cada problema resuelto queda protegido para siempre. Si no cumple, la versión se descarta o se sigue trabajando, pero no se publica "porque parece mejor".

## 4:41–5:19 · Slide 14: Ejemplo

Un ejemplo.

Un clasificador de tickets marca como bloqueante cualquier queja de lentitud. El equipo crea la versión siete con una sola regla nueva: las quejas de rendimiento sin un flujo bloqueado son de severidad media. La corren contra la versión seis, cinco veces. En test, el promedio sube de 82 a 88 sin superposición de rangos. En regresión, baja un caso: un ticket que decía "tarda tanto que no puedo pagar" ahora sale como medio. Es un bloqueo real. Ajustan la redacción de la regla en una versión ocho, vuelven a correr, y regresión queda completa. Mergean la ocho y suman cuatro casos nuevos al conjunto de regresión. Las cifras son ilustrativas.

## 5:20–5:35 · Slide 15: Errores comunes

Los errores más comunes.

Sobrescribir el prompt sin conservar la versión anterior.

Meter varios cambios en una misma versión.

Probar el cambio solo con el caso que lo motivó.

Usar casos del conjunto de test como ejemplos del prompt.

## 5:36–5:54 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

Cada versión del prompt es un archivo con su línea de changelog.

La versión nueva tiene un solo cambio respecto de la anterior.

Las dos versiones corrieron lado a lado en test y en regresión.

Los casos arreglados se sumaron al conjunto de regresión.

## 5:55–6:03 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El cumplimiento de una regla del prompt es probabilístico. Hay que medir en qué porcentaje de corridas se respeta.

## 6:04–6:17 · Slide 18: La guía escrita

Eso fue el día 20. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 21: Testing de RAG: retrieval, fidelidad y respuesta por separado.
