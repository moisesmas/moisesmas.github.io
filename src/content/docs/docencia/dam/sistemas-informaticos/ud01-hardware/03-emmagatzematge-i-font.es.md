---
title: "3. Almacenamiento y fuente de alimentación"
description: "HDD, SSD y NVMe, IOPS y RAID; y cómo elegir una fuente de alimentación: conectores, potencia con margen, eficiencia 80 PLUS y modularidad."
---

El almacenamiento decide cuánto tarda en arrancar un equipo y si tus datos sobreviven a la avería de un disco; la fuente decide si todo lo que has comprado funciona de forma estable. Son dos componentes en los que es muy fácil gastar de más o ahorrar de menos, y en los que conviene elegir con números en la mano.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 60 minutos de lectura y 60 de práctica.

1. Lee la sección 1 (tipos de discos) y fíjate en la tabla comparativa.
2. La sección 2 (RAID) es la más abstracta: haz a mano el ejemplo resuelto antes de seguir.
3. En la sección 3, practica el cálculo de potencia con una calculadora.
4. Practica con las actividades 4, 5 y 6.
:::

## 1. Tipos de almacenamiento

El almacenamiento guarda la información de forma permanente: a diferencia de la RAM, el contenido se conserva aunque el equipo esté apagado. Hay tres tipos principales, y conviene entender cómo funcionan por dentro porque eso explica su velocidad, su precio y su durabilidad.

### 1.1 HDD (*Hard Disk Drive*)

Un disco duro mecánico tiene uno o más **platos** recubiertos de material magnético que giran a gran velocidad (habitualmente 5.400 o 7.200 revoluciones por minuto), mientras un **cabezal** de lectura y escritura se desplaza sobre la superficie, como en un tocadiscos. Esto explica sus tres características: es el más **económico por gigabyte**, es el más **lento** (el cabezal tarda un tiempo físico en llegar a los datos: el *tiempo de búsqueda* o *seek time*) y es el único con **partes móviles**, por lo que es más sensible a golpes y vibraciones.

### 1.2 SSD SATA

Un SSD (*Solid State Drive*, unidad de estado sólido) no tiene ninguna pieza mecánica: guarda la información en chips de memoria flash, la misma tecnología (más avanzada) de una memoria USB. Sin cabezal que mover, el acceso a cualquier dato es casi instantáneo y el sistema arranca y abre programas mucho más rápido que con un HDD.

Un SSD SATA usa la misma interfaz que un HDD (el cable SATA de la [página 1](/docencia/dam/sistemas-informaticos/ud01-hardware/01-ordinador-i-placa-base/es/)), de modo que, por muy rápido que sea el chip, la interfaz le pone un techo de unos 550-600 MB/s.

### 1.3 SSD M.2 NVMe

Un SSD M.2 NVMe es, en cuanto a los chips, muy parecido a un SSD SATA, pero **elimina el cuello de botella de SATA** porque se conecta directamente al bus PCIe de la placa. **NVMe** (*Non-Volatile Memory Express*) es el protocolo pensado para aprovechar esa conexión. Un NVMe de gama media supera los 3.500 MB/s y los de gama alta con PCIe 4.0 o 5.0 llegan a 7.000-10.000 MB/s o más: varias veces más rápidos que un SSD SATA.

### 1.4 Comparativa

Además de la velocidad **secuencial** (MB/s o GB/s, importante para copiar archivos grandes) hay otra métrica igual de importante en el uso real: los **IOPS** (*Input/Output Operations Per Second*), las operaciones de lectura o escritura pequeñas y dispersas que la unidad hace por segundo. Son críticos en servidores con muchos usuarios a la vez o en bases de datos, donde no importa tanto copiar un archivo enorme como atender muchísimas peticiones pequeñas.

| Tipo | Velocidad secuencial | IOPS (aprox.) | Precio por GB | Resistencia a golpes |
|---|---|---|---|---|
| HDD | 80-250 MB/s | 50-200 | Muy bajo | Baja (partes móviles) |
| SSD SATA | hasta ≈ 550 MB/s | 80.000-100.000 | Medio | Alta |
| SSD M.2 NVMe | 3.500-10.000 MB/s o más | 300.000-1.000.000 o más | Alto | Alta |

Otras cosas que debes saber de un SSD:

- **Tipos de celda.** La memoria flash guarda 1 bit por celda (SLC), 2 (MLC), 3 (TLC) o 4 (QLC). Con más bits por celda, más capacidad por euro, pero menos velocidad de escritura y menos durabilidad. Los SSD domésticos actuales son sobre todo TLC y QLC.
- **Durabilidad.** Cada celda flash admite un número limitado de escrituras. El fabricante lo indica en **TBW** (*terabytes written*): los TB que puedes escribir antes de que la garantía deje de cubrir la unidad.
- **Capacidad anunciada.** Los fabricantes cuentan en potencias de 10: 1 TB son 10¹² bytes. Windows, en cambio, cuenta en potencias de 2 (pero escribe «GB»): para un disco de «1 TB» muestra 10¹² ÷ 2³⁰ ≈ **931 GB**. No falta espacio: es un cambio de unidades.

