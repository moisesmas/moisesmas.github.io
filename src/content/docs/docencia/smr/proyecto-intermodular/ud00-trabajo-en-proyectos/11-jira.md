---
title: "2.1.1 Jira"
description: "Qué es una herramienta de gestión de incidencias como Jira: proyectos, tipos de incidencia, estados y flujo de trabajo, tableros, sprints, claves tipo PORT-12, prioridades e informes sencillos, y cómo organizar con ella el trabajo de un equipo de clase."
---

Cuando un proyecto tiene más de cuatro tareas y más de dos personas, la memoria y el grupo de mensajería dejan de bastar: nadie sabe quién hace qué, qué está terminado ni qué se ha olvidado. Una herramienta de **gestión de incidencias** (*issue tracker*) como **Jira** responde a tres preguntas a cualquier hora: **qué hay que hacer, quién lo hace y en qué punto está**. Esta página explica los conceptos; sirven para Jira y, con otros nombres, para casi cualquier herramienta parecida.

:::note[Las interfaces cambian]
Jira se actualiza con frecuencia: los menús, los nombres de algunas opciones y las condiciones de cada plan pueden cambiar de un mes a otro. Aquí se explican los **conceptos y el flujo de trabajo**, no las pantallas. Cuando tengas que buscar una opción concreta, consulta la ayuda oficial de la herramienta. Y no hace falta que tu equipo use Jira: lo importante es entender qué aporta este tipo de herramienta.
:::

## 1. El ejemplo que usaremos

La empresa ficticia **Reparaciones Byte Alacant, S. L.** quiere un **portal de incidencias** donde sus clientes avisen de una avería y vean cómo va la reparación. Tú y tres compañeros sois el equipo que lo desarrolla. En Jira crearíais un **proyecto** llamado «Portal de incidencias» con la **clave** `PORT`.

## 2. Proyecto y clave

Un **proyecto** agrupa todo el trabajo de un producto o de un equipo. Al crearlo eliges una **clave** corta en mayúsculas (`PORT`). Cada incidencia que crees recibirá esa clave seguida de un número que crece solo: `PORT-1`, `PORT-2`… `PORT-37`. Esa referencia es **única e inmutable**, y la usaremos para mencionar la tarea en conversaciones, ramas de Git, commits y documentos (la integración con Git se ve en 2.2.4).

También hay dos grandes tipos de proyecto según cómo trabaje el equipo: los que se basan en un tablero **Scrum** (con *sprints*) y los que usan un tablero **Kanban** (flujo continuo). Los dos conceptos se explican en las páginas 1.3.1 y 1.3.2.

## 3. Tipos de incidencia

Una **incidencia** (*issue*) es la unidad de trabajo. No tiene por qué ser un problema: puede ser una funcionalidad nueva. El **tipo** indica qué clase de trabajo es:

| Tipo | Qué representa | Ejemplo en el portal |
|---|---|---|
| **Épica** (*epic*) | Un bloque grande de trabajo que se descompone en varias historias | «Seguimiento de reparaciones por parte del cliente» |
| **Historia** (*story*) | Una funcionalidad vista desde el usuario | «Como cliente, quiero ver el estado de mi reparación para saber cuándo recogerla» |
| **Tarea** (*task*) | Un trabajo técnico o de organización que no es una función visible | «Preparar el servidor de pruebas» |
| **Error** (*bug*) | Algo que ya existe y no funciona como debe | «El buscador falla con tildes» |
| **Subtarea** (*sub-task*) | Un paso pequeño dentro de otra incidencia | «Escribir la consulta a la base de datos» |

Los nombres y los tipos disponibles dependen de cómo se configure el proyecto, pero esta jerarquía (épica → historia/tarea/error → subtarea) es la habitual. Cómo se redactan las historias de usuario se explica en 1.3.5.

## 4. Qué lleva una incidencia

Una incidencia bien creada contiene, como mínimo:

- **Resumen:** una frase corta y concreta («Mostrar el estado de la reparación en la ficha del cliente»).
- **Descripción:** qué se quiere, por qué y **cómo se sabrá que está hecha** (criterios de aceptación). En un error: pasos para reproducirlo, qué ocurre y qué debería ocurrir.
- **Responsable** (*assignee*): una persona. Si la tarea es «de todos», no es de nadie.
- **Prioridad:** cuánto importa respecto a las demás. Los valores habituales van de *máxima* (*highest*) a *mínima* (*lowest*).
- **Estimación:** en proyectos Scrum, normalmente **puntos de historia** (véase 1.3.6).
- **Etiquetas, componentes y fechas** para filtrar y organizar.
- **Comentarios y adjuntos:** la conversación y las capturas quedan junto a la tarea, no dispersas por el correo.
- **Vínculos** con otras incidencias («bloquea a», «está bloqueada por», «se relaciona con»).

:::tip[Un buen resumen]
Compara «Arreglar el login» con «El inicio de sesión rechaza contraseñas con el carácter ñ». La segunda sirve para encontrarla dentro de dos meses, repartirla y probarla.
:::

## 5. Estados y flujo de trabajo

Cada incidencia está en un **estado** que indica en qué punto del trabajo se encuentra. El conjunto de estados y las transiciones permitidas entre ellos es el **flujo de trabajo** (*workflow*). El mínimo habitual es:

```text
Por hacer  →  En curso  →  Hecho
```

Un equipo con revisión y pruebas puede ampliarlo:

```text
Por hacer → En curso → En revisión → En pruebas → Hecho
```

El flujo permite que cada paso sea visible y que haya reglas: por ejemplo, que una tarea no pase a «Hecho» sin pasar por «En revisión». Dos recomendaciones:

