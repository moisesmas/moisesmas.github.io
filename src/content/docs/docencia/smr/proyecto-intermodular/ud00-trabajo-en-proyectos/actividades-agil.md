---
title: "Actividades: metodologías ágiles"
description: "Ocho retos de la parte de metodologías ágiles: elegir enfoque, ejercicio Kanban, un sprint de Scrum, ejercicio de historias de usuario, estimación y proyección, versionado, pipeline y autoevaluación en el laboratorio."
---

Cada actividad es un **reto** que produce un entregable que podrás reutilizar en tu proyecto. Casi todos se hacen con el [laboratorio «Ágil en la práctica»](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/), que guarda tus datos en este navegador y permite exportarlos.

Esta unidad de formación previa (unidad 0) **no figura en la programación didáctica**, por eso las actividades no llevan códigos de RA ni de CE: el apartado «Qué trabaja» indica las páginas de apuntes que practica cada una. La dificultad y los tiempos son una propuesta.

:::tip[Antes de empezar]
- Lee antes las páginas de [metodologías ágiles](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/04-metodologias-agiles/) y la que corresponda a cada reto.
- Trabaja en el equipo de 3 o 4 personas que te indique tu profesor (o solo, si así lo decide).
- Cuando el laboratorio use *Reparaciones Byte Alacant*, es una empresa **ficticia**; los datos del ejemplo están inventados.
- Pulsa «Exportar» al acabar cada sesión: el laboratorio guarda los datos en tu navegador, pero un archivo exportado no se pierde si cambias de ordenador.
:::

## Reto 1 · ¿Ágil o predictivo?

**Objetivo:** distinguir cuándo conviene un enfoque ágil, uno predictivo o uno híbrido, y justificarlo.

**Qué tienes que hacer:**

1. Lee [Metodologías ágiles](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/04-metodologias-agiles/), sobre todo la tabla de comparación.
2. Analiza estos tres casos:
   - **Caso A:** instalar la red y el cableado de una oficina nueva de 12 puestos, con contrato cerrado y fecha de entrega fija.
   - **Caso B:** desarrollar una aplicación para que los clientes de un taller consulten el estado de su reparación, sin tener claro todavía qué pantallas necesitan.
   - **Caso C:** migrar los equipos de una gestoría a una versión nueva del sistema operativo durante agosto, con un procedimiento ya probado.
3. Para cada caso, completa una tabla con: enfoque recomendado (predictivo, ágil o híbrido), tres razones, un riesgo del enfoque elegido y cómo lo reducirías.
4. Escribe un caso real o inventado de tu entorno (otro tipo de proyecto) y razona igualmente qué enfoque usarías.

**Qué entregas:** un documento (PDF o Markdown) con la tabla y el caso propio, en la tarea «Reto 1» de Aules.

**Qué trabaja:** 1.3 Metodologías ágiles.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 45 minutos

## Reto 2 · Ejercicio Kanban

**Objetivo:** montar un tablero Kanban, ponerle límites de trabajo en curso (WIP) y comprobar cómo cambian el flujo y las métricas.

**El caso:** el taller de *Reparaciones Byte Alacant* tiene tres técnicos y diez encargos pendientes. Cada encargo pasa por **Pendiente → En curso → En pruebas → Hecho**. Ahora mismo cada técnico tiene varios equipos abiertos y los clientes se quejan de que nada termina.

**Qué tienes que hacer:**

1. Abre la pestaña **Tablero Kanban** del laboratorio y pulsa «Cargar caso del taller» (diez tarjetas en «Pendiente»).
2. **Primera pasada, sin límites:** pon todos los límites en 0 (sin límite) y simula 8 días. Cada día pulsa «Pasar al día siguiente» y mueve las tarjetas como te parezca (empezando todo lo que puedas). Anota al final el WIP medio, el lead time medio y el cycle time medio.
3. **Segunda pasada, con límites:** pulsa «Vaciar y recargar el caso», pon límite **3** a «En curso» y **2** a «En pruebas», activa «Bloquear movimientos que superen el límite» y vuelve a simular 8 días. Anota las mismas métricas.
4. Cuando el tablero te impida mover una tarjeta, escribe qué decidiste hacer en lugar de empujarla.
5. Provoca a propósito un **cuello de botella** (por ejemplo, no muevas nada fuera de «En pruebas» durante 2 días) y observa el aviso.
6. Responde por escrito:
   - ¿Qué métrica mejoró más con los límites y por qué?
   - ¿Dónde se formó el cuello de botella y cómo lo resolviste?
   - ¿Qué límite ajustarías después de esta prueba y por qué?
7. Exporta el tablero final con «Exportar tablero (Markdown)».

