---
title: "4. Xarxes bàsiques i taller"
description: "Tipus de xarxes, topologies, mitjans, switch i router, mapes físics i lògics, seguretat i prevenció de riscos al taller, perifèrics i guió de la pràctica presencial."
---

Esta pàgina prepara la sessió presencial: tocaràs maquinari real, així que convé arribar amb les nocions de xarxa clares i, sobretot, sabent com treballar amb seguretat. Les xarxes es tracten a fons en la unitat 5 (2n trimestre); ací en tens la base per a entendre la pràctica i els mapes d'una instal·lació.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura abans de la presencial.

1. Llig les seccions 1 a 6 (xarxes) i la secció 9 (el guió de la pràctica).
2. **La secció 7 (seguretat al taller) és lectura obligatòria abans de tocar cap equip.**
3. Fes l'activitat 7 (mapes d'una xarxa). L'activitat 8 és la fitxa que completaràs durant la presencial.
4. Porta roba còmoda i arreplega't el cabell si el portes llarg.
:::

## 1. Què és una xarxa

Una xarxa informàtica és un conjunt de dispositius (ordinadors, servidors, impressores, mòbils…) connectats entre si per cables o senyals sense fil per a compartir informació i recursos: arxius, impressores, una connexió a Internet o la potència de càlcul d'altres equips.

## 2. Tipus de xarxes segons l'abast

| Tipus | Abast | Exemple |
|---|---|---|
| PAN (*Personal Area Network*) | Uns pocs metres | El mòbil amb els auriculars per Bluetooth |
| LAN (*Local Area Network*) | Un edifici o uns quants de pròxims | La xarxa de l'institut o la d'una casa |
| MAN (*Metropolitan Area Network*) | Una ciutat | Xarxa municipal que connecta diversos centres |
| WAN (*Wide Area Network*) | Grans distàncies, fins i tot entre països | Internet, la WAN més gran que existix |

## 3. Topologies

La **topologia** és la manera com s'organitzen les connexions entre els dispositius. Afecta el cost d'instal·lació, la facilitat per a trobar avaries i la **tolerància a fallades** (què passa amb la resta si un cable o un equip falla).

![Les quatre topologies de xarxa: bus (un cable compartit), estrella (cada equip al switch central), anell (cada equip amb dos veïns) i malla (cada equip amb tots els altres).](./topologies.svg)

| Topologia | Com es connecta | Avantatge | Inconvenient |
|---|---|---|---|
| Bus | Tots els equips comparteixen un únic cable | Molt econòmica, poc cablejat | Si falla el cable central, cau tota la xarxa |
| Estrella | Tots els equips a un dispositiu central (switch) | Una fallada en un cable només afecta eixe equip | Si falla el switch, cau tota la xarxa |
| Anell | Cada equip amb els dos veïns, en cercle | Repartiment equitatiu del trànsit | Un punt trencat pot interrompre l'anell |
| Malla | Cada equip amb diversos (o tots) els altres | Màxima redundància | Cara i complexa |

