# Guion del video · Día 13: TDD con IA (1): red, green, refactor con un agente

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d13-es.mp4`
- Duración del video: 6:08
- Voz sin pausas: 5:15

## 0:00–0:13 · Slide 1: Video guía

Día 13 de la serie 31 días de QA + IA.

TDD con IA (1): red, green, refactor con un agente.

Tres ciclos de TDD donde vos escribís el test y el agente escribe la implementación mínima, sin tocar el test.

## 0:14–0:32 · Slide 2: El problema

TDD siempre tuvo un costo de disciplina: escribir el test antes cuando la solución ya está en tu cabeza cuesta. Con un agente que escribe la implementación en segundos, la tentación se invierte. Lo fácil es pedir "implementá esta función con sus tests" y recibir todo junto, con tests que pasan porque fueron escritos mirando el código que tenían que verificar.

## 0:33–0:51 · Slide 3: Cómo encaja

El ciclo rojo, verde, refactor ordena esa relación con una regla de autoría: el test es tuyo y la implementación es del agente. El test se vuelve la especificación ejecutable y también el control de calidad de lo que el agente produce. Esta guía recorre el ciclo completo con una función chica, para que el hábito quede antes de aplicarlo a algo grande.

## 0:52–0:58 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Node.js 22+, un agente de código y un repo vacío.

## 0:59–1:05 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:05–1:08 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:09–1:11 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:12–1:45 · Slide 8: Paso 1 de 6

Paso 1. Rojo: un test, escrito por vos.

Rojo: escribí vos un solo test. El test es la especificación y es tuyo.

Escribí un solo test que describa un comportamiento concreto, con un nombre que se lea como una regla de negocio. Uno solo, no la suite completa. Al escribirlo tomás decisiones de diseño que no conviene delegar: cómo se llama la función, qué recibe, qué devuelve y qué pasa con una entrada inválida. Ese es el trabajo de pensar. Si le pedís el test al agente, esas decisiones las toma él, y después vas a estar revisando una especificación que no escribiste.

## 1:46–2:19 · Slide 9: Paso 2 de 6

Paso 2. Fallar por la razón correcta.

Corré npx vitest run y confirmá que falla por el motivo correcto (la función no existe o devuelve otra cosa), no por un error de import.

Corré el test y leé el mensaje. Tiene que fallar porque la función no existe o porque devuelve otra cosa, no por un error de import, de configuración o de sintaxis. Es un paso que se saltea con frecuencia y que evita un problema clásico: un test que nunca pudo fallar por la razón que importa. Si el mensaje de error es confuso, mejoralo ahora. Ese mismo mensaje es lo que el agente va a leer para saber qué tiene que construir.

## 2:20–2:54 · Slide 10: Paso 3 de 6

Paso 3. Verde: lo mínimo, sin tocar tests.

Verde: pedí al agente el código mínimo para pasar ese test, con la instrucción explícita de no modificar tests.

Pedile al agente el código mínimo para pasar ese test, con dos instrucciones explícitas: no modificar archivos de test y no agregar nada que el test no pida. La palabra mínimo importa. Sin ella vas a recibir validaciones, casos y parámetros opcionales que nadie especificó y que ningún test cubre. Es código que parece útil y que queda sin dueño: nadie sabe si funciona ni si debería existir. Si después hace falta, lo agregás con su propio test.

## 2:55–3:27 · Slide 11: Paso 4 de 6

Paso 4. Verificar el verde vos.

Verificá vos el verde corriendo el comando. Revisá el diff: solo debería haber cambiado src/discount.ts.

Corré el comando vos y mirá el resultado. Después revisá el diff. En este ejercicio solo debería haber cambiado el archivo de implementación. Si cambió el test, la configuración o apareció un archivo nuevo, preguntate por qué antes de seguir. Son treinta segundos que sostienen todo el método: el verde vale porque lo produjo un test que el agente no pudo ajustar y porque lo comprobaste por fuera de su resumen.

## 3:28–4:01 · Slide 12: Paso 5 de 6

Paso 5. Refactor con la red puesta.

Refactor: pedí una mejora de legibilidad manteniendo los tests en verde. Commit.

Con el test en verde, pedí una mejora de legibilidad sin cambio de comportamiento: nombres más claros, una constante en lugar de un número suelto, una función extraída. Volvé a correr los tests. Este es el paso donde el agente aporta más con menos riesgo, porque cualquier error lo detecta el test al instante. Commiteá al terminar. Si el refactor rompe algo y no es evidente por qué, descartarlo cuesta un comando, y volvés a un estado conocido.

## 4:02–4:33 · Slide 13: Paso 6 de 6

Paso 6. Un ciclo, un commit.

Repetí con el segundo y el tercer test. Un commit por ciclo deja un historial que se puede auditar.

Repetí el ciclo con el segundo y el tercer comportamiento, y hacé un commit por ciclo. El historial queda como una secuencia de reglas agregadas de a una, cada una con su test y su implementación. Eso sirve para revisar y para auditar: quien lea el historial puede ver qué se pidió, qué se construyó y en qué orden. También te da puntos de retorno baratos si un ciclo sale mal, algo que con cambios grandes generados de una vez no tenés.

## 4:34–5:13 · Slide 14: Ejemplo

Un ejemplo.

La función a construir aplica descuentos. Primer test, escrito a mano: un cupón del diez por ciento sobre cien devuelve noventa. Falla porque la función no existe. El agente escribe cuatro líneas y el test pasa; el diff toca un solo archivo. Refactor: extrae el cálculo del porcentaje. Commit. Segundo test: un descuento mayor al cien por ciento lanza un error. El agente agrega la validación. Tercer test: el resultado se redondea a dos decimales. En el segundo ciclo, el agente había sumado además soporte para cupones de monto fijo que nadie pidió. Se quita, porque ningún test lo exige. Quedan tres commits y tres reglas.

## 5:14–5:27 · Slide 15: Errores comunes

Los errores más comunes.

Pedir implementación y tests en el mismo pedido.

No comprobar que el test falla antes de implementar.

Dejar código extra que ningún test exige.

Juntar varios ciclos en un solo commit.

## 5:28–5:44 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

Cada test fue escrito por vos antes que su implementación.

Viste cada test fallar por la razón esperada.

Ningún diff de implementación tocó archivos de test.

El historial tiene un commit por ciclo.

## 5:44–5:53 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Tiende a implementar de más: funciones y casos que ningún test pide. Código sin test que lo pida es código sin dueño.

## 5:54–6:07 · Slide 18: La guía escrita

Eso fue el día 13. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 14: TDD con IA (2): guardrails para que el agente no haga trampa.