:::note[Ejemplo resuelto]
Un equipo doméstico típico combina un **SSD NVMe de 500 GB** (para el sistema operativo y los programas que más usas, para que arranque y responda con agilidad) con un **HDD de 2 TB** (para fotos, vídeos y documentos que no necesitan acceso instantáneo, a un coste por GB mucho menor): velocidad donde importa y capacidad barata donde no es crítica.
:::

## 2. RAID

**RAID** (*Redundant Array of Independent Disks*) agrupa varios discos en una única unidad lógica para ganar velocidad, tolerancia a fallos o ambas cosas. Cada **nivel** es una forma distinta de repartir los datos. Con *n* discos de tamaño *S*:

| Nivel | Mínimo de discos | Capacidad útil | Fallos que tolera | Idea |
|---|---|---|---|---|
| RAID 0 (*striping*) | 2 | n × S | Ninguno | Reparte los datos: muy rápido, pero si falla un disco se pierde todo |
| RAID 1 (*mirroring*) | 2 | S | 1 (con 2 discos) | Cada disco es una copia exacta del otro |
| RAID 5 | 3 | (n − 1) × S | 1 disco | Datos y **paridad** repartidos entre todos los discos |
| RAID 6 | 4 | (n − 2) × S | 2 discos | Como RAID 5 con doble paridad |
| RAID 10 (1+0) | 4 (número par) | (n ÷ 2) × S | 1 seguro (más si caen en parejas distintas) | Espejos repartidos: rápido y redundante |
| JBOD | 1 | n × S | Ninguno | Los discos se usan tal cual, sin redundancia |

La **paridad** es información de control calculada a partir de los datos: permite reconstruir los datos de un disco que ha fallado a partir de los discos que quedan.

:::note[Ejemplo resuelto: el servidor del departamento]
Tenemos 4 discos de 4 TB para un servidor de copias de seguridad.

- RAID 0: 4 × 4 = 16 TB, sin tolerancia a fallos.
- RAID 5: (4 − 1) × 4 = **12 TB**, aguanta el fallo de un disco.
- RAID 6: (4 − 2) × 4 = **8 TB**, aguanta el fallo de dos discos.
- RAID 10: 4 ÷ 2 × 4 = **8 TB**, aguanta el fallo de un disco seguro.

Para copias de seguridad, que deben estar disponibles pero no necesitan gran velocidad, RAID 5 aprovecha mejor el espacio y RAID 6 es más seguro.
:::

Cuando un disco falla, el RAID *reconstruye* los datos en un disco nuevo. Con discos de muchos terabytes esto puede durar horas o días, y durante ese tiempo un segundo fallo sería grave en RAID 5: por eso, con discos grandes, se prefiere RAID 6 o RAID 10. El RAID puede gestionarlo una controladora de hardware o el propio sistema operativo (en Linux, por ejemplo, con `mdadm`; en Windows, con los espacios de almacenamiento).

:::caution[RAID no es una copia de seguridad]
El RAID protege de la avería de un disco, pero no de un archivo borrado por error, de un virus que cifra los datos, de un fallo de la controladora, de un incendio o de un robo: todo eso afecta a todos los discos a la vez. Hace falta una copia en otro sitio.
:::

## 3. La fuente de alimentación (PSU)

La fuente de alimentación (*Power Supply Unit*) transforma la corriente alterna de 230 V de la red eléctrica en varias corrientes continuas de baja tensión (principalmente **12 V, 5 V y 3,3 V**) que son las que pueden usar los componentes. Junto con la placa base, es uno de los componentes que nunca conviene elegir «a lo barato»: una fuente de mala calidad puede dañar el resto del equipo si da una tensión inestable.

:::danger[No abras nunca una fuente]
Los condensadores de la fuente pueden mantener una carga peligrosa aunque esté desconectada. Además, mientras está enchufada (y con el interruptor trasero activado, si lo tiene) la fuente mantiene 5 V de reserva en la placa, aunque el equipo esté «apagado». Antes de tocar nada dentro del equipo, desenchufa el cable de corriente.
:::

### 3.1 Conectores

Cada conector alimenta un tipo de componente y no son intercambiables:

| Conector | Pines | Componente que alimenta |
|---|---|---|
| ATX principal | 24 | Placa base |
| EPS12V (CPU) | 4 u 8 | Procesador |
| PCIe | 6 u 8 | Tarjeta gráfica |
| 12VHPWR / 12V-2x6 | 16 | Gráficas muy potentes |
| SATA de alimentación | 15 (plano) | HDD y SSD de 2,5" |
| Molex | 4 (formato antiguo) | Ventiladores adicionales y algunos periféricos |

:::caution[Cables modulares]
Los cables de una fuente modular no son intercambiables con los de otra marca o modelo, aunque los conectores encajen: la distribución de los pines puede ser distinta y se pueden estropear componentes. Usa siempre los cables de tu fuente.
:::

