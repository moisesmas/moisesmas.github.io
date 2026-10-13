---
title: "2.1.2 Trello"
description: "Qué es una herramienta de tableros tipo Trello: tableros, listas, tarjetas, etiquetas, listas de verificación, fechas y miembros; cómo montar un tablero Kanban de equipo y buenas prácticas para que no se convierta en un cajón de sastre."
---

Si Jira es el taller completo, **Trello** es la pizarra con notas adhesivas: más sencilla, más visual y rápida de montar. Es una herramienta de **tableros** muy conocida, y su modelo (tableros, listas y tarjetas) lo comparten muchas otras. Por eso esta página sirve aunque tu equipo use otra herramienta equivalente, o incluso una pared con notas adhesivas.

:::note[Las interfaces cambian]
Trello y las herramientas similares renuevan a menudo su aspecto, sus extensiones y las condiciones de sus planes. Aquí se explican los **conceptos y el flujo de trabajo**. Para encontrar una opción concreta, consulta la ayuda oficial. Si no puedes o no quieres crear una cuenta, en la [actividad de Kanban](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-herramientas/) tienes alternativas.
:::

## 1. Los cuatro elementos básicos

| Elemento | Qué es | Ejemplo |
|---|---|---|
| **Tablero** (*board*) | El espacio de un proyecto o de un equipo | «Portal de incidencias» |
| **Lista** (*list*) | Una columna del tablero; normalmente, un estado | «Por hacer», «En curso», «En revisión», «Hecho» |
| **Tarjeta** (*card*) | Una unidad de trabajo | «Diseñar el formulario de alta de avería» |
| **Miembro** (*member*) | Una persona con acceso al tablero | Tú y tus compañeros |

Mover una tarjeta de una lista a otra es la acción central: cambia su estado y deja claro, de un vistazo, qué está pendiente, qué se hace ahora y qué está terminado.

## 2. Qué se puede poner en una tarjeta

Una tarjeta es mucho más que su título:

- **Descripción:** qué hay que hacer y cuándo se considera terminado.
- **Miembros:** quién es responsable (una persona, o dos si trabajan en pareja). Evita las tarjetas sin dueño.
- **Etiquetas** (*labels*): marcas de color con nombre para clasificar. Por ejemplo, por tipo de trabajo (diseño, desarrollo, documentación) o por prioridad. Pon **siempre texto** a las etiquetas, no solo color: un compañero daltónico o una impresión en blanco y negro no distinguirán «rojo» de «verde».
- **Lista de verificación** (*checklist*): pasos pequeños de la tarjeta («crear la tabla», «validar el campo», «probar con datos erróneos»). Muestra el progreso (3 de 5 hechos).
- **Fecha de entrega** (*due date*): cuándo debe estar. Úsala con moderación: si todo tiene fecha, nada la tiene.
- **Comentarios y archivos adjuntos:** la conversación queda junto a la tarea. Se puede mencionar a un compañero para avisarle.
- **Portada y orden:** algunas herramientas permiten colores de portada o ordenar las tarjetas dentro de la lista; lo de arriba es lo más importante.

## 3. Extensiones y automatizaciones

Estas herramientas permiten **ampliar** el tablero con extensiones (calendario, campos personalizados, integración con el repositorio…) y crear **reglas de automatización** del tipo «cuando una tarjeta entre en la lista *Hecho*, márcala como completada y archívala a la semana». Son útiles, pero con un consejo: **automatiza solo lo que ya haces bien a mano**. Una regla mal pensada mueve tarjetas que nadie ha revisado.

## 4. Montar un Kanban de equipo

El método **Kanban** (1.3.1) visualiza el trabajo y limita lo que se hace a la vez. Un tablero de Trello es una forma muy cómoda de aplicarlo. Pasos para montar uno con tu equipo:

1. **Crear el tablero** con el nombre del proyecto e invitar a los compañeros.
2. **Crear las listas del flujo.** Una propuesta sencilla:

   | Lista | Significado |
   |---|---|
   | Pendiente (*backlog*) | Todo lo que se podría hacer, ordenado por importancia |
   | Por hacer | Lo que haremos a continuación (pocas tarjetas) |
   | En curso | Lo que alguien está haciendo ahora |
   | En revisión | Hecho, a la espera de que otra persona lo compruebe |
   | Hecho | Terminado y comprobado |

