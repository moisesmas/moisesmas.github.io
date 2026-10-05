---
title: "Activitats"
description: "Set activitats de la unitat 3: sis d'estudi autònom en Bash i PowerShell (amb el laboratori) i la pràctica presencial d'scripts d'automatització i tasca programada."
---

Estes són les activitats de la unitat. Les sis primeres les fas pel teu compte, amb dificultat creixent, i la setena és la de la **sessió presencial del 24 de novembre**. Pots veure quan fer cada una en la [planificació](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/planificacion/).

Pel que fa als sistemes: necessites una màquina **Linux** (la de la unitat 2 val) i un **Windows amb PowerShell**. Si en un moment determinat només tens un dels dos, fes l'activitat en eixe i completa l'altre quan puges; la sessió presencial es fa en el sistema que tingues assignat. Treballa **sempre en màquines de proves**.

Totes es **lliuren en Aules**, en la tasca corresponent, en un únic document (PDF, ODT o DOCX) amb el teu nom, més els scripts quan es demanen. No cal copiar els enunciats: numera les respostes. Els codis d'ordres i els scripts es copien com a text, no com a captura, tret que es demane una captura.

## Activitat 1 · El teu primer script

**Objectiu:** crear i executar un script en Bash i en PowerShell, i veure amb els teus ulls què fan els permisos, la política d'execució i les cometes.

**Què has de fer:**

