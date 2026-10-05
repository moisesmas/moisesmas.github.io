---
title: "Actividades"
description: "Siete actividades de la unidad 1: tus propios dispositivos, tipos de ordenadores, sistemas operativos, representación de la información, unidades y licencias."
---

Estas son las actividades de la unidad. Hazlas en orden, después de leer los apuntes correspondientes. Casi todas usan uno de los dos laboratorios: el [Explorador del sistema](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/?lang=es) o el [Laboratorio de Bits](/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/?lang=es).

Entrega cada actividad en **Aules**, en la tarea correspondiente, en un documento (PDF, ODT o DOCX) con tu nombre. No hace falta copiar las preguntas: numera tus respuestas. Escribe en inglés si puedes. No incluyas datos personales (números de serie, contraseñas, fotos privadas) en tus capturas de pantalla.

## Actividad 1 · Sistemas por todas partes

**Objetivo:** identificar los cuatro elementos de un sistema informático en ejemplos cotidianos, separar el hardware del software y reconocer el firmware.

**Qué tienes que hacer:**

1. Abre las pestañas **Partes del sistema** y **Tipos de software** del Explorador del sistema y haz los ejercicios hasta resolverlos todos.
2. Nombra dos sistemas que **no** sean ordenadores (mecánicos, biológicos o sociales). Para cada uno escribe su finalidad y di qué sería el equivalente del hardware, del software, de los datos y del usuario.
3. ¿Es un robot aspirador un sistema informático? Explica tu respuesta usando los cuatro elementos.
4. Un móvil tiene estas características: pantalla OLED de 6,1 pulgadas, procesador de 8 núcleos, 8 GB de RAM, 256 GB de almacenamiento, módem 5G, batería de 4.000 mAh, sistema operativo Android, aplicación de cámara y sensor de huellas. Haz una tabla de dos columnas con el hardware y el software.
5. El portátil A tiene una pantalla de 13,4 pulgadas, un procesador x86, 8 GB de RAM, un SSD de 512 GB y Windows 11. El portátil B tiene una pantalla de 13,6 pulgadas, un procesador ARM de 8 núcleos, 8 GB de RAM, un SSD de 512 GB y macOS. Al pasar de A a B, ¿qué cambia más, el hardware o el software? Explícalo.
6. ¿Cuáles de estos dispositivos tienen firmware? Televisor inteligente, reloj de pared analógico, ratón con cable, memoria USB, bicicleta, router Wi-Fi, calculadora de bolsillo, lámpara de escritorio con un interruptor simple. Escribe una frase de justificación para cada uno.

**Qué entregas:** un documento con tus respuestas a los puntos 2–6, en la tarea «Actividad 1» de Aules.

**Criterios que trabaja:** RA1.a

**Dificultad:** ★☆☆ · **Tiempo estimado:** 45 minutos

## Actividad 2 · Mi ordenador, por dentro y por fuera

**Objetivo:** averiguar las características reales de un ordenador, clasificarlo y decidir si es adecuado para un sistema operativo.

**Qué tienes que hacer:**

1. Elige un ordenador que puedas usar: el tuyo, uno de la familia o un PC del aula. Abre la pestaña **Dentro de la caja** del laboratorio y repasa cada componente.
2. Averigua las características con las herramientas del sistema operativo:

   | Sistema | Dónde mirar |
   |---|---|
   | Windows | *Configuración → Sistema → Acerca de*; *Administrador de tareas* (`Ctrl+Mayús+Esc`) → *Rendimiento*; la herramienta `msinfo32` (también muestra el **modo de BIOS**: UEFI o heredado) |
   | macOS | *Menú Apple → Acerca de este Mac*; *Informe del sistema* |
   | Linux | `lscpu` (CPU), `free -h` (RAM), `lsblk` (discos), `lspci` (gráficos y otras tarjetas), `cat /etc/os-release` (SO). Para ver el tipo de firmware: `[ -d /sys/firmware/efi ] && echo UEFI \|\| echo BIOS` |

3. Rellena una tabla con: tipo de ordenador (por uso y por características), modelo de CPU y número de núcleos, RAM, tipo y capacidad del almacenamiento, gráficos, sistema operativo y versión, 32 o 64 bits y tipo de firmware (si puedes averiguarlo).
4. Enumera tres periféricos conectados y clasifica cada uno como entrada, salida, entrada y salida, almacenamiento o comunicación.
5. Busca los **requisitos mínimos actuales** de un sistema operativo (por ejemplo, el último Windows o Ubuntu Desktop) en la web oficial de su fabricante. Compáralos con tu tabla y escribe una conclusión: ¿es adecuado este ordenador? ¿Qué característica es el límite?

Si no puedes usar un ordenador, pide a tu profesor la ficha técnica de un PC del aula.

**Qué entregas:** la tabla, la lista de periféricos y la conclusión. Se agradece una captura de la ventana *Acerca de*. Tarea «Actividad 2» de Aules.

**Criterios que trabaja:** RA1.a, RA2.c

