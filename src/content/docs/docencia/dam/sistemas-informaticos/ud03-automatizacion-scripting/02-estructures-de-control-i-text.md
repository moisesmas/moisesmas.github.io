---
title: "2. Estructures de control i ordres de text"
description: "Condicionals, bucles, paràmetres i entrada d'usuari en Bash i PowerShell, més redireccions, canonades i les ordres de text grep, head, tail, wc, cut, sort, uniq, tr i sed."
---

Un script que només executa ordres en línia recta serveix de poc: el que el fa útil és que **decidix** (si el disc està ple, avisa), **repetix** (per a cada usuari de la llista, crea el compte) i **rep dades de fora** (quina carpeta he de copiar?). Esta pàgina t'ensenya les tres coses, més les ordres per a treballar amb text, que és el que contenen els logs i els fitxers de configuració.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 90 de pràctica.

1. Llig les seccions 1 i 2 (condicionals i bucles) i **tradueix mentalment cada exemple** de Bash a PowerShell.
2. Practica amb el [laboratori «Traçador d'scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/): la pestanya «Condicions» per a les proves, «Traçador» per a seguir bucles i «Paràmetres i read» per a la secció 3.
3. La secció 5 és de consulta: no cal memoritzar les opcions, però sí saber quina ordre fa cada cosa.
4. Fes les [activitats 2, 3, 4 i 5](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/).
:::

## 1. Condicionals: if, elif, else i case

### if / elif / else

```bash
#!/bin/bash
# nota.sh · classifica una nota que es passa com a paràmetre
nota=$1
if [ "$nota" -ge 9 ]; then
  echo "Excel·lent"
elif [ "$nota" -ge 5 ]; then
  echo "Aprovat"
else
  echo "Suspés"
fi
```

```powershell
# nota.ps1 · classifica una nota que es passa com a paràmetre
param([int]$nota)
if ($nota -ge 9) {
    Write-Host "Excel·lent"
} elseif ($nota -ge 5) {
    Write-Host "Aprovat"
} else {
    Write-Host "Suspés"
}
```

Les diferències de sintaxi són sistemàtiques:

| | Bash | PowerShell |
|---|---|---|
| Condició | Entre `[ ]` (amb espais) | Entre parèntesis `( )` |
| Bloc | `then` … `fi` | Claus `{ }` |
| «Si no, si» | `elif` | `elseif` |
| Tancament | `fi` (i `;` abans de `then` si va en la mateixa línia) | `}` |

En Bash, **`if` no avalua «veritat», avalua un codi d'eixida**: executa l'ordre que hi ha després d'`if` i, si torna `0`, executa el bloc `then`. `[ … ]` és, en realitat, una ordre (també es pot escriure `test …`). Per això funciona açò:

```bash
if grep -q "^$usuari:" /etc/passwd; then
  echo "L'usuari $usuari existeix"
fi
```

Les **proves sobre fitxers** són imprescindibles en scripts d'administració:

| Prova | Bash | PowerShell |
|---|---|---|
| Existix (fitxer o carpeta) | `[ -e "$x" ]` | `Test-Path $x` |
| És un fitxer | `[ -f "$x" ]` | `Test-Path $x -PathType Leaf` |
| És una carpeta | `[ -d "$x" ]` | `Test-Path $x -PathType Container` |
| Té contingut (mida > 0) | `[ -s "$x" ]` | `(Get-Item $x).Length -gt 0` |
| Es pot llegir / escriure / executar | `-r`, `-w`, `-x` | — (es comprova amb permisos ACL) |

Per a combinar condicions, Bash admet `&&` i `||` entre ordres o claudàtors (`[ -f "$x" ] && [ -r "$x" ]`) i, amb el doble claudàtor **`[[ ]]`**, també dins de la condició: `[[ -f $x && -r $x ]]`. `[[ ]]` és propi de Bash (no val en un `sh` estricte), no parteix paraules, admet `==` amb patrons (`[[ $x == *.txt ]]`) i `=~` per a expressions regulars. En PowerShell: `if ((Test-Path $x) -and ($n -gt 3))`.

### case (menús) i switch

Quan una mateixa variable es compara amb molts valors, `case` és més net que una cadena d'`elif`:

```bash
#!/bin/bash
read -p "Opció (1-3): " op
case "$op" in
  1) date +%F ;;
  2) whoami ;;
  3) echo "Adéu"; exit 0 ;;
  *) echo "Opció no vàlida" >&2; exit 2 ;;
esac
```

```powershell
$op = Read-Host "Opció (1-3)"
switch ($op) {
    "1" { Get-Date -Format "yyyy-MM-dd" }
    "2" { whoami }
    "3" { Write-Host "Adéu"; exit 0 }
    default { Write-Error "Opció no vàlida"; exit 2 }
}
```

Cada alternativa de `case` acaba en **`;;`** i `*)` fa de «qualsevol altre valor». El `>&2` envia el missatge a l'**eixida d'errors** (secció 4).

## 2. Bucles

Un bucle repetix un bloc. Hi ha dues famílies: les que recorren una **llista** (`for`) i les que repetixen **mentre es complisca una condició** (`while`; `until` fa el contrari: repetix fins que es complisca).

```bash
for fruita in poma pera taronja; do      # recorre una llista
  echo "Fruita: $fruita"
done

for i in {1..5}; do                      # intervals: {inici..final}
  echo "Volta $i"
done

for ((i = 1; i <= 5; i++)); do           # estil C
  echo "$i"
done

n=3
while [ "$n" -gt 0 ]; do                 # mentre n > 0
  echo "Queden $n"
  n=$((n - 1))
done

for f in *.txt; do                       # per a cada fitxer .txt de la carpeta
  echo "$f"
done
```

```powershell
foreach ($fruita in "poma", "pera", "taronja") { Write-Host "Fruita: $fruita" }

1..5 | ForEach-Object { Write-Host "Volta $_" }

for ($i = 1; $i -le 5; $i++) { Write-Host $i }

$n = 3
while ($n -gt 0) {
    Write-Host "Queden $n"
    $n--
}

foreach ($f in Get-ChildItem *.txt) { Write-Host $f.Name }
```

`break` ix del bucle i `continue` salta a la volta següent (igual en els dos shells). En PowerShell, dins d'un `ForEach-Object`, `$_` és l'element actual.

El bucle més útil en administració és **llegir un fitxer línia a línia**:

```bash
while read -r linia; do
  echo "Línia: $linia"
done < usuaris.txt
```

```powershell
Get-Content .\usuaris.txt | ForEach-Object { Write-Host "Línia: $_" }
```

El `-r` de `read` impedix que Bash interprete les barres invertides del text. L'`< usuaris.txt` del final **redirigix** el fitxer a l'entrada del bucle (secció 4).

:::caution[Compte amb els bucles infinits]
Si en un `while` oblides actualitzar la variable de la condició (`n=$((n - 1))`), l'script no acabarà mai. Es talla amb **Ctrl + C**. El «Traçador» del laboratori limita les voltes per a no penjar-se, però el teu shell no.
:::

## 3. Paràmetres i entrada de dades

### Paràmetres de l'script

Un script reutilitzable no du escrits els valors dins: els **rep** quan s'executa (`./copia.sh /home/ana`).

| Bash | Significat |
|---|---|
| `$0` | Nom amb què s'ha llançat l'script |
| `$1`, `$2`, … `$9` | Primer, segon… paràmetre (a partir del 10, `${10}`) |
| `$#` | Quants paràmetres s'han passat |
| `"$@"` | Tots els paràmetres, **cada un com a paraula separada** (és el que has d'usar als bucles) |
| `shift` | Descarta `$1` i desplaça la resta |

```bash
#!/bin/bash
# saluda.sh
if [ $# -lt 1 ]; then
  echo "Ús: $0 nom..." >&2
  exit 1
fi
for nom in "$@"; do
  echo "Hola, $nom"
done
echo "He saludat $# persones"
```

`./saluda.sh Ana Luis "Maria Lopez"` saluda tres persones, perquè les cometes fan de «Maria Lopez» un sol paràmetre.

PowerShell prefereix **paràmetres amb nom**, declarats amb un bloc `param()` al principi de l'script:

```powershell
# copia.ps1
param(
    [Parameter(Mandatory)][string]$Carpeta,
    [int]$Dies = 7
)
Write-Host "Carpeta: $Carpeta · dies: $Dies"
```

S'executa com `.\copia.ps1 -Carpeta C:\Dades -Dies 3` (o `.\copia.ps1 C:\Dades 3`, per posició). Si falta `-Carpeta`, que és obligatori, PowerShell la demana. Sense bloc `param()` els paràmetres cauen en l'array `$args` (`$args[0]`, `$args.Count`).

### Preguntar a l'usuari

```bash
read -p "Com et dius? " nom           # mostra el missatge i guarda la resposta
read -s -p "Contrasenya: " clau; echo # -s: no mostra el que escrius
read -r nom cognoms                   # «Ana Maria Lopez» → nom=Ana, cognoms="Maria Lopez"
```

```powershell
$nom = Read-Host "Com et dius?"
$clau = Read-Host "Contrasenya" -AsSecureString   # no mostra el text; guarda un SecureString
```

Si una variable es llegeix amb `read`, passa-la sempre per cometes quan la uses. I **valida** el que s'ha rebut: un script robust comprova que hi ha paràmetres, que el fitxer existix i que el número és un número, i en cas contrari acaba amb `exit` i un codi diferent de 0.

## 4. Redireccions i canonades

Cada programa té tres **canals**: l'entrada estàndard (0, el teclat), l'eixida estàndard (1, la pantalla) i l'eixida d'errors (2, també la pantalla, però separada). Es poden desviar:

| Volem… | Bash | PowerShell |
|---|---|---|
| Eixida a un fitxer (sobreescrivint) | `ordre > fitxer` | `ordre > fitxer` |
| Afegir al final del fitxer | `ordre >> fitxer` | `ordre >> fitxer` |
| Només els errors a un fitxer | `ordre 2> errors.log` | `ordre 2> errors.log` |
| Eixida i errors junts | `ordre >> a.log 2>&1` | `ordre *>> a.log` |
| Llençar l'eixida | `ordre > /dev/null` | `ordre > $null` |
| Llegir un fitxer com a entrada | `ordre < fitxer` | `Get-Content fitxer \| ordre` |
| Enviar l'eixida a un missatge d'error | `echo "mal" >&2` | `Write-Error "mal"` |

Una **canonada** (*pipe*, `|`) connecta l'eixida d'una ordre amb l'entrada de la següent. La gran diferència és el que viatja per ella: **text** en Bash i **objectes** en PowerShell (per això, en PowerShell, `Sort-Object Length` ordena per una propietat sense haver de «tallar» columnes).

## 5. Ordres de text

Els scripts d'administració passen el dia llegint logs, llistes d'usuaris i fitxers de configuració. Estes són les ordres de Bash i els seus equivalents:

| Tasca | Bash | PowerShell |
|---|---|---|
| Buscar text | `grep "error" log.txt` | `Select-String "error" log.txt` |
| Ídem, sense distingir majúscules | `grep -i error log.txt` | (és el comportament per defecte) |
| Distingir majúscules | (és el comportament per defecte) | `Select-String ERROR log.txt -CaseSensitive` |
| Línies que **no** coincidixen | `grep -v INFO log.txt` | `Select-String INFO log.txt -NotMatch` |
| Primeres línies | `head -n 10 log.txt` | `Get-Content log.txt -Head 10` |
| Últimes línies | `tail -n 10 log.txt` | `Get-Content log.txt -Tail 10` |
| Seguir un fitxer en directe | `tail -f log.txt` | `Get-Content log.txt -Tail 10 -Wait` |
| Comptar línies | `wc -l log.txt` | `(Get-Content log.txt).Count` |
| Una columna | `cut -d: -f1 /etc/passwd` | `Get-Content f \| ForEach-Object { ($_ -split ':')[0] }` |
| Ordenar | `sort fitxer` | `Get-Content f \| Sort-Object` |
| Treure repetides i comptar-les | `sort f \| uniq -c` | `Get-Content f \| Group-Object` |
| Canviar lletres | `tr 'a-z' 'A-Z'` | `$text.ToUpper()` |
| Substituir text | `sed 's/vell/nou/g' f` | `(Get-Content f) -replace 'vell','nou'` |

Notes que eviten disgustos:

- **`grep` distingix majúscules; `Select-String` no.** És una de les diferències que més confonen.
- `uniq` només junta línies **consecutives** iguals: per això es fa `sort` abans.
- `sed 's/…/…/g'` escriu el resultat per pantalla i **no toca el fitxer**. Si afegeixes `-i` (`sed -i 's/vell/nou/g' f`) sí que el modifica: fes-ne una còpia abans o usa `-i.bak`.
- `-replace` de PowerShell usa expressions regulars i tampoc distingix majúscules.
- Un `grep` que no troba res torna el codi d'eixida **1**, i això no és un error del programa: és la seua manera de dir «no hi és». Per això es pot posar directament en un `if`.

:::note[Exemple resolt: analitzar un log]
Tens `sistema.log` amb línies com `2026-11-17 09:03:40 ERROR No es pot connectar`. Quantes línies d'error hi ha?

```bash
grep "ERROR" sistema.log | wc -l        # també: grep -c "ERROR" sistema.log
```

```powershell
(Select-String "ERROR" sistema.log -CaseSensitive).Count
```

I quantes hi ha de cada nivell (`INFO`, `WARN`, `ERROR`), de més a menys? El nivell és la tercera columna, separada per espais:

```bash
cut -d' ' -f3 sistema.log | sort | uniq -c | sort -nr
```

```powershell
Get-Content sistema.log | ForEach-Object { ($_ -split ' ')[2] } | Group-Object | Sort-Object Count -Descending
```

Cada etapa fa una cosa xicoteta i l'eixida de l'una és l'entrada de la següent. Eixa és tota la idea de les canonades.
:::

## Comprova el que has après

1. Quin és el resultat de `[ "abc" -eq "abc" ]` en Bash?

   <details>
   <summary>Resposta</summary>

   Un error (`integer expression expected`) i codi d'eixida 2: `-eq` compara **números**. Per a text s'usa `=`: `[ "abc" = "abc" ]`.

   </details>

2. Per què en un bucle `for nom in $@` pot fallar amb un paràmetre com `"Maria Lopez"`, i com es corregix?

   <details>
   <summary>Resposta</summary>

   Sense cometes, `$@` es parteix en paraules i «Maria Lopez» es convertix en dos valors. Es corregix amb `for nom in "$@"`.

   </details>

3. Quina diferència hi ha entre `ordre > fitxer` i `ordre >> fitxer`?

   <details>
   <summary>Resposta</summary>

   `>` crea o **sobreescriu** el fitxer; `>>` **afig** al final sense esborrar el que ja hi havia.

   </details>

4. Escriu en Bash i en PowerShell com comptar les línies de `access.log` que contenen la paraula `404`.

   <details>
   <summary>Resposta</summary>

   Bash: `grep "404" access.log | wc -l` (o `grep -c "404" access.log`). PowerShell: `(Select-String "404" access.log).Count`.

   </details>

5. `sed 's/Windows/Linux/g' notes.txt` no ha canviat res en `notes.txt`. Per què?

   <details>
   <summary>Resposta</summary>

   Perquè `sed` sense `-i` només mostra el resultat per pantalla; el fitxer original queda igual. Per a canviar-lo cal `sed -i` (millor amb còpia: `-i.bak`) o redirigir l'eixida a un fitxer nou.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| estructura de control | estructura de control |
| condicional | condicional |
| bucle | bucle |
| paràmetre | parámetro |
| entrada estàndard / eixida estàndard | entrada estándar / salida estándar |
| eixida d'errors | salida de errores |
| redirecció | redirección |
| canonada (*pipe*) | tubería (*pipe*) |
| expressió regular | expresión regular |
| filtre de text | filtro de texto |
| bloc | bloque |
| línia d'ordres | línea de órdenes |
