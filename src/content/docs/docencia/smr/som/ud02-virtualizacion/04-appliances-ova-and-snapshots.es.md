---
title: "4. Aplicaciones virtuales, OVA, instantáneas y Guest Additions"
description: "Despliega una máquina virtual ya preparada desde un archivo OVA, usa las instantáneas como red de seguridad e instala las Guest Additions para el portapapeles y las carpetas compartidas."
---

Instalar un sistema operativo desde cero lleva mucho tiempo y cada instalación es un poco distinta. Una aplicación virtual te permite empezar en minutos desde una máquina que alguien ya ha preparado. Las instantáneas te permiten experimentar sin miedo. Las Guest Additions hacen cómoda la VM. Estas tres herramientas son las que usarás cada semana en este módulo.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 70 minutos de lectura y 90 de práctica.

1. Lee las secciones 1 y 2 y haz la actividad 3 (importar un OVA).
2. Lee la sección 3 y haz la actividad 4 (instantáneas).
3. Lee la sección 4 y haz la actividad 5 (Guest Additions y carpeta compartida).
:::

## 1. Aplicaciones virtuales

Una **aplicación virtual** (*virtual appliance*) es una máquina virtual que ya está instalada, configurada y lista para arrancar. Piensa en ella como una «imagen de referencia» (*golden image*): el autor eligió el sistema operativo, los usuarios, las actualizaciones y los programas, y comprobó que todo funciona. Tú solo tienes que importarla.

¿Por qué es útil?

- **Coherencia.** Todos empiezan desde la misma máquina. Si algo falla, la diferencia no está en la instalación.
- **Rapidez.** Te saltas la instalación larga.
- **Portabilidad.** Una aplicación hecha en un ordenador se importa en otro, sea cual sea el sistema operativo anfitrión.
- **Vuelta atrás.** Después de importar puedes tomar una instantánea del estado limpio.

### OVF y OVA

Las aplicaciones se distribuyen en un formato abierto estándar, para que hipervisores distintos puedan leerlas.

| Formato | Qué es |
|---|---|
| **OVF** (Open Virtualization Format) | Una **carpeta** con varios archivos: un archivo `.ovf` (una descripción XML del hardware: CPU, memoria, controladoras, red), una o más imágenes de disco (normalmente `.vmdk`) y, a menudo, un manifiesto `.mf` con sumas de verificación para comprobar los archivos. |
| **OVA** (Open Virtual Appliance) | Un **único archivo**: un archivo comprimido en formato TAR que contiene todos los archivos de un OVF. Es más fácil de descargar y copiar. |

Usa el OVA cuando quieras una sola pieza, y el OVF cuando quieras mirar dentro o sustituir uno de los archivos. En Linux puedes ver lo que contiene un OVA sin importarlo:

```bash
tar -tvf appliance.ova
```

### Verifica antes de importar

Las páginas de descarga suelen publicar una **suma de verificación** (*checksum*): un código corto que identifica el contenido exacto de un archivo. Si la calculas y es igual a la publicada, el archivo está completo y no ha sido modificado. Si es distinta, borra el archivo y descárgalo otra vez.

```bash
sha256sum appliance.ova          # Linux
shasum -a 256 appliance.ova      # macOS
```

```powershell
Get-FileHash .\appliance.ova -Algorithm SHA256    # Windows PowerShell
```

:::caution[Importa solo aplicaciones en las que confíes]
Una aplicación contiene un sistema operativo que ha preparado otra persona. Puede incluir programas, usuarios y contraseñas que no conoces. Usa aplicaciones de tu profesor o de la web oficial de un proyecto, nunca de una página cualquiera.
:::

### Importar un OVA (forma gráfica)

1. Guarda el OVA en una carpeta con suficiente espacio libre. El disco virtual puede ocupar entre 1,3 y 1,5 veces el tamaño del OVA.
2. Verifica la suma de verificación si la hay.
3. Abre VirtualBox y elige **File → Import Appliance...**.
4. Selecciona el archivo OVA y pulsa **Next**.
5. Revisa los **ajustes de la aplicación**. Cambia el nombre de la VM (por ejemplo, `SOM-U2-Apellido`) y ajusta las CPU y la RAM a lo que puede dar tu ordenador. Deja el primer adaptador de red en NAT.
6. En la opción **MAC address policy** (las versiones antiguas tienen una casilla llamada *Reinitialize the MAC address of all network cards*) elige generar nuevas direcciones MAC. Así se evitan conflictos cuando muchos alumnos importan el mismo archivo.
7. Pulsa **Import** y espera. La nueva VM aparece en la lista.
8. Arranca la VM. El usuario y la contraseña de una aplicación los da su autor (en esta unidad, tu profesor en Aules).

### Comprobaciones tras el primer arranque

Abre un terminal dentro del invitado y ejecuta:

```bash
hostnamectl      # nombre de la máquina, sistema operativo y núcleo
ip a             # interfaces de red y direcciones
df -h            # discos y espacio libre
```

Si ves una dirección como `10.0.2.15` en modo NAT, tu VM tiene conexión.

### Línea de órdenes (útil para automatizar)

