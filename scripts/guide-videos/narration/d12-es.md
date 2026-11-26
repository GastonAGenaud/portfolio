# Guion del video · Día 12: Triage de fallos con LLM: de 40 tests rojos a 3 causas

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d12-es.mp4`
- Duración del video: 6:25
- Voz sin pausas: 5:33

## 0:00–0:14 · Slide 1: Video guía

Día 12 de la serie 31 días de QA + IA.

Triage de fallos con LLM: de 40 tests rojos a 3 causas.

Un paso de triage que agrupa los fallos de una corrida por causa probable, con evidencia, y que dice "no sé" cuando no alcanza.

## 0:15–0:35 · Slide 2: El problema

Un pipeline con cuarenta tests en rojo casi nunca tiene cuarenta problemas. Tiene dos o tres: un servicio caído, un cambio de interfaz y, con suerte, un defecto real. El trabajo de quien hace el triage es descubrir esa agrupación, y es un trabajo lento y repetitivo: abrir fallo por fallo, leer el error y reconocer que ya lo viste diez veces esa mañana.

## 0:36–0:54 · Slide 3: Cómo encaja

Agrupar texto parecido es algo que un LLM hace bien y rápido. Lo que no hace bien es admitir que no sabe. Esta guía arma un triage asistido que aprovecha lo primero y se protege de lo segundo: entrada estructurada y chica, salida con evidencia textual, una categoría "desconocido" obligatoria y una persona que confirma antes de cerrar nada.

## 0:55–1:03 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Una suite de Playwright con algunos fallos.

Traces activados en reintentos.

## 1:04–1:09 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:10–1:12 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:13–1:16 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:17–1:51 · Slide 8: Paso 1 de 6

Paso 1. Resultados estructurados.

Sacá los resultados en formato estructurado con el reporter JSON y mantené los traces de los reintentos.

El punto de partida es que tu runner emita los resultados en un formato que una máquina pueda leer, no solo un reporte HTML para personas. El reporter JSON de Playwright incluye para cada test su título, archivo, estado, error y reintentos. Activá también los traces en el primer reintento: son la evidencia que vas a necesitar para verificar lo que el modelo proponga. Sin datos estructurados terminás pegando logs enteros en un chat, que es caro, lento y mezcla ruido con señal.

## 1:52–2:30 · Slide 9: Paso 2 de 6

Paso 2. Extraer solo lo necesario.

Extraé solo los fallos: título, archivo y los primeros 400 caracteres del error. Menos tokens, mejor agrupación.

Un script corto recorre el JSON y se queda con los tests fallidos: título, archivo y los primeros cuatrocientos caracteres del error. Ese recorte tiene dos efectos. Baja el costo, porque un log completo puede tener miles de líneas irrelevantes. Y mejora el resultado, porque la primera parte del mensaje suele contener lo que distingue una causa de otra: el tipo de error, el locator, el código HTTP. Con stack traces enteros, el modelo tiende a agrupar por coincidencias superficiales del stack.

## 2:31–3:05 · Slide 10: Paso 3 de 6

Paso 3. El prompt de triage.

Corré el prompt de triage. Exigí categoría, tests del grupo y la línea exacta de evidencia.

Pedí tres cosas por grupo: una categoría de una lista cerrada, los tests que lo integran y la línea exacta del error que justifica la agrupación. La lista cerrada es importante: entorno, datos, cambio de interfaz, defecto probable y desconocido. La línea de evidencia tiene que ser una cita literal de la entrada, no una explicación. Así podés comprobar en segundos si el grupo tiene sentido, y un grupo cuya evidencia no aparece en los datos queda descartado de inmediato.

## 3:06–3:39 · Slide 11: Paso 4 de 6

Paso 4. Verificar el grupo más grande.

Verificá a mano el grupo más grande abriendo un trace con npx playwright show-trace.

Antes de actuar sobre el resultado, abrí el trace de un test del grupo más grande. Mirá la línea de tiempo, las llamadas de red y la captura del momento del fallo. Si la causa propuesta coincide con lo que ves, el grupo queda confirmado y probablemente resolviste la mayor parte del pipeline en rojo. Si no coincide, tomá el resultado completo con más cautela. Esa verificación lleva pocos minutos y es la que convierte una sugerencia en un diagnóstico.

## 3:40–4:12 · Slide 12: Paso 5 de 6

Paso 5. Guardar cada triage.

Guardá cada triage con tu veredicto final. En pocas semanas tenés un dataset para evaluar el prompt.

Guardá la entrada, la salida del modelo y tu veredicto final en un archivo por corrida. Parece burocracia y es lo más valioso del proceso. En pocas semanas tenés decenas de casos reales etiquetados por alguien que conoce el sistema: exactamente el dataset que hace falta para evaluar el prompt de triage con el método del día ocho. También vas a ver patrones que un día suelto no muestra, como un test que cae siempre en la categoría de entorno.

## 4:13–4:45 · Slide 13: Paso 6 de 6

Paso 6. El cierre es humano.

No automatices el cierre: el modelo propone, una persona confirma antes de poner en cuarentena o abrir un bug.

El modelo propone grupos y causas; una persona confirma antes de poner un test en cuarentena, abrir un bug o reintentar el pipeline. La razón es de costo del error. Cuarentenar por error un test que detectaba un defecto real deja pasar ese defecto. Abrir veinte bugs duplicados le quita credibilidad a QA. Automatizar la propuesta ahorra la parte tediosa; automatizar la decisión traslada el riesgo a un sistema que no responde por ella.

## 4:46–5:25 · Slide 14: Ejemplo

Un ejemplo.

Un lunes el pipeline nocturno muestra cuarenta y dos fallos. El script extrae los cuarenta y dos errores recortados y el prompt devuelve cuatro grupos. Treinta y uno comparten la línea de un error 503 del servicio de autenticación: entorno. Siete tienen un timeout esperando un botón cuyo nombre cambió: cambio de interfaz. Tres muestran un total distinto del esperado en el carrito: defecto probable. Uno queda como desconocido. La QA abre un trace del primer grupo y confirma el 503. Reintenta el pipeline cuando el servicio vuelve, actualiza un locator y abre un solo bug con tres tests como evidencia. El caso desconocido resulta ser un dato de prueba vencido.

## 5:26–5:43 · Slide 15: Errores comunes

Los errores más comunes.

Pegar el log completo en lugar de los errores recortados.

No ofrecer la categoría desconocido y obtener causas inventadas.

Aceptar la explicación del modelo sin abrir ningún trace.

Automatizar la cuarentena o la creación de bugs sin confirmación.

## 5:44–6:01 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El runner emite JSON y guarda traces en los reintentos.

El script extrae título, archivo y error recortado de cada fallo.

Cada grupo trae una línea de evidencia literal.

El triage quedó guardado con tu veredicto final.

## 6:02–6:10 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Si no le das la salida "desconocido", fabrica una causa plausible. Una causa inventada es peor que ninguna.

## 6:11–6:24 · Slide 18: La guía escrita

Eso fue el día 12. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 13: TDD con IA (1): red, green, refactor con un agente.
