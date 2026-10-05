---
title: "1. Tipus de SO i sistemes d'arxius"
description: "Què fa un sistema operatiu, com es classifiquen i es comparen (usuaris, llicències, requisits) i quin sistema d'arxius cal triar: FAT32, exFAT, NTFS o ext4."
---

Abans d'instal·lar un sistema operatiu cal saber quin necessites i com guardarà les dades al disc. Triar malament té un cost real: un pendrive que no deixa copiar una pel·lícula, un disc que Linux no pot escriure o una llicència que no cobrix l'ús que li vols donar. Esta pàgina t'ensenya a decidir amb criteri.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 60 de pràctica.

1. Llig les seccions 1 i 2 (què és un SO i quins tipus hi ha). Són conceptes que reutilitzaràs en tota la unitat.
2. La secció 3 (llicències) és la que més costa memoritzar: fes la taula amb les teues paraules.
3. En la secció 4, obri la pestanya «Quin sistema d'arxius?» del [laboratori «Particions i arrancada»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/#sistema-arxius) i prova diferents combinacions de requisits.
4. Fes després les activitats 1 i 2 i el qüestionari d'Aules.
:::

## 1. Què és un sistema operatiu

Un ordinador té cinc nivells que treballen apilats: **l'usuari**, les **aplicacions**, el **sistema operatiu**, el **firmware** (BIOS/UEFI, que ja vas veure en la [unitat 1](/docencia/dam/sistemas-informaticos/ud01-hardware/01-ordinador-i-placa-base/)) i el **maquinari**. El sistema operatiu (SO) és el programari que ocupa el centre: gestiona els recursos de la màquina (CPU, memòria, emmagatzematge, perifèrics) i els oferix a les aplicacions de manera uniforme.

Actua d'**intermediari**. Quan un editor de text vol guardar un document no parla amb el disc: demana el servici al SO mitjançant una **crida al sistema**, i és el SO qui sap com tractar eixe model concret de SSD. Sense esta capa d'abstracció, cada programa hauria d'incloure el codi per a cada disc, targeta gràfica o impressora que existisca.

Per dins, un SO es compon de tres peces que convé distingir:

| Peça | Què fa | Exemple |
|---|---|---|
| **Nucli** (*kernel*) | És el cor: gestiona processos, memòria, dispositius i arxius, i fa complir els permisos. S'executa amb tots els privilegis. | El nucli Linux; el nucli de Windows NT |
| **Controladors** (*drivers*) | Mòduls que ensenyen al nucli a parlar amb un maquinari concret. | El controlador d'una targeta de xarxa |
| **Intèrpret d'ordres i interfície** | El que veu i usa la persona: l'escriptori gràfic i/o el *shell* de línia d'ordres. | GNOME, l'escriptori de Windows, `bash`, PowerShell |

Les funcions principals del SO són cinc, i les estudiaràs amb detall en altres unitats:

- **Gestió de processos**: decidix quin programa usa la CPU en cada moment.
- **Gestió de la memòria**: repartix la RAM entre programes i els aïlla entre ells.
- **Gestió d'arxius**: organitza les dades al disc (ho veuràs en la secció 4).
- **Gestió d'entrada i eixida**: controla teclat, pantalla, xarxa, discos...
- **Seguretat i usuaris**: comptes, permisos i aïllament.

## 2. Tipus de sistemes operatius

Hi ha moltes maneres de classificar els SO. La que usa el currículum és segons **quantes persones poden treballar alhora** i **si donen servici a altres equips**:

| Tipus | Idea | Exemples |
|---|---|---|
| **Monousuari** | Pensat perquè treballe una sola persona alhora | MS-DOS; Windows d'escriptori en un ús domèstic |
| **Multiusuari** | Diversos usuaris, cadascun amb el seu espai i els seus permisos; poden treballar simultàniament | Linux, Windows Server, macOS |
| **De xarxa** | A més de gestionar l'equip, coordina i dona servici a altres equips per la xarxa | Windows Server, Linux de servidor |

Dos matisos importants:

- **No són categories excloents.** Un servidor Linux o un Windows Server són alhora multiusuari i de xarxa.
- **La frontera entre monousuari i multiusuari no és tan nítida.** Windows 10/11 permet crear diversos comptes, cadascun amb els seus documents i permisos, però en un equip d'escriptori només hi ha una sessió gràfica activa a la vegada. Per això es posa com a exemple de «monousuari», encara que en una aula on cada alumne entra amb el seu compte funciona de manera multiusuari. En els exàmens, justifica sempre el criteri que uses.

Hi ha altres classificacions que també trobaràs: per **ús** (escriptori, servidor, mòbil, encastat), per **arquitectura del nucli** (monolític, microkernel, híbrid) o per **llicència**, que és la que veiem ara.

## 3. Llicències i com comparar sistemes operatius

El criteri 2.c de la unitat et demana **comparar sistemes operatius** per requisits, característiques, camp d'aplicació i llicència. La llicència és la part que més es descuida i més problemes dona.

### 3.1 Tipus de programari segons la llicència

| Tipus | Què permet | Exemples |
|---|---|---|
| **Programari lliure** | Executar-lo per a qualsevol ús, estudiar-ne el codi, modificar-lo i redistribuir-lo (les «quatre llibertats») | Linux, FreeBSD, LibreOffice |
| **Codi obert** (*open source*) | Codi font accessible amb llicència que permet usar-lo i modificar-lo; en la pràctica se solapa amb el lliure | Android (base), Chromium |
| **Propietari** | El fabricant conserva el control del codi; l'usuari només té dret d'ús, segons la llicència (EULA) | Windows, macOS |
| **Freeware** | Gratuït, però amb el codi tancat | Alguns controladors i utilitats |
| **Shareware / de prova** | Es pot provar gratis un temps o amb funcions limitades i després cal pagar | Versions d'avaluació |

Dins del programari lliure hi ha dues famílies de llicències: les **copyleft** (com la **GPL**, que exigix que les obres derivades mantinguen la mateixa llibertat; el nucli Linux és GPL) i les **permissives** (com **MIT** o **BSD**, que permeten incloure el codi en productes tancats).

