## Qué aprenderás

:::pasos
- Qué hace un hipervisor
- Tipo 1 y tipo 2
- La ayuda del procesador: VT-x y AMD-V
:::

---

## Tipo 1 frente a tipo 2

::::columnas
![Dos pilas una al lado de la otra: el tipo 1 funciona sobre el hardware; el tipo 2, sobre un sistema operativo anfitrión.](../hypervisor-types-es.svg)

:::pasos
- **Tipo 1**: funciona sobre el hardware
- **Tipo 2**: funciona sobre un SO anfitrión
:::
::::

:::note
VirtualBox es de tipo 2.
:::

---

## Comprobar VT-x en Linux

```bash
grep -E -c 'vmx|svm' /proc/cpuinfo
```

---

## Pruébalo

::laboratorio{src="virtualizacion" pestana="stack"}
