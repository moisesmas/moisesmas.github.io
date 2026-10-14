---
title: "3. Scripts prácticos y tareas programadas"
description: "Tres scripts de administración (copia con fecha, alta masiva de usuarios y monitorización del disco) en Bash y PowerShell, y cómo programarlos con cron y el Programador de tareas."
---

Ya sabes escribir un script. Ahora toca usarlo para lo que hacen los administradores de verdad: **copiar datos, crear cuentas y vigilar el disco**, y después dejar que el ordenador lo repita solo. Esta página es la preparación de la sesión presencial: en ella escribirás, probarás y programarás estos scripts.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura antes de la presencial. La práctica se hace **durante** la presencial.

1. Léela entera con calma y **marca las dudas**. Si puedes, prueba los scripts antes, en una máquina virtual.
2. Decide en qué sistema trabajarás en clase (Linux con Bash o Windows con PowerShell). Si tienes tiempo, haz los dos.
3. Lleva abierta la máquina virtual y las páginas 1 y 2 a mano. Las instrucciones de la entrega están en la [actividad 7](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/).
:::

:::danger[Pruébalo todo en una máquina de pruebas]
Crear usuarios, programar tareas y borrar copias son acciones reales. Hazlo en una máquina virtual o en un equipo de prácticas, nunca en tu ordenador del día a día.
:::

## 1. Script de copia de seguridad con fecha

La idea: comprimir una carpeta en un único archivo, poniendo **la fecha en el nombre** para que cada día genere un archivo distinto y no se sobrescriban las copias anteriores.

```bash
#!/bin/bash
# backup.sh · copia comprimida con fecha
# Uso: ./backup.sh <carpeta_origen> <carpeta_destino>
if [ $# -ne 2 ]; then
  echo "Uso: $0 <origen> <destino>" >&2
  exit 1
fi
origen=$1
desti=$2
if [ ! -d "$origen" ]; then
  echo "No existe la carpeta $origen" >&2
  exit 2
fi
mkdir -p "$desti"
data=$(date +%Y-%m-%d)
arxiu="$desti/backup_$data.tar.gz"
if tar -czf "$arxiu" "$origen"; then
  echo "Copia creada: $arxiu"
else
  echo "La copia ha fallado" >&2
  exit 3
fi
```

```powershell
# Backup.ps1 · copia comprimida con fecha
# Uso: .\Backup.ps1 -Origen C:\Dades -Desti D:\Backups
param(
    [Parameter(Mandatory)][string]$Origen,
    [Parameter(Mandatory)][string]$Desti
)
if (-not (Test-Path $Origen -PathType Container)) {
    Write-Error "No existe la carpeta $Origen"
    exit 2
}
New-Item -ItemType Directory -Path $Desti -Force | Out-Null
$data = Get-Date -Format "yyyy-MM-dd"
$arxiu = Join-Path $Desti "backup_$data.zip"
Compress-Archive -Path $Origen -DestinationPath $arxiu -Force
if ($?) {
    Write-Host "Copia creada: $arxiu"
} else {
    exit 3
}
```

Fíjate en qué hace cada parte: valida los parámetros (`exit 1` o `2` si faltan o son incorrectos), crea el destino si no existe, forma el nombre con la fecha y **comprueba si la copia ha ido bien** antes de decir que lo ha hecho. Esa última comprobación es la que separa un script fiable de uno que miente.

Cosas que hay que saber:

- `tar -czf` crea (`c`) un archivo comprimido con gzip (`z`) en el archivo indicado (`f`). Si el origen es una ruta absoluta, `tar` avisa de que quita la barra inicial (*Removing leading `/`*): es normal y hace que la copia sea más fácil de restaurar.
- `Compress-Archive` de Windows PowerShell 5.1 tiene limitaciones con archivos muy grandes (alrededor de 2 GB) y con archivos abiertos por otros programas. Para copias grandes se usa `robocopy` u otras herramientas (página 4).
- Comprueba siempre el resultado: `tar -tzf /backups/backup_2026-03-15.tar.gz` lista el contenido, y en Windows puedes abrir el `.zip`.

## 2. Script de alta masiva de usuarios

Preparar un aula nueva significa crear 25 cuentas. Con un archivo `usuaris.txt` (un nombre por línea) y un bucle lo resuelves en un segundo.

