---
title: "1.1 Planificación y organización de proyectos"
description: "Qué es un proyecto y en qué se distingue de una tarea rutinaria, cuáles son sus fases, cómo se equilibran alcance, tiempo y coste, cómo se descompone el trabajo con una EDT y cómo se reparten las tareas en un equipo pequeño."
---

Casi todos los proyectos que fracasan lo hacen por lo mismo: nadie sabía con claridad qué había que entregar, cuándo, con qué medios y quién hacía cada cosa. Planificar no es rellenar papeles; es **pensar antes de gastar** tiempo y dinero. Esta página te da el vocabulario y las herramientas básicas para organizar un proyecto pequeño, como el que harás en este módulo.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 45 minutos de lectura y 45 de práctica.

1. Lee las secciones 1 y 2 y haz la pestaña «¿Es un proyecto?» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/gantt-y-ciclos/#proyecto).
2. Lee las secciones 3 y 4 y construye una EDT en la pestaña «EDT».
3. Lee la sección 5 y pasa a la [página 1.1.1 Diagramas de Gantt](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/02-diagramas-gantt/).
:::

## 1. Qué es un proyecto

Un **proyecto** es un esfuerzo **temporal** que se emprende para crear un **producto, servicio o resultado único**. Tres palabras importan:

- **Temporal:** tiene un comienzo y un final. Cuando se alcanza el objetivo (o se decide abandonarlo), el proyecto termina.
- **Único:** el resultado es distinto de lo que se hizo antes, aunque se parezca. Instalar la red de un aula nueva se parece a instalar la de otra, pero cada aula tiene sus propias condiciones.
- **Con objetivo y recursos limitados:** hay un resultado concreto que lograr, con un presupuesto, unas personas y un plazo que no son infinitos.

Frente a esto está la **operación rutinaria** (o proceso continuo): se repite sin fecha de fin y siempre produce lo mismo. Hacer la copia de seguridad nocturna de los servidores no es un proyecto; **diseñar e implantar** el sistema de copias de una pyme sí lo es.

| | Proyecto | Operación rutinaria |
|---|---|---|
| Duración | Tiene principio y fin | Continua, sin fecha de fin |
| Resultado | Único (algo nuevo o distinto) | Repetido (lo mismo cada vez) |
| Incertidumbre | Alta: se hace por primera vez | Baja: ya se sabe cómo hacerlo |
| Forma de gestionarse | Se planifica, se ejecuta y se cierra | Se mantiene y se mejora |
| Ejemplo en Byte Alacant | Crear la web de citas de reparación | Atender el teléfono y apuntar las citas |

Una misma empresa hace ambas cosas a la vez. **Reparaciones Byte Alacant, S. L.** (empresa ficticia que ya conoces de las unidades 1 y 2) repara equipos todos los días (rutina), pero cuando decide estrenar un portal para que los clientes pidan cita por internet, eso es un proyecto. Y cuando el portal está en marcha, su mantenimiento diario vuelve a ser rutina.

:::note[Una tarea no es un proyecto]
«Instalar un antivirus en un equipo» es una **tarea**: se hace en un rato y la hace una persona. Un proyecto agrupa muchas tareas relacionadas que, juntas, producen un resultado. La frontera es difusa: si necesitas coordinar a varias personas, repartir trabajo en fechas y comprobar que todo encaja, estás ante un proyecto.
:::

## 2. Las fases de un proyecto

Aunque cada proyecto es distinto, casi todos pasan por cinco grupos de procesos o **fases**. Las nombran así las guías de dirección de proyectos más extendidas, y sirven como mapa mental.