:::caution[Lliure no vol dir gratuït]
«Lliure» fa referència a les **llibertats**, no al preu. Hi ha programari lliure de pagament (suport empresarial d'una distribució Linux) i programari gratuït que no és lliure (*freeware*). A la inversa, una distribució Linux es pot descarregar sense pagar, però Windows exigix una llicència.
:::

### 3.2 Llicències de Windows: de què depén el que pagues

En l'àmbit professional, Windows es pot adquirir de maneres diferents:

- **OEM**: ve preinstal·lada en un equip nou (o es compra per a muntar-lo) i queda vinculada a eixe maquinari.
- **Retail** (comercial): es compra solta i, en general, es pot transferir a un altre equip.
- **Per volum**: per a empreses i centres educatius, amb una sola clau o contracte per a molts equips.

A més, Windows Server es llicencia amb regles pròpies (per nuclis de processador i amb llicències d'accés de client). No cal que les memoritzes: l'important és saber que **abans de desplegar** un SO propietari cal comprovar que la llicència cobrix el nombre d'equips i l'ús previst. Per a practicar existixen **versions d'avaluació** gratuïtes i temporals, que el fabricant publica per a proves.

### 3.3 Taula comparativa de sistemes actuals

| Sistema | Llicència | Camp d'aplicació habitual | Observacions |
|---|---|---|---|
| Windows 10/11 | Propietària | Escriptori i portàtil, ofimàtica, jocs | Té requisits mínims de maquinari que has de consultar per versió |
| Windows Server | Propietària | Servidors d'empresa | Se'n parla en la pàgina 4 |
| Ubuntu, Debian, Fedora... | Lliure (GPL i altres) | Escriptori, servidors, desenvolupament | Moltes distribucions, un mateix nucli |
| macOS | Propietària | Escriptori d'Apple | Només en maquinari d'Apple |
| Android | Lliure en la base, amb components propietaris | Mòbils i tauletes | Basat en el nucli Linux |

Per a comparar dos sistemes, fixa't sempre en: **requisits mínims i recomanats** (CPU, RAM, disc, firmware), **compatibilitat** amb el maquinari i el programari que necessites, **cost de la llicència**, **suport** i **seguretat**.

:::note[Exemple resolt]
Un centre vol renovar 30 ordinadors d'una aula de programació amb un pressupost ajustat. El professorat necessita compiladors, editors i màquines virtuals; no cal programari propietari concret. Una distribució Linux d'escriptori (per exemple, Ubuntu) evita el cost de les llicències, es pot administrar en bloc i exigix menys maquinari que un Windows recent. Cal comprovar, això sí, que tot el programari de l'assignatura tinga versió per a Linux.
:::

## 4. Sistemes d'arxius

Un disc, per si mateix, és només una successió de bytes. El **sistema d'arxius** (*file system*) és l'estructura que el SO escriu damunt per a poder organitzar-hi noms, carpetes, dates, permisos i la ubicació exacta de cada fragment d'un arxiu. Un volum **es formata** amb un sistema d'arxius concret, i d'això depén què hi pots guardar i qui el pot llegir.

Dos conceptes que els apareixen a tots:

- **Clúster** (o bloc): la unitat mínima d'assignació. Un arxiu menut ocupa, com a mínim, un clúster sencer.
- **Journaling** (registre de transaccions): abans de canviar l'estructura, el sistema anota què va a fer. Si l'ordinador s'apaga de manera brusca, pot repassar el registre i deixar el volum en un estat coherent sense revisar tot el disc.

### 4.1 FAT32

Antic (va aparéixer amb Windows 95 OSR2, el 1996) però compatible amb pràcticament tot: Windows, Linux, macOS, consoles, càmeres, televisors, el firmware UEFI... Per això és el sistema de la **partició EFI** i el format de fàbrica de molts pendrives i targetes SD. El seu límit més conegut és que **un arxiu no pot passar de 4 GiB** (exactament, 4 GiB menys 1 byte). No té permisos ni xifratge, ni journaling.

:::caution[Els límits de volum de FAT32 depenen de més coses]
Es diu sovint que FAT32 arriba a «8 TB per partició», però eixa xifra depén de la grandària del clúster i del sector. Amb sectors de 512 bytes i clústers de 32 KiB s'arriba a uns 8 TiB; amb altres combinacions, el teòric és major o menor. A més, **les eines de formatat** poden imposar un límit propi: les de Windows, durant molts anys, no deixaven crear volums FAT32 de més de 32 GB (encara que sí que els llegien). Quan t'apareguen estes xifres, pensa que són «ordres de magnitud» i comprova l'eina concreta.
:::

### 4.2 exFAT

Va nàixer per a suplir les limitacions de FAT32 en memòries flash. Sense el límit pràctic de 4 GiB per arxiu i amb volums molt grans, continua sense permisos ni journaling. Windows i macOS l'admeten des de fa anys, i Linux ho fa de manera nativa des del nucli 5.7 (abans calia instal·lar un paquet). La majoria de televisors i càmeres actuals la llig, però **convé comprovar el manual** del dispositiu.

### 4.3 NTFS

El sistema natiu de Windows des de Windows NT. Permet arxius i volums enormes, **permisos detallats per arxiu i carpeta** (ACL), xifratge integrat (EFS), compressió, quotes de disc i **journaling**. És el que Windows exigix per a instal·lar-se. Linux el pot llegir i escriure amb controladors addicionals o recents (`ntfs-3g`, `ntfs3`), i macOS, per defecte, només el llig. No és un bon candidat per a dispositius com televisors o consoles.

### 4.4 ext4

El sistema més habitual en les distribucions Linux. Fa servir **journaling**, admet arxius de fins a 16 TiB i volums de fins a 1 EiB (amb blocs de 4 KiB) i aplica els permisos d'estil Unix: **propietari, grup i altres** (UGO, de *user, group, others*), cadascun amb lectura, escriptura i execució. Windows no el reconeix sense programari de tercers.

### 4.5 Comparativa

| | FAT32 | exFAT | NTFS | ext4 |
|---|---|---|---|---|
| **Arxiu màxim** | 4 GiB − 1 B | Pràcticament il·limitat | Enorme (≥ 16 TiB; depén del clúster) | 16 TiB |
| **Permisos per usuari** | No | No | Sí (ACL) | Sí (UGO) |
| **Journaling** | No | No | Sí | Sí |
| **Windows** | Sí | Sí | Sí (natiu) | No (cal programari extra) |
| **Linux** | Sí | Sí (nucli 5.7+) | Amb controlador | Sí (natiu) |
| **macOS** | Sí | Sí | Només lectura per defecte | No |
| **Televisors i consoles** | Sí | Molts, comprova-ho | Alguns (sovint només lectura) | No |
| **Ús típic** | Partició EFI, pendrives antics | Pendrives i discos externs compartits | Disc de sistema de Windows | Arrel i dades de Linux |

:::note[Exemple resolt]
Un tècnic ha de preparar un pendrive de 64 GB per a portar vídeos de 6 GB entre un Windows, un Linux i un televisor. FAT32 queda descartat pel límit de 4 GiB per arxiu. NTFS i ext4 queden descartats perquè el televisor probablement no els entén (ext4) o només els llig (NTFS). **exFAT** compleix els tres requisits, amb el compromís de no tindre permisos ni journaling. Cal comprovar que el televisor admet exFAT.
:::

### 4.6 Formatar des de la línia d'ordres

Normalment formataràs des de l'instal·lador o des d'una eina gràfica, però convé veure l'equivalent en línia d'ordres (només com a referència; no ho executes sobre un disc que tinga dades):

```bash
lsblk -f                      # llista discos i particions amb el seu sistema d'arxius
sudo mkfs.ext4 /dev/sdb1      # formata /dev/sdb1 com a ext4 (ESBORRA el que hi haja)
```

```powershell
Get-Volume                    # llista els volums i el seu sistema d'arxius
format E: /FS:NTFS /Q         # formata la unitat E: com a NTFS (ESBORRA el que hi haja)
```

:::danger[Formatar destrueix les dades]
Abans d'executar `mkfs` o `format`, comprova **tres vegades** quin dispositiu és. Un error d'una lletra (`sda` en compte de `sdb`) pot esborrar el disc del sistema. Practica sempre en màquines virtuals.
:::

## Comprova el que has après

1. Un servidor atén peticions de diversos departaments, cadascun amb comptes i permisos propis. De quins dos tipus és el seu SO?

   <details>
   <summary>Resposta</summary>

   **Multiusuari** (diversos comptes amb permisos diferents) i **de xarxa** (dona servici a altres equips). Les dues categories no s'exclouen.

   </details>

2. Una empresa vol «un SO lliure, per tant gratuït». Què hi ha d'inexacte?

   <details>
   <summary>Resposta</summary>

   «Lliure» es referix a les llibertats d'usar, estudiar, modificar i redistribuir el programari, no al preu. Hi ha programari lliure de pagament (per exemple, el suport comercial) i programari gratuït que no és lliure (*freeware*).

   </details>

3. Per què no és una bona idea formatar en FAT32 un disc extern per a còpies de màquines virtuals?

   <details>
   <summary>Resposta</summary>

   Perquè un arxiu de disc virtual supera fàcilment els 4 GiB, i FAT32 no admet arxius d'eixa grandària. També perdries permisos i journaling. Per a un disc compartit entre sistemes, exFAT; per a ús només en Windows, NTFS; per a ús només en Linux, ext4.

   </details>

4. Quin avantatge ofereix el journaling quan es va la llum en plena escriptura?

   <details>
   <summary>Resposta</summary>

   El sistema anota les operacions abans de fer-les. En reiniciar, repassa el registre i deixa l'estructura del volum coherent sense haver de revisar tot el disc, amb menys risc de corrupció.

   </details>

5. Un equip amb Windows i Ubuntu en dual boot necessita una unitat de dades que tots dos puguen llegir i escriure, i que admeta arxius grans. Quin sistema d'arxius triaries?

   <details>
   <summary>Resposta</summary>

   **exFAT** o **NTFS** (amb el controlador adequat en Linux). exFAT és més senzill de compartir, però no té permisos; NTFS en té, però en Linux depén de controladors addicionals. FAT32 no val per la limitació de 4 GiB, i ext4 no el llig Windows.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| sistema operatiu (SO) | sistema operativo (SO) |
| nucli | núcleo (kernel) |
| controlador | controlador (driver) |
| crida al sistema | llamada al sistema |
| monousuari / multiusuari | monousuario / multiusuario |
| programari lliure | software libre |
| codi obert | código abierto |
| llicència | licencia |
| sistema d'arxius | sistema de archivos |
| clúster | clúster |
| permís | permiso |
| registre de transaccions (*journaling*) | registro de transacciones (*journaling*) |
| formatar | formatear |
