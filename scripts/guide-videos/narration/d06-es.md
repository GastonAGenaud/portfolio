# Guion del video · Día 6: Datos de prueba sintéticos con LLM: realistas, válidos y sin PII

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d06-es.mp4`
- Duración del video: 6:31
- Voz sin pausas: 5:39

## 0:00–0:15 · Slide 1: Video guía

Día 6 de la serie 31 días de QA + IA.

Datos de prueba sintéticos con LLM: realistas, válidos y sin PII.

Un dataset de prueba que combina Faker para volumen y un LLM para casos borde, validado contra un schema y sin datos de producción.

## 0:16–0:36 · Slide 2: El problema

Los datos de prueba son uno de los cuellos de botella más viejos de QA. O usás una copia de producción, con todo el riesgo legal que implica, o usás datos tan prolijos que nunca disparan un bug: nombres sin acentos, direcciones perfectas, montos redondos. Los defectos reales aparecen con el apellido que tiene apóstrofo, el mail con subdominio o la nota que alguien completó con un emoji.

## 0:37–0:55 · Slide 3: Cómo encaja

Un LLM es bueno justamente para eso: producir variedad realista. Pero también produce filas inválidas con mucha seguridad. Esta guía combina tres piezas para quedarse con lo mejor de cada una: un schema que define qué es válido, Faker para el volumen y el modelo solo para los casos raros, con validación automática de cada fila.

## 0:56–1:02 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo qa-ai-lab.

Un modelo local con Ollama.

## 1:03–1:08 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:09–1:12 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:12–1:15 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:16–1:51 · Slide 8: Paso 1 de 6

Paso 1. El schema manda.

Definí el schema primero. Es la fuente de verdad de qué es un dato válido.

Escribí el schema antes de generar una sola fila. Es el contrato de tus datos: qué campos existen, de qué tipo son, qué rangos aceptan y cuáles son obligatorios. Con Zod o JSON Schema lo expresás una vez y lo usás en tres lugares: para validar lo que produce Faker, para validar lo que produce el modelo y como documentación para el equipo. Si el schema está flojo, por ejemplo acepta cualquier string como fecha, los datos inválidos pasan de largo y los vas a descubrir en un test que falla por la razón equivocada.

## 1:52–2:25 · Slide 9: Paso 2 de 6

Paso 2. Faker para el volumen.

Usá Faker con seed fija para el volumen: es rápido, gratis y reproducible.

Para las miles de filas "normales" no hace falta un modelo. Faker las genera en milisegundos, sin costo y sin red. Lo importante es fijar la semilla: con la misma semilla obtenés exactamente los mismos datos en tu máquina, en la de tu compañero y en CI. Eso convierte un fallo intermitente en uno reproducible. Elegí además el locale que corresponde a tus usuarios, porque cambia el formato de nombres, teléfonos y direcciones, y esos formatos son parte de lo que querés probar.

## 2:26–3:06 · Slide 10: Paso 3 de 6

Paso 3. El modelo para los casos raros.

Usá el LLM para lo que Faker no da: casos borde realistas (apellidos con apóstrofo, nombres con ñ y tildes, emails con subdominios, notas con emojis o comillas).

Pedile al modelo lo que una librería no sabe inventar: variantes creíbles que rompen supuestos. Sé específico en el pedido. En lugar de "generá datos raros", listá las categorías que te interesan: apellidos compuestos y con apóstrofo, nombres de una sola letra, mails con subdominios y signos más, textos libres con comillas, saltos de línea o emojis, fechas en el límite de un rango. Pedí pocas filas por categoría. Diez casos bien pensados valen más que quinientos parecidos, y son más baratos de revisar.

## 3:07–3:43 · Slide 11: Paso 4 de 6

Paso 4. Validación fila por fila.

Pedile al modelo salida en JSON y validá cada fila contra el schema. Lo que no valida se descarta y se cuenta.

Pedí la salida en JSON y pasá cada fila por el schema antes de aceptarla. Lo que no valida se descarta y se cuenta. Ese contador es una métrica útil: si el modelo falla una de cada cuatro filas, el prompt necesita un ejemplo de formato o el schema tiene una regla que no explicaste. No corrijas a mano las filas inválidas, porque rompe la reproducibilidad. Tampoco confíes en una revisión visual: una fecha como 2026-02-30 se ve perfecta y no existe.

## 3:43–4:19 · Slide 12: Paso 5 de 6

Paso 5. Producción no entra al prompt.

Nunca pegues datos de producción en el prompt. Describí la forma del dato, no el dato.

La regla es simple y no tiene excepciones: en el prompt va la forma de los datos, nunca los datos. Describí campos, formatos y rarezas que querés ver, sin pegar registros reales ni siquiera "anonimizados a mano", porque esa anonimización casi siempre deja algo identificable. Si necesitás que los datos sintéticos se parezcan estadísticamente a los reales, describí las distribuciones con palabras. Y verificá el resultado: revisá que no aparezcan nombres o documentos que coincidan con personas reales de tu base.

## 4:20–4:55 · Slide 13: Paso 6 de 6

Paso 6. Semilla, prompt y dataset versionados.

Versioná en data/ el seed, el prompt y el dataset final. Un dataset que no se puede regenerar es deuda.

Guardá en data/ las tres cosas que permiten regenerar el conjunto: la semilla de Faker, el prompt usado con el modelo y el archivo final ya validado. La parte generada por el modelo no es reproducible bit a bit, por eso se versiona el resultado y no solo la receta. Anotá también el modelo y la fecha. Cuando un test falle dentro de seis meses, vas a poder saber con qué datos corrió, y si hay que ampliar el conjunto vas a partir de algo conocido.

## 4:56–5:29 · Slide 14: Ejemplo

Un ejemplo.

Un equipo prueba un formulario de alta de clientes. Con Faker y semilla fija generan mil clientes válidos en menos de un segundo. Después le piden al modelo veinte casos raros en cinco categorías. De las veinte filas, el schema rechaza cuatro: dos fechas de nacimiento imposibles, un teléfono con letras y un mail sin dominio. Quedan dieciséis. Al correr la suite con esos dieciséis, dos tests fallan: el apellido O'Connor rompe una consulta mal escapada y un nombre con emoji se guarda truncado. Ninguno de los mil registros prolijos había encontrado esos dos defectos.

## 5:29–5:47 · Slide 15: Errores comunes

Los errores más comunes.

Generar todo con el modelo, incluso el volumen que Faker resuelve gratis.

Aceptar las filas por cómo se ven, sin validarlas contra el schema.

Pegar un registro real "como ejemplo de formato".

No guardar el dataset final y no poder repetir una corrida.

## 5:47–6:05 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El schema rechaza fechas, mails y rangos inválidos.

Faker corre con semilla fija y da el mismo resultado dos veces.

Cada fila del modelo pasó por el schema y hay un conteo de descartes.

Semilla, prompt, modelo, fecha y dataset están en data/.

## 6:06–6:16 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Devuelve JSON que parece válido y no lo es (fechas, formatos). Sin validación automática, esos errores llegan a tus tests.

## 6:17–6:29 · Slide 18: La guía escrita

Eso fue el día 6. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 7: Arneses 101: test harness, eval harness y agent harness.
