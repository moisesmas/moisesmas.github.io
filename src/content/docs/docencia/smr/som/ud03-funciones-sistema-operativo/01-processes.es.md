---
title: "1. Procesos y servicios"
description: "Las funciones de un sistema operativo, qué es un proceso, en qué se diferencian procesos y servicios, los estados de un proceso y cómo verlos y controlarlos en Linux y en Windows."
---

Ahora mismo tu ordenador está ejecutando cientos de programas a la vez: el navegador, el reloj, el antivirus, el servicio de red y muchos más. El sistema operativo consigue que todos funcionen sin pelearse por los mismos recursos. En esta página verás las funciones principales de un sistema operativo y después estudiarás con detalle la primera: la gestión de procesos.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 7 (unos 60 minutos).
2. Practica con el [Laboratorio del planificador de procesos](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/?lang=es): las pestañas **Inspector de procesos**, **Máquina de estados** y **Terminal** corresponden a esta página.
3. Responde a las preguntas del final y haz las [actividades 1 y 2](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/es/).
:::

## 1. Qué hace el sistema operativo por ti

En la unidad 1 viste que el sistema operativo (SO) está entre las aplicaciones y el hardware. Su trabajo es **gestionar los recursos** del ordenador: la CPU, la memoria, el almacenamiento y los dispositivos. También decide quién puede usar cada recurso.

| Función | Recurso que gestiona | Pregunta a la que responde | Página |
|---|---|---|---|
| **Gestión de procesos** | Tiempo de CPU | ¿Qué programa se ejecuta ahora y durante cuánto tiempo? | [1](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/es/) y [2](/docencia/smr/som/ud03-funciones-sistema-operativo/02-cpu-scheduling/es/) |
| **Gestión de memoria** | RAM | ¿En qué parte de la memoria vive cada programa? | [3](/docencia/smr/som/ud03-funciones-sistema-operativo/03-memory-management/es/) |
| **Gestión de archivos** | Almacenamiento | ¿Cómo se guardan, se encuentran y se protegen los archivos de un disco? | [4](/docencia/smr/som/ud03-funciones-sistema-operativo/04-storage-and-file-systems/es/) |
| **Gestión de E/S** | Dispositivos | ¿Cómo habla la CPU con una impresora, un disco o un teclado? | [5](/docencia/smr/som/ud03-funciones-sistema-operativo/05-io-and-security/es/) |
| **Gestión de la seguridad** | Todos | ¿Quién puede leer, escribir o ejecutar esto? | [5](/docencia/smr/som/ud03-funciones-sistema-operativo/05-io-and-security/es/) |

El SO también hace otras tareas menores: registra cuánta CPU y memoria ha usado cada usuario o programa (**contabilidad**), detecta errores y escribe mensajes en registros, y ofrece una interfaz de usuario. Las conocerás todas en esta unidad.

## 2. Programa y proceso

Un **programa** es un archivo del disco con instrucciones. Por sí solo no hace nada. Un **proceso** es un programa que se **está ejecutando**: el SO lo ha cargado en memoria y le da tiempo de CPU.

Un mismo programa puede crear varios procesos. Si abres tres ventanas del navegador o tres terminales, tienes tres procesos de un solo programa, cada uno con sus propios datos.

Cuando el SO crea un proceso, le da:

- un **PID** (identificador de proceso), un número único;
- un área de memoria en la que otros procesos no pueden escribir: el **código** (las instrucciones), los **datos**, el **heap** (memoria que se pide durante la ejecución) y la **pila** (zona de trabajo para las llamadas a funciones);
- recursos como archivos abiertos y conexiones de red.

El SO guarda toda la información de un proceso en una estructura de datos llamada **bloque de control de proceso (PCB)**. Es el «documento de identidad» del proceso.

