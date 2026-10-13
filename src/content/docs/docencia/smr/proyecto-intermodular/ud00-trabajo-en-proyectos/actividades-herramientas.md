---
title: "Actividades: herramientas de trabajo colaborativo"
description: "Siete retos prácticos sobre tableros Kanban, gestión de tareas, Git (commits, ramas, fusión y conflictos), flujo completo de una tarea, correo profesional y normas de comunicación del equipo."
---

Cada actividad es un **reto** que produce un entregable que sirve para el proyecto. Se hacen con el equipo (de 2 a 4 personas) y, cuando se indica, con el [Simulador de Git](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/), que no necesita instalar nada ni conectarse a ningún servidor.

Esta unidad es una **formación previa**: no figura en la programación didáctica, así que las actividades no se asocian a resultados de aprendizaje ni criterios de evaluación concretos. Los apartados «Competencia que trabaja» son una **propuesta** del profesor.

:::tip[Antes de empezar]
- Ten a mano los apuntes: [Jira](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/11-jira/), [Trello](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/12-trello/), [Git: fundamentos](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/13-git-fundamentos/), [Git: gestión de ramas](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/14-git-ramas/), [integración de Git con Jira](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/16-git-con-jira/) y [correo electrónico](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/17-email/).
- Los proyectos de ejemplo son de la empresa **ficticia** Reparaciones Byte Alacant, S. L. Si ya tienes tu propio proyecto, puedes sustituir el ejemplo por él (consulta con el profesor).
- El simulador guarda tu sesión **en este navegador**. Al acabar cada reto, usa su opción para descargar la sesión en Markdown y adjúntala a la entrega.
- Las herramientas de terceros cambian. Si no puedes crear una cuenta, tienes alternativas indicadas en cada reto.
:::

## Actividad 1 · Montar un tablero Kanban de equipo

**Objetivo:** crear el tablero de trabajo del equipo y acordar las reglas del flujo.

**Qué tienes que hacer:**

1. Con tu equipo, crea un tablero en **Trello** o en una herramienta equivalente (otra aplicación de tableros, una pizarra con notas adhesivas fotografiada, o una hoja de cálculo con una columna por estado). Si no tienes cuenta en ninguna, usa la alternativa de la hoja de cálculo o el papel.
2. Define las **listas del flujo** (como mínimo: Por hacer, En curso, En revisión, Hecho) y escribe qué significa cada una.
3. Escribe vuestra **definición de hecho** y un **límite de trabajo en curso** (WIP) para «En curso». Justifica el número elegido en una frase.
4. Crea **ocho tarjetas** para el portal de incidencias de Byte Alacant (por ejemplo: «Diseñar el formulario de alta», «Crear la base de datos de clientes», «Redactar la guía de instalación»…). Cada una, con título que empiece por un verbo, responsable, etiqueta con **texto** (tipo de trabajo) y, al menos en tres, una lista de verificación.
5. Reparte las tarjetas por las listas de forma realista (no pongas todas en «Hecho») y respeta el límite que has fijado.

**Qué entregas:** un documento (PDF o Markdown) con: las listas y su significado, la definición de hecho, el límite WIP justificado, la tabla de las ocho tarjetas (título, responsable, etiqueta, lista actual) y una captura o foto del tablero. Se entrega en la tarea «Actividad 1» de Aules.

**Competencia que trabaja (propuesta):** organizar el trabajo de un equipo con un método visual.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 1 hora

## Actividad 2 · Kanban en la práctica: el límite de trabajo en curso

**Objetivo:** comprobar con números que limitar el trabajo en curso hace que las tareas terminen antes.

**Datos del ejercicio.** Un equipo de **dos personas** tiene seis tarjetas, en este orden de prioridad:

| Tarjeta | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|
| Esfuerzo (días de trabajo de una persona) | 2 | 1 | 3 | 1 | 2 | 1 |

Cada persona trabaja a la vez en **una** tarjeta como máximo y avanza una unidad por día. Cada día, quien queda libre toma la siguiente tarjeta de la lista (por prioridad). No hay tiempos de espera.

**Qué tienes que hacer:**

