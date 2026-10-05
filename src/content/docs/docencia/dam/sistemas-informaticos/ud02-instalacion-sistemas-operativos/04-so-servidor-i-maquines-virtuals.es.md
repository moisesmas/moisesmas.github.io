---
title: "4. SO servidor y máquinas virtuales"
description: "Windows Server con Server Core o Escritorio, virtualización con hipervisores, creación y gestión de máquinas virtuales (red, instantáneas, Guest Additions) y mecanismos de recuperación del sistema."
---

Esta página es la base de la **sesión presencial del 3 de noviembre**. Allí instalarás un Linux dentro de una máquina virtual y arrancarás el instalador de Windows Server. Las máquinas virtuales son, además, la herramienta de trabajo del resto del módulo: te permiten equivocarte sin riesgo, volver atrás y probar sistemas sin comprar equipos.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 45 de preparación de la presencial.

1. Lee las secciones 1 y 2 (servidor y conceptos de virtualización).
2. En las secciones 3, 4 y 5 **fíjate en la terminología**: sobre todo los modos de red y la diferencia entre instantánea y copia de seguridad; son tema de examen.
3. La sección 6 cierra los criterios de recuperación del sistema (RA2.f).
4. Antes de venir, instala VirtualBox en tu ordenador si lo tienes, descarga la ISO que se indique en Aules y lee la sección 7.
:::

## 1. Sistemas operativos servidor

Un SO **servidor** está optimizado para dar servicio a otros equipos de manera estable y continua (a menudo 24 horas al día, todos los días del año). Prioriza la **fiabilidad**, la **seguridad** y el **rendimiento en red** por encima de la comodidad de una interfaz vistosa. Puede ser Windows Server o una distribución Linux para servidor. En este módulo usaremos Windows Server (versiones recientes como la 2019 o la 2022), que se estudia a fondo en la unidad 6.

Windows Server se distribuye en ediciones (*Standard* y *Datacenter*, principalmente, con diferencias de licencia y de virtualización) y el fabricante publica **versiones de evaluación** para probarlo temporalmente.

### 1.1 Server Core o Experiencia de escritorio

Cuando se instala Windows Server, el instalador muestra dos opciones para cada edición. Es una decisión importante, porque **no se puede cambiar después sin reinstalar**:

| | **Server Core** | **Experiencia de escritorio** (*Desktop Experience*) |
|---|---|---|
| Interfaz | Sin escritorio: consola, PowerShell y, en algunos casos, `sconfig` | Escritorio gráfico completo, parecido al de Windows cliente |
| Administración | Por órdenes o **en remoto** desde otro equipo con herramientas gráficas | Local, con el Administrador del servidor y el resto de herramientas |
| Recursos | Menos espacio en disco y menos RAM | Más |
| Superficie de ataque | **Menor** (menos componentes, menos vulnerabilidades) | Mayor |
| Reinicios por actualizaciones | Menos | Más |
| Para quién | Servidores de producción | Aprendizaje, pruebas y software que exige interfaz gráfica |

:::note[Ejemplo resuelto]
Una empresa quiere un servidor que solo haga de servidor de archivos y `DHCP`, administrado por una persona experta desde su mesa. **Server Core**: consume menos, tiene menos superficie de ataque y se administra en remoto. En cambio, el aula de prácticas donde cada alumno explora por primera vez las funciones de Windows Server usará **Experiencia de escritorio**.
:::

## 2. Virtualización

La **virtualización** permite ejecutar uno o varios sistemas operativos **invitados** (*guests*) dentro de un mismo equipo físico **anfitrión** (*host*), como si cada uno fuera un ordenador independiente con su propio hardware. El software que lo hace posible es el **hipervisor**, que crea y gestiona las **máquinas virtuales** (VM) y les reparte los recursos físicos: CPU, RAM, disco y red.

### 2.1 Tipos de hipervisor

