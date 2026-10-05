---
title: "1. El sistema informático"
description: "Los cuatro elementos de un sistema informático, su hardware básico, los tipos de software y los principales tipos de ordenadores."
---

Antes de instalar o administrar un sistema operativo, necesitas saber sobre qué funciona y con qué trabaja. En esta página aprenderás el vocabulario que usa el resto del módulo: sistema, hardware, software, firmware y los distintos tipos de ordenadores.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 4 (unos 40 minutos).
2. Practica con el laboratorio [Explorador del sistema](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/?lang=es#parts): las pestañas **Partes del sistema**, **Dentro de la caja**, **Tipos de software** y **El ordenador adecuado** corresponden a los apartados 1 a 4.
3. Responde a las preguntas del final y haz las [actividades 1, 2 y 3](/docencia/smr/som/ud01-introduccion/actividades/es/).
:::

## 1. ¿Qué es un sistema informático?

Un **sistema** es un conjunto de partes relacionadas que trabajan juntas con un fin. Una bicicleta es un sistema y el cuerpo humano también. Un **sistema informático** es un conjunto de elementos que trabajan juntos para convertir **datos** en bruto en **información** útil.

Un sistema informático tiene cuatro elementos básicos:

| Elemento | Qué es | Ejemplos |
|---|---|---|
| **Hardware** | Las partes físicas, las que se pueden tocar. | Procesador, memoria, disco, pantalla, teclado, cables |
| **Software** | Los programas e instrucciones que dicen al hardware qué hacer. | Sistema operativo, navegador web, juegos, controladores |
| **Datos** | Los símbolos que el sistema almacena y procesa. Se convierten en *información* cuando tienen contexto y significado. | Fotos, documentos, una lista de temperaturas, una base de datos |
| **Usuarios** | Las personas que usan, instalan, configuran y mantienen el sistema. | Una estudiante, un técnico, una administradora |

Muchos autores añaden un quinto elemento: los **procedimientos**, las reglas para usar el sistema (política de copias de seguridad, normas de acceso, calendario de actualizaciones).

Piensa en una biblioteca de un centro educativo. El edificio, las estanterías y el lector de códigos de barras son el hardware. Las normas de préstamo y el programa del catálogo son el software. La lista de libros y préstamos son los datos. El alumnado y los bibliotecarios son los usuarios. Si falla una parte (un lector estropeado, un error en el programa, datos incorrectos, un usuario que no conoce las normas), todo el servicio se resiente.

### 1.1 Qué hace un sistema informático

Todos los sistemas informáticos realizan cinco funciones básicas:

1. **Entrada.** Reciben datos u órdenes (teclado, pantalla táctil, micrófono, sensores, red).
2. **Procesamiento.** El procesador ejecuta instrucciones para transformar los datos.
3. **Almacenamiento.** Guardan datos para después, en la memoria (a corto plazo) y en discos (a largo plazo).
4. **Salida.** Muestran los resultados (pantalla, impresora, altavoces, red).
5. **Control.** Cada paso es una secuencia de instrucciones que el procesador busca, decodifica y ejecuta, coordinada por el sistema operativo.

Ejemplo: haces una foto con el móvil y se la mandas a un amigo. El sensor de la cámara capta la imagen (entrada). El móvil la procesa y la comprime (procesamiento). La foto se guarda en el almacenamiento (almacenamiento). La pantalla muestra una vista previa (salida) y la red la envía (salida). El sistema operativo coordina todo esto mientras tú decides qué hacer (usuario).

## 2. Hardware y componentes básicos

El **hardware** es toda parte física del sistema informático. Dentro de un PC típico encuentras estos componentes:

| Componente | Qué hace | Notas |
|---|---|---|
| **Caja** (chasis) | Sujeta y protege las piezas y dirige el flujo de aire. | Distintos tamaños: torre, minitorre, formato reducido |
| **Placa base** | Conecta todas las demás piezas y permite que se comuniquen. | Decide qué procesador, memoria y tarjetas puedes instalar |
| **CPU** (procesador) | Ejecuta las instrucciones de los programas y controla las demás piezas. | Se mide en núcleos y GHz |
| **Disipador y ventilador** | Alejan el calor de la CPU. | Sin refrigeración la CPU se ralentiza o se apaga |
| **RAM** (memoria principal) | Guarda los programas y datos que se usan ahora. | **Volátil**: pierde su contenido sin corriente |
| **Almacenamiento** (SSD o HDD) | Guarda el sistema operativo, los programas y los archivos. | **No volátil**: conserva los datos sin corriente |
| **Tarjeta gráfica** (GPU) | Crea la imagen que ves en la pantalla. | Puede estar integrada en la CPU o ser una tarjeta aparte |
| **Fuente de alimentación** (PSU) | Convierte la electricidad de la red en las tensiones bajas que necesitan las piezas. | Se mide en vatios |
| **Tarjetas de expansión** | Añaden funciones: red, sonido, TV, captura. | Muchas ya vienen integradas en la placa base |

Dos ideas aparecen todo el tiempo en este módulo:

- **RAM frente a almacenamiento.** La RAM es rápida y temporal: es la mesa de trabajo. El almacenamiento es más lento y permanente: es el archivo. Cuando abres un programa, el sistema operativo lo copia del almacenamiento a la RAM.
- **SSD frente a HDD.** Un SSD guarda los datos en chips de memoria flash y no tiene piezas móviles. Un HDD los guarda en platos magnéticos que giran. El SSD es más rápido y silencioso, y el HDD suele dar más capacidad por menos dinero.

### 2.1 Periféricos

Los **periféricos** son los dispositivos que conectas al ordenador para comunicarte con él o para guardar información. Los clasificamos según la dirección de los datos:

| Tipo | Función | Ejemplos |
|---|---|---|
| **Entrada** | Envían datos al ordenador. | Teclado, ratón, webcam, micrófono, escáner |
| **Salida** | Muestran o reproducen información. | Monitor, impresora, altavoces, auriculares |
| **Entrada y salida** | Hacen las dos cosas. | Pantalla táctil, auriculares con micrófono |
| **Almacenamiento** | Guardan datos (dentro o fuera de la caja). | Disco externo, memoria USB, tarjeta de memoria |
| **Comunicación** | Conectan ordenadores entre sí o con otros dispositivos. | Tarjeta de red, adaptador Wi-Fi, adaptador Bluetooth |

La mayoría de los periféricos necesita un pequeño programa llamado **controlador** (*driver*). El controlador explica al sistema operativo cómo hablar con ese dispositivo concreto.

## 3. Software

El **software** es el conjunto de programas, bibliotecas e instrucciones que dicen al hardware qué hacer. Sin software el hardware no sirve de nada, y sin hardware adecuado el software no puede ejecutarse. El software no son datos: los datos son aquello *con lo que* trabajan los programas, el software es lo que *trabaja* sobre los datos.

### 3.1 Tipos de software

| Tipo | Qué es | Ejemplos |
|---|---|---|
| **Software de sistema** | Software que el ordenador necesita para funcionar. Oculta al usuario los detalles del hardware. | Sistema operativo, controladores, utilidades del sistema |
| **Software de aplicación** | Programas para una tarea concreta que quiere hacer el usuario. | Suite ofimática, navegador, juegos, editor de vídeo |
| **Software de programación** | Herramientas que ayudan a los programadores a crear programas. | Compilador, intérprete, editor de código, depurador |
| **Firmware** | Software de bajo nivel guardado en una memoria no volátil dentro de un dispositivo. Controla los circuitos de ese dispositivo. | La UEFI (o BIOS) de un PC, el software de un router, de un televisor o de una lavadora |

Las aplicaciones no pueden funcionar sin software de sistema: una hoja de cálculo necesita un sistema operativo para usar la memoria, el disco y la pantalla.

:::note[Firmware: software dentro del hardware]
El firmware vive en un chip (normalmente de memoria flash) soldado al dispositivo. Es el primer software que se ejecuta al encender un PC: el firmware UEFI comprueba el hardware y después arranca el sistema operativo. Las impresoras, los ratones, las memorias USB, las cámaras y los televisores inteligentes también tienen firmware. Se puede actualizar, pero muy de vez en cuando, por ejemplo para corregir un error o añadir una función.
:::

### 3.2 Lenguajes de programación: ¿compilador o intérprete?

Un procesador solo entiende el **lenguaje máquina**: instrucciones hechas de unos y ceros que dependen del tipo de procesador. Los programadores prefieren lenguajes más fáciles de leer, así que sus programas deben traducirse.

- Los **lenguajes de bajo nivel** están cerca del hardware. El lenguaje máquina es el lenguaje real de la CPU. El **ensamblador** usa nombres cortos para cada instrucción máquina (una instrucción en ensamblador es una instrucción máquina).
- Los **lenguajes de alto nivel** se parecen más al lenguaje humano y no dependen de un procesador concreto. Algunos ejemplos son Python, Java, C y JavaScript.

Un programa de alto nivel se traduce a lenguaje máquina de una de estas dos formas:

| | Compilador | Intérprete |
|---|---|---|
| Cómo funciona | Traduce **todo** el programa antes de ejecutarlo y crea un archivo ejecutable. | Lee y ejecuta el programa **una instrucción cada vez**. |
| Errores | Los errores de sintaxis se encuentran antes de que empiece el programa. | El programa se ejecuta hasta que llega al error. |
| Velocidad | El archivo ejecutable suele funcionar rápido. | Suele ser más lento, porque traduce mientras se ejecuta. |
| Ejemplos típicos | C, C++ | Python, JavaScript (muchos lenguajes mezclan ambas ideas) |

La pestaña **Tipos de software** del laboratorio tiene un pequeño simulador que compila e interpreta el mismo programa, para que veas la diferencia cuando hay un error.

## 4. Tipos de ordenadores

Podemos clasificar los ordenadores por su uso y por sus características.

**Por su uso:** un ordenador de *propósito general* puede ejecutar muchos programas distintos (un PC). Un ordenador de *propósito específico* está construido para una tarea o unas pocas (un robot industrial).

**Por sus características:**

| Tipo | Uso típico | Características principales |
|---|---|---|
| **Superordenador** | Predicción del tiempo, simulación científica, entrenamiento de grandes modelos de IA | Miles o millones de núcleos de procesador trabajando en paralelo; coste y consumo de energía muy altos. Su rendimiento se mide en FLOPS. Casi todos funcionan con Linux. |
| **Mainframe** (ordenador central) | Bancos, seguros, administración: enormes cantidades de transacciones | Construido para ser fiable y mover muchos datos; muchos menos procesadores que un superordenador; muy caro. |
| **Servidor** | Sitios web, bases de datos, servicios de archivos e impresión, virtualización | Da servicio a otros ordenadores (clientes) a través de una red; funciona 24/7; tiene redundancia (discos en RAID, dos fuentes de alimentación); suele montarse en un armario rack. |
| **Ordenador personal (PC)** | Estudio, ofimática, internet, multimedia | Propósito general y bajo coste. Sobremesa, portátiles, tabletas y dispositivos 2 en 1. |
| **Estación de trabajo** | CAD, modelado 3D, edición de vídeo, ciencia de datos | Un PC potente: muchos núcleos, mucha RAM (a menudo ECC), SSD rápido, tarjeta gráfica profesional. |
| **Sistema empotrado** | Coches, electrodomésticos, equipos médicos, sensores, routers | Un ordenador pequeño dentro de un producto mayor que hace una tarea fija, a menudo con firmware o con un SO de tiempo real. Recursos limitados. |

### 4.1 ¿Superordenador o mainframe?

Suenan parecido, pero resuelven problemas distintos:

- Un **superordenador** está optimizado para *cálculos muy complejos* (ciencia, ingeniería, investigación militar). Tiene muchos miles de procesadores trabajando en paralelo y es difícil de programar.
- Un **mainframe** está optimizado para *un enorme volumen de operaciones sencillas* (pagos, reservas) que nunca deben detenerse. Sus valores clave son la fiabilidad, la seguridad y el funcionamiento continuo.

:::caution[Las categorías no son rígidas]
La computación en la nube, la virtualización y los diseños de sistema en un chip (SoC) difuminan las fronteras. Un «servidor» puede ser una máquina virtual en un centro de datos, y tu móvil es un PC con otra forma. Usa las categorías para entender los requisitos de cada sistema, no como cajas estrictas.
:::

## Comprueba lo aprendido

1. Un amigo dice: «He cambiado mi portátil con Windows por un MacBook». ¿Qué ha cambiado más, el hardware o el software? Explícalo.

   <details>
   <summary>Respuesta</summary>

   Han cambiado los dos, porque un portátil es hardware y el sistema operativo es software. El procesador, la memoria, la pantalla y la carcasa son distintos (hardware), y el sistema operativo y la mayoría de las aplicaciones también (software).

   </details>

2. Clasifica estos dispositivos como entrada, salida, entrada y salida, almacenamiento o comunicación: escáner, proyector, pantalla táctil, memoria USB, adaptador Wi-Fi.

   <details>
   <summary>Respuesta</summary>

   Escáner: entrada. Proyector: salida. Pantalla táctil: entrada y salida. Memoria USB: almacenamiento. Adaptador Wi-Fi: comunicación.

   </details>

3. ¿Qué diferencia hay entre la RAM y un SSD? Da una semejanza y dos diferencias.

   <details>
   <summary>Respuesta</summary>

   Semejanza: los dos guardan datos. Diferencias: la RAM es volátil (pierde los datos sin corriente) y el SSD no; la RAM es mucho más rápida pero más pequeña y más cara por gigabyte, y solo guarda lo que se usa ahora, mientras que el SSD conserva los archivos durante mucho tiempo.

   </details>

4. ¿Qué tipo de software es la UEFI de un PC y dónde se guarda?

   <details>
   <summary>Respuesta</summary>

   Es firmware. Se guarda en un chip de memoria flash no volátil de la placa base.

   </details>

5. Un hospital necesita un ordenador para la unidad de control de un escáner TC, un banco necesita uno para millones de pagos con tarjeta y un centro educativo necesita uno para su web interna. ¿Qué tipo de ordenador encaja mejor en cada caso?

   <details>
   <summary>Respuesta</summary>

   La unidad de control del escáner TC es un sistema empotrado. El procesamiento de pagos del banco encaja con un mainframe. La web del centro encaja con un servidor.

   </details>

## Glosario

| English | Castellano |
|---|---|
| computer system | sistema informático |
| hardware | hardware, componentes físicos |
| software | software, programas |
| firmware | firmware, programa residente en el dispositivo |
| data / information | datos / información |
| user | usuario |
| motherboard | placa base |
| processor (CPU) | procesador (CPU) |
| RAM (main memory) | memoria RAM (memoria principal) |
| volatile / non-volatile | volátil / no volátil |
| storage | almacenamiento |
| peripheral | periférico |
| driver | controlador |
| compiler / interpreter | compilador / intérprete |
| supercomputer | superordenador |
| mainframe | ordenador central, mainframe |
| server | servidor |
| workstation | estación de trabajo |
| embedded system | sistema empotrado |

:::note[Créditos]
Esta página adapta los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia CC BY-NC-SA 4.0. Esta página se comparte con la misma licencia.
:::
