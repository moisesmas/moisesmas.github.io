# Modo presentación — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cada página de teoría puede tener una presentación web (reveal.js servido desde la propia web) con diapositivas redactadas aparte, botón «Presentar», pasos, tarjetas de laboratorio, pizarra y PDF por impresión, más una norma con prueba automática que obliga a que el material nuevo traiga sus diapositivas.

**Architecture:** Las diapositivas viven en `<unidad>/diapositivas/<pagina>.md` (+ `.es.md`). Una colección de contenido propia (`diapositivas`) las lee con el id de su página. Una ruta de Astro (`src/pages/docencia/[...presentacion].astro`) las compila con el mismo procesador Markdown (Sätteri + nuestras directivas), las trocea por `<hr>` en `<section>` y monta reveal.js. Las funciones puras (`src/lib/diapositivas.ts`) las comparten la ruta, el botón, las directivas y las pruebas.

**Tech Stack:** Astro 7.3 + Starlight 0.42, Sätteri (procesador Markdown, plugins mdast), reveal.js 6.0.2, Vitest 5 (+ happy-dom), TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-13-modo-presentacion-design.md` (léelo antes de empezar).

## Global Constraints

- Repositorio: `~/Developer/moisesmas-web`. Comandos: `npm test` (unitarias) y `npm run verificar` (build + pruebas de `dist/`). Node ≥ 22.12.
- Dependencia exacta: `reveal.js@6.0.2` (sin `^`). **No usar ningún tema de `reveal.js/theme/*`**: importan Google Fonts. Solo `reveal.js/reveal.css` + `src/styles/presentacion.css`.
- Sin peticiones a terceros: fuentes de `/comun/fuentes.css`, nada de CDN.
- `localStorage` siempre dentro de `try/catch`; clave `presentacion-tema`, valores `claro` | `oscuro`; por defecto, `claro`.
- Contenido solo en `.md` (nunca `.mdx`); nombres en minúsculas, sin acentos, con guiones.
- Identificadores, comentarios y mensajes de error en castellano, con el estilo del código vecino (`fallo('<directiva>', archivo, '…')`).
- Directivas contenedoras anidadas: la exterior lleva **cuatro** dos puntos (`::::columnas` … `::::`) y la interior tres (`:::pasos` … `:::`).
- Separador de diapositivas: una línea `---` con **una línea en blanco antes** (sin ella, Markdown la convierte en un título de tipo *setext*).
- Direcciones: presentación de la página con id `X` → `/X/presentacion/` (la traducción, `/X/es/presentacion/`, porque su id ya termina en `/es`).
- Textos de interfaz de la presentación en el idioma del contenido (`es`, `en`, `ca-valencia`), definidos solo en `TEXTOS_PRESENTACION`.
- Commits: mensaje en castellano, descriptivo, terminado en `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Nunca `git add -A`; añadir archivos por nombre. Nunca añadir `privado/`, `.claude/` ni `.superpowers/`. **Nunca `git push`.**

## Review Focus

1. **Servidor de desarrollo:** con la ruta `src/pages/docencia/[...presentacion].astro`, las páginas normales de Starlight (`/docencia/smr/som/…/`) deben seguir respondiendo en `npx astro dev`, no solo en el build. Lo comprueba un paso de la Tarea 3.
2. **Bloques de código (Expressive Code) fuera de Starlight:** en una presentación, el código debe verse con fondo y fuente monoespaciada aunque falten los estilos de Starlight. Hay un bloque de código en la muestra mínima de la Tarea 3; la Tarea 3 lo comprueba en la salida y la Tarea 9 en el navegador.
3. **Avisos de Starlight (`:::note`, `:::tip`…) dentro de una diapositiva:** deben verse como caja con borde de color, no como texto suelto. Hay estilos en la Tarea 3, un aviso en la muestra mínima y una comprobación en la Tarea 9.
4. **Vista de impresión (`?pdf`):** sin barra de herramientas ni pizarra, y todos los pasos visibles. Cubierto por la Tarea 4 (CSS `html.reveal-print`) y la Tarea 9 (navegador).
5. **Móvil (menos de 435 px):** reveal.js pasa a la vista de desplazamiento; las barras no deben tapar el contenido. Comprobación en la Tarea 9.

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/lib/diapositivas.ts` | Crear | Funciones puras: ids, direcciones, troceado, análisis del Markdown, páginas de teoría, textos de interfaz |
| `src/lib/directivas/comun.ts` | Modificar | `ArchivoMd` sabe si el archivo es de diapositivas (y entonces usa el id y la carpeta de la página) |
| `src/lib/directivas/pasos.ts`, `columnas.ts`, `laboratorio.ts` | Crear | Las tres directivas nuevas |
| `src/lib/directivas/index.ts` | Modificar | Registrarlas |
| `src/content.config.ts` | Modificar | Excluir `diapositivas/` de `docs`; colección `diapositivas` |
| `src/pages/docencia/[...presentacion].astro` | Crear | Una página por archivo de diapositivas |
| `src/components/Diapositivas.astro` | Crear | Trocea el HTML de su slot en `<section>` |
| `src/layouts/Presentacion.astro` | Crear | Documento HTML de la presentación (barras, portada, reveal.js) |
| `src/styles/presentacion.css` | Crear | Tema claro y oscuro, tipografía, columnas, tarjeta, pizarra, impresión |
| `src/scripts/presentacion.ts` | Crear | Arranque de reveal.js, tema, idioma con la misma diapositiva, PDF, atajos |
| `src/scripts/pizarra.ts` | Crear | Puntero, lápiz y borrado (sin dependencias) |
| `src/components/PageTitle.astro`, `src/styles/docencia.css` | Modificar | Botón «Presentar» |
| `src/config/diapositivas.ts` | Crear | `UNIDADES_SIN_DIAPOSITIVAS` (lista temporal) |
| `tests/unit/diapositivas-lib.test.ts` | Crear | Funciones puras |
| `tests/unit/directivas-diapositivas.test.ts` | Crear | Directivas |
| `tests/unit/pizarra.test.ts` | Crear | Pizarra (happy-dom) |
| `tests/unit/diapositivas.test.ts` | Crear | Norma y coherencia sobre el contenido real |
| `tests/salida/presentacion.test.ts` | Crear | Salida compilada |
| `docs/guia-diapositivas.md`, `CLAUDE.md`, `docs/guia-edicion.md`, `docs/revision-pendiente.md`, spec | Crear/Modificar | Norma escrita |
| `…/som/ud02-virtualizacion/diapositivas/02-hypervisors{,.es}.md`, `virtualization-methods{,-es}.svg` | Crear | Muestra |

---

### Task 1: Funciones puras de diapositivas

**Files:**
- Create: `src/lib/diapositivas.ts`
- Test: `tests/unit/diapositivas-lib.test.ts`

**Interfaces:**
- Consumes: `generarId` (`src/lib/ids.ts`), `esTraduccion` (`src/lib/idiomas.ts`), tipo `CodigoIdioma` (`src/config/modulos.ts`).
- Produces:
  - `CARPETA: 'diapositivas'`
  - `NO_TEORIA: string[]` (`['index', 'actividades', 'planificacion']`)
  - `esDeDiapositivas(relativo: string): boolean`
  - `idPagina(relativo: string): string` (lanza un error si el archivo no es de diapositivas)
  - `hrefPresentacion(idPagina: string): string`
  - `idUnidad(idPagina: string): string`
  - `trocear(html: string): string[]`
  - `analizar(md: string): { diapositivas: string[]; avisos: string[] }`
  - `listaMasLarga(md: string): number`
  - `codigoMasLargo(md: string): number`
  - `paginasDeTeoria(dirUnidad: string): { nombre: string; traduccion: boolean }[]`
  - `TEXTOS_PRESENTACION: Record<CodigoIdioma, TextosPresentacion>`
  - `interface TextosPresentacion { presentar; volver; pdf; tema; laboratorio; abrirLab; pizarra; puntero; lapiz; borrar; color; grosor }` (todas las propiedades, `string`)

- [ ] **Step 1: Write the failing test**

`tests/unit/diapositivas-lib.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  analizar,
  codigoMasLargo,
  esDeDiapositivas,
  hrefPresentacion,
  idPagina,
  idUnidad,
  listaMasLarga,
  paginasDeTeoria,
  TEXTOS_PRESENTACION,
  trocear,
} from '../../src/lib/diapositivas';
import { crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud02-virtualizacion';

describe('ids y direcciones', () => {
  it('reconoce los archivos de diapositivas', () => {
    expect(esDeDiapositivas(`${U}/diapositivas/02-hypervisors.md`)).toBe(true);
    expect(esDeDiapositivas(`${U}/02-hypervisors.md`)).toBe(false);
    expect(esDeDiapositivas(`${U}/diapositivas/extra/x.md`)).toBe(false);
  });
  it('id de la página: original y traducción', () => {
    expect(idPagina(`${U}/diapositivas/02-hypervisors.md`)).toBe(`${U}/02-hypervisors`);
    expect(idPagina(`${U}/diapositivas/02-hypervisors.es.md`)).toBe(`${U}/02-hypervisors/es`);
  });
  it('un archivo que no es de diapositivas: error', () => {
    expect(() => idPagina(`${U}/02-hypervisors.md`)).toThrow(/No es un archivo de diapositivas/);
  });
  it('dirección de la presentación', () => {
    expect(hrefPresentacion(`${U}/02-hypervisors`)).toBe(`/${U}/02-hypervisors/presentacion/`);
    expect(hrefPresentacion(`${U}/02-hypervisors/es`)).toBe(`/${U}/02-hypervisors/es/presentacion/`);
  });
  it('id de la unidad de una página', () => {
    expect(idUnidad(`${U}/02-hypervisors`)).toBe(U);
    expect(idUnidad(`${U}/02-hypervisors/es`)).toBe(`${U}/es`);
  });
});

describe('trocear', () => {
  it('parte por <hr> en todas sus formas y descarta trozos vacíos', () => {
    expect(trocear('<h2>A</h2>\n<hr>\n<p>B</p><hr/><hr />\n<p>C</p>\n<hr>')).toEqual(['<h2>A</h2>', '<p>B</p>', '<p>C</p>']);
  });
  it('sin <hr>, una sola diapositiva', () => {
    expect(trocear('<p>Solo</p>')).toEqual(['<p>Solo</p>']);
  });
});

describe('analizar', () => {
  const md = ['---', 'title: X', '---', '', '## Uno', '', 'Texto', '', '---', '', '## Dos'].join('\n');
  it('separa por --- y quita el frontmatter', () => {
    expect(analizar(md)).toEqual({ diapositivas: ['## Uno\n\nTexto', '## Dos'], avisos: [] });
  });
  it('no corta dentro de un bloque de código', () => {
    const conCodigo = ['## A', '', '```yaml', '---', 'a: 1', '```', '', '---', '', '## B'].join('\n');
    expect(analizar(conCodigo).diapositivas).toHaveLength(2);
  });
  it('avisa del --- pegado a una línea de texto (sería un título)', () => {
    const r = analizar(['## A', 'Texto', '---', '', '## B'].join('\n'));
    expect(r.avisos).toEqual(['Línea 3: deja una línea en blanco antes de «---» (si no, Markdown lo convierte en un título)']);
  });
  it('los números de línea cuentan el frontmatter', () => {
    const r = analizar(['---', 'title: X', '---', 'Texto', '---'].join('\n'));
    expect(r.avisos[0]).toMatch(/^Línea 5:/);
  });
});

describe('límites', () => {
  it('lista más larga (elementos de primer nivel seguidos)', () => {
    expect(listaMasLarga(['- a', '- b', '  - b1', '- c', '', 'Texto', '1. x', '2. y'].join('\n'))).toBe(3);
    expect(listaMasLarga('Sin listas')).toBe(0);
  });
  it('bloque de código más largo (líneas de dentro)', () => {
    expect(codigoMasLargo(['```bash', 'a', 'b', 'c', '```', '~~~', 'd', '~~~'].join('\n'))).toBe(3);
  });
});

describe('páginas de teoría', () => {
  const docs = crearDocs({
    [`${U}/index.md`]: '',
    [`${U}/index.es.md`]: '',
    [`${U}/actividades.md`]: '',
    [`${U}/planificacion.md`]: '',
    [`${U}/01-what-is-virtualization.md`]: '',
    [`${U}/01-what-is-virtualization.es.md`]: '',
    [`${U}/02-hypervisors.md`]: '',
    [`${U}/hypervisor-types.svg`]: '',
    [`${U}/diapositivas/02-hypervisors.md`]: '',
  });
  it('solo las de teoría, con su traducción si existe', () => {
    expect(paginasDeTeoria(`${docs}/${U}`)).toEqual([
      { nombre: '01-what-is-virtualization', traduccion: true },
      { nombre: '02-hypervisors', traduccion: false },
    ]);
  });
});

describe('textos de interfaz', () => {
  it('los tres idiomas tienen los mismos textos, ninguno vacío', () => {
    const claves = Object.keys(TEXTOS_PRESENTACION.es).sort();
    for (const textos of Object.values(TEXTOS_PRESENTACION)) {
      expect(Object.keys(textos).sort()).toEqual(claves);
      expect(Object.values(textos).every((t) => t.trim() !== '')).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/diapositivas-lib.test.ts`
Expected: FAIL («Failed to resolve import "../../src/lib/diapositivas"»).

- [ ] **Step 3: Write minimal implementation**

`src/lib/diapositivas.ts`:

```ts
import { readdirSync } from 'node:fs';
import type { CodigoIdioma } from '../config/modulos';
import { generarId } from './ids';
import { esTraduccion } from './idiomas';

/** Carpeta de cada unidad donde viven las diapositivas de sus páginas. */
export const CARPETA = 'diapositivas';