**Qué entregas:** el archivo Markdown exportado más un breve texto con las dos tablas de métricas (sin límites y con límites) y las respuestas, en la tarea «Reto 2» de Aules.

**Qué trabaja:** 1.3.1 Kanban.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Reto 3 · Un sprint de Scrum en papel

**Objetivo:** planificar un sprint de dos semanas con objetivo, elementos elegidos según la capacidad y una Definición de Hecho.

**Qué tienes que hacer:**

1. Lee [Scrum](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/06-scrum/). Reparte las responsabilidades en tu equipo: Product Owner, Scrum Master y Developers.
2. En la pestaña **Scrum** del laboratorio, abre el *planificador de sprint*. El Product Backlog de ejemplo trae ocho elementos con puntos. La velocidad de referencia del equipo es de 15 puntos.
3. Elige los elementos del sprint sin superar la capacidad. Escribe el **Objetivo del Sprint** en una frase que explique el valor, no una lista de tareas.
4. Escribe la **Definición de Hecho** de vuestro equipo (mínimo cinco criterios) y compruébala con el *comprobador*: marca qué criterios cumple un elemento y fíjate en qué pasa con el que no los cumple todos.
5. Prepara una **agenda** del sprint: día y duración de cada evento (planificación, daily, refinamiento, revisión y retrospectiva), con la duración máxima orientativa para dos semanas.
6. Simula el final del sprint: supón que uno de los elementos no cumple la Definición de Hecho. ¿Qué pasa con él, cuál es la velocidad del sprint y qué decide el Product Owner?

**Qué entregas:** un documento con el Objetivo del Sprint, el Sprint Backlog, la Definición de Hecho, la agenda de eventos y la respuesta al punto 6, en la tarea «Reto 3» de Aules.

**Qué trabaja:** 1.3.2 Scrum.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora y 30 minutos

## Reto 4 · Ejercicio Historias de usuario

**Objetivo:** redactar historias de usuario de calidad para un proyecto, con criterios de aceptación, revisarlas con INVEST y estimarlas.

**El caso:** vuestro equipo va a desarrollar una pequeña **web de citas de reparación** para *Reparaciones Byte Alacant* (o un proyecto parecido que acordéis con vuestro profesor). Tenéis que preparar el primer Product Backlog.

**Qué tienes que hacer:**

1. Lee [Historias de usuario](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/09-historias-de-usuario/) y [Estimación en proyectos ágiles](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/10-estimacion-agil/).
2. Identificad al menos **tres roles** (por ejemplo, cliente, técnico, gerente).
3. En la pestaña **Historias** del laboratorio, escribid **seis historias** con el formato «Como… quiero… para…». Al menos una debe ser una **épica** que luego dividiréis en tres historias más pequeñas.
4. Cada historia lleva **al menos tres criterios de aceptación**, y una de ellas los escribe en formato *Dado / Cuando / Entonces*.
5. Revisad cada historia con la lista INVEST del laboratorio. Reescribid las que fallen y anotad qué corregisteis y por qué.
6. Antes de estimar, practicad con el *clasificador*: acertad al menos 6 de 8 historias del banco.
7. Estimad las historias en puntos con *planning poker* (en el laboratorio, la pestaña **Estimación** simula la votación; con vuestro equipo, hacedlo con cartas o a mano). Anotad en cada historia el valor acordado.
8. Ordenad el backlog y marcad con MoSCoW cuáles entrarían en el primer sprint.
9. Exportad las historias con «Exportar historias (Markdown)».

**Qué entregas:** el archivo Markdown con las historias, sus criterios, su estimación y su prioridad, más una lista de cambios hechos tras la revisión INVEST, en la tarea «Reto 4» de Aules.

**Qué trabaja:** 1.3.5 Historias de usuario, 1.3.6 Estimación en proyectos ágiles.

**Dificultad:** ★★★ · **Tiempo estimado:** 2 horas

## Reto 5 · Estimación y proyección de sprints

**Objetivo:** usar la velocidad para proyectar cuántos sprints necesita un proyecto y comunicar la previsión con un rango.

**Qué tienes que hacer:**

1. Lee la sección 4 de [Estimación en proyectos ágiles](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/10-estimacion-agil/).
2. En la pestaña **Estimación** del laboratorio, abre la *proyección*. Introduce estos datos de un equipo: sprints con 11, 14, 13, 16 y 15 puntos terminados; quedan **96 puntos** en el backlog.
3. Anota la velocidad media de los tres últimos sprints, la mínima y la máxima, y cuántos sprints salen en los tres escenarios (pesimista, probable y optimista).
4. Resuelve los casos siguientes:
   - Un sprint planificaba 22 puntos; se terminaron tres historias de 5, 3 y 5 puntos y una de 8 quedó sin probar. ¿Cuál es la velocidad de ese sprint?
   - El cliente pide más funciones: se añaden 24 puntos al backlog. ¿Cómo cambia la previsión?
   - Una persona del equipo deja el proyecto. ¿Por qué no puedes seguir usando la misma velocidad sin más?