1. **Pocos estados.** Cada estado nuevo es más trabajo de mantenimiento. Si dudas, empieza con tres.
2. **Que «Hecho» signifique lo mismo para todos.** Es la **definición de hecho** (véase 1.3.2): código revisado, probado y fusionado, no solo «ya lo he escrito».

## 6. Tableros, backlog y sprints

El **tablero** (*board*) muestra las incidencias como tarjetas ordenadas en columnas que corresponden a los estados. Mover una tarjeta de columna cambia su estado. Es la vista de trabajo diaria del equipo.

- **Backlog:** la lista ordenada de todo lo pendiente. Lo más importante, arriba. Es la lista que gestiona la persona con el rol de *Product Owner*.
- **Tablero Scrum:** muestra solo las incidencias del **sprint** activo. Antes de empezar el sprint, el equipo elige del backlog lo que se compromete a terminar; al acabar, el sprint se cierra y lo no terminado vuelve al backlog o pasa al siguiente.
- **Tablero Kanban:** muestra todo el flujo continuo, sin sprints. Puede fijarse un **límite de trabajo en curso** por columna (véase 1.3.1).

## 7. Buscar, filtrar e informes

Cuando hay cientos de incidencias necesitas filtrar. Jira ofrece filtros visuales y un lenguaje de consulta propio, **JQL**. Una consulta típica sería:

```text
project = PORT AND assignee = currentUser() AND status != Done ORDER BY priority DESC
```

que significa «mis incidencias del proyecto PORT que no están hechas, de más a menos prioritarias». No hace falta aprender JQL de memoria, pero sí saber que existe y que se pueden guardar filtros.

Las herramientas de este tipo ofrecen **informes** sencillos que ayudan a que el equipo se mire en el espejo:

| Informe | Para qué sirve |
|---|---|
| **Burndown (trabajo pendiente)** | Ver si el sprint va al ritmo para terminar a tiempo |
| **Velocidad** | Cuántos puntos completa el equipo por sprint, para planificar los siguientes |
| **Flujo acumulado** | Detectar cuellos de botella: una columna que crece sin parar |
| **Resumen del sprint** | Qué se terminó y qué no |

## 8. Cómo organizar el trabajo de un equipo de clase

Una propuesta de arranque para un equipo de 3-4 personas del ciclo:

1. **Crear el proyecto** (o el tablero equivalente) con una clave corta y añadir a todos los miembros.
2. **Volcar el trabajo conocido** como incidencias: primero las épicas grandes, luego las historias y tareas. Cada una con resumen y criterios claros.
3. **Ordenar el backlog** por valor: lo que más necesita el cliente, arriba.
4. **Acordar el flujo** (tres o cuatro estados) y la definición de hecho. Escribidla en la descripción del proyecto.
5. **Trabajar con una cadencia:** reunión breve al empezar la jornada o la semana, revisar el tablero, actualizar los estados **cuando cambian** (no al final).
6. **Revisar al cerrar cada sprint o cada quincena:** qué se terminó, qué se bloqueó y qué cambiaríais.

Si tu centro no tiene Jira, el mismo flujo vale en una herramienta de tableros (véase 2.1.2 Trello) o incluso en una hoja de cálculo con columnas «clave, resumen, responsable, estado». Lo que importa es el hábito: **una única fuente de verdad** sobre el estado del proyecto.

:::caution[Errores típicos]
- Crear incidencias enormes («Hacer la web»): no se pueden terminar ni medir. Divide hasta que una persona pueda terminarla en uno o pocos días.
- Mover tarjetas solo antes de las reuniones: el tablero miente la mayor parte de la semana.
- Usar los comentarios para discusiones larguísimas: cuando se llega a una decisión, anótala en la descripción.
:::

## Comprueba lo aprendido

1. ¿Qué indica la clave `PORT-12`?

   <details><summary>Respuesta</summary>

   Que es la incidencia número 12 del proyecto cuya clave es `PORT`. La referencia es única y no cambia, por lo que sirve para nombrar ramas, commits y conversaciones.

   </details>

2. Un cliente no puede iniciar sesión porque el sistema rechaza una contraseña válida. ¿Qué tipo de incidencia crearías y qué datos mínimos llevaría?

   <details><summary>Respuesta</summary>

   Un **error** (*bug*). Debe incluir un resumen concreto, los pasos para reproducirlo, qué ocurre y qué debería ocurrir, la prioridad y una persona responsable.

   </details>

3. ¿Qué diferencia hay entre el backlog y el tablero de un sprint?

   <details><summary>Respuesta</summary>

   El backlog contiene todo lo pendiente, ordenado por importancia. El tablero del sprint solo contiene lo que el equipo se ha comprometido a hacer en ese sprint, repartido por estados.

   </details>

4. ¿Por qué conviene tener pocos estados en el flujo de trabajo?

   <details><summary>Respuesta</summary>

   Cada estado adicional supone más movimientos, más reglas y más posibilidades de que el tablero esté desactualizado. Con tres o cuatro estados bien definidos el equipo ve el avance sin esfuerzo.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Incidencia (*issue*) | Unidad de trabajo registrada en la herramienta: una funcionalidad, una tarea, un error… |
| Clave | Identificador único de una incidencia: la clave del proyecto más un número (`PORT-12`) |
| Épica | Incidencia grande que agrupa historias y tareas relacionadas |
| Flujo de trabajo (*workflow*) | Estados por los que pasa una incidencia y transiciones permitidas |
| Tablero (*board*) | Vista en columnas de las incidencias según su estado |
| Backlog | Lista ordenada de todo el trabajo pendiente |
| Sprint | Periodo fijo de trabajo con un objetivo; se define en 1.3.2 |
| JQL | Lenguaje de consulta de Jira para buscar y filtrar incidencias |
