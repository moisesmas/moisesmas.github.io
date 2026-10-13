---
title: "3.2 Informes de avance: Sprint Review y Retrospectiva"
description: "Cómo enseñar el trabajo hecho en la Sprint Review, cómo mejorar la forma de trabajar en la Sprint Retrospective con formatos sencillos, y cómo redactar un informe de avance semanal breve."
---

Un equipo que trabaja sin parar a mirar atrás hace dos cosas mal: no se entera de si va en la dirección correcta y repite los mismos errores. Los **informes de avance** resuelven las dos cosas. La **Sprint Review** mira el **producto** («¿qué hemos construido y sirve?»); la **Sprint Retrospective** mira el **equipo** («¿cómo hemos trabajado y qué cambiamos?»). Un informe semanal breve mantiene informado a todo el mundo entre una y otra.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 1 hora de práctica.

1. Lee las secciones 1 y 2 y haz una retrospectiva simulada en la pestaña «Retrospectiva» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#retrospectiva).
2. Lee las secciones 3 y 4 y haz el reto 2 de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-documentacion/).
:::

Seguimos con el portal de incidencias de **Reparaciones Byte Alacant, S. L.** (empresa ficticia). Los eventos Scrum se explican en la página 1.3.2 Scrum; aquí nos centramos en el **documento** que cada uno deja.

## 1. Sprint Review: enseñar lo que funciona

La **Sprint Review** es el evento que cierra el sprint. Según la Guía de Scrum 2020, el equipo presenta los resultados a las personas interesadas y se habla del progreso hacia el Product Goal. No es una demostración de diapositivas ni una «reunión de informe de estado»: es una **sesión de trabajo** en la que se inspecciona el incremento y se adapta el Product Backlog según lo que se vea.

### A quién va dirigida

| Quién | Qué aporta |
|---|---|
| Equipo Scrum (Product Owner, Scrum Master, Developers) | Presenta, responde y toma nota |
| Cliente o usuarios clave | Dicen si lo construido sirve y qué falta |
| Otras personas interesadas | Detectan impactos que el equipo no ve |

En el proyecto de clase, el «cliente» puede ser tu profesor y el resto de equipos, las personas interesadas.

### Qué se muestra

- **Funcionamiento real**, no capturas ni promesas: el incremento ejecutándose. Si no funciona, no se muestra como terminado.
- Solo lo que cumple la **Definición de Hecho** (véase 3.1 Requisitos y Product Backlog).
- El estado del **Product Backlog**: qué queda, qué ha cambiado, qué es probable que sea lo siguiente.
- Lo que **no** se ha podido terminar, con una explicación honesta.

:::note[Esquema de una Review de 30 minutos]
1. El Product Owner recuerda el objetivo del sprint y qué elementos se comprometieron (3 min).
2. El equipo muestra cada elemento terminado con el producto en marcha (15 min).
3. Las personas asistentes preguntan y proponen cambios (7 min).
4. El Product Owner comenta cómo queda el backlog y qué se hará a continuación (5 min).
:::

### Informe de revisión

Una acta breve evita que los acuerdos se olviden. Con una página basta:

```text
INFORME DE REVISIÓN DEL SPRINT 2 - Portal de incidencias
Fecha: 14/11    Asistentes: equipo (4), profesor (cliente)

Objetivo del sprint: que un cliente pueda abrir y consultar incidencias.

Terminado (cumple la Definición de Hecho):
- PB-01 Abrir una incidencia
- PB-02 Consultar el estado

No terminado:
- PB-03 Avisos por correo (falta configurar el envío; pasa al sprint 3)

Comentarios del cliente:
- Quiere poder adjuntar una foto del equipo averiado.
- El campo "urgencia" no se entiende; propone "Parado / Con molestias".

Cambios en el backlog:
- Nuevo PB-09 Adjuntar fotografía (Should).
- PB-05 sube de prioridad.
```

## 2. Sprint Retrospective: mejorar cómo trabajamos

La **Sprint Retrospective** cierra el sprint después de la Review. Su propósito, según la Guía de Scrum, es planificar formas de aumentar la calidad y la eficacia. El equipo examina cómo fue el sprint con respecto a las personas, las interacciones, los procesos, las herramientas y la Definición de Hecho, y acuerda mejoras concretas para el siguiente (en la práctica, una o dos bien elegidas).

Reglas que hacen que funcione:

- Es del **equipo**: no se invita al cliente.
- Se critican los **procesos**, no a las personas. «El código se subía sin revisar» y no «Marta no revisa».
- Sale **algo accionable**: sin acuerdos concretos, es solo una charla.
- Se hace **siempre**, también cuando el sprint fue bien.

### Formatos habituales

No hay un formato obligatorio. Tres que funcionan bien con equipos jóvenes:

**Empezar / Parar / Continuar**

| Columna | Pregunta | Ejemplo |
|---|---|---|
| **Empezar** | ¿Qué deberíamos empezar a hacer? | Revisar el código entre parejas antes de subirlo |
| **Parar** | ¿Qué deberíamos dejar de hacer? | Cambiar requisitos por mensajería sin apuntarlo en el backlog |
| **Continuar** | ¿Qué funciona y debemos mantener? | La reunión diaria de 10 minutos |

**Lo que fue bien / Lo que fue mal / A mejorar**

Parecido al anterior, pero la tercera columna recoge directamente ideas de cambio a partir de lo que salió mal. Es más cómodo cuando el equipo prefiere empezar describiendo hechos antes de proponer cosas.

**Otros formatos**

Existen variantes con metáforas (un barco con viento y anclas, por ejemplo) o con la pregunta de las cuatro columnas «Me gustó / Eché en falta / Aprendí / Deseé». Sirven para cambiar de aires cuando el equipo se aburre del mismo formato.