```bash
VBoxManage import appliance.ova --vsys 0 --vmname "SOM-U2-Apellido"
VBoxManage modifyvm "SOM-U2-Apellido" --memory 2048 --cpus 2
```

Y al revés: puedes **exportar** tu propia VM a un OVA para compartirla o guardar una copia (**File → Export Appliance...**, o `VBoxManage export`).

### ¿Y para Windows?

El proceso es el mismo para las aplicaciones de Windows, pero son menos comunes porque las reglas de licencia de Windows limitan su distribución. Microsoft publica versiones de evaluación oficiales de Windows con tiempo limitado. Trabajarás con una en la actividad 6.

## 2. Instantáneas

Una **instantánea** (*snapshot*) guarda el estado de una VM en un momento para que puedas volver a él más tarde. Es como un punto de «guardar partida».

Cada instantánea conserva:

1. La **configuración** de la VM (hardware virtual).
2. El **estado del disco.** VirtualBox no copia todo el disco. Congela el archivo de disco actual como solo lectura y crea un archivo nuevo y pequeño llamado **imagen diferencial**. A partir de ese momento, todos los cambios van al archivo nuevo.
3. El **estado de la memoria**, si la VM estaba en marcha cuando tomaste la instantánea. Al restaurarla, el invitado vuelve con las mismas ventanas y procesos abiertos.

Puedes imaginar el disco como una pila de hojas transparentes. Cada instantánea es una hoja nueva encima de las anteriores. Lo que ves es la combinación de todas las hojas, y la hoja nueva siempre recibe los cambios.

![Una pila de capas transparentes: el disco base, después la instantánea 1, la instantánea 2 y el estado actual encima. Una flecha indica que las escrituras nuevas van a la capa superior.](./snapshot-layers-es.svg)

### Las operaciones

| Operación | Qué ocurre | En la interfaz |
|---|---|---|
| **Tomar** (*Take*) | Se crea una capa nueva. La VM sigue escribiendo en la capa nueva. | Vista Snapshots → *Take* |
| **Restaurar** (*Restore*) | Se descartan los cambios hechos después de la instantánea y la VM vuelve a ese punto. | Selecciónala → *Restore* |
| **Eliminar** (*Delete*) | Se quita la instantánea y su capa se **fusiona** con la capa vecina, así que no se pierden datos. La VM no cambia. | Selecciónala → *Delete* |

Dos detalles importantes:

- **Eliminar no borra tu trabajo.** Borra el punto de control. VirtualBox une las capas (las consolida), y esto puede tardar y necesitar espacio libre temporal.
- **Restaurar sí borra tu trabajo** hecho después de la instantánea. VirtualBox puede ofrecerse a hacer antes una instantánea del estado actual. Acepta si no estás seguro.

Las instantáneas forman un **árbol**: puedes restaurar una instantánea antigua y luego tomar otra distinta desde ahí, lo que crea una rama nueva.

Desde el terminal:

```bash
VBoxManage snapshot "SOM-U2-Apellido" take "baseline" --description "Clean state after import"
VBoxManage snapshot "SOM-U2-Apellido" list
VBoxManage snapshot "SOM-U2-Apellido" restore "baseline"
VBoxManage snapshot "SOM-U2-Apellido" delete "baseline"
```

### Buenas prácticas

- **Toma una justo después de importar o instalar** (llámala `baseline`) y una antes de cada cambio arriesgado: una actualización, un controlador, un cambio grande de configuración.
- **Usa nombres con sentido** que expliquen por qué y cuándo: `before-lamp-install_2026-10-05`.
- **Mantén pocas instantáneas.** Las cadenas largas usan más disco y hacen la VM algo más lenta, porque una lectura puede tener que mirar a través de varias capas.
- **Tómalas con la VM apagada** si no necesitas los programas abiertos. Son más pequeñas y rápidas.
- **Elimina las que no necesites** cuando termine el experimento.
- **Una instantánea no es una copia de seguridad.** Está en el mismo disco. Para conservar una copia, exporta la VM a un OVA o clónala (**Machine → Clone**; un *clon completo* también crea una VM con un solo disco y sin árbol de instantáneas).

## 3. Guest Additions

Un invitado recién instalado solo conoce hardware virtual genérico, así que la VM resulta torpe: el ratón queda «atrapado» en la ventana, la pantalla tiene tamaños fijos y copiar y pegar entre anfitrión e invitado no funciona. Las **Guest Additions** son controladores y pequeñas herramientas que instalas **dentro del invitado** para arreglarlo. Vienen en una imagen de CD llamada `VBoxGuestAdditions.iso` que proporciona VirtualBox.

Con ellas obtienes:

| Función | Qué hace |
|---|---|
| **Integración del ratón** | El puntero se mueve libremente entre la VM y el anfitrión. |
| **Resolución dinámica** | La pantalla se adapta cuando cambias el tamaño de la ventana. Mejores controladores gráficos. |
| **Portapapeles compartido** | Copiar y pegar texto entre anfitrión e invitado. |
| **Arrastrar y soltar** | Mover archivos arrastrándolos (no siempre es fiable). |
| **Carpetas compartidas** | Una carpeta del anfitrión que el invitado puede abrir. |
| **Sincronización de la hora** | El reloj del invitado sigue al del anfitrión. |
| **Modo integrado** (*seamless*) | Las ventanas del invitado aparecen en el escritorio del anfitrión. |

