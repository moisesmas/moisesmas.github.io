---
title: "3.1 Requisitos y Product Backlog"
description: "Cómo se recogen los requisitos de un proyecto, cómo se convierten en un Product Backlog ordenado y refinado, y cómo se escriben criterios de aceptación y las definiciones de Preparado y de Hecho."
---

Un proyecto empieza a torcerse el día en que alguien dice «ya sabemos lo que hay que hacer» y nadie lo ha escrito. Los **requisitos** son lo que el cliente necesita que haga el producto; el **Product Backlog** es la lista viva y ordenada donde el equipo los guarda. Esta página enseña a escribirla, ordenarla y cuidarla, que es el primer documento de cualquier proyecto ágil.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 1 hora de práctica.

1. Lee las secciones 1 a 3.
2. Abre la pestaña «Product Backlog» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#backlog) y ordena el backlog de ejemplo.
3. Lee las secciones 4 y 5 y haz el reto 1 de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-documentacion/).
:::

Para esta unidad usaremos un caso ficticio: **Reparaciones Byte Alacant, S. L.** quiere un **portal de incidencias** donde sus clientes (pequeñas empresas) avisen de una avería y vean cómo va su reparación. Tú eres el equipo que lo construye.

## 1. Qué es un requisito

Un **requisito** es una condición o capacidad que el producto debe tener para que el cliente lo dé por bueno. Se reparten en dos grandes familias:

| Tipo | Responde a… | Ejemplo en el portal de incidencias |
|---|---|---|
| **Funcional** | ¿Qué hace el sistema? | Un cliente puede abrir una incidencia indicando equipo, descripción y urgencia |
| **No funcional** | ¿Cómo lo hace? (calidad, límites) | La página de consulta de una incidencia carga en menos de 3 segundos |

Los requisitos no funcionales se olvidan con facilidad y luego son los que más discusiones provocan. Una lista de comprobación útil para encontrarlos:

| Categoría | Pregunta | Ejemplo |
|---|---|---|
| Rendimiento | ¿Cuánta gente a la vez, con qué rapidez? | Soporta 30 usuarios simultáneos |
| Seguridad | ¿Quién puede ver o cambiar qué? | Cada cliente solo ve sus incidencias |
| Usabilidad y accesibilidad | ¿Quién lo usará y cómo? | Se puede usar con teclado y desde el móvil |
| Disponibilidad | ¿Cuándo debe funcionar? | Disponible en horario laboral, de lunes a viernes |
| Protección de datos | ¿Qué datos personales se guardan? | Solo se guardan nombre, teléfono y correo de contacto |
| Mantenimiento | ¿Quién lo cambiará en el futuro? | El código está documentado y en un repositorio |

:::note[Requisito frente a solución]
Un buen requisito dice **qué** hace falta, no **cómo** se hará. «El cliente recibe un aviso cuando cambia el estado» es un requisito; «se enviará un correo con tal librería» es una decisión de diseño que se toma después.
:::

### Cómo se recogen

Los requisitos no están en un cajón esperando: se **descubren** hablando con las personas implicadas. Técnicas sencillas y suficientes en un proyecto de clase:

- **Entrevista** con el cliente o con quien usará el producto, con preguntas abiertas («cuéntame cómo avisas hoy de una avería»).
- **Observación** de cómo se hace la tarea ahora (por teléfono, en una hoja de cálculo…).
- **Cuestionario** corto cuando hay muchas personas que consultar.
- **Análisis de documentos existentes**: formularios, correos u hojas de cálculo que ya usan.
- **Prototipo en papel**: un dibujo de pantalla provoca más correcciones que diez frases.

Anota la **fuente** de cada requisito (quién lo pidió): cuando haya un conflicto, sabrás con quién hablar.

## 2. De los requisitos al Product Backlog

La Guía de Scrum define el **Product Backlog** como una lista ordenada y emergente de lo que se necesita para mejorar el producto; es la única fuente de trabajo del equipo. Tiene un objetivo asociado, el **Product Goal** (objetivo del producto): el estado futuro que el equipo debe alcanzar. Para el portal podría ser: «Que ningún cliente tenga que llamar para saber cómo va su reparación».

Cada elemento del backlog (un **PBI**, *Product Backlog Item*) puede ser una historia de usuario, una tarea técnica, una mejora o la corrección de un fallo. Las historias de usuario tienen su propia página en esta unidad (véase 1.3.5 Historias de usuario).

### Qué lleva cada elemento

