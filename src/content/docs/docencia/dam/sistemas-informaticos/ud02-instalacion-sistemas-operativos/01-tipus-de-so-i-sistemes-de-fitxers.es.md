---
title: "1. Tipos de SO y sistemas de archivos"
description: "Qué hace un sistema operativo, cómo se clasifican y se comparan (usuarios, licencias, requisitos) y qué sistema de archivos conviene elegir: FAT32, exFAT, NTFS o ext4."
---

Antes de instalar un sistema operativo hay que saber cuál necesitas y cómo guardará los datos en el disco. Elegir mal tiene un coste real: un pendrive que no deja copiar una película, un disco que Linux no puede escribir o una licencia que no cubre el uso que quieres darle. Esta página te enseña a decidir con criterio.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 60 de práctica.

1. Lee las secciones 1 y 2 (qué es un SO y qué tipos hay). Son conceptos que reutilizarás en toda la unidad.
2. La sección 3 (licencias) es la que más cuesta memorizar: haz la tabla con tus palabras.
3. En la sección 4, abre la pestaña «¿Qué sistema de archivos?» del [laboratorio «Particiones y arranque»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/?lang=es#sistema-arxius) y prueba distintas combinaciones de requisitos.
4. Haz después las actividades 1 y 2 y el cuestionario de Aules.
:::

## 1. Qué es un sistema operativo

Un ordenador tiene cinco niveles que trabajan apilados: el **usuario**, las **aplicaciones**, el **sistema operativo**, el **firmware** (BIOS/UEFI, que ya viste en la [unidad 1](/docencia/dam/sistemas-informaticos/ud01-hardware/01-ordinador-i-placa-base/es/)) y el **hardware**. El sistema operativo (SO) es el software que ocupa el centro: gestiona los recursos de la máquina (CPU, memoria, almacenamiento, periféricos) y se los ofrece a las aplicaciones de manera uniforme.

Actúa de **intermediario**. Cuando un editor de texto quiere guardar un documento no habla con el disco: pide el servicio al SO mediante una **llamada al sistema**, y es el SO quien sabe cómo tratar ese modelo concreto de SSD. Sin esta capa de abstracción, cada programa tendría que incluir el código para cada disco, tarjeta gráfica o impresora que exista.

Por dentro, un SO se compone de tres piezas que conviene distinguir:

| Pieza | Qué hace | Ejemplo |
|---|---|---|
| **Núcleo** (*kernel*) | Es el corazón: gestiona procesos, memoria, dispositivos y archivos, y hace cumplir los permisos. Se ejecuta con todos los privilegios. | El núcleo Linux; el núcleo de Windows NT |
| **Controladores** (*drivers*) | Módulos que enseñan al núcleo a hablar con un hardware concreto. | El controlador de una tarjeta de red |
| **Intérprete de órdenes e interfaz** | Lo que ve y usa la persona: el escritorio gráfico y/o el *shell* de línea de órdenes. | GNOME, el escritorio de Windows, `bash`, PowerShell |

Las funciones principales del SO son cinco, y las estudiarás con detalle en otras unidades:

- **Gestión de procesos**: decide qué programa usa la CPU en cada momento.
- **Gestión de la memoria**: reparte la RAM entre programas y los aísla entre sí.
- **Gestión de archivos**: organiza los datos en el disco (lo verás en la sección 4).
- **Gestión de entrada y salida**: controla teclado, pantalla, red, discos...
- **Seguridad y usuarios**: cuentas, permisos y aislamiento.

## 2. Tipos de sistemas operativos

Hay muchas maneras de clasificar los SO. La que usa el currículo es según **cuántas personas pueden trabajar a la vez** y **si dan servicio a otros equipos**:

| Tipo | Idea | Ejemplos |
|---|---|---|
| **Monousuario** | Pensado para que trabaje una sola persona a la vez | MS-DOS; Windows de escritorio en un uso doméstico |
| **Multiusuario** | Varios usuarios, cada uno con su espacio y sus permisos; pueden trabajar simultáneamente | Linux, Windows Server, macOS |
| **De red** | Además de gestionar el equipo, coordina y da servicio a otros equipos por la red | Windows Server, Linux de servidor |

Dos matices importantes:

- **No son categorías excluyentes.** Un servidor Linux o un Windows Server son a la vez multiusuario y de red.
- **La frontera entre monousuario y multiusuario no es tan nítida.** Windows 10/11 permite crear varias cuentas, cada una con sus documentos y permisos, pero en un equipo de escritorio solo hay una sesión gráfica activa a la vez. Por eso se pone como ejemplo de «monousuario», aunque en un aula donde cada alumno entra con su cuenta funciona de manera multiusuario. En los exámenes, justifica siempre el criterio que usas.

Hay otras clasificaciones que también encontrarás: por **uso** (escritorio, servidor, móvil, embebido), por **arquitectura del núcleo** (monolítico, microkernel, híbrido) o por **licencia**, que es la que vemos ahora.

## 3. Licencias y cómo comparar sistemas operativos

El criterio RA2.c de la unidad te pide **comparar sistemas operativos** por requisitos, características, campo de aplicación y licencia. La licencia es la parte que más se descuida y más problemas da.

### 3.1 Tipos de software según la licencia

| Tipo | Qué permite | Ejemplos |
|---|---|---|
| **Software libre** | Ejecutarlo para cualquier uso, estudiar su código, modificarlo y redistribuirlo (las «cuatro libertades») | Linux, FreeBSD, LibreOffice |
| **Código abierto** (*open source*) | Código fuente accesible con licencia que permite usarlo y modificarlo; en la práctica se solapa con el libre | Android (base), Chromium |
| **Propietario** | El fabricante conserva el control del código; el usuario solo tiene derecho de uso, según la licencia (EULA) | Windows, macOS |
| **Freeware** | Gratuito, pero con el código cerrado | Algunos controladores y utilidades |
| **Shareware / de prueba** | Se puede probar gratis un tiempo o con funciones limitadas y luego hay que pagar | Versiones de evaluación |

Dentro del software libre hay dos familias de licencias: las **copyleft** (como la **GPL**, que exige que las obras derivadas mantengan la misma libertad; el núcleo Linux es GPL) y las **permisivas** (como **MIT** o **BSD**, que permiten incluir el código en productos cerrados).

:::caution[Libre no significa gratuito]
«Libre» se refiere a las **libertades**, no al precio. Hay software libre de pago (soporte empresarial de una distribución Linux) y software gratuito que no es libre (*freeware*). A la inversa, una distribución Linux se puede descargar sin pagar, pero Windows exige una licencia.
:::

### 3.2 Licencias de Windows: de qué depende lo que pagas

En el ámbito profesional, Windows se puede adquirir de maneras distintas:

- **OEM**: viene preinstalada en un equipo nuevo (o se compra para montarlo) y queda vinculada a ese hardware.
- **Retail** (comercial): se compra suelta y, en general, se puede transferir a otro equipo.
- **Por volumen**: para empresas y centros educativos, con una sola clave o contrato para muchos equipos.

Además, Windows Server se licencia con reglas propias (por núcleos de procesador y con licencias de acceso de cliente). No hace falta que las memorices: lo importante es saber que **antes de desplegar** un SO propietario hay que comprobar que la licencia cubre el número de equipos y el uso previsto. Para practicar existen **versiones de evaluación** gratuitas y temporales, que el fabricante publica para pruebas.

### 3.3 Tabla comparativa de sistemas actuales

| Sistema | Licencia | Campo de aplicación habitual | Observaciones |
|---|---|---|---|
| Windows 10/11 | Propietaria | Escritorio y portátil, ofimática, juegos | Tiene requisitos mínimos de hardware que debes consultar por versión |
| Windows Server | Propietaria | Servidores de empresa | Se trata en la página 4 |
| Ubuntu, Debian, Fedora... | Libre (GPL y otras) | Escritorio, servidores, desarrollo | Muchas distribuciones, un mismo núcleo |
| macOS | Propietaria | Escritorio de Apple | Solo en hardware de Apple |
| Android | Libre en la base, con componentes propietarios | Móviles y tabletas | Basado en el núcleo Linux |

Para comparar dos sistemas, fíjate siempre en: **requisitos mínimos y recomendados** (CPU, RAM, disco, firmware), **compatibilidad** con el hardware y el software que necesitas, **coste de la licencia**, **soporte** y **seguridad**.

:::note[Ejemplo resuelto]
Un centro quiere renovar 30 ordenadores de un aula de programación con un presupuesto ajustado. El profesorado necesita compiladores, editores y máquinas virtuales; no hace falta software propietario concreto. Una distribución Linux de escritorio (por ejemplo, Ubuntu) evita el coste de las licencias, se puede administrar en bloque y exige menos hardware que un Windows reciente. Hay que comprobar, eso sí, que todo el software de la asignatura tenga versión para Linux.
:::

## 4. Sistemas de archivos

Un disco, por sí mismo, es solo una sucesión de bytes. El **sistema de archivos** (*file system*) es la estructura que el SO escribe encima para poder organizar en él nombres, carpetas, fechas, permisos y la ubicación exacta de cada fragmento de un archivo. Un volumen **se formatea** con un sistema de archivos concreto, y de eso depende qué puedes guardar en él y quién lo puede leer.

Dos conceptos que aparecen en todos:

- **Clúster** (o bloque): la unidad mínima de asignación. Un archivo pequeño ocupa, como mínimo, un clúster entero.
- **Journaling** (registro de transacciones): antes de cambiar la estructura, el sistema anota lo que va a hacer. Si el ordenador se apaga de forma brusca, puede repasar el registro y dejar el volumen en un estado coherente sin revisar todo el disco.

### 4.1 FAT32

Antiguo (apareció con Windows 95 OSR2, en 1996) pero compatible con prácticamente todo: Windows, Linux, macOS, consolas, cámaras, televisores, el firmware UEFI... Por eso es el sistema de la **partición EFI** y el formato de fábrica de muchos pendrives y tarjetas SD. Su límite más conocido es que **un archivo no puede pasar de 4 GiB** (exactamente, 4 GiB menos 1 byte). No tiene permisos, ni cifrado, ni journaling.

:::caution[Los límites de volumen de FAT32 dependen de más cosas]
Se dice a menudo que FAT32 llega a «8 TB por partición», pero esa cifra depende del tamaño del clúster y del sector. Con sectores de 512 bytes y clústeres de 32 KiB se llega a unos 8 TiB; con otras combinaciones, el teórico es mayor o menor. Además, **las herramientas de formateo** pueden imponer un límite propio: las de Windows, durante muchos años, no dejaban crear volúmenes FAT32 de más de 32 GB (aunque sí los leían). Cuando te aparezcan estas cifras, piensa que son «órdenes de magnitud» y comprueba la herramienta concreta.
:::

### 4.2 exFAT

Nació para suplir las limitaciones de FAT32 en memorias flash. Sin el límite práctico de 4 GiB por archivo y con volúmenes muy grandes, sigue sin permisos ni journaling. Windows y macOS la admiten desde hace años, y Linux lo hace de forma nativa desde el núcleo 5.7 (antes había que instalar un paquete). La mayoría de televisores y cámaras actuales la lee, pero **conviene comprobar el manual** del dispositivo.

### 4.3 NTFS

El sistema nativo de Windows desde Windows NT. Permite archivos y volúmenes enormes, **permisos detallados por archivo y carpeta** (ACL), cifrado integrado (EFS), compresión, cuotas de disco y **journaling**. Es el que Windows exige para instalarse. Linux puede leerlo y escribirlo con controladores adicionales o recientes (`ntfs-3g`, `ntfs3`), y macOS, por defecto, solo lo lee. No es un buen candidato para dispositivos como televisores o consolas.

### 4.4 ext4

El sistema más habitual en las distribuciones Linux. Usa **journaling**, admite archivos de hasta 16 TiB y volúmenes de hasta 1 EiB (con bloques de 4 KiB) y aplica los permisos de estilo Unix: **propietario, grupo y otros** (UGO, de *user, group, others*), cada uno con lectura, escritura y ejecución. Windows no lo reconoce sin software de terceros.

### 4.5 Comparativa

| | FAT32 | exFAT | NTFS | ext4 |
|---|---|---|---|---|
| **Archivo máximo** | 4 GiB − 1 B | Prácticamente ilimitado | Enorme (≥ 16 TiB; depende del clúster) | 16 TiB |
| **Permisos por usuario** | No | No | Sí (ACL) | Sí (UGO) |
| **Journaling** | No | No | Sí | Sí |
| **Windows** | Sí | Sí | Sí (nativo) | No (hace falta software extra) |
| **Linux** | Sí | Sí (núcleo 5.7+) | Con controlador | Sí (nativo) |
| **macOS** | Sí | Sí | Solo lectura por defecto | No |
| **Televisores y consolas** | Sí | Muchos, compruébalo | Algunos (a menudo solo lectura) | No |
| **Uso típico** | Partición EFI, pendrives antiguos | Pendrives y discos externos compartidos | Disco de sistema de Windows | Raíz y datos de Linux |

:::note[Ejemplo resuelto]
Un técnico tiene que preparar un pendrive de 64 GB para llevar vídeos de 6 GB entre un Windows, un Linux y un televisor. FAT32 queda descartado por el límite de 4 GiB por archivo. NTFS y ext4 quedan descartados porque el televisor probablemente no los entiende (ext4) o solo los lee (NTFS). **exFAT** cumple los tres requisitos, con el compromiso de no tener permisos ni journaling. Hay que comprobar que el televisor admite exFAT.
:::

### 4.6 Formatear desde la línea de órdenes

Normalmente formatearás desde el instalador o desde una herramienta gráfica, pero conviene ver el equivalente en línea de órdenes (solo como referencia; no lo ejecutes sobre un disco que tenga datos):

```bash
lsblk -f                      # lista discos y particiones con su sistema de archivos
sudo mkfs.ext4 /dev/sdb1      # formatea /dev/sdb1 como ext4 (BORRA lo que haya)
```

```powershell
Get-Volume                    # lista los volúmenes y su sistema de archivos
format E: /FS:NTFS /Q         # formatea la unidad E: como NTFS (BORRA lo que haya)
```

:::danger[Formatear destruye los datos]
Antes de ejecutar `mkfs` o `format`, comprueba **tres veces** qué dispositivo es. Un error de una letra (`sda` en lugar de `sdb`) puede borrar el disco del sistema. Practica siempre en máquinas virtuales.
:::

## Comprueba lo aprendido

1. Un servidor atiende peticiones de varios departamentos, cada uno con cuentas y permisos propios. ¿De qué dos tipos es su SO?

   <details>
   <summary>Respuesta</summary>

   **Multiusuario** (varias cuentas con permisos distintos) y **de red** (da servicio a otros equipos). Las dos categorías no se excluyen.

   </details>

2. Una empresa quiere «un SO libre, por tanto gratuito». ¿Qué hay de inexacto?

   <details>
   <summary>Respuesta</summary>

   «Libre» se refiere a las libertades de usar, estudiar, modificar y redistribuir el software, no al precio. Hay software libre de pago (por ejemplo, el soporte comercial) y software gratuito que no es libre (*freeware*).

   </details>

3. ¿Por qué no es buena idea formatear en FAT32 un disco externo para copias de máquinas virtuales?

   <details>
   <summary>Respuesta</summary>

   Porque un archivo de disco virtual supera fácilmente los 4 GiB, y FAT32 no admite archivos de ese tamaño. También perderías permisos y journaling. Para un disco compartido entre sistemas, exFAT; para uso solo en Windows, NTFS; para uso solo en Linux, ext4.

   </details>

4. ¿Qué ventaja ofrece el journaling cuando se va la luz en plena escritura?

   <details>
   <summary>Respuesta</summary>

   El sistema anota las operaciones antes de hacerlas. Al reiniciar, repasa el registro y deja la estructura del volumen coherente sin tener que revisar todo el disco, con menos riesgo de corrupción.

   </details>

5. Un equipo con Windows y Ubuntu en dual boot necesita una unidad de datos que ambos puedan leer y escribir, y que admita archivos grandes. ¿Qué sistema de archivos elegirías?

   <details>
   <summary>Respuesta</summary>

   **exFAT** o **NTFS** (con el controlador adecuado en Linux). exFAT es más sencillo de compartir, pero no tiene permisos; NTFS los tiene, pero en Linux depende de controladores adicionales. FAT32 no vale por la limitación de 4 GiB, y ext4 no lo lee Windows.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| sistema operatiu (SO) | sistema operativo (SO) |
| nucli | núcleo (kernel) |
| controlador | controlador (driver) |
| crida al sistema | llamada al sistema |
| monousuari / multiusuari | monousuario / multiusuario |
| programari lliure | software libre |
| codi obert | código abierto |
| llicència | licencia |
| sistema d'arxius | sistema de archivos |
| clúster | clúster |
| permís | permiso |
| registre de transaccions (*journaling*) | registro de transacciones (*journaling*) |
| formatar | formatear |
