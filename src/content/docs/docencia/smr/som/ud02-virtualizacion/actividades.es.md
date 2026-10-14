---
title: Actividades
description: "Siete actividades de la Unidad 2 con VirtualBox: escenarios, instalación de software, importar un OVA, instantáneas, Guest Additions, una VM de Windows y una prueba de rendimiento anfitrión frente a invitado."
---

Estas son las actividades de la unidad. La mayoría se hacen con un hipervisor real, así que necesitas un ordenador donde puedas usar VirtualBox (los del aula o el tuyo). Algunas usan el laboratorio [Virtualization Playground](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es), y su pestaña **Práctica** es una buena autoevaluación antes de entregar tu trabajo.

Todas se **entregan en Aules**, en la tarea de cada actividad, en un PDF con tu nombre. Añade capturas de pantalla cuando la actividad lo pida y escribe las respuestas con tus propias palabras. No copies texto de los apuntes ni de Internet.

## Actividad 1 · ¿Lo virtualizarías?

**Objetivo:** reconocer situaciones reales donde la virtualización ayuda y donde no.

**Qué tienes que hacer:**

1. Abre las pestañas del laboratorio **Físico frente a virtual** y **Pros y contras** y complétalas. Apunta tu puntuación final en la segunda.
2. Lee estas cinco situaciones:
   - **a)** Una tienda pequeña quiere un servidor de correo, un servidor web y un servidor de archivos. Cada uno usará alrededor del 10 % de un ordenador.
   - **b)** Un estudio de vídeo necesita la máxima velocidad de una tarjeta gráfica muy potente para editar.
   - **c)** Un profesor quiere 30 sistemas Linux idénticos para una clase, y los alumnos deben poder estropearlos sin ninguna consecuencia.
   - **d)** Un analista de seguridad quiere abrir el archivo adjunto de un correo sospechoso.
   - **e)** Un hospital ejecuta una base de datos que procesa miles de operaciones de disco por segundo, las 24 horas del día.
3. Para cada situación, decide si la virtualización es **recomendable**, **posible con cuidado** o **no recomendable**. Justifícalo en dos o tres líneas, nombrando al menos una ventaja o un inconveniente de la página 1 de los apuntes.
4. Inventa **dos situaciones más** (una en la que la virtualización sea muy buena idea y otra en la que sea mala idea) y explícalas.

**Qué entregas:** un PDF con la tabla de las cinco situaciones, tus dos situaciones y tu puntuación del laboratorio, en la tarea de Aules «Actividad 1».

**Dificultad:** ★☆☆ · **Tiempo estimado:** 40 minutos

## Actividad 2 · Instala software de virtualización y compara hipervisores

**Objetivo:** instalar un programa de virtualización y compararlo con otros productos.

**Qué tienes que hacer:**

1. Instala **VirtualBox** en tu ordenador (o comprueba con tu profesor si ya está instalado en el ordenador del aula). Ejecuta `VBoxManage --version` en un terminal y haz una captura de la respuesta.
2. Haz una captura de la ventana principal del VirtualBox Manager.
3. Abre la pestaña del laboratorio **Constructor de pilas** y completa las pilas y la clasificación de productos.
4. Elige **un producto propietario** de virtualización (por ejemplo VMware Workstation o Hyper-V) y construye esta tabla con al menos **tres productos libres o de código abierto** y **tres propietarios**:

   | Producto | Tipo 1 o 2 | Licencia | Sistemas operativos anfitriones | Una característica distintiva |
   |---|---|---|---|---|

   Usa las webs oficiales para comprobar la licencia vigente. Anota la fecha en que las consultaste.
5. Escribe un resumen de **100 a 150 palabras** que explique con tus propias palabras la diferencia entre tipo 1 y tipo 2.
6. Responde: ¿en qué casos elegirías el producto propietario que has seleccionado y en qué casos elegirías VirtualBox?

**Qué entregas:** un PDF con las capturas, la tabla, el resumen y la respuesta, en la tarea de Aules «Actividad 2».

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 3 · Importa una aplicación virtual (OVA)

**Objetivo:** desplegar una máquina virtual ya preparada, comprobarla y relacionarla con el anfitrión.

**Qué tienes que hacer:**

