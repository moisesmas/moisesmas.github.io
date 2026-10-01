---
title: "3. Emmagatzematge i font d'alimentació"
description: "HDD, SSD i NVMe, IOPS i RAID; i com triar una font d'alimentació: connectors, potència amb marge, eficiència 80 PLUS i modularitat."
---

L'emmagatzematge decidix quant triga a arrancar un equip i si les teues dades sobreviuen a l'avaria d'un disc; la font decidix si tot el que has comprat funciona de forma estable. Són dos components on és molt fàcil gastar de més o estalviar de menys, i on convé triar amb números a la mà.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 60 minuts de lectura i 60 de pràctica.

1. Llig la secció 1 (tipus de discos) i fixa't en la taula comparativa.
2. La secció 2 (RAID) és la més abstracta: fes a mà l'exemple resolt abans de seguir.
3. En la secció 3, practica el càlcul de potència amb una calculadora.
4. Practica amb les activitats 4, 5 i 6.
:::

## 1. Tipus d'emmagatzematge

L'emmagatzematge guarda la informació de forma permanent: a diferència de la RAM, el contingut es conserva encara que l'equip estiga apagat. Hi ha tres tipus principals, i convé entendre com funcionen per dins perquè això explica la seua velocitat, el preu i la durabilitat.

### 1.1 HDD (*Hard Disk Drive*)

Un disc dur mecànic té un o més **plats** recoberts de material magnètic que giren a gran velocitat (habitualment 5.400 o 7.200 revolucions per minut), mentre un **capçal** de lectura i escriptura es desplaça sobre la superfície, com en un tocadiscos. Això explica les seues tres característiques: és el més **econòmic per gigabyte**, és el més **lent** (el capçal tarda un temps físic a arribar a les dades: el *temps de busca* o *seek time*) i és l'únic amb **parts mòbils**, per la qual cosa és més sensible als colps i a les vibracions.

### 1.2 SSD SATA

