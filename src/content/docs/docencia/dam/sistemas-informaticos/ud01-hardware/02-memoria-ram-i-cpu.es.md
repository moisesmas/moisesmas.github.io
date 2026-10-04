---
title: "2. La memoria RAM y la CPU"
description: "Los tipos de memoria de un ordenador, cómo elegir RAM (DDR, latencia, canales) y qué hay dentro de una CPU: registros, memoria caché, ciclo de instrucción, núcleos, hilos y rendimiento."
---

La RAM y la CPU deciden lo rápido que «se siente» un equipo. Si sabes leer «DDR5-6000 CL30» o «6 núcleos, 12 hilos, 65 W», podrás comparar componentes con números en lugar de fiarte del márketing, y entenderás por qué comprar más GHz no siempre es comprar más rendimiento.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura y 45 de práctica.

1. Lee primero las secciones 1 y 2 (memoria y RAM) y después las 3, 4 y 5 (CPU).
2. Las fórmulas de latencia y de ancho de banda (sección 2) se practican: no te fíes de leerlas, haz los cálculos.
3. Practica con el [laboratorio «Dentro de la CPU»](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es) (pestañas «Registros paso a paso», «¿Dónde está el dato?», «Calculadora de RAM» y «Núcleos, hilos e IPC») y haz las actividades 2 y 3.
:::

## 1. Tipos de memoria de un ordenador

Un ordenador no tiene una sola memoria, sino varios niveles. Cuanto más cerca de la CPU, más rápida, más cara y más pequeña.

| Memoria | Tecnología | Volátil | Dónde está | Para qué sirve |
|---|---|---|---|---|
| Registros | Circuitos de la CPU | Sí | Dentro de la CPU | Datos con los que la CPU opera ahora mismo |
| Memoria caché (L1, L2, L3) | SRAM | Sí | Dentro de la CPU | Copias de datos e instrucciones usados hace poco |
| RAM (memoria principal) | DRAM | Sí | Módulos DIMM o SO-DIMM | Programas y datos en uso |
| Firmware (UEFI/BIOS) | Memoria flash | No | Chip de la placa | Arrancar el sistema |
| Almacenamiento | Flash NAND o platos magnéticos | No | SSD o HDD | Guardar la información de forma permanente |

![Jerarquía de memoria: de arriba abajo, registros, memoria caché L1, L2 y L3, RAM, SSD NVMe y HDD, cada nivel más grande y más lento que el anterior.](./jerarquia-memoria-es.svg)

Una memoria es **volátil** si pierde el contenido cuando se le corta la corriente. Cuando la RAM se llena, el sistema operativo mueve datos al disco (la *memoria virtual*, el archivo de paginación o *swap*): el equipo sigue funcionando, pero mucho más lento, porque el disco es mucho más lento que la RAM.

## 2. La memoria RAM

### 2.1 Qué es

La RAM (*Random Access Memory*) es la memoria de trabajo: guarda de forma temporal los datos y las instrucciones de los programas que la CPU usa. Se llama «de acceso aleatorio» porque leer o escribir cualquier posición tarda lo mismo, esté donde esté dentro del chip (en un disco duro mecánico, en cambio, los datos dispersos tardan más que los contiguos).

Es **volátil**: cada bit se guarda cargando un diminuto condensador que se descarga, por eso la RAM se *refresca* constantemente (cada pocos milisegundos) y, cuando se va la corriente, todo se pierde. Una analogía: el almacenamiento es el archivador de la oficina, donde los documentos se guardan para siempre; la RAM es la mesa de trabajo: solo caben los documentos que usas ahora y, al acabar el día (al apagar el ordenador), queda vacía.

### 2.2 Generaciones DDR

Los módulos evolucionan en generaciones **DDR** (*Double Data Rate*), cada una más rápida y eficiente que la anterior, pero **incompatibles entre sí**: la muesca del módulo está en una posición distinta para que no puedas instalar un DDR5 en una placa DDR4.

