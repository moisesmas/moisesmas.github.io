---
title: "2.2.4 Integración de Git con Jira"
description: "Cómo conectar el control de versiones con la gestión de tareas: usar la clave de la incidencia en ramas, commits y solicitudes de fusión para enlazarlo todo, y el flujo completo de una tarea desde el tablero hasta la fusión en main."
---

Hasta ahora tenías dos herramientas con dos funciones distintas: el **tablero** (qué hay que hacer y cómo va) y **Git** (qué código o documentos cambian). Si trabajan por separado, alguien tiene que contar a mano que «la tarea 12 ya está en `main`». Si las **conectas**, cada tarea muestra sus ramas, commits y solicitudes de fusión, y cada commit explica a qué tarea pertenece. El truco es sorprendentemente sencillo: **poner la clave de la incidencia en todas partes**.

:::note[Las interfaces cambian]
La integración entre un gestor de incidencias y una plataforma de repositorios depende de cada herramienta, de cómo se haya instalado y de los permisos del administrador. Aquí se explica el **concepto y el flujo de trabajo**; las pantallas y los nombres de las opciones cambian. Consulta la ayuda oficial de tu plataforma y de tu gestor. Para hacer el ejercicio no necesitas la integración real: con el [simulador](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/simulador-git/#mensajes) puedes practicar el hábito de la clave.
:::

## 1. La idea: la clave como hilo conductor

Recuerda que una incidencia tiene una **clave única** (`PORT-12`, véase 2.1.1). Si esa clave aparece en el nombre de la rama, en los mensajes de los commits y en el título de la solicitud de fusión, las herramientas pueden **reconocerla automáticamente** y vincularlo todo.

| Dónde | Ejemplo con la incidencia `PORT-12` |
|---|---|
| **Nombre de la rama** | `feature/PORT-12-formulario-alta` |
| **Mensaje de commit** | `PORT-12: Añade el formulario de alta de avería` |
| **Título de la solicitud de fusión** | `PORT-12 Formulario de alta de avería` |

Reglas de formato de la clave: letras mayúsculas, un guion y un número, sin espacios. Si escribes `port 12` o `PORT12`, la herramienta no la reconocerá. El lado Git no se queja de nada; la vinculación, sencillamente, no se produce.

## 2. Qué se consigue con la integración

Cuando la conexión está activa (normalmente, tras instalar y autorizar una aplicación o un complemento que enlaza la plataforma de repositorios con el gestor), se obtienen estos beneficios:

- **En la incidencia**, un apartado de desarrollo con las **ramas, commits y solicitudes de fusión** que la mencionan, y su estado (abierta, aprobada, fusionada).
- **En el repositorio**, enlaces desde el mensaje del commit a la incidencia.
- **Trazabilidad:** dentro de seis meses podrás responder «¿por qué cambiamos este código?» siguiendo el commit a la tarea y de la tarea a la decisión.
- **Menos trabajo manual:** algunas configuraciones permiten crear la rama desde la propia incidencia con el nombre ya formado o mover la incidencia de estado cuando se abre o se fusiona la solicitud.
- **Mensajes con acciones:** hay integraciones que interpretan **comandos en el mensaje del commit** (en Jira se llaman *smart commits*) para añadir un comentario o registrar tiempo, por ejemplo. Dependen de la configuración y de los permisos, así que averigua primero si tu instalación los admite. Si no, haz esas acciones a mano en el tablero.

:::caution[Quién configura qué]
Instalar la integración y decidir qué acciones automáticas hay (por ejemplo, «al fusionar, pasar a Hecho») suele requerir permisos de administración. Si en tu centro no existe esa conexión, **el hábito de la clave sigue siendo útil**: cualquiera que lea el historial sabe a qué tarea corresponde cada cambio.
:::

## 3. El flujo completo de una tarea

Vamos a seguir la incidencia **PORT-12 — Formulario de alta de avería**, desde que está en el tablero hasta que está en `main`. Fíjate en qué pasa en cada herramienta.

| Paso | En el tablero | En Git |
|---|---|---|
| 1. Elegir | Eliges `PORT-12` de «Por hacer», te la asignas y la mueves a «En curso» | — |
| 2. Preparar | — | `git switch main` y `git pull` |
| 3. Crear la rama | (Si la integración lo permite, puedes crearla desde la incidencia) | `git switch -c feature/PORT-12-formulario-alta` |
| 4. Trabajar | Añades un comentario si descubres algo | Haces commits pequeños con `PORT-12:` al inicio |
| 5. Publicar | La incidencia muestra la rama y los commits | `git push -u origin feature/PORT-12-formulario-alta` |
| 6. Pedir revisión | Mueves `PORT-12` a «En revisión» | Abres la solicitud de fusión con `PORT-12` en el título |
| 7. Revisar | Compañero revisa los cambios y comenta | Atiendes los comentarios con más commits y `git push` |
| 8. Fusionar | La incidencia ve la solicitud como fusionada | La solicitud se fusiona en `main`; borras la rama |
| 9. Cerrar | Pasas `PORT-12` a «Hecho» (o lo hace la automatización) | `git switch main` y `git pull` en tu equipo |

### 3.1 Los comandos del flujo

```bash
git switch main
git pull
git switch -c feature/PORT-12-formulario-alta

# Primer cambio
git add formulario.html
git commit -m "PORT-12: Añade el formulario de alta de avería"

# Segundo cambio
git add validaciones.js
git commit -m "PORT-12: Valida el formato del teléfono"

git push -u origin feature/PORT-12-formulario-alta
# → se abre la solicitud de fusión en la plataforma, con el título "PORT-12 Formulario de alta de avería"
# → se revisa, se aprueba y se fusiona

git switch main
git pull
git branch -d feature/PORT-12-formulario-alta
```

El simulador no tiene remoto, así que no admite `pull` ni `push`; el resto de la secuencia (rama, commits, fusión y borrado de la rama) sí se puede practicar allí con las claves de la incidencia.

## 4. Buenas prácticas del equipo

1. **Una rama por incidencia.** Si una rama mezcla `PORT-12` y `PORT-13`, no se sabe qué commit pertenece a cuál.
2. **La clave al principio del mensaje.** Se lee mejor en `git log --oneline` y las herramientas la reconocen.
3. **Actualiza el estado de la incidencia cuando cambie la realidad**: al empezar, al abrir la solicitud, al fusionar. El tablero y el repositorio deben contar la misma historia.
4. **No cierres una tarea que solo está «casi» fusionada.** «Hecho» significa lo que haya acordado el equipo (revisado, probado y en `main`).
5. **Si descubres un trabajo nuevo, crea otra incidencia**; no lo cuelgues de la actual con un commit que dice «y además…».
6. **Añade el enlace en el otro sentido:** si hablas de la tarea en un correo o un documento, cita siempre la clave.
7. **Si te equivocas con la clave**, no reescribas historia compartida: ponlo en un comentario de la incidencia o de la solicitud y sigue.

## 5. Y si no tienes Jira

Todo lo anterior vale para cualquier gestor de tareas que dé números o identificadores a las tareas. En un tablero sin números (como un tablero sencillo de tarjetas), inventa tu propio identificador: puedes numerar las tarjetas en el título («T12 Formulario de alta») y usar `T12` en la rama y en los commits. No habrá vinculación automática, pero **la trazabilidad sigue funcionando** para las personas.

## 6. Qué comprobar si la vinculación no aparece

Si la incidencia no muestra la rama o el commit:

- ¿Está la clave **bien escrita** (mayúsculas, guion, número)? ¿Coincide con una incidencia que existe?
- ¿La **integración está instalada** y tu cuenta tiene permiso para el repositorio y para el proyecto?
- ¿Has hecho `git push`? La plataforma solo ve lo que has subido, no tus commits locales.
- ¿Ha pasado un poco de tiempo? Algunas sincronizaciones no son instantáneas.
- Si nada funciona, pregunta a la persona que administra el repositorio o la herramienta.

## Comprueba lo aprendido

1. ¿Dónde conviene incluir la clave `PORT-12` para que las herramientas vinculen el trabajo con la tarea?

   <details><summary>Respuesta</summary>

   En el nombre de la rama, en el mensaje de los commits y en el título de la solicitud de fusión.

   </details>

2. Escribe un nombre de rama y un mensaje de commit correctos para la incidencia `PORT-31`: «El buscador falla con tildes».

   <details><summary>Respuesta</summary>

   Por ejemplo, rama `fix/PORT-31-buscador-tildes` y mensaje `PORT-31: Corrige la búsqueda con caracteres acentuados`.

   </details>

3. Una compañera ha escrito `port 31 arreglado` en el mensaje. ¿Por qué no se vincula con la incidencia?

   <details><summary>Respuesta</summary>

   Porque la clave tiene un formato fijo (`PORT-31`: mayúsculas, guion y número). Con otro formato, la herramienta no la reconoce.

   </details>

4. ¿En qué momento del flujo pasarías la incidencia a «En revisión»?

   <details><summary>Respuesta</summary>

   Cuando ya has subido la rama y has abierto la solicitud de fusión, y estás esperando que otra persona la revise.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Integración | Conexión entre herramientas para que compartan información automáticamente |
| Clave de incidencia | Identificador único de una tarea (`PORT-12`) |
| Trazabilidad | Posibilidad de seguir un cambio desde el código hasta la tarea que lo motivó |
| *Smart commit* | Comando incluido en el mensaje del commit que ejecuta una acción en el gestor de incidencias |
| Solicitud de fusión | Petición de incorporar una rama a otra con revisión previa |
