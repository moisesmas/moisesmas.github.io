---
title: "5. Entrada/salida y seguridad"
description: "Cómo habla el sistema operativo con los dispositivos (controladores, sondeo, interrupciones, DMA, caché, búfer y spooling) y cómo protege los recursos: atributos, permisos de Linux y NTFS, y recursos compartidos."
---

Dos últimas funciones completan el cuadro. La primera es la **gestión de la entrada/salida**: cómo puede un programa usar una impresora, un disco o un teclado sin saber cómo funciona cada uno. La segunda es la **seguridad**: quién puede abrir, cambiar o ejecutar cada archivo y cada recurso compartido. Las dos están en todas partes en tu trabajo diario con un ordenador.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 3 (unos 35 minutos) y prueba la pestaña **Gestor de E/S** del [Laboratorio del planificador de procesos](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/?lang=es#io).
2. Lee los apartados 4 a 7 (unos 50 minutos) y ten a mano un terminal de Linux y un equipo con Windows (o máquinas virtuales).
3. Haz la [actividad 7](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/es/).
:::

## 1. Cómo usa una aplicación un dispositivo

Los dispositivos son muy distintos: un teclado envía unos pocos bytes por segundo, un SSD mueve gigabytes por segundo, una impresora puede quedarse sin papel. El SO oculta estas diferencias con capas:

1. La **aplicación** pide al SO que haga una operación («imprime esto», «lee este archivo»).
2. El **gestor de E/S** del núcleo comprueba la petición, busca el dispositivo adecuado y pone la petición en cola si el dispositivo está ocupado.
3. El **controlador** (*driver*) es un programa que conoce una familia de dispositivos. Traduce la petición general a las órdenes de ese dispositivo. Cada dispositivo necesita su propio controlador, y por eso un dispositivo nuevo a veces necesita instalar un controlador.
4. La **controladora** es la electrónica del dispositivo. Recibe los datos y las órdenes en sus registros y gestiona la mecánica (mover el cabezal, calentar el papel...).
5. El **dispositivo** hace el trabajo, y la respuesta vuelve por el mismo camino. La controladora escribe el resultado en un *registro de estado* que lee el controlador.

Linux muestra muchos dispositivos como archivos en `/dev`. Los discos son **dispositivos de bloques** (trabajan con bloques de datos, `/dev/sda`). Los teclados y los puertos serie son **dispositivos de caracteres** (trabajan con un flujo de bytes). Windows nombra sus dispositivos en el Administrador de dispositivos (`devmgmt.msc`).

## 2. Cómo sabe la CPU que un dispositivo ha terminado

La CPU es mucho más rápida que cualquier dispositivo. Hay tres formas de afrontar la diferencia.

**Sondeo (E/S programada, *polling*).** La CPU pregunta al dispositivo una y otra vez «¿estás listo?». Es simple, pero la CPU está en *espera activa*: trabaja solo para esperar.

**Interrupciones.** La CPU inicia la operación y sigue con otro trabajo. Cuando el dispositivo está listo, envía una **petición de interrupción (IRQ)**, una señal eléctrica. La CPU detiene lo que hace, guarda su estado, ejecuta una pequeña **rutina de tratamiento de la interrupción** (*interrupt handler*) del controlador y después vuelve al trabajo anterior. El teclado y el ratón usan interrupciones para cada tecla y cada movimiento. Un proceso que pidió la operación espera en el estado **Bloqueado**, y la interrupción es lo que lo devuelve a **Listo** (véase el diagrama de estados de la [página 1](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/es/)).

**DMA (acceso directo a memoria).** Con las interrupciones, la CPU todavía copia cada dato. Para transferencias grandes es demasiado. Con DMA, una controladora especial mueve **ella sola** todo el bloque entre el dispositivo y la RAM. La CPU solo prepara la transferencia (da a la controladora la dirección y el tamaño) y recibe **una única interrupción** al final. Los discos, las tarjetas de red y las tarjetas gráficas usan DMA.

| | Sondeo | Interrupciones | DMA |
|---|---|---|---|
| Quién copia los datos | CPU | CPU | Controladora DMA |
| CPU mientras trabaja el dispositivo | Espera (ocupada) | Libre para otros procesos | Libre para otros procesos |
| Interrupciones | Ninguna | Una por cada dato | Una por transferencia |
| Bueno para | Dispositivos muy rápidos, sistemas simples | Teclados, ratones, transferencias pequeñas | Discos, red, transferencias grandes |

**Ejemplo (simplificado).** Transferimos 4 palabras desde un dispositivo que necesita 5 unidades de tiempo para preparar cada palabra. Copiar una palabra o ejecutar una rutina cuesta 1 unidad.

- Sondeo: 4 × (5 + 1) = 24 unidades, y la CPU está ocupada todo el tiempo. **0 unidades libres.**
- Interrupciones: 24 unidades en total, pero la CPU solo trabaja 4 unidades (4 rutinas). **20 unidades libres** (83 %).
- DMA: 1 unidad para empezar, 20 unidades de transferencia y 1 unidad para terminar: 22 unidades. La CPU trabaja 2 unidades. **20 unidades libres** (91 %).

La pestaña **Gestor de E/S** del laboratorio te permite cambiar los números.

## 3. Caché, búfer y spooling

El SO también usa memoria para acelerar la E/S. Las tres técnicas son distintas:

| Técnica | Qué es | Ejemplo |
|---|---|---|
| **Caché** | Una copia rápida de los datos que usas a menudo | El archivo que lees dos veces llega la segunda vez desde la RAM, no desde el disco |
| **Búfer** (*buffer*) | Una zona temporal que conecta dos dispositivos o procesos de distinta velocidad | Un reproductor de vídeo carga unos segundos por adelantado para no pararse |
| **Spooling** | Una **cola de trabajos completos** para un dispositivo que no se puede compartir | La cola de impresión |

**Caché.** Si una lectura encuentra el dato en la caché, es un **acierto** (*hit*); si no, es un **fallo** (*miss*) y el SO lee el dispositivo lento y copia el dato en la caché. Imagina que un acierto cuesta 1 unidad y un fallo 10 unidades. Con un 80 % de aciertos, el coste medio es 0,8 × 1 + 0,2 × 10 = **2,8** unidades, casi cuatro veces más rápido que leer siempre el dispositivo.

**Búfer.** Mientras el dispositivo lento llena o vacía el búfer, la CPU puede continuar. Cuando copias un archivo grande a una memoria USB, los datos van primero a un búfer en la RAM, y por eso debes *quitar la unidad de forma segura*: puede que el búfer todavía no esté vacío.

**Spooling** (*Simultaneous Peripheral Operations On-Line*). Una impresora solo puede imprimir un documento a la vez, pero varios programas y usuarios quieren imprimir. Los trabajos se guardan en un **spool** (una carpeta del disco) y un servicio los envía a la impresora uno a uno. Los programas quedan libres al instante, y puedes ver, pausar o cancelar trabajos. En Linux, `lpstat -o` lista los trabajos; en Windows abres la cola de la impresora.

## 4. Seguridad

El SO debe proteger el sistema contra **errores** (un programa que escribe en memoria que no es suya), el **mal uso** por parte de un usuario, el **acceso no autorizado** (físico, por la red o por malware como virus, gusanos o troyanos) y los **fallos**. Ningún sistema es completamente seguro, pero los buenos hábitos reducen el riesgo. Los objetivos de la seguridad son:

- **Confidencialidad**: solo las personas autorizadas pueden leer los datos.
- **Integridad**: solo las personas autorizadas pueden cambiarlos, y los cambios no son accidentales.
- **Disponibilidad**: los datos y los servicios funcionan cuando los necesitas.

| Medidas lógicas (software) | Medidas físicas |
|---|---|
| Cuentas con **contraseñas robustas** | Sala o caja cerrada con llave |
| **Permisos** sobre archivos y carpetas | Control de acceso con tarjetas o huellas |
| Actualizaciones y antivirus | SAI (sistema de alimentación ininterrumpida) |
| Cortafuegos | Candados de cable, cámaras de seguridad |
| Cifrado de discos y archivos | Copias de seguridad guardadas en otro lugar |

Tres ideas están detrás de cada decisión de acceso:

1. **Autenticación**: demostrar quién eres (contraseña, huella...).
2. **Autorización**: decidir qué puedes hacer (permisos).
3. **Registro** (*accounting*): guardar constancia de lo que ocurrió (logs).

**Mínimo privilegio**: da a cada usuario y a cada programa solo los derechos que necesitan. Por eso trabajas con una **cuenta estándar** y usas los derechos de administrador solo cuando hace falta (`sudo` en Linux, el icono del escudo y la ventana del UAC en Windows). Un proceso que se ejecuta con tu cuenta solo puede hacer lo que tú puedes hacer: un programa que abres por error no puede cambiar archivos del sistema.

## 5. Atributos y permisos

Cada archivo y cada directorio tienen **metadatos**. Además del nombre, el tamaño y las fechas, tienen **atributos** y **permisos**.

### Atributos

| Sistema | Atributos | Cómo verlos o cambiarlos |
|---|---|---|
| Windows | *Solo lectura*, *Oculto*, *Sistema*, *Archivo* | Propiedades → General, o `attrib +h file.txt` |
| Linux | Un nombre que empieza por punto está oculto. En ext4, indicadores adicionales como *inmutable* (nadie puede modificarlo ni borrarlo) | `ls -a`, `lsattr`, `sudo chattr +i file` |

### Permisos en Linux

Linux da a cada archivo un **propietario**, un **grupo** y tres conjuntos de permisos, para el **propietario (u)**, el **grupo (g)** y **otros (o)**. Cada conjunto tiene tres permisos: **r** (lectura), **w** (escritura) y **x** (ejecución). Lee la salida de `ls -l`:

```text
-rwxr-x---  1 student teachers  4096 Oct  5 10:00 backup.sh
│└┬┘└┬┘└┬┘    │        │
│ │  │  │     │        └── grupo
│ │  │  │     └── propietario
│ │  │  └── otros: --- (nada)
│ │  └── grupo: r-x (lectura y ejecución)
│ └── propietario: rwx (lectura, escritura, ejecución)
└── tipo: - archivo, d directorio, l enlace
```

Cada permiso tiene un número: **r = 4, w = 2, x = 1**. Súmalos para cada conjunto y obtienes la notación **octal**: `rwx` = 7, `r-x` = 5, `---` = 0, así que este archivo es `750`.

| Octal | Permisos | Uso típico |
|---|---|---|
| `644` | `rw-r--r--` | Un archivo normal: tú lo editas, todos pueden leerlo |
| `600` | `rw-------` | Un archivo privado (por ejemplo, una clave SSH) |
| `755` | `rwxr-xr-x` | Un programa o una carpeta pública |
| `750` | `rwxr-x---` | Un script solo para un grupo |
| `700` | `rwx------` | Una carpeta privada |

```bash
chmod 640 notes.txt        # rw-r----- (octal)
chmod u+x backup.sh        # añadir ejecución para el propietario
chmod g-w,o-rwx report.txt # quitar escritura al grupo y todo a otros
sudo chown student:teachers report.txt   # cambiar el propietario y el grupo
```

Los permisos significan algo distinto en un **directorio**:

| | En un archivo | En un directorio |
|---|---|---|
| `r` | Leer el contenido | Listar los nombres de dentro |
| `w` | Cambiar el contenido | Crear, borrar y renombrar archivos de dentro |
| `x` | Ejecutarlo como programa | Entrar en él (`cd`) y llegar a lo que hay dentro |

Los archivos nuevos se crean con permisos que dependen de la `umask` (un valor típico, `022`, da `644` a los archivos y `755` a los directorios).

### Permisos en Windows (NTFS)

En un disco NTFS, clic derecho → **Propiedades → Seguridad** muestra una lista de usuarios y grupos con sus permisos. Los básicos son:

| Permiso | Qué permite |
|---|---|
| **Lectura** | Ver el contenido y los atributos |
| **Escritura** | Crear archivos y cambiar el contenido |
| **Lectura y ejecución** | Leer y ejecutar programas (en carpetas: también *Mostrar el contenido de la carpeta*) |
| **Modificar** | Leer, escribir, ejecutar y borrar |
| **Control total** | Todo, incluido cambiar los permisos y tomar posesión |

Reglas que debes recordar:

- Los permisos se **heredan** de la carpeta superior, salvo que desactives la herencia.
- Un usuario recibe la **suma** de los permisos de su propia entrada y de todos sus grupos.
- Una entrada **Denegar** es más fuerte que una entrada **Permitir**.
- `icacls file` los muestra y los cambia desde la línea de órdenes.

| Linux | NTFS (aproximadamente) |
|---|---|
| `r--` | Lectura |
| `r-x` | Lectura y ejecución |
| `rw-` | Modificar (sin ejecución) |
| `rwx` | Control total (más o menos) |
| Propietario / grupo / otros | Cualquier número de usuarios y grupos |

NTFS es más flexible porque puede dar permisos distintos a muchos usuarios en el mismo archivo. En Linux, las **ACL** (`setfacl`) dan la misma flexibilidad cuando la necesitas.

## 6. Recursos compartidos

Un **recurso compartido** es una carpeta, una impresora o un disco que otros ordenadores de la red pueden usar. Compartir es útil, pero abre una puerta, así que debes configurarlo con cuidado.

### Windows

1. Clic derecho en la carpeta → **Propiedades → Compartir → Uso compartido avanzado**.
2. Marca **Compartir esta carpeta**, ponle un nombre y pulsa **Permisos** para elegir quién puede usarla y con qué nivel (*Lectura*, *Cambiar* o *Control total*).
3. En la pestaña **Seguridad**, comprueba los permisos NTFS.

Cuando se accede a una carpeta por la red, Windows aplica **los dos**, los permisos del recurso compartido y los permisos NTFS, y gana el **más restrictivo**. Los demás ordenadores la abren con `\\NOMBREEQUIPO\nombrerecurso`. Órdenes útiles: `net share` (lista lo que compartes) y `net use Z: \\PC\recurso` (conecta una unidad de red).

### Linux

La herramienta habitual para compartir con ordenadores Windows es **Samba**, que implementa el protocolo SMB. En su archivo de configuración defines el recurso:

```ini
[documents]
   path = /srv/documents
   read only = no
   valid users = @teachers
```

Tras un cambio se reinicia el servicio. Los clientes se conectan con `smb://server/documents` desde un gestor de archivos. Configurarás servicios de red en otros módulos.

### Buenas prácticas

- Comparte **solo lo necesario**, y no el disco entero.
- Da permisos a **usuarios o grupos concretos**, no a *Todos* con *Control total*.
- Prefiere el acceso de **solo lectura** cuando los usuarios no necesitan escribir.
- No permitas el acceso anónimo o de invitado salvo que sea necesario, y mantén el cortafuegos activo.
- Revisa de vez en cuando qué se comparte (`net share` en Windows).

## 7. Todas las funciones juntas

Cuando imprimes un PDF desde una memoria USB, trabajan al menos cinco funciones: el **sistema de archivos** encuentra el archivo y los **permisos** te dejan abrirlo, el **gestor de memoria** carga el visor, el **planificador** reparte la CPU entre el visor y tu música, el **gestor de E/S** y el **controlador** hablan con la impresora, y el **spooler** pone el trabajo en cola. Entender qué función falla es el primer paso para resolver un problema.

## Comprueba lo aprendido

1. ¿Cuál es la principal ventaja de las interrupciones sobre el sondeo y la principal ventaja del DMA sobre las interrupciones?

   <details>
   <summary>Respuesta</summary>

   Con las interrupciones, la CPU no pierde tiempo esperando al dispositivo; trabaja en otras cosas. Con DMA, la CPU ni siquiera copia los datos: solo inicia la transferencia y recibe una interrupción al final, lo que es mejor para transferencias grandes.

   </details>

2. Explica la diferencia entre un búfer y un spool con un ejemplo de cada uno.

   <details>
   <summary>Respuesta</summary>

   Un búfer es una zona temporal de memoria que suaviza la diferencia de velocidad entre dos partes (por ejemplo, los datos de un vídeo antes de reproducirse). Un spool es una cola de trabajos completos para un dispositivo que no se puede compartir (por ejemplo, los documentos que esperan a la impresora).

   </details>

3. Un archivo tiene los permisos `-rw-r-----` y pertenece al usuario `ana` y al grupo `staff`. Escribe el número octal e indica quién puede escribir.

   <details>
   <summary>Respuesta</summary>

   `rw-` = 6, `r--` = 4, `---` = 0: el número octal es **640**. Solo `ana` (el propietario) puede escribir. Los miembros de `staff` pueden leer, y los demás no pueden hacer nada.

   </details>

4. Un usuario tiene el permiso `r--` sobre un directorio (sin `x`). ¿Puede ver los nombres de los archivos? ¿Puede abrir uno de ellos?

   <details>
   <summary>Respuesta</summary>

   Puede listar los nombres (`r`), pero no puede entrar en el directorio ni abrir los archivos (falta `x`), así que verá errores cuando intente leerlos.

   </details>

5. Una carpeta de Windows se comparte con *Control total* para todos, pero los permisos NTFS solo permiten *Lectura* al grupo `Students`. ¿Qué puede hacer un alumno por la red?

   <details>
   <summary>Respuesta</summary>

   Solo leer. Cuando los permisos del recurso compartido y los permisos NTFS son distintos, se aplica el resultado más restrictivo.

   </details>

## Glosario

| English | Castellano |
|---|---|
| input/output (I/O) | entrada/salida (E/S) |
| device driver | controlador de dispositivo |
| device controller | controladora del dispositivo |
| polling | sondeo |
| interrupt / interrupt request (IRQ) | interrupción / petición de interrupción |
| interrupt handler | rutina de tratamiento de la interrupción |
| DMA (direct memory access) | DMA (acceso directo a memoria) |
| cache / hit / miss | caché / acierto / fallo |
| buffer | búfer (memoria intermedia) |
| spooling / spool | spooling / cola de impresión |
| authentication / authorisation | autenticación / autorización |
| least privilege | mínimo privilegio |
| permission | permiso |
| owner / group / others | propietario / grupo / otros |
| read / write / execute | lectura / escritura / ejecución |
| shared resource | recurso compartido |
| inheritance | herencia |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
