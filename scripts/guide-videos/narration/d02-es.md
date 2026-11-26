# Guion del video · Día 2: Cómo se está reorientando el rol SDET en el mundo de la IA

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d02-es.mp4`
- Duración del video: 6:06
- Voz sin pausas: 5:17

## 0:00–0:13 · Slide 1: Video guía

Día 2 de la serie 31 días de QA + IA.

Cómo se está reorientando el rol SDET en el mundo de la IA.

Qué cambia y qué no en el rol SDET, y cómo armar tu matriz de habilidades para los próximos 30 días.

## 0:14–0:34 · Slide 2: El problema

La pregunta que más se repite en la comunidad de testing es si la IA va a reemplazar al SDET. Es una pregunta mal planteada: el trabajo no desaparece, cambia de lugar. Escribir un test dejó de ser la parte escasa, porque un agente lo hace en segundos. Lo escaso ahora es saber qué vale la pena probar, darle contexto a quien lo escribe y poder afirmar que el resultado es confiable.

## 0:35–0:47 · Slide 3: Cómo encaja

Esta guía describe ese corrimiento con cuatro competencias nuevas y tres que no cambian, y termina con una matriz para medirte sin autoengaño. No es una lista de herramientas de moda: es un mapa de habilidades con evidencia verificable para cada una.

## 0:48–0:58 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Una hoja de cálculo o una página de notas.

Tu descripción de puesto actual.

30 minutos de honestidad.

## 0:59–1:35 · Slide 5: Paso 1 de 6

Paso 1. Antes y ahora, por escrito.

Escribí qué hacías hace dos años y qué hacés hoy. El cambio de fondo: de escribir cada test a diseñar, guiar, revisar y validar sistemas que testean.

Tomá tu descripción de puesto y tus últimas diez tareas. Para cada una preguntate qué parte fue producir (escribir código de test, datos, reportes) y qué parte fue decidir (qué cubrir, qué riesgo aceptar, qué resultado creer). Hace dos años la mayor parte del tiempo se iba en producir. Hoy esa parte se abarata y la de decidir pesa más. Verlo escrito con tus propias tareas evita discutir en abstracto y te muestra cuánto de tu semana ya cambió.

## 1:36–2:18 · Slide 6: Paso 2 de 6

Paso 2. Las cuatro competencias nuevas.

Sumá las cuatro competencias nuevas: contexto para agentes (reglas, skills, specs), evals para salidas no deterministas, revisión de tests generados por IA, y costo e infraestructura (tokens, CI, runners).

Contexto para agentes es escribir reglas, convenciones y especificaciones que un agente pueda seguir sin vos al lado. Evals es medir salidas que no son iguales dos veces, con datasets y umbrales. Revisión de tests generados es detectar relleno: aserciones débiles, casos duplicados, mocks de lo que se debería probar. Costo e infraestructura es saber cuánto cuesta cada corrida en tokens y minutos de CI, y dónde corre cada cosa. Ninguna reemplaza a la automatización clásica: se apoyan en ella.

## 2:19–2:55 · Slide 7: Paso 3 de 6

Paso 3. Lo que no cambia.

Marcá lo que no cambia: pensar en riesgo, diseñar buenos casos y conocer el sistema. Eso es lo que la IA no trae.

Pensar en riesgo es decidir dónde un fallo le duele al negocio y concentrar ahí el esfuerzo. Diseñar buenos casos es conocer técnicas como particiones, bordes y tablas de decisión, y saber cuándo aplicar cada una. Conocer el sistema es entender sus dependencias, sus datos y sus puntos frágiles. Un agente sin estas tres cosas genera cobertura numérica, no calidad. Son además las habilidades que te permiten revisar lo que el agente produce, así que su valor sube, no baja.

## 2:55–3:29 · Slide 8: Paso 4 de 6

Paso 4. La matriz de habilidades.

Armá la matriz: una fila por competencia, columnas Nivel hoy (0 a 3), Evidencia y Próximo paso.

Usá una fila por competencia: las cuatro nuevas y las tres que no cambian. En la columna de nivel poné un número de cero a tres, donde cero es no lo hice nunca, uno es lo probé, dos es lo uso en un proyecto real y tres es puedo enseñarlo. En evidencia, un enlace o un artefacto concreto: un repo, un pipeline, un reporte. Si no hay evidencia, el nivel no puede ser mayor que uno. Esa regla es la que vuelve honesta a la matriz.

## 3:29–3:59 · Slide 9: Paso 5 de 6

Paso 5. Dos focos, no siete.

Elegí dos competencias con nivel 0 o 1 y atales un día de esta serie.

Mejorar todo a la vez no funciona. Elegí las dos filas con nivel más bajo que además importen para tu trabajo actual o para el que buscás. A cada una asignale un día de esta serie y una fecha: por ejemplo, evals con el día ocho y costo e infraestructura con el día veintinueve. El próximo paso tiene que ser un entregable chico y visible, como un eval harness con diez casos o un job que publique tokens por corrida.

## 4:00–4:32 · Slide 10: Paso 6 de 6

Paso 6. Evidencia en tu perfil.

Actualizá tu perfil con evidencia concreta: un repo con evals vale más que "experiencia con IA".

Un perfil que dice "experiencia con IA aplicada a testing" no se distingue de otros mil. Uno que enlaza un repositorio con un eval harness, un pipeline con un quality gate y un caso escrito de triage sí. Cuando termines cada entregable, sumalo con una frase que diga qué mide y qué decisión permitió tomar. En entrevistas, esa evidencia te deja hablar de experiencia propia en lugar de repetir teoría, y eso es lo que un entrevistador técnico busca.

## 4:32–5:07 · Slide 11: Ejemplo

Un ejemplo.

Un SDET con seis años de experiencia completa la matriz. En diseño de casos y conocimiento del sistema se pone tres, con evidencia de sobra. En contexto para agentes se pone uno: usó un asistente, pero nunca escribió reglas para el repo. En evals, cero. En revisión de tests generados, uno. En costo, cero. Elige evals y contexto para agentes como focos. En tres semanas arma un AGENTS.md para su repo de automation y un eval de diez casos para el clasificador de bugs del equipo. Su perfil pasa de una frase genérica a dos enlaces con una línea de explicación cada uno.

## 5:08–5:25 · Slide 12: Errores comunes

Los errores más comunes.

Ponerte nivel alto sin un artefacto que lo respalde.

Elegir como foco la herramienta de moda en lugar de la competencia que te falta.

Abandonar diseño de casos y riesgo porque "eso lo hace la IA".

Planear siete mejoras en paralelo y no terminar ninguna.

## 5:26–5:43 · Slide 13: Checklist

Para saber que quedó bien, revisá esto.

La matriz tiene siete filas con nivel, evidencia y próximo paso.

Ningún nivel mayor a uno carece de evidencia enlazada.

Elegiste dos focos con fecha y entregable.

Tu perfil enlaza al menos un artefacto verificable.

## 5:44–5:52 · Slide 14: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Le pedí a un modelo que evaluara mi nivel y me puso todo en "avanzado". No sirve para autoevaluarte: te halaga.

## 5:53–6:05 · Slide 15: La guía escrita

Eso fue el día 2. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 3: Las nuevas formas de probar: de asserts a evals.
