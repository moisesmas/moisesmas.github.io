---
title: "1. L'ordinador i la placa base"
description: "Què és un ordinador, com s'organitza segons Von Neumann, quins tipus de xassís hi ha, què conté una placa base i com arranca un equip."
---

Tot el que faràs en este mòdul (instal·lar sistemes operatius, programar scripts, configurar xarxes) s'executa sobre un maquinari concret. Si saps què hi ha dins d'un ordinador i com es connecta, podràs triar un equip per a un ús determinat, esbrinar per què no arranca i entendre per què una instal·lació va lenta. Esta pàgina és el mapa de tota la unitat.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 60 minuts de lectura i 30 de pràctica.

1. Llig les seccions 1 i 2 (visió general, 15 minuts) i dedica el gruix del temps a les 4 i 6, les que més faràs servir en la presencial.
2. Practica amb el laboratori «Anatomia de la placa base» (a la presentació de la unitat) i fes l'[activitat 1](/docencia/dam/sistemas-informaticos/ud01-hardware/actividades/).
3. Tanca amb «Comprova el que has après»; els dubtes, al fòrum d'Aules.
:::

## 1. Què és un ordinador

Un ordinador és una màquina electrònica que rep dades (**entrada**), les processa seguint instruccions (**procés**), mostra el resultat (**eixida**) i guarda informació per a més endavant (**emmagatzematge**). Este esquema de quatre fases val per a un telèfon mòbil i per a un servidor que atén milions de peticions per segon.

| Component | Fase | Funció principal |
|---|---|---|
| Teclat, ratolí, escàner | Entrada | Introduir dades i ordres |
| CPU (processador) | Procés | Executar instruccions i fer càlculs |
| Memòria RAM | Procés (suport) | Guardar temporalment les dades que la CPU fa servir ara mateix |
| Monitor, impressora, altaveus | Eixida | Mostrar o comunicar el resultat |
| Disc SSD o HDD | Emmagatzematge | Guardar la informació de forma permanent |

### L'arquitectura de Von Neumann

El 1945, el matemàtic John von Neumann va descriure una forma d'organitzar un ordinador que encara seguim: **el programa i les dades es guarden en la mateixa memòria, en el mateix format binari**. Abans, màquines com l'ENIAC es reprogramaven canviant cables i commutadors, una tasca que podia durar dies. Amb la idea de Von Neumann, canviar de programa és tan senzill com carregar un altre arxiu en memòria; ho fas cada vegada que obris una aplicació.

![Esquema de l'arquitectura de Von Neumann: l'entrada i l'eixida es connecten amb la CPU, que té unitat de control, ALU i registres, i es comunica per busos amb una única memòria que guarda instruccions i dades; l'emmagatzematge es connecta amb la memòria.](./von-neumann.svg)

