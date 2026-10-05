---
title: "4. SO servidor i màquines virtuals"
description: "Windows Server amb Server Core o Escriptori, virtualització amb hipervisors, creació i gestió de màquines virtuals (xarxa, instantànies, Guest Additions) i mecanismes de recuperació del sistema."
---

Esta pàgina és la base de la **sessió presencial del 3 de novembre**. Allí instal·laràs un Linux dins d'una màquina virtual i arrancaràs l'instal·lador de Windows Server. Les màquines virtuals són, a més, l'eina de treball de la resta del mòdul: et permeten equivocar-te sense risc, tornar enrere i provar sistemes sense comprar equips.

:::tip[Com treballar esta pàgina]
**Temps orientatiu:** uns 75 minuts de lectura i 45 de preparació de la presencial.

1. Llig les seccions 1 i 2 (servidor i conceptes de virtualització).
2. En les seccions 3, 4 i 5 **fixa't en la terminologia**: sobretot els modes de xarxa i la diferència entre instantània i còpia de seguretat; són tema d'examen.
3. La secció 6 tanca els criteris de recuperació del sistema (RA2.f).
4. Abans de venir, instal·la VirtualBox al teu ordinador si el tens, descarrega la ISO que s'indique en Aules i llig la secció 7.
:::

## 1. Sistemes operatius servidor