```bash
#!/bin/bash
# crear_usuaris.sh · alta masiva desde un archivo (un nombre por línea)
# Hacen falta privilegios: sudo ./crear_usuaris.sh usuaris.txt
if [ "$(id -u)" -ne 0 ]; then
  echo "Hay que ejecutarlo con sudo" >&2
  exit 1
fi
if [ $# -ne 1 ] || [ ! -f "$1" ]; then
  echo "Uso: sudo $0 <archivo_con_nombres>" >&2
  exit 2
fi
read -s -p "Contraseña inicial: " clau
echo
while read -r usuari; do
  [ -z "$usuari" ] && continue
  if id "$usuari" > /dev/null 2>&1; then
    echo "Ya existe: $usuari"
  else
    useradd -m -s /bin/bash "$usuari"
    echo "$usuari:$clau" | chpasswd
    chage -d 0 "$usuari"
    echo "Usuario creado: $usuari"
  fi
done < "$1"
```

```powershell
#Requires -RunAsAdministrator
# CrearUsuaris.ps1 · alta masiva desde un archivo (un nombre por línea)
# Uso: .\CrearUsuaris.ps1 -Fitxer .\usuaris.txt
param([Parameter(Mandatory)][string]$Fitxer)
$clau = Read-Host "Contraseña inicial" -AsSecureString
Get-Content $Fitxer | Where-Object { $_.Trim() -ne "" } | ForEach-Object {
    if (Get-LocalUser -Name $_ -ErrorAction SilentlyContinue) {
        Write-Host "Ya existe: $_"
    } else {
        New-LocalUser -Name $_ -Password $clau | Out-Null
        Write-Host "Usuario creado: $_"
    }
}
```

Puntos clave:

- **Necesita privilegios.** `useradd`/`chpasswd` piden `sudo`; `New-LocalUser` exige una consola de PowerShell abierta **como administrador** (la línea `#Requires -RunAsAdministrator` hace que PowerShell lo compruebe y pare si no lo es).
- **`New-LocalUser` necesita contraseña o `-NoPassword`.** Sin ninguno de los dos, intenta pedirla por teclado para cada usuario y el script se queda parado esperando. Aquí la pedimos **una sola vez** con `-AsSecureString` y la reutilizamos. `-NoPassword` crea cuentas sin contraseña y solo es aceptable en una máquina de pruebas.
- En Linux, `useradd -m` crea la cuenta con la carpeta personal, pero **sin contraseña**, de modo que nadie podría entrar. Por eso `chpasswd` le asigna la contraseña inicial y `chage -d 0` obliga a cambiarla en el primer inicio de sesión.
- No escribas nunca una contraseña dentro del script: se queda guardada en el archivo.
- Una política de contraseñas demasiado débil puede hacer fallar el alta. Si pasa, elige una más larga y compleja.
- La limpieza de la prueba: `sudo userdel -r nom` (Linux) y `Remove-LocalUser -Name nom` (Windows; la carpeta de perfil se borra aparte).

## 3. Script de monitorización del disco

Una monitorización simple: calcular qué porcentaje del disco está lleno y avisar si pasa de un **umbral** (aquí, el 80 %). Tanto en Bash como en PowerShell, este script **anota cada comprobación** en un archivo de registro, porque las tareas programadas no tienen pantalla y, si no lo escribes, no puedes enterarte de nada.

```bash
#!/bin/bash
# comprovar_disc.sh · registra el uso del disco y avisa si pasa del umbral
# Uso: ./comprovar_disc.sh [umbral]   (80 por defecto)
llindar=${1:-80}
registre="$HOME/disc.log"
us=$(df -P / | tail -1 | awk '{print $5}' | tr -d '%')
data=$(date '+%Y-%m-%d %H:%M')
echo "$data · disco al $us%" >> "$registre"
if [ "$us" -gt "$llindar" ]; then
  echo "$data · AVISO: el disco supera el $llindar%" | tee -a "$registre"
fi
```

```powershell
# ComprovarDisc.ps1 · registra el uso del disco y avisa si pasa del umbral
param([int]$Llindar = 80)
$registre = Join-Path $env:USERPROFILE "disc.log"
$disc = Get-PSDrive C
$us = [math]::Round($disc.Used / ($disc.Used + $disc.Free) * 100)
$data = Get-Date -Format "yyyy-MM-dd HH:mm"
Add-Content -Path $registre -Value "$data · disco al $us%"
if ($us -gt $Llindar) {
    Write-Host "AVISO: el disco supera el $Llindar%"
    Add-Content -Path $registre -Value "$data · AVISO: el disco supera el $Llindar%"
}
```

Cómo funciona la línea que obtiene el porcentaje en Bash: `df -P /` muestra el uso de la raíz (el `-P` evita que una línea larga se parta en dos), `tail -1` se queda con la última línea, `awk '{print $5}'` coge la quinta columna (por ejemplo `42%`) y `tr -d '%'` quita el símbolo. `${1:-80}` significa «el primer parámetro, o 80 si no hay ninguno». En el laboratorio puedes seguir este script línea a línea (pestaña «Trazador», script «Comprobar disco»).

