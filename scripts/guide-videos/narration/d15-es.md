# Guion del video · Día 15: Cómo setear modelos para pruebas de calidad

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d15-es.mp4`
- Duración del video: 6:19
- Voz sin pausas: 5:30

## 0:00–0:15 · Slide 1: Video guía

Día 15 de la serie 31 días de QA + IA.

Cómo setear modelos para pruebas de calidad.

Configurar un modelo para pruebas de forma reproducible: versión fija, parámetros explícitos, salida estructurada y un juez separado del modelo evaluado.

## 0:15–0:35 · Slide 2: El problema

Cuando un test con un modelo da resultados distintos de un día para el otro, la primera sospecha suele ser el modelo. La segunda debería ser la configuración. Un alias que apunta a la última versión, una temperatura que quedó en el valor por defecto, un límite de tokens que corta la respuesta o un juez que cambió sin aviso explican buena parte de las diferencias inexplicables.

## 0:35–0:54 · Slide 3: Cómo encaja

Configurar un modelo para pruebas de calidad es tratarlo como cualquier otra dependencia de un entorno de test: versión fija, parámetros explícitos y registro de con qué corrió cada cosa. Esta guía recorre las seis decisiones que hacen que dos corridas sean comparables, y deja en claro qué significa reproducibilidad cuando el sistema bajo prueba no es determinista.

## 0:55–1:03 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El eval harness del día 8.

Opcional: API key de un proveedor para el segundo modelo y el juez.

## 1:04–1:09 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:10–1:47 · Slide 6: Paso 1 de 6

Paso 1. El rol define la configuración.

Definí el rol del modelo en la prueba: sistema bajo prueba, generador (datos o tests) o juez. Cada rol se configura distinto.

Un mismo modelo puede cumplir tres roles en tu proceso, y cada uno pide otra cosa. Como sistema bajo prueba, se configura igual que en producción, porque querés medir lo que el usuario recibe. Como generador de datos o tests, puede usar más temperatura para producir variedad. Como juez, necesita la configuración más estable posible. Mezclar roles en una sola configuración es un error frecuente: terminás midiendo el producto con parámetros que el producto no usa.

## 1:48–2:22 · Slide 7: Paso 2 de 6

Paso 2. Versión exacta, sin alias.

Fijá la versión exacta. Nada de alias tipo "latest": si el proveedor actualiza el modelo, tus resultados cambian sin que toques nada.

Los proveedores ofrecen alias que apuntan a la versión más reciente de un modelo. Son cómodos para desarrollar y malos para medir: el día que el alias cambia, tus resultados cambian sin que hayas tocado nada, y no tenés forma de saber por qué. Usá siempre el identificador completo con su versión o fecha. Cuando quieras actualizar, hacelo como un cambio deliberado: corré el eval con la versión vieja y con la nueva, compará y recién después cambiá el identificador.

## 2:23–3:03 · Slide 8: Paso 3 de 6

Paso 3. Parámetros a la vista.

Parámetros explícitos: temperatura baja para clasificar y juzgar, límite de tokens de salida y seed si el proveedor lo soporta. Si un modelo no expone algún parámetro, anotalo.

Escribí en la configuración los parámetros que afectan la salida, aunque coincidan con los valores por defecto: temperatura, límite de tokens de salida y semilla si el proveedor la soporta. Para clasificar y juzgar, temperatura baja. El límite de tokens merece atención: una respuesta cortada a la mitad puede parecer un fallo de formato cuando es un límite mal puesto. Algunos modelos no exponen ciertos parámetros o los ignoran. Anotalo también, para no atribuirle a la configuración un control que no tenés.

## 3:04–3:39 · Slide 9: Paso 4 de 6

Paso 4. Salida estructurada.

Salida estructurada: pedí JSON con schema. Te ahorra buena parte de los fallos de formato.

Si tu código va a parsear la respuesta, pedila en JSON con un schema, usando el mecanismo de salida estructurada del proveedor cuando exista. Reduce una clase entera de fallos: texto antes o después del JSON, campos con otro nombre, valores fuera de la lista permitida. No reemplaza a la validación de tu lado, que sigue siendo necesaria, pero cambia la proporción. Vas a dedicar los evals a medir si el contenido es correcto, en lugar de gastar casos en descubrir que el formato vino roto.

## 3:39–4:12 · Slide 10: Paso 5 de 6

Paso 5. Un juez separado.

Juez separado: el modelo que evalúa no debería ser el mismo que se evalúa, y conviene que sea igual o más capaz.

El modelo que califica no debería ser el mismo que está siendo calificado, y conviene que sea igual o más capaz. Un modelo que evalúa su propia salida tiende a encontrarla razonable, porque comparte los mismos sesgos que la produjeron. Declaralo como un provider aparte, con su versión fija y su etiqueta. Cambiar el juez es cambiar el instrumento de medición: después de hacerlo, las métricas nuevas no son comparables con las anteriores hasta volver a calibrar.

## 4:13–4:47 · Slide 11: Paso 6 de 6

Paso 6. La ficha de corrida.

Registrá la ficha de cada corrida: modelo y versión, versión del prompt, parámetros, fecha y dataset. Sin ficha no hay comparación válida.

Cada corrida debería dejar un registro con modelo y versión, versión del prompt, parámetros, fecha, dataset y, si hay, juez. Es un archivo chico que se guarda junto a los resultados. Sin esa ficha, una comparación entre dos corridas no dice nada, porque no sabés qué más cambió entre una y otra. Con ella podés responder la pregunta que siempre llega: por qué la semana pasada daba noventa y hoy da ochenta y cuatro.

## 4:48–5:20 · Slide 12: Ejemplo

Un ejemplo.

Un equipo nota que su eval de clasificación bajó cinco puntos sin que nadie tocara el prompt. Buscan las fichas de corrida y no existen. Reconstruyen lo que pueden: el provider usaba un alias y el proveedor había publicado una versión nueva esa semana. Fijan la versión anterior, corren de nuevo y el resultado vuelve al valor original. Después corren la versión nueva a propósito: es mejor en los casos ambiguos y peor en dos casos críticos. Deciden no actualizar todavía. A partir de ahí, cada corrida guarda su ficha y el identificador del modelo incluye la fecha.

## 5:20–5:36 · Slide 13: Errores comunes

Los errores más comunes.

Usar un alias de versión en evals o en CI.

Evaluar el producto con parámetros distintos a los de producción.

Usar como juez el mismo modelo que se evalúa.

Comparar dos corridas sin saber qué cambió entre ellas.

## 5:37–5:53 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

Cada provider tiene un rol y una etiqueta que lo dice.

Todos los modelos están fijados a una versión exacta.

Temperatura, límite de tokens y semilla están escritos.

Cada corrida guarda su ficha junto a los resultados.

## 5:54–6:04 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Temperatura cero no garantiza la misma respuesta. La reproducibilidad en LLMs es estadística: se mide con corridas repetidas.

## 6:05–6:17 · Slide 16: La guía escrita

Eso fue el día 15. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 16: LLM como juez: rúbricas y calibración contra humanos.
