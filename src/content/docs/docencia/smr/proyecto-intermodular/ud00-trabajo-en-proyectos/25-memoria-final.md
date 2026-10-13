---
title: "3.5 Memoria final del proyecto"
description: "Estructura recomendada de la memoria final de un proyecto: portada, resumen, objetivos, planificación, diseño, desarrollo, pruebas, resultados, conclusiones, bibliografía y anexos; estilo, revisión y relación con la defensa."
---

La **memoria final** es el documento que cuenta tu proyecto de principio a fin: qué problema había, qué decidisteis, cómo lo hicisteis, qué funcionó y qué aprendisteis. Es lo que lee la persona que evalúa, y es lo que enseñarás a futuros empleadores si el proyecto es bueno. Se escribe **durante** el proyecto, no la última noche: con los documentos de las páginas anteriores ya tienes la mitad hecha.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 2 horas de práctica.

1. Lee las secciones 1 y 2.
2. En la pestaña «Memoria final» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#memoria) arma tu índice y expórtalo a Markdown.
3. Lee las secciones 3 y 4 y haz el reto 4 de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-documentacion/).
:::

:::note[Es una propuesta de estructura]
Esta unidad es una preparación propuesta por tu profesor. El índice exacto, la extensión y el formato de entrega de la memoria de tu proyecto los fijan tu profesor y la programación del módulo: pregunta antes de empezar y adapta esta estructura a lo que te indiquen.
:::

Seguimos con el ejemplo de **Reparaciones Byte Alacant, S. L.** (empresa ficticia) y su portal de incidencias.

## 1. Estructura recomendada

| Apartado | Qué responde | De dónde sacas el material |
|---|---|---|
| **Portada** | ¿Qué proyecto es y quién lo hizo? | Título, autores, curso, centro, fecha, tutor/a |
| **Índice** | ¿Dónde está cada cosa? | Generado automáticamente |
| **Resumen** | ¿De qué trata, en una página? | Se escribe al final |
| **Introducción y objetivos** | ¿Qué problema se resuelve y qué se pretende? | Registro de necesidades, objetivos |
| **Planificación y seguimiento** | ¿Cómo se organizó el trabajo y cómo fue? | Diagrama de Gantt o tablero, informes de avance, retrospectivas |
| **Diseño** | ¿Cómo se decidió construirlo? | Documento de diseño, requisitos |
| **Desarrollo** | ¿Cómo se construyó? | Registro de trabajo, repositorio, guía de instalación |
| **Pruebas** | ¿Cómo se comprobó que funciona? | Plan de pruebas y resultados |
| **Resultados** | ¿Qué se consiguió, frente a lo previsto? | Objetivos cumplidos, métricas, comentarios del cliente |
| **Conclusiones y mejoras** | ¿Qué se aprendió y qué quedaría por hacer? | Retrospectivas, backlog pendiente |
| **Bibliografía** | ¿Qué fuentes se usaron? | Lista de recursos citados |
| **Anexos** | ¿Qué documentos de apoyo hay? | Manual de usuario, backlog completo, actas |

Un esquema de índice numerado:

```text
Portada
Resumen
1. Introducción y objetivos
2. Planificación y seguimiento
3. Diseño
4. Desarrollo
5. Pruebas
6. Resultados
7. Conclusiones y líneas de mejora
Bibliografía
Anexo A. Product Backlog
Anexo B. Manual de usuario
Anexo C. Actas de revisión y retrospectiva
```

### Qué va en cada apartado

- **Resumen** (una página como máximo): necesidad, solución, resultado y conclusión principal. Es lo único que muchas personas leerán: escríbelo al final y revísalo con cuidado.
- **Introducción y objetivos**: el problema con datos, los objetivos medibles («reducir de 3 a 1 las llamadas por incidencia») y el alcance, incluido lo que **no** se hace.
- **Planificación y seguimiento**: la planificación inicial **y** lo que ocurrió de verdad. Explicar las desviaciones con honestidad puntúa más que fingir que todo salió según el plan.
- **Diseño**: las decisiones importantes y las alternativas descartadas, con diagramas.
- **Desarrollo**: lo esencial de la construcción y las dificultades superadas. No pegues páginas de código: remite al repositorio y explica solo los fragmentos relevantes.
- **Pruebas**: qué se probó, cómo y con qué resultado, con el resumen de ejecución.
- **Resultados**: contrasta lo conseguido con los objetivos; si alguno no se cumplió, dilo y explica por qué.
- **Conclusiones y mejoras**: conclusiones técnicas y personales (qué aprendiste, qué harías distinto) y las siguientes mejoras, que salen del backlog.
- **Bibliografía**: toda fuente que hayas usado, en un formato coherente (autor o entidad, título, fecha y dirección con fecha de consulta si es web).
- **Anexos**: lo que apoya pero estorbaría en el texto principal.

:::caution[Cita siempre lo que no es tuyo]
Imágenes, textos, fragmentos de código o datos que no has creado tú se citan con su fuente y su licencia. Copiar sin citar es plagio, aunque sea «solo un párrafo».
:::

## 2. Estilo

La memoria se lee por obligación y con prisa. Facilítaselo a quien la lea:

- **Claridad por encima de adorno**: frases cortas, voz activa, vocabulario preciso. Las palabras difíciles no dan más nota.
- **Impersonal o primera persona del plural**, pero siempre coherente: «se diseñó» o «diseñamos».
- **Todo afirmado se apoya en algo**: un dato, una captura, un enlace a un anexo.
- **Figuras y tablas numeradas** («Figura 3. Arquitectura del portal») y citadas en el texto.
- **Un solo formato**: mismo tipo de letra, mismos títulos, mismos márgenes; usa los estilos del procesador de textos para títulos y genera el índice automáticamente.
- **Extensión justa**: lo que pida tu profesor. Una memoria larga y vacía no mejora una corta y precisa.
- **Honestidad**: describe lo que hiciste tú y lo que hizo el equipo; reconoce lo que no funcionó.

## 3. Revisión antes de entregar

Deja al menos un día entre terminar de escribir y revisar. Lista de comprobación:

| Revisa | Pregunta |
|---|---|
| **Contenido** | ¿Están todos los apartados y se responde a lo que pide el enunciado? |
| **Coherencia** | ¿Los objetivos de la introducción se retoman en los resultados y en las conclusiones? |
| **Datos** | ¿Cifras, fechas y nombres son iguales en todas las partes? |
| **Referencias** | ¿Cada figura está citada? ¿Cada fuente aparece en la bibliografía? |
| **Redacción** | ¿Ortografía, puntuación y frases demasiado largas? |
| **Formato** | ¿Portada, numeración de páginas, índice actualizado? |
| **Datos personales** | ¿Has eliminado nombres, correos o números de personas reales? |
| **Archivo** | ¿Se abre bien en otro equipo? ¿Lo exportas en el formato que se pide? |

:::tip[Pide una lectura externa]
Que otro equipo (o una persona que no conoce tu proyecto) lea tu resumen y la introducción y te diga qué ha entendido. Lo que no entienda, no estaba claro.
:::

## 4. La memoria y la defensa del proyecto

La memoria y la **defensa** (la presentación oral del proyecto) se complementan:

| | Memoria | Defensa |
|---|---|---|
| **Formato** | Escrito, detallado | Oral, con apoyo visual |
| **Función** | Dejar constancia y permitir la evaluación en profundidad | Convencer y responder preguntas en directo |
| **Qué cuenta** | El proceso y las decisiones, con evidencias | Lo esencial y la capacidad de explicarlo |
| **Tiempo** | Semanas de trabajo | Unos minutos |

Cómo se relacionan en la práctica:

- **La estructura es la misma**: necesidad, solución, cómo se hizo, qué se consiguió, qué se aprendió. Prepara la presentación a partir del índice de la memoria.
- **La defensa no lee la memoria**: elige tres o cuatro ideas, una demostración corta del producto funcionando y las lecciones aprendidas.
- **La memoria te prepara las preguntas**: quien lea tu memoria preguntará por lo que no quede claro, por las decisiones y por las desviaciones. Si has escrito con honestidad, tendrás respuestas.
- **Coherencia**: lo que dices no puede contradecir lo que has escrito. Revisa que los datos coincidan.

## Comprueba lo aprendido

1. ¿Por qué se escribe el resumen al final aunque aparezca al principio?

   <details><summary>Respuesta</summary>

   Porque debe contar el resultado real y las conclusiones del proyecto, que solo se conocen al terminar.
   </details>

2. En «Planificación y seguimiento», ¿basta con copiar el plan inicial?

   <details><summary>Respuesta</summary>

   No. Hay que mostrar también lo que ocurrió de verdad (retrasos, cambios, decisiones) y explicar las desviaciones. Es lo que demuestra que se hizo seguimiento.
   </details>

3. ¿Dónde pondrías el manual de usuario completo y por qué?

   <details><summary>Respuesta</summary>

   En un **anexo**: apoya al proyecto pero alargaría y rompería el texto principal. En el cuerpo se menciona y se remite al anexo.
   </details>

4. Dos objetivos de la introducción no aparecen después en los resultados. ¿Qué fallo es y cómo se corrige?

   <details><summary>Respuesta</summary>

   Es un fallo de **coherencia**. Se corrige añadiendo en los resultados si cada objetivo se cumplió o no (y por qué), o revisando los objetivos si cambiaron durante el proyecto.
   </details>

5. Nombra dos diferencias entre memoria y defensa.

   <details><summary>Respuesta</summary>

   La memoria es escrita y detallada, y permite una evaluación en profundidad; la defensa es oral, breve y se centra en lo esencial y en responder preguntas.
   </details>

## Glosario

| Término | Definición |
|---|---|
| Memoria final | Documento que recoge todo el proyecto: problema, planificación, diseño, desarrollo, pruebas, resultados y conclusiones |
| Resumen | Texto breve, de una página como máximo, que sintetiza el proyecto y sus resultados |
| Anexo | Documento de apoyo que se adjunta fuera del cuerpo principal |
| Bibliografía | Lista de las fuentes consultadas y citadas |
| Línea de mejora | Posible evolución futura del proyecto que no se ha podido abordar |
| Defensa | Presentación oral del proyecto ante quien lo evalúa |
| Plagio | Presentar como propio un trabajo ajeno sin citar la fuente |
