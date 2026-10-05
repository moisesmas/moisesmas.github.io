---
title: "2. Instal·lació i particionat"
description: "Com planificar una instal·lació, crear el suport d'arrancada, dissenyar particions amb MBR o GPT, entendre els noms dels discos, configurar un dual boot i seguir la cadena d'arrancada."
---

La majoria dels problemes d'una instal·lació no passen durant la instal·lació, sinó abans (no havies planificat) o després (no entens com arranca l'equip). Esta pàgina cobrix tot el camí: preparar, particionar, instal·lar dos sistemes en un mateix disc i saber què passa quan premes el botó d'encesa.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 90 minuts de lectura i 90 de pràctica.

1. Llig les seccions 1 i 2 amb un full al costat: la llista de comprovació de la secció 1 et servirà després en l'activitat 4.
2. Les seccions 3 i 4 són el cor de la sessió. Obri el [laboratori «Particions i arrancada»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/#mbr-gpt) i construïx taules de particions MBR i GPT fins que els límits et semblen evidents.
3. Les seccions 5, 6 i 7 tenen cada una la seua pestanya en el laboratori.
4. Acaba amb l'activitat 3 (disseny de particions) i el qüestionari d'Aules.
:::

## 1. Planificar la instal·lació

Una instal·lació «a cegues» és la manera més fàcil de perdre dades o d'acabar amb un sistema que no arranca. Abans de començar, revisa sempre estos punts:

| Pas | Què comprovar |
|---|---|
| **Requisits** | CPU, RAM i espai en disc mínims i recomanats de la versió que vas a instal·lar. Per sota del mínim, el rendiment és pobre o l'instal·lador es nega a continuar. |
| **Firmware** | Si l'equip arranca en mode **UEFI** o en BIOS clàssica (*legacy/CSM*), i si té Secure Boot activat. D'això depén el tipus de taula de particions. |
| **Compatibilitat** | Que hi haja controladors per al SO elegit, sobretot en maquinari molt nou o molt antic. |
| **Còpia de seguretat** | Si el disc té dades, **còpia abans de tocar res**. Particionar o instal·lar pot esborrar-ho tot de manera irreversible. |
| **Llicència** | Clau o llicència en regla per a SO propietaris (vegeu la [pàgina 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/)). |
| **Xarxa i actualitzacions** | Connexió disponible per a baixar actualitzacions i controladors en acabar. |
| **Medi d'instal·lació** | Un USB arrancable (o una ISO si és una màquina virtual). Es crea amb l'apartat següent. |
| **Documentar** | Anota el que fas: decisions, particions, captures. És un criteri d'avaluació (RA2.i) i et salvarà quan t'oblides d'on has triat què. |

### 1.1 El medi d'instal·lació

Un SO es distribuïx com una **imatge ISO**. Perquè un equip físic puga arrancar des d'ella cal «gravar-la» en un USB de manera que siga arrancable: no val copiar el fitxer sense més.

| Eina | Plataforma | Notes |
|---|---|---|
| **Media Creation Tool** de Microsoft | Windows | Baixa i prepara Windows en un USB |
| **Rufus** | Windows | Gravar ISO de Windows o Linux; permet triar MBR o GPT segons l'equip |
| **balenaEtcher** | Windows, macOS, Linux | Senzill, serveix per a la majoria d'ISO |
| `dd` | Linux | Funciona, però un error d'unitat destruïx dades |

Si l'ISO la baixes d'Internet, **comprova la seua integritat** comparant el *hash* SHA-256 que publica el fabricant:

```bash
sha256sum ubuntu.iso            # Linux
```

```powershell
Get-FileHash .\ubuntu.iso -Algorithm SHA256    # Windows
```

Després entra al menú d'arrencada de l'equip (la tecla depén del fabricant: F12, F2, Supr, Esc...) i tria l'USB. En una màquina virtual, simplement s'associa l'ISO a la unitat òptica virtual.

## 2. Què és particionar i per què

**Particionar** és dividir l'espai d'un disc físic en seccions lògiques independents, les **particions**. Cada una pot tindre el seu propi sistema d'arxius i el SO la tracta com si fora un disc diferent. Els motius habituals:

- **Separar el sistema de les dades**: reinstal·lar el SO sense tocar els documents.
- **Instal·lar diversos sistemes en el mateix disc** (arrancada dual o *dual boot*).
- **Crear les particions que el propi SO necessita**: la partició d'arrancada EFI en equips UEFI, la partició d'intercanvi (*swap*) en Linux...
- **Aïllar** una zona perquè no s'òmpliga tot el disc (per exemple, el *log* d'un servidor).

