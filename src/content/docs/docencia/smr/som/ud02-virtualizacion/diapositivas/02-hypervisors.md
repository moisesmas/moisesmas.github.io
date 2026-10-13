## What you will learn

:::pasos
- What a hypervisor does
- Type 1 and Type 2
- Help from the processor: VT-x and AMD-V
:::

---

## Type 1 vs Type 2

::::columnas
![Two stacks side by side: Type 1 runs on the hardware; Type 2 runs on a host operating system.](../hypervisor-types.svg)

:::pasos
- **Type 1**: runs on the hardware
- **Type 2**: runs on a host OS
:::
::::

:::note
VirtualBox is Type 2.
:::

---

## Check VT-x on Linux

```bash
grep -E -c 'vmx|svm' /proc/cpuinfo
```

---

## Try it yourself

::laboratorio{src="virtualizacion" pestana="stack"}
