---
title: "4. Informació del sistema, còpies i utilitats"
description: "L'estructura de directoris de Linux i de Windows, com localitzar informació amb eines gràfiques i amb find, locate i Get-ChildItem, com restaurar una còpia i les utilitats de gestió de la informació (compressors, du, df, rsync i robocopy)."
---

Un administrador no només automatitza: també **sap on és cada cosa**, **troba** el que li demanen, **assegura** que les dades es puguen recuperar i **mesura** l'espai que ocupen. Esta pàgina completa la unitat amb eixa part de gestió de la informació: l'estructura de carpetes dels sistemes, les cerques, la restauració de còpies i les utilitats que s'usen cada dia.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 90 de pràctica. Es recomana llegir-la **després de la presencial**, quan ja has creat una còpia amb el teu script.

1. Llig la secció 1 amb una terminal oberta i **recorre les carpetes** que es mencionen (`ls /`, `ls /etc`…).
2. Prova les ordres de cerca (secció 2) sobre carpetes de la teua màquina virtual.
3. La secció 3 (restaurar) és la més important: una còpia que no s'ha provat de restaurar no és una còpia fiable.
4. Fes l'[activitat 6](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/).
:::

## 1. Estructura de directoris

### Linux: la jerarquia estàndard (FHS)

En Linux no hi ha unitats com `C:`: tot penja d'un únic arbre que naix en l'**arrel** (`/`). La *Filesystem Hierarchy Standard* (FHS) fixa què va a cada carpeta, de manera que totes les distribucions s'assemblen.

| Directori | Què conté |
|---|---|
| `/` | L'arrel de tot l'arbre |
| `/bin`, `/sbin` | Ordres bàsiques i d'administració (en les distribucions modernes són enllaços a `/usr/bin` i `/usr/sbin`) |
| `/boot` | El nucli (*kernel*) i els fitxers de l'arrencada (GRUB) |
| `/dev` | Els dispositius com a fitxers: `/dev/sda` (disc), `/dev/null` (el «forat negre») |
| `/etc` | **Configuració** del sistema i dels serveis, en fitxers de text: `/etc/passwd`, `/etc/fstab` |
| `/home` | Les carpetes personals dels usuaris (`/home/ana`) |
| `/root` | La carpeta personal de l'administrador (`root`) |
| `/lib`, `/lib64` | Biblioteques que necessiten els programes |
| `/media`, `/mnt` | On es munten els pendrives i discs (`/media`, automàticament) o les unitats que muntes a mà (`/mnt`) |
| `/opt` | Programari addicional de tercers |
| `/proc`, `/sys` | Sistemes de fitxers **virtuals**: informació del nucli i dels processos en directe |
| `/run` | Dades de l'execució actual (desapareixen en reiniciar) |
| `/srv` | Dades que servixen els serveis (web, FTP…) |
| `/tmp` | Fitxers temporals |
| `/usr` | La majoria dels programes i biblioteques; `/usr/local` és per al que instal·la l'administrador |
| `/var` | Dades que **varien**: logs (`/var/log`), cues, bases de dades, webs (`/var/www`) |

