---
title: "2. Instalación y particionado"
description: "Cómo planificar una instalación, crear el medio de arranque, diseñar particiones con MBR o GPT, entender los nombres de los discos, configurar un dual boot y seguir la cadena de arranque."
---

La mayoría de los problemas de una instalación no ocurren durante la instalación, sino antes (no habías planificado) o después (no entiendes cómo arranca el equipo). Esta página cubre todo el camino: preparar, particionar, instalar dos sistemas en un mismo disco y saber qué pasa cuando pulsas el botón de encendido.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 90 minutos de lectura y 90 de práctica.

1. Lee las secciones 1 y 2 con una hoja al lado: la lista de comprobación de la sección 1 te servirá después en la actividad 4.
2. Las secciones 3 y 4 son el corazón de la sesión. Abre el [laboratorio «Particiones y arranque»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/?lang=es#mbr-gpt) y construye tablas de particiones MBR y GPT hasta que los límites te parezcan evidentes.
3. Las secciones 5, 6 y 7 tienen cada una su pestaña en el laboratorio.
4. Termina con la actividad 3 (diseño de particiones) y el cuestionario de Aules.
:::

## 1. Planificar la instalación

Una instalación «a ciegas» es la manera más fácil de perder datos o de acabar con un sistema que no arranca. Antes de empezar, revisa siempre estos puntos:

| Paso | Qué comprobar |
|---|---|
| **Requisitos** | CPU, RAM y espacio en disco mínimos y recomendados de la versión que vas a instalar. Por debajo del mínimo, el rendimiento es pobre o el instalador se niega a continuar. |
| **Firmware** | Si el equipo arranca en modo **UEFI** o en BIOS clásica (*legacy/CSM*), y si tiene Secure Boot activado. De ello depende el tipo de tabla de particiones. |
| **Compatibilidad** | Que haya controladores para el SO elegido, sobre todo en hardware muy nuevo o muy antiguo. |
| **Copia de seguridad** | Si el disco tiene datos, **copia antes de tocar nada**. Particionar o instalar puede borrarlo todo de forma irreversible. |
| **Licencia** | Clave o licencia en regla para SO propietarios (véase la [página 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/es/)). |
| **Red y actualizaciones** | Conexión disponible para bajar actualizaciones y controladores al terminar. |
| **Medio de instalación** | Un USB arrancable (o una ISO si es una máquina virtual). Se crea con el apartado siguiente. |
| **Documentar** | Anota lo que haces: decisiones, particiones, capturas. Es un criterio de evaluación (RA2.i) y te salvará cuando olvides dónde has elegido qué. |

### 1.1 El medio de instalación

Un SO se distribuye como una **imagen ISO**. Para que un equipo físico pueda arrancar desde ella hay que «grabarla» en un USB de modo que sea arrancable: no vale copiar el archivo sin más.

| Herramienta | Plataforma | Notas |
|---|---|---|
| **Media Creation Tool** de Microsoft | Windows | Descarga y prepara Windows en un USB |
| **Rufus** | Windows | Grabar ISO de Windows o Linux; permite elegir MBR o GPT según el equipo |
| **balenaEtcher** | Windows, macOS, Linux | Sencillo, sirve para la mayoría de ISO |
| `dd` | Linux | Funciona, pero un error de unidad destruye datos |

Si la ISO la bajas de Internet, **comprueba su integridad** comparando el *hash* SHA-256 que publica el fabricante:

```bash
sha256sum ubuntu.iso            # Linux
```

```powershell
Get-FileHash .\ubuntu.iso -Algorithm SHA256    # Windows
```

Después entra en el menú de arranque del equipo (la tecla depende del fabricante: F12, F2, Supr, Esc...) y elige el USB. En una máquina virtual, simplemente se asocia la ISO a la unidad óptica virtual.

## 2. Qué es particionar y por qué

**Particionar** es dividir el espacio de un disco físico en secciones lógicas independientes, las **particiones**. Cada una puede tener su propio sistema de archivos y el SO la trata como si fuera un disco distinto. Los motivos habituales:

- **Separar el sistema de los datos**: reinstalar el SO sin tocar los documentos.
- **Instalar varios sistemas en el mismo disco** (arranque dual o *dual boot*).
- **Crear las particiones que el propio SO necesita**: la partición de arranque EFI en equipos UEFI, la partición de intercambio (*swap*) en Linux...
- **Aislar** una zona para que no se llene todo el disco (por ejemplo, el *log* de un servidor).

Una partición **no es** una copia de seguridad: si el disco físico falla, se pierden todas. Tampoco hace el disco más rápido.

## 3. Esquemas de particionado: MBR y GPT

La **tabla de particiones** es la estructura, en los primeros (y últimos) sectores del disco, que dice dónde empieza y acaba cada partición. Hay dos esquemas.

### 3.1 MBR (*Master Boot Record*)

El esquema clásico, de los años 80, asociado a la BIOS. Guarda la tabla en el primer sector de 512 bytes (que también contiene un pequeño código de arranque). Solo tiene **4 entradas**, de modo que admite como máximo **4 particiones primarias**. Si necesitas más, una de las entradas se convierte en **partición extendida**, un contenedor dentro del cual se crean **particiones lógicas** (tantas como haga falta). Normas del MBR:

- Máximo **4 primarias**, o **3 primarias + 1 extendida**.
- Solo puede haber **una** extendida por disco.
- La **lógica** solo vive dentro de la extendida.
- Las direcciones son de 32 bits: con sectores de 512 bytes solo se llega a **2 TiB** (≈ 2,2 TB). Si el disco es más grande, **el espacio sobrante es inutilizable**.

### 3.2 GPT (*GUID Partition Table*)

El esquema moderno, asociado a UEFI. No tiene primarias, extendidas ni lógicas: todas las particiones son iguales. Por defecto admite **128 particiones**, no tiene el límite de 2 TiB (prácticamente ningún disco real lo puede llenar) y guarda una **copia de la tabla al final del disco**, de modo que resiste mejor la corrupción. Cada partición se identifica con un GUID. Al principio hay un «MBR de protección» para que las herramientas antiguas no vean el disco como vacío.

| Característica | MBR | GPT |
|---|---|---|
| Aparición | Años 80 | Años 2000 (parte de la norma UEFI) |
| Particiones | 4 primarias, o 3 + extendida con lógicas | 128 por defecto, todas iguales |
| Tamaño máximo de disco | 2 TiB (sectores de 512 B) | Prácticamente ilimitado |
| Copia de la tabla | No | Sí, al final |
| Firmware habitual | BIOS | UEFI |

Una regla práctica para decidir:

- **Equipo UEFI** (lo normal desde hace años) → **GPT**. Windows en UEFI exige GPT en el disco de arranque.
- **Equipo con BIOS clásica** → **MBR** para Windows. Linux puede usar GPT, pero hace falta una pequeña partición adicional (`bios_grub`).
- **Disco de más de 2 TiB** → **GPT**, siempre.

:::note[Ejemplo resuelto]
Se quiere instalar Windows 11 en un disco nuevo de 4 TB. Windows 11 exige un equipo UEFI, y el disco es mayor que 2 TiB: MBR ni siquiera podría direccionar todo el espacio. La solución es un disco **GPT**.
:::

### 3.3 Cómo lo deja Windows

Cuando se instala Windows en un disco vacío de un equipo UEFI, crea normalmente estas particiones: una **EFI** de FAT32 (unos 100 MB o más), una pequeña **MSR** reservada por el sistema (16 MB), la partición del sistema, **C:** (NTFS) y una de **recuperación** (algunos cientos de MB). No hace falta que las memorices, pero sí que reconozcas la **partición EFI** y la de **recuperación** cuando las veas en el Administrador de discos.

## 4. Cómo se llaman los discos y las particiones

### 4.1 Linux

Linux representa cada dispositivo con un archivo dentro de `/dev`. Los discos SATA/USB/SCSI se llaman `/dev/sda`, `/dev/sdb`... por orden de detección, y las particiones añaden un número: `/dev/sda1`, `/dev/sda2`...

| Dispositivo | Nombre del disco | Primera partición |
|---|---|---|
| Disco SATA o USB | `/dev/sda` | `/dev/sda1` |
| Segundo disco SATA | `/dev/sdb` | `/dev/sdb1` |
| SSD NVMe | `/dev/nvme0n1` | `/dev/nvme0n1p1` |
| Disco de una VM VirtIO | `/dev/vda` | `/dev/vda1` |

En MBR, los números **1 a 4** están reservados a las primarias (y a la extendida); las **lógicas empiezan siempre por el 5**, aunque el disco solo tenga una primaria. Así, en un disco con 2 primarias y una extendida con 3 lógicas, las particiones son `sda1`, `sda2`, `sda3` (la extendida) y `sda5`, `sda6`, `sda7`.

### 4.2 Windows

Windows no muestra el disco como un archivo, sino que asigna a cada volumen con sistema de archivos reconocido una **letra de unidad** (`C:`, `D:`...). `C:` es el volumen del sistema. La partición EFI y la extendida no tienen letra. Los discos físicos se identifican como **Disco 0**, **Disco 1**... en el Administrador de discos.

### 4.3 Herramientas para verlo

```bash
lsblk                       # árbol de discos y particiones (Linux)
lsblk -f                    # con el sistema de archivos y la UUID
sudo fdisk -l               # lista las tablas de particiones
```

```powershell
Get-Disk                    # discos y estilo de partición (MBR o GPT)
Get-Partition               # particiones con letra y tamaño
```

## 5. Un esquema típico para Linux

Cuando un instalador te deja elegir el particionado manual, un esquema bien pensado para un equipo UEFI tiene estas particiones:

| Partición | Sistema de archivos | Punto de montaje | Tamaño orientativo | Para qué |
|---|---|---|---|---|
| **EFI** (ESP) | FAT32 | `/boot/efi` | 512 MiB – 1 GiB | Guarda los gestores de arranque |
| **Raíz** | ext4 | `/` | 25–50 GiB o más | El sistema y los programas |
| **Datos de usuario** (opcional) | ext4 | `/home` | El resto del disco | Documentos y configuración personal |
| **Swap** | swap | — | 2–4 GiB, o ≥ la RAM si quieres hibernar | Memoria de intercambio |

Ideas que hay que retener:

- Separar `/home` permite **reinstalar el sistema sin perder los datos** (solo se formatea `/`).
- La **swap** se usa cuando la RAM se llena, y es necesaria para hibernar. Los instaladores recientes de Ubuntu pueden usar un *archivo* de swap en lugar de una partición; lo verás en la práctica.
- En un equipo de **BIOS y MBR** no hay partición EFI, y el arranque se guarda en el sector 0 del disco.
- Las cifras son orientativas: comprueba los requisitos de la versión que instalas (por ejemplo, Ubuntu Desktop reciente recomienda unos 25 GB de disco y 4 GB de RAM).

## 6. Dual boot: dos sistemas en un disco

El **arranque dual** permite elegir, al encender, entre dos sistemas (normalmente, Windows y Linux). Hay que respetar tres reglas:

1. **Instala primero Windows y después Linux.** El instalador de Linux detecta Windows y lo añade al menú de su gestor de arranque (GRUB). Si haces el orden contrario, el instalador de Windows no conoce ningún otro sistema y **pone su gestor en primer lugar**: Linux sigue en el disco, pero «desaparece» del menú hasta que se repare la configuración.
2. **Haz espacio desde Windows.** Reduce el volumen de Windows desde el Administrador de discos (*Reducir volumen...*) para dejar espacio sin asignar, y luego deja que el instalador de Linux use ese espacio.
3. **Mismo modo de firmware en los dos**: ambos en UEFI, o ambos en BIOS clásica.

:::caution[Cosas que hacen fallar un dual boot]
- **Inicio rápido** de Windows: al estar activado, Windows hiberna parcialmente y deja su volumen «bloqueado». Desactívalo antes de instalar Linux.
- **BitLocker**: si el disco de Windows está cifrado, cambiar las particiones puede pedir la clave de recuperación. Guárdala o suspende la protección.
- **Reloj**: Windows guarda la hora local en el reloj del hardware y Linux, por defecto, la UTC, y cada vez que cambias de sistema la hora está desplazada. Se corrige con `timedatectl` en Linux.
- Si Windows queda sin arrancar tras un cambio de particiones, la causa suele ser el gestor de arranque, no los datos.
:::

## 7. La cadena de arranque del sistema operativo

Ya viste en la unidad 1 que el firmware hace el POST. Esta es la parte que viene a continuación, desde el punto de vista del SO:

| Paso | UEFI + Linux | UEFI + Windows | BIOS + MBR (Linux) |
|---|---|---|---|
| 1 | El firmware elige una entrada de arranque | Lo mismo | El firmware elige un disco |
| 2 | Carga desde la partición EFI el gestor (*shim* y GRUB) | Carga desde la EFI el **Windows Boot Manager** | Lee el primer sector (MBR) y ejecuta su código |
| 3 | GRUB muestra el menú y carga el **núcleo** e `initramfs` en RAM | El gestor lee el **BCD** y carga `winload` | El código carga GRUB, que carga el núcleo |
| 4 | El núcleo inicia el hardware y monta la raíz | El núcleo de Windows se inicia | Igual que en UEFI |
| 5 | El proceso **systemd** (PID 1) arranca los servicios | Los servicios y el inicio de sesión de Windows | Igual |
| 6 | Aparece la pantalla de inicio de sesión | Aparece la pantalla de inicio de sesión | Igual |

Esto explica errores típicos: el mensaje `grub rescue>` aparece cuando GRUB no encuentra sus archivos; `Boot Configuration Data ... 0xc000000f` de Windows, cuando su gestor no encuentra el BCD; un *kernel panic* dice que el núcleo no ha podido montar la raíz. El laboratorio tiene una pestaña para recorrer esta cadena paso a paso.

## 8. Herramientas de particionado

| Herramienta | Entorno | Para qué |
|---|---|---|
| **Instalador** del SO | Windows, Linux | Particionado durante la instalación |
| **Administrador de discos** (`diskmgmt.msc`) | Windows | Crear, reducir, extender y formatear volúmenes con una interfaz gráfica |
| `diskpart` | Windows (consola) | Las mismas tareas por órdenes |
| **GParted** | Linux (también en versión *live*) | Herramienta gráfica muy popular; puede reducir/mover particiones |
| `fdisk`, `gdisk`, `parted` | Linux (consola) | Más potentes, requieren precisión |

```powershell
diskpart
list disk
select disk 0
list partition
```

```bash
sudo parted -l              # lista todas las tablas de particiones
```

:::danger[Un error puede dejar un disco inaccesible]
Las herramientas de particionado aplican los cambios sobre discos reales. Comprueba el número del disco antes de borrar o formatear nada, y en este módulo practica siempre en **máquinas virtuales**. Órdenes como `clean` (en `diskpart`) o `mkfs` borran el disco.
:::

## Comprueba lo aprendido

1. Un disco MBR tiene 3 particiones primarias y quieres añadir tres más. ¿Es posible?

   <details>
   <summary>Respuesta</summary>

   Sí, si queda espacio libre: se crea una **extendida** en la cuarta entrada de la tabla (3 primarias + 1 extendida) y, dentro de ella, las tres **lógicas**. No se podría si las cuatro entradas ya fueran primarias.

   </details>

2. ¿Cómo se llama la tercera partición lógica del segundo disco SATA?

   <details>
   <summary>Respuesta</summary>

   `/dev/sdb7`. El segundo disco es `sdb`, y las lógicas empiezan en el 5: 5, 6 y **7**.

   </details>

3. ¿Por qué se instala primero Windows y después Linux en un dual boot?

   <details>
   <summary>Respuesta</summary>

   Porque el instalador de Linux detecta Windows y lo añade al menú de GRUB, mientras que el instalador de Windows no conoce Linux y pone su propio gestor en primer lugar, dejando Linux fuera del menú.

   </details>

4. ¿Qué diferencia hay entre la partición EFI y la swap?

   <details>
   <summary>Respuesta</summary>

   La partición **EFI** (FAT32) guarda los gestores de arranque que carga el firmware UEFI. La **swap** es el espacio de intercambio que Linux usa como memoria cuando se llena la RAM (y para hibernar). Son independientes.

   </details>

5. ¿Cuál es el primer programa del SO que se ejecuta al arrancar un Linux UEFI y cuál es el último antes del inicio de sesión?

   <details>
   <summary>Respuesta</summary>

   El primero es el **gestor de arranque** (GRUB, cargado desde la partición EFI); después el núcleo y, finalmente, **systemd**, que arranca los servicios y muestra la pantalla de inicio de sesión.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| partició | partición |
| taula de particions | tabla de particiones |
| partició primària / estesa / lògica | partición primaria / extendida / lógica |
| partició EFI (ESP) | partición EFI (ESP) |
| partició d'intercanvi (*swap*) | partición de intercambio (*swap*) |
| arrancada | arranque |
| arrancada dual (*dual boot*) | arranque dual (*dual boot*) |
| gestor d'arrancada | gestor de arranque |
| suport d'instal·lació | medio de instalación |
| imatge ISO | imagen ISO |
| punt de muntatge | punto de montaje |
| lletra d'unitat | letra de unidad |
| redimensionar | redimensionar |