### 3.2 Cuánta potencia necesitas

La potencia máxima de una fuente se mide en **vatios (W)**. Para elegirla: suma el consumo aproximado de cada componente y deja un **margen del 20-30 %**, porque trabajar cerca del límite de forma continuada reduce la vida útil de la fuente y aumenta el riesgo de apagones.

| Componente | Consumo aproximado |
|---|---|
| CPU | 35-65 W (entrada), 65-125 W (media), 125-250 W (alta, en turbo) |
| Tarjeta gráfica dedicada | 75-150 W (entrada), 150-250 W (media), 250-450 W (alta) |
| Placa base | 30-60 W |
| RAM | 3-5 W por módulo |
| SSD NVMe / SSD SATA / HDD | 3-9 W / 2-4 W / 6-10 W |
| Ventiladores | 2-4 W cada uno |

Son valores orientativos: mira siempre los datos del fabricante.

:::note[Ejemplo resuelto]
Un equipo con una CPU de 125 W, una gráfica de 200 W y unos 75 W para el resto de componentes consume como máximo 125 + 200 + 75 = **400 W**. Con un margen del 30 %: 400 × 1,3 = 520 W. La fuente comercial inmediatamente superior es de **550 W**.
:::

### 3.3 Eficiencia: la certificación 80 PLUS

Una fuente pierde parte de la energía en forma de calor al convertir la corriente alterna en continua. La certificación **80 PLUS** indica qué porcentaje de la energía que toma de la red llega a los componentes. Valores típicos al 50 % de carga (norma de 115 V; con 230 V son unos puntos más altos):

| Certificación | Eficiencia aprox. |
|---|---|
| 80 PLUS (básico) | 80 % |
| Bronze | 85 % |
| Silver | 88 % |
| Gold | 90 % |
| Platinum | 92 % |
| Titanium | 94 % |

Una fuente más eficiente desperdicia menos electricidad y genera menos calor (y, por tanto, menos ruido de los ventiladores). Un equipo que necesita 300 W en sus componentes consume de la red 300 ÷ 0,80 = 375 W con una fuente básica y 300 ÷ 0,92 ≈ 326 W con una Platinum.

### 3.4 Modular o no

Según cómo estén fabricados los cables, las fuentes son **modulares** (todos se pueden desconectar y solo instalas los que hacen falta: más orden y más flujo de aire), **semimodulares** (los imprescindibles, como el ATX de 24 pines, están fijos y el resto son desmontables) o **no modulares** (todos los cables están fijos). El formato habitual es ATX; para chasis pequeños existe el formato SFX.

## Comprueba lo aprendido

1. Tienes 4 discos de 2 TB. ¿Qué capacidad útil y qué tolerancia ofrecen RAID 5 y RAID 10?

   <details>
   <summary>Respuesta</summary>

   RAID 5: (4 − 1) × 2 = **6 TB**, tolera el fallo de **un** disco. RAID 10: 4 ÷ 2 × 2 = **4 TB**, tolera un disco seguro (y dos si pertenecen a espejos distintos).

   </details>

2. Los componentes de un equipo suman 380 W y quieres un margen del 25 %. ¿Qué fuente comprarías?

   <details>
   <summary>Respuesta</summary>

   380 × 1,25 = 475 W. La fuente comercial inmediatamente superior es la de **550 W**.

   </details>

3. ¿Por qué un SSD NVMe puede superar los 550 MB/s de un SSD SATA?

   <details>
   <summary>Respuesta</summary>

   Porque no pasa por la interfaz SATA, que limita la velocidad a unos 550-600 MB/s: se conecta directamente al bus PCIe con el protocolo NVMe, mucho más rápido.

   </details>

4. Has configurado dos discos en RAID 1. ¿Ya tienes una copia de seguridad?

   <details>
   <summary>Respuesta</summary>

   No. El RAID 1 protege de la avería de un disco, pero si borras un archivo o un virus lo cifra, el cambio llega a los dos discos. Una copia de seguridad debe estar en otro sitio.

   </details>

5. Un disco anunciado de «1 TB» aparece en Windows como de 931 GB. ¿Está defectuoso?

   <details>
   <summary>Respuesta</summary>

   No. El fabricante cuenta 1 TB = 10¹² bytes y Windows cuenta en potencias de 2: 10¹² ÷ 2³⁰ ≈ 931. Es un cambio de unidades, no falta espacio.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| disc dur (HDD) | disco duro (HDD) |
| unitat d'estat sòlid (SSD) | unidad de estado sólido (SSD) |
| plat | plato |
| capçal | cabezal |
| temps de busca | tiempo de búsqueda |
| paritat | paridad |
| còpia de seguretat | copia de seguridad |
| font d'alimentació | fuente de alimentación |
| corrent altern / continu | corriente alterna / continua |
| tensió | tensión |
| font modular | fuente modular |
