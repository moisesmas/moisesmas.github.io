---
title: "2. Estructuras de control y órdenes de texto"
description: "Condicionales, bucles, parámetros y entrada de usuario en Bash y PowerShell, más redirecciones, tuberías y las órdenes de texto grep, head, tail, wc, cut, sort, uniq, tr y sed."
---

Un script que solo ejecuta órdenes en línea recta sirve de poco: lo que lo hace útil es que **decide** (si el disco está lleno, avisa), **repite** (para cada usuario de la lista, crea la cuenta) y **recibe datos de fuera** (¿qué carpeta tengo que copiar?). Esta página te enseña las tres cosas, más las órdenes para trabajar con texto, que es lo que contienen los logs y los archivos de configuración.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 90 de práctica.

1. Lee las secciones 1 y 2 (condicionales y bucles) y **traduce mentalmente cada ejemplo** de Bash a PowerShell.
2. Practica con el [laboratorio «Trazador de scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/?lang=es): la pestaña «Condiciones» para las pruebas, «Trazador» para seguir bucles y «Parámetros y read» para la sección 3.
3. La sección 5 es de consulta: no hace falta memorizar las opciones, pero sí saber qué orden hace cada cosa.
4. Haz las [actividades 2, 3, 4 y 5](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/).
:::

## 1. Condicionales: if, elif, else y case

### if / elif / else

```bash
#!/bin/bash
# nota.sh · clasifica una nota que se pasa como parámetro
nota=$1
if [ "$nota" -ge 9 ]; then
  echo "Sobresaliente"
elif [ "$nota" -ge 5 ]; then
  echo "Aprobado"
else
  echo "Suspenso"
fi
```

```powershell
# nota.ps1 · clasifica una nota que se pasa como parámetro
param([int]$nota)
if ($nota -ge 9) {
    Write-Host "Sobresaliente"
} elseif ($nota -ge 5) {
    Write-Host "Aprobado"
} else {
    Write-Host "Suspenso"
}
```

Las diferencias de sintaxis son sistemáticas:

| | Bash | PowerShell |
|---|---|---|
| Condición | Entre `[ ]` (con espacios) | Entre paréntesis `( )` |
| Bloque | `then` … `fi` | Llaves `{ }` |
| «Si no, si» | `elif` | `elseif` |
| Cierre | `fi` (y `;` antes de `then` si va en la misma línea) | `}` |

En Bash, **`if` no evalúa «verdad», evalúa un código de salida**: ejecuta la orden que hay después de `if` y, si devuelve `0`, ejecuta el bloque `then`. `[ … ]` es, en realidad, una orden (también se puede escribir `test …`). Por eso funciona esto:

```bash
if grep -q "^$usuari:" /etc/passwd; then
  echo "El usuario $usuari existe"
fi
```

Las **pruebas sobre archivos** son imprescindibles en scripts de administración:

| Prueba | Bash | PowerShell |
|---|---|---|
| Existe (archivo o carpeta) | `[ -e "$x" ]` | `Test-Path $x` |
| Es un archivo | `[ -f "$x" ]` | `Test-Path $x -PathType Leaf` |
| Es una carpeta | `[ -d "$x" ]` | `Test-Path $x -PathType Container` |
| Tiene contenido (tamaño > 0) | `[ -s "$x" ]` | `(Get-Item $x).Length -gt 0` |
| Se puede leer / escribir / ejecutar | `-r`, `-w`, `-x` | — (se comprueba con permisos ACL) |

Para combinar condiciones, Bash admite `&&` y `||` entre órdenes o corchetes (`[ -f "$x" ] && [ -r "$x" ]`) y, con el doble corchete **`[[ ]]`**, también dentro de la condición: `[[ -f $x && -r $x ]]`. `[[ ]]` es propio de Bash (no vale en un `sh` estricto), no parte palabras, admite `==` con patrones (`[[ $x == *.txt ]]`) y `=~` para expresiones regulares. En PowerShell: `if ((Test-Path $x) -and ($n -gt 3))`.

