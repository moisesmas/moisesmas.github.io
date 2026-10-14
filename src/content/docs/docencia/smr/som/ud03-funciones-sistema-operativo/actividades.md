---
title: "Activities"
description: "Seven activities for Unit 3: processes in Linux and Windows, scheduling by hand and with the lab, memory, partitions and file systems, and permissions and shared resources."
---

These are the activities of the unit. Do them in order, after you read the matching notes. Activities 1, 3 and 4 use the [Process & CPU Scheduler Lab](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/).

Hand in every activity in **Aules**, in the matching task, as a document (PDF, ODT or DOCX) with your name. You do not need to copy the questions: number your answers. Write in English if you can. Do not include personal data (passwords, private photos) in your screenshots.

For activities 1, 6 and 7 you need an Ubuntu virtual machine (the one from Unit 2 is fine). **Never practise partitioning or formatting on your real disk.**

## Activity 1 · Processes in Linux

**Objective:** observe the processes of a Linux system, change their state and read their information.

**What you have to do:**

1. Open the tab **Terminal** of the lab and complete the six missions of the list. Then repeat the main steps in your Ubuntu virtual machine.
2. In a terminal run `ps aux | head -15`. Write the `PID`, `USER` and `STAT` of five processes. Run `echo $$` to find the PID of your shell and find it in the list.
3. Run `sleep 300 &`. With `jobs` and `ps -o pid,ppid,stat,cmd -p <PID>` write its PID, its parent and its state. Stop it with `kill -STOP <PID>`, check the state again, continue it with `kill -CONT <PID>` and end it with `kill <PID>`. Copy each command and the `STAT` letter that you saw.
4. Run `yes > /dev/null &`. Open `top` (or `htop`) and find it: what `%CPU` does it use? Change its priority with `renice -n 19 -p <PID>` and describe what changes. End it with `kill`.
5. Create a zombie with the command of the notes (`bash -c 'sleep 2 & exec sleep 300' &`). Show with `ps` that there is a process in state `Z`. Try `kill -9` on the zombie and explain what happens. Then remove it and explain how.
6. Run `systemctl status cron` (or another service of your system). Say if it is active, since when, and what its PID is. Is it a user process or a system process? Is it a service?
7. Fill in a table of at least six processes with columns: PID, PPID, user, state, type (user, system or service) and what it does.

**What you hand in:** a document with the commands, the relevant output (text or screenshots) and your explanations. Task "Activity 1" in Aules.

**Difficulty:** ★★☆ · **Estimated time:** 75 minutes

## Activity 2 · Processes and services in Windows

**Objective:** do in Windows the same observations as in Linux and compare both systems.

**What you have to do:**

1. Open Task Manager (`Ctrl + Shift + Esc`). In the **Details** tab, add the columns *PID*, *Status*, *User name* and *Priority* (right click on a column header → *Select columns*).
2. Open Notepad and find `notepad.exe`: write its PID, user and memory. Close it with *End task* and check that it disappears.
3. Find three processes that run with the user name `SYSTEM`, `LOCAL SERVICE` or `NETWORK SERVICE` and three that run with your user name. Write what each of them does (look it up in the official documentation if you need to).
4. Open PowerShell and run `while ($true) {}`. This uses one CPU core. Find the `powershell.exe` process that uses most CPU, change its priority to *Below normal* and describe what you see. Close the window to stop it.
5. Open `services.msc`. For three services (for example *Print Spooler*, *Windows Time* and *Windows Update*) write the status, the startup type and the account used to log on. **Do not change anything.**
6. Answer: what is the difference between *Automatic*, *Manual* and *Disabled*? Why does Windows have a `svchost.exe` process for several services?
7. Make a comparison table with five rows: how to list processes, how to end one, how to change its priority, how to list services and how to start or stop a service. One column for Linux and one for Windows.

**What you hand in:** the document with screenshots and the comparison table. Task "Activity 2" in Aules.

**Difficulty:** ★☆☆ · **Estimated time:** 60 minutes

## Activity 3 · Scheduling by hand

**Objective:** calculate scheduling results with a Gantt chart and check them with the simulator.

**What you have to do:**

