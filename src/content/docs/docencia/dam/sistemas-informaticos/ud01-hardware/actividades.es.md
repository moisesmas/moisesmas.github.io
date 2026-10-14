---
title: "Actividades"
description: "Ocho actividades de la unidad 1: siete de estudio autónomo (con los laboratorios) y la ficha de reconocimiento de componentes de la sesión presencial."
---

Estas son las actividades de la unidad. Las siete primeras las haces por tu cuenta, a medida que avanzas con los apuntes, y aplican lo que has leído con números y casos reales (muchas se apoyan en los laboratorios). La octava es la ficha que completas durante la sesión presencial. Puedes ver cuándo hacer cada una en la [planificación](/docencia/dam/sistemas-informaticos/ud01-hardware/planificacion/es/).

Todas se **entregan en Aules**, en la tarea correspondiente, en un documento (PDF, ODT o DOCX) con tu nombre. No hace falta copiar los enunciados: numera las respuestas.

## Actividad 1 · Leer la ficha de una placa base

**Objetivo:** extraer de una ficha técnica los datos que deciden la compatibilidad: zócalo, tipo de RAM, ranuras y factor de forma.

**Qué tienes que hacer:**

1. Abre el laboratorio «Anatomía de la placa base» (en la presentación de la unidad) y repasa en él las pestañas de zócalos y chipsets, de RAM y expansión y de formatos.
2. Lee las fichas de tres placas (supón que todas tienen la UEFI actualizada):

   | Dato | Placa A | Placa B | Placa C |
   |---|---|---|---|
   | Zócalo | LGA1700 | AM4 | AM5 |
   | Chipset | B760 | B550 | B650E |
   | RAM | 4 ranuras DDR5 | 4 ranuras DDR4 | 2 ranuras DDR5 |
   | Ranura gráfica | PCIe 4.0 x16 | PCIe 4.0 x16 | PCIe 5.0 x16 |
   | Almacenamiento | 2 M.2 NVMe PCIe 4.0 · 4 SATA | 1 M.2 NVMe PCIe 4.0 + 1 M.2 NVMe PCIe 3.0 · 6 SATA | 1 M.2 NVMe PCIe 5.0 + 1 M.2 NVMe PCIe 4.0 · 4 SATA |
   | Factor de forma | ATX | microATX | Mini-ITX |

3. Responde y justifica cada respuesta en una o dos líneas:
   - **a)** ¿Cuáles de estas CPU admite cada placa: Core i5-13400, Ryzen 5 5600, Ryzen 7 7700 y Core i7-14700?
   - **b)** Tienes un kit de RAM DDR4-3200 y otro DDR5-5600. ¿Cuál puedes usar en cada placa? ¿Por qué no vale el otro?
   - **c)** Quieres instalar un SSD NVMe PCIe 5.0 a la máxima velocidad. ¿Qué placa lo permite? ¿Qué pasa si lo pones en otra?
   - **d)** Un chasis de minitorre solo admite microATX y Mini-ITX. ¿Qué placas caben? ¿Y en un chasis SFF que solo admite Mini-ITX?
   - **e)** Instalas un SSD NVMe PCIe 4.0 en la ranura M.2 PCIe 3.0 de la placa B. ¿Funcionará? ¿A qué velocidad aproximada?

**Qué entregas:** un documento con las respuestas **a** a **e** (tabla de compatibilidad más la justificación), en la tarea «Actividad 1» de Aules.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 40 minutos

## Actividad 2 · Ejecuta un programa a mano

**Objetivo:** entender qué hace cada registro de la CPU mientras se ejecuta un programa guardado en memoria.

**Qué tienes que hacer:**

1. Repasa «El computador sencillo» de la [página 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/es/). Cada palabra de memoria tiene tres dígitos: el primero es la operación y los dos últimos, la dirección (`110` es `LOAD 10`). El repertorio es este:

   | Palabra | Instrucción | Qué hace |
   |---|---|---|
   | 000 | `HALT` | Para el programa |
   | 1xx | `LOAD xx` | AC ← contenido de la dirección xx |
   | 2xx | `STORE xx` | Dirección xx ← AC |
   | 3xx | `ADD xx` | AC ← AC + contenido de la dirección xx |
   | 4xx | `SUB xx` | AC ← AC − contenido de la dirección xx |
   | 5xx | `MUL xx` | AC ← AC × contenido de la dirección xx |
   | 6xx | `JMP xx` | CP ← xx |
   | 7xx | `JZ xx` | Si AC = 0, CP ← xx |
   | 800 | `IN` | AC ← siguiente valor del teclado |
   | 900 | `OUT` | Muestra el AC por pantalla |