| Campo | Para qué sirve | Ejemplo |
|---|---|---|
| **Identificador** | Referirse a él sin ambigüedad | PB-07 |
| **Título** | Entender de qué va de un vistazo | Consultar el estado de una incidencia |
| **Descripción** | El requisito, en lenguaje del cliente | Como cliente, quiero ver el estado de mi incidencia para no tener que llamar |
| **Prioridad** | Decidir qué va antes | Must |
| **Estimación** | Prever el esfuerzo (véase 1.3.6 Estimación en proyectos ágiles) | 5 puntos |
| **Criterios de aceptación** | Saber cuándo está terminado | Se muestran los estados Recibida, En reparación y Lista |

Las herramientas de gestión (véase 2.1 Herramientas de gestión de proyectos) añaden otros campos, como responsable, etiquetas o fecha, pero con los de arriba ya tienes un backlog útil.

### Un backlog vivo, no un contrato

El backlog **nunca está terminado**: crece cuando aparecen necesidades, se acorta cuando se descubre que algo ya no hace falta y se reordena cuando cambian las circunstancias. Lo mantiene el **Product Owner** (en el proyecto de clase, una persona del equipo con ese rol o tu profesor haciendo de cliente). Los elementos de arriba están claros y son pequeños; los de abajo son vagos, y está bien: se detallan cuando se acercan.

## 3. Priorizar: qué va primero

No se puede hacer todo a la vez y el tiempo del proyecto es limitado. Priorizar es **decidir con un criterio** qué entra antes. Dos métodos sencillos y complementarios:

### MoSCoW

Clasifica cada elemento en una de cuatro categorías:

| Categoría | Significado | Prueba de fuego |
|---|---|---|
| **Must** (debe) | Sin esto el producto no sirve | Si falta, la entrega fracasa |
| **Should** (debería) | Importante, pero hay alternativa provisional | Duele, pero se puede entregar sin ello |
| **Could** (podría) | Deseable | Mejora la experiencia si hay tiempo |
| **Won't** (no ahora) | Acordado que no se hará **en esta entrega** | Se anota para el futuro |

Al clasificar, la tentación es poner todo en Must. Una regla práctica: si más de la mitad de los elementos son Must, la clasificación no está ayudando.

### Valor frente a esfuerzo

Se puntúa cada elemento por el **valor** que aporta al cliente y por el **esfuerzo** que cuesta (por ejemplo, de 1 a 5). Los que dan mucho valor con poco esfuerzo van primero; los de poco valor y mucho esfuerzo, los últimos.

| Valor | Esfuerzo | Qué hacer |
|---|---|---|
| Alto | Bajo | Hazlo ya («victoria rápida») |
| Alto | Alto | Planifícalo y trocéalo |
| Bajo | Bajo | Hazlo si sobra tiempo |
| Bajo | Alto | Descártalo o aplázalo |

Una manera práctica de ordenar es calcular la razón valor/esfuerzo y usarla para desempatar dentro de cada categoría MoSCoW. En el laboratorio la verás calculada sobre el backlog de ejemplo.

:::caution[Priorizar no es votar lo que más gusta]
El criterio lo define el objetivo del producto, no la comodidad del equipo. Si nadie sabe por qué un elemento está arriba, la lista no está bien ordenada.
:::

## 4. Refinamiento y criterios de aceptación

El **refinamiento** del backlog es la actividad de añadir detalle, estimar y ordenar los elementos para que, cuando lleguen a una planificación, el equipo los entienda. La Guía de Scrum lo describe como una actividad continua y no como un evento fijo. En la práctica, el equipo dedica un rato cada semana a:

1. Leer los elementos que van a entrar pronto.
2. **Trocear** los demasiado grandes («gestionar clientes» pasa a ser alta, edición y baja).
3. Resolver dudas con el Product Owner.
4. Escribir los **criterios de aceptación**.
5. Estimar.

### Criterios de aceptación

Son las condiciones, comprobables, que debe cumplir un elemento para que el cliente lo acepte. Funcionan como una mini-prueba: o se cumplen o no. Un formato muy usado es **Dado / Cuando / Entonces**:

```text
PB-07  Consultar el estado de una incidencia

Dado que soy un cliente con una incidencia abierta
Cuando entro en "Mis incidencias" y pulso sobre ella
Entonces veo su estado actual y la fecha del último cambio

Dado que soy un cliente
Cuando intento abrir la incidencia de otra empresa
Entonces el sistema me lo impide y no muestra ningún dato
```

Un criterio bien escrito es **concreto** («se muestra el estado»), **verificable** (alguien puede decir sí o no) y **sin ambigüedad** (nada de «rápido» o «fácil» sin una cifra). Más adelante, estos criterios se convertirán en casos de prueba (véase la página 3.3 Documentación técnica).

## 5. Definición de Preparado y Definición de Hecho

Dos listas de comprobación mantienen la calidad del flujo de trabajo.

