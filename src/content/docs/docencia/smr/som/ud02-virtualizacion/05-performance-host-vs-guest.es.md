---
title: "5. Rendimiento: anfitrión frente a invitado"
description: "Cómo medir la velocidad de CPU, memoria y disco en el anfitrión y en una máquina virtual, cómo comparar los resultados con justicia y qué puedes hacer para que una VM sea más rápida."
---

«Mi VM va lenta» no es una medida. En esta página aprendes a medir la CPU, la memoria y el disco, primero en el anfitrión y después en el invitado, y a explicar la diferencia con números. Es la última pieza de la unidad: conecta lo que sabes de hipervisores, recursos e instantáneas.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 45 minutos de lectura y 90 de práctica.

1. Lee las secciones 1 y 2.
2. Usa la pestaña [Reparto de recursos](/docencia/smr/som/ud02-virtualizacion/laboratorios/virtualizacion/?lang=es#resources) del laboratorio para ver cómo se reparten los recursos.
3. Haz la actividad 7, donde mides un anfitrión y un invitado reales.
:::

## 1. ¿Qué esperamos?

Una máquina virtual funciona sobre el mismo hardware que el anfitrión, así que no puede ser más rápida. La pregunta es **cuánto más lenta** es y en qué tipo de trabajo.

| Recurso | Qué ocurre en una VM | Diferencia típica |
|---|---|---|
| **CPU** | Con VT-x o AMD-V, la mayoría de las instrucciones se ejecutan directamente en el procesador. | Muy pequeña; a menudo cercana a la velocidad nativa (por ejemplo, el 90 % o más) |
| **Memoria (RAM)** | El invitado usa una parte de la memoria del anfitrión. La paginación anidada (EPT/NPT) hace rápida la traducción de direcciones. | Pequeña, si el anfitrión tiene memoria suficiente |
| **Disco** | Cada petición de disco pasa por una controladora virtual y por el sistema de archivos del anfitrión. | La mayor diferencia; depende mucho del disco y de las otras VM |
| **Red** | Pasa por una tarjeta virtual y por la red del anfitrión. | Pequeña en el uso normal |

Los números son solo una orientación: un resultado depende de tu procesador, tu disco, los otros programas que se ejecutan y la configuración de la VM. Por eso **medimos** en lugar de suponer.

## 2. ¿Qué hace una VM más lenta o más rápida?

| Factor | Efecto | Qué hacer |
|---|---|---|
| **Tipo de disco** | Un SSD cierra casi toda la diferencia; un disco mecánico hace muy lento el trabajo de disco en el invitado. | Guarda la VM en un SSD |
| **Virtualización por hardware** | Sin VT-x o AMD-V, la VM es mucho más lenta o no arranca. | Actívala en la UEFI/BIOS |
| **Demasiadas vCPU** | Si das más vCPU de las que el anfitrión puede ejecutar a la vez, la VM espera a que haya núcleos libres. | Usa 1-2 vCPU, nunca más que los núcleos del anfitrión |
| **Poca RAM en el invitado** | El invitado empieza a usar el disco como memoria (*swap*), que es muy lento. | Da al invitado lo que necesita |
| **Demasiada RAM para el invitado** | Al anfitrión se le acaba la memoria y usa el *swap*, y todas las VM sufren. | Deja 2-3 GB o más para el anfitrión |
| **Cadenas largas de instantáneas** | Cada lectura de disco puede tener que mirar a través de varias capas. | Mantén pocas instantáneas; borra las antiguas |
| **Reserva del disco** | Un disco dinámico tiene que crecer mientras el invitado escribe. Uno fijo es más predecible. | Usa tamaño fijo para las pruebas de rendimiento |
| **Otras VM y programas** | Compiten por CPU, memoria y disco. | No ejecutes otras tareas pesadas mientras mides |
| **Guest Additions** | Sin ellas, los gráficos y el ratón parecen lentos aunque la CPU vaya bien. | Instálalas |
| **Controladora** | SATA/AHCI es una buena elección general. | Deja la que viene por defecto salvo que tengas un motivo para cambiarla |

## 3. Cómo medir con justicia

Una buena comparación necesita un **método**. Sigue estas reglas siempre:

1. **Misma prueba, mismo tamaño.** Usa el mismo programa y los mismos parámetros en el anfitrión y en el invitado.
2. **Sistema tranquilo.** Cierra navegadores, actualizaciones y otras VM. Enchufa el portátil, porque algunos portátiles van más lentos con batería.
3. **Repite.** Ejecuta cada prueba tres veces y usa la **mediana** (el resultado del medio). La primera ejecución suele ser distinta por las cachés.
4. **Condiciones iguales en la prueba de CPU.** Si el invitado tiene 2 vCPU, prueba también el anfitrión con 2 hilos (y, como extra, con todos sus núcleos).
5. **Anótalo todo.** Apunta el anfitrión (CPU, RAM, tipo de disco), la VM (vCPU, RAM, disco) y las órdenes. Sin esto, nadie puede repetir ni entender tus resultados.
6. **Calcula el rendimiento relativo.** Para resultados en los que más es mejor (operaciones por segundo, MB/s):

   > rendimiento relativo (%) = resultado del invitado ÷ resultado del anfitrión × 100

   Para resultados en los que menos es mejor (segundos), usa tiempo del anfitrión ÷ tiempo del invitado × 100.

### Conoce primero tu sistema

En un anfitrión o invitado Linux:

```bash
lscpu                       # modelo de procesador, núcleos, compatibilidad con virtualización
nproc                       # número de CPU que puede usar el sistema
free -h                     # memoria total y libre
lsblk -d -o NAME,SIZE,ROTA  # discos; ROTA 1 = mecánico, 0 = SSD (un disco virtual puede mostrar cualquiera)
systemd-detect-virt         # dentro de una VM nombra el hipervisor (VirtualBox muestra "oracle")
```

## 4. Pruebas en Linux

Puedes instalar una herramienta de pruebas llamada `sysbench`:

```bash
sudo apt install sysbench
```

### CPU

```bash
sysbench cpu --cpu-max-prime=20000 --threads=1 run
```

Fíjate en los **events per second** (más es mejor) o en el **total time** (menos es mejor). Repite con `--threads=2`, o con el mismo número de vCPU que tu invitado.

### Memoria

```bash
sysbench memory --memory-block-size=1M --memory-total-size=10G run
```

Fíjate en los **MiB transferidos por segundo** (más es mejor).

### Disco

Puedes medir la velocidad de escritura con `dd`, una herramienta estándar que copia datos. Esta orden escribe un archivo de 1 GB saltándose la caché de memoria y después lo borra:

```bash
dd if=/dev/zero of=./test.tmp bs=1M count=1024 oflag=direct status=progress
rm ./test.tmp
```

`dd` muestra la velocidad en MB/s al final. Si quieres probar lecturas y escrituras aleatorias con `sysbench`:

```bash
sysbench fileio --file-total-size=2G prepare
sysbench fileio --file-total-size=2G --file-test-mode=rndrw --time=30 run
sysbench fileio --file-total-size=2G cleanup
```

:::caution[Cuidado con la ruta]
Escribe el archivo de prueba en una carpeta donde tengas permiso y espacio libre suficiente, y bórralo después. No uses otro disco ni una ruta que no entiendas.
:::

### Pruebas sencillas sin instalar nada

Si no puedes instalar programas, puedes medir el **tiempo** de una tarea:

```bash
time sha256sum bigfile.iso       # CPU y lectura de disco
time cp bigfile.iso copy.iso     # lectura y escritura de disco
```

`time` muestra `real` (lo que esperas), `user` y `sys`. Para la comparación usa `real`.

## 5. Pruebas en Windows

En un anfitrión o invitado Windows puedes usar la prueba de rendimiento gratuita de **7-Zip** (menú *Tools → Benchmark*, o `7z b` en un terminal) para comparar CPU y memoria. Para el disco, mide el tiempo de copiar un archivo grande con PowerShell:

```powershell
Measure-Command { Copy-Item .\big.bin .\copy.bin }
```

(El valor `TotalSeconds` es el tiempo.) Usa el mismo archivo en el anfitrión y en el invitado.

## 6. Leer y explicar los resultados

Una tabla de resultados podría ser así (los números son un ejemplo, no una regla):

| Prueba | Anfitrión | Invitado | Rendimiento relativo |
|---|---|---|---|
| CPU, 1 hilo (events/s) | 1200 | 1090 | 91 % |
| Memoria (MiB/s) | 9500 | 8300 | 87 % |
| Escritura en disco (MB/s) | 480 | 310 | 65 % |

Cómo explicarlo: la CPU está cerca de la velocidad nativa gracias a VT-x; la memoria es algo menor; el disco es lo más débil porque cada escritura pasa por la controladora virtual y por el sistema de archivos del anfitrión, y en este caso el disco del invitado era dinámico.

Cuando escribas un informe:

1. Describe el **sistema** y el **método**.
2. Da la **tabla** con los resultados y el rendimiento relativo.
3. Escribe una **conclusión** que explique la mayor diferencia con una o dos causas de la sección 2.
4. Di qué **cambiarías** para mejorarlo y por qué.

:::note[No es solo cuestión de velocidad]
Aunque el invitado sea un 10-30 % más lento en algunas pruebas, las ventajas (instantáneas, aislamiento, creación rápida) pueden valer mucho más. El objetivo es conocer el coste, no evitar la virtualización.
:::

## Comprueba lo aprendido

1. ¿En qué recurso se suele encontrar la mayor diferencia de rendimiento entre anfitrión e invitado? ¿Por qué?

   <details>
   <summary>Respuesta</summary>

   En el **disco**. Cada petición pasa por una controladora virtual y por el sistema de archivos del anfitrión, y el disco se comparte con el anfitrión y con las otras VM.

   </details>

2. Tu prueba de CPU da 800 events/s en el anfitrión y 720 events/s en el invitado. ¿Cuál es el rendimiento relativo?

   <details>
   <summary>Respuesta</summary>

   720 ÷ 800 × 100 = **90 %**.

   </details>

3. Un alumno da 8 vCPU a una VM en un anfitrión con 4 núcleos y la VM va más lenta. ¿Por qué?

   <details>
   <summary>Respuesta</summary>

   El hipervisor no puede ejecutar 8 procesadores virtuales a la vez en 4 núcleos reales, así que la VM espera a que haya núcleos libres. Es mejor usar 1-2 vCPU, y nunca más que los núcleos del anfitrión.

   </details>

4. ¿Por qué repites cada prueba tres veces y usas la mediana?

   <details>
   <summary>Respuesta</summary>

   Porque un resultado puede verse afectado por las cachés o por tareas en segundo plano. La mediana de tres ejecuciones es más fiable.

   </details>

5. Indica tres acciones que pueden mejorar el rendimiento de una VM.

   <details>
   <summary>Respuesta</summary>

   Por ejemplo: guardar la VM en un SSD, activar VT-x/AMD-V, mantener un número razonable de vCPU, dar suficiente RAM pero dejar memoria al anfitrión, instalar las Guest Additions y borrar las instantáneas antiguas.

   </details>

## Glosario

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

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
