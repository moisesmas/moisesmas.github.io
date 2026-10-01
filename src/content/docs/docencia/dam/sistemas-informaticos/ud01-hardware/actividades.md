---
title: "Activitats"
description: "Huit activitats de la unitat 1: set d'estudi autònom (amb els laboratoris) i la fitxa de reconeixement de components de la sessió presencial."
---

Estes són les activitats de la unitat. Les set primeres les fas pel teu compte, a mesura que avances amb els apunts, i apliquen el que has llegit amb números i casos reals (moltes es recolzen en els laboratoris). La huitena és la fitxa que completes durant la sessió presencial. Pots veure quan fer cada una en la [planificació](/docencia/dam/sistemas-informaticos/ud01-hardware/planificacion/).

Totes es **lliuren en Aules**, en la tasca corresponent, en un document (PDF, ODT o DOCX) amb el teu nom. No cal copiar els enunciats: numera les respostes.

## Activitat 1 · Llegir la fitxa d'una placa base

**Objectiu:** extraure d'una fitxa tècnica les dades que decidixen la compatibilitat: sòcol, tipus de RAM, ranures i factor de forma.

**Què has de fer:**

1. Obri el laboratori «Anatomia de la placa base» (a la presentació de la unitat) i repassa-hi les pestanyes de sòcols i chipsets, de RAM i expansió i de formats.
2. Llig les fitxes de tres plaques (suposa que totes tenen la UEFI actualitzada):

   | Dada | Placa A | Placa B | Placa C |
   |---|---|---|---|
   | Sòcol | LGA1700 | AM4 | AM5 |
   | Chipset | B760 | B550 | B650E |
   | RAM | 4 ranures DDR5 | 4 ranures DDR4 | 2 ranures DDR5 |
   | Ranura gràfica | PCIe 4.0 x16 | PCIe 4.0 x16 | PCIe 5.0 x16 |
   | Emmagatzematge | 2 M.2 NVMe PCIe 4.0 · 4 SATA | 1 M.2 NVMe PCIe 4.0 + 1 M.2 NVMe PCIe 3.0 · 6 SATA | 1 M.2 NVMe PCIe 5.0 + 1 M.2 NVMe PCIe 4.0 · 4 SATA |
   | Factor de forma | ATX | microATX | Mini-ITX |

3. Respon i justifica cada resposta en una o dues línies:
   - **a)** Quines d'estes CPU admet cada placa: Core i5-13400, Ryzen 5 5600, Ryzen 7 7700 i Core i7-14700?
   - **b)** Tens un kit de RAM DDR4-3200 i un altre DDR5-5600. Quin pots usar en cada placa? Per què no val l'altre?
   - **c)** Vols instal·lar un SSD NVMe PCIe 5.0 a la màxima velocitat. Quina placa ho permet? Què passa si el poses en una altra?
   - **d)** Un xassís de mini-torre només admet microATX i Mini-ITX. Quines plaques hi caben? I en un xassís SFF que només admet Mini-ITX?
   - **e)** Instal·les un SSD NVMe PCIe 4.0 en la ranura M.2 PCIe 3.0 de la placa B. Funcionarà? A quina velocitat aproximada?

**Què entregues:** un document amb les respostes **a** a **e** (taula de compatibilitat més la justificació), en la tasca «Activitat 1» d'Aules.

**Criteris que treballa:** RA1.a

**Dificultat:** ★☆☆ · **Temps estimat:** 40 minuts

## Activitat 2 · Executa un programa a mà

**Objectiu:** entendre què fa cada registre de la CPU mentre s'executa un programa guardat en memòria.

**Què has de fer:**

1. Repassa «El computador senzill» de la [pàgina 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/). Cada paraula de memòria té tres dígits: el primer és l'operació i els dos últims, l'adreça (`110` és `LOAD 10`). El repertori és este:

   | Paraula | Instrucció | Què fa |
   |---|---|---|
   | 000 | `HALT` | Para el programa |
   | 1xx | `LOAD xx` | AC ← contingut de l'adreça xx |
   | 2xx | `STORE xx` | Adreça xx ← AC |
   | 3xx | `ADD xx` | AC ← AC + contingut de l'adreça xx |
   | 4xx | `SUB xx` | AC ← AC − contingut de l'adreça xx |
   | 5xx | `MUL xx` | AC ← AC × contingut de l'adreça xx |
   | 6xx | `JMP xx` | CP ← xx |
   | 7xx | `JZ xx` | Si AC = 0, CP ← xx |
   | 800 | `IN` | AC ← següent valor del teclat |
   | 900 | `OUT` | Mostra l'AC per pantalla |