| Fase | Qué se hace | Qué se produce |
|---|---|---|
| **1. Inicio** | Se define qué se quiere conseguir y por qué. Se identifica quién pide el proyecto y quién se verá afectado. | Una propuesta o documento de arranque con el objetivo, el responsable y las restricciones |
| **2. Planificación** | Se decide qué se va a hacer, en qué orden, quién lo hará, cuánto costará y qué puede salir mal. | El plan del proyecto: alcance, EDT, calendario, presupuesto, riesgos y reparto de roles |
| **3. Ejecución** | Se hace el trabajo del plan: se construye, se instala, se configura. | Los entregables del proyecto (el producto o servicio) |
| **4. Seguimiento y control** | Se compara lo previsto con lo real y se corrige. Va **en paralelo** a la ejecución. | Informes de avance, cambios aprobados, acciones correctoras |
| **5. Cierre** | Se entrega, se comprueba que el cliente está conforme, se documenta y se aprende de lo ocurrido. | Acta de entrega, memoria final, lecciones aprendidas |

Dos ideas para no perderte:

- Las fases **no son siempre una detrás de otra**. En un proyecto largo se planifica, se ejecuta una parte, se controla y se vuelve a planificar lo siguiente. Verás en la [página 1.2](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/03-ciclos-de-vida/) que los **ciclos de vida** de software organizan estas fases de maneras muy distintas.
- **Seguimiento y control no es una fase al final**, sino una actividad continua. Si descubres en la última semana que el proyecto lleva un mes de retraso, ya es tarde para corregirlo.

## 3. Las dimensiones del proyecto

Para planificar hay que decidir seis cosas. Todas están relacionadas: tocar una afecta a las demás.

| Dimensión | Pregunta que responde | Ejemplo en el portal de citas |
|---|---|---|
| **Alcance** | ¿Qué incluye el proyecto y qué no? | Pedir cita, recibir un aviso por correo y gestionar las citas. **No** incluye el pago en línea |
| **Tiempo** | ¿Cuándo empieza, cuándo acaba y en qué orden se hace? | 16 jornadas laborables, desde el lunes 2 de noviembre hasta el lunes 23 |
| **Coste** | ¿Cuánto dinero y cuántas horas se gastan? | Presupuesto de horas de trabajo y de licencias |
| **Calidad** | ¿Cómo sabremos que está bien hecho? | Los formularios validan los datos y no se pierde ninguna cita |
| **Riesgos** | ¿Qué puede ocurrir que nos perjudique? | Que el cliente cambie los requisitos a mitad de camino |
| **Recursos** | ¿Con qué personas, equipos y herramientas? | Dos técnicas, un servidor de pruebas y el dominio de la empresa |

### La triple restricción

Las tres primeras forman la llamada **triple restricción** (o triángulo del proyecto): **alcance, tiempo y coste**. Es un triángulo porque no puedes tirar de un lado sin que se muevan los otros. La **calidad** suele situarse en el centro: si fuerzas los tres lados, lo primero que se resiente es la calidad.

Ejemplos de cómo se compensan:

- **Si el cliente pide terminar antes**, tienes tres salidas: añadir recursos (más coste), recortar funciones (menos alcance) o aceptar menos pruebas (menos calidad, con riesgo). Las dos primeras son decisiones legítimas; la tercera suele ser una mala idea y conviene decirlo en voz alta.
- **Si se añade una función nueva** (por ejemplo, el pago en línea), el alcance crece: hay que renegociar el plazo o el presupuesto.
- **Si baja el presupuesto**, habrá que reducir el alcance o alargar el plazo.

:::caution[Añadir personas no siempre acelera]
Meter más gente en un proyecto que ya va tarde no lo acelera de forma proporcional: las nuevas personas necesitan aprender y coordinarse con las demás. Con tareas que dependen unas de otras, hay un límite a lo que se puede paralelizar. Lo verás en el diagrama de Gantt.
:::

## 4. Dividir el trabajo: la EDT

No se puede planificar lo que no se ha descompuesto. La **estructura de desglose del trabajo** (**EDT**, en inglés **WBS**, *Work Breakdown Structure*) es una descomposición **jerárquica** del trabajo del proyecto en partes cada vez más pequeñas, hasta llegar a piezas que se puedan estimar, asignar y controlar. Las piezas del nivel más bajo se llaman **paquetes de trabajo**.

