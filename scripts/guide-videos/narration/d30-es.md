# Guion del video · Día 30: Observabilidad de LLM en producción: traces, evals online y alertas

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d30-es.mp4`
- Duración del video: 7:28
- Voz sin pausas: 6:30

## 0:00–0:15 · Slide 1: Video guía

Día 30 de la serie 31 días de QA + IA.

Observabilidad de LLM en producción: traces, evals online y alertas.

Qué registrar de cada llamada a un modelo en producción, cómo evaluar una muestra de forma continua y qué alertas justifican despertar a alguien.

## 0:16–0:34 · Slide 2: El problema

Todo lo que probaste antes del release describe cómo se comportaba el sistema con tus casos, en tu entorno, ese día. En producción llegan entradas que nadie imaginó, el proveedor actualiza el modelo, los documentos cambian y los usuarios encuentran usos nuevos. Un sistema con IA puede degradarse sin que nadie haya hecho un deploy.

## 0:34–0:54 · Slide 3: Cómo encaja

Por eso la calidad en estos sistemas no termina en el gate. Sigue en producción, con las mismas preguntas y otros instrumentos: trazas en lugar de reportes, evals sobre tráfico real en lugar de datasets, alertas en lugar de umbrales de CI. Esta guía arma ese circuito y lo cierra, de modo que cada fallo encontrado en producción vuelva como un caso de prueba y no se repita.

## 0:55–1:10 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Una feature con LLM en un ambiente con tráfico (staging sirve).

Una herramienta de trazas para LLM; Langfuse es open source y se puede levantar en local.

Los scorers del eval harness (días 8 y 16).

## 1:11–1:16 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:17–2:05 · Slide 6: Qué registrar y qué medir

Qué registrar y qué medir.

Modelo pedido y modelo que respondió: gen_ai.request.model y gen_ai.response.model (convenciones GenAI de OpenTelemetry).

Tokens de entrada y salida: gen_ai.usage.input_tokens y gen_ai.usage.output_tokens.

Operación: gen_ai.operation.name.

Versión del prompt, latencia total y al primer token: atributos propios y la duración del span.

Llamadas a herramientas y resultado: spans hijos.

Indicador de calidad: pass rate de los evals online. Alerta ante una caída sostenida, no un punto aislado.

Indicador de latencia: TTFT p95, según el objetivo del día 25.

Indicador de errores: 429, 5xx y timeouts por debajo del máximo acordado.

Indicador de costo: gasto por hora contra el presupuesto diario.

## 2:06–2:47 · Slide 7: Paso 1 de 6

Paso 1. Un span por llamada al modelo.

Instrumentá cada llamada al modelo como un span con modelo, versión de prompt, tokens, latencia y resultado. Las convenciones GenAI de OpenTelemetry te dan los nombres.

Instrumentá cada llamada al modelo como un span que registre qué modelo se pidió y cuál respondió, la versión del prompt, los tokens de entrada y de salida, la latencia y el resultado. Las convenciones de OpenTelemetry para IA generativa definen nombres estándar para esos atributos. Usarlas evita inventar un esquema propio y permite cambiar de herramienta de observabilidad sin reinstrumentar. Las llamadas a herramientas y las búsquedas de un RAG van como spans hijos, para poder ver la cadena completa de una respuesta.

## 2:47–3:24 · Slide 8: Paso 2 de 6

Paso 2. Qué se guarda y por cuánto tiempo.

Cuidá lo que guardás: los prompts y respuestas pueden traer datos personales. Enmascará o muestreá, y definí retención.

Los prompts y las respuestas pueden contener datos personales, y una traza completa los guarda en texto plano. Decidí de forma explícita qué se almacena. Las opciones son enmascarar los campos sensibles antes de guardar, guardar el contenido completo solo de una muestra, o conservar solo los metadatos por defecto. Definí además un plazo de retención y quién tiene acceso. Es una decisión para tomar junto con seguridad y legales, y conviene tomarla antes de instrumentar.

## 3:24–4:00 · Slide 9: Paso 3 de 6

Paso 3. Evals en línea.

Evals online: corré los checks deterministas sobre todo el tráfico y el juez sobre una muestra. Son los mismos scorers que usás en CI.

Los mismos scorers que usás en CI pueden correr sobre el tráfico real. Los chequeos deterministas, de formato, campos obligatorios y largos, son baratos y se aplican a todas las respuestas. El juez cuesta tokens, así que se aplica a una muestra. El resultado es una tasa de aprobación continua sobre lo que los usuarios reciben de verdad. Es la señal que te avisa de una degradación que ningún dataset podía anticipar, porque sale de entradas que no tenías.

## 4:01–4:41 · Slide 10: Paso 4 de 6

Paso 4. Cuatro indicadores con alerta.

Definí cuatro indicadores (calidad, latencia, errores y costo) con objetivo y alerta. Alertá por tendencia sostenida, no por un caso.

Definí cuatro indicadores, cada uno con su objetivo y su alerta. Calidad: la tasa de aprobación de los evals en línea. Latencia: el tiempo al primer token en el percentil noventa y cinco. Errores: límites de cuota, errores del servidor y timeouts. Costo: el gasto por hora contra el presupuesto diario. Las alertas se configuran sobre tendencia sostenida, no sobre un caso aislado. Con un sistema que varía por naturaleza, alertar por cada respuesta mala genera ruido hasta que nadie mira.

## 4:42–5:14 · Slide 11: Paso 5 de 6

Paso 5. Cerrar el circuito.

Cerrá el circuito: cada fallo de producción, anonimizado, entra al set de regresión.

Cada fallo encontrado en producción, por una alerta, por un eval en línea o por el reclamo de un usuario, se anonimiza y se suma al conjunto de regresión. Este paso convierte la observabilidad en mejora. Sin él, el mismo tipo de fallo vuelve con el próximo cambio de prompt. Con él, tu dataset se va pareciendo cada vez más al uso real. Asigná un responsable y una frecuencia: revisar los fallos de la semana y decidir cuáles entran.

## 5:15–5:50 · Slide 12: Paso 6 de 6

Paso 6. El plan de rollback.

Tené el plan de vuelta atrás escrito: prompt y modelo con versión fija y un flag para volver a la versión anterior sin deploy.

Tené escrito cómo se vuelve atrás antes de necesitarlo. Requiere tres cosas: la versión del prompt y la del modelo fijadas y registradas, la versión anterior todavía disponible, y un flag que permita volver sin hacer un deploy. Probá el rollback una vez, en un entorno de prueba. Un plan que nunca se ejecutó suele fallar en el peor momento. Cuando la alerta de calidad se dispare, la primera acción tiene que ser volver a un estado conocido, y el análisis viene después.

## 5:51–6:24 · Slide 13: Ejemplo

Un ejemplo.

Un asistente de soporte lleva dos meses en producción con trazas y evals en línea. Un jueves, la tasa de aprobación del juez sobre la muestra baja de forma sostenida durante tres horas, sin ningún deploy. Salta la alerta de calidad. Las trazas muestran que el modelo que responde tiene un identificador distinto del de la semana anterior: el alias que usaban apuntó a una versión nueva. Activan el flag para volver a la versión fijada anterior y la tasa se recupera. Después anonimizan doce conversaciones fallidas, las suman a regresión y corren el eval completo contra la versión nueva antes de decidir si la adoptan.

## 6:25–6:42 · Slide 14: Errores comunes

Los errores más comunes.

Guardar prompts y respuestas completos sin enmascarar ni definir retención.

Alertar por cada respuesta fallida en lugar de por tendencia.

Registrar solo el modelo pedido y no el que respondió.

No sumar los fallos de producción al conjunto de regresión.

## 6:43–7:01 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Cada llamada al modelo genera un span con modelo, versión de prompt y tokens.

Hay una política escrita de enmascarado, muestreo y retención.

Los evals en línea corren con chequeos deterministas y juez sobre muestra.

El rollback por flag se probó al menos una vez.

## 7:02–7:12 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El modelo que responde puede no ser el que pediste si usás un alias. Registrá ambos o no vas a poder explicar un cambio de comportamiento.

## 7:13–7:26 · Slide 17: La guía escrita

Eso fue el día 30. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 31: Capstone: el pipeline completo de calidad con IA y tu hoja de ruta 2027.
