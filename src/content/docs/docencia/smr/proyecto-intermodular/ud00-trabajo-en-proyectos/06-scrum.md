---
title: "1.3.2 Scrum"
description: "Scrum según la Guía de Scrum 2020: equipo (Product Owner, Scrum Master y Developers), el Sprint y sus cuatro eventos, los tres artefactos con sus compromisos y un sprint de dos semanas de ejemplo para Byte Alacant."
---

**Scrum** es el marco ágil más extendido. Su idea es sencilla: en vez de intentar acertar con todo desde el principio, el equipo trabaja en **ciclos cortos** (los *sprints*), al final de cada uno enseña algo que funciona, recoge opiniones y ajusta. Para que ese ritmo funcione, Scrum define pocas piezas, pero las define con claridad: quién hace qué, qué reuniones hay y qué documentos (artefactos) se mantienen.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 45 minutos de lectura y 30 de práctica.

1. Lee las secciones 1 a 4 (equipo, sprint, eventos y artefactos).
2. Mira el ejemplo completo de la sección 5.
3. Abre la pestaña «Scrum» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#scrum): recorre el sprint día a día y prueba el comprobador de la Definición de Hecho.
:::

Esta página sigue la **Guía de Scrum 2020**, que es el documento oficial (escrito por los creadores de Scrum) y resume el marco en pocas páginas. Si encuentras libros o apuntes con otros nombres o roles, probablemente se basan en versiones anteriores de la guía.

## 1. El equipo Scrum

Un **equipo Scrum** es un grupo pequeño y cohesionado (la guía indica que normalmente son diez personas o menos) con **tres responsabilidades**. No hay jefe de proyecto ni subequipos por especialidad: el equipo es el único responsable de crear un producto de valor en cada sprint.

| Responsabilidad | Quién es | Qué hace |
|---|---|---|
| **Product Owner** (dueño del producto) | Una persona | Maximiza el valor del producto. Gestiona el **Product Backlog**: lo ordena, lo explica y decide qué es más importante. Representa a clientes y usuarios. |
| **Scrum Master** | Una persona | Ayuda a que el equipo entienda y aplique Scrum. Elimina obstáculos, protege los eventos, enseña y facilita. No manda sobre el equipo: es un servidor-líder. |
| **Developers** (desarrolladores) | El resto del equipo | Hacen el trabajo para crear un **Incremento** utilizable en cada sprint: planifican el sprint, aseguran la calidad cumpliendo la Definición de Hecho y se adaptan a diario. |

Algunos matices importantes:

- «Developer» no significa solo programador: son todas las personas que hacen el trabajo del incremento (diseño, desarrollo, pruebas, documentación…).
- El Product Owner es **una persona**, aunque escuche a mucha gente. Las decisiones sobre el orden del Product Backlog son suyas, y la organización debe respetarlas.
- En un equipo de clase de tres o cuatro personas, rotad las responsabilidades de un sprint a otro (propuesta de este curso).

## 2. El Sprint

El **sprint** es el latido de Scrum: un periodo de **un mes o menos**, de duración fija, durante el cual se crea un incremento «hecho» y utilizable. Cuando termina un sprint, empieza el siguiente sin pausas.

Los sprints suelen durar entre una y cuatro semanas. En esta unidad usaremos sprints de **dos semanas** (diez días laborables).

Reglas del sprint:

- Mientras dura, **no se hacen cambios** que pongan en peligro el objetivo del sprint, y la calidad **no baja**.
- Si el objetivo del sprint deja de tener sentido, solo el Product Owner puede **cancelar** el sprint.
- Se puede aclarar y renegociar el alcance con el Product Owner, siempre que el objetivo del sprint no peligre.
- Un sprint más corto genera más aprendizaje y limita el riesgo; uno demasiado largo hace que lo planificado deje de ser válido.

## 3. Los cinco eventos

Scrum tiene cinco eventos: el propio **Sprint**, que es el contenedor de todos los demás, y los cuatro de la tabla, que ocurren **dentro** del sprint. Todos tienen una duración máxima (*timebox*) y están pensados para inspeccionar el trabajo y adaptarse.

| Evento | Cuándo | Para qué | Duración máxima (sprint de un mes) |
|---|---|---|---|
| **Sprint Planning** (planificación del sprint) | Al principio | Acordar qué se va a hacer y cómo | 8 horas |
| **Daily Scrum** (reunión diaria) | Cada día laborable, a la misma hora | Inspeccionar el avance hacia el objetivo y adaptar el plan del día | 15 minutos |
| **Sprint Review** (revisión) | Al final | Enseñar el incremento a las partes interesadas y recoger comentarios | 4 horas |
| **Sprint Retrospective** (retrospectiva) | Tras la revisión, antes del siguiente sprint | Decidir cómo mejorar la forma de trabajar | 3 horas |

Para sprints más cortos, los eventos suelen ser más breves. Como propuesta para un sprint de dos semanas: unas 4 horas de planificación, 2 de revisión y 1,5 de retrospectiva; el Daily Scrum siempre dura 15 minutos como máximo.

### 3.1 Sprint Planning

