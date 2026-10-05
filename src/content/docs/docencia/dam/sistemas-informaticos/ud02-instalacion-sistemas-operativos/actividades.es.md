---
title: Actividades
description: "Seis actividades de la unidad 2: cinco de estudio autónomo (sistemas de archivos, SO y licencias, diseño de particiones, instalación documentada en una VM, diagnóstico y recuperación) y la memoria de la sesión presencial."
---

Estas son las actividades de la unidad. Las cinco primeras las haces por tu cuenta, a medida que avanzas con los apuntes, y se apoyan en el [laboratorio «Particiones y arranque»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/?lang=es). La sexta es la memoria que entregas durante la sesión presencial. Puedes ver cuándo hacer cada una en la [planificación](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/planificacion/es/).

Todas se **entregan en Aules**, en la tarea correspondiente, en un documento (PDF, ODT o DOCX) con tu nombre. No hace falta copiar los enunciados: numera las respuestas.

## Actividad 1 · Elegir el sistema de archivos

**Objetivo:** decidir con criterio qué sistema de archivos hace falta en cada situación y justificar qué descarta cada límite.

**Qué tienes que hacer:**

1. Repasa la [página 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/es/) y practica con la pestaña «¿Qué sistema de archivos?» del laboratorio, marcando los requisitos de cada caso.
2. Para cada caso, elige un sistema de archivos (FAT32, exFAT, NTFS o ext4) y justifícalo en una o dos líneas. Si ninguno cumple todos los requisitos, explica a cuál renuncias:
   - **a)** Un pendrive de 128 GB para llevar vídeos de 8 GB entre un Windows, un macOS y un Linux.
   - **b)** La partición raíz de un servidor Linux que guarda archivos de varios usuarios.
   - **c)** El volumen donde se instala Windows 11.
   - **d)** Una tarjeta SD de una cámara antigua que solo reconoce FAT32; quieres grabar vídeo en secuencias largas. ¿Qué pasa con el archivo cuando llega al límite y cómo lo evitarías?
   - **e)** Un disco externo de 2 TB para copias de seguridad de un Windows y de un Linux, en el que querrías conservar los permisos de los archivos.
   - **f)** La partición EFI de un equipo UEFI.
3. Un compañero dice: «FAT32 admite particiones de hasta 8 TB». Explica por qué esa cifra es incompleta (tamaño de clúster, herramientas de formateo).

**Qué entregas:** un documento con las respuestas **a** a **f** (caso, sistema elegido, justificación) y la respuesta a la pregunta 3, en la tarea «Actividad 1» de Aules.

**Criterios que trabaja:** RA2.b, RA2.c

**Dificultad:** ★☆☆ · **Tiempo estimado:** 40 minutos

## Actividad 2 · Elegir un sistema operativo y una licencia

**Objetivo:** comparar sistemas operativos por requisitos, campo de aplicación y licencia, y clasificarlos según sus usuarios.

**Qué tienes que hacer:**

1. Lee la sección 3 de la [página 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/es/). Este es el caso: una asociación de formación de adultos tiene **12 ordenadores de hace unos 8 años** (4 GB de RAM, disco duro mecánico, firmware UEFI sin TPM 2.0) y **un equipo más nuevo** que hará de servidor de archivos para todos. No tiene presupuesto para licencias. Necesitan ofimática, navegador y copia de seguridad de documentos.
2. Haz una **tabla comparativa** de tres opciones que puedan usar (por ejemplo, Windows 11, Windows 10 o una distribución Linux de escritorio), con: licencia y coste, requisitos mínimos, campo de aplicación, compatibilidad con este hardware y soporte/seguridad. Consulta las páginas oficiales para los requisitos y cita la fuente.
3. Recomienda un SO para los 12 equipos y uno para el servidor, y justifícalo en 6-8 líneas.
4. Clasifica cada SO elegido como monousuario, multiusuario y/o de red, y explica el criterio que usas.
5. Indica dos precauciones de licencia que deberían tener en cuenta (número de equipos, uso previsto, versiones de prueba).

**Qué entregas:** la tabla y las respuestas 3 a 5, en la tarea «Actividad 2» de Aules.

**Criterios que trabaja:** RA2.a, RA2.b, RA2.c