Una EDT responde a «**qué** hay que hacer», no a «cuándo». El orden y las fechas llegan después, en el calendario.

```text
Portal de citas de Byte Alacant
├── 1 Análisis y diseño
│   ├── 1.1 Análisis de requisitos
│   ├── 1.2 Diseño de la base de datos
│   └── 1.3 Maquetas de la interfaz
├── 2 Desarrollo
│   ├── 2.1 Servidor y formulario de citas
│   ├── 2.2 Interfaz de cliente
│   └── 2.3 Integración
└── 3 Pruebas, documentación y entrega
    ├── 3.1 Pruebas
    ├── 3.2 Manual de usuario
    └── 3.3 Despliegue y entrega
```

Esta EDT tiene tres ramas y nueve paquetes de trabajo; es la del ejemplo del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/gantt-y-ciclos/#edt). Observa que incluye las pruebas y la documentación, no solo la construcción.

### Reglas para construir una buena EDT

1. **Regla del 100 %:** el conjunto de las partes hijas debe abarcar **todo** el trabajo del padre, y ni una pizca más. Si falta algo, no se planificará; si sobra, se gastará tiempo en lo que no se pidió.
2. **Sin solapes:** un mismo trabajo no debe aparecer en dos ramas.
3. **Pensar en entregables:** nombra los elementos como resultados («Manual de usuario») o como acciones concretas («Diseñar la base de datos»), no con palabras vagas («Varios»).
4. **Tamaño adecuado:** un paquete de trabajo debe poder **estimarse y asignarse** a una persona o a una pareja. No hay un tamaño universal; en un proyecto de clase, un paquete de una o dos jornadas suele ser razonable. Si no sabes cuánto tarda, probablemente haya que descomponerlo más.
5. **Numerar** cada nivel (1, 1.1, 1.2…) para poder referirse a cada pieza sin ambigüedad.
6. Incluye también el trabajo de **gestión** (reuniones, documentación, seguimiento) y de **calidad** (pruebas): es trabajo real que consume horas.

Cada paquete de trabajo se convertirá en una o varias **tareas** del calendario, con duración, responsable y dependencias. El paso de la EDT a la lista de tareas es el puente entre «qué» y «cuándo».

## 5. Organizar al equipo

En un proyecto de dos a cuatro personas no hace falta una jerarquía, pero sí **que todo el mundo sepa qué se espera de él**. Tres ideas prácticas.

### Roles

Un **rol** es un conjunto de responsabilidades. En un equipo pequeño una persona suele llevar varios, y los roles pueden rotar entre proyectos:

| Rol | Responsabilidad principal |
|---|---|
| **Coordinación del proyecto** | Mantener el plan al día, convocar reuniones, vigilar los plazos y avisar de los problemas |
| **Contacto con el cliente** | Recoger lo que pide, aclarar dudas y presentar los avances |
| **Desarrollo o implantación** | Construir, instalar y configurar lo que se entrega |
| **Calidad y pruebas** | Comprobar que lo entregado cumple lo acordado |
| **Documentación** | Redactar y mantener manuales, actas y la memoria |

:::note[Coordinar no es mandar]
La persona que coordina no decide sola ni hace menos trabajo técnico: se encarga de que el equipo se entienda. Los problemas de un equipo pequeño casi siempre son de comunicación, no de técnica.
:::

### Reparto de tareas

Cada tarea debe tener **un responsable claro**. Si algo es «de todos», en la práctica no es de nadie. Una herramienta sencilla para registrar quién hace qué es la **matriz RACI**, que usa cuatro letras:

- **R** (*Responsible*): quien hace el trabajo.
- **A** (*Accountable*): quien responde del resultado y da el visto bueno. Solo una persona por tarea.
- **C** (*Consulted*): a quien se consulta antes de decidir.
- **I** (*Informed*): a quien se avisa cuando está hecho.

