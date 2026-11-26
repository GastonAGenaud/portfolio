# Guion del video · Día 5: Casos de prueba desde user stories: el prompt que sí funciona

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d05-es.mp4`
- Duración del video: 6:08
- Voz sin pausas: 5:17

## 0:00–0:13 · Slide 1: Video guía

Día 5 de la serie 31 días de QA + IA.

Casos de prueba desde user stories: el prompt que sí funciona.

Una plantilla de prompt versionada que genera casos por técnica de diseño y te dice qué no cubrió.

## 0:14–0:30 · Slide 2: El problema

Pedirle a un modelo "generame casos de prueba para esta historia" devuelve siempre lo mismo: una lista larga, pareja, con casos repetidos y dos o tres reglas que nadie definió. No es un problema de capacidad del modelo. Es que el pedido no le dice contra qué reglas trabajar, qué técnica usar ni cuándo detenerse.

## 0:31–0:47 · Slide 3: Cómo encaja

Esta guía reemplaza ese pedido por un flujo de tres pasos que imita cómo trabaja un buen analista: primero pregunta, después diseña con técnica y al final declara qué dejó afuera. El resultado no es una lista más larga sino una más corta y defendible, donde cada caso tiene un motivo y vos sabés qué huecos quedan.

## 0:48–1:00 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo qa-ai-lab del día 4.

Una user story con criterios de aceptación.

Las reglas de negocio escritas, aunque sean cinco líneas.

## 1:00–1:06 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:07–1:40 · Slide 6: Paso 1 de 6

Paso 1. Reglas de negocio como fuente de verdad.

Escribí las reglas de negocio primero. Son la fuente de verdad; sin eso el modelo las inventa.

Antes de abrir el chat, escribí las reglas que gobiernan la funcionalidad, aunque sean cinco líneas: límites, estados posibles, quién puede hacer qué. Si no existen por escrito, ese es tu primer hallazgo y vale más que cualquier caso. En el prompt, decí de forma explícita que esas reglas son la única fuente de verdad y que no debe inventar otras. Sin esa frase el modelo completa los huecos con lo que es habitual en otros sistemas, no en el tuyo.

## 1:41–2:13 · Slide 7: Paso 2 de 6

Paso 2. La plantilla en el repo.

Guardá la plantilla en prompts/test-design.md. Funciona igual si la traducís al español.

Guardá el prompt como archivo con variables para las reglas y la historia. Tenerlo versionado permite mejorarlo de a poco: cada vez que el resultado falla de una forma nueva, agregás una instrucción y queda para todo el equipo. También vuelve comparable el trabajo entre personas, porque todos parten del mismo pedido. Funciona igual en español; lo que importa es que las tres etapas estén separadas y que la primera termine con una orden de esperar.

## 2:14–2:48 · Slide 8: Paso 3 de 6

Paso 3. Paso uno: preguntas.

Paso 1: pedí solo ambigüedades y preguntas. Respondelas vos o el PO antes de seguir.

Esta etapa es la que más valor entrega y la que casi todos saltean. Pedí ambigüedades, contradicciones entre criterios y datos faltantes, y nada más. Llevá las preguntas reales al product owner antes de seguir. Cada ambigüedad resuelta acá es un defecto que no llega a escribirse. Si el modelo no encuentra ninguna pregunta en una historia que vos sabés incompleta, es una señal de que le falta contexto y de que los casos que genere después van a ser superficiales.

## 2:48–3:21 · Slide 9: Paso 4 de 6

Paso 4. Paso dos: casos por técnica.

Paso 2: pedí casos por técnica (particiones, bordes, tabla de decisión, estados de error) en tabla con riesgo.

Con las respuestas en mano, pedí casos nombrando las técnicas: particiones de equivalencia, valores de borde, tabla de decisión y estados de error. Exigí una tabla con la técnica de cada caso. Eso te permite ver de un vistazo si falta alguna: una tabla sin bordes o sin estados de error está incompleta. También reduce los duplicados, porque dos casos de la misma partición saltan a la vista cuando están etiquetados.

## 3:21–3:55 · Slide 10: Paso 5 de 6

Paso 5. Paso tres: lo que no cubrió.

Paso 3: pedí la lista de lo no cubierto. Es la parte más útil para tu revisión.

Pedí una lista de lo que quedó afuera y por qué. Suelen aparecer concurrencia, accesibilidad, performance, permisos y migración de datos existentes. No es un defecto del resultado: es información para decidir. Algunas cosas las vas a cubrir con otro tipo de prueba y otras las vas a aceptar como riesgo, pero la decisión queda explícita. Esta lista es además el mejor insumo para la conversación con el equipo sobre qué se prueba y qué no.

## 3:56–4:34 · Slide 11: Paso 6 de 6

Paso 6. La revisión con tres preguntas.

Revisá con tres preguntas: ¿hay casos duplicados?, ¿alguna regla inventada?, ¿faltan negativos? Lo que sobreviva va al gestor de casos.

Revisá la tabla buscando tres cosas. Duplicados: casos que ejercitan la misma partición con otro valor. Reglas inventadas: cualquier resultado esperado que no puedas rastrear a una regla escrita. Negativos faltantes: entradas inválidas, permisos insuficientes, estados imposibles. Es normal descartar un tercio. La prioridad también la ponés vos, porque el modelo tiende a marcar todo como riesgo alto. Lo que sobrevive pasa a tu gestor de casos con tu nombre.

## 4:35–5:10 · Slide 12: Ejemplo

Un ejemplo.

La historia dice: "como cliente quiero transferir dinero a otra cuenta". Las reglas escritas son cuatro: monto mínimo, tope diario, cuenta destino activa y saldo suficiente. En el paso uno el modelo pregunta qué pasa si el tope diario se alcanza a mitad de una transferencia programada y si el tope es por cliente o por cuenta; nadie lo había definido. En el paso dos devuelve veintidós casos etiquetados. En la revisión se descartan cinco duplicados de la partición "monto válido" y dos que asumían una comisión inexistente. Quedan quince. El paso tres declara que no cubrió concurrencia entre dos sesiones, y el equipo decide probarlo aparte.

## 5:11–5:27 · Slide 13: Errores comunes

Los errores más comunes.

Pedir casos sin pasar las reglas de negocio.

Juntar los tres pasos en un solo pedido y perder la etapa de preguntas.

Cargar los casos al gestor sin revisar duplicados ni reglas inventadas.

Aceptar la prioridad que asigna el modelo.

## 5:28–5:44 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

La plantilla está versionada en prompts/.

Al menos una ambigüedad real llegó al product owner.

Cada caso final tiene técnica y se rastrea a una regla escrita.

Hay una lista de descartes con el motivo de cada uno.

## 5:45–5:53 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Asigna riesgo alto a casi todo. Priorizar es una decisión de negocio, no de redacción.

## 5:53–6:07 · Slide 16: La guía escrita

Eso fue el día 5. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 6: Datos de prueba sintéticos con LLM: realistas, válidos y sin PII.