Un SO **servidor** està optimitzat per a donar servici a altres equips de manera estable i contínua (sovint 24 hores al dia, tots els dies de l'any). Prioritza la **fiabilitat**, la **seguretat** i el **rendiment en xarxa** per damunt de la comoditat d'una interfície vistosa. Pot ser Windows Server o una distribució Linux per a servidor. En este mòdul farem servir Windows Server (versions recents com la 2019 o la 2022), que s'estudia a fons en la unitat 6.

Windows Server es distribuïx en edicions (*Standard* i *Datacenter*, principalment, amb diferències de llicència i de virtualització) i el fabricant publica **versions d'avaluació** per a provar-lo temporalment.

### 1.1 Server Core o Escriptori de l'experiència

Quan s'instal·la Windows Server, l'instal·lador mostra dos opcions per a cada edició. És una decisió important, perquè **no es pot canviar després sense reinstal·lar**:

| | **Server Core** | **Escriptori de l'experiència** (*Desktop Experience*) |
|---|---|---|
| Interfície | Sense escriptori: consola, PowerShell i, en alguns casos, `sconfig` | Escriptori gràfic complet, semblant al de Windows client |
| Administració | Per ordres o **remotament** des d'un altre equip amb eines gràfiques | Local, amb Administrador del servidor i la resta d'eines |
| Recursos | Menys espai en disc i menys RAM | Més |
| Superfície d'atac | **Menor** (menys components, menys vulnerabilitats) | Major |
| Reinicis per actualitzacions | Menys | Més |
| Per a qui | Servidors de producció | Aprenentatge, proves i programari que exigix interfície gràfica |

:::note[Exemple resolt]
Una empresa vol un servidor que només faça de servidor de fitxers i `DHCP`, administrat per una persona experta des de la seua taula. **Server Core**: consumeix menys, té menys superfície d'atac i s'administra en remot. En canvi, l'aula de pràctiques on cada alumne explora per primera vegada les funcions de Windows Server usarà **Escriptori de l'experiència**.
:::

## 2. Virtualització

La **virtualització** permet executar un o diversos sistemes operatius **convidats** (*guests*) dins d'un mateix equip físic **amfitrió** (*host*), com si cada un fóra un ordinador independent amb el seu propi maquinari. El programari que ho fa possible és l'**hipervisor**, que crea i gestiona les **màquines virtuals** (VM) i les reparteix els recursos físics: CPU, RAM, disc i xarxa.

### 2.1 Tipus d'hipervisor

| Tipus | Com funciona | Exemples |
|---|---|---|
| **Tipus 1** (*bare metal*) | S'executa directament sobre el maquinari; típic de servidors | VMware ESXi, Proxmox VE (KVM), Hyper-V |
| **Tipus 2** (*hosted*) | S'executa com una aplicació dins d'un SO amfitrió | VirtualBox, VMware Workstation |

En classe usarem VirtualBox, de tipus 2. Hyper-V ve inclòs en les edicions Pro, Enterprise i Education de Windows (no en Home).

:::caution[Cal activar la virtualització al maquinari]
Els processadors tenen extensions de virtualització (**Intel VT-x** / **AMD-V**, també anomenada SVM) que han d'estar activades en la **UEFI**. Si no, VirtualBox no podrà iniciar màquines de 64 bits. A més, alguns programes de Windows (Hyper-V, WSL2) poden entrar en conflicte amb VirtualBox.
:::

### 2.2 Per què virtualitzar

- **Provar** diversos SO sense equips físics addicionals.
- **Instantànies** per a tornar enrere en segons.
- **Aïllament**: un error o infecció en la VM no afecta directament l'amfitrió.
- **Aprofitament**: diversos servidors petits en un sol equip físic.

Els inconvenients: la VM comparteix recursos amb l'amfitrió (és més lenta que un equip físic equivalent) i, si l'amfitrió falla, fallen totes.

### 2.3 Repartir els recursos

Quan crees una VM decidixes quanta CPU, RAM i disc li dones. Dos criteris pràctics:

- **No assignes mai tota la RAM ni tots els nuclis de l'amfitrió**: este necessita recursos per a si mateix. Una regla prudent és no passar de la meitat de la RAM i dels nuclis.
- La suma de les VM que corren a la vegada no hauria d'excedir els recursos físics (sobreassignació), o tot anirà lent.

## 3. Crear i gestionar una màquina virtual

Crear una VM és definir un **maquinari virtual**:

| Paràmetre | Què representa | Valors de la pràctica |
|---|---|---|
| **CPU** | Nuclis virtuals | 2 |
| **RAM** | Memòria de la VM | 4 GB |
| **Disc virtual** | Un fitxer (per exemple `.vdi`) en el disc de l'amfitrió que la VM veu com un disc complet | 25 GB |
| **Xarxa** | Tipus d'adaptador (secció 4) | NAT |
| **Firmware** | BIOS o EFI | EFI, si vols practicar UEFI/GPT |
| **Suport** | La ISO associada a la unitat òptica virtual | La ISO de Linux indicada |

El disc pot ser de **grandària fixa** (reserva tot l'espai de seguida; una mica més ràpid) o **assignat dinàmicament** (el fitxer creix a mesura que s'usa). Amb la ISO associada, la instal·lació dins de la VM és exactament igual que en un equip físic.

Les operacions habituals sobre una VM creada:

- **Iniciar**, **pausar**, **apagar** i **guardar l'estat**.
- **Instantànies** (secció 5).
- **Ajustar** RAM i CPU (amb la VM apagada).
- **Clonar**: crea una còpia d'una VM per a tindre diversos equips a partir d'una instal·lació.
- Instal·lar les **eines de l'invitat**.

### 3.1 Guest Additions

Les **Guest Additions** de VirtualBox (o **VMware Tools** en VMware) són un paquet que s'instal·la dins del SO convidat i millora el rendiment gràfic, permet redimensionar la finestra dinàmicament i habilita el **porta-retalls compartit** i les **carpetes compartides** amb l'amfitrió. Al menú de la VM: *Dispositius → Insereix la imatge de CD de les Guest Additions*. En un Ubuntu convidat pot caldre instal·lar abans eines de compilació; en Linux, a més, l'usuari ha de pertànyer al grup `vboxsf` per a accedir a la carpeta compartida:

```bash
sudo apt install build-essential dkms linux-headers-$(uname -r)
sudo adduser $USER vboxsf        # després, tanca la sessió i torna a entrar
```

Els detalls canvien entre versions de VirtualBox i d'Ubuntu: si algun pas falla, llig el missatge d'error.

## 4. La xarxa de la màquina virtual

El mode de xarxa decidix qui pot parlar amb la VM. VirtualBox oferix, entre altres, estos:

| Mode | Idea |
|---|---|
| **NAT** | La VM ix a Internet a través de l'amfitrió, però **no és visible** des de fora. És el mode per defecte. |
| **Adaptador pont** (*bridge*) | La VM es comporta com un equip més de la xarxa física, amb **la seua pròpia IP**. |
| **Xarxa interna** | La VM només es comunica amb **altres VM de la mateixa xarxa interna**, aïllada de tota la resta. |
| **Només amfitrió** (*host-only*) | La VM i l'amfitrió es veuen entre si, però no hi ha eixida a Internet. |

Qui pot comunicar-se amb qui (en condicions normals, sense reglamentar tallafocs ni redirecció de ports):

| Des de... fins a... | NAT | Pont | Interna | Només amfitrió |
|---|---|---|---|---|
| La VM → Internet | Sí | Sí | No | No |
| La VM → l'amfitrió | Sí (per la porta d'enllaç) | Sí | No | Sí |
| L'amfitrió → la VM | No | Sí | No | Sí |
| VM ↔ una altra VM | No (cada una té el seu NAT) | Sí | Sí (mateixa xarxa interna) | Sí (mateixa xarxa) |
| Un altre PC de l'aula → la VM | No | Sí | No | No |