5. Redacta **un párrafo** para el cliente que comunique la previsión con un rango y explique que es una previsión, no una promesa.

**Qué entregas:** las respuestas, las tres cifras de proyección y el párrafo para el cliente, en la tarea «Reto 5» de Aules.

**Qué trabaja:** 1.3.6 Estimación en proyectos ágiles.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora

## Reto 6 · Versiones y registro de cambios

**Objetivo:** numerar las versiones de un producto con versionado semántico y redactar su registro de cambios.

**Qué tienes que hacer:**

1. Lee [Versionado semántico](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/08-versionado-semantico/).
2. En la pestaña **Versionado** del laboratorio, parte de la versión `0.9.0` de una aplicación de inventario de equipos y avanza por la siguiente historia de cambios. Anota qué versión resulta en cada paso y por qué:
   1. Se corrige un error en el listado.
   2. Se añade la búsqueda por número de serie.
   3. Se publica la primera versión estable.
   4. Se renombra un campo que usa otra aplicación del taller.
   5. Se corrige un fallo en la búsqueda y se añade la exportación a CSV.
   6. Se marca como obsoleto el campo `ubicacion_antigua`.
3. Ordena de menor a mayor estas versiones y comprueba tu respuesta con el comparador: `2.0.0`, `2.0.0-rc.1`, `1.10.0`, `1.9.3`, `2.0.0-beta.11`, `2.0.0-beta.2`.
4. Con el generador, redacta el **registro de cambios** de las versiones del punto 2 (categorías Añadido, Cambiado, Obsoleto, Eliminado, Corregido).
5. Explica en tres frases por qué cambiar el nombre de un campo es una versión MAYOR aunque el cambio parezca pequeño.

**Qué entregas:** la tabla de versiones, la lista ordenada, el registro de cambios en Markdown y la explicación, en la tarea «Reto 6» de Aules.

**Qué trabaja:** 1.3.4 Versionado semántico.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 1 hora

## Reto 7 · El pipeline de mi proyecto

**Objetivo:** diseñar un pipeline de integración y entrega continuas para un proyecto y entender qué pasa cuando falla un paso.

**Qué tienes que hacer:**

1. Lee [DevOps](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/07-devops/).
2. En la pestaña **DevOps** del laboratorio, ejecuta el pipeline cinco veces: sin fallos, con fallo en las pruebas unitarias, en el análisis de calidad, en las pruebas de integración y con un fallo que solo se descubre en producción. Anota en una tabla en qué paso se detuvo, qué ocurrió después y cuándo se detectó el problema.
3. Repite el escenario de fallo en pruebas unitarias con la opción «Saltar las pruebas» y explica la diferencia.
4. Diseña por escrito el pipeline de **tu proyecto** (el que vais a desarrollar): qué pasos tendrá, qué comprobará cada uno, qué entornos habrá y si optáis por entrega continua o despliegue continuo. Justifica la elección.
5. Propón dos métricas de las vistas en la página para saber si vuestro pipeline funciona bien.

**Qué entregas:** la tabla de ejecuciones y el diseño del pipeline de tu proyecto, en la tarea «Reto 7» de Aules.

**Qué trabaja:** 1.3.3 DevOps.

**Dificultad:** ★★☆ · **Tiempo estimado:** 1 hora

## Reto 8 · Autoevaluación en el laboratorio

**Objetivo:** comprobar que dominas los conceptos de la parte ágil.

**Qué tienes que hacer:**

1. Abre la pestaña **Práctica** del laboratorio.
2. Resuelve ejercicios hasta acumular **15 aciertos** con un porcentaje de acierto de al menos el **80 %** (el marcador de la pestaña lo muestra). Los ejercicios cambian cada vez.
3. Anota los **tres tipos** de ejercicio en los que más fallaste y repasa la página de apuntes que les corresponde.
4. Escribe, para cada uno, una explicación con tus propias palabras de por qué fallaste.

**Qué entregas:** una captura de pantalla del marcador (o su valor anotado) y el texto del punto 4, en la tarea «Reto 8» de Aules.

**Qué trabaja:** todas las páginas 1.3.

**Dificultad:** ★☆☆ · **Tiempo estimado:** 30 minutos

:::aules
Las entregas se hacen en Aules, en las tareas «Reto 1» a «Reto 8». Las soluciones y las rúbricas de los retos las publica el profesor en Aules una vez cerrada cada entrega.
:::
