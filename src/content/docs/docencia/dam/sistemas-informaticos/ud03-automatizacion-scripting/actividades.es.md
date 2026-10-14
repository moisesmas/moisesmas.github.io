---
title: "Actividades"
description: "Siete actividades de la unidad 3: seis de estudio autónomo en Bash y PowerShell (con el laboratorio) y la práctica presencial de scripts de automatización y tarea programada."
---

Estas son las actividades de la unidad. Las seis primeras las haces por tu cuenta, con dificultad creciente, y la séptima es la de la **sesión presencial**. Puedes ver cuándo hacer cada una en la [planificación](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/planificacion/es/).

En cuanto a los sistemas: necesitas una máquina **Linux** (la de la unidad 2 vale) y un **Windows con PowerShell**. Si en un momento dado solo tienes uno de los dos, haz la actividad en ese y completa el otro cuando puedas; la sesión presencial se hace en el sistema que tengas asignado. Trabaja **siempre en máquinas de pruebas**.

Todas se **entregan en Aules**, en la tarea correspondiente, en un único documento (PDF, ODT o DOCX) con tu nombre, más los scripts cuando se piden. No hace falta copiar los enunciados: numera las respuestas. Los códigos de órdenes y los scripts se copian como texto, no como captura, salvo que se pida una captura.

## Actividad 1 · Tu primer script

**Objetivo:** crear y ejecutar un script en Bash y en PowerShell, y ver con tus propios ojos qué hacen los permisos, la política de ejecución y las comillas.

**Qué tienes que hacer:**

1. Repasa las pestañas «Ejecutar un script» y «Comillas y expansión» del [laboratorio «Trazador de scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/?lang=es).
2. En Linux, crea `presentacio.sh` con shebang. Debe guardar tu nombre en `nom`, el ciclo en `cicle` y los años de edad en `anys`, y mostrar tres líneas: una frase con las tres variables entre comillas dobles, la misma frase entre comillas simples y una tercera que incluya la fecha de hoy obtenida con `$(date +%F)`.
3. Ejecútalo **antes** de darle permiso de ejecución y haz una captura del error. Después dale el permiso y vuelve a ejecutarlo.
4. En Windows, crea `presentacio.ps1` con el mismo contenido (las tres variables, la frase entre comillas dobles y simples, y la fecha con `Get-Date`). Si la política de ejecución te bloquea, haz una captura del mensaje y corrígelo con la orden que **no exige ser administrador**.
5. Responde: (a) ¿Por qué la frase entre comillas simples no muestra el valor de las variables? (b) ¿Por qué hay que escribir `./presentacio.sh` y no solo `presentacio.sh`? (c) ¿Qué habría pasado en Bash si hubieras escrito `anys = 17`?

**Qué entregas:** los dos scripts, las capturas del error de permiso (Linux) y del bloqueo de la política (Windows, si ha pasado) y las respuestas a (a), (b) y (c), en la tarea «Actividad 1» de Aules.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 40 minutos

## Actividad 2 · Traza a mano

**Objetivo:** predecir qué hace un script antes de ejecutarlo, línea a línea, siguiendo las variables y los códigos de salida.

**Qué tienes que hacer:**

1. Abre la pestaña «Trazador» del laboratorio. Ejecuta el script «Nota» con los parámetros `10`, `7` y `3`, y anota en cada caso qué rama del `if` se sigue. Ejecuta «Suma» y anota, para cada vuelta, el valor de `i` y de `suma`.
2. Ahora haz lo siguiente **sin ejecutarlos**: construye una tabla con una fila por línea ejecutada y las columnas *línea*, *variables después de la línea*, *salida por pantalla* y `$?`.

   **Script A**

   ```bash
   #!/bin/bash
   total=0
   for n in 4 7 10; do
     if [ $n -gt 5 ]; then
       total=$((total + n))
     fi
   done
   echo "Total: $total"
   ```

   **Script B**, ejecutado dos veces en Linux: `./b.sh /etc` y `./b.sh /carpeta_que_no_existe`

   ```bash
   #!/bin/bash
   fitxer=$1
   ls "$fitxer" > /dev/null 2>&1
   codi=$?
   echo "ls ha devuelto $codi"
   if [ $codi -ne 0 ]; then
     echo "No se puede listar"
     exit 4
   fi
   echo "Todo bien"
   ```

   **Script C** (reto)

   ```bash
   #!/bin/bash
   n=10
   passos=0
   while [ $n -gt 1 ]; do
     if [ $((n % 2)) -eq 0 ]; then
       n=$((n / 2))
     else
       n=$((3 * n + 1))
     fi
     passos=$((passos + 1))
   done
   echo "$passos"
   ```