2. Este es el programa (las direcciones 10 y 11 son datos y empiezan en 0). Lee dos números, L y A, y muestra 2 × (L + A). Por el teclado se introducen un 5 y después un 3.

   | Dirección | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10 | 11 |
   |---|---|---|---|---|---|---|---|---|---|---|
   | Contenido | `IN` | `STORE 10` | `IN` | `ADD 10` | `STORE 11` | `ADD 11` | `OUT` | `HALT` | 0 | 0 |

3. **Sin usar el simulador**, haz una tabla con una fila por instrucción (8 filas) con el valor de CP, RDM, RIM, RI y AC y el contenido de las direcciones 10 y 11 **al terminar** cada instrucción (después del último paso, incluido el acceso al dato).
4. Comprueba la tabla en la pestaña «Registros paso a paso» del [laboratorio «Dentro de la CPU»](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es#registres) (programa «Perímetro de un rectángulo»). Corrige las filas que no coincidan y explica el error.
5. Con el editor de memoria del simulador, modifica el programa para que muestre L × A (el área). Indica qué palabras de memoria has cambiado y qué muestra con los mismos valores.
6. ¿Cuántas veces accede la CPU a la memoria al ejecutar todo el programa original (contando las instrucciones y los datos)? Razónalo.

**Qué entregas:** la tabla del punto 3 corregida, las respuestas a los puntos 5 y 6 y una captura del simulador con el programa que has modificado, en la tarea «Actividad 2» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 45 minutos

## Actividad 3 · La memoria: RAM y memoria caché

**Objetivo:** comparar módulos de RAM con números y comprobar cuánto gana una memoria caché según el patrón de acceso.

**Qué tienes que hacer:**

**Parte A. RAM** (pestaña «Calculadora de RAM» del [laboratorio](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es#ram))

1. Para cada kit calcula con la fórmula (y compruébalo con el laboratorio) la **latencia real** en ns y el **ancho de banda** por canal y en *dual channel*:

   | Kit | Tipo | Módulos |
   |---|---|---|
   | A | DDR4-2666 CL19 | 2 × 8 GB |
   | B | DDR4-3600 CL18 | 2 × 16 GB |
   | C | DDR5-4800 CL40 | 2 × 16 GB |
   | D | DDR5-6000 CL30 | 2 × 16 GB |

2. Ordena los kits de menor a mayor latencia y de menor a mayor ancho de banda. ¿Qué observas entre los kits B y C?
3. Un portátil tiene ranuras SO-DIMM DDR5. ¿Puede usar el kit D? Razónalo.
4. Un equipo tiene un único módulo de 16 GB. ¿Qué mejoras si añades un segundo módulo idéntico y qué no mejora?

**Parte B. Memoria caché** (pestaña «¿Dónde está el dato?» del [laboratorio](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es#dada))

5. En el simulador de caché, una caché de *N* líneas con bloques de *B* palabras (reemplazo LRU). Un acierto cuesta 1 ns y un fallo, 81 ns (1 de la caché más 80 de la RAM). Ejecuta estos patrones de acceso con las tres configuraciones y completa una tabla con aciertos, fallos, tasa de acierto y tiempo total (sin caché, cada acceso costaría 80 ns):

   | Patrón | Direcciones |
   |---|---|
   | P1 | 0, 1, 2, … hasta 31 (secuencial) |
   | P2 | 0, 4, 8 repetidas 8 veces (24 accesos) |
   | P3 | 0, 16, 32, 48 repetidas 6 veces (24 accesos) |

   | Configuración | Líneas (*N*) | Palabras por bloque (*B*) |
   |---|---|---|
   | C1 | 4 | 4 |
   | C2 | 2 | 4 |
   | C3 | 4 | 1 |

6. Explica, en 5-6 líneas, qué localidad (temporal o espacial) aprovecha cada patrón y por qué algunas configuraciones no mejoran nada.

**Qué entregas:** las tablas y las respuestas de las dos partes, en la tarea «Actividad 3» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 60 minutos

## Actividad 4 · El RAID del servidor del departamento

**Objetivo:** elegir un nivel de RAID calculando la capacidad útil y la tolerancia a fallos.

**Qué tienes que hacer:**

1. El departamento compra un servidor con **6 discos de 4 TB**. Completa la tabla para cada nivel: capacidad útil, número de discos que puede perder y mínimo de discos.

   | Nivel | Capacidad útil | Discos que puede perder | Mínimo de discos |
   |---|---|---|---|
   | RAID 0 | | | |
   | RAID 5 | | | |
   | RAID 6 | | | |
   | RAID 10 | | | |
   | JBOD | | | |

2. Elige un nivel para cada situación y justifícalo en dos líneas: **(a)** una estación de montaje de vídeo con archivos temporales que se pueden regenerar; **(b)** el servidor de archivos del departamento, con los 6 discos; **(c)** un pequeño servidor con solo 2 discos; **(d)** una base de datos con muchas escrituras y que no puede parar; **(e)** discos viejos con copias de archivos sin importancia.
3. El servidor del punto 1 se configura en RAID 5 y se considera «asegurado». Escribe **tres situaciones** en las que el RAID no salvaría los datos y qué harías para protegerte en cada una.
4. Cuando un disco de 4 TB falla, la reconstrucción puede durar muchas horas. ¿Por qué esto preocupa más en RAID 5 que en RAID 6?

**Qué entregas:** la tabla y las respuestas, en la tarea «Actividad 4» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 45 minutos

## Actividad 5 · ¿Qué fuente necesita este equipo?

**Objetivo:** calcular la potencia necesaria, elegir los conectores y valorar la eficiencia de una fuente.

**Qué tienes que hacer:**

1. Calcula la potencia máxima del equipo (suma de consumos) y la de la fuente con un margen del 30 %. Elige la fuente comercial inmediatamente superior de la lista: 300, 350, 400, 450, 500, 550, 600, 650, 750 y 850 W.

   | Componente | Consumo |
   |---|---|
   | CPU | 125 W |
   | Tarjeta gráfica | 200 W |
   | Placa base | 50 W |
   | RAM (2 módulos) | 5 W cada uno |
   | SSD NVMe (2) | 6 W cada uno |
   | HDD (1) | 8 W |
   | Ventiladores (4) | 3 W cada uno |

2. La gráfica lleva un conector PCIe de 8 pines, la placa un EPS de 8 pines, y hay un HDD SATA. Haz la lista de conectores mínimos que debe tener la fuente.
3. El equipo consume de media 250 W (corriente continua) durante 8 horas al día y 220 días al año, y el precio de la electricidad es de 0,15 €/kWh (dato del enunciado). Compara una fuente 80 PLUS Bronze (85 %) y una Gold (90 %): ¿cuántos W toman de la red y cuánto cuesta de diferencia al año? Si la Gold cuesta 25 € más, ¿en cuántos años se amortiza?
4. Un servidor con 4 HDD necesita más margen del que dice la suma de consumos. ¿Por qué? (Pista: piensa en el momento de arrancar.)

**Qué entregas:** los cálculos y las respuestas, con las operaciones escritas, en la tarea «Actividad 5» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 40 minutos

## Actividad 6 · Un equipo para cada uso

**Objetivo:** elegir componentes compatibles y razonados según el uso, y comprobar que funcionan juntos.

**Qué tienes que hacer:** propón una configuración para cada perfil:

- **Perfil 1:** ofimática para la secretaría del centro (Word, Excel, navegador), una pantalla, que sea silencioso y de consumo bajo.
- **Perfil 2:** estación de desarrollo DAM: IDE, navegador con muchas pestañas, base de datos y dos máquinas virtuales a la vez, dos monitores.
- **Perfil 3:** servidor de archivos del departamento: funciona 24 horas, 4 discos, tolera la avería de un disco, red Gigabit, sin monitor.

1. Para cada perfil, haz una tabla con una fila por componente: **chasis y factor de forma, placa (zócalo y chipset), CPU (gama y núcleos), RAM (generación, capacidad y canales), almacenamiento (tipo y cantidad; el RAID en el perfil 3), gráfica (integrada o dedicada), fuente (potencia con margen, calculada como en la actividad 5) y periféricos**. Escribe en cada fila una elección concreta y una justificación de una línea. No hace falta indicar modelos ni precios.
2. Para cada perfil, haz esta **comprobación de compatibilidad** y marca si pasa o no: el zócalo coincide con la CPU; la generación de RAM es la de la placa; el tipo de almacenamiento (SATA, M.2 NVMe) tiene ranura; la placa cabe en el chasis; la fuente tiene los conectores necesarios y potencia con margen; la refrigeración cubre el TDP de la CPU.
3. Escribe 5 líneas sobre qué cambiarías si el presupuesto fuera la mitad.

**Qué entregas:** las tres tablas, las comprobaciones y el comentario final, en la tarea «Actividad 6» de Aules.

**Dificultad:** ★★★ · **Tiempo estimado:** 90 minutos

## Actividad 7 · Interpreta los mapas de una red

**Objetivo:** leer un mapa físico y uno lógico de la misma red y extraer información de ellos.

![Mapa físico (arriba) y mapa lógico (abajo) de una red de instituto: sala de servidores con router, servidor y switch A; aula 1 con switch B y tres PC; aula 2 con switch C y dos PC; sala de profesorado con un PC y una impresora conectados directamente al switch A. En el mapa lógico hay dos redes: Alumnado (192.168.10.0) y Profesorado (192.168.20.0).](./activitat-mapes-es.svg)

**Qué tienes que hacer:** responde con el mapa delante.

1. ¿Cuántos cables UTP aparecen en el mapa físico?
2. ¿En qué sala está la impresora? ¿A qué red lógica pertenece?
3. El servidor está en la sala de servidores, pero pertenece a la red Profesorado. ¿Por qué no es una contradicción?
4. Si se corta el **cable 1**, ¿qué equipos pierden la conexión con el servidor y con Internet?
5. Si falla el **switch A**, ¿qué equipos siguen pudiendo comunicarse entre sí?
6. ¿Qué topología física tiene la red? Razónalo.
7. Propón un cambio (añadir un enlace) para que el aula 1 no quede aislada si se corta el cable 1, y di a qué topología se acerca la red resultante.
8. ¿Qué mapa consultas para **localizar** un cable defectuoso y cuál para saber **a qué red** pertenece un PC?

**Qué entregas:** las respuestas numeradas, en la tarea «Actividad 7» de Aules.

**Dificultad:** ★★☆ · **Tiempo estimado:** 35 minutos

## Actividad 8 · Ficha de reconocimiento de componentes (presencial)

**Objetivo:** identificar los componentes de un equipo real, manipularlos con seguridad y conectarlos a una red.

**Qué tienes que hacer** (durante la sesión presencial, con el equipo que te asigne el profesor):

1. **Tabla de componentes.** Para cada componente identificado en el ordenador de prácticas, indica el **nombre**, la **función principal** y la **ubicación o conector** en la placa base. Componentes: placa base; CPU y zócalo; módulos de RAM y ranuras; unidad de almacenamiento (HDD, SSD o M.2) y su conector; fuente de alimentación y sus conectores principales; cable de red y conector RJ45.
2. **Reflexión** (3-4 líneas): ¿qué topología de red utilizarías para conectar los 20 ordenadores de un aula de informática y por qué?
3. **Seguridad** *(propuesta de ampliación)*. Marca sí o no para cada medida y añade una línea sobre la que te haya parecido más importante: equipo apagado y desenchufado; pulsera antiestática o contacto con el chasis; piezas cogidas por los bordes; tornillos en un recipiente; zona de trabajo ordenada; ninguna apertura de la fuente de alimentación.
4. **Puesta en marcha y periférico** *(propuesta de ampliación, si hay tiempo)*. Después de montar la RAM y el disco, comprueba que el equipo arranca y que en la UEFI aparecen los dos; conecta un periférico USB y anota qué dice el sistema (`lsusb` o el Administrador de dispositivos).

**Qué entregas:** la ficha completada, en la tarea de Aules **antes de finalizar la clase**.

**Dificultad:** ★★☆ · **Tiempo estimado:** durante la sesión presencial

:::aules
Las entregas de estas actividades se hacen en Aules, en la tarea de cada una. Allí también encontrarás la rúbrica, las calificaciones y las soluciones comentadas.
:::