1. Repassa les pestanyes «Executar un script» i «Cometes i expansió» del [laboratori «Traçador d'scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/).
2. En Linux, crea `presentacio.sh` amb shebang. Ha de guardar el teu nom en `nom`, el cicle en `cicle` i els anys d'edat en `anys`, i mostrar tres línies: una frase amb les tres variables entre cometes dobles, la mateixa frase entre cometes simples i una tercera que incloga la data d'avui obtinguda amb `$(date +%F)`.
3. Executa-la **abans** de donar-li permís d'execució i fes una captura de l'error. Després dona-li el permís i torna a executar-la.
4. En Windows, crea `presentacio.ps1` amb el mateix contingut (les tres variables, la frase entre cometes dobles i simples, i la data amb `Get-Date`). Si la política d'execució et bloqueja, fes una captura del missatge i corregix-ho amb l'ordre que **no exigix ser administrador**.
5. Respon: (a) Per què la frase entre cometes simples no mostra el valor de les variables? (b) Per què cal escriure `./presentacio.sh` i no només `presentacio.sh`? (c) Què hauria passat en Bash si haguessis escrit `anys = 17`?

**Què entregues:** els dos scripts, les captures de l'error de permís (Linux) i del bloqueig de la política (Windows, si ha passat) i les respostes a (a), (b) i (c), en la tasca «Activitat 1» d'Aules.

**Criteris que treballa:** RA3.f

**Dificultat:** ★☆☆ · **Temps estimat:** 40 minuts

## Activitat 2 · Traça a mà

**Objectiu:** predir què fa un script abans d'executar-lo, línia a línia, seguint les variables i els codis d'eixida.

**Què has de fer:**

1. Obri la pestanya «Traçador» del laboratori. Executa l'script «Nota» amb els paràmetres `10`, `7` i `3`, i anota per a cada cas quina branca de l'`if` se segueix. Executa «Suma» i anota, per a cada volta, el valor de `i` i de `suma`.
2. Ara fes els següents **sense executar-los**: construeix una taula amb una fila per línia executada i les columnes *línia*, *variables després de la línia*, *eixida per pantalla* i `$?`.

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

   **Script B**, executat dues vegades en Linux: `./b.sh /etc` i `./b.sh /carpeta_que_no_existix`

   ```bash
   #!/bin/bash
   fitxer=$1
   ls "$fitxer" > /dev/null 2>&1
   codi=$?
   echo "ls ha tornat $codi"
   if [ $codi -ne 0 ]; then
     echo "No es pot llistar"
     exit 4
   fi
   echo "Tot bé"
   ```

   **Script C** (repte)

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

3. Executa els tres scripts de debò i compara amb la teua taula. Si alguna cosa no coincideix, explica per què t'has equivocat.
4. Respon: en l'script B, quin codi d'eixida té l'script en cada execució (el que tornaria `echo $?` en acabar)?

**Què entregues:** les tres taules i les respostes de l'apartat 4, en la tasca «Activitat 2» d'Aules. Pots escriure-les a mà i fotografiar-les.

**Criteris que treballa:** RA3.f

**Dificultat:** ★☆☆ · **Temps estimat:** 45 minuts

## Activitat 3 · Troba els errors

**Objectiu:** reconéixer i corregir els errors més freqüents en scripts de Bash i de PowerShell.

**Què has de fer:**

1. Practica les cinc primeres propostes de la pestanya «Troba l'error» del laboratori.
2. Este script de Bash ha de comptar els fitxers `.txt` d'una carpeta i, si es demana, mostrar-los. Té **cinc errors**. Troba'ls tots, escriu en quina línia és cada un i per què falla, i entrega la versió corregida.

   ```bash
   #!/bin/bash
   # resum.sh · compta els fitxers .txt d'una carpeta
   # Ús: ./resum.sh <carpeta> [detall]
   carpeta = $1
   mode=$2
   if [ ! -d $carpeta ]; then
     echo "No existeix la carpeta" >&2
     exit 2
   fi
   total=0
   for f in "$carpeta"/*.txt; do
     total=$((total + 1))
     if [ "$mode" -eq "detall" ]; then
       echo "Fitxer: $f"
     fi
   echo "Total: $total" > resum.log
   ```

   Prova la teua versió amb una carpeta que tinga un espai en el nom (`mkdir "Mis documents"`) i també amb una carpeta que no tinga cap fitxer `.txt`.
3. Este fragment de PowerShell té **tres problemes**. Explica'ls i corregix-los:

   ```powershell
   param([string]$Carpeta, [int]$Minim = 5)
   $total = (Get-ChildItem $Carpeta -Filter *.txt).Count
   if ($total > $Minim) {
       Write-Host "Hi ha prou fitxers: " + $total
   }
   ```
4. Cada un d'estos tres fragments falla per un motiu diferent. Explica per què i escriu la versió que funciona:
   - `useradd -m ana` executat per un usuari normal.
   - `New-LocalUser -Name "ana"` dins d'un bucle que dona d'alta cinc usuaris (explica què fa i què s'ha d'afegir).
   - `schtasks /create /tn "Neteja" /tr "C:\Scripts\Neteja.ps1" /sc daily /st 03:00`

**Què entregues:** un document amb les errades trobades (línia, motiu i correcció) i els scripts corregits, en la tasca «Activitat 3» d'Aules.

**Criteris que treballa:** RA3.f

**Dificultat:** ★★☆ · **Temps estimat:** 50 minuts

## Activitat 4 · Un script amb paràmetres i validacions

**Objectiu:** escriure un script reutilitzable que rep dades de fora, les valida i informa del resultat amb codis d'eixida.

**Què has de fer:**

1. Escriu `info.sh` (Bash) i `Info.ps1` (PowerShell). Han de rebre una ruta com a paràmetre i comportar-se així:
   - Si **no hi ha cap paràmetre**: mostrar com s'usa i acabar amb codi `1`.
   - Si la ruta **no existix**: mostrar un missatge d'error (a l'eixida d'errors) i acabar amb codi `2`.
   - Si és un **fitxer**: mostrar la mida en bytes, el nombre de línies i el nombre de paraules.
   - Si és una **carpeta**: mostrar quantes entrades té i la mida total aproximada.
   - En els dos casos correctes, acabar amb codi `0`.
2. Prova'ls amb quatre casos: sense paràmetre, amb una ruta inexistent, amb un fitxer de text i amb una carpeta.
3. Després de cada execució, mostra el codi d'eixida (`echo $?` en Bash; `$LASTEXITCODE` en PowerShell, després d'executar l'script).
4. Pista de laboratori: la pestanya «Condicions» t'ajuda amb `-f` i `-d`, i «Paràmetres i read» amb `$#` i `$1`.
5. Afig una **opció**: si hi ha un segon paràmetre `-v`, mostra a més la data de l'última modificació.

**Què entregues:** els dos scripts i una captura per cada un dels quatre casos amb el codi d'eixida visible, en la tasca «Activitat 4» d'Aules.

**Criteris que treballa:** RA3.c, RA3.f

**Dificultat:** ★★☆ · **Temps estimat:** 60 minuts

## Activitat 5 · Analitza un log

**Objectiu:** extraure informació d'un fitxer de text amb ordres de filtratge i canonades, i convertir-la en un script.

**Què has de fer:**

1. Guarda este log com a `servei.log` (còpia i apega el text):

   ```text
   2026-11-17 08:58:02 INFO Servei iniciat
   2026-11-17 09:01:12 INFO Connexió de ana
   2026-11-17 09:03:40 ERROR No es pot connectar a la base de dades
   2026-11-17 09:03:41 WARN Reintentant connexió
   2026-11-17 09:03:45 INFO Connexió restablida
   2026-11-17 09:15:20 INFO Connexió de luis
   2026-11-17 09:47:09 WARN Disc al 85%
   2026-11-17 10:02:31 ERROR Fitxer de configuració no trobat
   2026-11-17 10:02:32 INFO S'usa la configuració per defecte
   2026-11-17 10:20:00 INFO Connexió de marta
   2026-11-17 10:41:55 ERROR Temps d'espera esgotat
   2026-11-17 10:41:56 WARN Reintentant connexió
   2026-11-17 10:41:59 INFO Connexió restablida
   2026-11-17 11:05:13 INFO Connexió de ana
   2026-11-17 11:30:48 WARN Disc al 88%
   2026-11-17 11:59:10 ERROR Disc ple
   2026-11-17 12:00:00 INFO Servei aturat
   ```

2. Amb **una ordre o canonada** per a cada apartat, en Bash i en PowerShell (en PowerShell, si els accents ixen malament, afig `-Encoding UTF8` a `Get-Content`):
   - **a)** Quantes línies d'`ERROR` hi ha?
   - **b)** Mostra totes les línies que **no** són `INFO`.
   - **c)** Quantes línies hi ha de cada nivell (`INFO`, `WARN`, `ERROR`), de més a menys?
   - **d)** Mostra les dues últimes línies d'error.
   - **e)** Mostra només el **missatge** (el text després del nivell) del primer error.
   - **f)** Quantes línies hi ha per cada hora del dia?
