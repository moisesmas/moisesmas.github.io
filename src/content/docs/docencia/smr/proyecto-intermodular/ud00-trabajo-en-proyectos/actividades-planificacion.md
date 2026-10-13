---
title: "Actividades de planificación"
description: "Siete retos sobre planificación de proyectos: clasificar y acotar, EDT y lista de tareas, ruta crítica a mano, Gantt con el laboratorio, elección de ciclo de vida, plan de una página y recorte de plazo."
---

Cada actividad es un **reto** que produce un entregable. Se encadenan: lo que haces en los retos 1 y 2 (tu proyecto) alimenta el Gantt del reto 4 y el plan del reto 6. Usa el [laboratorio «Gantt y ciclos de vida»](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/gantt-y-ciclos/), que guarda tus datos en este navegador y exporta a Markdown y JSON.

:::note[Unidad previa]
Esta unidad es **formación previa propuesta por el profesor** y no figura en la programación del módulo, así que los retos no llevan códigos de criterios de evaluación. Preparan la planificación del proyecto que harás en las unidades siguientes.
:::

:::tip[Antes de empezar]
- Para los retos 1, 2, 4, 5 y 6 elige un **proyecto pequeño** que podrías hacer en equipo en unas semanas (puede ser el que ya empezaste en la Unidad 2). Si no tienes ninguno, usa uno de estos para la empresa ficticia *Reparaciones Byte Alacant*: un **portal de incidencias** interno, un **inventario de equipos** o una **web de citas** de reparación.
- Trabaja en equipo de 2 o 3 personas, o solo, según te indique tu profesor.
- Al acabar cada sesión pulsa «Exportar JSON» en el laboratorio y guarda el archivo. Si cambias de ordenador, impórtalo.
- En el laboratorio, el botón «Cargar ejemplo» vuelve al proyecto del portal de citas; «Empezar en blanco» lo vacía para que escribas el tuyo.
:::

## Reto 1 · ¿Es un proyecto? Objetivo y alcance

**Objetivo:** distinguir un proyecto de una operación rutinaria y acotar con claridad lo que vas a hacer.

**Qué tienes que hacer:**

1. Abre la pestaña «¿Es un proyecto?» del laboratorio y clasifica los casos hasta tener al menos **8 aciertos**. Anota los dos que más te costaron y por qué.
2. Escribe **tres actividades de tu vida de estudiante o de un taller** (por ejemplo, «montar el aula de informática del instituto») y clasifícalas con los cuatro criterios de la pestaña.
3. Para tu proyecto, redacta en **una frase** el objetivo (qué se entrega y para quién), y escribe tres cosas que **incluye** y tres que **no incluye** (alcance).
4. Indica quién es el cliente y cuál es la fecha límite razonable.

**Qué entregas:** un documento breve (una página) con las respuestas, en la tarea «Reto 1» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (qué es un proyecto, alcance).

**Dificultad:** ★☆☆ · **Tiempo estimado:** 45 minutos

## Reto 2 · EDT y lista de tareas

**Objetivo:** descomponer tu proyecto en paquetes de trabajo y convertirlos en tareas con duración, predecesoras y responsable.

**Qué tienes que hacer:**

1. En la pestaña «EDT» construye la estructura de desglose de tu proyecto: **entre 4 y 6 ramas** de primer nivel y **entre 10 y 15 paquetes de trabajo** en total. Revisa la regla del 100 %.
2. Incluye al menos una rama de **pruebas** y una de **documentación o entrega**.
3. Pulsa «Usar las hojas como tareas» y, en la pestaña «Tareas», completa la **duración** (en jornadas) y las **predecesoras** de cada una. Añade al menos un hito.
4. Reparte las tareas entre los miembros del equipo con una pequeña matriz RACI (en un documento aparte, como en la [página 1.1](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/01-planificacion-y-organizacion/)).

**Qué entregas:** la EDT y la lista de tareas exportadas desde el laboratorio (Markdown) y la matriz RACI, en la tarea «Reto 2» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (EDT, tareas, reparto de roles).

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Reto 3 · Ruta crítica a mano: el inventario de equipos

**Objetivo:** calcular a mano fechas, holguras y ruta crítica, y comprobar el resultado con el laboratorio.

**Qué tienes que hacer:** el proyecto «Inventario de equipos» de Byte Alacant tiene estas tareas (duración en jornadas laborables).

| Id. | Tarea | Duración | Predecesoras |
|---|---|---:|---|
| A | Recogida de requisitos | 2 | — |
| B | Diseño del modelo de datos | 3 | A |
| C | Diseño de pantallas | 2 | A |
| D | Programar altas y bajas | 4 | B |
| E | Programar búsquedas e informes | 3 | B, C |
| F | Importar el inventario actual | 2 | B |
| G | Pruebas con datos reales | 3 | D, E, F |
| H | Formación del personal | 1 | G |
| I | Manual de usuario | 2 | C |
| J | Entrega (hito) | 0 | H, I |

1. Con **lápiz y papel**, haz la pasada hacia adelante y calcula ES y EF de cada tarea.
2. Haz la pasada hacia atrás y calcula LS y LF.
3. Calcula la **holgura total** de cada tarea y señala la **ruta crítica**. ¿Cuántas jornadas dura el proyecto?
4. Si empieza el **lunes 9 de noviembre de 2026**, ¿en qué fecha termina? (Cuenta solo días laborables, de lunes a viernes.)
5. Responde: (a) si «Importar el inventario actual» tarda 3 jornadas más, ¿cuánto se retrasa el proyecto?; (b) ¿qué tarea se puede retrasar más sin consecuencias?; (c) ¿cambia la ruta crítica si «Programar altas y bajas» pasa a durar 6?
6. Carga las tareas en la pestaña «Tareas» del laboratorio y compara con tus cálculos en la pestaña «Ruta crítica». Corrige y explica cada diferencia.