### case (menús) y switch

Cuando una misma variable se compara con muchos valores, `case` es más limpio que una cadena de `elif`:

```bash
#!/bin/bash
read -p "Opción (1-3): " op
case "$op" in
  1) date +%F ;;
  2) whoami ;;
  3) echo "Adiós"; exit 0 ;;
  *) echo "Opción no válida" >&2; exit 2 ;;
esac
```

```powershell
$op = Read-Host "Opción (1-3)"
switch ($op) {
    "1" { Get-Date -Format "yyyy-MM-dd" }
    "2" { whoami }
    "3" { Write-Host "Adiós"; exit 0 }
    default { Write-Error "Opción no válida"; exit 2 }
}
```

Cada alternativa de `case` acaba en **`;;`** y `*)` hace de «cualquier otro valor». El `>&2` envía el mensaje a la **salida de errores** (sección 4).

## 2. Bucles

Un bucle repite un bloque. Hay dos familias: las que recorren una **lista** (`for`) y las que repiten **mientras se cumpla una condición** (`while`; `until` hace lo contrario: repite hasta que se cumple).

```bash
for fruita in poma pera taronja; do      # recorre una lista
  echo "Fruta: $fruita"
done

for i in {1..5}; do                      # intervalos: {inicio..final}
  echo "Vuelta $i"
done

for ((i = 1; i <= 5; i++)); do           # estilo C
  echo "$i"
done

n=3
while [ "$n" -gt 0 ]; do                 # mientras n > 0
  echo "Quedan $n"
  n=$((n - 1))
done

for f in *.txt; do                       # para cada archivo .txt de la carpeta
  echo "$f"
done
```

```powershell
foreach ($fruita in "poma", "pera", "taronja") { Write-Host "Fruta: $fruita" }

1..5 | ForEach-Object { Write-Host "Vuelta $_" }

for ($i = 1; $i -le 5; $i++) { Write-Host $i }

$n = 3
while ($n -gt 0) {
    Write-Host "Quedan $n"
    $n--
}

foreach ($f in Get-ChildItem *.txt) { Write-Host $f.Name }
```

`break` sale del bucle y `continue` salta a la vuelta siguiente (igual en los dos shells). En PowerShell, dentro de un `ForEach-Object`, `$_` es el elemento actual.

El bucle más útil en administración es **leer un archivo línea a línea**:

```bash
while read -r linia; do
  echo "Línea: $linia"
done < usuaris.txt
```

```powershell
Get-Content .\usuaris.txt | ForEach-Object { Write-Host "Línea: $_" }
```

El `-r` de `read` impide que Bash interprete las barras invertidas del texto. El `< usuaris.txt` del final **redirige** el archivo a la entrada del bucle (sección 4).

:::caution[Cuidado con los bucles infinitos]
Si en un `while` olvidas actualizar la variable de la condición (`n=$((n - 1))`), el script no terminará nunca. Se corta con **Ctrl + C**. El «Trazador» del laboratorio limita las vueltas para no colgarse, pero tu shell no.
:::

## 3. Parámetros y entrada de datos

### Parámetros del script

Un script reutilizable no lleva escritos los valores dentro: los **recibe** cuando se ejecuta (`./copia.sh /home/ana`).

| Bash | Significado |
|---|---|
| `$0` | Nombre con el que se ha lanzado el script |
| `$1`, `$2`, … `$9` | Primer, segundo… parámetro (a partir del 10, `${10}`) |
| `$#` | Cuántos parámetros se han pasado |
| `"$@"` | Todos los parámetros, **cada uno como palabra separada** (es lo que debes usar en los bucles) |
| `shift` | Descarta `$1` y desplaza el resto |

```bash
#!/bin/bash
# saluda.sh
if [ $# -lt 1 ]; then
  echo "Uso: $0 nombre..." >&2
  exit 1
fi
for nom in "$@"; do
  echo "Hola, $nom"
done
echo "He saludado a $# personas"
```

