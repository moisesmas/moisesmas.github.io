---
title: "2. Planificación de la CPU"
description: "Cómo elige el planificador el siguiente proceso: FIFO, SJF, SRTF, prioridades y Round Robin con ejemplos resueltos, tiempos de espera y de respuesta, inanición y problemas de sincronización como el interbloqueo."
---

Hay muchos más procesos listos que núcleos de CPU. Alguien tiene que decidir qué proceso se ejecuta a continuación y durante cuánto tiempo. Ese alguien es el **planificador**, y su decisión cambia lo rápido que se siente tu ordenador. En esta página aprenderás los principales algoritmos de planificación y, lo más importante, cómo calcular sus resultados a mano.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 4 y sigue cada ejemplo con lápiz y papel (unos 70 minutos).
2. Comprueba tu trabajo con las pestañas **Simulador del planificador** y **Duelo de algoritmos** del [Laboratorio del planificador de procesos](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/?lang=es#scheduler). Los apartados 5 y 6 corresponden a la pestaña **Sección crítica e interbloqueo**.
3. Haz las [actividades 3 y 4](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/es/).
:::

## 1. El planificador

Ya conoces los estados de un proceso (véase la [página 1](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/es/)). La **cola de listos** contiene los procesos que esperan la CPU. El SO usa tres responsables de decidir, que se nombran según la frecuencia con la que actúan:

- El **planificador a largo plazo** decide qué programas nuevos se admiten en el sistema (y en la cola de listos). Windows y Linux lo hacen casi sin límites, pero un servidor puede rechazar trabajos nuevos cuando está lleno.
- El **planificador a medio plazo** saca procesos de la RAM al disco y los devuelve (*swapping*), por ejemplo un proceso que lleva mucho tiempo inactivo. Lo verás en la [página 3](/docencia/smr/som/ud03-funciones-sistema-operativo/03-memory-management/es/).
- El **planificador a corto plazo**, llamado también *planificador de CPU*, elige qué proceso listo se ejecuta a continuación. Actúa muchas veces por segundo. Cuando se dice «el planificador», se habla de este.

El **despachador** (*dispatcher*) es el pequeño código que entrega la CPU al proceso elegido por el planificador. Hace el cambio de contexto.

Un algoritmo de planificación es **no expulsivo** si el proceso conserva la CPU hasta que termina o espera una E/S. Es **expulsivo** (*preemptive*) si el SO puede quitar la CPU a un proceso en ejecución, por ejemplo cuando se acaba su tiempo o cuando llega un proceso más importante. Todos los sistemas de escritorio modernos son expulsivos, porque si no, un programa que nunca termina bloquearía el ordenador.

## 2. Datos y medidas

Para simular un algoritmo necesitas estos datos de cada proceso:

- **Tiempo de llegada** (A): el momento en que el proceso entra en la cola de listos.
- **Tiempo de ráfaga** (B), o tiempo de ejecución: el tiempo total de CPU que necesita el proceso. En nuestros ejercicios usamos números enteros de *unidades de tiempo* e ignoramos la E/S.
- **Prioridad**, solo para los algoritmos de prioridades. En este curso, **un número menor significa una prioridad mayor**.

Cuando termina la simulación, calculas para cada proceso:

| Medida | Fórmula | Significado |
|---|---|---|
| **Tiempo de finalización** (C) | se lee en el diagrama de Gantt | El momento en que acaba el proceso |
| **Tiempo de respuesta** (R) | C − A | Tiempo desde que llega hasta que el resultado está listo (muchos libros lo llaman *tiempo de retorno*) |
| **Tiempo de espera** (W) | R − B | Tiempo que pasa en la cola de listos, sin ejecutarse |

Después calculas los **promedios** de W y de R, que te dicen lo bueno que es el algoritmo para esa carga. Algunos libros usan «tiempo de respuesta» para el tiempo desde la llegada hasta la *primera* vez que el proceso obtiene la CPU. El laboratorio lo muestra como **Retraso de inicio**. En este curso, el tiempo de respuesta es C − A.

La herramienta para dibujar el resultado es el **diagrama de Gantt**: una línea de tiempo que muestra qué proceso tiene la CPU en cada unidad de tiempo.

Otras medidas que debes conocer: la **utilización de la CPU** (el porcentaje de tiempo que la CPU trabaja), el **rendimiento** (*throughput*: procesos terminados por unidad de tiempo) y el número de **cambios de contexto**, porque cada uno hace perder algo de tiempo.

### La carga de ejemplo

Usaremos los mismos cuatro procesos en todos los algoritmos del apartado siguiente:

| Proceso | Llegada (A) | Ráfaga (B) | Prioridad |
|---|---|---|---|
| P1 | 0 | 6 | 4 |
| P2 | 1 | 3 | 1 |
| P3 | 2 | 1 | 3 |
| P4 | 3 | 4 | 2 |

El tiempo total de CPU es 6 + 3 + 1 + 4 = 14 unidades, y la CPU nunca está ociosa, así que todos los algoritmos terminan en el instante 14.

## 3. Algoritmos de planificación, paso a paso

### 3.1 FIFO (First In, First Out)

Los procesos se ejecutan en orden de llegada. No es expulsivo. Es simple y justo en el sentido de «el primero que llega, el primero que se atiende», pero un proceso largo al principio hace esperar a todos los demás (el *efecto convoy*).

```text
Gantt:  P1 [0-6]  P2 [6-9]  P3 [9-10]  P4 [10-14]
```

| Proceso | C | R = C − A | W = R − B |
|---|---|---|---|
| P1 | 6 | 6 − 0 = 6 | 6 − 6 = 0 |
| P2 | 9 | 9 − 1 = 8 | 8 − 3 = 5 |
| P3 | 10 | 10 − 2 = 8 | 8 − 1 = 7 |
| P4 | 14 | 14 − 3 = 11 | 11 − 4 = 7 |

Tiempo de espera medio = (0 + 5 + 7 + 7) / 4 = **4,75**. Tiempo de respuesta medio = (6 + 8 + 8 + 11) / 4 = **8,25**. Cambios de contexto: 3.

### 3.2 SJF (Shortest Job First)

Cuando la CPU queda libre, el SO elige el proceso listo con la **ráfaga más corta**. No es expulsivo. Da el mejor tiempo de espera medio entre los algoritmos no expulsivos, pero necesita conocer la ráfaga de antemano (los sistemas reales solo pueden estimarla) y los procesos largos pueden esperar para siempre.

En el instante 0 solo P1 está listo, así que empieza y se ejecuta hasta el 6. En el 6, P2 (3), P3 (1) y P4 (4) están listos: P3 es el más corto, después P2 y después P4.

```text
Gantt:  P1 [0-6]  P3 [6-7]  P2 [7-10]  P4 [10-14]
```

Tiempos de finalización: P1 = 6, P3 = 7, P2 = 10, P4 = 14. Tiempos de espera: P1 = 0, P2 = 6, P3 = 4, P4 = 7. Tiempo de espera medio = 17 / 4 = **4,25**. Tiempos de respuesta: 6, 9, 5, 11; media **7,75**.

### 3.3 SRTF (Shortest Remaining Time First)

Es la versión expulsiva de SJF. En todo momento la CPU va al proceso con **menos tiempo restante**. Si llega un proceso nuevo con menos tiempo restante que el que se ejecuta, se queda con la CPU.

- t = 0: solo P1 (restante 6). Se ejecuta.
- t = 1: llega P2 con 3. A P1 le quedan 5, así que P2 lo expulsa.
- t = 2: llega P3 con 1. A P2 le quedan 2, así que P3 lo expulsa. P3 termina en el 3.
- t = 3: llega P4 (4). Listos: P1 (5), P2 (2), P4 (4). Se ejecuta P2 y termina en el 5.
- t = 5: P1 (5) y P4 (4): se ejecuta P4 hasta el 9. Después termina P1.

```text
Gantt:  P1 [0-1]  P2 [1-2]  P3 [2-3]  P2 [3-5]  P4 [5-9]  P1 [9-14]
```

| Proceso | C | R | W |
|---|---|---|---|
| P1 | 14 | 14 | 8 |
| P2 | 5 | 4 | 1 |
| P3 | 3 | 1 | 0 |
| P4 | 9 | 6 | 2 |

Tiempo de espera medio = 11 / 4 = **2,75**. Tiempo de respuesta medio = 25 / 4 = **6,25**. Cambios de contexto: 5. Aquí tiene el mejor promedio, pero no es realista por la misma razón que SJF.

### 3.4 Prioridades (no expulsivas y expulsivas)

Cada proceso tiene una prioridad y la CPU va al proceso listo con la **prioridad más alta** (número más bajo). Si dos tienen la misma prioridad, decide FIFO.

**No expulsivas.** P1 empieza en el 0 (está solo) y se ejecuta hasta el 6. En el 6 las prioridades son P2 = 1, P4 = 2, P3 = 3, así que el orden es P2, P4, P3.

```text
Gantt:  P1 [0-6]  P2 [6-9]  P4 [9-13]  P3 [13-14]
```

Tiempos de espera: P1 = 0, P2 = 5, P3 = 11, P4 = 6. Media **5,50**. Tiempos de respuesta: 6, 8, 12, 10; media **9,00**.

**Expulsivas.** En t = 1 llega P2 (prioridad 1) y quita la CPU a P1. Nadie puede superar la prioridad 1, así que P2 se ejecuta hasta el 4. En el 4 los procesos listos son P1 (4), P3 (3) y P4 (2): P4 se ejecuta hasta el 8; después P3 (prioridad 3) hasta el 9, y P1 termina en el 14.

```text
Gantt:  P1 [0-1]  P2 [1-4]  P4 [4-8]  P3 [8-9]  P1 [9-14]
```

Tiempos de espera: P1 = 8, P2 = 0, P3 = 6, P4 = 1. Media **3,75**. Tiempos de respuesta: 14, 3, 7, 5; media **7,25**.

### 3.5 Round Robin (RR)

Round Robin da a cada proceso una porción corta de tiempo de CPU, el **quantum** (q), en el orden de la cola de listos (FIFO). Cuando acaba el quantum y el proceso no ha terminado, pasa al **final de la cola**. Si termina antes de que acabe el quantum, el siguiente proceso empieza inmediatamente. Es expulsivo y es la base de los sistemas de tiempo compartido.

:::note[Una convención que debes conocer]
¿Qué pasa si un proceso nuevo llega justo cuando acaba un quantum? Hay dos órdenes posibles. En este curso (y en el laboratorio) **el proceso nuevo entra primero en la cola, y después el proceso que ha sido expulsado**. Si un ejercicio no dice otra cosa, usa esta regla.
:::

Ejemplo con q = 2. El estado de la cola se muestra después de cada decisión:

| Tiempo | Se ejecuta | Cola después (el frente a la izquierda) | Nota |
|---|---|---|---|
| 0–2 | P1 (6 → 4) | P2, P3, P1 | P2 llegó en el 1; P3 llega en el 2 y entra **antes** que P1 |
| 2–4 | P2 (3 → 1) | P3, P1, P4, P2 | P4 llegó en el 3 |
| 4–5 | P3 (1 → 0) | P1, P4, P2 | P3 termina antes de acabar el quantum |
| 5–7 | P1 (4 → 2) | P4, P2, P1 | |
| 7–9 | P4 (4 → 2) | P2, P1, P4 | |
| 9–10 | P2 (1 → 0) | P1, P4 | |
| 10–12 | P1 (2 → 0) | P4 | |
| 12–14 | P4 (2 → 0) | vacía | |

```text
Gantt:  P1 [0-2]  P2 [2-4]  P3 [4-5]  P1 [5-7]  P4 [7-9]  P2 [9-10]  P1 [10-12]  P4 [12-14]
```

Tiempos de finalización: P1 = 12, P2 = 10, P3 = 5, P4 = 14. Tiempos de espera: P1 = 6, P2 = 6, P3 = 2, P4 = 7. Tiempo de espera medio = 21 / 4 = **5,25**. Tiempos de respuesta: 12, 9, 3, 11; media **8,75**. Cambios de contexto: 7.

**El quantum importa.** Si q es enorme, RR se comporta como FIFO. Si q es minúsculo, la CPU pasa más tiempo cambiando que trabajando. Un quantum real típico es de algunos milisegundos. Prueba el deslizador del quantum en la pestaña **Duelo de algoritmos**.

### 3.6 Comparación

| Algoritmo | Expulsivo | Espera media | Respuesta media | Cambios de contexto | Problema principal |
|---|---|---|---|---|---|
| FIFO | No | 4,75 | 8,25 | 3 | Efecto convoy |
| SJF | No | 4,25 | 7,75 | 3 | Necesita la ráfaga; inanición |
| SRTF | Sí | 2,75 | 6,25 | 5 | Necesita la ráfaga; inanición |
| Prioridades (no expulsivas) | No | 5,50 | 9,00 | 3 | Inanición |
| Prioridades (expulsivas) | Sí | 3,75 | 7,25 | 4 | Inanición |
| Round Robin (q = 2) | Sí | 5,25 | 8,75 | 7 | Muchos cambios de contexto |

Ningún algoritmo es el mejor para todo. Los promedios esconden que RR es más justo: nadie espera mucho sin ejecutarse.

## 4. Qué hacen los sistemas reales

Windows y Linux usan **colas multinivel con realimentación**, una mezcla de prioridades y Round Robin:

- Hay una cola para cada nivel de prioridad. El planificador ejecuta siempre un proceso de la cola no vacía de mayor prioridad.
- Dentro de un nivel, los procesos se reparten la CPU con Round Robin.
- El sistema **cambia la prioridad** de los procesos mientras se ejecutan: un proceso que gasta todo su quantum se considera «hambriento de CPU» y puede perder prioridad, y un proceso que espera al teclado o al disco recibe un premio. Así las ventanas que usas responden con agilidad.

Windows tiene 32 niveles de prioridad y ejecuta siempre el hilo listo de mayor prioridad. Linux usa un planificador *justo* que reparte el tiempo de CPU entre las tareas según su valor nice. En realidad, los sistemas modernos planifican **hilos**, que son las partes de un proceso que pueden ejecutarse por separado, pero las ideas son las mismas.

### Inanición y envejecimiento

En los algoritmos de prioridades y en SJF, un proceso puede esperar **para siempre** si siguen llegando procesos más importantes o más cortos. Es la **inanición** (*starvation*). La solución es el **envejecimiento** (*aging*): cuanto más espera un proceso, más sube su prioridad, hasta que obtiene la CPU. La pestaña **Duelo de algoritmos** del laboratorio tiene una demostración con y sin envejecimiento.

## 5. Compartir recursos: secciones críticas

Los procesos que trabajan solos son *independientes*. Los procesos que comparten algo, como un archivo, una impresora o una variable en memoria compartida, son *cooperantes*, y esto puede causar errores.

Imagina dos procesos que imprimen un informe en la misma impresora sin ningún control. El planificador puede cambiar entre ellos después de cada línea, y el papel tendría líneas de los dos informes mezcladas. Del mismo modo, si dos procesos suman 1 a la misma variable, pueden leer el mismo valor antiguo y se pierde una de las actualizaciones. Este error es una **condición de carrera**: el resultado depende del orden exacto en que el planificador ejecuta los procesos.

La parte de un programa que usa un recurso compartido es su **sección crítica**. La solución es la **exclusión mutua**: solo un proceso puede estar en su sección crítica a la vez. El SO ofrece herramientas como los **cerrojos (mutex)** y los **semáforos**:

1. Un proceso pide el cerrojo antes de entrar en la sección crítica.
2. Si el cerrojo está ocupado, el proceso pasa al estado **Bloqueado**.
3. Cuando el propietario termina, libera el cerrojo y el proceso que esperaba pasa a **Listo**.

La primera parte de la pestaña **Sección crítica e interbloqueo** te deja ver las páginas mezcladas con y sin el cerrojo.

## 6. Interbloqueo

Un cerrojo resuelve un problema y puede crear otro. En un **interbloqueo** (*deadlock*), dos o más procesos se esperan unos a otros para siempre:

- P1 tiene la impresora y pide el escáner.
- P2 tiene el escáner y pide la impresora.

Ninguno puede continuar y ninguno libera lo que tiene. Para que haya interbloqueo, deben cumplirse **cuatro condiciones** a la vez:

| Condición | Significado en el ejemplo |
|---|---|
| Exclusión mutua | Un recurso solo puede usarlo un proceso a la vez |
| Retención y espera | Un proceso conserva lo que tiene mientras espera más |
| Sin expropiación | No se puede quitar un recurso a su propietario |
| Espera circular | P1 espera a P2 y P2 espera a P1 |

Si rompes una condición, el interbloqueo no puede ocurrir. La forma más fácil es hacer que todos los procesos pidan los recursos **en el mismo orden** (primero la impresora, después el escáner): no hay círculo. Otras opciones: pedir todos los recursos a la vez, permitir que el SO quite un recurso, o detectar el interbloqueo y finalizar uno de los procesos. Muchos sistemas de escritorio simplemente no hacen nada y confían en que el usuario cierre el programa bloqueado.

En el laboratorio puedes crear un interbloqueo paso a paso y después romperlo.

## Comprueba lo aprendido

1. Tres procesos llegan en t = 0 con ráfagas de 8, 2 y 4 (en este orden de llegada). Calcula el tiempo de espera medio con FIFO y con SJF.

   <details>
   <summary>Respuesta</summary>

   FIFO: el orden es 8, 2, 4. Los tiempos de espera son 0, 8 y 10, así que la media es 18 / 3 = **6**. SJF: el orden es 2, 4, 8. Los tiempos de espera son 0, 2 y 6, así que la media es 8 / 3 = **2,67**.

   </details>

2. ¿Por qué SRTF es «mejor» en los promedios pero no se usa en los sistemas reales?

   <details>
   <summary>Respuesta</summary>

   Necesita conocer de antemano el tiempo restante de cada proceso, algo que el SO no puede saber; solo tiene estimaciones. Además, hace que los procesos largos sufran inanición si siguen llegando cortos, y provoca más cambios de contexto.

   </details>

3. En Round Robin con q = 3 se ejecuta un proceso con una ráfaga de 2. ¿Cuánto tiempo conserva la CPU?

   <details>
   <summary>Respuesta</summary>

   Solo 2 unidades de tiempo. Si un proceso termina antes de que acabe el quantum, libera la CPU al instante y empieza el siguiente proceso de la cola.

   </details>

4. Un proceso de prioridad 5 lleva dos minutos esperando porque siguen llegando procesos de prioridad 1. ¿Cómo se llama este problema y cómo se resuelve?

   <details>
   <summary>Respuesta</summary>

   Es la **inanición**. Se resuelve con el **envejecimiento**: subir la prioridad de un proceso a medida que crece su tiempo de espera.

   </details>

5. ¿Qué condición de las cuatro del interbloqueo rompes si todos los procesos piden los recursos en el mismo orden?

   <details>
   <summary>Respuesta</summary>

   La **espera circular**. Con un orden fijo no puede aparecer un ciclo de procesos que se esperan unos a otros.

   </details>

## Glosario

| English | Castellano |
|---|---|
| scheduler | planificador |
| dispatcher | despachador |
| ready queue | cola de listos |
| preemptive / non-preemptive | expulsivo / no expulsivo |
| arrival time | tiempo de llegada |
| burst time / execution time | tiempo de ráfaga / de ejecución |
| completion time | tiempo de finalización |
| response time (turnaround) | tiempo de respuesta (retorno) |
| waiting time | tiempo de espera |
| Gantt chart | diagrama de Gantt |
| quantum / time slice | quantum / porción de tiempo |
| starvation | inanición |
| aging | envejecimiento |
| race condition | condición de carrera |
| critical section | sección crítica |
| mutual exclusion | exclusión mutua |
| lock (mutex) / semaphore | cerrojo (mutex) / semáforo |
| deadlock | interbloqueo (abrazo mortal) |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