### Desarrollo en 30-45 minutos

1. **Abrir (5 min).** El Scrum Master recuerda las reglas y las mejoras acordadas la vez anterior.
2. **Recoger datos (10 min).** Cada persona escribe notas individualmente, sin hablar, y las pega en las columnas.
3. **Agrupar y votar (10 min).** Se juntan notas parecidas. Cada persona dispone de 3 votos para marcar lo que más importa.
4. **Decidir (10 min).** Del tema más votado se acuerdan **acciones concretas**: qué, quién y para cuándo.
5. **Cerrar (2 min).** Se anotan los acuerdos y se revisarán al inicio de la siguiente retrospectiva.

### Acuerdos y seguimiento

Una mejora vaga («comunicarnos más») no se puede comprobar. Una mejora útil es concreta:

| Acuerdo | Responsable | Plazo | Cómo sabremos que funciona |
|---|---|---|---|
| Revisión por parejas antes de fusionar cualquier cambio | Todo el equipo | Desde el próximo sprint | Ningún cambio se fusiona sin una revisión anotada |
| Actualizar el backlog el mismo día que cambia un requisito | Product Owner | Inmediato | El backlog coincide con lo hablado |

La Guía de Scrum indica que las mejoras de mayor impacto se abordan cuanto antes y que pueden añadirse incluso al Sprint Backlog del siguiente sprint, para que se hagan de verdad. Al abrir la siguiente retrospectiva, **lo primero** es revisar si se cumplieron los acuerdos anteriores.

:::caution[Cuidado con las retrospectivas «de quejas»]
Si siempre sale lo mismo y nunca se hace nada, la gente deja de participar. Elegir una o dos acciones por sprint, pequeñas y con responsable, funciona mejor que una lista de diez que nadie cumple.
:::

## 3. Informe de avance semanal

Entre una Review y la siguiente, el equipo, el profesor o el cliente quieren saber cómo va el proyecto sin leer cien mensajes. El **informe de avance** responde en una página y siempre con la misma estructura, para que se pueda leer en un minuto.

```text
INFORME DE AVANCE - Semana del 10 al 14 de noviembre
Proyecto: Portal de incidencias (Reparaciones Byte Alacant, S. L.)

1. Resumen (semáforo): AMARILLO
   Vamos a ritmo, pero los avisos por correo se retrasan.

2. Lo hecho esta semana
   - Formulario de alta de incidencias terminado y probado.
   - Consulta de estado terminada.

3. Lo previsto para la próxima semana
   - Adjuntar fotografía.
   - Empezar los avisos por correo.

4. Problemas y riesgos
   - El servicio de correo de pruebas no está configurado. Riesgo: retraso de 3 días.
     Acción: pedir el acceso al profesor el lunes.

5. Decisiones necesarias
   - ¿Se aplaza PB-03 al sprint siguiente? Responde el Product Owner antes del miércoles.

6. Métricas
   - Elementos terminados: 5 de 8 comprometidos. Horas dedicadas: 22.
```

Consejos para que sirva:

- **Hechos, no sensaciones**: «5 de 8 elementos terminados» y no «vamos bien».
- **Honestidad temprana**: un problema comunicado el lunes es un aviso; el viernes, una excusa.
- **Una decisión pendiente** con su responsable y fecha es mejor que un «estamos a la espera».
- **Mismo formato siempre**: quien lo lee sabe dónde mirar.

## Comprueba lo aprendido

1. ¿Qué mira la Sprint Review y qué mira la Retrospectiva?

   <details><summary>Respuesta</summary>

   La **Review** mira el **producto**: qué se ha construido y si sirve, con las personas interesadas presentes. La **Retrospectiva** mira el **equipo**: cómo se ha trabajado y qué se mejora, solo con el equipo.
   </details>

2. ¿Puedes mostrar en la Review un elemento que funciona «casi» pero no cumple la Definición de Hecho?

   <details><summary>Respuesta</summary>

   No se presenta como terminado: no forma parte del incremento. Se puede comentar como trabajo en curso, pero debe quedar claro que no está hecho y volverá al backlog.
   </details>

3. Escribe una nota de «Parar» que critique un proceso, no a una persona.

   <details><summary>Respuesta</summary>

   Por ejemplo: «Dejar de cambiar el código directamente en la rama principal sin revisión». Habla del proceso, no de quién lo hizo.
   </details>

4. ¿Qué hace que un acuerdo de retrospectiva sea bueno?

   <details><summary>Respuesta</summary>

   Que sea **concreto**, tenga **responsable** y **plazo**, y se pueda **comprobar** si se ha cumplido. Y que se revise al comenzar la siguiente retrospectiva.
   </details>

5. ¿Qué dos cosas debería tener siempre la sección de problemas de un informe de avance?

   <details><summary>Respuesta</summary>

   El **impacto** (qué retraso o riesgo supone) y la **acción** para resolverlo, con responsable.
   </details>

## Glosario

| Término | Definición |
|---|---|
| Sprint Review | Evento que cierra el sprint: se inspecciona el incremento con las personas interesadas y se adapta el backlog |
| Sprint Retrospective | Evento del equipo para planificar mejoras de su forma de trabajar |
| Incremento | Resultado utilizable del sprint que cumple la Definición de Hecho |
| Empezar / Parar / Continuar | Formato de retrospectiva con tres columnas |
| Acuerdo de mejora | Acción concreta, con responsable y plazo, decidida en una retrospectiva |
| Informe de avance | Documento breve y periódico con lo hecho, lo previsto, los problemas y las decisiones pendientes |
| Semáforo | Indicador de estado del proyecto: verde (bien), amarillo (atención) o rojo (en riesgo) |
