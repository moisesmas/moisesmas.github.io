---
title: "2.2.3 Clientes Git gráficos"
description: "Qué aportan los clientes gráficos de Git frente a la terminal, qué tipos existen (integrados en el editor y de escritorio), qué conviene mirar al elegir uno y cómo equivalen sus botones a las órdenes que ya conoces."
---

Hasta ahora has usado Git escribiendo órdenes. Es la forma más universal, pero no la única: existen programas con ventanas, botones y dibujos del historial que ejecutan esas mismas órdenes por ti. Se llaman **clientes Git gráficos** (o interfaces gráficas de Git, *GUI*). Esta página te ayuda a decidir cuándo te conviene uno y cómo elegirlo sin perderte.

:::note[Las interfaces cambian]
Los programas que se nombran aquí cambian de aspecto, de precio y de funciones con frecuencia, y aparecen otros nuevos. Esta página no recomienda ninguno como «oficial» ni describe pantallas: te da criterios para evaluar cualquiera. Para instalar y usar uno concreto, consulta su documentación.
:::

## 1. Qué aporta un cliente gráfico

Un cliente gráfico no es «otro Git»: por debajo se usa el mismo Git de siempre. Lo que añade es **comodidad visual**:

| Aportación | Para qué sirve |
|---|---|
| **Grafo del historial** | Ver las ramas y fusiones dibujadas, como en el esquema de 2.2.2, en lugar de leer `git log --graph` |
| **Cambios archivo a archivo** | Ver lado a lado qué ha cambiado, con colores, y elegir qué líneas incluir en el commit |
| **Preparar con casillas** | Marcar archivos o incluso líneas sueltas para el commit, sin escribir rutas |
| **Resolución de conflictos asistida** | Ver «mi versión», «la suya» y el resultado en columnas, y elegir con un clic |
| **Menos errores de escritura** | Los nombres de rama se eligen de una lista; no hay erratas |
| **Integración con la plataforma** | Algunos permiten abrir solicitudes de fusión o ver el estado de las comprobaciones |

Y lo que **no** da: no te evita entender qué está pasando. Quien solo conoce los botones se queda sin recursos cuando un botón dice «error» o cuando trabaja en un servidor sin entorno gráfico, donde solo hay terminal.

:::tip[Una regla práctica]
Aprende primero las órdenes (por eso hay un simulador de terminal), y usa el cliente gráfico como **ayuda visual**. Cuando entiendas qué hace cada botón, serás más rápido que con cualquiera de los dos métodos por separado.
:::

## 2. Tipos de clientes

### 2.1 Integrados en el editor o IDE

La mayoría de editores de código y entornos de desarrollo incluyen un panel de control de versiones: ves los archivos modificados, haces commit, cambias de rama y resuelves conflictos sin salir del editor. Ejemplos conocidos, por nombre: **Visual Studio Code**, los entornos de la familia **JetBrains**, **Visual Studio** y editores similares.

- **Ventajas:** no cambias de ventana; los cambios aparecen marcados en el propio código; muy cómodos para el día a día.
- **Inconvenientes:** el grafo del historial puede ser más limitado y, según el editor, algunas funciones solo aparecen en extensiones adicionales.

### 2.2 Aplicaciones de escritorio dedicadas

Programas independientes cuyo único trabajo es Git. Algunos ejemplos citados por su nombre: **GitHub Desktop**, **GitKraken**, **Sourcetree**, **TortoiseGit** (que se integra con el explorador de archivos de Windows) o **Git Cola**. Cada uno tiene su enfoque: unos son muy sencillos y se centran en el flujo básico; otros ofrecen grafos muy detallados y herramientas avanzadas.

- **Ventajas:** mejor visualización del historial y de las ramas; herramientas avanzadas.
- **Inconvenientes:** hay que instalarlos y mantenerlos actualizados; algunos tienen condiciones de uso o precios que dependen del plan y de si el uso es personal, educativo o profesional.

### 2.3 Interfaces en la web de la plataforma

Las plataformas de alojamiento de repositorios permiten ver el historial, comparar ramas, revisar solicitudes de fusión e incluso editar un archivo desde el navegador. Son útiles para **revisar**, y menos para el trabajo diario, porque te obligan a descargar y subir cambios manualmente.

## 3. Cómo elegir (y qué mirar)

No hay un «mejor cliente», hay uno que encaja con tu equipo. Una lista de criterios para comparar:

1. **¿Funciona en tu sistema operativo?** Windows, macOS, Linux; y en los equipos del centro, ¿puedes instalarlo?
2. **Licencia y coste.** ¿Es gratuito, de pago o con un plan limitado? ¿Permite uso educativo? Comprueba las condiciones actuales en la web del fabricante.
3. **Claridad.** ¿Entiendes sin esfuerzo qué ha cambiado y en qué rama estás? Prueba con un repositorio de ejemplo.
4. **Grafo del historial.** ¿Se ve de forma legible cuando hay varias ramas y fusiones?
5. **Resolución de conflictos.** ¿Ofrece una vista de tres columnas? ¿Te deja volver atrás?
6. **Integración con tu plataforma y tu gestor de incidencias.** Por ejemplo, ¿se conecta con tu cuenta?
7. **Acceso a la terminal.** ¿Puedes ejecutar una orden a mano si hace falta? Es una señal de que no te encierra.
8. **Mantenimiento.** ¿Se actualiza con frecuencia? ¿Hay documentación y comunidad?

Una buena prueba antes de decidir: crea un repositorio de prueba, haz tres commits, crea una rama, provoca un conflicto sencillo y resuélvelo. Si lo has hecho sin frustrarte, te sirve.

## 4. De los botones a las órdenes

Los nombres cambian, pero los conceptos son los de siempre. Aprende a traducir:

| En el cliente gráfico (aproximadamente) | La orden que ejecuta |
|---|---|
| «Cambios» / «Staging» | `git status` |
| Marcar un archivo / «Stage» | `git add archivo` |
| Quitar el marcado / «Unstage» | `git restore --staged archivo` |
| «Descartar cambios» | `git restore archivo` |
| «Commit» con mensaje | `git commit -m "mensaje"` |
| «Nueva rama» | `git switch -c nombre` |
| Cambiar de rama (doble clic) | `git switch nombre` |
| «Fusionar» / «Merge» | `git merge nombre` |
| «Enviar» / «Push» | `git push` |
| «Traer» / «Pull» | `git pull` |
| «Obtener» / «Fetch» | `git fetch` |
| Ver el grafo | `git log --oneline --graph --all` |

Algunos clientes muestran la orden real que ejecutan en una consola o un registro: aprovéchalo para aprender.

## 5. Credenciales y seguridad

Al conectar un cliente gráfico con la plataforma de tu equipo, se te pedirá acceso: una cuenta, una clave SSH o un **token** (una especie de contraseña específica para una herramienta). Buenas prácticas:

- **Usa los métodos que recomiende tu plataforma**, normalmente un token o una clave en lugar de tu contraseña principal.
- **No compartas** tus claves ni tokens, ni los pegues en el chat de grupo ni en el repositorio.
- **En equipos compartidos del centro**, cierra la sesión y, si has guardado credenciales, elimínalas al terminar.
- **Concede los permisos mínimos** que pida la herramienta; desconfía de las que piden acceso a todo.
- Si sospechas que una clave ha quedado expuesta, **revócala** desde la plataforma y crea otra.

## 6. Y si el equipo usa herramientas distintas

Es habitual que en un equipo una persona use la terminal, otra un editor y otra un cliente de escritorio. No hay problema: todos trabajan sobre el mismo repositorio y las mismas reglas (mensajes, ramas, solicitudes de fusión). Lo que sí conviene acordar es lo que **no** depende de la herramienta: la convención de nombres de rama, el formato de los mensajes y el flujo de revisión.

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre un cliente gráfico y Git?

   <details><summary>Respuesta</summary>

   Git es el sistema de control de versiones; el cliente gráfico es un programa que ofrece botones y vistas para ejecutar las mismas órdenes de Git. El historial y las ramas son los mismos.

   </details>

2. Nombra dos ventajas de un cliente integrado en el editor.

   <details><summary>Respuesta</summary>

   No hay que cambiar de ventana y los cambios aparecen marcados directamente en el código. Facilita el trabajo del día a día.

   </details>

3. ¿Qué orden de la terminal equivale al botón «Descartar cambios» de un archivo?

   <details><summary>Respuesta</summary>

   `git restore archivo`. Como en la terminal, los cambios descartados no se pueden recuperar.

   </details>

4. Tienes que elegir un cliente para el equipo. Cita tres criterios que vas a comprobar.

   <details><summary>Respuesta</summary>

   Por ejemplo: que funcione en vuestros sistemas operativos, la licencia o el coste, la claridad del grafo del historial, la ayuda para resolver conflictos o que permita usar la terminal cuando haga falta.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Cliente Git gráfico (*GUI*) | Programa con ventanas que ejecuta órdenes de Git mediante botones y vistas |
| IDE | Entorno de desarrollo integrado: editor con herramientas de programación |
| Grafo del historial | Dibujo de commits, ramas y fusiones |
| Token | Credencial específica y revocable que autoriza a una herramienta a acceder a tu cuenta |
| Clave SSH | Par de claves que identifica tu equipo ante el servidor sin enviar una contraseña |
