---
title: "1. Introducció al scripting"
description: "Què és un script, com s'executa en Bash i en PowerShell (shebang, permisos i política d'execució), variables, cometes, operadors i codis d'eixida."
---

Un administrador de sistemes que fa la mateixa tasca dos cops ja està perdent el temps: la tercera vegada l'ha d'haver escrit en un **script**. Esta pàgina és la base de tota la unitat: com s'escriu i s'executa un script, com es guarda informació en variables i com sap un script si una ordre ha anat bé o ha fallat.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 45 de pràctica.

1. Llig les seccions 1 a 3 amb una terminal oberta i **prova tots els exemples**: un script que només has llegit s'oblida de seguida.
2. Les seccions 4 i 5 (variables, cometes i expansió) són on més errors es cometen. Practica amb les pestanyes 1 i 2 del [laboratori «Traçador d'scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/).
3. Acaba amb la secció 7 (codis d'eixida), que necessitaràs a tota la resta de la unitat, i fes l'[activitat 1](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/).
:::

## 1. Què és un script i per a què serveix

Un **script** és un fitxer de text que conté una seqüència d'ordres. El **shell** (l'intèrpret d'ordres) les executa una darrere de l'altra, exactament com si les haguessis escrit tu a mà en la terminal. La diferència és que l'script es guarda, es pot repetir sense errors de teclejat i es pot programar perquè s'execute sol.

Treballarem **dos shells en paral·lel**, perquè un administrador professional es troba amb tots dos:

| | Bash | PowerShell |
|---|---|---|
| Origen | Shell per defecte de la majoria de distribucions Linux (i de macOS fins fa uns anys) | Shell de Microsoft; Windows PowerShell 5.1 ve amb Windows i PowerShell 7 (`pwsh`) es pot instal·lar també en Linux i macOS |
| Què passa per les canonades | **Text** | **Objectes** (amb propietats i mètodes) |
| Extensió habitual | `.sh` | `.ps1` |
| Tipus de dades | Quasi tot és text | Tipus reals de .NET (enters, text, dates, arrays…) |
| Si hi ha una errada | L'script continua si no ho impedixes | Depén de l'errada; molts cmdlets continuen |

Els exemples que veuràs ací estan escrits perquè funcionen **tal com estan** en un Linux amb Bash 4 o posterior i en Windows PowerShell 5.1. Quan veges una ordre amb `sudo`, o una consola de PowerShell «com a administrador», és perquè necessita privilegis.

:::note[Les ordres no es tradueixen]
Les ordres, els noms de variables i les opcions (`echo`, `chmod`, `Write-Host`, `-eq`…) són sempre els originals. Només es tradueixen els comentaris i els missatges que escrius tu.
:::

## 2. El primer script en Bash

Obri un editor (`nano primer_script.sh`) i escriu:

```bash
#!/bin/bash
# primer_script.sh · el primer script
echo "Hola, açò és un script en Bash"
```

La primera línia, `#!/bin/bash`, s'anomena ***shebang***: diu al sistema quin intèrpret ha d'usar per a executar el fitxer. A partir d'ací, tot el que comença per `#` és un **comentari** que el shell ignora.

Per a executar-lo hi ha dues maneres:

```bash
bash primer_script.sh      # passa el fitxer a bash: no cal permís d'execució
chmod +x primer_script.sh  # dona permís d'execució al fitxer
./primer_script.sh         # l'executa directament (usa el shebang)
```

Tres coses que sorprenen la primera vegada:

- **Sense `chmod +x`**, `./primer_script.sh` respon `Permission denied`: el fitxer és text, no un programa, fins que li dónes el permís `x`.
- **Sense `./`**, el shell busca `primer_script.sh` només en les carpetes de la variable `PATH`. La carpeta actual no hi és (per seguretat), i obtens `command not found`. El `./` significa «el de la carpeta actual».
- **Sense shebang**, si el llances des de Bash normalment també funciona, però el comportament depén de qui l'execute (un altre shell, `cron`…). **Posa-hi sempre el shebang.**

## 3. El primer script en PowerShell

Escriu el fitxer `primer_script.ps1`:

```powershell
# primer_script.ps1 · el primer script
Write-Host "Hola, açò és un script en PowerShell"
```

S'executa des d'una consola de PowerShell escrivint-ne la ruta. Com en Bash, la carpeta actual no es busca automàticament, així que cal el **`.\`**:

```powershell
.\primer_script.ps1
```

Si no has fet res més, a Windows és molt probable que veges un error del tipus *«no es pot carregar el fitxer perquè l'execució de scripts està deshabilitada en este sistema»*. No és una errada: és la **política d'execució** (*Execution Policy*), una mesura per a evitar que s'execute un `.ps1` per descuit.

| Política | Què permet |
|---|---|
| `Restricted` | Cap script (és la predeterminada als Windows de client) |
| `AllSigned` | Només scripts signats digitalment per un editor de confiança |
| `RemoteSigned` | Scripts propis sense signar; els descarregats d'Internet han d'anar signats |
| `Bypass` | No bloqueja res i no avisa |

Es consulta i es canvia així:

```powershell
Get-ExecutionPolicy -List
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

:::caution[Privilegis]
Sense `-Scope`, `Set-ExecutionPolicy` canvia la política de **tot l'equip** (`LocalMachine`) i exigix una consola oberta **com a administrador**. Amb `-Scope CurrentUser` només afecta el teu usuari i **no cal ser administrador**: és la millor opció en una màquina de proves.
:::

Dos matisos importants:

- La política **no és una barrera de seguretat**, sinó una protecció contra errors. Qualsevol pot saltar-se-la per a un sol script amb `powershell.exe -ExecutionPolicy Bypass -File script.ps1`; ho farem servir quan programem tasques en la pàgina 3.
- En PowerShell sobre Linux o macOS la política d'execució no s'aplica.

## 4. Variables

Una **variable** és un espai amb nom on l'script guarda un valor per a usar-lo més avant.

| Concepte | Bash | PowerShell |
|---|---|---|
| Assignar | `nom="Ana"` | `$nom = "Ana"` |
| Llegir el valor | `echo "$nom"` | `Write-Host $nom` |
| Delimitar el nom | `echo "${nom}s"` | `Write-Host "${nom}s"` |
| Tipus | Tot és text (l'aritmètica el converteix) | Tipus reals: `[int]$edat = 17` |
| Variable d'entorn | `echo "$HOME"` | `$env:USERPROFILE` |
| Resultat d'una ordre | `data=$(date +%F)` | `$data = Get-Date -Format "yyyy-MM-dd"` |

:::danger[L'error més freqüent en Bash]
En Bash, **no hi pot haver espais al voltant del signe `=`**. `edat = 20` no és una assignació: el shell intenta executar una ordre anomenada `edat` amb dos arguments (`=` i `20`) i et respon `edat: command not found`. Es escriu `edat=20`.
En PowerShell passa al revés: els espais són normals (`$edat = 20`).
:::

Per a llegir una variable en Bash cal el `$` davant (`$nom`); per a assignar-la, **no** (`nom=…`). En PowerShell el `$` va sempre.

## 5. Cometes i expansió

Abans d'executar una línia, el shell la **transforma**: substituïx variables, executa ordres entre `$( )`, fa càlculs i separa el text en paraules. Entendre este pas explica la majoria dels errors. Les cometes decidixen què es transforma:

| Escrius | Bash i PowerShell fan… |
|---|---|
| `'$nom'` (cometes simples) | **Res**: el text es queda tal qual, `$nom` |
| `"$nom"` (cometes dobles) | **Substituïx** les variables: `Ana` |
| `"avui és $(date +%F)"` | En Bash executa l'ordre de dins i posa la seua eixida. En PowerShell s'escriu `"avui és $(Get-Date -Format yyyy-MM-dd)"` |
| `\$nom` en Bash, `` `$nom `` en PowerShell | **Escapa** el `$`: es mostra literalment |

Amb `nom="Ana"`, en Bash:

```bash
echo '$nom'                 # $nom
echo "$nom"                 # Ana
echo "Hola $nom, avui és $(date +%F)"
echo "Costa 5\$"            # Costa 5$
```

A més hi ha el **partit de paraules** (*word splitting*), la trampa clàssica de Bash. Una variable **sense cometes** es trenca en paraules pels espais:

```bash
fitxer="Mi document.txt"
ls $fitxer        # ls rep DOS arguments: «Mi» i «document.txt»
ls "$fitxer"      # ls rep UN argument: «Mi document.txt»
```

**Regla pràctica:** en Bash, posa **sempre les variables entre cometes dobles** (`"$variable"`) excepte quan vulgues expressament que es parteixen. PowerShell no té este problema: una variable és un valor, no text per a repartir.

Per a ensenyar-ho, el laboratori té la pestanya «Cometes i expansió»: escriu una línia i comprova en quines paraules es converteix abans d'executar-se.

## 6. Operadors

### Aritmètica

En Bash, els càlculs es fan dins de `$(( ))` i només amb **enters**:

```bash
a=7
b=2
suma=$((a + b))        # 9
quocient=$((a / b))    # 3  (divisió entera)
resta=$((a % b))       # 1  (residu)
```

PowerShell calcula directament i treballa amb decimals: `7 / 2` val `3.5`.

### Comparar

Esta és una de les diferències que més confonen. En Bash, la condició va dins de `[ ]` i l'operador **depén de si compares números o text**:

| Comparació | Bash (`[ ]`) | PowerShell |
|---|---|---|
| Números: igual, diferent | `-eq`, `-ne` | `-eq`, `-ne` |
| Números: major, menor, major o igual, menor o igual | `-gt`, `-lt`, `-ge`, `-le` | `-gt`, `-lt`, `-ge`, `-le` |
| Text: igual, diferent | `=`, `!=` | `-eq`, `-ne` |
| Text buit / no buit | `-z "$x"`, `-n "$x"` | `[string]::IsNullOrEmpty($x)` |
| «I», «o», «no» | `&&`, `\|\|`, `!` | `-and`, `-or`, `-not` |

Detalls que cal tindre presents:

- En Bash els **espais dins dels claudàtors són obligatoris**: `[ "$a" -gt "$b" ]`. `[$a -gt $b]` falla perquè `[` és una ordre i necessita espai després.
- Usar `-eq` amb text en Bash dóna l'error `integer expression expected`. Usar `=` amb números compara com a text.
- PowerShell **no distingix majúscules** en `-eq` (`"Ana" -eq "ANA"` és cert); per a distingir-les, `-ceq`.
- En PowerShell, `>` **no compara**: redirigix l'eixida a un fitxer. `$a -gt $b` és la comparació.

## 7. Codis d'eixida: com sap un script si ha anat bé

Cada ordre, en acabar, torna al shell un número: el **codi d'eixida** (*exit code*). La convenció és:

- **`0`** significa **èxit**.
- **Qualsevol altre valor** (1, 2, 127…) indica un tipus d'error.

En Bash, l'ordre anterior deixa el seu codi en la variable especial `$?`:

```bash
ls /etc > /dev/null
echo $?                  # 0: ha anat bé
ls /carpeta_inexistent 2> /dev/null
echo $?                  # 2: ls ha fallat
grep -q "root" /etc/passwd
echo $?                  # 0: s'ha trobat
```

Cada ordre sobreescriu `$?`. Per això este fragment amaga una trampa:

```bash
mkdir /tmp/proves
mkdir /tmp/proves        # falla: ja existix (codi 1)
echo "Intent fet"        # echo acaba bé: ara $? val 0
echo $?                  # 0, no 1
```

Si necessites el codi d'una ordre, **guarda'l** immediatament: `codi=$?`.

Un script pot acabar amb el seu propi codi amb **`exit`**: `exit 0` (tot bé) o `exit 1` (hi ha hagut un error). Si no hi poses `exit`, el codi de l'script és el de l'última ordre executada. Qui el llance (un altre script, `cron`, el Programador de tasques) pot saber així si ha anat bé.

En PowerShell hi ha dos indicadors diferents:

| | Què és |
|---|---|
| `$?` | `True` o `False`: si l'última instrucció ha anat bé |
| `$LASTEXITCODE` | El número que ha tornat l'últim **programa extern** (`ping`, `tar`, `robocopy`…) |

L'ordre `exit 1` també funciona en un `.ps1`. En el laboratori, la pestanya **«Traçador»** et deixa seguir, línia a línia, com canvien les variables i `$?` mentre l'script s'executa: és la forma més ràpida d'entendre'ls.

## Comprova el que has après

1. Escrius `contador = 0` en un script Bash i obtens `contador: command not found`. Per què?

   <details>
   <summary>Resposta</summary>

   Perquè en Bash no pot haver-hi espais al voltant del `=` en una assignació. El shell interpreta `contador` com una ordre amb dos arguments. S'escriu `contador=0`.

   </details>

2. Has creat `neteja.sh` amb el shebang correcte i executes `./neteja.sh`: `Permission denied`. Què falta?

   <details>
   <summary>Resposta</summary>

   El permís d'execució: `chmod +x neteja.sh`. Una alternativa sense permís és `bash neteja.sh`.

   </details>

3. Amb `msg="Hola"`, què mostren `echo '$msg'` i `echo "$msg"`?

   <details>
   <summary>Resposta</summary>

   La primera mostra literalment `$msg` (cometes simples: no hi ha expansió) i la segona mostra `Hola`.

   </details>

4. Estàs en una màquina de proves amb Windows i no tens permisos d'administrador. Quina ordre et deixa executar els teus propis scripts `.ps1`?

   <details>
   <summary>Resposta</summary>

   `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. Amb l'àmbit `CurrentUser` no cal ser administrador.

   </details>

5. Una ordre falla, després fas `echo "fet"` i després `echo $?`. Què mostra l'última?

   <details>
   <summary>Resposta</summary>

   `0`. `$?` conté el codi de l'última ordre, que ha sigut l'`echo "fet"` (va bé). Per a conservar el codi de l'ordre que falla cal guardar-lo en una variable just després d'executar-la.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| script | script, guion de órdenes |
| shell (intèrpret d'ordres) | shell (intérprete de órdenes) |
| shebang | shebang |
| permís d'execució | permiso de ejecución |
| política d'execució (*Execution Policy*) | política de ejecución |
| variable | variable |
| cometes simples / dobles | comillas simples / dobles |
| expansió | expansión |
| partit de paraules (*word splitting*) | división en palabras |
| codi d'eixida | código de salida |
| comentari | comentario |
| operador | operador |
