---
title: "2.3.2 Slack y mensajería de equipo"
description: "Cómo funciona una herramienta de mensajería de equipo como Slack: canales, hilos, menciones, estados, integraciones y normas de equipo para comunicarse sin saturar a nadie."
---

Los grupos de mensajería habituales mezclan todo: fotos, bromas, dudas de clase y, entre medias, la decisión importante que nadie encuentra después. Las herramientas de **mensajería de equipo**, de las que **Slack** es la más conocida, ordenan esa conversación en **canales** por tema, con **hilos** para las respuestas y **búsqueda** para recuperar lo hablado. Bien usadas, ahorran reuniones; mal usadas, son un ruido permanente.

:::note[Las interfaces cambian]
Slack y sus competidores renuevan a menudo sus menús, funciones y planes. Aquí se explican los **conceptos y los hábitos de uso**, no las pantallas. Para una función concreta, consulta la ayuda oficial. Tampoco tiene por qué ser Slack: los mismos conceptos valen para otras herramientas de chat de equipo.
:::

## 1. Espacio de trabajo y canales

Un **espacio de trabajo** (*workspace*) agrupa a las personas de un equipo u organización. Dentro, la conversación se organiza en **canales**, cada uno con un tema:

| Tipo | Quién lo ve | Para qué |
|---|---|---|
| **Canal público** | Cualquiera del espacio puede unirse y leerlo | Temas generales: `#anuncios`, `#portal-general` |
| **Canal privado** | Solo quienes han sido invitados | Temas reservados del equipo |
| **Mensaje directo** (*DM*) | Una persona, o un grupo pequeño | Conversaciones puntuales entre pocas personas |

Una propuesta de canales para un equipo de proyecto:

- `#general`: avisos y organización.
- `#desarrollo`: dudas técnicas y avances de código.
- `#documentacion`: manuales, actas y memoria.
- `#ayuda`: preguntas que cualquiera puede contestar.
- `#git` o `#alertas`: avisos automáticos del repositorio (véase la sección de integraciones).

La regla de oro: **cada tema en su canal**. Un canal por cada cosa pequeña es excesivo, pero uno para todo es inmanejable. Ajusta con la práctica.

Cada canal puede tener un **propósito** escrito en su descripción y mensajes **fijados** (*pinned*) con lo esencial, como el enlace al tablero o las normas del equipo.

## 2. Hilos: contestar sin ensuciar el canal

Un **hilo** es una conversación dentro de un mensaje: se responde «en el hilo» y las respuestas se agrupan bajo el mensaje original, sin invadir el canal. Es la mejor herramienta contra el desorden:

- **Responde siempre en el hilo** cuando contestes a un mensaje concreto.
- **Un hilo, un tema.** Si cambia el tema, abre un mensaje nuevo.
- **Cuando se resuelva**, cierra con una conclusión («Resuelto: era la versión de la librería») para que quien llegue tarde no tenga que leerlo entero.

## 3. Menciones y avisos

Una **mención** (`@nombre`) notifica a una persona. También existen menciones a todo el canal o a quienes están conectados en ese momento. Su uso inadecuado es la mayor fuente de enfado en un equipo:

| Mención | Efecto | Cuándo |
|---|---|---|
| `@persona` | Avisa a esa persona | Cuando necesitas **su** respuesta o decisión |
| `@here` | Avisa a quien está conectado en el canal | Algo que importa **ahora** |
| `@channel` | Avisa a todos los miembros | Casi nunca: avisos importantes del equipo entero |

Al mencionar a alguien, **di qué esperas y cuándo**: «@Marta, ¿puedes revisar la guía antes del jueves?» es mejor que «@Marta mira esto».

## 4. Estados, disponibilidad y concentración

Los estados permiten indicar «en clase hasta las 12», «de baja», «concentrado» o «de viaje». Complementan la disponibilidad: **la presencia no obliga a contestar al instante**. En el trabajo remoto, o con horarios distintos, la mensajería es **asíncrona**: se escribe cuando conviene y se responde cuando se puede.

- Pon un estado cuando no estés disponible.
- Silencia las notificaciones de canales que no te atañen y activa «no molestar» cuando estudies o duermas.
- Respeta los estados y el horario de los demás.
- Para algo urgente de verdad, usa una forma que lo deje claro (una llamada, un mensaje directo con la palabra «urgente» solo si lo es).

## 5. Compartir archivos, código y enlaces

