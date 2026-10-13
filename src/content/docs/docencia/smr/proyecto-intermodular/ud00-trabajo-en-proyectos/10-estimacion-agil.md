---
title: "1.3.6 Estimación en proyectos ágiles"
description: "Cómo estimar el tamaño del trabajo en equipos ágiles: puntos de historia, serie de Fibonacci, planning poker, velocidad, proyección de sprints y riesgos de usar mal las estimaciones."
---

«¿Cuánto tardáis en tenerlo?» es la pregunta que más se repite en un proyecto y la más difícil de contestar bien. Estimar es predecir con información incompleta, y las personas somos malas prediciendo cuántas horas nos llevará algo que no hemos hecho nunca. El mundo ágil propone un truco: en lugar de adivinar **horas**, comparar **tamaños** entre tareas y dejar que los datos reales del equipo (la **velocidad**) conviertan esos tamaños en plazos.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 35 minutos de lectura y 30 de práctica.

1. Lee las secciones 1 a 3 (puntos y planning poker).
2. Juega en la pestaña «Estimación» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#estimacion): vota, compara y calcula cuántos sprints necesitas.
3. Lee las secciones 4 a 6 y haz el *Ejercicio Historias de usuario* de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-agil/), que incluye estimar.
:::

## 1. Por qué estimar de forma relativa

Hay tareas que cualquiera puede comparar de un vistazo aunque no sepa cuánto tardan en horas. ¿Qué es mayor: reparar un cable roto o reinstalar un servidor? Sin saber las horas exactas, estás seguro de que lo segundo es mayor. Las personas somos mucho mejores **comparando** que midiendo.

Eso es la **estimación relativa**: en lugar de decir «esta tarea son 6 horas», decimos «esta tarea es el doble de grande que aquella». Presenta varias ventajas:

- Es **más rápida**: no se discute durante media hora si son 5 o 6 horas.
- Es **menos sensible a quién la hace**: una persona experta y una novata tardan distinto en horas, pero coinciden mejor en qué es más complicado.
- Refleja la **incertidumbre**: si algo es grande y difuso, su estimación es aproximada y se nota.

## 2. Puntos de historia

Un **punto de historia** (*story point*) es una unidad **abstracta** que mide el tamaño de una historia combinando tres cosas:

| Factor | Pregunta |
|---|---|
| **Esfuerzo** | ¿Cuánto trabajo hay? |
| **Complejidad** | ¿Es difícil de hacer o de entender? |
| **Incertidumbre** | ¿Cuántas cosas desconocemos o pueden salir mal? |

Los puntos **no son horas** y no se convierten a horas. Cada equipo tiene su propia escala, que sirve para comparar sus propias historias, no para compararse con otros equipos.

### La serie de Fibonacci

Para estimar se usa casi siempre una escala con saltos crecientes, normalmente basada en la **serie de Fibonacci**:

```text
1 · 2 · 3 · 5 · 8 · 13 · 21
```

¿Por qué no 1, 2, 3, 4, 5, 6…? Porque cuanto más grande es una tarea, más incierta es su estimación. Discutir si algo es un 14 o un 15 es perder el tiempo; es más honesto decir «es un 13 o un 21», dos valores claramente distintos. Los saltos obligan a decidir «más o menos del mismo tamaño que…».

Se suele añadir a la baraja:

- **?** — «no tengo información suficiente para estimar».
- **☕** — «necesito un descanso».
- **0** — «prácticamente nada de trabajo» (opcional).

### Elegir una referencia

Para empezar, el equipo elige una historia pequeña que todos entienden y le asigna un valor (por ejemplo 2 o 3). Esa es la **historia de referencia**. Las demás se estiman comparándolas con ella: «¿es la mitad? ¿el doble? ¿cinco veces más grande?».

Ejemplo para el portal de incidencias de *Reparaciones Byte Alacant* (empresa ficticia):

| Historia | Puntos | Por qué |
|---|---|---|
| Mostrar el aviso «Gracias» tras enviar una incidencia | 1 | Un texto y una pantalla |
| Ver el estado de mi reparación (referencia) | 3 | Lee datos y los muestra |
| Registrar una avería con validaciones | 5 | Formulario, validaciones, guardado |
| Adjuntar foto a la avería | 8 | Subida de archivos, tamaños, seguridad |
| Avisos por correo en cada cambio de estado | 8 | Plantillas, envío, casos de fallo |
| Tomar pagos online | 21 | Mucha incertidumbre → mejor dividirla |

