# Modo presentación de los apuntes — diseño

**Fecha:** 2026-10-13 · **Estado:** aprobado por el titular en conversación (cuatro partes); pendiente de su revisión de este documento.

## 1. Objetivo

Proyectar los apuntes en clase. La página de apuntes actual es buena para estudiar, pero en la pantalla del aula tiene demasiado texto y la letra se queda pequeña. Cada página de teoría tendrá una **presentación web** propia: diapositivas redactadas a propósito, con material gráfico siempre que se pueda, que se abren desde la página con un botón «Presentar» y se manejan como un PowerPoint.

**Criterios de éxito:**
- El titular da una clase completa con la presentación desde moisesmas.com, en el ordenador del aula y con el proyector, sin preparar nada más.
- Las diapositivas se leen desde el fondo del aula.
- Todo material nuevo llega con sus diapositivas sin que nadie tenga que acordarse: lo exige una prueba automática.

## 2. Decisiones tomadas con el titular

| Tema | Decisión |
|---|---|
| Origen del contenido | **Redactado aparte**: un resumen pensado para proyectar, no un recorte automático de los apuntes. Con material gráfico siempre que sea posible. |
| Formato | **Presentación web** dentro de moisesmas.com. El PDF se obtiene desde el navegador (para Aules). Sin `.pptx`. |
| Funciones | Aparición **por pasos**, diapositivas que **abren el laboratorio** y **puntero/pizarra**. Sin notas del profesor. |
| Motor | **reveal.js** instalado como dependencia y servido desde la propia web (sin peticiones a terceros). |
| Norma | Todo material nuevo se crea con sus diapositivas (en `CLAUDE.md`, en la guía y en la plantilla de encargos). Lo hace cumplir una prueba. |
| Despliegue | **Piloto** con SOM UD2, SI UD2 y PI UD0 (esta, tras los cambios que pedirá el titular); revisión en clase; después, el resto del 1.er trimestre por tandas. |

## 3. Archivos y formato

### 3.1 Ubicación

Cada unidad con presentaciones tiene una carpeta `diapositivas/`. Dentro, los archivos se llaman igual que la página de apuntes a la que corresponden, con la misma convención de traducción (`x.md` → `x.es.md`):

```
src/content/docs/docencia/smr/som/ud02-virtualizacion/
  02-hypervisors.md
  02-hypervisors.es.md
  hypervisor-types.svg
  hypervisor-types-es.svg
  diapositivas/
    02-hypervisors.md        (inglés)
    02-hypervisors.es.md     (castellano)
```

**Direcciones publicadas:** la presentación cuelga de la dirección de su página.

| Página | Presentación |
|---|---|
| `…/ud02-virtualizacion/02-hypervisors/` | `…/ud02-virtualizacion/02-hypervisors/presentacion/` |
| `…/ud02-virtualizacion/02-hypervisors/es/` | `…/ud02-virtualizacion/02-hypervisors/es/presentacion/` |

### 3.2 Qué páginas llevan presentación

Todas las páginas de teoría de una unidad: los archivos `.md` de la carpeta de unidad salvo `index`, `actividades` y `planificacion` (y sus traducciones). Las portadas de módulo y de sección no llevan.

### 3.3 Formato del archivo

- **Markdown normal**, con frontmatter opcional. No hace falta repetir el título: la portada se genera con el título de la página, el módulo y la unidad.
- Campos opcionales del frontmatter: `title` (sustituye al de la página en la portada) y `subtitle`.
- **Una línea `---` separa las diapositivas** (en el cuerpo, después del frontmatter).
- Cada diapositiva empieza normalmente con un `##` (título de la diapositiva).
- Las **imágenes** se enlazan de forma relativa a la carpeta `diapositivas/`, de modo que las de la unidad se reutilizan: `![Texto alternativo](../hypervisor-types.svg)`. En la traducción se usa la versión `-es.svg` si existe.
- Valen los avisos de Starlight (`:::note`, `:::tip`…), las tablas y los bloques de código.

### 3.4 Bloques propios de las diapositivas

Solo son válidos dentro de `diapositivas/`. Fuera dan error de compilación.