/** Páginas de una unidad que no son de teoría (no llevan presentación). */
export const NO_TEORIA = ['index', 'actividades', 'planificacion'];

/** ¿Es `<unidad>/diapositivas/<pagina>.md`? (ruta relativa a src/content/docs, con «/»). */
export function esDeDiapositivas(relativo: string): boolean {
  return relativo.split('/').at(-2) === CARPETA;
}

/** Id de la página de apuntes a la que corresponde un archivo de diapositivas. */
export function idPagina(relativo: string): string {
  if (!esDeDiapositivas(relativo)) throw new Error(`No es un archivo de diapositivas: ${relativo}`);
  const partes = relativo.split('/');
  partes.splice(-2, 1);
  return generarId({ entry: partes.join('/'), data: {} });
}

export function hrefPresentacion(idPagina: string): string {
  return `/${idPagina}/presentacion/`;
}

/** Id de la portada de la unidad de una página (en el mismo idioma). */
export function idUnidad(idPagina: string): string {
  const traduccion = esTraduccion(idPagina);
  const base = traduccion ? idPagina.slice(0, -3) : idPagina;
  const unidad = base.split('/').slice(0, -1).join('/');
  return traduccion ? `${unidad}/es` : unidad;
}

/** HTML de todas las diapositivas → una cadena por diapositiva (el separador es <hr>). */
export function trocear(html: string): string[] {
  return html
    .split(/<hr\s*\/?>/i)
    .map((t) => t.trim())
    .filter(Boolean);
}

const VALLA = /^\s*(`{3,}|~{3,})/;

/** Recorre las líneas indicando si cada una está dentro de un bloque de código. */
function* lineasConCodigo(md: string): Generator<{ linea: string; codigo: boolean; valla: boolean }> {
  let valla: string | null = null;
  for (const linea of md.split(/\r?\n/)) {
    const m = linea.match(VALLA);
    if (m && !valla) {
      valla = m[1];
      yield { linea, codigo: false, valla: true };
    } else if (m && valla && m[1][0] === valla[0] && m[1].length >= valla.length) {
      valla = null;
      yield { linea, codigo: false, valla: true };
    } else {
      yield { linea, codigo: valla !== null, valla: false };
    }
  }
}

/** Markdown de cada diapositiva y avisos de separadores mal puestos. */
export function analizar(md: string): { diapositivas: string[]; avisos: string[] } {
  const frontmatter = md.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0] ?? '';
  const desplazamiento = frontmatter ? frontmatter.split(/\r?\n/).length - (frontmatter.endsWith('\n') ? 1 : 0) : 0;
  const cuerpo = md.slice(frontmatter.length);
  const trozos: string[][] = [[]];
  const avisos: string[] = [];
  let anterior = '';
  let n = 0;
  for (const { linea, codigo, valla } of lineasConCodigo(cuerpo)) {
    n++;
    if (!codigo && !valla && /^---\s*$/.test(linea)) {
      if (anterior.trim() === '') {
        trozos.push([]);
        anterior = linea;
        continue;
      }
      avisos.push(`Línea ${n + desplazamiento}: deja una línea en blanco antes de «---» (si no, Markdown lo convierte en un título)`);
    }
    trozos.at(-1)!.push(linea);
    anterior = linea;
  }
  return { diapositivas: trozos.map((t) => t.join('\n').trim()).filter(Boolean), avisos };
}

/** Número de elementos de la lista de primer nivel más larga. */
export function listaMasLarga(md: string): number {
  let maximo = 0;
  let actual = 0;
  for (const { linea, codigo } of lineasConCodigo(md)) {
    if (codigo) continue;
    if (/^(?:[-*+]|\d+[.)])\s/.test(linea)) actual++;
    else if (linea.trim() !== '' && !/^\s/.test(linea)) actual = 0;
    maximo = Math.max(maximo, actual);
  }
  return maximo;
}

/** Número de líneas del bloque de código más largo. */
export function codigoMasLargo(md: string): number {
  let maximo = 0;
  let actual = 0;
  for (const { codigo, valla } of lineasConCodigo(md)) {
    if (codigo) actual++;
    if (valla) {
      maximo = Math.max(maximo, actual);
      actual = 0;
    }
  }
  return Math.max(maximo, actual);
}

/** Páginas de teoría de una carpeta de unidad (nombre sin extensión) y si tienen traducción. */
export function paginasDeTeoria(dirUnidad: string): { nombre: string; traduccion: boolean }[] {
  const archivos = new Set(readdirSync(dirUnidad));
  return [...archivos]
    .filter((a) => a.endsWith('.md') && !a.endsWith('.es.md'))
    .map((a) => a.slice(0, -3))
    .filter((nombre) => !NO_TEORIA.includes(nombre))
    .sort()
    .map((nombre) => ({ nombre, traduccion: archivos.has(`${nombre}.es.md`) }));
}

export interface TextosPresentacion {
  presentar: string;
  volver: string;
  pdf: string;
  tema: string;
  laboratorio: string;
  abrirLab: string;
  pizarra: string;
  puntero: string;
  lapiz: string;
  borrar: string;
  color: string;
  grosor: string;
}

/** Textos de interfaz de la presentación, en el idioma del contenido. */
export const TEXTOS_PRESENTACION: Record<CodigoIdioma, TextosPresentacion> = {
  es: {
    presentar: 'Presentar',
    volver: 'Volver a los apuntes',
    pdf: 'Guardar como PDF',
    tema: 'Tema claro u oscuro',
    laboratorio: 'Laboratorio',
    abrirLab: 'Abrir laboratorio',
    pizarra: 'Pizarra',
    puntero: 'Puntero (P)',
    lapiz: 'Lápiz (L)',
    borrar: 'Borrar (C)',
    color: 'Color',
    grosor: 'Grosor',
  },
  en: {
    presentar: 'Present',
    volver: 'Back to the notes',
    pdf: 'Save as PDF',
    tema: 'Light or dark theme',
    laboratorio: 'Lab',
    abrirLab: 'Open the lab',
    pizarra: 'Whiteboard',
    puntero: 'Pointer (P)',
    lapiz: 'Pen (L)',
    borrar: 'Clear (C)',
    color: 'Colour',
    grosor: 'Thickness',
  },
  'ca-valencia': {
    presentar: 'Presentar',
    volver: 'Tornar als apunts',
    pdf: 'Guardar com a PDF',
    tema: 'Tema clar o fosc',
    laboratorio: 'Laboratori',
    abrirLab: 'Obrir el laboratori',
    pizarra: 'Pissarra',
    puntero: 'Punter (P)',
    lapiz: 'Llapis (L)',
    borrar: 'Esborrar (C)',
    color: 'Color',
    grosor: 'Gruix',
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/diapositivas-lib.test.ts`
Expected: PASS (todas). Si falla «los números de línea cuentan el frontmatter», revisa `desplazamiento`: para `---\ntitle: X\n---\n` debe valer 3.

- [ ] **Step 5: Commit**

```bash
git add src/lib/diapositivas.ts tests/unit/diapositivas-lib.test.ts
git commit -m "Diapositivas: funciones de ids, direcciones, troceado y análisis

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Directivas de diapositivas (`pasos`, `columnas`, `laboratorio`)

**Files:**
- Modify: `src/lib/directivas/comun.ts` (interfaz `ArchivoMd` y `archivoMd()`)
- Create: `src/lib/directivas/pasos.ts`, `src/lib/directivas/columnas.ts`, `src/lib/directivas/laboratorio.ts`
- Modify: `src/lib/directivas/index.ts`
- Test: `tests/unit/directivas-diapositivas.test.ts`

**Interfaces:**
- Consumes: `esDeDiapositivas`, `idPagina`, `TEXTOS_PRESENTACION` (Tarea 1); `hrefLaboratorio` (`src/lib/directivas/artefacto.ts`); `leerFicha` (`src/lib/laboratorios.ts`); `idiomaContenido` (`src/lib/idiomas.ts`).
- Produces:
  - `ArchivoMd.diapositivas: boolean`. En un archivo de diapositivas, `id`, `dir` y `hrefDir` son los **de la página y su unidad**, así que todas las directivas existentes funcionan igual que en los apuntes.
  - `soloDiapositivas(nombre: string, archivo: ArchivoMd): void` (en `pasos.ts`).
  - Manejadores `pasos`, `columnas` (contenedores) y `laboratorio` (hoja).
  - HTML producido:
    - `div.pasos` con `li.fragment` o `div.fragment`.
    - `div.columnas > div.columnas__izquierda + div.columnas__derecha`.
    - `a.diapositiva-laboratorio[target=_blank]`.

- [ ] **Step 1: Write the failing test**

`tests/unit/directivas-diapositivas.test.ts`:

```ts
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { archivoMd } from '../../src/lib/directivas/comun';
import { convertir, crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud02-virtualizacion';
const LAB =
  '<!doctype html><html lang="en"><head><title>Virtualization Playground</title>' +
  '<meta name="description" content="Play with hypervisors">' +
  '<meta name="lab:titulo:es" content="Laboratorio de virtualización">' +
  '<meta name="lab:descripcion:es" content="Juega con hipervisores"></head>' +
  '<body><button data-tab="stack">Stack</button><button data-tab="vtx">VT-x</button></body></html>';
const docs = crearDocs({
  [`${U}/02-hypervisors.md`]: '---\ntitle: "2. Hypervisors"\n---\n',
  [`${U}/laboratorios/virtualizacion/index.html`]: LAB,
});
const D = `${U}/diapositivas/02-hypervisors.md`;
const DES = `${U}/diapositivas/02-hypervisors.es.md`;

describe('archivoMd en diapositivas', () => {
  it('usa el id y la carpeta de la página', () => {
    const a = archivoMd(pathToFileURL(path.join(docs, DES)))!;
    expect(a.diapositivas).toBe(true);
    expect(a.id).toBe(`${U}/02-hypervisors/es`);
    expect(a.traduccion).toBe(true);
    expect(a.hrefDir).toBe(`/${U}/`);
    expect(a.dir).toBe(path.join(docs, U));
  });
  it('en una página normal no cambia nada', () => {
    const a = archivoMd(pathToFileURL(path.join(docs, `${U}/02-hypervisors.md`)))!;
    expect(a.diapositivas).toBe(false);
    expect(a.id).toBe(`${U}/02-hypervisors`);
    expect(a.hrefDir).toBe(`/${U}/`);
  });
});

describe(':::pasos', () => {
  it('cada elemento de una lista aparece por pasos', () => {
    const html = convertir(docs, D, ':::pasos\n- Uno\n- Dos\n:::');
    expect(html).toContain('class="pasos"');
    expect(html.match(/<li class="fragment">/g)).toHaveLength(2);
  });
  it('los demás bloques aparecen enteros, uno a uno', () => {
    const html = convertir(docs, D, ':::pasos\nPrimero\n\nSegundo\n:::');
    expect(html.match(/<div class="fragment">/g)).toHaveLength(2);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, ':::pasos\n- Uno\n:::')).toThrow(
      /\[::pasos\] Solo se puede usar en las diapositivas/,
    );
  });
});