| Campo del PCB | Significado | Dónde puedes verlo |
|---|---|---|
| PID | Número único del proceso | `ps`, `top`, Administrador de tareas |
| PPID | PID del padre (el proceso que lo creó) | `ps -ef` |
| Estado | Listo, en ejecución, bloqueado... | Columna `STAT` de `ps` |
| Prioridad | Cuánta importancia tiene para el planificador | `PR` y `NI` en `top` |
| Registros de la CPU y contador de programa | Dónde estaba el proceso cuando dejó la CPU | No es visible para los usuarios |
| Información de memoria | Qué áreas de memoria posee | `%MEM`, `RSS`, `VSZ` |
| Archivos abiertos, propietario y privilegios | Qué puede usar y quién lo lanzó | `USER`, `lsof` |

La pestaña **Inspector de procesos** del laboratorio muestra un PCB para cada proceso de un sistema simulado.

:::note[Todo proceso tiene un padre]
Un proceso nuevo siempre lo crea otro. Cuando escribes una orden en un terminal, el shell crea un proceso hijo para ella. En lo más alto del árbol hay un primer proceso: `systemd` en la mayoría de los sistemas Linux (PID 1) y `System` o `smss.exe` en Windows. Lo inicia el propio SO al arrancar.
:::

## 3. Procesos de usuario, procesos del sistema y servicios

Podemos clasificar los procesos según **quién los inicia**:

- Los **procesos de usuario** los inicia una persona: un navegador, un editor de texto, un terminal. Se ejecutan con los derechos de ese usuario. En un sistema multiusuario, los procesos de usuarios distintos se ejecutan a la vez.
- Los **procesos del sistema** los inicia el SO para dar una función al sistema. La mayoría arrancan con el sistema y se ejecutan con privilegios altos.

Un **servicio** (en Linux, un **demonio** o *daemon*) es un tipo especial de proceso del sistema: se ejecuta en **segundo plano**, sin ventana, y espera trabajo. Un servidor web, el gestor de impresión, el sincronizador de la hora y el cortafuegos son servicios. Muchos servicios de Linux tienen un nombre que termina en `d`: `sshd`, `cupsd`, `crond`.

| | Linux | Windows |
|---|---|---|
| Primer proceso | `systemd` (PID 1) | `System`, `smss.exe` |
| Gestor de servicios | `systemd` | Administrador de control de servicios (`services.exe`) |
| Lista de servicios | `systemctl list-units --type=service` | `services.msc` o la pestaña **Servicios** del Administrador de tareas |
| Iniciar / detener uno | `sudo systemctl start\|stop nombre` | Clic derecho en el servicio, o `net start\|stop nombre` |
| Iniciar con el sistema | `sudo systemctl enable nombre` | Tipo de inicio **Automático** |

En Windows, un solo proceso `svchost.exe` suele alojar varios servicios. Esto ahorra memoria, pero significa que un proceso del Administrador de tareas puede ser varios servicios.

Un servicio puede iniciarse de distintas formas. En Windows, el **tipo de inicio** es:

- **Automático**: arranca con el sistema (o poco después, si es *Automático (inicio retrasado)*).
- **Manual**: arranca solo cuando un programa u otro servicio lo pide.
- **Deshabilitado**: no puede arrancar.

:::caution[No detengas servicios que no conoces]
Detener un servicio puede estropear algo (la red, el sonido, las actualizaciones). En clase, practica solo con los servicios que te indique tu profesor y apunta el estado original antes de cambiar nada.
:::

## 4. Cómo ver los procesos

### En Linux

La orden `ps aux` lista todos los procesos. Este es un ejemplo; tus números serán distintos:

```text
USER      PID %CPU %MEM    VSZ   RSS TTY    STAT START  TIME COMMAND
root        1  0.0  0.1 168936 11692 ?      Ss   08:01  0:02 /sbin/init
root        2  0.0  0.0      0     0 ?      S    08:01  0:00 [kthreadd]
student  2310  0.3  2.1 987654 170000 ?     Sl   08:05  0:09 firefox
student  4021  0.0  0.1  11000  5200 pts/0  Ss   09:30  0:00 bash
student  4388  0.0  0.0  10000  3300 pts/0  R+   09:41  0:00 ps aux
```

