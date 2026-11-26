# Guion del video · Día 8: Tu primer eval harness con promptfoo

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d08-es.mp4`
- Duración del video: 6:25
- Voz sin pausas: 5:31

## 0:00–0:14 · Slide 1: Video guía

Día 8 de la serie 31 días de QA + IA.

Tu primer eval harness con promptfoo.

Un eval harness real para un clasificador de bugs: prompt versionado, dataset, asserts, corridas repetidas y comparación entre dos modelos.

## 0:15–0:34 · Slide 2: El problema

Hasta acá hablamos de evals como idea. Hoy construís uno que funciona, de punta a punta, sobre un problema que cualquier equipo de QA reconoce: clasificar reportes de bugs por severidad. Es un buen primer caso porque la salida es chica, el criterio se puede discutir y los errores tienen consecuencias claras: un bug crítico clasificado como bajo se pierde en el backlog.

## 0:35–0:51 · Slide 3: Cómo encaja

Vas a escribir el prompt como archivo, armar la configuración, etiquetar diez casos con tu propio criterio, correr todo varias veces y leer los fallos. La parte que más enseña no es la herramienta sino la lectura de fallos: ahí descubrís si el problema está en el modelo, en el prompt o en tus propias etiquetas.

## 0:51–1:01 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo qa-ai-lab con promptfoo (día 4).

Ollama con llama3.2; opcional, un segundo modelo.

## 1:02–1:07 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:08–1:10 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:11–1:14 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:15–1:50 · Slide 8: Paso 1 de 6

Paso 1. El prompt como archivo.

Escribí el prompt en un archivo aparte, con las reglas de clasificación y el formato de salida. El prompt es código: se versiona.

Escribí el prompt en prompts/ con tres partes: el rol, las reglas de clasificación y el formato exacto de salida. Las reglas tienen que ser las tuyas, escritas como se las explicarías a alguien nuevo: qué hace que un bug sea crítico, qué lo hace bajo. Cuanto más explícitas, menos interpreta el modelo. El formato de salida también va escrito, con los valores permitidos. Tenerlo en un archivo aparte permite ver en un diff qué palabra cambió cuando la calidad sube o baja.

## 1:51–2:25 · Slide 9: Paso 2 de 6

Paso 2. La configuración mínima.

Creá la config: prompt, provider y un defaultTest con el assert de formato que aplica a todos los casos.

La configuración une tres cosas: qué prompt, contra qué provider y con qué casos. El bloque defaultTest es la pieza más útil para empezar: ahí va el assert de formato que se aplica a todos los casos sin repetirlo. Si la salida no es JSON válido con una severidad permitida, el caso falla ahí y no se evalúa nada más. Mantené la configuración corta. Un archivo que entra en una pantalla lo lee todo el equipo; uno de trescientas líneas, nadie.

## 2:26–3:03 · Slide 10: Paso 3 de 6

Paso 3. Diez casos etiquetados por vos.

Cargá al menos 10 casos etiquetados por vos: 3 críticos, 3 bajos y 4 ambiguos. Los ambiguos son los que enseñan.

Elegí diez reportes reales o realistas y escribí la severidad esperada antes de correr nada. La mezcla importa: tres claramente críticos, tres claramente bajos y cuatro ambiguos. Los claros verifican que lo básico funciona. Los ambiguos son los que discriminan: un reporte que dice "la app se cierra" sin decir en qué flujo, o uno cosmético en la pantalla de pago. Si te cuesta etiquetar un caso, anotá por qué. Esa duda suele ser una regla que falta en el prompt.

## 3:03–3:38 · Slide 11: Paso 4 de 6

Paso 4. Tres corridas por caso.

Corré con --repeat 3. Un caso que pasa una vez de tres no está pasando.

Una sola corrida no dice nada sobre un sistema que varía. Con tres repeticiones cada caso queda en una de tres situaciones: pasa siempre, falla siempre o es inestable. Los inestables son los más interesantes, porque muestran dónde el prompt deja margen de interpretación. Tratá un caso que pasa una de tres veces como fallido: en producción, ese caso va a clasificar mal buena parte de las veces. Anotá el tiempo y el costo total de la corrida, que más adelante vas a necesitar.

## 3:39–4:16 · Slide 12: Paso 5 de 6

Paso 5. Leer los fallos uno por uno.

Abrí el visor y leé las fallas una por una. Clasificalas: error del modelo, error del prompt o error de tu etiqueta.

Abrí el visor y leé cada fallo con su entrada y su salida completas. Clasificalo en una de tres causas. Error del modelo: las reglas eran claras y no las siguió. Error del prompt: la regla no estaba o era ambigua. Error de etiquetado: al releer, la respuesta del modelo es defendible y tu etiqueta no. La tercera causa aparece más de lo que uno espera, y encontrarla mejora tu criterio. Corregí primero el prompt y las etiquetas, y recién después pensá en cambiar de modelo.

## 4:17–4:50 · Slide 13: Paso 6 de 6

Paso 6. Un segundo provider.

Agregá un segundo provider y compará lado a lado calidad, latencia y costo.

Agregá otro modelo a la lista de providers y corré de nuevo. El visor muestra los dos lado a lado sobre los mismos casos. Compará tres cosas: tasa de aprobación, latencia y costo por corrida. Es frecuente que el modelo más grande gane por poco en calidad y pierda por mucho en las otras dos. Con diez casos no alcanza para una decisión definitiva, pero sí para descartar opciones y para tener, por primera vez, una comparación basada en tus datos y no en un ranking público.

## 4:51–5:25 · Slide 14: Ejemplo

Un ejemplo.

Una QA lead arma el eval con diez reportes de su backlog. En la primera corrida, con tres repeticiones, siete casos pasan siempre, uno falla siempre y dos son inestables. El que falla siempre es un error de etiquetado: ella lo había marcado como bajo, pero afecta al login y el modelo lo marcó crítico con buen motivo. Los dos inestables son reportes sin pasos de reproducción. Agrega al prompt una regla: "si faltan datos para decidir, clasificá como medio y pedí los pasos". En la segunda corrida, los diez casos pasan las tres veces. El cambio fue una línea de prompt y una etiqueta.

## 5:26–5:42 · Slide 15: Errores comunes

Los errores más comunes.

Etiquetar los casos después de ver la respuesta del modelo.

Usar solo casos fáciles y concluir que el prompt funciona.

Evaluar contenido cuando el formato ya falló.

Cambiar de modelo antes de revisar el prompt y las etiquetas.

## 5:42–6:00 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El prompt está en un archivo con reglas y formato de salida.

Hay diez casos etiquetados, cuatro de ellos ambiguos.

Cada caso corrió tres veces y sabés cuáles son inestables.

Cada fallo tiene una causa asignada: modelo, prompt o etiqueta.

## 6:01–6:10 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Los modelos chicos agregan texto alrededor del JSON. Validá formato antes que contenido o vas a diagnosticar mal.

## 6:11–6:23 · Slide 18: La guía escrita

Eso fue el día 8. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 9: Agent harness para QA: reglas, skills y MCP en tu repo de automation.
