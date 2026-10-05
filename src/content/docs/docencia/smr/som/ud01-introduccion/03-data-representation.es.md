---
title: "3. Representación de la información"
description: "Cómo guarda un ordenador números y texto con bits: binario, hexadecimal, ASCII, Unicode y UTF-8, y cómo se mide la información con unidades SI e IEC."
---

Un ordenador solo conoce dos estados: pasa corriente o no pasa. Todo lo demás, desde una foto hasta una canción o la letra «ñ», es un patrón de ceros y unos. Si entiendes estos patrones podrás leer un volcado de memoria, arreglar un archivo que muestra caracteres raros y saber por qué tu disco nuevo es más pequeño de lo que dice la caja.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 6 (unos 50 minutos) y prueba los ejemplos con papel y lápiz.
2. Practica con el **[Laboratorio de Bits](/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/?lang=es)**: las pestañas *Bases* y *Conversiones* entrenan los apartados 2 y 3, y las pestañas *Unidades* y *KB vs KiB* entrenan el apartado 6. El laboratorio explica los métodos con detalle, así que esta página solo te da lo esencial.
3. Responde a las preguntas del final y haz las [actividades 5 y 6](/docencia/smr/som/ud01-introduccion/actividades/es/).
:::

## 1. Bits, bytes y palabras

- Un **bit** (dígito binario) es la unidad mínima de información: `0` o `1`.
- Un **cuarteto** (*nibble*) son 4 bits.
- Un **byte** son 8 bits. Con 8 bits puedes formar 2⁸ = **256** patrones distintos (de 0 a 255). Las memorias y los archivos se cuentan en bytes.
- Una **palabra** es el grupo de bits que un procesador maneja de una vez (por ejemplo 32 o 64 bits).

Con *n* bits puedes representar 2ⁿ valores distintos. Por eso un bit da 2 valores, 4 bits dan 16 y 8 bits dan 256.

:::note[¿Número o carácter?]
No mezcles dos ideas. Una **base de numeración** (binario, decimal, hexadecimal) es una forma de *escribir un número*. Una **codificación de caracteres** (ASCII, Unicode) es una tabla que dice *qué número representa a qué carácter*. Después, ese número se guarda como uno o más bytes.
:::

## 2. Binario (base 2)

El binario usa solo dos dígitos, `0` y `1`. Cada posición tiene un **peso** que es una potencia de 2. En un byte los pesos son, de izquierda a derecha:

| Posición | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Peso | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

**De binario a decimal:** suma los pesos de las posiciones que contienen un `1`.

```text
0100 0001  =  64 + 1                  =  65
1011 0110  =  128 + 32 + 16 + 4 + 2   =  182
```

**De decimal a binario** (método de divisiones sucesivas): divide entre 2 una y otra vez y anota los restos. Léelos del último al primero.

```text
13 ÷ 2 = 6  resto 1
 6 ÷ 2 = 3  resto 0
 3 ÷ 2 = 1  resto 1
 1 ÷ 2 = 0  resto 1      →  13 = 1101 (leído hacia arriba)
```

También puedes restar pesos: para 150, toma 128 (150 − 128 = 22), luego 16 (22 − 16 = 6), luego 4 (6 − 4 = 2) y luego 2. Los bits son `1001 0110`.

:::tip[Comprobación rápida]
Un número binario que acaba en `0` es par, y si acaba en `1` es impar. Añadir un cero al final duplica el valor (`101` es 5 y `1010` es 10).
:::

## 3. Hexadecimal (base 16)

Los números binarios son largos y difíciles de leer. El **hexadecimal** usa 16 dígitos: `0–9` y después `A–F`. La gran ventaja es que **un dígito hexadecimal es exactamente un cuarteto (4 bits)**, así que dos dígitos hexadecimales son un byte.

| Decimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Binario | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |

**De binario a hexadecimal:** agrupa los bits de cuatro en cuatro, empezando por la derecha, y sustituye cada grupo por su dígito hexadecimal. **De hexadecimal a binario:** haz lo contrario.

```text
1010 1111  →  A F    →  0xAF  = 10×16 + 15 = 175
0x4F       →  0100 1111
```

Un prefijo como `0x` (`0x4F`) o un sufijo como `h` indica que un número es hexadecimal. El hexadecimal aparece en muchos sitios: direcciones de memoria, direcciones MAC (`3C:52:82:1A:F0:9B`), colores en la web (`#FF8800` significa rojo 255, verde 136, azul 0) y volcados de archivos.

## 4. Representación de caracteres

### 4.1 ASCII

**ASCII** asigna un número del 0 al 127 (7 bits) a 128 caracteres: códigos de control, dígitos, letras inglesas y signos de puntuación. Se guarda en un byte y el bit más alto queda sin usar.

