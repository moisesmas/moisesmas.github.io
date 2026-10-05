---
title: "Actividades"
description: "Siete actividades de la unidad 3: procesos en Linux y en Windows, planificación a mano y con el laboratorio, memoria, particiones y sistemas de archivos, y permisos y recursos compartidos."
---

Estas son las actividades de la unidad. Hazlas en orden, después de leer los apuntes correspondientes. Las actividades 1, 3 y 4 usan el [Laboratorio del planificador de procesos](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/?lang=es).

Entrega cada actividad en **Aules**, en la tarea correspondiente, en un documento (PDF, ODT o DOCX) con tu nombre. No hace falta copiar las preguntas: numera tus respuestas. Escribe en inglés si puedes. No incluyas datos personales (contraseñas, fotos privadas) en tus capturas de pantalla.

Para las actividades 1, 6 y 7 necesitas una máquina virtual con Ubuntu (la de la unidad 2 sirve). **No practiques nunca el particionado ni el formateo en tu disco real.**

## Actividad 1 · Procesos en Linux

**Objetivo:** observar los procesos de un sistema Linux, cambiar su estado y leer su información.

**Qué tienes que hacer:**

1. Abre la pestaña **Terminal** del laboratorio y completa las seis misiones de la lista. Después repite los pasos principales en tu máquina virtual con Ubuntu.
2. En un terminal ejecuta `ps aux | head -15`. Anota el `PID`, el `USER` y el `STAT` de cinco procesos. Ejecuta `echo $$` para averiguar el PID de tu shell y búscalo en la lista.
3. Ejecuta `sleep 300 &`. Con `jobs` y `ps -o pid,ppid,stat,cmd -p <PID>` anota su PID, su padre y su estado. Deténlo con `kill -STOP <PID>`, comprueba otra vez el estado, continúalo con `kill -CONT <PID>` y finalízalo con `kill <PID>`. Copia cada orden y la letra de `STAT` que viste.
4. Ejecuta `yes > /dev/null &`. Abre `top` (o `htop`) y localízalo: ¿qué `%CPU` usa? Cambia su prioridad con `renice -n 19 -p <PID>` y describe qué cambia. Finalízalo con `kill`.
5. Crea un zombi con la orden de los apuntes (`bash -c 'sleep 2 & exec sleep 300' &`). Demuestra con `ps` que hay un proceso en estado `Z`. Prueba `kill -9` sobre el zombi y explica qué ocurre. Después elimínalo y explica cómo.
6. Ejecuta `systemctl status cron` (u otro servicio de tu sistema). Indica si está activo, desde cuándo y cuál es su PID. ¿Es un proceso de usuario o del sistema? ¿Es un servicio?
7. Completa una tabla de al menos seis procesos con las columnas: PID, PPID, usuario, estado, tipo (usuario, sistema o servicio) y qué hace.

**Qué entregas:** un documento con las órdenes, la salida relevante (texto o capturas) y tus explicaciones. Tarea «Actividad 1» de Aules.

**Criterios que trabaja:** RA1.c, RA2.a, RA4.c

**Dificultad:** ★★☆ · **Tiempo estimado:** 75 minutos

## Actividad 2 · Procesos y servicios en Windows

**Objetivo:** hacer en Windows las mismas observaciones que en Linux y comparar los dos sistemas.

**Qué tienes que hacer:**

1. Abre el Administrador de tareas (`Ctrl + Shift + Esc`). En la pestaña **Detalles**, añade las columnas *PID*, *Estado*, *Nombre de usuario* y *Prioridad* (clic derecho en el encabezado de una columna → *Seleccionar columnas*).
2. Abre el Bloc de notas y localiza `notepad.exe`: anota su PID, su usuario y su memoria. Ciérralo con *Finalizar tarea* y comprueba que desaparece.
3. Localiza tres procesos que se ejecuten con el nombre de usuario `SYSTEM`, `LOCAL SERVICE` o `NETWORK SERVICE` y tres que se ejecuten con tu usuario. Anota qué hace cada uno (búscalo en la documentación oficial si hace falta).
4. Abre PowerShell y ejecuta `while ($true) {}`. Esto usa un núcleo de CPU. Localiza el proceso `powershell.exe` que más CPU usa, cambia su prioridad a *Por debajo de lo normal* y describe lo que ves. Cierra la ventana para detenerlo.
5. Abre `services.msc`. De tres servicios (por ejemplo *Cola de impresión*, *Hora de Windows* y *Windows Update*) anota el estado, el tipo de inicio y la cuenta con la que se inicia sesión. **No cambies nada.**
6. Responde: ¿qué diferencia hay entre *Automático*, *Manual* y *Deshabilitado*? ¿Por qué Windows tiene un proceso `svchost.exe` para varios servicios?
7. Haz una tabla comparativa con cinco filas: cómo listar procesos, cómo finalizar uno, cómo cambiar su prioridad, cómo listar servicios y cómo iniciar o detener un servicio. Una columna para Linux y otra para Windows.