Un SSD (*Solid State Drive*, unitat d'estat sòlid) no té cap peça mecànica: guarda la informació en xips de memòria flash, la mateixa tecnologia (més avançada) d'una memòria USB. Sense capçal que moure, l'accés a qualsevol dada és quasi instantani i el sistema arranca i obri programes molt més ràpid que amb un HDD.

Un SSD SATA usa la mateixa interfície que un HDD (el cable SATA de la [pàgina 1](/docencia/dam/sistemas-informaticos/ud01-hardware/01-ordinador-i-placa-base/)), de manera que, per molt ràpid que siga el xip, la interfície li posa un sostre d'uns 550-600 MB/s.

### 1.3 SSD M.2 NVMe

Un SSD M.2 NVMe és, quant als xips, molt semblant a un SSD SATA, però **elimina el coll d'ampolla de SATA** perquè es connecta directament al bus PCIe de la placa. **NVMe** (*Non-Volatile Memory Express*) és el protocol pensat per a aprofitar eixa connexió. Un NVMe de gamma mitjana supera els 3.500 MB/s i els de gamma alta amb PCIe 4.0 o 5.0 arriben a 7.000-10.000 MB/s o més: diverses vegades més ràpids que un SSD SATA.

### 1.4 Comparativa

A banda de la velocitat **seqüencial** (MB/s o GB/s, important per a copiar arxius grans) hi ha una altra mètrica igual d'important en l'ús real: els **IOPS** (*Input/Output Operations Per Second*), les operacions de lectura o escriptura xicotetes i disperses que la unitat fa per segon. Són crítics en servidors amb molts usuaris alhora o en bases de dades, on no importa tant copiar un arxiu enorme com atendre moltíssimes peticions xicotetes.

| Tipus | Velocitat seqüencial | IOPS (aprox.) | Preu per GB | Resistència als colps |
|---|---|---|---|---|
| HDD | 80-250 MB/s | 50-200 | Molt baix | Baixa (parts mòbils) |
| SSD SATA | fins a ≈ 550 MB/s | 80.000-100.000 | Mitjà | Alta |
| SSD M.2 NVMe | 3.500-10.000 MB/s o més | 300.000-1.000.000 o més | Alt | Alta |

Altres coses que has de saber d'un SSD:

- **Tipus de cel·la.** La memòria flash guarda 1 bit per cel·la (SLC), 2 (MLC), 3 (TLC) o 4 (QLC). Amb més bits per cel·la, més capacitat per euro, però menys velocitat d'escriptura i menys durabilitat. Els SSD domèstics actuals són sobretot TLC i QLC.
- **Durabilitat.** Cada cel·la flash admet un nombre limitat d'escriptures. El fabricant ho indica en **TBW** (*terabytes written*): els TB que pots escriure abans que la garantia deixe de cobrir la unitat.
- **Capacitat anunciada.** Els fabricants compten en potències de 10: 1 TB són 10¹² bytes. Windows, en canvi, compta en potències de 2 (però escriu «GB»): per a un disc d'«1 TB» mostra 10¹² ÷ 2³⁰ ≈ **931 GB**. No falta espai: és un canvi d'unitats.

:::note[Exemple resolt]
Un equip domèstic típic combina un **SSD NVMe de 500 GB** (per al sistema operatiu i els programes que més fas servir, perquè arranque i responga amb agilitat) amb un **HDD de 2 TB** (per a fotos, vídeos i documents que no necessiten accés instantani, a un cost per GB molt menor): velocitat on importa i capacitat barata on no és crítica.
:::

## 2. RAID

**RAID** (*Redundant Array of Independent Disks*) agrupa diversos discs en una única unitat lògica per a guanyar velocitat, tolerància a fallades o totes dues coses. Cada **nivell** és una manera diferent de repartir les dades. Amb *n* discs de mida *S*:

| Nivell | Mínim de discs | Capacitat útil | Fallades que tolera | Idea |
|---|---|---|---|---|
| RAID 0 (*striping*) | 2 | n × S | Cap | Reparteix les dades: molt ràpid, però si falla un disc es perd tot |
| RAID 1 (*mirroring*) | 2 | S | 1 (amb 2 discs) | Cada disc és una còpia exacta de l'altre |
| RAID 5 | 3 | (n − 1) × S | 1 disc | Dades i **paritat** repartides entre tots els discs |
| RAID 6 | 4 | (n − 2) × S | 2 discs | Com RAID 5 amb doble paritat |
| RAID 10 (1+0) | 4 (nombre parell) | (n ÷ 2) × S | 1 de segur (més si cauen en parelles diferents) | Miralls repartits: ràpid i redundant |
| JBOD | 1 | n × S | Cap | Els discs s'usen tal com són, sense redundància |

La **paritat** és informació de control calculada a partir de les dades: permet reconstruir les dades d'un disc que ha fallat a partir dels discs que queden.

:::note[Exemple resolt: el servidor del departament]
Tenim 4 discs de 4 TB per a un servidor de còpies de seguretat.

- RAID 0: 4 × 4 = 16 TB, sense tolerància a fallades.
- RAID 5: (4 − 1) × 4 = **12 TB**, aguanta la fallada d'un disc.
- RAID 6: (4 − 2) × 4 = **8 TB**, aguanta la fallada de dos discs.
- RAID 10: 4 ÷ 2 × 4 = **8 TB**, aguanta la fallada d'un disc de segur.

Per a còpies de seguretat, que han d'estar disponibles però no necessiten gran velocitat, RAID 5 aprofita millor l'espai i RAID 6 és més segur.
:::

Quan un disc falla, el RAID *reconstruïx* les dades en un disc nou. Amb discs de molts terabytes això pot durar hores o dies, i durant eixe temps una segona fallada seria greu en RAID 5: per això, amb discs grans, es prefereix RAID 6 o RAID 10. El RAID pot gestionar-lo una controladora de maquinari o el propi sistema operatiu (en Linux, per exemple, amb `mdadm`; en Windows, amb els espais d'emmagatzematge).

:::caution[RAID no és una còpia de seguretat]
El RAID protegix de l'avaria d'un disc, però no d'un fitxer esborrat per error, d'un virus que xifra les dades, d'una fallada de la controladora, d'un incendi o d'un robatori: tot això afecta a tots els discs alhora. Cal una còpia en un altre lloc.
:::

## 3. La font d'alimentació (PSU)

La font d'alimentació (*Power Supply Unit*) transforma el corrent altern de 230 V de la xarxa elèctrica en diversos corrents continus de baixa tensió (principalment **12 V, 5 V i 3,3 V**) que són els que poden usar els components. Junt amb la placa base, és un dels components que mai convé triar «a la barata»: una font de mala qualitat pot danyar la resta de l'equip si dona una tensió inestable.

:::danger[No obris mai una font]
Els condensadors de la font poden mantindre una càrrega perillosa encara que estiga desconnectada. A més, mentre està endollada (i amb l'interruptor posterior activat, si en té) la font manté 5 V de reserva en la placa, encara que l'equip estiga «apagat». Abans de tocar res dins de l'equip, desendolla el cable de corrent.
:::

### 3.1 Connectors

Cada connector alimenta un tipus de component i no són intercanviables:

| Connector | Pins | Component que alimenta |
|---|---|---|
| ATX principal | 24 | Placa base |
| EPS12V (CPU) | 4 o 8 | Processador |
| PCIe | 6 o 8 | Targeta gràfica |
| 12VHPWR / 12V-2x6 | 16 | Gràfiques molt potents |
| SATA d'alimentació | 15 (pla) | HDD i SSD de 2,5" |
| Molex | 4 (format antic) | Ventiladors addicionals i alguns perifèrics |

:::caution[Cables modulars]
Els cables d'una font modular no són intercanviables amb els d'una altra marca o model, encara que els connectors encaixen: la distribució dels pins pot ser diferent i es poden fer malbé components. Usa sempre els cables de la teua font.
:::

### 3.2 Quanta potència necessites

La potència màxima d'una font es mesura en **vats (W)**. Per a triar-la: suma el consum aproximat de cada component i deixa un **marge del 20-30 %**, perquè treballar prop del límit de forma continuada redueix la vida útil de la font i augmenta el risc d'apagades.

| Component | Consum aproximat |
|---|---|
| CPU | 35-65 W (entrada), 65-125 W (mitjana), 125-250 W (alta, en turbo) |
| Targeta gràfica dedicada | 75-150 W (entrada), 150-250 W (mitjana), 250-450 W (alta) |
| Placa base | 30-60 W |
| RAM | 3-5 W per mòdul |
| SSD NVMe / SSD SATA / HDD | 3-9 W / 2-4 W / 6-10 W |
| Ventiladors | 2-4 W cada un |

Són valors orientatius: mira sempre les dades del fabricant.

:::note[Exemple resolt]
Un equip amb una CPU de 125 W, una gràfica de 200 W i uns 75 W per a la resta de components consumix al màxim 125 + 200 + 75 = **400 W**. Amb un marge del 30 %: 400 × 1,3 = 520 W. La font comercial immediatament superior és de **550 W**.
:::

### 3.3 Eficiència: la certificació 80 PLUS

Una font perd part de l'energia en forma de calor en convertir el corrent altern en continu. La certificació **80 PLUS** indica quin percentatge de l'energia que pren de la xarxa arriba als components. Valors típics al 50 % de càrrega (norma de 115 V; amb 230 V són uns punts més alts):

| Certificació | Eficiència aprox. |
|---|---|
| 80 PLUS (bàsic) | 80 % |
| Bronze | 85 % |
| Silver | 88 % |
| Gold | 90 % |
| Platinum | 92 % |
| Titanium | 94 % |

Una font més eficient malgasta menys electricitat i genera menys calor (i, per tant, menys soroll dels ventiladors). Un equip que necessita 300 W dels components consumix de la xarxa 300 ÷ 0,80 = 375 W amb una font bàsica i 300 ÷ 0,92 ≈ 326 W amb una Platinum.

### 3.4 Modular o no

Segons com estiguen fabricats els cables, les fonts són **modulars** (tots es poden desconnectar i només instal·les els que fan falta: més ordre i més flux d'aire), **semimodulars** (els imprescindibles, com l'ATX de 24 pins, estan fixos i la resta són desmuntables) o **no modulars** (tots els cables estan fixos). El format habitual és ATX; per a xassís xicotets existix el format SFX.

## Comprova el que has après

1. Tens 4 discs de 2 TB. Quina capacitat útil i quina tolerància ofereixen RAID 5 i RAID 10?

   <details>
   <summary>Resposta</summary>

   RAID 5: (4 − 1) × 2 = **6 TB**, tolera la fallada d'**un** disc. RAID 10: 4 ÷ 2 × 2 = **4 TB**, tolera un disc de segur (i dos si pertanyen a miralls diferents).

   </details>

2. Els components d'un equip sumen 380 W i vols un marge del 25 %. Quina font compraries?

   <details>
   <summary>Resposta</summary>

   380 × 1,25 = 475 W. La font comercial immediatament superior és la de **550 W**.

   </details>

3. Per què un SSD NVMe pot superar els 550 MB/s d'un SSD SATA?

   <details>
   <summary>Resposta</summary>

   Perquè no passa per la interfície SATA, que limita la velocitat a uns 550-600 MB/s: es connecta directament al bus PCIe amb el protocol NVMe, molt més ràpid.

   </details>

4. Has configurat dos discs en RAID 1. Ja tens una còpia de seguretat?

   <details>
   <summary>Resposta</summary>

   No. El RAID 1 protegix de l'avaria d'un disc, però si esborres un fitxer o un virus el xifra, el canvi arriba als dos discs. Una còpia de seguretat ha d'estar en un altre lloc.

   </details>

5. Un disc anunciat d'«1 TB» apareix en Windows com de 931 GB. Està defectuós?

   <details>
   <summary>Resposta</summary>

   No. El fabricant compta 1 TB = 10¹² bytes i Windows compta en potències de 2: 10¹² ÷ 2³⁰ ≈ 931. És un canvi d'unitats, no falta espai.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| disc dur (HDD) | disco duro (HDD) |
| unitat d'estat sòlid (SSD) | unidad de estado sólido (SSD) |
| plat | plato |
| capçal | cabezal |
| temps de busca | tiempo de búsqueda |
| paritat | paridad |
| còpia de seguretat | copia de seguridad |
| font d'alimentació | fuente de alimentación |
| corrent altern / continu | corriente alterna / continua |
| tensió | tensión |
| font modular | fuente modular |
