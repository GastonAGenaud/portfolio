# Guion del video · Día 23: Modelo para pruebas de seguridad (2): red teaming automatizado

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d23-es.mp4`
- Duración del video: 6:52
- Voz sin pausas: 5:58

## 0:00–0:16 · Slide 1: Video guía

Día 23 de la serie 31 días de QA + IA.

Modelo para pruebas de seguridad (2): red teaming automatizado.

Un esquema de tres modelos (atacante, objetivo y evaluador) que genera pruebas adversas a partir de tu threat model y reporta la tasa de éxito por categoría.

## 0:17–0:34 · Slide 2: El problema

Con el modelo de amenazas de ayer tenés una lista de casos de abuso. Probarlos a mano, escribiendo variantes de ataques una por una, funciona para cinco casos y no para quinientos. Y los ataques reales no vienen de a uno: vienen reformulados, traducidos, repartidos en varios mensajes o disfrazados de otra cosa.

## 0:34–0:57 · Slide 3: Cómo encaja

El red teaming automatizado usa un modelo para generar esas variantes en volumen, las envía contra tu aplicación y usa otro modelo para decidir si el ataque tuvo éxito. Es potente y tiene límites claros: cuesta, genera contenido adverso y su veredicto también se equivoca. Esta guía muestra cómo configurarlo a partir de tu modelo de amenazas, cómo leer el reporte sin tomarlo como verdad y dónde ubicarlo en tu ciclo de pruebas.

## 0:57–1:14 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Solo contra sistemas propios o con autorización escrita, y en ambientes de prueba.

El threat model del día 22.

Tu asistente corriendo en local o staging con un endpoint HTTP.

Node.js 22+ y promptfoo.

## 1:14–1:20 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:20–1:23 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:24–2:00 · Slide 7: Paso 1 de 6

Paso 1. Autorización y entorno.

Confirmá autorización y ambiente. El red teaming genera contenido adverso: va contra staging, con datos de prueba.

Antes de correr nada, confirmá por escrito que tenés autorización para atacar ese sistema, y apuntá a un entorno de staging con datos de prueba. El red teaming genera contenido adverso a propósito y puede disparar acciones reales si el sistema tiene herramientas conectadas. Contra producción puede enviar mensajes, modificar registros o activar alertas de abuso del proveedor. Avisale también al equipo que opera el entorno. Una corrida que nadie esperaba se parece mucho a un incidente.

## 2:01–2:38 · Slide 8: Paso 2 de 6

Paso 2. Tres roles.

Entendé el esquema: un modelo atacante genera entradas adversas, tu aplicación es el objetivo, y un evaluador decide si el ataque tuvo éxito.

El esquema tiene tres piezas. Un modelo atacante genera entradas adversas. Tu aplicación es el objetivo y las recibe como si vinieran de un usuario. Un evaluador decide, para cada intercambio, si el ataque logró lo que buscaba. Entender esto ayuda a interpretar los resultados, porque dos de las tres piezas son modelos, con sus propios errores. Una tasa de éxito de ataque depende tanto de tu aplicación como de lo creativo que fue el atacante y de lo estricto que fue el evaluador.

## 2:39–3:16 · Slide 9: Paso 3 de 6

Paso 3. El propósito, con sus límites.

Describí el propósito del sistema con precisión, incluido lo que no debe hacer. Los ataques se generan en relación a esa descripción.

La configuración pide una descripción del sistema. De todo el archivo, es el campo que más influye en la calidad de los ataques. Escribí qué hace la aplicación, para quién y, sobre todo, qué no debe hacer nunca: revelar datos de otros clientes, dar asesoramiento médico, ejecutar acciones sin confirmación. Los ataques se generan en relación con esa descripción. Con un propósito vago recibís ataques genéricos, y un reporte que dice poco sobre tus riesgos.

## 3:16–3:58 · Slide 10: Paso 4 de 6

Paso 4. Plugins y estrategias desde el threat model.

Elegí plugins a partir de tu threat model, no todos. Cada plugin es una categoría de riesgo; cada estrategia, una forma de entregar el ataque. Los nombres cambian entre versiones: redteam init te ofrece los vigentes.

Cada plugin representa una categoría de riesgo y cada estrategia, una forma de entregar el ataque. La tentación es activar todo. Es caro, lento y produce un reporte imposible de leer. Elegí los plugins que corresponden a los riesgos que marcaste como aplicables ayer, y dos o tres estrategias. Los nombres cambian entre versiones de la herramienta, así que usá el comando de inicialización para ver los vigentes en lugar de copiarlos de un tutorial viejo.

## 3:59–4:38 · Slide 11: Paso 5 de 6

Paso 5. Leer el reporte y las conversaciones.

Corré y leé el reporte por categoría: tasa de éxito de ataque. Después abrí las conversaciones: el evaluador también da falsos positivos.

El reporte muestra una tasa de éxito de ataque por categoría. Sirve para saber dónde mirar, no para sacar conclusiones. Abrí las conversaciones marcadas como exitosas y leelas. Vas a encontrar hallazgos reales, y también falsos positivos: casos donde la aplicación se negó de forma correcta y el evaluador igual lo contó como fallo. Revisá además una muestra de los marcados como resistidos, porque los falsos negativos existen. Un hallazgo es una conversación que una persona leyó y confirmó.

## 4:39–5:12 · Slide 12: Paso 6 de 6

Paso 6. Corregir, repetir y programar.

Arreglá, volvé a correr y programalo: nocturno o por release. Por costo no conviene en cada PR.

Para cada hallazgo confirmado, decidí el arreglo, que puede ser un cambio de prompt, un filtro o un control de diseño, y volvé a correr la misma configuración. Guardá los ataques que tuvieron éxito como casos de regresión deterministas, para probarlos en cada cambio sin tener que generar nada. La corrida completa de red teaming va de forma programada, por noche o por release. Por costo y por duración no conviene en cada pull request.

## 5:13–5:49 · Slide 13: Ejemplo

Un ejemplo.

Un equipo corre red teaming contra el asistente de soporte de ayer, en staging, con cuatro plugins elegidos desde su modelo de amenazas. El reporte marca doce ataques exitosos sobre doscientos. Al leer las conversaciones, cinco son falsos positivos: el asistente se negó y ofreció derivar a una persona. Quedan siete reales. Cuatro logran que revele parte de sus instrucciones internas y tres consiguen datos de un pedido cambiando el número en un mensaje reformulado. El segundo grupo es grave. Lo corrigen validando en el código que el pedido pertenezca al usuario, no en el prompt. En la segunda corrida ese grupo queda en cero.

## 5:50–6:07 · Slide 14: Errores comunes

Los errores más comunes.

Correr contra producción o sin autorización escrita.

Activar todos los plugins en lugar de los del modelo de amenazas.

Reportar la tasa de éxito sin haber leído las conversaciones.

Arreglar con una frase en el prompt lo que requiere un control en código.

## 6:08–6:25 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Hay autorización escrita y el objetivo es staging con datos de prueba.

El propósito describe qué no debe hacer el sistema.

Los plugins salen de los riesgos aplicables del día anterior.

Cada hallazgo reportado fue leído y confirmado por una persona.

## 6:26–6:36 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El modelo evaluador produce falsos positivos y falsos negativos. Un reporte de red teaming sin revisión humana no es un hallazgo.

## 6:37–6:51 · Slide 17: La guía escrita

Eso fue el día 23. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 24: Seguridad (3): prompt injection en agentes con herramientas y cómo probar los controles.
