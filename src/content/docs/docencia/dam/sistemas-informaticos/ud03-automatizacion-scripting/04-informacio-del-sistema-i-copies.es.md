---
title: "4. Información del sistema, copias y utilidades"
description: "La estructura de directorios de Linux y de Windows, cómo localizar información con herramientas gráficas y con find, locate y Get-ChildItem, cómo restaurar una copia y las utilidades de gestión de la información (compresores, du, df, rsync y robocopy)."
---

Un administrador no solo automatiza: también **sabe dónde está cada cosa**, **encuentra** lo que le piden, **asegura** que los datos se puedan recuperar y **mide** el espacio que ocupan. Esta página completa la unidad con esa parte de gestión de la información: la estructura de carpetas de los sistemas, las búsquedas, la restauración de copias y las utilidades que se usan cada día.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 90 de práctica. Se recomienda leerla **después de la presencial**, cuando ya has creado una copia con tu script.

1. Lee la sección 1 con una terminal abierta y **recorre las carpetas** que se mencionan (`ls /`, `ls /etc`…).
2. Prueba las órdenes de búsqueda (sección 2) sobre carpetas de tu máquina virtual.
3. La sección 3 (restaurar) es la más importante: una copia que no se ha probado a restaurar no es una copia fiable.
4. Haz la [actividad 6](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/).
:::

## 1. Estructura de directorios

### Linux: la jerarquía estándar (FHS)

En Linux no hay unidades como `C:`: todo cuelga de un único árbol que nace en la **raíz** (`/`). La *Filesystem Hierarchy Standard* (FHS) fija qué va en cada carpeta, de modo que todas las distribuciones se parecen.

| Directorio | Qué contiene |
|---|---|
| `/` | La raíz de todo el árbol |
| `/bin`, `/sbin` | Órdenes básicas y de administración (en las distribuciones modernas son enlaces a `/usr/bin` y `/usr/sbin`) |
| `/boot` | El núcleo (*kernel*) y los archivos del arranque (GRUB) |
| `/dev` | Los dispositivos como archivos: `/dev/sda` (disco), `/dev/null` (el «agujero negro») |
| `/etc` | **Configuración** del sistema y de los servicios, en archivos de texto: `/etc/passwd`, `/etc/fstab` |
| `/home` | Las carpetas personales de los usuarios (`/home/ana`) |
| `/root` | La carpeta personal del administrador (`root`) |
| `/lib`, `/lib64` | Bibliotecas que necesitan los programas |
| `/media`, `/mnt` | Donde se montan los pendrives y discos (`/media`, automáticamente) o las unidades que montas a mano (`/mnt`) |
| `/opt` | Software adicional de terceros |
| `/proc`, `/sys` | Sistemas de archivos **virtuales**: información del núcleo y de los procesos en directo |
| `/run` | Datos de la ejecución actual (desaparecen al reiniciar) |
| `/srv` | Datos que sirven los servicios (web, FTP…) |
| `/tmp` | Archivos temporales |
| `/usr` | La mayoría de los programas y bibliotecas; `/usr/local` es para lo que instala el administrador |
| `/var` | Datos que **varían**: logs (`/var/log`), colas, bases de datos, webs (`/var/www`) |

Las rutas pueden ser **absolutas** (empiezan por `/` y valen desde cualquier sitio: `/etc/passwd`) o **relativas** (cuentan desde donde estás: `documents/nota.txt`). `.` es la carpeta actual, `..` la padre y `~` tu carpeta personal. **Linux distingue mayúsculas**: `Nota.txt` y `nota.txt` son archivos distintos.

### Windows: unidades y carpetas de siempre