**Qué entregas:** el documento con capturas y la tabla comparativa. Tarea «Actividad 2» de Aules.

**Criterios que trabaja:** RA1.c, RA2.a, RA4.c

**Dificultad:** ★☆☆ · **Tiempo estimado:** 60 minutos

## Actividad 3 · Planificación a mano

**Objetivo:** calcular resultados de planificación con un diagrama de Gantt y comprobarlos con el simulador.

**Qué tienes que hacer:**

1. Carga A. Usa **FIFO**, **SJF** y **SRTF**. Dibuja un diagrama de Gantt para cada uno y calcula el tiempo de finalización, de respuesta y de espera de cada proceso y los promedios.

   | Proceso | Llegada | Ráfaga |
   |---|---|---|
   | P1 | 0 | 7 |
   | P2 | 2 | 4 |
   | P3 | 3 | 1 |
   | P4 | 5 | 3 |

2. Carga B. Usa **prioridades (no expulsivas)**, **prioridades (expulsivas)** y **Round Robin con q = 3**. Un número menor es una prioridad mayor. Haz el mismo trabajo que en la primera parte.

   | Proceso | Llegada | Ráfaga | Prioridad |
   |---|---|---|---|
   | P1 | 0 | 5 | 3 |
   | P2 | 1 | 3 | 1 |
   | P3 | 2 | 6 | 4 |
   | P4 | 4 | 2 | 2 |

3. Introduce las dos cargas en la pestaña **Simulador del planificador** y compara sus resultados con los tuyos. Si hay alguna diferencia, busca tu error y corrígelo.
4. ¿Qué algoritmo da el mejor tiempo de espera medio en cada carga? ¿Cuál es el menos justo, es decir, el que hace esperar más a algún proceso? Explícalo en dos o tres frases.
5. Haz tres ejercicios de la pestaña **Práctica** y anota el número de aciertos.

**Qué entregas:** los seis diagramas de Gantt (se acepta una foto de tu letra) con las tablas y tus respuestas a 4 y 5. Tarea «Actividad 3» de Aules.

**Criterios que trabaja:** RA1.c, RA2.a

**Dificultad:** ★★★ · **Tiempo estimado:** 90 minutos

## Actividad 4 · Quantum e inanición

**Objetivo:** investigar con el laboratorio cómo cambian los resultados el quantum y la elección del algoritmo.

**Qué tienes que hacer:**

1. En la pestaña **Duelo de algoritmos**, usa el ejemplo predefinido *Cinco procesos* (o introduce esta carga: P1 0/8/3, P2 1/4/2, P3 2/9/4, P4 3/5/1, P5 6/2/2, donde cada terna es llegada/ráfaga/prioridad). Haz una tabla con el tiempo de espera medio, el tiempo de respuesta medio y los cambios de contexto de los seis algoritmos, con Round Robin con q = 3.
2. Mueve el deslizador del quantum de 1 a 8. Copia los resultados para q = 1, 2, 4 y 8 y saca una conclusión: ¿qué ocurre con los cambios de contexto? ¿Qué ocurre con el tiempo de respuesta? ¿Cómo se comporta el algoritmo cuando q es muy grande?
3. Elige un quantum que te parezca un buen compromiso y justifícalo.
4. En la parte de *Inanición*, pon 3, 6 y 8 procesos cortos. Anota el tiempo de espera del proceso largo **sin** envejecimiento y **con** envejecimiento. Explica los números.
5. Un ordenador de escritorio tiene un gestor de ventanas, un reproductor de vídeo y un programa de copias de seguridad. ¿Qué algoritmo usarías y por qué? Menciona al menos un problema de tu elección y cómo reducirlo.