3. Ejecuta los tres scripts de verdad y compara con tu tabla. Si algo no coincide, explica por qué te has equivocado.
4. Responde: en el script B, ¿qué código de salida tiene el script en cada ejecución (el que devolvería `echo $?` al terminar)?

**Qué entregas:** las tres tablas y las respuestas del apartado 4, en la tarea «Actividad 2» de Aules. Puedes escribirlas a mano y fotografiarlas.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 45 minutos

## Actividad 3 · Encuentra los errores

**Objetivo:** reconocer y corregir los errores más frecuentes en scripts de Bash y de PowerShell.

**Qué tienes que hacer:**

1. Practica las cinco primeras propuestas de la pestaña «Encuentra el error» del laboratorio.
2. Este script de Bash debe contar los archivos `.txt` de una carpeta y, si se pide, mostrarlos. Tiene **cinco errores**. Encuéntralos todos, escribe en qué línea está cada uno y por qué falla, y entrega la versión corregida.

   ```bash
   #!/bin/bash
   # resum.sh · cuenta los archivos .txt de una carpeta
   # Uso: ./resum.sh <carpeta> [detall]
   carpeta = $1
   mode=$2
   if [ ! -d $carpeta ]; then
     echo "No existe la carpeta" >&2
     exit 2
   fi
   total=0
   for f in "$carpeta"/*.txt; do
     total=$((total + 1))
     if [ "$mode" -eq "detall" ]; then
       echo "Archivo: $f"
     fi
   echo "Total: $total" > resum.log
   ```

   Prueba tu versión con una carpeta que tenga un espacio en el nombre (`mkdir "Mis documents"`) y también con una carpeta que no tenga ningún archivo `.txt`.
3. Este fragmento de PowerShell tiene **tres problemas**. Explícalos y corrígelos:

   ```powershell
   param([string]$Carpeta, [int]$Minim = 5)
   $total = (Get-ChildItem $Carpeta -Filter *.txt).Count
   if ($total > $Minim) {
       Write-Host "Hay suficientes archivos: " + $total
   }
   ```
4. Cada uno de estos tres fragmentos falla por un motivo distinto. Explica por qué y escribe la versión que funciona:
   - `useradd -m ana` ejecutado por un usuario normal.
   - `New-LocalUser -Name "ana"` dentro de un bucle que da de alta cinco usuarios (explica qué hace y qué hay que añadir).
   - `schtasks /create /tn "Neteja" /tr "C:\Scripts\Neteja.ps1" /sc daily /st 03:00`

**Qué entregas:** un documento con los errores encontrados (línea, motivo y corrección) y los scripts corregidos, en la tarea «Actividad 3» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 50 minutos

## Actividad 4 · Un script con parámetros y validaciones

**Objetivo:** escribir un script reutilizable que recibe datos de fuera, los valida e informa del resultado con códigos de salida.

**Qué tienes que hacer:**

1. Escribe `info.sh` (Bash) e `Info.ps1` (PowerShell). Deben recibir una ruta como parámetro y comportarse así:
   - Si **no hay ningún parámetro**: mostrar cómo se usa y terminar con código `1`.
   - Si la ruta **no existe**: mostrar un mensaje de error (en la salida de errores) y terminar con código `2`.
   - Si es un **archivo**: mostrar el tamaño en bytes, el número de líneas y el número de palabras.
   - Si es una **carpeta**: mostrar cuántas entradas tiene y el tamaño total aproximado.
   - En los dos casos correctos, terminar con código `0`.
2. Pruébalos con cuatro casos: sin parámetro, con una ruta inexistente, con un archivo de texto y con una carpeta.
3. Después de cada ejecución, muestra el código de salida (`echo $?` en Bash; `$LASTEXITCODE` en PowerShell, después de ejecutar el script).
4. Pista de laboratorio: la pestaña «Condiciones» te ayuda con `-f` y `-d`, y «Parámetros y read» con `$#` y `$1`.
5. Añade una **opción**: si hay un segundo parámetro `-v`, muestra además la fecha de la última modificación.

