---
title: "1.3.1 Kanban"
description: "Qué es Kanban y cómo funciona un tablero: columnas, tarjetas, límites de trabajo en curso (WIP), flujo y métricas sencillas como lead time, cycle time y throughput."
---

Imagina que en el taller de *Reparaciones Byte Alacant* hay doce equipos abiertos sobre las mesas: cada técnico ha empezado varios y no ha terminado ninguno. Todos están «ocupados» y, sin embargo, los clientes esperan. **Kanban** ataca justo ese problema: hacer **visible** el trabajo y **limitar** cuánto se hace a la vez, para terminar cosas en lugar de empezar muchas.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 40 de práctica.

1. Lee las secciones 1 a 4.
2. Abre la pestaña «Tablero Kanban» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#tablero), mueve tarjetas y provoca un aviso de límite superado.
3. Lee las secciones 5 y 6 y haz el *Ejercicio Kanban* de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-agil/).
:::

## 1. Qué es Kanban

La palabra japonesa *kanban* significa algo así como «tarjeta» o «señal visual». Se hizo famosa en las fábricas de Toyota: una tarjeta avisaba de que había que reponer una pieza justo cuando se necesitaba, en lugar de acumular material «por si acaso». Años después, esa forma de pensar se adaptó al trabajo intelectual y al desarrollo de software.

Hoy, cuando se habla de Kanban en un proyecto, se entiende como un **método para gestionar el flujo de trabajo** con tres ideas básicas:

1. **Visualizar** todo el trabajo en un tablero que cualquiera pueda entender de un vistazo.
2. **Limitar el trabajo en curso** (*Work In Progress*, **WIP**).
3. **Gestionar el flujo**: observar cuánto tardan las tareas y dónde se atascan, y mejorar.

No tiene roles obligatorios ni iteraciones de duración fija. Se puede empezar con el sistema de trabajo que ya tienes, dibujarlo en un tablero y mejorarlo poco a poco.

## 2. El tablero

Un tablero Kanban es una tabla. Cada **columna** es una etapa del trabajo y cada **tarjeta** es una unidad de trabajo que avanza de izquierda a derecha.

| Pendiente | En curso | En pruebas | Hecho |
|---|---|---|---|
| Informe mensual de incidencias | Formulario de nueva incidencia | Listado de incidencias del cliente | Pantalla de inicio de sesión |
| Aviso por correo al cerrar una incidencia | Filtro por estado | | Alta de usuarios |

Los elementos de un tablero:

| Elemento | Qué es | Consejo |
|---|---|---|
| **Columna** | Una etapa del flujo real de trabajo | Nómbrala con lo que de verdad ocurre en tu equipo («En revisión», no «Fase 3») |
| **Tarjeta** | Una unidad de trabajo (tarea, historia, avería) | Título claro; si hay detalles, quién la hace y fecha límite |
| **Límite WIP** | Número máximo de tarjetas permitidas en una columna (o en varias) | Se escribe junto al nombre de la columna: «En curso (3)» |
| **Políticas explícitas** | Reglas escritas de cuándo una tarjeta puede pasar a la siguiente columna | «En pruebas» solo si el código está subido y revisado |
| **Calles (*swimlanes*)** | Filas horizontales para separar tipos de trabajo | Por ejemplo, «Urgente» y «Normal» |

:::note[Primero, lo que ya haces]
Un error típico es copiar el tablero de otro equipo. Dibuja el tuyo con las etapas que realmente tiene vuestro trabajo; ya lo cambiaréis cuando aprendáis cosas.
:::

### Cómo se mueve una tarjeta

Kanban es un sistema de **tirar** (*pull*), no de empujar. Quien termina su trabajo **tira** de la siguiente tarjeta de la columna anterior cuando tiene hueco; nadie le empuja tareas nuevas si no hay capacidad. Por eso los límites WIP son tan importantes: sin ellos, el trabajo se empuja y se acumula.

## 3. Límites WIP: la regla más importante

Un **límite WIP** dice cuántas tarjetas puede haber a la vez en una columna. Si la columna «En curso» tiene límite 3 y ya contiene tres tarjetas, nadie puede arrancar una cuarta hasta que se termine alguna. 

### Por qué ayudan