**Qué entregas:** las tablas, las conclusiones y tus respuestas. Tarea «Actividad 4» de Aules.

**Criterios que trabaja:** RA2.a, RA4.c

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 5 · Memoria: calcular, observar y optimizar

**Objetivo:** hacer los cálculos de memoria de la unidad y comprobar la memoria de un ordenador real.

**Qué tienes que hacer:**

1. **Fragmentación.** Un sistema tiene particiones fijas de 128 KiB. Se cargan procesos de 100, 30, 128 y 65 KiB. ¿Cuánta memoria se desperdicia en cada partición? ¿Qué tipo de fragmentación es?
2. **Paginación.** El tamaño de página es 1 KiB (1024 bytes). La tabla de páginas de un proceso es: página 0 → marco 4, 1 → 9, 2 → 1, 3 → 7, 4 → 3, 5 → 0. Calcula la página, el desplazamiento y la dirección física de las direcciones lógicas 2600, 5300, 1030 y 7000. Una de ellas causa un problema: ¿cuál y por qué?
3. **Segmentación.** Un proceso tiene estos segmentos (base, límite): S0 (3000, 2200), S1 (8000, 600), S2 (12000, 1500). Traduce (0, 1500), (1, 600), (2, 1499) y (1, 599), o indica que el acceso no es válido.
4. **Reemplazo de páginas.** Con la cadena de referencias `7 1 4 1 7 3 4 3 1 7 5 7 4 1`, cuenta los fallos de página con FIFO y con LRU, primero con 3 marcos y después con 4 marcos. Muestra los marcos después de cada referencia. ¿Qué observas al comparar LRU con FIFO en el caso de 3 marcos?
5. **Observar.** En tu propio ordenador (o en una máquina virtual), averigua: RAM total, RAM disponible y swap (o archivo de paginación) en uso. En Linux usa `free -h` y `swapon --show`; en Windows, Administrador de tareas → Rendimiento → Memoria. Localiza los tres procesos que más memoria usan.
6. **Optimizar.** Propón tres acciones realistas para reducir el uso de memoria de ese ordenador. Para cada una indica qué medirías antes y después. Si puedes, prueba una e informa de la diferencia.

**Qué entregas:** los cálculos (muestra los pasos), la tabla de datos y las tres propuestas. Tarea «Actividad 5» de Aules.

**Criterios que trabaja:** RA2.a, RA4.e

**Dificultad:** ★★★ · **Tiempo estimado:** 100 minutos

## Actividad 6 · Particiones, sistemas de archivos y un plan de instalación

**Objetivo:** particionar un disco virtual, comparar tres sistemas de archivos y escribir un plan de instalación.

**Qué tienes que hacer:**