Responde a tres preguntas:

1. **¿Por qué es valioso este sprint?** El Product Owner propone cómo podría aumentar el valor del producto y el equipo acuerda el **objetivo del sprint** (*Sprint Goal*).
2. **¿Qué se puede hacer?** Los Developers eligen los elementos del Product Backlog que creen poder completar, hablando con el Product Owner.
3. **¿Cómo se hará el trabajo elegido?** Los Developers descomponen los elementos en trabajo más pequeño, a menudo de un día o menos.

El resultado es el *Sprint Backlog*: objetivo, elementos elegidos y plan.

### 3.2 Daily Scrum

Son 15 minutos para que los Developers vean si van bien encaminados a conseguir el objetivo y ajusten el plan de las próximas 24 horas. La estructura la decide el equipo: pueden usar las tres preguntas clásicas («¿qué hice ayer?», «¿qué haré hoy?», «¿qué me bloquea?») o, mejor, mirar el tablero y preguntarse qué elemento está más en riesgo. No es una reunión de informe al Scrum Master ni al Product Owner.

### 3.3 Sprint Review

No es una simple demostración: es una **sesión de trabajo** con las partes interesadas. El equipo presenta lo que ha conseguido, se comenta qué ha cambiado en el entorno, se revisa el Product Backlog y se decide qué conviene hacer a continuación. Se muestra software o resultados que funcionan, no diapositivas.

### 3.4 Sprint Retrospective

El equipo se inspecciona a sí mismo: personas, relaciones, procesos, herramientas y cumplimiento de la Definición de Hecho. Se identifican los cambios más útiles y, lo más importante, se **comprometen a aplicar alguno** en el siguiente sprint (a veces incluso se añade como elemento al Sprint Backlog).

Una retrospectiva sencilla tiene tres columnas: *qué fue bien*, *qué no fue bien* y *qué probamos en el próximo sprint*.

## 4. Los tres artefactos y sus compromisos

Un **artefacto** es algo que Scrum usa para dar transparencia al trabajo. Cada uno tiene asociado un **compromiso** (una meta con la que se mide su calidad).

| Artefacto | Qué es | Compromiso asociado |
|---|---|---|
| **Product Backlog** | Lista ordenada y viva de todo lo que se sabe que hace falta en el producto. Única fuente de trabajo del equipo. | **Objetivo del Producto** (*Product Goal*): el estado futuro del producto, el objetivo a largo plazo |
| **Sprint Backlog** | El objetivo del sprint, los elementos del Product Backlog elegidos y el plan para entregarlos. Lo gestionan los Developers. | **Objetivo del Sprint** (*Sprint Goal*): el único propósito del sprint, que da flexibilidad en el alcance |
| **Incremento** | Cada paso concreto hacia el Objetivo del Producto. Es utilizable y suma a todos los incrementos anteriores. | **Definición de Hecho** (*Definition of Done*): descripción del estado en que está el incremento cuando cumple las medidas de calidad |

### La Definición de Hecho (DoD)

Es una lista acordada que dice cuándo un elemento está **terminado de verdad**. Sin ella, cada persona entiende «hecho» a su manera: para uno es «programado», para otro «probado y desplegado». Un elemento que no cumple la Definición de Hecho **no entra en el incremento** y ni siquiera se puede mostrar en la revisión.

Ejemplo de Definición de Hecho para el portal de incidencias:

- El código está subido al repositorio y ha pasado una revisión de otra persona.
- Las pruebas automáticas pasan.
- Se ha probado a mano el caso principal y los casos de error.
- La función está desplegada en el entorno de pruebas.
- Hay una nota en el manual de usuario si cambia lo que ve el usuario.
- El Product Owner ha comprobado los criterios de aceptación.

:::caution[«Casi hecho» no existe]
Un elemento está hecho o no lo está. Si al final del sprint le falta una pequeña prueba, vuelve al Product Backlog y no cuenta en la velocidad (véase 1.3.6 Estimación en proyectos ágiles).
:::

### El Product Backlog y el refinamiento

El Product Backlog nunca está terminado. El **refinamiento** es la actividad (no un evento oficial) de analizar, dividir y estimar los elementos para que estén listos para planificarse. Los elementos de arriba están claros y pequeños; los de abajo, más vagos y grandes. Normalmente se redactan como historias de usuario (véase 1.3.5 Historias de usuario).

## 5. Un sprint de dos semanas en Byte Alacant

Veamos un sprint completo de un equipo de cuatro personas que construye el portal de incidencias de *Reparaciones Byte Alacant* (empresa ficticia). El Product Owner es Marta (gerente del taller), el Scrum Master es Luis y los Developers son Irene y Samuel. El equipo estima en puntos de historia (véase 1.3.6).

**Objetivo del Producto:** «Que los clientes puedan abrir, seguir y cerrar sus reparaciones sin llamar por teléfono».

