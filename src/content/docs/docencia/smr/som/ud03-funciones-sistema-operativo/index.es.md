---
title: Unidad 3 · Funciones del sistema operativo
description: Qué hace el sistema operativo con los procesos, la memoria, los discos, los archivos, la entrada/salida y la seguridad, y cómo observar y controlar cada una de estas funciones.
---

En esta unidad abres el capó del sistema operativo. Verás cómo reparte la CPU entre muchos programas, cómo da memoria a cada uno, cómo organiza los datos de un disco y cómo decide quién puede usar qué. También aprenderás a observar todo esto en un sistema real, en Linux y en Windows.

## Qué vas a aprender

- Explicar las funciones de un sistema operativo como gestor de recursos: procesos, memoria, archivos, dispositivos y seguridad.
- Identificar procesos y servicios, distinguir los procesos de usuario de los del sistema y describir los estados de un proceso y sus transiciones.
- Observar y controlar procesos en Linux (`ps`, `top`, `jobs`, `kill`) y en Windows (Administrador de tareas y `services.msc`).
- Calcular los tiempos de espera y de respuesta de un conjunto de procesos con FIFO, SJF, SRTF, prioridades y Round Robin, y explicar la inanición y el interbloqueo.
- Explicar cómo se reparte la memoria con particiones, paginación, segmentación y memoria virtual, y aplicar criterios para optimizar la memoria en uso.
- Describir la estructura de un disco, las tablas de particiones MBR y GPT y la organización de un sistema de archivos, y planificar las particiones de una instalación.
- Comparar FAT32, NTFS y ext4, explicar por qué importa el journaling al elegir un sistema de archivos y optimizar el uso de los dispositivos de almacenamiento.
- Distinguir los atributos de un archivo y de un directorio, leer y establecer permisos en Linux y en Windows, y configurar recursos compartidos.

## La unidad de un vistazo

| Trimestre | Horas | Peso en la evaluación | RA que trabaja |
|---|---|---|---|
| 1.er trimestre | 16 h | 10 % | RA1 (c, d, e, f, g), RA2 (a, e) y RA4 (c, e, g, h) |

## Mapa de la unidad

1. [Procesos y servicios](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/es/): funciones del SO, programa y proceso, servicios, estados, primer y segundo plano, señales y zombis.
2. [Planificación de la CPU](/docencia/smr/som/ud03-funciones-sistema-operativo/02-cpu-scheduling/es/): el planificador, FIFO, SJF, SRTF, prioridades y Round Robin con ejemplos resueltos, inanición, secciones críticas e interbloqueo.
3. [Gestión de la memoria](/docencia/smr/som/ud03-funciones-sistema-operativo/03-memory-management/es/): fragmentación, paginación, segmentación, memoria virtual, reemplazo de páginas y optimización de la memoria.
4. [Almacenamiento y sistemas de archivos](/docencia/smr/som/ud03-funciones-sistema-operativo/04-storage-and-file-systems/es/): discos, MBR y GPT, FAT32, exFAT, NTFS y ext4, journaling, optimización del almacenamiento y plan de instalación.
5. [Entrada/salida y seguridad](/docencia/smr/som/ud03-funciones-sistema-operativo/05-io-and-security/es/): controladores, interrupciones y DMA, caché, búfer y spooling, atributos, permisos y recursos compartidos.
6. [Actividades](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/es/): siete actividades, desde tu primer `ps aux` hasta una carpeta compartida con permisos.

## Laboratorios

El **Laboratorio del planificador de procesos** acompaña a las páginas 1, 2 y 5. Puedes inspeccionar procesos, llevar un proceso por sus estados, ejecutar un planificador con diagrama de Gantt, comparar los algoritmos, probar un terminal con trabajos en segundo plano y zombis, provocar un interbloqueo y ver en qué se diferencian el sondeo, las interrupciones y el DMA. Su última pestaña genera ejercicios de planificación y los corrige.

::artefacto{src="planificador-de-procesos"}
