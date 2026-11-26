# Guion del video · Día 29: Infra de QA con IA: runners efímeros, modelos locales, secretos y costos

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d29-es.mp4`
- Duración del video: 7:12
- Voz sin pausas: 6:17

## 0:00–0:15 · Slide 1: Video guía

Día 29 de la serie 31 días de QA + IA.

Infra de QA con IA: runners efímeros, modelos locales, secretos y costos.

Las cinco decisiones de infraestructura que hacen que las pruebas con IA sean reproducibles, seguras y pagables.

## 0:16–0:33 · Slide 2: El problema

Los evals, los agentes y las pruebas de seguridad de los últimos días corren sobre algo: runners, contenedores, modelos, claves y datos. Esa infraestructura rara vez se diseña. Se va armando con lo que hay, y un día el pipeline cuesta el triple, un resultado no se puede reproducir o una clave aparece en un log.

## 0:34–0:57 · Slide 3: Cómo encaja

Las decisiones de infraestructura para QA con IA son pocas y tienen consecuencias largas. Dónde corre el modelo define el costo y la privacidad. Cómo son los runners define la reproducibilidad. Dónde trabaja un agente define cuánto daño puede causar un error. Esta guía recorre esas decisiones con una regla práctica para cada una, y con dos métricas que casi nadie publica y que conviene tener desde el primer día: tokens y gasto por corrida.

## 0:58–1:04 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El pipeline del día 28.

Docker en el runner.

## 1:05–1:11 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:11–1:53 · Slide 6: Las cinco decisiones

Las cinco decisiones.

Dónde corre el modelo: API en la nube (simple, paga por token, los datos salen) o modelo local en el runner (gratis, privado, más lento y menos capaz). Mi criterio: local para smoke y formato, nube para evals con juez.

Runners: persistentes o efímeros (un contenedor limpio por corrida). Mi criterio: efímeros siempre.

Dónde trabaja un agente: en el runner con credenciales o en un sandbox sin credenciales de producción y con salida de red limitada. Mi criterio: sandbox.

Secretos: una key compartida o una por ambiente, con permisos mínimos y tope de gasto. Mi criterio: por ambiente.

Datos: copia de producción o sintéticos y anonimizados. Mi criterio: nunca producción.

## 1:54–2:34 · Slide 7: Paso 1 de 6

Paso 1. Dónde corre el modelo.

Decidí dónde corre el modelo en CI. Un modelo local como servicio sirve para smoke y checks de formato sin costo; los evals con juez necesitan un modelo más capaz.

Hay dos opciones, y lo habitual es combinarlas. Un modelo local, levantado como servicio dentro del runner, no cuesta por token y no saca datos de tu infraestructura, pero es más lento y menos capaz. Una API en la nube ofrece modelos más capaces, cobra por uso y recibe tus datos. La regla que mejor funciona es asignar cada trabajo al modelo más barato que lo resuelve: chequeos de humo y de formato con el modelo local, evals con juez con un modelo más capaz. Medí antes de asumir que el chico alcanza.

## 2:34–3:13 · Slide 8: Paso 2 de 6

Paso 2. Runners efímeros.

Usá runners efímeros: cada corrida arranca limpia. El estado que queda de una corrida anterior es una causa frecuente de resultados que no se pueden reproducir.

Un runner efímero arranca limpio en cada corrida: un contenedor nuevo, sin archivos, cachés ni procesos de la corrida anterior. Los runners persistentes acumulan estado, como una dependencia instalada a mano, un archivo temporal o un modelo que alguien actualizó. Ese estado hace que el mismo commit dé resultados distintos según en qué máquina cayó. Con modelos, que ya aportan su propia variación, sumar la del entorno hace imposible saber qué cambió. Efímero siempre, con las versiones fijadas en la imagen.

## 3:13–3:49 · Slide 9: Paso 3 de 6

Paso 3. Sandbox para agentes.

Si un agente ejecuta comandos en CI, que lo haga en un sandbox: contenedor sin credenciales de producción y con salida de red restringida.

Si un agente ejecuta comandos dentro del pipeline, por ejemplo para reparar un test o investigar un fallo, tiene que hacerlo en un entorno aislado: un contenedor sin credenciales de producción, con el sistema de archivos limitado al repositorio y con la salida de red restringida a los destinos necesarios. El agente lee contenido que puede traer instrucciones maliciosas, como vimos en el día veinticuatro. El sandbox garantiza que, si una de esas instrucciones tiene efecto, no haya nada valioso a su alcance.

## 3:50–4:26 · Slide 10: Paso 4 de 6

Paso 4. Secretos.

Secretos: una API key por ambiente, con permisos mínimos y tope de gasto, y verificá que no aparezca en logs ni en artefactos.

Usá una clave de API por entorno: una para desarrollo, otra para CI y otra para producción. Cada una con los permisos mínimos y con un tope de gasto. Así una clave filtrada o un bucle descontrolado en CI no afectan a producción ni agotan el presupuesto general. Guardalas en el gestor de secretos del sistema de CI, nunca en el repositorio. Y verificá de forma activa que no aparezcan en los logs ni en los artefactos, porque algunas herramientas imprimen la configuración completa al fallar.

## 4:27–5:00 · Slide 11: Paso 5 de 6

Paso 5. El costo como métrica.

Costo como métrica: reportá tokens y gasto por corrida junto al pass rate. Lo que no se mide, crece.

Publicá en cada corrida los tokens consumidos y el gasto, al lado de la tasa de aprobación. Lo que no se mide crece. Un dataset que se duplica, un juez que se agrega o una repetición más son todos cambios razonables que nadie suma. Con el número a la vista, cada cambio muestra su costo y el equipo puede decidir si vale la pena. También permite detectar anomalías: una corrida que cuesta diez veces lo habitual suele indicar un error, no más trabajo.

## 5:01–5:35 · Slide 12: Paso 6 de 6

Paso 6. Reproducibilidad.

Reproducibilidad: versiones fijas de herramientas (lockfile) y de modelos, y los resultados archivados con su ficha de corrida.

Dos cosas hacen reproducible una corrida. La primera es fijar versiones: las herramientas mediante el lockfile y la imagen del contenedor, y los modelos mediante su identificador exacto. La segunda es archivar los resultados con su ficha de corrida, la del día quince, durante un tiempo definido. Cuando alguien pregunte por qué un resultado cambió entre dos fechas, vas a poder comparar qué versión de cada cosa se usó en cada una, en lugar de intentar recordarlo.

## 5:36–6:10 · Slide 13: Ejemplo

Un ejemplo.

Un equipo revisa su pipeline de evals después de un mes con gastos más altos de lo previsto. Al publicar los tokens por corrida, descubren que el chequeo de formato, que corre en cada pull request, usa el modelo más caro. Lo pasan a un modelo local levantado como servicio en el runner. El formato se valida igual, y ese paso deja de tener costo. Los evals con juez siguen en la nube. Encuentran además que dos de sus tres runners eran persistentes y tenían versiones distintas de una herramienta, lo que explicaba resultados diferentes para el mismo commit. Los reemplazan por contenedores efímeros con la imagen fijada.

## 6:11–6:27 · Slide 14: Errores comunes

Los errores más comunes.

Usar el modelo más caro para chequeos que resuelve uno local.

Mantener runners persistentes con estado acumulado.

Dejar que un agente corra en CI con credenciales de producción.

Compartir una sola clave de API entre todos los entornos.

## 6:28–6:45 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Cada tipo de eval tiene asignado un modelo, con su justificación.

Los runners son efímeros y la imagen fija las versiones.

Los agentes corren en un sandbox sin credenciales de producción.

Cada corrida publica tokens y gasto junto al resultado.

## 6:46–6:56 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Un modelo local chico alcanza para smoke y formato, no para evaluar criterio. Elegir el modelo por costo sin medir calidad sale caro.

## 6:57–7:11 · Slide 17: La guía escrita

Eso fue el día 29. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 30: Observabilidad de LLM en producción: traces, evals online y alertas.