`./saluda.sh Ana Luis "Maria Lopez"` saluda a tres personas, porque las comillas hacen de «Maria Lopez» un solo parámetro.

PowerShell prefiere **parámetros con nombre**, declarados con un bloque `param()` al principio del script:

```powershell
# copia.ps1
param(
    [Parameter(Mandatory)][string]$Carpeta,
    [int]$Dies = 7
)
Write-Host "Carpeta: $Carpeta · días: $Dies"
```

Se ejecuta como `.\copia.ps1 -Carpeta C:\Dades -Dies 3` (o `.\copia.ps1 C:\Dades 3`, por posición). Si falta `-Carpeta`, que es obligatorio, PowerShell la pide. Sin bloque `param()` los parámetros caen en el array `$args` (`$args[0]`, `$args.Count`).

### Preguntar al usuario

```bash
read -p "¿Cómo te llamas? " nom       # muestra el mensaje y guarda la respuesta
read -s -p "Contraseña: " clau; echo  # -s: no muestra lo que escribes
read -r nom cognoms                   # «Ana Maria Lopez» → nom=Ana, cognoms="Maria Lopez"
```

```powershell
$nom = Read-Host "¿Cómo te llamas?"
$clau = Read-Host "Contraseña" -AsSecureString   # no muestra el texto; guarda un SecureString
```

Si una variable se lee con `read`, pásala siempre entre comillas cuando la uses. Y **valida** lo que se ha recibido: un script robusto comprueba que hay parámetros, que el archivo existe y que el número es un número, y en caso contrario termina con `exit` y un código distinto de 0.

## 4. Redirecciones y tuberías

Cada programa tiene tres **canales**: la entrada estándar (0, el teclado), la salida estándar (1, la pantalla) y la salida de errores (2, también la pantalla, pero separada). Se pueden desviar:

| Queremos… | Bash | PowerShell |
|---|---|---|
| Salida a un archivo (sobrescribiendo) | `orden > archivo` | `orden > archivo` |
| Añadir al final del archivo | `orden >> archivo` | `orden >> archivo` |
| Solo los errores a un archivo | `orden 2> errors.log` | `orden 2> errors.log` |
| Salida y errores juntos | `orden >> a.log 2>&1` | `orden *>> a.log` |
| Tirar la salida | `orden > /dev/null` | `orden > $null` |
| Leer un archivo como entrada | `orden < archivo` | `Get-Content archivo \| orden` |
| Enviar la salida a un mensaje de error | `echo "mal" >&2` | `Write-Error "mal"` |

Una **tubería** (*pipe*, `|`) conecta la salida de una orden con la entrada de la siguiente. La gran diferencia es lo que viaja por ella: **texto** en Bash y **objetos** en PowerShell (por eso, en PowerShell, `Sort-Object Length` ordena por una propiedad sin tener que «cortar» columnas).

## 5. Órdenes de texto

Los scripts de administración pasan el día leyendo logs, listas de usuarios y archivos de configuración. Estas son las órdenes de Bash y sus equivalentes:

| Tarea | Bash | PowerShell |
|---|---|---|
| Buscar texto | `grep "error" log.txt` | `Select-String "error" log.txt` |
| Ídem, sin distinguir mayúsculas | `grep -i error log.txt` | (es el comportamiento por defecto) |
| Distinguir mayúsculas | (es el comportamiento por defecto) | `Select-String ERROR log.txt -CaseSensitive` |
| Líneas que **no** coinciden | `grep -v INFO log.txt` | `Select-String INFO log.txt -NotMatch` |
| Primeras líneas | `head -n 10 log.txt` | `Get-Content log.txt -Head 10` |
| Últimas líneas | `tail -n 10 log.txt` | `Get-Content log.txt -Tail 10` |
| Seguir un archivo en directo | `tail -f log.txt` | `Get-Content log.txt -Tail 10 -Wait` |
| Contar líneas | `wc -l log.txt` | `(Get-Content log.txt).Count` |
| Una columna | `cut -d: -f1 /etc/passwd` | `Get-Content f \| ForEach-Object { ($_ -split ':')[0] }` |
| Ordenar | `sort archivo` | `Get-Content f \| Sort-Object` |
| Quitar repetidas y contarlas | `sort f \| uniq -c` | `Get-Content f \| Group-Object` |
| Cambiar letras | `tr 'a-z' 'A-Z'` | `$text.ToUpper()` |
| Sustituir texto | `sed 's/vell/nou/g' f` | `(Get-Content f) -replace 'vell','nou'` |