- **Obligan a terminar** antes de empezar. El trabajo a medias no vale nada para el cliente.
- **Destapan los cuellos de botella.** Si la columna «En pruebas» se llena y bloquea las anteriores, sabes dónde está el problema: hay que ayudar con las pruebas, no programar más.
- **Reducen los cambios de contexto.** Una persona con cinco tareas abiertas pierde tiempo cada vez que cambia de una a otra.
- **Acortan los plazos.** Con menos cosas a la vez, cada una pasa menos tiempo esperando.

### Cómo elegir un límite

No hay un número mágico. Una regla de partida: un valor cercano al **número de personas** que trabajan en esa etapa, y se ajusta observando. Si el límite nunca se alcanza, es demasiado alto; si el equipo está parado la mayor parte del tiempo, quizá es demasiado bajo.

### Ejemplo

El equipo del portal de incidencias tiene tres personas y este tablero:

| Columna | Límite | Tarjetas ahora |
|---|---|---|
| Pendiente | sin límite | 6 |
| En curso | 3 | 3 |
| En pruebas | 2 | 2 |
| Hecho | sin límite | 4 |

Una persona termina su tarjeta de «En curso». ¿Puede moverla a «En pruebas»? **No**: «En pruebas» ya está en su límite (2/2). Lo que debe hacer es ayudar a probar para que salga alguna tarjeta. Mientras tanto no empieza nada nuevo en «En curso» si eso supera su límite.

:::caution[Los límites no se esquivan]
Si cada vez que el límite estorba se «salta» por urgencia, el límite deja de servir. Si hay urgencias frecuentes, créales una calle aparte con su propia regla (por ejemplo, «máximo una urgencia a la vez»).
:::

## 4. Flujo y métricas sencillas

Kanban no se limita a mover tarjetas: se observa el flujo para mejorarlo. Con solo anotar **cuándo se crea**, **cuándo se empieza** y **cuándo se termina** cada tarjeta, ya se pueden calcular las métricas más útiles.

| Métrica | Qué mide | Cómo se calcula |
|---|---|---|
| **Lead time** | Lo que espera el cliente: desde que se pide hasta que se entrega | Fecha de fin − fecha en la que se solicitó |
| **Cycle time** | Lo que tarda el equipo: desde que se empieza a trabajar hasta que se termina | Fecha de fin − fecha de inicio |
| **Throughput (rendimiento)** | Cuántas tarjetas se terminan por unidad de tiempo | Tarjetas terminadas en la semana |
| **WIP** | Cuántas tarjetas hay en marcha ahora | Contar las tarjetas en columnas «en curso» |

### Ejemplo con números

Una tarjeta, «Aviso por correo al cerrar una incidencia», se crea el día 1, se empieza el día 4 y se termina el día 8.

- **Lead time** = 8 − 1 = **7 días**.
- **Cycle time** = 8 − 4 = **4 días**.
- Los tres días de diferencia son tiempo **esperando** en «Pendiente».

### Una relación útil

Para un sistema estable, existe una relación sencilla (la ley de Little):

```text
cycle time medio = WIP medio ÷ throughput medio
```

Si el equipo termina 2 tarjetas al día de media y suele tener 8 en marcha, cada tarjeta tarda en torno a 8 ÷ 2 = **4 días**. Si bajas el WIP a 4 manteniendo el mismo rendimiento, el cycle time baja a 2 días. Esto es lo que hace tan potente limitar el trabajo en curso.

### El diagrama de flujo acumulado

Si cada día anotas cuántas tarjetas hay en cada columna y las apilas en un gráfico, obtienes un **diagrama de flujo acumulado**. Cuando la banda de una columna crece cada vez más, hay un cuello de botella justo ahí. No tienes que dibujarlo ahora, pero conviene saber que existe.

## 5. Kanban frente a Scrum

Ambos son marcos ágiles, pero se organizan de forma distinta:

| Aspecto | Kanban | Scrum |
|---|---|---|
| **Ritmo** | Flujo continuo | Iteraciones (sprints) de duración fija |
| **Roles** | No obliga a ninguno | Product Owner, Scrum Master y Developers |
| **Cambios durante el ciclo** | Se pueden incorporar en cualquier momento (si hay hueco en el WIP) | Se evitan dentro del sprint; entran en el siguiente |
| **Qué se limita** | El trabajo en curso (WIP) | El trabajo comprometido en el sprint |
| **Métrica típica** | Lead time, cycle time, throughput | Velocidad |
| **Cuándo encaja mejor** | Trabajo con llegadas impredecibles: soporte, mantenimiento, averías | Desarrollo de un producto con objetivos por periodos |