Les rutes poden ser **absolutes** (comencen per `/` i valen des de qualsevol lloc: `/etc/passwd`) o **relatives** (compten des d'on estàs: `documents/nota.txt`). `.` és la carpeta actual, `..` la pare i `~` la teua carpeta personal. **Linux distingix majúscules**: `Nota.txt` i `nota.txt` són fitxers diferents.

### Windows: unitats i carpetes de sempre

Windows organitza el disc en **unitats** (`C:`, `D:`…), cada una amb el seu arbre. Separa les carpetes amb `\` i no distingix majúscules.

| Carpeta | Què conté |
|---|---|
| `C:\Windows` | El sistema operatiu; `C:\Windows\System32` guarda els executables i biblioteques del sistema |
| `C:\Program Files` | Programes de 64 bits |
| `C:\Program Files (x86)` | Programes de 32 bits |
| `C:\Users\<usuari>` | El **perfil** de cada usuari: `Desktop`, `Documents`, `Downloads`, `AppData`… |
| `C:\Users\<usuari>\AppData` | Configuració i dades dels programes de cada usuari (carpeta oculta) |
| `C:\ProgramData` | Dades de programes comunes a tots els usuaris (carpeta oculta) |
| `C:\Users\Public` | Carpetes compartides entre els usuaris de l'equip |

Les **variables d'entorn** eviten escriure rutes fixes: `%USERPROFILE%` (CMD) o `$env:USERPROFILE` (PowerShell) val `C:\Users\<usuari>`, i també hi ha `%APPDATA%`, `%TEMP%`, `%SystemRoot%` i `%ProgramFiles%`.

### Moure's per l'arbre

| Tasca | Bash | PowerShell |
|---|---|---|
| On sóc | `pwd` | `Get-Location` (`pwd`) |
| Canviar de carpeta | `cd /etc` | `Set-Location C:\Windows` (`cd`) |
| Llistar | `ls -l` | `Get-ChildItem` (`ls`, `dir`) |
| Crear carpeta | `mkdir proves` | `New-Item -ItemType Directory proves` |
| Copiar / moure / esborrar | `cp`, `mv`, `rm` | `Copy-Item`, `Move-Item`, `Remove-Item` |
| Veure l'arbre | `tree` (cal instal·lar-lo) | `tree` |

## 2. Localitzar informació

### Eines gràfiques

- **Windows:** el quadre de cerca de l'Explorador de fitxers (dins d'una carpeta) i la cerca de Windows (tecla Windows). Admeten filtres per tipus, data i mida, i funcionen sobre un **índex**: les carpetes no indexades es troben més a poc a poc.
- **Linux (GNOME Files, Dolphin…):** la lupa o Ctrl + F dins d'una carpeta; es pot filtrar per tipus i per data de modificació.

Són còmodes, però no es poden **automatitzar** ni executar en un servidor sense escriptori. Per això hi ha les ordres.

### Ordres en Linux: find, locate i grep

`find` recorre l'arbre en directe, amb qualsevol criteri:

```bash
find /var/log -name "*.log"              # per nom
find ~ -type f -iname "*.pdf"            # només fitxers, sense distingir majúscules
find /home -type f -size +100M           # fitxers de més de 100 MB
find ~/documents -type f -mtime -7       # modificats en els últims 7 dies
find /tmp -name "*.tmp" -type f          # revisa-ho ABANS d'afegir -delete
```

`locate` no recorre el disc: consulta una **base de dades** d'índexs que es refresca amb `sudo updatedb`. És instantani, però pot estar desfasat (i pot caldre instal·lar-lo: `sudo apt install plocate`). Altres cercadors d'ordres: `which ls` (on és l'executable) i `whereis`.

Per a buscar **dins** dels fitxers: `grep -r "paraula" /etc 2>/dev/null` (el `2>/dev/null` amaga els errors de permís).

### Ordres en Windows

```powershell
Get-ChildItem C:\Users -Recurse -Filter *.pdf -ErrorAction SilentlyContinue
Get-ChildItem C:\Dades -Recurse -File | Where-Object { $_.Length -gt 100MB }
Get-ChildItem C:\Dades -Recurse -File | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }
Get-ChildItem C:\Dades -Recurse -File | Select-String "paraula"
Get-Command notepad                       # on és un programa
```

I, en CMD clàssic: `dir /s /b *.pdf`.

:::caution[Compte amb -delete]
`find … -delete` i `Remove-Item` **no tenen paperera**. Executa primer la cerca sola, mira la llista que dóna i només aleshores afig l'esborrat.
:::

## 3. Còpies de seguretat i restauració

### Estratègies

| Tipus | Què copia | Espai | Restaurar |
|---|---|---|---|
| **Completa** | Tot, cada vegada | El màxim | Ràpid: un sol conjunt |
| **Incremental** | Només el que ha canviat des de l'**última còpia** (de qualsevol tipus) | El mínim | Lent: cal la completa i totes les incrementals |
| **Diferencial** | Tot el que ha canviat des de l'última **completa** | Mitjà | Mitjà: la completa i l'última diferencial |

Una regla simple per a començar és **3-2-1**: tres còpies de les dades, en dos suports diferents i una d'elles fora de l'equip o de l'edifici. Les estratègies es treballaran amb més detall en la unitat de seguretat.

### Restaurar és la part que importa

Ja saps fer la còpia (pàgina 3). Ara, la restauració. Suposem que `backup.sh` va crear `/backups/backup_2026-11-24.tar.gz` a partir de `/home/ana/documents`:

```bash
tar -tzf /backups/backup_2026-11-24.tar.gz | head          # veure què conté (t = llistar)
mkdir -p /tmp/restauracio
tar -xzf /backups/backup_2026-11-24.tar.gz -C /tmp/restauracio    # restaurar-ho tot (x = extraure)
tar -xzf /backups/backup_2026-11-24.tar.gz -C /tmp/restauracio home/ana/documents/nota.txt   # un sol fitxer
diff -r /home/ana/documents /tmp/restauracio/home/ana/documents  # compara original i restaurat
```

Dos detalls: dins de l'arxiu les rutes han perdut la barra inicial (`home/ana/documents/…`), i `-C` indica la carpeta on es desempaqueta. **Restaura primer en una carpeta de prova**, no damunt de l'original: si restaures damunt, sobreescrius el que tens.

Per a saber si el fitxer de còpia s'ha malmés, es calcula una **suma de verificació** (*hash*) quan es crea i es torna a calcular quan es vol usar:

```bash
sha256sum backup_2026-11-24.tar.gz > sumes.sha256     # en crear la còpia
sha256sum -c sumes.sha256                             # després: «OK» o «FAILED»
```

```powershell
Expand-Archive -Path D:\Backups\backup_2026-11-24.zip -DestinationPath C:\Restauracio
Get-FileHash D:\Backups\backup_2026-11-24.zip -Algorithm SHA256
```

`Expand-Archive` també admet `-Force`, que sobreescriu els fitxers que ja existixen en el destí. Windows té, a més, les seues pròpies eines de còpia (Historial de fitxers, còpia de seguretat de Windows, segons la versió) i en Linux, per exemple, Déjà Dup en GNOME: són l'equivalent gràfic de l'script, i convé saber que existixen.

:::note[Una còpia que no s'ha provat no és una còpia]
La prova de veritat és **restaurar** en una carpeta de prova i comprovar que tot hi és i que els fitxers es poden obrir. Planifica-ho com una tasca més, per exemple un cop al mes.
:::

## 4. Utilitats de gestió de la informació

### Compressors

Comprimir estalvia espai i fa que un conjunt de fitxers viatge com un de sol. **Empaquetar** (`tar`: reunir molts fitxers en un) i **comprimir** (`gzip`, `xz`: fer-lo menys gran) són dos passos diferents; per això el `.tar.gz`.

| Eina | Extensió | Característiques |
|---|---|---|
| `gzip` | `.gz` (`.tar.gz`) | Ràpid i amb compressió acceptable. És el més estés en Linux |
| `bzip2` | `.bz2` | Comprimix més, més lent |
| `xz` | `.xz` (`.tar.xz`) | La millor compressió, la més lenta |
| `zip` | `.zip` | Universal: s'obri en tots els sistemes |
| 7-Zip | `.7z` i molts més | Alta compressió, programari lliure, també per a Windows |

```bash
tar -czf carpeta.tar.gz carpeta     # empaqueta + gzip
tar -cJf carpeta.tar.xz carpeta     # empaqueta + xz
zip -r carpeta.zip carpeta          # zip  (unzip carpeta.zip -d destí)
gzip -k fitxer                      # comprimix i conserva l'original (-k)
```

### Mesurar l'espai: df i du

```bash
df -h                          # espai lliure i ocupat de cada partició
df -hT /                       # amb el tipus de sistema d'arxius
du -sh ~/documents             # mida total d'una carpeta
du -h --max-depth=1 /var | sort -h    # què ocupa més dins de /var
```

```powershell
Get-PSDrive -PSProvider FileSystem                    # unitats i espai lliure
Get-Volume                                            # volums, sistema d'arxius i mida
(Get-ChildItem C:\Dades -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB   # MB d'una carpeta
```

`df` mira la **partició** sencera i `du` suma el que ocupa una **carpeta**; no han de coincidir exactament. `ncdu` (cal instal·lar-lo) ho mostra de manera interactiva.

### Copiar bé: rsync i robocopy

Per a copiar grans quantitats, `cp` i l'Explorador no són l'eina. `rsync` (Linux) i `robocopy` (Windows) només copien el que ha canviat i es poden repetir cada nit.

```bash
rsync -av --dry-run /home/ana/documents/ /backups/documents/   # simula, no copia
rsync -av /home/ana/documents/ /backups/documents/              # copia
rsync -av --delete /home/ana/documents/ /backups/documents/     # i esborra del destí el que ja no existix a l'origen
rsync -av -e ssh /dades/ usuari@servidor:/backups/dades/        # a un altre equip per SSH
```

La barra final de l'origen importa: `documents/` copia el **contingut**; `documents` (sense barra) copia la **carpeta** dins del destí. `-a` conserva permisos i dates, `-v` explica què fa.

```text
robocopy C:\Dades D:\Backups\Dades /E /R:1 /W:1
```

`/E` inclou subcarpetes (també buides); `/R:1 /W:1` limita els reintents. No uses `/MIR` sense pensar: **esborra** del destí el que no hi haja a l'origen. **Els codis d'eixida de `robocopy` són especials:** del 0 al 7 són èxit (amb diferents combinacions de «s'han copiat fitxers» o «hi havia fitxers de més»); el **8 o més** indica errors. Un script que mire `$LASTEXITCODE -eq 0` consideraria fallida una còpia perfectament bona.

`Clonezilla` és una altra utilitat, de naturalesa diferent: es fa arrancar des d'un USB i **clona un disc o una partició** a una imatge (útil per a replicar un aula). No es programa amb scripts.

### Instal·lar i avaluar una utilitat

Per a instal·lar-les: `sudo apt install rsync ncdu` (i `p7zip-full`, o `7zip` en versions noves), o `winget install 7zip.7zip` en Windows. Per a decidir si una utilitat et convé, avalua-la amb criteris i amb una prova:

- **Funcionalitat:** fa el que necessites (copiar, comprimir, xifrar, restaurar)?
- **Rendiment:** quant tarda i quant espai estalvia? (`time ordre` en Linux, `Measure-Command { … }` en PowerShell, i la mida del fitxer resultant.)
- **Fiabilitat:** pots restaurar el que has copiat?
- **Compatibilitat i llicència:** funciona on la necessites i pots usar-la legalment?
- **Manteniment i documentació:** s'actualitza i té ajuda?

L'activitat 6 et proposa comparar compressors amb este mètode.

## Comprova el que has après

1. En quin directori de Linux esperaries trobar els logs del sistema, i en quin la configuració?

   <details>
   <summary>Resposta</summary>

   Els logs, a `/var/log`; la configuració, a `/etc`.

   </details>

2. Quina diferència hi ha entre `/media` i `/mnt`?

   <details>
   <summary>Resposta</summary>

   `/media` és on el sistema munta automàticament els suports extraïbles (pendrives, discs); `/mnt` és un punt de muntatge per a muntatges manuals i temporals.

   </details>

3. Vols trobar tots els fitxers `.log` de `/var/log` modificats en l'última setmana. Quina ordre uses?

   <details>
   <summary>Resposta</summary>

   `find /var/log -name "*.log" -mtime -7`. En PowerShell, `Get-ChildItem C:\ruta -Recurse -Filter *.log | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }`.

   </details>

4. Has fet `tar -czf backup.tar.gz /home/ana/documents`. Com comproves què conté i com recuperes només `nota.txt` en `/tmp/prova`?

   <details>
   <summary>Resposta</summary>

   Per a llistar: `tar -tzf backup.tar.gz`. Per a extraure un fitxer: `tar -xzf backup.tar.gz -C /tmp/prova home/ana/documents/nota.txt` (la ruta dins de l'arxiu no du la barra inicial).

   </details>

5. Un script de PowerShell comprova `if ($LASTEXITCODE -ne 0)` després d'un `robocopy`, i diu «ha fallat» encara que s'hagen copiat tots els fitxers. Per què?

   <details>
   <summary>Resposta</summary>

   Perquè `robocopy` torna codis del 0 al 7 per a èxits (el 1 significa «s'han copiat fitxers»). Només un codi igual o major que 8 indica error: la condició correcta és `$LASTEXITCODE -ge 8`.

   </details>

## Glossari

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