Notas que evitan disgustos:

- **`grep` distingue mayúsculas; `Select-String` no.** Es una de las diferencias que más confunden.
- `uniq` solo junta líneas **consecutivas** iguales: por eso se hace `sort` antes.
- `sed 's/…/…/g'` escribe el resultado por pantalla y **no toca el archivo**. Si añades `-i` (`sed -i 's/vell/nou/g' f`) sí lo modifica: haz una copia antes o usa `-i.bak`.
- `-replace` de PowerShell usa expresiones regulares y tampoco distingue mayúsculas.
- Un `grep` que no encuentra nada devuelve el código de salida **1**, y eso no es un error del programa: es su manera de decir «no está». Por eso se puede poner directamente en un `if`.

:::note[Ejemplo resuelto: analizar un log]
Tienes `sistema.log` con líneas como `2026-11-17 09:03:40 ERROR No se puede conectar`. ¿Cuántas líneas de error hay?

```bash
grep "ERROR" sistema.log | wc -l        # también: grep -c "ERROR" sistema.log
```

```powershell
(Select-String "ERROR" sistema.log -CaseSensitive).Count
```

¿Y cuántas hay de cada nivel (`INFO`, `WARN`, `ERROR`), de más a menos? El nivel es la tercera columna, separada por espacios:

```bash
cut -d' ' -f3 sistema.log | sort | uniq -c | sort -nr
```

```powershell
Get-Content sistema.log | ForEach-Object { ($_ -split ' ')[2] } | Group-Object | Sort-Object Count -Descending
```

Cada etapa hace una cosa pequeña y la salida de una es la entrada de la siguiente. Esa es toda la idea de las tuberías.
:::

## Comprueba lo aprendido

1. ¿Cuál es el resultado de `[ "abc" -eq "abc" ]` en Bash?

   <details>
   <summary>Respuesta</summary>

   Un error (`integer expression expected`) y código de salida 2: `-eq` compara **números**. Para texto se usa `=`: `[ "abc" = "abc" ]`.

   </details>

2. ¿Por qué en un bucle `for nom in $@` puede fallar con un parámetro como `"Maria Lopez"`, y cómo se corrige?

   <details>
   <summary>Respuesta</summary>

   Sin comillas, `$@` se parte en palabras y «Maria Lopez» se convierte en dos valores. Se corrige con `for nom in "$@"`.

   </details>

3. ¿Qué diferencia hay entre `orden > archivo` y `orden >> archivo`?

   <details>
   <summary>Respuesta</summary>

   `>` crea o **sobrescribe** el archivo; `>>` **añade** al final sin borrar lo que ya había.

   </details>

4. Escribe en Bash y en PowerShell cómo contar las líneas de `access.log` que contienen la palabra `404`.

   <details>
   <summary>Respuesta</summary>

   Bash: `grep "404" access.log | wc -l` (o `grep -c "404" access.log`). PowerShell: `(Select-String "404" access.log).Count`.

   </details>

5. `sed 's/Windows/Linux/g' notes.txt` no ha cambiado nada en `notes.txt`. ¿Por qué?

   <details>
   <summary>Respuesta</summary>

   Porque `sed` sin `-i` solo muestra el resultado por pantalla; el archivo original queda igual. Para cambiarlo hace falta `sed -i` (mejor con copia: `-i.bak`) o redirigir la salida a un archivo nuevo.

   </details>

## Glosario

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
