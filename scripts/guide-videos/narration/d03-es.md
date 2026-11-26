# Guion del video · Día 3: Las nuevas formas de probar: de asserts a evals

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d03-es.mp4`
- Duración del video: 6:02
- Voz sin pausas: 5:12

## 0:00–0:12 · Slide 1: Video guía

Día 3 de la serie 31 días de QA + IA.

Las nuevas formas de probar: de asserts a evals.

Cómo convertir un test con assert exacto sobre una salida de IA en un eval de tres capas que no sea frágil.

## 0:13–0:31 · Slide 2: El problema

Cuando una funcionalidad incluye un modelo, el test clásico deja de servir tal como está. Un assert que compara contra un texto exacto falla aunque la respuesta sea correcta, porque el modelo la redacta distinto cada vez. La reacción habitual es marcar el test como flaky, agregarle reintentos y seguir. Eso tapa el problema: el test dejó de medir.

## 0:32–0:49 · Slide 3: Cómo encaja

La salida no es abandonar la automatización sino cambiar la pregunta. En lugar de "¿es igual a esto?", preguntamos "¿cumple estos criterios, la mayoría de las veces?". Eso es un eval. Esta guía muestra cómo armarlo en tres capas, de la más barata y determinista a la más cara, y cómo decidir un umbral.

## 0:50–1:01 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Node.js 22 o superior.

Un test tuyo que compare texto exacto.

Opcional: Ollama con un modelo local.

## 1:01–1:07 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:08–1:44 · Slide 6: Paso 1 de 6

Paso 1. Assert contra eval.

Entendé la diferencia: un assert compara contra un valor exacto; un eval mide si la salida cumple criterios, varias veces, y da un porcentaje.

Un assert tiene una entrada, una salida esperada y un resultado binario. Un eval tiene un conjunto de entradas, criterios en lugar de una salida única, varias corridas por entrada y un resultado en porcentaje que se compara contra un umbral. Cambia también cómo se lee un fallo: en un assert, rojo significa bug; en un eval, una corrida mala puede ser ruido y cinco seguidas son una regresión. Por eso hace falta registrar la tasa de aprobación en el tiempo y no solo el último resultado.

## 1:45–2:18 · Slide 7: Paso 2 de 6

Paso 2. Capa uno: formato.

Capa 1, formato: validá estructura con checks deterministas (es JSON válido, tiene los campos, respeta el largo).

Es la capa más barata y la que más atrapa. Verificá que la salida sea JSON válido, que tenga los campos obligatorios con el tipo correcto, que respete largos máximos y que no traiga texto fuera de la estructura. Todo eso se resuelve con un schema y sin llamar a ningún modelo. Si esta capa falla, no tiene sentido evaluar las siguientes: una respuesta que tu aplicación no puede parsear ya es un defecto, diga lo que diga.

## 2:19–2:52 · Slide 8: Paso 3 de 6

Paso 3. Capa dos: contenido.

Capa 2, contenido: verificá hechos clave con contains o regex, sin exigir la frase exacta.

Acá verificás hechos, no redacción. Si la respuesta tiene que mencionar un monto, una fecha y un estado, buscá esos tres datos con contains o con una expresión regular. También sirve verificar lo contrario: que no aparezca información que no debería estar, como un dato de otro cliente o un paso inexistente. Esta capa sigue siendo determinista y barata. La regla práctica es que todo dato duro se valida acá, nunca con la opinión de otro modelo.

## 2:53–3:26 · Slide 9: Paso 4 de 6

Paso 4. Capa tres: criterio.

Capa 3, criterio: usá una rúbrica evaluada por otro modelo para lo que no se puede expresar con reglas (tono, completitud).

Queda lo que no se puede expresar con reglas: si el tono es el adecuado, si la explicación está completa, si la respuesta realmente contesta lo que se preguntó. Para eso se usa una rúbrica que evalúa otro modelo, con criterios observables y resultado pasa o falla. Es la capa más cara y la menos confiable, así que conviene mantenerla chica. El día dieciséis muestra cómo calibrar ese juez contra tu propio criterio antes de creerle.

## 3:26–3:57 · Slide 10: Paso 5 de 6

Paso 5. Corridas y umbral.

Corré N veces y fijá un umbral: por ejemplo, pasa si 9 de 10 corridas cumplen las tres capas.

Corré cada caso varias veces: tres para trabajo diario, cinco o diez cuando vas a tomar una decisión. El umbral depende del riesgo. Para una capa de formato conviene exigir cien por ciento, porque un JSON roto rompe la aplicación. Para criterio, un noventa por ciento puede ser razonable. Lo importante es fijar el número antes de mirar los resultados y escribir por qué, para no acomodarlo después a lo que dio.

## 3:58–4:30 · Slide 11: Paso 6 de 6

Paso 6. El lugar en la pirámide.

Ubicalo en tu pirámide: unit y contract siguen siendo deterministas; los evals son una capa más para todo lo que toca un modelo.

Los evals no reemplazan nada de lo que ya tenés. Los tests unitarios y de contrato siguen siendo deterministas y siguen corriendo en cada commit. Los evals son una capa adicional que cubre solo lo que toca un modelo, y suelen correr con otra frecuencia porque cuestan más. Un error común es intentar cubrir con evals lógica que no depende del modelo: eso se prueba mejor, más rápido y más barato con un test clásico.

## 4:30–5:04 · Slide 12: Ejemplo

Un ejemplo.

Un equipo tiene un test que compara el resumen de un pedido contra un texto fijo y falla una de cada tres corridas. Lo reescriben así. Capa uno: la salida es JSON con los campos resumen y estado, y el resumen no supera las 280 letras. Capa dos: el resumen contiene el número de pedido y el monto total. Capa tres: una rúbrica verifica que no agregue pasos que el pedido no tiene. Lo corren diez veces. La capa uno pasa diez de diez, la dos también, la tres nueve de diez. Con umbral de noventa por ciento, pasa, y la corrida fallida queda guardada para revisar.

## 5:05–5:20 · Slide 13: Errores comunes

Los errores más comunes.

Tapar un assert exacto con reintentos en lugar de cambiar lo que se mide.

Usar un modelo juez para validar datos duros como montos o fechas.

Fijar el umbral después de ver los resultados.

Sacar conclusiones de una sola corrida.

## 5:21–5:37 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

El test original quedó reescrito en tres capas separadas.

Formato y contenido se validan sin llamar a un modelo.

Hay un umbral escrito con su justificación.

Guardaste y revisaste al menos una corrida fallida.

## 5:38–5:47 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El modelo juez aprobó una respuesta con un dato incorrecto. Los hechos se validan con reglas, no con otro modelo.

## 5:47–6:00 · Slide 16: La guía escrita

Eso fue el día 3. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 4: Tu laboratorio de QA con IA: setup completo en 30 minutos.