describe('::::columnas', () => {
  it('primer bloque a la izquierda y el resto a la derecha', () => {
    const html = convertir(docs, D, '::::columnas\nIzquierda\n\nDerecha 1\n\nDerecha 2\n::::');
    expect(html).toMatch(/<div class="columnas"><div class="columnas__izquierda"><p>Izquierda<\/p><\/div><div class="columnas__derecha"><p>Derecha 1<\/p>\s*<p>Derecha 2<\/p><\/div><\/div>/);
  });
  it('con :::pasos dentro', () => {
    const html = convertir(docs, D, '::::columnas\nImagen\n\n:::pasos\n- a\n- b\n:::\n::::');
    expect(html).toContain('class="columnas__derecha"><div class="pasos">');
    expect(html.match(/<li class="fragment">/g)).toHaveLength(2);
  });
  it('con un solo bloque: error', () => {
    expect(() => convertir(docs, D, '::::columnas\nSolo\n::::')).toThrow(/\[::columnas\] Necesita al menos dos bloques/);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, '::::columnas\nA\n\nB\n::::')).toThrow(/Solo se puede usar en las diapositivas/);
  });
});

describe('::laboratorio', () => {
  it('tarjeta en el idioma original, que abre la pestaña en otra ventana', () => {
    const html = convertir(docs, D, '::laboratorio{src="virtualizacion" pestana="stack"}');
    expect(html).toContain(`href="/${U}/laboratorios/virtualizacion/#stack"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Virtualization Playground');
    expect(html).toContain('Open the lab');
  });
  it('en la traducción: castellano, ?lang=es y textos en castellano', () => {
    const html = convertir(docs, DES, '::laboratorio{src="virtualizacion" pestana="vtx"}');
    expect(html).toContain(`href="/${U}/laboratorios/virtualizacion/?lang=es#vtx"`);
    expect(html).toContain('Laboratorio de virtualización');
    expect(html).toContain('Abrir laboratorio');
  });
  it('sin pestaña: sin #', () => {
    expect(convertir(docs, D, '::laboratorio{src="virtualizacion"}')).toContain(`href="/${U}/laboratorios/virtualizacion/"`);
  });
  it('laboratorio inexistente: error', () => {
    expect(() => convertir(docs, D, '::laboratorio{src="nada"}')).toThrow(/\[::laboratorio\] No existe laboratorios\/nada\/index\.html/);
  });
  it('pestaña inexistente: error', () => {
    expect(() => convertir(docs, D, '::laboratorio{src="virtualizacion" pestana="nada"}')).toThrow(/no tiene la pestaña «nada»/);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, '::laboratorio{src="virtualizacion"}')).toThrow(/Solo se puede usar en las diapositivas/);
  });
});

describe('directivas de siempre en las diapositivas', () => {
  it('::artefacto resuelve el laboratorio desde la carpeta de la unidad', () => {
    expect(convertir(docs, D, '::artefacto{src="virtualizacion"}')).toContain(`href="/${U}/laboratorios/virtualizacion/"`);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/directivas-diapositivas.test.ts`
Expected: FAIL (`a.diapositivas` es `undefined`; las directivas nuevas no transforman nada).

- [ ] **Step 3: Write minimal implementation**

En `src/lib/directivas/comun.ts`, añade el campo y calcula id y carpeta de la página cuando el archivo es de diapositivas. Importa `esDeDiapositivas` e `idPagina` desde `'../diapositivas'`.

```ts
// en la interfaz ArchivoMd, tras `modulo`:
  /** Es un archivo de <unidad>/diapositivas/: id, dir y hrefDir son los de su página. */
  diapositivas: boolean;
```

Sustituye el cuerpo de `archivoMd` desde `const relativo = …` por:

```ts
  const relativo = path.relative(docs, ruta).split(path.sep).join('/');
  const diapositivas = esDeDiapositivas(relativo);
  const id = diapositivas ? idPagina(relativo) : generarId({ entry: relativo, data: {} });
  const dir = diapositivas ? path.dirname(path.dirname(ruta)) : path.dirname(ruta);
  const dirRelativo = path.relative(docs, dir).split(path.sep).join('/');
  return {
    ruta,
    docs,
    relativo,
    id,
    dir,
    hrefDir: dirRelativo === '' ? '/' : `/${dirRelativo}/`,
    traduccion: esTraduccion(id),
    modulo: moduloDeId(id),
    diapositivas,
  };
```

(El caso raíz pasaba antes por `dirRelativo === '.'`; con `path.relative`, la raíz da `''`.)

`src/lib/directivas/pasos.ts`:

```ts
import type { MdastContent } from 'satteri';
import { fallo, type ArchivoMd, type Manejador } from './comun';

export interface NodoMdast {
  type: string;
  name?: string;
  data?: { hName?: string; hProperties?: Record<string, unknown> };
  children?: NodoMdast[];
}

export function soloDiapositivas(nombre: string, archivo: ArchivoMd): void {
  if (!archivo.diapositivas) fallo(nombre, archivo, 'Solo se puede usar en las diapositivas (carpeta diapositivas/)');
}

export function bloque(clase: string, children: NodoMdast[]): NodoMdast {
  return { type: 'paragraph', data: { hName: 'div', hProperties: { class: clase } }, children };
}

function conClase(nodo: NodoMdast, clase: string): NodoMdast {
  const props = nodo.data?.hProperties ?? {};
  const previa = typeof props.class === 'string' ? `${props.class} ` : '';
  return { ...nodo, data: { ...nodo.data, hProperties: { ...props, class: previa + clase } } };
}

/** Las listas se escalonan elemento a elemento; el resto de bloques, enteros. */
function escalonar(hijos: NodoMdast[]): NodoMdast[] {
  return hijos.map((h) =>
    h.type === 'list' ? { ...h, children: (h.children ?? []).map((li) => conClase(li, 'fragment')) } : bloque('fragment', [h]),
  );
}

/** :::pasos … ::: — el contenido aparece al pulsar, paso a paso (fragments de reveal.js). */
export const pasos: Manejador = (nodo, archivo) => {
  soloDiapositivas('pasos', archivo);
  return bloque('pasos', escalonar(nodo.children as NodoMdast[])) as unknown as MdastContent;
};
```

`src/lib/directivas/columnas.ts`:

```ts
import type { MdastContent } from 'satteri';
import { fallo, type Manejador, type NodoDirectiva } from './comun';
import { bloque, pasos, soloDiapositivas, type NodoMdast } from './pasos';

/** ::::columnas … :::: — el primer bloque a la izquierda y el resto a la derecha. */
export const columnas: Manejador = (nodo, archivo) => {
  soloDiapositivas('columnas', archivo);
  // Un :::pasos interior puede llegar sin transformar, según el orden en que Sätteri visite los nodos.
  const hijos = (nodo.children as NodoMdast[]).map((h) =>
    h.type === 'containerDirective' && h.name === 'pasos'
      ? (pasos(h as unknown as NodoDirectiva, archivo) as unknown as NodoMdast)
      : h,
  );
  if (hijos.length < 2) {
    fallo('columnas', archivo, 'Necesita al menos dos bloques: el primero va a la izquierda y el resto a la derecha');
  }
  return bloque('columnas', [bloque('columnas__izquierda', [hijos[0]]), bloque('columnas__derecha', hijos.slice(1))]) as unknown as MdastContent;
};
```

`src/lib/directivas/laboratorio.ts`:

```ts
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { TEXTOS_PRESENTACION } from '../diapositivas';
import { idiomaContenido } from '../idiomas';
import { leerFicha } from '../laboratorios';
import { hrefLaboratorio } from './artefacto';
import { atributo, escapar, fallo, html, type Manejador } from './comun';
import { soloDiapositivas } from './pasos';

/** ::laboratorio{src="nombre" pestana="id"} — tarjeta que abre el laboratorio de la unidad en otra pestaña. */
export const laboratorio: Manejador = (nodo, archivo) => {
  soloDiapositivas('laboratorio', archivo);
  const nombre = atributo(nodo, 'src');
  if (!nombre || !/^[a-z0-9-]+$/.test(nombre)) {
    fallo('laboratorio', archivo, `src debe ser el nombre de la carpeta del laboratorio (minúsculas y guiones): «${nombre ?? ''}»`);
  }
  const indice = path.join(archivo.dir, 'laboratorios', nombre, 'index.html');
  if (!existsSync(indice)) fallo('laboratorio', archivo, `No existe laboratorios/${nombre}/index.html en la unidad`);
  const codigo = readFileSync(indice, 'utf8');
  const pestana = atributo(nodo, 'pestana');
  if (pestana && !codigo.includes(`data-tab="${pestana}"`)) {
    fallo('laboratorio', archivo, `El laboratorio ${nombre} no tiene la pestaña «${pestana}» (data-tab)`);
  }
  const ficha = leerFicha(codigo, archivo.traduccion);
  const textos = TEXTOS_PRESENTACION[idiomaContenido(archivo.id, archivo.modulo)];
  const href = hrefLaboratorio(archivo.hrefDir, nombre, archivo.traduccion) + (pestana ? `#${pestana}` : '');
  return html(
    `<a class="diapositiva-laboratorio" href="${escapar(href)}" target="_blank" rel="noopener">` +
      `<span class="diapositiva-laboratorio__marca">${escapar(textos.laboratorio)}</span>` +
      `<strong class="diapositiva-laboratorio__titulo">${escapar(ficha.titulo)}</strong>` +
      (ficha.descripcion ? `<span class="diapositiva-laboratorio__descripcion">${escapar(ficha.descripcion)}</span>` : '') +
      `<span class="diapositiva-laboratorio__abrir">${escapar(textos.abrirLab)} ↗</span></a>`,
  );
};
```

En `src/lib/directivas/index.ts`:

```ts
import { columnas } from './columnas';
import { laboratorio } from './laboratorio';
import { pasos } from './pasos';
// …
const HOJAS: Record<string, Manejador> = { descarga, video, modulos, artefacto, laboratorios, laboratorio };
const CONTENEDORES: Record<string, Manejador> = { aules, pasos, columnas };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/directivas-diapositivas.test.ts tests/unit/directivas.test.ts`
Expected: PASS. Si `<li class="fragment">` no aparece porque Sätteri ignora `hProperties` en `listItem`, envuelve cada elemento: en `escalonar`, para listas, `children: li.children` → `[bloque('fragment', li.children)]`, y ajusta la prueba a `<li><div class="fragment">` (reveal.js acepta `fragment` en cualquier elemento). Si el `:::pasos` interior aparece dos veces escalonado (`class="fragment fragment"`), quita la transformación explícita de `columnas.ts`.

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: PASS (nada existente se rompe con el nuevo `archivoMd`).

- [ ] **Step 6: Commit**

```bash
git add src/lib/directivas/comun.ts src/lib/directivas/pasos.ts src/lib/directivas/columnas.ts src/lib/directivas/laboratorio.ts src/lib/directivas/index.ts tests/unit/directivas-diapositivas.test.ts
git commit -m "Diapositivas: directivas pasos, columnas y laboratorio

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Colección, ruta y presentación con reveal.js

**Files:**
- Modify: `package.json`, `package-lock.json` (dependencia)
- Modify: `src/content.config.ts`
- Create: `src/pages/docencia/[...presentacion].astro`, `src/components/Diapositivas.astro`, `src/layouts/Presentacion.astro`, `src/styles/presentacion.css`, `src/scripts/presentacion.ts`
- Create (muestra mínima, se completa en la Tarea 8): `src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.md` y `.es.md`
- Test: `tests/salida/presentacion.test.ts`

**Interfaces:**
- Consumes: Tareas 1 y 2; `moduloDeId`, `ETIQUETA_IDIOMA` (`src/config/modulos.ts`); `idiomaContenido`, `idOriginal`, `idTraduccion`, `esTraduccion`, `hrefDeId` (`src/lib/idiomas.ts`).
- Produces:
  - Colección `diapositivas` con id = id de la página y datos `{ title?: string; subtitle?: string }`.
  - `dist/<id>/presentacion/index.html`.
  - En el HTML: `html[lang][data-tema]`, `nav.barra-presentacion` (con `a[data-volver]`, `a[data-con-diapositiva]` por idioma, `button[data-tema-boton]` y `a[data-pdf]`), `div.reveal > div.slides > section.portada + section…`.
  - `src/scripts/presentacion.ts` (lo amplía la Tarea 4).

- [ ] **Step 1: Instalar la dependencia exacta**

Run: `npm install --save-exact reveal.js@6.0.2`
Expected: `package.json` con `"reveal.js": "6.0.2"` en `dependencies`.

- [ ] **Step 2: Muestra mínima de diapositivas**

Crea `src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.md`:

```markdown
## What you will learn

:::pasos
- What a hypervisor does
- Type 1 and Type 2
- Help from the processor: VT-x and AMD-V
:::

---

## Type 1 vs Type 2

::::columnas
![Two stacks side by side: Type 1 runs on the hardware; Type 2 runs on a host operating system.](../hypervisor-types.svg)

:::pasos
- **Type 1**: runs on the hardware
- **Type 2**: runs on a host OS
:::
::::

:::note
VirtualBox is Type 2.
:::

---

## Check VT-x on Linux

```bash
grep -E -c 'vmx|svm' /proc/cpuinfo
```

---

## Try it yourself

::laboratorio{src="virtualizacion" pestana="stack"}
```

Y la traducción `…/diapositivas/02-hypervisors.es.md`, con la misma estructura en castellano: «Qué aprenderás», «Tipo 1 frente a tipo 2» con `../hypervisor-types-es.svg`, «VirtualBox es de tipo 2.», «Comprobar VT-x en Linux» y «Pruébalo». **Mismo número de diapositivas (4).**

- [ ] **Step 3: Write the failing output test**

`tests/salida/presentacion.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { existe, leer } from './leer';

const P = 'docencia/smr/som/ud02-virtualizacion/02-hypervisors/';
const en = () => leer(`${P}presentacion/index.html`);
const es = () => leer(`${P}es/presentacion/index.html`);

describe('presentación de una página', () => {
  it('existe en los dos idiomas', () => {
    expect(existe(`${P}presentacion/index.html`)).toBe(true);
    expect(existe(`${P}es/presentacion/index.html`)).toBe(true);
  });
  it('el documento lleva el idioma del contenido', () => {
    expect(en()).toMatch(/<html lang="en"/);
    expect(es()).toMatch(/<html lang="es"/);
  });
  it('portada con el título de la página, el módulo y la unidad', () => {
    const portada = en().match(/<section class="portada"[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(portada).toContain('2. Hypervisors');
    expect(portada).toContain('Sistemas Operativos Monopuesto');
    expect(portada).toMatch(/Virtuali[sz]ation/);
  });
  it('una sección por diapositiva, más la portada', () => {
    expect(en().match(/<section[\s>]/g)).toHaveLength(5);
    expect(es().match(/<section[\s>]/g)).toHaveLength(5);
  });
  it('los bloques propios se convierten', () => {
    expect(en()).toContain('class="fragment"');
    expect(en()).toContain('class="columnas"');
    expect(en()).toContain('class="diapositiva-laboratorio"');
  });
  it('los avisos y el código llegan con sus clases (los estilos los pone presentacion.css)', () => {
    expect(en()).toContain('starlight-aside');
    expect(en()).toMatch(/<pre[\s>]/);
  });
  it('volver a los apuntes y cambiar de idioma', () => {
    expect(en()).toMatch(new RegExp(`<a[^>]*href="/${P}"[^>]*data-volver`));
    expect(en()).toMatch(new RegExp(`<a[^>]*href="/${P}es/presentacion/"[^>]*data-con-diapositiva`));
    expect(es()).toMatch(new RegExp(`<a[^>]*href="/${P}presentacion/"[^>]*data-con-diapositiva`));
  });
  it('textos de la interfaz en el idioma del contenido', () => {
    expect(en()).toContain('Back to the notes');
    expect(es()).toContain('Volver a los apuntes');
  });
  it('reveal.js empaquetado por la web, sin temas externos', () => {
    expect(en()).toMatch(/src="\/_astro\/[^"]+\.js"/);
    expect(en()).not.toMatch(/fonts\.googleapis|cdn\.jsdelivr|unpkg\.com/);
  });
  it('no se publican las diapositivas como páginas normales', () => {
    expect(existe('docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors/index.html')).toBe(false);
  });
});
```

Run: `npm run verificar`
Expected: FAIL en `presentacion.test.ts`, porque no existe la página (y quizá el build avise de la página `…/diapositivas/02-hypervisors/` publicada por Starlight).

- [ ] **Step 4: Colecciones**

`src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';
import { generarId } from './lib/ids';
import { CARPETA, idPagina } from './lib/diapositivas';

const DOCS = './src/content/docs';

export const collections = {
  // El mismo patrón que docsLoader() de Starlight, sin las carpetas de diapositivas.
  docs: defineCollection({
    loader: glob({
      base: DOCS,
      pattern: ['**/[^_]*.{markdown,mdown,mkdn,mkd,mdwn,md,mdx}', `!**/${CARPETA}/**`],
      generateId: generarId,
    }),
    schema: docsSchema(),
  }),
  // <unidad>/diapositivas/<página>.md → id de la página.
  diapositivas: defineCollection({
    loader: glob({ base: DOCS, pattern: `**/${CARPETA}/[^_]*.md`, generateId: ({ entry }) => idPagina(entry) }),
    schema: z.object({ title: z.string().optional(), subtitle: z.string().optional() }),
  }),
};
```

- [ ] **Step 5: Componente que trocea**

`src/components/Diapositivas.astro`:

```astro
---
import { trocear } from '../lib/diapositivas';

// El HTML ya compilado (con imágenes resueltas) se parte por cada «---» del Markdown.
const diapositivas = trocear(await Astro.slots.render('default'));
---

{diapositivas.map((d) => <section set:html={d} />)}
```

- [ ] **Step 6: Maquetación**

`src/layouts/Presentacion.astro`:

```astro
---
import type { CodigoIdioma } from '../config/modulos';
import { TEXTOS_PRESENTACION } from '../lib/diapositivas';
import '../styles/presentacion.css';

interface Props {
  titulo: string;
  subtitulo?: string;
  modulo: string;
  unidad: string;
  idioma: CodigoIdioma;
  hrefApuntes: string;
  idiomas: { texto: string; href: string; actual: boolean }[];
}

const { titulo, subtitulo, modulo, unidad, idioma, hrefApuntes, idiomas } = Astro.props;
const t = TEXTOS_PRESENTACION[idioma];
---

<!doctype html>
<html lang={idioma} data-tema="claro">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{titulo} · {modulo}</title>
    <link rel="icon" href="/comun/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/comun/fuentes.css" />
    <script is:inline>
      try {
        if (localStorage.getItem('presentacion-tema') === 'oscuro') document.documentElement.dataset.tema = 'oscuro';
      } catch {}
    </script>
  </head>
  <body>
    <nav class="barra-presentacion" data-barra>
      <a href={hrefApuntes} data-volver>← {t.volver}</a>
      {
        idiomas.map((i) => (
          <a href={i.href} data-con-diapositiva aria-current={i.actual ? 'page' : undefined}>
            {i.texto}
          </a>
        ))
      }
      <button type="button" data-tema-boton aria-label={t.tema} title={t.tema}>◐</button>
      <a href="?pdf" data-pdf target="_blank">{t.pdf}</a>
    </nav>
    <div class="reveal">
      <div class="slides">
        <section class="portada">
          <p class="portada__modulo">{modulo}</p>
          <h1>{titulo}</h1>
          {subtitulo && <p class="portada__subtitulo">{subtitulo}</p>}
          <p class="portada__unidad">{unidad}</p>
        </section>
        <slot />
      </div>
    </div>
    <script>
      import '../scripts/presentacion';
    </script>
  </body>
</html>
```

- [ ] **Step 7: Ruta**

`src/pages/docencia/[...presentacion].astro`:

```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import Diapositivas from '../../components/Diapositivas.astro';
import Presentacion from '../../layouts/Presentacion.astro';
import { ETIQUETA_IDIOMA, moduloDeId } from '../../config/modulos';
import { hrefPresentacion, idUnidad } from '../../lib/diapositivas';
import { esTraduccion, hrefDeId, idiomaContenido, idOriginal, idTraduccion } from '../../lib/idiomas';

export async function getStaticPaths() {
  const entradas = await getCollection('diapositivas');
  return entradas.map((entrada) => {
    if (!entrada.id.startsWith('docencia/')) throw new Error(`Diapositivas fuera de /docencia/: ${entrada.filePath}`);
    return { params: { presentacion: `${entrada.id.slice('docencia/'.length)}/presentacion` }, props: { entrada } };
  });
}

const { entrada } = Astro.props;
const id = entrada.id;
const pagina = await getEntry('docs', id);
if (!pagina) throw new Error(`${entrada.filePath}: no existe la página de apuntes ${id}`);
const modulo = moduloDeId(id);
if (!modulo) throw new Error(`${entrada.filePath}: la página no pertenece a ningún módulo`);
const idioma = idiomaContenido(id, modulo);
const unidad = (await getEntry('docs', idUnidad(id))) ?? (await getEntry('docs', idUnidad(idOriginal(id))));
const conDiapositivas = new Set((await getCollection('diapositivas')).map((e) => e.id));
const pareja = esTraduccion(id) ? idOriginal(id) : idTraduccion(id);
const idiomas =
  modulo.idioma !== 'es' && conDiapositivas.has(pareja)
    ? [
        { texto: ETIQUETA_IDIOMA[modulo.idioma], href: hrefPresentacion(idOriginal(id)), actual: !esTraduccion(id) },
        { texto: ETIQUETA_IDIOMA.es, href: hrefPresentacion(idTraduccion(id)), actual: esTraduccion(id) },
      ]
    : [];
const { Content } = await render(entrada);
---

<Presentacion
  titulo={entrada.data.title ?? pagina.data.title}
  subtitulo={entrada.data.subtitle}
  modulo={modulo.nombre}
  unidad={unidad?.data.title ?? ''}
  idioma={idioma}
  hrefApuntes={hrefDeId(id)}
  idiomas={idiomas}
>
  <Diapositivas><Content /></Diapositivas>
</Presentacion>
```

- [ ] **Step 8: Estilos**

`src/styles/presentacion.css`:

```css
/* Presentaciones: misma identidad que la web (verde placa + ámbar), legible a distancia. */
:root {
  --fondo: #ffffff;
  --texto: #16201b;
  --suave: #3d4d44;
  --acento: #b86e00;
  --acento-suave: #fbeed8;
  --pcb: #1f5244;
  --borde: #d3dbd4;
  --codigo: #f2f4ef;
  --titulos: 'Chakra Petch', 'Segoe UI', system-ui, sans-serif;
  --cuerpo: 'Atkinson Hyperlegible', 'Segoe UI', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, Consolas, monospace;
}
:root[data-tema='oscuro'] {
  --fondo: #0e1411;
  --texto: #e4ebe6;
  --suave: #cdd8d1;
  --acento: #f3aa3c;
  --acento-suave: #33260f;
  --pcb: #8fd1b9;
  --borde: #3c4c44;
  --codigo: #1d2823;
}
html,
body {
  margin: 0;
  height: 100%;
  background: var(--fondo);
  color: var(--texto);
}
.reveal {
  font-family: var(--cuerpo);
  font-size: 32px;
  color: var(--texto);
}
.reveal .slides section {
  text-align: left;
}
.reveal h1,
.reveal h2,
.reveal h3 {
  font-family: var(--titulos);
  color: var(--texto);
  line-height: 1.15;
  margin: 0 0 0.6em;
}
.reveal h1 { font-size: 2.1em; }
.reveal h2 {
  font-size: 1.45em;
  border-bottom: 4px solid var(--acento);
  padding-bottom: 0.15em;
}
.reveal h3 { font-size: 1.1em; color: var(--pcb); }
.reveal p { margin: 0.5em 0; line-height: 1.35; }
.reveal ul,
.reveal ol { margin: 0 0 0 1.1em; }
.reveal li { margin: 0.3em 0; line-height: 1.3; }
.reveal a { color: var(--acento); }
.reveal img {
  max-width: 100%;
  max-height: 500px;
  background: #ffffff; /* los SVG de la web tienen fondo blanco */
  border-radius: 8px;
}
.reveal table {
  font-size: 0.72em;
  border-collapse: collapse;
  margin: 0.4em 0;
}
.reveal th,
.reveal td {
  border-bottom: 1px solid var(--borde);
  padding: 0.3em 0.6em;
  text-align: left;
}
.reveal th { background: var(--acento-suave); }
/* Código (Expressive Code u otro): fondo y monoespaciada aunque falten sus estilos. */
.reveal pre {
  font-family: var(--mono);
  font-size: 0.62em;
  background: var(--codigo);
  color: var(--texto);
  padding: 0.6em 0.8em;
  border-radius: 8px;
  overflow: auto;
  box-shadow: none;
  width: auto;
  margin: 0.5em 0;
}
.reveal code { font-family: var(--mono); }
.reveal .expressive-code .frame { box-shadow: none; }
/* Avisos de Starlight */
.reveal .starlight-aside {
  border-left: 6px solid var(--acento);
  background: var(--acento-suave);
  padding: 0.4em 0.8em;
  border-radius: 6px;
  font-size: 0.85em;
  margin: 0.5em 0;
}
.reveal .starlight-aside__title {
  font-family: var(--titulos);
  font-weight: 700;
  display: flex;
  gap: 0.4em;
  align-items: center;
}
.reveal .starlight-aside__icon { width: 1em; height: 1em; fill: currentColor; }
/* Bloques propios */
.columnas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2em;
  align-items: center;
}
.diapositiva-laboratorio {
  display: grid;
  gap: 0.3em;
  max-width: 820px;
  padding: 0.8em 1em;
  border: 3px solid var(--pcb);
  border-radius: 14px;
  background: var(--acento-suave);
  color: var(--texto) !important;
  text-decoration: none;
}
.diapositiva-laboratorio__marca { font: 600 0.6em var(--titulos); text-transform: uppercase; letter-spacing: 0.08em; color: var(--pcb); }
.diapositiva-laboratorio__titulo { font: 700 1.2em var(--titulos); }
.diapositiva-laboratorio__descripcion { font-size: 0.75em; color: var(--suave); }
.diapositiva-laboratorio__abrir { font: 700 0.8em var(--titulos); color: var(--acento); }
/* Portada */
.reveal .portada { text-align: left; }
.portada__modulo,
.portada__unidad { font: 600 0.75em var(--titulos); color: var(--pcb); text-transform: uppercase; letter-spacing: 0.06em; }
.portada__subtitulo { font-size: 1.1em; color: var(--suave); }
/* Controles de reveal.js */
.reveal .controls,
.reveal .progress { color: var(--acento); }
.reveal .slide-number { background: transparent; color: var(--suave); font: 600 16px var(--titulos); }
/* Barra superior */
.barra-presentacion {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font: 600 14px var(--titulos);
  transition: opacity 0.3s;
}
.barra-presentacion a,
.barra-presentacion button {
  color: var(--texto);
  background: var(--fondo);
  border: 1px solid var(--borde);
  border-radius: 6px;
  padding: 0.25rem 0.55rem;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}
.barra-presentacion [aria-current='page'] { border-color: var(--acento); }
.oculta { opacity: 0; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .barra-presentacion { transition: none; }
}
```

- [ ] **Step 9: Arranque**

`src/scripts/presentacion.ts`:

```ts
import Reveal from 'reveal.js';
import 'reveal.js/reveal.css';

const CLAVE_TEMA = 'presentacion-tema';
const raiz = document.documentElement;
export const imprimir = new URLSearchParams(location.search).has('pdf');
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function alternarTema(): void {
  const nuevo = raiz.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
  raiz.dataset.tema = nuevo;
  try {
    localStorage.setItem(CLAVE_TEMA, nuevo);
  } catch {}
}

export const atajos: Record<number, (e: KeyboardEvent) => void> = {
  68: alternarTema, // D
};

export const presentacion = new Reveal({
  hash: true,
  width: 1280,
  height: 720,
  margin: 0.06,
  center: false,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  transition: sinMovimiento ? 'none' : 'fade',
  backgroundTransition: 'none',
  view: imprimir ? 'print' : null,
  pdfSeparateFragments: false,
  keyboard: atajos,
});

presentacion.initialize().then(() => {
  if (imprimir) setTimeout(() => window.print(), 800);
});

document.querySelector('[data-tema-boton]')?.addEventListener('click', alternarTema);

// Al cambiar de idioma se conserva la diapositiva (va en el #).
for (const enlace of document.querySelectorAll<HTMLAnchorElement>('[data-con-diapositiva]')) {
  enlace.addEventListener('click', () => {
    enlace.href = enlace.href.split('#')[0] + location.hash;
  });
}
```

(Los atajos se añaden al objeto `atajos` **antes** de `new Reveal`; la Tarea 4 los amplía en este mismo archivo.)

- [ ] **Step 10: Run the output tests**

Run: `npm run verificar`
Expected: PASS, incluida `tests/salida/presentacion.test.ts`. Si `astro build` falla al importar `astro/zod`, usa `import { z } from 'astro:content'`. Si la imagen `../hypervisor-types.svg` no se resuelve, el error lo dice: comprueba la ruta relativa desde `diapositivas/`.

- [ ] **Step 11: Comprobar el servidor de desarrollo (Review Focus 1)**

Run: `npx astro dev --port 4321` (queda en segundo plano), y luego:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4321/docencia/smr/som/ud02-virtualizacion/02-hypervisors/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4321/docencia/smr/som/ud02-virtualizacion/02-hypervisors/presentacion/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4321/docencia/smr/som/ud02-virtualizacion/02-hypervisors/es/presentacion/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4321/docencia/smr/som/
```

Expected: `200` las cuatro. Después: `npx astro dev stop`. Si las páginas de Starlight dan 404, la ruta las tapa: mueve la ruta a `src/pages/docencia/[...ruta]/presentacion.astro` con `params: { ruta: entrada.id.slice('docencia/'.length) }` y repite.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json src/content.config.ts "src/pages/docencia/[...presentacion].astro" src/components/Diapositivas.astro src/layouts/Presentacion.astro src/styles/presentacion.css src/scripts/presentacion.ts src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.md src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.es.md tests/salida/presentacion.test.ts
git commit -m "Presentaciones: colección de diapositivas, ruta …/presentacion/ y reveal.js 6.0.2 alojado en la web

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Pizarra, barra de herramientas y vista de impresión

**Files:**
- Create: `src/scripts/pizarra.ts`
- Modify: `src/scripts/presentacion.ts`, `src/layouts/Presentacion.astro`, `src/styles/presentacion.css`
- Test: `tests/unit/pizarra.test.ts`

**Interfaces:**
- Consumes: `atajos`, `presentacion`, `imprimir` (`src/scripts/presentacion.ts`, Tarea 3); `TEXTOS_PRESENTACION` (Tarea 1).
- Produces:
  - `type Modo = 'nada' | 'puntero' | 'lapiz'`
  - `COLORES: readonly string[]`
  - `GROSORES: readonly number[]`
  - `interface Pizarra { readonly modo: Modo; readonly trazos: readonly Trazo[]; alternar(m: 'puntero' | 'lapiz'): void; fijarModo(m: Modo): void; color(c: string): void; grosor(g: number): void; borrar(): void }`
  - `crearPizarra(contenedor: HTMLElement): Pizarra`

- [ ] **Step 1: Write the failing test**

`tests/unit/pizarra.test.ts`:

```ts
// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { COLORES, crearPizarra, GROSORES } from '../../src/scripts/pizarra';

function puntero(tipo: string, objetivo: EventTarget, x: number, y: number) {
  objetivo.dispatchEvent(new PointerEvent(tipo, { clientX: x, clientY: y, pointerId: 1, bubbles: true }));
}

describe('pizarra', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('crea el lienzo y el puntero, sin modo activo', () => {
    const p = crearPizarra(document.body);
    expect(p.modo).toBe('nada');
    expect(document.querySelector('canvas.pizarra-lienzo')?.getAttribute('data-modo')).toBe('nada');
    expect(document.querySelector('.pizarra-puntero')).not.toBeNull();
  });

  it('alternar activa y desactiva cada modo', () => {
    const p = crearPizarra(document.body);
    p.alternar('lapiz');
    expect(p.modo).toBe('lapiz');
    expect(document.documentElement.dataset.pizarra).toBe('lapiz');
    p.alternar('puntero');
    expect(p.modo).toBe('puntero');
    p.alternar('puntero');
    expect(p.modo).toBe('nada');
  });

  it('con el lápiz, arrastrar dibuja un trazo con el color y el grosor elegidos', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    p.color(COLORES[1]);
    p.grosor(GROSORES[1]);
    p.fijarModo('lapiz');
    puntero('pointerdown', lienzo, 10, 20);
    puntero('pointermove', lienzo, 30, 40);
    puntero('pointerup', lienzo, 30, 40);
    puntero('pointermove', lienzo, 99, 99); // ya no dibuja
    expect(p.trazos).toEqual([{ color: COLORES[1], grosor: GROSORES[1], puntos: [[10, 20], [30, 40]] }]);
  });

  it('sin el lápiz no dibuja', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    puntero('pointerdown', lienzo, 10, 20);
    puntero('pointermove', lienzo, 30, 40);
    expect(p.trazos).toEqual([]);
  });

  it('borrar quita todos los trazos', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    p.fijarModo('lapiz');
    puntero('pointerdown', lienzo, 1, 1);
    puntero('pointerup', lienzo, 1, 1);
    p.borrar();
    expect(p.trazos).toEqual([]);
  });

  it('el puntero sigue al ratón solo en modo puntero', () => {
    const p = crearPizarra(document.body);
    const punto = document.querySelector<HTMLElement>('.pizarra-puntero')!;
    puntero('pointermove', document, 5, 5);
    expect(punto.hasAttribute('data-visible')).toBe(false);
    p.fijarModo('puntero');
    puntero('pointermove', document, 120, 80);
    expect(punto.hasAttribute('data-visible')).toBe(true);
    expect(punto.style.left).toBe('120px');
    expect(punto.style.top).toBe('80px');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/pizarra.test.ts`
Expected: FAIL (no existe `src/scripts/pizarra`).

- [ ] **Step 3: Write minimal implementation**

`src/scripts/pizarra.ts`:

```ts
/** Puntero y dibujo a mano alzada sobre la presentación (ratón, dedo o lápiz). Sin dependencias. */
export type Modo = 'nada' | 'puntero' | 'lapiz';
export const COLORES = ['#e0212f', '#1f5bd8', '#1a8a3a'] as const;
export const GROSORES = [4, 10] as const;

export interface Trazo {
  color: string;
  grosor: number;
  puntos: [number, number][];
}

export interface Pizarra {
  readonly modo: Modo;
  readonly trazos: readonly Trazo[];
  alternar(m: 'puntero' | 'lapiz'): void;
  fijarModo(m: Modo): void;
  color(c: string): void;
  grosor(g: number): void;
  borrar(): void;
}

export function crearPizarra(contenedor: HTMLElement): Pizarra {
  const lienzo = document.createElement('canvas');
  lienzo.className = 'pizarra-lienzo';
  lienzo.dataset.modo = 'nada';
  const punto = document.createElement('div');
  punto.className = 'pizarra-puntero';
  contenedor.append(lienzo, punto);
  // Sin canvas 2D (happy-dom en las pruebas) la pizarra guarda los trazos pero no pinta.
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = lienzo.getContext('2d');
  } catch {}

  let modo: Modo = 'nada';
  let color: string = COLORES[0];
  let grosor: number = GROSORES[0];
  const trazos: Trazo[] = [];
  let actual: Trazo | null = null;

  function redibujar(): void {
    const c = ctx;
    if (!c) return;
    const r = window.devicePixelRatio || 1;
    c.setTransform(r, 0, 0, r, 0, 0);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.lineCap = 'round';
    c.lineJoin = 'round';
    for (const t of trazos) {
      c.strokeStyle = t.color;
      c.lineWidth = t.grosor;
      c.beginPath();
      t.puntos.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.stroke();
    }
  }

  function ajustar(): void {
    const r = window.devicePixelRatio || 1;
    lienzo.width = Math.round(window.innerWidth * r);
    lienzo.height = Math.round(window.innerHeight * r);
    redibujar();
  }

  lienzo.addEventListener('pointerdown', (e) => {
    if (modo !== 'lapiz') return;
    actual = { color, grosor, puntos: [[e.clientX, e.clientY]] };
    trazos.push(actual);
    lienzo.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  });
  lienzo.addEventListener('pointermove', (e) => {
    if (!actual) return;
    actual.puntos.push([e.clientX, e.clientY]);
    redibujar();
  });
  const terminar = () => {
    actual = null;
  };
  lienzo.addEventListener('pointerup', terminar);
  lienzo.addEventListener('pointercancel', terminar);

  document.addEventListener('pointermove', (e) => {
    if (modo !== 'puntero') return;
    punto.style.left = `${e.clientX}px`;
    punto.style.top = `${e.clientY}px`;
  });

  window.addEventListener('resize', ajustar);
  ajustar();

  function fijarModo(m: Modo): void {
    modo = m;
    actual = null;
    lienzo.dataset.modo = m;
    punto.toggleAttribute('data-visible', m === 'puntero');
    document.documentElement.dataset.pizarra = m;
  }

  return {
    get modo() {
      return modo;
    },
    get trazos() {
      return trazos;
    },
    alternar: (m) => fijarModo(modo === m ? 'nada' : m),
    fijarModo,
    color: (c) => {
      color = c;
    },
    grosor: (g) => {
      grosor = g;
    },
    borrar: () => {
      trazos.length = 0;
      actual = null;
      redibujar();
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/pizarra.test.ts`
Expected: PASS.

- [ ] **Step 5: Barra de la pizarra en la maquetación**

En `src/layouts/Presentacion.astro`, en el frontmatter añade `import { COLORES, GROSORES } from '../scripts/pizarra';` y, justo después de `</nav>`:

```astro
<div class="pizarra-barra" data-barra role="toolbar" aria-label={t.pizarra}>
  <button type="button" data-pizarra="puntero" aria-pressed="false" title={t.puntero}>●</button>
  <button type="button" data-pizarra="lapiz" aria-pressed="false" title={t.lapiz}>✎</button>
  {COLORES.map((c, i) => (
    <button type="button" data-color={c} aria-pressed={i === 0 ? 'true' : 'false'} title={t.color} style={`--muestra:${c}`} class="muestra" />
  ))}
  {GROSORES.map((g, i) => (
    <button type="button" data-grosor={g} aria-pressed={i === 0 ? 'true' : 'false'} title={t.grosor}>{i === 0 ? '▁' : '▃'}</button>
  ))}
  <button type="button" data-pizarra="borrar" title={t.borrar}>⌫</button>
</div>
```

- [ ] **Step 6: Conectar la pizarra en el arranque**

En `src/scripts/presentacion.ts`, importa `import { crearPizarra } from './pizarra';` y, **antes** de `export const presentacion = new Reveal(…)`, añade:

```ts
export const pizarra = crearPizarra(document.body);
atajos[80] = () => pizarra.alternar('puntero'); // P (sustituye «anterior» de reveal.js; siguen las flechas y RePág)
atajos[76] = () => pizarra.alternar('lapiz'); // L
atajos[67] = () => pizarra.borrar(); // C
```

Y al final del archivo:

```ts
presentacion.on('slidechanged', () => pizarra.borrar());

function marcar(selector: string, activo: Element | null): void {
  for (const b of document.querySelectorAll(selector)) b.setAttribute('aria-pressed', String(b === activo));
}
function marcarModo(): void {
  for (const b of document.querySelectorAll('[data-pizarra="puntero"], [data-pizarra="lapiz"]')) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-pizarra') === pizarra.modo));
  }
}
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-pizarra]')) {
  b.addEventListener('click', () => {
    const accion = b.dataset.pizarra;
    if (accion === 'borrar') pizarra.borrar();
    else if (accion === 'puntero' || accion === 'lapiz') pizarra.alternar(accion);
    marcarModo();
  });
}
document.addEventListener('keyup', marcarModo);
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-color]')) {
  b.addEventListener('click', () => {
    pizarra.color(b.dataset.color!);
    marcar('[data-color]', b);
  });
}
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-grosor]')) {
  b.addEventListener('click', () => {
    pizarra.grosor(Number(b.dataset.grosor));
    marcar('[data-grosor]', b);
  });
}

