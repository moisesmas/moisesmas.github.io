# Guía de diapositivas

Cada página de teoría tiene una **presentación** para proyectar en clase: diapositivas redactadas a propósito (no un recorte de los apuntes), con letra grande y material gráfico. Se abre con el botón «Presentar» de la página. Diseño completo: `docs/superpowers/specs/2026-10-13-modo-presentacion-design.md`.

## 1. Qué es y dónde va

- Carpeta `diapositivas/` dentro de la unidad, con **los mismos nombres** que los apuntes:

  ```
  ud02-virtualizacion/
    02-hypervisors.md            ← apuntes
    02-hypervisors.es.md
    hypervisor-types.svg
    diapositivas/
      02-hypervisors.md          ← presentación (idioma original)
      02-hypervisors.es.md       ← presentación en castellano
  ```

- Se publica en `…/02-hypervisors/presentacion/` (la traducción, en `…/02-hypervisors/es/presentacion/`).
- **Llevan presentación** todas las páginas de teoría de la unidad. **No la llevan** `index`, `actividades` ni `planificacion`.
- Si la página tiene versión en castellano, la presentación también.

## 2. Formato

```markdown
---
subtitle: Opcional, debajo del título de la portada
---

## Primera diapositiva

- Una idea
- Otra idea

---

## Segunda diapositiva

![Texto alternativo que describe la imagen](../hypervisor-types.svg)
```

- **Portada automática:** título de la página, módulo y unidad. Con `title:` en el frontmatter se cambia el título de la portada; `subtitle:` añade una línea debajo.
- **Separador:** una línea `---` entre diapositivas, **siempre con una línea en blanco antes**. Si va pegada a una línea de texto, Markdown la convierte en un título; `npm test` avisa.
- **Título:** cada diapositiva empieza con `##`.
- **Imágenes:** rutas relativas a la carpeta `diapositivas/`. Las de la unidad se enlazan con `../nombre.svg`; en la traducción, `../nombre-es.svg` si existe.
- **Otros elementos:** avisos (`:::note`, `:::tip`, `:::caution`), tablas y bloques de código, igual que en los apuntes.

## 3. Bloques de las diapositivas

Solo funcionan dentro de `diapositivas/`. En los apuntes dan error.

| Bloque | Qué hace |
|---|---|
| `:::pasos` … `:::` | Lo de dentro aparece al pulsar, paso a paso. En una lista, cada viñeta es un paso; cualquier otro bloque aparece entero. |
| `::::columnas` … `::::` | Dos columnas: el primer bloque a la izquierda y el resto a la derecha. Lleva **cuatro** dos puntos para que pueda contener un `:::pasos`. |
| `::laboratorio[Nombre de la pestaña]{src="<nombre>" pestana="<id>"}` | Tarjeta grande que abre el laboratorio de la unidad en otra pestaña, en el idioma de la presentación. `pestana` es opcional: es el `data-tab` del laboratorio, el mismo que aparece tras `#` en la dirección al cambiar de pestaña. La etiqueta `[…]` (opcional) muestra en la tarjeta el nombre de esa pestaña, tal como lo ve el alumnado en el laboratorio; úsala siempre que pongas varias tarjetas del mismo laboratorio. |

Ejemplo con los tres bloques:

```markdown
## Type 1 vs Type 2

::::columnas
![Two stacks: bare metal and hosted](../hypervisor-types.svg)

:::pasos
- **Type 1**: runs on the hardware
- **Type 2**: runs on a host OS
:::
::::

---

## Three steps

:::pasos
1. Enter the firmware setup
2. Enable **Intel VT-x** or **AMD-V**
3. Save and reboot
:::

---

## Try it yourself

::laboratorio[Hypervisor stack builder]{src="virtualizacion" pestana="stack"}
```

## 4. Pautas de redacción

**Estructura** (10–20 diapositivas por página):

1. Portada, que sale sola.
2. **«Qué aprenderás»** (*What you will learn*, «Què aprendràs»): 3–5 objetivos. No uses «Hoy veremos», porque una presentación puede durar más o menos de una sesión.
3. **Contenido:** una o dos diapositivas por apartado `##` de los apuntes.
4. **«Pruébalo»** (*Try it yourself*, «Prova-ho»): tarjeta `::laboratorio`, si hay un laboratorio relacionado.
5. **«Resumen»** (*Summary*, «Resum»): las ideas clave y un enlace a las actividades de la unidad.

