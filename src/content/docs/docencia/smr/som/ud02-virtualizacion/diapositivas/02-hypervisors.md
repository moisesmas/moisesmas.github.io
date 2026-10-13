## What you will learn

:::pasos
- What a **hypervisor** does
- **Type 1** and **Type 2** hypervisors
- How the processor helps: **VT-x** and **AMD-V**
- How to **choose** a hypervisor
:::

---

## A hypervisor creates and runs VMs

Also called a *virtual machine monitor* (**VMM**). Three jobs:

:::pasos
- **Share the CPU**: which guest uses each core, and for how long
- **Share the memory**: each guest in its own area
- **Present virtual devices**: disk, network card, graphics…
:::

For the guest, nothing special happens: it finds a "computer" and runs.

---

## Two families

The difference is **what is under the hypervisor**.

![Two stacks side by side. Type 1: hardware, hypervisor, then two guest operating systems. Type 2: hardware, host operating system, hypervisor program, then two guest operating systems.](../hypervisor-types.svg)

---

## Type 1: bare metal

::::columnas
```text
Guest OS        Guest OS
--------------------------
Hypervisor (Type 1)
--------------------------
Hardware
```

:::pasos
- Starts **directly on the hardware**, after UEFI/BIOS
- Fewer layers: **faster, more stable**
- Data centres and the **cloud**
- Live migration, high availability
:::
::::

---

## Type 2: hosted

::::columnas
```text
Guest OS        Guest OS
--------------------------
Hypervisor (a program)
--------------------------
Host OS
--------------------------
Hardware
```

:::pasos
- A **normal program** on your usual OS
- Each VM is a **window** on your desktop
- Ideal for **learning, testing, development**
- **VirtualBox is Type 2**
:::
::::

---

## Type 1 vs Type 2

| | Type 1 (bare metal) | Type 2 (hosted) |
|---|---|---|
| Runs on | The hardware | A host operating system |
| Performance | Closer to native | A bit lower (disk, network) |
| Typical use | Servers, data centres, cloud | Laptops, classrooms, testing |
| Examples | ESXi, Hyper-V, KVM, Xen | VirtualBox, VMware Workstation |

---

## Real products

| Product | Type | Licence |
|---|---|---|
| **VMware ESXi** | 1 | Commercial |
| **Microsoft Hyper-V** | 1 | Some Windows editions and Windows Server |
| **KVM** | 1 | Free and open source (Linux kernel) |
| **Oracle VirtualBox** | 2 | Free and open source |
| **VMware Workstation** | 2 | Proprietary |

:::caution
Licences change: check the official website before you choose.
:::

---

## Why is KVM Type 1?

:::pasos
- You manage KVM from a normal Linux system…
- …but KVM is a **module of the Linux kernel**
- The kernel **becomes** the hypervisor
- Hyper-V is similar: Windows runs as a **special guest**
:::

---

## The problem

:::pasos
- An OS kernel expects the **most privileged mode** of the CPU
- A guest kernel with that power would **control everything**
- The hypervisor must **intercept** the "dangerous" instructions
:::

---

## Three ways to solve it

![Three columns. Software virtualization: the hypervisor rewrites the dangerous code before it reaches the CPU; slowest. Hardware-assisted: the guest runs almost directly on a CPU with VT-x or AMD-V, which calls the hypervisor only when needed; fast. Paravirtualization: the guest uses virtio drivers to talk to the hypervisor; fast for disk and network.](../virtualization-methods.svg)

---

## VT-x, AMD-V, EPT and NPT

:::pasos
- **Intel VT-x** and **AMD-V**: hardware-assisted virtualization
- **EPT** (Intel) and **NPT** (AMD): much faster memory access
- Current **VirtualBox needs** hardware virtualization
- In practice, a **mix**: VT-x/AMD-V + paravirtualized devices
:::

---

## Check and enable it

::::columnas
```bash
lscpu | grep -i virtualization
grep -Ec '(vmx|svm)' /proc/cpuinfo
```

:::pasos
- Symptom: VirtualBox offers only **32-bit** guests
- Windows: **Task Manager → Performance → CPU**
- Enable it in **UEFI/BIOS**: *Intel Virtualization Technology* or *SVM Mode*
- Save and restart
:::
::::

---

## Try it yourself

::laboratorio[Hypervisor stack builder]{src="virtualizacion" pestana="stack"}

::laboratorio[VT-x on/off]{src="virtualizacion" pestana="vtx"}

---

## Summary

- A hypervisor shares **CPU, memory and devices** among VMs
- **Type 1** on the hardware · **Type 2** on a host OS
- **VT-x / AMD-V** make VMs fast; enable them in the firmware
- Learning → **VirtualBox** · many servers → a **Type 1**

[Activities of the unit →](/docencia/smr/som/ud02-virtualizacion/actividades/)