| Bloque | Qué hace |
|---|---|
| `:::pasos` … `:::` | Cada hijo directo (elemento de lista, párrafo, imagen) aparece al pulsar, uno a uno (*fragments* de reveal.js). Si el hijo es una lista, se escalona cada elemento. |
| `::::columnas` … `::::` | Dos columnas: el primer hijo a la izquierda y el resto a la derecha. Se usa para imagen + texto. Lleva cuatro dos puntos: dentro puede ir un `:::pasos`. |
| `::laboratorio{src="<nombre>" pestana="<id>"}` | Tarjeta grande «Abrir laboratorio» (con el título del laboratorio). Abre el laboratorio de la unidad en una pestaña nueva, en el idioma de la presentación y en la pestaña indicada (`?lang=es#<id>`, como los enlaces de los apuntes). `pestana` es opcional. Al cerrar esa pestaña se vuelve a la presentación, en la misma diapositiva. |

Ejemplo:

```markdown
## Type 1 vs type 2 hypervisors

::::columnas
![Two stacks: bare metal vs hosted](../hypervisor-types.svg)

:::pasos
- **Type 1**: runs on the hardware (ESXi, Hyper-V)
- **Type 2**: runs on a host OS (VirtualBox)
- Type 1 → servers · Type 2 → classroom & desktop
:::
::::

---

## Try it yourself

::laboratorio{src="virtualizacion" pestana="stack"}
```

## 4. Uso en clase

### 4.1 Entrada y salida
- En cada página de apuntes **con** presentación, junto al título, aparece el botón **«Presentar»**. Su texto va en el idioma del contenido (*Present* en inglés, «Presentar» en castellano y valenciano). Abre la presentación del mismo idioma en la misma pestaña.
- En la presentación, el botón **«Volver a los apuntes»** lleva a la página.
- El conmutador de idioma de la presentación (original ↔ castellano) mantiene la diapositiva actual.

### 4.2 Pantalla
- Diapositivas **16:9** (lienzo de 1280 × 720 que reveal.js escala a cualquier pantalla), sin la barra lateral de la web.
- Mismas fuentes de la web (`/comun/fuentes.css`) y letra grande: el texto normal mide como mínimo el equivalente a 28 px en el lienzo.
- Barra de progreso y número de diapositiva.
- **Tema claro** por defecto, **oscuro** con la tecla `D` (o el botón de la barra). La elección se guarda en `localStorage` (con `try/catch`; si falla, se usa el claro).
- Sin transiciones si el sistema pide movimiento reducido.

### 4.3 Manejo
- Avanzar y retroceder: flechas, espacio, AvPág/RePág (mandos de presentación), clic en los controles o deslizar el dedo.
- `F` pantalla completa, `Esc` vista general, `B` pantalla en negro.
- Los `:::pasos` consumen pulsaciones antes de pasar a la diapositiva siguiente.
- El número de diapositiva va en la dirección (`#/5`): recargar la página o cambiar de idioma no hace perder el sitio.

### 4.4 Puntero y pizarra
- Barra pequeña en una esquina, que se oculta tras unos segundos sin mover el ratón y no aparece en el PDF.
- **Puntero** (`P`): punto rojo que sigue al ratón.
- **Lápiz** (`L`): dibujo a mano alzada con ratón, dedo o lápiz (*pointer events*), en 3 colores y 2 grosores.
- **Borrar** (`C`). Lo dibujado se borra también al cambiar de diapositiva.
- Con el lápiz activo, el clic y el arrastre dibujan y no pasan de diapositiva; las teclas siguen funcionando.

### 4.5 PDF
El botón «Guardar como PDF» abre la vista de impresión de reveal.js: una diapositiva por hoja, todos los pasos visibles y sin la barra de pizarra. Se guarda con «Imprimir → Guardar como PDF».

### 4.6 Privacidad
La presentación es pública, igual que los apuntes. No hay cookies, analítica ni recursos de terceros. Solo guarda la preferencia de tema en el navegador.

## 5. Pautas de redacción

Se recogen en `docs/guia-diapositivas.md` (nueva). Resumen:

- **Estructura:**
  1. Portada (automática).
  2. «Qué aprenderás» (*What you will learn*, «Què aprendràs»): objetivos de la presentación, 3–5 viñetas. No se usa «Hoy veremos»: una presentación puede durar más o menos de una sesión.
  3. Contenido: una o dos diapositivas por apartado `##` de los apuntes.
  4. «Pruébalo»: diapositiva `::laboratorio`, si la unidad tiene un laboratorio relacionado.
  5. «Resumen»: ideas clave y enlace a las actividades de la unidad.

  En total, **10–20 diapositivas** por página.