1. Load A. Use **FIFO**, **SJF** and **SRTF**. Draw a Gantt chart for each one and calculate the completion, response and waiting time of every process and the averages.

   | Process | Arrival | Burst |
   |---|---|---|
   | P1 | 0 | 7 |
   | P2 | 2 | 4 |
   | P3 | 3 | 1 |
   | P4 | 5 | 3 |

2. Load B. Use **priorities (non-preemptive)**, **priorities (preemptive)** and **Round Robin with q = 3**. A lower number is a higher priority. Same work as in the first part.

   | Process | Arrival | Burst | Priority |
   |---|---|---|---|
   | P1 | 0 | 5 | 3 |
   | P2 | 1 | 3 | 1 |
   | P3 | 2 | 6 | 4 |
   | P4 | 4 | 2 | 2 |

3. Enter both loads in the tab **Scheduler simulator** and compare its results with yours. If there is a difference, find your mistake and correct it.
4. Which algorithm gives the best average waiting time in each load? Which one is the least fair, that is, makes a process wait for longest? Explain in two or three sentences.
5. Do three exercises of the tab **Practice** and write the number of correct answers.

**What you hand in:** the six Gantt charts (a photo of your handwriting is accepted) with the tables and your answers to 4 and 5. Task "Activity 3" in Aules.

**Difficulty:** ★★★ · **Estimated time:** 90 minutes

## Activity 4 · Quantum and starvation

**Objective:** investigate with the lab how the quantum and the choice of algorithm change the results.

**What you have to do:**

1. In the tab **Algorithm shoot-out**, use the preset *Five processes* (or enter this load: P1 0/8/3, P2 1/4/2, P3 2/9/4, P4 3/5/1, P5 6/2/2, where each triple is arrival/burst/priority). Write a table with the average waiting time, the average response time and the context switches of the six algorithms, with Round Robin at q = 3.
2. Move the quantum slider from 1 to 8. Copy the results for q = 1, 2, 4 and 8 and draw a conclusion: what happens to the context switches? What happens to the response time? What does the algorithm look like when q is very big?
3. Choose a quantum that you think is a good compromise and justify it.
4. In the *Starvation* part, put 3, 6 and 8 short processes. Write the waiting time of the long process **without** aging and **with** aging. Explain the numbers.
5. A desktop computer has a window manager, a video player and a backup program. Which algorithm would you use and why? Mention at least one problem of your choice and how to reduce it.

**What you hand in:** the tables, the conclusions and your answers. Task "Activity 4" in Aules.

**Difficulty:** ★★☆ · **Estimated time:** 60 minutes

## Activity 5 · Memory: calculate, observe and optimise

**Objective:** do the memory calculations of the unit and check the memory of a real computer.

**What you have to do:**

1. **Fragmentation.** A system has fixed partitions of 128 KiB. Processes of 100, 30, 128 and 65 KiB are loaded. How much memory is wasted in each partition? What kind of fragmentation is it?
2. **Paging.** The page size is 1 KiB (1024 bytes). The page table of a process is: page 0 → frame 4, 1 → 9, 2 → 1, 3 → 7, 4 → 3, 5 → 0. Calculate page, offset and physical address for the logical addresses 2600, 5300, 1030 and 7000. One of them causes a problem: which one and why?
3. **Segmentation.** A process has these segments (base, limit): S0 (3000, 2200), S1 (8000, 600), S2 (12000, 1500). Translate (0, 1500), (1, 600), (2, 1499) and (1, 599), or say that the access is not valid.
4. **Page replacement.** With the reference string `7 1 4 1 7 3 4 3 1 7 5 7 4 1`, count the page faults with FIFO and LRU, first with 3 frames and then with 4 frames. Show the frames after every reference. What do you observe when you compare LRU with FIFO in the case of 3 frames?
5. **Observe.** On your own computer (or in a virtual machine), find: total RAM, available RAM and swap (or page file) in use. In Linux use `free -h` and `swapon --show`; in Windows, Task Manager → Performance → Memory. Find the three processes that use most memory.
6. **Optimise.** Propose three realistic actions to reduce the memory use of that computer. For each one say what you would measure before and after. If you can, try one and report the difference.

**What you hand in:** the calculations (show the steps), the table of data and the three proposals. Task "Activity 5" in Aules.

**Difficulty:** ★★★ · **Estimated time:** 100 minutes

