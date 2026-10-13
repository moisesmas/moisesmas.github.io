---
title: "1.3 Metodologías ágiles"
description: "Qué es trabajar de forma ágil: el Manifiesto Ágil y sus cuatro valores, los principios que lo desarrollan, en qué se diferencia del enfoque predictivo y cuáles son los marcos más usados (Scrum, Kanban y XP)."
---

Todo proyecto necesita un plan, pero muchos proyectos descubren a mitad de camino que el plan era incorrecto: el cliente cambia de opinión, aparece una tecnología mejor o, sencillamente, al ver el resultado se da cuenta de que quería otra cosa. Las **metodologías ágiles** nacieron para trabajar bien en ese escenario: entregar poco y a menudo, aprender de cada entrega y corregir el rumbo sin dramatismos.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura.

1. Lee las secciones 1 a 3 y fíjate en las diferencias entre enfoque predictivo y ágil.
2. Lee la sección 4 sobre los marcos y sigue con las páginas de [Kanban](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/05-kanban/) y [Scrum](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/06-scrum/).
3. Haz las preguntas del final.
:::

## 1. De dónde viene la agilidad

Durante décadas, el desarrollo de software se organizó como una cadena de montaje: primero se recogían **todos** los requisitos, luego se diseñaba **todo**, después se programaba **todo**, se probaba **todo** y, al final, se entregaba. Es el modelo en cascada que verás con más detalle en la página de ciclos de vida (véase 1.2 Ciclos de vida de un proyecto). Funciona razonablemente cuando los requisitos son estables y el coste de cambiar es alto; por ejemplo, al construir un puente.

En el software el problema es otro: nadie sabe del todo lo que quiere hasta que lo ve funcionar, y cambiar un programa cuesta mucho menos que cambiar un puente. Por eso, a lo largo de los años 90 varios equipos fueron probando formas más cortas e iterativas de trabajar. En **febrero de 2001**, diecisiete profesionales se reunieron en Utah (Estados Unidos) y pusieron por escrito lo que tenían en común. El resultado fue el **Manifiesto por el Desarrollo Ágil de Software**: un texto brevísimo con cuatro valores y doce principios.

El manifiesto habla de software, pero sus ideas se usan hoy en proyectos de todo tipo: marketing, eventos, formación o la instalación de una red en una oficina.

## 2. Los cuatro valores

El manifiesto se construye con cuatro comparaciones. En cada una se reconoce que ambos lados tienen valor, pero se afirma que el primero importa **más**. Dicho con nuestras palabras:

| Valoramos más… | …que… | Qué significa en la práctica |
|---|---|---|
| **Las personas y su forma de colaborar** | los procesos y las herramientas | Un equipo que habla a diario resuelve más que uno que se coordina solo a base de tickets y reglas. |
| **Un producto que funciona** | una documentación exhaustiva | Lo que de verdad demuestra el avance es algo que se puede probar. La documentación se escribe, pero solo la que alguien va a usar. |
| **Trabajar codo con codo con el cliente** | negociar un contrato cerrado | Se entrega valor a cambio de comentarios frecuentes, no a cambio de cumplir al pie de la letra un papel firmado al principio. |
| **Responder al cambio** | seguir un plan | El plan existe, pero se revisa. Un plan que no se puede modificar acaba produciendo lo que ya nadie necesita. |

:::caution[Un error muy común]
«Ágil» **no significa** «sin plan», «sin documentación» ni «sin reglas». Significa planificar en ciclos cortos, documentar lo útil y tener reglas sencillas que el equipo acepta. Un equipo que improvisa sin disciplina no es ágil, es caótico.
:::

## 3. Los doce principios, agrupados

Los doce principios desarrollan los valores. En vez de repetirlos uno a uno, es más fácil recordarlos por temas:

| Tema | Idea principal |
|---|---|
| **Entrega temprana y frecuente** | La prioridad es satisfacer al cliente entregando pronto y de forma continua versiones útiles. Se prefieren ciclos de semanas, no de meses. |
| **Cambio bienvenido** | Los cambios de requisitos, incluso tardíos, se aprovechan como ventaja competitiva del cliente. |
| **Colaboración diaria** | Negocio y equipo técnico trabajan juntos todos los días. |
| **Personas motivadas** | Se construye en torno a personas con motivación, dándoles entorno y confianza; la conversación cara a cara es la forma más eficaz de comunicar. |
| **Progreso medible** | El producto que funciona es la medida principal del avance. |
| **Ritmo sostenible** | Patrocinadores, equipo y usuarios deben poder mantener un ritmo constante de forma indefinida: nada de «maratones» permanentes. |
| **Excelencia técnica** | La atención continua a la calidad y a un buen diseño aumenta la agilidad. |
| **Simplicidad** | El arte de maximizar el trabajo **no** hecho es esencial: no se construye lo que no hace falta. |
| **Equipos autoorganizados** | Las mejores arquitecturas, requisitos y diseños surgen de equipos que se organizan solos. |
| **Reflexión y mejora** | A intervalos regulares, el equipo analiza cómo ser más eficaz y ajusta su forma de trabajar. |

