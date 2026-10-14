---
title: "4. Calidad y documentación del diseño"
description: "Qué significa calidad en un proyecto, cómo definir criterios de aceptación y de verificación por entregable, qué normas y buenas prácticas existen como referencia y cómo reunir todo en una memoria de diseño clara."
---

Un proyecto puede estar bien pensado y aun así fracasar si nadie sabe cuándo está terminado, o si quien lo recibe no entiende qué se ha decidido y por qué. La **calidad** responde a la primera duda y la **documentación** a la segunda. Esta página trabaja los dos últimos aspectos del diseño: la documentación del diseño y la calidad del proyecto.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 45 minutos de lectura y 3 horas de práctica.

1. Lee las secciones 1 y 2 y completa la pestaña «Calidad» del [laboratorio](/docencia/smr/proyecto-intermodular/ud02-diseno-proyecto/laboratorios/disenador-proyecto/#calidad).
2. Lee las secciones 3 y 4 y ensambla tu memoria en la pestaña «Memoria».
3. Haz la [actividad 7](/docencia/smr/proyecto-intermodular/ud02-diseno-proyecto/actividades/) y, antes de entregar, revisa la lista de la sección 5.
:::

## 1. Qué es la calidad de un proyecto

En un proyecto, **calidad** significa que lo que entregas **cumple lo que se acordó** y sirve para lo que se necesitaba. No quiere decir «lujoso» ni «complicado». Un servicio de copias de seguridad de calidad es el que restaura los datos cuando hace falta, no el que tiene más botones.

Se gestiona con cuatro ideas:

| Idea | Pregunta | Ejemplo (copias) |
|---|---|---|
| **Requisito** | ¿Qué se prometió? | La restauración tarda menos de 2 horas |
| **Criterio de aceptación** | ¿Cómo sabremos que se cumple? | Una restauración de prueba termina en menos de 2 horas |
| **Verificación** | ¿Hemos construido lo que dijimos? (comprobar contra el requisito) | Se ejecuta la prueba y se anota el tiempo |
| **Validación** | ¿Sirve para lo que el cliente necesita? | La persona de contacto recupera por sí misma un archivo y confirma que es el que esperaba |

Verificar es comprobar que cumples la especificación; validar es comprobar que la especificación era la buena.

### 1.1 Métodos de verificación

| Método | Qué es | Cuándo se usa |
|---|---|---|
| **Prueba** | Ejecutar y medir | Funciones y rendimiento |
| **Inspección** | Mirar el resultado con una lista | Instalaciones, etiquetado, cableado |
| **Revisión** | Que otra persona lea y critique | Documentos y configuraciones |
| **Demostración** | Mostrar que funciona ante el cliente | Entrega |
| **Medición** | Registrar un valor con un instrumento | Tiempos, temperatura, consumo |

### 1.2 El plan de calidad

El **plan de calidad** es una tabla con una fila por entregable. Si un entregable no tiene criterio de aceptación, nadie podrá decir si está bien hecho.

| Entregable | Criterio de aceptación | Cómo se verifica | Responsable |
|---|---|---|---|
| Copias diarias activas | Las 5 pymes tienen una copia completa cada noche durante una semana | Revisión del registro de copias | Técnico/a de campo |
| Restauración probada | En cada pyme se restaura una copia de prueba en menos de 2 horas | Prueba y medición del tiempo | Responsable técnico |
| Manual de usuario | Una persona sin conocimientos técnicos consigue restaurar un archivo siguiéndolo | Demostración con la persona de contacto | Técnico/a de campo |
| Acta de entrega | Firmada por la persona de contacto de cada pyme | Revisión | Administración |

## 2. Normas y buenas prácticas de referencia

Algunas normas y marcos sirven de **referencia** para saber cómo se hace bien. En un pequeño proyecto no se aplican enteros, pero conviene conocerlas y, cuando toca, citar la que inspira una decisión.

:::caution[Cítalas con prudencia]
Las descripciones siguientes son orientativas. Antes de afirmar en tu memoria qué exige exactamente una norma, consulta su texto oficial o a tu profesor.
:::

| Referencia | De qué trata | Dónde puede verse en tu proyecto |
|---|---|---|
| **ISO 9001** | Sistemas de gestión de la calidad | Tener procedimientos, registrar fallos y mejorar |
| **ISO/IEC 27001** | Seguridad de la información | Proteger la confidencialidad, integridad y disponibilidad de los datos |
| **ITIL** | Buenas prácticas de gestión de servicios de TI | Registrar incidencias, acordar niveles de servicio |
| **RGPD** (Reglamento general de protección de datos de la Unión Europea) y su ley española | Tratamiento de datos personales | Cifrar copias con datos de clientes, limitar accesos, contrato con quien trata los datos |
| **Accesibilidad web (WCAG)** | Pautas para que los contenidos web sean usables por todas las personas | Si entregas una web o un manual en formato digital |
| **Prevención de riesgos laborales** | Seguridad de las personas que trabajan | Instalar con seguridad (se desarrolla en la Unidad 3) |
| **Residuos de aparatos eléctricos y electrónicos (RAEE)** | Gestión de equipos al final de su vida | Qué se hace con el equipo que sustituyes |

La **lista de comprobación** que usa el laboratorio recoge cinco aspectos: datos personales, seguridad de la información, accesibilidad, medio ambiente y licencias de software. Contesta «sí», «no» o «no aplica» con una nota; los «no» son tareas pendientes.

## 3. La memoria de diseño

La **memoria de diseño** es el documento que permite a **otra persona** entender, valorar y construir tu proyecto sin hablar contigo. Es la versión 1 del diseño; en las unidades siguientes la completarás con la planificación, el seguimiento y los resultados.

### 3.1 Índice recomendado

Un índice fijo ayuda a no olvidar nada y a que el profesor encuentre cada apartado rápido (propuesta):

| Apartado | Qué incluye |
|---|---|
| 1. Resumen | Una página: necesidad, solución, coste y plazo |
| 2. Antecedentes y necesidad | Registro de necesidades y evidencias, empresa y contexto |
| 3. Objetivos y alcance | Objetivos SMART; dentro y fuera del alcance |
| 4. Solución elegida | Matriz de ideas, estado del arte, aspecto innovador y alternativas descartadas |
| 5. Diseño técnico | Esquemas y descripción de cómo funciona |
| 6. Requisitos y partes del proyecto | Requisitos con prioridad, partes interesadas y EDT |
| 7. Recursos y presupuesto | Tabla de personas, equipos y servicios; cálculo hasta el total con IVA |
| 8. Viabilidad y riesgos iniciales | Dimensiones, decisión go/no-go, riesgos principales |
| 9. Calidad | Plan de calidad y lista de comprobación |
| 10. Conclusiones y siguientes pasos | Qué se ha decidido y qué viene |
| Anexos | Acta de ideas, fichas comparativas, fuentes |

### 3.2 Esquemas y diagramas

Un buen esquema vale más que dos páginas de texto. Para un proyecto de SMR suelen bastar:

- **Esquema de la solución:** qué equipos y servicios intervienen y cómo se conectan.
- **Esquema de red** si hay red: dispositivos, segmentos y direccionamiento.
- **Diagrama de flujo** del procedimiento clave (por ejemplo, «copia diaria → verificación → aviso»).

Reglas: un título, una leyenda si hay símbolos, texto legible al imprimir en blanco y negro, y **una frase antes o después** que explique qué se ve. Usa cualquier herramienta de diagramas; lo importante es que se entienda.

### 3.3 Escribir para que se entienda

- Frases cortas y precisas. Una idea por párrafo. Cifras con su unidad y su fuente.
- **Revisa la ortografía.** Los errores ortográficos restan credibilidad al documento y tu profesor puede tenerlos en cuenta; pregunta a qué documentos se aplica.
- **Cita las fuentes** (autor o entidad, título, fecha de consulta) y no copies textos ajenos.
- Si has usado una herramienta de inteligencia artificial, incluye una **declaración**: cuál, para qué y qué comprobaste a mano. Lo que no comprobaste, no lo afirmes.
- **Numera las versiones** (v1, v2…) y el nombre del archivo: `memoria-diseno-v1.pdf`, no `definitivo-final2.docx`.

## 4. Qué documentos produce esta unidad

| Documento | Pestaña del laboratorio |
|---|---|
| Registro de necesidades | Necesidades |
| Acta de ideas y matriz de decisión | Ideas |
| Ficha comparativa de soluciones | Ideas |
| Informe de viabilidad | Viabilidad |
| Propuesta, objetivos, alcance y EDT | Requisitos, Alcance y EDT |
| Recursos y presupuesto | Presupuesto |
| Memoria de diseño v1 | Memoria |
| Plan de calidad | Calidad |
| Guion y diapositivas del pitch | Memoria |

## 5. Lista de revisión antes de entregar

1. ¿Cada necesidad tiene evidencia y fuente?
2. ¿Hay acta con al menos seis ideas y una decisión razonada?
3. ¿Los objetivos son SMART y el alcance dice también lo que **no** entra?
4. ¿Los requisitos Must son menos del 60 % y cada uno tiene a alguien detrás?
5. ¿Las horas de la EDT coinciden con las del presupuesto?
6. ¿Los precios llevan fuente y fecha, y el IVA está bien separado?
7. ¿Cada entregable tiene criterio de aceptación?
8. ¿Se ha revisado la ortografía y se han citado las fuentes?

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre verificar y validar?

   <details>
   <summary>Respuesta</summary>

   Verificar es comprobar que lo construido cumple los requisitos escritos; validar es comprobar que cubre la necesidad real del cliente. Se puede verificar bien algo que no sirve.

   </details>

2. Escribe un criterio de aceptación medible para el requisito «el manual debe ser fácil de usar».

   <details>
   <summary>Respuesta</summary>

   Por ejemplo: «Una persona sin conocimientos técnicos restaura un archivo en menos de 10 minutos siguiendo solo el manual».

   </details>

3. ¿Qué apartados de la memoria permiten comprobar que has comparado alternativas?

   <details>
   <summary>Respuesta</summary>

   El 4 (solución elegida, con matriz de ideas y alternativas descartadas) y el 8 (viabilidad, con las alternativas técnicas).

   </details>

4. En tu proyecto se guardan copias con datos personales de los clientes de una pyme. Cita dos medidas de calidad relacionadas.

   <details>
   <summary>Respuesta</summary>

   Cifrar las copias y limitar quién puede acceder a ellas; además, firmar un contrato con la pyme que regule el tratamiento de esos datos.

   </details>

5. ¿Por qué se numeran las versiones de la memoria?

   <details>
   <summary>Respuesta</summary>

   Para saber cuál es la vigente, poder volver atrás y que todos trabajen sobre la misma. En las unidades siguientes la memoria irá creciendo.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Calidad | Grado en que lo entregado cumple lo acordado y sirve para lo que se necesitaba |
| Criterio de aceptación | Condición medible que decide si un entregable se da por bueno |
| Verificación | Comprobar que el resultado cumple los requisitos escritos |
| Validación | Comprobar que el resultado cubre la necesidad real |
| Plan de calidad | Tabla que asigna a cada entregable su criterio, su verificación y su responsable |
| Memoria de diseño | Documento que explica el proyecto y sus decisiones para que otra persona pueda valorarlo y construirlo |
| Anexo | Material de apoyo que se adjunta a la memoria |
| RGPD | Reglamento europeo de protección de datos personales |
| RAEE | Residuos de aparatos eléctricos y electrónicos |
