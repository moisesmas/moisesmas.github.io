---
title: "1. El ordenador y la placa base"
description: "Qué es un ordenador, cómo se organiza según Von Neumann, qué tipos de chasis hay, qué contiene una placa base y cómo arranca un equipo."
---

Todo lo que harás en este módulo (instalar sistemas operativos, programar scripts, configurar redes) se ejecuta sobre un hardware concreto. Si sabes qué hay dentro de un ordenador y cómo se conecta, podrás elegir un equipo para un uso determinado, averiguar por qué no arranca y entender por qué una instalación va lenta. Esta página es el mapa de toda la unidad.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 60 minutos de lectura y 30 de práctica.

1. Lee las secciones 1 y 2 (visión general, 15 minutos) y dedica el grueso del tiempo a las 4 y 6, las que más usarás en la presencial.
2. Practica con el laboratorio «Anatomía de la placa base» (en la presentación de la unidad) y haz la [actividad 1](/docencia/dam/sistemas-informaticos/ud01-hardware/actividades/es/).
3. Cierra con «Comprueba lo aprendido»; las dudas, en el foro de Aules.
:::

## 1. Qué es un ordenador

Un ordenador es una máquina electrónica que recibe datos (**entrada**), los procesa siguiendo instrucciones (**proceso**), muestra el resultado (**salida**) y guarda información para más adelante (**almacenamiento**). Este esquema de cuatro fases vale para un teléfono móvil y para un servidor que atiende millones de peticiones por segundo.

| Componente | Fase | Función principal |
|---|---|---|
| Teclado, ratón, escáner | Entrada | Introducir datos y órdenes |
| CPU (procesador) | Proceso | Ejecutar instrucciones y hacer cálculos |
| Memoria RAM | Proceso (apoyo) | Guardar temporalmente los datos que la CPU usa ahora mismo |
| Monitor, impresora, altavoces | Salida | Mostrar o comunicar el resultado |
| Disco SSD o HDD | Almacenamiento | Guardar la información de forma permanente |

### La arquitectura de Von Neumann

En 1945, el matemático John von Neumann describió una forma de organizar un ordenador que seguimos usando: **el programa y los datos se guardan en la misma memoria, en el mismo formato binario**. Antes, máquinas como el ENIAC se reprogramaban cambiando cables y conmutadores, una tarea que podía durar días. Con la idea de Von Neumann, cambiar de programa es tan sencillo como cargar otro archivo en memoria; lo haces cada vez que abres una aplicación.

![Esquema de la arquitectura de Von Neumann: la entrada y la salida se conectan con la CPU, que tiene unidad de control, ALU y registros, y se comunica por buses con una única memoria que guarda instrucciones y datos; el almacenamiento se conecta con la memoria.](./von-neumann-es.svg)

