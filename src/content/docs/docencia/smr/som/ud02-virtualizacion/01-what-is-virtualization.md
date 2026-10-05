---
title: "1. What is virtualization?"
description: "What a virtual machine is, how it differs from a physical computer, its advantages and disadvantages, and real situations where virtualization is used."
---

Almost everything you will practise in this module happens inside virtual machines. Before you create one, you need to know what it really is, what you gain by using it and what it costs. This page gives you the idea; the next pages show you how it works inside.

:::tip[How to work with this page]
**Estimated time:** about 40 minutes of reading and 20 of practice.

1. Read sections 1 to 3 and try the lab tabs [Physical vs virtual](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/#physical) and [Pros & cons](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/#proscons).
2. Read the real scenarios in section 4 and do Activity 1.
3. Answer the questions at the end without looking at the solutions.
:::

## 1. The idea

**Virtualization** is the technique of creating software versions of computer resources (a whole computer, a disk, a network) so that several isolated systems can share the same physical hardware.

A **virtual machine** (VM) is a complete computer made of software. It has a virtual processor (vCPU), virtual memory, virtual disks and a virtual network card. You install an operating system on it and use it like any other computer. The operating system inside the VM does not know that its hardware is not real.

Two words appear all the time:

- The **host** is the physical computer, with its real hardware and (usually) its own operating system.
- The **guest** is the operating system that runs inside a virtual machine.

The software that creates the virtual machines and shares the real hardware between them is the **hypervisor**. You will study it in the [next page](/docencia/smr/som/ud02-virtualizacion/02-hypervisors/). For now, think of it as a manager: every guest believes it owns a computer, but the hypervisor decides how much CPU time, memory and disk each one really gets.

### A VM is just files

On the host, a virtual machine is a set of ordinary files: a configuration file that describes the virtual hardware and one or more files that act as virtual disks. That is why you can copy a VM, move it to another computer, back it up or delete it like any other file.

## 2. Physical computer or virtual machine?

| Feature | Physical computer | Virtual machine |
|---|---|---|
| Hardware | Real components, used by one operating system | Virtual components, built from a share of the host's hardware |
| Performance | Maximum: no extra layer | Slightly lower, mostly in disk and network |
| Resources | Dedicated | Shared with the host and with other VMs |
| Creation time | Buy, assemble, install: hours or days | Minutes (longer if you install from scratch) |
| Changing hardware | Open the case, buy parts | Move a slider; sometimes a reboot is needed |
| Moving it to another place | Hard: it is tied to its hardware | Copy the files (or export an OVA) |
| Recovery after a failure | Slow: reinstall or restore a backup | Fast: restore a snapshot or a copy |
| Isolation | One failure can affect everything installed | Each VM is a separate sandbox |
| Cost per workload | Higher: one machine for each job | Lower: many VMs on one machine |

:::note[Neither is better]
A VM is not a "better computer". It is the right tool for learning, testing and running many small services. A physical machine is better when you need the highest speed or direct access to special hardware (for example, a very powerful graphics card or a database with heavy disk traffic).
:::

## 3. Advantages and disadvantages

### Advantages

- **Efficiency.** A physical server that runs one service is often idle most of the time (a typical use is 10-20 %). If you put several VMs on one host, the idle time of one is used by another. This is called **consolidation**.
- **Lower cost.** Fewer machines mean less hardware to buy, less electricity, less cooling and less space.
- **Portability.** A VM is a set of files, so you can move it between computers. You can even hand in a whole VM as your homework.
- **Scalability.** You can give a VM more CPUs, memory or disk, or create ten identical VMs from one template.
- **Easy recovery.** You can take a **snapshot** before a risky change and go back if something fails. You will practise it in [page 4](/docencia/smr/som/ud02-virtualizacion/04-appliances-ova-and-snapshots/).
- **Isolation.** If a VM crashes or catches a virus, the other VMs keep working. This is why VMs are used as a **sandbox** to test software safely.
- **Flexibility.** You can run Windows, Linux and other systems at the same time on one computer.

### Disadvantages

- **Overhead.** The virtualization layer needs some CPU and memory. Programs that use the disk or the network a lot are the most affected.
- **Resource bottlenecks.** All the VMs compete for the same CPU, memory, disk and network. One VM that writes a lot to disk can slow down all the others (the "noisy neighbour" problem).
- **Complexity.** There are more layers to manage and update: the host, the hypervisor and every guest. It is easy to forget old VMs and snapshots.
- **Licensing.** Some hypervisors and operating systems have special licence rules for virtual environments. A VM with a paid operating system still needs a valid licence.
- **Security.** If an attacker takes control of the hypervisor, all VMs are at risk. Sharing folders or the clipboard between host and guest also makes the isolation weaker.
- **Hardware limits.** The guest can never be more powerful than the host. You cannot give a VM 16 GB of RAM on a host that only has 8 GB.

:::caution[A snapshot is not a backup]
A snapshot lives on the same disk as the VM. If that disk fails, you lose both. For real backups, copy or export the VM to another place.
:::

## 4. Where is virtualization used?

You already use virtualization, even if you do not see it. Here are some real scenarios.

| Scenario | Why virtualize? | What it uses |
|---|---|---|
| **A school computer classroom** | Every student needs the same clean Linux or Windows to practise, and a mistake must not damage the real computer. | Identical VMs and snapshots |
| **A small company with five servers** | The mail, web and file servers use only 10 % of their machines. One strong host can run all of them. | Consolidation |
| **Software testing** | A developer must test a program on Windows 10, Windows 11 and Ubuntu. | Several guests on one laptop |
| **Analysing a suspicious file** | If the file is malware, it only affects the VM, which you delete afterwards. | Sandbox, isolation |
| **Running an old program** | A program only works on an old operating system that no current computer can run directly. | A VM with the old system |
| **Cloud services** | When you rent a "server" in the cloud, you usually get a virtual machine. You pay for what you use and it can grow in minutes. | Scalability, large Type 1 hypervisors |
| **Disaster recovery** | A server fails at night. The company restores its VM on another host in minutes. | VM files, backups |

In Activity 1 you will think about more scenarios and decide if virtualization helps.

## 5. VirtualBox in this module

In this module you will use **Oracle VirtualBox**, a free program that creates virtual machines on a normal computer. The practical units that follow (Windows, Linux, the command line...) will happen inside VMs. If something goes wrong, you will not break the real computer: you will go back to a snapshot or create the VM again.

## Check what you have learned

1. Explain in your own words the difference between *host* and *guest*.

   <details>
   <summary>Answer</summary>

   The **host** is the physical computer (and its operating system) that provides the real hardware. The **guest** is the operating system that runs inside a virtual machine, using a share of the host's hardware.

   </details>

2. A company has four servers, each used about 15 % of the time. Which advantage of virtualization can help them, and how?

   <details>
   <summary>Answer</summary>

   **Consolidation** (efficiency and cost). Four VMs can run on one host, because together they only need about 60 % of one machine. The company needs fewer computers and spends less on electricity and space.

   </details>

3. Give two disadvantages of virtualization and one way to reduce each.

   <details>
   <summary>Answer</summary>

   For example: **overhead** (use hardware virtualization and fast disks such as SSDs) and **resource bottlenecks** (do not give the VMs more resources than the host has, and monitor the use). Other valid answers: complexity (keep a list of VMs and delete old snapshots), licensing (check the licence before deploying), security (update the host and limit shared folders).

   </details>

4. Why is a snapshot not a backup?

   <details>
   <summary>Answer</summary>

   Because it is stored on the same disk as the VM. If the host disk fails, the VM and its snapshots are lost together. A backup must be a copy in another place.

   </details>

## Glossary

| English | Castellano |
|---|---|
| virtualization | virtualización |
| virtual machine (VM) | máquina virtual |
| host | anfitrión |
| guest | invitado |
| hypervisor | hipervisor |
| consolidation | consolidación |
| overhead | sobrecarga |
| bottleneck | cuello de botella |
| sandbox | entorno aislado de pruebas |
| snapshot | instantánea |
| scalability | escalabilidad |
| backup | copia de seguridad |

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