**Dificultad:** ★★☆ · **Tiempo estimado:** 45 minutos

## Actividad 3 · Diseñar el particionado de un equipo con dual boot

**Objetivo:** diseñar y justificar la tabla de particiones de un equipo, escogiendo esquema, orden de instalación y nombres de dispositivos.

**Qué tienes que hacer:**

1. Abre las pestañas 2 a 6 del [laboratorio](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/?lang=es) y repasa las secciones 3 a 7 de la [página 2](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/02-instal-lacio-i-particionat/es/).
2. **Caso A.** Portátil con **UEFI** y un SSD NVMe de **512 GB**, 16 GB de RAM, sin disco de datos. Quiere **Windows 11** (reserva al menos 150 GB para Windows) y **Ubuntu** con `/home` separado y sin hibernación.
   - **a)** Elige MBR o GPT y justifícalo.
   - **b)** Haz una tabla con las particiones que debe haber (nombre o uso, sistema de archivos, tamaño, punto de montaje o letra, **nombre del dispositivo en Linux**). Tiene que sumar el disco.
   - **c)** Di en qué orden instalarás los dos sistemas y qué pasos habrá que dar en Windows antes de instalar Linux.
   - **d)** ¿Qué pasaría si hubieras instalado primero Ubuntu y después Windows? ¿Cómo lo resolverías?
3. **Caso B.** Un ordenador antiguo con **BIOS clásica** y un disco de **2 TB**. Necesita **6 particiones** (sistema, datos, tres para pruebas y una de intercambio). Diseña la tabla con MBR: cuáles son primarias, cuál es extendida y cuáles son lógicas, y cómo se llaman en Linux (`/dev/sda...`). Razona si GPT sería una opción mejor.
4. Comprueba tu diseño reproduciéndolo en el constructor del laboratorio (pestaña 2) y anota si hay alguna restricción que no habías previsto.

**Qué entregas:** los apartados 2, 3 y 4, con las tablas, en la tarea «Actividad 3» de Aules.

**Criterios que trabaja:** RA2.d, RA2.e

**Dificultad:** ★★★ · **Tiempo estimado:** 60 minutos

## Actividad 4 · Instalación documentada de un Linux en una máquina virtual

**Objetivo:** instalar y configurar un SO cliente en una VM y documentar el proceso.

**Qué tienes que hacer:**

1. Lee las páginas [2](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/02-instal-lacio-i-particionat/es/) y [3](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/03-so-client-actualitzacions-i-controladors/es/). Instala VirtualBox (o el hipervisor que uses) y descarga la ISO de Ubuntu Desktop; comprueba su hash SHA-256 con la orden `sha256sum` o `Get-FileHash`.
2. Crea una VM con 2 CPU, 4 GB de RAM y 25 GB de disco (firmware EFI, si el hipervisor lo permite).
3. Instala Ubuntu con **particionado manual**: EFI, `/`, `/home` y swap (o archivo de swap si el instalador lo propone). Antes, escribe tu plan (tamaños y por qué).
4. Al terminar: pon un **nombre de equipo** propio, **actualiza** el sistema (`apt update` y `apt upgrade`), **instala y desinstala** un programa con `apt` (por ejemplo, `tree` o `htop`) y comprueba los **controladores** con `lspci -k`.
5. Ejecuta `lsblk -f` y comprueba que las particiones coinciden con tu plan.
6. Crea una **instantánea** de la VM terminada.

**Qué entregas:** un documento con: el plan de particionado, **capturas** de la configuración de la VM, del particionado y de las órdenes de los pasos 4 y 5 (con su resultado), y un párrafo final sobre las decisiones que has tomado y los problemas que te han surgido. En la tarea «Actividad 4» de Aules. Conserva la VM: la usarás en la presencial.

**Criterios que trabaja:** RA2.d, RA2.e, RA2.g, RA2.h, RA2.i

**Dificultad:** ★★★ · **Tiempo estimado:** 2 horas

## Actividad 5 · Diagnosticar controladores y elegir un mecanismo de recuperación

**Objetivo:** diagnosticar problemas de controladores y elegir la herramienta de recuperación adecuada para cada situación.

