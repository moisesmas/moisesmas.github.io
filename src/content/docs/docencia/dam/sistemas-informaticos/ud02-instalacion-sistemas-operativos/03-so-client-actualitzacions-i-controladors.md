---
title: "3. SO client, actualitzacions i controladors"
description: "Instal·lar Windows i Ubuntu en un equip d'usuari, fer la configuració inicial, mantindre el sistema i les aplicacions al dia i diagnosticar controladors amb les eines de cada sistema."
---

Un SO acabat d'instal·lar no està acabat: té mesos de retard en actualitzacions, probablement li falten controladors i encara no té els teus programes. Esta pàgina cobrix tot el que fas des que arrenca l'instal·lador fins que l'equip queda llest per a treballar, i com es diagnostica quan alguna cosa no va bé.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 90 de pràctica.

1. Llig la secció 1 mentre vas repassant les fases de la instal·lació; no cal memoritzar les pantalles, sinó l'ordre i el motiu de cada pas.
2. Les ordres de les seccions 2, 3 i 4 **es dominen executant-les**. Si pots, tingues una màquina virtual Ubuntu oberta mentre llegixes.
3. Fes l'activitat 4 (instal·lació documentada en una VM) i l'activitat 5 (diagnòstic de controladors i recuperació).
4. Recorda que després ve la **pràctica presencial**: tria la teua ISO i comprova que VirtualBox funciona en el teu ordinador.
:::

## 1. Instal·lació d'un SO client

Un SO **client** és el que s'instal·la en l'equip d'una persona (escriptori o portàtil): Windows 10/11, Ubuntu Desktop, Linux Mint... Es diferencia d'un SO **servidor**, que estudiarem en la pàgina 4.

### 1.1 Windows

Les fases habituals d'una instal·lació **neta** són:

1. **Arrancar des del medi** (USB o ISO) en mode UEFI.
2. **Idioma, format d'hora i teclat.**
3. **Clau de producte** (o «no tinc clau», si s'activarà després) i **edició** de Windows.
4. **Acceptar la llicència.**
5. **Tipus d'instal·lació**: *Actualitza* (conserva fitxers i aplicacions d'una versió anterior) o *Personalitzada* (instal·lació neta; és la que et deixa triar la partició).
6. **Selecció de la partició**: aquí veus el disc i les seues particions; pots eliminar-les, crear-ne de noves o triar l'espai lliure. Windows crearà les particions pròpies que necessite (EFI, MSR, recuperació).
7. **Còpia de fitxers i reinicis automàtics.** No traques l'USB fins que l'equip reinicie i comence a carregar-se del disc.
8. **Configuració inicial** (OOBE): regió, xarxa, compte d'usuari, privacitat. En algunes edicions i versions Windows exigix connexió a Internet i un compte de Microsoft; els detalls canvien amb les versions.
9. **Primer inici de sessió.**

:::note[Requisits de Windows 11]
Segons les especificacions publicades per Microsoft, Windows 11 demana un processador de 64 bits compatible, 4 GB de RAM, 64 GB d'emmagatzematge, firmware UEFI amb Secure Boot i un mòdul TPM 2.0. Consulta sempre la pàgina oficial de la versió que instal·les: els requisits poden canviar.
:::

### 1.2 Ubuntu (i altres distribucions d'escriptori)

1. **Arrancar des del medi.** L'ISO d'Ubuntu ofereix un mode **live**: pots provar tot el sistema des de l'USB sense instal·lar res, útil per a comprovar que el maquinari funciona abans de decidir.
2. **Idioma i teclat.**
3. **Tipus d'instal·lació**, que determina què passa amb el disc:
   - *Esborrar el disc i instal·lar Ubuntu*: el més simple, però destruïx el que hi haja.
   - *Instal·lar al costat de Windows* (dual boot): redimensiona el que hi haja i afig Ubuntu.
   - *Instal·lació manual / «una altra cosa»*: tu dissenyes les particions (EFI, `/`, `/home`, swap), com en la pàgina anterior.
4. **Zona horària, compte d'usuari i contrasenya.**
5. **Còpia de fitxers i reinici.** Quan l'instal·lador ho demana, retira el medi.

Les opcions exactes de l'instal·lador canvien entre versions, però l'estructura és sempre la mateixa: **idioma → disc → usuari → còpia → reinici**.

### 1.3 Configuració inicial

Quan el sistema arranca per primera vegada, abans d'usar-lo en seriós, repassa:

| Què | Per què | Windows | Ubuntu |
|---|---|---|---|
| **Nom de l'equip** | Identifica la màquina en la xarxa; ha de ser únic i sense espais | `Rename-Computer -NewName AULA-PC01` (i reiniciar) | `sudo hostnamectl set-hostname aula-pc01` |
| **Compte d'usuari** | Tindre un compte d'ús diari i no treballar sempre com a administrador | *Configuració → Comptes* | `adduser`, o durant la instal·lació |
| **Xarxa** | Comprovar que hi ha connexió i adreça | `ipconfig` | `ip a` |
| **Data, hora i zona** | Necessàries per a certificats i registres | *Configuració → Hora i idioma* | `timedatectl` |
| **Actualitzacions** | Parxes de seguretat (secció 2) | Windows Update | `apt update` i `apt upgrade` |

