# Guion del video · Día 19: Costo como métrica de calidad: prefiltro top-K antes del modelo

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d19-es.mp4`
- Duración del video: 6:21
- Voz sin pausas: 5:30

## 0:00–0:14 · Slide 1: Video guía

Día 19 de la serie 31 días de QA + IA.

Costo como métrica de calidad: prefiltro top-K antes del modelo.

Cómo reducir los tokens de entrada de un agente con un prefiltro local de candidatos y demostrar con mediciones que la calidad no baja.

## 0:15–0:33 · Slide 2: El problema

En QA estamos acostumbrados a que la calidad se mida en defectos. Con sistemas que usan modelos, el costo se vuelve una dimensión de calidad igual de concreta: una funcionalidad que acierta pero cuesta demasiado por llamada no se puede sostener en producción, y una que es barata y falla tampoco sirve. Alguien tiene que medir las dos cosas juntas.

## 0:34–0:52 · Slide 3: Cómo encaja

El caso más común de costo innecesario es mandar al modelo todo el contexto disponible, por las dudas. Esta guía muestra una técnica para evitarlo: un prefiltro local que elige los K candidatos más relevantes antes de llamar al modelo. Y muestra cómo probarlo, porque un prefiltro mal medido baja el costo y también la calidad sin que nadie lo note.

## 0:52–1:02 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El caso del día 18: nombres a mapear contra un catálogo.

Un set etiquetado con la respuesta correcta por nombre.

## 1:03–1:08 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:09–1:43 · Slide 6: Paso 1 de 6

Paso 1. La línea de base.

Medí el punto de partida: tokens de entrada por llamada y qué parte es contexto fijo (por ejemplo, el catálogo entero).

Antes de optimizar, medí. Para una muestra de llamadas, registrá cuántos tokens de entrada usa cada una y cuántos corresponden a contexto fijo que se repite siempre, como un catálogo entero o un documento completo. En muchos sistemas esa parte fija es la mayor parte del costo. Anotá también la calidad actual con el eval que ya tenés. Sin esos dos números, tokens y calidad, no vas a poder decir después si el cambio fue una mejora o solo un cambio.

## 1:44–2:19 · Slide 7: Paso 2 de 6

Paso 2. Un prefiltro local y simple.

Armá un prefiltro local que elija los K candidatos más parecidos. Empezá por uno léxico simple: es gratis y no llama a ningún modelo.

El prefiltro recibe la entrada y la lista completa de candidatos, y devuelve los K más parecidos. Empezá con un método léxico, por ejemplo similitud por trigramas de caracteres: se escribe en pocas líneas, corre en milisegundos y no llama a ningún modelo. Es además determinista, así que se puede probar con tests clásicos. La tentación es saltar directo a algo más sofisticado. Resistila hasta tener un número que muestre que lo simple no alcanza.

## 2:20–2:55 · Slide 8: Paso 3 de 6

Paso 3. Recall del prefiltro.

Medí el recall del prefiltro: en cuántos casos etiquetados la respuesta correcta queda entre los K. Si no está ahí, el modelo no puede acertar.

Esta es la medición central. Para cada caso etiquetado, verificá si la respuesta correcta está entre los K candidatos que devolvió el prefiltro. El porcentaje de casos donde está es el recall. Funciona como techo de todo el sistema: si la respuesta correcta no llega al contexto, el modelo no tiene forma de elegirla, por bueno que sea. Es un test determinista, barato y rápido, y te dice si el problema está antes del modelo o en el modelo.

## 2:56–3:30 · Slide 9: Paso 4 de 6

Paso 4. Comparar métodos y valores de K.

Compará métodos (léxico contra embeddings) y valores de K con ese mismo recall. No des por hecho que embeddings gana.

Con el recall como métrica podés comparar opciones de forma justa: método léxico contra embeddings, y distintos valores de K para cada uno. Armá una tabla. No asumas que los embeddings ganan. En tareas con nombres propios, códigos o abreviaturas, la similitud léxica suele rendir igual o mejor, y además es gratis. Los embeddings ayudan cuando la relación es de significado y no de escritura. Dejá que tus datos lo decidan.

## 3:31–4:07 · Slide 10: Paso 5 de 6

Paso 5. El eval completo con cada K.

Corré el eval completo, 5 veces, con lista entera y con cada K. Compará accuracy, errores caros, tokens y costo.

El recall mide el prefiltro, no el resultado final. Corré el eval de punta a punta, cinco veces, con la lista completa y con cada valor de K. Compará accuracy, errores costosos, tokens y costo. Vas a ver algo que suele sorprender: más contexto no siempre da mejor resultado. Con muchos candidatos parecidos en el prompt, el modelo se confunde más. Hay un punto a partir del cual agregar candidatos empeora la calidad y sube el costo al mismo tiempo.

## 4:08–4:42 · Slide 11: Paso 6 de 6

Paso 6. Elegir el K más chico que alcanza.

Elegí el K más chico que mantiene recall y accuracy. Más candidatos parecidos pueden confundir al modelo y empeorar el resultado.

La regla de decisión es elegir el menor K que mantiene el recall y el accuracy dentro del rango de la línea de base. Documentá la tabla completa y el valor elegido. Agregá el recall del prefiltro como test permanente en CI: si alguien cambia el método o el catálogo crece mucho, el recall puede bajar sin aviso. Ese test tarda segundos, y protege una pieza que, cuando falla, hace fallar a todo lo que viene después.

## 4:43–5:22 · Slide 12: Ejemplo

Un ejemplo.

Con números ilustrativos: un sistema envía en cada llamada un catálogo de dos mil registros, unos sesenta mil tokens de entrada. El equipo arma un prefiltro por trigramas y mide el recall sobre ochenta casos etiquetados. Con K igual a cinco, la respuesta correcta está en el 90% de los casos; con diez, en el 97%; con veinte, en el 99%; con cincuenta, también en el 99%. Prueban embeddings y con K igual a veinte obtienen 98%: no mejora. En el eval completo, K igual a veinte da el mismo accuracy que la lista entera, con un error costoso menos por corrida y alrededor de un tres por ciento de los tokens. Con cincuenta, el accuracy baja dos puntos.

## 5:22–5:37 · Slide 13: Errores comunes

Los errores más comunes.

Reducir el contexto sin medir el recall del prefiltro.

Asumir que los embeddings superan a un método léxico.

Evaluar solo el costo y no la calidad de punta a punta.

Elegir un K grande "para estar seguros".

## 5:38–5:55 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

Tenés tokens de entrada y calidad de la línea de base.

El recall del prefiltro está medido para varios valores de K.

El eval completo corrió con la lista entera y con cada K.

El recall del prefiltro corre como test en CI.

## 5:56–6:06 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Con muchos candidatos parecidos en contexto, el modelo elige mal con más frecuencia. El contexto se diseña y se mide, no se acumula.

## 6:06–6:19 · Slide 16: La guía escrita

Eso fue el día 19. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 20: Regresión de prompts: versionar, comparar y no romper lo que andaba.