- **Texto:**
  - Una idea por diapositiva, con un título que la diga (afirmación o pregunta).
  - Como máximo 6 viñetas de unas 8 palabras. Sin párrafos.
  - Términos clave en negrita.
- **Material gráfico siempre que se pueda:**
  - Reutilizar los SVG de la unidad o crear diagramas SVG nuevos con el mismo estilo que los existentes: paleta de la web, texto de 24 px o más en el lienzo y versión `-es.svg` para la traducción. Los SVG nuevos se guardan en la carpeta de la unidad, para que también los puedan usar los apuntes.
  - Tablas de 5 filas × 4 columnas como máximo.
  - Código de 12 líneas como máximo.
  - Ejemplos resueltos paso a paso con `:::pasos`.
- **Procedencia:**
  - Solo material propio o con licencia compatible. Nada de imágenes enlazadas de otras webs ni fotos de personas.
  - Las páginas de SOM que adaptan material CC BY-NC-SA (Daniel Álvarez Santamaría y Jana Taboada León) terminan con una diapositiva de créditos con la misma licencia.
- **Idiomas:** la traducción es fiel, con las mismas diapositivas en el mismo orden.
- **Nada de soluciones** de las actividades ni de exámenes.

## 6. Norma del proyecto

- **`CLAUDE.md`**, en «Convenciones»:
  - Toda página de teoría lleva su presentación en `diapositivas/` (con su traducción si la página la tiene), según `docs/guia-diapositivas.md`.
  - Nueva sección «Integrar una presentación nueva».
- **`docs/guia-edicion.md`:** cómo crear o editar una presentación (para el titular).
- **`privado/fase-c/encargo-comun.md`** (fuera del repositorio): cada encargo de unidad incluye las presentaciones de todas sus páginas de teoría.
- **Prueba automática** (`tests/unit/diapositivas.test.ts`). Falla si:
  1. Una página de teoría no tiene presentación, salvo que su unidad esté en `UNIDADES_SIN_DIAPOSITIVAS` (`src/config/diapositivas.ts`). Esa lista es **temporal** y solo contiene las unidades del 1.er trimestre pendientes del despliegue. Las unidades nuevas no se añaden nunca; el objetivo es vaciarla.
  2. Hay una presentación sin página.
  3. La página tiene traducción y la presentación no, o el original y la traducción tienen distinto número de diapositivas.
  4. Una imagen referenciada no existe.
  5. Un `::laboratorio` apunta a un laboratorio que no existe en la unidad, o a una pestaña (`data-tab`) que no existe en ese laboratorio.
  6. Una diapositiva supera los límites duros: más de 8 viñetas en una misma lista o un bloque de código de más de 15 líneas. Los límites de las pautas son más estrictos; los duros solo frenan los excesos claros.

## 7. Implementación técnica

