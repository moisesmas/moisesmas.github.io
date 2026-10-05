---
title: "Activities"
description: "Seven activities for Unit 1: your own devices, computer types, operating systems, data representation, units and licences."
---

These are the activities of the unit. Do them in order, after you read the matching notes. Most of them use one of the two labs: the [Computer System Explorer](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/) or the [Bit Lab](/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/).

Hand in every activity in **Aules**, in the matching task, as a document (PDF, ODT or DOCX) with your name. You do not need to copy the questions: number your answers. Write in English if you can. Do not include personal data (serial numbers, passwords, private photos) in your screenshots.

## Activity 1 · Systems all around us

**Objective:** identify the four elements of a computer system in everyday examples, separate hardware from software and recognise firmware.

**What you have to do:**

1. Open the tabs **System parts** and **Software types** of the Computer System Explorer and do the exercises until you solve them all.
2. Name two systems that are **not** computers (mechanical, biological or social ones). For each one write its purpose and say what would be the equivalent of the hardware, the software, the data and the user.
3. Is a robot vacuum cleaner a computer system? Explain your answer using the four elements.
4. A phone has these features: 6.1-inch OLED screen, 8-core processor, 8 GB of RAM, 256 GB of storage, 5G modem, 4,000 mAh battery, Android operating system, camera app and fingerprint sensor. Make a two-column table with the hardware and the software.
5. Laptop A has a 13.4-inch screen, an x86 processor, 8 GB of RAM, a 512 GB SSD and Windows 11. Laptop B has a 13.6-inch screen, an 8-core ARM processor, 8 GB of RAM, a 512 GB SSD and macOS. What changed more when you go from A to B, hardware or software? Explain.
6. Which of these devices have firmware? Smart TV, analogue wall clock, wired mouse, USB flash drive, bicycle, Wi-Fi router, pocket calculator, desk lamp with a simple switch. Write one sentence of reason for each.

**What you hand in:** one document with your answers to 2–6, in the Aules task "Activity 1".

**Criteria that it works on:** RA1.a

**Difficulty:** ★☆☆ · **Estimated time:** 45 minutes

## Activity 2 · My computer, inside and out

**Objective:** find the real features of a computer, classify it and decide if it is suitable for an operating system.

**What you have to do:**

1. Choose a computer that you can use: your own, a family one or a classroom PC. Open the tab **Inside the box** of the lab and review each component.
2. Find the features with the tools of the operating system:

   | System | Where to look |
   |---|---|
   | Windows | *Settings → System → About*; *Task Manager* (`Ctrl+Shift+Esc`) → *Performance*; the `msinfo32` tool (it also shows the **BIOS mode**: UEFI or legacy) |
   | macOS | *Apple menu → About This Mac*; *System Information* |
   | Linux | `lscpu` (CPU), `free -h` (RAM), `lsblk` (disks), `lspci` (graphics and other cards), `cat /etc/os-release` (OS). To see the firmware type: `[ -d /sys/firmware/efi ] && echo UEFI \|\| echo BIOS` |

3. Fill in a table with: type of computer (by use and by features), CPU model and number of cores, RAM, storage type and capacity, graphics, operating system and version, 32 or 64 bits, and firmware type (if you can find it).
4. List three peripherals that are connected and classify each one as input, output, input and output, storage or communication.
5. Look up the **current minimum requirements** of one operating system (for example the latest Windows or Ubuntu Desktop) on the official website of its maker. Compare them with your table and write a conclusion: is this computer suitable? Which feature is the limit?

If you cannot use a computer, ask your teacher for the data sheet of a classroom PC.

**What you hand in:** the table, the list of peripherals and the conclusion. A screenshot of the *About* window is welcome. Task "Activity 2" in Aules.

**Criteria that it works on:** RA1.a, RA2.c

**Difficulty:** ★☆☆ · **Estimated time:** 45 minutes

## Activity 3 · The right computer for the job

**Objective:** match real needs with the type of computer and understand why some systems need a real-time operating system.

**What you have to do:**

1. Do the tab **Right computer for the job** of the lab.
2. Choose the best type of computer (supercomputer, mainframe, server, PC, workstation or embedded system) for each case and explain your choice in one sentence:
   - **a)** the system that keeps the patient records of a regional health service, available day and night;
   - **b)** the card payment terminal of a small shop;
   - **c)** a freelance architect who makes 3D renders of buildings;
   - **d)** a bank that must process millions of transfers every night;
   - **e)** a research centre that simulates the climate for the next 50 years;
   - **f)** a student who writes essays and watches videos.
3. Write five lines on the differences between a supercomputer and a mainframe.
4. Two of these systems need a real-time operating system: insulin pump, music streaming app, car airbag controller, video call. Say which two, explain what happens if the response is late and say if each is *hard* or *soft* real time.
5. What type of computer is your phone? Is it general-purpose or specific-purpose? Justify your answer.

**What you hand in:** one document with the answers, in the task "Activity 3".

**Criteria that it works on:** RA1.a, RA2.d

**Difficulty:** ★★☆ · **Estimated time:** 40 minutes

## Activity 4 · Layers, structure and classification of operating systems

**Objective:** explain what an operating system does, describe how its kernel can be organised and classify current operating systems.

**What you have to do:**

