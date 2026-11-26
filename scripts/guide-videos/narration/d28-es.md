# Guion del video · Día 28: Evals en CI: quality gates para features con IA

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d28-es.mp4`
- Duración del video: 6:40
- Voz sin pausas: 5:43

## 0:00–0:14 · Slide 1: Video guía

Día 28 de la serie 31 días de QA + IA.

Evals en CI: quality gates para features con IA.

Cómo llevar los evals al pipeline en tres niveles (PR, nocturno y release) con un gate que bloquea el merge y un costo controlado.

## 0:14–0:35 · Slide 2: El problema

Un eval que corre solo cuando alguien se acuerda termina sin correr. La forma de que la calidad de una funcionalidad con IA se sostenga en el tiempo es la misma que para el resto del software: un gate en el pipeline que bloquea el cambio cuando algo empeora. Lo que cambia son las restricciones. Los evals cuestan dinero por corrida, tardan más que un test unitario y su resultado varía.

## 0:35–0:54 · Slide 3: Cómo encaja

Meter todos los evals en cada pull request vuelve el pipeline lento y caro, y el equipo termina salteándolo. No meter ninguno deja pasar regresiones. Esta guía organiza los evals en tres niveles, por PR, nocturno y por release, cada uno con un alcance, un costo y una consecuencia distintos, y muestra cómo mantener el gasto bajo control.

## 0:55–1:08 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Un repo con evals (día 8) y golden dataset (día 17).

CI: GitHub Actions o Jenkins.

Una API key guardada como secreto del CI, con límite de gasto.

## 1:09–1:14 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:15–1:17 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:18–1:43 · Slide 7: Los tres niveles

Los tres niveles.

PR: corre cuando cambian prompts, evals o código de IA. Set dev reducido, 3 corridas, checks de formato y contenido. Bloquea el merge.

Nocturno: todas las noches. Set de test completo x5, juez y red teaming. Alerta al equipo y muestra tendencia.

Release: antes de publicar. Regresión completa más performance. Aprueba una persona.

## 1:44–2:17 · Slide 8: Paso 1 de 6

Paso 1. El nivel de PR.

Empezá por el nivel PR: un subset chico y rápido que corre solo cuando cambian prompts, evals o código de IA.

Es un subconjunto chico y rápido, pensado para dar una respuesta en pocos minutos. Corre solo cuando el cambio toca prompts, configuración de evals o código que llama al modelo. Para un cambio de estilos en el frontend no tiene sentido gastar tokens. Incluí los chequeos deterministas de formato y contenido, y un conjunto reducido de casos con pocas repeticiones. Su función no es medir la calidad con precisión, sino atrapar las roturas evidentes antes del merge.

## 2:18–2:51 · Slide 9: Paso 2 de 6

Paso 2. El código de salida como gate.

El comando de eval devuelve un código de salida distinto de cero si hay casos que fallan. Eso alcanza para bloquear el merge.

El mecanismo es el mismo de cualquier test. El comando de evaluación termina con un código distinto de cero cuando hay casos fallidos, y el pipeline marca el paso en rojo. Con eso alcanza para bloquear el merge mediante las reglas de protección de la rama. No hace falta construir nada especial. Sí hay que verificar que funciona: forzá un fallo a propósito en una rama de prueba y confirmá que el pull request queda bloqueado.

## 2:52–3:23 · Slide 10: Paso 3 de 6

Paso 3. Artefactos siempre, también en fallo.

Guardá el resultado como artefacto siempre, también cuando falla. Sin el detalle nadie puede diagnosticar.

Configurá el paso que guarda los resultados para que se ejecute aunque el eval falle. Es un detalle de configuración que se olvida seguido, y entonces el pipeline queda en rojo sin ninguna información sobre qué caso falló ni qué respondió el modelo. El artefacto tiene que incluir entradas, salidas y veredictos por caso. Con ese archivo, quien abrió el PR puede diagnosticar en minutos sin volver a correr todo en su máquina.

## 3:24–3:58 · Slide 11: Paso 4 de 6

Paso 4. Controlar el costo.

Controlá el costo: filtro por paths, caché de respuestas, subset en PR y una API key de CI con tope de gasto.

Hay cuatro palancas. Filtros por ruta, para no correr evals en cambios que no los afectan. Caché de respuestas, para no pagar dos veces por la misma entrada con el mismo prompt. Un subconjunto en el nivel de PR en lugar del conjunto completo. Y una clave de API exclusiva de CI con tope de gasto, de modo que un error de configuración o un bucle no consuman el presupuesto del mes. Publicá el gasto de cada corrida junto al resultado.

## 3:58–4:33 · Slide 12: Paso 5 de 6

Paso 5. El nivel nocturno.

Sumá el nivel nocturno con el set completo, cinco corridas, el juez y el red teaming. Ahí mirás tendencia, no un PR puntual.

Una vez por día, con el conjunto de test completo, cinco repeticiones, el juez calibrado y el red teaming. Acá sí se mide con precisión. El resultado no bloquea un PR en particular: alerta al equipo y alimenta un gráfico de tendencia. Es donde vas a detectar los problemas que ningún PR introdujo, como una actualización silenciosa del proveedor o una degradación gradual. Como corre de noche, el tiempo y el costo son más tolerables.

## 4:33–5:05 · Slide 13: Paso 6 de 6

Paso 6. El nivel de release.

En release corré regresión y performance, y dejá la decisión final a una persona con el reporte adelante.

Antes de publicar corren la regresión completa y las pruebas de performance. La diferencia con los otros niveles es quién decide. Acá el resultado es un reporte que una persona lee y firma. Los gates automáticos cubren lo que se puede expresar como umbral. La decisión de salir con una métrica en el límite o con un riesgo conocido es un juicio de negocio, y alguien tiene que hacerse responsable de ella con la información delante.

## 5:06–5:40 · Slide 14: Ejemplo

Un ejemplo.

Un equipo arma los tres niveles. El de PR corre quince casos con tres repeticiones, solo ante cambios en las carpetas de prompts y evals, y tarda cuatro minutos. La primera semana bloquea un pull request donde un cambio de redacción rompía el formato JSON en dos casos. El autor abre el artefacto, ve las dos salidas y lo corrige en diez minutos. El nivel nocturno corre ciento veinte casos con cinco repeticiones. Un martes, la tasa de aprobación cae cuatro puntos sin que hubiera ningún PR mergeado. La ficha de corrida muestra que el modelo que respondió no era el esperado, por un alias sin fijar que nadie había notado.

## 5:41–5:56 · Slide 15: Errores comunes

Los errores más comunes.

Correr el conjunto completo en cada pull request.

No guardar artefactos cuando el eval falla.

Usar en CI una clave de API sin tope de gasto.

Tratar un verde aislado como prueba de que la calidad se mantiene.

## 5:57–6:14 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

El nivel de PR corre solo ante cambios relevantes y en pocos minutos.

Un fallo forzado bloquea el merge.

Los resultados se guardan como artefacto también cuando falla.

Existe un nivel nocturno con tendencia y una clave con tope.

## 6:15–6:24 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

El mismo código puede pasar un gate y fallar horas después. Con modelos, un verde puntual no reemplaza a la tendencia.

## 6:25–6:39 · Slide 18: La guía escrita

Eso fue el día 28. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 29: Infra de QA con IA: runners efímeros, modelos locales, secretos y costos.