| Tipo | Cómo funciona | Ejemplos |
|---|---|---|
| **Tipo 1** (*bare metal*) | Se ejecuta directamente sobre el hardware; típico de servidores | VMware ESXi, Proxmox VE (KVM), Hyper-V |
| **Tipo 2** (*hosted*) | Se ejecuta como una aplicación dentro de un SO anfitrión | VirtualBox, VMware Workstation |

En clase usaremos VirtualBox, de tipo 2. Hyper-V viene incluido en las ediciones Pro, Enterprise y Education de Windows (no en Home).

:::caution[Hay que activar la virtualización en el hardware]
Los procesadores tienen extensiones de virtualización (**Intel VT-x** / **AMD-V**, también llamada SVM) que deben estar activadas en la **UEFI**. Si no, VirtualBox no podrá iniciar máquinas de 64 bits. Además, algunos programas de Windows (Hyper-V, WSL2) pueden entrar en conflicto con VirtualBox.
:::

### 2.2 Por qué virtualizar

- **Probar** varios SO sin equipos físicos adicionales.
- **Instantáneas** para volver atrás en segundos.
- **Aislamiento**: un error o infección en la VM no afecta directamente al anfitrión.
- **Aprovechamiento**: varios servidores pequeños en un solo equipo físico.

Los inconvenientes: la VM comparte recursos con el anfitrión (es más lenta que un equipo físico equivalente) y, si el anfitrión falla, fallan todas.

### 2.3 Repartir los recursos

Cuando creas una VM decides cuánta CPU, RAM y disco le das. Dos criterios prácticos:

- **No asignes nunca toda la RAM ni todos los núcleos del anfitrión**: este necesita recursos para sí mismo. Una regla prudente es no pasar de la mitad de la RAM y de los núcleos.
- La suma de las VM que corren a la vez no debería exceder los recursos físicos (sobreasignación), o todo irá lento.

## 3. Crear y gestionar una máquina virtual

Crear una VM es definir un **hardware virtual**:

| Parámetro | Qué representa | Valores de la práctica |
|---|---|---|
| **CPU** | Núcleos virtuales | 2 |
| **RAM** | Memoria de la VM | 4 GB |
| **Disco virtual** | Un archivo (por ejemplo `.vdi`) en el disco del anfitrión que la VM ve como un disco completo | 25 GB |
| **Red** | Tipo de adaptador (sección 4) | NAT |
| **Firmware** | BIOS o EFI | EFI, si quieres practicar UEFI/GPT |
| **Medio** | La ISO asociada a la unidad óptica virtual | La ISO de Linux indicada |

El disco puede ser de **tamaño fijo** (reserva todo el espacio de inmediato; algo más rápido) o **asignado dinámicamente** (el archivo crece a medida que se usa). Con la ISO asociada, la instalación dentro de la VM es exactamente igual que en un equipo físico.

Las operaciones habituales sobre una VM creada:

- **Iniciar**, **pausar**, **apagar** y **guardar el estado**.
- **Instantáneas** (sección 5).
- **Ajustar** RAM y CPU (con la VM apagada).
- **Clonar**: crea una copia de una VM para tener varios equipos a partir de una instalación.
- Instalar las **herramientas del invitado**.

### 3.1 Guest Additions

Las **Guest Additions** de VirtualBox (o **VMware Tools** en VMware) son un paquete que se instala dentro del SO invitado y mejora el rendimiento gráfico, permite redimensionar la ventana dinámicamente y habilita el **portapapeles compartido** y las **carpetas compartidas** con el anfitrión. En el menú de la VM: *Dispositivos → Insertar imagen de CD de las Guest Additions*. En un Ubuntu invitado puede hacer falta instalar antes herramientas de compilación; en Linux, además, el usuario debe pertenecer al grupo `vboxsf` para acceder a la carpeta compartida:

```bash
sudo apt install build-essential dkms linux-headers-$(uname -r)
sudo adduser $USER vboxsf        # después, cierra la sesión y vuelve a entrar
```