Para un servicio técnico como el de Byte Alacant, donde las averías llegan a cualquier hora, Kanban resulta muy natural. Para construir el portal de incidencias, Scrum o un tablero con sprints puede encajar mejor. Ambas cosas se pueden combinar.

:::note[Las interfaces cambian]
Hay muchas herramientas para tableros Kanban (en la página sobre Trello, 2.1.2, verás una). Sus pantallas y planes cambian con frecuencia; lo importante son los conceptos de esta página. Para los pasos exactos, consulta la ayuda oficial de la herramienta que uses.
:::

## 6. Buenas prácticas para usar un tablero

- **Una tarjeta, una unidad de trabajo terminable.** Si una tarjeta lleva tres semanas en «En curso», es demasiado grande: divídela.
- **Actualiza el tablero cada día.** Un tablero desactualizado miente y es peor que no tenerlo.
- **Marca los bloqueos.** Si una tarjeta no puede avanzar (esperas una contraseña del cliente), señálala claramente y habla de ella en la reunión diaria.
- **Revisa el tablero en equipo** con una reunión breve a diario: se lee de derecha a izquierda, empezando por lo más cercano a «Hecho», para priorizar terminar.
- **Mejora poco a poco.** Cambia un límite o una política, observa dos semanas y decide.

## Comprueba lo aprendido

1. ¿Qué significa WIP y por qué limitarlo ayuda a entregar antes?

   <details>
   <summary>Respuesta</summary>

   *Work In Progress*: trabajo en curso. Si se limita, las personas terminan lo que ya empezaron antes de abrir tareas nuevas, hay menos cambios de contexto y cada tarea pasa menos tiempo esperando, de modo que el plazo medio baja.
   </details>

2. «En curso» tiene límite 3 y contiene 3 tarjetas. Una persona de otra columna quiere traer una tarjeta nueva. ¿Qué debe ocurrir?

   <details>
   <summary>Respuesta</summary>

   No puede entrar hasta que termine alguna de las tres. Lo razonable es ayudar a terminar o desbloquear lo que ya está en curso.
   </details>

3. Una tarjeta se crea el día 2, se empieza el día 5 y se termina el día 9. Calcula lead time y cycle time.

   <details>
   <summary>Respuesta</summary>

   Lead time = 9 − 2 = 7 días. Cycle time = 9 − 5 = 4 días.
   </details>

4. Un equipo termina de media 3 tarjetas al día y tiene siempre unas 12 en marcha. ¿Cuánto tarda de media cada tarjeta?

   <details>
   <summary>Respuesta</summary>

   12 ÷ 3 = 4 días de cycle time medio (ley de Little).
   </details>

5. Si la columna «En pruebas» está siempre llena y las demás vacías, ¿dónde está el cuello de botella y qué haría un equipo Kanban?

   <details>
   <summary>Respuesta</summary>

   En «En pruebas». El equipo dejaría de empezar trabajo nuevo y dedicaría personas a probar hasta que la columna se vacíe, y después revisaría por qué esa etapa es lenta.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Kanban** | Método para gestionar el flujo de trabajo visualizándolo y limitando el trabajo en curso. |
| **Tablero** | Representación visual del flujo: columnas (etapas) y tarjetas (trabajo). |
| **Tarjeta** | Unidad de trabajo que se mueve por el tablero. |
| **WIP** | *Work In Progress*: cantidad de trabajo empezado y no terminado. |
| **Límite WIP** | Máximo de tarjetas permitido en una columna o conjunto de columnas. |
| **Sistema *pull*** | Quien tiene capacidad «tira» del siguiente trabajo, en vez de recibirlo empujado. |
| **Lead time** | Tiempo desde que se pide algo hasta que se entrega. |
| **Cycle time** | Tiempo desde que se empieza a trabajar hasta que se termina. |
| **Throughput** | Número de tarjetas terminadas por unidad de tiempo. |
| **Cuello de botella** | Etapa que limita el ritmo de todo el flujo. |
