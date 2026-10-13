---
title: "1.3.5 Historias de usuario"
description: "Cómo describir lo que necesita un usuario con historias de usuario: el formato «Como… quiero… para…», los criterios de aceptación, los criterios INVEST de calidad y cómo dividir las historias épicas."
---

«El sistema debe permitir gestionar incidencias.» Esta frase parece un requisito, pero no dice quién lo necesita, para qué, ni cómo sabremos que está hecho. Con una frase así, tres personas del equipo construirán tres cosas distintas. Las **historias de usuario** son una forma sencilla de describir lo que se necesita desde el punto de vista de quien lo va a usar, y de forma que el equipo pueda conversar sobre ello, estimarlo y comprobarlo.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 40 de práctica.

1. Lee las secciones 1 a 3 (formato, criterios y INVEST).
2. Abre la pestaña «Historias» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#historias): construye una historia y prueba el clasificador.
3. Lee las secciones 4 y 5 (dividir y ordenar) y haz el *Ejercicio Historias de usuario* de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-agil/).
:::

## 1. Qué es una historia de usuario

Una **historia de usuario** es una descripción breve de una necesidad escrita desde la perspectiva de la persona que la tiene. No es una especificación completa: es una **promesa de conversación**. Se suele describir con tres elementos, conocidos como las «tres C»:

| Elemento | Qué es | Ejemplo |
|---|---|---|
| **Card** (tarjeta) | El texto breve de la historia | «Como cliente quiero consultar el estado de mi reparación para saber cuándo recoger mi equipo» |
| **Conversation** (conversación) | El diálogo entre equipo y Product Owner para entender los detalles | ¿Qué estados hay? ¿Se avisa por correo? |
| **Confirmation** (confirmación) | Los criterios con los que se comprueba que está hecha | «Se muestran los 5 estados posibles» |

La tarjeta es corta a propósito. Los detalles se hablan cuando hace falta y se anotan como criterios de aceptación.

### El formato clásico

```text
Como  <rol o tipo de usuario>
quiero  <algo que quiero hacer o conseguir>
para  <beneficio o motivo>
```

Cada parte responde a una pregunta:

| Parte | Pregunta | Por qué es importante |
|---|---|---|
| **Como…** | ¿Quién lo necesita? | Evita construir para «un usuario genérico» que no existe |
| **Quiero…** | ¿Qué quiere hacer? | Describe el comportamiento deseado, no la solución técnica |
| **Para…** | ¿Por qué lo quiere? | Da sentido, permite proponer alternativas y priorizar |

### Ejemplos de Byte Alacant

Para el portal de incidencias de *Reparaciones Byte Alacant* (empresa ficticia):

- *Como cliente, quiero registrar una avería desde mi móvil para no tener que llamar al taller.*
- *Como técnico, quiero cambiar el estado de una reparación para que el cliente sepa en qué punto está.*
- *Como gerente, quiero ver cuántas reparaciones se cierran cada semana para decidir si necesito más personal.*

### Lo que no es una historia de usuario

| Mal | Por qué | Mejor |
|---|---|---|
| «Crear una tabla `incidencias` en la base de datos» | Es una tarea técnica; el usuario no la pide | «Como técnico quiero ver las incidencias abiertas para atenderlas por orden» |
| «Usar un menú desplegable de colores» | Impone una solución | Describe la necesidad: «distinguir de un vistazo las reparaciones urgentes» |
| «Como usuario quiero una aplicación rápida» | Vago, no se puede comprobar | Concretar con un criterio medible (véase sección 2) |

:::note[Roles reales, no «usuario»]
Intenta no escribir «como usuario». Piensa en roles concretos: cliente, técnico, gerente, administrador. Cada uno tiene necesidades distintas.
:::

## 2. Criterios de aceptación

Los **criterios de aceptación** son las condiciones que debe cumplir la historia para que el Product Owner la dé por buena. Responden a «¿cómo sabremos que está hecho?». Sirven para tres cosas: aclarar qué se espera, guiar las pruebas y evitar discusiones al final.

### Formato libre (lista de comprobación)

Para la historia *Como cliente quiero registrar una avería…*:

- [ ] El formulario pide tipo de equipo, descripción de la avería y teléfono o correo de contacto.
- [ ] Si falta un campo obligatorio, se indica cuál y no se envía.
- [ ] Al enviar, el cliente ve un número de incidencia.
- [ ] El cliente recibe un correo con el número de incidencia.

### Formato Dado / Cuando / Entonces

Un formato muy usado describe cada criterio como un **escenario**:

```text
Dado     <la situación de partida>
Cuando   <ocurre una acción>
Entonces <el resultado esperado>
```

Ejemplos:

```text
Escenario: Registro correcto
  Dado que el cliente ha rellenado todos los campos obligatorios
  Cuando pulsa «Enviar»
  Entonces se muestra el número de la incidencia

Escenario: Falta el contacto
  Dado que el cliente no ha escrito ningún teléfono ni correo
  Cuando pulsa «Enviar»
  Entonces se muestra el mensaje «Indica un teléfono o un correo» y no se registra la incidencia
```

### Cómo escribir buenos criterios

- Que sean **comprobables**: si no se puede decir «sí» o «no», no es un criterio. Evita «rápido», «fácil», «bonito» sin una medida («la lista carga en menos de 3 segundos»).
- Cubre el **caso normal y los casos de error**.
- Que sean **pocos** (de tres a siete). Si salen veinte, la historia es demasiado grande.
- Describen el **qué**, no el **cómo**.

### No confundas con la Definición de Hecho

| | Criterios de aceptación | Definición de Hecho |
|---|---|---|
| **Qué dicen** | Qué hace *esta* historia | Qué calidad tienen *todas* las historias |
| **Alcance** | Una historia | Todo el equipo |
| **Ejemplo** | «Se muestra el número de incidencia» | «El código ha sido revisado y las pruebas pasan» |

Una historia está terminada cuando cumple **ambas** cosas (véase 1.3.2 Scrum).

## 3. INVEST: ¿es buena mi historia?

La sigla **INVEST** reúne seis características de una buena historia. Sirve como lista de revisión.

| Letra | Significa | Pregunta de comprobación | Ejemplo de fallo |
|---|---|---|---|
| **I** | *Independent* (independiente) | ¿Se puede construir sin esperar a otras historias? | «Mostrar el historial de incidencias» sin la historia que las crea |
| **N** | *Negotiable* (negociable) | ¿Deja espacio para hablar de cómo hacerlo? | «Debe usar un `<select>` con 5 colores» |
| **V** | *Valuable* (valiosa) | ¿Aporta valor a alguien? | «Refactorizar el módulo de usuarios» (sin beneficio visible) |
| **E** | *Estimable* (estimable) | ¿Puede el equipo hacerse una idea de su tamaño? | «Hacer que el portal sea seguro» (demasiado difuso) |
| **S** | *Small* (pequeña) | ¿Cabe en un sprint, mejor en unos días? | «Gestión completa de clientes» |
| **T** | *Testable* (comprobable) | ¿Se puede probar que está hecha? | «La aplicación debe ser intuitiva» |

Una historia no tiene que ser perfecta para entrar en el Product Backlog, pero **sí debería cumplir INVEST antes de entrar en un sprint**. A veces se acuerda una *Definición de Preparado* (*Definition of Ready*), una lista de condiciones que debe cumplir una historia antes de planificarse; es una práctica útil del equipo, no un elemento oficial de Scrum.

### Ejemplo de revisión

Historia: *«Como cliente quiero un portal bonito y rápido para usarlo con gusto.»*

- **V:** vaga; ¿qué hace el cliente con él?
- **E / T:** «bonito» y «rápido» no se pueden estimar ni comprobar.
- **S:** no se refiere a ninguna acción concreta.

Reescrita: *«Como cliente quiero ver el estado de mi reparación nada más iniciar sesión para no tener que preguntar por teléfono.»* Con un criterio de aceptación: «La pantalla de estado carga en menos de 3 segundos con conexión normal».

## 4. Historias épicas y cómo dividirlas

Una **épica** es una historia tan grande que no cabe en un sprint (ni se puede estimar con fiabilidad). Por ejemplo: *«Como cliente quiero gestionar mis reparaciones»*. Hay que **dividirla** en historias más pequeñas que sigan aportando valor por sí solas.

Una división incorrecta es por capas técnicas («primero la base de datos, luego la pantalla»): ninguna parte sirve al usuario por separado. Lo correcto es dividir en **rebanadas verticales**: cada historia atraviesa todas las capas, aunque sea de forma sencilla.

### Técnicas de división

| Técnica | Cómo funciona | Ejemplo con «gestionar mis reparaciones» |
|---|---|---|
| **Por pasos del flujo** | Una historia por cada paso de un proceso | Registrar → ver estado → cancelar → valorar el servicio |
| **Por tipos de usuario** | Una historia por rol | Cliente registrado, cliente sin cuenta, técnico |
| **Por reglas de negocio** | Un caso simple primero, las variantes después | Primero un tipo de equipo, luego añadir más tipos |
| **Por datos** | Se empieza con los datos esenciales | Primero descripción; después, fotos adjuntas |
| **Primero lo básico** | Versión mínima que ya sirve y mejoras después | Estado como texto; más adelante línea de tiempo con fechas |
| **Separar lo imprescindible de lo deseable** | Una historia por cada «extra» | Aviso por correo, aviso por SMS |