Los detalles cambian entre versiones de VirtualBox y de Ubuntu: si algún paso falla, lee el mensaje de error.

## 4. La red de la máquina virtual

El modo de red decide quién puede hablar con la VM. VirtualBox ofrece, entre otros, estos:

| Modo | Idea |
|---|---|
| **NAT** | La VM sale a Internet a través del anfitrión, pero **no es visible** desde fuera. Es el modo por defecto. |
| **Adaptador puente** (*bridge*) | La VM se comporta como un equipo más de la red física, con **su propia IP**. |
| **Red interna** | La VM solo se comunica con **otras VM de la misma red interna**, aislada de todo lo demás. |
| **Solo anfitrión** (*host-only*) | La VM y el anfitrión se ven entre sí, pero no hay salida a Internet. |

Quién puede comunicarse con quién (en condiciones normales, sin reglamentar cortafuegos ni redirección de puertos):

| Desde... hasta... | NAT | Puente | Interna | Solo anfitrión |
|---|---|---|---|---|
| La VM → Internet | Sí | Sí | No | No |
| La VM → el anfitrión | Sí (por la puerta de enlace) | Sí | No | Sí |
| El anfitrión → la VM | No | Sí | No | Sí |
| VM ↔ otra VM | No (cada una tiene su NAT) | Sí | Sí (misma red interna) | Sí (misma red) |
| Otro PC del aula → la VM | No | Sí | No | No |

:::tip[Cómo elegir]
Para **navegar y actualizar**: NAT. Para que la VM actúe como **un servidor visible en el aula** (la unidad 6): puente. Para un **laboratorio aislado** de varias VM: interna. Para administrar una VM desde el anfitrión sin salir a Internet: solo anfitrión.
:::

## 5. Instantáneas (*snapshots*)

Una **instantánea** guarda el estado completo de una VM en un momento concreto (el disco y, si estaba en marcha, también la memoria). Puedes seguir trabajando, y si algo sale mal, **restaurar** la instantánea y volver al momento guardado. Se puede crear una cadena de instantáneas y bifurcarla.

```bash
VBoxManage list vms                          # lista las VM registradas
VBoxManage snapshot "ubuntu" take "inicial"  # crea la instantánea «inicial»
VBoxManage snapshot "ubuntu" restore "inicial"  # restaura (con la VM apagada)
```

:::caution[Una instantánea no es una copia de seguridad]
Vive **en el mismo disco** que la VM: si el anfitrión se rompe o el disco falla, pierdes la VM y sus instantáneas. Sirve para «deshacer» un cambio, no para protegerse de una avería. Tampoco conviene acumular muchas, porque ocupan espacio y ralentizan la VM.
:::

## 6. Recuperación del sistema

El criterio RA2.f pide aplicar técnicas de **recuperación** (además de las de actualización de la página 3). Según lo que haya pasado, sirve una herramienta u otra:

| Problema | Mecanismo | Cómo funciona |
|---|---|---|
| Un cambio o controlador ha roto Windows pero arranca | **Punto de restauración** (*Restaurar sistema*) | Devuelve archivos del sistema y registro a un momento anterior; no toca los documentos. Debe estar activada. |
| Windows no arranca | **Entorno de recuperación de Windows (WinRE)** | Se inicia desde el disco o el USB de instalación; ofrece reparar el inicio, desinstalar actualizaciones, consola, restaurar una imagen o **Restablecer este PC**. |
| El equipo va muy mal | **Restablecer este PC** | Reinstala Windows, conservando o no los archivos personales. |
| Linux no arranca con el núcleo nuevo | **Menú de GRUB → Opciones avanzadas** | Permite arrancar con un núcleo anterior o con el **modo de recuperación** (consola con permisos de root). |
| GRUB o el arranque se han estropeado | **USB *live*** | Arrancas desde un Linux *live* y reparas el gestor de arranque, o revisas el sistema de archivos con `fsck`. |
| Se quiere volver a un estado exacto de todo el disco | **Imagen o clon** | Una copia completa de particiones (con herramientas como Clonezilla): restaurar deja el disco tal como estaba al hacerla. |
| Un error en una VM | **Instantánea** | Sección 5. |
| Archivos borrados | **Copia de seguridad de datos** | La única que protege del borrado o de la avería del disco. |