Si hubiera que resumir los doce principios en una sola frase sería esta: **entregar valor pronto, escuchar el resultado, mejorar y repetir**.

## 4. Ágil frente a predictivo

Los enfoques **predictivos** (el modelo en cascada es el ejemplo clásico) planifican por adelantado casi todo el proyecto. Los enfoques **ágiles** planifican con detalle lo próximo y dejan lo lejano en grueso. Ninguno es «mejor» en abstracto: depende del tipo de proyecto.

| Aspecto | Predictivo (cascada) | Ágil |
|---|---|---|
| **Requisitos** | Se fijan al principio y se cambian con un proceso formal | Se espera que cambien; se priorizan continuamente |
| **Entregas** | Una entrega grande al final (o pocas) | Entregas pequeñas y frecuentes |
| **Planificación** | Plan completo al inicio | Plan por ciclos cortos; se ajusta en cada uno |
| **Cliente** | Participa al principio (requisitos) y al final (aceptación) | Participa durante todo el proyecto |
| **Riesgo** | Los problemas se descubren tarde, al probar | Los problemas se descubren pronto, en cada entrega |
| **Documentación** | Mucha y previa al desarrollo | La necesaria, creada junto al trabajo |
| **Éxito significa** | Cumplir alcance, plazo y coste previstos | Entregar valor real al cliente |
| **Encaja mejor cuando…** | Los requisitos son estables y el cambio es caro | Hay incertidumbre y se aprende sobre la marcha |

:::note[¿Y si mi proyecto necesita un poco de las dos cosas?]
Es frecuente. Un proyecto de infraestructura con fechas y contrato cerrados puede organizar el trabajo interno por iteraciones cortas. A esas combinaciones se las llama **enfoques híbridos**. Lo importante es elegir con criterio, no por moda.
:::

### Ejemplo con Byte Alacant

*Reparaciones Byte Alacant, S. L.* (empresa ficticia) quiere un **portal de incidencias** para que sus clientes registren una avería y vean cómo avanza la reparación.

- **Enfoque predictivo:** durante dos meses se escriben los requisitos de todo el portal, otros dos se programa y se entrega a los cuatro meses. Cuando la gerente lo ve, se da cuenta de que los clientes prefieren avisar por WhatsApp y que la pantalla de seguimiento era lo único realmente importante. Hay que rehacer buena parte.
- **Enfoque ágil:** a las dos semanas ya existe un formulario sencillo para registrar la avería, funcionando. La gerente lo prueba con tres clientes y decide qué construir en las dos semanas siguientes. En el mes cuatro el portal es distinto del que se imaginó al principio, pero es el que se usa.

## 5. Los marcos de trabajo más conocidos

La agilidad es una filosofía; para aplicarla se usan **marcos** (*frameworks*) que dan reglas concretas. Estos son los que debes conocer:

| Marco | Idea central | Se organiza en… | Más información |
|---|---|---|---|
| **Scrum** | Trabajo en iteraciones de duración fija con roles, eventos y artefactos definidos | *Sprints* de hasta un mes | [1.3.2 Scrum](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/06-scrum/) |
| **Kanban** | Visualizar el trabajo y limitar lo que se hace a la vez para que fluya | Flujo continuo, sin iteraciones fijas | [1.3.1 Kanban](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/05-kanban/) |
| **XP (Extreme Programming)** | Prácticas técnicas muy exigentes para conseguir calidad con cambios constantes | Iteraciones cortas | Se menciona abajo |

### XP en dos minutos

**Extreme Programming** se centra en las prácticas de ingeniería más que en la gestión. Entre las más conocidas están:

- **Programación en parejas:** dos personas escriben el código a la vez, una teclea y otra revisa y piensa.
- **Pruebas automáticas y desarrollo guiado por pruebas (TDD):** se escribe primero una prueba que falla y después el código que la hace pasar.
- **Integración continua:** el código de todo el equipo se junta y se prueba varias veces al día (verás la idea en [1.3.3 DevOps](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/07-devops/)).
- **Refactorización:** mejorar el código sin cambiar su comportamiento.
- **Diseño simple:** hacer lo mínimo que resuelve la necesidad de hoy.