**Qué entregas:** los dos scripts y una captura por cada uno de los cuatro casos con el código de salida visible, en la tarea «Actividad 4» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 5 · Analiza un log

**Objetivo:** extraer información de un archivo de texto con órdenes de filtrado y tuberías, y convertirla en un script.

**Qué tienes que hacer:**

1. Guarda este log como `servei.log` (copia y pega el texto):

   ```text
   2026-11-17 08:58:02 INFO Servicio iniciado
   2026-11-17 09:01:12 INFO Conexión de ana
   2026-11-17 09:03:40 ERROR No se puede conectar a la base de datos
   2026-11-17 09:03:41 WARN Reintentando conexión
   2026-11-17 09:03:45 INFO Conexión restablecida
   2026-11-17 09:15:20 INFO Conexión de luis
   2026-11-17 09:47:09 WARN Disco al 85%
   2026-11-17 10:02:31 ERROR Archivo de configuración no encontrado
   2026-11-17 10:02:32 INFO Se usa la configuración por defecto
   2026-11-17 10:20:00 INFO Conexión de marta
   2026-11-17 10:41:55 ERROR Tiempo de espera agotado
   2026-11-17 10:41:56 WARN Reintentando conexión
   2026-11-17 10:41:59 INFO Conexión restablecida
   2026-11-17 11:05:13 INFO Conexión de ana
   2026-11-17 11:30:48 WARN Disco al 88%
   2026-11-17 11:59:10 ERROR Disco lleno
   2026-11-17 12:00:00 INFO Servicio detenido
   ```

2. Con **una orden o tubería** para cada apartado, en Bash y en PowerShell (en PowerShell, si las tildes salen mal, añade `-Encoding UTF8` a `Get-Content`):
   - **a)** ¿Cuántas líneas de `ERROR` hay?
   - **b)** Muestra todas las líneas que **no** son `INFO`.
   - **c)** ¿Cuántas líneas hay de cada nivel (`INFO`, `WARN`, `ERROR`), de más a menos?
   - **d)** Muestra las dos últimas líneas de error.
   - **e)** Muestra solo el **mensaje** (el texto después del nivel) del primer error.
   - **f)** ¿Cuántas líneas hay por cada hora del día?
3. Escribe un script (`informe_log.sh` / `InformeLog.ps1`) que reciba el archivo y un nivel opcional (por defecto `ERROR`), compruebe que el archivo existe y escriba en `informe.txt` el nivel, cuántas líneas hay y las tres últimas.
4. Responde: ¿por qué, en Bash, `grep error servei.log` no encuentra ninguna línea y en PowerShell `Select-String error servei.log` sí?

**Qué entregas:** un documento con las órdenes del apartado 2 (una por apartado y por shell), la salida de cada una y los dos scripts del apartado 3, más la respuesta a la pregunta 4, en la tarea «Actividad 5» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 6 · Copia, restauración y compresores

**Objetivo:** orientarte por la estructura de directorios, localizar información, restaurar una copia comprobándola y evaluar utilidades de gestión de la información.

**Qué tienes que hacer:**