Una regla práctica: si una historia sale con 13 o 21, probablemente hay que **dividirla** (véase 1.3.5 Historias de usuario).

## 3. Planning poker

El **planning poker** es una técnica para estimar en grupo que evita que la opinión de una persona influya en el resto. Se juega con una baraja de cartas (físicas o en una herramienta) con los valores de la serie.

### Pasos de una ronda

1. El **Product Owner** lee la historia y contesta dudas. Se aclaran los criterios de aceptación.
2. Cada persona del equipo de Developers **elige una carta en secreto**, sin mirar la de los demás.
3. Todos **enseñan la carta a la vez**.
4. Si todos coinciden (o están muy cerca), se **acepta** el valor.
5. Si hay mucha diferencia, **hablan primero la persona con el voto más alto y la del más bajo**: explican qué ven que el resto no ve (una dificultad oculta, o una forma más sencilla de hacerlo).
6. Se **vuelve a votar**. Normalmente en dos o tres rondas el equipo converge.

La clave es el paso 5: el valor de la técnica no está en la media de los votos, sino en **descubrir las diferencias de comprensión** antes de empezar a trabajar.

### Ejemplo

El equipo de cuatro personas estima *«Adjuntar foto a la avería»*:

| Ronda | Votos | Qué ocurre |
|---|---|---|
| 1 | 3 · 5 · 8 · 21 | Gran diferencia. La persona del 21 explica que hay que limitar el tamaño y comprobar el tipo de archivo; la del 3 no lo había pensado |
| 2 | 5 · 8 · 8 · 8 | Casi consenso |
| 3 | 8 · 8 · 8 · 8 | Se acepta **8** |

## 4. Velocidad y proyección

Los puntos por sí solos no dicen cuánto tardará el proyecto. Para eso se usa la **velocidad** (*velocity*): la cantidad de puntos que el equipo **termina por sprint**.

### Cómo se calcula

- Se suman los puntos de las historias **completamente terminadas** (que cumplen la Definición de Hecho) al final del sprint.
- Una historia a medias aporta **0**. No se cuentan parciales.
- Se anota el dato de cada sprint.

| Sprint | Puntos planificados | Puntos terminados |
|---|---|---|
| 1 | 18 | 10 |
| 2 | 16 | 14 |
| 3 | 16 | 15 |
| 4 | 16 | 17 |

La **velocidad media de los últimos sprints** (por ejemplo, los tres últimos) es una estimación razonable de la capacidad del equipo: (14 + 15 + 17) ÷ 3 ≈ **15,3 puntos por sprint**.

### Proyectar cuántos sprints faltan

Con el *Product Backlog* estimado, el cálculo es sencillo:

```text
sprints restantes = puntos pendientes ÷ velocidad media   (redondeando hacia arriba)
```

Si quedan 80 puntos y la velocidad media es de 15,3: 80 ÷ 15,3 ≈ 5,2 → **6 sprints**. A dos semanas por sprint, son unas 12 semanas.

### Mejor un rango que un número

Una sola cifra da una falsa sensación de precisión. Es más honesto dar un **rango** usando la velocidad más baja, la media y la más alta de los últimos sprints:

| Escenario | Velocidad | Sprints para 80 puntos |
|---|---|---|
| Pesimista | 14 | 80 ÷ 14 ≈ 5,7 → **6** |
| Probable | 15,3 | 80 ÷ 15,3 ≈ 5,2 → **6** |
| Optimista | 17 | 80 ÷ 17 ≈ 4,7 → **5** |

«Entre 5 y 6 sprints, lo más probable 6» es una respuesta mucho más útil y sincera que «5,2 sprints».

### Mejorar con el tiempo

- La velocidad **se estabiliza** a partir de unos pocos sprints; los primeros datos son poco fiables.
- Si cambia el equipo (llegan o se van personas, vacaciones), la velocidad cambia: no se puede reutilizar sin más.
- Los **puntos no cuentan para el cliente**; lo que cuenta es el software que funciona.

## 5. Otras formas de estimar

| Técnica | Idea | Cuándo es útil |
|---|---|---|
| **Tallas de camiseta** (XS, S, M, L, XL) | Clasificar historias en tamaños relativos | Al principio, para ordenar un backlog grande de forma rápida |
| **Ordenación por afinidad** | El equipo coloca las historias en una línea de menor a mayor tamaño y luego les asigna valores | Muchas historias a la vez |
| **Estimar en días ideales** | Cuántos días tardaría sin interrupciones | Equipos que aún no se sienten cómodos con puntos |
| **No estimar** | Dividir todo en historias de tamaño parecido y contar cuántas se terminan por sprint | Equipos con experiencia y flujo estable |