3. Escriu un script (`informe_log.sh` / `InformeLog.ps1`) que reba el fitxer i un nivell opcional (per defecte `ERROR`), comprove que el fitxer existix i escriga en `informe.txt` el nivell, quantes línies hi ha i les tres últimes.
4. Respon: per què, en Bash, `grep error servei.log` no troba cap línia i en PowerShell `Select-String error servei.log` sí?

**Què entregues:** un document amb les ordres de l'apartat 2 (una per apartat i per shell), l'eixida de cada una i els dos scripts de l'apartat 3, més la resposta a la pregunta 4, en la tasca «Activitat 5» d'Aules.

**Criteris que treballa:** RA3.c, RA3.f

**Dificultat:** ★★☆ · **Temps estimat:** 60 minuts

## Activitat 6 · Còpia, restauració i compressors

**Objectiu:** orientar-te per l'estructura de directoris, localitzar informació, restaurar una còpia comprovant-la i avaluar utilitats de gestió de la informació.

**Què has de fer:**

1. **Estructura de directoris.** Fes una taula amb la ruta (en Linux i en Windows) on trobaries: la configuració del sistema, els registres (logs), els programes instal·lats, la carpeta personal d'un usuari, els fitxers temporals i els dispositius. Comprova en la teua màquina que existixen.
2. **Dades de prova.** Crea les carpetes i uns fitxers: en Linux, `mkdir -p ~/proves/dades/text` i `for i in $(seq 1 20); do seq 1 20000 > ~/proves/dades/text/fitxer$i.txt; done`. En Windows: `New-Item -ItemType Directory -Force "$env:USERPROFILE\proves\dades\text" | Out-Null` i `1..20 | ForEach-Object { 1..20000 | Set-Content "$env:USERPROFILE\proves\dades\text\fitxer$_.txt" }`.
3. **Localitzar.** Amb `find` / `Get-ChildItem`, llista els fitxers de la carpeta de més de 50 KB. Calcula la mida total amb `du -sh` o amb `Measure-Object`.
4. **Comprimir i comparar.** Comprimix la carpeta `dades` amb tres formats (en Linux: `tar.gz`, `tar.xz` i `zip`; en Windows: `zip` amb `Compress-Archive` i, si ho instal·les amb `winget install 7zip.7zip`, `7z`). Mesura per a cada format la **mida** i el **temps** (`time` en Linux, `Measure-Command` en PowerShell) i presenta una taula. Conclou quin triaries per a una còpia diària i per a un arxiu que només es guardarà.
5. **Restaurar i verificar.** Restaura una de les còpies en una carpeta **diferent** de l'original i comprova que és idèntica (`diff -r` en Linux; comparant `Get-FileHash` de tres fitxers en Windows). Després esborra `fitxer7.txt` de l'original i recupera **només eixe fitxer** de la còpia.
6. **Sincronitzar.** Usa `rsync -av` (Linux) o `robocopy /E` (Windows) per a copiar `dades` a una carpeta `copia`. Modifica un sol fitxer, repeteix la còpia i comprova que només es copia el que ha canviat (en Linux, mira-ho primer amb `--dry-run`). En Windows, anota el codi d'eixida de `robocopy` en cada execució i explica què significa.