## 2. Actualitzacions

La imatge d'instal·lació pot tindre mesos o anys d'antiguitat. Si no actualitzes, tens un sistema amb vulnerabilitats conegudes des del primer minut. Per això, **el primer que es fa en acabar una instal·lació és actualitzar**.

Hi ha tres tipus d'actualització que convé distingir:

- **De seguretat**: corregixen vulnerabilitats. Són les més urgents.
- **De qualitat o errors**: corregixen fallades sense afegir funcions.
- **De funcionalitats**: afigen novetats o canvien la versió principal del SO. Poden requerir més temps i una còpia prèvia.

### 2.1 En Windows

S'actualitza des de **Windows Update** (*Configuració → Windows Update*). Descarrega i instal·la parxes i, de vegades, controladors, i moltes demanen un **reinici**. Des de PowerShell pots veure les actualitzacions instal·lades:

```powershell
Get-HotFix                   # parxes instal·lades
winget upgrade               # programes (no només Windows) amb actualització disponible
```

### 2.2 En Ubuntu i Debian

El gestor de paquets `apt` treballa en dos temps, i la confusió entre els dos és molt freqüent:

```bash
sudo apt update              # actualitza la LLISTA de paquets disponibles (no instal·la res)
sudo apt upgrade             # INSTAL·LA les actualitzacions d'eixa llista
apt list --upgradable        # mostra què es pot actualitzar
```

Cal executar-los **en eixe ordre**: `update` descarrega les novetats del catàleg, i `upgrade` les aplica. Si només fas `upgrade`, instal·les segons un catàleg desactualitzat. Ubuntu també té el **Gestor d'actualitzacions** gràfic i, per defecte, aplica automàticament les actualitzacions de seguretat.

:::tip[Hàbit professional]
Abans d'una actualització gran en un equip important, fes una **còpia de seguretat** o, en una màquina virtual, una **instantània** (pàgina 4). Si alguna cosa ix malament, podràs tornar enrere.
:::

## 3. Instal·lar, desinstal·lar i actualitzar aplicacions

Cal saber gestionar les aplicacions. La idea és la mateixa en tots els sistemes (**instal·lar, desinstal·lar, actualitzar**), però canvia l'eina.

### 3.1 En Windows

Les aplicacions s'instal·len de tres maneres:

- **Instal·lador descarregat** (`.exe` o `.msi`) de la web del fabricant. Comprova que és el lloc oficial.
- **Microsoft Store**.
- **Gestor de paquets `winget`** (Windows Package Manager), que ve amb les versions actuals de Windows 10 i 11.

```powershell
winget search vlc            # busca paquets
winget install VideoLAN.VLC  # instal·la per l'identificador del paquet
winget upgrade --all         # actualitza tot el que es puga
winget uninstall VideoLAN.VLC
```

Per a **desinstal·lar** de manera gràfica: *Configuració → Aplicacions → Aplicacions instal·lades*. Una desinstal·lació pot deixar restes (configuració en les carpetes de l'usuari) que cal netejar a mà si vols un esborrat complet.

### 3.2 En Ubuntu

La font principal són els **repositoris** de la distribució: servidors que guarden paquets verificats. Amb `apt`:

```bash
apt search vlc               # busca
sudo apt install vlc         # instal·la (amb les seues dependències)
sudo apt remove vlc          # desinstal·la, però conserva la configuració
sudo apt purge vlc           # desinstal·la i esborra també la configuració
sudo apt autoremove          # elimina dependències que ja no fa servir ningú
```

També existixen paquets **Snap** (`snap install`) i **Flatpak**, que inclouen les seues dependències, i la instal·lació de fitxers `.deb` descarregats amb `sudo apt install ./fitxer.deb`.

### 3.3 Equivalències

| Acció | Windows | Ubuntu |
|---|---|---|
| Buscar | `winget search` | `apt search` |
| Instal·lar | `winget install` | `sudo apt install` |
| Actualitzar tot | `winget upgrade --all` | `sudo apt update && sudo apt upgrade` |
| Desinstal·lar | `winget uninstall` | `sudo apt remove` / `purge` |

:::caution[Instal·la només des de fonts de confiança]
Un instal·lador de procedència dubtosa és la via d'entrada més comuna del programari maliciós. Prefereix el repositori de la distribució, la botiga oficial o la web del fabricant, i no executes res amb permisos d'administrador si no saps què fa.
:::

## 4. Controladors de dispositius

Un **controlador** (*driver*) és el programari que permet al SO comunicar-se amb un component concret. Sense ell, el dispositiu pot no funcionar, o funcionar amb un controlador **genèric** que només oferix les funcions bàsiques: una targeta gràfica dedicada que mostra la imatge però sense acceleració 3D, per exemple.

### 4.1 En Windows

Windows instal·la molts controladors durant la instal·lació o poc després mitjançant Windows Update. Per a maquinari que busca el màxim rendiment (sobretot **targetes gràfiques**), convé baixar el controlador oficial més recent des de la web del fabricant (NVIDIA, AMD, Intel...).

La peça central és l'**Administrador de dispositius** (`devmgmt.msc`):

- Un **triangle groc amb un signe d'admiració** indica un dispositiu amb problema; si es mostra com «Dispositiu desconegut», no hi ha controlador.
- En les **Propietats** del dispositiu, la fitxa *Controlador* permet **actualitzar**, **revertir al controlador anterior** (útil quan un controlador nou dona problemes) o **desinstal·lar** el dispositiu perquè Windows el torne a detectar.
- Les propietats mostren un codi d'error (per exemple, el codi 28 vol dir que no s'han instal·lat els controladors).

