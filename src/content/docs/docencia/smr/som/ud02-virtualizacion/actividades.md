---
title: Activities
description: "Seven activities for Unit 2 with VirtualBox: scenarios, installing software, importing an OVA, snapshots, Guest Additions, a Windows VM and a host-versus-guest performance test."
---

These are the activities of the unit. Most of them are done with a real hypervisor, so you need a computer where you can use VirtualBox (the classroom computers, or your own). Some use the [Virtualization Playground](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/) lab, and its **Practice** tab is a good self-test before you hand in your work.

All of them are **handed in on Aules**, in the task of each activity, as a PDF with your name. Add screenshots when the activity asks for them and write your answers in your own words. Do not copy text from the notes or from the Internet.

## Activity 1 · Would you virtualize it?

**Objective:** recognise real situations where virtualization helps, and where it does not.

**What you have to do:**

1. Open the lab tabs **Physical vs virtual** and **Pros & cons** and complete both. Write down your final score in the second one.
2. Read these five situations:
   - **a)** A small shop wants a mail server, a web server and a file server. Each one will use about 10 % of a computer.
   - **b)** A video studio needs the maximum speed of a very powerful graphics card for editing.
   - **c)** A teacher wants 30 identical Linux systems for a class, and the students must be able to break them without any consequence.
   - **d)** A security analyst wants to open a suspicious email attachment.
   - **e)** A hospital runs a database that processes thousands of disk operations per second, 24 hours a day.
3. For each situation, decide if virtualization is **recommended**, **possible with care** or **not recommended**. Justify it in two or three lines, naming at least one advantage or disadvantage from page 1 of the notes.
4. Invent **two more** situations of your own (one where virtualization is a very good idea and one where it is a bad idea) and explain them.

**What you hand in:** a PDF with the table of the five situations, your two situations, and your lab score, in the Aules task "Activity 1".

**Criteria it works on:** RA5.a, RA5.b

**Difficulty:** ★☆☆ · **Estimated time:** 40 minutes

## Activity 2 · Install virtualization software and compare hypervisors

**Objective:** install a virtualization program and compare it with other products.

**What you have to do:**

1. Install **VirtualBox** on your computer (or check with your teacher whether it is already installed on the classroom computer). Run `VBoxManage --version` in a terminal and take a screenshot of the answer.
2. Take a screenshot of the main window of the VirtualBox Manager.
3. Open the lab tab **Hypervisor stack builder** and complete the stacks and the classification of products.
4. Choose **one proprietary** virtualization product (for example VMware Workstation or Hyper-V) and build this table with at least **three free or open-source** and **three proprietary** products:

   | Product | Type 1 or 2 | Licence | Host operating systems | One distinctive feature |
   |---|---|---|---|---|

   Use the official websites to check the current licence. Write the date when you consulted them.
5. Write a summary of **100 to 150 words** explaining the difference between Type 1 and Type 2 with your own words.
6. Answer: in which cases would you choose the proprietary product you selected, and in which cases would you choose VirtualBox?

**What you hand in:** a PDF with the screenshots, the table, the summary and the answer, in the Aules task "Activity 2".

**Criteria it works on:** RA5.c

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 3 · Import a virtual appliance (OVA)

**Objective:** deploy a ready-made virtual machine, check it and relate it to the host.

**What you have to do:**

1. Download the OVA of the Linux appliance that your teacher gives you in Aules. Check its checksum with `sha256sum` (or the equivalent in your system) and compare it with the published value.
2. Import it in VirtualBox with these settings:
   - Name: `SOM-U2-` followed by your surname.
   - 2 vCPUs and the RAM that your host can give (not more than half of the host memory).
   - First network adapter in NAT.
   - New MAC addresses for all the network adapters.
3. Before starting it, open the lab tab **New VM wizard** and check whether the values you used satisfy the requirements of a similar system.
4. Start the VM and run, inside it:

   ```bash
   hostnamectl
   ip a
   df -h
   ```

   Take a screenshot of each result.
5. Answer in two or three lines each:
   - **a)** What IP address does the VM have, and why does it have an address of that type?
   - **b)** Where is the VM stored on the host? Find the disk file and write its size in MB or GB.
   - **c)** Compare the memory and the number of CPUs that the guest sees (`free -h`, `nproc`) with the real values of the host.
6. Take a snapshot called `baseline-import` (you will use it in Activity 4).

**What you hand in:** a PDF with the screenshots and the answers, in the Aules task "Activity 3".

**Criteria it works on:** RA5.d, RA5.e, RA5.f

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 4 · Snapshots as a safety net

**Objective:** use snapshots to try changes safely and understand how they work.

**What you have to do:** use the VM of Activity 3.

**Part A: go back after a mistake**

1. Make sure you have the snapshot `baseline-import`.
2. Inside the guest, create a folder `proyecto` in your home folder and a file `plan.txt` with your name inside. Take a snapshot called `with-project`.
3. Now "break" the system: delete the folder `proyecto` and install a small program (for example `sudo apt install tree`). Check that the folder is gone and the program is installed.
4. Restore the snapshot `with-project`. Check what happened to the folder and to the program. Take a screenshot.