Windows organiza el disco en **unidades** (`C:`, `D:`…), cada una con su árbol. Separa las carpetas con `\` y no distingue mayúsculas.

| Carpeta | Qué contiene |
|---|---|
| `C:\Windows` | El sistema operativo; `C:\Windows\System32` guarda los ejecutables y bibliotecas del sistema |
| `C:\Program Files` | Programas de 64 bits |
| `C:\Program Files (x86)` | Programas de 32 bits |
| `C:\Users\<usuario>` | El **perfil** de cada usuario: `Desktop`, `Documents`, `Downloads`, `AppData`… |
| `C:\Users\<usuario>\AppData` | Configuración y datos de los programas de cada usuario (carpeta oculta) |
| `C:\ProgramData` | Datos de programas comunes a todos los usuarios (carpeta oculta) |
| `C:\Users\Public` | Carpetas compartidas entre los usuarios del equipo |

Las **variables de entorno** evitan escribir rutas fijas: `%USERPROFILE%` (CMD) o `$env:USERPROFILE` (PowerShell) vale `C:\Users\<usuario>`, y también existen `%APPDATA%`, `%TEMP%`, `%SystemRoot%` y `%ProgramFiles%`.

### Moverse por el árbol

| Tarea | Bash | PowerShell |
|---|---|---|
| Dónde estoy | `pwd` | `Get-Location` (`pwd`) |
| Cambiar de carpeta | `cd /etc` | `Set-Location C:\Windows` (`cd`) |
| Listar | `ls -l` | `Get-ChildItem` (`ls`, `dir`) |
| Crear carpeta | `mkdir proves` | `New-Item -ItemType Directory proves` |
| Copiar / mover / borrar | `cp`, `mv`, `rm` | `Copy-Item`, `Move-Item`, `Remove-Item` |
| Ver el árbol | `tree` (hay que instalarlo) | `tree` |

## 2. Localizar información

### Herramientas gráficas

- **Windows:** el cuadro de búsqueda del Explorador de archivos (dentro de una carpeta) y la búsqueda de Windows (tecla Windows). Admiten filtros por tipo, fecha y tamaño, y funcionan sobre un **índice**: las carpetas no indexadas se encuentran más despacio.
- **Linux (GNOME Files, Dolphin…):** la lupa o Ctrl + F dentro de una carpeta; se puede filtrar por tipo y por fecha de modificación.

Son cómodas, pero no se pueden **automatizar** ni ejecutar en un servidor sin escritorio. Por eso existen las órdenes.

### Órdenes en Linux: find, locate y grep

`find` recorre el árbol en directo, con cualquier criterio:

```bash
find /var/log -name "*.log"              # por nombre
find ~ -type f -iname "*.pdf"            # solo archivos, sin distinguir mayúsculas
find /home -type f -size +100M           # archivos de más de 100 MB
find ~/documents -type f -mtime -7       # modificados en los últimos 7 días
find /tmp -name "*.tmp" -type f          # revísalo ANTES de añadir -delete
```

`locate` no recorre el disco: consulta una **base de datos** de índices que se refresca con `sudo updatedb`. Es instantáneo, pero puede estar desfasado (y puede hacer falta instalarlo: `sudo apt install plocate`). Otros buscadores de órdenes: `which ls` (dónde está el ejecutable) y `whereis`.

Para buscar **dentro** de los archivos: `grep -r "palabra" /etc 2>/dev/null` (el `2>/dev/null` oculta los errores de permiso).

### Órdenes en Windows

```powershell
Get-ChildItem C:\Users -Recurse -Filter *.pdf -ErrorAction SilentlyContinue
Get-ChildItem C:\Dades -Recurse -File | Where-Object { $_.Length -gt 100MB }
Get-ChildItem C:\Dades -Recurse -File | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }
Get-ChildItem C:\Dades -Recurse -File | Select-String "palabra"
Get-Command notepad                       # dónde está un programa
```

Y, en CMD clásico: `dir /s /b *.pdf`.

:::caution[Cuidado con -delete]
`find … -delete` y `Remove-Item` **no tienen papelera**. Ejecuta primero la búsqueda sola, mira la lista que da y solo entonces añade el borrado.
:::

## 3. Copias de seguridad y restauración

### Estrategias

| Tipo | Qué copia | Espacio | Restaurar |
|---|---|---|---|
| **Completa** | Todo, cada vez | El máximo | Rápido: un solo conjunto |
| **Incremental** | Solo lo que ha cambiado desde la **última copia** (de cualquier tipo) | El mínimo | Lento: hacen falta la completa y todas las incrementales |
| **Diferencial** | Todo lo que ha cambiado desde la última **completa** | Medio | Medio: la completa y la última diferencial |

Una regla simple para empezar es **3-2-1**: tres copias de los datos, en dos soportes distintos y una de ellas fuera del equipo o del edificio. Las estrategias se trabajarán con más detalle en la unidad de seguridad.

### Restaurar es la parte que importa

Ya sabes hacer la copia (página 3). Ahora, la restauración. Supongamos que `backup.sh` creó `/backups/backup_2026-03-15.tar.gz` a partir de `/home/ana/documents`:

```bash
tar -tzf /backups/backup_2026-03-15.tar.gz | head          # ver qué contiene (t = listar)
mkdir -p /tmp/restauracio
tar -xzf /backups/backup_2026-03-15.tar.gz -C /tmp/restauracio    # restaurarlo todo (x = extraer)
tar -xzf /backups/backup_2026-03-15.tar.gz -C /tmp/restauracio home/ana/documents/nota.txt   # un solo archivo
diff -r /home/ana/documents /tmp/restauracio/home/ana/documents  # compara original y restaurado
```

Dos detalles: dentro del archivo las rutas han perdido la barra inicial (`home/ana/documents/…`), y `-C` indica la carpeta donde se desempaqueta. **Restaura primero en una carpeta de prueba**, no encima del original: si restauras encima, sobrescribes lo que tienes.

Para saber si el archivo de copia se ha estropeado, se calcula una **suma de verificación** (*hash*) cuando se crea y se vuelve a calcular cuando se quiere usar:

```bash
sha256sum backup_2026-03-15.tar.gz > sumes.sha256     # al crear la copia
sha256sum -c sumes.sha256                             # después: «OK» o «FAILED»
```

```powershell
Expand-Archive -Path D:\Backups\backup_2026-03-15.zip -DestinationPath C:\Restauracio
Get-FileHash D:\Backups\backup_2026-03-15.zip -Algorithm SHA256
```

`Expand-Archive` también admite `-Force`, que sobrescribe los archivos que ya existen en el destino. Windows tiene, además, sus propias herramientas de copia (Historial de archivos, copia de seguridad de Windows, según la versión) y en Linux, por ejemplo, Déjà Dup en GNOME: son el equivalente gráfico del script, y conviene saber que existen.

:::note[Una copia que no se ha probado no es una copia]
La prueba de verdad es **restaurar** en una carpeta de prueba y comprobar que todo está y que los archivos se pueden abrir. Planifícalo como una tarea más, por ejemplo una vez al mes.
:::

## 4. Utilidades de gestión de la información

### Compresores

Comprimir ahorra espacio y hace que un conjunto de archivos viaje como uno solo. **Empaquetar** (`tar`: reunir muchos archivos en uno) y **comprimir** (`gzip`, `xz`: hacerlo más pequeño) son dos pasos distintos; por eso el `.tar.gz`.

| Herramienta | Extensión | Características |
|---|---|---|
| `gzip` | `.gz` (`.tar.gz`) | Rápido y con compresión aceptable. Es el más extendido en Linux |
| `bzip2` | `.bz2` | Comprime más, más lento |
| `xz` | `.xz` (`.tar.xz`) | La mejor compresión, la más lenta |
| `zip` | `.zip` | Universal: se abre en todos los sistemas |
| 7-Zip | `.7z` y muchos más | Alta compresión, software libre, también para Windows |

```bash
tar -czf carpeta.tar.gz carpeta     # empaqueta + gzip
tar -cJf carpeta.tar.xz carpeta     # empaqueta + xz
zip -r carpeta.zip carpeta          # zip  (unzip carpeta.zip -d destino)
gzip -k fitxer                      # comprime y conserva el original (-k)
```

### Medir el espacio: df y du

```bash
df -h                          # espacio libre y ocupado de cada partición
df -hT /                       # con el tipo de sistema de archivos
du -sh ~/documents             # tamaño total de una carpeta
du -h --max-depth=1 /var | sort -h    # qué ocupa más dentro de /var
```

```powershell
Get-PSDrive -PSProvider FileSystem                    # unidades y espacio libre
Get-Volume                                            # volúmenes, sistema de archivos y tamaño
(Get-ChildItem C:\Dades -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB   # MB de una carpeta
```

`df` mira la **partición** entera y `du` suma lo que ocupa una **carpeta**; no tienen por qué coincidir exactamente. `ncdu` (hay que instalarlo) lo muestra de forma interactiva.

### Copiar bien: rsync y robocopy

Para copiar grandes cantidades, `cp` y el Explorador no son la herramienta. `rsync` (Linux) y `robocopy` (Windows) solo copian lo que ha cambiado y se pueden repetir cada noche.

```bash
rsync -av --dry-run /home/ana/documents/ /backups/documents/   # simula, no copia
rsync -av /home/ana/documents/ /backups/documents/              # copia
rsync -av --delete /home/ana/documents/ /backups/documents/     # y borra del destino lo que ya no existe en el origen
rsync -av -e ssh /dades/ usuari@servidor:/backups/dades/        # a otro equipo por SSH
```

La barra final del origen importa: `documents/` copia el **contenido**; `documents` (sin barra) copia la **carpeta** dentro del destino. `-a` conserva permisos y fechas, `-v` explica lo que hace.

```text
robocopy C:\Dades D:\Backups\Dades /E /R:1 /W:1
```

`/E` incluye subcarpetas (también vacías); `/R:1 /W:1` limita los reintentos. No uses `/MIR` sin pensar: **borra** del destino lo que no esté en el origen. **Los códigos de salida de `robocopy` son especiales:** del 0 al 7 son éxito (con distintas combinaciones de «se han copiado archivos» o «había archivos de más»); el **8 o más** indica errores. Un script que mire `$LASTEXITCODE -eq 0` consideraría fallida una copia perfectamente buena.

`Clonezilla` es otra utilidad, de naturaleza distinta: se hace arrancar desde un USB y **clona un disco o una partición** a una imagen (útil para replicar un aula). No se programa con scripts.

### Instalar y evaluar una utilidad

Para instalarlas: `sudo apt install rsync ncdu` (y `p7zip-full`, o `7zip` en versiones nuevas), o `winget install 7zip.7zip` en Windows. Para decidir si una utilidad te conviene, evalúala con criterios y con una prueba:

- **Funcionalidad:** ¿hace lo que necesitas (copiar, comprimir, cifrar, restaurar)?
- **Rendimiento:** ¿cuánto tarda y cuánto espacio ahorra? (`time orden` en Linux, `Measure-Command { … }` en PowerShell, y el tamaño del archivo resultante.)
- **Fiabilidad:** ¿puedes restaurar lo que has copiado?
- **Compatibilidad y licencia:** ¿funciona donde la necesitas y puedes usarla legalmente?
- **Mantenimiento y documentación:** ¿se actualiza y tiene ayuda?

La actividad 6 te propone comparar compresores con este método.

## Comprueba lo aprendido

1. ¿En qué directorio de Linux esperarías encontrar los logs del sistema, y en cuál la configuración?

   <details>
   <summary>Respuesta</summary>

   Los logs, en `/var/log`; la configuración, en `/etc`.

   </details>

2. ¿Qué diferencia hay entre `/media` y `/mnt`?

   <details>
   <summary>Respuesta</summary>

   `/media` es donde el sistema monta automáticamente los soportes extraíbles (pendrives, discos); `/mnt` es un punto de montaje para montajes manuales y temporales.

   </details>

3. Quieres encontrar todos los archivos `.log` de `/var/log` modificados en la última semana. ¿Qué orden usas?

   <details>
   <summary>Respuesta</summary>

   `find /var/log -name "*.log" -mtime -7`. En PowerShell, `Get-ChildItem C:\ruta -Recurse -Filter *.log | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }`.

   </details>

4. Has hecho `tar -czf backup.tar.gz /home/ana/documents`. ¿Cómo compruebas qué contiene y cómo recuperas solo `nota.txt` en `/tmp/prova`?

   <details>
   <summary>Respuesta</summary>

   Para listar: `tar -tzf backup.tar.gz`. Para extraer un archivo: `tar -xzf backup.tar.gz -C /tmp/prova home/ana/documents/nota.txt` (la ruta dentro del archivo no lleva la barra inicial).

   </details>

5. Un script de PowerShell comprueba `if ($LASTEXITCODE -ne 0)` después de un `robocopy`, y dice «ha fallado» aunque se hayan copiado todos los archivos. ¿Por qué?

   <details>
   <summary>Respuesta</summary>

   Porque `robocopy` devuelve códigos del 0 al 7 para éxitos (el 1 significa «se han copiado archivos»). Solo un código igual o mayor que 8 indica error: la condición correcta es `$LASTEXITCODE -ge 8`.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| directori / carpeta | directorio / carpeta |
| arrel | raíz |
| ruta absoluta / relativa | ruta absoluta / relativa |
| perfil d'usuari | perfil de usuario |
| variable d'entorn | variable de entorno |
| suport extraïble | soporte extraíble |
| còpia completa / incremental / diferencial | copia completa / incremental / diferencial |
| restaurar | restaurar |
| suma de verificació (*hash*) | suma de verificación (*hash*) |
| empaquetar | empaquetar |
| comprimir / descomprimir | comprimir / descomprimir |
| punt de muntatge | punto de montaje |