```powershell
Get-PnpDevice -PresentOnly | Where-Object { $_.Status -ne 'OK' }   # dispositius amb problemes
driverquery                                                          # controladors carregats
```

### 4.2 En Linux

El **nucli** Linux porta de sèrie controladors de codi obert per a una gran quantitat de maquinari, de manera que sovint tot funciona sense fer res. Per a maquinari específic (altra vegada, targetes gràfiques) alguns sistemes, com Ubuntu, tenen un gestor de **«controladors addicionals»** que instal·la controladors propietaris.

Per a diagnosticar:

```bash
lspci                        # maquinari de bus PCI (gràfica, xarxa...)
lspci -k                     # afig quin controlador (nucli) fa servir cada dispositiu
lsusb                        # dispositius USB
ubuntu-drivers devices       # controladors recomanats (Ubuntu)
sudo ubuntu-drivers install  # instal·la els recomanats
```

Si en `lspci -k` un dispositiu no mostra cap línia **Kernel driver in use**, eixe component no té controlador carregat.

:::note[Exemple resolt]
Després d'instal·lar Windows en un equip amb una gràfica dedicada recent, l'Administrador de dispositius mostra **«Adaptador de pantalla bàsic de Microsoft»**. El sistema mostra imatge gràcies a un controlador genèric, però sense acceleració 3D ni resolucions altes. La solució és baixar i instal·lar el controlador oficial del fabricant; en acabar, el dispositiu mostrarà el nom real de la targeta sense icona d'avís.
:::

### 4.3 Mètode de diagnòstic

Quan un dispositiu no funciona, segueix sempre el mateix camí:

1. **Detecta**: ix en el sistema? (`Administrador de dispositius`; `lspci`/`lsusb`).
2. **Identifica** el model exacte.
3. **Comprova l'estat** del controlador (avís groc; línia *driver in use*).
4. **Actualitza** per Windows Update/gestor de paquets o des de la web del fabricant.
5. **Torna enrere** si el problema va començar amb una actualització (revertir controlador).
6. **Documenta** el que has fet i el resultat.

## Comprova el que has après

1. Executes només `sudo apt upgrade` en un Ubuntu recent instal·lat fa uns mesos. Què hi ha de dubtós?

   <details>
   <summary>Resposta</summary>

   Que `apt upgrade` usa el catàleg de paquets que té guardat, que pot estar desactualitzat. Primer cal executar `sudo apt update`, que el refresca, i després `sudo apt upgrade`.

   </details>

2. Quina diferència hi ha entre `apt remove` i `apt purge`?

   <details>
   <summary>Resposta</summary>

   `remove` desinstal·la el programa però conserva els fitxers de configuració; `purge` també elimina la configuració.

   </details>

3. Un portàtil s'ha quedat sense Wi-Fi després de reinstal·lar Windows. Com ho diagnostiques?

   <details>
   <summary>Resposta</summary>

   S'obri l'Administrador de dispositius i es busca un adaptador de xarxa amb triangle groc o un «Dispositiu desconegut». Cal identificar el model de la targeta i instal·lar el seu controlador des de Windows Update o la web del fabricant (baixat des d'un altre equip, si no hi ha connexió).

   </details>

4. Què mostra `lspci -k` que no mostra `lspci`?

   <details>
   <summary>Resposta</summary>

   El controlador (mòdul del nucli) que s'està usant per a cada dispositiu (línia *Kernel driver in use*) i els mòduls disponibles. Permet saber si un component té controlador.

   </details>

5. Per què no és bona idea instal·lar programes des d'una web desconeguda, encara que el programa siga gratuït?

   <details>
   <summary>Resposta</summary>

   Perquè pot contindre programari maliciós, i s'executa amb els permisos de qui l'instal·la. Cal preferir repositoris, botigues i webs oficials.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| SO client | SO cliente |
| instal·lació neta | instalación limpia |
| mode *live* | modo *live* |
| configuració inicial | configuración inicial |
| nom de l'equip | nombre del equipo |
| actualització | actualización |
| parxe | parche |
| gestor de paquets | gestor de paquetes |
| repositori | repositorio |
| dependència | dependencia |
| controlador | controlador (driver) |
| Administrador de dispositius | Administrador de dispositivos |
| revertir | revertir |
