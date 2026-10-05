---
title: "2. Hipervisores"
description: "Qué hace un hipervisor, la diferencia entre tipo 1 y tipo 2, ejemplos de cada uno y cómo ayuda el procesador con VT-x y AMD-V."
---

El hipervisor es la pieza que hace posible la virtualización. Si sabes qué tipos existen y cómo les ayuda el procesador, podrás elegir el producto adecuado para cada situación y resolver el error más común al crear una VM: la opción de 64 bits que no aparece.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 45 minutos de lectura y 30 de práctica.

1. Lee las secciones 1 y 2 y construye las pilas en la pestaña del laboratorio [Constructor de pilas](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es#stack).
2. Lee la sección 3 y sigue los pasos de la pestaña [VT-x activado y desactivado](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es#vtx).
3. Haz la actividad 2, donde comparas productos reales.
:::

## 1. Qué hace un hipervisor

Un **hipervisor** (también llamado *monitor de máquinas virtuales*, VMM) es el software que crea las máquinas virtuales y las ejecuta. Tiene tres tareas principales:

1. **Repartir la CPU.** Decide qué invitado usa cada núcleo del procesador y durante cuánto tiempo.
2. **Repartir la memoria.** Da a cada invitado su propia zona de memoria y los mantiene separados, de modo que uno no pueda leer la memoria de otro.
3. **Presentar dispositivos virtuales.** Muestra a cada invitado un disco virtual, una tarjeta de red virtual, una tarjeta gráfica virtual... y convierte cada petición del invitado en una operación sobre el hardware real.

Desde el punto de vista del invitado no ocurre nada especial: arranca, encuentra un «ordenador» y funciona.

## 2. Tipo 1 y tipo 2

Hay dos familias de hipervisores. La diferencia es **qué hay debajo del hipervisor**.

### Tipo 1: sobre el hardware (*bare metal*)

Un hipervisor de **tipo 1** (o *bare metal*) arranca directamente sobre el hardware, justo después del firmware (UEFI/BIOS). Debajo no hay un sistema operativo normal. Es un sistema pequeño y especializado cuya única tarea es ejecutar máquinas virtuales.

```text
Aplicaciones    Aplicaciones
SO invitado     SO invitado
------------------------------
Hipervisor (tipo 1)
------------------------------
Hardware
```

Como hay menos capas, es más rápido, más estable y tiene menos superficie de ataque. Es la elección normal en los centros de datos y en la nube. Suele ofrecer funciones avanzadas: mover una VM en marcha entre servidores (*migración en vivo*), reiniciar las VM automáticamente si falla un servidor (*alta disponibilidad*) y gestionar cientos de VM desde una sola consola.

### Tipo 2: alojado (*hosted*)

Un hipervisor de **tipo 2** (o *alojado*) es un programa normal que instalas en tu sistema operativo habitual, como un navegador o un editor de texto. Las VM que crea son ventanas de tu escritorio. Cuando un invitado escribe en su disco, el hipervisor pide al sistema operativo anfitrión que escriba un archivo.

```text
Aplicaciones    Aplicaciones
SO invitado     SO invitado
------------------------------
Hipervisor (tipo 2, un programa)
------------------------------
SO anfitrión (Windows, Linux, macOS)
------------------------------
Hardware
```

Es fácil de instalar y puedes seguir trabajando con tu ordenador normal, así que es ideal para aprender, probar y desarrollar. El precio es algo más de sobrecarga y una capa más que mantener actualizada y segura. **VirtualBox es un hipervisor de tipo 2.**

![Dos pilas una al lado de la otra. Tipo 1: hardware, hipervisor y encima dos sistemas operativos invitados. Tipo 2: hardware, sistema operativo anfitrión, programa hipervisor y encima dos sistemas operativos invitados.](./hypervisor-types-es.svg)

### Comparación

| Característica | Tipo 1 (sobre el hardware) | Tipo 2 (alojado) |
|---|---|---|
| Se ejecuta sobre | El hardware | Un sistema operativo anfitrión |
| Rendimiento | Más cercano al nativo | Algo menor, sobre todo en disco y red |
| Instalación | Máquina dedicada, más planificación | Como cualquier programa |
| Uso típico | Servidores, centros de datos, nube | Portátiles, aulas, pruebas |
| Gestión | Muchos anfitriones y VM, herramientas centrales | Un ordenador, herramientas sencillas |
| Superficie de seguridad | Menor | Mayor (SO anfitrión + hipervisor + invitados) |
| Ejemplos | VMware ESXi, Microsoft Hyper-V, KVM, Xen | VirtualBox, VMware Workstation, Parallels Desktop |

### Productos reales

| Producto | Tipo | Licencia | Dónde se encuentra |
|---|---|---|---|
| **VMware ESXi** | 1 | Comercial (propietaria) | Servidores de empresa |
| **Microsoft Hyper-V** | 1 | Incluido en algunas ediciones de Windows (Pro, Enterprise, Education) y en Windows Server | Servidores y PC con Windows |
| **KVM** | 1 | Libre y de código abierto (parte del núcleo de Linux) | Servidores Linux, nube y plataformas como Proxmox VE |
| **Xen** | 1 | Libre y de código abierto | Servidores y algunos proveedores de nube |
| **Oracle VirtualBox** | 2 | Libre y de código abierto (algunos extras tienen otra licencia) | Windows, Linux, macOS (Intel) |
| **VMware Workstation** | 2 | Propietaria (consulta las condiciones actuales de su propietario) | PC con Windows y Linux |
| **Parallels Desktop** | 2 | Comercial (propietaria) | macOS |

:::note[¿Por qué KVM es de tipo 1 si lo uso desde Linux?]
Administras KVM desde un sistema Linux normal, pero KVM es un módulo del propio núcleo de Linux: el núcleo *se convierte* en el hipervisor. Hyper-V es parecido: cuando está activado, el propio Windows se ejecuta como un invitado especial sobre el hipervisor. Por eso los dos se consideran de tipo 1.
:::

:::caution[Las licencias cambian]
Las empresas cambian a menudo los nombres, los precios y las condiciones de sus productos. Antes de elegir un producto para trabajar, lee la licencia vigente en la web oficial.
:::

## 3. Ayuda del procesador: VT-x y AMD-V

### El problema

Los sistemas operativos están escritos para funcionar sobre hardware real. El núcleo de un sistema operativo normal espera ejecutarse en el modo más privilegiado de la CPU y controlarlo todo. Pero si el núcleo de un invitado pudiera hacerlo, tomaría el control de todo el ordenador y el hipervisor perdería su autoridad. El hipervisor debe interceptar las instrucciones «peligrosas» del invitado.

Hay tres formas de resolverlo:

| Método | Cómo funciona | Velocidad |
|---|---|---|
| **Virtualización por software** | El hipervisor lee el código del invitado y reescribe o emula las instrucciones peligrosas antes de que se ejecuten (*traducción binaria*). | La más lenta, compleja |
| **Virtualización asistida por hardware** | El procesador tiene un modo especial para invitados. El núcleo del invitado se ejecuta casi directamente en la CPU, y la CPU cede el control al hipervisor solo cuando ocurre una operación peligrosa. | Rápida |
| **Paravirtualización** | El invitado sabe que es virtual y usa controladores especiales para hablar con el hipervisor (por ejemplo, los controladores *virtio* de red y disco). | Rápida para disco y red |

### VT-x, AMD-V, EPT y NPT

Los procesadores modernos incluyen las instrucciones para la virtualización asistida por hardware:

- **Intel VT-x** en los procesadores Intel.
- **AMD-V** en los procesadores AMD.
- **EPT** (Intel) y **NPT** (AMD) ayudan a traducir las direcciones de memoria del invitado a direcciones reales sin que el hipervisor lo haga por software. Esto acelera mucho el acceso a la memoria.

Las versiones actuales de VirtualBox necesitan la virtualización por hardware para funcionar. En la práctica se usa una mezcla de los tres métodos: VT-x o AMD-V para la CPU y dispositivos paravirtualizados (o emulados muy sencillos) para la red y el disco.

:::tip[Paravirtualización en VirtualBox]
En la configuración de una VM, **System → Acceleration → Paravirtualization Interface** permite elegir cómo habla el invitado con el hipervisor. La opción *Default* es una buena elección para casi todos los invitados.
:::

### Comprobarla y activarla

Estas funciones suelen estar desactivadas por defecto en el firmware, sobre todo en portátiles. El síntoma clásico es que VirtualBox solo ofrece versiones de **32 bits** en la lista de sistemas invitados, o dice que VT-x no está disponible.

Para comprobarlo en Linux:

```bash
lscpu | grep -i virtualization
grep -Ec '(vmx|svm)' /proc/cpuinfo
```

La primera orden muestra `VT-x` (Intel) o `AMD-V`. La segunda cuenta las entradas del procesador que tienen la bandera `vmx` (Intel) o `svm` (AMD). Si el número es `0`, la función no existe o está oculta. Recuerda que la salida de estas órdenes dentro de un invitado puede ser distinta, porque muestran lo que el hipervisor deja ver al invitado.

En Windows puedes abrir el **Administrador de tareas**, pestaña **Rendimiento → CPU**, y buscar *Virtualización: Habilitada*.

Si está desactivada, reinicia el ordenador, entra en la configuración de la UEFI/BIOS y busca una opción con un nombre como:

- *Intel Virtualization Technology* (Intel).
- *SVM Mode* (AMD).

Actívala, guarda y reinicia. El nombre exacto y el lugar cambian según el fabricante.

:::caution[Otro hipervisor en medio]
En Windows, funciones como Hyper-V, Windows Sandbox o algunas opciones de seguridad usan la virtualización por hardware del procesador. VirtualBox puede convivir con ellas, pero las VM suelen ser más lentas. Si tus VM van muy lentas, consulta a tu profesor antes de cambiar esas funciones.
:::

## 4. Elegir un hipervisor

| Situación | Elección razonable |
|---|---|
| Aprender en un PC del centro o de casa | VirtualBox (tipo 2, gratuito) |
| Ya tienes Windows Pro y necesitas una opción sencilla | Hyper-V |
| Una empresa ejecuta muchos servidores críticos | Un tipo 1: ESXi, Hyper-V en Windows Server o KVM con una plataforma de gestión |
| Usas macOS y necesitas buena integración | Parallels Desktop u otro producto hecho para Mac |
| Quieres montar un servidor de virtualización gratuito | KVM con una plataforma como Proxmox VE |

:::note[Los contenedores no son VM]
Quizá hayas oído hablar de *Docker* y de los *contenedores*. Un contenedor comparte el núcleo del anfitrión en lugar de ejecutar un sistema operativo invitado completo. Arranca más rápido y usa menos memoria, pero está menos aislado que una VM. Es una herramienta distinta y la conocerás en otros módulos.
:::

## Comprueba lo aprendido

1. ¿Cuál es la diferencia principal entre un hipervisor de tipo 1 y uno de tipo 2?

   <details>
   <summary>Respuesta</summary>

   Un hipervisor de tipo 1 se ejecuta directamente sobre el hardware. Un hipervisor de tipo 2 es un programa que se ejecuta sobre un sistema operativo anfitrión.

   </details>

2. Clasifica estos productos como tipo 1 o tipo 2: VirtualBox, KVM, ESXi, Parallels Desktop.

   <details>
   <summary>Respuesta</summary>

   Tipo 2: VirtualBox y Parallels Desktop. Tipo 1: KVM y ESXi.

   </details>

3. Abres VirtualBox y solo puedes crear invitados de 32 bits. ¿Cuál es la causa más probable y la solución?

   <details>
   <summary>Respuesta</summary>

   La virtualización por hardware (Intel VT-x o AMD-V) está desactivada en la configuración de la UEFI/BIOS. Reinicia, entra en la configuración, activa *Intel Virtualization Technology* o *SVM Mode*, guarda y reinicia.

   </details>

4. ¿Por qué los hipervisores de tipo 1 suelen tener mejor rendimiento que los de tipo 2?

   <details>
   <summary>Respuesta</summary>

   Porque no hay un sistema operativo anfitrión entre el hipervisor y el hardware. Hay menos capas, así que hay menos sobrecarga y menos cosas que pueden fallar.

   </details>

5. ¿Qué es la paravirtualización?

   <details>
   <summary>Respuesta</summary>

   Un método en el que el invitado sabe que es virtual y usa controladores especiales (por ejemplo, virtio) para comunicarse directamente con el hipervisor. Evita emular hardware real y es más rápido para disco y red.

   </details>

## Glosario

| English | Castellano |
|---|---|
| hypervisor | hipervisor |
| Type 1 / bare metal | tipo 1 / sin sistema operativo anfitrión |
| Type 2 / hosted | tipo 2 / alojado |
| hardware-assisted virtualization | virtualización asistida por hardware |
| paravirtualization | paravirtualización |
| binary translation | traducción binaria |
| live migration | migración en vivo |
| high availability | alta disponibilidad |
| kernel | núcleo (del sistema operativo) |
| container | contenedor |
| firmware | firmware |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
