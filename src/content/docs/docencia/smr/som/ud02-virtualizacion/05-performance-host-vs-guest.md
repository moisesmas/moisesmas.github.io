---
title: "5. Performance: host vs guest"
description: "How to measure CPU, memory and disk speed on the host and in a virtual machine, how to compare the results fairly, and what you can do to make a VM faster."
---

"My VM is slow" is not a measurement. In this page you learn to measure the CPU, the memory and the disk, first on the host and then in the guest, and to explain the difference with numbers. This is the last piece of the unit: it connects what you know about hypervisors, resources and snapshots.

:::tip[How to work with this page]
**Estimated time:** about 45 minutes of reading and 90 of practice.

1. Read sections 1 and 2.
2. Use the tab [Resource allocator](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/#resources) of the lab to see how resources are shared.
3. Do Activity 7, where you measure a real host and a real guest.
:::

## 1. What do we expect?

A virtual machine runs on the same hardware as the host, so it cannot be faster. The question is **how much slower** it is, and in which kind of work.

| Resource | What happens in a VM | Typical difference |
|---|---|---|
| **CPU** | With VT-x or AMD-V, most instructions run directly on the processor. | Very small; often close to native speed (for example 90 % or more) |
| **Memory (RAM)** | The guest uses a part of the host memory. Nested paging (EPT/NPT) makes the address translation fast. | Small, if the host has enough memory |
| **Disk** | Every disk request goes through a virtual controller and the host file system. | The biggest difference; it depends a lot on the disk and on the other VMs |
| **Network** | Goes through a virtual card and the host network. | Small for normal use |

The numbers are only orientation: a result depends on your processor, your disk, the other programs running and the VM settings. That is why we **measure** instead of guessing.

## 2. What makes a VM slower or faster?

| Factor | Effect | What to do |
|---|---|---|
| **Disk type** | An SSD closes most of the gap; a mechanical disk makes disk work in the guest slow. | Store the VM on an SSD |
| **Hardware virtualization** | Without VT-x or AMD-V, the VM is much slower or does not start. | Enable it in the UEFI/BIOS |
| **Too many vCPUs** | If you give more vCPUs than the host can run at the same time, the VM waits for free cores. | Use 1-2 vCPUs, never more than the host cores |
| **Too little RAM in the guest** | The guest starts using the disk as memory (*swap*), which is very slow. | Give the guest what it needs |
| **Too much RAM for the guest** | The host runs out of memory and swaps, and all VMs suffer. | Leave 2-3 GB or more for the host |
| **Long snapshot chains** | Each disk read may have to look through several layers. | Keep few snapshots; delete the old ones |
| **Disk allocation** | A dynamic disk has to grow while the guest writes. A fixed disk is more predictable. | Use fixed size for performance tests |
| **Other VMs and programs** | They compete for CPU, memory and disk. | Do not run other heavy tasks while you measure |
| **Guest Additions** | Without them the graphics and the mouse feel slow, even if the CPU is fine. | Install them |
| **Controller** | SATA/AHCI is a good general choice. | Keep the default unless you have a reason to change it |

## 3. How to measure fairly

A good comparison needs a **method**. Follow these rules every time:

1. **Same test, same size.** Use the same program and the same parameters on the host and in the guest.
2. **Quiet system.** Close browsers, updates and other VMs. Plug in a laptop, because some laptops slow down on battery.
3. **Repeat.** Run each test three times and use the **median** (the middle result). The first run is often different because of caches.
4. **Equal conditions for the CPU test.** If the guest has 2 vCPUs, test the host with 2 threads too (and, as an extra, with all its cores).
5. **Write everything down.** Note the host (CPU, RAM, disk type), the VM (vCPUs, RAM, disk) and the commands. Without this, nobody can repeat or understand your results.
6. **Calculate the relative performance.** For results where more is better (operations per second, MB/s):

   > relative performance (%) = guest result ÷ host result × 100

   For results where less is better (seconds), use host time ÷ guest time × 100.

### Know your system first

In a Linux host or guest:

```bash
lscpu                       # processor model, cores, virtualization support
nproc                       # number of CPUs the system can use
free -h                     # total and free memory
lsblk -d -o NAME,SIZE,ROTA  # disks; ROTA 1 = mechanical, 0 = SSD (a virtual disk may show either)
systemd-detect-virt         # inside a VM it names the hypervisor (VirtualBox shows "oracle")
```

## 4. Tests on Linux

You can install a benchmark tool called `sysbench`:

```bash
sudo apt install sysbench
```

### CPU

```bash
sysbench cpu --cpu-max-prime=20000 --threads=1 run
```

Look at **events per second** (more is better) or at the **total time** (less is better). Repeat with `--threads=2`, or with the same number of vCPUs as your guest.

### Memory

```bash
sysbench memory --memory-block-size=1M --memory-total-size=10G run
```

Look at the **MiB transferred per second** (more is better).

### Disk

You can measure the writing speed with `dd`, a standard tool that copies data. This command writes a file of 1 GB, skipping the memory cache, and then deletes it:

```bash
dd if=/dev/zero of=./test.tmp bs=1M count=1024 oflag=direct status=progress
rm ./test.tmp
```

`dd` prints the speed in MB/s at the end. If you want to test random reads and writes with `sysbench`:

```bash
sysbench fileio --file-total-size=2G prepare
sysbench fileio --file-total-size=2G --file-test-mode=rndrw --time=30 run
sysbench fileio --file-total-size=2G cleanup
```

:::caution[Be careful with the path]
Write the test file in a folder where you have permission and enough free space, and delete it afterwards. Do not use another disk or a path you do not understand.
:::

### Simple tests without installing anything

If you cannot install programs, you can measure the **time** of a task:

```bash
time sha256sum bigfile.iso       # CPU and disk reading
time cp bigfile.iso copy.iso     # disk reading and writing
```

`time` shows `real` (what you wait), `user` and `sys`. For the comparison use `real`.

## 5. Tests on Windows

On a Windows host or guest you can use the free benchmark of **7-Zip** (menu *Tools → Benchmark*, or `7z b` in a terminal) to compare CPU and memory. For disk, measure the time of copying a big file with PowerShell:

```powershell
Measure-Command { Copy-Item .\big.bin .\copy.bin }
```

(The `TotalSeconds` value is the time.) Use the same file on the host and in the guest.

## 6. Reading and explaining the results

A result table might look like this (the numbers here are an example, not a rule):

| Test | Host | Guest | Relative performance |
|---|---|---|---|
| CPU, 1 thread (events/s) | 1200 | 1090 | 91 % |
| Memory (MiB/s) | 9500 | 8300 | 87 % |
| Disk write (MB/s) | 480 | 310 | 65 % |

How to explain it: the CPU is close to native because of VT-x; the memory is a little lower; the disk is the weakest because every write goes through the virtual controller and the host file system, and in this case the guest disk was dynamic.

When you write a report:

1. Describe the **system** and the **method**.
2. Give the **table** with the results and the relative performance.
3. Write a **conclusion** that explains the biggest difference with one or two causes from section 2.
4. Say what you would **change** to improve it and why.

:::note[It is not only about speed]
Even if the guest is 10-30 % slower in some tests, the advantages (snapshots, isolation, fast creation) may be worth much more. The aim is to know the cost, not to avoid virtualization.
:::

## Check what you have learned

1. In which resource do you normally find the biggest performance difference between host and guest? Why?

   <details>
   <summary>Answer</summary>

   In the **disk**. Every request goes through a virtual controller and the host file system, and the disk is shared with the host and the other VMs.

   </details>

2. Your CPU test gives 800 events/s on the host and 720 events/s in the guest. What is the relative performance?

   <details>
   <summary>Answer</summary>

   720 ÷ 800 × 100 = **90 %**.

   </details>

3. A student gives 8 vCPUs to a VM on a host with 4 cores and the VM is slower. Why?

   <details>
   <summary>Answer</summary>

   The hypervisor cannot run 8 virtual processors at the same time on 4 real cores, so the VM waits for free cores. It is better to use 1-2 vCPUs, and never more than the host cores.

   </details>

4. Why do you repeat each test three times and use the median?

   <details>
   <summary>Answer</summary>

   Because one result can be affected by caches or by background tasks. The median of three runs is more reliable.

   </details>

5. Give three actions that can improve the performance of a VM.

   <details>
   <summary>Answer</summary>

   For example: store the VM on an SSD, enable VT-x/AMD-V, keep the number of vCPUs reasonable, give enough RAM but leave memory for the host, install Guest Additions, and delete old snapshots.

   </details>

## Glossary

| English | Castellano |
|---|---|
| benchmark | prueba de rendimiento |
| performance | rendimiento |
| throughput | velocidad de transferencia |
| latency | latencia |
| median | mediana |
| thread | hilo |
| swap | memoria de intercambio |
| native | nativo |
| relative performance | rendimiento relativo |
| cache | caché |

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