| | Definición de Preparado (*Definition of Ready*) | Definición de Hecho (*Definition of Done*) |
|---|---|---|
| **Pregunta** | ¿Podemos empezar a trabajar en este elemento? | ¿Podemos darlo por terminado? |
| **Se aplica** | A la entrada del trabajo | A la salida del trabajo |
| **Ejemplo** | Tiene descripción clara, criterios de aceptación, estimación y cabe en un sprint | Cumple los criterios, está probado, el código está en el repositorio y la documentación afectada está actualizada |

La **Definición de Hecho** es un compromiso formal del equipo en Scrum: un elemento que no la cumple no forma parte del incremento y no puede presentarse como terminado. La **Definición de Preparado** no aparece en la Guía de Scrum 2020, pero muchos equipos la usan como práctica de apoyo. Ambas se acuerdan entre todo el equipo, se escriben y se revisan cuando haga falta.

:::tip[Punto de partida para el proyecto de clase]
Empieza con esta Definición de Hecho y adáptala:
- Cumple todos sus criterios de aceptación.
- Ha sido probado por alguien distinto de quien lo hizo.
- El trabajo está guardado en el repositorio.
- Está documentado lo que un usuario o un compañero necesitaría saber.
- El Product Owner lo ha visto funcionar.
:::

### Plantilla de backlog para el proyecto de clase

Una tabla como esta basta para empezar. El laboratorio la implementa de forma interactiva y puede exportarla a Markdown:

| ID | Título | Tipo | Prioridad | Valor | Esfuerzo | Criterios de aceptación | Estado |
|---|---|---|---|---|---|---|---|
| PB-01 | Abrir una incidencia | Funcional | Must | 5 | 3 | Dado/Cuando/Entonces… | Por hacer |
| PB-02 | Ver estado | Funcional | Must | 5 | 2 | … | Por hacer |
| PB-03 | Avisar por correo | Funcional | Should | 3 | 3 | … | Por hacer |
| PB-04 | Respuesta en menos de 3 s | No funcional | Should | 3 | 2 | … | Por hacer |

## Comprueba lo aprendido

1. Clasifica como funcional o no funcional: «el sistema envía un resumen semanal al responsable» y «el sistema solo guarda los datos personales imprescindibles».

   <details><summary>Respuesta</summary>

   El primero es **funcional** (algo que el sistema hace). El segundo es **no funcional** (una restricción de protección de datos sobre cómo trata la información).
   </details>

2. ¿Qué significa que un elemento sea «Won't» en MoSCoW?

   <details><summary>Respuesta</summary>

   Que se ha acordado **no hacerlo en esta entrega**. No es «nunca»: queda anotado para una entrega futura, y así se evita que vuelva a discutirse.
   </details>

3. ¿Por qué «la web debe ser rápida» no es un buen criterio de aceptación? Reescríbelo.

   <details><summary>Respuesta</summary>

   Porque no se puede verificar: «rápida» no tiene medida. Una versión mejor: «la página de consulta de incidencias se muestra en menos de 3 segundos con 30 usuarios conectados».
   </details>

4. ¿En qué se diferencian la Definición de Preparado y la de Hecho?

   <details><summary>Respuesta</summary>

   La de **Preparado** se comprueba **antes** de empezar un elemento (¿está suficientemente claro?). La de **Hecho** se comprueba **al terminar** (¿cumple la calidad pactada?). La de Hecho es un compromiso de Scrum; la de Preparado es una práctica opcional de apoyo.
   </details>

5. Un elemento tiene valor 2 y esfuerzo 5. ¿Cómo lo tratarías?

   <details><summary>Respuesta</summary>

   Es de poco valor y mucho esfuerzo: lo normal es dejarlo para el final, trocearlo o descartarlo, salvo que sea obligatorio por otra razón (por ejemplo, legal).
   </details>

## Glosario

| Término | Definición |
|---|---|
| Requisito | Condición o capacidad que el producto debe cumplir para satisfacer una necesidad |
| Requisito funcional | Lo que el sistema hace |
| Requisito no funcional | Cualidad o restricción: rendimiento, seguridad, usabilidad… |
| Product Backlog | Lista ordenada y viva de todo lo que se necesita para mejorar el producto |
| Product Goal | Objetivo del producto: el estado futuro que el equipo quiere alcanzar |
| PBI | Elemento del Product Backlog (*Product Backlog Item*) |
| MoSCoW | Método de priorización en Must, Should, Could y Won't |
| Refinamiento | Actividad continua de detallar, estimar y ordenar los elementos del backlog |
| Criterio de aceptación | Condición verificable que debe cumplirse para aceptar un elemento |
| Definición de Preparado | Lista de condiciones para empezar a trabajar un elemento |
| Definición de Hecho | Compromiso de calidad que debe cumplir un elemento para darse por terminado |
