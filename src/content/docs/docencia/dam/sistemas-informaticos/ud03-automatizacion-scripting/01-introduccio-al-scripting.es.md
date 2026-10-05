---
title: "1. Introducción al scripting"
description: "Qué es un script, cómo se ejecuta en Bash y en PowerShell (shebang, permisos y política de ejecución), variables, comillas, operadores y códigos de salida."
---

Un administrador de sistemas que hace la misma tarea dos veces ya está perdiendo el tiempo: la tercera vez tiene que haberla escrito en un **script**. Esta página es la base de toda la unidad: cómo se escribe y se ejecuta un script, cómo se guarda información en variables y cómo sabe un script si una orden ha ido bien o ha fallado.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 45 de práctica.

1. Lee las secciones 1 a 3 con una terminal abierta y **prueba todos los ejemplos**: un script que solo has leído se olvida enseguida.
2. Las secciones 4 y 5 (variables, comillas y expansión) son donde más errores se cometen. Practica con las pestañas 1 y 2 del [laboratorio «Trazador de scripts»](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/laboratorios/tracador-de-scripts/?lang=es).
3. Termina con la sección 7 (códigos de salida), que necesitarás en el resto de la unidad, y haz la [actividad 1](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/es/).
:::

## 1. Qué es un script y para qué sirve

Un **script** es un archivo de texto que contiene una secuencia de órdenes. El **shell** (el intérprete de órdenes) las ejecuta una tras otra, exactamente como si las hubieras escrito tú a mano en la terminal. La diferencia es que el script se guarda, se puede repetir sin errores de tecleo y se puede programar para que se ejecute solo.

Trabajaremos con **dos shells en paralelo**, porque un administrador profesional se encuentra con los dos:

| | Bash | PowerShell |
|---|---|---|
| Origen | Shell por defecto de la mayoría de distribuciones Linux (y de macOS hasta hace unos años) | Shell de Microsoft; Windows PowerShell 5.1 viene con Windows y PowerShell 7 (`pwsh`) se puede instalar también en Linux y macOS |
| Qué pasa por las tuberías | **Texto** | **Objetos** (con propiedades y métodos) |
| Extensión habitual | `.sh` | `.ps1` |
| Tipos de datos | Casi todo es texto | Tipos reales de .NET (enteros, texto, fechas, arrays…) |
| Si hay un error | El script continúa si no lo impides | Depende del error; muchos cmdlets continúan |

Los ejemplos que verás aquí están escritos para que funcionen **tal como están** en un Linux con Bash 4 o posterior y en Windows PowerShell 5.1. Cuando veas una orden con `sudo`, o una consola de PowerShell «como administrador», es porque necesita privilegios.

:::note[Las órdenes no se traducen]
Las órdenes, los nombres de variables y las opciones (`echo`, `chmod`, `Write-Host`, `-eq`…) son siempre los originales. Solo se traducen los comentarios y los mensajes que escribes tú.
:::

## 2. El primer script en Bash

Abre un editor (`nano primer_script.sh`) y escribe:

```bash
#!/bin/bash
# primer_script.sh · el primer script
echo "Hola, esto es un script en Bash"
```

La primera línea, `#!/bin/bash`, se llama ***shebang***: le dice al sistema qué intérprete debe usar para ejecutar el archivo. A partir de ahí, todo lo que empieza por `#` es un **comentario** que el shell ignora.

Para ejecutarlo hay dos maneras:

```bash
bash primer_script.sh      # pasa el archivo a bash: no hace falta permiso de ejecución
chmod +x primer_script.sh  # da permiso de ejecución al archivo
./primer_script.sh         # lo ejecuta directamente (usa el shebang)
```

Tres cosas que sorprenden la primera vez:

- **Sin `chmod +x`**, `./primer_script.sh` responde `Permission denied`: el archivo es texto, no un programa, hasta que le das el permiso `x`.
- **Sin `./`**, el shell busca `primer_script.sh` solo en las carpetas de la variable `PATH`. La carpeta actual no está (por seguridad) y obtienes `command not found`. El `./` significa «el de la carpeta actual».
- **Sin shebang**, si lo lanzas desde Bash normalmente también funciona, pero el comportamiento depende de quién lo ejecute (otro shell, `cron`…). **Ponle siempre el shebang.**

## 3. El primer script en PowerShell

Escribe el archivo `primer_script.ps1`:

```powershell
# primer_script.ps1 · el primer script
Write-Host "Hola, esto es un script en PowerShell"
```

