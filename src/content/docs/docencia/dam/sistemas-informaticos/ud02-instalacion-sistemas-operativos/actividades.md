---
title: "Activitats"
description: "Sis activitats de la unitat 2: cinc d'estudi autònom (sistemes d'arxius, SO i llicències, disseny de particions, instal·lació documentada en una VM, diagnòstic i recuperació) i la memòria de la sessió presencial."
---

Estes són les activitats de la unitat. Les cinc primeres les fas pel teu compte, a mesura que avances amb els apunts, i es recolzen en el [laboratori «Particions i arrancada»](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/). La sisena és la memòria que lliures durant la sessió presencial. Pots veure quan fer cada una en la [planificació](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/planificacion/).

Totes es **lliuren en Aules**, en la tasca corresponent, en un document (PDF, ODT o DOCX) amb el teu nom. No cal copiar els enunciats: numera les respostes.

## Activitat 1 · Triar el sistema d'arxius

**Objectiu:** decidir amb criteri quin sistema d'arxius cal en cada situació i justificar què descarta cada límit.

**Què has de fer:**

1. Repassa la [pàgina 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/) i practica amb la pestanya «Quin sistema d'arxius?» del laboratori, marcant els requisits de cada cas.
2. Per a cada cas, tria un sistema d'arxius (FAT32, exFAT, NTFS o ext4) i justifica'l en una o dues línies. Si cap complix tots els requisits, explica quin renuncies a complir:
   - **a)** Un pendrive de 128 GB per a portar vídeos de 8 GB entre un Windows, un macOS i un Linux.
   - **b)** La partició arrel d'un servidor Linux que guarda arxius de diversos usuaris.
   - **c)** El volum on s'instal·la Windows 11.
   - **d)** Una targeta SD d'una càmera antiga que només reconeix FAT32; vols gravar-hi vídeo en seqüències llargues. Què passa amb l'arxiu quan arriba al límit i com ho evitaries?
   - **e)** Un disc extern de 2 TB per a còpies de seguretat d'un Windows i d'un Linux, en el qual voldries conservar els permisos dels arxius.
   - **f)** La partició EFI d'un equip UEFI.
3. Un company diu: «FAT32 admet particions de fins a 8 TB». Explica per què esta xifra és incompleta (grandària de clúster, eines de formatat).

**Què entregues:** un document amb les respostes **a** a **f** (cas, sistema triat, justificació) i la resposta a la pregunta 3, en la tasca «Activitat 1» d'Aules.


**Dificultat:** ★☆☆ · **Temps estimat:** 40 minuts

## Activitat 2 · Triar un sistema operatiu i una llicència

**Objectiu:** comparar sistemes operatius per requisits, camp d'aplicació i llicència, i classificar-los segons els seus usuaris.

**Què has de fer:**