1. In the tab **The OS layer cake**, choose *Print a page* in command-line mode and go through all the steps. Write a numbered list of what happens in each layer, in your own words, and name the operating system function that appears in each step.
2. In the tab **Kernel architectures**, test the three situations in each design (driver crashes, core component crashes, new hardware). Make a table with the results and then answer: why is a monolithic kernel fast? Why do most general-purpose operating systems use a modular design?
3. Draw a mind map (for example with draw.io) or a table with the five classification criteria (structure, users, multitasking, licence and number of CPUs). Include the categories and one example operating system for each category.
4. Open the StatCounter Global Stats website and take screenshots of the market share of operating systems for: **(a)** desktop computers worldwide, **(b)** mobile devices worldwide and **(c)** desktop computers in Europe. Write five sentences: which operating system leads in each case, which differences you see and why you think they happen. Write the period shown in the graph.
5. In the tab **OS classifier**, classify Windows 11, Ubuntu Desktop, Android and FreeRTOS. Copy your classification into a table and mark the criteria where more than one answer is acceptable.

**What you hand in:** a document with the list, the two tables, the mind map and the screenshots with your five sentences, in the task "Activity 4".

**Criteria that it works on:** RA2.a, RA2.b, RA2.d

**Difficulty:** ★★☆ · **Estimated time:** 90 minutes

## Activity 5 · Data representation workout

**Objective:** convert numbers between bases and understand how text is stored as bytes.

**What you have to do:**

1. Open the **Bit Lab**, go to the *Practice* tab and solve at least 15 exercises. Take a screenshot of your score.
2. Convert by hand (show the steps):
   - **a)** `1011 0101` (binary) to decimal and hexadecimal;
   - **b)** 200 (decimal) to binary and hexadecimal;
   - **c)** `0x7E` to binary and decimal;
   - **d)** `0x2A` to binary and decimal;
   - **e)** `1 0000 0000` (binary) to decimal and hexadecimal.
3. Write your first name in ASCII: for each letter give the decimal code, the hexadecimal code and the 8-bit binary code.
4. Decode this message, written in ASCII hexadecimal: `53 4F 4D 20 49 53 20 46 55 4E`.
5. Create a text file that contains exactly `Mañana €5`, saved with **UTF-8** encoding.
   - Count the characters and write the size of the file in bytes (use the file properties, or `wc -c` in Linux and macOS).
   - Look at the bytes with a hex viewer (`xxd file.txt` in Linux and macOS, `Format-Hex file.txt` in PowerShell). Find the bytes of `ñ` and `€`.
   - Open the same file in a text editor choosing the encoding ISO-8859-1 or Windows-1252 ("reopen with encoding" in many editors). What do you see and why?

**What you hand in:** a document with the screenshot, the conversions, the answers to steps 3–5 and a screenshot of the hex view. Task "Activity 5".

**Criteria that it works on:** RA1.b

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 6 · Units and how each operating system shows them

**Objective:** use SI and IEC units correctly and explain why capacities look different in each operating system.

**What you have to do:**

1. Calculate, and show your operations (use the tab *KB vs KiB* of the Bit Lab to check):
   - **a)** a 256 GB phone: how many GiB is that?
   - **b)** a 500 GB SSD: how many GiB?
   - **c)** a DVD of 4.7 GB: how many GiB?
   - **d)** a 100 Mb/s connection: how many MB/s at most?
   - **e)** an 8 GiB RAM module: how many bytes and how many MB?
   - **f)** a file of 1 MiB: how many kB?
   - **g)** how long does it take to download a 2 GB file at 300 Mb/s, in the best case?
2. Choose a storage device whose advertised capacity you know (an internal disk, a USB stick or a memory card). See the capacity in the operating system (Windows: *This PC → drive → Properties*; macOS: *Finder → Get Info*; Linux: `lsblk`, `df -h` and `df -H`). Fill in a table with the advertised capacity, the exact size in bytes, the size shown by the system, the unit that the system uses and the "missing" space in percentage.
3. Explain why your result does not mean that the disk is defective. Mention that a small part of the space can also be used by the file system.
4. If you can use two different operating systems (for example a PC and a phone, or a virtual machine), compare how they show the same capacity.

**What you hand in:** a document with the calculations, the table and the explanation, in the task "Activity 6".

**Criteria that it works on:** RA1.b

**Difficulty:** ★★☆ · **Estimated time:** 50 minutes

## Activity 7 · Licences and the right operating system

**Objective:** identify and respect software licences, and select an operating system for a real case after checking the hardware.

**What you have to do:**

1. Do the tab **Licence detective** of the lab.
2. **Licences.** Choose eight programs that you use or that are installed on your computer (include the operating system). At least two must be open source and at least two proprietary. For each one write: where you found its licence, the licence type (proprietary, freeware, shareware, copyleft or permissive), whether it is free of charge, and whether you may modify and share it.
3. **Choosing an operating system.** Study the three cases and decide for each one:
   - **Case A.** A video studio needs five new PCs. They edit 4K video with a program that exists only for Windows and macOS.
   - **Case B.** A primary school wants to reuse 20 old PCs (64-bit processor with 2 cores, 4 GB of RAM, 128 GB HDD, BIOS firmware). Pupils need a browser, an office suite and a programming environment. The budget is very low.
   - **Case C.** A small accounting office has eight PCs and an accounting program that runs only on Windows. It has a limited budget and one person with basic IT skills.

   For each case: list the requirements, look up the current minimum requirements of two candidate operating systems, check whether the hardware is suitable, choose one operating system and justify your choice with at least three criteria, including the licence.
4. **Optional (debate).** Prepare three arguments for and two against the statement "Public schools should use free software by default". We will discuss it in class.

**What you hand in:** the table of licences and the three decisions with their justification, in the task "Activity 7".

**Criteria that it works on:** RA2.c, RA2.d, RA2.i

**Difficulty:** ★★★ · **Estimated time:** 90 minutes

:::aules
You hand in all the activities in Aules, in the task of each one. There you will also find the assessment criteria, your marks and the solutions.
:::
