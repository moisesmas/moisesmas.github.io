---
title: "4. Almacenamiento y sistemas de archivos"
description: "Cómo se construyen y se dividen los discos, las tablas de particiones MBR y GPT, los sistemas de archivos FAT32, exFAT, NTFS y ext4, el journaling, cómo optimizar el almacenamiento y cómo escribir un plan de instalación."
---

Un disco es solo una larga lista de bloques numerados. El sistema operativo la convierte en las carpetas, los archivos y las unidades que usas cada día. En esta página verás cómo se organiza un disco, cómo se divide en particiones, qué sistemas de archivos te encontrarás (FAT32, NTFS y ext4) y por qué el journaling puede salvar tus datos después de un corte de luz. Al final lo reunirás todo en un plan de instalación.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 6 (unos 70 minutos).
2. Practica en una máquina virtual: la [actividad 6](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/es/) usa GParted con un disco virtual.
3. El apartado 7 es la base del plan de instalación de la misma actividad.
:::

## 1. Discos

Hay dos tipos de disco habituales:

| | HDD (disco duro) | SSD (unidad de estado sólido) |
|---|---|---|
| Tecnología | Platos magnéticos que giran y un cabezal móvil | Chips de memoria flash, sin partes móviles |
| Velocidad | Lento para encontrar datos (el cabezal tiene que moverse) | Muy rápido, también en acceso aleatorio |
| Punto débil | Desgaste mecánico, golpes | Escrituras limitadas por celda (el controlador reparte el desgaste) |
| Fragmentación | Perjudica el rendimiento | No importa |

La **estructura física** de un HDD está formada por **platos** con dos caras. Cada cara tiene **pistas** circulares, y cada pista se divide en **sectores**. La misma pista en todos los platos forma un **cilindro**. Un **sector** es la unidad más pequeña que el disco puede leer o escribir: tradicionalmente **512 bytes**, y 4096 bytes en los discos más nuevos.

La **estructura lógica** es lo que el SO construye encima. El SO no trabaja con sectores sueltos sino con **clústeres** (Windows) o **bloques** (Linux): grupos de sectores contiguos. El clúster es la unidad más pequeña que se asigna a un archivo.

Esto tiene una consecuencia: un archivo siempre usa un número entero de clústeres, y el espacio libre de su último clúster se desperdicia (otra vez *fragmentación interna*). Ejemplo con clústeres de 4096 bytes:

| Tamaño del archivo (bytes) | Clústeres | Espacio usado | Desperdiciado |
|---|---|---|---|
| 1.200 | 1 | 4.096 | 2.896 |
| 5.000 | 2 | 8.192 | 3.192 |
| 9.000 | 3 | 12.288 | 3.288 |
| 40.000 | 10 | 40.960 | 960 |
| **Total 55.200** | **16** | **65.536** | **10.336** |

Con clústeres de 32 KiB (32.768 bytes) los mismos cuatro archivos necesitan 5 clústeres (163.840 bytes) y desperdician 108.640 bytes. Los **clústeres grandes** desperdician espacio con archivos pequeños; los **clústeres pequeños** necesitan más clústeres por archivo y una tabla de asignación más grande. El tamaño del clúster se elige al formatear la partición, y el valor por defecto suele ser bueno.

## 2. Particiones

Una **partición** es una parte de un disco que el SO trata como si fuera un disco separado. ¿Para qué dividir un disco?

- Para instalar **varios sistemas operativos** en el mismo disco.
- Para **separar** el sistema de tus datos: puedes reinstalar el sistema sin tocar tus archivos.
- Para usar **sistemas de archivos distintos**.
- Para proteger el sistema: una partición de datos llena no detiene al SO.

La lista de particiones se guarda en una **tabla de particiones** al principio del disco. Hay dos formatos.

![Disposición de MBR y GPT. MBR guarda su tabla en el sector 0 y admite hasta cuatro particiones primarias, una de las cuales puede ser extendida y contener particiones lógicas. GPT tiene un MBR protector, una cabecera con las entradas de particiones al principio y una copia de seguridad al final del disco.](./partition-tables-es.svg)