**Part B: chains and merging**

5. Create a second file `datos.txt` and take a snapshot called `with-data`. Then create `extra.txt` and take a snapshot called `with-extra`. Take a screenshot of the snapshot tree.
6. Delete the **middle** snapshot (`with-data`). Check which files still exist. Explain what VirtualBox did with its changes.
7. Look at the folder `Snapshots` in the VM folder of the host. Write down the names and sizes of the files before and after you delete the snapshot.

**Part C: think**

8. Answer: what is the difference between *restore* and *delete*? Why is a snapshot not a backup? Write your own good-practice rule for snapshots (one or two sentences).

**What you hand in:** a PDF with the screenshots, the file sizes and the answers, in the Aules task "Activity 4".

**Criteria it works on:** RA5.e

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 5 · Guest Additions and a shared folder

**Objective:** install the integration tools and share data between host and guest.

**What you have to do:** use the VM of Activity 3 (take a snapshot called `before-guest-additions` first).

1. Install the Guest Additions in the guest, following the notes. Restart the VM.
2. Check and write down what changed: mouse, window resizing, clipboard.
3. Enable the **bidirectional clipboard**. Copy a sentence in the host and paste it in the guest. Then copy a sentence in the guest and paste it in the host. Take a screenshot of each paste.
4. Create a folder on the host called `compartida-som` and put a text file in it. Add it to the VM as a **shared folder** with *Auto-mount* and *Make Permanent*. Open it in the guest and take a screenshot.
5. Create a file in the guest, inside the shared folder, and check that you can open it on the host.
6. Write a short reflection (4-5 lines): what security risk do the shared folder and the clipboard add, and what would you do to reduce it?

**What you hand in:** a PDF with the screenshots and the reflection, in the Aules task "Activity 5".

**Criteria it works on:** RA5.e, RA5.f

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 6 · A VM from a proprietary operating system

**Objective:** create a virtual machine from scratch with an operating system that is not free.

**What you have to do:**

1. Look for the **official evaluation version of Windows 11 Enterprise** on the Microsoft Evaluation Center. Write down the page name and the time limit of the licence. Do not use copies from unofficial sites. (The website addresses change, so search for the name instead of using an old link.) If your teacher gives you an ISO in Aules, use that one.
2. Check the requirements of Windows 11 and write them down. Compare them with your host: do you have enough RAM, disk space and cores? Use the lab tab **New VM wizard** to test your chosen values before you create the VM.
3. Create the VM in VirtualBox with the type *Windows 11 (64-bit)*, at least 2 vCPUs, 4 GB of RAM and a disk of at least 64 GB (dynamic). Check in **Settings → System** that EFI and TPM 2.0 are enabled. Take a screenshot of the summary of settings.
4. Install Windows from the ISO and install the Guest Additions.
5. Take a snapshot called `windows-clean`.
6. Answer: what differences did you find compared with the Linux appliance (installation time, requirements, licence)? Why is a proprietary guest more "expensive" in terms of resources and licensing?

**What you hand in:** a PDF with the screenshots (requirements, settings, finished installation) and the answers, in the Aules task "Activity 6".

**Criteria it works on:** RA5.d, RA5.e

**Difficulty:** ★★★ · **Estimated time:** 120 minutes

## Activity 7 · Host against guest: a performance test

**Objective:** measure the performance of a host and a guest and explain the difference.

**What you have to do:**

1. Read page 5 of the notes. Open the lab tab **Resource allocator** and check that the VM you will use does not over-assign the host.
2. Choose the VM of Activity 3 (Linux) and install `sysbench` in the **host** and in the **guest**. (If your host is Windows, use the 7-Zip benchmark in both systems, as explained in the notes.)
3. Write down the data of both systems: processor, number of cores or vCPUs, RAM, type of disk (SSD or HDD) and, in the guest, the allocation of the disk (dynamic or fixed).
4. Run three tests on the host and then on the guest, **three times each**, with the same parameters:
   - CPU with the same number of threads on both.
   - Memory.
   - Disk write with `dd` (1 GB).
5. Build a table with the **median** of each test and the **relative performance** of the guest (guest ÷ host × 100).
6. Make **one change** in the VM (for example, change the number of vCPUs, take a long chain of snapshots, or enable or disable something) and repeat one of the tests. Explain the result.
7. Write a conclusion of 100 to 150 words: where is the largest difference, why, and what would you do to improve it?

**What you hand in:** a PDF with the data of both systems, the commands, the table and the conclusion, in the Aules task "Activity 7".

**Criteria it works on:** RA5.f, RA5.g

**Difficulty:** ★★★ · **Estimated time:** 90 minutes

:::aules
The submissions of these activities are done on Aules, in the task of each one. There you will also find the rubric, your marks and the commented solutions.
:::
