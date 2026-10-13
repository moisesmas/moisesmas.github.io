---
title: "1.2 Ciclos de vida de proyectos de software"
description: "Los modelos de ciclo de vida más usados (cascada, en V, iterativo, incremental, en espiral, prototipado y ágil), qué ventajas e inconvenientes tiene cada uno y cómo elegir el adecuado según el proyecto."
---

Dos equipos pueden tener las mismas tareas y obtener resultados muy distintos solo por **el orden y el ritmo** con que las hacen. El **ciclo de vida** es la forma de organizar las fases de un proyecto de software en el tiempo: hace falta saber qué opciones existen y, sobre todo, **cuál conviene a cada proyecto**. Aquí repasamos los modelos clásicos y los criterios para elegir; en la parte siguiente de la unidad veremos las metodologías ágiles con detalle.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 60 minutos de lectura y 40 de práctica.

1. Lee las secciones 1 y 2 con la pestaña «Ciclos de vida» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/gantt-y-ciclos/#ciclos) abierta.
2. Lee la sección 3 y usa el recomendador de la pestaña con un proyecto tuyo.
3. Resuelve los casos de la sección 4 antes de mirar las respuestas y haz la [actividad 3](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-planificacion/).
:::

## 1. Qué es un ciclo de vida

Todo software pasa por las mismas actividades, que a veces se llaman **fases**:

1. **Requisitos:** qué debe hacer el sistema, según quien lo encarga.
2. **Diseño:** cómo se organizará (datos, pantallas, componentes).
3. **Implementación:** construirlo.
4. **Pruebas:** comprobar que funciona y que cumple los requisitos.
5. **Despliegue:** ponerlo en marcha donde lo usarán.
6. **Mantenimiento:** corregir errores y evolucionarlo mientras viva.

Un **modelo de ciclo de vida** decide **cómo se encadenan** esas actividades: una sola vez y en orden, en vueltas sucesivas, por trozos, empezando por lo más arriesgado… Ninguno es el mejor; cada uno responde a un tipo de problema.

## 2. Los modelos principales

### 2.1 Cascada

Las fases se hacen **una tras otra**, completas, y no se vuelve atrás (o se vuelve solo al paso anterior). Cada fase termina con un documento aprobado antes de pasar a la siguiente.

```text
Requisitos → Diseño → Implementación → Pruebas → Despliegue → Mantenimiento
```

- **Ventajas:** fácil de entender y de planificar (el Gantt es directo); mucha documentación; control claro de cada hito.
- **Inconvenientes:** el cliente no ve nada funcionando hasta el final; los errores de requisitos se descubren tarde y salen caros; no admite bien los cambios.
- **Encaja cuando:** los requisitos están **claros y estables**, el problema se conoce bien y el contrato exige entregables fijos.

### 2.2 En V

Es una versión de la cascada que **empareja cada fase de construcción con una de verificación**: los requisitos se validan con las pruebas de aceptación, el diseño con las pruebas de integración, el código con las pruebas unitarias. La idea es **preparar las pruebas a la vez que se especifica**.

```text
Requisitos ─────────────────── Pruebas de aceptación
   Diseño del sistema ───────── Pruebas de sistema/integración
       Diseño detallado ─────── Pruebas unitarias
              └── Implementación ──┘
```

- **Ventajas:** las pruebas se planifican desde el principio; muy usado donde el fallo es grave.
- **Inconvenientes:** hereda la rigidez de la cascada.
- **Encaja cuando:** hace falta **verificar con rigor** (sistemas críticos para la seguridad, normativa estricta) y los requisitos son estables.

### 2.3 Iterativo

En vez de hacer todo de una vez, se construye una **primera versión del sistema completo** (aunque tosca) y se va **mejorando en vueltas sucesivas** (iteraciones). En cada una se revisan requisitos, diseño, código y pruebas.

- **Ventajas:** se aprende de cada vuelta; los errores de comprensión se corrigen pronto.
- **Inconvenientes:** cuesta saber cuándo parar; el coste final es menos predecible.
- **Encaja cuando:** el problema no se entiende del todo al principio.

### 2.4 Incremental

El sistema se divide en **piezas funcionales** (incrementos) y se construye y entrega **pieza a pieza**. Cada incremento pasa por todas las fases y se suma a lo anterior. El primero suele ser el núcleo imprescindible.

- **Ventajas:** el cliente recibe valor pronto y puede usar lo que hay; los riesgos se reparten.
- **Inconvenientes:** exige una buena arquitectura de partida para que las piezas encajen; los incrementos deben poder separarse.
- **Encaja cuando:** se necesita **entregar pronto algo útil** y el sistema se puede trocear.