## Activity 6 · Partitions, file systems and an installation plan

**Objective:** partition a virtual disk, compare three file systems and write an installation plan.

**What you have to do:**

1. In VirtualBox, add a **new virtual disk of 2 GiB** to your Ubuntu virtual machine (the machine must be switched off). Start it and open **GParted** (install it with `sudo apt install gparted` if needed).
2. Select the new disk (check its name with `lsblk`!). Create a partition table of type **msdos** (MBR). Create three primary partitions: 300 MiB **FAT32** (label `FAT`), 700 MiB **NTFS** (label `NTFS`) and 600 MiB **ext4** (label `EXT`). Apply the changes.
3. Answer the following questions with GParted or the terminal: Can you create a fourth primary partition in the free space? And a fifth one? How? Can you make the NTFS partition bigger? What happens to the data if you shrink a partition?
4. Mount the three partitions (click on them in the file manager). In each one create files named `Data.txt` and `data.txt`, then run `chmod 600 Data.txt` and `ls -l`. Fill in a table: does the file system distinguish capital letters? Does it keep the permissions? Show the output.
5. Run `df -h` and `lsblk -f` and add the output to your report. Say the size of each file system and how much of it is already used.
6. Delete the three partitions, convert the disk to **GPT** (*Device → Create Partition Table → gpt*) and create **five** primary partitions. What changes? Write a table with five differences between MBR and GPT.
7. Write a table that compares FAT32, NTFS and ext4: maximum file size, permissions, journaling, case-sensitivity and typical use. Mark which ones you proved yourself in step 4.
8. **Installation plan.** A school wants Ubuntu Desktop on a computer with 8 GiB of RAM, an 80 GiB SSD and UEFI. Write a plan with the points of the table in section 7 of [page 4](/docencia/smr/som/ud03-funciones-sistema-operativo/04-storage-and-file-systems/#7-the-installation-plan): hardware check, partition table, partitions with size, file system and mount point, users, backup and checks.
9. Say in one paragraph when you would choose a journaling file system and what would happen after a power cut in each of the three file systems.

**What you hand in:** screenshots of GParted before and after, the outputs, the tables and the plan. Task "Activity 6" in Aules.

**Difficulty:** ★★★ · **Estimated time:** 120 minutes

## Activity 7 · Permissions and shared resources

**Objective:** read and change permissions in Linux and Windows and configure a simple share.

**What you have to do:**

1. In your Linux virtual machine create a folder `project` with a file `notes.txt` and a script `run.sh` (with the text `echo hello`). Run `ls -l` and explain every field of the three lines (type, permissions, owner, group).
2. Write the `chmod` commands (in octal) to obtain each case and test them: (a) `notes.txt` readable and writable by the owner, readable by the group and no access for others; (b) `run.sh` executable by everybody and writable only by the owner; (c) the folder `project` accessible only by its owner. Try to run `./run.sh` before and after you add the `x` permission.
3. Create a second user (`sudo adduser guest1`). Test with `sudo -u guest1 cat project/notes.txt` in cases (a) and (c). Explain the results with the permissions of the file **and** of the directory.
4. Explain what happens when a directory has `r--` but not `x`, and when it has `--x` but not `r`.
5. In Windows (or a Windows virtual machine) create a folder `Shared` on an NTFS disk with a file inside. In the **Security** tab give the group `Users` only *Read*. Then add a *Deny* for *Write* to a test user. What is the effective permission of that user? Why?
6. Share the folder: **Properties → Sharing → Advanced Sharing**, with a share permission of *Read* for one user. From another computer (or the same one) open `\\COMPUTERNAME\Shared`. Try to create a file. Which permissions are being applied, the share one or the NTFS one? Which wins?
7. Write five good practices for sharing resources in a network and one risk that each one avoids.
8. Look at the permissions of `/etc/passwd`, `/etc/shadow` and `/tmp` (`ls -ld`). Why do you think they are different?

**What you hand in:** a document with the commands, outputs and screenshots and your answers. Task "Activity 7" in Aules.

**Difficulty:** ★★☆ · **Estimated time:** 90 minutes

:::aules
You hand in all the activities in Aules, in the task of each one. There you will also find the rubric, your marks and the solutions.
:::
