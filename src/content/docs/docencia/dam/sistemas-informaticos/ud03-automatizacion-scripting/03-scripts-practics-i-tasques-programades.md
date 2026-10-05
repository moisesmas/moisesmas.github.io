---
title: "3. Scripts pràctics i tasques programades"
description: "Tres scripts d'administració (còpia amb data, alta massiva d'usuaris i monitoratge del disc) en Bash i PowerShell, i com programar-los amb cron i el Programador de tasques."
---

Ja saps escriure un script. Ara toca fer-lo servir per al que fan els administradors de veritat: **copiar dades, crear comptes i vigilar el disc**, i després deixar que l'ordinador ho repetisca sol. Esta pàgina és la preparació de la sessió presencial del 24 de novembre: aquell dia escriuràs, provaràs i programaràs estos scripts.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura abans de la presencial. La pràctica es fa **durant** la presencial.

1. Llig-la sencera amb calma i **marca els dubtes**. Si pots, prova els scripts abans, en una màquina virtual.
2. Decidix en quin sistema treballaràs a classe (Linux amb Bash o Windows amb PowerShell). Si tens temps, fes els dos.
3. Porta oberta la màquina virtual i la pàgina 1 i 2 a mà. Les instruccions de l'entrega són a l'[activitat 7](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/).
:::

:::danger[Prova-ho tot en una màquina de proves]
Crear usuaris, programar tasques i esborrar còpies són accions reals. Fes-ho en una màquina virtual o en un equip de pràctiques, mai en el teu ordinador del dia a dia.
:::

## 1. Script de còpia de seguretat amb data

L'idea: comprimir una carpeta en un únic fitxer, posant **la data en el nom** perquè cada dia genere un fitxer diferent i no se sobreescriguen les còpies anteriors.

```bash
#!/bin/bash
# backup.sh · còpia comprimida amb data
# Ús: ./backup.sh <carpeta_origen> <carpeta_destí>
if [ $# -ne 2 ]; then
  echo "Ús: $0 <origen> <destí>" >&2
  exit 1
fi
origen=$1
desti=$2
if [ ! -d "$origen" ]; then
  echo "No existeix la carpeta $origen" >&2
  exit 2
fi
mkdir -p "$desti"
data=$(date +%Y-%m-%d)
arxiu="$desti/backup_$data.tar.gz"
if tar -czf "$arxiu" "$origen"; then
  echo "Còpia creada: $arxiu"
else
  echo "La còpia ha fallat" >&2
  exit 3
fi
```

```powershell
# Backup.ps1 · còpia comprimida amb data
# Ús: .\Backup.ps1 -Origen C:\Dades -Desti D:\Backups
param(
    [Parameter(Mandatory)][string]$Origen,
    [Parameter(Mandatory)][string]$Desti
)
if (-not (Test-Path $Origen -PathType Container)) {
    Write-Error "No existeix la carpeta $Origen"
    exit 2
}
New-Item -ItemType Directory -Path $Desti -Force | Out-Null
$data = Get-Date -Format "yyyy-MM-dd"
$arxiu = Join-Path $Desti "backup_$data.zip"
Compress-Archive -Path $Origen -DestinationPath $arxiu -Force
if ($?) {
    Write-Host "Còpia creada: $arxiu"
} else {
    exit 3
}
```

Fixa't en què fa cada part: valida els paràmetres (`exit 1` o `2` si falten o són incorrectes), crea el destí si no existix, forma el nom amb la data i **comprova si la còpia ha anat bé** abans de dir que ho ha fet. Eixa última comprovació és la que separa un script fiable d'un que menteix.

Coses que cal saber:

- `tar -czf` crea (`c`) un arxiu comprimit amb gzip (`z`) en el fitxer indicat (`f`). Si l'origen és una ruta absoluta, `tar` avisa que lleva la barra inicial (*Removing leading `/`*): és normal i fa que la còpia siga més fàcil de restaurar.
- `Compress-Archive` de Windows PowerShell 5.1 té limitacions amb fitxers molt grans (al voltant de 2 GB) i amb fitxers oberts per altres programes. Per a còpies grans s'usa `robocopy` o altres eines (pàgina 4).
- Comprova sempre el resultat: `tar -tzf /backups/backup_2026-11-24.tar.gz` llista el contingut, i en Windows pots obrir el `.zip`.

## 2. Script d'alta massiva d'usuaris

Preparar un aula nova vol dir crear 25 comptes. Amb un fitxer `usuaris.txt` (un nom per línia) i un bucle ho resols en un segon.