| Día | Evento | Qué ocurre |
|---|---|---|
| Día 1 (lunes) | **Sprint Planning** | Marta explica por qué el seguimiento es lo más valioso. Acuerdan el **Objetivo del Sprint**: «Un cliente registrado puede abrir una incidencia y ver su estado». Eligen tres elementos: *Registrar incidencia* (5 puntos), *Ver mis incidencias* (5) y *Cambiar el estado de una incidencia (técnico)* (8). Total: 18 puntos. Irene y Samuel dividen cada uno en tareas pequeñas. |
| Días 2 a 9 | **Daily Scrum** | Cada día, 15 minutos frente al tablero (también el día 10, antes de la revisión, si el equipo lo decide). El día 4 anuncian que una tarea de *Cambiar estado* está bloqueada porque falta definir los estados posibles; Luis consigue que Marta los decida ese mismo día. |
| Día 7 | **Refinamiento** | Marta, Irene y Samuel dividen y estiman las historias candidatas al próximo sprint. |
| Día 10 (viernes) | **Sprint Review** | Marta y dos clientes de prueba usan el portal. Ven que el estado «En reparación» no se entiende; Marta decide cambiarlo por «Estamos en ello». Se añade al Product Backlog. |
| Día 10 (viernes) | **Sprint Retrospective** | Funcionó bien tener el tablero visible; mal, que las pruebas se dejaron para el final. Prueba para el próximo sprint: empezar probando cada historia el mismo día que se programa. |

**Resultado:** se completan *Registrar incidencia* (5) y *Ver mis incidencias* (5). *Cambiar estado* queda a medias, así que **no cumple la Definición de Hecho**, no se presenta como terminado y vuelve al Product Backlog. La **velocidad** de este sprint es de **10 puntos** (solo cuentan los elementos terminados), aunque se habían planificado 18. Ese dato servirá para planificar mejor el siguiente sprint.

## 6. Scrum en un vistazo

```text
                    Product Backlog (ordenado por el Product Owner)
                                   │
                     Sprint Planning ──► Sprint Backlog
                                   │
   ┌───────────────────── SPRINT (1–4 semanas) ──────────────────────┐
   │  Daily Scrum   Daily Scrum   Daily Scrum   ...   Daily Scrum    │
   └──────────────────────────────┬───────────────────────────────────┘
                                  ▼
                 Incremento ──► Sprint Review ──► Sprint Retrospective
                                  │
                           (empieza otro sprint)
```

:::note[Las interfaces cambian]
Los tableros de Scrum suelen gestionarse con herramientas como Jira o Trello (véase 2.1 Gestión de proyectos). Sus menús y planes cambian a menudo. Aprende los conceptos de esta página y consulta la ayuda oficial de la herramienta para los pasos concretos.
:::

## Comprueba lo aprendido

1. ¿Qué tres responsabilidades tiene un equipo Scrum según la Guía de Scrum 2020?

   <details>
   <summary>Respuesta</summary>

   Product Owner, Scrum Master y Developers.
   </details>

2. ¿Quién decide el orden de los elementos del Product Backlog?

   <details>
   <summary>Respuesta</summary>

   El Product Owner, que es una sola persona. Puede escuchar a otros, pero la decisión es suya.
   </details>

3. Un sprint de una semana termina y una historia de 8 puntos está «hecha, pero sin probar». ¿Entra en el incremento? ¿Cuántos puntos cuentan?

   <details>
   <summary>Respuesta</summary>

   No entra, porque no cumple la Definición de Hecho. Cuenta 0 puntos en la velocidad y vuelve al Product Backlog.
   </details>

4. Une cada evento con su propósito: Daily Scrum, Sprint Review, Sprint Retrospective, Sprint Planning.

   <details>
   <summary>Respuesta</summary>

   Planning: decidir qué y cómo se hará en el sprint. Daily: revisar el avance hacia el objetivo y adaptar el plan del día. Review: enseñar el incremento a las partes interesadas y recoger comentarios. Retrospective: decidir cómo mejorar la forma de trabajar.
   </details>

5. ¿Qué compromiso va asociado a cada artefacto?

   <details>
   <summary>Respuesta</summary>

   Product Backlog → Objetivo del Producto; Sprint Backlog → Objetivo del Sprint; Incremento → Definición de Hecho.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Scrum** | Marco ágil de trabajo en sprints con roles, eventos y artefactos definidos. |
| **Sprint** | Periodo de duración fija (un mes o menos) en el que se crea un incremento. |
| **Product Owner** | Responsable de maximizar el valor del producto y de gestionar el Product Backlog. |
| **Scrum Master** | Responsable de que el equipo comprenda y aplique Scrum; facilita y elimina obstáculos. |
| **Developers** | Personas del equipo que hacen el trabajo para crear el incremento. |
| **Product Backlog** | Lista ordenada de todo lo necesario en el producto. |
| **Sprint Backlog** | Objetivo del sprint, elementos elegidos y plan para entregarlos. |
| **Incremento** | Paso concreto, utilizable y terminado hacia el Objetivo del Producto. |
| **Definición de Hecho (DoD)** | Lista de condiciones que un elemento debe cumplir para considerarse terminado. |
| **Refinamiento** | Actividad continua de detallar, dividir y estimar elementos del Product Backlog. |
| **Timebox** | Límite máximo de tiempo fijado para un evento o actividad. |
