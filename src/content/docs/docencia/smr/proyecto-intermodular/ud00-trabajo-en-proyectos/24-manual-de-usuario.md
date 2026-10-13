---
title: "3.4 Manual de usuario"
description: "Cómo escribir un manual de usuario que se entienda: a quién va dirigido, qué estructura lleva, cómo redactar tareas paso a paso, cuándo usar capturas, preguntas frecuentes y criterios de accesibilidad."
---

El mejor producto del mundo fracasa si quien lo recibe no sabe usarlo. Un **manual de usuario** es el documento que enseña a manejar el producto **sin ayuda del equipo que lo hizo**. No es el documento técnico (no explica cómo está hecho), sino una guía para quien tiene una tarea que hacer y quiere hacerla cuanto antes.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 35 minutos de lectura y 1 hora y media de práctica.

1. Lee las secciones 1 a 3.
2. Evalúa el texto de ejemplo en la pestaña «Manual de usuario» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#manual).
3. Lee las secciones 4 y 5 y haz el reto 4 de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-documentacion/).
:::

El ejemplo es el **portal de incidencias** de la empresa ficticia **Reparaciones Byte Alacant, S. L.**, que usan los clientes del taller: gerentes de pequeñas empresas, no informáticos.

## 1. A quién va dirigido

Antes de escribir una línea, define a **quién** escribes. Responde a estas preguntas por escrito:

| Pregunta | Ejemplo |
|---|---|
| ¿Quién usará el producto? | Gerentes y administrativos de pymes clientes del taller |
| ¿Qué nivel técnico tienen? | Usan el correo y la web a diario; no saben qué es una base de datos |
| ¿Qué quieren conseguir? | Avisar de una avería y saber en qué punto está |
| ¿Dónde y cómo lo leerán? | En el trabajo, con el portal abierto en otra ventana |
| ¿Qué palabras conocen? | «Avería», «presupuesto»; no «ticket» ni «workflow» |

El manual se escribe **para esa persona**, no para el equipo. Si tienes dos tipos de usuario (clientes y personal del taller), escribe dos manuales o dos partes claramente separadas.

## 2. Estructura de un manual

Una estructura que funciona para casi cualquier producto:

| Apartado | Qué contiene |
|---|---|
| **Portada** | Producto, versión, fecha, contacto de ayuda |
| **Introducción** | Para qué sirve el producto y a quién va dirigido el manual; cómo se usa el propio manual |
| **Primeros pasos** | Cómo acceder (o instalar) y cómo es la pantalla principal |
| **Tareas** | Una sección por cada cosa que el usuario quiere hacer, con pasos numerados |
| **Preguntas frecuentes** | Dudas que se repiten, con respuestas cortas |
| **Solución de problemas** | Mensajes de error comunes y qué hacer |
| **Glosario** | Los términos que no se pueden evitar, explicados |
| **Contacto y ayuda** | A quién preguntar, en qué horario y por qué medio |

:::note[Organiza por tareas, no por pantallas]
Quien consulta un manual no quiere saber «qué hace el menú Opciones», quiere saber «cómo cambio mi contraseña». Titula las secciones con verbos o con la tarea («Abrir una incidencia») y no con nombres de menús.
:::

## 3. Lenguaje claro

El objetivo es que se entienda a la primera. Reglas prácticas:

- **Frases cortas**: una idea por frase; si pasa de 25 palabras, divídela.
- **Voz directa**: «Pulsa Enviar», no «Deberá procederse al envío».
- **Palabras del usuario**: usa los mismos nombres que aparecen en la pantalla («botón *Abrir incidencia*») y mantén siempre el mismo término para la misma cosa.
- **Sin jerga** o, si es inevitable, explicada la primera vez.
- **Un orden lógico**: lo más habitual primero, lo raro después.
- **Verbos de acción al principio** de cada paso: Abre, Escribe, Selecciona, Pulsa.

| Mejor evitar | Mejor escribir |
|---|---|
| «Proceda a instanciar un nuevo ticket» | «Pulsa *Abrir incidencia*» |
| «El sistema validará los campos» | «Si falta algún dato, verás un aviso en rojo junto al campo» |
| «Es trivial» / «simplemente» | (se elimina: lo que es trivial para ti puede no serlo para quien lee) |

## 4. Tareas paso a paso

El corazón del manual. Una buena sección de tarea tiene:

1. **Título con verbo**: «Abrir una incidencia».
2. **Para qué sirve / cuándo se usa**, en una frase.
3. **Antes de empezar**: lo que necesitas (por ejemplo, haber iniciado sesión).
4. **Pasos numerados**, uno por acción.
5. **Resultado**: qué verás cuando termines.
6. **Si algo falla**: el error más probable y qué hacer.

Ejemplo:

```text
Abrir una incidencia

Úsalo cuando un equipo de tu empresa se ha averiado y quieres que lo revisemos.

Antes de empezar: ten a mano el número de serie del equipo (viene en la
etiqueta de la parte trasera) y haber iniciado sesión.

1. En el menú superior, pulsa "Nueva incidencia".
2. En "Equipo", elige el equipo averiado de la lista.
3. En "¿Qué ocurre?", describe el problema con tus palabras.
4. En "Urgencia", elige "Parado" si no puedes trabajar o "Con molestias"
   si puedes seguir trabajando.
5. Pulsa "Enviar".

Resultado: verás el mensaje "Incidencia recibida" y su número.
Te enviaremos un correo cada vez que cambie de estado.

Si no aparece tu equipo en la lista: llama al 000 000 000 (teléfono ficticio)
y lo daremos de alta.
```