| Columna | Significado |
|---|---|
| `USER` | Propietario del proceso |
| `PID` | Identificador del proceso |
| `%CPU`, `%MEM` | Porcentaje de CPU y de RAM que usa |
| `VSZ`, `RSS` | Tamaño de memoria virtual y memoria real usada (en KiB) |
| `TTY` | Terminal al que está asociado (`?` significa ninguno, típico de los servicios) |
| `STAT` | Estado (véase el apartado 5) |
| `COMMAND` | La orden que lo inició. Los nombres entre `[corchetes]` son hilos del núcleo |

`top` muestra la misma información en vivo, ordenada por uso de CPU. Teclas útiles: `P` (ordenar por CPU), `M` (ordenar por memoria), `k` (matar un proceso), `r` (cambiar su prioridad) y `q` (salir). `htop` es una versión más amigable que no siempre está instalada.

Para los servicios usa `systemctl`:

```bash
systemctl status cron
systemctl list-units --type=service --state=running
```

### En Windows

Abre el **Administrador de tareas** con `Ctrl + Shift + Esc`.

- **Procesos**: aplicaciones, procesos en segundo plano y procesos de Windows, con el uso de CPU, memoria, disco y red.
- **Detalles**: la lista clásica, con PID, estado, nombre de usuario y memoria. Con clic derecho sobre un proceso puedes elegir *Finalizar tarea* o *Establecer prioridad*.
- **Servicios**: los servicios, con su PID y su estado (*En ejecución* o *Detenido*).
- **Rendimiento**: gráficas de CPU, memoria, disco y red.

Para gestionar los servicios con detalle, pulsa `Win + R`, escribe `services.msc` y pulsa Intro. De cada servicio ves la descripción, el estado, el tipo de inicio y la cuenta con la que se ejecuta. En la línea de órdenes puedes usar `tasklist` (listar procesos) y `taskkill /PID 1234` (finalizar uno). Estudiarás estas órdenes en la unidad 8.

## 5. Estados de un proceso

Un proceso no usa la CPU todo el tiempo. Un núcleo de CPU solo puede ejecutar un proceso a la vez, y un proceso suele tener que esperar a un disco, a la red o al usuario. Por eso un proceso cambia entre **estados**.

![Diagrama de estados de un proceso. Nuevo pasa a Listo (admisión). Listo pasa a En ejecución (despacho). En ejecución vuelve a Listo (fin de quantum), pasa a Bloqueado (espera E/S o un suceso) o a Terminado (salida). Bloqueado pasa a Listo cuando ocurre el suceso.](./process-states-es.svg)

| Estado | Significado |
|---|---|
| **Nuevo** | El SO está creando el proceso (PCB y memoria). |
| **Listo** | Tiene todo lo que necesita y espera una CPU libre. |
| **En ejecución** | La CPU está ejecutando sus instrucciones. |
| **Bloqueado** (en espera) | No puede continuar hasta que ocurra algo, por ejemplo el fin de una lectura de disco. |
| **Terminado** | Ha acabado; el SO libera sus recursos. |

Las **transiciones** válidas son:

1. **Nuevo → Listo** (admisión): el SO acepta el proceso.
2. **Listo → En ejecución** (despacho): el planificador lo elige.
3. **En ejecución → Listo** (fin de quantum): se acabó su porción de tiempo, o llegó un proceso más importante. Es una **expulsión**.
4. **En ejecución → Bloqueado**: el proceso pide una operación de E/S o un suceso.
5. **Bloqueado → Listo**: terminó la operación de E/S. El proceso **no** pasa directamente a En ejecución: entra en la cola de listos y espera su turno.
6. **En ejecución → Terminado** (salida): acaba o el SO lo finaliza.

