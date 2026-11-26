# Guion del video · Día 17: Golden datasets: cómo etiquetar, balancear y versionar

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d17-es.mp4`
- Duración del video: 6:37
- Voz sin pausas: 5:44

## 0:00–0:13 · Slide 1: Video guía

Día 17 de la serie 31 días de QA + IA.

Golden datasets: cómo etiquetar, balancear y versionar.

Un golden dataset chico pero confiable: con guía de etiquetado, tres particiones y versionado en Git.

## 0:14–0:34 · Slide 2: El problema

Todo lo que medimos en los últimos días depende de una pieza que suele recibir poca atención: el conjunto de casos con su respuesta correcta. Si las etiquetas están mal, el mejor harness del mundo mide con precisión algo equivocado. Si el conjunto solo tiene casos fáciles, cualquier modelo parece excelente. Y si los casos se filtran al prompt, el número deja de significar algo.

## 0:35–0:54 · Slide 3: Cómo encaja

Un golden dataset es ese conjunto tratado con el cuidado que merece un instrumento de medición. Esta guía cubre cómo juntar los casos, cómo etiquetarlos con criterio compartido, cómo balancearlos, cómo separarlos para no engañarte y cómo versionarlos. Es trabajo artesanal, y es el que más mejora la calidad de todas las decisiones posteriores.

## 0:54–1:07 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo qa-ai-lab, carpeta data/.

Entre 50 y 100 casos reales anonimizados o sintéticos.

Idealmente, una segunda persona para etiquetar una muestra.

## 1:08–1:13 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:14–1:17 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:17–1:55 · Slide 7: Paso 1 de 6

Paso 1. Tres fuentes de casos.

Juntá casos de tres fuentes: uso real anonimizado, casos borde y casos adversos (relleno, duplicados, entradas vacías).

La primera fuente es el uso real, anonimizado: muestra cómo son de verdad las entradas, con sus errores de tipeo y sus ambigüedades. La segunda son los casos de borde que vos sabés que existen aunque aparezcan poco: valores límite, formatos raros, entradas muy largas. La tercera son los casos adversos, pensados para molestar: texto de relleno, duplicados, entradas vacías o en otro idioma. Un dataset hecho solo con la primera fuente describe el promedio y no dice nada sobre los fallos.

## 1:56–2:30 · Slide 8: Paso 2 de 6

Paso 2. La guía de etiquetado.

Escribí la guía de etiquetado: definición de cada etiqueta, dos ejemplos por etiqueta y qué hacer en caso de duda.

Antes de etiquetar en volumen, escribí una guía corta: la definición de cada etiqueta, dos ejemplos por etiqueta y qué hacer ante la duda. Esa última parte es la que más se olvida. Sin una regla para los casos dudosos, cada persona resuelve distinto y el dataset acumula inconsistencias. La guía también obliga a tomar decisiones de negocio que estaban implícitas. Si escribir la definición de una etiqueta resulta difícil, es probable que el sistema tampoco pueda aplicarla.

## 2:31–3:07 · Slide 9: Paso 3 de 6

Paso 3. Dos personas, veinte casos.

Dos personas etiquetan por separado una muestra de 20. Donde no coinciden, la guía está incompleta: corregila.

Tomá una muestra de veinte casos y que dos personas la etiqueten por separado, sin verse las respuestas. Después comparen. Los desacuerdos no son errores de las personas: son huecos de la guía. Discutan cada uno, decidan y actualicen la guía con la regla nueva o con un ejemplo. Repitan hasta que los desacuerdos sean pocos. Recién ahí conviene etiquetar el resto. Ese acuerdo entre personas marca además el techo razonable de cualquier modelo.

## 3:08–3:44 · Slide 10: Paso 4 de 6

Paso 4. Balance.

Balanceá: que todas las clases y todos los tipos difíciles estén representados. Si el 90% es fácil, tu accuracy miente.

Contá cuántos casos hay por clase y por tipo de dificultad. Si el noventa por ciento es fácil, un sistema que resuelve solo lo fácil saca noventa y parece listo para producción. Cada clase y cada tipo difícil necesita representación suficiente como para que su tasa de aciertos diga algo. Eso implica sobrerrepresentar a propósito los casos raros. Está bien: un dataset de evaluación no busca reflejar las proporciones de producción, sino exponer dónde falla el sistema.

## 3:45–4:22 · Slide 11: Paso 5 de 6

Paso 5. Tres particiones.

Partí en tres: dev para iterar, test que nunca se usa para ajustar ni aparece en ejemplos del prompt, y regresión con todo lo que alguna vez falló.

Separá el conjunto en tres. Dev es para iterar: ahí probás prompts y mirás fallos todas las veces que quieras. Test no se usa para ajustar nada ni se cita en los ejemplos del prompt, y se consulta solo para tomar una decisión. Regresión junta todo lo que alguna vez falló y se arregló, para que no vuelva. La disciplina con test es lo difícil. Cada vez que ajustás algo mirando esos resultados, deja de medir cómo se va a comportar el sistema con casos nuevos.

## 4:22–4:58 · Slide 12: Paso 6 de 6

Paso 6. Versionado.

Versioná en JSONL con CHANGELOG. Corregir una etiqueta es un commit, y después de corregir se recalculan las métricas anteriores.

Guardá cada partición como JSONL, un caso por línea con un identificador estable, y llevá un CHANGELOG. Corregir una etiqueta es un commit con su motivo, igual que un cambio de código. Después de una corrección hay que recalcular las métricas anteriores, porque el instrumento cambió y los números viejos ya no son comparables. Anotá la versión del dataset en la ficha de cada corrida. Sin ese dato, una mejora de dos puntos puede ser solo una etiqueta corregida.

## 4:59–5:36 · Slide 13: Ejemplo

Un ejemplo.

Un equipo arma un dataset para un sistema que decide si un proveedor nuevo ya existe en el catálogo. Juntan ciento veinte casos: sesenta de uso real anonimizado, cuarenta de borde y veinte adversos. Dos personas etiquetan veinte y discrepan en seis. El origen es una sola pregunta sin responder: si una sucursal cuenta como el mismo proveedor. Lo deciden, lo agregan a la guía y en la segunda ronda discrepan en uno. Al contar, descubren que solo ocho casos son del tipo "nombre casi idéntico, empresa distinta", el error más costoso. Suman doce más. Parten en sesenta de dev, cuarenta de test y veinte de regresión.

## 5:36–5:54 · Slide 14: Errores comunes

Los errores más comunes.

Dejar que el modelo genere las etiquetas contra las que se lo evalúa.

Etiquetar todo con una sola persona y sin guía escrita.

Ajustar el prompt mirando los resultados del conjunto de test.

Corregir etiquetas sin registro y comparar métricas viejas con nuevas.

## 5:54–6:12 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

El dataset tiene casos reales, de borde y adversos.

Hay una guía de etiquetado con regla para los casos dudosos.

Dos personas etiquetaron una muestra y resolvieron los desacuerdos.

Existen dev, test y regresión en JSONL con CHANGELOG.

## 6:13–6:22 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Un modelo evaluado contra etiquetas que él mismo generó siempre sale bien. Las etiquetas del test las pone una persona.

## 6:23–6:36 · Slide 17: La guía escrita

Eso fue el día 17. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 18: Cómo testear un modelo: accuracy, N corridas y rangos.