**Dificultad:** ★☆☆ · **Tiempo estimado:** 45 minutos

## Actividad 3 · El ordenador adecuado para cada trabajo

**Objetivo:** relacionar necesidades reales con el tipo de ordenador y entender por qué algunos sistemas necesitan un sistema operativo de tiempo real.

**Qué tienes que hacer:**

1. Haz la pestaña **El ordenador adecuado** del laboratorio.
2. Elige el mejor tipo de ordenador (superordenador, mainframe, servidor, PC, estación de trabajo o sistema empotrado) para cada caso y explica tu elección en una frase:
   - **a)** el sistema que guarda las historias clínicas de un servicio regional de salud, disponible día y noche;
   - **b)** el terminal de pago con tarjeta de una tienda pequeña;
   - **c)** una arquitecta autónoma que hace renders 3D de edificios;
   - **d)** un banco que debe procesar millones de transferencias cada noche;
   - **e)** un centro de investigación que simula el clima de los próximos 50 años;
   - **f)** un estudiante que escribe trabajos y ve vídeos.
3. Escribe cinco líneas sobre las diferencias entre un superordenador y un mainframe.
4. Dos de estos sistemas necesitan un sistema operativo de tiempo real: bomba de insulina, aplicación de música en streaming, controlador del airbag de un coche, videollamada. Di cuáles son los dos, explica qué pasa si la respuesta llega tarde e indica si cada uno es de tiempo real *estricto* o *flexible*.
5. ¿Qué tipo de ordenador es tu móvil? ¿Es de propósito general o específico? Justifica tu respuesta.

**Qué entregas:** un documento con las respuestas, en la tarea «Actividad 3».

**Criterios que trabaja:** RA1.a, RA2.d

**Dificultad:** ★★☆ · **Tiempo estimado:** 40 minutos

## Actividad 4 · Capas, estructura y clasificación de los sistemas operativos

**Objetivo:** explicar qué hace un sistema operativo, describir cómo se puede organizar su núcleo y clasificar los sistemas operativos actuales.

**Qué tienes que hacer:**

1. En la pestaña **Las capas del SO**, elige *Imprimir una página* en modo línea de órdenes y recorre todos los pasos. Escribe una lista numerada de lo que ocurre en cada capa, con tus palabras, y nombra la función del sistema operativo que aparece en cada paso.
2. En la pestaña **Arquitecturas del núcleo**, prueba las tres situaciones en cada diseño (falla un controlador, falla un componente básico, hardware nuevo). Haz una tabla con los resultados y responde: ¿por qué es rápido un núcleo monolítico? ¿Por qué la mayoría de los sistemas operativos de propósito general usan un diseño modular?
3. Dibuja un mapa mental (por ejemplo con draw.io) o una tabla con los cinco criterios de clasificación (estructura, usuarios, multitarea, licencia y número de CPU). Incluye las categorías y un sistema operativo de ejemplo para cada categoría.
4. Abre la web StatCounter Global Stats y haz capturas de la cuota de mercado de los sistemas operativos para: **(a)** ordenadores de escritorio en todo el mundo, **(b)** dispositivos móviles en todo el mundo y **(c)** ordenadores de escritorio en Europa. Escribe cinco frases: qué sistema operativo lidera en cada caso, qué diferencias ves y por qué crees que ocurren. Anota el periodo que muestra el gráfico.
5. En la pestaña **Clasificador de SO**, clasifica Windows 11, Ubuntu Desktop, Android y FreeRTOS. Copia tu clasificación en una tabla y marca los criterios en los que se acepta más de una respuesta.

**Qué entregas:** un documento con la lista, las dos tablas, el mapa mental y las capturas con tus cinco frases, en la tarea «Actividad 4».

**Criterios que trabaja:** RA2.a, RA2.b, RA2.d

**Dificultad:** ★★☆ · **Tiempo estimado:** 90 minutos

## Actividad 5 · Entrenamiento de representación de la información

**Objetivo:** convertir números entre bases y entender cómo se guarda el texto como bytes.

**Qué tienes que hacer:**

1. Abre el **Laboratorio de Bits**, ve a la pestaña *Práctica* y resuelve al menos 15 ejercicios. Haz una captura de tu puntuación.
2. Convierte a mano (muestra los pasos):
   - **a)** `1011 0101` (binario) a decimal y hexadecimal;
   - **b)** 200 (decimal) a binario y hexadecimal;
   - **c)** `0x7E` a binario y decimal;
   - **d)** `0x2A` a binario y decimal;
   - **e)** `1 0000 0000` (binario) a decimal y hexadecimal.
3. Escribe tu nombre de pila en ASCII: para cada letra da el código decimal, el código hexadecimal y el código binario de 8 bits.
4. Descifra este mensaje, escrito en hexadecimal ASCII: `53 4F 4D 20 49 53 20 46 55 4E`.
5. Crea un archivo de texto que contenga exactamente `Mañana €5`, guardado con codificación **UTF-8**.
   - Cuenta los caracteres y anota el tamaño del archivo en bytes (usa las propiedades del archivo, o `wc -c` en Linux y macOS).
   - Mira los bytes con un visor hexadecimal (`xxd archivo.txt` en Linux y macOS, `Format-Hex archivo.txt` en PowerShell). Localiza los bytes de `ñ` y de `€`.
   - Abre el mismo archivo en un editor de texto eligiendo la codificación ISO-8859-1 o Windows-1252 («reabrir con codificación» en muchos editores). ¿Qué ves y por qué?