:::note[No las confundas]
Las **Guest Additions** se instalan en el invitado. El **Extension Pack** se instala en el anfitrión. Son cosas distintas. Además, procura que la versión de las Guest Additions sea igual a la de VirtualBox; cuando actualices VirtualBox, actualízalas en tus VM.
:::

### Instalarlas en un invitado Linux

1. Arranca la VM e inicia sesión.
2. Prepara las herramientas necesarias para compilar los controladores. En Ubuntu o Debian:

   ```bash
   sudo apt update
   sudo apt install build-essential dkms linux-headers-$(uname -r)
   ```

3. En el menú de la VM elige **Devices → Insert Guest Additions CD image...**.
4. Abre el CD virtual (el gestor de archivos lo muestra) y ejecuta el instalador. Desde un terminal sería así (el nombre de la carpeta puede cambiar):

   ```bash
   sudo sh /media/$USER/VBox_GAs_*/VBoxLinuxAdditions.run
   ```

5. Reinicia la VM.

### Instalarlas en un invitado Windows

1. Arranca la VM e inicia sesión.
2. Elige **Devices → Insert Guest Additions CD image...**.
3. Abre el CD en el Explorador de archivos y ejecuta `VBoxWindowsAdditions.exe`. Acepta la instalación de los controladores.
4. Termina el asistente y reinicia.

### Portapapeles y carpetas compartidas

Para el **portapapeles**: con la VM en marcha, elige **Devices → Shared Clipboard → Bidirectional**. (También se puede configurar en **Settings → General → Advanced**.)

Para una **carpeta compartida**:

1. Apaga la VM o usa **Devices → Shared Folders → Shared Folders Settings...**.
2. Añade una carpeta del anfitrión, dale un nombre y marca **Auto-mount** y **Make Permanent**.
3. En un invitado **Windows** la carpeta aparece como una unidad de red (por ejemplo, `Z:`). En un invitado **Linux** aparece en `/media/sf_<nombre>`.
4. En Linux, si recibes un mensaje de *permiso denegado*, añade tu usuario al grupo `vboxsf` y vuelve a iniciar sesión:

   ```bash
   sudo usermod -aG vboxsf $USER
   ```

:::caution[Comodidad frente a seguridad]
Un portapapeles compartido y las carpetas compartidas rompen parte del aislamiento entre invitado y anfitrión. Si analizas archivos sospechosos en una VM, desactívalos. En general, comparte solo la carpeta que necesites y usa **solo lectura** cuando puedas.
:::

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre un OVF y un OVA?

   <details>
   <summary>Respuesta</summary>

   Un OVF es una carpeta con varios archivos (una descripción XML, imágenes de disco y un manifiesto). Un OVA es un único archivo TAR que contiene todos esos archivos.

   </details>

2. ¿Por qué calculas una suma de verificación antes de importar una aplicación descargada?

   <details>
   <summary>Respuesta</summary>

   Para comprobar que el archivo está completo y no ha sido modificado. Si tu suma es distinta de la que publica el autor, no debes usar el archivo.

   </details>

3. Tomas una instantánea, instalas un programa y luego restauras la instantánea. ¿Qué pasa con el programa? ¿Y si en lugar de restaurarla eliminas la instantánea?

   <details>
   <summary>Respuesta</summary>

   Al restaurar, el programa desaparece: la VM vuelve al estado de la instantánea. Al eliminar la instantánea, el programa se queda: solo quitas el punto de control y sus cambios se fusionan.

   </details>

4. Nombra tres problemas que resuelven las Guest Additions.

   <details>
   <summary>Respuesta</summary>

   Por ejemplo: el ratón capturado por la ventana, la resolución de pantalla fija y la falta de copiar y pegar entre anfitrión e invitado. También añaden carpetas compartidas y sincronización de la hora.

   </details>

5. ¿Por qué es mala idea usar solo instantáneas como sistema de copias de seguridad?

   <details>
   <summary>Respuesta</summary>

   Se guardan en el mismo disco que la VM, así que un fallo del disco destruiría las dos cosas. Además, una cadena larga hace la VM más lenta y usa más espacio. Usa exportaciones o copias como copias de seguridad.

   </details>

## Glosario

| English | Castellano |
|---|---|
| virtual appliance | aplicación virtual |
| golden image | imagen de referencia |
| OVF / OVA | OVF / OVA (formatos de aplicación virtual) |
| checksum | suma de verificación |
| import / export | importar / exportar |
| manifest | manifiesto |
| differencing image | imagen diferencial |
| take / restore / delete a snapshot | tomar / restaurar / eliminar una instantánea |
| Guest Additions | Guest Additions (complementos del invitado) |
| shared folder | carpeta compartida |
| shared clipboard | portapapeles compartido |
| clone | clonar |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