1. **Estructura de directorios.** Haz una tabla con la ruta (en Linux y en Windows) donde encontrarías: la configuración del sistema, los registros (logs), los programas instalados, la carpeta personal de un usuario, los archivos temporales y los dispositivos. Comprueba en tu máquina que existen.
2. **Datos de prueba.** Crea las carpetas y unos archivos: en Linux, `mkdir -p ~/proves/dades/text` y `for i in $(seq 1 20); do seq 1 20000 > ~/proves/dades/text/fitxer$i.txt; done`. En Windows: `New-Item -ItemType Directory -Force "$env:USERPROFILE\proves\dades\text" | Out-Null` y `1..20 | ForEach-Object { 1..20000 | Set-Content "$env:USERPROFILE\proves\dades\text\fitxer$_.txt" }`.
3. **Localizar.** Con `find` / `Get-ChildItem`, lista los archivos de la carpeta de más de 50 KB. Calcula el tamaño total con `du -sh` o con `Measure-Object`.
4. **Comprimir y comparar.** Comprime la carpeta `dades` con tres formatos (en Linux: `tar.gz`, `tar.xz` y `zip`; en Windows: `zip` con `Compress-Archive` y, si lo instalas con `winget install 7zip.7zip`, `7z`). Mide para cada formato el **tamaño** y el **tiempo** (`time` en Linux, `Measure-Command` en PowerShell) y presenta una tabla. Concluye cuál elegirías para una copia diaria y para un archivo que solo se guardará.
5. **Restaurar y verificar.** Restaura una de las copias en una carpeta **distinta** de la original y comprueba que es idéntica (`diff -r` en Linux; comparando `Get-FileHash` de tres archivos en Windows). Después borra `fitxer7.txt` del original y recupera **solo ese archivo** de la copia.
6. **Sincronizar.** Usa `rsync -av` (Linux) o `robocopy /E` (Windows) para copiar `dades` a una carpeta `copia`. Modifica un solo archivo, repite la copia y comprueba que solo se copia lo que ha cambiado (en Linux, míralo primero con `--dry-run`). En Windows, anota el código de salida de `robocopy` en cada ejecución y explica qué significa.

**Qué entregas:** un documento con la tabla del apartado 1, las órdenes y las salidas de los apartados 3 a 6, la tabla comparativa de compresores con tu conclusión y una reflexión de 4-5 líneas sobre por qué hay que probar las restauraciones, en la tarea «Actividad 6» de Aules.

**Dificultad:** ★★★ · **Tiempo estimado:** 90 minutos

## Actividad 7 · Scripts de automatización y tarea programada (presencial)

**Objetivo:** escribir, probar y programar los tres scripts de administración de la unidad, y comprobar que la tarea se ejecuta sola.

Se hace **individualmente, durante la sesión presencial**, en el sistema operativo de tu equipo (Linux con Bash o Windows con PowerShell). Los scripts son los de la [página 3](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/03-scripts-practics-i-tasques-programades/es/); tienes que entenderlos y probarlos, no solo copiarlos.

**Qué tienes que hacer:**

1. **Copia de seguridad.** Escribe y prueba `backup.sh` o `Backup.ps1` sobre una carpeta de prueba con algunos archivos. Comprueba el archivo comprimido con la fecha en el nombre.
2. **Alta masiva.** Prepara un archivo `usuaris.txt` con 5 nombres y escribe y prueba `crear_usuaris.sh` (con `sudo`) o `CrearUsuaris.ps1` (en una consola de administrador). Comprueba que las cuentas existen (`getent passwd` o `Get-LocalUser`).
3. **Comprobación del disco.** Escribe y prueba `comprovar_disc.sh` o `ComprovarDisc.ps1`. Ejecútalo con un umbral bajo (por ejemplo `1`) para ver el aviso.
4. **Programación.** Programa la comprobación del disco para que se ejecute **cada 5 minutos**: con `crontab -e` (línea `*/5 * * * *` con ruta absoluta y redirección) o con el Programador de tareas / `schtasks` (acción `powershell.exe` con `-File`). Espera, como mínimo, a dos ejecuciones y compruébalo en el registro.
5. **Documenta.** Reflexión breve (3-4 líneas): qué otra tarea de tu día a día automatizarías con un script parecido, y por qué.

**Qué entregas:** antes de acabar la clase, en la tarea de Aules «Actividad UP3 — Scripts de automatización y tarea programada»: un documento con
- **Apartado 1:** el script de copia y una captura del archivo comprimido generado;
- **Apartado 2:** el script de altas y una captura de los usuarios creados en el sistema;
- **Apartado 3:** el script de comprobación del disco y una captura de su ejecución;
- **Apartado 4:** una captura de la tarea programada (`crontab -l` o la ventana del Programador de tareas) y del registro que demuestre que se ha ejecutado automáticamente **al menos dos veces**;
- **Apartado 5:** la reflexión.

Adjunta también los archivos `.sh` o `.ps1`.

**Dificultad:** ★★☆ · **Tiempo estimado:** durante la sesión presencial

:::aules
Las entregas de estas actividades se hacen en Aules, en la tarea de cada una. Allí también encontrarás la rúbrica, las calificaciones y las soluciones comentadas.
:::
