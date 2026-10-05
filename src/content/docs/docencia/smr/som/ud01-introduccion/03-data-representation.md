---
title: "3. Data representation"
description: "How a computer stores numbers and text with bits: binary, hexadecimal, ASCII, Unicode and UTF-8, and how information is measured with SI and IEC units."
---

A computer only knows two states: electricity flows or it does not. Everything else, from a photo to a song or the letter "ñ", is a pattern of zeros and ones. If you understand these patterns you can read a memory dump, fix a file that shows strange characters and know why your new disk is smaller than the box says.

:::tip[How to use this page]
1. Read sections 1 to 6 (about 50 minutes) and try the examples with paper and pencil.
2. Practise with the **[Bit Lab](/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/)**: the tabs *Number bases* and *Conversions* train sections 2 and 3, and the tabs *Units* and *KB vs KiB* train section 6. The lab explains the methods in detail, so this page only gives you the essentials.
3. Answer the questions at the end and do [Activity 5 and 6](/docencia/smr/som/ud01-introduccion/actividades/).
:::

## 1. Bits, bytes and words

- A **bit** (binary digit) is the smallest unit of information: `0` or `1`.
- A **nibble** is 4 bits.
- A **byte** is 8 bits. With 8 bits you can make 2⁸ = **256** different patterns (from 0 to 255). Memories and files are counted in bytes.
- A **word** is the group of bits that a processor handles at once (for example 32 or 64 bits).

With *n* bits you can represent 2ⁿ different values. That is why one bit gives 2 values, 4 bits give 16 and 8 bits give 256.

:::note[Number or character?]
Do not mix two ideas. A **number base** (binary, decimal, hexadecimal) is a way to *write a number*. A **character encoding** (ASCII, Unicode) is a table that says *which number stands for which character*. Then that number is stored as one or more bytes.
:::

## 2. Binary (base 2)

Binary uses only two digits, `0` and `1`. Each position has a **weight** that is a power of 2. In one byte the weights are, from left to right:

| Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Weight | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

**Binary to decimal:** add the weights of the positions that contain a `1`.

```text
0100 0001  =  64 + 1                  =  65
1011 0110  =  128 + 32 + 16 + 4 + 2   =  182
```

**Decimal to binary** (method of successive divisions): divide by 2 again and again and write the remainders. Read them from the last one to the first one.

```text
13 ÷ 2 = 6  remainder 1
 6 ÷ 2 = 3  remainder 0
 3 ÷ 2 = 1  remainder 1
 1 ÷ 2 = 0  remainder 1      →  13 = 1101 (read upwards)
```

You can also subtract weights: for 150, take 128 (150 − 128 = 22), then 16 (22 − 16 = 6), then 4 (6 − 4 = 2), then 2. The bits are `1001 0110`.

:::tip[Quick check]
A binary number ending in `0` is even, and ending in `1` is odd. Adding a zero at the end doubles the value (`101` is 5 and `1010` is 10).
:::

## 3. Hexadecimal (base 16)

Binary numbers are long and hard to read. **Hexadecimal** uses 16 digits: `0–9` and then `A–F`. The big advantage is that **one hex digit is exactly one nibble (4 bits)**, so two hex digits are one byte.

| Decimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Binary | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |

**Binary to hexadecimal:** group the bits in fours, starting from the right, and replace each group by its hex digit. **Hexadecimal to binary:** do the opposite.

```text
1010 1111  →  A F    →  0xAF  = 10×16 + 15 = 175
0x4F       →  0100 1111
```

A prefix such as `0x` (`0x4F`) or a suffix such as `h` shows that a number is hexadecimal. Hex appears in many places: memory addresses, MAC addresses (`3C:52:82:1A:F0:9B`), colours on the web (`#FF8800` means red 255, green 136, blue 0) and in file dumps.

## 4. Representing characters

### 4.1 ASCII

**ASCII** assigns a number from 0 to 127 (7 bits) to 128 characters: control codes, digits, English letters and punctuation. It is stored in one byte, and the top bit is unused.

