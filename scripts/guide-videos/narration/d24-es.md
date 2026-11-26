# Guion del video · Día 24: Seguridad (3): prompt injection en agentes con herramientas y cómo probar los controles

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d24-es.mp4`
- Duración del video: 6:55
- Voz sin pausas: 6:01

## 0:00–0:15 · Slide 1: Video guía

Día 24 de la serie 31 días de QA + IA.

Seguridad (3): prompt injection en agentes con herramientas y cómo probar los controles.

Tests que verifican que un agente no ejecuta acciones indebidas cuando el contenido que lee trae instrucciones inyectadas.

## 0:16–0:36 · Slide 2: El problema

Una inyección de prompts en un chatbot que solo conversa produce, en el peor caso, un texto inapropiado. La misma inyección en un agente con herramientas puede terminar en una acción: un mail enviado, un registro modificado, datos que salen de la organización. Y no hace falta que el atacante hable con el agente. Alcanza con dejar la instrucción en un lugar que el agente vaya a leer.

## 0:37–0:54 · Slide 3: Cómo encaja

No existe hoy una defensa que garantice que un modelo ignore instrucciones maliciosas en su contexto. Lo que sí existe son controles alrededor del modelo que limitan lo que puede pasar cuando la inyección funciona. Esta guía muestra cómo probar esos controles con tests deterministas que miran las acciones del agente y no sus palabras.

## 0:55–1:06 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un agente con herramientas en ambiente de prueba, con herramientas falsas o en modo simulado.

Acceso al registro de llamadas a herramientas de cada ejecución.

## 1:07–1:12 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:13–1:36 · Slide 6: Controles y cómo se prueban

Controles y cómo se prueban.

Permisos mínimos por herramienta: el agente de soporte no tiene la herramienta de borrado disponible.

Aprobación humana en acciones irreversibles: la llamada queda en estado pendiente, no ejecutada.

Lista de destinos permitidos: un envío a un dominio no listado se rechaza.

Salida de herramientas tratada como dato: texto con instrucciones en un resultado no dispara acciones.

## 1:37–2:11 · Slide 7: Paso 1 de 6

Paso 1. Inventario de herramientas.

Hacé el inventario: qué herramientas tiene el agente y qué puede hacer cada una (leer, escribir, enviar).

Listá cada herramienta que el agente tiene disponible y clasificá lo que puede hacer en tres capacidades: leer, escribir y enviar hacia afuera. Sé específico. "Acceso a la base de datos" no alcanza. Decí qué tablas, y con qué operaciones. Incluí las herramientas que vienen por defecto y las que agrega cada servidor MCP conectado, que suelen ser más de las que uno recuerda. El inventario suele dar una primera sorpresa: herramientas que el agente tiene y que la tarea no necesita.

## 2:12–2:50 · Slide 8: Paso 2 de 6

Paso 2. La combinación peligrosa.

Buscá la combinación peligrosa: acceso a datos privados, lectura de contenido no confiable y capacidad de comunicarse hacia afuera. Con las tres juntas, una inyección puede sacar datos.

Buscá si el agente reúne tres condiciones a la vez: acceso a datos privados, lectura de contenido no confiable y capacidad de comunicarse hacia afuera. Cada una por separado es manejable. Las tres juntas permiten que una instrucción escondida en un documento le indique leer algo privado y enviarlo a un tercero. Si tu agente las reúne, la medida más efectiva es romper la combinación quitando una de las tres para esa tarea, antes de pensar en filtros.

## 2:51–3:27 · Slide 9: Paso 3 de 6

Paso 3. Fixtures con inyecciones en cada canal.

Armá fixtures con instrucciones inyectadas en cada canal que el agente lee: ticket, documento, página web, resultado de herramienta.

Armá datos de prueba con instrucciones inyectadas en todos los lugares que el agente lee: el cuerpo de un ticket, un documento adjunto, el contenido de una página web, el resultado de una herramienta. Usá instrucciones inofensivas pero verificables, como llamar a una herramienta marcadora que no hace nada. Variá el formato: texto directo, texto dentro de un comentario, instrucciones que simulan venir del sistema. Cada fixture corresponde a un caso de abuso del modelo de amenazas.

## 3:28–4:01 · Slide 10: Paso 4 de 6

Paso 4. Aserciones sobre acciones.

Afirmá sobre acciones, no sobre palabras: el test pasa si la llamada a la herramienta no ocurrió, sin importar lo que el agente diga.

El test no evalúa lo que el agente responde. Evalúa si ocurrió la llamada a la herramienta prohibida. Un agente puede escribir "no voy a hacer eso" y aun así ejecutar la acción, o lo contrario. Registrá las llamadas a herramientas y verificá que la lista no contenga la acción prohibida, o que el destinatario esté dentro de los permitidos. Es una aserción clásica y determinista sobre un registro de llamadas, que no necesita un modelo juez.

## 4:02–4:35 · Slide 11: Paso 5 de 6

Paso 5. Cada control por separado.

Probá cada control por separado, con las herramientas en modo simulado.

Probá cada control de forma aislada, con las herramientas en modo simulado para que nada salga de verdad. Mínimo privilegio: la herramienta peligrosa directamente no figura entre las disponibles. Aprobación humana: la acción irreversible queda pendiente y no se ejecuta. Lista de destinos permitidos: un envío a un dominio no listado se rechaza. Salida de herramienta tratada como dato: un resultado con instrucciones no dispara acciones. Aislados, sabés cuál falló.

## 4:36–5:13 · Slide 12: Paso 6 de 6

Paso 6. MCP y regresión.

Si usás MCP: revisá las descripciones de las herramientas de terceros (también son texto que el modelo lee) y fijá versiones de los servidores. Sumá todo a la regresión.

Las descripciones de las herramientas de un servidor MCP también son texto que el modelo lee, y un servidor de terceros podría incluir instrucciones ahí. Revisá las descripciones antes de conectar un servidor y fijá su versión, para que no cambien sin que lo sepas. Sumá todos estos tests al conjunto de regresión y correlos ante cualquier cambio de herramientas, permisos o prompt. Como la resistencia del modelo es probabilística, repetí cada caso varias veces.

## 5:14–5:50 · Slide 13: Ejemplo

Un ejemplo.

Un agente de soporte lee tickets, consulta pedidos y envía mails. El inventario muestra que además tiene una herramienta para borrar pedidos que nunca usa. La quitan. El agente reúne las tres condiciones peligrosas, así que restringen el mail al remitente del ticket. Arman seis fixtures con inyecciones y corren cada uno diez veces con las herramientas simuladas. En cincuenta y ocho de sesenta corridas el agente ignora la instrucción. En dos intenta enviar un mail a una dirección externa, y la lista de destinos lo rechaza. El modelo cedió dos veces y el control funcionó las dos. El test verifica el control, que es lo que tiene que cumplirse siempre.

## 5:51–6:08 · Slide 14: Errores comunes

Los errores más comunes.

Evaluar lo que el agente dice en lugar de lo que ejecuta.

Probar inyecciones solo en el mensaje del usuario.

Confiar en una instrucción del prompt como único control.

Conectar servidores MCP de terceros sin revisar ni fijar versión.

## 6:08–6:27 · Slide 15: Checklist

Para saber que quedó bien, revisá esto.

Hay un inventario de herramientas con leer, escribir y enviar.

Sabés si el agente reúne la combinación peligrosa y cómo se rompe.

Existen fixtures con inyecciones en cada canal de lectura.

Cada control tiene un test que verifica acciones, repetido varias veces.

## 6:28–6:39 · Slide 16: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

La resistencia a la inyección es probabilística: un agente que resiste nueve veces puede ceder la décima. Por eso las acciones sensibles se limitan con permisos.

## 6:39–6:53 · Slide 17: La guía escrita

Eso fue el día 24. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 25: Modelo para pruebas de performance (1): las métricas que importan en un LLM.