:::caution[Tildes en los scripts de PowerShell]
Windows PowerShell 5.1 lee como ANSI un `.ps1` guardado en UTF-8 **sin BOM**, y los caracteres con tilde pueden salir con símbolos extraños. Guárdalo como **«UTF-8 con BOM»** (en el Bloc de notas: *Guardar como → Codificación*) o evita las tildes en los mensajes.
:::

## 4. Programar tareas en Linux: cron

De poco sirve tener scripts útiles si hay que acordarse de ejecutarlos. **cron** es el planificador de Linux: un servicio (`cron`) que cada minuto mira las listas de tareas programadas (los *crontabs*) y lanza las que tocan. Cada usuario tiene el suyo, que se edita con `crontab -e`. Cada línea tiene **cinco campos de tiempo** y la orden:

```text
┌──────── minuto (0-59)
│ ┌────── hora (0-23)
│ │ ┌──── día del mes (1-31)
│ │ │ ┌── mes (1-12)
│ │ │ │ ┌ día de la semana (0-7; 0 y 7 = domingo)
│ │ │ │ │
* * * * *  orden_a_ejecutar
```

| Línea de crontab | Cuándo se ejecuta |
|---|---|
| `30 2 * * *` | Cada día a las 02:30 |
| `0 * * * *` | Cada hora en punto |
| `*/5 * * * *` | Cada 5 minutos |
| `0 9 * * 1` | Cada lunes a las 9:00 |
| `0 8 * * 1-5` | De lunes a viernes a las 8:00 |
| `0 0 1 * *` | El día 1 de cada mes, a medianoche |

`*` es «cualquier valor», `,` separa valores (`1,15`), `-` indica un intervalo (`1-5`) y `/` un paso (`*/5`). Para la práctica de clase, la línea es:

```text
*/5 * * * * /home/usuari/comprovar_disc.sh >> /home/usuari/cron.log 2>&1
```

Órdenes útiles:

```bash
crontab -e       # editar tus tareas
crontab -l       # listarlas
systemctl status cron                 # ¿el servicio está activo? (en Fedora y derivadas se llama crond)
cat ~/disc.log                        # el registro de nuestro script
grep CRON /var/log/syslog | tail      # lo que ha lanzado cron (Debian y Ubuntu)
```

Errores típicos con cron:

- **Rutas absolutas.** cron se ejecuta con un entorno mínimo y una carpeta de trabajo que no es la tuya: escribe `/home/usuari/comprovar_disc.sh`, no `./comprovar_disc.sh`. El script debe tener permiso de ejecución.
- **El `%` en un crontab.** En una línea de crontab el `%` tiene un significado especial y se debe escribir `\%`. Por eso ponemos el `date +%Y-%m-%d` **dentro del script** y no en la línea de cron.
- **Salida perdida.** Si no rediriges la salida (`>> archivo 2>&1`), cron intenta enviarla por correo local. Registra todo.
- **`crontab -r` borra todo el crontab** sin preguntar. Para quitar una tarea, edita y borra la línea.

Para una ejecución **única** existe `at`: `echo "/home/usuari/backup.sh /home/usuari/documents /home/usuari/backups" | at 02:30` (hace falta el paquete `at`; `atq` lista las pendientes).

## 5. Programar tareas en Windows: el Programador de tareas

El **Programador de tareas** (*Task Scheduler*, `taskschd.msc`) cumple la misma función con una interfaz gráfica. Una tarea tiene dos piezas esenciales:

- el **desencadenador** (*trigger*): **cuándo** se ejecuta (a una hora, al iniciar sesión, cada cierto tiempo…);
- la **acción**: **qué** se ejecuta.

Para una tarea en la interfaz gráfica: *Crear tarea…* → pestaña **Desencadenadores** → *Nuevo…* (aquí se indica «Repetir la tarea cada: 5 minutos» para la de clase) → pestaña **Acciones** → *Nueva…* → acción «Iniciar un programa», con:

- **Programa o script:** `powershell.exe`
- **Agregar argumentos:** `-NoProfile -ExecutionPolicy Bypass -File "C:\Scripts\ComprovarDisc.ps1"`

Por línea de órdenes, desde CMD o PowerShell, con `schtasks`:

```text
schtasks /create /tn "BackupDiari" /tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\Backup.ps1 -Origen C:\Dades -Desti D:\Backups" /sc daily /st 02:30
schtasks /create /tn "ComprovarDisc" /tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\ComprovarDisc.ps1" /sc minute /mo 5
schtasks /query /tn "ComprovarDisc" /v /fo list
schtasks /run /tn "ComprovarDisc"
schtasks /delete /tn "ComprovarDisc" /f
```