**Qué entregas:** una foto o un PDF de tus cálculos a mano y las respuestas del punto 5, en la tarea «Reto 3» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (dependencias, ruta crítica, holguras).

**Dificultad:** ★★★ · **Tiempo estimado:** 1 hora y 30 minutos

## Reto 4 · El Gantt de tu proyecto

**Objetivo:** pasar tu lista de tareas al calendario y entender qué tareas vigilar.

**Qué tienes que hacer:**

1. Con las tareas del reto 2, abre la pestaña «Diagrama de Gantt» y fija la **fecha de inicio** real de tu proyecto.
2. Activa la ruta crítica y las holguras. Anota la **duración total** y la **fecha de fin**.
3. En la pestaña «Ruta crítica», usa el simulador de retrasos con **tres tareas**: una crítica, una con holgura y una cuyo retraso cambie la ruta crítica (si existe). Anota el resultado de cada prueba.
4. Revisa tu plan: ¿hay dependencias que sobran o que faltan? ¿Alguna persona tiene dos tareas en el mismo día? Corrige lo que encuentres.
5. Escribe cinco líneas con las **tres tareas que más vigilarías** y por qué.

**Qué entregas:** el Gantt exportado (Markdown, con ES/EF/holgura de cada tarea) y las cinco líneas, en la tarea «Reto 4» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (diagrama de Gantt, seguimiento).

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora

## Reto 5 · Elegir el ciclo de vida

**Objetivo:** justificar con argumentos el ciclo de vida de un proyecto.

**Qué tienes que hacer:**

1. En la pestaña «Ciclos de vida» del laboratorio, repasa los siete modelos y fíjate en la tabla comparativa.
2. Resuelve **seis casos** de la pestaña «Práctica» (tipo «elección de ciclo») y anota tu puntuación.
3. Para **dos casos de Byte Alacant** a tu elección (por ejemplo, el informe de residuos y el portal de citas), escribe el ciclo elegido y **tres argumentos** basados en los criterios de la página 1.2.
4. Para **tu proyecto**, usa el recomendador del laboratorio y compara con tu opinión: si no coinciden, explica por qué te quedas con la tuya.
5. Describe cómo sería el calendario de tu proyecto con ese ciclo (cuántas iteraciones o entregas, cuándo habría revisión con el cliente).

**Qué entregas:** un documento de una o dos páginas con la justificación, en la tarea «Reto 5» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (ciclos de vida de software).

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora

## Reto 6 · El plan del proyecto en una página

**Objetivo:** reunir todo lo anterior en un único documento que se entienda de un vistazo.

**Qué tienes que hacer:** redacta una página con estos apartados:

1. **Título, objetivo y alcance** (reto 1).
2. **EDT** resumida (reto 2).
3. **Calendario:** fechas de inicio y fin, hitos y **ruta crítica** (reto 4).
4. **Equipo y roles** (reto 2).
5. **Ciclo de vida elegido** y por qué (reto 5).
6. **Tres riesgos** principales con probabilidad e impacto (1 a 3) y una respuesta para cada uno.
7. **Cómo haréis el seguimiento:** con qué frecuencia os reunís y qué miráis.

Cuida que sea breve: una página impresa a una cara. Pide a otro equipo que la lea y te diga qué no ha entendido.

**Qué entregas:** el plan en PDF, en la tarea «Reto 6» de Aules, con una nota de qué cambiaste tras la revisión de tus compañeros.

**Criterios que trabaja:** propuesta de la unidad previa (planificación completa).

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Reto 7 · «¿Podéis acabar antes?»

**Objetivo:** reaccionar a una petición de recortar plazo usando la ruta crítica.

**Qué tienes que hacer:** en la pestaña «Tareas», carga el ejemplo del portal de citas (16 jornadas). El cliente pregunta si se puede entregar **3 jornadas antes**.

1. Identifica la ruta crítica y, por cada tarea crítica, estima si se podría acortar y a qué coste (más personas, menos funciones, más horas…).
2. Propone **dos formas distintas** de ganar tres jornadas. Pruébalas modificando duraciones o dependencias en el laboratorio.
3. Fíjate en qué ocurre cuando acortas una tarea crítica: ¿aparece otra ruta crítica que limita el ahorro?
4. Redacta una respuesta de **cinco líneas** al cliente: qué se puede, qué se pierde (alcance, coste o calidad) y qué necesitas para decidir.

**Qué entregas:** las dos propuestas con la duración resultante (capturas o Markdown) y la respuesta al cliente, en la tarea «Reto 7» de Aules.

**Criterios que trabaja:** propuesta de la unidad previa (triple restricción, ruta crítica).

**Dificultad:** ★★★ · **Tiempo estimado:** 1 hora

## Refuerzo y ampliación

- **Refuerzo (propuesta):** si te pierdes con la ruta crítica, haz primero los ejercicios de la pestaña «Práctica» del laboratorio, que explican cada resultado. Prueba el tipo «Duración mínima» antes que «Holgura».
- **Ampliación (propuesta):** calcula también la **holgura libre** de las tareas del reto 3; investiga cómo se registra el avance real frente al plan (línea base); o compara tu Gantt con el de otro equipo.

:::aules
Las entregas, el calendario de la unidad y las rúbricas de cada reto están en el curso de Aules. Las soluciones y las rúbricas de corrección no se publican en esta web.
:::