| Character | Decimal | Hex | Binary |
|---|---|---|---|
| `0` (digit) | 48 | 0x30 | 0011 0000 |
| space | 32 | 0x20 | 0010 0000 |
| `A` | 65 | 0x41 | 0100 0001 |
| `Z` | 90 | 0x5A | 0101 1010 |
| `a` | 97 | 0x61 | 0110 0001 |
| line feed (LF) | 10 | 0x0A | 0000 1010 |
| carriage return (CR) | 13 | 0x0D | 0000 1101 |

Notice that `A` and `a` differ in one bit only: the lowercase code is the uppercase code **plus 32** (0x20). The text `Hi` is stored as the two bytes `48 69` (hex).

ASCII has no letters like `ñ`, `é` or `ç`. Many "extended ASCII" tables appeared that use the 8th bit (codes 128 to 255) for those symbols, for example **ISO-8859-1** (*Latin-1*) and *Windows-1252*. The problem is that each table gives a different meaning to the same code above 127.

### 4.2 Unicode and UTF-8

**Unicode** is a universal catalogue. It gives a unique number, called **code point**, to each character of almost all the writing systems of the world, plus symbols and emoji (well over 100,000 characters). A code point is written `U+` followed by hexadecimal digits:

| Character | Code point |
|---|---|
| `A` | U+0041 |
| `ñ` | U+00F1 |
| `€` | U+20AC |
| `漢` | U+6F22 |
| 😀 | U+1F600 |

Unicode defines the code points, but not how to store them as bytes. That is the job of the **UTF** encodings (*Unicode Transformation Format*):

| Encoding | Bytes per character | Notes |
|---|---|---|
| **UTF-8** | 1 to 4 (variable) | The first 128 characters are identical to ASCII, so old ASCII files are valid UTF-8. It is the standard on the web and the default in Linux and macOS. |
| **UTF-16** | 2 or 4 | Used internally by Windows and by Java, among others. |
| **UTF-32** | 4 (fixed) | Simple but wastes space. |

Examples in UTF-8 (hexadecimal bytes):

| Character | Code point | UTF-8 bytes |
|---|---|---|
| `A` | U+0041 | `41` (1 byte) |
| `ñ` | U+00F1 | `C3 B1` (2 bytes) |
| `€` | U+20AC | `E2 82 AC` (3 bytes) |
| 😀 | U+1F600 | `F0 9F 98 80` (4 bytes) |

So the word `Mañana` has 6 characters but takes **7 bytes** in UTF-8: `4D 61 C3 B1 61 6E 61`. On Linux or macOS you can see the bytes of any text with the `xxd` tool:

```bash
printf 'Mañana' | xxd
# 00000000: 4d61 c3b1 616e 61                        Ma..ana
```

### 4.3 Mojibake: when the encoding is wrong

If a program reads a file with a different encoding from the one used to write it, you get **mojibake**: garbage characters. The classic case is a UTF-8 file opened as ISO-8859-1. The bytes `C3 B1` of `ñ` are read as two separate characters, `Ã` (C3) and `±` (B1):

```text
Saved as UTF-8:       España   →   bytes 45 73 70 61 C3 B1 61
Read as ISO-8859-1:   EspaÃ±a
```

The opposite also happens: an ISO-8859-1 file where `ñ` is the single byte `F1` is invalid as UTF-8, so the program shows a replacement symbol (`�`). The solution is to open the file with the correct encoding, or to convert it (with a text editor or the `iconv` tool).

## 5. How the operating system is involved

The file system stores **bytes**. It does not know if they are text, a photo or a program. The OS and the applications must agree on how to interpret them:

- **File names and text files.** Modern systems use Unicode for file names, so you can name a file `canción.txt`. Inside the file, the encoding is a choice of the program that saved it. The encoding is *not* given by the extension.
- **Terminals and fonts.** The terminal must use the same encoding as the program that prints in it, and the font must contain a drawing (*glyph*) for each character. Missing glyphs appear as empty squares.
- **Locale.** The *locale* of the system sets the language, the date and number formats, the sorting rules and the default encoding for some tools.
- **Line endings.** Linux and macOS end a line with LF (`0x0A`). Windows uses two bytes, CR LF (`0x0D 0x0A`). A script written in Windows can fail in Linux because of the extra CR.
- **BOM.** Some UTF files start with a *byte order mark*. It is useless in UTF-8 and can break scripts; prefer UTF-8 *without* BOM.

## 6. Units of information

Digital information is measured in bits and bytes (`b` is bit, `B` is byte). Two families of prefixes exist:

| Prefix (SI, decimal) | Value | Prefix (IEC, binary) | Value |
|---|---|---|---|
| kilo (kB) | 10³ = 1,000 B | kibi (KiB) | 2¹⁰ = 1,024 B |
| mega (MB) | 10⁶ = 1,000,000 B | mebi (MiB) | 2²⁰ = 1,048,576 B |
| giga (GB) | 10⁹ B | gibi (GiB) | 2³⁰ = 1,073,741,824 B |
| tera (TB) | 10¹² B | tebi (TiB) | 2⁴⁰ B |

The difference grows with the size: about 2.4 % for kilo, 4.9 % for mega, 7.4 % for giga and 10 % for tera.

- Disk manufacturers and network speeds use **SI** units (decimal).
- Memory is naturally counted in powers of two, so RAM sizes are binary (an 8 GB RAM module is really 8 GiB).
- Each operating system or tool decides how to show sizes. **Windows** File Explorer divides by 1,024 but writes "GB". **macOS** uses decimal units. **Linux** depends on the tool: many command-line tools (`ls -lh`, `df -h`) use powers of 1,024, while `df -H` uses powers of 1,000. Always check which unit is used.

**Why does my 1 TB disk show less?** The box says 1 TB = 10¹² bytes. Windows divides by 2³⁰ and writes GB:

```text
10¹² ÷ 2³⁰ = 931.3   →   Windows shows about 931 GB (really 931 GiB)
```

The disk does not lose space. The two sides use different units.

**Network speeds** are measured in bits per second. To get bytes per second, divide by 8: a 100 Mb/s connection is at best 12.5 MB/s, so a 1 GB download takes at least 80 seconds.

## Check what you have learned

1. Convert `1100 1010` to decimal and to hexadecimal.

   <details>
   <summary>Answer</summary>

   128 + 64 + 8 + 2 = **202**. In groups of four: `1100` is C and `1010` is A, so the hex value is **0xCA**.

   </details>

2. Convert decimal 99 to binary (8 bits) and to hexadecimal.

   <details>
   <summary>Answer</summary>

   99 = 64 + 32 + 2 + 1, so the binary number is **0110 0011**. The groups are 6 and 3, so the hex value is **0x63**.

   </details>

3. Which ASCII character has the code 0x4F? And what is the code of `b`?

   <details>
   <summary>Answer</summary>

   0x4F = 79, which is the letter **O** (A is 65, so O is 65 + 14). The code of `b` is 98 (`a` is 97), or 0x62.

   </details>

4. A web page shows "canciÃ³n" instead of "canción". What went wrong, and how do you fix it?

   <details>
   <summary>Answer</summary>

   The text was saved in UTF-8, where `ó` takes two bytes (`C3 B3`), but the page is read as ISO-8859-1, which shows each byte as one character (`Ã` and `³`). Fix it by choosing UTF-8 as the encoding when reading the file.

   </details>

5. A shop sells a 2 TB external disk. How large will an operating system that uses binary units show it, approximately?

   <details>
   <summary>Answer</summary>

   2 × 10¹² bytes ÷ 2³⁰ ≈ 1,863 GiB, or about 1.82 TiB. The disk is not defective: the box uses decimal units.

   </details>

## Glossary

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

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