### MBR (Master Boot Record)

Apareció en los años ochenta y funciona con el firmware clásico **BIOS**. El primer sector del disco (512 bytes) contiene un pequeño programa de arranque, una tabla con **cuatro entradas** y una firma. Sus límites:

- Un máximo de **cuatro particiones primarias**. Para tener más, una partición primaria se convierte en una **partición extendida**, que es un contenedor para cualquier número de **particiones lógicas**. La partición extendida no guarda datos por sí misma.
- Las direcciones de las particiones tienen 32 bits, así que un disco queda limitado a **2 TiB**. Un disco mayor solo puede usar los primeros 2 TiB.
- Solo hay **una copia** de la tabla. Si el primer sector se daña, las particiones se pierden.

### GPT (GUID Partition Table)

Es el formato moderno, que se usa con el firmware **UEFI**.

- El disco tiene un **MBR protector** en el primer sector, para que las herramientas antiguas vean que el disco no está vacío.
- A continuación vienen una cabecera GPT y las entradas de particiones (128 por defecto en Windows); se guarda una **copia de seguridad** al final del disco.
- Todas las particiones son del mismo tipo (no hay particiones extendidas ni lógicas) y cada una tiene un identificador único (GUID).
- Admite discos de muchos terabytes.
- Windows arranca desde un disco GPT solo cuando el ordenador usa UEFI. Windows 11 lo exige.

| | MBR | GPT |
|---|---|---|
| Firmware | BIOS (clásico) | UEFI |
| Particiones | 4 primarias, o 3 primarias + 1 extendida con lógicas | Hasta 128 en Windows, todas del mismo tipo |
| Disco máximo | 2 TiB | Prácticamente ilimitado |
| Copias de la tabla | 1 | 2 (principio y final del disco) |

Un sistema **UEFI** necesita una pequeña **partición de sistema EFI** (ESP, formateada en FAT32, normalmente de 100 MB a 1 GB) donde viven los gestores de arranque.

### Nombres de las particiones

- **Windows** da una **letra de unidad** a cada volumen: `C:`, `D:`...
- **Linux** tiene un único árbol. Cada disco aparece como un dispositivo (`/dev/sda`, `/dev/nvme0n1`) y sus particiones están numeradas (`/dev/sda1`, `/dev/nvme0n1p1`). Para usar una partición la **montas** en una carpeta, por ejemplo `/home` o `/media/usb`.

### LVM

En Linux también puedes usar **LVM** (Logical Volume Manager, gestor de volúmenes lógicos). Unes uno o más discos o particiones (*volúmenes físicos*) en un *grupo de volúmenes* y después cortas **volúmenes lógicos** de él. La ventaja es que puedes **ampliar** un volumen lógico más tarde, incluso añadiendo un disco nuevo, sin mover datos.

## 3. Sistemas de archivos

Una partición está vacía hasta que la **formateas** con un **sistema de archivos**: el conjunto de reglas y estructuras de datos que el SO usa para guardar y encontrar archivos. Un sistema de archivos:

- organiza los archivos en **carpetas** (un árbol que empieza en la raíz);
- lleva la cuenta de qué clústeres pertenecen a cada archivo y cuáles están libres;
- guarda los **atributos** (metadatos) de cada archivo: nombre, tamaño, fechas (de creación, modificación y acceso), propietario y permisos, e indicadores como *solo lectura* u *oculto*;
- (en algunos sistemas) protege los datos con permisos, compresión, cifrado o un diario.

Los distintos sistemas de archivos guardan su información de localización de formas distintas:

- **FAT32** tiene una **tabla de asignación de archivos** (*File Allocation Table*). Es una tabla con una entrada por cada clúster. Un archivo es una *cadena*: la entrada del directorio da el primer clúster, y la tabla dice cuál es el siguiente. Por ejemplo, un archivo en los clústeres 5, 6 y 9 tiene la cadena 5 → 6 → 9 → fin. Hay dos copias de la tabla.
- **NTFS** tiene la **tabla maestra de archivos (MFT)**, con al menos un registro para cada archivo o carpeta. Los archivos muy pequeños pueden guardarse dentro de su propio registro.
- **ext4** usa **inodos**: una pequeña estructura por archivo con sus atributos y la localización de sus datos (en *extents*, rangos de bloques contiguos). El nombre del archivo se guarda en el directorio, no en el inodo.

### Comparación

| | FAT32 | exFAT | NTFS | ext4 |
|---|---|---|---|---|
| Sistema principal | Todos (estándar antiguo) | Windows, macOS, Linux | Windows | Linux |
| Archivo máximo | 4 GiB − 1 byte | Muy grande | Limitado por el volumen | 16 TiB |
| Volumen máximo | 2 TiB (Windows formatea hasta 32 GiB con su propia herramienta) | Muy grande | Muy grande | 1 EiB |
| Permisos | No | No | Sí (ACL) | Sí (Unix y ACL) |
| Diario (journal) | No | No | Sí (metadatos) | Sí |
| Nombres | No distingue mayúsculas | No distingue mayúsculas | No distingue mayúsculas en Windows | Distingue mayúsculas |
| Uso típico | Memorias USB pequeñas, tarjetas SD, partición EFI | Memorias USB y tarjetas SD grandes para varios sistemas | Discos de sistema y de datos de Windows | Discos de sistema y de datos de Linux |

Cómo elegir, con algunos ejemplos:

- Una memoria USB que usas en Windows, macOS y Linux y que tiene archivos de más de 4 GiB: **exFAT**.
- Una memoria USB para una cámara, una tele o un dispositivo antiguo: **FAT32**.
- La partición del sistema de Windows, o un disco de datos de Windows con permisos: **NTFS**.
- La partición del sistema de Linux: **ext4**.

La compatibilidad entre sistemas no es completa: Windows no puede leer ext4 sin software adicional, y macOS lee NTFS pero no escribe en él por defecto. Linux puede leer y escribir NTFS, exFAT y FAT32.

## 4. Journaling

Guardar un archivo requiere **varias escrituras**: los bloques de datos, la tabla con el espacio libre y la entrada del directorio. Si se va la luz en mitad del proceso, el sistema de archivos puede quedar **inconsistente**: una entrada de directorio que no apunta a nada, o bloques marcados a la vez como libres y como usados.

Sin diario (FAT32, exFAT, el antiguo ext2), el sistema debe comprobar **todo el disco** después de un apagado incorrecto (`fsck` en Linux, `chkdsk` en Windows). En un disco grande puede tardar mucho, y no siempre lo repara todo.

Un sistema de archivos con **journaling** (o *transaccional*) mantiene un **diario** (*journal*): una pequeña área de registro. Antes de cambiar las estructuras reales, escribe en el diario lo que va a hacer. Después hace los cambios y marca la entrada como terminada.

1. **Escribir** el cambio previsto en el diario.
2. **Confirmar** (*commit*): marcar la entrada como completa.
3. **Aplicar** el cambio a las estructuras reales.
4. **Liberar** la entrada del diario.

Después de un corte de luz, en el siguiente arranque el sistema lee el diario:

- Las entradas que se confirmaron pero no se aplicaron se **repiten** (se vuelven a ejecutar).
- Las entradas que no se confirmaron se **descartan**, como si nunca hubieran empezado.

El disco vuelve a ser consistente en **segundos**, sin comprobarlo todo. El precio son algunas escrituras adicionales.

:::note[El journaling no protege tus archivos de todo]
NTFS y ext4 (en su modo *ordered* por defecto) registran en el diario sobre todo los **metadatos** (las estructuras del sistema de archivos). Eso mantiene sano el sistema de archivos, pero los últimos datos que estabas escribiendo todavía pueden perderse o quedar incompletos. El journaling tampoco sustituye a una **copia de seguridad**.
:::