Cuando la CPU pasa de un proceso a otro, el SO hace un **cambio de contexto**: guarda en el PCB los registros y el contador de programa del proceso que sale y carga los del nuevo. El cambio consume tiempo en el que nadie hace trabajo útil, así que debe ser rápido y no demasiado frecuente.

Linux muestra el estado en la columna `STAT` de `ps`:

| Código | Estado | Equivale a |
|---|---|---|
| `R` | En ejecución o listo para ejecutarse | En ejecución / Listo |
| `S` | Durmiendo, espera un suceso | Bloqueado |
| `D` | Durmiendo y no se puede interrumpir (suele esperar al disco) | Bloqueado |
| `T` | Detenido (por `Ctrl+Z` o una señal) | Suspendido |
| `Z` | Zombi (véase el apartado 7) | Terminado, aún no recogido |

Detrás de la primera letra puedes ver más símbolos: `s` (líder de sesión), `+` (proceso en primer plano), `l` (varios hilos), `<` (prioridad alta), `N` (prioridad baja). Así, `Ss` es un líder de sesión durmiendo, como un shell que espera a que escribas.

En Windows, la pestaña **Detalles** muestra *En ejecución*, *Suspendido* (el sistema ha congelado la aplicación) o *No responde*. Usa la pestaña **Máquina de estados** del laboratorio para probar todas las transiciones, también las imposibles.

## 6. Primer plano, segundo plano y señales

En un terminal de Linux, una orden normalmente se ejecuta en **primer plano**: el shell espera y no puedes escribir hasta que termina. Si añades `&` al final, se ejecuta en **segundo plano** y recuperas el prompt.

```bash
sleep 120 &        # iniciar en segundo plano; el shell muestra [1] y el PID
jobs               # listar los trabajos de este terminal
fg %1              # traer el trabajo 1 a primer plano
# pulsa Ctrl+Z     # detener (suspender) el trabajo en primer plano
bg %1              # dejar que el trabajo detenido continúe en segundo plano
kill %1            # finalizar el trabajo 1
```

Teclas en el terminal: `Ctrl+C` pide al proceso en primer plano que termine; `Ctrl+Z` lo detiene.

El SO controla los procesos enviándoles **señales**. `kill` no siempre mata: solo envía una señal.

| Orden | Señal | Qué ocurre |
|---|---|---|
| `kill PID` | `SIGTERM` (15) | Petición educada de terminar. El programa puede guardar su trabajo antes. |
| `kill -9 PID` | `SIGKILL` (9) | El núcleo finaliza el proceso al instante. No se puede ignorar. Úsala la última. |
| `kill -STOP PID` | `SIGSTOP` (19) | Detiene el proceso (estado `T`). |
| `kill -CONT PID` | `SIGCONT` (18) | Continúa un proceso detenido. |

Solo puedes enviar señales a tus propios procesos, salvo que uses `sudo`.

También puedes cambiar la importancia de un proceso. En Linux, el **valor nice** va de -20 (prioridad alta) a 19 (prioridad baja). Los usuarios normales solo pueden hacer sus procesos más «amables» (número más alto):

```bash
nice -n 10 ./long-task.sh       # iniciar con prioridad baja
renice -n 5 -p 4021             # cambiar un proceso que ya se ejecuta
```

En Windows, haz clic derecho en un proceso de la pestaña **Detalles** y elige *Establecer prioridad*. Las clases van de *Baja* a *Tiempo real*. No uses *Tiempo real* con programas normales: puede bloquear el ordenador.

## 7. Zombis y huérfanos

Cuando un proceso hijo termina, el núcleo conserva una pequeña entrada (su PID y su estado de salida) hasta que el padre la lee con una llamada llamada `wait`. Un hijo que ha terminado pero cuyo padre aún no ha leído su estado es un **zombi**: muestra `Z` en `STAT` y `<defunct>` en `COMMAND`. Un zombi no usa CPU y casi nada de memoria, pero sigue ocupando un PID.