| Generación | En el mercado desde | Velocidades habituales (MT/s) | Voltaje típico |
|---|---|---|---|
| DDR3 (en desuso) | 2007 | 1333-2133 | 1,5 V |
| DDR4 | 2014 | 2133-3600 | 1,2 V |
| DDR5 | 2021 | 4800-8000 | 1,1 V |

Los módulos **DIMM** (largos) se usan en equipos de sobremesa y los **SO-DIMM** (más cortos) en portátiles y miniPC. En servidores y estaciones de trabajo es habitual la memoria **ECC**, que detecta y corrige errores de un bit.

### 2.3 Las cuatro características

- **Capacidad:** cantidad de datos que guarda, en GB. Valores habituales: 8, 16 o 32 GB por módulo.
- **Velocidad:** se mide en **MT/s** (millones de transferencias por segundo). DDR4-3200 hace 3200 MT/s; en el márketing se suele decir «3200 MHz», aunque la frecuencia real del reloj es la mitad.
- **Latencia (CL, *CAS latency*):** ciclos de reloj que tarda la memoria en responder. Un CL más bajo es mejor, pero hay que pasarlo a tiempo real: **latencia (ns) = CL × 2000 ÷ velocidad (MT/s)**.
- **Canales (*dual* o *quad channel*):** si instalas 2 o 4 módulos (idealmente idénticos) en las ranuras correspondientes, la placa los lee en paralelo y multiplica el **ancho de banda** sin cambiar la latencia. Ancho de banda por canal: **velocidad (MT/s) × 8 bytes**.

:::note[Ejemplo resuelto]
Un módulo **DDR4-3200 CL16**:

- Latencia: 16 × 2000 ÷ 3200 = **10 ns**.
- Ancho de banda por canal: 3200 × 8 = 25.600 MB/s = **25,6 GB/s**.
- En *dual channel*, dos módulos iguales dan **51,2 GB/s** y la latencia sigue siendo de 10 ns.

Compáralo con un **DDR5-4800 CL40**: 40 × 2000 ÷ 4800 ≈ **16,7 ns** y 4800 × 8 = **38,4 GB/s** por canal. Más ancho de banda, pero una latencia algo peor: la DDR5 no es «más rápida» en todo.
:::

:::caution[Perfiles XMP y EXPO]
Un kit anunciado como «DDR4-3600» puede arrancar a una velocidad base inferior hasta que activas su perfil (XMP en Intel, EXPO en AMD) en la UEFI. Y si mezclas módulos distintos, todo el conjunto trabaja a la velocidad del más lento.
:::