**Texto:**

- Una idea por diapositiva, con un título que la diga (una afirmación o una pregunta).
- Como máximo **6 viñetas** de unas **8 palabras**. Sin párrafos: la explicación la das tú y está en los apuntes.
- Los términos clave, en **negrita**.
- Solo lo que dicen los apuntes: las diapositivas resumen, no añaden datos.

**Material gráfico, siempre que se pueda:**

- **Diagramas de la unidad:** reutiliza los SVG que ya existen.
- **Diagramas nuevos:** en SVG, con el estilo de los que ya hay.
  - Fondo `#ffffff`.
  - Texto `#16201b`.
  - Ámbar `#b86e00` (borde) y `#fbeed8` (relleno).
  - Verde `#1f5244` (borde) y `#e3ece7` (relleno).
  - `viewBox` de unos 1100 px de ancho, texto de **24 px o más** (títulos de 28 px en negrita), y `<title>` y `<desc>` descriptivos.
  - Se guardan **en la carpeta de la unidad**, para que también los puedan usar los apuntes, con su versión `-es.svg` para la traducción.
- **Tablas:** 5 filas × 4 columnas como máximo.
- **Código:** 12 líneas como máximo.
- **Ejemplos resueltos:** paso a paso con `:::pasos`.

**Procedencia:**

- Solo material propio o con licencia compatible.
- Nada de imágenes enlazadas de otras webs ni fotos de personas.
- Las páginas de SOM que adaptan material CC BY-NC-SA (Daniel Álvarez Santamaría y Jana Taboada León) terminan con una diapositiva de **créditos** con la misma licencia.

**Idiomas:** la traducción es fiel, con **las mismas diapositivas en el mismo orden**.

**Nunca** soluciones de las actividades ni preguntas de examen: la presentación es pública.

## 5. Lo que comprueba `npm test`

`tests/unit/diapositivas.test.ts` falla si:

1. **Falta una presentación:** una página de teoría no tiene presentación (o le falta la traducción), salvo que su unidad esté en `src/config/diapositivas.ts`.
2. **Presentación huérfana:** hay una presentación sin su página de apuntes.
3. **Traducción desigual:** el original y la traducción tienen distinto número de diapositivas.
4. **Separador mal puesto:** un `---` está pegado a una línea de texto.
5. **Imagen no válida:** una imagen no existe o viene de otra web.
6. **Laboratorio inexistente:** un `::laboratorio` apunta a un laboratorio o una pestaña que no existen.
7. **Diapositiva desmesurada:** una lista tiene **más de 8 viñetas** o un bloque de código **más de 15 líneas**. Son límites duros, más amplios que las pautas: solo frenan los excesos claros.

`src/config/diapositivas.ts` (`UNIDADES_SIN_DIAPOSITIVAS`) es una **lista temporal** con las unidades del primer trimestre que aún no tienen todas sus presentaciones:
- Cuando una unidad está completa, **se quita** de la lista.
- **Nunca se añade** una unidad: el material nuevo se crea ya con sus diapositivas.

## 6. Uso en clase

| Tecla | Acción |
|---|---|
| → ← espacio, AvPág RePág | Siguiente / anterior (los pasos cuentan como pulsaciones; vale el mando de presentación) |
| `F` | Pantalla completa |
| `Esc` | Vista general de todas las diapositivas |
| `B` | Pantalla en negro |
| `D` | Tema claro / oscuro (se recuerda) |
| `P` | Puntero rojo |
| `L` | Lápiz para dibujar encima (ratón, dedo o lápiz de la pizarra digital) |
| `C` | Borrar lo dibujado (también se borra al cambiar de diapositiva) |

- **Barras:** la de arriba (volver a los apuntes, idioma, tema, PDF) y la de abajo (pizarra: colores y grosores) se ocultan a los 3 segundos sin mover el ratón.
- **PDF:** «Guardar como PDF» abre la versión de impresión, con una diapositiva por hoja y todos los pasos visibles. Se guarda con «Imprimir → Guardar como PDF».
- **En el móvil:** en pantallas estrechas la presentación se ve como una página que se desplaza.

## 7. Al terminar una presentación

- [ ] `npm test && npm run verificar` sin errores.
- [ ] Revisada en el navegador en los dos idiomas: pasos, imágenes, tarjeta de laboratorio y tema oscuro.
- [ ] Si la unidad ya tiene todas sus presentaciones, quitarla de `src/config/diapositivas.ts`.