Desde el punto de vista de la CPU, un programa no es más que datos (bytes) que ella interpreta como instrucciones. En la [página 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/es/) verás cómo lo hace, y en el [laboratorio «Dentro de la CPU»](/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/dins-la-cpu/?lang=es#von-neumann) podrás ejecutar un programa instrucción a instrucción.

### Ordenadores «ocultos»

No limites la idea de ordenador a la torre o al portátil: un cajero automático, un router o una lavadora digital también lo son. Son **sistemas embebidos** (*embedded systems*): ejecutan un software muy concreto y el usuario no instala programas nuevos, a diferencia de un PC, que es de uso general.

### Hardware y software

El **hardware** es la parte física, todo lo que puedes tocar. El **software** son los programas que lo hacen funcionar: el sistema operativo y las aplicaciones. Esta unidad trata el hardware; el software empieza en la unidad 2.

## 2. Tipos de chasis

El chasis (o caja) es la estructura metálica o de plástico que aloja y protege los componentes. No es solo estética: determina qué placa base cabe, condiciona el flujo de aire (y, por tanto, la temperatura de trabajo) y limita cuántas unidades de almacenamiento, ventiladores y tarjetas de expansión puedes instalar.

| Tipo | Tamaño aprox. | Uso típico | Ventaja e inconveniente |
|---|---|---|---|
| Torre completa (*full tower*) | 50 cm de alto o más | Estaciones de trabajo, servidores, PC de gama alta | + Máxima expansión y refrigeración · − Ocupa mucho espacio |
| Semitorre (*mid tower*) | 40-50 cm | Ordenador doméstico y de oficina | + Buen equilibrio · − Expansión más limitada |
| Minitorre | 30-40 cm | Equipos compactos (microATX, Mini-ITX) | + Ahorra espacio · − Menos ranuras y peor refrigeración |
| SFF o *slim* | Perfil muy bajo | Oficinas con poco espacio | + Muy compacto · − Casi sin ampliación |
| *All-in-one* | Integrado en el monitor | Uso doméstico u ofimático | + Ahorra espacio de escritorio · − Ampliación casi nula |
| Portátil | Integrado, con batería | Movilidad | + Portabilidad · − Componentes soldados, poca ampliación |
| Servidor en *rack* | Horizontal, medido en unidades U (1U ≈ 4,45 cm) | Centros de datos | + Densidad y estandarización · − Necesita un armario *rack* |

:::note[Ejemplo resuelto]
El instituto quiere montar un servidor de archivos para el departamento: 4 discos duros para copias de seguridad, funcionando 24 horas al día. **¿Qué chasis elegirías?** La clave no es el nombre, sino lo que ofrece: como mínimo 4 bahías de 3,5" y buen flujo de aire para trabajar sin parar. Una torre completa (o una semitorre con bahías suficientes) lo cumple y te deja crecer; un SFF no tendría ni espacio ni refrigeración.
:::

## 3. La placa base

La placa base (*motherboard*) es el circuito impreso principal: una lámina de fibra de vidrio con varias capas de pistas de cobre (entre 4 y 8 en las modernas, o más en gamas altas) que conectan todos los componentes y llevan a la vez la energía y las señales de datos.

Sin ella, la CPU no podría acceder a la RAM ni la gráfica recibiría alimentación: es el elemento que convierte un conjunto de piezas sueltas en un sistema informático.

## 4. Componentes de la placa base

### 4.1 El chipset

El chipset es el conjunto de circuitos que gestiona la comunicación entre la CPU, la memoria y el resto de dispositivos. Determina, en buena parte, qué procesadores admite la placa, cuántos puertos USB y SATA ofrece, si permite el *overclocking* (subir la frecuencia de la CPU o de la RAM por encima de la de fábrica) y cuántas líneas PCIe adicionales hay.

Antiguamente eran dos chips, el **northbridge** (RAM y gráfica) y el **southbridge** (periféricos lentos). Hace más de una década que el controlador de memoria y las líneas PCIe principales están dentro de la CPU, y el *chipset* actual es heredero del puente sur.

Cada fabricante ofrece varias gamas de chipset para una misma generación de procesadores. Se diferencian por las funciones que activan, no por las CPU que admiten:

| Fabricante (generación de ejemplo) | Gama alta | Gama media | Gama de entrada |
|---|---|---|---|
| Intel (Core de 12.ª a 14.ª gen.) | Z790: *overclocking* y máxima conectividad | B760: sin *overclocking* de la CPU | H610: funciones básicas |
| AMD (Ryzen 7000) | X670: *overclocking* y más líneas PCIe | B650: buen equilibrio | A620: funciones básicas |

Los nombres cambian con cada generación (Z890 para Intel LGA1851, X870 para AMD AM5…), pero la escala se mantiene: importa qué activa cada gama, no memorizar nombres.

### 4.2 El zócalo de la CPU

El zócalo (*socket*) es el conector físico donde se inserta el procesador. Cada arquitectura de CPU usa un zócalo específico, con una disposición de contactos propia.

| Fabricante | Zócalo | Contactos | Familias de CPU |
|---|---|---|---|
| Intel | LGA1700 | Pines en la placa (*Land Grid Array*) | Core de 12.ª, 13.ª y 14.ª generación |
| AMD | AM5 | Pines en la placa (LGA) | Ryzen 7000 y posteriores |
| AMD (anterior) | AM4 | Pines en el procesador (PGA) | Ryzen 1000 a 5000 |

:::caution[No es cuestión de rendimiento]
Un procesador solo se puede instalar en una placa con el zócalo para el que se diseñó: es compatibilidad física y eléctrica. Además, comprueba que la UEFI de la placa admite esa CPU concreta; a veces hay que actualizarla antes.
:::

### 4.3 Ranuras de RAM

Las placas domésticas suelen tener entre 2 y 4 ranuras **DIMM**. Si están coloreadas por parejas, no es decoración: indican cuáles hay que usar juntas para activar el modo **dual channel**, en el que la placa lee dos módulos en paralelo y duplica el ancho de banda. El manual indica la combinación; en la [página 2](/docencia/dam/sistemas-informaticos/ud01-hardware/02-memoria-ram-i-cpu/es/) calcularás qué ganas.

### 4.4 Ranuras PCIe

PCI Express (PCIe) es el bus para tarjetas de expansión: gráficas, de red, de sonido, controladoras de almacenamiento. Una ranura tiene 1, 4, 8 o 16 **líneas** (*lanes*): x1, x4, x8 o x16. Más líneas, más datos a la vez; una x16 (la de la gráfica) multiplica por dieciséis el ancho de banda de una x1. La segunda variable es la **generación**: cada una duplica aproximadamente la velocidad de la anterior.

| Generación | Por línea (x1), en cada sentido | Ranura x16 (gráficas) |
|---|---|---|
| PCIe 3.0 | ≈ 1 GB/s | ≈ 16 GB/s |
| PCIe 4.0 | ≈ 2 GB/s | ≈ 32 GB/s |
| PCIe 5.0 | ≈ 4 GB/s | ≈ 63 GB/s |

Las generaciones son compatibles hacia atrás (una tarjeta 4.0 funciona en una ranura 3.0, a la velocidad de esta). Ojo: una ranura x16 puede tener conectadas solo 4 u 8 líneas; el manual de la placa lo indica.

### 4.5 SATA y M.2

**SATA** (*Serial ATA*) es la interfaz clásica para discos duros (HDD) y SSD de 2,5". Cada unidad necesita un cable de datos y uno de alimentación (de la fuente). Una placa doméstica suele ofrecer entre 4 y 6 puertos.

**M.2** es una ranura mucho más reciente donde el módulo de almacenamiento (una pequeña placa alargada, sin cables) se inserta directamente sobre la placa base; el formato más habitual es el 2280 (22 mm de ancho por 80 mm de largo). Ojo: **no todos los M.2 son iguales**.

| | SATA 2,5" | M.2 SATA | M.2 NVMe |
|---|---|---|---|
| Conexión | Cable SATA + alimentación | Ranura M.2, protocolo SATA | Ranura M.2, bus PCIe |
| Velocidad máxima aprox. | ≈ 550 MB/s | ≈ 550 MB/s | De 3.500 a 10.000 MB/s o más |

:::caution[M.2 no significa «rápido»]
Antes de comprar un SSD M.2, mira en el manual de la placa qué tipo admite cada ranura: algunas solo SATA, otras NVMe y otras ambos.
:::

### 4.6 Conectores de alimentación

La placa recibe corriente de la fuente a través de dos conectores normalizados: el **ATX principal, de 24 pines**, que alimenta la placa en conjunto, y uno **EPS12V, de 4 u 8 pines**, junto al zócalo, que alimenta la CPU (en gamas altas puede pasar de 200 W a máxima carga). Los verás con detalle en la [página 3](/docencia/dam/sistemas-informaticos/ud01-hardware/03-emmagatzematge-i-font/es/).

### 4.7 El chip BIOS/UEFI

Un pequeño chip de memoria no volátil (mantiene el contenido sin electricidad) guarda el **firmware** que arranca el sistema. **UEFI** (*Unified Extensible Firmware Interface*) es la evolución moderna de la antigua **BIOS**: hoy casi todas las placas nuevas usan UEFI, aunque todo el mundo siga diciendo «la BIOS». Una pila de botón (normalmente una CR2032) mantiene el reloj de la placa.

| Característica | BIOS (heredada) | UEFI (actual) |
|---|---|---|
| Interfaz | Texto, con teclado | Gráfica, normalmente con ratón |
| Disco de arranque | Hasta 2 TB (tabla de particiones MBR) | Sin ese límite (tabla GPT) |
| Arranque seguro (*Secure Boot*) | No disponible | Sí: comprueba las firmas del cargador y de los controladores |

### 4.8 Puertos del panel trasero

El panel trasero agrupa los conectores accesibles sin abrir el chasis: **USB** (tipo A y, cada vez más, tipo C), salidas de vídeo (**HDMI**, **DisplayPort**, que solo funcionan con la gráfica integrada de la CPU), red **RJ45** (Ethernet), audio (*jack* de 3,5 mm) y, en placas con Wi-Fi, las antenas.

## 5. Factores de forma

El factor de forma fija las dimensiones de la placa y, por tanto, qué chasis puede alojarla y cuántas ranuras de expansión caben.

| Factor de forma | Dimensiones | Ranuras de expansión | Chasis compatible |
|---|---|---|---|
| ATX | 305 × 244 mm | 4 a 7 | Torre completa, semitorre |
| microATX (mATX) | 244 × 244 mm | 2 a 4 | Semitorre, minitorre |
| Mini-ITX | 170 × 170 mm | 1 | Minitorre, SFF |

Una placa más pequeña cabe, en general, en un chasis pensado para una más grande (una Mini-ITX se puede montar en una torre completa con los tornillos adecuados), pero no al revés: una ATX no cabrá nunca en un chasis para Mini-ITX. Los fabricantes más habituales de placas son ASUS, MSI, Gigabyte y ASRock.

## 6. Del encendido al sistema operativo

Conocer el arranque es la base para diagnosticar un equipo que no arranca. Esta es la secuencia:

1. Pulsas el botón de encendido: la placa ordena a la fuente que se active y, cuando las tensiones son estables, la fuente envía la señal de «todo correcto» (*power good*).
2. La CPU empieza a ejecutar el código del firmware (UEFI o BIOS), guardado en el chip de la placa.
3. **POST** (*Power-On Self-Test*): el firmware comprueba los elementos esenciales (CPU, RAM, gráfica, teclado). Si algo falla, avisa con pitidos (*beep codes*), LED de diagnóstico o un visor de dos dígitos; los códigos dependen del fabricante y están en el manual.
4. El firmware inicializa los dispositivos y consulta el **orden de arranque** (*boot order*) para buscar un disco con un cargador.
5. Carga el **cargador de arranque** (*bootloader*; por ejemplo, Windows Boot Manager o GRUB), que a su vez carga el núcleo del sistema operativo.

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| No se enciende nada | Fuente apagada o sin corriente; conector de 24 pines mal insertado | Revisar el cable y el interruptor de la fuente, los conectores y el botón de encendido |
| Los ventiladores giran, pero no hay imagen | RAM mal insertada, gráfica o cable de vídeo | Volver a insertar la RAM (módulo por módulo), comprobar la entrada del monitor |
| Pitidos o LED de diagnóstico | El POST ha detectado un fallo | Consultar el manual: el código apunta al componente (a menudo RAM o gráfica) |
| «No bootable device» | Orden de arranque incorrecto, disco no detectado o sin sistema | Entrar en la UEFI, comprobar que el disco aparece y ajustar el orden |

:::tip[Entrar en la UEFI]
Se hace pulsando una tecla justo al encender el equipo: **Supr**, **F2**, **F10** o **F12**, según el fabricante. La pantalla inicial suele indicarla.
:::

## Comprueba lo aprendido

1. Tienes una placa Mini-ITX y un chasis de semitorre ATX. ¿Cabe? ¿Y una placa ATX en un chasis de minitorre?

   <details>
   <summary>Respuesta</summary>

   Sí a la primera: una placa más pequeña cabe en un chasis para una más grande. No a la segunda: una ATX es demasiado grande para una minitorre.

   </details>

2. Has comprado un SSD M.2 NVMe, pero la ranura M.2 de tu placa solo admite SATA. ¿Funcionará?

   <details>
   <summary>Respuesta</summary>

   No. Un NVMe necesita una ranura M.2 conectada al bus PCIe: hay que mirar en el manual qué tipo admite cada ranura antes de comprar.

   </details>

3. Quieres montar un Ryzen 7 7700 en una placa con zócalo AM4. ¿Es posible?

   <details>
   <summary>Respuesta</summary>

   No. Los Ryzen 7000 usan el zócalo AM5, distinto del AM4 (que admite de la serie 1000 a la 5000).

   </details>

4. El equipo se enciende (los ventiladores giran), el monitor no muestra nada y la placa emite pitidos cortos repetidos. ¿Cuál es el primer paso?

   <details>
   <summary>Respuesta</summary>

   Buscar el código de pitidos en el manual. A menudo apunta a la RAM o a la gráfica: apaga, desconecta, vuelve a insertar los módulos de RAM (uno cada vez) y prueba de nuevo.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| maquinari | hardware |
| programari | software |
| xassís | chasis |
| sòcol | zócalo (socket) |
| ranura | ranura (slot) |
| microprogramari | firmware |
| arrancada | arranque |
| ample de banda | ancho de banda |
| sistema encastat | sistema embebido |
| factor de forma | factor de forma |
| font d'alimentació | fuente de alimentación |