Quasi totes les xarxes locals actuals (la de l'institut inclosa) són en **estrella**, amb un o diversos switches: una avaria afecta un sol lloc de treball. El bus (cable coaxial compartit) i l'anell pertanyen a xarxes antigues. Una malla completa de *n* equips necessita **n × (n − 1) ÷ 2 enllaços**: 8 equips, 28 cables; 20 equips, 190. Per això només s'usa de forma parcial, per exemple entre els switches principals.

## 4. Mitjans de transmissió i connectors

| Mitjà | Connector | Velocitat típica | Ús habitual |
|---|---|---|---|
| Parell trenat (UTP) | RJ45 | 1 Gb/s (fins a 10 Gb/s en categories avançades) | Xarxes LAN cablejades: el més habitual |
| Fibra òptica | SC, LC | Diversos Gb/s a gran distància | Troncals, centres de dades, llargues distàncies |
| Wi-Fi | Ones de ràdio, sense connector | Des de centenars de Mb/s a diversos Gb/s, segons l'estàndard | Mobilitat i comoditat; menys estable que el cable |

- El cable UTP admet com a màxim **100 m** per tram. Les categories (5e, 6, 6A…) indiquen la velocitat que suporta; la 6A arriba als 10 Gb/s en els 100 m.
- El connector que anomenem RJ45 és tècnicament un 8P8C.
- La fibra transmet **llum**, no electricitat: arriba més lluny i no pateix interferències elèctriques. La **monomode** serveix per a llargues distàncies i la **multimode** per a distàncies curtes.

## 5. Dispositius bàsics

- **Switch (commutador):** connecta equips d'una mateixa xarxa local. Un *hub*, més antic, repetia tot el trànsit a tots els ports; el switch aprén quin equip hi ha en cada port i envia el trànsit només al destinatari, de manera que la xarxa és més eficient i més segura.
- **Router (encaminador):** connecta xarxes diferents i decidix per on ha de passar cada paquet (per exemple, per a eixir de la xarxa d'una aula cap a Internet). El «router» que tens a casa és, en realitat, router, switch i punt d'accés Wi-Fi en un sol aparell.

## 6. Mapes físics i lògics

Documentar una xarxa és imprescindible per a qualsevol administrador, i es fa amb dos mapes complementaris:

- El **mapa físic** mostra la disposició real: en quin armari està cada switch, per quina canaleta passa cada cable, en quina sala està cada presa. És el que necessites per a **localitzar una avaria**.
- El **mapa lògic** mostra com circula la informació, independentment d'on estiga cada equip: quines adreces IP té, a quines xarxes pertany, quin camí segueix el trànsit. És el que necessites per a **entendre o depurar el funcionament**.

![Mapa físic i mapa lògic d'un xicotet despatx: el físic mostra l'armari amb el switch i el router, les preses de l'aula i del despatx i els cables; el lògic mostra una sola xarxa 192.168.1.0 amb la IP de cada equip.](./mapa-fisic-i-logic.svg)

Un mateix edifici pot tindre un cablejat físic molt senzill (tot en estrella cap a un armari) i, damunt d'ell, una organització lògica complexa (xarxes diferents per a professorat, alumnat i administració, compartint els mateixos cables).

## 7. El taller: seguretat i prevenció de riscos

La **Llei 31/1995 de Prevenció de Riscos Laborals** obliga a avaluar els riscos del lloc de treball i a prevenir-los; i el **Reial decret 488/1997** fixa les condicions mínimes per a qui treballa amb pantalles. En el taller es resumix en tres idees: evitar el risc, protegir-se i saber què fer si passa alguna cosa.

### 7.1 Abans d'obrir un equip

1. Apaga'l i **desendolla el cable de corrent**: apagat no és el mateix que desconnectat (la placa conserva tensió de reserva).
2. Amb l'equip desendollat, prem uns segons el botó d'encesa per a descarregar l'electricitat residual.
3. Espera que es refrede: el dissipador i alguns xips poden estar molt calents.
4. Treballa en una superfície neta, ordenada i ben il·luminada, i guarda els cargols en un recipient.
5. Lleva't polseres, anells i cadenes.
6. **No obris mai una font d'alimentació** ni toques els seus components interns.

### 7.2 Descàrregues electrostàtiques (ESD)

L'electricitat estàtica que acumula el teu cos (en caminar, en fregar roba sintètica) es pot descarregar sobre un component. Tu no notes la descàrrega per davall d'uns 3.000 V, però un xip pot danyar-se amb molt menys, **sense que es note**: la peça pot funcionar a mitges o fallar setmanes després.

- Usa una **polsera antiestàtica** connectada a una part metàl·lica sense pintar del xassís o a terra. Si no en tens, toca sovint una part metàl·lica sense pintar.
- Agafa targetes i mòduls **pels cantons**, sense tocar contactes ni xips.
- Guarda les peces en **bosses antiestàtiques**, mai damunt de plàstic comú ni de moqueta.
- Evita treballar sobre moqueta o amb roba de llana o sintètica.

### 7.3 Altres riscos

- **Talls i ferides:** cantons del xassís, pins, soldadures.
- **Càrregues:** en alçar un equip o un monitor, flexiona els genolls i no arredones l'esquena; demana ajuda si pesa.
- **Cables:** arreplega'ls perquè ningú s'hi tropece i desconnecta'ls estirant del connector, no del cable.
- **Líquids** lluny dels equips. Llava't les mans després de manipular pasta tèrmica o productes de neteja i llig les etiquetes.
- **Piles i bateries de liti:** no les perfores ni les exposes a la calor; una bateria inflada s'ha de retirar.
- **Foc:** coneix on són l'extintor i l'eixida d'emergència; en un equip elèctric no s'usa mai aigua.
- **Residus:** els aparells electrònics i les piles no van al fem, sinó a un punt de recollida autoritzat.

### 7.4 Ergonomia en l'ús habitual

Treballar hores davant de l'ordinador també és un risc (fatiga visual, esquena, canells). Col·loca la pantalla a l'altura dels ulls i a uns 50-70 cm, recolza l'esquena, apoia els peus a terra, evita els reflexos i fes pauses curtes i regulars.

## 8. Perifèrics: classificar, instal·lar i configurar

Un **perifèric** és un dispositiu que es connecta a l'equip per a introduir-hi dades, rebre'n resultats o ampliar-lo.

| Tipus | Exemples | Connexions habituals |
|---|---|---|
| Entrada | Teclat, ratolí, escàner, micròfon, càmera web | USB, Bluetooth, *jack* |
| Eixida | Monitor, impressora, altaveus, projector | HDMI, DisplayPort, USB, xarxa, *jack* |
| Entrada i eixida | Pantalla tàctil, disc extern, targeta de xarxa | USB, Thunderbolt, RJ45 |

- **USB:** el 2.0 arriba als 480 Mb/s; els USB 3.x, de 5 a 20 Gb/s segons la versió; USB4 i Thunderbolt, fins a 40 Gb/s o més. **Un connector USB-C no garantix velocitat ni vídeo:** depén del port i del cable.
- **Monitors:** IPS (bons colors i angles de visió), VA (molt contrast), TN (ràpid i barat, pitjors angles). En OLED cada píxel emet llum (negre perfecte, risc de *burn-in*); QLED és un LCD amb punts quàntics, no OLED.
- **Impressores:** làser (tòner; ràpida i barata per pàgina) i de raig de tinta (bona per a color i foto).

Passos per a instal·lar-ne un:

1. **Connecta'l.** Els USB es poden endollar amb l'equip encés (*hot-plug*).
2. El sistema el detecta i carrega un **controlador** (*driver*), el programari que li explica com comunicar-se amb el dispositiu. Sovint és automàtic (*plug and play*).
3. **Comprova que s'ha reconegut** (ordres a continuació).
4. Si cal, instal·la el controlador del fabricant, descarregat del seu web oficial.
5. **Configura'l:** resolució i freqüència de refresc del monitor, impressora predeterminada i pàgina de prova, disposició del teclat…
6. **Prova que funciona.**

```bash
lsusb               # dispositius USB connectats
lspci               # targetes i controladores PCI/PCIe
lsblk               # discs i particions
sudo dmesg | tail   # missatges del nucli en endollar un dispositiu
```

```powershell
Get-PnpDevice -PresentOnly | Where-Object Status -ne 'OK'   # dispositius amb problemes
```

En Windows també tens l'**Administrador de dispositius** (`devmgmt.msc`), on un dispositiu amb problemes apareix marcat.

## 9. La pràctica presencial

Es fa per parelles, sobre un equip real o amb el simulador que s'indique en Aules. Repassa abans la secció 7.

1. **Identificació de components:** localitza i nomena en un ordinador real (o desmuntat) la placa base, la CPU, els mòduls de RAM, la unitat d'emmagatzematge i la font d'alimentació.
2. **Manipulació guiada**, amb supervisió del professor: desmunta i torna a muntar un mòdul de RAM i una unitat d'emmagatzematge. Comprova la fixació de cada connector: l'encaix de les osques de la RAM, els cargols del SSD o HDD i els cables SATA de dades i d'alimentació.
3. **Connectors de xarxa:** identifica un cable de parell trenat, crimpa (o almenys observa com es crimpa) un connector RJ45 i compara'l amb un tram de fibra òptica, si n'hi ha.
4. **Fitxa de reconeixement:** completa la fitxa de components (activitat 8) i entrega-la en Aules abans d'acabar la classe.

## Comprova el que has après

1. Quants cables necessites per a una malla completa de 8 equips? I per a una estrella?

   <details>
   <summary>Resposta</summary>

   Malla: 8 × 7 ÷ 2 = **28 enllaços**. Estrella: **8 cables**, un per equip fins al switch.

   </details>

2. Si el switch central d'una xarxa en estrella falla, què passa? Com es reduiria el risc?

   <details>
   <summary>Resposta</summary>

   Cau tota la xarxa que depén d'eixe switch. Es redueix amb un switch de recanvi llest o amb enllaços redundants entre switches.

   </details>

3. Un PC de l'aula 2 no té xarxa i sospites del cable. Quin mapa necessites? I si vols saber a quina xarxa pertany el PC?

   <details>
   <summary>Resposta</summary>

   Per a trobar el cable, el **mapa físic**. Per a saber la xarxa i la IP, el **mapa lògic**.

   </details>

4. Cita tres mesures per a evitar una descàrrega electrostàtica en tocar la placa base.

   <details>
   <summary>Resposta</summary>

   Polsera antiestàtica (o tocar sovint una part metàl·lica sense pintar del xassís), agafar les peces pels cantons sense tocar contactes ni xips, i guardar-les en bosses antiestàtiques lluny de moquetes i plàstics.

   </details>

5. Per què no s'ha d'obrir mai una font d'alimentació, ni quan està desendollada?

   <details>
   <summary>Resposta</summary>

   Perquè els condensadors poden mantindre una càrrega elèctrica perillosa durant molt de temps després de desconnectar-la.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| xarxa d'àrea local (LAN) | red de área local (LAN) |
| topologia | topología |
| commutador (*switch*) | conmutador (switch) |
| encaminador (*router*) | router (enrutador) |
| cablejat | cableado |
| armari de comunicacions | armario de comunicaciones |
| descàrrega electrostàtica (ESD) | descarga electrostática (ESD) |
| prevenció de riscos laborals | prevención de riesgos laborales |
| polsera antiestàtica | pulsera antiestática |
| perifèric | periférico |
| controlador (*driver*) | controlador (driver) |
| crimpar un connector | crimpar (engarzar) un conector |