:::note[Iterativo no es lo mismo que incremental]
**Iterar** es volver a trabajar sobre lo mismo para mejorarlo (rehacer). **Incrementar** es añadir partes nuevas (sumar). En la práctica se combinan: «iterativo e incremental» significa que cada vuelta entrega una pieza nueva y revisa las anteriores. Casi todos los modelos modernos lo son.
:::

### 2.5 En espiral

Combina el modelo iterativo con una **gestión explícita del riesgo**. Cada vuelta recorre cuatro tareas: fijar objetivos, **analizar y reducir riesgos** (a menudo con un prototipo), desarrollar y verificar, y planificar la siguiente vuelta. Se avanza hacia fuera, con más compromiso en cada vuelta.

- **Ventajas:** detecta y reduce los riesgos antes de gastar mucho; adecuado a proyectos grandes y con incertidumbre.
- **Inconvenientes:** exige experiencia en análisis de riesgos; es pesado para proyectos pequeños.
- **Encaja cuando:** hay **riesgos técnicos o de negocio altos** y el coste de equivocarse es grande.

### 2.6 Prototipado

Se construye pronto un **prototipo** (una maqueta o una versión muy simplificada) para enseñárselo al cliente y **aclarar los requisitos**. Puede ser **desechable** (se tira tras aprender) o **evolutivo** (se convierte poco a poco en el producto).

- **Ventajas:** el cliente ve algo concreto; se descubren requisitos que nadie sabía expresar con palabras.
- **Inconvenientes:** el cliente puede creer que el prototipo ya es el producto; si es evolutivo, puede arrastrar un diseño mal pensado.
- **Encaja cuando:** los requisitos son **difusos** o el aspecto de la interfaz es clave.

### 2.7 Ágil

Se trabaja en **ciclos cortos** (de una a pocas semanas) que producen cada vez una **versión usable**, con el cliente implicado de forma continua y con disposición a cambiar de prioridades. Se valora más el software funcionando y la colaboración que la documentación extensa. Scrum y Kanban son los marcos más conocidos y los verás en detalle en la sección 1.3.

- **Ventajas:** gran capacidad de adaptación al cambio; entregas frecuentes; el equipo se organiza solo.
- **Inconvenientes:** requiere un cliente disponible; es difícil de cerrar con un precio y un alcance fijos de antemano; sin disciplina se queda en improvisación.
- **Encaja cuando:** los requisitos **cambian o se descubren sobre la marcha** y se puede trabajar con el cliente de cerca.

### Comparación rápida

| Modelo | Requisitos | Cliente | Entrega | Gestión del riesgo | Documentación |
|---|---|---|---|---|---|
| Cascada | Fijos desde el inicio | Al principio y al final | Una sola, al final | Tarde | Abundante |
| En V | Fijos | Al principio y al final | Una sola | Pruebas planificadas | Abundante |
| Iterativo | Se afinan por vueltas | En cada vuelta | Versiones cada vez mejores | Media | Media |
| Incremental | Conocidos y troceables | En cada incremento | Por piezas | Repartido | Media |
| Espiral | Inciertos | En cada vuelta | Por vueltas | Central | Alta |
| Prototipado | Difusos | Mucho | Prototipos y luego versión | Aclara requisitos | Variable |
| Ágil | Cambiantes | Continuo | Cada pocas semanas | Continuo | Justa y útil |

## 3. Cómo elegir

No se elige por moda sino por las **características del proyecto**. Pregúntate:

| Criterio | Si la respuesta es… | …tiende a encajar |
|---|---|---|
| **¿Están claros y estables los requisitos?** | Sí | Cascada, V |
| | No, cambiarán | Ágil, iterativo, prototipado |
| **¿El cliente puede colaborar con frecuencia?** | Sí | Ágil, prototipado |
| | No, solo al principio y al final | Cascada, V |
| **¿Hay riesgos altos (técnicos o de negocio)?** | Sí | Espiral, prototipado |
| **¿Es crítico para la seguridad o muy regulado?** | Sí | V (o cascada) con muchas pruebas |
| **¿Interesa entregar valor pronto?** | Sí | Incremental, ágil |
| **¿Está definido un precio y un alcance cerrados por contrato?** | Sí | Cascada, V (o ágil con contrato adaptado) |
| **¿El equipo es pequeño y tiene poca experiencia?** | Sí | Modelos sencillos: incremental, cascada con revisiones |

Algunas reglas útiles:

- **En la duda, trocea y entrega pronto.** Es más fácil corregir lo que se ha visto funcionando.
- **No hay modelos puros en la vida real.** Muchos equipos mezclan: planifican el conjunto como un plan en V pero ejecutan en iteraciones de tres semanas. Lo importante es saber por qué.
- **El ciclo de vida condiciona el calendario.** En cascada, el Gantt es largo y secuencial; en ágil, el plan detallado solo llega hasta la próxima iteración.