3. **Acordar la definición de hecho.** Escribidla en una tarjeta fijada o en la descripción del tablero: «Una tarjeta está hecha cuando la ha revisado otra persona, cumple la descripción y está subida a la carpeta o rama del equipo».
4. **Fijar un límite de trabajo en curso (WIP).** Por ejemplo, «máximo 2 tarjetas por persona en *En curso*» o «máximo 5 en total». Muchas herramientas no impiden saltárselo; es un **acuerdo del equipo** que se vigila en la reunión. Si la columna *En revisión* se llena, nadie empieza nada nuevo hasta que se revise.
5. **Crear las tarjetas** con título claro, responsable y etiqueta de tipo. Para tareas grandes, una lista de verificación.
6. **Acordar el ritmo:** reunión de cinco minutos al empezar la sesión de clase («qué hice, qué haré, qué me bloquea») delante del tablero.

:::tip[Si tienes cuenta gratuita, no te preocupes por los límites]
Las condiciones de los planes cambian y no se detallan aquí. Para un trabajo de clase, la versión gratuita basta casi siempre. Si algo no está disponible, resuélvelo con convenciones: una etiqueta «Bloqueada» en vez de una función especial, por ejemplo.
:::

## 5. Buenas prácticas

- **Una tarjeta, una cosa.** «Hacer la web» no es una tarjeta, es un proyecto. Una tarjeta debería poder terminarse en pocos días como máximo.
- **Verbos en el título.** «Redactar el manual de instalación» dice qué se hace; «Manual» no.
- **Cada tarjeta, con una persona responsable.** Y no más de dos o tres tarjetas en curso por persona.
- **Actualiza el tablero cuando cambie la realidad.** Si el tablero se actualiza solo antes de las reuniones, está contando una historia vieja.
- **Archiva, no acumules.** Las tarjetas terminadas hace tiempo se archivan para que el tablero se lea de un vistazo. Archivar no es borrar: se pueden recuperar.
- **Una columna que crece es una alarma.** Si «En revisión» tiene siete tarjetas, el cuello de botella es la revisión; lo que hay que hacer es revisar, no abrir más tarjetas.
- **No guardes información sensible.** Contraseñas, datos personales de clientes o claves de acceso no van en tarjetas, aunque el tablero sea privado.

## 6. Midiendo el flujo con un tablero

Aunque Trello no sea una herramienta de métricas, puedes extraer ideas útiles con muy poco esfuerzo:

- **Tiempo de ciclo:** días desde que una tarjeta entra en *En curso* hasta que llega a *Hecho*. Anota las fechas en la tarjeta o en un comentario y calcula la media de las últimas cinco.
- **Trabajo en curso:** cuántas tarjetas hay en *En curso* y *En revisión* hoy. Si es mayor que el límite, empieza por terminar.
- **Rendimiento (*throughput*):** cuántas tarjetas se terminan por semana. Sirve para estimar cuánto cabe en el próximo plazo.

Estos tres números son los que se practican en la actividad de Kanban.

## Comprueba lo aprendido

1. ¿Qué representa normalmente cada lista de un tablero Kanban?

   <details><summary>Respuesta</summary>

   Un estado del flujo de trabajo (por ejemplo, Por hacer, En curso, En revisión, Hecho). Las tarjetas se mueven de una lista a otra a medida que avanzan.

   </details>

2. ¿Por qué debe haber un límite de trabajo en curso?

   <details><summary>Respuesta</summary>

   Porque empezar muchas cosas a la vez no termina ninguna: aumenta el tiempo que tarda cada tarea y oculta los cuellos de botella. El límite obliga a terminar antes de empezar.

   </details>

3. Tu tablero tiene una etiqueta roja y otra verde sin texto. ¿Qué problema tiene y cómo lo arreglas?

   <details><summary>Respuesta</summary>

   El color por sí solo no se entiende ni es accesible. Hay que ponerles nombre (por ejemplo «Urgente» y «Normal») y acordarlo con el equipo.

   </details>

4. Una tarjeta lleva nueve días en «En curso» y nadie la ha tocado. ¿Qué haces?

   <details><summary>Respuesta</summary>

   Preguntar al responsable si está bloqueada, ayudarle o repartirla. Si no se puede avanzar, se marca como bloqueada con el motivo, o se devuelve a «Por hacer» para no ocultar que nadie la trabaja.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Tablero (*board*) | Espacio donde se organiza el trabajo de un proyecto |
| Lista | Columna del tablero que suele corresponder a un estado |
| Tarjeta (*card*) | Unidad de trabajo que se mueve por las listas |
| Etiqueta (*label*) | Marca con nombre (y color) para clasificar tarjetas |
| Lista de verificación | Conjunto de pasos de una tarjeta que se marcan al completarse |
| WIP (*work in progress*) | Trabajo en curso; su límite evita empezar demasiado a la vez |
| Tiempo de ciclo | Tiempo que tarda una tarjeta desde que se empieza hasta que se termina |
| Archivar | Retirar una tarjeta del tablero sin borrarla |