Fíjate en que cada paso es **una sola acción**, con el nombre exacto del elemento entre comillas o en cursiva. Si un paso lleva «y luego», divídelo.

### Capturas de pantalla con criterio

Una imagen puede ahorrar cien palabras, pero también añadir ruido y quedarse obsoleta. Úsalas así:

- **Una captura por paso clave**, no por cada clic.
- **Recórtalas** a la zona relevante y marca con un recuadro o una flecha el elemento del paso.
- **No sustituyas el texto**: el paso se debe entender sin la imagen (quien usa un lector de pantalla no la ve).
- **Texto alternativo**: describe lo que la imagen enseña y para qué sirve.
- **Sin datos reales**: usa datos de ejemplo; nunca nombres, correos ni números de clientes de verdad.
- **Revísalas** con cada versión: una captura de un botón que ya no existe confunde más que no tener ninguna.

## 5. Preguntas frecuentes y accesibilidad

### Preguntas frecuentes (FAQ)

Recoge las dudas que se repiten, con la **pregunta tal y como la haría el usuario** y una respuesta corta que remita a la sección donde se explica:

| Pregunta | Respuesta |
|---|---|
| «¿Cómo sé si ya han recibido mi aviso?» | Recibirás un correo y la incidencia aparecerá en *Mis incidencias* con el estado «Recibida» (véase *Abrir una incidencia*) |
| «He olvidado mi contraseña» | Pulsa *¿Has olvidado tu contraseña?* en la pantalla de acceso y sigue las instrucciones del correo |

Mientras el producto se usa, las dudas reales que lleguen al soporte son la mejor fuente: cada pregunta que se repite tres veces merece entrar en la lista.

### Accesibilidad del propio manual

Un manual tiene que poder leerlo **cualquier persona**, incluida quien tiene una discapacidad visual, motora o cognitiva. Las pautas de accesibilidad web (WCAG) ofrecen criterios detallados; lo mínimo que puedes hacer:

- **Estructura real**: usa títulos y listas del programa en lugar de solo negritas y guiones, para que un lector de pantalla pueda navegar.
- **Contraste suficiente** entre texto y fondo, y tamaño de letra cómodo.
- **No uses solo el color** para transmitir un significado («lo marcado en rojo»): añade texto o símbolo.
- **Texto alternativo** en las imágenes que aportan información.
- **Enlaces con texto que se entienda** («ver la guía de instalación», no «pulsa aquí»).
- **Lenguaje sencillo**: ayuda a todo el mundo, y especialmente a quien lee en una segunda lengua.
- **Formato digital** (HTML o PDF etiquetado) además del papel, si es posible.

### Probar el manual

La única forma de saber si un manual funciona es **ponerlo a prueba**: pídele a una persona que no conoce el producto que haga una tarea solo con el manual, mientras tú **observas sin ayudar**. Donde dude, se equivoque o pregunte, hay un fallo del manual, no de la persona. Corrige y repite.

## Comprueba lo aprendido

1. ¿Por qué es mejor titular una sección «Cambiar la contraseña» que «Menú Cuenta»?

   <details><summary>Respuesta</summary>

   Porque la persona busca **hacer una tarea**, no conocer la estructura de la pantalla. Titular por tarea permite encontrar la respuesta enseguida.
   </details>

2. Reescribe este paso: «Procederás a introducir los datos del dispositivo y posteriormente enviarás el formulario».

   <details><summary>Respuesta</summary>

   Se divide en acciones y se usa voz directa: «3. Escribe el nombre y el número de serie del equipo. 4. Pulsa *Enviar*.»
   </details>

3. Menciona tres buenas prácticas con las capturas de pantalla.

   <details><summary>Respuesta</summary>

   Por ejemplo: recortar a la zona relevante y marcar el elemento; que el texto se entienda sin la imagen; usar datos de ejemplo y no reales; poner texto alternativo; revisarlas en cada versión.
   </details>

4. ¿Por qué es un problema escribir «las incidencias urgentes aparecen en rojo» y nada más?

   <details><summary>Respuesta</summary>

   Porque depende solo del color: no lo distingue quien no ve bien los colores ni quien usa un lector de pantalla. Hay que añadir un texto o símbolo («Urgente»).
   </details>

5. ¿Cómo compruebas que tu manual funciona de verdad?

   <details><summary>Respuesta</summary>

   Pidiendo a alguien que no conoce el producto que haga una tarea solo con el manual, mientras se observa sin ayudar. Los puntos donde duda o se equivoca indican qué corregir.
   </details>

## Glosario

| Término | Definición |
|---|---|
| Manual de usuario | Documento que enseña a una persona a usar un producto sin ayuda del equipo que lo creó |
| Usuario final | Persona que utiliza el producto para hacer su trabajo, normalmente sin conocimientos técnicos |
| Tarea | Algo concreto que el usuario quiere conseguir con el producto |
| FAQ | Lista de preguntas frecuentes con sus respuestas |
| Texto alternativo | Descripción escrita de una imagen para quien no puede verla |
| Lector de pantalla | Programa que lee en voz alta el contenido de la pantalla |
| WCAG | Pautas internacionales de accesibilidad para el contenido web |
| Prueba de usabilidad | Observación de una persona haciendo una tarea con el producto para detectar problemas |