**Consecuencia al elegir un sistema de archivos:** para el disco del sistema y para los datos que importan, elige un sistema de archivos con journaling (NTFS o ext4). En las unidades extraíbles con FAT32 o exFAT, usa siempre *Quitar hardware de forma segura* o `umount` antes de desconectar el cable.

## 5. Órdenes y herramientas útiles

| Tarea | Linux | Windows |
|---|---|---|
| Ver discos y particiones | `lsblk`, `lsblk -f` (con sistemas de archivos), `sudo fdisk -l` | Administración de discos (`diskmgmt.msc`), `diskpart` |
| Espacio libre y usado | `df -h` (por sistema de archivos), `du -sh carpeta` (una carpeta) | Explorador de archivos → *Este equipo*, Configuración → Almacenamiento |
| Editor gráfico de particiones | **GParted** | Administración de discos |
| Crear un sistema de archivos | `sudo mkfs.ext4 /dev/sdb1` | *Formatear* en el Explorador, o `format` |
| Comprobar y reparar | `sudo fsck /dev/sdb1` (desmontada) | `chkdsk D: /f` |

:::danger[Particionar y formatear destruyen datos]
Haz estos ejercicios solo en una **máquina virtual** con un disco virtual, o en una memoria USB vacía que no necesites. Antes de aplicar un cambio, lee dos veces el nombre del dispositivo: formatear `/dev/sda` en lugar de `/dev/sdb` puede borrar tu sistema. No se escribe nada hasta que pulsas *Aplicar* en GParted.
:::

## 6. Optimizar el almacenamiento

- **Mantén espacio libre.** Un disco lleno es lento y arriesgado. Intenta tener al menos un 10–15 % libre en la partición del sistema.
- **Limpia.** Usa el *Sensor de almacenamiento* o el *Liberador de espacio en disco* en Windows, y en Linux `du -sh *` para encontrar las carpetas grandes y `sudo apt clean` para borrar los paquetes descargados (Debian y Ubuntu).
- **HDD: desfragmenta.** Cuando un archivo se guarda en muchos trozos, el cabezal necesita más movimientos. Windows lo hace automáticamente (*Desfragmentar y optimizar unidades*). ext4 fragmenta muy poco y rara vez lo necesita.
- **SSD: nunca desfragmentes; usa TRIM.** La orden `TRIM` indica al SSD qué bloques están libres para que pueda prepararlos. Windows lo hace solo. En Linux, `sudo fstrim -av` lo ejecuta una vez, y la mayoría de las distribuciones lo ejecutan cada semana.
- **Elige el tamaño de clúster y el sistema de archivos adecuados** para el uso: muchos archivos pequeños o pocos archivos enormes.
- **Alinea las particiones.** Las herramientas modernas empiezan las particiones en 1 MiB, que es lo correcto para los SSD y los sectores de 4 KiB.
- **Vigila la salud.** Si un disco empieza a fallar (ruidos extraños, muchos errores de lectura), haz primero una copia de seguridad. En Linux, `smartctl -a /dev/sda` (paquete `smartmontools`) muestra el informe SMART.

## 7. El plan de instalación

Antes de instalar un sistema operativo, escribe un plan. Evita errores y es una prueba de tu trabajo. Estos son los puntos que debe cubrir:

| Punto | Preguntas a responder |
|---|---|
| Finalidad y usuarios | ¿Para qué se usará el ordenador? ¿Quién lo usa? |
| Hardware | ¿Bastan la CPU, la RAM y el disco? ¿Hay controladores? ¿BIOS o UEFI? |
| Sistema operativo | ¿Cuál, qué edición y versión, 32 o 64 bits? ¿Qué licencia? |
| Disco | ¿Qué tabla de particiones? ¿Qué particiones, tamaños y sistemas de archivos? ¿Hay swap? ¿Hay arranque dual? |
| Red y nombre | Nombre del equipo, dominio o grupo de trabajo, dirección IP (automática o fija) |
| Usuarios y seguridad | Cuenta de administrador, otras cuentas, contraseñas, cortafuegos, actualizaciones |
| Software | ¿Qué aplicaciones y controladores instalarás después del sistema? |
| Copia de seguridad | ¿Qué copiarás antes de la instalación? ¿Cómo volverás atrás si falla? |
| Comprobaciones | ¿Cómo probarás que todo funciona? |