2. Este és el programa (les adreces 10 i 11 són dades i comencen en 0). Llig dos nombres, L i A, i mostra 2 × (L + A). Al teclat s'introduïxen un 5 i després un 3.

   | Adreça | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10 | 11 |
   |---|---|---|---|---|---|---|---|---|---|---|
   | Contingut | `IN` | `STORE 10` | `IN` | `ADD 10` | `STORE 11` | `ADD 11` | `OUT` | `HALT` | 0 | 0 |

3. **Sense usar el simulador**, fes una taula amb una fila per instrucció (8 files) amb el valor de CP, RDM, RIM, RI i AC i el contingut de les adreces 10 i 11 **en acabar** cada instrucció (després de l'últim pas, inclòs l'accés a la dada).
4. Comprova la taula en la pestanya «Registres pas a pas» del [laboratori «Dins de la CPU»](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/#registres) (programa «Perímetre d'un rectangle»). Corregix les files que no coincidisquen i explica l'error.
5. Amb l'editor de memòria del simulador, modifica el programa perquè mostre L × A (l'àrea). Indica quines paraules de memòria has canviat i què mostra amb els mateixos valors.
6. Quantes vegades accedix la CPU a la memòria en executar tot el programa original (comptant les instruccions i les dades)? Raona-ho.

**Què entregues:** la taula del punt 3 corregida, les respostes als punts 5 i 6 i una captura del simulador amb el programa que has modificat, en la tasca «Activitat 2» d'Aules.

**Criteris que treballa:** RA1.a, RA1.b

**Dificultat:** ★★☆ · **Temps estimat:** 45 minuts

## Activitat 3 · La memòria: RAM i memòria cau

**Objectiu:** comparar mòduls de RAM amb números i comprovar quant guanya una memòria cau segons el patró d'accés.

**Què has de fer:**

