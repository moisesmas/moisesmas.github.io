---
title: "4. Software licences"
description: "Free software and proprietary software, the main types of licence, what each one allows and how to find and respect the licence of a program."
---

Every time you click "I accept" during an installation, you agree to a contract. A technician must know what these contracts allow, because installing software without the right licence can cost a company a lot of money and can put you in trouble. In this page you will learn the main types of software licence and how to choose and respect them.

:::tip[How to use this page]
1. Read sections 1 to 5 (about 35 minutes).
2. Practise with the tab **Licence detective** of the [Computer System Explorer](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/#licences) lab.
3. Answer the questions at the end and do [Activity 7](/docencia/smr/som/ud01-introduccion/actividades/).
:::

## 1. Copyright and licences

Software is a creative work and it is protected by **copyright**, like a book or a song. In Spain and in the European Union, the author owns the exclusive rights to copy, distribute and modify the program by default. Nobody else may do these things without permission.

A **software licence** is the contract where the owner gives you permission to use the program, under certain conditions. The licence can say:

- who can use the program (a person, a company, only for non-commercial use);
- on how many devices or for how many users;
- for how long (forever, a subscription, a trial);
- whether you can see the source code, modify it, copy it or sell it.

To use a program legally you must accept and follow its licence. The text of the licence is the only reliable source: names such as "free" or "open" can mean different things.

:::caution[Piracy has real costs]
Using a copy of a paid program without a licence is **copyright infringement** (piracy). It can lead to fines and claims for companies and, in serious cases, to criminal penalties. In addition, cracked programs are a common way to spread malware, and they do not receive official updates. As a future technician you will be responsible for the licences of the computers that you manage.
:::

## 2. Free software and open source

The idea of **free software** was defined by the Free Software Foundation (FSF). A program is free software if its users have four basic freedoms:

| Freedom | Meaning |
|---|---|
| **Freedom 0** | Run the program for any purpose. |
| **Freedom 1** | Study how the program works and change it. This needs access to the **source code**. |
| **Freedom 2** | Redistribute copies, to help other people. |
| **Freedom 3** | Distribute copies of your modified versions to others. |

*Free* means *freedom*, not *price*. Free software can be sold, and a program that costs nothing is not necessarily free software.

The **Open Source Initiative** (OSI) publishes the Open Source Definition. It has similar goals but another point of view: it stresses the practical benefits of an open development model (quality, security, collaboration). In practice most licences are accepted by both movements, so people often write **FOSS** (*free and open-source software*).

## 3. Types of licence

### 3.1 Proprietary software

The owner keeps the rights. You buy or receive the **right to use** the program under an **EULA** (*End-User Licence Agreement*). You cannot see the source code, modify it or redistribute it. Examples: Windows, Microsoft Office, Adobe Photoshop.

Proprietary licences come in several models:

| Model | How it works |
|---|---|
| **OEM** | Comes pre-installed with a new computer and is tied to that computer. |
| **Retail** (boxed or download) | Bought separately; usually it can be moved to another computer, but it is used on one device at a time. |
| **Volume** | For companies and schools: one agreement for many installations. |
| **Subscription** | You pay every month or year to keep using it (Microsoft 365, Adobe Creative Cloud). |

The exact rules depend on the product and on the contract. Always read the EULA.

### 3.2 Freeware, shareware and freemium

- **Freeware:** free of charge, but the source code is closed and you may not change or sell it. The author may add conditions, for example "personal, non-commercial use only". Examples: Adobe Acrobat Reader, IrfanView (free for non-commercial use).
- **Shareware / trial:** you may test it for a limited time or with limited features and then you must pay. Example: WinRAR, which asks for a licence after the trial period.
- **Freemium:** a free basic version and paid advanced features. Many mobile apps work like this.

None of these is free software in the FSF sense, because you have no access to the source code.

### 3.3 Open-source licences: copyleft and permissive

They give you the freedoms of free software. They differ in what happens with your changes:

| | **Copyleft** | **Permissive** |
|---|---|---|
| Idea | Freedom must be preserved. If you distribute a modified or derived program, you must do it under the **same licence** and give the source code. | You can do almost anything, even include the code in a closed-source product. |
| Main condition | Same licence, source code available | Keep the copyright notice and the licence text |
| Typical licences | GNU **GPL** | **MIT**, **BSD**, **Apache 2.0** |
| Examples | Linux kernel (GPL v2), GIMP, WordPress, Blender | FreeBSD, Apache HTTP Server, Node.js |

Other licences sit in the middle. For example, Mozilla Firefox and LibreOffice use the MPL, which asks you to share changes made to the licensed files but allows mixing them with other code.

:::note[Creative Commons are for content, not for software]
**Creative Commons** licences are used for texts, images, music and videos. They combine four conditions: **BY** (attribution: name the author), **NC** (non-commercial use only), **SA** (share-alike: your derived works use the same licence) and **ND** (no derivatives). For example, the course notes that this unit is based on use **CC BY-NC-SA 4.0**. For software it is better to use a licence designed for code, such as the GPL or the MIT.
:::

## 4. What can I do with each licence?

| Licence type | Use it | Read the source code | Modify it | Share copies | Sell it | Must you share your changes? |
|---|---|---|---|---|---|---|
| **Proprietary (EULA)** | Yes, under the EULA | No | No | No | No | Not applicable |
| **Freeware** | Yes, free of charge | No | No | Only if the author allows it | No | Not applicable |
| **Shareware / trial** | Yes, for a limited time or with limited features | No | No | Often yes, unchanged | No | Not applicable |
| **Copyleft open source (GPL)** | Yes | Yes | Yes | Yes | Yes | **Yes**, under the same licence |
| **Permissive open source (MIT, BSD, Apache)** | Yes | Yes | Yes | Yes | Yes | **No**, but keep the notice |

Three common mistakes:

1. **"Free of charge" is not "free software".** Freeware costs nothing but gives you none of the four freedoms.
2. **"Open source" is not "not commercial".** Companies sell support, hosting and certified versions of open-source software, and some use it in paid products.
3. **"I downloaded it, so I may use it".** Check the conditions of use: some free programs are free only for students or for non-commercial use.

## 5. How to find out and respect a licence

Ask these questions before you install a program for a client or a school:

1. **Who is the author or owner?** Download from the official website or the official repository.
2. **Where is the licence text?** Look in the installer, in the *About* or *Help* menu, in a file named `LICENSE` or `COPYING` in the program folder or in its repository. On Debian and Ubuntu, the file `/usr/share/doc/<package>/copyright` lists the licences of each installed package.
3. **What does it allow?** Check the kind of use (personal, commercial, education), the number of devices and users, and the duration.
4. **Do I need to keep a record?** In a company, keep an **inventory of licences**: which program is installed on which computer, with which licence and until when. Audits are common.
5. **Is there a free alternative?** For many tasks there is a good open-source option: LibreOffice instead of an office suite, GIMP instead of a photo editor, Linux instead of a paid OS. Compare not only price, but also compatibility, support and training.

## Check what you have learned

1. What are the four freedoms of free software?

   <details>
   <summary>Answer</summary>

   Freedom 0: run the program for any purpose. Freedom 1: study how it works and change it. Freedom 2: redistribute copies. Freedom 3: distribute your modified versions.

   </details>

2. Is a program that is free of charge always free software? Give an example.

   <details>
   <summary>Answer</summary>

   No. Freeware such as Adobe Acrobat Reader costs nothing, but its source code is closed and you cannot modify or redistribute it, so it is not free software.

   </details>

3. A developer wants to include an MIT-licensed library in a closed-source commercial product. Is it allowed? What if the library used the GPL?

   <details>
   <summary>Answer</summary>

   With the MIT licence it is allowed, as long as the developer keeps the copyright notice and the licence text. With the GPL (copyleft), if the developer distributes the product, the whole derived work would have to be distributed under the GPL with its source code, so it is not compatible with a closed-source product.

   </details>

4. What does the **SA** in CC BY-NC-SA mean?

   <details>
   <summary>Answer</summary>

   Share-alike: if you adapt the work, you must share your version under the same licence.

   </details>

5. A school wants to put the same paid design program on 30 computers. It has bought one retail licence. What should the technician do?

   <details>
   <summary>Answer</summary>

   Not install it on all of them: a retail licence usually allows one device. The school needs 30 licences or a volume or education licence, or it can choose an alternative with a suitable free licence. The technician should read the EULA and record the licences in an inventory.

   </details>

## Glossary

| English | Castellano |
|---|---|
| copyright | derechos de autor (propiedad intelectual) |
| licence | licencia |
| EULA (End-User Licence Agreement) | contrato de licencia de usuario final |
| proprietary software | software propietario |
| free software | software libre |
| open source | código abierto |
| source code | código fuente |
| freeware | software gratuito (freeware) |
| shareware / trial | software de prueba (shareware) |
| copyleft | copyleft |
| permissive licence | licencia permisiva |
| subscription | suscripción |
| piracy | piratería |
| attribution | atribución, reconocimiento |
| licence inventory | inventario de licencias |
