# Guion del video · Día 16: LLM como juez: rúbricas y calibración contra humanos

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d16-es.mp4`
- Duración del video: 6:14
- Voz sin pausas: 5:22

## 0:00–0:14 · Slide 1: Video guía

Día 16 de la serie 31 días de QA + IA.

LLM como juez: rúbricas y calibración contra humanos.

Cómo escribir una rúbrica observable para un modelo juez y medir cuánto coincide con tu criterio antes de confiar en él.

## 0:15–0:31 · Slide 2: El problema

Hay cualidades de una respuesta que ninguna regla captura: si la explicación es clara, si el tono corresponde, si contesta lo que se preguntó. Revisarlas a mano no escala más allá de unas decenas de casos. La solución habitual es pedirle a otro modelo que las califique, lo que se conoce como LLM como juez.

## 0:32–0:53 · Slide 3: Cómo encaja

El problema es que ese juez es otro sistema no determinista con sus propios errores, y sus veredictos vienen acompañados de justificaciones muy convincentes. Usarlo sin calibrar equivale a medir con un instrumento que nunca comparaste contra un patrón. Esta guía muestra cómo escribir una rúbrica que se pueda verificar, cómo medir el acuerdo entre el juez y vos, y cuándo ese acuerdo alcanza para confiarle un gate.

## 0:54–1:07 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un eval harness con juez configurado (días 8 y 15).

30 salidas reales del modelo evaluado.

Una planilla con columnas: id, veredicto humano, veredicto del juez, motivo.

## 1:08–1:13 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:14–1:49 · Slide 6: Paso 1 de 6

Paso 1. Criterios observables.

Escribí criterios observables. "¿Es buena la respuesta?" no sirve. "Menciona el componente del reporte" sí.

Una rúbrica funciona cuando dos personas que la leen llegan al mismo veredicto sobre la misma respuesta. "¿Es buena la respuesta?" no cumple. "Menciona el componente que figura en el reporte" sí, porque se puede comprobar mirando el texto. Escribí pocos criterios, cada uno verificable, y definí el resultado como pasa o falla con todos los criterios cumplidos. Evitá las escalas del uno al cinco: nadie sabe qué separa un tres de un cuatro, y el juez tampoco.

## 1:50–2:24 · Slide 7: Paso 2 de 6

Paso 2. Treinta etiquetas tuyas, primero.

Etiquetá vos 30 salidas a mano, pasa o falla, con el motivo. Hacelo antes de mirar lo que dice el juez.

Tomá treinta salidas reales del sistema y etiquetalas a mano, pasa o falla, anotando el motivo en una línea. Hacelo antes de correr el juez y sin mirar lo que diría. Si ves primero su veredicto, tu etiqueta se contamina y el acuerdo que midas después va a salir inflado. Treinta casos son un piso razonable para empezar. Buscá que haya aprobados y rechazados en proporciones parecidas: con casi todos aprobados no vas a saber si el juez detecta los malos.

## 2:25–2:54 · Slide 8: Paso 3 de 6

Paso 3. Correr el juez sobre los mismos casos.

Corré el juez sobre las mismas 30.

Ejecutá el juez con la rúbrica sobre esas mismas treinta salidas, con la configuración estable que definiste ayer. Guardá el veredicto y la justificación de cada caso. Si podés, corré dos o tres veces para ver si el juez es consistente consigo mismo. Un juez que cambia de veredicto sobre la misma entrada entre corridas tiene un problema anterior al acuerdo con vos: la rúbrica deja demasiado margen o la configuración no es estable.

## 2:55–3:31 · Slide 9: Paso 4 de 6

Paso 4. Acuerdo y dirección.

Calculá la coincidencia: casos donde coinciden dividido el total. Y mirá el sentido del desacuerdo: ¿el juez es más blando o más duro que vos?

El cálculo es simple: casos donde coinciden dividido por el total. Pero el número solo no alcanza. Mirá la dirección del desacuerdo. Si el juez aprueba casos que vos rechazaste, es indulgente y tu gate va a dejar pasar defectos. Si rechaza casos que vos aprobaste, es estricto y va a bloquear trabajo válido. Son riesgos distintos y se corrigen distinto. Armá la tabla de dos por dos, vos contra el juez, y leé las dos celdas de desacuerdo por separado.

## 3:32–4:06 · Slide 10: Paso 5 de 6

Paso 5. Corregir la rúbrica.

Arreglá la rúbrica donde no coinciden: un criterio más preciso o un ejemplo de pasa y uno de falla.

Leé cada desacuerdo y preguntate quién tiene razón. A veces es el juez, y corregís tu etiqueta. Lo más frecuente es que el criterio fuera ambiguo. Hay dos arreglos que funcionan: reescribir el criterio para que sea más preciso, o agregar a la rúbrica un ejemplo que pasa y uno que falla. No agregues diez ejemplos, porque el juez empieza a copiar los ejemplos en lugar de aplicar el criterio. Y no uses como ejemplo ninguno de los treinta casos que después vas a medir.

## 4:07–4:40 · Slide 11: Paso 6 de 6

Paso 6. Medir de nuevo y fijar un mínimo.

Volvé a medir. Definí un mínimo de coincidencia para usar el juez en CI y repetí la calibración cada vez que cambies de modelo juez.

Corré otra vez y recalculá. Decidí por adelantado qué acuerdo mínimo necesitás para usar el juez en CI y dejalo escrito. Si no llegás, el juez sirve para ordenar qué revisar a mano, pero no para bloquear un merge. La calibración vence: cada vez que cambies el modelo juez, su versión o la rúbrica, volvé a medir contra tus etiquetas. Guardá esas treinta etiquetas como un activo, porque son tu patrón de referencia.

## 4:41–5:16 · Slide 12: Ejemplo

Un ejemplo.

Un equipo evalúa resúmenes de tickets de soporte. Etiquetan treinta a mano: dieciocho pasan y doce fallan. El juez coincide en veintitrés, un acuerdo del setenta y siete por ciento. De los siete desacuerdos, seis son casos que el juez aprobó y ellos no: es indulgente. Al leerlos encuentran el patrón. El criterio decía "incluye el problema del cliente" y el juez aceptaba menciones vagas. Lo reescriben como "nombra el producto y el síntoma concreto" y agregan un ejemplo de cada veredicto. En la segunda medición coinciden veintiocho de treinta. Fijan ese nivel como mínimo para usarlo en el pipeline.

## 5:17–5:31 · Slide 13: Errores comunes

Los errores más comunes.

Etiquetar después de ver el veredicto del juez.

Usar escalas numéricas en lugar de pasa o falla.

Mirar solo el porcentaje de acuerdo y no su dirección.

Cambiar el modelo juez sin volver a calibrar.

## 5:32–5:50 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

La rúbrica tiene criterios que se verifican mirando el texto.

Hay treinta casos etiquetados a mano antes de correr el juez.

Calculaste el acuerdo y sabés si el juez es indulgente o estricto.

Hay un acuerdo mínimo escrito para usarlo en CI.

## 5:50–5:59 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El juez explica muy bien veredictos incorrectos. No confíes en la justificación: medí la coincidencia.

## 6:00–6:13 · Slide 16: La guía escrita

Eso fue el día 16. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 17: Golden datasets: cómo etiquetar, balancear y versionar.