Una partició **no és** una còpia de seguretat: si el disc físic falla, es perden totes. Tampoc fa el disc més ràpid.

## 3. Esquemes de particionat: MBR i GPT

La **taula de particions** és l'estructura, en els primers (i últims) sectors del disc, que diu on comença i acaba cada partició. Hi ha dos esquemes.

### 3.1 MBR (*Master Boot Record*)

L'esquema clàssic, dels anys 80, associat a la BIOS. Guarda la taula en el primer sector de 512 bytes (que també conté un xicotet codi d'arrancada). Només té **4 entrades**, de manera que admet com a molt **4 particions primàries**. Si en necessites més, una de les entrades es converteix en **partició estesa**, un contenidor dins del qual es creen **particions lògiques** (tantes com calga). Normes de l'MBR:

- Màxim **4 primàries**, o **3 primàries + 1 estesa**.
- Només pot haver-hi **una** estesa per disc.
- La **lògica** només viu dins de l'estesa.
- Les adreces són de 32 bits: amb sectors de 512 bytes només s'arriba a **2 TiB** (≈ 2,2 TB). Si el disc és més gran, **l'espai de més és inutilitzable**.

### 3.2 GPT (*GUID Partition Table*)

L'esquema modern, associat a UEFI. No té primàries, esteses ni lògiques: totes les particions són iguals. Per defecte admet **128 particions**, no té el límit de 2 TiB (pràcticament cap disc real el pot omplir) i guarda una **còpia de la taula al final del disc**, de manera que resistix millor la corrupció. Cada partició s'identifica amb un GUID. Al principi hi ha un «MBR de protecció» perquè les eines antigues no vegen el disc com a buit.

| Característica | MBR | GPT |
|---|---|---|
| Aparició | Anys 80 | Anys 2000 (part de la norma UEFI) |
| Particions | 4 primàries, o 3 + estesa amb lògiques | 128 per defecte, totes iguals |
| Grandària màxima de disc | 2 TiB (sectors de 512 B) | Pràcticament il·limitada |
| Còpia de la taula | No | Sí, al final |
| Firmware habitual | BIOS | UEFI |

Una regla pràctica per a decidir:

- **Equip UEFI** (el normal des de fa anys) → **GPT**. Windows en UEFI exigix GPT en el disc d'arrancada.
- **Equip amb BIOS clàssica** → **MBR** per a Windows. Linux pot usar GPT, però cal una xicoteta partició addicional (`bios_grub`).
- **Disc de més de 2 TiB** → **GPT**, sempre.

:::note[Exemple resolt]
Es vol instal·lar Windows 11 en un disc nou de 4 TB. Windows 11 exigix un equip UEFI, i el disc és major que 2 TiB: MBR ni tan sols podria adreçar tot l'espai. La solució és un disc **GPT**.
:::

### 3.3 Com ho deixa Windows

Quan s'instal·la Windows en un disc buit d'un equip UEFI, crea normalment estes particions: una **EFI** de FAT32 (uns 100 MB o més), una xicoteta **MSR** reservada pel sistema (16 MB), la partició del sistema, **C:** (NTFS) i una de **recuperació** (alguns centenars de MB). No cal que les memoritzes, però sí que reconeguis la **partició EFI** i la de **recuperació** quan les vegis en l'Administrador de discos.

## 4. Com es diuen els discos i les particions

### 4.1 Linux

Linux representa cada dispositiu amb un arxiu dins de `/dev`. Els discos SATA/USB/SCSI es diuen `/dev/sda`, `/dev/sdb`... per ordre de detecció, i les particions afigen un número: `/dev/sda1`, `/dev/sda2`...

| Dispositiu | Nom del disc | Primera partició |
|---|---|---|
| Disc SATA o USB | `/dev/sda` | `/dev/sda1` |
| Segon disc SATA | `/dev/sdb` | `/dev/sdb1` |
| SSD NVMe | `/dev/nvme0n1` | `/dev/nvme0n1p1` |
| Disc d'una VM VirtIO | `/dev/vda` | `/dev/vda1` |

En MBR, els números **1 a 4** estan reservats a les primàries (i a l'estesa); les **lògiques comencen sempre pel 5**, encara que el disc només tinga una primària. Així, en un disc amb 2 primàries i una estesa amb 3 lògiques, les particions són `sda1`, `sda2`, `sda3` (l'estesa) i `sda5`, `sda6`, `sda7`.

