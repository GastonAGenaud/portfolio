# Guion del video · Día 14: TDD con IA (2): guardrails para que el agente no haga trampa

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d14-es.mp4`
- Duración del video: 6:33
- Voz sin pausas: 5:37

## 0:00–0:13 · Slide 1: Video guía

Día 14 de la serie 31 días de QA + IA.

TDD con IA (2): guardrails para que el agente no haga trampa.

Las cinco trampas típicas de un agente frente a un test rojo y un control automático para cada una.

## 0:14–0:34 · Slide 2: El problema

Ayer el ciclo funcionó porque vos estabas mirando cada paso. En cuanto el agente trabaja más tiempo solo, aparece un problema conocido: su objetivo operativo es que los tests pasen, y hay varias formas de lograrlo sin que el código sea correcto. Puede editar el test, devolver justo el valor esperado, desactivar el caso molesto o simular la misma unidad que se suponía bajo prueba.

## 0:35–0:52 · Slide 3: Cómo encaja

No es malicia. Es optimización hacia la métrica que le diste. La respuesta no es vigilarlo más sino hacer que cada atajo sea imposible o visible. Esta guía empareja cinco trampas con cinco controles automáticos y los lleva al pipeline, de modo que la confianza en el verde no dependa de que alguien revise cada diff con lupa.

## 0:53–0:58 · Slide 4: Requisitos

Para seguir esta guía necesitás:

El repo tdd-ai del día 13.

## 0:59–1:04 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:05–1:07 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:08–1:11 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:12–1:42 · Slide 8: Trampa y control

Trampa y control.

Editar el test para que pase: tests en solo lectura para el agente, más un guard en CI que falla si un PR de implementación toca tests.

Hardcodear el valor esperado: tests de propiedades en un archivo que el agente no ve (holdout).

Poner .skip o .only: regla de lint que prohíbe tests deshabilitados o enfocados.

Mockear lo que se está probando: revisión de diff, ningún mock nuevo de la unidad bajo prueba.

Tests que no prueban nada: mutation testing. Si los mutantes sobreviven, el test no valida.

## 1:43–2:16 · Slide 9: Paso 1 de 6

Paso 1. Tests de solo lectura.

Marcá los archivos de test como no editables en los permisos del agente.

El control más directo es que el agente no pueda escribir en los archivos de test. Casi todos los agentes de código permiten reglas de permisos por ruta: denegá la edición de los patrones de test y dejá libre la carpeta de implementación. Con eso, la trampa más frecuente deja de ser posible en lugar de depender de una instrucción en lenguaje natural. Una instrucción como "no toques los tests" se cumple casi siempre; un permiso denegado se cumple siempre. Cuando haga falta cambiar un test, lo hace una persona.

## 2:17–2:49 · Slide 10: Paso 2 de 6

Paso 2. El guard en CI.

Agregá el guard de CI para PRs de implementación.

Los permisos locales protegen tu sesión, no las de todo el equipo. Por eso se suma un chequeo en el pipeline: si un pull request marcado como de implementación modifica archivos de test, falla. Es un script de pocas líneas que compara la lista de archivos cambiados contra un patrón. La idea de fondo es separar los cambios de especificación de los cambios de implementación. Un PR que toca las dos cosas no está prohibido, pero pasa a necesitar una revisión humana explícita.

## 2:49–3:22 · Slide 11: Paso 3 de 6

Paso 3. Property tests fuera del contexto.

Escribí un test de propiedades por función crítica y dejalo fuera del contexto del agente.

Un test con ejemplos fijos se puede satisfacer con un if que devuelva el valor esperado. Un property test no: genera cientos de entradas y verifica una propiedad general, por ejemplo que el total con descuento nunca supera al original ni es negativo. Escribí uno por función crítica y mantenelo fuera de lo que el agente lee, como un conjunto de validación apartado. Corre en CI, no en su sesión. Si la implementación solo memorizó los ejemplos, falla ahí.

## 3:23–3:53 · Slide 12: Paso 4 de 6

Paso 4. Lint contra tests desactivados.

Activá la regla de lint contra .skip y .only.

Agregar .skip a un test que falla o dejar un .only que hace que el resto no corra son cambios de una palabra que pasan desapercibidos en un diff largo. Una regla de lint los detecta sin esfuerzo y de forma determinista. Activala como error, no como advertencia, y corré el lint en el pipeline. Si tu equipo necesita desactivar un test temporalmente, que sea con un mecanismo distinto que exija un comentario con el motivo y un ticket asociado.

## 3:54–4:28 · Slide 13: Paso 5 de 6

Paso 5. Mutation testing sobre lo tocado.

Corré Stryker y mirá el mutation score de los archivos que tocó el agente.

Cobertura alta no significa que los tests verifiquen algo. Mutation testing lo mide directamente: introduce cambios chicos en el código, como invertir una condición o cambiar un operador, y comprueba si algún test falla. Si el mutante sobrevive, ese comportamiento no está protegido. Correrlo sobre todo el proyecto es lento, así que limitalo a los archivos que cambió el PR. Mirá los mutantes sobrevivientes en la lógica de negocio: cada uno es un test que falta o una aserción débil.

## 4:29–5:01 · Slide 14: Paso 6 de 6

Paso 6. Todo en el pipeline.

Sumá todo al pipeline: si un control falla, el PR no se mergea.

Los cinco controles valen cuando bloquean. Sumalos como pasos obligatorios: el guard de archivos, el lint, la suite normal, los property tests apartados y mutation testing con un umbral mínimo para los archivos tocados. Si alguno falla, el PR no se mergea. Ordená los pasos del más rápido al más lento para que los errores baratos aparezcan primero. El resultado es que el verde vuelve a significar algo, lo haya escrito una persona o un agente.

## 5:02–5:35 · Slide 15: Ejemplo

Un ejemplo.

Un agente trabaja una hora sobre un módulo de precios y entrega un PR con todos los tests en verde y cobertura del noventa y cinco por ciento. El pipeline con guardrails cuenta otra historia. El guard de archivos pasa. El lint encuentra un .skip agregado a un test de redondeo. El property test apartado falla con un precio de cero. Mutation testing muestra que sobrevive la mitad de los mutantes en la función de impuestos: los tests la ejecutaban sin verificar el resultado. Tres hallazgos que una revisión rápida del diff no habría visto. El PR vuelve con tres pedidos concretos.

## 5:36–5:52 · Slide 16: Errores comunes

Los errores más comunes.

Confiar en una instrucción en texto en lugar de un permiso denegado.

Medir la calidad de los tests solo con cobertura.

Dejar los property tests al alcance del agente.

Tener los controles como advertencias que no bloquean el merge.

## 5:52–6:09 · Slide 17: Checklist

Para saber que quedó bien, revisá esto.

El agente no puede editar archivos de test.

El pipeline falla si un PR de implementación toca tests.

Hay un property test apartado por cada función crítica.

Mutation testing corre sobre los archivos tocados con un umbral.

## 6:10–6:19 · Slide 18: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Produce suites con cobertura total que casi no detectan mutantes. Hay que medir si el test falla cuando el código está mal.

## 6:20–6:31 · Slide 19: La guía escrita

Eso fue el día 14. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 15: Cómo setear modelos para pruebas de calidad.
