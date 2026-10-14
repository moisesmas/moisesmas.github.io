---
title: Unit 3 · Operating system functions
description: What the operating system does with processes, memory, disks, files, input/output and security, and how to observe and control each of these functions.
---

In this unit you open the hood of the operating system. You will see how it shares the CPU between many programs, how it gives memory to each of them, how it organises the data on a disk and how it decides who can use what. You will also learn to look at all this in a real system, in Linux and in Windows.

## What you will learn

- Explain the functions of an operating system as a manager of resources: processes, memory, files, devices and security.
- Identify processes and services, tell user processes from system processes and describe the states of a process and its transitions.
- Observe and control processes in Linux (`ps`, `top`, `jobs`, `kill`) and in Windows (Task Manager and `services.msc`).
- Calculate the waiting and response times of a set of processes with FIFO, SJF, SRTF, priorities and Round Robin, and explain starvation and deadlock.
- Explain how memory is shared with partitions, paging, segmentation and virtual memory, and apply criteria to optimise the memory in use.
- Describe the structure of a disk, the MBR and GPT partition tables and the organisation of a file system, and plan the partitions for an installation.
- Compare FAT32, NTFS and ext4, explain why journaling matters when you choose a file system and optimise the use of storage devices.
- Distinguish the attributes of a file and a directory, read and set permissions in Linux and in Windows, and configure shared resources.

## Map of the unit

1. [Processes and services](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/): functions of the OS, program and process, services, states, foreground and background, signals and zombies.
2. [CPU scheduling](/docencia/smr/som/ud03-funciones-sistema-operativo/02-cpu-scheduling/): the scheduler, FIFO, SJF, SRTF, priorities and Round Robin with worked examples, starvation, critical sections and deadlock.
3. [Memory management](/docencia/smr/som/ud03-funciones-sistema-operativo/03-memory-management/): fragmentation, paging, segmentation, virtual memory, page replacement and memory optimisation.
4. [Storage and file systems](/docencia/smr/som/ud03-funciones-sistema-operativo/04-storage-and-file-systems/): disks, MBR and GPT, FAT32, exFAT, NTFS and ext4, journaling, storage optimisation and the installation plan.
5. [Input/output and security](/docencia/smr/som/ud03-funciones-sistema-operativo/05-io-and-security/): drivers, interrupts and DMA, cache, buffer and spooling, attributes, permissions and shared resources.
6. [Activities](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/): seven activities, from your first `ps aux` to a shared folder with permissions.

## Laboratories

The **Process & CPU Scheduler Lab** goes with pages 1, 2 and 5. You can inspect processes, move a process through its states, run a scheduler with a Gantt chart, compare the algorithms, try a terminal with background jobs and zombies, create a deadlock and see how polling, interrupts and DMA differ. Its last tab generates scheduling exercises and corrects them.

::artefacto{src="planificador-de-procesos"}