Des del punt de vista de la CPU, un programa no és més que dades (bytes) que ella interpreta com a instruccions. En la [pàgina 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/) veuràs com ho fa, i en el [laboratori «Dins de la CPU»](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/#von-neumann) podràs executar un programa instrucció a instrucció.

### Ordinadors «amagats»

No limites la idea d'ordinador a la torre o al portàtil: un caixer automàtic, un router o una rentadora digital també ho són. Són **sistemes encastats** (*embedded systems*): executen un programari molt concret i l'usuari no hi instal·la programes nous, a diferència d'un PC, que és d'ús general.

### Maquinari i programari

El **maquinari** (*hardware*) és la part física, tot el que pots tocar. El **programari** (*software*) són els programes que el fan funcionar: el sistema operatiu i les aplicacions. Esta unitat tracta el maquinari; el programari comença en la unitat 2.

## 2. Tipus de xassís

El xassís (o caixa) és l'estructura metàl·lica o de plàstic que allotja i protegix els components. No és només estètica: determina quina placa base hi cap, condiciona el flux d'aire (i, per tant, la temperatura de treball) i limita quantes unitats d'emmagatzematge, ventiladors i targetes d'expansió pots instal·lar.

| Tipus | Grandària aprox. | Ús típic | Avantatge i inconvenient |
|---|---|---|---|
| Torre completa (*full tower*) | 50 cm d'alt o més | Estacions de treball, servidors, PC de gamma alta | + Màxima expansió i refrigeració · − Ocupa molt d'espai |
| Semitorre (*mid tower*) | 40-50 cm | Ordinador domèstic i d'oficina | + Bon equilibri · − Expansió més limitada |
| Mini-torre | 30-40 cm | Equips compactes (microATX, Mini-ITX) | + Estalvia espai · − Menys ranures i pitjor refrigeració |
| SFF o *slim* | Perfil molt baix | Oficines amb poc espai | + Molt compacte · − Quasi sense ampliació |
| *All-in-one* | Integrat en el monitor | Ús domèstic o ofimàtic | + Estalvia espai d'escriptori · − Ampliació quasi nul·la |
| Portàtil | Integrat, amb bateria | Mobilitat | + Portabilitat · − Components soldats, poca ampliació |
| Servidor en *rack* | Horitzontal, mesurat en unitats U (1U ≈ 4,45 cm) | Centres de dades | + Densitat i estandardització · − Necessita un armari *rack* |

:::note[Exemple resolt]
L'institut vol muntar un servidor d'arxius per al departament: 4 discos durs per a còpies de seguretat, funcionant 24 hores al dia. **Quin xassís triaries?** La clau no és el nom, sinó el que oferix: com a mínim 4 badies de 3,5" i bon flux d'aire per a treballar sense parar. Una torre completa (o una semitorre amb prou badies) ho complix i et deixa créixer; un SFF no tindria ni espai ni refrigeració.
:::

## 3. La placa base

La placa base (*motherboard*) és el circuit imprés principal: una làmina de fibra de vidre amb diverses capes de pistes de coure (entre 4 i 8 en les modernes, o més en gammes altes) que connecten tots els components i porten alhora l'energia i els senyals de dades.

Sense ella, la CPU no podria accedir a la RAM ni la gràfica rebria alimentació: és l'element que convertix un conjunt de peces soltes en un sistema informàtic.

## 4. Components de la placa base

### 4.1 El chipset

El chipset és el conjunt de circuits que gestiona la comunicació entre la CPU, la memòria i la resta de dispositius. Determina, en bona part, quins processadors admet la placa, quants ports USB i SATA oferix, si permet l'*overclocking* (pujar la freqüència de la CPU o de la RAM per damunt de la de fàbrica) i quantes línies PCIe addicionals hi ha.

Antigament eren dos xips, el **northbridge** (RAM i gràfica) i el **southbridge** (perifèrics lents). Fa més d'una dècada que el controlador de memòria i les línies PCIe principals estan dins de la CPU, i el *chipset* (o *xipset*) actual és hereu del pont sud.

Cada fabricant oferix diverses gammes de chipset per a una mateixa generació de processadors. Es diferencien per les funcions que activen, no per les CPU que admeten:

| Fabricant (generació d'exemple) | Gamma alta | Gamma mitjana | Gamma d'entrada |
|---|---|---|---|
| Intel (Core de 12a a 14a gen.) | Z790: *overclocking* i màxima connectivitat | B760: sense *overclocking* de la CPU | H610: funcions bàsiques |
| AMD (Ryzen 7000) | X670: *overclocking* i més línies PCIe | B650: bon equilibri | A620: funcions bàsiques |

Els noms canvien amb cada generació (Z890 per a Intel LGA1851, X870 per a AMD AM5…), però l'escala es manté: importa què activa cada gamma, no memoritzar noms.

### 4.2 El sòcol de la CPU

El sòcol (*socket*) és el connector físic on s'inserix el processador. Cada arquitectura de CPU usa un sòcol específic, amb una disposició de contactes pròpia.

| Fabricant | Sòcol | Contactes | Famílies de CPU |
|---|---|---|---|
| Intel | LGA1700 | Pins a la placa (*Land Grid Array*) | Core de 12a, 13a i 14a generació |
| AMD | AM5 | Pins a la placa (LGA) | Ryzen 7000 i posteriors |
| AMD (anterior) | AM4 | Pins en el processador (PGA) | Ryzen 1000 a 5000 |

:::caution[No és qüestió de rendiment]
Un processador només es pot instal·lar en una placa amb el sòcol per al qual es va dissenyar: és compatibilitat física i elèctrica. A més, comprova que la UEFI de la placa admet eixa CPU concreta; de vegades cal actualitzar-la abans.
:::

### 4.3 Ranures de RAM

Les plaques domèstiques solen tindre entre 2 i 4 ranures **DIMM**. Si estan acolorides per parelles, no és decoració: indiquen quines cal usar juntes per a activar el mode **dual channel**, en què la placa llig dos mòduls en paral·lel i duplica l'ample de banda. El manual indica la combinació; a la [pàgina 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/) calcularàs què guanyes.

### 4.4 Ranures PCIe

PCI Express (PCIe) és el bus per a targetes d'expansió: gràfiques, de xarxa, de so, controladores d'emmagatzematge. Una ranura té 1, 4, 8 o 16 **línies** (*lanes*): x1, x4, x8 o x16. Més línies, més dades alhora; una x16 (la de la gràfica) multiplica per setze l'ample de banda d'una x1. La segona variable és la **generació**: cada una duplica aproximadament la velocitat de l'anterior.

| Generació | Per línia (x1), en cada sentit | Ranura x16 (gràfiques) |
|---|---|---|
| PCIe 3.0 | ≈ 1 GB/s | ≈ 16 GB/s |
| PCIe 4.0 | ≈ 2 GB/s | ≈ 32 GB/s |
| PCIe 5.0 | ≈ 4 GB/s | ≈ 63 GB/s |

Les generacions són compatibles cap enrere (una targeta 4.0 funciona en una ranura 3.0, a la velocitat d'esta). Compte: una ranura x16 pot tindre connectades només 4 o 8 línies; el manual de la placa ho indica.

### 4.5 SATA i M.2

**SATA** (*Serial ATA*) és la interfície clàssica per a discos durs (HDD) i SSD de 2,5". Cada unitat necessita un cable de dades i un d'alimentació (de la font). Una placa domèstica sol oferir entre 4 i 6 ports.

**M.2** és una ranura molt més recent on el mòdul d'emmagatzematge (una xicoteta placa allargada, sense cables) s'inserix directament sobre la placa base; el format més habitual és el 2280 (22 mm d'ample per 80 mm de llarg). Compte: **no tots els M.2 són iguals**.

| | SATA 2,5" | M.2 SATA | M.2 NVMe |
|---|---|---|---|
| Connexió | Cable SATA + alimentació | Ranura M.2, protocol SATA | Ranura M.2, bus PCIe |
| Velocitat màxima aprox. | ≈ 550 MB/s | ≈ 550 MB/s | De 3.500 a 10.000 MB/s o més |

:::caution[M.2 no vol dir «ràpid»]
Abans de comprar un SSD M.2, mira al manual de la placa quin tipus admet cada ranura: algunes només SATA, altres NVMe i altres tots dos.
:::

### 4.6 Connectors d'alimentació

La placa rep corrent de la font a través de dos connectors normalitzats: l'**ATX principal, de 24 pins**, que alimenta la placa en conjunt, i un d'**EPS12V, de 4 o 8 pins**, prop del sòcol, que alimenta la CPU (en gammes altes pot passar dels 200 W en càrrega màxima). Els veuràs amb detall a la [pàgina 3](/docencia/dam/sistemas-informaticos/ud01-hardware/03-emmagatzematge-i-font/).

### 4.7 El xip BIOS/UEFI

Un xicotet xip de memòria no volàtil (manté el contingut sense electricitat) guarda el **microprogramari** (*firmware*) que arranca el sistema. **UEFI** (*Unified Extensible Firmware Interface*) és l'evolució moderna de l'antiga **BIOS**: hui quasi totes les plaques noves usen UEFI, encara que tothom continue dient «la BIOS». Una pila de botó (normalment una CR2032) manté el rellotge de la placa.

| Característica | BIOS (heretada) | UEFI (actual) |
|---|---|---|
| Interfície | Text, amb teclat | Gràfica, normalment amb ratolí |
| Disc d'arrancada | Fins a 2 TB (taula de particions MBR) | Sense eixe límit (taula GPT) |
| Arrancada segura (*Secure Boot*) | No disponible | Sí: comprova les signatures del carregador i dels controladors |

### 4.8 Ports del panell posterior

El panell posterior agrupa els connectors accessibles sense obrir el xassís: **USB** (tipus A i, cada vegada més, tipus C), eixides de vídeo (**HDMI**, **DisplayPort**, que només funcionen amb la gràfica integrada de la CPU), xarxa **RJ45** (Ethernet), àudio (*jack* de 3,5 mm) i, en plaques amb Wi-Fi, les antenes.

## 5. Factors de forma

El factor de forma fixa les dimensions de la placa i, per tant, quin xassís la pot allotjar i quantes ranures d'expansió hi caben.

| Factor de forma | Dimensions | Ranures d'expansió | Xassís compatible |
|---|---|---|---|
| ATX | 305 × 244 mm | 4 a 7 | Torre completa, semitorre |
| microATX (mATX) | 244 × 244 mm | 2 a 4 | Semitorre, mini-torre |
| Mini-ITX | 170 × 170 mm | 1 | Mini-torre, SFF |

Una placa més xicoteta cap, en general, en un xassís pensat per a una de més gran (una Mini-ITX es pot muntar en una torre completa amb els cargols adequats), però no a l'inrevés: una ATX no cabrà mai en un xassís per a Mini-ITX. Els fabricants més habituals de plaques són ASUS, MSI, Gigabyte i ASRock.

## 6. De l'encesa al sistema operatiu

Conéixer l'arrancada és la base per a diagnosticar un equip que no arranca. Esta és la seqüència:

1. Prems el botó d'encesa: la placa ordena a la font que s'active i, quan les tensions són estables, la font envia el senyal de «tot correcte» (*power good*).
2. La CPU comença a executar el codi del microprogramari (UEFI o BIOS), guardat en el xip de la placa.
3. **POST** (*Power-On Self-Test*): el microprogramari comprova els elements essencials (CPU, RAM, gràfica, teclat). Si alguna cosa falla, avisa amb pitos (*beep codes*), LED de diagnòstic o un visor de dos dígits; els codis depenen del fabricant i són al manual.
4. El microprogramari inicialitza els dispositius i consulta l'**ordre d'arrancada** (*boot order*) per a buscar un disc amb un carregador.
5. Carrega el **carregador d'arrancada** (*bootloader*; per exemple, Windows Boot Manager o GRUB), que carrega al seu torn el nucli del sistema operatiu.

| Símptoma | Causa probable | Què fer |
|---|---|---|
| No s'encén res | Font apagada o sense corrent; connector de 24 pins mal inserit | Revisar el cable i l'interruptor de la font, els connectors i el botó d'encesa |
| Els ventiladors giren, però no hi ha imatge | RAM mal inserida, gràfica o cable de vídeo | Tornar a inserir la RAM (mòdul per mòdul), comprovar l'entrada del monitor |
| Pitos o LED de diagnòstic | El POST ha detectat una fallada | Consultar el manual: el codi apunta al component (sovint RAM o gràfica) |
| «No bootable device» | Ordre d'arrancada incorrecte, disc no detectat o sense sistema | Entrar a la UEFI, comprovar que el disc apareix i ajustar l'ordre |

:::tip[Entrar a la UEFI]
Es fa prement una tecla just en encendre l'equip: **Supr**, **F2**, **F10** o **F12**, segons el fabricant. La pantalla inicial sol indicar-la.
:::

## Comprova el que has après

1. Tens una placa Mini-ITX i un xassís de semitorre ATX. Hi cap? I una placa ATX en un xassís de mini-torre?

   <details>
   <summary>Resposta</summary>

   Sí a la primera: una placa més xicoteta cap en un xassís per a una de més gran. No a la segona: una ATX és massa gran per a una mini-torre.

   </details>

2. Has comprat un SSD M.2 NVMe, però la ranura M.2 de la teua placa només admet SATA. Funcionarà?

   <details>
   <summary>Resposta</summary>

   No. Un NVMe necessita una ranura M.2 connectada al bus PCIe: cal mirar al manual quin tipus admet cada ranura abans de comprar.

   </details>

3. Vols muntar un Ryzen 7 7700 en una placa amb sòcol AM4. És possible?

   <details>
   <summary>Resposta</summary>

   No. Els Ryzen 7000 usen el sòcol AM5, diferent de l'AM4 (que admet de la sèrie 1000 a la 5000).

   </details>

4. L'equip s'encén (els ventiladors giren), el monitor no mostra res i la placa fa pitos curts repetits. Quin és el primer pas?

   <details>
   <summary>Resposta</summary>

   Buscar el codi de pitos en el manual. Sovint apunta a la RAM o a la gràfica: apaga, desconnecta, torna a inserir els mòduls de RAM (un cada vegada) i prova de nou.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| maquinari | hardware |
| programari | software |
| xassís | chasis |
| sòcol | zócalo (socket) |
| ranura | ranura (slot) |
| microprogramari | firmware |
| arrancada | arranque |
| ample de banda | ancho de banda |
| sistema encastat | sistema embebido |
| factor de forma | factor de forma |
| font d'alimentació | fuente de alimentación |