```bash
#!/bin/bash
# crear_usuaris.sh · alta massiva des d'un fitxer (un nom per línia)
# Cal privilegis: sudo ./crear_usuaris.sh usuaris.txt
if [ "$(id -u)" -ne 0 ]; then
  echo "Cal executar-lo amb sudo" >&2
  exit 1
fi
if [ $# -ne 1 ] || [ ! -f "$1" ]; then
  echo "Ús: sudo $0 <fitxer_amb_noms>" >&2
  exit 2
fi
read -s -p "Contrasenya inicial: " clau
echo
while read -r usuari; do
  [ -z "$usuari" ] && continue
  if id "$usuari" > /dev/null 2>&1; then
    echo "Ja existeix: $usuari"
  else
    useradd -m -s /bin/bash "$usuari"
    echo "$usuari:$clau" | chpasswd
    chage -d 0 "$usuari"
    echo "Usuari creat: $usuari"
  fi
done < "$1"
```

```powershell
#Requires -RunAsAdministrator
# CrearUsuaris.ps1 · alta massiva des d'un fitxer (un nom per línia)
# Ús: .\CrearUsuaris.ps1 -Fitxer .\usuaris.txt
param([Parameter(Mandatory)][string]$Fitxer)
$clau = Read-Host "Contrasenya inicial" -AsSecureString
Get-Content $Fitxer | Where-Object { $_.Trim() -ne "" } | ForEach-Object {
    if (Get-LocalUser -Name $_ -ErrorAction SilentlyContinue) {
        Write-Host "Ja existeix: $_"
    } else {
        New-LocalUser -Name $_ -Password $clau | Out-Null
        Write-Host "Usuari creat: $_"
    }
}
```

Punts clau:

- **Necessita privilegis.** `useradd`/`chpasswd` demanen `sudo`; `New-LocalUser` exigix una consola de PowerShell oberta **com a administrador** (la línia `#Requires -RunAsAdministrator` fa que PowerShell ho comprove i pare si no ho és).
- **`New-LocalUser` necessita contrasenya o `-NoPassword`.** Sense cap dels dos, intenta demanar-la per teclat per a cada usuari, i l'script s'atura a esperar. Ací la demanem **una sola vegada** amb `-AsSecureString` i la reutilitzem. `-NoPassword` crea comptes sense contrasenya i només és acceptable en una màquina de proves.
- En Linux, `useradd -m` crea el compte amb la carpeta personal, però **sense contrasenya**, de manera que ningú no hi podria entrar. Per això `chpasswd` li assigna la contrasenya inicial i `chage -d 0` obliga a canviar-la en el primer inici de sessió.
- No escrigues mai una contrasenya dins de l'script: es queda guardada en el fitxer.
- Una política de contrasenyes massa dèbil pot fer fallar l'alta. Si passa, tria'n una de més llarga i complexa.
- La neteja de la prova: `sudo userdel -r nom` (Linux) i `Remove-LocalUser -Name nom` (Windows; la carpeta de perfil s'esborra a part).

## 3. Script de monitoratge del disc

Un monitoratge simple: calcular quin percentatge del disc està ple i avisar si passa d'un **llindar** (aquí, el 80 %). Tant en Bash com en PowerShell, este script **anota cada comprovació** en un fitxer de registre, perquè les tasques programades no tenen pantalla i, si no ho escrius, no et pots assabentar de res.

```bash
#!/bin/bash
# comprovar_disc.sh · registra l'ús del disc i avisa si passa del llindar
# Ús: ./comprovar_disc.sh [llindar]   (80 per defecte)
llindar=${1:-80}
registre="$HOME/disc.log"
us=$(df -P / | tail -1 | awk '{print $5}' | tr -d '%')
data=$(date '+%Y-%m-%d %H:%M')
echo "$data · disc al $us%" >> "$registre"
if [ "$us" -gt "$llindar" ]; then
  echo "$data · AVÍS: el disc supera el $llindar%" | tee -a "$registre"
fi
```

```powershell
# ComprovarDisc.ps1 · registra l'ús del disc i avisa si passa del llindar
param([int]$Llindar = 80)
$registre = Join-Path $env:USERPROFILE "disc.log"
$disc = Get-PSDrive C
$us = [math]::Round($disc.Used / ($disc.Used + $disc.Free) * 100)
$data = Get-Date -Format "yyyy-MM-dd HH:mm"
Add-Content -Path $registre -Value "$data · disc al $us%"
if ($us -gt $Llindar) {
    Write-Host "AVÍS: el disc supera el $Llindar%"
    Add-Content -Path $registre -Value "$data · AVÍS: el disc supera el $Llindar%"
}
```

Com funciona la línia que obté el percentatge en Bash: `df -P /` mostra l'ús de l'arrel (el `-P` evita que una línia llarga es partisca en dues), `tail -1` es queda amb l'última línia, `awk '{print $5}'` n'agafa la cinquena columna (per exemple `42%`) i `tr -d '%'` lleva el símbol. `${1:-80}` significa «el primer paràmetre, o 80 si no hi ha cap». Al laboratori pots seguir este script línia a línia (pestanya «Traçador», script «Comprovar disc»).

:::caution[Accents en els scripts de PowerShell]
Windows PowerShell 5.1 llegix com a ANSI un `.ps1` guardat en UTF-8 **sense BOM**, i `AVÍS` pot eixir amb caràcters estranys. Desa'l com a **«UTF-8 amb BOM»** (en el Bloc de notes: *Anomena i desa → Codificació*) o evita els accents en els missatges.
:::

## 4. Programar tasques en Linux: cron

De poc serveix tindre scripts útils si cal recordar-se d'executar-los. **cron** és el planificador de Linux: un servei (`cron`) que cada minut mira les llistes de tasques programades (els *crontabs*) i llança les que toquen. Cada usuari té el seu, que s'edita amb `crontab -e`. Cada línia té **cinc camps de temps** i l'ordre:

```text
┌──────── minut (0-59)
│ ┌────── hora (0-23)
│ │ ┌──── dia del mes (1-31)
│ │ │ ┌── mes (1-12)
│ │ │ │ ┌ dia de la setmana (0-7; 0 i 7 = diumenge)
│ │ │ │ │
* * * * *  ordre_a_executar
```

| Línia de crontab | Quan s'executa |
|---|---|
| `30 2 * * *` | Cada dia a les 02:30 |
| `0 * * * *` | Cada hora en punt |
| `*/5 * * * *` | Cada 5 minuts |
| `0 9 * * 1` | Cada dilluns a les 9:00 |
| `0 8 * * 1-5` | De dilluns a divendres a les 8:00 |
| `0 0 1 * *` | El dia 1 de cada mes, a mitjanit |

`*` és «qualsevol valor», `,` separa valors (`1,15`), `-` indica un interval (`1-5`) i `/` un pas (`*/5`). Per a la pràctica de classe, la línia és:

```text
*/5 * * * * /home/usuari/comprovar_disc.sh >> /home/usuari/cron.log 2>&1
```

Ordres útils:

```bash
crontab -e       # editar les teues tasques
crontab -l       # llistar-les
systemctl status cron                 # el servei està actiu? (en Fedora i derivades es diu crond)
cat ~/disc.log                        # el registre del nostre script
grep CRON /var/log/syslog | tail      # el que ha llançat cron (Debian i Ubuntu)
```

Errors típics amb cron:

- **Rutes absolutes.** cron s'executa amb un entorn mínim i una carpeta de treball que no és la teua: escriu `/home/usuari/comprovar_disc.sh`, no `./comprovar_disc.sh`. L'script ha de tindre permís d'execució.
- **El `%` en un crontab.** En una línia de crontab el `%` té un significat especial i s'ha d'escriure `\%`. Per això posem el `date +%Y-%m-%d` **dins de l'script** i no en la línia de cron.
- **Eixida perduda.** Si no redirigeixes l'eixida (`>> fitxer 2>&1`), cron intenta enviar-la per correu local. Registra-ho tot.
- **`crontab -r` esborra tot el crontab** sense preguntar. Per a llevar una tasca, edita i esborra la línia.

Per a una execució **única** hi ha `at`: `echo "/home/usuari/backup.sh /home/usuari/documents /home/usuari/backups" | at 02:30` (cal el paquet `at`; `atq` llista les pendents).

## 5. Programar tasques en Windows: el Programador de tasques

El **Programador de tasques** (*Task Scheduler*, `taskschd.msc`) fa la mateixa funció amb una interfície gràfica. Una tasca té dues peces essencials:

- el **desencadenador** (*trigger*): **quan** s'executa (a una hora, en iniciar sessió, cada cert temps…);
- l'**acció**: **què** s'executa.

Per a una tasca en la interfície gràfica: *Crea una tasca…* → pestanya **Desencadenadors** → *Nou…* (aquí s'indica «Repeteix la tasca cada: 5 minuts» per a la de classe) → pestanya **Accions** → *Nova…* → acció «Inicia un programa», amb:

- **Programa o script:** `powershell.exe`
- **Afig arguments:** `-NoProfile -ExecutionPolicy Bypass -File "C:\Scripts\ComprovarDisc.ps1"`

Per línia d'ordres, des de CMD o PowerShell, amb `schtasks`:

```text
schtasks /create /tn "BackupDiari" /tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\Backup.ps1 -Origen C:\Dades -Desti D:\Backups" /sc daily /st 02:30
schtasks /create /tn "ComprovarDisc" /tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\ComprovarDisc.ps1" /sc minute /mo 5
schtasks /query /tn "ComprovarDisc" /v /fo list
schtasks /run /tn "ComprovarDisc"
schtasks /delete /tn "ComprovarDisc" /f
```

:::caution[No programes el .ps1 directament]
`/tr "C:\Scripts\Backup.ps1"` **no executa l'script**: Windows el tracta com un document i l'obri amb l'aplicació associada (per defecte, un editor). L'acció ha de ser **`powershell.exe` amb `-File`**, i, com que la política d'execució pot bloquejar-lo, es posa `-ExecutionPolicy Bypass` només per a esta tasca. Si la ruta del script té espais, cal escapar les cometes: `/tr "powershell.exe -File \"C:\Mis Scripts\x.ps1\""`.
:::

Una tasca creada amb el teu usuari només s'executa mentre tens la sessió iniciada, i en un portàtil, per defecte, no s'executa amb bateria (pestanya *Condicions*). Per a tasques de sistema es pot usar `/ru SYSTEM`, però exigix una consola d'administrador.

### Dos mons, la mateixa idea

| | Linux | Windows |
|---|---|---|
| Planificador | `cron` (servei) | Programador de tasques |
| On es defineix | `crontab -e` | Interfície gràfica o `schtasks` |
| «Quan» | Els 5 camps | Desencadenador |
| «Què» | L'ordre de la línia | Acció |
| Cada 5 minuts | `*/5 * * * *` | `/sc minute /mo 5` |
| Cada dia a les 2:30 | `30 2 * * *` | `/sc daily /st 02:30` |
| On mirar el resultat | El teu registre (`>> fitxer 2>&1`) | El teu registre; i *Historial* de la tasca |
| Executar una vegada | `at` | `/sc once` |

## 6. Què faràs a la presencial

Individualment, en el sistema que tinga assignat el teu equip (o en els dos, si dona temps):

1. Escriure i provar l'script de **còpia de seguretat** sobre una carpeta de prova.
2. Escriure i provar l'script d'**alta massiva** de 5 usuaris a partir d'un fitxer de text.
3. Escriure i provar l'script de **comprovació del disc**.
4. **Programar** la comprovació cada 5 minuts i verificar en el registre que s'ha executat sola almenys dues vegades.
5. **Documentar** amb captures i una reflexió breu. Es lliura en Aules abans d'acabar la classe.

Els detalls de l'entrega són a l'[activitat 7](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/).

## Comprova el que has après

1. Per què un script de còpia posa la data en el nom del fitxer?

   <details>
   <summary>Resposta</summary>

   Perquè cada execució genere un fitxer diferent. Sense la data, la còpia d'avui sobreescriuria la d'ahir i només tindries la més recent.

   </details>

2. Has escrit `schtasks /create /tn "Copia" /tr "C:\Scripts\Backup.ps1" /sc daily /st 02:30`. La tasca s'executa però no fa res. Per què, i com es corregix?

   <details>
   <summary>Resposta</summary>

   Perquè Windows obri el `.ps1` amb l'aplicació associada en lloc d'executar-lo amb PowerShell. S'ha de posar `/tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Scripts\Backup.ps1"`.

   </details>

3. Escriu la línia de crontab que executa `/home/ana/neteja.sh` de dilluns a divendres a les 7:30.

   <details>
   <summary>Resposta</summary>

   `30 7 * * 1-5 /home/ana/neteja.sh`

   </details>

4. Un script de PowerShell fa `New-LocalUser -Name $nom` dins d'un bucle i es queda parat esperant. Què passa?

   <details>
   <summary>Resposta</summary>

   `New-LocalUser` necessita `-Password` (un `SecureString`, per exemple amb `Read-Host -AsSecureString`) o `-NoPassword`. Sense cap dels dos, el cmdlet demana la contrasenya per teclat. A més, cal una consola d'administrador.

   </details>

5. Una tasca de cron funciona si l'executes a mà, però no quan la programa cron. Digues dues causes probables.

   <details>
   <summary>Resposta</summary>

   Rutes relatives (cron no executa des de la teua carpeta ni amb el teu `PATH` complet) i falta de permís d'execució en l'script. També pot ser un `%` sense escapar en la línia de crontab.

   </details>

## Glossari

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