Las historias resultantes se ordenan y entran en el Product Backlog; la épica desaparece o se mantiene como agrupación.

### Ejemplo

**Épica:** *Como cliente quiero gestionar mis reparaciones desde el móvil.*

1. Como cliente quiero registrar una avería con descripción y contacto para no llamar al taller. (5)
2. Como cliente quiero ver el estado de mi reparación para saber cuándo recoger mi equipo. (3)
3. Como cliente quiero adjuntar una foto a la avería para que el técnico llegue ya informado. (5)
4. Como cliente quiero recibir un correo cuando cambie el estado para no tener que mirar el portal. (3)
5. Como cliente quiero cancelar una reparación aún no iniciada para no pagar por algo que ya no necesito. (3)

Las cifras entre paréntesis son estimaciones en puntos (véase 1.3.6 Estimación en proyectos ágiles).

## 5. Ordenar y mantener el backlog de historias

- **El Product Owner ordena** por valor, riesgo y dependencias. Lo más importante, arriba.
- **Lo próximo se detalla; lo lejano no.** Las historias de arriba son pequeñas y claras; las de abajo pueden ser épicas todavía sin dividir.
- **Una técnica sencilla de prioridad: MoSCoW.** *Must* (debe estar), *Should* (debería), *Could* (podría), *Won't* (no esta vez).
- **Refina con regularidad.** Dedica un rato en cada sprint a dividir y aclarar las historias que vienen.
- **Una historia nunca está «cerrada» para discutirse:** si al conversar aparece algo nuevo, se actualiza o se divide.

En la documentación de un proyecto, el Product Backlog es un documento vivo (véase 3.1 Product Backlog).

## Comprueba lo aprendido

1. Completa la historia: «Como técnico quiero ___ para ___.» con una necesidad real del taller.

   <details>
   <summary>Respuesta</summary>

   Respuesta abierta. Un ejemplo válido: «Como técnico quiero ver las reparaciones asignadas a mí para atenderlas por orden de llegada». Debe tener rol, acción y beneficio, sin imponer solución técnica.
   </details>

2. ¿Por qué «Crear la tabla de clientes en la base de datos» no es una buena historia de usuario?

   <details>
   <summary>Respuesta</summary>

   Es una tarea técnica: no la pide ningún usuario ni aporta valor por sí sola. Será una tarea dentro de una historia con valor visible.
   </details>

3. Escribe un criterio de aceptación en formato Dado / Cuando / Entonces para «Como cliente quiero cancelar una reparación aún no iniciada».

   <details>
   <summary>Respuesta</summary>

   Ejemplo: «Dado que mi reparación está en estado Recibida, cuando pulso Cancelar y confirmo, entonces el estado pasa a Cancelada y recibo un correo de confirmación».
   </details>

4. ¿Qué letra de INVEST falla en «Como usuario quiero que el portal sea intuitivo»?

   <details>
   <summary>Respuesta</summary>

   Sobre todo la T (no se puede comprobar «intuitivo» sin una medida) y también la E (difícil de estimar). Además, el rol «usuario» es demasiado genérico.
   </details>

5. Divide «Como gerente quiero informes del taller» en tres historias más pequeñas.

   <details>
   <summary>Respuesta</summary>

   Ejemplo: ver cuántas reparaciones se cierran por semana; ver el tiempo medio de reparación; exportar el informe a una hoja de cálculo. Cada una aporta valor y puede entregarse sola.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Historia de usuario** | Descripción breve de una necesidad desde el punto de vista de quien la tiene. |
| **Rol** | Tipo de usuario para el que se escribe la historia. |
| **Criterio de aceptación** | Condición comprobable que debe cumplir una historia para darse por buena. |
| **Dado / Cuando / Entonces** | Formato de escenario: situación inicial, acción y resultado esperado. |
| **INVEST** | Lista de seis características de una buena historia. |
| **Épica** | Historia demasiado grande que debe dividirse. |
| **Rebanada vertical** | División de una historia de modo que cada parte atraviesa todas las capas y aporta valor. |
| **Definición de Preparado** | Condiciones que debe cumplir una historia antes de entrar en un sprint (práctica del equipo). |
| **MoSCoW** | Técnica de priorización: Must, Should, Could, Won't. |