## 6. Riesgos de usar mal las estimaciones

:::caution[Las estimaciones son herramienta del equipo, no un arma]
Cuando se usan para presionar, dejan de ser útiles porque la gente empieza a mentir (hinchar los valores) o a esconder los problemas.
:::

| Mal uso | Qué ocurre | Cómo evitarlo |
|---|---|---|
| **Convertir los puntos en horas** («1 punto = 4 horas») | Se pierde la ventaja de la estimación relativa y se vuelve a discutir por horas | Mantener los puntos como unidad abstracta |
| **Comparar la velocidad entre equipos** | Cada equipo tiene su escala; la comparación no tiene sentido y fomenta inflar puntos | Usar la velocidad solo para planificar dentro del mismo equipo |
| **Convertir la velocidad en objetivo** | El equipo acaba sacrificando calidad por «llegar a los puntos» | Recordar que el objetivo es el valor, no los puntos |
| **Presentar la estimación como compromiso** | Una previsión se convierte en una promesa y se castiga el error | Comunicar rangos y actualizar los datos en cada sprint |
| **Dar por buena una sola persona** | Se pierde el aprendizaje del grupo | Estimar siempre en equipo, con planning poker |
| **Reestimar para que «cuadre»** | Se pierde la serie histórica de velocidad | Estimar una vez; reestimar solo si cambia la historia |
| **Contar el trabajo a medias** | Se infla la velocidad y falla la proyección | Solo cuenta lo terminado según la Definición de Hecho |

Una frase que conviene recordar: **una estimación es una previsión, no una promesa**.

## Comprueba lo aprendido

1. ¿Por qué se usan saltos crecientes (1, 2, 3, 5, 8, 13…) en lugar de todos los números?

   <details>
   <summary>Respuesta</summary>

   Porque cuanto mayor es una tarea, más incierta es su estimación; los saltos evitan discusiones inútiles entre valores casi iguales y obligan a elegir tamaños realmente distintos.
   </details>

2. En una ronda de planning poker los votos son 2, 3, 3 y 13. ¿Qué debe hacer el equipo?

   <details>
   <summary>Respuesta</summary>

   Hablar: quien votó 13 y quien votó 2 explican sus razones (puede que el 13 haya visto una dificultad que los demás no) y después se vota otra vez.
   </details>

3. Un equipo terminó 12, 15 y 18 puntos en los tres últimos sprints. Quedan 90 puntos. ¿Cuántos sprints hacen falta con la velocidad media?

   <details>
   <summary>Respuesta</summary>

   Velocidad media = (12 + 15 + 18) ÷ 3 = 15. Hacen falta 90 ÷ 15 = 6 sprints. Con la velocidad más baja (12): 90 ÷ 12 = 7,5 → 8 sprints; con la más alta (18): 5 sprints.
   </details>

4. Un sprint planificaba 20 puntos. Terminan dos historias de 5 puntos y otra de 8 puntos queda sin probar. ¿Cuál es la velocidad?

   <details>
   <summary>Respuesta</summary>

   10 puntos: solo cuentan las historias terminadas (5 + 5). La historia de 8 puntos no cuenta nada.
   </details>

5. Un directivo propone comparar equipos por su velocidad. ¿Qué problema tiene?

   <details>
   <summary>Respuesta</summary>

   Los puntos son una escala interna de cada equipo; comparar velocidades entre equipos no tiene sentido y anima a inflar las estimaciones.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Estimación relativa** | Estimar comparando el tamaño de unas tareas con otras, no midiendo horas. |
| **Punto de historia** | Unidad abstracta que combina esfuerzo, complejidad e incertidumbre. |
| **Serie de Fibonacci** | Sucesión 1, 2, 3, 5, 8, 13, 21… usada como escala de estimación. |
| **Planning poker** | Técnica de estimación en grupo con cartas reveladas a la vez. |
| **Velocidad** | Puntos de historia terminados por el equipo en un sprint. |
| **Historia de referencia** | Historia conocida que sirve de comparación para estimar las demás. |
| **Proyección** | Cálculo de cuántos sprints harán falta a partir de la velocidad y los puntos pendientes. |
| **Previsión** | Estimación de lo que ocurrirá; no es una promesa. |