| Pieza | Archivo | Responsabilidad |
|---|---|---|
| Colecciones | `src/content.config.ts` | `docs`: el mismo `glob` que usa el `docsLoader` de Starlight (`**/[^_]*.{md,mdx}` y nuestro `generarId`) más la exclusión `!**/diapositivas/**`. `diapositivas`: `glob` de `**/diapositivas/*.md` con esquema `{ title?, subtitle? }`; su id es el id de la página correspondiente. |
| Rutas de páginas | `src/lib/diapositivas.ts` | Funciones puras: id de página a partir de la ruta de un archivo de diapositivas, dirección de la presentación, troceado del HTML en diapositivas por `<hr>`, lista de páginas de teoría de una unidad. Las usan la ruta, el botón y las pruebas. |
| Directivas | `src/lib/directivas/{pasos,columnas,laboratorio}.ts` | Transformación mdast: `pasos` añade la clase `fragment` a los hijos (o a los `li`); `columnas` envuelve en `div.columnas`; `laboratorio` genera la tarjeta con su enlace (dirección del laboratorio + `?lang=es` si la presentación es la traducción + `#pestana`). Fuera de `diapositivas/` lanzan error. |
| Página | `src/pages/[...presentacion].astro` | `getStaticPaths` sobre la colección `diapositivas`. Renderiza con `render()` (el mismo procesador Sätteri y directivas de la web), trocea en `<section>`, añade la portada (título de la página, módulo y unidad desde `src/config/modulos.ts`) y monta el esqueleto de reveal.js. |
| Maquetación | `src/layouts/Presentacion.astro`, `src/styles/presentacion.css` | HTML con `lang` del contenido, fuentes de la web, temas claro y oscuro, barra de botones (volver, idioma, tema, PDF) y estilos de tarjeta de laboratorio y columnas. |
| Arranque | `src/scripts/presentacion.ts` | `Reveal.initialize` con `hash: true`, 1280 × 720, transición mínima, sin vídeos de terceros; tema guardado; atajos `D`, `P`, `L`, `C`; botón de PDF hacia la vista de impresión. |
| Pizarra | `src/scripts/pizarra.ts` | Lienzo superpuesto (*pointer events*) con puntero, lápiz y borrado; limpieza en `slidechanged`; oculta al imprimir. Sin dependencias. |
| Botón | `src/components/PageTitle.astro` | Si existe una entrada `diapositivas` con el id de la página, muestra «Presentar» enlazando a la presentación. |
| Dependencia | `package.json` | `reveal.js@6.0.2` (publicado el 2026-09-10). Astro lo empaqueta en `/_astro/`. Al implementar se comprueba la API de la versión 6 (vista de impresión, atajos, `hash`). |

**Lo que no se hace (fuera de alcance):** notas del profesor y vista del ponente; diapositivas verticales; exportación a `.pptx`; incrustar el laboratorio dentro de la diapositiva; guardar los dibujos de la pizarra.

## 8. Pruebas

- **Unitarias** (`npm test`):
  - `tests/unit/diapositivas.test.ts`: la norma y las comprobaciones de coherencia (§6).
  - Pruebas de las tres directivas (incluido el error fuera de `diapositivas/` y la dirección del laboratorio en cada idioma).
  - Pruebas de `src/lib/diapositivas.ts`: ids, direcciones y troceado.
- **De salida** (`npm run verificar`):
  - Existe `presentacion/index.html` para cada archivo de diapositivas.
  - El botón «Presentar» aparece en esas páginas y en ninguna otra.
  - Los enlaces internos de las presentaciones llevan a páginas o archivos existentes (el validador de Starlight no revisa estas páginas).
  - El HTML de las presentaciones no contiene direcciones de terceros.
  - Los recursos de reveal.js se sirven desde `/_astro/`.
- **Navegador**, en la vista previa: teclado y mando, pasos, pizarra con ratón y táctil (emulado), cambio de idioma con la misma diapositiva, tema oscuro, vista de impresión y vista de móvil.

## 9. Plan del piloto

1. **Motor y norma** (sesión principal): todo lo de §6–§8 y **una presentación de muestra**, SOM UD2 · `02-hypervisors` en inglés y castellano, para fijar el estilo. El titular la revisa en la vista previa; no se sigue sin su aprobación. En esta fase **todas** las unidades existentes (incluida SOM UD2, que solo tiene la muestra) están en `UNIDADES_SIN_DIAPOSITIVAS`. Las comprobaciones 2–6 de §6 se aplican igualmente a la muestra; la 1 empieza a aplicarse a una unidad cuando sale de la lista.
2. **Agentes** (sonnet, `isolation: "worktree"`, commits tempranos, máximo 3 a la vez), cada uno con un encargo que remite a `docs/guia-diapositivas.md` y a la muestra:
   - SOM UD2: resto de páginas (01, 03, 04, 05), inglés y castellano.
   - SI UD2: páginas 01–04, valenciano y castellano.
   - PI UD0: dos encargos (1.x + 2.x y 3.x), **después** de los cambios del titular en la unidad.

   Al fusionar cada rama, la unidad sale de `UNIDADES_SIN_DIAPOSITIVAS`, y `npm test` y `npm run verificar` deben pasar.
3. **Revisión en clase** por el titular; ajustes de plantilla y pautas.
4. **Resto del 1.er trimestre** por tandas: SOM UD1 y UD3, SI UD1 y UD3, PI UD1 y UD2.

Todo en commits locales: no se publica (push a `main`) sin confirmación del titular.
