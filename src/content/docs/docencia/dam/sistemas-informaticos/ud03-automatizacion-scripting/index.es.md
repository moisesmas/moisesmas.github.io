---
title: "Unidad 3 · Automatización de tareas y shell scripting"
description: "Cómo automatizar tareas de administración con scripts de Bash y PowerShell y programarlas para que se ejecuten solas, más la gestión básica de la información del sistema y de las copias de seguridad."
---

Esta unidad te enseña a hacer que el ordenador haga el trabajo repetitivo por ti: escribirás scripts en **Bash** y en **PowerShell**, los programarás para que se ejecuten solos y aprenderás a localizar, copiar y restaurar información del sistema. Es la herramienta que más diferencia a un administrador que apaga fuegos de uno que los evita.

## Qué vas a aprender

- Escribir y ejecutar scripts en Bash y en PowerShell: shebang, permisos de ejecución y política de ejecución.
- Trabajar con variables, comillas, operadores y códigos de salida, y entender qué hace el shell con una línea antes de ejecutarla.
- Controlar el flujo de un script: condicionales, bucles, parámetros y entrada de datos del usuario.
- Manipular archivos y texto con órdenes y tuberías (`grep`, `cut`, `sort`, `sed`… y sus equivalentes en PowerShell).
- Escribir scripts de administración reales: copia de seguridad con fecha, alta masiva de usuarios y monitorización del disco.
- Planificar y automatizar tareas con cron (Linux) y el Programador de tareas (Windows).
- Reconocer la estructura de directorios de Linux y de Windows y localizar información con herramientas gráficas y con órdenes.
- Restaurar copias de seguridad y usar utilidades de gestión de la información: compresores, `du`/`df`, `rsync` y `robocopy`.

## Mapa de la unidad

1. [Introducción al scripting](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/01-introduccio-al-scripting/es/): qué es un script, shebang, permisos, política de ejecución, variables, comillas, operadores y códigos de salida.
2. [Estructuras de control y órdenes de texto](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/02-estructures-de-control-i-text/es/): condicionales, bucles, parámetros, `read`/`Read-Host`, redirecciones y las órdenes de texto.
3. [Scripts prácticos y tareas programadas](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/03-scripts-practics-i-tasques-programades/es/): copia con fecha, alta masiva, monitorización del disco, cron y Programador de tareas (la preparación de la presencial).
4. [Información del sistema, copias y utilidades](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/04-informacio-del-sistema-i-copies/es/): estructura de directorios, búsquedas, restaurar copias, compresores, `df`/`du`, `rsync` y `robocopy`.
5. [Actividades](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/): siete actividades, seis de estudio autónomo y la práctica de la sesión presencial.
6. [Planificación](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/planificacion/es/): en qué orden estudiar la unidad, con tiempos orientativos y consejos.

## Laboratorios

Un laboratorio interactivo para practicar: el «Trazador de scripts», donde verás cómo se ejecuta un script paso a paso, cómo cambian las variables y los códigos de salida, y podrás practicar la sintaxis de Bash y de PowerShell.

::artefacto{src="tracador-de-scripts"}