1. Llig la secció 3 de la [pàgina 1](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/01-tipus-de-so-i-sistemes-de-fitxers/). Este és el cas: una associació de formació d'adults té **12 ordinadors de fa uns 8 anys** (4 GB de RAM, disc dur mecànic, firmware UEFI sense TPM 2.0) i **un equip més nou** que farà de servidor de fitxers per a tots. No té pressupost per a llicències. Necessiten ofimàtica, navegador i còpia de seguretat de documents.
2. Fes una **taula comparativa** de tres opcions que puguen usar (per exemple, Windows 11, Windows 10 o una distribució Linux d'escriptori), amb: llicència i cost, requisits mínims, camp d'aplicació, compatibilitat amb este maquinari i suport/seguretat. Consulta les pàgines oficials per als requisits i cita la font.
3. Recomana un SO per als 12 equips i un per al servidor, i justifica-ho en 6-8 línies.
4. Classifica cada SO triat com a monousuari, multiusuari i/o de xarxa, i explica el criteri que uses.
5. Indica dues precaucions de llicència que haurien de tindre en compte (quantitat d'equips, ús previst, versions de prova).

**Què entregues:** la taula i les respostes 3 a 5, en la tasca «Activitat 2» d'Aules.


**Dificultat:** ★★☆ · **Temps estimat:** 45 minuts

## Activitat 3 · Dissenyar el particionat d'un equip amb dual boot

**Objectiu:** dissenyar i justificar la taula de particions d'un equip, escollir esquema, ordre d'instal·lació i noms de dispositius.

**Què has de fer:**

1. Obri les pestanyes 2 a 6 del [laboratori](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/laboratorios/particions-i-arrencada/) i repassa la secció 3 a 7 de la [pàgina 2](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/02-instal-lacio-i-particionat/).
2. **Cas A.** Portàtil amb **UEFI** i un SSD NVMe de **512 GB**, 16 GB de RAM, sense disc de dades. Vol **Windows 11** (reserva almenys 150 GB per a Windows) i **Ubuntu** amb `/home` separat i sense hibernació.
   - **a)** Tria MBR o GPT i justifica-ho.
   - **b)** Fes una taula amb les particions que cal que hi haja (nom o ús, sistema d'arxius, grandària, punt de muntatge o lletra, **nom del dispositiu en Linux**). Ha de sumar el disc.
   - **c)** Digues en quin ordre instal·laràs els dos sistemes i quins passos farà falta fer en Windows abans d'instal·lar Linux.
   - **d)** Què passaria si hagueres instal·lat primer Ubuntu i després Windows? Com ho resoldries?