**Part A. RAM** (pestanya «Calculadora de RAM» del [laboratori](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/#ram))

1. Per a cada kit calcula amb la fórmula (i comprova-ho amb el laboratori) la **latència real** en ns i l'**ample de banda** per canal i en *dual channel*:

   | Kit | Tipus | Mòduls |
   |---|---|---|
   | A | DDR4-2666 CL19 | 2 × 8 GB |
   | B | DDR4-3600 CL18 | 2 × 16 GB |
   | C | DDR5-4800 CL40 | 2 × 16 GB |
   | D | DDR5-6000 CL30 | 2 × 16 GB |

2. Ordena els kits de menor a major latència i de menor a major ample de banda. Què observes entre els kits B i C?
3. Un portàtil té ranures SO-DIMM DDR5. Pot usar el kit D? Raona-ho.
4. Un equip té un únic mòdul de 16 GB. Què millores si afegixes un segon mòdul idèntic i què no millora?

**Part B. Memòria cau** (pestanya «On és la dada?» del [laboratori](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/#dada))

5. En el simulador de cau, una cau d'*N* línies amb blocs de *B* paraules (reemplaçament LRU). Un encert costa 1 ns i una fallada, 81 ns (1 de la cau més 80 de la RAM). Executa estos patrons d'accés amb les tres configuracions i completa una taula amb encerts, fallades, taxa d'encert i temps total:

   | Patró | Adreces |
   |---|---|
   | P1 | 0, 1, 2, … fins a 31 (seqüencial) |
   | P2 | 0, 4, 8 repetides 8 vegades (24 accessos) |
   | P3 | 0, 16, 32, 48 repetides 6 vegades (24 accessos) |

   | Configuració | Línies (*N*) | Paraules per bloc (*B*) |
   |---|---|---|
   | C1 | 4 | 4 |
   | C2 | 2 | 4 |
   | C3 | 4 | 1 |

6. Explica, en 5-6 línies, quina localitat (temporal o espacial) aprofita cada patró i per què algunes configuracions no milloren res.

**Què entregues:** les taules i les respostes de les dues parts, en la tasca «Activitat 3» d'Aules.

**Criteris que treballa:** RA1.b

**Dificultat:** ★★☆ · **Temps estimat:** 60 minuts

## Activitat 4 · El RAID del servidor del departament

**Objectiu:** triar un nivell de RAID calculant la capacitat útil i la tolerància a fallades.

**Què has de fer:**

1. El departament compra un servidor amb **6 discs de 4 TB**. Completa la taula per a cada nivell: capacitat útil, nombre de discs que pot perdre i mínim de discs.

   | Nivell | Capacitat útil | Discs que pot perdre | Mínim de discs |
   |---|---|---|---|
   | RAID 0 | | | |
   | RAID 5 | | | |
   | RAID 6 | | | |
   | RAID 10 | | | |
   | JBOD | | | |

2. Tria un nivell per a cada situació i justifica-ho en dues línies: **(a)** una estació de muntatge de vídeo amb arxius temporals que es poden regenerar; **(b)** el servidor d'arxius del departament, amb els 6 discs; **(c)** un xicotet servidor amb només 2 discs; **(d)** una base de dades amb moltes escriptures i que no pot parar; **(e)** discs vells amb còpies d'arxius sense importància.
3. El servidor del punt 1 es configura en RAID 5 i es considera «assegurat». Escriu **tres situacions** en què el RAID no salvaria les dades i què faries per a protegir-te en cada una.
4. Quan un disc de 4 TB falla, la reconstrucció pot durar moltes hores. Per què això preocupa més en RAID 5 que en RAID 6?

**Què entregues:** la taula i les respostes, en la tasca «Activitat 4» d'Aules.

**Criteris que treballa:** RA1.a, RA1.b

**Dificultat:** ★★☆ · **Temps estimat:** 45 minuts

## Activitat 5 · Quina font necessita este equip?

**Objectiu:** calcular la potència necessària, triar els connectors i valorar l'eficiència d'una font.

**Què has de fer:**

1. Calcula la potència màxima de l'equip (suma de consums) i la de la font amb un marge del 30 %. Tria la font comercial immediatament superior de la llista: 300, 350, 400, 450, 500, 550, 600, 650, 750 i 850 W.

   | Component | Consum |
   |---|---|
   | CPU | 125 W |
   | Targeta gràfica | 200 W |
   | Placa base | 50 W |
   | RAM (2 mòduls) | 5 W cada un |
   | SSD NVMe (2) | 6 W cada un |
   | HDD (1) | 8 W |
   | Ventiladors (4) | 3 W cada un |

2. La gràfica porta un connector PCIe de 8 pins, la placa un EPS de 8 pins, i hi ha un HDD SATA. Fes la llista de connectors mínims que ha de tindre la font.
3. L'equip consumix de mitjana 250 W (corrent continu) durant 8 hores al dia i 220 dies a l'any, i el preu de l'electricitat és de 0,15 €/kWh (dada de l'enunciat). Compara una font 80 PLUS Bronze (85 %) i una Gold (90 %): quants W prenen de la xarxa i quant costa de diferència a l'any? Si la Gold costa 25 € més, en quants anys s'amortitza?
4. Un servidor amb 4 HDD necessita més marge del que diu la suma de consums. Per què? (Pista: pensa en el moment d'arrancar.)

**Què entregues:** els càlculs i les respostes, amb les operacions escrites, en la tasca «Activitat 5» d'Aules.

**Criteris que treballa:** RA1.a

**Dificultat:** ★★☆ · **Temps estimat:** 40 minuts

## Activitat 6 · Un equip per a cada ús

**Objectiu:** triar components compatibles i raonats segons l'ús, i comprovar que funcionen junts.

**Què has de fer:** proposa una configuració per a cada perfil:

- **Perfil 1:** ofimàtica per a la secretaria del centre (Word, Excel, navegador), una pantalla, que siga silenciós i de consum baix.
- **Perfil 2:** estació de desenvolupament DAM: IDE, navegador amb moltes pestanyes, base de dades i dues màquines virtuals alhora, dos monitors.
- **Perfil 3:** servidor d'arxius del departament: funciona 24 hores, 4 discs, tolera l'avaria d'un disc, xarxa Gigabit, sense monitor.

1. Per a cada perfil, fes una taula amb una fila per component: **xassís i factor de forma, placa (sòcol i chipset), CPU (gamma i nuclis), RAM (generació, capacitat i canals), emmagatzematge (tipus i quantitat; el RAID en el perfil 3), gràfica (integrada o dedicada), font (potència amb marge, calculada com en l'activitat 5) i perifèrics**. Escriu en cada fila una elecció concreta i una justificació d'una línia. No cal indicar models ni preus.
2. Per a cada perfil, fes esta **comprovació de compatibilitat** i marca si passa o no: el sòcol coincidix amb la CPU; la generació de RAM és la de la placa; el tipus d'emmagatzematge (SATA, M.2 NVMe) té ranura; la placa cap en el xassís; la font té els connectors necessaris i potència amb marge; la refrigeració cobrix el TDP de la CPU.
3. Escriu 5 línies sobre què canviaries si el pressupost fora la meitat.

**Què entregues:** les tres taules, les comprovacions i el comentari final, en la tasca «Activitat 6» d'Aules.

**Criteris que treballa:** RA1.a, RA1.b, RA1.d

**Dificultat:** ★★★ · **Temps estimat:** 90 minuts

## Activitat 7 · Interpreta els mapes d'una xarxa

**Objectiu:** llegir un mapa físic i un de lògic de la mateixa xarxa i extraure'n informació.

![Mapa físic (dalt) i mapa lògic (baix) d'una xarxa d'institut: sala de servidors amb router, servidor i switch A; aula 1 amb switch B i tres PC; aula 2 amb switch C i dos PC; sala de professorat amb un PC i una impressora connectats directament al switch A. En el mapa lògic hi ha dues xarxes: Alumnat (192.168.10.0) i Professorat (192.168.20.0).](./activitat-mapes.svg)

**Què has de fer:** respon amb el mapa davant.

1. Quants cables UTP apareixen en el mapa físic?
2. En quina sala és la impressora? A quina xarxa lògica pertany?
3. El servidor és en la sala de servidors, però pertany a la xarxa Professorat. Per què no és una contradicció?
4. Si es talla el **cable 1**, quins equips perden la connexió amb el servidor i amb Internet?
5. Si falla el **switch A**, quins equips continuen podent comunicar-se entre ells?
6. Quina topologia física té la xarxa? Raona-ho.
7. Proposa un canvi (afegir un enllaç) perquè l'aula 1 no quede aïllada si es talla el cable 1, i digues a quina topologia s'acosta la xarxa resultant.
8. Quin mapa consultes per a **localitzar** un cable defectuós i quin per a saber **a quina xarxa** pertany un PC?

**Què entregues:** les respostes numerades, en la tasca «Activitat 7» d'Aules.

**Criteris que treballa:** RA1.e, RA1.f, RA1.g

**Dificultat:** ★★☆ · **Temps estimat:** 35 minuts

## Activitat 8 · Fitxa de reconeixement de components (presencial)

**Objectiu:** identificar els components d'un equip real, manipular-los amb seguretat i connectar-los amb una xarxa.

**Què has de fer** (durant la sessió presencial, amb l'equip que t'assigne el professor):

1. **Taula de components.** Per a cada component identificat en l'ordinador de pràctiques, indica el **nom**, la **funció principal** i la **ubicació o connector** en la placa base. Components: placa base; CPU i sòcol; mòduls de RAM i ranures; unitat d'emmagatzematge (HDD, SSD o M.2) i el seu connector; font d'alimentació i els connectors principals; cable de xarxa i connector RJ45.
2. **Reflexió** (3-4 línies): quina topologia de xarxa utilitzaries per a connectar els 20 ordinadors d'una aula d'informàtica i per què?
3. **Seguretat** *(proposta d'ampliació)*. Marca sí o no per a cada mesura i afig una línia sobre la que t'ha semblat més important: equip apagat i desendollat; polsera antiestàtica o contacte amb el xassís; peces agafades pels cantons; cargols en un recipient; zona de treball ordenada; cap obertura de la font d'alimentació.
4. **Posada en marxa i perifèric** *(proposta d'ampliació, si hi ha temps)*. Després de muntar la RAM i el disc, comprova que l'equip arranca i que a la UEFI apareixen els dos; connecta un perifèric USB i anota què en diu el sistema (`lsusb` o l'Administrador de dispositius).

**Què entregues:** la fitxa completada, en la tasca d'Aules **abans de finalitzar la classe**.

**Criteris que treballa:** RA1.a, RA1.e, RA1.f, RA1.h (i RA1.c i RA1.d en les ampliacions)

**Dificultat:** ★★☆ · **Temps estimat:** durant la sessió presencial

:::aules
Les entregues d'estes activitats es fan en Aules, en la tasca de cada una. Allí també trobaràs la rúbrica, les qualificacions i les solucions comentades.
:::