| Carácter | Decimal | Hex | Binario |
|---|---|---|---|
| `0` (dígito) | 48 | 0x30 | 0011 0000 |
| espacio | 32 | 0x20 | 0010 0000 |
| `A` | 65 | 0x41 | 0100 0001 |
| `Z` | 90 | 0x5A | 0101 1010 |
| `a` | 97 | 0x61 | 0110 0001 |
| salto de línea (LF) | 10 | 0x0A | 0000 1010 |
| retorno de carro (CR) | 13 | 0x0D | 0000 1101 |

Fíjate en que `A` y `a` se diferencian en un solo bit: el código de la minúscula es el de la mayúscula **más 32** (0x20). El texto `Hi` se guarda como los dos bytes `48 69` (hex).

ASCII no tiene letras como `ñ`, `é` o `ç`. Aparecieron muchas tablas de «ASCII extendido» que usan el octavo bit (códigos 128 a 255) para esos símbolos, por ejemplo **ISO-8859-1** (*Latin-1*) y *Windows-1252*. El problema es que cada tabla da un significado distinto al mismo código por encima de 127.

### 4.2 Unicode y UTF-8

**Unicode** es un catálogo universal. Da un número único, llamado **punto de código**, a cada carácter de casi todos los sistemas de escritura del mundo, además de símbolos y emojis (mucho más de 100.000 caracteres). Un punto de código se escribe `U+` seguido de dígitos hexadecimales:

| Carácter | Punto de código |
|---|---|
| `A` | U+0041 |
| `ñ` | U+00F1 |
| `€` | U+20AC |
| `漢` | U+6F22 |
| 😀 | U+1F600 |

Unicode define los puntos de código, pero no cómo guardarlos como bytes. De eso se encargan las codificaciones **UTF** (*Unicode Transformation Format*):

| Codificación | Bytes por carácter | Notas |
|---|---|---|
| **UTF-8** | de 1 a 4 (variable) | Los primeros 128 caracteres son idénticos a ASCII, así que los archivos ASCII antiguos son UTF-8 válido. Es el estándar en la web y la opción por defecto en Linux y macOS. |
| **UTF-16** | 2 o 4 | Lo usan internamente Windows y Java, entre otros. |
| **UTF-32** | 4 (fijo) | Sencillo, pero desperdicia espacio. |

Ejemplos en UTF-8 (bytes en hexadecimal):

| Carácter | Punto de código | Bytes en UTF-8 |
|---|---|---|
| `A` | U+0041 | `41` (1 byte) |
| `ñ` | U+00F1 | `C3 B1` (2 bytes) |
| `€` | U+20AC | `E2 82 AC` (3 bytes) |
| 😀 | U+1F600 | `F0 9F 98 80` (4 bytes) |

Así, la palabra `Mañana` tiene 6 caracteres pero ocupa **7 bytes** en UTF-8: `4D 61 C3 B1 61 6E 61`. En Linux o macOS puedes ver los bytes de cualquier texto con la herramienta `xxd`:

```bash
printf 'Mañana' | xxd
# 00000000: 4d61 c3b1 616e 61                        Ma..ana
```

### 4.3 Mojibake: cuando la codificación es incorrecta

Si un programa lee un archivo con una codificación distinta de la que se usó para escribirlo, obtienes **mojibake**: caracteres basura. El caso clásico es un archivo UTF-8 abierto como ISO-8859-1. Los bytes `C3 B1` de la `ñ` se leen como dos caracteres separados, `Ã` (C3) y `±` (B1):

```text
Guardado como UTF-8:    España   →   bytes 45 73 70 61 C3 B1 61
Leído como ISO-8859-1:  EspaÃ±a
```

También ocurre al revés: un archivo ISO-8859-1 en el que `ñ` es el byte único `F1` no es válido como UTF-8, así que el programa muestra un símbolo de sustitución (`�`). La solución es abrir el archivo con la codificación correcta o convertirlo (con un editor de texto o con la herramienta `iconv`).

## 5. Qué relación tiene con el sistema operativo

El sistema de archivos guarda **bytes**. No sabe si son texto, una foto o un programa. El SO y las aplicaciones deben ponerse de acuerdo en cómo interpretarlos:

- **Nombres de archivo y archivos de texto.** Los sistemas modernos usan Unicode para los nombres de archivo, así que puedes llamar a un archivo `canción.txt`. Dentro del archivo, la codificación la elige el programa que lo guardó. La codificación *no* la da la extensión.
- **Terminales y fuentes.** El terminal debe usar la misma codificación que el programa que escribe en él, y la fuente debe contener un dibujo (*glifo*) para cada carácter. Los glifos que faltan aparecen como cuadrados vacíos.
- **Configuración regional (*locale*).** La *locale* del sistema fija el idioma, los formatos de fecha y número, las reglas de ordenación y la codificación por defecto de algunas herramientas.
- **Fin de línea.** Linux y macOS terminan una línea con LF (`0x0A`). Windows usa dos bytes, CR LF (`0x0D 0x0A`). Un script escrito en Windows puede fallar en Linux por el CR de más.
- **BOM.** Algunos archivos UTF empiezan con una *marca de orden de bytes*. No sirve para nada en UTF-8 y puede romper scripts; es preferible UTF-8 *sin* BOM.