:::tip[Com triar]
Per a **navegar i actualitzar**: NAT. Perquè la VM actue com **un servidor visible en l'aula** (la unitat 6): pont. Per a un **laboratori aïllat** de diverses VM: interna. Per a administrar una VM des de l'amfitrió sense eixir a Internet: només amfitrió.
:::

## 5. Instantànies (*snapshots*)

Una **instantània** guarda l'estat complet d'una VM en un moment concret (el disc i, si estava en marxa, també la memòria). Pots seguir treballant, i si alguna cosa ix malament, **restaurar** la instantània i tornar al moment guardat. Es pot crear una cadena d'instantànies i bifurcar-la.

```bash
VBoxManage list vms                          # llista les VM registrades
VBoxManage snapshot "ubuntu" take "inicial"  # crea la instantània «inicial»
VBoxManage snapshot "ubuntu" restore "inicial"  # restaura (amb la VM apagada)
```

:::caution[Una instantània no és una còpia de seguretat]
Viu **en el mateix disc** que la VM: si l'amfitrió es trenca o el disc falla, perds la VM i les seues instantànies. Serveix per a «desfer» un canvi, no per a protegir-se d'una avaria. Tampoc convé acumular-ne moltes, perquè ocupen espai i alenteixen la VM.
:::

## 6. Recuperació del sistema