Puedes crear uno sin escribir ningún programa. Esta orden inicia un proceso que lanza un hijo y después se sustituye por `sleep`, un programa que nunca espera a sus hijos:

```bash
bash -c 'sleep 2 & exec sleep 300' &
sleep 5
ps -eo pid,ppid,stat,cmd | grep -E 'sleep|defunct'
```

A los dos segundos, el primer `sleep` ha terminado pero nadie lo ha recogido, así que verás una línea con `Z` y `[sleep] <defunct>`. Ahora prueba:

- `kill -9` sobre el zombi: no ocurre nada. Ya está muerto; no puedes matar a un muerto.
- `kill` sobre su **padre** (el PPID del listado): el padre termina, `systemd` adopta al zombi y lo elimina al instante.

Un **huérfano** es el caso contrario: el padre termina primero mientras el hijo sigue ejecutándose. Linux entrega el huérfano al PID 1, que lo recogerá cuando termine.

Unos pocos zombis son normales y duran poco. Muchos zombis que no desaparecen significan que el programa padre tiene un error. La pestaña **Terminal** del laboratorio te permite reproducir todo esto de forma segura.

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre un programa y un proceso? Pon un ejemplo con un navegador.

   <details>
   <summary>Respuesta</summary>

   Un programa es un archivo con instrucciones; un proceso es ese programa mientras se ejecuta, con su propia memoria, su PID y su estado. Si abres dos ventanas del navegador como dos instancias, tienes un programa y dos procesos.

   </details>

2. ¿En qué estado está un proceso que ha pedido datos al disco? Cuando llegan los datos, ¿a qué estado pasa?

   <details>
   <summary>Respuesta</summary>

   Está en el estado **Bloqueado** (en espera). Cuando termina la operación pasa a **Listo**, no a En ejecución; el planificador decide más tarde cuándo usa la CPU.

   </details>

3. Ejecutas `sleep 300 &` y después `kill -STOP` con su PID. ¿Qué letra de `STAT` mostrará `ps`? ¿Cómo lo continúas?

   <details>
   <summary>Respuesta</summary>

   `T` (detenido). Lo continúas con `kill -CONT PID` o con `bg %1`.

   </details>

4. `ps aux` muestra un proceso con `Z` en `STAT`. ¿Por qué `kill -9` no lo elimina y qué puedes hacer?

   <details>
   <summary>Respuesta</summary>

   Un zombi ya ha terminado; solo queda su entrada en la tabla de procesos, esperando a que el padre la recoja. Una señal no puede terminar algo que ya está muerto. Tienes que conseguir que el padre lo recoja, o finalizar al padre, para que `systemd` adopte y elimine al zombi.

   </details>

5. Nombra dos diferencias entre un proceso de usuario y un servicio.

   <details>
   <summary>Respuesta</summary>

   Un servicio se ejecuta en segundo plano sin ventana y normalmente arranca con el sistema (o cuando se necesita) con una cuenta del sistema; un proceso de usuario lo inicia una persona, suele tener una ventana o un terminal y se ejecuta con los derechos de esa persona.

   </details>

## Glosario

| English | Castellano |
|---|---|
| process | proceso |
| program | programa |
| service / daemon | servicio / demonio |
| PID (process identifier) | PID (identificador de proceso) |
| PCB (Process Control Block) | PCB (bloque de control de proceso) |
| parent / child process | proceso padre / hijo |
| state | estado |
| ready / running / waiting | listo / en ejecución / bloqueado |
| transition | transición |
| context switch | cambio de contexto |
| preemption | expulsión (apropiación) |
| foreground / background | primer plano / segundo plano |
| signal | señal |
| zombie / orphan process | proceso zombi / huérfano |
| priority / nice value | prioridad / valor nice |
| startup type | tipo de inicio |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