1. Descarga el OVA de la aplicación Linux que te dé tu profesor en Aules. Comprueba su suma de verificación con `sha256sum` (o el equivalente de tu sistema) y compárala con el valor publicado.
2. Impórtalo en VirtualBox con estos ajustes:
   - Nombre: `SOM-U2-` seguido de tu apellido.
   - 2 vCPU y la RAM que pueda dar tu anfitrión (no más de la mitad de la memoria del anfitrión).
   - Primer adaptador de red en NAT.
   - Nuevas direcciones MAC para todos los adaptadores de red.
3. Antes de arrancarla, abre la pestaña del laboratorio **Asistente de nueva VM** y comprueba si los valores que has usado cumplen los requisitos de un sistema parecido.
4. Arranca la VM y ejecuta, dentro de ella:

   ```bash
   hostnamectl
   ip a
   df -h
   ```

   Haz una captura de cada resultado.
5. Responde en dos o tres líneas cada una:
   - **a)** ¿Qué dirección IP tiene la VM y por qué tiene una dirección de ese tipo?
   - **b)** ¿Dónde se guarda la VM en el anfitrión? Busca el archivo de disco y anota su tamaño en MB o GB.
   - **c)** Compara la memoria y el número de CPU que ve el invitado (`free -h`, `nproc`) con los valores reales del anfitrión.
6. Toma una instantánea llamada `baseline-import` (la usarás en la actividad 4).

**Qué entregas:** un PDF con las capturas y las respuestas, en la tarea de Aules «Actividad 3».

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 4 · Instantáneas como red de seguridad

**Objetivo:** usar instantáneas para probar cambios con seguridad y entender cómo funcionan.

**Qué tienes que hacer:** usa la VM de la actividad 3.

**Parte A: volver atrás tras un error**

1. Comprueba que tienes la instantánea `baseline-import`.
2. Dentro del invitado, crea una carpeta `proyecto` en tu carpeta personal y un archivo `plan.txt` con tu nombre dentro. Toma una instantánea llamada `with-project`.
3. Ahora «rompe» el sistema: borra la carpeta `proyecto` e instala un programa pequeño (por ejemplo `sudo apt install tree`). Comprueba que la carpeta ya no está y que el programa está instalado.
4. Restaura la instantánea `with-project`. Comprueba qué ha pasado con la carpeta y con el programa. Haz una captura.

**Parte B: cadenas y fusión**

5. Crea un segundo archivo `datos.txt` y toma una instantánea llamada `with-data`. Después crea `extra.txt` y toma una instantánea llamada `with-extra`. Haz una captura del árbol de instantáneas.
6. Elimina la instantánea **intermedia** (`with-data`). Comprueba qué archivos siguen existiendo. Explica qué hizo VirtualBox con sus cambios.
7. Mira la carpeta `Snapshots` dentro de la carpeta de la VM en el anfitrión. Anota los nombres y los tamaños de los archivos antes y después de eliminar la instantánea.

**Parte C: reflexiona**

8. Responde: ¿qué diferencia hay entre *restaurar* y *eliminar*? ¿Por qué una instantánea no es una copia de seguridad? Escribe tu propia regla de buenas prácticas para las instantáneas (una o dos frases).

**Qué entregas:** un PDF con las capturas, los tamaños de los archivos y las respuestas, en la tarea de Aules «Actividad 4».

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 5 · Guest Additions y una carpeta compartida

**Objetivo:** instalar las herramientas de integración y compartir datos entre anfitrión e invitado.

**Qué tienes que hacer:** usa la VM de la actividad 3 (antes, toma una instantánea llamada `before-guest-additions`).

1. Instala las Guest Additions en el invitado siguiendo los apuntes. Reinicia la VM.
2. Comprueba y anota qué ha cambiado: ratón, cambio de tamaño de la ventana, portapapeles.
3. Activa el **portapapeles bidireccional**. Copia una frase en el anfitrión y pégala en el invitado. Después copia una frase en el invitado y pégala en el anfitrión. Haz una captura de cada pegado.
4. Crea en el anfitrión una carpeta llamada `compartida-som` y pon en ella un archivo de texto. Añádela a la VM como **carpeta compartida** con *Auto-mount* y *Make Permanent*. Ábrela en el invitado y haz una captura.
5. Crea un archivo en el invitado, dentro de la carpeta compartida, y comprueba que puedes abrirlo en el anfitrión.
6. Escribe una breve reflexión (4-5 líneas): ¿qué riesgo de seguridad añaden la carpeta compartida y el portapapeles y qué harías para reducirlo?