**Qué entregas:** un documento con la captura, las conversiones, las respuestas a los puntos 3–5 y una captura de la vista hexadecimal. Tarea «Actividad 5».

**Criterios que trabaja:** RA1.b

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 6 · Unidades y cómo las muestra cada sistema operativo

**Objetivo:** usar correctamente las unidades SI e IEC y explicar por qué las capacidades se ven distintas en cada sistema operativo.

**Qué tienes que hacer:**

1. Calcula, y muestra tus operaciones (usa la pestaña *KB vs KiB* del Laboratorio de Bits para comprobarlo):
   - **a)** un móvil de 256 GB: ¿cuántos GiB son?
   - **b)** un SSD de 500 GB: ¿cuántos GiB?
   - **c)** un DVD de 4,7 GB: ¿cuántos GiB?
   - **d)** una conexión de 100 Mb/s: ¿cuántos MB/s como máximo?
   - **e)** un módulo de RAM de 8 GiB: ¿cuántos bytes y cuántos MB?
   - **f)** un archivo de 1 MiB: ¿cuántos kB?
   - **g)** ¿cuánto tarda en descargarse un archivo de 2 GB a 300 Mb/s, en el mejor de los casos?
2. Elige un dispositivo de almacenamiento cuya capacidad anunciada conozcas (un disco interno, una memoria USB o una tarjeta de memoria). Mira la capacidad en el sistema operativo (Windows: *Este equipo → unidad → Propiedades*; macOS: *Finder → Obtener información*; Linux: `lsblk`, `df -h` y `df -H`). Rellena una tabla con la capacidad anunciada, el tamaño exacto en bytes, el tamaño que muestra el sistema, la unidad que usa el sistema y el espacio «perdido» en porcentaje.
3. Explica por qué tu resultado no significa que el disco esté defectuoso. Menciona que una pequeña parte del espacio también la puede usar el sistema de archivos.
4. Si puedes usar dos sistemas operativos distintos (por ejemplo un PC y un móvil, o una máquina virtual), compara cómo muestran la misma capacidad.

**Qué entregas:** un documento con los cálculos, la tabla y la explicación, en la tarea «Actividad 6».

**Criterios que trabaja:** RA1.b

**Dificultad:** ★★☆ · **Tiempo estimado:** 50 minutos

## Actividad 7 · Licencias y el sistema operativo adecuado

**Objetivo:** identificar y respetar las licencias de software, y seleccionar un sistema operativo para un caso real tras comprobar el hardware.

**Qué tienes que hacer:**

1. Haz la pestaña **Detective de licencias** del laboratorio.
2. **Licencias.** Elige ocho programas que uses o que estén instalados en tu ordenador (incluye el sistema operativo). Al menos dos deben ser de código abierto y al menos dos propietarios. Para cada uno escribe: dónde has encontrado su licencia, el tipo de licencia (propietaria, freeware, shareware, copyleft o permisiva), si es gratuito y si puedes modificarlo y compartirlo.
3. **Elegir un sistema operativo.** Estudia los tres casos y decide en cada uno:
   - **Caso A.** Un estudio de vídeo necesita cinco PC nuevos. Editan vídeo 4K con un programa que solo existe para Windows y macOS.
   - **Caso B.** Un colegio de primaria quiere reutilizar 20 PC antiguos (procesador de 64 bits con 2 núcleos, 4 GB de RAM, HDD de 128 GB, firmware BIOS). El alumnado necesita un navegador, una suite ofimática y un entorno de programación. El presupuesto es muy bajo.
   - **Caso C.** Una pequeña gestoría tiene ocho PC y un programa de contabilidad que solo funciona en Windows. Tiene un presupuesto limitado y una persona con conocimientos básicos de informática.

   En cada caso: enumera los requisitos, busca los requisitos mínimos actuales de dos sistemas operativos candidatos, comprueba si el hardware es adecuado, elige un sistema operativo y justifica tu elección con al menos tres criterios, incluida la licencia.
4. **Opcional (debate).** Prepara tres argumentos a favor y dos en contra de la afirmación «Los centros educativos públicos deberían usar software libre por defecto». Lo debatiremos en clase.

**Qué entregas:** la tabla de licencias y las tres decisiones con su justificación, en la tarea «Actividad 7».

**Criterios que trabaja:** RA2.c, RA2.d, RA2.i

**Dificultad:** ★★★ · **Tiempo estimado:** 90 minutos

:::aules
Entregas todas las actividades en Aules, en la tarea de cada una. Allí encontrarás también los criterios de evaluación, tus notas y las soluciones.
:::
