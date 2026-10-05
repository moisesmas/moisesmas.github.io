---
title: "5. Input/output and security"
description: "How the operating system talks to devices (drivers, polling, interrupts, DMA, cache, buffer and spooling) and how it protects resources: attributes, Linux and NTFS permissions, and shared resources."
---

Two last functions complete the picture. The first is **input/output management**: how a program can use a printer, a disk or a keyboard without knowing how each one works. The second is **security**: who can open, change or run each file and each shared resource. Both are everywhere in your daily work with a computer.

:::tip[How to use this page]
1. Read sections 1 to 3 (about 35 minutes) and try the tab **I/O manager** of the [Process & CPU Scheduler Lab](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/#io).
2. Read sections 4 to 7 (about 50 minutes) and have a Linux terminal and a Windows machine (or virtual machines) ready.
3. Do [Activity 7](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/).
:::

## 1. How an application uses a device

Devices are very different: a keyboard sends a few bytes per second, an SSD moves gigabytes per second, a printer can run out of paper. The OS hides these differences with layers:

1. The **application** asks the OS to do an operation ("print this", "read this file").
2. The **I/O manager** of the kernel checks the request, finds the right device and queues the request if the device is busy.
3. The **driver** is a program that knows one family of devices. It translates the general request into the commands of that device. Each device needs its own driver, which is why a new device sometimes needs a driver installation.
4. The **controller** is the electronics of the device. It receives the data and the commands in its registers and runs the mechanics (move the head, heat the paper...).
5. The **device** does the work, and the answer goes back along the same path. The controller writes the result in a *status register* that the driver reads.

Linux shows many devices as files in `/dev`. Disks are **block devices** (they work with blocks of data, `/dev/sda`). Keyboards and serial ports are **character devices** (they work with a stream of bytes). Windows names its devices in the Device Manager (`devmgmt.msc`).

## 2. How the CPU knows that a device has finished

The CPU is much faster than any device. There are three ways to deal with the difference.

**Polling (programmed I/O).** The CPU asks the device again and again "are you ready?". It is simple, but the CPU is *busy waiting*: it is working only to wait.

**Interrupts.** The CPU starts the operation and goes on with other work. When the device is ready, it sends an **interrupt request (IRQ)**, an electrical signal. The CPU stops what it is doing, saves its state, runs a small **interrupt handler** (also called *interrupt service routine*) from the driver and then returns to the previous work. Keyboard and mouse use interrupts for every key and movement. A process that asked for the operation waits in the **Waiting** state, and the interrupt is what moves it back to **Ready** (see the state diagram in [page 1](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/)).

**DMA (Direct Memory Access).** With interrupts the CPU still copies each piece of data. For large transfers this is too much. With DMA, a special controller moves the whole block between the device and RAM **by itself**. The CPU only prepares the transfer (it gives the controller the address and the size) and receives **one single interrupt** at the end. Disks, network cards and graphic cards use DMA.

| | Polling | Interrupts | DMA |
|---|---|---|---|
| Who copies the data | CPU | CPU | DMA controller |
| CPU while the device works | Waits (busy) | Free for other processes | Free for other processes |
| Interruptions | None | One per piece of data | One per transfer |
| Good for | Very fast devices, simple systems | Keyboards, mice, small transfers | Disks, network, large transfers |

**Example (simplified).** We transfer 4 words from a device that needs 5 time units to prepare each word. Copying a word or running a handler costs 1 unit.

- Polling: 4 × (5 + 1) = 24 units, and the CPU is busy for all of them. **0 units free.**
- Interrupts: 24 units in total, but the CPU only works 4 units (4 handlers). **20 units free** (83 %).
- DMA: 1 unit to start, 20 units of transfer, 1 unit to finish: 22 units. The CPU works 2 units. **20 units free** (91 %).

The tab **I/O manager** of the lab lets you change the numbers.

## 3. Cache, buffer and spooling

The OS also uses memory to make I/O faster. The three techniques are different:

| Technique | What it is | Example |
|---|---|---|
| **Cache** | A fast copy of data that you use often | The file you read twice comes the second time from RAM, not from the disk |
| **Buffer** | A temporary area that connects two devices or processes of different speed | A video player loads a few seconds in advance so that it does not stop |
| **Spooling** | A **queue of complete jobs** for a device that cannot be shared | The print queue |

**Cache.** If a read finds the data in the cache, it is a **hit**; if not, it is a **miss** and the OS reads the slow device and copies the data to the cache. Imagine that a hit costs 1 unit and a miss 10 units. With 80 % hits, the average cost is 0.8 × 1 + 0.2 × 10 = **2.8** units, nearly four times faster than always reading the device.

**Buffer.** While the slow device fills or empties the buffer, the CPU can continue. When you copy a big file to a USB drive, the data first goes to a buffer in RAM, and this is the reason why you must *safely remove* the drive: the buffer may not be empty yet.

**Spooling** (*Simultaneous Peripheral Operations On-Line*). A printer can print only one document at a time, but several programs and users want to print. The jobs are saved in a **spool** (a folder on the disk) and a service sends them to the printer one by one. The programs are free immediately, and you can see, pause or cancel jobs. In Linux, `lpstat -o` lists the jobs; in Windows you open the printer queue.

## 4. Security

The OS must protect the system against **errors** (a program that writes in memory that is not its own), **misuse** by a user, **unauthorised access** (physical, through the network or by malware such as viruses, worms or trojans) and **faults**. No system is completely secure, but good habits reduce the risk. The aims of security are:

- **Confidentiality**: only authorised people can read the data.
- **Integrity**: only authorised people can change it, and changes are not accidental.
- **Availability**: the data and services work when you need them.

| Logical (software) measures | Physical measures |
|---|---|
| Accounts with **strong passwords** | Locked room or locked case |
| **Permissions** on files and folders | Access control with cards or fingerprints |
| Updates and antivirus | UPS (uninterruptible power supply) |
| Firewall | Cable locks, security cameras |
| Encryption of disks and files | Backups kept in another place |

Three ideas are behind every access decision:

1. **Authentication**: proving who you are (password, fingerprint...).
2. **Authorisation**: deciding what you may do (permissions).
3. **Accounting**: keeping a record of what happened (logs).

**Least privilege**: give each user and each program only the rights they need. For this reason you work with a **standard account** and use administrator rights only when needed (`sudo` in Linux, the shield icon and the UAC window in Windows). A process that runs with your account can do only what you can do: a program that you open by mistake cannot change system files.

## 5. Attributes and permissions

Every file and directory has **metadata**. Besides name, size and dates, it has **attributes** and **permissions**.

### Attributes

| System | Attributes | How to see or change them |
|---|---|---|
| Windows | *Read-only*, *Hidden*, *System*, *Archive* | Properties → General, or `attrib +h file.txt` |
| Linux | A name that begins with a dot is hidden. In ext4, extra flags such as *immutable* (nobody can modify or delete) | `ls -a`, `lsattr`, `sudo chattr +i file` |

### Permissions in Linux

Linux gives each file an **owner**, a **group** and three sets of permissions, for the **owner (u)**, the **group (g)** and **others (o)**. Each set has three permissions: **r** (read), **w** (write) and **x** (execute). Read the output of `ls -l`:

```text
-rwxr-x---  1 student teachers  4096 Oct  5 10:00 backup.sh
│└┬┘└┬┘└┬┘    │        │
│ │  │  │     │        └── group
│ │  │  │     └── owner
│ │  │  └── others: --- (nothing)
│ │  └── group: r-x (read and execute)
│ └── owner: rwx (read, write, execute)
└── type: - file, d directory, l link
```

Each permission has a number: **r = 4, w = 2, x = 1**. Add them for each set and you get the **octal** notation: `rwx` = 7, `r-x` = 5, `---` = 0, so this file is `750`.

| Octal | Permissions | Typical use |
|---|---|---|
| `644` | `rw-r--r--` | A normal file: you edit it, all can read it |
| `600` | `rw-------` | A private file (for example an SSH key) |
| `755` | `rwxr-xr-x` | A program or a public folder |
| `750` | `rwxr-x---` | A script for a group only |
| `700` | `rwx------` | A private folder |

```bash
chmod 640 notes.txt        # rw-r----- (octal)
chmod u+x backup.sh        # add execute for the owner
chmod g-w,o-rwx report.txt # remove write from the group, all from others
sudo chown student:teachers report.txt   # change the owner and the group
```

The permissions mean something different for a **directory**:

| | On a file | On a directory |
|---|---|---|
| `r` | Read the content | List the names inside |
| `w` | Change the content | Create, delete and rename files inside |
| `x` | Run it as a program | Enter it (`cd`) and reach what is inside |

New files are created with permissions that depend on the `umask` (a typical value, `022`, gives `644` to files and `755` to directories).

### Permissions in Windows (NTFS)

On an NTFS disk, right click → **Properties → Security** shows a list of users and groups with their permissions. The basic ones are:

| Permission | What it allows |
|---|---|
| **Read** | See the content and the attributes |
| **Write** | Create files and change the content |
| **Read & execute** | Read and run programs (on folders: also *List folder contents*) |
| **Modify** | Read, write, execute and delete |
| **Full control** | Everything, including changing permissions and taking ownership |

Rules to remember:

- Permissions are **inherited** from the parent folder, unless you disable inheritance.
- A user receives the **sum** of the permissions of their own entry and of all their groups.
- A **Deny** entry is stronger than an **Allow** one.
- `icacls file` shows and changes them from the command line.

| Linux | NTFS (approximately) |
|---|---|
| `r--` | Read |
| `r-x` | Read & execute |
| `rw-` | Modify (without execute) |
| `rwx` | Full control (roughly) |
| Owner / group / others | Any number of users and groups |

NTFS is more flexible because it can give different permissions to many users in the same file. In Linux, **ACLs** (`setfacl`) give the same flexibility when you need it.

## 6. Shared resources

A **shared resource** is a folder, a printer or a disk that other computers on the network can use. Sharing is useful, but it opens a door, so you must configure it carefully.

### Windows

1. Right click the folder → **Properties → Sharing → Advanced Sharing**.
2. Tick **Share this folder**, give it a name and press **Permissions** to choose who can use it and with which level (*Read*, *Change* or *Full control*).
3. In the **Security** tab, check the NTFS permissions.

When a folder is accessed through the network, Windows applies **both** the share permissions and the NTFS permissions, and the **most restrictive** one wins. Other computers open it with `\\COMPUTERNAME\sharename`. Useful commands: `net share` (list what you share) and `net use Z: \\PC\share` (connect a network drive).

### Linux

The usual tool for sharing with Windows computers is **Samba**, which implements the SMB protocol. In its configuration file you define the share:

```ini
[documents]
   path = /srv/documents
   read only = no
   valid users = @teachers
```

After a change the service is restarted. Clients connect with `smb://server/documents` from a file manager. You will configure network services in other modules.

### Good practices

- Share **only what is needed**, and not the entire disk.
- Give permissions to **specific users or groups**, not to *Everyone* with *Full control*.
- Prefer **read-only** access when users do not need to write.
- Do not allow anonymous or guest access unless it is needed, and keep the firewall active.
- Check from time to time what is shared (`net share` in Windows).

## 7. Putting the functions together

When you print a PDF from a USB drive, at least five functions work: the **file system** finds the file and the **permissions** allow you to open it, the **memory manager** loads the viewer, the **scheduler** shares the CPU between the viewer and your music, the **I/O manager** and the **driver** talk to the printer, and the **spooler** queues the job. Understanding which function fails is the first step to solving a problem.

## Comprueba lo aprendido

1. What is the main advantage of interrupts over polling, and the main advantage of DMA over interrupts?

   <details>
   <summary>Answer</summary>

   With interrupts the CPU does not waste time waiting for the device; it works on other things. With DMA the CPU does not even copy the data: it only starts the transfer and receives one interrupt at the end, which is better for large transfers.

   </details>

2. Explain the difference between a buffer and a spool with an example of each.

   <details>
   <summary>Answer</summary>

   A buffer is a temporary memory area that smooths the speed difference between two parts (for example the data of a video before it is played). A spool is a queue of complete jobs for a device that cannot be shared (for example the documents waiting for the printer).

   </details>

3. A file has the permissions `-rw-r-----` and belongs to the user `ana` and the group `staff`. Write the octal number and say who can write.

   <details>
   <summary>Answer</summary>

   `rw-` = 6, `r--` = 4, `---` = 0: the octal number is **640**. Only `ana` (the owner) can write. The members of `staff` can read, and the others cannot do anything.

   </details>

4. A user has the `r--` permission on a directory (no `x`). Can they see the names of the files? Can they open one of them?

   <details>
   <summary>Answer</summary>

   They can list the names (`r`), but they cannot enter the directory or open the files (`x` is missing), so they will see errors when they try to read them.

   </details>

5. A Windows folder is shared with *Full control* for everybody, but the NTFS permissions allow only *Read* for the group `Students`. What can a student do through the network?

   <details>
   <summary>Answer</summary>

   Only read. When the share permissions and the NTFS permissions are different, the most restrictive result applies.

   </details>

## Glossary

| English | Castellano |
|---|---|
| input/output (I/O) | entrada/salida (E/S) |
| device driver | controlador de dispositivo |
| device controller | controladora del dispositivo |
| polling | sondeo |
| interrupt / interrupt request (IRQ) | interrupción / petición de interrupción |
| interrupt handler | rutina de tratamiento de la interrupción |
| DMA (direct memory access) | DMA (acceso directo a memoria) |
| cache / hit / miss | caché / acierto / fallo |
| buffer | búfer (memoria intermedia) |
| spooling / spool | spooling / cola de impresión |
| authentication / authorisation | autenticación / autorización |
| least privilege | mínimo privilegio |
| permission | permiso |
| owner / group / others | propietario / grupo / otros |
| read / write / execute | lectura / escritura / ejecución |
| shared resource | recurso compartido |
| inheritance | herencia |

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