| Tarea | Aitana | Bruno | Carla |
|---|---|---|---|
| Requisitos con el cliente | A/R | C | I |
| Diseño de la base de datos | C | A/R | I |
| Pruebas | I | C | A/R |
| Manual de usuario | R | I | A |

(Aitana, Bruno y Carla son un equipo de ejemplo.)

### Reglas de funcionamiento

Un equipo que se organiza bien deja por escrito, desde el principio, unos **acuerdos de trabajo**: cuándo se reúne, cómo se avisa de un retraso, dónde se guardan los archivos y qué significa que una tarea esté «terminada». Lo harás con herramientas colaborativas en la segunda parte de esta unidad.

## Qué debes llevarte

Un proyecto pequeño bien organizado empieza con **cuatro papeles**: un objetivo claro, un alcance escrito, una EDT y una lista de tareas con responsables. En la siguiente página pondrás esas tareas en el tiempo con un diagrama de Gantt.

## Comprueba lo aprendido

1. ¿Cuáles de estas actividades son proyectos y cuáles operaciones rutinarias? (a) Revisar cada mañana el estado de las copias de seguridad. (b) Migrar el correo de una pyme a un servicio nuevo. (c) Cambiar un tóner.

   <details>
   <summary>Respuesta</summary>

   (b) es un proyecto: tiene principio y fin y un resultado concreto y único. (a) y (c) son operaciones rutinarias: se repiten y no tienen fecha de fin ni un resultado nuevo cada vez.
   </details>

2. En el portal de citas, el cliente pide ahora añadir el pago en línea sin mover la fecha de entrega ni el presupuesto. ¿Qué dice la triple restricción?

   <details>
   <summary>Respuesta</summary>

   Que no se puede aumentar el alcance sin que algo ceda: habrá que ampliar el plazo, el presupuesto o ambos, o recortar otras funciones. Si se acepta sin más, lo que se resentirá será la calidad. Lo correcto es renegociar y dejarlo por escrito.
   </details>

3. Una EDT tiene un paquete «Desarrollo» con las hijas «Servidor» e «Interfaz». El trabajo de «Integración» no aparece. ¿Qué regla incumple?

   <details>
   <summary>Respuesta</summary>

   La regla del 100 %: las hijas no abarcan todo el trabajo del padre. Falta «Integración», y lo que no está en la EDT no se planifica ni se presupuesta.
   </details>

4. ¿Por qué «seguimiento y control» no es una fase que se haga al final?

   <details>
   <summary>Respuesta</summary>

   Porque su función es comparar lo previsto con lo real **mientras se ejecuta** el trabajo, para corregir a tiempo. Si se hace al final, los problemas ya no tienen arreglo barato.
   </details>

5. En una matriz RACI, ¿cuántas personas pueden ser «A» (Accountable) de una misma tarea?

   <details>
   <summary>Respuesta</summary>

   Solo una. Quien responde del resultado debe ser una persona concreta; si hay dos, nadie decide.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Proyecto** | Esfuerzo temporal para crear un producto, servicio o resultado único |
| **Operación rutinaria** | Actividad repetitiva y continua, sin fecha de fin |
| **Fase** | Etapa del proyecto: inicio, planificación, ejecución, seguimiento y control, cierre |
| **Alcance** | Conjunto de lo que el proyecto incluye (y, por tanto, de lo que no incluye) |
| **Triple restricción** | Relación entre alcance, tiempo y coste, con la calidad en el centro |
| **EDT / WBS** | Estructura de desglose del trabajo: descomposición jerárquica del trabajo en partes más pequeñas |
| **Paquete de trabajo** | Pieza del nivel más bajo de la EDT, que se puede estimar y asignar |
| **Entregable** | Resultado concreto y comprobable que produce el proyecto |
| **Rol** | Conjunto de responsabilidades que asume una persona en el equipo |
| **Matriz RACI** | Tabla que indica, para cada tarea, quién la hace, quién responde, a quién se consulta y a quién se informa |