**Ejemplo.** Una máquina virtual para Ubuntu Desktop, con 4 GiB de RAM y un disco virtual de 40 GiB (UEFI):

| Partición | Tamaño | Sistema de archivos | Punto de montaje |
|---|---|---|---|
| Partición de sistema EFI | 512 MiB | FAT32 | `/boot/efi` |
| Raíz | 25 GiB | ext4 | `/` |
| Swap | 2 GiB | swap | (ninguno) |
| Datos | unos 12,5 GiB | ext4 | `/home` |

Consulta al fabricante los requisitos mínimos actuales. Como referencia, Windows 11 exige una CPU de 64 bits, 4 GB de RAM, 64 GB de almacenamiento, UEFI con arranque seguro y un chip TPM 2.0, y Ubuntu Desktop recomienda 4 GB de RAM y 25 GB de disco.

## Comprueba lo aprendido

1. Un disco usa MBR. Ya tienes tres particiones primarias y necesitas tres más. ¿Cómo puedes hacerlo?

   <details>
   <summary>Respuesta</summary>

   MBR solo permite cuatro particiones primarias. Convierte (o crea) la cuarta como una **partición extendida** y crea las tres particiones nuevas como **particiones lógicas** dentro de ella.

   </details>

2. Un archivo de 10.000 bytes se guarda en un sistema de archivos con clústeres de 4096 bytes. ¿Cuántos clústeres usa y cuánto espacio se desperdicia?

   <details>
   <summary>Respuesta</summary>

   10.000 / 4096 = 2,44, así que necesita **3 clústeres** (12.288 bytes). El desperdicio es 12.288 − 10.000 = **2.288 bytes**.

   </details>

3. Quieres copiar un vídeo de 6 GiB a una memoria USB que también usarás en un Mac. ¿Qué sistema de archivos eliges y por qué no FAT32?

   <details>
   <summary>Respuesta</summary>

   **exFAT**. FAT32 no puede guardar un archivo mayor de 4 GiB, y exFAT funciona en Windows, macOS y Linux. NTFS no se escribe en macOS por defecto y ext4 no lo lee Windows.

   </details>

4. Explica en dos frases por qué un sistema de archivos con journaling se recupera más rápido después de un corte de luz.

   <details>
   <summary>Respuesta</summary>

   Antes de cambiar las estructuras del disco, escribe el cambio previsto en un diario. Después de un fallo, solo lee el diario y repite las entradas terminadas o descarta las no terminadas, en lugar de comprobar todo el disco.

   </details>

5. ¿Por qué no debes desfragmentar un SSD y qué usas en su lugar?

   <details>
   <summary>Respuesta</summary>

   Un SSD no tiene cabezal móvil, así que la fragmentación no lo ralentiza, y las escrituras adicionales lo desgastan. Usas **TRIM**, que indica al SSD qué bloques están libres.

   </details>

## Glosario

| English | Castellano |
|---|---|
| disk / hard disk (HDD) / solid-state drive (SSD) | disco / disco duro / unidad de estado sólido |
| platter, track, sector, cylinder | plato, pista, sector, cilindro |
| cluster / block | clúster / bloque |
| partition | partición |
| partition table | tabla de particiones |
| primary / extended / logical partition | partición primaria / extendida / lógica |
| MBR / GPT | MBR / GPT |
| boot loader | gestor de arranque |
| mount point | punto de montaje |
| format | formatear |
| file system | sistema de archivos |
| file attributes | atributos del archivo |
| journaling | registro por diario (journaling) |
| journal | diario |
| inode | inodo |
| defragmentation | desfragmentación |
| installation plan | plan de instalación |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