Se ejecuta desde una consola de PowerShell escribiendo su ruta. Como en Bash, la carpeta actual no se busca automáticamente, así que hace falta el **`.\`**:

```powershell
.\primer_script.ps1
```

Si no has hecho nada más, en Windows es muy probable que veas un error del tipo *«no se puede cargar el archivo porque la ejecución de scripts está deshabilitada en este sistema»*. No es un fallo: es la **política de ejecución** (*Execution Policy*), una medida para evitar que se ejecute un `.ps1` por descuido.

| Política | Qué permite |
|---|---|
| `Restricted` | Ningún script (es la predeterminada en los Windows de cliente) |
| `AllSigned` | Solo scripts firmados digitalmente por un editor de confianza |
| `RemoteSigned` | Scripts propios sin firmar; los descargados de Internet deben ir firmados |
| `Bypass` | No bloquea nada y no avisa |

Se consulta y se cambia así:

```powershell
Get-ExecutionPolicy -List
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

:::caution[Privilegios]
Sin `-Scope`, `Set-ExecutionPolicy` cambia la política de **todo el equipo** (`LocalMachine`) y exige una consola abierta **como administrador**. Con `-Scope CurrentUser` solo afecta a tu usuario y **no hace falta ser administrador**: es la mejor opción en una máquina de pruebas.
:::

Dos matices importantes:

- La política **no es una barrera de seguridad**, sino una protección contra errores. Cualquiera puede saltársela para un solo script con `powershell.exe -ExecutionPolicy Bypass -File script.ps1`; lo usaremos cuando programemos tareas en la página 3.
- En PowerShell sobre Linux o macOS la política de ejecución no se aplica.

## 4. Variables

Una **variable** es un espacio con nombre donde el script guarda un valor para usarlo más adelante.

| Concepto | Bash | PowerShell |
|---|---|---|
| Asignar | `nom="Ana"` | `$nom = "Ana"` |
| Leer el valor | `echo "$nom"` | `Write-Host $nom` |
| Delimitar el nombre | `echo "${nom}s"` | `Write-Host "${nom}s"` |
| Tipo | Todo es texto (la aritmética lo convierte) | Tipos reales: `[int]$edat = 17` |
| Variable de entorno | `echo "$HOME"` | `$env:USERPROFILE` |
| Resultado de una orden | `data=$(date +%F)` | `$data = Get-Date -Format "yyyy-MM-dd"` |

:::danger[El error más frecuente en Bash]
En Bash, **no puede haber espacios alrededor del signo `=`**. `edat = 20` no es una asignación: el shell intenta ejecutar una orden llamada `edat` con dos argumentos (`=` y `20`) y te responde `edat: command not found`. Se escribe `edat=20`.
En PowerShell pasa al revés: los espacios son normales (`$edat = 20`).
:::

Para leer una variable en Bash hace falta el `$` delante (`$nom`); para asignarla, **no** (`nom=…`). En PowerShell el `$` va siempre.

## 5. Comillas y expansión

Antes de ejecutar una línea, el shell la **transforma**: sustituye variables, ejecuta órdenes entre `$( )`, hace cálculos y separa el texto en palabras. Entender este paso explica la mayoría de los errores. Las comillas deciden qué se transforma:

| Escribes | Bash y PowerShell hacen… |
|---|---|
| `'$nom'` (comillas simples) | **Nada**: el texto se queda tal cual, `$nom` |
| `"$nom"` (comillas dobles) | **Sustituye** las variables: `Ana` |
| `"hoy es $(date +%F)"` | En Bash ejecuta la orden de dentro y pone su salida. En PowerShell se escribe `"hoy es $(Get-Date -Format yyyy-MM-dd)"` |
| `\$nom` en Bash, `` `$nom `` en PowerShell | **Escapa** el `$`: se muestra literalmente |

Con `nom="Ana"`, en Bash:

```bash
echo '$nom'                 # $nom
echo "$nom"                 # Ana
echo "Hola $nom, hoy es $(date +%F)"
echo "Cuesta 5\$"           # Cuesta 5$
```

Además está la **división en palabras** (*word splitting*), la trampa clásica de Bash. Una variable **sin comillas** se rompe en palabras por los espacios:

```bash
fitxer="Mi documento.txt"
ls $fitxer        # ls recibe DOS argumentos: «Mi» y «documento.txt»
ls "$fitxer"      # ls recibe UN argumento: «Mi documento.txt»
```

**Regla práctica:** en Bash, pon **siempre las variables entre comillas dobles** (`"$variable"`) salvo cuando quieras expresamente que se partan. PowerShell no tiene este problema: una variable es un valor, no texto para repartir.

Para enseñarlo, el laboratorio tiene la pestaña «Comillas y expansión»: escribe una línea y comprueba en qué palabras se convierte antes de ejecutarse.

## 6. Operadores

### Aritmética

En Bash, los cálculos se hacen dentro de `$(( ))` y solo con **enteros**:

```bash
a=7
b=2
suma=$((a + b))        # 9
quocient=$((a / b))    # 3  (división entera)
resta=$((a % b))       # 1  (resto)
```

PowerShell calcula directamente y trabaja con decimales: `7 / 2` vale `3.5`.

### Comparar

Esta es una de las diferencias que más confunden. En Bash, la condición va dentro de `[ ]` y el operador **depende de si comparas números o texto**:

| Comparación | Bash (`[ ]`) | PowerShell |
|---|---|---|
| Números: igual, distinto | `-eq`, `-ne` | `-eq`, `-ne` |
| Números: mayor, menor, mayor o igual, menor o igual | `-gt`, `-lt`, `-ge`, `-le` | `-gt`, `-lt`, `-ge`, `-le` |
| Texto: igual, distinto | `=`, `!=` | `-eq`, `-ne` |
| Texto vacío / no vacío | `-z "$x"`, `-n "$x"` | `[string]::IsNullOrEmpty($x)` |
| «Y», «o», «no» | `&&`, `\|\|`, `!` | `-and`, `-or`, `-not` |

Detalles que hay que tener presentes:

- En Bash los **espacios dentro de los corchetes son obligatorios**: `[ "$a" -gt "$b" ]`. `[$a -gt $b]` falla porque `[` es una orden y necesita un espacio después.
- Usar `-eq` con texto en Bash da el error `integer expression expected`. Usar `=` con números compara como texto.
- PowerShell **no distingue mayúsculas** en `-eq` (`"Ana" -eq "ANA"` es cierto); para distinguirlas, `-ceq`.
- En PowerShell, `>` **no compara**: redirige la salida a un archivo. `$a -gt $b` es la comparación.

## 7. Códigos de salida: cómo sabe un script si ha ido bien

Cada orden, al terminar, devuelve al shell un número: el **código de salida** (*exit code*). La convención es:

- **`0`** significa **éxito**.
- **Cualquier otro valor** (1, 2, 127…) indica un tipo de error.

En Bash, la orden anterior deja su código en la variable especial `$?`:

```bash
ls /etc > /dev/null
echo $?                  # 0: ha ido bien
ls /carpeta_inexistent 2> /dev/null
echo $?                  # 2: ls ha fallado
grep -q "root" /etc/passwd
echo $?                  # 0: se ha encontrado
```

Cada orden sobrescribe `$?`. Por eso este fragmento esconde una trampa:

```bash
mkdir /tmp/proves
mkdir /tmp/proves        # falla: ya existe (código 1)
echo "Intento hecho"     # echo termina bien: ahora $? vale 0
echo $?                  # 0, no 1
```

Si necesitas el código de una orden, **guárdalo** inmediatamente: `codi=$?`.

Un script puede terminar con su propio código con **`exit`**: `exit 0` (todo bien) o `exit 1` (ha habido un error). Si no pones `exit`, el código del script es el de la última orden ejecutada. Quien lo lance (otro script, `cron`, el Programador de tareas) puede saber así si ha ido bien.

En PowerShell hay dos indicadores distintos:

| | Qué es |
|---|---|
| `$?` | `True` o `False`: si la última instrucción ha ido bien |
| `$LASTEXITCODE` | El número que ha devuelto el último **programa externo** (`ping`, `tar`, `robocopy`…) |

La orden `exit 1` también funciona en un `.ps1`. En el laboratorio, la pestaña **«Trazador»** te deja seguir, línea a línea, cómo cambian las variables y `$?` mientras el script se ejecuta: es la forma más rápida de entenderlos.

## Comprueba lo aprendido

1. Escribes `contador = 0` en un script Bash y obtienes `contador: command not found`. ¿Por qué?

   <details>
   <summary>Respuesta</summary>

   Porque en Bash no puede haber espacios alrededor del `=` en una asignación. El shell interpreta `contador` como una orden con dos argumentos. Se escribe `contador=0`.

   </details>

2. Has creado `neteja.sh` con el shebang correcto y ejecutas `./neteja.sh`: `Permission denied`. ¿Qué falta?

   <details>
   <summary>Respuesta</summary>

   El permiso de ejecución: `chmod +x neteja.sh`. Una alternativa sin permiso es `bash neteja.sh`.

   </details>

3. Con `msg="Hola"`, ¿qué muestran `echo '$msg'` y `echo "$msg"`?

   <details>
   <summary>Respuesta</summary>

   La primera muestra literalmente `$msg` (comillas simples: no hay expansión) y la segunda muestra `Hola`.

   </details>

4. Estás en una máquina de pruebas con Windows y no tienes permisos de administrador. ¿Qué orden te deja ejecutar tus propios scripts `.ps1`?

   <details>
   <summary>Respuesta</summary>

   `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. Con el ámbito `CurrentUser` no hace falta ser administrador.

   </details>

5. Una orden falla, después haces `echo "hecho"` y después `echo $?`. ¿Qué muestra la última?

   <details>
   <summary>Respuesta</summary>

   `0`. `$?` contiene el código de la última orden, que ha sido el `echo "hecho"` (va bien). Para conservar el código de la orden que falla hay que guardarlo en una variable justo después de ejecutarla.

   </details>

## Glosario

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