El criteri RA2.f demana aplicar tècniques de **recuperació** (a més de les d'actualització de la pàgina 3). Segons el que ha passat, serveix una eina o una altra:

| Problema | Mecanisme | Com funciona |
|---|---|---|
| Un canvi o controlador ha trencat Windows però arranca | **Punt de restauració** (*Restauració del sistema*) | Torna fitxers del sistema i registre a un moment anterior; no toca els documents. Ha d'estar activada. |
| Windows no arranca | **Entorn de recuperació de Windows (WinRE)** | S'inicia des del disc o l'USB d'instal·lació; ofereix reparar l'inici, desinstal·lar actualitzacions, consola, restaurar una imatge o **Restableix este PC**. |
| L'equip va molt malament | **Restableix este PC** | Reinstal·la Windows, conservant o no els fitxers personals. |
| Linux no arranca amb el nucli nou | **Menú de GRUB → Opcions avançades** | Permet arrancar amb un nucli anterior o amb el **mode de recuperació** (consola amb permisos de root). |
| GRUB o l'arrancada s'han espatllat | **USB *live*** | Arranques des d'un Linux *live* i repares el gestor d'arrancada, o revises el sistema d'arxius amb `fsck`. |
| Es vol tornar a un estat exacte de tot el disc | **Imatge o clon** | Una còpia completa de particions (amb eines com Clonezilla): restaurar deixa el disc tal com estava en fer-la. |
| Un error en una VM | **Instantània** | Secció 5. |
| Fitxers esborrats | **Còpia de seguretat de dades** | L'única que protegix de l'esborrat o de l'avaria del disc. |

La regla d'or: **cap mecanisme de recuperació substituïx una còpia de seguretat de les dades en un altre lloc**. Una imatge conserva el sistema; els punts de restauració i les instantànies, només ajuden a desfer un canvi.

## 7. Què faràs en la sessió presencial

El 3 de novembre treballaràs de manera **individual** al centre, amb el teu equip. El guió és este:

1. **Crear una VM** nova en VirtualBox: 2 CPU, 4 GB de RAM i un disc virtual de 25 GB.
2. **Instal·lar el Linux indicat** (la ISO estarà en Aules), seguint el procés de la pàgina 3.
3. **Instal·lar les Guest Additions** i comprovar que funciona una **carpeta compartida** amb l'amfitrió.
4. **Instantània**: crear-ne una de la VM acabada d'instal·lar, fer un canvi de prova (per exemple, esborrar un fitxer), restaurar-la i comprovar que el canvi ha desaparegut.
5. **Windows Server**: arrancar l'instal·lador fins a la pantalla en què s'elegix entre *Server Core* i *Escriptori de l'experiència*, identificant les diferències, sense completar la instal·lació.

Al final lliuraràs la **memòria de la pràctica** (activitat 6) abans d'acabar la classe. Faràs captures de pantalla durant el procés: **no esperes al final per a fer-les**.

## Comprova el que has après

1. Quina diferència hi ha entre un hipervisor de tipus 1 i un de tipus 2?

   <details>
   <summary>Resposta</summary>

   El de tipus 1 s'executa directament sobre el maquinari (ESXi, Proxmox, Hyper-V); el de tipus 2 s'executa com una aplicació dins d'un SO amfitrió (VirtualBox, VMware Workstation).

   </details>

2. Una VM ha de ser visible des d'altres PC de l'aula, amb la seua pròpia IP. Quin mode de xarxa uses?

   <details>
   <summary>Resposta</summary>

   **Adaptador pont** (*bridge*): la VM es connecta a la xarxa física com un equip més.

   </details>

3. Per què una instantània no substituïx una còpia de seguretat?

   <details>
   <summary>Resposta</summary>

   Perquè està en el mateix disc que la VM: si el disc o l'amfitrió falla, es perden totes dues. Només serveix per a desfer canvis.

   </details>

4. Quan triaries Server Core en lloc de l'Escriptori de l'experiència?

   <details>
   <summary>Resposta</summary>

   En un servidor de producció administrat per ordres o en remot: consumix menys recursos, necessita menys reinicis i té menys superfície d'atac. L'Escriptori és millor per a aprendre o per a programari que necessita interfície gràfica.

   </details>

5. Windows no arranca després d'una actualització de controladors. Quins dos mecanismes provaries primer?

   <details>
   <summary>Resposta</summary>

   Des de l'entorn de recuperació (WinRE): **desinstal·lar l'última actualització** o **restaurar el sistema** amb un punt de restauració anterior. Si no hi ha, restaurar una imatge o, en últim lloc, restablir el PC.

   </details>

## Glossari

| Valencià | Castellano |
|---|---|
| SO servidor | SO servidor |
| Server Core | Server Core |
| Escriptori de l'experiència | Experiencia de escritorio |
| virtualització | virtualización |
| hipervisor | hipervisor |
| amfitrió (*host*) | anfitrión (*host*) |
| convidat (*guest*) | invitado (*guest*) |
| màquina virtual (VM) | máquina virtual (VM) |
| disc virtual | disco virtual |
| instantània (*snapshot*) | instantánea (*snapshot*) |
| adaptador pont | adaptador puente |
| xarxa interna | red interna |
| punt de restauració | punto de restauración |
| entorn de recuperació | entorno de recuperación |