**Què entregues:** un document amb la taula de l'apartat 1, les ordres i les eixides dels apartats 3 a 6, la taula comparativa de compressors amb la teua conclusió i una reflexió de 4-5 línies sobre per què cal provar les restauracions, en la tasca «Activitat 6» d'Aules.

**Criteris que treballa:** RA3.b, RA3.c, RA3.e, RA3.g

**Dificultat:** ★★★ · **Temps estimat:** 90 minuts

## Activitat 7 · Scripts d'automatització i tasca programada (presencial)

**Objectiu:** escriure, provar i programar els tres scripts d'administració de la unitat, i comprovar que la tasca s'executa sola.

Es fa **individualment, durant la sessió presencial del 24 de novembre**, en el sistema operatiu del teu equip (Linux amb Bash o Windows amb PowerShell). Els scripts són els de la [pàgina 3](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/03-scripts-practics-i-tasques-programades/); has d'entendre'ls i provar-los, no només copiar-los.

**Què has de fer:**

1. **Còpia de seguretat.** Escriu i prova `backup.sh` o `Backup.ps1` sobre una carpeta de prova amb alguns fitxers. Comprova el fitxer comprimit amb la data en el nom.
2. **Alta massiva.** Prepara un fitxer `usuaris.txt` amb 5 noms i escriu i prova `crear_usuaris.sh` (amb `sudo`) o `CrearUsuaris.ps1` (en una consola d'administrador). Comprova que els comptes existixen (`getent passwd` o `Get-LocalUser`).
3. **Comprovació del disc.** Escriu i prova `comprovar_disc.sh` o `ComprovarDisc.ps1`. Executa-la amb un llindar baix (per exemple `1`) per a veure l'avís.
4. **Programació.** Programa la comprovació del disc perquè s'execute **cada 5 minuts**: amb `crontab -e` (línia `*/5 * * * *` amb ruta absoluta i redirecció) o amb el Programador de tasques / `schtasks` (acció `powershell.exe` amb `-File`). Espera, com a mínim, a dos execucions i comprova-ho en el registre.
5. **Documenta.** Reflexió breu (3-4 línies): quina altra tasca del teu dia a dia automatitzaries amb un script semblant, i per què.

**Què entregues:** abans d'acabar la classe, en la tasca d'Aules «Activitat UP3 — Scripts d'automatització i tasca programada»: un document amb
- **Apartat 1:** l'script de còpia i una captura del fitxer comprimit generat;
- **Apartat 2:** l'script d'altes i una captura dels usuaris creats en el sistema;
- **Apartat 3:** l'script de comprovació del disc i una captura de la seua execució;
- **Apartat 4:** una captura de la tasca programada (`crontab -l` o la finestra del Programador de tasques) i del registre que demostre que s'ha executat automàticament **almenys dues vegades**;
- **Apartat 5:** la reflexió.

Adjunta també els arxius `.sh` o `.ps1`.

**Criteris que treballa:** RA3.c, RA3.e, RA3.f

**Dificultat:** ★★☆ · **Temps estimat:** durant la sessió presencial (2-4 h)

:::aules
Les entregues d'estes activitats es fan en Aules, en la tasca de cada una. Allí també trobaràs la rúbrica, les qualificacions i les solucions comentades.
:::