La pestaña «Calculadora de RAM» del [laboratorio](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es#ram) hace estos cálculos por ti y te deja comparar dos módulos.

## 3. La CPU: partes internas

La CPU (*Central Processing Unit*) ejecuta las instrucciones de los programas: cada cálculo, comparación o movimiento de datos acaba convertido en instrucciones que procesa una tras otra. Tiene cuatro partes principales:

- **ALU (unidad aritmético-lógica):** hace las operaciones aritméticas (suma, resta, multiplicación) y lógicas (comparaciones, AND, OR, NOT).
- **Unidad de control:** dirige la orquesta. No calcula nada, pero decide en cada ciclo qué instrucción buscar, cómo interpretarla y qué activar para ejecutarla.
- **Registros:** unas pocas decenas de memorias internas de la CPU, mucho más rápidas que la RAM (cientos de veces) pero de pocos bytes cada una. Guardan los datos con los que la CPU opera en ese instante.
- **Memoria caché (L1, L2, L3):** una memoria intermedia, más rápida que la RAM y más lenta que los registros, que guarda copias de lo usado hace poco para no tener que ir a buscarlo a la RAM cada vez.

| Nivel | Tamaño típico | Velocidad | Dónde está |
|---|---|---|---|
| L1 | 32-64 KB por núcleo | La más rápida | Dentro de cada núcleo |
| L2 | 0,25-2 MB por núcleo | Rápida | Dentro de cada núcleo |
| L3 | 8-32 MB | Más lenta que L1 y L2, pero mucho más rápida que la RAM | Compartida entre todos los núcleos |

Recuerda el modelo de Von Neumann: la CPU y la memoria comparten un único camino, y eso limita la velocidad (el «cuello de botella de Von Neumann»). La memoria caché lo alivia, y las CPU actuales tienen además cachés L1 separadas para instrucciones y para datos (*arquitectura Harvard modificada*).

:::note[Arquitectura y microarquitectura]
El **repertorio de instrucciones** (ISA) es el «contrato» entre el software y la CPU: x86-64 (Intel y AMD), ARM (móviles, Apple Silicon) o RISC-V. La **microarquitectura** es cómo cada fabricante construye la CPU por dentro. Un programa compilado para x86-64 no se ejecuta directamente en una CPU ARM; hay que recompilarlo o traducirlo.
:::

## 4. El ciclo de instrucción

Cada instrucción, por sencilla que sea, pasa por cuatro fases que se repiten sin parar mientras el equipo está encendido:

| Fase | Qué ocurre |
|---|---|
| **Fetch** (búsqueda) | La unidad de control trae de la memoria la siguiente instrucción y la deja en un registro de la CPU. |
| **Decode** (decodificación) | La unidad de control interpreta el código binario: qué operación es y con qué datos. |
| **Execute** (ejecución) | La ALU (u otro circuito) hace la operación. |
| **Writeback** (escritura) | El resultado se guarda en un registro o, si hace falta, se devuelve a la memoria. |

Un procesador a 3 GHz completa 3.000 millones de ciclos de reloj por segundo. Una instrucción puede necesitar más de un ciclo, pero una CPU real solapa las fases de varias instrucciones (*pipeline*) y puede terminar más de una por ciclo.

:::note[Ejemplo: la instrucción «sumar 2 + 3»]
**Fetch:** la unidad de control busca en memoria `ADD R1, R2` y la trae a la CPU. **Decode:** interpreta que es una suma y que los operandos son los registros R1 (que vale 2) y R2 (que vale 3). **Execute:** la ALU calcula 2 + 3 = 5. **Writeback:** el 5 se guarda en el registro de destino.
:::

### El computador sencillo

En el laboratorio trabajarás con un modelo didáctico que usa cinco registros:

| Registro | Nombre | Qué guarda |
|---|---|---|
| CP | Contador de programa | La dirección de la siguiente instrucción |
| RDM | Registro de dirección de memoria | La dirección de memoria que se va a leer o escribir |
| RIM | Registro de intercambio de memoria | El dato que va a la memoria o viene de ella |
| RI | Registro de instrucción | La instrucción que se está ejecutando |
| AC | Acumulador | El resultado de las operaciones de la ALU |

Así se ejecuta `LOAD 10` (lleva al acumulador el contenido de la dirección 10, donde hay un 2), con el programa a partir de la dirección 0:

| Paso | Qué hace | CP | RDM | RIM | RI | AC |
|---|---|---|---|---|---|---|
| 1 | RDM ← CP | 0 | 0 | | | 0 |
| 2 | RIM ← M[RDM] | 0 | 0 | 110 | | 0 |
| 3 | RI ← RIM; CP ← CP + 1 | 1 | 0 | 110 | LOAD 10 | 0 |
| 4 | RDM ← 10 | 1 | 10 | 110 | LOAD 10 | 0 |
| 5 | RIM ← M[RDM] | 1 | 10 | 2 | LOAD 10 | 0 |
| 6 | AC ← RIM | 1 | 10 | 2 | LOAD 10 | 2 |

Los pasos 1 a 3 son el *fetch* (la instrucción, 110, es solo un número guardado en memoria); el 4 y el 5 son el acceso al dato; el 6 es el *writeback*. La pestaña «Registros paso a paso» ejecuta programas completos y corrige tus predicciones.

## 5. Núcleos, hilos y rendimiento

Una CPU actual integra varios **núcleos** (*cores*): cada uno es, en la práctica, una CPU completa que ejecuta su propio flujo de instrucciones. El sistema operativo reparte el trabajo entre ellos. Muchas CPU actuales mezclan núcleos de *rendimiento* y de *eficiencia*.

Con **Hyper-Threading** (Intel) o **SMT** (AMD), un núcleo físico gestiona dos **hilos** de ejecución a la vez y aprovecha los momentos en que uno espera un dato. Esto **no duplica** el rendimiento: el núcleo es el mismo, y la ganancia es moderada y depende de la carga.

**El GHz no lo es todo.** El rendimiento de un hilo depende de dos factores: la **frecuencia** (ciclos por segundo) y el **IPC** (*Instructions Per Cycle*, instrucciones útiles que se terminan por ciclo, según el diseño de la CPU): **rendimiento ≈ frecuencia × IPC**. Por eso una CPU moderna a 3,5 GHz puede superar a una antigua a 4 GHz.

Tampoco más núcleos significa proporcionalmente más velocidad: la parte del programa que no se puede repartir limita la ganancia. Con 4 núcleos y un programa que se puede repartir en un 80 %, el tiempo se reduce a 0,2 + 0,8 ÷ 4 = 0,4 del original: una aceleración de **2,5**, no de 4.

**TDP y refrigeración.** El TDP (*Thermal Design Power*) indica, en vatios, el calor que el procesador está diseñado para disipar a carga normal, y por tanto la refrigeración que necesita; en modo turbo puede consumir mucho más. Un disipador de aire sencillo vale para CPU de 65 W; en gamas altas (125-150 W o más) conviene un disipador grande o refrigeración líquida. Si no se evacua el calor, la CPU baja la frecuencia para protegerse (*thermal throttling*) y el rendimiento cae.

| Familia (ejemplo) | Fabricante | Núcleos habituales (gama media) | Zócalo |
|---|---|---|---|
| Core i5 / i7 (14.ª gen.) | Intel | 10 a 20 (de rendimiento + de eficiencia) | LGA1700 |
| Ryzen 5 / 7 (serie 7000) | AMD | 6 a 8 | AM5 |

## Comprueba lo aprendido

1. Calcula la latencia real, en nanosegundos, de un módulo DDR5-6000 CL30.

   <details>
   <summary>Respuesta</summary>

   30 × 2000 ÷ 6000 = **10 ns**. La misma latencia real que un DDR4-3200 CL16, aunque el DDR5 tiene mucho más ancho de banda.

   </details>

2. ¿Cuál es el ancho de banda teórico de dos módulos DDR4-2666 en *dual channel*?

   <details>
   <summary>Respuesta</summary>

   2666 MT/s × 8 bytes = 21.328 MB/s por canal; por dos canales, 42.656 MB/s, es decir, unos **42,7 GB/s**.

   </details>

3. Para un programa de un solo hilo, ¿qué es más rápido: una CPU a 4,2 GHz con IPC 1,0 o una a 3,6 GHz con IPC 1,4?

   <details>
   <summary>Respuesta</summary>

   Rendimiento ≈ frecuencia × IPC: 4,2 × 1,0 = 4,2 y 3,6 × 1,4 = 5,04. La segunda es un **20 % más rápida**, a pesar de tener menos GHz.

   </details>

4. ¿En qué fase del ciclo de instrucción se guarda el resultado en un registro? ¿Qué contiene el contador de programa (CP)?

   <details>
   <summary>Respuesta</summary>

   En el **writeback**. El CP contiene la **dirección de la siguiente instrucción** que hay que buscar.

   </details>

5. ¿Por qué hay memoria caché si ya existe la RAM?

   <details>
   <summary>Respuesta</summary>

   Porque la RAM es muy lenta comparada con la CPU. La caché guarda copias de los datos e instrucciones usados hace poco (los programas suelen volver a necesitarlos), de modo que la CPU espera mucho menos.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| memòria volàtil | memoria volátil |
| memòria cau | memoria caché |
| registre | registro |
| latència | latencia |
| ample de banda | ancho de banda |
| canal doble (*dual channel*) | doble canal |
| unitat de control | unidad de control |
| unitat aritmeticològica (ALU) | unidad aritmético-lógica (ALU) |
| nucli | núcleo |
| fil | hilo |
| comptador de programa | contador de programa |
| dissipador | disipador |
| rendiment | rendimiento |
