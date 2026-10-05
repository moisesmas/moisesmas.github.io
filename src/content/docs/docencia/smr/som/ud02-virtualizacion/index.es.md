---
title: Unidad 2 · Virtualización
description: Crea y configura máquinas virtuales con VirtualBox, despliega aplicaciones virtuales ya preparadas, protege tu trabajo con instantáneas y mide cómo rinde una VM frente al ordenador real.
---

A partir de ahora, casi todas las prácticas de este módulo se harán dentro de una máquina virtual. Esta unidad te enseña qué es una máquina virtual, cómo crear y configurar una y cómo usarla con seguridad, para que puedas experimentar sin estropear el ordenador real.

## Qué vas a aprender

- Explicar la diferencia entre una máquina real y una máquina virtual, y entre anfitrión e invitado.
- Enumerar las ventajas e inconvenientes de la virtualización y decidir cuándo es una buena idea.
- Distinguir los hipervisores de tipo 1 y de tipo 2, dar ejemplos de cada uno y explicar cómo ayudan VT-x y AMD-V.
- Instalar software de virtualización (libre y propietario) y crear máquinas virtuales a partir de sistemas operativos libres y propietarios.
- Configurar una máquina virtual: CPU, memoria, disco, firmware y modo de red.
- Desplegar una aplicación virtual desde un archivo OVA y entender los formatos OVF y OVA.
- Usar las instantáneas como red de seguridad y saber por qué no son una copia de seguridad.
- Instalar las Guest Additions y usar el portapapeles y las carpetas compartidas.
- Medir el rendimiento de CPU, memoria y disco en el anfitrión y en el invitado, y explicar la diferencia.

## La unidad de un vistazo

| Trimestre | Horas | Peso en la evaluación | Resultado de aprendizaje |
|---|---|---|---|
| 1.º | 12 h | 10 % | RA5: crea máquinas virtuales identificando su campo de aplicación e instalando software específico (criterios a-g) |

## Mapa de la unidad

1. [¿Qué es la virtualización?](/docencia/smr/som/ud02-virtualizacion/01-what-is-virtualization/es/): anfitrión e invitado, físico frente a virtual, ventajas, inconvenientes y escenarios reales.
2. [Hipervisores](/docencia/smr/som/ud02-virtualizacion/02-hypervisors/es/): tipo 1 y tipo 2, productos reales y la ayuda del hardware con VT-x y AMD-V.
3. [Tu primera máquina virtual](/docencia/smr/som/ud02-virtualizacion/03-your-first-virtual-machine/es/): instalar VirtualBox, crear una VM, discos virtuales y modos de red.
4. [Aplicaciones virtuales, OVA, instantáneas y Guest Additions](/docencia/smr/som/ud02-virtualizacion/04-appliances-ova-and-snapshots/es/): importar una VM ya preparada, tomar instantáneas, compartir el portapapeles y las carpetas.
5. [Rendimiento: anfitrión frente a invitado](/docencia/smr/som/ud02-virtualizacion/05-performance-host-vs-guest/es/): cómo medir CPU, memoria y disco y comparar los resultados.
6. [Actividades](/docencia/smr/som/ud02-virtualizacion/actividades/es/): siete actividades prácticas.

## Laboratorios

Un laboratorio con siete pestañas de concepto y una de práctica con corrección al instante: consolidar servidores, construir pilas de hipervisor, ver qué cambia VT-x, dimensionar una VM, usar un asistente de «Nueva VM» virtual y comparar los modos de red.

::artefacto{src="virtualizacion"}