1. **Con límite de trabajo en curso = 2** (una tarjeta por persona): simula día a día, en un tablero real o dibujado, qué tarjetas están en «En curso» y cuáles pasan a «Hecho». Completa una tabla con el **día de inicio**, el **día de fin** y el **tiempo de ciclo** (días desde que se empieza hasta que se termina, contando ambos) de cada tarjeta. Calcula el **tiempo de ciclo medio** y el día en que se termina todo.
2. **Sin límite (multitarea):** las seis tarjetas se empiezan el primer día. Las dos personas suman 2 unidades de trabajo por día, que se reparten **por igual** entre todas las tarjetas abiertas (con un máximo de 1 unidad al día por tarjeta). Calcula el día en que termina cada tarjeta y el tiempo de ciclo medio.
3. Compara los dos resultados y contesta en cinco líneas: ¿qué diferencia hay en el tiempo de ciclo medio? ¿Cuándo está terminado todo en cada caso? ¿En qué caso es más fácil entregar algo útil pronto? Conecta tu respuesta con el motivo por el que Kanban limita el trabajo en curso.
4. **Ejercicio de cuello de botella.** En tu tablero de la actividad 1, imagina que «En revisión» tiene seis tarjetas y «En curso» solo una. Escribe qué decisión tomaría el equipo y por qué (no abrir tarjetas nuevas, dedicar la jornada a revisar…).

**Qué entregas:** la tabla de la simulación con límite, el cálculo de la multitarea, la comparación y la decisión del apartado 4, en la tarea «Actividad 2» de Aules.

**Competencia que trabaja (propuesta):** interpretar el flujo de trabajo con medidas simples (tiempo de ciclo, trabajo en curso).

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Actividad 3 · Backlog del proyecto con claves, tipos y flujo

**Objetivo:** convertir una idea de proyecto en un conjunto de incidencias bien formadas, como se haría en un gestor tipo Jira.

**Qué tienes que hacer:**

1. Elige un proyecto pequeño para Byte Alacant (el portal de incidencias, una web de citas de reparación o un inventario de equipos) o usa el de tu equipo. Escoge una **clave** de proyecto de 3 o 4 letras mayúsculas.
2. Redacta **una épica** y, dentro de ella, **al menos tres historias** (con la forma «Como…, quiero…, para…»), **dos tareas técnicas** y **un error** (invéntalo con sentido: qué ocurre y cómo reproducirlo).
3. A cada incidencia dale una **clave** (`CLAVE-1`, `CLAVE-2`…), un **tipo**, una **prioridad** y un **responsable**. Escribe criterios de aceptación en las historias.
4. Define el **flujo de trabajo** con sus estados (tres o cuatro) y las transiciones permitidas. Indica en qué estado está hoy cada incidencia.
5. Ordena el **backlog** por valor y marca cuáles entrarían en el primer periodo de trabajo, con una frase de justificación.

Puedes hacerlo en un gestor real, en una herramienta de tableros usando etiquetas y numeración propia, o en una hoja de cálculo con las columnas: clave, tipo, resumen, prioridad, responsable, estado.

**Qué entregas:** la tabla de incidencias (PDF, Markdown o exportación de la herramienta) y el diagrama o la lista de estados del flujo, en la tarea «Actividad 3» de Aules.

**Competencia que trabaja (propuesta):** descomponer un proyecto en trabajo asignable y trazable.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Actividad 4 · Primeros commits, `.gitignore` y deshacer cambios

**Objetivo:** dominar el ciclo básico de Git y deshacer cambios sin riesgo.

**Qué tienes que hacer:**