3. **Cas B.** Un ordinador antic amb **BIOS clàssica** i un disc de **2 TB**. Necessita **6 particions** (sistema, dades, tres per a proves i una d'intercanvi). Dissenya la taula amb MBR: quines són primàries, quina és estesa i quines són lògiques, i com es diuen en Linux (`/dev/sda...`). Raona si GPT hi seria una opció millor.
4. Comprova el teu disseny reproduint-lo en el constructor del laboratori (pestanya 2) i anota si hi ha alguna restricció que no havies previst.

**Què entregues:** els apartats 2, 3 i 4, amb les taules, en la tasca «Activitat 3» d'Aules.


**Dificultat:** ★★★ · **Temps estimat:** 60 minuts

## Activitat 4 · Instal·lació documentada d'un Linux en una màquina virtual

**Objectiu:** instal·lar i configurar un SO client en una VM i documentar el procés.

**Què has de fer:**

1. Llig les pàgines [2](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/02-instal-lacio-i-particionat/) i [3](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/03-so-client-actualitzacions-i-controladors/). Instal·la VirtualBox (o l'hipervisor que uses) i descarrega la ISO d'Ubuntu Desktop; comprova-ne el hash SHA-256 amb l'ordre `sha256sum` o `Get-FileHash`.
2. Crea una VM amb 2 CPU, 4 GB de RAM i 25 GB de disc (firmware EFI, si l'hipervisor ho permet).
3. Instal·la Ubuntu amb **particionat manual**: EFI, `/`, `/home` i swap (o fitxer de swap si l'instal·lador ho proposa). Abans, escriu el teu pla (grandàries i per què).
4. En acabar: posa un **nom d'equip** propi, **actualitza** el sistema (`apt update` i `apt upgrade`), **instal·la i desinstal·la** un programa amb `apt` (per exemple, `tree` o `htop`) i comprova els **controladors** amb `lspci -k`.
5. Executa `lsblk -f` i comprova que les particions coincidixen amb el teu pla.
6. Crea una **instantània** de la VM acabada.

**Què entregues:** un document amb: el pla de particionat, **captures** de la configuració de la VM, del particionat i de les ordres del pas 4 i 5 (amb el seu resultat), i un paràgraf final sobre les decisions que has pres i els problemes que t'han eixit. En la tasca «Activitat 4» d'Aules. Conserva la VM: la faràs servir en la presencial.


**Dificultat:** ★★★ · **Temps estimat:** 2 hores

## Activitat 5 · Diagnosticar controladors i triar un mecanisme de recuperació

**Objectiu:** diagnosticar problemes de controladors i triar l'eina de recuperació adequada per a cada situació.

**Què has de fer:** per a cada cas, explica què passa, quin és el pas següent de diagnòstic o reparació i **quin mecanisme de recuperació** usaries si fora necessari (punt de restauració, WinRE, GRUB amb nucli anterior, USB *live*, instantània, imatge o clon, còpia de seguretat de dades). Justifica la tria.

1. **Cas A.** Un portàtil amb Windows recent instal·lat no té Wi-Fi ni Ethernet. En l'Administrador de dispositius apareix, dins «Altres dispositius», un «Controlador Ethernet» amb un triangle groc, i les propietats diuen «Els controladors d'este dispositiu no estan instal·lats (Codi 28)». Com el repararies si eixe equip no té Internet?
2. **Cas B.** En un Ubuntu, l'ordre `lspci -k` dona una eixida com esta (els noms entre `<>` són marcadors):

   ```text
   00:02.0 VGA compatible controller: <fabricant> <model gràfica>
           Kernel driver in use: <controlador gràfica>
   03:00.0 Network controller: <fabricant> <model Wi-Fi>
           Subsystem: <identificador>
   ```

   Què indica la falta de `Kernel driver in use` en el segon dispositiu? Quines ordres provaries? Quin seria el pas següent?
3. **Cas C.** Després d'instal·lar un controlador gràfic nou, Windows arranca amb la pantalla negra o amb artefactes. Quins passos faries per a arrancar i deixar l'equip com abans?
4. **Cas D.** Després d'un `sudo apt upgrade` que ha instal·lat un nucli nou, un Ubuntu ja no arranca. Com arranques i què fas després?
5. **Cas E.** Un usuari ha esborrat per error una carpeta de documents de l'equip i vol recuperar-la. Un company li proposa «tornar a un punt de restauració». Té sentit?

**Què entregues:** les respostes als cinc casos, en la tasca «Activitat 5» d'Aules.


**Dificultat:** ★★☆ · **Temps estimat:** 45 minuts

## Activitat 6 · Memòria de la pràctica d'instal·lació i virtualització (presencial)

**Objectiu:** documentar el procés de creació d'una VM, instal·lació d'un SO, ús de Guest Additions i instantànies, i comparar les modalitats d'instal·lació de Windows Server.

**Què has de fer** (durant la sessió presencial, de manera individual, seguint el guió de la [pàgina 4](/docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos/04-so-servidor-i-maquines-virtuals/)):

1. Crea una **VM** amb 2 CPU, 4 GB de RAM i un disc virtual de 25 GB.
2. **Instal·la el Linux** que indique el professor (ISO en Aules).
3. Instal·la les **Guest Additions** i comprova que funciona una **carpeta compartida** amb l'amfitrió.
4. Crea una **instantània** de la VM acabada d'instal·lar, fes un canvi de prova (per exemple, esborrar un fitxer) i **restaura** la instantània.
5. Arranca l'**instal·lador de Windows Server** fins a la pantalla d'elecció entre *Server Core* i *Escriptori de l'experiència*, sense completar la instal·lació.
6. Redacta la memòria amb cinc apartats:
   - **Apartat 1:** captura de la configuració de la VM (RAM, CPU, disc).
   - **Apartat 2:** captura de l'escriptori del Linux instal·lat i funcionant dins de la VM.
   - **Apartat 3:** captura que demostre que la carpeta compartida funciona.
   - **Apartat 4:** 2-3 línies sobre què ha passat en restaurar la instantània i per a quines situacions reals l'usaries.
   - **Apartat 5:** 4-5 línies amb les teues paraules sobre la diferència entre *Server Core* i *Escriptori de l'experiència* i en quina situació usaries cada una.

**Què entregues:** la memòria completa, en la tasca d'Aules **abans d'acabar la classe**.


**Dificultat:** ★★☆ · **Temps estimat:** durant la sessió presencial

:::aules
Les entregues d'estes activitats es fan en Aules, en la tasca de cada una. Allí també trobaràs la rúbrica, les qualificacions i les solucions comentades.
:::