**Qué entregas:** un PDF con las capturas y la reflexión, en la tarea de Aules «Actividad 5».

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 6 · Una VM con un sistema operativo propietario

**Objetivo:** crear desde cero una máquina virtual con un sistema operativo que no es libre.

**Qué tienes que hacer:**

1. Busca la **versión de evaluación oficial de Windows 11 Enterprise** en el Centro de evaluación de Microsoft (Microsoft Evaluation Center). Anota el nombre de la página y el límite de tiempo de la licencia. No uses copias de sitios no oficiales. (Las direcciones web cambian, así que busca por el nombre en lugar de usar un enlace antiguo.) Si tu profesor te da una ISO en Aules, usa esa.
2. Comprueba los requisitos de Windows 11 y anótalos. Compáralos con tu anfitrión: ¿tienes suficiente RAM, espacio de disco y núcleos? Usa la pestaña del laboratorio **Asistente de nueva VM** para probar los valores elegidos antes de crear la VM.
3. Crea la VM en VirtualBox con el tipo *Windows 11 (64-bit)*, al menos 2 vCPU, 4 GB de RAM y un disco de al menos 64 GB (dinámico). Comprueba en **Settings → System** que EFI y TPM 2.0 están activados. Haz una captura del resumen de ajustes.
4. Instala Windows desde la ISO e instala las Guest Additions.
5. Toma una instantánea llamada `windows-clean`.
6. Responde: ¿qué diferencias has encontrado respecto a la aplicación Linux (tiempo de instalación, requisitos, licencia)? ¿Por qué un invitado propietario es más «caro» en recursos y en licencias?

**Qué entregas:** un PDF con las capturas (requisitos, ajustes, instalación terminada) y las respuestas, en la tarea de Aules «Actividad 6».

**Dificultad:** ★★★ · **Tiempo estimado:** 120 minutos

## Actividad 7 · Anfitrión frente a invitado: una prueba de rendimiento

**Objetivo:** medir el rendimiento de un anfitrión y de un invitado y explicar la diferencia.

**Qué tienes que hacer:**

1. Lee la página 5 de los apuntes. Abre la pestaña del laboratorio **Reparto de recursos** y comprueba que la VM que vas a usar no asigna de más respecto al anfitrión.
2. Elige la VM de la actividad 3 (Linux) e instala `sysbench` en el **anfitrión** y en el **invitado**. (Si tu anfitrión es Windows, usa la prueba de rendimiento de 7-Zip en ambos sistemas, como se explica en los apuntes.)
3. Anota los datos de ambos sistemas: procesador, número de núcleos o vCPU, RAM, tipo de disco (SSD o HDD) y, en el invitado, la reserva del disco (dinámico o fijo).
4. Ejecuta tres pruebas en el anfitrión y después en el invitado, **tres veces cada una**, con los mismos parámetros:
   - CPU con el mismo número de hilos en ambos.
   - Memoria.
   - Escritura en disco con `dd` (1 GB).
5. Construye una tabla con la **mediana** de cada prueba y el **rendimiento relativo** del invitado (invitado ÷ anfitrión × 100).
6. Haz **un cambio** en la VM (por ejemplo, cambiar el número de vCPU, crear una cadena larga de instantáneas o activar o desactivar alguna función) y repite una de las pruebas. Explica el resultado.
7. Escribe una conclusión de 100 a 150 palabras: ¿dónde está la mayor diferencia, por qué y qué harías para mejorarla?

**Qué entregas:** un PDF con los datos de ambos sistemas, las órdenes, la tabla y la conclusión, en la tarea de Aules «Actividad 7».

**Dificultad:** ★★★ · **Tiempo estimado:** 90 minutos

:::aules
Las entregas de estas actividades se hacen en Aules, en la tarea de cada una. Allí también encontrarás la rúbrica, tus calificaciones y las soluciones comentadas.
:::