**Qué tienes que hacer:** para cada caso, explica qué pasa, cuál es el siguiente paso de diagnóstico o reparación y **qué mecanismo de recuperación** usarías si fuera necesario (punto de restauración, WinRE, GRUB con núcleo anterior, USB *live*, instantánea, imagen o clon, copia de seguridad de datos). Justifica la elección.

1. **Caso A.** Un portátil con Windows recién instalado no tiene Wi-Fi ni Ethernet. En el Administrador de dispositivos aparece, dentro de «Otros dispositivos», un «Controlador Ethernet» con un triángulo amarillo, y las propiedades dicen «Los controladores de este dispositivo no están instalados (Código 28)». ¿Cómo lo repararías si ese equipo no tiene Internet?
2. **Caso B.** En un Ubuntu, la orden `lspci -k` da una salida como esta (los nombres entre `<>` son marcadores):

   ```text
   00:02.0 VGA compatible controller: <fabricante> <modelo gráfica>
           Kernel driver in use: <controlador gráfica>
   03:00.0 Network controller: <fabricante> <modelo Wi-Fi>
           Subsystem: <identificador>
   ```

   ¿Qué indica la falta de `Kernel driver in use` en el segundo dispositivo? ¿Qué órdenes probarías? ¿Cuál sería el siguiente paso?
3. **Caso C.** Tras instalar un controlador gráfico nuevo, Windows arranca con la pantalla negra o con artefactos. ¿Qué pasos darías para arrancar y dejar el equipo como antes?
4. **Caso D.** Tras un `sudo apt upgrade` que ha instalado un núcleo nuevo, un Ubuntu ya no arranca. ¿Cómo arrancas y qué haces después?
5. **Caso E.** Un usuario ha borrado por error una carpeta de documentos del equipo y quiere recuperarla. Un compañero le propone «volver a un punto de restauración». ¿Tiene sentido?

**Qué entregas:** las respuestas a los cinco casos, en la tarea «Actividad 5» de Aules.

**Criterios que trabaja:** RA2.e, RA2.f

**Dificultad:** ★★☆ · **Tiempo estimado:** 45 minutos

## Actividad 6 · Memoria de la práctica de instalación y virtualización (presencial)

**Objetivo:** documentar el proceso de creación de una VM, instalación de un SO, uso de Guest Additions e instantáneas, y comparar las modalidades de instalación de Windows Server.

**Qué tienes que hacer** (durante la sesión presencial del 3 de noviembre, de manera individual, siguiendo el guion de la [página 4](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/04-so-servidor-i-maquines-virtuals/es/)):

1. Crea una **VM** con 2 CPU, 4 GB de RAM y un disco virtual de 25 GB.
2. **Instala el Linux** que indique el profesor (ISO en Aules).
3. Instala las **Guest Additions** y comprueba que funciona una **carpeta compartida** con el anfitrión.
4. Crea una **instantánea** de la VM recién instalada, haz un cambio de prueba (por ejemplo, borrar un archivo) y **restaura** la instantánea.
5. Arranca el **instalador de Windows Server** hasta la pantalla de elección entre *Server Core* y *Experiencia de escritorio*, sin completar la instalación.
6. Redacta la memoria con cinco apartados:
   - **Apartado 1:** captura de la configuración de la VM (RAM, CPU, disco).
   - **Apartado 2:** captura del escritorio del Linux instalado y funcionando dentro de la VM.
   - **Apartado 3:** captura que demuestre que la carpeta compartida funciona.
   - **Apartado 4:** 2-3 líneas sobre qué ha pasado al restaurar la instantánea y para qué situaciones reales la usarías.
   - **Apartado 5:** 4-5 líneas con tus palabras sobre la diferencia entre *Server Core* y *Experiencia de escritorio* y en qué situación usarías cada una.

**Qué entregas:** la memoria completa, en la tarea de Aules **antes de terminar la clase**.

**Criterios que trabaja:** RA2.e, RA2.g, RA2.i (y RA2.c y RA2.f en los apartados 5 y 4)

**Dificultad:** ★★☆ · **Tiempo estimado:** durante la sesión presencial

:::aules
Las entregas de estas actividades se hacen en Aules, en la tarea de cada una. Allí también encontrarás la rúbrica, las calificaciones y las soluciones comentadas.
:::