// Las barras se ocultan tras 3 s sin mover el ratón.
const barras = document.querySelectorAll('[data-barra]');
let temporizador: ReturnType<typeof setTimeout> | undefined;
function mostrarBarras(): void {
  for (const b of barras) b.classList.remove('oculta');
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    for (const b of barras) b.classList.add('oculta');
  }, 3000);
}
document.addEventListener('pointermove', mostrarBarras);
mostrarBarras();
```

- [ ] **Step 7: Estilos de la pizarra y de impresión**

Añade al final de `src/styles/presentacion.css`:

```css
/* Pizarra */
.pizarra-barra {
  position: fixed;
  bottom: 0.6rem;
  left: 0.5rem;
  z-index: 30;
  display: flex;
  gap: 0.3rem;
  transition: opacity 0.3s;
}
.pizarra-barra button {
  min-width: 2.2rem;
  height: 2.2rem;
  border: 1px solid var(--borde);
  border-radius: 6px;
  background: var(--fondo);
  color: var(--texto);
  font: 600 16px var(--titulos);
  cursor: pointer;
}
.pizarra-barra button[aria-pressed='true'] { border: 2px solid var(--acento); }
.pizarra-barra .muestra { background: var(--muestra); }
.pizarra-lienzo {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  pointer-events: none;
}
.pizarra-lienzo[data-modo='lapiz'] {
  pointer-events: auto;
  touch-action: none;
  cursor: crosshair;
}
.pizarra-puntero {
  position: fixed;
  z-index: 25;
  display: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #e0212f;
  box-shadow: 0 0 12px 4px rgb(224 33 47 / 0.6);
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.pizarra-puntero[data-visible] { display: block; }
html[data-pizarra='puntero'] { cursor: none; }
@media (prefers-reduced-motion: reduce) {
  .pizarra-barra { transition: none; }
}
/* Vista de impresión (PDF) y papel: solo las diapositivas. */
html.reveal-print .barra-presentacion,
html.reveal-print .pizarra-barra,
html.reveal-print .pizarra-lienzo,
html.reveal-print .pizarra-puntero {
  display: none !important;
}
@media print {
  .barra-presentacion,
  .pizarra-barra,
  .pizarra-lienzo,
  .pizarra-puntero {
    display: none !important;
  }
}
```

- [ ] **Step 8: Prueba de salida de la barra**

Añade a `tests/salida/presentacion.test.ts`:

```ts
describe('pizarra', () => {
  it('barra con puntero, lápiz, 3 colores, 2 grosores y borrar, con textos en el idioma del contenido', () => {
    const html = en();
    expect(html).toContain('data-pizarra="puntero"');
    expect(html).toContain('data-pizarra="lapiz"');
    expect(html).toContain('data-pizarra="borrar"');
    expect(html.match(/data-color="/g)).toHaveLength(3);
    expect(html.match(/data-grosor="/g)).toHaveLength(2);
    expect(html).toContain('title="Pen (L)"');
    expect(es()).toContain('title="Lápiz (L)"');
  });
});
```

Run: `npm test && npm run verificar`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/scripts/pizarra.ts src/scripts/presentacion.ts src/layouts/Presentacion.astro src/styles/presentacion.css tests/unit/pizarra.test.ts tests/salida/presentacion.test.ts
git commit -m "Presentaciones: puntero, lápiz y borrado; barras que se ocultan; vista de impresión limpia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Botón «Presentar» y comprobaciones globales de salida

**Files:**
- Modify: `src/components/PageTitle.astro`, `src/styles/docencia.css`
- Test: `tests/salida/presentacion.test.ts`

**Interfaces:**
- Consumes: colección `diapositivas` (Tarea 3); `hrefPresentacion`, `TEXTOS_PRESENTACION` (Tarea 1); `Astro.locals.starlightRoute.id` y `Astro.locals.idiomaContenido` (los rellena `src/middleware/idiomas.ts`).
- Produces: `a.boton-presentar[href=/X/presentacion/][lang]` junto al título de la página, solo si existe su presentación.

- [ ] **Step 1: Write the failing test**

Añade a `tests/salida/presentacion.test.ts` (y amplía el import: `import { globSync } from 'node:fs';`):

```ts
const DIST = 'dist/';
const presentaciones = globSync(`${DIST}**/presentacion/index.html`).map((r) => r.slice(DIST.length)).sort();

describe('botón «Presentar»', () => {
  it('en la página con presentación, en su idioma', () => {
    expect(leer(`${P}index.html`)).toMatch(new RegExp(`<a class="boton-presentar" href="/${P}presentacion/" lang="en"`));
    expect(leer(`${P}es/index.html`)).toMatch(new RegExp(`<a class="boton-presentar" href="/${P}es/presentacion/" lang="es"`));
    expect(leer(`${P}index.html`)).toContain('Present</a>');
  });
  it('en ninguna página sin presentación', () => {
    const conBoton = globSync(`${DIST}docencia/**/index.html`)
      .filter((r) => !r.includes('/presentacion/'))
      .filter((r) => leer(r.slice(DIST.length)).includes('class="boton-presentar"'))
      .map((r) => r.slice(DIST.length).replace(/index\.html$/, 'presentacion/index.html'))
      .sort();
    expect(conBoton).toEqual(presentaciones);
  });
});

describe('todas las presentaciones', () => {
  it('hay al menos una', () => {
    expect(presentaciones.length).toBeGreaterThan(0);
  });
  for (const ruta of presentaciones) {
    describe(ruta, () => {
      const html = () => leer(ruta);
      it('sin recursos de terceros', () => {
        expect(html()).not.toMatch(/<(?:script|img|iframe|source|video|audio)\b[^>]*\ssrc="(?:https?:)?\/\//);
        expect(html()).not.toMatch(/<link\b[^>]*\shref="(?:https?:)?\/\//);
        expect(html()).not.toMatch(/fonts\.googleapis|@import\s+url\(\s*["']?https?:/);
      });
      it('los enlaces y recursos internos existen', () => {
        const destinos = [...html().matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)].map((m) => m[1]);
        // Una dirección terminada en «/» necesita su index.html; las demás, el archivo (o su carpeta con index.html).
        const rotos = destinos.filter((d) => {
          const r = d.slice(1);
          return r === '' || r.endsWith('/') ? !existe(`${r}index.html`) : !(existe(r) || existe(`${r}/index.html`));
        });
        expect(rotos).toEqual([]);
      });
    });
  }
});

describe('hojas de estilo empaquetadas', () => {
  it('ninguna importa recursos de terceros', () => {
    for (const css of globSync(`${DIST}_astro/*.css`)) {
      expect(leer(css.slice(DIST.length))).not.toMatch(/@import\s+(?:url\()?\s*["']?https?:|fonts\.googleapis/);
    }
  });
});
```

Run: `npm run verificar`
Expected: FAIL en «botón Presentar» (todavía no existe).

- [ ] **Step 2: Implementar el botón**

`src/components/PageTitle.astro`:

```astro
---
import { getEntry } from 'astro:content';
import Default from '@astrojs/starlight/components/PageTitle.astro';
import ConmutadorIdioma from './ConmutadorIdioma.astro';
import { hrefPresentacion, TEXTOS_PRESENTACION } from '../lib/diapositivas';

const { conmutador, idiomaContenido } = Astro.locals;
const id = Astro.locals.starlightRoute.id;
const diapositivas = await getEntry('diapositivas', id);
---

<div lang={idiomaContenido}><Default><slot /></Default></div>
{conmutador && <ConmutadorIdioma estado={conmutador} />}
{
  diapositivas && (
    <a class="boton-presentar" href={hrefPresentacion(id)} lang={idiomaContenido}>
      <span aria-hidden="true">▶ </span>{TEXTOS_PRESENTACION[idiomaContenido].presentar}
    </a>
  )
}
```

Añade al final de `src/styles/docencia.css`:

```css
/* Botón «Presentar» (páginas con presentación) */
.boton-presentar {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.75rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: var(--sl-color-accent);
  color: var(--sl-color-black);
  font: 600 0.95rem var(--fuente-titulos);
  text-decoration: none;
}
.boton-presentar:hover {
  background: var(--sl-color-accent-high);
  color: var(--sl-color-black);
}
```

- [ ] **Step 3: Run tests**

Run: `npm test && npm run verificar`
Expected: PASS. Si la regex del botón no casa por el orden de los atributos que genera Astro, ajusta la prueba para buscar `class="boton-presentar"`, el `href` y el `lang` por separado dentro de la misma etiqueta `<a …>`.

- [ ] **Step 4: Commit**

```bash
git add src/components/PageTitle.astro src/styles/docencia.css tests/salida/presentacion.test.ts
git commit -m "Botón «Presentar» en las páginas con presentación y comprobaciones de privacidad y enlaces

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Norma — prueba de coherencia sobre el contenido real

**Files:**
- Create: `src/config/diapositivas.ts`
- Test: `tests/unit/diapositivas.test.ts`

**Interfaces:**
- Consumes: `MODULOS`; `CARPETA`, `analizar`, `listaMasLarga`, `codigoMasLargo`, `paginasDeTeoria` (Tarea 1).
- Produces: `UNIDADES_SIN_DIAPOSITIVAS: string[]`, con rutas de unidad relativas a `src/content/docs` (p. ej. `docencia/smr/som/ud02-virtualizacion`).

- [ ] **Step 1: Lista temporal**

`src/config/diapositivas.ts`:

```ts
/**
 * Unidades del 1.er trimestre que todavía no tienen todas sus presentaciones. Lista TEMPORAL:
 * - nunca se añade una unidad nueva (el material nuevo se crea con sus diapositivas);
 * - cuando una unidad tiene las presentaciones de todas sus páginas de teoría, se quita de aquí.
 */
export const UNIDADES_SIN_DIAPOSITIVAS: string[] = [
  'docencia/smr/som/ud01-introduccion',
  'docencia/smr/som/ud02-virtualizacion',
  'docencia/smr/som/ud03-funciones-sistema-operativo',
  'docencia/dam/sistemas-informaticos/ud01-hardware',
  'docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos',
  'docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting',
  'docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos',
  'docencia/smr/proyecto-intermodular/ud01-sector-productivo',
  'docencia/smr/proyecto-intermodular/ud02-diseno-proyecto',
];
```

- [ ] **Step 2: Write the test**

`tests/unit/diapositivas.test.ts`:

```ts
import { existsSync, globSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { UNIDADES_SIN_DIAPOSITIVAS } from '../../src/config/diapositivas';
import { MODULOS } from '../../src/config/modulos';
import { analizar, CARPETA, codigoMasLargo, listaMasLarga, paginasDeTeoria } from '../../src/lib/diapositivas';

const DOCS = 'src/content/docs';
const MAX_VINETAS = 8;
const MAX_CODIGO = 15;

const unidades = MODULOS.flatMap((m) =>
  readdirSync(path.join(DOCS, m.ruta), { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^ud\d\d-/.test(e.name))
    .map((e) => `${m.ruta}/${e.name}`),
).sort();
const archivos = globSync(`${DOCS}/**/${CARPETA}/*.md`).sort();

describe('norma: toda página de teoría tiene su presentación', () => {
  for (const unidad of unidades.filter((u) => !UNIDADES_SIN_DIAPOSITIVAS.includes(u))) {
    it(unidad, () => {
      const faltan = paginasDeTeoria(path.join(DOCS, unidad)).flatMap(({ nombre, traduccion }) =>
        [`${nombre}.md`, ...(traduccion ? [`${nombre}.es.md`] : [])].filter(
          (a) => !existsSync(path.join(DOCS, unidad, CARPETA, a)),
        ),
      );
      expect(faltan, `Faltan en ${unidad}/${CARPETA}/ (ver docs/guia-diapositivas.md)`).toEqual([]);
    });
  }
  it('la lista temporal solo nombra unidades que existen', () => {
    expect(UNIDADES_SIN_DIAPOSITIVAS.filter((u) => !unidades.includes(u))).toEqual([]);
  });
});

for (const archivo of archivos) {
  const relativo = archivo.slice(DOCS.length + 1);
  const dirUnidad = path.dirname(path.dirname(archivo));
  const nombre = path.basename(archivo);
  const traduccion = nombre.endsWith('.es.md');
  const md = readFileSync(archivo, 'utf8');
  const { diapositivas, avisos } = analizar(md);

  describe(relativo, () => {
    it('tiene su página de apuntes', () => {
      expect(existsSync(path.join(dirUnidad, nombre))).toBe(true);
    });
    it('separadores bien puestos', () => {
      expect(avisos).toEqual([]);
    });
    if (!traduccion && existsSync(path.join(dirUnidad, nombre.replace(/\.md$/, '.es.md')))) {
      it('tiene traducción con el mismo número de diapositivas', () => {
        const otra = path.join(path.dirname(archivo), nombre.replace(/\.md$/, '.es.md'));
        expect(existsSync(otra), 'la página tiene versión en castellano: falta la presentación .es.md').toBe(true);
        expect(analizar(readFileSync(otra, 'utf8')).diapositivas.length).toBe(diapositivas.length);
      });
    }
    if (traduccion) {
      it('existe la presentación original', () => {
        expect(existsSync(archivo.replace(/\.es\.md$/, '.md'))).toBe(true);
      });
    }
    it('las imágenes existen y son de la web', () => {
      const malas = [...md.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)/g)]
        .map((m) => m[1])
        .filter((src) =>
          /^(?:https?:)?\/\//.test(src)
            ? true
            : !existsSync(src.startsWith('/') ? path.join('public', src) : path.resolve(path.dirname(archivo), src)),
        );
      expect(malas).toEqual([]);
    });
    it('los laboratorios y sus pestañas existen', () => {
      const malos = [...md.matchAll(/::laboratorio\{([^}]*)\}/g)].flatMap(([, attrs]) => {
        const src = attrs.match(/src="([^"]+)"/)?.[1] ?? '';
        const pestana = attrs.match(/pestana="([^"]+)"/)?.[1];
        const indice = path.join(dirUnidad, 'laboratorios', src, 'index.html');
        if (!existsSync(indice)) return [`laboratorio «${src}»`];
        if (pestana && !readFileSync(indice, 'utf8').includes(`data-tab="${pestana}"`)) return [`pestaña «${pestana}» de «${src}»`];
        return [];
      });
      expect(malos).toEqual([]);
    });
    it(`ninguna lista de más de ${MAX_VINETAS} viñetas ni código de más de ${MAX_CODIGO} líneas`, () => {
      const excesos = diapositivas.flatMap((d, i) => [
        ...(listaMasLarga(d) > MAX_VINETAS ? [`diapositiva ${i + 1}: ${listaMasLarga(d)} viñetas`] : []),
        ...(codigoMasLargo(d) > MAX_CODIGO ? [`diapositiva ${i + 1}: ${codigoMasLargo(d)} líneas de código`] : []),
      ]);
      expect(excesos).toEqual([]);
    });
  });
}
```

- [ ] **Step 3: Comprobar que la prueba muerde**

Quita temporalmente `'docencia/smr/som/ud02-virtualizacion'` de la lista y ejecuta `npx vitest run tests/unit/diapositivas.test.ts`.
Expected: FAIL en `docencia/smr/som/ud02-virtualizacion`, con las páginas 01, 03, 04 y 05 (original y `.es.md`). **Vuelve a añadirla.**

Haz lo mismo con un `---` pegado a una línea de texto en la muestra.
Expected: FAIL en «separadores bien puestos». **Deshazlo.**

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/config/diapositivas.ts tests/unit/diapositivas.test.ts
git commit -m "Norma: prueba de que toda página de teoría tiene presentación coherente (con lista temporal del 1.er trimestre)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: La norma por escrito

**Files:**
- Create: `docs/guia-diapositivas.md`
- Modify: `CLAUDE.md`, `docs/guia-edicion.md`, `docs/revision-pendiente.md`, `docs/superpowers/specs/2026-10-13-modo-presentacion-design.md`
- Modify (fuera del repositorio, **no se confirma en git**): `/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Formación/privado/fase-c/encargo-comun.md`

**Interfaces:**
- Consumes: nombres y comportamientos de las Tareas 1–6 (rutas, bloques, `UNIDADES_SIN_DIAPOSITIVAS`, límites 8/15).
- Produces: documentación que leen el titular y los agentes del piloto.

- [ ] **Step 1: `docs/guia-diapositivas.md`**

Escríbela con estas secciones, en este orden. Usa el contenido de §3, §4 y §5 de la especificación, adaptado a quien escribe (segunda persona, ejemplos de código):

1. **Qué es y dónde va:**
   - Carpeta `diapositivas/` de la unidad, mismos nombres que los apuntes y `.es.md` para la traducción.
   - Direcciones `…/presentacion/`.
   - Qué páginas la llevan: todas las de teoría, no `index`, `actividades` ni `planificacion`.
2. **Formato:**
   - Frontmatter opcional (`title`, `subtitle`) y portada automática.
   - `---` entre diapositivas, **siempre con una línea en blanco antes**.
   - `##` como título de cada diapositiva.
   - Imágenes relativas (`../x.svg`, y en la traducción `../x-es.svg`).
   - Avisos, tablas y código.
3. **Bloques:**
   - `:::pasos`.
   - `::::columnas` (cuatro dos puntos si lleva un `:::pasos` dentro).
   - `::laboratorio{src pestana}`. `pestana` es el `data-tab` del laboratorio y se ve en la dirección `#…` de sus pestañas.
   - Un ejemplo completo de 3 diapositivas con los tres bloques.
4. **Pautas de redacción:** las de §5 de la especificación, completas:
   - Estructura «Qué aprenderás» (*What you will learn*, «Què aprendràs»; nunca «Hoy veremos», porque una presentación puede durar más o menos de una sesión) → contenido → «Pruébalo» → «Resumen», con 10–20 diapositivas.
   - Una idea por diapositiva, como máximo 6 viñetas de unas 8 palabras y sin párrafos.
   - Material gráfico siempre que se pueda: SVG con la paleta de la web (`#16201b` texto, `#b86e00` / `#fbeed8` ámbar, `#1f5244` / `#e3ece7` verde, fondo `#ffffff`), texto de 24 px o más en una `viewBox` de unos 1100 px de ancho, y versión `-es.svg` guardada en la carpeta de la unidad.
   - Tablas de 5 × 4 como máximo y código de 12 líneas como máximo.
   - Ejemplos resueltos con `:::pasos`.
   - Procedencia y diapositiva de créditos CC BY-NC-SA cuando proceda.
   - Traducción fiel, con las mismas diapositivas.
   - Nada de soluciones.
5. **Lo que comprueba `npm test`:** los puntos 1–6 de §6 de la especificación, los límites duros (8 viñetas, 15 líneas) y qué hacer con `UNIDADES_SIN_DIAPOSITIVAS` (quitar la unidad cuando esté completa; nunca añadir).
6. **Uso en clase:** teclas (flechas, espacio, AvPág/RePág, `F`, `Esc`, `B`, `D`, `P`, `L`, `C`), barras, PDF (`?pdf`) y móvil.
7. **Lista de comprobación al terminar una presentación:**
   - `npm test && npm run verificar`.
   - Revisarla en la vista previa en los dos idiomas: pasos, laboratorio y tema oscuro.

- [ ] **Step 2: `CLAUDE.md`**

En «Convenciones», después de la línea de laboratorios, añade:

```markdown
- Diapositivas: toda página de teoría lleva su presentación en `<unidad>/diapositivas/<pagina>.md` (y `.es.md` si la página tiene traducción), según `docs/guia-diapositivas.md`. Lo comprueba `tests/unit/diapositivas.test.ts`; `src/config/diapositivas.ts` es una lista temporal que solo se vacía.
```

En «Trampas conocidas» añade:

```markdown
- Las presentaciones no son páginas de Starlight: las genera `src/pages/docencia/[...presentacion].astro` con reveal.js. No uses temas de `reveal.js/theme/` (importan Google Fonts); los estilos van en `src/styles/presentacion.css`.
- En las diapositivas, `---` necesita una línea en blanco antes, y un `:::pasos` dentro de columnas obliga a abrir y cerrar con `::::columnas`.
```

Y una sección nueva, antes de «Publicación»:

```markdown
## Integrar una presentación nueva

1. Crear `<unidad>/diapositivas/<pagina>.md` (y `.es.md`) siguiendo `docs/guia-diapositivas.md`.
2. Gráficos nuevos en SVG en la carpeta de la unidad (con `-es.svg`).
3. Si la unidad ya tiene todas sus presentaciones, quitarla de `src/config/diapositivas.ts`.
4. `npm test && npm run verificar` y revisión en el navegador (`…/<pagina>/presentacion/`).
```

- [ ] **Step 3: `docs/guia-edicion.md`**

Añade una sección «Presentaciones para clase» con:
- Para qué sirven y dónde está el botón «Presentar».
- Dónde se edita una presentación (`diapositivas/` de la unidad).
- El ejemplo mínimo de 2 diapositivas.
- Un enlace a `docs/guia-diapositivas.md` para el resto.

Usa el mismo tono que el resto de la guía (léela antes).

- [ ] **Step 4: `docs/revision-pendiente.md`**

En «Pendiente de hacer» añade:

```markdown
- **Presentaciones** (modo presentación, diseño en `docs/superpowers/specs/2026-10-13-modo-presentacion-design.md`): revisar la muestra de SOM UD2 · 2 Hypervisors y, tras el piloto (SOM UD2, SI UD2, PI UD0), probarlas en clase. Unidades pendientes: `src/config/diapositivas.ts`.
```

- [ ] **Step 5: Corregir el ejemplo de la especificación**

En `docs/superpowers/specs/2026-10-13-modo-presentacion-design.md`, §3.4:
- En el ejemplo, cambia `:::columnas` y su cierre por `::::columnas` / `::::`.
- En la tabla, la fila de columnas pasa a `::::columnas … ::::`, añadiendo: «(cuatro dos puntos: dentro puede ir un `:::pasos`)».

- [ ] **Step 6: Plantilla de encargos (privado, sin git)**

En `/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Formación/privado/fase-c/encargo-comun.md`, añade una sección «Presentaciones (obligatorio)»:
- Cada página de teoría que crees lleva su presentación según `docs/guia-diapositivas.md` del repositorio.
- Prioriza el material gráfico (SVG nuevo con versión `-es.svg` cuando aporte).
- La unidad nueva no se añade nunca a `src/config/diapositivas.ts`.
- `npm test` debe pasar.

Usa Bash (`cat >>`), porque la herramienta Write puede rechazar rutas de `privado/` desde un worktree.

- [ ] **Step 7: Commit (solo lo del repositorio)**

```bash
git add docs/guia-diapositivas.md CLAUDE.md docs/guia-edicion.md docs/revision-pendiente.md docs/superpowers/specs/2026-10-13-modo-presentacion-design.md
git commit -m "Norma de diapositivas: guía de redacción, CLAUDE.md, guía de edición y lista de revisión

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Presentación de muestra completa (SOM UD2 · 2 Hypervisors)

**Files:**
- Modify: `src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.md` y `.es.md` (sustituyen la muestra mínima)
- Create: `src/content/docs/docencia/smr/som/ud02-virtualizacion/virtualization-methods.svg` y `virtualization-methods-es.svg`

**Interfaces:**
- Consumes: la guía (Tarea 7) y los apuntes `02-hypervisors.md` / `.es.md`. **Léelos enteros**: las diapositivas resumen lo que dicen y no añaden datos.
- Produces: la presentación que el titular revisará para fijar el estilo.

- [ ] **Step 1: Diagrama nuevo**

`virtualization-methods.svg`:
- `viewBox="0 0 1100 460"`, fondo `#ffffff`, `font-family="system-ui,-apple-system,Segoe UI,Arial,sans-serif"`, texto de 24 px o más (títulos de 28 px en negrita) y paleta de la guía.
- Tres columnas, una por método de la tabla de §3 «The problem» de los apuntes: *Software virtualization*, *Hardware-assisted* y *Paravirtualization*.
- Cada columna es una pila de cajas (Guest OS → capa que intercepta → CPU), con una flecha que indica quién gestiona las instrucciones delicadas, y una etiqueta de velocidad («Slowest», «Fast», «Fast for disk and network»).
- `<title>` y `<desc>` descriptivos.

Haz la versión `-es.svg` con los textos de la tabla de `02-hypervisors.es.md`.

- [ ] **Step 2: Presentación en inglés**

Sustituye `diapositivas/02-hypervisors.md` por estas **14 diapositivas** (portada automática aparte):

| # | Título | Contenido | Fuente | Visual |
|---|---|---|---|---|
| 1 | What you will learn | 4 viñetas: qué hace un hipervisor; tipo 1 y tipo 2; ayuda del procesador; elegir un hipervisor | Encabezados `##` | — |
| 2 | What a hypervisor does | `:::pasos`, 3–4 viñetas | §1 | — |
| 3 | Two families | Una frase grande y el diagrama | §2 | `../hypervisor-types.svg` |
| 4 | Type 1: bare metal | `::::columnas`: viñetas (dónde corre, uso típico, ejemplos) + diagrama recortado o el mismo | §2 «Type 1» | sí |
| 5 | Type 2: hosted | Igual que la 4 | §2 «Type 2» | sí |
| 6 | Type 1 vs Type 2 | Tabla de 4 filas (Runs on, Performance, Typical use, Examples) | §2 «Comparison» | tabla |
| 7 | Real products | Tabla de 5 filas como máximo (ESXi, Hyper-V, KVM, VirtualBox, VMware Workstation): producto, tipo y licencia | §2 «Real products» | tabla |
| 8 | Why is KVM Type 1? | Aviso `:::note` resumido | §2, nota | — |
| 9 | The problem | 2–3 viñetas: las instrucciones privilegiadas del invitado | §3 «The problem» | — |
| 10 | Three ways to solve it | El diagrama nuevo, con `:::pasos` si se divide en partes | §3, tabla | `../virtualization-methods.svg` |
| 11 | VT-x, AMD-V, EPT, NPT | `:::pasos`, 4 viñetas | §3 «VT-x, AMD-V…» | — |
| 12 | Check and enable it | `::::columnas`: pasos de la BIOS/UEFI + comando de Linux (≤ 6 líneas) | §3 «Check and enable it» | código |
| 13 | Try it yourself | `::laboratorio{src="virtualizacion" pestana="stack"}` y `::laboratorio{src="virtualizacion" pestana="vtx"}` | «How to work with this page» | tarjetas |
| 14 | Summary | 4 viñetas + enlace a las actividades de la unidad (`/docencia/smr/som/ud02-virtualizacion/actividades/`) | §4 y «Check what you have learned» | — |

Pautas: viñetas de unas 8 palabras, términos clave en **negrita**, sin párrafos. Los textos de la diapositiva 6 salen de la tabla «Comparison». Ningún dato que no esté en los apuntes.

- [ ] **Step 3: Traducción al castellano**

`diapositivas/02-hypervisors.es.md`: las mismas 14 diapositivas en el mismo orden, con `../hypervisor-types-es.svg`, `../virtualization-methods-es.svg` y el enlace `/docencia/smr/som/ud02-virtualizacion/actividades/es/`. Para la terminología, el glosario de la página.

- [ ] **Step 4: Run tests**

Run: `npm test && npm run verificar`
Expected: PASS. En `tests/salida/presentacion.test.ts`, la prueba «una sección por diapositiva» pasa a esperar 15 secciones: ajústala a `toHaveLength(15)`.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.md src/content/docs/docencia/smr/som/ud02-virtualizacion/diapositivas/02-hypervisors.es.md src/content/docs/docencia/smr/som/ud02-virtualizacion/virtualization-methods.svg src/content/docs/docencia/smr/som/ud02-virtualizacion/virtualization-methods-es.svg tests/salida/presentacion.test.ts
git commit -m "SOM UD2: presentación de muestra «2. Hypervisors» (inglés y castellano) con diagrama de métodos de virtualización

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Verificación en el navegador y aprobación del titular

**Files:**
- Create (ignorado por git): `.claude/launch.json`
- Modify (fuera del repositorio): `privado/ESTADO-DEL-PROYECTO.md`

- [ ] **Step 1: Vista previa estática**

Copia `dist/` a `<scratchpad>/vista` y crea `.claude/launch.json` con:
- una configuración `vista`;
- `python3 -m http.server 4321 --bind 127.0.0.1 --directory <scratchpad>/vista`;
- `port: 4321`.

Comprueba que `.claude/` sigue sin aparecer en `git status`. Ábrela con `preview_start { name: "vista" }`.

- [ ] **Step 2: Recorrido (en inglés y en castellano)**

En `/docencia/smr/som/ud02-virtualizacion/02-hypervisors/`:
1. Aparece el botón «Present» y lleva a la presentación.
2. Flechas, espacio y AvPág: los pasos van apareciendo; `Esc` muestra la vista general; `B` pone la pantalla en negro; `F` activa la pantalla completa (si la vista previa lo permite).
3. `D` cambia a tema oscuro; al recargar, sigue oscuro.
4. `L` y arrastrar dibuja; al pasar de diapositiva se borra; con el lápiz activo, el clic no pasa de diapositiva; `P` muestra el punto rojo; `C` borra.
5. Diapositiva 8: cambiar a «Castellano» mantiene la diapositiva 8.
6. Las tarjetas de laboratorio abren `…/laboratorios/virtualizacion/#stack` en otra pestaña (en castellano, con `?lang=es`).
7. **Review Focus 2 y 3:** el código de la diapositiva 12 tiene fondo y fuente monoespaciada, y el aviso de la 8 se ve como caja con borde de color, en los dos temas.
8. **Review Focus 4:** `?pdf` muestra una diapositiva por hoja, todos los pasos visibles y sin barras.
9. **Review Focus 5:** con `resize_window` en modo móvil, vista de desplazamiento legible y barras que no tapan el contenido.
10. `read_console_messages` sin errores, y `read_network_requests` sin peticiones fuera de `localhost`.

Corrige lo que falle (en `presentacion.css` o `presentacion.ts`), repite `npm test && npm run verificar` y haz un commit con lo corregido.

- [ ] **Step 3: Restablecer y capturar**

`resize_window { preset: "desktop" }`. Haz capturas de pantalla de la portada, la diapositiva 10 (diagrama), la 13 (laboratorio) y una con dibujo, para enseñárselas al titular.

- [ ] **Step 4: Estado del proyecto**

En `privado/ESTADO-DEL-PROYECTO.md`, tarea 2c, apunta:
- que el motor y la norma están hechos, con los hashes de los commits, **sin push**;
- dónde está la muestra;
- que lo siguiente es la aprobación del estilo por el titular y después los encargos del piloto (SOM UD2 01/03/04/05, SI UD2 01–04 y PI UD0, esta tras sus cambios).

- [ ] **Step 5: Puerta del titular**

Enséñale las capturas y la dirección de la vista previa, y **espera su aprobación del estilo** antes de preparar los encargos del piloto. No publiques (no hay push sin su confirmación).