1. Abre el simulador en la pestaña [Retos guiados](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#retos) y completa el reto **«Primer commit y .gitignore»** hasta que la comprobación salga en verde.
2. Completa el reto **«Deshacer con restore»**. Antes de ejecutar nada, escribe en una línea qué crees que hará cada orden.
3. Ve a la pestaña [Terminal](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#terminal), pulsa «Empezar de cero» y reproduce esta sesión sin ayuda:
   - Crear un repositorio y dos archivos (`README.md` y `notas.txt`).
   - Confirmar solo `README.md` con un mensaje claro.
   - Modificar `README.md` otra vez y comprobar con `git status` y `git diff` lo que ha cambiado.
   - Preparar el archivo con `git add`, retirarlo del área de preparación con `git restore --staged` y descartar el cambio con `git restore`.
   - Mostrar el historial con `git log --oneline`.
4. Descarga la sesión en Markdown (opción «Descargar mi sesión») y añade al final tres frases: qué diferencia hay entre `git restore archivo` y `git restore --staged archivo`, qué pasa con los archivos de `.gitignore` y por qué es importante.

**Qué entregas:** el archivo de la sesión descargada con tus tres frases finales, en la tarea «Actividad 4» de Aules.

**Competencia que trabaja (propuesta):** usar un sistema de control de versiones local.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 1 hora

## Actividad 5 · Ramas, fusión y conflicto

**Objetivo:** trabajar en una rama, fusionarla y resolver un conflicto.

**Qué tienes que hacer:**

1. En la pestaña [Retos guiados](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#retos), completa los retos **«Rama de funcionalidad»**, **«Fusión»** y **«Conflicto sencillo»**.
2. Observa el [Grafo de commits](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#grafo) después de cada reto y dibuja (a mano o con una herramienta) el grafo final del reto de conflicto, señalando el commit de fusión y sus dos padres.
3. Ve a la pestaña [Conflictos](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#conflictos) y resuelve los tres escenarios. En cada uno, explica en una frase por qué elegiste esa solución.
4. Responde: ¿cuándo se produce un avance rápido (*fast-forward*) y cuándo un commit de fusión? ¿Qué orden usarías para abandonar una fusión que se ha complicado?

**Qué entregas:** el dibujo del grafo del reto de conflicto y las respuestas de los apartados 3 y 4 (PDF o Markdown), en la tarea «Actividad 5» de Aules.

**Competencia que trabaja (propuesta):** integrar el trabajo en paralelo de varias personas.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Actividad 6 · Reto final: una tarea completa, del tablero a `main`

**Objetivo:** recorrer el flujo completo de una tarea combinando el tablero y Git con las claves de incidencia.

**Qué tienes que hacer:**

1. Toma una de las incidencias de tu actividad 3 (o la `PORT-12` «Formulario de alta de avería» si no la tienes) y escribe, en una tabla, los nueve pasos del flujo de [Git con Jira](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/16-git-con-jira/): qué haces en el tablero y qué haces en Git en cada uno.
2. En la pestaña [Mensajes y claves](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#mensajes), practica la clasificación de mensajes hasta acertar seis seguidos y usa el constructor para obtener el **nombre de rama** y **tres mensajes de commit** correctos para tu incidencia.
3. En la [Terminal](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#terminal), ejecuta el flujo completo a partir de un repositorio vacío:
   - Crear el repositorio con un commit inicial en `main`.
   - Crear la rama de la incidencia y hacer **al menos tres commits** con la clave al principio del mensaje.
   - Mientras tanto, en `main`, simular que otra persona hace un commit sobre **otro archivo**.
   - Fusionar la rama en `main`, comprobar el grafo y borrar la rama.
4. Repite la fusión en un segundo intento donde **el mismo archivo** haya sido modificado en las dos ramas: provoca el conflicto, resuélvelo y completa la fusión.
5. Descarga la sesión en Markdown y añade el grafo de commits final (puedes copiar la salida de `git log --oneline --graph --all`).

**Qué entregas:** la tabla de los nueve pasos, el nombre de rama y los mensajes elegidos, y la sesión descargada con el grafo final, en la tarea «Actividad 6» de Aules.

**Competencia que trabaja (propuesta):** seguir un flujo de trabajo de equipo con trazabilidad entre tareas y cambios.

**Dificultad:** ★★★ · **Tiempo estimado:** 2 horas

## Actividad 7 · Comunicación y documentos del equipo

**Objetivo:** acordar cómo se comunica el equipo y dejar preparada la carpeta de documentos.

**Qué tienes que hacer:**

1. En la pestaña [Correo profesional](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#correo), corrige los dos borradores propuestos y analiza un correo tuyo.
2. Redacta un **correo resumen de una reunión** real o simulada del equipo (de 10 minutos): asunto, saludo, acuerdos numerados con responsable y fecha, próxima reunión y despedida. Pásalo por el analizador y corrige lo que detecte.
3. Escribe las **normas de comunicación del equipo** (una página como máximo, entre 8 y 10 normas): qué canal para qué, plazos de respuesta, uso de menciones e hilos, qué no se escribe en el chat, dónde se anotan las decisiones.
4. Diseña la **estructura de la carpeta compartida** del proyecto (carpetas y reglas de nombre de archivo) y escribe qué suite usaréis (Google, Microsoft u otra) y por qué.
5. Escribe quién tiene qué permiso (lector, comentarista o editor) sobre cada carpeta o documento, y por qué.

**Qué entregas:** el correo resumen, las normas de comunicación y el esquema de la carpeta con permisos, en un único documento, en la tarea «Actividad 7» de Aules.

**Competencia que trabaja (propuesta):** comunicarse con claridad y organizar la documentación de un equipo.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

:::aules
Las entregas de estas actividades se realizan en Aules, en las tareas indicadas. Las soluciones y los criterios de valoración los publica el profesor allí.
:::
