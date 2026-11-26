# Guion del video · Día 4: Tu laboratorio de QA con IA: setup completo en 30 minutos

Texto que narra el video, slide por slide. Los tiempos son los del video publicado: si tu lectura dura más o menos, las slides se pueden re-sincronizar con tu audio.

- Video: `public/publications/qa-ai/videos/d04-es.mp4`
- Duración del video: 6:10
- Voz sin pausas: 5:18

## 0:00–0:14 · Slide 1: Video guía

Día 4 de la serie 31 días de QA + IA.

Tu laboratorio de QA con IA: setup completo en 30 minutos.

El repo de laboratorio que se usa el resto de la serie: modelo local, herramienta de evals, Playwright y manejo de secretos.

## 0:15–0:34 · Slide 2: El problema

La mayoría de los tutoriales de IA aplicada a testing asumen que ya tenés un entorno funcionando, una API key con crédito y tiempo para pelear con versiones. En la práctica, ese arranque es donde mucha gente abandona. Esta guía resuelve el punto de partida: un repositorio chico, reproducible y gratuito, que vas a reutilizar en todos los días que siguen.

## 0:35–0:53 · Slide 3: Cómo encaja

La decisión central es trabajar con un modelo local. No es el más capaz, pero tiene tres ventajas para aprender: no cuesta nada, ningún dato sale de tu máquina y sus errores son frecuentes, lo cual es ideal para practicar cómo medirlos. Cuando necesites más calidad, cambiar a un modelo en la nube es una línea de configuración.

## 0:53–1:06 · Slide 4: Requisitos

Para seguir esta guía necesitás:

Node.js 22+ y Python 3.10+.

Git.

Ollama, para correr un modelo local sin costo.

Opcional: API key de un proveedor.

## 1:07–1:12 · Slide 5: Setup

Este es el setup. Pausá el video si querés copiarlo: está completo en la guía escrita.

## 1:13–1:16 · Slide 6: Setup

Y este es el siguiente archivo del setup.

## 1:16–1:19 · Slide 7: Setup

Y este es el siguiente archivo del setup.

## 1:20–1:53 · Slide 8: Paso 1 de 6

Paso 1. Versiones primero.

Verificá versiones de Node, Python y Git. Si Node es menor a 22, actualizá primero.

Corré los tres comandos de versión antes de instalar nada. Las herramientas de evals y los agentes de código piden versiones recientes de Node, y buena parte de los errores raros de instalación vienen de un Node viejo. Si usás un gestor de versiones, fijá la versión en un archivo como .nvmrc para que cualquiera que clone el repo use la misma. Python lo vas a necesitar más adelante para evals de RAG y para medir performance, así que conviene dejarlo verificado desde ahora.

## 1:53–2:28 · Slide 9: Paso 2 de 6

Paso 2. Un modelo local.

Instalá Ollama, bajá llama3.2 y probá que responde. Con esto tenés un modelo gratis y sin mandar datos afuera.

Ollama corre modelos en tu máquina y expone una API compatible con la de OpenAI en el puerto 11434. Eso significa que casi cualquier herramienta que sepa hablar con un proveedor en la nube puede hablar con tu modelo local cambiando la URL. Un modelo chico alcanza para empezar y corre sin placa de video dedicada, más lento. Probá que responda desde la terminal antes de seguir: si ese paso falla, todo lo demás va a fallar con errores menos claros.

## 2:28–3:01 · Slide 10: Paso 3 de 6

Paso 3. Estructura del repo.

Creá el repo qa-ai-lab con las carpetas evals, tests, data y prompts.

Cuatro carpetas con un propósito cada una. En evals van las configuraciones de evaluación. En tests, los tests de Playwright. En data, los datasets y los schemas. En prompts, las plantillas de prompt como archivos de texto. Separar los prompts del código tiene una razón práctica: se pueden versionar, comparar entre versiones y revisar en un pull request igual que cualquier otro cambio. Un prompt embebido en un string dentro del código no se revisa nunca.

## 3:02–3:36 · Slide 11: Paso 4 de 6

Paso 4. Dependencias de desarrollo.

Instalá promptfoo y Playwright como dependencias de desarrollo, así las versiones viajan con el repo.

Instalá promptfoo y Playwright como dependencias de desarrollo del proyecto, no de forma global. Así las versiones quedan registradas en el lockfile y dos personas con el mismo repo obtienen el mismo resultado. Con herramientas que cambian cada pocas semanas, una instalación global distinta en cada máquina es una fuente constante de diferencias inexplicables. Instalá solo Chromium por ahora: para lo que sigue no hacen falta los otros navegadores y la descarga es bastante más liviana.

## 3:37–4:08 · Slide 12: Paso 5 de 6

Paso 5. Secretos fuera del repo.

Secretos: las API keys van en .env, y .env va en .gitignore antes del primer commit.

Aunque hoy trabajes solo con un modelo local, dejá resuelto el manejo de secretos antes del primer commit. Las API keys van en un archivo .env que está en .gitignore. Subí en cambio un .env.example con los nombres de las variables y sin valores, para documentar qué hace falta. Una key que llega a un repositorio, aunque sea privado, hay que darla por comprometida y rotarla; prevenirlo cuesta una línea.

## 4:08–4:41 · Slide 13: Paso 6 de 6

Paso 6. El smoke eval.

Corré el smoke eval. Si ves un caso en verde en la tabla y en el visor web, el laboratorio está listo.

El archivo de ejemplo tiene un prompt con una variable, un provider local y un test con un assert que no depende de mayúsculas. Correrlo verifica toda la cadena: la herramienta instalada, el modelo respondiendo y el assert evaluando. El visor web muestra cada caso con su entrada, su salida y el resultado. Dejalo como primer paso de cualquier sesión de trabajo: si el smoke eval falla, el problema es de entorno y no de lo que estés probando.

## 4:41–5:12 · Slide 14: Ejemplo

Un ejemplo.

Una tester sigue los pasos en una notebook de trabajo sin placa de video. Node estaba en la versión 18 y la instalación de promptfoo mostraba advertencias; actualiza a la 22 y desaparecen. Baja el modelo local y la primera respuesta tarda varios segundos, lo cual es esperable en esa máquina. Crea el repo, agrega .env al .gitignore y corre el smoke eval: un caso en verde. Después agrega un segundo test con otro país y lo corre de nuevo. En media hora tiene un entorno que puede clonar en otra máquina y obtener el mismo resultado.

## 5:12–5:30 · Slide 15: Errores comunes

Los errores más comunes.

Instalar las herramientas de forma global y perder el control de versiones.

Hacer el primer commit antes de agregar .env al .gitignore.

Saltear la prueba del modelo en la terminal y depurar después errores confusos.

Dejar los prompts como strings dentro del código.

## 5:31–5:47 · Slide 16: Checklist

Para saber que quedó bien, revisá esto.

Node 22 o superior, Python y Git verificados.

El modelo local responde desde la terminal.

El repo tiene las cuatro carpetas y .env ignorado.

El smoke eval muestra dos casos en verde en el visor.

## 5:48–5:56 · Slide 17: Lo que la IA no hizo bien

Y lo que la IA no hizo bien.

Los asistentes sugieren flags y versiones viejas. Un comando no corrido es una hipótesis.

## 5:56–6:09 · Slide 18: La guía escrita

Eso fue el día 4. En la guía escrita, en gastongenaud.com, tenés el código para copiar y las preguntas frecuentes.

Seguí con el día 5: Casos de prueba desde user stories: el prompt que sí funciona.