## 6. Unidades de información

La información digital se mide en bits y bytes (`b` es bit, `B` es byte). Existen dos familias de prefijos:

| Prefijo (SI, decimal) | Valor | Prefijo (IEC, binario) | Valor |
|---|---|---|---|
| kilo (kB) | 10³ = 1.000 B | kibi (KiB) | 2¹⁰ = 1.024 B |
| mega (MB) | 10⁶ = 1.000.000 B | mebi (MiB) | 2²⁰ = 1.048.576 B |
| giga (GB) | 10⁹ B | gibi (GiB) | 2³⁰ = 1.073.741.824 B |
| tera (TB) | 10¹² B | tebi (TiB) | 2⁴⁰ B |

La diferencia crece con el tamaño: alrededor de un 2,4 % para kilo, un 4,9 % para mega, un 7,4 % para giga y un 10 % para tera.

- Los fabricantes de discos y las velocidades de red usan unidades **SI** (decimales).
- La memoria se cuenta de forma natural en potencias de dos, así que los tamaños de RAM son binarios (un módulo de RAM de 8 GB son en realidad 8 GiB).
- Cada sistema operativo o herramienta decide cómo mostrar los tamaños. El Explorador de archivos de **Windows** divide entre 1.024 pero escribe «GB». **macOS** usa unidades decimales. En **Linux** depende de la herramienta: muchas herramientas de línea de órdenes (`ls -lh`, `df -h`) usan potencias de 1.024, mientras que `df -H` usa potencias de 1.000. Comprueba siempre qué unidad se usa.

**¿Por qué mi disco de 1 TB muestra menos?** La caja dice 1 TB = 10¹² bytes. Windows divide entre 2³⁰ y escribe GB:

```text
10¹² ÷ 2³⁰ = 931,3   →   Windows muestra unos 931 GB (en realidad 931 GiB)
```

El disco no pierde espacio. Los dos lados usan unidades distintas.

**Las velocidades de red** se miden en bits por segundo. Para obtener bytes por segundo, divide entre 8: una conexión de 100 Mb/s da, como mucho, 12,5 MB/s, así que una descarga de 1 GB tarda al menos 80 segundos.

## Comprueba lo aprendido

1. Convierte `1100 1010` a decimal y a hexadecimal.

   <details>
   <summary>Respuesta</summary>

   128 + 64 + 8 + 2 = **202**. En grupos de cuatro: `1100` es C y `1010` es A, así que el valor hexadecimal es **0xCA**.

   </details>

2. Convierte el decimal 99 a binario (8 bits) y a hexadecimal.

   <details>
   <summary>Respuesta</summary>

   99 = 64 + 32 + 2 + 1, así que el número binario es **0110 0011**. Los grupos son 6 y 3, así que el valor hexadecimal es **0x63**.

   </details>

3. ¿Qué carácter ASCII tiene el código 0x4F? ¿Y cuál es el código de `b`?

   <details>
   <summary>Respuesta</summary>

   0x4F = 79, que es la letra **O** (A es 65, así que O es 65 + 14). El código de `b` es 98 (`a` es 97), o 0x62.

   </details>

4. Una página web muestra «canciÃ³n» en lugar de «canción». ¿Qué ha fallado y cómo se arregla?

   <details>
   <summary>Respuesta</summary>

   El texto se guardó en UTF-8, donde `ó` ocupa dos bytes (`C3 B3`), pero la página se lee como ISO-8859-1, que muestra cada byte como un carácter (`Ã` y `³`). Se arregla eligiendo UTF-8 como codificación al leer el archivo.

   </details>

5. Una tienda vende un disco externo de 2 TB. ¿De qué tamaño lo mostrará, aproximadamente, un sistema operativo que use unidades binarias?

   <details>
   <summary>Respuesta</summary>

   2 × 10¹² bytes ÷ 2³⁰ ≈ 1.863 GiB, o unos 1,82 TiB. El disco no está defectuoso: la caja usa unidades decimales.

   </details>

## Glosario

| English | Castellano |
|---|---|
| bit / byte / nibble | bit / byte (octeto) / cuarteto |
| word | palabra |
| binary / decimal / hexadecimal | binario / decimal / hexadecimal |
| number base | base de numeración |
| weight (of a position) | peso (de una posición) |
| character encoding | codificación de caracteres |
| ASCII | ASCII |
| Unicode | Unicode |
| code point | punto de código |
| UTF-8 / UTF-16 / UTF-32 | UTF-8 / UTF-16 / UTF-32 |
| mojibake | texto ilegible por codificación errónea |
| line ending | fin de línea |
| byte order mark (BOM) | marca de orden de bytes |
| prefix | prefijo |
| kilobyte (kB) / kibibyte (KiB) | kilobyte (kB) / kibibyte (KiB) |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
