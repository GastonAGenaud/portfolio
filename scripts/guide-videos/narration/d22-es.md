# Guion del video · Día 22: Modelo para pruebas de seguridad (1): threat model con OWASP LLM y Agentic Top 10

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d22-es.mp4`
- Duración del video: 7:16
- Voz sin pausas: 6:22

## 0:00–0:14 · Slide 1: Video guía

Día 22 de la serie 31 días de QA + IA.

Modelo para pruebas de seguridad (1): threat model con OWASP LLM y Agentic Top 10.

Cómo armar el modelo de amenazas de una feature con IA y convertirlo en casos de abuso que se pueden probar.

## 0:15–0:32 · Slide 2: El problema

Las pruebas de seguridad de una aplicación con modelos suelen empezar por el final: alguien corre una herramienta de ataques, obtiene un reporte largo y no sabe qué hacer con él. Sin un modelo de amenazas, no hay forma de decidir cuáles de esos hallazgos importan para tu sistema ni qué riesgos quedaron sin probar porque ninguna herramienta los cubre.

## 0:33–0:54 · Slide 3: Cómo encaja

El threat modeling es la parte de pensar antes de atacar. Se dibuja el sistema, se marca dónde entra texto que no controlás y se recorren listas de riesgos conocidos para ver cuáles aplican. OWASP mantiene dos que sirven de guía: una para aplicaciones con LLM y otra para aplicaciones agénticas. Esta guía te lleva del dibujo a una tabla de amenazas con casos de abuso concretos y una decisión por cada uno.

## 0:55–1:15 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Una feature con IA propia o de práctica (un asistente de soporte sirve).

Las listas vigentes del OWASP GenAI Security Project (genai.owasp.org): Top 10 for LLM Applications, edición 2026, y Top 10 for Agentic Applications.

Solo sistemas propios o con autorización.

## 1:15–1:52 · Slide 5: Ejemplo de tabla de amenazas

Ejemplo de tabla de amenazas.

Chat: el mensaje del usuario es entrada no confiable. Riesgo: Prompt Injection. Caso de abuso: el usuario pide ignorar las reglas y ver datos de otro cliente. Se cubre con un test.

RAG: un documento subido es entrada no confiable. Riesgo: Prompt Injection indirecta. Caso de abuso: un documento trae instrucciones ocultas. Se cubre con test y control.

Tool de envío de email: la salida del modelo dispara una acción. Riesgo: Excessive Agency. Caso de abuso: el modelo envía un correo sin aprobación. Se cubre con un control de diseño.

## 1:52–2:31 · Slide 6: Paso 1 de 6

Paso 1. Dibujar el sistema.

Dibujá el sistema: entradas (usuario, documentos, web, herramientas), modelo, salidas y acciones que puede ejecutar.

Empezá por un diagrama simple con cuatro tipos de elementos: las entradas, el modelo, las salidas y las acciones. En entradas, listá todo lo que llega al modelo: mensajes del usuario, documentos recuperados, páginas web, resultados de herramientas e instrucciones del sistema. En acciones, todo lo que el sistema puede hacer además de responder: consultar una base, enviar un mail, modificar un registro. No hace falta una herramienta especial. Lo que importa es que el dibujo lo haga o lo valide alguien que conoce la arquitectura real.

## 2:31–3:07 · Slide 7: Paso 2 de 6

Paso 2. Fronteras de confianza.

Marcá las fronteras de confianza: todo lugar donde el modelo lee texto que no controla tu equipo.

Sobre el diagrama, marcá cada lugar donde el modelo lee texto que tu equipo no escribió ni controla. El mensaje del usuario es el caso evidente. Los menos evidentes son los que más problemas traen: un documento subido por un cliente, el contenido de una página web, un campo de texto libre en un ticket, la respuesta de una API de terceros. Para un modelo, todo eso es texto en su contexto, y no distingue de forma confiable entre un dato y una instrucción. Cada frontera es un punto de entrada posible.

## 3:08–3:48 · Slide 8: Paso 3 de 6

Paso 3. El Top 10 para aplicaciones con LLM.

Recorré el Top 10 de LLM Applications y marcá qué riesgos aplican. Prompt Injection sigue primero en la edición 2026 y Sensitive Information Disclosure segundo.

Recorré la lista riesgo por riesgo y, para cada uno, preguntá si aplica a tu diagrama. La inyección de prompts y la divulgación de información sensible encabezan la lista, y aplican a casi cualquier sistema. Otros dependen de la arquitectura: los riesgos de la cadena de suministro aplican si usás modelos o componentes de terceros; el manejo inseguro de la salida, si lo que genera el modelo termina ejecutándose o mostrándose sin validar. Marcá aplica o no aplica, con una línea de justificación.

## 3:49–4:24 · Slide 9: Paso 4 de 6

Paso 4. El Top 10 para aplicaciones agénticas.

Si el sistema tiene herramientas, memoria o actúa solo, sumá el Top 10 de Agentic Applications: ahí el riesgo ya no es lo que el modelo dice sino lo que hace.

Si tu sistema tiene herramientas, memoria o actúa sin aprobación en cada paso, sumá la segunda lista. El cambio de fondo es que el riesgo deja de ser lo que el modelo dice y pasa a ser lo que hace. Un texto incorrecto se puede corregir; un mail enviado o un registro borrado, no. Acá aparecen riesgos como el abuso de herramientas, el exceso de permisos y la manipulación de la memoria. Revisá cada herramienta de tu diagrama contra la lista.

## 4:25–4:59 · Slide 10: Paso 5 de 6

Paso 5. Casos de abuso concretos.

Por cada riesgo que aplica, escribí un caso de abuso concreto: quién, por dónde entra y qué logra.

Para cada riesgo que aplica, escribí un caso de abuso con tres partes: quién, por qué punto de entrada y qué logra. "Inyección de prompts" es una categoría. "Un cliente sube un PDF con texto oculto que le indica al asistente incluir en su respuesta los datos de otro cliente" es un caso de abuso. La diferencia es que el segundo se puede convertir en un test. Si no podés escribir el caso concreto, todavía no entendiste cómo ese riesgo se manifiesta en tu sistema.

## 4:59–5:37 · Slide 11: Paso 6 de 6

Paso 6. Priorizar y decidir.

Priorizá por impacto y exposición, y decidí qué se cubre con tests automatizados (día 23) y qué necesita un control de diseño: permisos mínimos o aprobación humana.

Ordená los casos por impacto y exposición: qué tan grave sería y qué tan fácil es llegar a ese punto de entrada. Después tomá una decisión para cada uno. Algunos se cubren con tests automatizados, que es el tema de mañana. Otros no se resuelven probando sino diseñando: quitarle una herramienta al agente, exigir aprobación humana antes de una acción irreversible, limitar los destinos posibles. Un control de diseño vale más que cien tests de un riesgo que no debería existir.

## 5:38–6:14 · Slide 12: Ejemplo

Un ejemplo.

Un equipo modela un asistente de soporte que lee tickets, consulta una base de pedidos y puede enviar mails. El diagrama muestra tres fronteras de confianza: el mensaje del usuario, los adjuntos del ticket y las respuestas de la API de envíos. De la primera lista aplican seis riesgos; de la segunda, cuatro. Escriben nueve casos de abuso. El de mayor impacto: un adjunto con instrucciones ocultas hace que el asistente envíe por mail los datos de un pedido ajeno. Deciden dos cosas. La herramienta de mail solo puede escribirle al remitente del ticket, un control de diseño. Y los otros ocho casos pasan a tests automatizados.

## 6:15–6:33 · Slide 13: Errores comunes

Los errores más comunes.

Correr una herramienta de ataques antes de tener el modelo de amenazas.

Considerar solo el mensaje del usuario como entrada no confiable.

Dejar los riesgos como categorías, sin casos de abuso concretos.

Querer cubrir con tests lo que se resuelve quitando un permiso.

## 6:33–6:52 · Slide 14: Checklist

Para saber que quedó bien, revisá esto.

El diagrama fue validado por alguien que conoce la arquitectura.

Todas las fronteras de confianza están marcadas.

Cada riesgo aplicable tiene un caso de abuso con quién, por dónde y qué logra.

Cada caso tiene una decisión: test, control de diseño o riesgo aceptado.

## 6:52–7:01 · Slide 15: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Un threat model generado sin tu arquitectura es una lista genérica. El dibujo del sistema lo hace quien lo conoce.

## 7:02–7:15 · Slide 16: La guía escrita

Eso fue el día 22. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 23: Modelo para pruebas de seguridad (2): red teaming automatizado.