### Los marcos se combinan

En la práctica, muchos equipos mezclan: usan **Scrum** para organizar el trabajo en sprints, un **tablero Kanban** para visualizarlo y prácticas de **XP** o de **DevOps** para la calidad técnica. A esa mezcla a veces se la llama, de forma informal, «Scrumban» cuando combina Scrum y Kanban. No hay que casarse con un solo marco: hay que entender para qué sirve cada pieza.

## 6. Ventajas y límites

**Ventajas habituales**

- El cliente ve resultados pronto y puede corregir.
- Los errores y los malentendidos se descubren cuando todavía es barato arreglarlos.
- El equipo gana visibilidad sobre lo que hace y mejora de forma continua.

**Límites que conviene conocer**

- Exige **implicación real del cliente**: si nadie contesta a las dudas, no hay agilidad que valga.
- Es difícil de combinar con contratos de precio, alcance y plazo cerrados sin una conversación previa.
- Un equipo sin experiencia puede usar «somos ágiles» como excusa para no planificar ni documentar.
- Los cambios continuos obligan a tener muy buenas prácticas técnicas (pruebas, versiones, automatización).

## 7. Lo que haremos en esta unidad

En el resto de páginas de este apartado verás cada pieza con detalle, y podrás practicarlas todas en el [laboratorio «Ágil en la práctica»](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/): un tablero Kanban con límites de trabajo en curso, un sprint de Scrum, un constructor de historias de usuario, un simulador de *planning poker*, una calculadora de versiones y un pipeline de integración continua.

## Comprueba lo aprendido

1. ¿Cuál de estas afirmaciones es correcta según el manifiesto ágil: «los procesos y las herramientas no tienen valor» o «las personas y su colaboración importan más que los procesos y las herramientas»?

   <details>
   <summary>Respuesta</summary>

   La segunda. El manifiesto no dice que las herramientas y los procesos sobren, dice que se valoran **más** las personas y su forma de colaborar.
   </details>

2. Un cliente pide cambiar una pantalla cuando el proyecto va por la mitad. ¿Cómo lo recibe un equipo ágil y cómo uno predictivo?

   <details>
   <summary>Respuesta</summary>

   El equipo ágil lo ve como una oportunidad: lo añade al *backlog*, lo prioriza y lo trabaja en el siguiente ciclo corto. El predictivo suele tratarlo como una «petición de cambio» que pasa por un proceso formal de aprobación y puede alterar plazo y coste.
   </details>

3. Indica si es cierto: «Un equipo ágil no necesita documentar nada».

   <details>
   <summary>Respuesta</summary>

   Falso. Se documenta lo que alguien va a utilizar de verdad (por ejemplo, una guía de instalación o un manual), pero no se escribe una documentación enorme antes de saber si hace falta.
   </details>

4. Nombra los tres marcos ágiles de la tabla y di cuál de ellos no usa iteraciones de duración fija.

   <details>
   <summary>Respuesta</summary>

   Scrum, Kanban y XP. Kanban funciona con flujo continuo y no exige iteraciones de duración fija.
   </details>

5. ¿Por qué un proyecto de instalación de cableado con contrato de precio cerrado puede encajar peor con un enfoque totalmente ágil?

   <details>
   <summary>Respuesta</summary>

   Porque el alcance y el coste están fijados de antemano y los requisitos suelen ser estables; el valor de la flexibilidad es menor. Aun así puede organizarse el trabajo interno en ciclos cortos (enfoque híbrido).
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Ágil** | Forma de trabajar basada en entregas pequeñas y frecuentes, colaboración con el cliente y adaptación al cambio. |
| **Manifiesto Ágil** | Texto de 2001 con cuatro valores y doce principios que resume la filosofía ágil. |
| **Predictivo** | Enfoque que planifica la mayor parte del proyecto por adelantado (por ejemplo, cascada). |
| **Iteración** | Ciclo corto de trabajo que termina con un resultado revisable. |
| **Incremento** | Parte del producto terminada y utilizable que se añade en cada ciclo. |
| **Marco (*framework*)** | Conjunto de reglas y prácticas para aplicar una filosofía; Scrum y Kanban son marcos ágiles. |
| **Híbrido** | Enfoque que combina elementos predictivos y ágiles. |
| **TDD** | Desarrollo guiado por pruebas: primero se escribe la prueba y después el código. |