- **Archivos:** puedes subir imágenes y documentos, pero lo que debe ser permanente va a la carpeta compartida o al repositorio (véase 2.4); en el chat se quedan sepultados.
- **Código:** usa los formatos de bloque de código para que se lea bien, y no pegues trozos enormes: comparte la rama o el archivo.
- **Capturas:** sirven para ilustrar un error. Antes de subir una, comprueba que no enseña datos sensibles.
- **Enlaces:** al compartir uno, di qué es y para qué. «Mirad esto» no ayuda.
- **Mensajes guardados y recordatorios:** puedes guardar un mensaje para más tarde o programar un recordatorio. Útiles para no depender de la memoria.

## 6. Integraciones

Estas herramientas se conectan con otras mediante **integraciones** (aplicaciones): un canal puede recibir automáticamente avisos del repositorio («Marta ha abierto una solicitud de fusión»), del gestor de incidencias («PORT-12 ha pasado a Hecho») o del calendario. Conviene:

- **Una por necesidad:** no conectes todo porque se pueda.
- **Mandar los avisos automáticos a un canal propio** (`#git`, `#alertas`), no al canal de conversación humana, para que no la ahoguen.
- **Revisar los permisos** que concede cada integración antes de autorizarla: muchas piden acceso a mensajes y archivos.
- **Saber quién la administra:** la configuración suele requerir permisos de administración.

## 7. Normas de equipo para no saturar

Un chat de equipo funciona si todos aceptan unas normas. Propuesta para redactar vuestra propia lista (de una página como máximo):

1. **Cada tema, en su canal.** Cuando dudes, pregunta en el canal general.
2. **Responde en hilos.**
3. **Escribe mensajes completos**, no «hola» y esperar: «Hola, ¿puedes decirme…?» ya contiene la pregunta.
4. **Usa menciones con criterio**, sin `@channel` salvo emergencia.
5. **Plazo de respuesta acordado**: por ejemplo, durante el horario de clase en cuatro horas; fuera de él, al día siguiente.
6. **Las decisiones se anotan en un lugar estable** (el tablero, el documento del proyecto, el correo resumen), no solo en el chat.
7. **No uses el chat para lo formal**: entregas, acuerdos con clientes o con el profesorado van por correo.
8. **Respeto y buen tono.** Lo escrito se interpreta peor que lo hablado; lo que no dirías en voz alta, no lo escribas.
9. **Datos personales y credenciales, nunca**: contraseñas, claves o datos de clientes no se pegan en un chat.
10. **Las reacciones con emoji son bienvenidas**; sustituir una respuesta por una reacción (un «pulgar arriba») está bien si se ha acordado que significa «visto y de acuerdo».

:::tip[Menos reuniones, mejores reuniones]
Un canal con actualizaciones breves escritas («hoy he hecho esto, mañana haré esto, me bloquea esto») puede sustituir algunas reuniones diarias. Pero si una conversación escrita pasa de diez mensajes, mejor una llamada de cinco minutos y un resumen por escrito.
:::

## Comprueba lo aprendido

1. ¿Para qué sirve un hilo y cuándo debes usarlo?

   <details><summary>Respuesta</summary>

   Para agrupar las respuestas a un mensaje concreto sin llenar el canal. Se usa siempre que contestas a un mensaje o desarrollas un tema.

   </details>

2. Quieres que Marta revise un documento. ¿Cómo redactas el mensaje?

   <details><summary>Respuesta</summary>

   Mencionándola y diciendo qué y para cuándo: «@Marta, ¿puedes revisar la guía de instalación antes del jueves por la tarde? Está en la carpeta compartida».

   </details>

3. ¿Por qué no se debe usar `@channel` para cualquier cosa?

   <details><summary>Respuesta</summary>

   Porque avisa a todos los miembros y genera ruido; hace que la gente silencie el canal y se pierdan avisos importantes. Se reserva para emergencias o avisos que afectan a todos.

   </details>

4. ¿Dónde debe quedar escrita una decisión importante del equipo?

   <details><summary>Respuesta</summary>

   En un lugar estable: el tablero de tareas, el documento del proyecto o un correo resumen, además de en el chat. Los mensajes del chat se pierden fácilmente.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Espacio de trabajo (*workspace*) | Conjunto de personas, canales y mensajes de un equipo u organización |
| Canal | Conversación temática dentro del espacio de trabajo |
| Hilo (*thread*) | Respuestas agrupadas bajo un mensaje concreto |
| Mención | Aviso dirigido a una persona o a un grupo mediante `@` |
| Comunicación asíncrona | Cada persona escribe y responde cuando puede, sin esperar respuesta inmediata |
| Integración | Conexión de la herramienta con otras aplicaciones para recibir avisos automáticos |