### 4.2 Windows

Windows no mostra el disc com un arxiu, sinó que assigna a cada volum amb sistema d'arxius reconegut una **lletra d'unitat** (`C:`, `D:`...). `C:` és el volum del sistema. La partició EFI i l'estesa no tenen lletra. Els discs físics s'identifiquen com a **Disc 0**, **Disc 1**... en l'Administrador de discos.

### 4.3 Eines per a veure-ho

```bash
lsblk                       # arbre de discos i particions (Linux)
lsblk -f                    # amb el sistema d'arxius i la UUID
sudo fdisk -l               # llista les taules de particions
```

```powershell
Get-Disk                    # discs i estil de partició (MBR o GPT)
Get-Partition               # particions amb lletra i grandària
```

## 5. Un esquema típic per a Linux

Quan un instal·lador et deixa triar el particionat manual, un esquema ben pensat per a un equip UEFI té estes particions:

| Partició | Sistema d'arxius | Punt de muntatge | Grandària orientativa | Per a què |
|---|---|---|---|---|
| **EFI** (ESP) | FAT32 | `/boot/efi` | 512 MiB – 1 GiB | Guarda els gestors d'arrancada |
| **Arrel** | ext4 | `/` | 25–50 GiB o més | El sistema i els programes |
| **Dades d'usuari** (opcional) | ext4 | `/home` | La resta del disc | Documents i configuració personal |
| **Swap** | swap | — | 2–4 GiB, o ≥ la RAM si vols hibernar | Memòria d'intercanvi |

Idees que cal retindre:

- Separar `/home` permet **reinstal·lar el sistema sense perdre les dades** (només es formata `/`).
- La **swap** s'usa quan la RAM s'ompli, i és necessària per a hibernar. Els instal·ladors recents de Ubuntu poden usar un *fitxer* de swap en compte d'una partició; ho veuràs en la pràctica.
- En un equip de **BIOS i MBR** no hi ha partició EFI, i l'arrancada es guarda en el sector 0 del disc.
- Les xifres són orientatives: comprova els requisits de la versió que instal·les (per exemple, Ubuntu Desktop recent recomana uns 25 GB de disc i 4 GB de RAM).

## 6. Dual boot: dos sistemes en un disc

L'**arrancada dual** permet triar, en encendre, entre dos sistemes (normalment, Windows i Linux). Cal respectar tres regles:

1. **Instal·la primer Windows i després Linux.** L'instal·lador de Linux detecta Windows i l'afig al menú del seu gestor d'arrancada (GRUB). Si fas l'ordre contrari, l'instal·lador de Windows no coneix cap altre sistema i **posa el seu gestor en primer lloc**: Linux continua al disc, però «desapareix» del menú fins que es repare la configuració.
2. **Fes espai des de Windows.** Redueix el volum de Windows des de l'Administrador de discos (*Redueix el volum...*) per a deixar espai sense assignar, i després deixa que l'instal·lador de Linux use eixe espai.
3. **Mateix mode de firmware en els dos**: tots dos en UEFI, o tots dos en BIOS clàssica.

:::caution[Coses que fan fallar un dual boot]
- **Inici ràpid** de Windows: en estar activat, Windows hiberna parcialment i deixa el seu volum «bloquejat». Desactiva-lo abans d'instal·lar Linux.
- **BitLocker**: si el disc de Windows està xifrat, canviar les particions pot demanar la clau de recuperació. Guarda-la o suspén la protecció.
- **Rellotge**: Windows guarda l'hora local en el rellotge del maquinari i Linux, per defecte, l'UTC, i cada vegada que canvies de sistema l'hora està desplaçada. Es corregix amb `timedatectl` en Linux.
- Si Windows queda sense arrancar després d'un canvi de particions, la causa sol ser el gestor d'arrancada, no les dades.
:::

## 7. La cadena d'arrancada del sistema operatiu

Ja vas veure en la unitat 1 que el firmware fa el POST. Esta és la part que ve a continuació, des del punt de vista del SO:

| Pas | UEFI + Linux | UEFI + Windows | BIOS + MBR (Linux) |
|---|---|---|---|
| 1 | El firmware tria una entrada d'arrancada | El mateix | El firmware tria un disc |
| 2 | Carrega des de la partició EFI el gestor (*shim* i GRUB) | Carrega des de l'EFI el **Windows Boot Manager** | Llig el primer sector (MBR) i executa el seu codi |
| 3 | GRUB mostra el menú i carrega el **nucli** i `initramfs` en RAM | El gestor llig el **BCD** i carrega `winload` | El codi carrega GRUB, que carrega el nucli |
| 4 | El nucli inicia el maquinari i munta l'arrel | El nucli de Windows s'inicia | Igual que en UEFI |
| 5 | El procés **systemd** (PID 1) arrenca els servicis | Els servicis i l'inici de sessió de Windows | Igual |
| 6 | Apareix la pantalla d'inici de sessió | Apareix la pantalla d'inici de sessió | Igual |

Això explica errors típics: el missatge `grub rescue>` apareix quan GRUB no troba els seus fitxers; `Boot Configuration Data ... 0xc000000f` de Windows, quan el seu gestor no troba el BCD; un *kernel panic* diu que el nucli no ha pogut muntar l'arrel. El laboratori té una pestanya per a recórrer esta cadena pas a pas.

## 8. Eines de particionat

| Eina | Entorn | Per a què |
|---|---|---|
| **Instal·lador** del SO | Windows, Linux | Particionat durant la instal·lació |
| **Administrador de discos** (`diskmgmt.msc`) | Windows | Crear, reduir, estendre i formatar volums amb una interfície gràfica |
| `diskpart` | Windows (consola) | Les mateixes tasques per ordres |
| **GParted** | Linux (també en versió *live*) | Eina gràfica molt popular; pot reduir/moure particions |
| `fdisk`, `gdisk`, `parted` | Linux (consola) | Més potents, requerixen precisió |

```powershell
diskpart
list disk
select disk 0
list partition
```

```bash
sudo parted -l              # llista totes les taules de particions
```

:::danger[Un error pot fer inaccessible un disc]
Les eines de particionat apliquen els canvis sobre discos reals. Comprova el número del disc abans d'esborrar o formatar res, i en este mòdul practica sempre en **màquines virtuals**. Les ordres com `clean` (a `diskpart`) o `mkfs` esborren el disc.
:::

## Comprova el que has après

1. Un disc MBR té 3 particions primàries i vols afegir-ne tres més. És possible?

   <details>
   <summary>Resposta</summary>

   Sí, si queda espai lliure: es crea una **estesa** en la quarta entrada de la taula (3 primàries + 1 estesa) i, dins d'ella, les tres **lògiques**. No es podria si les quatre entrades ja foren primàries.

   </details>

2. Com es diu la tercera partició lògica del segon disc SATA?

   <details>
   <summary>Resposta</summary>

   `/dev/sdb7`. El segon disc és `sdb`, i les lògiques comencen en el 5: 5, 6 i **7**.

   </details>

3. Per què s'instal·la primer Windows i després Linux en un dual boot?

   <details>
   <summary>Resposta</summary>

   Perquè l'instal·lador de Linux detecta Windows i l'afig al menú de GRUB, mentre que l'instal·lador de Windows no coneix Linux i posa el seu propi gestor en primer lloc, deixant Linux fora del menú.

   </details>

4. Quina diferència hi ha entre la partició EFI i la swap?

   <details>
   <summary>Resposta</summary>

   La partició **EFI** (FAT32) guarda els gestors d'arrancada que carrega el firmware UEFI. La **swap** és l'espai d'intercanvi que Linux usa com a memòria quan s'ompli la RAM (i per a hibernar). Són independents.

   </details>

5. Quin és el primer programa del SO que s'executa en arrancar un Linux UEFI i quin és l'últim abans de l'inici de sessió?

   <details>
   <summary>Resposta</summary>

   El primer és el **gestor d'arrancada** (GRUB, carregat des de la partició EFI); després el nucli i, finalment, **systemd**, que arrenca els servicis i mostra la pantalla d'inici de sessió.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| partició | partición |
| taula de particions | tabla de particiones |
| partició primària / estesa / lògica | partición primaria / extendida / lógica |
| partició EFI (ESP) | partición EFI (ESP) |
| partició d'intercanvi (*swap*) | partición de intercambio (*swap*) |
| arrancada | arranque |
| arrancada dual (*dual boot*) | arranque dual (*dual boot*) |
| gestor d'arrancada | gestor de arranque |
| suport d'instal·lació | medio de instalación |
| imatge ISO | imagen ISO |
| punt de muntatge | punto de montaje |
| lletra d'unitat | letra de unidad |
| redimensionar | redimensionar |