La regla de oro: **ningún mecanismo de recuperación sustituye a una copia de seguridad de los datos en otro lugar**. Una imagen conserva el sistema; los puntos de restauración y las instantáneas solo ayudan a deshacer un cambio.

## 7. Qué harás en la sesión presencial

El 3 de noviembre trabajarás de manera **individual** en el centro, con tu equipo. El guion es este:

1. **Crear una VM** nueva en VirtualBox: 2 CPU, 4 GB de RAM y un disco virtual de 25 GB.
2. **Instalar el Linux indicado** (la ISO estará en Aules), siguiendo el proceso de la página 3.
3. **Instalar las Guest Additions** y comprobar que funciona una **carpeta compartida** con el anfitrión.
4. **Instantánea**: crear una de la VM recién instalada, hacer un cambio de prueba (por ejemplo, borrar un archivo), restaurarla y comprobar que el cambio ha desaparecido.
5. **Windows Server**: arrancar el instalador hasta la pantalla en la que se elige entre *Server Core* y *Experiencia de escritorio*, identificando las diferencias, sin completar la instalación.

Al final entregarás la **memoria de la práctica** (actividad 6) antes de terminar la clase. Harás capturas de pantalla durante el proceso: **no esperes al final para hacerlas**.

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre un hipervisor de tipo 1 y uno de tipo 2?

   <details>
   <summary>Respuesta</summary>

   El de tipo 1 se ejecuta directamente sobre el hardware (ESXi, Proxmox, Hyper-V); el de tipo 2 se ejecuta como una aplicación dentro de un SO anfitrión (VirtualBox, VMware Workstation).

   </details>

2. Una VM debe ser visible desde otros PC del aula, con su propia IP. ¿Qué modo de red usas?

   <details>
   <summary>Respuesta</summary>

   **Adaptador puente** (*bridge*): la VM se conecta a la red física como un equipo más.

   </details>

3. ¿Por qué una instantánea no sustituye a una copia de seguridad?

   <details>
   <summary>Respuesta</summary>

   Porque está en el mismo disco que la VM: si el disco o el anfitrión falla, se pierden las dos. Solo sirve para deshacer cambios.

   </details>

4. ¿Cuándo elegirías Server Core en lugar de la Experiencia de escritorio?

   <details>
   <summary>Respuesta</summary>

   En un servidor de producción administrado por órdenes o en remoto: consume menos recursos, necesita menos reinicios y tiene menos superficie de ataque. La Experiencia de escritorio es mejor para aprender o para software que necesita interfaz gráfica.

   </details>

5. Windows no arranca tras una actualización de controladores. ¿Qué dos mecanismos probarías primero?

   <details>
   <summary>Respuesta</summary>

   Desde el entorno de recuperación (WinRE): **desinstalar la última actualización** o **restaurar el sistema** con un punto de restauración anterior. Si no hay, restaurar una imagen o, en último lugar, restablecer el PC.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| SO servidor | SO servidor |
| Server Core | Server Core |
| Escriptori de l'experiència | Experiencia de escritorio |
| virtualització | virtualización |
| hipervisor | hipervisor |
| amfitrió (*host*) | anfitrión (*host*) |
| convidat (*guest*) | invitado (*guest*) |
| màquina virtual (VM) | máquina virtual (VM) |
| disc virtual | disco virtual |
| instantània (*snapshot*) | instantánea (*snapshot*) |
| adaptador pont | adaptador puente |
| xarxa interna | red interna |
| punt de restauració | punto de restauración |
| entorn de recuperació | entorno de recuperación |
