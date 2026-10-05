---
title: "1. ¿Qué es la virtualización?"
description: "Qué es una máquina virtual, en qué se diferencia de un ordenador físico, sus ventajas e inconvenientes y situaciones reales donde se usa la virtualización."
---

Casi todo lo que practicarás en este módulo ocurre dentro de máquinas virtuales. Antes de crear una, necesitas saber qué es realmente, qué ganas al usarla y qué te cuesta. Esta página te da la idea; las siguientes te enseñan cómo funciona por dentro.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 40 minutos de lectura y 20 de práctica.

1. Lee las secciones 1 a 3 y prueba las pestañas del laboratorio [Físico frente a virtual](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es#physical) y [Pros y contras](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es#proscons).
2. Lee los escenarios reales de la sección 4 y haz la actividad 1.
3. Contesta las preguntas del final sin mirar las respuestas.
:::

## 1. La idea

La **virtualización** es la técnica de crear versiones en software de recursos informáticos (un ordenador completo, un disco, una red) para que varios sistemas aislados compartan el mismo hardware físico.

Una **máquina virtual** (VM) es un ordenador completo hecho de software. Tiene un procesador virtual (vCPU), memoria virtual, discos virtuales y una tarjeta de red virtual. Instalas un sistema operativo en ella y la usas como cualquier otro ordenador. El sistema operativo que hay dentro de la VM no sabe que su hardware no es real.

Hay dos palabras que aparecen continuamente:

- El **anfitrión** (*host*) es el ordenador físico, con su hardware real y (normalmente) su propio sistema operativo.
- El **invitado** (*guest*) es el sistema operativo que se ejecuta dentro de una máquina virtual.

El software que crea las máquinas virtuales y reparte el hardware real entre ellas es el **hipervisor**. Lo estudiarás en la [página siguiente](/docencia/smr/som/ud02-virtualizacion/02-hypervisors/es/). De momento, piensa en él como un gestor: cada invitado cree que posee un ordenador, pero el hipervisor decide cuánto tiempo de CPU, memoria y disco recibe realmente cada uno.

### Una VM son solo archivos

En el anfitrión, una máquina virtual es un conjunto de archivos normales: un archivo de configuración que describe el hardware virtual y uno o más archivos que hacen de discos virtuales. Por eso puedes copiar una VM, llevarla a otro ordenador, hacer una copia de seguridad o borrarla como cualquier otro archivo.

## 2. ¿Ordenador físico o máquina virtual?

| Característica | Ordenador físico | Máquina virtual |
|---|---|---|
| Hardware | Componentes reales, usados por un solo sistema operativo | Componentes virtuales, creados con una parte del hardware del anfitrión |
| Rendimiento | Máximo: no hay capa adicional | Algo menor, sobre todo en disco y red |
| Recursos | Dedicados | Compartidos con el anfitrión y con otras VM |
| Tiempo de creación | Comprar, montar e instalar: horas o días | Minutos (más si instalas desde cero) |
| Cambiar el hardware | Abrir la caja, comprar piezas | Mover un deslizador; a veces hay que reiniciar |
| Llevarlo a otro sitio | Difícil: depende de su hardware | Copiar los archivos (o exportar un OVA) |
| Recuperación tras un fallo | Lenta: reinstalar o restaurar una copia | Rápida: restaurar una instantánea o una copia |
| Aislamiento | Un fallo puede afectar a todo lo instalado | Cada VM es un entorno aislado |
| Coste por carga de trabajo | Mayor: una máquina para cada tarea | Menor: muchas VM en una máquina |

:::note[Ninguna es mejor]
Una VM no es un «ordenador mejor». Es la herramienta adecuada para aprender, probar y ejecutar muchos servicios pequeños. Un ordenador físico es mejor cuando necesitas la máxima velocidad o acceso directo a hardware especial (por ejemplo, una tarjeta gráfica muy potente o una base de datos con mucho tráfico de disco).
:::

## 3. Ventajas e inconvenientes

### Ventajas

- **Eficiencia.** Un servidor físico que ejecuta un servicio suele estar parado la mayor parte del tiempo (un uso típico es del 10-20 %). Si colocas varias VM en un anfitrión, el tiempo libre de una lo aprovecha otra. Esto se llama **consolidación**.
- **Menor coste.** Menos máquinas significan menos hardware que comprar, menos electricidad, menos refrigeración y menos espacio.
- **Portabilidad.** Una VM es un conjunto de archivos, así que puedes llevarla de un ordenador a otro. Incluso puedes entregar una VM completa como tarea.
- **Escalabilidad.** Puedes dar a una VM más CPU, memoria o disco, o crear diez VM idénticas a partir de una plantilla.
- **Recuperación sencilla.** Puedes tomar una **instantánea** antes de un cambio arriesgado y volver atrás si algo falla. Lo practicarás en la [página 4](/docencia/smr/som/ud02-virtualizacion/04-appliances-ova-and-snapshots/es/).
- **Aislamiento.** Si una VM se bloquea o se infecta con un virus, las demás siguen funcionando. Por eso las VM se usan como **entorno aislado de pruebas** (*sandbox*) para probar software con seguridad.
- **Flexibilidad.** Puedes ejecutar Windows, Linux y otros sistemas a la vez en un mismo ordenador.

### Inconvenientes

- **Sobrecarga.** La capa de virtualización necesita algo de CPU y de memoria. Los programas que usan mucho el disco o la red son los más afectados.
- **Cuellos de botella.** Todas las VM compiten por la misma CPU, memoria, disco y red. Una VM que escribe mucho en el disco puede ralentizar a todas las demás (el problema del «vecino ruidoso»).
- **Complejidad.** Hay más capas que gestionar y actualizar: el anfitrión, el hipervisor y cada invitado. Es fácil olvidarse de VM e instantáneas antiguas.
- **Licencias.** Algunos hipervisores y sistemas operativos tienen reglas de licencia especiales para entornos virtuales. Una VM con un sistema operativo de pago sigue necesitando una licencia válida.
- **Seguridad.** Si un atacante toma el control del hipervisor, todas las VM están en riesgo. Compartir carpetas o el portapapeles entre anfitrión e invitado también debilita el aislamiento.
- **Límites del hardware.** El invitado nunca puede ser más potente que el anfitrión. No puedes dar 16 GB de RAM a una VM en un anfitrión que solo tiene 8 GB.

:::caution[Una instantánea no es una copia de seguridad]
Una instantánea está en el mismo disco que la VM. Si ese disco falla, pierdes las dos cosas. Para hacer copias de seguridad reales, copia o exporta la VM a otro lugar.
:::

## 4. ¿Dónde se usa la virtualización?

Ya usas la virtualización aunque no la veas. Aquí tienes algunos escenarios reales.

| Escenario | ¿Por qué virtualizar? | Qué aprovecha |
|---|---|---|
| **Un aula de informática** | Cada alumno necesita el mismo Linux o Windows limpio para practicar, y un error no debe estropear el ordenador real. | VM idénticas e instantáneas |
| **Una pequeña empresa con cinco servidores** | Los servidores de correo, web y archivos usan solo el 10 % de sus máquinas. Un anfitrión potente puede ejecutarlos todos. | Consolidación |
| **Pruebas de software** | Un desarrollador debe probar un programa en Windows 10, Windows 11 y Ubuntu. | Varios invitados en un portátil |
| **Analizar un archivo sospechoso** | Si el archivo es malware, solo afecta a la VM, que se borra después. | Entorno aislado, aislamiento |
| **Ejecutar un programa antiguo** | Un programa solo funciona en un sistema operativo antiguo que ningún ordenador actual puede ejecutar directamente. | Una VM con el sistema antiguo |
| **Servicios en la nube** | Cuando alquilas un «servidor» en la nube, normalmente recibes una máquina virtual. Pagas por lo que usas y puede crecer en minutos. | Escalabilidad, grandes hipervisores de tipo 1 |
| **Recuperación ante desastres** | Un servidor falla de madrugada. La empresa restaura su VM en otro anfitrión en minutos. | Archivos de la VM, copias de seguridad |

En la actividad 1 pensarás en más escenarios y decidirás si la virtualización ayuda.

## 5. VirtualBox en este módulo

En este módulo usarás **Oracle VirtualBox**, un programa gratuito que crea máquinas virtuales en un ordenador normal. Las unidades prácticas que siguen (Windows, Linux, la línea de órdenes...) se harán dentro de VM. Si algo sale mal, no estropearás el ordenador real: volverás a una instantánea o crearás la VM otra vez.

## Comprueba lo aprendido

1. Explica con tus palabras la diferencia entre *anfitrión* e *invitado*.

   <details>
   <summary>Respuesta</summary>

   El **anfitrión** es el ordenador físico (y su sistema operativo) que proporciona el hardware real. El **invitado** es el sistema operativo que se ejecuta dentro de una máquina virtual, usando una parte del hardware del anfitrión.

   </details>

2. Una empresa tiene cuatro servidores, cada uno usado alrededor del 15 % del tiempo. ¿Qué ventaja de la virtualización puede ayudarles y cómo?

   <details>
   <summary>Respuesta</summary>

   La **consolidación** (eficiencia y coste). Cuatro VM pueden funcionar en un anfitrión, porque entre todas solo necesitan alrededor del 60 % de una máquina. La empresa necesita menos ordenadores y gasta menos en electricidad y espacio.

   </details>

3. Indica dos inconvenientes de la virtualización y una forma de reducir cada uno.

   <details>
   <summary>Respuesta</summary>

   Por ejemplo: la **sobrecarga** (usar virtualización por hardware y discos rápidos como los SSD) y los **cuellos de botella** (no dar a las VM más recursos de los que tiene el anfitrión y vigilar el uso). Otras respuestas válidas: complejidad (mantener una lista de VM y borrar las instantáneas antiguas), licencias (comprobar la licencia antes de desplegar), seguridad (actualizar el anfitrión y limitar las carpetas compartidas).

   </details>

4. ¿Por qué una instantánea no es una copia de seguridad?

   <details>
   <summary>Respuesta</summary>

   Porque se guarda en el mismo disco que la VM. Si falla el disco del anfitrión, la VM y sus instantáneas se pierden juntas. Una copia de seguridad debe estar en otro lugar.

   </details>

## Glosario

| English | Castellano |
|---|---|
| virtualization | virtualización |
| virtual machine (VM) | máquina virtual |
| host | anfitrión |
| guest | invitado |
| hypervisor | hipervisor |
| consolidation | consolidación |
| overhead | sobrecarga |
| bottleneck | cuello de botella |
| sandbox | entorno aislado de pruebas |
| snapshot | instantánea |
| scalability | escalabilidad |
| backup | copia de seguridad |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