:::caution[No programes el .ps1 directamente]
`/tr "C:\Scripts\Backup.ps1"` **no ejecuta el script**: Windows lo trata como un documento y lo abre con la aplicación asociada (por defecto, un editor). La acción tiene que ser **`powershell.exe` con `-File`** y, como la política de ejecución puede bloquearlo, se pone `-ExecutionPolicy Bypass` solo para esta tarea. Si la ruta del script tiene espacios, hay que escapar las comillas: `/tr "powershell.exe -File \"C:\Mis Scripts\x.ps1\""`.
:::

Una tarea creada con tu usuario solo se ejecuta mientras tienes la sesión iniciada, y en un portátil, por defecto, no se ejecuta con batería (pestaña *Condiciones*). Para tareas de sistema se puede usar `/ru SYSTEM`, pero exige una consola de administrador.

### Dos mundos, la misma idea

| | Linux | Windows |
|---|---|---|
| Planificador | `cron` (servicio) | Programador de tareas |
| Dónde se define | `crontab -e` | Interfaz gráfica o `schtasks` |
| «Cuándo» | Los 5 campos | Desencadenador |
| «Qué» | La orden de la línea | Acción |
| Cada 5 minutos | `*/5 * * * *` | `/sc minute /mo 5` |
| Cada día a las 2:30 | `30 2 * * *` | `/sc daily /st 02:30` |
| Dónde mirar el resultado | Tu registro (`>> archivo 2>&1`) | Tu registro; y el *Historial* de la tarea |
| Ejecutar una vez | `at` | `/sc once` |

## 6. Qué harás en la presencial

Individualmente, en el sistema que tenga asignado tu equipo (o en los dos, si da tiempo):

1. Escribir y probar el script de **copia de seguridad** sobre una carpeta de prueba.
2. Escribir y probar el script de **alta masiva** de 5 usuarios a partir de un archivo de texto.
3. Escribir y probar el script de **comprobación del disco**.
4. **Programar** la comprobación cada 5 minutos y verificar en el registro que se ha ejecutado sola al menos dos veces.
5. **Documentar** con capturas y una reflexión breve. Se entrega en Aules antes de acabar la clase.

Los detalles de la entrega están en la [actividad 7](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/).

## Comprueba lo aprendido

1. ¿Por qué un script de copia pone la fecha en el nombre del archivo?

   <details>
   <summary>Respuesta</summary>

   Para que cada ejecución genere un archivo distinto. Sin la fecha, la copia de hoy sobrescribiría la de ayer y solo tendrías la más reciente.

   </details>

2. Has escrito `schtasks /create /tn "Copia" /tr "C:\Scripts\Backup.ps1" /sc daily /st 02:30`. La tarea se ejecuta pero no hace nada. ¿Por qué, y cómo se corrige?

   <details>
   <summary>Respuesta</summary>

   Porque Windows abre el `.ps1` con la aplicación asociada en lugar de ejecutarlo con PowerShell. Hay que poner `/tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\Backup.ps1"`.

   </details>

3. Escribe la línea de crontab que ejecuta `/home/ana/neteja.sh` de lunes a viernes a las 7:30.

   <details>
   <summary>Respuesta</summary>

   `30 7 * * 1-5 /home/ana/neteja.sh`

   </details>

4. Un script de PowerShell hace `New-LocalUser -Name $nom` dentro de un bucle y se queda parado esperando. ¿Qué pasa?

   <details>
   <summary>Respuesta</summary>

   `New-LocalUser` necesita `-Password` (un `SecureString`, por ejemplo con `Read-Host -AsSecureString`) o `-NoPassword`. Sin ninguno de los dos, el cmdlet pide la contraseña por teclado. Además, hace falta una consola de administrador.

   </details>

5. Una tarea de cron funciona si la ejecutas a mano, pero no cuando la programa cron. Di dos causas probables.

   <details>
   <summary>Respuesta</summary>

   Rutas relativas (cron no ejecuta desde tu carpeta ni con tu `PATH` completo) y falta de permiso de ejecución en el script. También puede ser un `%` sin escapar en la línea de crontab.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| còpia de seguretat | copia de seguridad |
| alta massiva | alta masiva |
| monitoratge | monitorización |
| llindar | umbral |
| registre (*log*) | registro (*log*) |
| tasca programada | tarea programada |
| Programador de tasques | Programador de tareas |
| desencadenador (*trigger*) | desencadenador (*trigger*) |
| acció | acción |
| privilegis | privilegios |
| consola d'administrador | consola de administrador |
| contrasenya | contraseña |