## 4. Casos de Byte Alacant

**Reparaciones Byte Alacant, S. L.** (empresa ficticia) encarga estos proyectos. Para cada uno, piensa qué ciclo elegirías antes de leer la propuesta.

| Caso | Datos clave | Ciclo razonable | Por qué |
|---|---|---|---|
| **1. Informe mensual de residuos electrónicos para la administración** | La plantilla y los campos los fija una norma. Nadie cambiará nada en un año. | **Cascada** | Requisitos cerrados y estables; el resultado se entrega una vez |
| **2. Portal de citas de reparación** | El taller está al lado y dispone de tiempo cada semana. No sabe del todo qué quiere. Hay que estrenar pronto. | **Incremental / ágil** | Cliente disponible, requisitos cambiantes y valor temprano: primero pedir cita, luego avisos y después gestión |
| **3. App que identifica la avería por una foto** | Nadie en la empresa ha usado visión artificial. La viabilidad es dudosa. | **Espiral o prototipado** | Riesgo técnico alto: se prueba lo más incierto antes de comprometer presupuesto |
| **4. Control de acceso al almacén de piezas con cerradura inteligente** | Un fallo deja a la empresa sin acceso o con acceso abierto. Hay normas de seguridad. | **En V** | Es crítico: las pruebas se planifican desde los requisitos |
| **5. Web informativa de seis páginas fijas** | Textos y diseño decididos. Un solo desarrollador. | **Cascada o incremental sencillo** | Alcance pequeño y estable: planificar demasiado costaría más que hacerlo |
| **6. Mejoras del portal de incidencias interno ya en uso** | Los técnicos piden cambios cada semana. | **Ágil (Kanban o Scrum)** | Flujo continuo de peticiones y prioridades que cambian |

:::tip[Para tu proyecto del módulo (propuesta)]
Un proyecto de clase de pocas semanas con un equipo de 2-3 personas funciona bien con un ciclo **iterativo e incremental**: un plan global con hitos y **dos o tres iteraciones** que entreguen algo funcionando, con revisión del tutor al final de cada una. Es una propuesta de esta web, no una exigencia de la programación.
:::

## Comprueba lo aprendido

1. ¿Cuál es la diferencia entre un enfoque iterativo y uno incremental?

   <details>
   <summary>Respuesta</summary>

   En el **iterativo** se rehace y mejora el sistema entero en vueltas sucesivas; en el **incremental** se va añadiendo funcionalidad en piezas que se entregan una a una. Se suelen combinar.
   </details>

2. Un cliente tiene un contrato a precio cerrado con requisitos escritos y firmados, y solo aparecerá en la entrega final. ¿Qué ciclo parece más natural? ¿Qué riesgo asumes?

   <details>
   <summary>Respuesta</summary>

   Cascada (o en V). El riesgo es descubrir tarde que lo especificado no era lo que el cliente necesitaba, cuando cambiarlo ya es caro.
   </details>

3. ¿Qué aporta el modelo en espiral que no aporta un modelo iterativo sencillo?

   <details>
   <summary>Respuesta</summary>

   Un análisis de riesgos explícito en cada vuelta: se decide qué reducir primero (con prototipos, por ejemplo) antes de seguir invirtiendo.
   </details>

4. Un prototipo desechable ¿se convierte en el producto final? ¿Qué problema puede surgir si el cliente lo cree?

   <details>
   <summary>Respuesta</summary>

   No: se tira tras aprender de él. Si el cliente cree que ya está casi todo hecho, presionará para entregarlo tal cual, con un diseño que no se pensó para durar, y habrá que explicar qué falta.
   </details>

5. Nombra tres criterios para elegir un ciclo de vida.

   <details>
   <summary>Respuesta</summary>

   Por ejemplo: estabilidad de los requisitos, disponibilidad del cliente, nivel de riesgo, criticidad del sistema, necesidad de entregar pronto, tamaño y experiencia del equipo, tipo de contrato.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Ciclo de vida** | Forma de organizar en el tiempo las actividades del desarrollo de software |
| **Cascada** | Modelo secuencial en el que cada fase termina antes de empezar la siguiente |
| **Modelo en V** | Cascada que empareja cada fase de construcción con su fase de pruebas |
| **Iteración** | Vuelta de trabajo de duración acotada que revisa y mejora el sistema |
| **Incremento** | Pieza funcional que se añade al sistema y se entrega |
| **Espiral** | Modelo iterativo guiado por el análisis y la reducción de riesgos |
| **Prototipo** | Versión simplificada del sistema para aclarar requisitos o probar ideas |
| **Requisito** | Condición o capacidad que el sistema debe cumplir |
| **Ágil** | Enfoque de ciclos cortos, colaboración con el cliente y adaptación al cambio |