1. En VirtualBox, añade un **disco virtual nuevo de 2 GiB** a tu máquina virtual con Ubuntu (la máquina debe estar apagada). Arráncala y abre **GParted** (instálalo con `sudo apt install gparted` si hace falta).
2. Selecciona el disco nuevo (¡comprueba su nombre con `lsblk`!). Crea una tabla de particiones de tipo **msdos** (MBR). Crea tres particiones primarias: 300 MiB **FAT32** (etiqueta `FAT`), 700 MiB **NTFS** (etiqueta `NTFS`) y 600 MiB **ext4** (etiqueta `EXT`). Aplica los cambios.
3. Responde a las siguientes preguntas con GParted o el terminal: ¿Puedes crear una cuarta partición primaria en el espacio libre? ¿Y una quinta? ¿Cómo? ¿Puedes ampliar la partición NTFS? ¿Qué ocurre con los datos si reduces una partición?
4. Monta las tres particiones (haz clic en ellas en el gestor de archivos). En cada una crea archivos llamados `Data.txt` y `data.txt`, después ejecuta `chmod 600 Data.txt` y `ls -l`. Completa una tabla: ¿el sistema de archivos distingue las mayúsculas? ¿Conserva los permisos? Muestra la salida.
5. Ejecuta `df -h` y `lsblk -f` y añade la salida a tu informe. Indica el tamaño de cada sistema de archivos y cuánto está ya usado.
6. Elimina las tres particiones, convierte el disco a **GPT** (*Dispositivo → Crear tabla de particiones → gpt*) y crea **cinco** particiones primarias. ¿Qué cambia? Haz una tabla con cinco diferencias entre MBR y GPT.
7. Haz una tabla que compare FAT32, NTFS y ext4: tamaño máximo de archivo, permisos, journaling, distinción de mayúsculas y uso típico. Marca cuáles has comprobado tú mismo en el paso 4.
8. **Plan de instalación.** Un colegio quiere Ubuntu Desktop en un ordenador con 8 GiB de RAM, un SSD de 80 GiB y UEFI. Escribe un plan con los puntos de la tabla del apartado 7 de la [página 4](/docencia/smr/som/ud03-funciones-sistema-operativo/04-storage-and-file-systems/es/#7-el-plan-de-instalación): comprobación del hardware, tabla de particiones, particiones con tamaño, sistema de archivos y punto de montaje, usuarios, copia de seguridad y comprobaciones.
9. Explica en un párrafo cuándo elegirías un sistema de archivos con journaling y qué ocurriría después de un corte de luz en cada uno de los tres sistemas de archivos.

**Qué entregas:** capturas de GParted antes y después, las salidas, las tablas y el plan. Tarea «Actividad 6» de Aules.

**Criterios que trabaja:** RA1.d, RA1.e, RA1.g, RA2.e, RA4.g

**Dificultad:** ★★★ · **Tiempo estimado:** 120 minutos

## Actividad 7 · Permisos y recursos compartidos

**Objetivo:** leer y cambiar permisos en Linux y en Windows y configurar un recurso compartido sencillo.

**Qué tienes que hacer:**

1. En tu máquina virtual de Linux crea una carpeta `project` con un archivo `notes.txt` y un script `run.sh` (con el texto `echo hello`). Ejecuta `ls -l` y explica cada campo de las tres líneas (tipo, permisos, propietario, grupo).
2. Escribe las órdenes `chmod` (en octal) para obtener cada caso y pruébalas: (a) `notes.txt` con lectura y escritura para el propietario, lectura para el grupo y ningún acceso para otros; (b) `run.sh` ejecutable por todos y con escritura solo para el propietario; (c) la carpeta `project` accesible solo para su propietario. Intenta ejecutar `./run.sh` antes y después de añadir el permiso `x`.
3. Crea un segundo usuario (`sudo adduser guest1`). Prueba `sudo -u guest1 cat project/notes.txt` en los casos (a) y (c). Explica los resultados con los permisos del archivo **y** del directorio.
4. Explica qué ocurre cuando un directorio tiene `r--` pero no `x`, y cuando tiene `--x` pero no `r`.
5. En Windows (o en una máquina virtual con Windows) crea una carpeta `Shared` en un disco NTFS con un archivo dentro. En la pestaña **Seguridad** da al grupo `Usuarios` solo *Lectura*. Después añade un *Denegar* de *Escritura* a un usuario de prueba. ¿Cuál es el permiso efectivo de ese usuario? ¿Por qué?
6. Comparte la carpeta: **Propiedades → Compartir → Uso compartido avanzado**, con un permiso de recurso compartido de *Lectura* para un usuario. Desde otro ordenador (o el mismo) abre `\\NOMBREEQUIPO\Shared`. Intenta crear un archivo. ¿Qué permisos se están aplicando, los del recurso compartido o los de NTFS? ¿Cuáles ganan?
7. Escribe cinco buenas prácticas para compartir recursos en una red y un riesgo que evita cada una.
8. Mira los permisos de `/etc/passwd`, `/etc/shadow` y `/tmp` (`ls -ld`). ¿Por qué crees que son distintos?

**Qué entregas:** un documento con las órdenes, las salidas y las capturas y tus respuestas. Tarea «Actividad 7» de Aules.

**Criterios que trabaja:** RA1.e, RA1.f, RA4.h

**Dificultad:** ★★☆ · **Tiempo estimado:** 90 minutos

:::aules
Entregas todas las actividades en Aules, en la tarea de cada una. Allí encontrarás también los criterios de evaluación, tus notas y las soluciones.
:::
