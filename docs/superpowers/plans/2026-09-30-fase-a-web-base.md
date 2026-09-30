# Fase A · Web base de docencia — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar funcionando en local (sin publicar) la web `moisesmas.com`: portada personal, sección Docencia con tres módulos, conmutador de idioma original ⇄ castellano, bloques especiales en Markdown y los dos laboratorios existentes integrados y traducidos.

**Architecture:** Astro 7 + Starlight 0.42. El contenido son archivos `.md` en `src/content/docs/`; las traducciones son archivos hermanos `*.es.md` publicados en `…/es/`. Un *route middleware* de Starlight limpia el menú y recalcula la paginación según el idioma; componentes sustituidos (`PageTitle`, `MarkdownContent`, `Footer`) pintan el conmutador y marcan el idioma del contenido. Los bloques especiales son directivas procesadas por un plugin del procesador Markdown Sätteri. Los laboratorios son HTML autónomos dentro de la carpeta de su tema, que una integración copia a la salida, y comparten un kit `public/comun/lab.js`.

**Tech Stack:** Node ≥ 22.12, Astro 7.3, @astrojs/starlight 0.42, @astrojs/markdown-satteri 0.4 + satteri 0.10, starlight-sidebar-topics 0.9, starlight-links-validator 0.26, github-slugger 2, vitest 5 + happy-dom 20.

**Spec:** `docs/superpowers/specs/2026-09-30-web-docencia-design.md`

## Global Constraints

- Raíz del proyecto (y del repositorio git ya inicializado): `/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Formación`. Commits con el correo ya configurado en el repo (`87723198+moisesmas@users.noreply.github.com`); terminar cada mensaje con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Contenido solo en `.md` (nunca `.mdx`).
- Nombres de archivos y carpetas de contenido: minúsculas, sin acentos ni espacios, palabras separadas por guiones (`ud01-introduccion`, `p3-instalacion.pdf`).
- Interfaz de la web en castellano. Idiomas originales: SOM `en`, Sistemas Informáticos `ca-valencia`, Proyecto Intermodular `es`.
- Sin cookies, sin analítica, sin recursos de terceros (salvo YouTube tras pulsar «play»). Fuentes autoalojadas.
- Nada de soluciones ni exámenes en el repositorio: van en `privado/` (ya ignorado por git).
- Paleta Docencia/laboratorios: verde placa `#1f5244` (oscuro `#1a463a`), ámbar `#b86e00` (oscuro `#f3aa3c`), fondos `#f2f4ef` / `#0e1411`. Fuentes: Chakra Petch (títulos), Atkinson Hyperlegible (texto), JetBrains Mono (código).
- Portada personal: estilo neutro (tipografía del sistema), independiente de Starlight.

### Trampas ya comprobadas (no repetirlas)

1. **Idioma de Starlight = `es-ES`, no `es`.** Con `lang: 'es'`, el servidor de desarrollo de Astro trata cualquier segmento `/es/` como prefijo del idioma por defecto y responde 404 en todas las traducciones (en `astro build` no se nota).
2. **Astro 7 usa Sätteri como procesador Markdown por defecto.** Los plugins remark (`markdown.remarkPlugins`) no se aplican. Los bloques especiales se escriben como plugin mdast de Sätteri (`markdown.processor: satteri({ mdastPlugins: [...] })`). Starlight añade sus propios plugins (avisos `:::note`, restauración de directivas desconocidas) al mismo procesador.
3. **`starlight-links-validator` no entiende nuestros ids `…/es`** (calcula el slug de `x.es.md` como `xes`) y marcaría como rotos enlaces válidos a traducciones. Se resuelve con `exclude` comprobando en disco que la traducción existe.
4. **Grupos del menú**: Starlight etiqueta cada carpeta con su nombre (`ud01-introduccion`). El middleware sustituye la etiqueta por el título de la página `index.md` de la carpeta.
5. **`npx astro dev` en un shell no interactivo se lanza en segundo plano** (Astro 7). Se para con `npx astro dev stop` y sus registros se leen con `npx astro dev logs`.
6. El aviso `The collection "i18n" does not exist or is empty` al compilar es inofensivo.
7. `starlight-sidebar-topics` necesita `exclude: ['/docencia']` para la página `/docencia/`, que no pertenece a ningún módulo.
8. Las dependencias deben figurar en `package.json` (las escribe `npm install`). Si faltan, Vite deja `@astrojs/starlight/route-data` fuera del bundle y la compilación falla con `Received protocol 'astro:'`.
9. En pruebas con `// @vitest-environment happy-dom`, `URL` es la de happy-dom: leer archivos con rutas relativas a la raíz del proyecto, no con `new URL(…, import.meta.url)`.

---

## Mapa de archivos

```
package.json, tsconfig.json, vitest.config.ts, astro.config.mjs
src/
  content.config.ts                 colección docs con ids propios
  env.d.ts                          tipos de Astro.locals
  config/modulos.ts                 los tres módulos (única fuente de verdad)
  config/sitio.ts                   nombre, presentación y nota de privacidad
  lib/ids.ts                        generarId: x.es.md → …/x/es
  lib/idiomas.ts                    lógica pura de idiomas (menú, paginación, conmutador)
  lib/archivos-contenido.ts         integración: copia/sirve descargas y laboratorios
  lib/enlaces.ts                    exclusión del validador para enlaces …/es/
  lib/laboratorios.ts               ficha, listado y comprobación de textos de laboratorios
  lib/pendientes.ts                 traducciones/laboratorios/nombres pendientes
  lib/informe-pendientes.ts         integración: informe al compilar
  lib/directivas/comun.ts           tipos y utilidades de directivas
  lib/directivas/{descarga,video,aules,modulos,artefacto,laboratorios}.ts
  lib/directivas/index.ts           plugin Sätteri que reparte por nombre
  middleware/idiomas.ts             route middleware de Starlight
  components/{PageTitle,ConmutadorIdioma,MarkdownContent,Footer}.astro
  pages/index.astro                 portada personal
  styles/docencia.css, styles/bloques.css
  content/docs/docencia/…           contenido
public/comun/                       lab.js, video.js, fuentes.css, fuentes/*.woff2, favicon.svg
tests/unit/*.test.ts                pruebas rápidas (npm test)
tests/salida/*.test.ts              pruebas sobre dist/ (npm run verificar)
CLAUDE.md, docs/guia-edicion.md
```

---

### Task 1: Proyecto base y ids de página

**Files:**
- Create: `package.json`, `tsconfig.json`, `vitest.config.ts`, `astro.config.mjs`, `src/content.config.ts`, `src/lib/ids.ts`, `src/content/docs/docencia/index.md`
- Test: `tests/unit/ids.test.ts`

**Interfaces:**
- Produces: `generarId({ entry, data }: { entry: string; data: Record<string, unknown> }): string` en `src/lib/ids.ts`.

- [ ] **Step 1: Crear `package.json`**

```json
{
  "name": "moisesmas-com",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run tests/unit",
    "verificar": "astro build && vitest run tests/salida"
  }
}
```

- [ ] **Step 2: Instalar dependencias**

Run:
```bash
npm install astro@^7.3.5 @astrojs/starlight@^0.42.4 @astrojs/markdown-satteri@^0.4.2 satteri@^0.10.5 starlight-sidebar-topics@^0.9.0 starlight-links-validator@^0.26.0 github-slugger@^2.0.0 sharp@^0.35.5
npm install -D vitest@^5.0.3 happy-dom@^20.14.5
```
Expected: termina sin errores; `package.json` tiene `dependencies` y `devDependencies`.

- [ ] **Step 3: Crear `tsconfig.json` y `vitest.config.ts`**

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['tests/**/*.test.ts'] },
});
```

- [ ] **Step 4: Escribir la prueba de `generarId`**

`tests/unit/ids.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { generarId } from '../../src/lib/ids';

const id = (entry: string, data: Record<string, unknown> = {}) => generarId({ entry, data });

describe('generarId', () => {
  it('página original', () => {
    expect(id('docencia/smr/som/ud01-introduccion/01-teoria.md')).toBe('docencia/smr/som/ud01-introduccion/01-teoria');
  });
  it('traducción al castellano', () => {
    expect(id('docencia/smr/som/ud01-introduccion/01-teoria.es.md')).toBe('docencia/smr/som/ud01-introduccion/01-teoria/es');
  });
  it('index original', () => {
    expect(id('docencia/smr/som/index.md')).toBe('docencia/smr/som');
  });
  it('index traducido', () => {
    expect(id('docencia/smr/som/index.es.md')).toBe('docencia/smr/som/es');
  });
  it('respeta un slug explícito', () => {
    expect(id('docencia/x.md', { slug: 'otra/ruta' })).toBe('otra/ruta');
  });
  it('normaliza mayúsculas y espacios como Starlight', () => {
    expect(id('docencia/UD 01/Tema A.md')).toBe('docencia/ud-01/tema-a');
  });
});
```

- [ ] **Step 5: Comprobar que falla**

Run: `npx vitest run tests/unit/ids.test.ts`
Expected: FAIL (no existe `src/lib/ids`).

- [ ] **Step 6: Implementar `src/lib/ids.ts`**

```ts
import { slug } from 'github-slugger';

/**
 * Id (y dirección) de cada página. Igual que el de Starlight, salvo que
 * `nombre.es.md` se publica en `…/nombre/es/` en vez de `…/nombrees/`.
 */
export function generarId({ entry, data }: { entry: string; data: Record<string, unknown> }): string {
  if (data.slug) return String(data.slug);
  let ruta = entry.replace(/\.(md|mdx)$/i, '');
  let traduccion = false;
  if (ruta.endsWith('.es')) {
    traduccion = true;
    ruta = ruta.slice(0, -3);
  }
  const segmentos = ruta.split('/').map((s) => slug(s));
  if (segmentos.at(-1) === 'index') segmentos.pop();
  if (traduccion) segmentos.push('es');
  return segmentos.join('/');
}
```

- [ ] **Step 7: Comprobar que pasa**

Run: `npx vitest run tests/unit/ids.test.ts`
Expected: PASS (6 pruebas).

- [ ] **Step 8: Configuración mínima de Astro y contenido inicial**

`src/content.config.ts`:
```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { generarId } from './lib/ids';

export const collections = {
  docs: defineCollection({ loader: docsLoader({ generateId: generarId }), schema: docsSchema() }),
};
```

`astro.config.mjs`:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
    }),
  ],
});
```

`src/content/docs/docencia/index.md`:
```md
---
title: Docencia ciclos formativos
template: splash
---

Materiales, apuntes y laboratorios de los módulos que imparto este curso.
```

- [ ] **Step 9: Compilar**

Run: `npm run build`
Expected: `Complete!` y existe `dist/docencia/index.html` con `<html lang="es-ES"`.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts astro.config.mjs src tests
git commit -m "Proyecto Astro + Starlight con ids de traducción …/es

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Módulos, menú por módulo y esqueleto de contenido

**Files:**
- Create: `src/config/modulos.ts`, contenido de esqueleto (ver Step 6)
- Modify: `astro.config.mjs`
- Test: `tests/unit/modulos.test.ts`

**Interfaces:**
- Produces (en `src/config/modulos.ts`):
  - `type CodigoIdioma = 'es' | 'en' | 'ca-valencia'`
  - `interface Modulo { id: string; ruta: string; nombre: string; ciclo: string; curso: string; idioma: CodigoIdioma; aules: string }`
  - `MODULOS: Modulo[]`, `ETIQUETA_IDIOMA: Record<CodigoIdioma, string>`
  - `moduloDeId(id: string): Modulo | undefined`
  - `temasMenu(): { id: string; label: string; link: string; items: { autogenerate: { directory: string } }[] }[]`

- [ ] **Step 1: Escribir la prueba**

`tests/unit/modulos.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { MODULOS, moduloDeId, temasMenu } from '../../src/config/modulos';

describe('moduloDeId', () => {
  it('encuentra el módulo de una página interior', () => {
    expect(moduloDeId('docencia/smr/som/ud01-introduccion/01-teoria')?.id).toBe('som');
  });
  it('encuentra el módulo de su portada y de su traducción', () => {
    expect(moduloDeId('docencia/smr/som')?.id).toBe('som');
    expect(moduloDeId('docencia/smr/som/es')?.id).toBe('som');
  });
  it('no confunde prefijos parecidos', () => {
    expect(moduloDeId('docencia/smr/somx/pagina')).toBeUndefined();
  });
  it('páginas fuera de módulos', () => {
    expect(moduloDeId('docencia')).toBeUndefined();
  });
});

describe('temasMenu', () => {
  it('un tema por módulo con su carpeta autogenerada', () => {
    const temas = temasMenu();
    expect(temas).toHaveLength(MODULOS.length);
    expect(temas[0]).toEqual({
      id: 'som',
      label: 'Sistemas Operativos Monopuesto',
      link: '/docencia/smr/som/',
      items: [{ autogenerate: { directory: 'docencia/smr/som' } }],
    });
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npx vitest run tests/unit/modulos.test.ts`
Expected: FAIL (no existe el módulo).

- [ ] **Step 3: Implementar `src/config/modulos.ts`**

```ts
export type CodigoIdioma = 'es' | 'en' | 'ca-valencia';

export interface Modulo {
  /** Identificador corto, también id del tema del menú. */
  id: string;
  /** Carpeta dentro de src/content/docs, sin barras al principio ni al final. */
  ruta: string;
  nombre: string;
  ciclo: string;
  curso: string;
  /** Idioma original del contenido. Si no es «es», cada página lleva versión en castellano. */
  idioma: CodigoIdioma;
  /** Curso de Aules del módulo (material reservado). */
  aules: string;
}

export const ETIQUETA_IDIOMA: Record<CodigoIdioma, string> = {
  es: 'Castellano',
  en: 'English',
  'ca-valencia': 'Valencià',
};

// Los enlaces de Aules son provisionales: sustituirlos por la dirección de cada curso.
export const MODULOS: Modulo[] = [
  {
    id: 'som',
    ruta: 'docencia/smr/som',
    nombre: 'Sistemas Operativos Monopuesto',
    ciclo: 'CFGM Sistemas Microinformáticos y Redes',
    curso: '1º',
    idioma: 'en',
    aules: 'https://aules.edu.gva.es/',
  },
  {
    id: 'sistemas-informaticos',
    ruta: 'docencia/dam/sistemas-informaticos',
    nombre: 'Sistemas Informáticos',
    ciclo: 'CFGS Desarrollo de Aplicaciones Multiplataforma (semipresencial)',
    curso: '1º',
    idioma: 'ca-valencia',
    aules: 'https://aules.edu.gva.es/',
  },
  {
    id: 'proyecto-intermodular',
    ruta: 'docencia/smr/proyecto-intermodular',
    nombre: 'Proyecto Intermodular',
    ciclo: 'CFGM Sistemas Microinformáticos y Redes',
    curso: '2º',
    idioma: 'es',
    aules: 'https://aules.edu.gva.es/',
  },
];

export function moduloDeId(id: string): Modulo | undefined {
  return MODULOS.find((m) => id === m.ruta || id.startsWith(`${m.ruta}/`));
}

/** Configuración de starlight-sidebar-topics: un menú lateral por módulo. */
export function temasMenu() {
  return MODULOS.map((m) => ({
    id: m.id,
    label: m.nombre,
    link: `/${m.ruta}/`,
    items: [{ autogenerate: { directory: m.ruta } }],
  }));
}
```

- [ ] **Step 4: Comprobar que pasa**

Run: `npx vitest run tests/unit/modulos.test.ts`
Expected: PASS.

- [ ] **Step 5: Añadir el menú por módulo a `astro.config.mjs`**

Contenido completo del archivo:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { temasMenu } from './src/config/modulos';

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
      // /docencia/ no pertenece a ningún módulo.
      plugins: [starlightSidebarTopics(temasMenu(), { exclude: ['/docencia'] })],
    }),
  ],
});
```

- [ ] **Step 6: Crear el esqueleto de contenido**

Los nombres de las unidades son provisionales (se pueden renombrar libremente hasta publicar). Crear exactamente estos archivos:

`src/content/docs/docencia/smr/som/index.md`:
```md
---
title: Single-User Operating Systems
---

Welcome to the module. Here you will find the notes, practical activities and labs for each unit.
```

`src/content/docs/docencia/smr/som/index.es.md`:
```md
---
title: Sistemas Operativos Monopuesto
---

Bienvenida al módulo. Aquí encontrarás los apuntes, las prácticas y los laboratorios de cada unidad.
```

`src/content/docs/docencia/smr/som/ud01-introduccion/index.md`:
```md
---
title: Unit 1 · Introduction to computer systems
---

What a computer system is, how information is represented and how it is measured.
```

`src/content/docs/docencia/smr/som/ud01-introduccion/index.es.md`:
```md
---
title: Unidad 1 · Introducción a los sistemas informáticos
---

Qué es un sistema informático, cómo se representa la información y cómo se mide.
```

`src/content/docs/docencia/dam/sistemas-informaticos/index.md`:
```md
---
title: Sistemes Informàtics
---

Benvinguda al mòdul. Ací trobaràs els apunts, les pràctiques i els laboratoris de cada unitat.
```

`src/content/docs/docencia/dam/sistemas-informaticos/index.es.md`:
```md
---
title: Sistemas Informáticos
---

Bienvenida al módulo. Aquí encontrarás los apuntes, las prácticas y los laboratorios de cada unidad.
```

`src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/index.md`:
```md
---
title: Unitat 1 · El maquinari
---

Els components físics d'un sistema informàtic i com es connecten entre ells.
```

`src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/index.es.md`:
```md
---
title: Unidad 1 · El hardware
---

Los componentes físicos de un sistema informático y cómo se conectan entre sí.
```

`src/content/docs/docencia/smr/proyecto-intermodular/index.md`:
```md
---
title: Proyecto Intermodular
---

Primero trabajaremos unas fases preparatorias y formativas; después, el propio proyecto.
```

- [ ] **Step 7: Compilar y comprobar las rutas**

Run: `npm run build`
Expected: `Complete!` y existen, entre otros, `dist/docencia/smr/som/index.html`, `dist/docencia/smr/som/es/index.html`, `dist/docencia/smr/som/ud01-introduccion/es/index.html`, `dist/docencia/dam/sistemas-informaticos/ud01-hardware/index.html`, `dist/docencia/smr/proyecto-intermodular/index.html`.

- [ ] **Step 8: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Módulos, menú lateral por módulo y esqueleto de contenido

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Lógica de idiomas y route middleware

**Files:**
- Create: `src/lib/idiomas.ts`, `src/middleware/idiomas.ts`, `src/env.d.ts`
- Modify: `astro.config.mjs`
- Test: `tests/unit/idiomas.test.ts`

**Interfaces:**
- Consumes: `CodigoIdioma`, `Modulo`, `moduloDeId` (Task 2).
- Produces (en `src/lib/idiomas.ts`):
  - `interface EstadoIdioma { original: CodigoIdioma; actual: CodigoIdioma; hrefOriginal: string; hrefCastellano: string }`
  - `esTraduccion(id: string): boolean`, `idOriginal(id: string): string`, `idTraduccion(id: string): string`, `hrefDeId(id: string): string`
  - `idiomaContenido(id: string, modulo: Modulo | undefined): CodigoIdioma`
  - `estadoIdioma(id: string, modulo: Modulo | undefined, existe: (id: string) => boolean): EstadoIdioma | undefined`
  - `limpiarMenu(entradas: Entrada[], idActual: string): Entrada[]` (quita traducciones, marca actual, etiqueta grupos)
  - `paginacion(menu: Entrada[], idActual: string, existe: (id: string) => boolean): { prev: Enlace | undefined; next: Enlace | undefined }`
  - `Astro.locals.idiomaContenido: CodigoIdioma` y `Astro.locals.conmutador: EstadoIdioma | undefined` (fijados por el middleware).

- [ ] **Step 1: Escribir la prueba**

`tests/unit/idiomas.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { MODULOS } from '../../src/config/modulos';
import { estadoIdioma, idiomaContenido, limpiarMenu, paginacion } from '../../src/lib/idiomas';

const SOM = MODULOS.find((m) => m.id === 'som')!;
const PI = MODULOS.find((m) => m.id === 'proyecto-intermodular')!;
const U = 'docencia/smr/som/ud01-introduccion';

const enlace = (href: string, label = href) => ({ type: 'link' as const, label, href, isCurrent: false, badge: undefined, attrs: {} });
const grupo = (label: string, entries: any[]) => ({ type: 'group' as const, label, entries, collapsed: false, badge: undefined });

const MENU: any[] = [
  enlace('/docencia/smr/som/', 'Single-User Operating Systems'),
  enlace('/docencia/smr/som/es/', 'Sistemas Operativos Monopuesto'),
  grupo('ud01-introduccion', [
    enlace(`/${U}/`, 'Unit 1'),
    enlace(`/${U}/es/`, 'Unidad 1'),
    enlace(`/${U}/01-teoria/`, 'Theory'),
    enlace(`/${U}/01-teoria/es/`, 'Teoría'),
    enlace(`/${U}/02-practicas/`, 'Practice'),
  ]),
];
const IDS = new Set(['docencia/smr/som', 'docencia/smr/som/es', U, `${U}/es`, `${U}/01-teoria`, `${U}/01-teoria/es`, `${U}/02-practicas`]);
const existe = (id: string) => IDS.has(id);
const hrefs = (entradas: any[]): string[] => entradas.flatMap((e) => (e.type === 'group' ? hrefs(e.entries) : [e.href]));

describe('limpiarMenu', () => {
  it('quita las versiones en castellano', () => {
    expect(hrefs(limpiarMenu(MENU, `${U}/01-teoria`))).toEqual([
      '/docencia/smr/som/', `/${U}/`, `/${U}/01-teoria/`, `/${U}/02-practicas/`,
    ]);
  });
  it('en una traducción marca como actual su original', () => {
    const menu = limpiarMenu(MENU, `${U}/01-teoria/es`);
    const actual = (menu[1] as any).entries.find((e: any) => e.isCurrent);
    expect(actual.href).toBe(`/${U}/01-teoria/`);
  });
  it('etiqueta el grupo con el título de su index y renombra ese enlace', () => {
    const g = limpiarMenu(MENU, `${U}/01-teoria`)[1] as any;
    expect(g.label).toBe('Unit 1');
    expect(g.entries[0].label).toBe('Presentación');
  });
});

describe('paginacion', () => {
  it('en el original, vecinos originales', () => {
    const p = paginacion(limpiarMenu(MENU, `${U}/01-teoria`), `${U}/01-teoria`, existe);
    expect(p.prev?.href).toBe(`/${U}/`);
    expect(p.next?.href).toBe(`/${U}/02-practicas/`);
  });
  it('en la traducción, vecinos en castellano si existen y original si no', () => {
    const p = paginacion(limpiarMenu(MENU, `${U}/01-teoria/es`), `${U}/01-teoria/es`, existe);
    expect(p.prev?.href).toBe(`/${U}/es/`);
    expect(p.next?.href).toBe(`/${U}/02-practicas/`);
  });
  it('página que no está en el menú: sin paginación', () => {
    expect(paginacion(limpiarMenu(MENU, 'docencia'), 'docencia', existe)).toEqual({ prev: undefined, next: undefined });
  });
});

describe('estadoIdioma', () => {
  it('original con traducción', () => {
    expect(estadoIdioma(`${U}/01-teoria`, SOM, existe)).toEqual({
      original: 'en', actual: 'en', hrefOriginal: `/${U}/01-teoria/`, hrefCastellano: `/${U}/01-teoria/es/`,
    });
  });
  it('en la traducción, el idioma actual es castellano', () => {
    expect(estadoIdioma(`${U}/01-teoria/es`, SOM, existe)?.actual).toBe('es');
  });
  it('sin traducción no hay conmutador', () => {
    expect(estadoIdioma(`${U}/02-practicas`, SOM, existe)).toBeUndefined();
  });
  it('módulo en castellano: sin conmutador', () => {
    expect(estadoIdioma('docencia/smr/proyecto-intermodular', PI, () => true)).toBeUndefined();
  });
  it('fuera de módulo: sin conmutador', () => {
    expect(estadoIdioma('docencia', undefined, () => true)).toBeUndefined();
  });
});

describe('idiomaContenido', () => {
  it('original del módulo, castellano en traducciones y fuera de módulos', () => {
    expect(idiomaContenido(`${U}/01-teoria`, SOM)).toBe('en');
    expect(idiomaContenido(`${U}/01-teoria/es`, SOM)).toBe('es');
    expect(idiomaContenido('docencia', undefined)).toBe('es');
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npx vitest run tests/unit/idiomas.test.ts`
Expected: FAIL (no existe `src/lib/idiomas`).

- [ ] **Step 3: Implementar `src/lib/idiomas.ts`**

```ts
import type { StarlightRouteData } from '@astrojs/starlight/route-data';
import type { CodigoIdioma, Modulo } from '../config/modulos';

type Entrada = StarlightRouteData['sidebar'][number];
type Enlace = Extract<Entrada, { type: 'link' }>;

export interface EstadoIdioma {
  original: CodigoIdioma;
  actual: CodigoIdioma;
  hrefOriginal: string;
  hrefCastellano: string;
}

const HREF_TRADUCCION = /\/es\/$/;

export function esTraduccion(id: string): boolean {
  return id.endsWith('/es');
}

export function idOriginal(id: string): string {
  return esTraduccion(id) ? id.slice(0, -3) : id;
}

export function idTraduccion(id: string): string {
  return `${idOriginal(id)}/es`;
}

export function hrefDeId(id: string): string {
  return `/${id}/`;
}

function idDeHref(href: string): string {
  return href.replace(/^\/|\/$/g, '');
}

export function idiomaContenido(id: string, modulo: Modulo | undefined): CodigoIdioma {
  if (esTraduccion(id)) return 'es';
  return modulo?.idioma ?? 'es';
}

/** Datos del conmutador, o undefined si la página no tiene pareja en el otro idioma. */
export function estadoIdioma(
  id: string,
  modulo: Modulo | undefined,
  existe: (id: string) => boolean,
): EstadoIdioma | undefined {
  if (!modulo || modulo.idioma === 'es') return undefined;
  const original = idOriginal(id);
  const traduccion = idTraduccion(id);
  if (!existe(original) || !existe(traduccion)) return undefined;
  return {
    original: modulo.idioma,
    actual: esTraduccion(id) ? 'es' : modulo.idioma,
    hrefOriginal: hrefDeId(original),
    hrefCastellano: hrefDeId(traduccion),
  };
}

/**
 * Menú tal como lo ve el alumno: sin las versiones en castellano, con el
 * original de la página actual marcado y cada carpeta etiquetada con el
 * título de su index (Starlight usaría el nombre de la carpeta).
 */
export function limpiarMenu(entradas: Entrada[], idActual: string): Entrada[] {
  const hrefActual = hrefDeId(idOriginal(idActual));
  return entradas
    .filter((e) => !(e.type === 'link' && HREF_TRADUCCION.test(e.href)))
    .map((e): Entrada => {
      if (e.type === 'link') return { ...e, isCurrent: e.href === hrefActual };
      const hijos = limpiarMenu(e.entries, idActual);
      const indice = hijos.find((h) => h.type === 'link' && h.href.endsWith(`/${e.label}/`));
      if (!indice) return { ...e, entries: hijos };
      return {
        ...e,
        label: indice.label,
        entries: hijos.map((h) => (h === indice ? { ...h, label: 'Presentación' } : h)),
      };
    });
}

function aplanar(entradas: Entrada[]): Enlace[] {
  return entradas.flatMap((e) => (e.type === 'group' ? aplanar(e.entries) : [e]));
}

/**
 * Anterior/siguiente sobre el menú ya limpio. En una traducción, los vecinos
 * apuntan a su versión en castellano si existe (se mantiene el idioma al pasar página).
 */
export function paginacion(
  menu: Entrada[],
  idActual: string,
  existe: (id: string) => boolean,
): { prev: Enlace | undefined; next: Enlace | undefined } {
  const enlaces = aplanar(menu);
  const i = enlaces.findIndex((e) => e.href === hrefDeId(idOriginal(idActual)));
  if (i === -1) return { prev: undefined, next: undefined };
  const enCastellano = (e: Enlace | undefined): Enlace | undefined => {
    if (!e || !esTraduccion(idActual)) return e;
    const traduccion = idTraduccion(idDeHref(e.href));
    return existe(traduccion) ? { ...e, href: hrefDeId(traduccion) } : e;
  };
  return { prev: enCastellano(enlaces[i - 1]), next: enCastellano(enlaces[i + 1]) };
}
```

- [ ] **Step 4: Comprobar que pasa**

Run: `npx vitest run tests/unit/idiomas.test.ts`
Expected: PASS (13 pruebas).

- [ ] **Step 5: Middleware y tipos**

`src/middleware/idiomas.ts`:
```ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getCollection } from 'astro:content';
import { moduloDeId } from '../config/modulos';
import { estadoIdioma, idiomaContenido, limpiarMenu, paginacion } from '../lib/idiomas';

// Se ejecuta después del de starlight-sidebar-topics (orden «pre»), que ya ha
// reducido el menú al del módulo actual.
export const onRequest = defineRouteMiddleware(async (context) => {
  const ids = new Set((await getCollection('docs')).map((e) => e.id));
  const existe = (id: string) => ids.has(id);
  const ruta = context.locals.starlightRoute;
  const modulo = moduloDeId(ruta.id);

  ruta.siteTitleHref = '/docencia/';
  context.locals.idiomaContenido = idiomaContenido(ruta.id, modulo);
  context.locals.conmutador = estadoIdioma(ruta.id, modulo, existe);

  if (!ruta.hasSidebar) return;
  ruta.sidebar = limpiarMenu(ruta.sidebar, ruta.id);
  const { prev, next } = paginacion(ruta.sidebar, ruta.id, existe);
  ruta.pagination.prev = prev;
  ruta.pagination.next = next;
});
```

`src/env.d.ts`:
```ts
declare namespace App {
  interface Locals {
    idiomaContenido: import('./config/modulos').CodigoIdioma;
    conmutador: import('./lib/idiomas').EstadoIdioma | undefined;
  }
}
```

En `astro.config.mjs`, añadir dentro de `starlight({ … })`, justo después de `locales`:
```js
      routeMiddleware: './src/middleware/idiomas.ts',
```

- [ ] **Step 6: Compilar y revisar el menú**

Run: `npm run build`
Expected: `Complete!`. Además:
```bash
grep -c '/docencia/smr/som/es/' dist/docencia/smr/som/ud01-introduccion/index.html
grep -o 'class="large[^"]*">[^<]*' dist/docencia/smr/som/ud01-introduccion/index.html
```
Expected: `0` (ninguna traducción en el menú ni en la paginación de la página original) y el grupo del menú etiquetado `Unit 1 · Introduction to computer systems` (no `ud01-introduccion`).

- [ ] **Step 7: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Idiomas: menú sin traducciones y paginación que mantiene el castellano

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Conmutador de idioma e idioma del contenido

**Files:**
- Create: `src/components/ConmutadorIdioma.astro`, `src/components/PageTitle.astro`, `src/components/MarkdownContent.astro`, `tests/salida/leer.ts`, `tests/salida/idiomas.test.ts`
- Modify: `astro.config.mjs`

**Interfaces:**
- Consumes: `Astro.locals.conmutador`, `Astro.locals.idiomaContenido` (Task 3), `ETIQUETA_IDIOMA` (Task 2).
- Produces: `tests/salida/leer.ts` con `leer(ruta: string): string` y `existe(ruta: string): boolean` sobre `dist/`. Marcado del conmutador: `<nav class="conmutador-idioma" aria-label="Idioma del contenido">` con un `<a>` por idioma y `aria-current="page"` en el actual.

- [ ] **Step 1: Ayudante de pruebas de salida**

`tests/salida/leer.ts`:
```ts
import { existsSync, readFileSync } from 'node:fs';

const DIST = new URL('../../dist/', import.meta.url);

export function leer(ruta: string): string {
  return readFileSync(new URL(ruta, DIST), 'utf8');
}

export function existe(ruta: string): boolean {
  return existsSync(new URL(ruta, DIST));
}

/** Enlaces del conmutador de idioma: [{ href, texto, actual }]. */
export function conmutador(html: string): { href: string; texto: string; actual: boolean }[] {
  const nav = html.match(/<nav class="conmutador-idioma[^"]*"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  if (!nav) return [];
  return [...nav.matchAll(/<a ([^>]*)>([^<]*)<\/a>/g)].map(([, attrs, texto]) => ({
    href: attrs.match(/href="([^"]*)"/)?.[1] ?? '',
    texto: texto.trim(),
    actual: /aria-current="page"/.test(attrs),
  }));
}
```

- [ ] **Step 2: Escribir la prueba de salida**

`tests/salida/idiomas.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { conmutador, leer } from './leer';

const U = '/docencia/smr/som/ud01-introduccion/';

describe('conmutador de idioma', () => {
  it('en el original, English activo', () => {
    expect(conmutador(leer('docencia/smr/som/ud01-introduccion/index.html'))).toEqual([
      { href: U, texto: 'English', actual: true },
      { href: `${U}es/`, texto: 'Castellano', actual: false },
    ]);
  });
  it('en la traducción, Castellano activo', () => {
    expect(conmutador(leer('docencia/smr/som/ud01-introduccion/es/index.html'))).toEqual([
      { href: U, texto: 'English', actual: false },
      { href: `${U}es/`, texto: 'Castellano', actual: true },
    ]);
  });
  it('Sistemas Informáticos usa Valencià', () => {
    const enlaces = conmutador(leer('docencia/dam/sistemas-informaticos/index.html'));
    expect(enlaces.map((e) => e.texto)).toEqual(['Valencià', 'Castellano']);
  });
  it('Proyecto Intermodular no tiene conmutador', () => {
    expect(conmutador(leer('docencia/smr/proyecto-intermodular/index.html'))).toEqual([]);
  });
});

describe('idioma del contenido', () => {
  it('marca el contenido con su idioma real', () => {
    expect(leer('docencia/smr/som/ud01-introduccion/index.html')).toMatch(/<div lang="en"/);
    expect(leer('docencia/smr/som/ud01-introduccion/es/index.html')).toMatch(/<div lang="es"/);
    expect(leer('docencia/dam/sistemas-informaticos/index.html')).toMatch(/<div lang="ca-valencia"/);
  });
  it('la interfaz sigue en castellano', () => {
    expect(leer('docencia/smr/som/index.html')).toMatch(/<html lang="es-ES"/);
  });
});

describe('paginación en castellano', () => {
  it('desde la portada del módulo en castellano, «siguiente» va a la unidad en castellano', () => {
    expect(leer('docencia/smr/som/es/index.html')).toMatch(new RegExp(`<a href="${U}es/" rel="next"`));
  });
});
```

- [ ] **Step 3: Comprobar que falla**

Run: `npm run verificar`
Expected: FAIL en `conmutador de idioma` e `idioma del contenido` (aún no hay componentes).

- [ ] **Step 4: Componentes**

`src/components/ConmutadorIdioma.astro`:
```astro
---
import { ETIQUETA_IDIOMA } from '../config/modulos';
import type { EstadoIdioma } from '../lib/idiomas';

interface Props {
  estado: EstadoIdioma;
}

const { estado } = Astro.props;
const opciones = [
  { idioma: estado.original, href: estado.hrefOriginal },
  { idioma: 'es' as const, href: estado.hrefCastellano },
];
---

<nav class="conmutador-idioma" aria-label="Idioma del contenido">
  {
    opciones.map((o) => (
      <a href={o.href} lang={o.idioma} hreflang={o.idioma} aria-current={o.idioma === estado.actual ? 'page' : undefined}>{ETIQUETA_IDIOMA[o.idioma]}</a>
    ))
  }
</nav>

<style>
  .conmutador-idioma {
    display: inline-flex;
    margin-top: 0.75rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 999px;
    overflow: hidden;
    font-size: var(--sl-text-sm);
  }
  .conmutador-idioma a {
    padding: 0.3rem 0.95rem;
    color: var(--sl-color-gray-2);
    text-decoration: none;
  }
  .conmutador-idioma a[aria-current='page'] {
    background: var(--sl-color-accent);
    color: var(--sl-color-black);
    font-weight: 700;
  }
  .conmutador-idioma a:not([aria-current]):hover {
    background: var(--sl-color-gray-6);
    color: var(--sl-color-white);
  }
</style>
```

`src/components/PageTitle.astro`:
```astro
---
import Default from '@astrojs/starlight/components/PageTitle.astro';
import ConmutadorIdioma from './ConmutadorIdioma.astro';

const { conmutador } = Astro.locals;
---

<Default><slot /></Default>
{conmutador && <ConmutadorIdioma estado={conmutador} />}
```

`src/components/MarkdownContent.astro`:
```astro
---
import Default from '@astrojs/starlight/components/MarkdownContent.astro';
---

<div lang={Astro.locals.idiomaContenido}>
  <Default><slot /></Default>
</div>
```

En `astro.config.mjs`, dentro de `starlight({ … })`, después de `routeMiddleware`:
```js
      components: {
        PageTitle: './src/components/PageTitle.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
```

- [ ] **Step 5: Comprobar que pasa**

Run: `npm run verificar`
Expected: PASS (7 pruebas de salida).

- [ ] **Step 6: Comprobar en el servidor de desarrollo (trampa 1)**

Run:
```bash
npx astro dev --port 4321
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/docencia/smr/som/ud01-introduccion/es/
npx astro dev stop
```
Expected: `200`.

- [ ] **Step 7: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Conmutador de idioma junto al título e idioma real del contenido

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Descargas y laboratorios dentro del contenido + validador de enlaces

**Files:**
- Create: `src/lib/archivos-contenido.ts`, `src/lib/enlaces.ts`
- Modify: `astro.config.mjs`
- Test: `tests/unit/archivos-contenido.test.ts`, `tests/unit/enlaces.test.ts`

**Interfaces:**
- Produces:
  - `resolverArchivo(raiz: string, url: string): Promise<string | null>` y `copiarArchivos(raiz: string, salida: string): Promise<number>` en `src/lib/archivos-contenido.ts`; export por defecto `archivosContenido(): AstroIntegration`.
  - `traduccionExiste(docs: string, enlace: string): boolean` en `src/lib/enlaces.ts`.
  - Ayudante de pruebas `crearCarpeta(archivos: Record<string, string>): string` (definido en cada test que lo usa).

- [ ] **Step 1: Escribir las pruebas**

`tests/unit/archivos-contenido.test.ts`:
```ts
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { copiarArchivos, resolverArchivo } from '../../src/lib/archivos-contenido';

function crearCarpeta(archivos: Record<string, string>): string {
  const raiz = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-')));
  for (const [ruta, contenido] of Object.entries(archivos)) {
    const destino = path.join(raiz, ruta);
    mkdirSync(path.dirname(destino), { recursive: true });
    writeFileSync(destino, contenido);
  }
  return raiz;
}

const ARCHIVOS = {
  'som/ud01/index.md': '# página',
  'som/ud01/p3.pdf': 'pdf',
  'som/ud01/laboratorios/bits/index.html': '<p>lab</p>',
};

describe('resolverArchivo', () => {
  const raiz = crearCarpeta(ARCHIVOS);
  it('sirve una descarga', async () => {
    expect(await resolverArchivo(raiz, '/som/ud01/p3.pdf')).toBe(path.join(raiz, 'som/ud01/p3.pdf'));
  });
  it('sirve el index.html de un laboratorio, con o sin parámetros', async () => {
    const lab = path.join(raiz, 'som/ud01/laboratorios/bits/index.html');
    expect(await resolverArchivo(raiz, '/som/ud01/laboratorios/bits/')).toBe(lab);
    expect(await resolverArchivo(raiz, '/som/ud01/laboratorios/bits/?lang=es#kib')).toBe(lab);
  });
  it('nunca sirve el Markdown de las páginas', async () => {
    expect(await resolverArchivo(raiz, '/som/ud01/index.md')).toBeNull();
  });
  it('no sale de la carpeta de contenido', async () => {
    expect(await resolverArchivo(raiz, '/../secreto.txt')).toBeNull();
    expect(await resolverArchivo(raiz, '/%2e%2e/secreto.txt')).toBeNull();
  });
  it('lo que no existe se deja pasar a Astro', async () => {
    expect(await resolverArchivo(raiz, '/som/ud01/')).toBeNull();
    expect(await resolverArchivo(raiz, '/som/ud01/nada.pdf')).toBeNull();
  });
});

describe('copiarArchivos', () => {
  it('copia descargas y laboratorios, no las páginas', async () => {
    const raiz = crearCarpeta(ARCHIVOS);
    const salida = realpathSync(mkdtempSync(path.join(tmpdir(), 'dist-')));
    expect(await copiarArchivos(raiz, salida)).toBe(2);
    expect(readFileSync(path.join(salida, 'som/ud01/p3.pdf'), 'utf8')).toBe('pdf');
    expect(existsSync(path.join(salida, 'som/ud01/laboratorios/bits/index.html'))).toBe(true);
    expect(existsSync(path.join(salida, 'som/ud01/index.md'))).toBe(false);
  });
});
```

`tests/unit/enlaces.test.ts`:
```ts
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { traduccionExiste } from '../../src/lib/enlaces';

const docs = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-')));
mkdirSync(path.join(docs, 'docencia/smr/som/ud01'), { recursive: true });
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/01-teoria.es.md'), '');
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/index.es.md'), '');

describe('traduccionExiste', () => {
  it('página traducida', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/es/')).toBe(true);
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/es/#apartado')).toBe(true);
  });
  it('index traducido', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/es/')).toBe(true);
  });
  it('traducción inexistente: no se excluye (el validador lo marcará)', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/02-practicas/es/')).toBe(false);
  });
  it('enlaces que no son traducciones: no se excluyen', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/')).toBe(false);
  });
});
```

- [ ] **Step 2: Comprobar que fallan**

Run: `npx vitest run tests/unit/archivos-contenido.test.ts tests/unit/enlaces.test.ts`
Expected: FAIL (módulos inexistentes).

- [ ] **Step 3: Implementar `src/lib/archivos-contenido.ts`**

```ts
import type { AstroIntegration } from 'astro';
import { createReadStream } from 'node:fs';
import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PAGINA = /\.(md|mdx)$/i;

const TIPOS: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
};

/** Archivo de contenido (no página) que corresponde a una URL, o null. */
export async function resolverArchivo(raiz: string, url: string): Promise<string | null> {
  const limpia = decodeURIComponent(url.split(/[?#]/)[0]);
  let destino = path.join(raiz, limpia);
  if (!destino.startsWith(raiz + path.sep)) return null;
  if (limpia.endsWith('/')) destino = path.join(destino, 'index.html');
  if (PAGINA.test(destino)) return null;
  try {
    return (await stat(destino)).isFile() ? destino : null;
  } catch {
    return null;
  }
}

async function* recorrer(dir: string): AsyncGenerator<string> {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) yield* recorrer(ruta);
    else if (!PAGINA.test(e.name)) yield ruta;
  }
}

/** Copia a la salida, en la misma ruta, todo lo que no es una página. Devuelve cuántos archivos. */
export async function copiarArchivos(raiz: string, salida: string): Promise<number> {
  let n = 0;
  for await (const origen of recorrer(raiz)) {
    const destino = path.join(salida, path.relative(raiz, origen));
    await mkdir(path.dirname(destino), { recursive: true });
    await cp(origen, destino);
    n++;
  }
  return n;
}

/**
 * Descargas y laboratorios viven junto a las páginas en src/content/docs.
 * Esta integración los sirve en desarrollo y los copia al compilar.
 * Debe ir antes que Starlight en `integrations` para que el validador de enlaces los encuentre.
 */
export default function archivosContenido(): AstroIntegration {
  let raiz = '';
  return {
    name: 'archivos-contenido',
    hooks: {
      'astro:config:setup': ({ config }) => {
        raiz = fileURLToPath(new URL('./src/content/docs', config.root));
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const archivo = await resolverArchivo(raiz, req.url ?? '/');
          if (!archivo) return next();
          res.setHeader('Content-Type', TIPOS[path.extname(archivo).toLowerCase()] ?? 'application/octet-stream');
          createReadStream(archivo).pipe(res);
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const n = await copiarArchivos(raiz, fileURLToPath(dir));
        logger.info(`${n} archivos de contenido copiados (descargas y laboratorios)`);
      },
    },
  };
}
```

- [ ] **Step 4: Implementar `src/lib/enlaces.ts`**

```ts
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * starlight-links-validator no reconoce los ids …/es (trampa 3). Para no perder
 * la validación, un enlace a una traducción se excluye solo si el archivo existe.
 */
export function traduccionExiste(docs: string, enlace: string): boolean {
  const ruta = enlace.split(/[?#]/)[0];
  const m = ruta.match(/^\/(.+)\/es\/?$/);
  if (!m) return false;
  return existsSync(path.join(docs, `${m[1]}.es.md`)) || existsSync(path.join(docs, m[1], 'index.es.md'));
}
```

- [ ] **Step 5: Comprobar que pasan**

Run: `npx vitest run tests/unit/archivos-contenido.test.ts tests/unit/enlaces.test.ts`
Expected: PASS.

- [ ] **Step 6: Conectar en `astro.config.mjs`**

Contenido completo del archivo:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import archivosContenido from './src/lib/archivos-contenido';
import { temasMenu } from './src/config/modulos';
import { traduccionExiste } from './src/lib/enlaces';

const DOCS = fileURLToPath(new URL('./src/content/docs', import.meta.url));

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    // Antes que Starlight: los archivos deben estar copiados cuando valida los enlaces.
    archivosContenido(),
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
      routeMiddleware: './src/middleware/idiomas.ts',
      components: {
        PageTitle: './src/components/PageTitle.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
      plugins: [
        starlightLinksValidator({ exclude: ({ link }) => traduccionExiste(DOCS, link) }),
        // /docencia/ no pertenece a ningún módulo.
        starlightSidebarTopics(temasMenu(), { exclude: ['/docencia'] }),
      ],
    }),
  ],
});
```

- [ ] **Step 7: Comprobar el validador con un enlace real**

Añadir temporalmente al final de `src/content/docs/docencia/smr/som/index.md`:
```md
[Unidad en castellano](/docencia/smr/som/ud01-introduccion/es/) · [Roto](/docencia/no-existe/)
```
Run: `npm run build`
Expected: FAIL con `Links validation failed` que señala **solo** `/docencia/no-existe/`.
Después, quitar esa línea y volver a ejecutar `npm run build` → `Complete!`.

- [ ] **Step 8: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Descargas y laboratorios junto a las páginas; validación de enlaces

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Bloques `::descarga`, `::video`, `:::aules` y `::modulos`

**Files:**
- Create: `src/lib/directivas/comun.ts`, `src/lib/directivas/descarga.ts`, `src/lib/directivas/video.ts`, `src/lib/directivas/aules.ts`, `src/lib/directivas/modulos.ts`, `src/lib/directivas/index.ts`, `public/comun/video.js`, `tests/unit/ayuda-directivas.ts`
- Modify: `astro.config.mjs`, `src/content/docs/docencia/index.md`
- Test: `tests/unit/directivas.test.ts`

**Interfaces:**
- Consumes: `generarId` (Task 1), `moduloDeId`, `MODULOS`, `ETIQUETA_IDIOMA`, `Modulo` (Task 2), `esTraduccion` (Task 3).
- Produces (en `src/lib/directivas/comun.ts`):
  - `interface NodoDirectiva { name: string; attributes?: Record<string, string | null | undefined> | null; children: unknown[] }`
  - `interface ArchivoMd { ruta: string; docs: string; relativo: string; id: string; dir: string; hrefDir: string; traduccion: boolean; modulo: Modulo | undefined }`
  - `type Manejador = (nodo: NodoDirectiva, archivo: ArchivoMd) => MdastContent | undefined`
  - `archivoMd(fileURL: URL | undefined): ArchivoMd | undefined`, `escapar(t: string): string`, `textoDe(nodos: unknown[]): string`, `atributo(nodo: NodoDirectiva, nombre: string): string | undefined`, `html(valor: string): MdastContent`, `fallo(directiva: string, archivo: ArchivoMd, mensaje: string): never`
- Produces: `directivas: MdastPluginEntry` en `src/lib/directivas/index.ts`; `tipoArchivo(nombre: string): string` y `formatearTamano(bytes: number): string` en `descarga.ts`.
- Produces (pruebas): `crearDocs(archivos: Record<string, string>): string` (devuelve la ruta de `…/src/content/docs`) y `convertir(docs: string, relativo: string, md: string): string` en `tests/unit/ayuda-directivas.ts`.

- [ ] **Step 1: Ayudante de pruebas**

`tests/unit/ayuda-directivas.ts`:
```ts
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { markdownToHtml } from 'satteri';
import { directivas } from '../../src/lib/directivas';

/** Crea …/src/content/docs temporal con los archivos dados y devuelve su ruta. */
export function crearDocs(archivos: Record<string, string>): string {
  const docs = path.join(realpathSync(mkdtempSync(path.join(tmpdir(), 'web-'))), 'src', 'content', 'docs');
  for (const [ruta, contenido] of Object.entries(archivos)) {
    const destino = path.join(docs, ruta);
    mkdirSync(path.dirname(destino), { recursive: true });
    writeFileSync(destino, contenido);
  }
  return docs;
}

/** Convierte Markdown como si estuviera en docs/<relativo>, con nuestras directivas. */
export function convertir(docs: string, relativo: string, md: string): string {
  return markdownToHtml(md, {
    mdastPlugins: [directivas],
    features: { directive: true },
    fileURL: pathToFileURL(path.join(docs, relativo)),
  }).html;
}
```

- [ ] **Step 2: Escribir la prueba**

`tests/unit/directivas.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { formatearTamano, tipoArchivo } from '../../src/lib/directivas/descarga';
import { convertir, crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud01-introduccion';
const docs = crearDocs({
  [`${U}/p3-instalacion.pdf`]: 'x'.repeat(1_536_000),
  [`${U}/notas.txt`]: 'hola',
});

describe('utilidades de descarga', () => {
  it('tipo de archivo legible', () => {
    expect(tipoArchivo('a.pdf')).toBe('PDF');
    expect(tipoArchivo('a.DOCX')).toBe('Word');
    expect(tipoArchivo('a.iso')).toBe('ISO');
  });
  it('tamaño en formato español', () => {
    expect(formatearTamano(1_536_000)).toBe('1,5 MB');
    expect(formatearTamano(4)).toBe('1 KB');
    expect(formatearTamano(20_480)).toBe('20 KB');
  });
});

describe('::descarga', () => {
  it('tarjeta con enlace, título, tipo y tamaño', () => {
    const html = convertir(docs, `${U}/index.md`, '::descarga[Práctica 3]{src="p3-instalacion.pdf"}');
    expect(html).toContain(`href="/${U}/p3-instalacion.pdf"`);
    expect(html).toContain('<strong>Práctica 3</strong>');
    expect(html).toContain('PDF · 1,5 MB');
    expect(html).toContain('class="bloque-descarga not-content"');
  });
  it('sin etiqueta usa el nombre del archivo', () => {
    expect(convertir(docs, `${U}/index.md`, '::descarga{src="notas.txt"}')).toContain('<strong>notas.txt</strong>');
  });
  it('funciona igual desde la traducción', () => {
    expect(convertir(docs, `${U}/index.es.md`, '::descarga{src="notas.txt"}')).toContain(`href="/${U}/notas.txt"`);
  });
  it('archivo inexistente: error claro con la página', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::descarga{src="nada.pdf"}')).toThrow(
      /\[::descarga\] No existe «nada\.pdf».*ud01-introduccion\/index\.md/,
    );
  });
  it('sin src: error', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::descarga[Algo]')).toThrow(/Falta el atributo src/);
  });
});

describe('::video', () => {
  it('no carga nada de YouTube hasta pulsar', () => {
    const html = convertir(docs, `${U}/index.md`, '::video[Instalar Ubuntu]{youtube="dQw4w9WgXcQ"}');
    expect(html).toContain('data-video-youtube="dQw4w9WgXcQ"');
    expect(html).toContain('Instalar Ubuntu');
    expect(html).not.toMatch(/<iframe|youtube\.com|ytimg/);
  });
  it('identificador no válido: error', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::video{youtube="corto"}')).toThrow(/\[::video\]/);
  });
});

describe(':::aules', () => {
  it('caja con el contenido y el enlace al curso del módulo', () => {
    const html = convertir(docs, `${U}/index.md`, ':::aules\nLa **solución** está en Aules.\n:::');
    expect(html).toContain('class="bloque-aules"');
    expect(html).toContain('<strong>solución</strong>');
    expect(html).toContain('href="https://aules.edu.gva.es/"');
  });
  it('fuera de un módulo: error', () => {
    expect(() => convertir(docs, 'docencia/index.md', ':::aules\nx\n:::')).toThrow(/\[::aules\]/);
  });
});

describe('::modulos', () => {
  it('una tarjeta por módulo con curso, ciclo e idiomas', () => {
    const html = convertir(docs, 'docencia/index.md', '::modulos');
    expect(html.match(/class="tarjeta-modulo"/g)).toHaveLength(3);
    expect(html).toContain('href="/docencia/smr/som/"');
    expect(html).toContain('English · Castellano');
    expect(html).toContain('Valencià · Castellano');
  });
});

describe('convivencia', () => {
  it('no toca directivas ajenas ni texto con < y {', () => {
    const html = convertir(docs, `${U}/index.md`, 'Si 3 < 4 entonces {x}\n\n::desconocida{a=1}');
    expect(html).toContain('3 &lt; 4 entonces {x}');
  });
});
```

- [ ] **Step 3: Comprobar que falla**

Run: `npx vitest run tests/unit/directivas.test.ts`
Expected: FAIL (no existen los módulos de directivas).

- [ ] **Step 4: Implementar `src/lib/directivas/comun.ts`**

```ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { MdastContent } from 'satteri';
import { moduloDeId, type Modulo } from '../../config/modulos';
import { generarId } from '../ids';
import { esTraduccion } from '../idiomas';

export interface NodoDirectiva {
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: unknown[];
}

/** La página Markdown que se está procesando. */
export interface ArchivoMd {
  ruta: string;
  /** Carpeta src/content/docs absoluta. */
  docs: string;
  /** Ruta relativa a docs, con barras «/». */
  relativo: string;
  id: string;
  /** Carpeta absoluta de la página (donde están sus descargas y laboratorios). */
  dir: string;
  /** URL pública de esa carpeta, con barra final. */
  hrefDir: string;
  traduccion: boolean;
  modulo: Modulo | undefined;
}

export type Manejador = (nodo: NodoDirectiva, archivo: ArchivoMd) => MdastContent | undefined;

const MARCA = `${path.sep}src${path.sep}content${path.sep}docs${path.sep}`;

export function archivoMd(fileURL: URL | undefined): ArchivoMd | undefined {
  if (!fileURL) return undefined;
  const ruta = fileURLToPath(fileURL);
  const i = ruta.indexOf(MARCA);
  if (i === -1) return undefined;
  const docs = ruta.slice(0, i + MARCA.length - 1);
  const relativo = path.relative(docs, ruta).split(path.sep).join('/');
  const id = generarId({ entry: relativo, data: {} });
  const dirRelativo = path.posix.dirname(relativo);
  return {
    ruta,
    docs,
    relativo,
    id,
    dir: path.dirname(ruta),
    hrefDir: dirRelativo === '.' ? '/' : `/${dirRelativo}/`,
    traduccion: esTraduccion(id),
    modulo: moduloDeId(id),
  };
}

export function escapar(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Texto plano de la etiqueta [..] de una directiva. */
export function textoDe(nodos: unknown[]): string {
  return nodos
    .map((n) => {
      const nodo = n as { value?: string; children?: unknown[] };
      return nodo.value ?? (nodo.children ? textoDe(nodo.children) : '');
    })
    .join('');
}

export function atributo(nodo: NodoDirectiva, nombre: string): string | undefined {
  const valor = nodo.attributes?.[nombre];
  return valor == null || valor === '' ? undefined : valor;
}

export function html(valor: string): MdastContent {
  return { type: 'html', value: valor } as MdastContent;
}

export function fallo(directiva: string, archivo: ArchivoMd, mensaje: string): never {
  throw new Error(`[::${directiva}] ${mensaje} (en src/content/docs/${archivo.relativo})`);
}
```

- [ ] **Step 5: Implementar `descarga.ts`, `video.ts`, `aules.ts`, `modulos.ts`**

`src/lib/directivas/descarga.ts`:
```ts
import { statSync } from 'node:fs';
import path from 'node:path';
import { atributo, escapar, fallo, html, textoDe, type Manejador } from './comun';

const TIPOS: Record<string, string> = {
  pdf: 'PDF', doc: 'Word', docx: 'Word', odt: 'Documento', ppt: 'PowerPoint', pptx: 'PowerPoint',
  odp: 'Presentación', xls: 'Excel', xlsx: 'Excel', ods: 'Hoja de cálculo', zip: 'ZIP', '7z': '7-Zip',
  txt: 'Texto', csv: 'CSV',
};

export function tipoArchivo(nombre: string): string {
  const ext = path.extname(nombre).slice(1).toLowerCase();
  return TIPOS[ext] ?? ext.toUpperCase();
}

export function formatearTamano(bytes: number): string {
  const numero = (n: number, decimales: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: decimales }).format(n);
  if (bytes < 1024 * 1024) return `${numero(Math.max(1, Math.round(bytes / 1024)), 0)} KB`;
  return `${numero(bytes / (1024 * 1024), 1)} MB`;
}

/** ::descarga[Título]{src="archivo.pdf"} — el archivo va en la misma carpeta que la página. */
export const descarga: Manejador = (nodo, archivo) => {
  const src = atributo(nodo, 'src');
  if (!src) fallo('descarga', archivo, 'Falta el atributo src, por ejemplo ::descarga[Práctica 3]{src="p3.pdf"}');
  if (/[\\/]/.test(src)) fallo('descarga', archivo, `src debe ser un archivo de la misma carpeta: «${src}»`);
  let bytes = 0;
  try {
    bytes = statSync(path.join(archivo.dir, src)).size;
  } catch {
    fallo('descarga', archivo, `No existe «${src}» en la carpeta de la página`);
  }
  const titulo = textoDe(nodo.children) || src;
  const href = archivo.hrefDir + encodeURIComponent(src);
  return html(
    `<a class="bloque-descarga not-content" href="${escapar(href)}">` +
      `<span class="bloque-descarga__icono" aria-hidden="true">⤓</span>` +
      `<span class="bloque-descarga__texto"><strong>${escapar(titulo)}</strong>` +
      `<span class="bloque-descarga__meta">${escapar(tipoArchivo(src))} · ${formatearTamano(bytes)}</span></span></a>`,
  );
};
```

`src/lib/directivas/video.ts`:
```ts
import { atributo, escapar, fallo, html, textoDe, type Manejador } from './comun';

/** ::video[Título]{youtube="ID"} — no se conecta con YouTube hasta pulsar (public/comun/video.js). */
export const video: Manejador = (nodo, archivo) => {
  const id = atributo(nodo, 'youtube');
  if (!id || !/^[\w-]{11}$/.test(id)) {
    fallo('video', archivo, `El atributo youtube debe ser el identificador de 11 caracteres del vídeo: «${id ?? ''}»`);
  }
  const titulo = textoDe(nodo.children) || 'Vídeo';
  return html(
    `<div class="bloque-video not-content" data-video-youtube="${id}" data-titulo="${escapar(titulo)}">` +
      `<button type="button" class="bloque-video__reproducir"><span aria-hidden="true">▶</span> ${escapar(titulo)}</button>` +
      `<p class="bloque-video__aviso">Al reproducirlo, el vídeo se cargará desde YouTube.</p></div>`,
  );
};
```

`src/lib/directivas/aules.ts`:
```ts
import type { MdastContent } from 'satteri';
import { escapar, fallo, html, type Manejador } from './comun';

/** :::aules … ::: — aviso de material reservado con enlace al curso de Aules del módulo. */
export const aules: Manejador = (nodo, archivo) => {
  const modulo = archivo.modulo;
  if (!modulo) fallo('aules', archivo, 'Solo se puede usar dentro de un módulo');
  return {
    type: 'paragraph',
    data: { hName: 'aside', hProperties: { class: 'bloque-aules', 'aria-label': 'Material en Aules' } },
    children: [
      html('<p class="bloque-aules__titulo"><span aria-hidden="true">🔒</span> Material en Aules</p>'),
      { type: 'paragraph', data: { hName: 'div', hProperties: { class: 'bloque-aules__contenido' } }, children: [...nodo.children] },
      html(`<p class="bloque-aules__enlace"><a href="${escapar(modulo.aules)}">Abrir el curso en Aules</a></p>`),
    ],
  } as MdastContent;
};
```

`src/lib/directivas/modulos.ts`:
```ts
import { ETIQUETA_IDIOMA, MODULOS, type Modulo } from '../../config/modulos';
import { escapar, html, type Manejador } from './comun';

function tarjeta(m: Modulo): string {
  const idiomas = m.idioma === 'es' ? 'Castellano' : `${ETIQUETA_IDIOMA[m.idioma]} · Castellano`;
  return (
    `<a class="tarjeta-modulo" href="/${m.ruta}/">` +
    `<span class="tarjeta-modulo__ciclo">${escapar(`${m.curso} · ${m.ciclo}`)}</span>` +
    `<strong class="tarjeta-modulo__nombre">${escapar(m.nombre)}</strong>` +
    `<span class="tarjeta-modulo__idioma">${escapar(idiomas)}</span></a>`
  );
}

/** ::modulos — tarjetas de todos los módulos (portada de Docencia). */
export const modulos: Manejador = () =>
  html(`<div class="tarjetas-modulos not-content">${MODULOS.map(tarjeta).join('')}</div>`);
```

- [ ] **Step 6: Implementar el plugin `src/lib/directivas/index.ts`**

```ts
import type { MdastContent, MdastPluginEntry } from 'satteri';
import { aules } from './aules';
import { archivoMd, type Manejador, type NodoDirectiva } from './comun';
import { descarga } from './descarga';
import { modulos } from './modulos';
import { video } from './video';

const HOJAS: Record<string, Manejador> = { descarga, video, modulos };
const CONTENEDORES: Record<string, Manejador> = { aules };

/**
 * Bloques especiales de la web (plugin mdast de Sätteri, trampa 2).
 * Las directivas que no son nuestras se dejan para Starlight (avisos) o para su restauración como texto.
 */
export const directivas: MdastPluginEntry = ({ fileURL }) => {
  const archivo = archivoMd(fileURL);
  if (!archivo) return null;
  return {
    name: 'directivas-docencia',
    leafDirective(nodo) {
      return HOJAS[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
    containerDirective(nodo) {
      return CONTENEDORES[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
  };
};
```

- [ ] **Step 7: Comprobar que pasa**

Run: `npx vitest run tests/unit/directivas.test.ts`
Expected: PASS.

- [ ] **Step 8: Script de vídeo y configuración**

`public/comun/video.js`:
```js
// Carga el vídeo de YouTube (modo sin cookies) solo cuando el alumno pulsa «reproducir».
document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.bloque-video__reproducir');
  if (!boton) return;
  const caja = boton.closest('[data-video-youtube]');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${caja.dataset.videoYoutube}?autoplay=1`;
  iframe.title = caja.dataset.titulo || 'Vídeo';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  caja.replaceChildren(iframe);
});
```

En `astro.config.mjs`:
- añadir los imports:
```js
import { satteri } from '@astrojs/markdown-satteri';
import { directivas } from './src/lib/directivas';
```
- añadir en `defineConfig({ … })`, después de `site`:
```js
  markdown: { processor: satteri({ mdastPlugins: [directivas] }) },
```
- añadir dentro de `starlight({ … })`, después de `locales`:
```js
      head: [{ tag: 'script', attrs: { src: '/comun/video.js', defer: true } }],
```

Sustituir `src/content/docs/docencia/index.md` por:
```md
---
title: Docencia ciclos formativos
template: splash
---

Materiales, apuntes y laboratorios de los módulos que imparto este curso.

::modulos
```

- [ ] **Step 9: Compilar**

Run: `npm run build && grep -c 'class="tarjeta-modulo"' dist/docencia/index.html`
Expected: `Complete!` y `1` (una línea con las tres tarjetas).

- [ ] **Step 10: Commit**

```bash
git add src public astro.config.mjs tests
git commit -m "Bloques ::descarga, ::video, :::aules y ::modulos

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Laboratorios — ficha, `::artefacto` y `::laboratorios`

**Files:**
- Create: `src/lib/laboratorios.ts`, `src/lib/directivas/artefacto.ts`, `src/lib/directivas/laboratorios.ts`
- Modify: `src/lib/directivas/index.ts`
- Test: `tests/unit/laboratorios.test.ts`

**Interfaces:**
- Consumes: `Manejador`, `ArchivoMd`, utilidades de `comun.ts` (Task 6).
- Produces (en `src/lib/laboratorios.ts`):
  - `interface FichaLaboratorio { titulo: string; descripcion: string; etiquetas: string[] }`
  - `interface LaboratorioModulo { unidad: string; nombre: string; archivo: string }`
  - `leerFicha(html: string, castellano: boolean): FichaLaboratorio`
  - `listarLaboratorios(dirModulo: string): LaboratorioModulo[]`
  - `tituloPagina(archivoMd: string): string | undefined`
  - `comprobarTextos(html: string): { faltan: string[]; sobran: string[] }`
- Produces (en `artefacto.ts`): `hrefLaboratorio(hrefUnidad: string, nombre: string, castellano: boolean): string`, `tarjetaLaboratorio(ficha: FichaLaboratorio, href: string): string`, `artefacto: Manejador`.
- Contrato de metadatos del laboratorio (lo usan Tasks 9 y 10): `<title>` y `<meta name="description">`, `<meta name="keywords">` en el idioma original; `<meta name="lab:titulo:es">`, `<meta name="lab:descripcion:es">`, `<meta name="lab:etiquetas:es">` en castellano; diccionario `<script type="application/json" id="lab-textos">{"es":{…}}</script>`.

- [ ] **Step 1: Escribir la prueba**

`tests/unit/laboratorios.test.ts`:
```ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { comprobarTextos, leerFicha, listarLaboratorios, tituloPagina } from '../../src/lib/laboratorios';
import { convertir, crearDocs } from './ayuda-directivas';

const LAB = `<!doctype html><html lang="en" data-lab="bits" data-idioma-original="en"><head>
<title>Bit Lab</title>
<meta content="Number systems &amp; units" name="description">
<meta name="keywords" content="binary, hex">
<meta name="lab:titulo:es" content="Laboratorio de Bits">
<meta name="lab:descripcion:es" content="Sistemas de numeración">
<meta name="lab:etiquetas:es" content="binario, hexadecimal">
<script type="application/json" id="lab-textos">{"es":{"titulo":"Laboratorio de Bits","comprobar":"Comprobar"}}</script>
</head><body><h1 data-t="titulo">Bit Lab</h1><button data-t-attr="aria-label:comprobar">Check</button></body></html>`;

const M = 'docencia/smr/som';
const docs = crearDocs({
  [`${M}/index.md`]: '---\ntitle: Single-User OS\n---\n',
  [`${M}/index.es.md`]: '---\ntitle: SOM\n---\n',
  [`${M}/ud01-introduccion/index.md`]: '---\ntitle: "Unit 1 · Intro"\n---\n',
  [`${M}/ud01-introduccion/index.es.md`]: '---\ntitle: Unidad 1 · Intro\n---\n',
  [`${M}/ud01-introduccion/laboratorios/bits/index.html`]: LAB,
  [`${M}/ud02-otra/index.md`]: '---\ntitle: Unit 2\n---\n',
});

describe('leerFicha', () => {
  it('original', () => {
    expect(leerFicha(LAB, false)).toEqual({ titulo: 'Bit Lab', descripcion: 'Number systems & units', etiquetas: ['binary', 'hex'] });
  });
  it('castellano', () => {
    expect(leerFicha(LAB, true)).toEqual({ titulo: 'Laboratorio de Bits', descripcion: 'Sistemas de numeración', etiquetas: ['binario', 'hexadecimal'] });
  });
  it('sin metadatos en castellano usa los originales', () => {
    expect(leerFicha('<title>Solo</title>', true).titulo).toBe('Solo');
  });
});

describe('listarLaboratorios y tituloPagina', () => {
  it('lista los laboratorios por unidad', () => {
    expect(listarLaboratorios(path.join(docs, M)).map((l) => `${l.unidad}/${l.nombre}`)).toEqual(['ud01-introduccion/bits']);
  });
  it('lee el título del frontmatter (con o sin comillas)', () => {
    expect(tituloPagina(path.join(docs, M, 'ud01-introduccion/index.md'))).toBe('Unit 1 · Intro');
    expect(tituloPagina(path.join(docs, M, 'no-existe.md'))).toBeUndefined();
  });
});

describe('comprobarTextos', () => {
  it('sin fallos', () => {
    expect(comprobarTextos(LAB)).toEqual({ faltan: [], sobran: [] });
  });
  it('detecta claves sin traducir y traducciones sin uso', () => {
    const roto = LAB.replace('"comprobar":"Comprobar"', '"otra":"Otra"');
    expect(comprobarTextos(roto)).toEqual({ faltan: ['comprobar'], sobran: ['otra'] });
  });
});

describe('::artefacto', () => {
  it('tarjeta de lanzamiento en el idioma original', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="bits"}');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/"`);
    expect(html).toContain('Bit Lab');
    expect(html).toContain('Abrir laboratorio');
  });
  it('desde la traducción abre el laboratorio en castellano', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.es.md`, '::artefacto{src="bits"}');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/?lang=es"`);
    expect(html).toContain('Laboratorio de Bits');
  });
  it('modo incrustado', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="bits" modo="incrustado" alto="600"}');
    expect(html).toMatch(/<iframe src="[^"]*laboratorios\/bits\/" title="Bit Lab" loading="lazy" style="height:600px"/);
    expect(html).toContain('Abrir a pantalla completa');
  });
  it('laboratorio inexistente: error', () => {
    expect(() => convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="nada"}')).toThrow(/\[::artefacto\] No existe/);
  });
});

describe('::laboratorios', () => {
  it('portada del módulo: agrupados por unidad con su título', () => {
    const html = convertir(docs, `${M}/index.md`, '::laboratorios');
    expect(html).toContain('<h3>Unit 1 · Intro</h3>');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/"`);
    expect(html).not.toContain('Unit 2');
  });
  it('portada en castellano: títulos y enlaces en castellano', () => {
    const html = convertir(docs, `${M}/index.es.md`, '::laboratorios');
    expect(html).toContain('<h3>Unidad 1 · Intro</h3>');
    expect(html).toContain('?lang=es');
  });
  it('fuera de un módulo: error', () => {
    expect(() => convertir(docs, 'docencia/index.md', '::laboratorios')).toThrow(/\[::laboratorios\]/);
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npx vitest run tests/unit/laboratorios.test.ts`
Expected: FAIL (no existe `src/lib/laboratorios`).

- [ ] **Step 3: Implementar `src/lib/laboratorios.ts`**

```ts
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export interface FichaLaboratorio {
  titulo: string;
  descripcion: string;
  etiquetas: string[];
}

export interface LaboratorioModulo {
  unidad: string;
  nombre: string;
  archivo: string;
}

const ENTIDADES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" };

function decodificar(texto: string): string {
  return texto.replace(/&(amp|lt|gt|quot|#39|apos);/g, (_, e: string) => ENTIDADES[e]);
}

function atributoHtml(etiqueta: string, nombre: string): string | undefined {
  const m = etiqueta.match(new RegExp(`\\s${nombre}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? decodificar(m[1] ?? m[2]) : undefined;
}

function metas(html: string): Map<string, string> {
  const resultado = new Map<string, string>();
  for (const [etiqueta] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const nombre = atributoHtml(etiqueta, 'name');
    const contenido = atributoHtml(etiqueta, 'content');
    if (nombre && contenido !== undefined) resultado.set(nombre.toLowerCase(), contenido);
  }
  return resultado;
}

/** Título, descripción y etiquetas de un laboratorio, en su idioma original o en castellano. */
export function leerFicha(html: string, castellano: boolean): FichaLaboratorio {
  const m = metas(html);
  const tituloOriginal = decodificar(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '');
  const elegir = (claveEs: string, original: string | undefined) => (castellano && m.get(claveEs)) || original || '';
  return {
    titulo: elegir('lab:titulo:es', tituloOriginal),
    descripcion: elegir('lab:descripcion:es', m.get('description')),
    etiquetas: elegir('lab:etiquetas:es', m.get('keywords'))
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean),
  };
}

function subcarpetas(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Todos los laboratorios de un módulo: <unidad>/laboratorios/<nombre>/index.html. */
export function listarLaboratorios(dirModulo: string): LaboratorioModulo[] {
  return subcarpetas(dirModulo).flatMap((unidad) => {
    const dirLabs = path.join(dirModulo, unidad, 'laboratorios');
    if (!existsSync(dirLabs)) return [];
    return subcarpetas(dirLabs)
      .map((nombre) => ({ unidad, nombre, archivo: path.join(dirLabs, nombre, 'index.html') }))
      .filter((l) => existsSync(l.archivo));
  });
}

/** `title` del frontmatter de una página Markdown. */
export function tituloPagina(archivoMd: string): string | undefined {
  if (!existsSync(archivoMd)) return undefined;
  const frontmatter = readFileSync(archivoMd, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const titulo = frontmatter?.match(/^title:\s*(.+)$/m)?.[1].trim();
  return titulo?.replace(/^(['"])(.*)\1$/, '$2');
}

/** Claves data-t sin traducción en lab-textos (faltan) y traducciones que nadie usa (sobran). */
export function comprobarTextos(html: string): { faltan: string[]; sobran: string[] } {
  const usadas = new Set<string>();
  for (const [, clave] of html.matchAll(/\sdata-t(?:-html)?="([^"]+)"/g)) usadas.add(clave);
  for (const [, pares] of html.matchAll(/\sdata-t-attr="([^"]+)"/g)) {
    for (const par of pares.split(';')) {
      const clave = par.split(':')[1]?.trim();
      if (clave) usadas.add(clave);
    }
  }
  const json = html.match(/<script type="application\/json" id="lab-textos">([\s\S]*?)<\/script>/)?.[1];
  const definidas = new Set(Object.keys(json ? (JSON.parse(json).es ?? {}) : {}));
  return {
    faltan: [...usadas].filter((c) => !definidas.has(c)).sort(),
    sobran: [...definidas].filter((c) => !usadas.has(c)).sort(),
  };
}
```

- [ ] **Step 4: Implementar las directivas**

`src/lib/directivas/artefacto.ts`:
```ts
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { leerFicha, type FichaLaboratorio } from '../laboratorios';
import { atributo, escapar, fallo, html, textoDe, type Manejador } from './comun';

export function hrefLaboratorio(hrefUnidad: string, nombre: string, castellano: boolean): string {
  return `${hrefUnidad}laboratorios/${nombre}/${castellano ? '?lang=es' : ''}`;
}

export function tarjetaLaboratorio(ficha: FichaLaboratorio, href: string): string {
  const etiquetas = ficha.etiquetas.map((e) => `<span>${escapar(e)}</span>`).join('');
  return (
    `<a class="bloque-laboratorio" href="${escapar(href)}">` +
    `<span class="bloque-laboratorio__marca">Laboratorio</span>` +
    `<strong class="bloque-laboratorio__titulo">${escapar(ficha.titulo)}</strong>` +
    (ficha.descripcion ? `<span class="bloque-laboratorio__descripcion">${escapar(ficha.descripcion)}</span>` : '') +
    (etiquetas ? `<span class="bloque-laboratorio__etiquetas">${etiquetas}</span>` : '') +
    `<span class="bloque-laboratorio__abrir">Abrir laboratorio →</span></a>`
  );
}

/** ::artefacto{src="nombre"} — laboratorio de laboratorios/<nombre>/ de la carpeta de la página. */
export const artefacto: Manejador = (nodo, archivo) => {
  const nombre = atributo(nodo, 'src');
  if (!nombre || !/^[a-z0-9-]+$/.test(nombre)) {
    fallo('artefacto', archivo, `src debe ser el nombre de la carpeta del laboratorio (minúsculas y guiones): «${nombre ?? ''}»`);
  }
  const indice = path.join(archivo.dir, 'laboratorios', nombre, 'index.html');
  if (!existsSync(indice)) fallo('artefacto', archivo, `No existe laboratorios/${nombre}/index.html junto a la página`);
  const ficha = leerFicha(readFileSync(indice, 'utf8'), archivo.traduccion);
  const titulo = textoDe(nodo.children) || ficha.titulo;
  const href = hrefLaboratorio(archivo.hrefDir, nombre, archivo.traduccion);

  if (atributo(nodo, 'modo') === 'incrustado') {
    const alto = Number(atributo(nodo, 'alto') ?? 480);
    if (!Number.isInteger(alto) || alto < 200 || alto > 2000) {
      fallo('artefacto', archivo, 'alto debe ser un número entero de píxeles entre 200 y 2000');
    }
    return html(
      `<figure class="bloque-laboratorio-incrustado not-content">` +
        `<iframe src="${escapar(href)}" title="${escapar(titulo)}" loading="lazy" style="height:${alto}px"></iframe>` +
        `<figcaption><a href="${escapar(href)}">${escapar(titulo)} · Abrir a pantalla completa ↗</a></figcaption></figure>`,
    );
  }
  return html(`<div class="not-content">${tarjetaLaboratorio({ ...ficha, titulo }, href)}</div>`);
};
```

`src/lib/directivas/laboratorios.ts`:
```ts
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { leerFicha, listarLaboratorios, tituloPagina } from '../laboratorios';
import { hrefLaboratorio, tarjetaLaboratorio } from './artefacto';
import { escapar, fallo, html, type Manejador } from './comun';

/** ::laboratorios — todos los laboratorios del módulo, agrupados por unidad (portada del módulo). */
export const laboratorios: Manejador = (_nodo, archivo) => {
  const modulo = archivo.modulo;
  if (!modulo) fallo('laboratorios', archivo, 'Solo se puede usar en la portada de un módulo');
  const dirModulo = path.join(archivo.docs, modulo.ruta);
  const labs = listarLaboratorios(dirModulo);
  if (labs.length === 0) {
    return html('<p class="laboratorios-modulo__vacio">Todavía no hay laboratorios en este módulo.</p>');
  }
  const unidades = [...new Set(labs.map((l) => l.unidad))];
  const secciones = unidades.map((unidad) => {
    const indice = path.join(dirModulo, unidad, archivo.traduccion ? 'index.es.md' : 'index.md');
    const titulo = tituloPagina(indice) ?? tituloPagina(path.join(dirModulo, unidad, 'index.md')) ?? unidad;
    const tarjetas = labs
      .filter((l) => l.unidad === unidad)
      .map((l) =>
        tarjetaLaboratorio(
          leerFicha(readFileSync(l.archivo, 'utf8'), archivo.traduccion),
          hrefLaboratorio(`/${modulo.ruta}/${unidad}/`, l.nombre, archivo.traduccion),
        ),
      )
      .join('');
    return `<section class="laboratorios-modulo__unidad"><h3>${escapar(titulo)}</h3><div class="laboratorios-modulo__tarjetas">${tarjetas}</div></section>`;
  });
  return html(`<div class="laboratorios-modulo not-content">${secciones.join('')}</div>`);
};
```

Sustituir `src/lib/directivas/index.ts` por:
```ts
import type { MdastContent, MdastPluginEntry } from 'satteri';
import { artefacto } from './artefacto';
import { aules } from './aules';
import { archivoMd, type Manejador, type NodoDirectiva } from './comun';
import { descarga } from './descarga';
import { laboratorios } from './laboratorios';
import { modulos } from './modulos';
import { video } from './video';

const HOJAS: Record<string, Manejador> = { descarga, video, modulos, artefacto, laboratorios };
const CONTENEDORES: Record<string, Manejador> = { aules };

/**
 * Bloques especiales de la web (plugin mdast de Sätteri, trampa 2).
 * Las directivas que no son nuestras se dejan para Starlight (avisos) o para su restauración como texto.
 */
export const directivas: MdastPluginEntry = ({ fileURL }) => {
  const archivo = archivoMd(fileURL);
  if (!archivo) return null;
  return {
    name: 'directivas-docencia',
    leafDirective(nodo) {
      return HOJAS[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
    containerDirective(nodo) {
      return CONTENEDORES[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
  };
};
```

- [ ] **Step 5: Comprobar que pasa todo**

Run: `npm test`
Expected: PASS (todas las pruebas unitarias).

- [ ] **Step 6: Commit**

```bash
git add src tests
git commit -m "Laboratorios: ficha, ::artefacto y ::laboratorios del módulo

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Kit común de laboratorios y recursos compartidos

**Files:**
- Create: `public/comun/lab.js`, `public/comun/fuentes.css`, `public/comun/fuentes/*.woff2` (9 archivos), `public/comun/favicon.svg`
- Test: `tests/unit/lab-kit.test.ts`

**Interfaces:**
- Produces: `window.Lab = { idioma, original, nombre, enIframe, t(textos), leer(clave), guardar(clave, valor), _internos: { idiomaDesdeUrl, urlConIdioma, destinoVolver, conectar } }`.
- Contrato HTML que leen Tasks 9 y 10:
  - `<html lang="<original>" data-lab="<nombre>" data-idioma-original="<original>">`
  - `<script src="/comun/lab.js"></script>` en el `<head>`, antes de cualquier otro script.
  - `data-t="clave"` (sustituye el texto; solo en elementos sin hijos), `data-t-html="clave"` (sustituye el HTML interior), `data-t-attr="atributo:clave;otro:clave2"`.
  - Controles: `data-lab-idioma="<código>"` (botón vacío → se rellena con English/Valencià/Castellano), `data-lab-volver` (enlace), `data-lab-zoom="+"` / `data-lab-zoom="-"`.
  - Claves de almacenamiento: `lab:zoom` (común) y `lab:<nombre>:<clave>`.
- Fuentes: `/comun/fuentes.css` declara Chakra Petch (500, 600, 700), JetBrains Mono (400, 600, 700), Atkinson Hyperlegible (400, 700, 400 cursiva).

- [ ] **Step 1: Copiar fuentes y favicon del ejemplo**

Run:
```bash
mkdir -p "$TMPDIR/recursos-aula" public/comun/fuentes
unzip -oq "/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Recursos Aula/recursos-aula.zip" -d "$TMPDIR/recursos-aula"
cp "$TMPDIR/recursos-aula/recursos-aula/assets/fonts/"*.woff2 public/comun/fuentes/
cp "$TMPDIR/recursos-aula/recursos-aula/assets/favicon.svg" public/comun/favicon.svg
sed 's#url("fonts/#url("fuentes/#g' "$TMPDIR/recursos-aula/recursos-aula/assets/fonts.css" > public/comun/fuentes.css
ls public/comun/fuentes | wc -l
grep -c 'url("fuentes/' public/comun/fuentes.css
```
Expected: `9` y `9`.

- [ ] **Step 2: Escribir la prueba del kit**

`tests/unit/lab-kit.test.ts`:
```ts
// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Ruta relativa a la raíz del proyecto: en el entorno happy-dom, `URL` no es la de Node.
const CODIGO = readFileSync('public/comun/lab.js', 'utf8');

function cargar(url: string, cuerpo: string, original = 'en') {
  (window as any).happyDOM.setURL(url);
  document.documentElement.setAttribute('data-idioma-original', original);
  document.documentElement.setAttribute('data-lab', 'prueba');
  document.documentElement.removeAttribute('style');
  document.head.innerHTML = '<title>Test</title><meta name="lab:titulo:es" content="Prueba">';
  document.body.innerHTML = cuerpo;
  new Function(CODIGO)();
  return (window as any).Lab;
}

const DICCIONARIO = '<script type="application/json" id="lab-textos">{"es":{"hola":"Hola","rico":"<b>Rico</b>","ayuda":"Ayuda"}}</script>';
const CUERPO = `${DICCIONARIO}<p data-t="hola">Hello</p><p data-t-html="rico"><i>Rich</i></p><button data-t-attr="aria-label:ayuda" aria-label="Help"></button>`;
const LAB = 'http://localhost/docencia/smr/som/ud01/laboratorios/prueba/';

describe('idioma', () => {
  it('sin parámetro: idioma original y sin traducir', () => {
    localStorage.clear();
    const Lab = cargar(LAB, CUERPO);
    expect(Lab.idioma).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(document.querySelector('[data-t]')!.textContent).toBe('Hello');
  });
  it('?lang=es: traduce textos, HTML, atributos y título', () => {
    localStorage.clear();
    const Lab = cargar(`${LAB}?lang=es#kib`, CUERPO);
    expect(Lab.idioma).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(document.querySelector('[data-t]')!.textContent).toBe('Hola');
    expect(document.querySelector('[data-t-html]')!.innerHTML).toBe('<b>Rico</b>');
    expect(document.querySelector('button')!.getAttribute('aria-label')).toBe('Ayuda');
    expect(document.title).toBe('Prueba');
    expect(document.documentElement.hasAttribute('data-traduciendo')).toBe(false);
  });
  it('Lab.t elige el texto del idioma activo', () => {
    const Lab = cargar(`${LAB}?lang=es`, '');
    expect(Lab.t({ en: 'Correct', es: 'Correcto' })).toBe('Correcto');
    const LabEn = cargar(LAB, '');
    expect(LabEn.t({ en: 'Correct', es: 'Correcto' })).toBe('Correct');
  });
});

describe('utilidades internas', () => {
  it('urlConIdioma conserva la pestaña (#)', () => {
    const { urlConIdioma } = cargar(LAB, '')._internos;
    expect(urlConIdioma(`${LAB}?lang=es#kib`, 'en', 'en')).toBe(`${LAB}#kib`);
    expect(urlConIdioma(`${LAB}#kib`, 'es', 'en')).toBe(`${LAB}?lang=es#kib`);
  });
  it('destinoVolver: atrás si se llegó desde la web, si no la página del tema', () => {
    const { destinoVolver } = cargar(LAB, '')._internos;
    expect(destinoVolver('http://localhost/docencia/x/', 'http://localhost', '/t/')).toBe('atras');
    expect(destinoVolver('https://aules.edu.gva.es/', 'http://localhost', '/t/')).toBe('/t/');
    expect(destinoVolver('', 'http://localhost', '/t/')).toBe('/t/');
  });
});

describe('controles', () => {
  it('botones de idioma: etiqueta automática y estado', () => {
    cargar(`${LAB}?lang=es`, '<button data-lab-idioma="en"></button><button data-lab-idioma="es"></button>');
    const [en, es] = document.querySelectorAll('[data-lab-idioma]');
    expect(en.textContent).toBe('English');
    expect(es.textContent).toBe('Castellano');
    expect(es.getAttribute('aria-pressed')).toBe('true');
    expect(en.getAttribute('aria-pressed')).toBe('false');
  });
  it('volver apunta a la página del tema en el idioma activo', () => {
    cargar(`${LAB}?lang=es`, '<a data-lab-volver href="#">←</a>');
    expect(document.querySelector('[data-lab-volver]')!.getAttribute('href')).toBe('http://localhost/docencia/smr/som/ud01/es/');
  });
  it('zoom: cambia el tamaño y lo recuerda para todos los laboratorios', () => {
    localStorage.clear();
    cargar(LAB, '<button data-lab-zoom="+">A+</button>');
    (document.querySelector('[data-lab-zoom]') as HTMLButtonElement).click();
    expect(document.documentElement.style.fontSize).toBe('18px');
    expect(localStorage.getItem('lab:zoom')).toBe('18');
  });
  it('memoria propia de cada laboratorio', () => {
    localStorage.clear();
    const Lab = cargar(LAB, '');
    Lab.guardar('pestana', 'kib');
    expect(localStorage.getItem('lab:prueba:pestana')).toBe('kib');
    expect(Lab.leer('pestana')).toBe('kib');
  });
});
```

- [ ] **Step 3: Comprobar que falla**

Run: `npx vitest run tests/unit/lab-kit.test.ts`
Expected: FAIL (no existe `public/comun/lab.js`).

- [ ] **Step 4: Implementar `public/comun/lab.js`**

```js
/*
 * Kit común de laboratorios · moisesmas.com
 *
 * Cada laboratorio lo carga en su <head>, antes de sus propios scripts:
 *   <script src="/comun/lab.js"></script>
 *
 * Contrato del laboratorio:
 *   <html lang="en" data-lab="numeracion" data-idioma-original="en">
 *   - Texto original en el HTML. Traducción al castellano en
 *       <script type="application/json" id="lab-textos">{"es": {"clave": "texto"}}</script>
 *     referenciada con data-t="clave" (texto de un elemento sin hijos),
 *     data-t-html="clave" (HTML interior) o data-t-attr="aria-label:clave;title:otra".
 *   - Textos generados desde JavaScript: Lab.t({ en: '…', es: '…' }).
 *   - Controles: data-lab-idioma="en|ca-valencia|es", data-lab-volver, data-lab-zoom="+|-".
 *   - Memoria local: Lab.leer(clave) / Lab.guardar(clave, valor).
 */
(function (global) {
  'use strict';

  var ETIQUETAS = { en: 'English', 'ca-valencia': 'Valencià', es: 'Castellano' };
  var ZOOM = { minimo: 12, maximo: 24, paso: 2, inicial: 16 };

  function idiomaDesdeUrl(search, original) {
    return new URLSearchParams(search).get('lang') === 'es' ? 'es' : original;
  }

  function urlConIdioma(href, idioma, original) {
    var url = new URL(href);
    if (idioma === original) url.searchParams.delete('lang');
    else url.searchParams.set('lang', idioma);
    return url.toString();
  }

  function destinoVolver(referrer, origen, paginaTema) {
    try {
      if (referrer && new URL(referrer).origin === origen) return 'atras';
    } catch (e) {
      /* referrer no válido: se usa la página del tema */
    }
    return paginaTema;
  }

  function leerLocal(clave) {
    try { return global.localStorage.getItem(clave); } catch (e) { return null; }
  }

  function guardarLocal(clave, valor) {
    try { global.localStorage.setItem(clave, String(valor)); } catch (e) { /* sin almacenamiento */ }
  }

  var doc = global.document;
  var raiz = doc.documentElement;
  var original = raiz.getAttribute('data-idioma-original') || 'es';
  var nombre = raiz.getAttribute('data-lab') || 'lab';
  var idioma = idiomaDesdeUrl(global.location.search, original);
  var zoom = Number(leerLocal('lab:zoom')) || ZOOM.inicial;

  raiz.setAttribute('data-idioma', idioma);
  raiz.setAttribute('lang', idioma);
  raiz.style.fontSize = zoom + 'px';
  if (idioma !== original) {
    // Oculta el texto original hasta traducir, para que no parpadee.
    raiz.setAttribute('data-traduciendo', '');
    var estilo = doc.createElement('style');
    estilo.textContent = 'html[data-traduciendo] body{visibility:hidden}';
    (doc.head || raiz).appendChild(estilo);
  }

  function traducir(diccionario) {
    function texto(clave) {
      if (Object.prototype.hasOwnProperty.call(diccionario, clave)) return diccionario[clave];
      global.console.warn('[lab] Falta la traducción de «' + clave + '»');
      return null;
    }
    doc.querySelectorAll('[data-t]').forEach(function (el) {
      var t = texto(el.getAttribute('data-t'));
      if (t !== null) el.textContent = t;
    });
    doc.querySelectorAll('[data-t-html]').forEach(function (el) {
      var t = texto(el.getAttribute('data-t-html'));
      if (t !== null) el.innerHTML = t;
    });
    doc.querySelectorAll('[data-t-attr]').forEach(function (el) {
      el.getAttribute('data-t-attr').split(';').forEach(function (par) {
        var partes = par.split(':');
        var atributo = (partes[0] || '').trim();
        var clave = (partes[1] || '').trim();
        if (!atributo || !clave) return;
        var t = texto(clave);
        if (t !== null) el.setAttribute(atributo, t);
      });
    });
    var titulo = doc.querySelector('meta[name="lab:titulo:es"]');
    if (titulo) doc.title = titulo.getAttribute('content');
  }

  function conectar() {
    if (idioma !== original) {
      var bloque = doc.getElementById('lab-textos');
      var diccionario = {};
      try {
        diccionario = JSON.parse(bloque ? bloque.textContent : '{}')[idioma] || {};
      } catch (e) {
        global.console.error('[lab] #lab-textos no es JSON válido');
      }
      traducir(diccionario);
      raiz.removeAttribute('data-traduciendo');
    }

    doc.querySelectorAll('[data-lab-idioma]').forEach(function (boton) {
      var destino = boton.getAttribute('data-lab-idioma');
      if (!boton.textContent.trim()) boton.textContent = ETIQUETAS[destino] || destino;
      boton.setAttribute('lang', destino);
      boton.setAttribute('aria-pressed', destino === idioma ? 'true' : 'false');
      boton.addEventListener('click', function () {
        if (destino !== idioma) global.location.href = urlConIdioma(global.location.href, destino, original);
      });
    });

    doc.querySelectorAll('[data-lab-volver]').forEach(function (enlace) {
      if (Lab.enIframe) {
        enlace.hidden = true;
        return;
      }
      var paginaTema = new URL('../../' + (idioma === 'es' ? 'es/' : ''), global.location.href).toString();
      enlace.setAttribute('href', paginaTema);
      enlace.addEventListener('click', function (evento) {
        if (destinoVolver(doc.referrer, global.location.origin, paginaTema) === 'atras') {
          evento.preventDefault();
          global.history.back();
        }
      });
    });

    doc.querySelectorAll('[data-lab-zoom]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var paso = boton.getAttribute('data-lab-zoom') === '+' ? ZOOM.paso : -ZOOM.paso;
        zoom = Math.min(ZOOM.maximo, Math.max(ZOOM.minimo, zoom + paso));
        raiz.style.fontSize = zoom + 'px';
        guardarLocal('lab:zoom', zoom);
      });
    });
  }

  var Lab = {
    idioma: idioma,
    original: original,
    nombre: nombre,
    enIframe: global.self !== global.top,
    t: function (textos) {
      return textos[idioma] != null ? textos[idioma] : textos[original];
    },
    leer: function (clave) {
      return leerLocal('lab:' + nombre + ':' + clave);
    },
    guardar: function (clave, valor) {
      guardarLocal('lab:' + nombre + ':' + clave, valor);
    },
    _internos: { idiomaDesdeUrl: idiomaDesdeUrl, urlConIdioma: urlConIdioma, destinoVolver: destinoVolver, conectar: conectar },
  };
  global.Lab = Lab;

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', conectar);
  else conectar();
})(window);
```

- [ ] **Step 5: Comprobar que pasa**

Run: `npx vitest run tests/unit/lab-kit.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public tests
git commit -m "Kit común de laboratorios (idioma, volver, zoom, memoria) y fuentes compartidas

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Integrar el Laboratorio de Bits en SOM (inglés + castellano)

**Files:**
- Create: `src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/index.html`, `tests/unit/laboratorios-reales.test.ts`, `tests/salida/laboratorios.test.ts`
- Modify: `src/content/docs/docencia/smr/som/ud01-introduccion/index.md`, `…/index.es.md`, `src/content/docs/docencia/smr/som/index.md`, `…/index.es.md`

**Interfaces:**
- Consumes: contrato del kit (Task 8), `comprobarTextos`, `leerFicha` (Task 7).
- Origen: `recursos-aula/smr1/numeracion/index.html` del zip `/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Recursos Aula/recursos-aula.zip` (960 líneas, en castellano).

- [ ] **Step 1: Escribir la prueba de laboratorios reales**

`tests/unit/laboratorios-reales.test.ts`:
```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { comprobarTextos, leerFicha } from '../../src/lib/laboratorios';

const LABORATORIOS = [
  {
    nombre: 'numeracion',
    original: 'en',
    archivo: 'src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/index.html',
  },
];

describe.each(LABORATORIOS)('laboratorio $nombre', ({ nombre, original, archivo }) => {
  const html = readFileSync(new URL(`../../${archivo}`, import.meta.url), 'utf8');

  it('declara nombre e idioma original', () => {
    expect(html).toMatch(new RegExp(`<html lang="${original}" data-lab="${nombre}" data-idioma-original="${original}">`));
  });
  it('carga el kit antes que cualquier otro script', () => {
    expect(html.indexOf('<script src="/comun/lab.js"></script>')).toBeGreaterThan(-1);
    expect(html.indexOf('<script src="/comun/lab.js"></script>')).toBe(html.indexOf('<script'));
  });
  it('sin restos del sitio antiguo ni recursos externos', () => {
    expect(html).not.toMatch(/\.\.\/\.\.\/assets|lab-tab|lab-zoom|pb-tab|pb-zoom|localStorage/);
    expect(html.match(/https?:\/\/[^"'\s)]+/g)?.filter((u) => !u.startsWith('http://www.w3.org/')) ?? []).toEqual([]);
  });
  it('tiene los controles del kit', () => {
    expect(html).toContain('data-lab-volver');
    expect(html).toContain(`data-lab-idioma="${original}"`);
    expect(html).toContain('data-lab-idioma="es"');
    expect(html).toContain('data-lab-zoom="+"');
    expect(html).toContain('data-lab-zoom="-"');
  });
  it('todas las claves traducidas y ninguna sobrante', () => {
    expect(comprobarTextos(html)).toEqual({ faltan: [], sobran: [] });
  });
  it('ficha en los dos idiomas', () => {
    const o = leerFicha(html, false);
    const es = leerFicha(html, true);
    for (const f of [o, es]) {
      expect(f.titulo).not.toBe('');
      expect(f.descripcion).not.toBe('');
      expect(f.etiquetas.length).toBeGreaterThan(0);
    }
    expect(o.titulo).not.toBe(es.titulo);
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npx vitest run tests/unit/laboratorios-reales.test.ts`
Expected: FAIL (`ENOENT`, el archivo no existe).

- [ ] **Step 3: Copiar el laboratorio a su tema**

Run:
```bash
mkdir -p "$TMPDIR/recursos-aula" src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion
unzip -oq "/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Recursos Aula/recursos-aula.zip" -d "$TMPDIR/recursos-aula"
cp "$TMPDIR/recursos-aula/recursos-aula/smr1/numeracion/index.html" src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/index.html
```

- [ ] **Step 4: Cabecera según el contrato**

En el archivo copiado, sustituir desde `<!doctype html>` hasta la línea `<meta name="description" …>` inclusive (líneas 1-7) y la línea del favicon (8) por:
```html
<!doctype html>
<html lang="en" data-lab="numeracion" data-idioma-original="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script src="/comun/lab.js"></script>
<title>Bit Lab</title>
<meta name="description" content="Number systems (binary, octal, decimal and hexadecimal), conversions, units of information and the difference between KB and KiB.">
<meta name="keywords" content="binary, hexadecimal, octal, conversions, KiB, units">
<meta name="lab:titulo:es" content="Laboratorio de Bits">
<meta name="lab:descripcion:es" content="Sistemas de numeración (binario, octal, decimal y hexadecimal), conversiones, unidades de información y la diferencia entre KB y KiB.">
<meta name="lab:etiquetas:es" content="binario, hexadecimal, octal, conversiones, KiB, unidades">
<link rel="icon" href="/comun/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/comun/fuentes.css">
```
Y borrar la línea `<link rel="stylesheet" href="../../assets/fonts.css">` que aparece al principio del `<body>`.

- [ ] **Step 5: Controles del kit en la cabecera visible**

Sustituir el enlace de vuelta:
```html
<div class="brand"><a class="home" href="../../" aria-label="Volver a todos los recursos">← Recursos</a>
```
por:
```html
<div class="brand"><a class="home" href="../../" data-lab-volver data-t-attr="aria-label:volver-aria" aria-label="Back to the unit">← <span data-t="volver">Unit</span></a>
```
Sustituir el bloque de tamaño:
```html
    <div class="zoom" aria-label="Tamaño de letra para proyector">Tamaño
      <button id="zMinus" type="button" aria-label="Reducir texto">A−</button>
      <button id="zPlus" type="button" aria-label="Aumentar texto">A+</button>
    </div>
```
por:
```html
    <div class="zoom" data-t-attr="aria-label:zoom-aria" aria-label="Text size for the projector"><span data-t="zoom">Size</span>
      <button type="button" data-lab-zoom="-" data-t-attr="aria-label:zoom-menos" aria-label="Smaller text">A−</button>
      <button type="button" data-lab-zoom="+" data-t-attr="aria-label:zoom-mas" aria-label="Larger text">A+</button>
      <span class="idiomas" role="group" data-t-attr="aria-label:idioma-aria" aria-label="Language">
        <button type="button" data-lab-idioma="en"></button><button type="button" data-lab-idioma="es"></button>
      </span>
    </div>
```
Añadir al final del primer bloque `<style>` del laboratorio (el de la identidad visual) estas reglas, que reutilizan las variables del propio laboratorio:
```css
.zoom .idiomas{display:inline-flex;margin-left:.5rem;border:1px solid var(--line);border-radius:99px;overflow:hidden}
.zoom .idiomas button{border:0;border-radius:0;background:transparent;color:var(--muted);font:600 .75rem var(--f-mono);padding:.25rem .6rem;cursor:pointer}
.zoom .idiomas button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
```
Añadir al diccionario (Step 7) las claves `volver-aria` («Volver a la unidad»), `volver` («Unidad»), `zoom-aria` («Tamaño de letra para proyector»), `zoom` («Tamaño»), `zoom-menos` («Reducir texto»), `zoom-mas` («Aumentar texto»), `idioma-aria` («Idioma»).

- [ ] **Step 6: Sustituir el código de pestañas y tamaño por el kit**

En el `<script>` del laboratorio:
- `try{localStorage.setItem("lab-tab",id)}catch(e){}` → `Lab.guardar("pestana",id);`
- `if(!startTab){try{startTab=localStorage.getItem("lab-tab")}catch(e){}}` → `if(!startTab){startTab=Lab.leer("pestana")}`
- Borrar el bloque completo `/* ---------- Zoom ---------- */` (desde `let zoom=16;…` hasta `applyZoom();`, 5 líneas): el kit ya lo hace.

Comprobar: `grep -n "localStorage\|zPlus\|zMinus\|applyZoom" …/numeracion/index.html` → sin resultados.

- [ ] **Step 7: Traducir: inglés en el HTML, castellano al diccionario**

Recorrer el `<body>` de arriba abajo. Para **cada** texto visible y cada `aria-label`, `title` o `placeholder`:
1. Inventar una clave corta en castellano y kebab-case que describa el texto (`tab-bits`, `bits-intro`, `btn-apagar`…).
2. Mover el texto castellano actual al diccionario bajo esa clave.
3. Escribir en el HTML la traducción al inglés y marcar el elemento: `data-t` si el elemento solo contiene texto; `data-t-html` si contiene marcado (`<b>`, `<code>`, `<sup>`…), copiando el HTML interior castellano al diccionario; `data-t-attr` para atributos.
4. Si un texto comparte elemento con otros hijos (por ejemplo `<button role="tab" data-tab="bits"><span class="n">1</span>El bit</button>`), envolver solo el texto: `<span class="n">1</span><span data-t="tab-bits">The bit</span>`.

En el JavaScript, cada cadena visible que se genere (mensajes de «correcto/incorrecto», enunciados de ejercicios, etiquetas creadas con `innerHTML`/`textContent`, `aria-label` dinámicos) se sustituye por `Lab.t({ en: '…', es: '…' })` conservando el texto castellano original en `es`. Los números, fórmulas y valores en binario/hex no se traducen.

El diccionario va justo antes de `</head>`:
```html
<script type="application/json" id="lab-textos">
{
  "es": {
    "volver-aria": "Volver a la unidad",
    "volver": "Unidad",
    "zoom-aria": "Tamaño de letra para proyector",
    "zoom": "Tamaño",
    "zoom-menos": "Reducir texto",
    "zoom-mas": "Aumentar texto",
    "idioma-aria": "Idioma"
  }
}
</script>
```
(y a continuación todas las claves creadas en este paso; JSON válido, comillas dobles, sin coma final). Estilo del inglés: claro y sencillo, nivel B1, pensado para alumnado de CFGM; terminología técnica estándar (bit, byte, nibble, KiB, «two's complement»…).

- [ ] **Step 8: Comprobar**

Run: `npx vitest run tests/unit/laboratorios-reales.test.ts`
Expected: PASS. Si `faltan` o `sobran` no están vacíos, corregir las claves que indica.

- [ ] **Step 9: Enlazar el laboratorio desde el tema y la portada del módulo**

Añadir al final de `src/content/docs/docencia/smr/som/ud01-introduccion/index.md` y de `…/index.es.md`:
```md

::artefacto{src="numeracion"}
```
Añadir al final de `src/content/docs/docencia/smr/som/index.md`:
```md

## Module labs

::laboratorios
```
y al final de `src/content/docs/docencia/smr/som/index.es.md`:
```md

## Laboratorios del módulo

::laboratorios
```

- [ ] **Step 10: Prueba de salida de laboratorios**

`tests/salida/laboratorios.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { existe, leer } from './leer';

const U = 'docencia/smr/som/ud01-introduccion/';

describe('Laboratorio de Bits publicado', () => {
  it('se copia a su tema', () => {
    expect(existe(`${U}laboratorios/numeracion/index.html`)).toBe(true);
  });
  it('la unidad enlaza al laboratorio en el idioma de la página', () => {
    expect(leer(`${U}index.html`)).toContain(`href="/${U}laboratorios/numeracion/"`);
    expect(leer(`${U}es/index.html`)).toContain(`href="/${U}laboratorios/numeracion/?lang=es"`);
  });
  it('la portada del módulo lo lista en «Laboratorios del módulo»', () => {
    expect(leer('docencia/smr/som/index.html')).toContain('Bit Lab');
    expect(leer('docencia/smr/som/es/index.html')).toContain('Laboratorio de Bits');
  });
  it('los recursos comunes están publicados', () => {
    expect(existe('comun/lab.js')).toBe(true);
    expect(existe('comun/fuentes.css')).toBe(true);
  });
});
```

Run: `npm run verificar`
Expected: PASS (todas las pruebas de salida).

- [ ] **Step 11: Revisión en el navegador**

Run: `npx astro dev --port 4321` y abrir en el navegador integrado `http://localhost:4321/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/`.
Comprobar: se ve igual que el original (fuentes, colores, pestañas) pero en inglés; «Castellano» cambia todo a castellano sin perder la pestaña (`#kib`); A−/A+ funcionan y se recuerdan; «← Unit» vuelve a la unidad; la consola no muestra `[lab] Falta la traducción`. Revisar también en ancho móvil (375 px). Al terminar: `npx astro dev stop`.

- [ ] **Step 12: Commit**

```bash
git add src tests
git commit -m "SOM: Laboratorio de Bits integrado (inglés + castellano)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Integrar la Anatomía de la Placa Base en Sistemas Informáticos (valenciano + castellano)

**Files:**
- Create: `src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/placa-base/index.html`
- Modify: `tests/unit/laboratorios-reales.test.ts`, `tests/salida/laboratorios.test.ts`, `src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/index.md`, `…/index.es.md`, `src/content/docs/docencia/dam/sistemas-informaticos/index.md`, `…/index.es.md`

**Interfaces:**
- Consumes: contrato del kit (Task 8), pruebas de Task 9.
- Origen: `recursos-aula/smr1/placa-base/index.html` del mismo zip (902 líneas, en castellano). Usa `pb-tab` y `pb-zoom` como claves de almacenamiento.

- [ ] **Step 1: Añadir el laboratorio a la prueba**

En `tests/unit/laboratorios-reales.test.ts`, añadir a `LABORATORIOS` este elemento:
```ts
  {
    nombre: 'placa-base',
    original: 'ca-valencia',
    archivo: 'src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/placa-base/index.html',
  },
```

Run: `npx vitest run tests/unit/laboratorios-reales.test.ts`
Expected: FAIL solo en `laboratorio placa-base` (`ENOENT`).

- [ ] **Step 2: Copiar el laboratorio**

Run:
```bash
mkdir -p "$TMPDIR/recursos-aula" src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/placa-base
unzip -oq "/Users/moisesmasrocamora/Documents/Claude/Proyectos/Web Recursos Aula/recursos-aula.zip" -d "$TMPDIR/recursos-aula"
cp "$TMPDIR/recursos-aula/recursos-aula/smr1/placa-base/index.html" src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/placa-base/index.html
```

- [ ] **Step 3: Cabecera según el contrato**

Sustituir las líneas 1-8 (hasta el favicon inclusive) por:
```html
<!doctype html>
<html lang="ca-valencia" data-lab="placa-base" data-idioma-original="ca-valencia">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script src="/comun/lab.js"></script>
<title>Anatomia de la placa base</title>
<meta name="description" content="Components, busos i xipset, formats, sòcols, RAM i PCIe, ports i connectors, UEFI i seqüència d'arrancada.">
<meta name="keywords" content="placa base, sòcol, xipset, RAM, PCIe, M.2, USB, UEFI">
<meta name="lab:titulo:es" content="Anatomía de la Placa Base">
<meta name="lab:descripcion:es" content="Componentes, buses y chipset, formatos, sockets, RAM y PCIe, puertos y conectores, UEFI y secuencia de arranque.">
<meta name="lab:etiquetas:es" content="placa base, socket, chipset, RAM, PCIe, M.2, USB, UEFI">
<link rel="icon" href="/comun/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/comun/fuentes.css">
```
Y borrar la línea `<link rel="stylesheet" href="../../assets/fonts.css">` del principio del `<body>`.

- [ ] **Step 4: Controles del kit**

Sustituir:
```html
<div class="brand"><a class="home" href="../../" aria-label="Volver a todos los recursos">← Recursos</a>
```
por:
```html
<div class="brand"><a class="home" href="../../" data-lab-volver data-t-attr="aria-label:volver-aria" aria-label="Tornar a la unitat">← <span data-t="volver">Unitat</span></a>
```
Sustituir:
```html
    <div class="zoom">Tamaño
      <button id="zMinus" type="button" aria-label="Reducir texto">A−</button>
      <button id="zPlus" type="button" aria-label="Aumentar texto">A+</button>
    </div>
```
por:
```html
    <div class="zoom"><span data-t="zoom">Grandària</span>
      <button type="button" data-lab-zoom="-" data-t-attr="aria-label:zoom-menos" aria-label="Reduir el text">A−</button>
      <button type="button" data-lab-zoom="+" data-t-attr="aria-label:zoom-mas" aria-label="Augmentar el text">A+</button>
      <span class="idiomas" role="group" data-t-attr="aria-label:idioma-aria" aria-label="Idioma">
        <button type="button" data-lab-idioma="ca-valencia"></button><button type="button" data-lab-idioma="es"></button>
      </span>
    </div>
```
Añadir al final del primer bloque `<style>` las mismas tres reglas `.zoom .idiomas…` de la Task 9, Step 5:
```css
.zoom .idiomas{display:inline-flex;margin-left:.5rem;border:1px solid var(--line);border-radius:99px;overflow:hidden}
.zoom .idiomas button{border:0;border-radius:0;background:transparent;color:var(--muted);font:600 .75rem var(--f-mono);padding:.25rem .6rem;cursor:pointer}
.zoom .idiomas button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
```
Si `var(--line)`, `var(--muted)`, `var(--ink)`, `var(--bg)` o `var(--f-mono)` no existen en este laboratorio (comprobar con `grep -n "\-\-line:\|\-\-muted:\|\-\-ink:\|\-\-bg:\|\-\-f-mono:"`), usar las variables equivalentes que sí defina.

- [ ] **Step 5: Sustituir pestañas y tamaño por el kit**

- `try{localStorage.setItem("pb-tab",id)}catch(e){}` → `Lab.guardar("pestana",id);`
- `let st=location.hash.slice(1);if(!st){try{st=localStorage.getItem("pb-tab")}catch(e){}}` → `let st=location.hash.slice(1);if(!st){st=Lab.leer("pestana")}`
- Borrar las líneas de zoom (`let zoom=16;…`, `const applyZoom=…`, `$("#zPlus").onclick=…`, `$("#zMinus").onclick=…;applyZoom();`).

Comprobar: `grep -n "localStorage\|zPlus\|zMinus\|applyZoom" …/placa-base/index.html` → sin resultados.

- [ ] **Step 6: Traducir: valenciano en el HTML, castellano al diccionario**

Mismo procedimiento que la Task 9, Step 7, con el valenciano como idioma original y `Lab.t({ 'ca-valencia': '…', es: '…' })` en el JavaScript. Diccionario inicial:
```html
<script type="application/json" id="lab-textos">
{
  "es": {
    "volver-aria": "Volver a la unidad",
    "volver": "Unidad",
    "zoom": "Tamaño",
    "zoom-menos": "Reducir texto",
    "zoom-mas": "Aumentar texto",
    "idioma-aria": "Idioma"
  }
}
</script>
```
Norma del valenciano: estàndard de l'Acadèmia Valenciana de la Llengua / Generalitat (formes com «este», «servix», «ací», «eixida»; «maquinari» o «hardware», «sòcol», «xipset», «ranura», «connector», «port»). Mantener los nombres técnicos universales (PCIe, M.2, SATA, UEFI, BIOS, DIMM).

- [ ] **Step 7: Comprobar**

Run: `npx vitest run tests/unit/laboratorios-reales.test.ts`
Expected: PASS en los dos laboratorios.

- [ ] **Step 8: Enlazar y probar la salida**

Añadir al final de `src/content/docs/docencia/dam/sistemas-informaticos/ud01-hardware/index.md` y `…/index.es.md`:
```md

::artefacto{src="placa-base"}
```
Añadir al final de `src/content/docs/docencia/dam/sistemas-informaticos/index.md`:
```md

## Laboratoris del mòdul

::laboratorios
```
y al final de `…/sistemas-informaticos/index.es.md`:
```md

## Laboratorios del módulo

::laboratorios
```
Añadir al final de `tests/salida/laboratorios.test.ts`:
```ts
describe('Anatomía de la Placa Base publicada', () => {
  const T = 'docencia/dam/sistemas-informaticos/ud01-hardware/';
  it('se copia a su tema y se enlaza en los dos idiomas', () => {
    expect(existe(`${T}laboratorios/placa-base/index.html`)).toBe(true);
    expect(leer(`${T}index.html`)).toContain(`href="/${T}laboratorios/placa-base/"`);
    expect(leer(`${T}es/index.html`)).toContain(`href="/${T}laboratorios/placa-base/?lang=es"`);
  });
  it('aparece en la portada del módulo', () => {
    expect(leer('docencia/dam/sistemas-informaticos/index.html')).toContain('Anatomia de la placa base');
  });
});
```
Run: `npm run verificar`
Expected: PASS.

- [ ] **Step 9: Revisión en el navegador**

Igual que la Task 9, Step 11, en `http://localhost:4321/docencia/dam/sistemas-informaticos/ud01-hardware/laboratorios/placa-base/`: en valenciano por defecto, «Castellano» cambia todo, el mapa interactivo sigue funcionando en los dos idiomas, sin avisos `[lab]` en consola. `npx astro dev stop` al terminar.

- [ ] **Step 10: Commit**

```bash
git add src tests
git commit -m "Sistemas Informáticos: Anatomía de la Placa Base integrada (valenciano + castellano)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Identidad visual de Docencia y pie con nota de privacidad

**Files:**
- Create: `src/styles/docencia.css`, `src/styles/bloques.css`, `src/components/Footer.astro`, `src/config/sitio.ts`
- Modify: `astro.config.mjs`
- Test: `tests/salida/estilo.test.ts`

**Interfaces:**
- Produces: `SITIO: { nombre: string; presentacion: string; notaPrivacidad: string }` en `src/config/sitio.ts` (lo usa también la Task 12).

- [ ] **Step 1: Escribir la prueba**

`tests/salida/estilo.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { leer } from './leer';

describe('identidad de Docencia', () => {
  const html = leer('docencia/smr/som/index.html');
  it('carga las fuentes autoalojadas y el favicon común', () => {
    expect(html).toContain('href="/comun/fuentes.css"');
    expect(html).toContain('/comun/favicon.svg');
  });
  it('sin peticiones a terceros en la página', () => {
    expect(html).not.toMatch(/fonts\.googleapis|googletagmanager|youtube\.com\/embed/);
  });
  it('pie con la nota de privacidad', () => {
    expect(html).toContain('no usa cookies');
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npm run verificar`
Expected: FAIL en `identidad de Docencia`.

- [ ] **Step 3: `src/config/sitio.ts`**

```ts
// Nombre y presentación: confirmar con el titular antes de publicar.
export const SITIO = {
  nombre: 'Moisés Mas',
  presentacion: 'Profesor de Formación Profesional de la familia de Informática y Comunicaciones.',
  notaPrivacidad:
    'Esta web no usa cookies ni recoge datos personales. Los laboratorios solo recuerdan en tu navegador la última pestaña abierta y el tamaño de letra.',
};
```

- [ ] **Step 4: `src/styles/docencia.css`**

```css
/* Identidad de Docencia: la misma que los laboratorios (verde placa + ámbar). */
:root {
  --fuente-titulos: 'Chakra Petch', 'Segoe UI', system-ui, sans-serif;
  --sl-font: 'Atkinson Hyperlegible', 'Segoe UI', system-ui, sans-serif;
  --sl-font-mono: 'JetBrains Mono', ui-monospace, Consolas, monospace;
  --pcb: #1a463a;

  /* Tema oscuro (el de partida en Starlight) */
  --sl-color-accent-low: #33260f;
  --sl-color-accent: #f3aa3c;
  --sl-color-accent-high: #fbd9a0;
  --sl-color-white: #e4ebe6;
  --sl-color-gray-1: #cdd8d1;
  --sl-color-gray-2: #95a69d;
  --sl-color-gray-3: #6f8278;
  --sl-color-gray-4: #3c4c44;
  --sl-color-gray-5: #2b3832;
  --sl-color-gray-6: #1d2823;
  --sl-color-black: #0e1411;
}

:root[data-theme='light'] {
  --pcb: #1f5244;
  --sl-color-accent-low: #fbeed8;
  --sl-color-accent: #b86e00;
  --sl-color-accent-high: #5c3700;
  --sl-color-white: #16201b;
  --sl-color-gray-1: #243029;
  --sl-color-gray-2: #3d4d44;
  --sl-color-gray-3: #56655d;
  --sl-color-gray-4: #8d9c93;
  --sl-color-gray-5: #d3dbd4;
  --sl-color-gray-6: #e9ede6;
  --sl-color-gray-7: #f2f4ef;
  --sl-color-black: #ffffff;
}

.site-title,
h1#_top,
.sl-markdown-content :is(h1, h2, h3, h4),
.laboratorios-modulo h3 {
  font-family: var(--fuente-titulos);
  letter-spacing: 0.01em;
}

.nota-privacidad {
  margin-top: 2rem;
  font-size: var(--sl-text-xs);
  color: var(--sl-color-gray-3);
}
```

- [ ] **Step 5: `src/styles/bloques.css`**

```css
/* Bloques especiales (src/lib/directivas). */

.bloque-descarga,
.bloque-laboratorio,
.tarjeta-modulo {
  display: flex;
  gap: 0.75rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.6rem;
  background: var(--sl-color-gray-6);
  color: var(--sl-color-white);
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s;
}
.bloque-descarga:hover,
.bloque-laboratorio:hover,
.tarjeta-modulo:hover {
  border-color: var(--sl-color-accent);
  transform: translateY(-2px);
}

.bloque-descarga {
  align-items: center;
  margin-block: 1rem;
  padding: 0.75rem 1rem;
  max-width: 34rem;
}
.bloque-descarga__icono {
  font-size: 1.6rem;
  color: var(--sl-color-accent);
}
.bloque-descarga__texto {
  display: grid;
}
.bloque-descarga__meta {
  font: 600 0.75rem var(--sl-font-mono);
  color: var(--sl-color-gray-3);
}

.bloque-laboratorio {
  flex-direction: column;
  gap: 0.45rem;
  margin-block: 1rem;
  padding: 1rem 1.2rem;
  border-left: 4px solid var(--pcb);
}
.bloque-laboratorio__marca,
.tarjeta-modulo__ciclo {
  font: 600 0.72rem var(--sl-font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sl-color-accent);
}
.bloque-laboratorio__titulo,
.tarjeta-modulo__nombre {
  font: 700 1.2rem var(--fuente-titulos);
}
.bloque-laboratorio__descripcion {
  color: var(--sl-color-gray-2);
}
.bloque-laboratorio__etiquetas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.bloque-laboratorio__etiquetas span {
  font: 600 0.72rem var(--sl-font-mono);
  padding: 0.1rem 0.5rem;
  border-radius: 99px;
  background: var(--sl-color-gray-5);
  color: var(--sl-color-gray-2);
}
.bloque-laboratorio__abrir {
  font-weight: 700;
  color: var(--sl-color-accent);
}

.bloque-laboratorio-incrustado {
  margin-block: 1rem;
}
.bloque-laboratorio-incrustado iframe {
  width: 100%;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.6rem;
}
.bloque-laboratorio-incrustado figcaption {
  font-size: var(--sl-text-sm);
}

.laboratorios-modulo__tarjetas,
.tarjetas-modulos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}
.laboratorios-modulo h3 {
  margin: 1.5rem 0 0.5rem;
  font-size: var(--sl-text-h4);
}
.laboratorios-modulo .bloque-laboratorio {
  margin: 0;
}

.tarjeta-modulo {
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.1rem 1.2rem;
}
.tarjeta-modulo__idioma {
  font-size: var(--sl-text-sm);
  color: var(--sl-color-gray-3);
}

.bloque-video {
  display: grid;
  place-items: center;
  gap: 0.5rem;
  margin-block: 1rem;
  aspect-ratio: 16 / 9;
  border-radius: 0.6rem;
  background: var(--pcb);
  color: #fff;
}
.bloque-video__reproducir {
  font: 700 1.05rem var(--fuente-titulos);
  padding: 0.6rem 1.2rem;
  border: 0;
  border-radius: 99px;
  background: var(--sl-color-accent);
  color: var(--sl-color-black);
  cursor: pointer;
}
.bloque-video__aviso {
  font-size: var(--sl-text-xs);
  opacity: 0.85;
}
.bloque-video iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0.6rem;
}

.bloque-aules {
  margin-block: 1rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--sl-color-accent);
  border-left-width: 4px;
  border-radius: 0.4rem;
  background: var(--sl-color-accent-low);
}
.bloque-aules__titulo {
  font-weight: 700;
}
.bloque-aules__enlace a {
  font-weight: 700;
}

:is(.bloque-descarga, .bloque-laboratorio, .tarjeta-modulo, .bloque-video__reproducir):focus-visible {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bloque-descarga,
  .bloque-laboratorio,
  .tarjeta-modulo {
    transition: none;
  }
}
```

- [ ] **Step 6: `src/components/Footer.astro`**

```astro
---
import Default from '@astrojs/starlight/components/Footer.astro';
import { SITIO } from '../config/sitio';
---

<Default><slot /></Default>
<p class="nota-privacidad">{SITIO.notaPrivacidad}</p>
```

- [ ] **Step 7: Configuración**

En `astro.config.mjs`, dentro de `starlight({ … })`:
- sustituir `head: [ … ]` por:
```js
      favicon: '/comun/favicon.svg',
      head: [
        { tag: 'link', attrs: { rel: 'stylesheet', href: '/comun/fuentes.css' } },
        { tag: 'script', attrs: { src: '/comun/video.js', defer: true } },
      ],
      customCss: ['./src/styles/docencia.css', './src/styles/bloques.css'],
```
- añadir a `components` la línea `Footer: './src/components/Footer.astro',`.

- [ ] **Step 8: Comprobar**

Run: `npm run verificar`
Expected: PASS.

- [ ] **Step 9: Revisión visual**

Con `npx astro dev --port 4321`, revisar en el navegador integrado, en modo claro y oscuro (selector de tema de Starlight) y a 375 px de ancho: `/docencia/`, `/docencia/smr/som/`, `/docencia/smr/som/ud01-introduccion/` y su versión `/es/`. Comprobar: títulos en Chakra Petch, texto en Atkinson Hyperlegible, el ámbar se lee bien en los dos modos (enlaces, conmutador, elemento actual del menú), las tarjetas no desbordan en móvil, el menú muestra «Unit 1 · Introduction…» en lugar de `ud01-introduccion`. Ajustar valores de `docencia.css` si algo no contrasta. `npx astro dev stop`.

- [ ] **Step 10: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Identidad visual de Docencia, estilos de bloques y pie con privacidad

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Portada personal

**Files:**
- Create: `src/pages/index.astro`
- Test: `tests/salida/portada.test.ts`

**Interfaces:**
- Consumes: `SITIO` (Task 11).

- [ ] **Step 1: Escribir la prueba**

`tests/salida/portada.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { leer } from './leer';

describe('portada personal', () => {
  const html = leer('index.html');
  it('es una página propia, no de Starlight', () => {
    expect(html).not.toContain('sl-markdown-content');
    expect(html).toMatch(/<html lang="es"/);
  });
  it('presenta y enlaza a Docencia', () => {
    expect(html).toContain('Moisés Mas');
    expect(html).toContain('href="/docencia/"');
  });
  it('sin fuentes de la identidad de Docencia ni terceros', () => {
    expect(html).not.toMatch(/fuentes\.css|googleapis/);
  });
  it('nota de privacidad', () => {
    expect(html).toContain('no usa cookies');
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npm run verificar`
Expected: FAIL (`ENOENT: dist/index.html`).

- [ ] **Step 3: `src/pages/index.astro`**

```astro
---
import { SITIO } from '../config/sitio';
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{SITIO.nombre}</title>
    <meta name="description" content={SITIO.presentacion} />
    <link rel="icon" href="/comun/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <main>
      <h1>{SITIO.nombre}</h1>
      <p class="presentacion">{SITIO.presentacion}</p>
      <nav aria-label="Secciones">
        <ul>
          <li>
            <a href="/docencia/">
              <strong>Docencia ciclos formativos</strong>
              <span>Apuntes, prácticas y laboratorios de mis módulos de FP.</span>
            </a>
          </li>
        </ul>
      </nav>
    </main>
    <footer>{SITIO.notaPrivacidad}</footer>
  </body>
</html>

<style is:global>
  :root {
    --fondo: #fafafa;
    --texto: #1b1b1b;
    --suave: #5c5c5c;
    --linea: #dcdcdc;
    --acento: #1f5244;
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fondo: #121212;
      --texto: #ececec;
      --suave: #a3a3a3;
      --linea: #333;
      --acento: #7cc4ad;
    }
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: var(--fondo);
    color: var(--texto);
    font: 1.05rem/1.6 system-ui, -apple-system, 'Segoe UI', sans-serif;
  }
  main,
  footer {
    max-width: 42rem;
    margin: 0 auto;
    padding-inline: 16px;
  }
  main {
    padding-block: 5rem 3rem;
  }
  h1 {
    font-size: clamp(2rem, 6vw, 3rem);
    line-height: 1.1;
    margin: 0 0 0.75rem;
  }
  .presentacion {
    color: var(--suave);
    margin: 0 0 2.5rem;
  }
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav a {
    display: grid;
    gap: 0.2rem;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--linea);
    border-radius: 0.6rem;
    color: inherit;
    text-decoration: none;
  }
  nav a:hover,
  nav a:focus-visible {
    border-color: var(--acento);
    outline: none;
  }
  nav strong {
    color: var(--acento);
  }
  nav span {
    color: var(--suave);
  }
  footer {
    padding-block: 2rem;
    color: var(--suave);
    font-size: 0.85rem;
    border-top: 1px solid var(--linea);
  }
</style>
```

- [ ] **Step 4: Comprobar**

Run: `npm run verificar`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src tests
git commit -m "Portada personal neutra con acceso a Docencia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Informe de pendientes al compilar

**Files:**
- Create: `src/lib/pendientes.ts`, `src/lib/informe-pendientes.ts`
- Modify: `astro.config.mjs`
- Test: `tests/unit/pendientes.test.ts`

**Interfaces:**
- Consumes: `Modulo`, `MODULOS` (Task 2).
- Produces: `interface Pendientes { traducciones: string[]; laboratorios: string[]; nombres: string[] }`, `buscarPendientes(docs: string, modulos: Modulo[]): Pendientes`, `informe(p: Pendientes): string` en `src/lib/pendientes.ts`; integración por defecto en `informe-pendientes.ts` que escribe en `GITHUB_STEP_SUMMARY` si existe (lo usará la fase B).

- [ ] **Step 1: Escribir la prueba**

`tests/unit/pendientes.test.ts`:
```ts
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { MODULOS } from '../../src/config/modulos';
import { buscarPendientes, informe } from '../../src/lib/pendientes';

const LAB_OK = '<meta name="lab:titulo:es" content="x"><script type="application/json" id="lab-textos">{"es":{}}</script>';

function crear(archivos: Record<string, string>): string {
  const docs = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-')));
  for (const [ruta, contenido] of Object.entries(archivos)) {
    const destino = path.join(docs, ruta);
    mkdirSync(path.dirname(destino), { recursive: true });
    writeFileSync(destino, contenido);
  }
  return docs;
}

describe('buscarPendientes', () => {
  const docs = crear({
    'docencia/index.md': '',
    'docencia/smr/som/index.md': '',
    'docencia/smr/som/index.es.md': '',
    'docencia/smr/som/ud01/01-teoria.md': '',
    'docencia/smr/som/ud01/laboratorios/bits/index.html': '<title>sin traducir</title>',
    'docencia/smr/som/ud01/laboratorios/ok/index.html': LAB_OK,
    'docencia/smr/som/ud01/Práctica 3.pdf': '',
    'docencia/smr/proyecto-intermodular/index.md': '',
  });
  const p = buscarPendientes(docs, MODULOS);

  it('páginas sin versión en castellano (solo en módulos con otro idioma)', () => {
    expect(p.traducciones).toEqual(['docencia/smr/som/ud01/01-teoria.md']);
  });
  it('laboratorios sin traducción', () => {
    expect(p.laboratorios).toEqual(['docencia/smr/som/ud01/laboratorios/bits/index.html']);
  });
  it('nombres de archivo no válidos', () => {
    expect(p.nombres).toEqual(['docencia/smr/som/ud01/Práctica 3.pdf']);
  });
});

describe('informe', () => {
  it('sin pendientes', () => {
    expect(informe({ traducciones: [], laboratorios: [], nombres: [] })).toContain('Nada pendiente');
  });
  it('con pendientes, en Markdown', () => {
    const texto = informe({ traducciones: ['a.md'], laboratorios: [], nombres: ['B C.pdf'] });
    expect(texto).toContain('### Páginas sin versión en castellano (1)');
    expect(texto).toContain('- `a.md`');
    expect(texto).toContain('### Nombres de archivo no válidos (1)');
  });
});
```

- [ ] **Step 2: Comprobar que falla**

Run: `npx vitest run tests/unit/pendientes.test.ts`
Expected: FAIL (no existe `src/lib/pendientes`).

- [ ] **Step 3: Implementar `src/lib/pendientes.ts`**

```ts
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { slug } from 'github-slugger';
import type { Modulo } from '../config/modulos';

export interface Pendientes {
  traducciones: string[];
  laboratorios: string[];
  nombres: string[];
}

function* recorrer(dir: string, base = dir): Generator<string> {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) yield* recorrer(ruta, base);
    else yield path.relative(base, ruta).split(path.sep).join('/');
  }
}

/** Minúsculas, sin acentos ni espacios: así la dirección publicada coincide con la carpeta. */
function nombreValido(segmento: string): boolean {
  const base = segmento.replace(/(\.es)?\.[^.]+$/, '');
  return base === slug(base);
}

export function buscarPendientes(docs: string, modulos: Modulo[]): Pendientes {
  const pendientes: Pendientes = { traducciones: [], laboratorios: [], nombres: [] };
  const conTraduccion = modulos.filter((m) => m.idioma !== 'es').map((m) => `${m.ruta}/`);
  for (const relativo of recorrer(docs)) {
    if (relativo.split('/').some((s) => !nombreValido(s))) pendientes.nombres.push(relativo);
    if (!conTraduccion.some((r) => relativo.startsWith(r))) continue;
    if (relativo.endsWith('.md') && !relativo.endsWith('.es.md')) {
      if (!existsSync(path.join(docs, relativo.replace(/\.md$/, '.es.md')))) pendientes.traducciones.push(relativo);
    } else if (/\/laboratorios\/[^/]+\/index\.html$/.test(relativo)) {
      const html = readFileSync(path.join(docs, relativo), 'utf8');
      if (!html.includes('id="lab-textos"') || !html.includes('name="lab:titulo:es"')) pendientes.laboratorios.push(relativo);
    }
  }
  return pendientes;
}

export function informe(p: Pendientes): string {
  const secciones = [
    ['Páginas sin versión en castellano', p.traducciones],
    ['Laboratorios sin versión en castellano', p.laboratorios],
    ['Nombres de archivo no válidos', p.nombres],
  ] as const;
  const conDatos = secciones.filter(([, lista]) => lista.length > 0);
  if (conDatos.length === 0) return '## Pendientes de la web\n\n✅ Nada pendiente.\n';
  return (
    '## Pendientes de la web\n\n' +
    conDatos.map(([titulo, lista]) => `### ${titulo} (${lista.length})\n\n${lista.map((r) => `- \`${r}\``).join('\n')}\n`).join('\n')
  );
}
```

- [ ] **Step 4: Implementar `src/lib/informe-pendientes.ts`**

```ts
import type { AstroIntegration } from 'astro';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MODULOS } from '../config/modulos';
import { buscarPendientes, informe } from './pendientes';

/** Al compilar, avisa de traducciones, laboratorios y nombres pendientes. No bloquea la publicación. */
export default function informePendientes(): AstroIntegration {
  let docs = '';
  return {
    name: 'informe-pendientes',
    hooks: {
      'astro:config:setup': ({ config }) => {
        docs = fileURLToPath(new URL('./src/content/docs', config.root));
      },
      'astro:build:done': ({ logger }) => {
        const p = buscarPendientes(docs, MODULOS);
        const total = p.traducciones.length + p.laboratorios.length + p.nombres.length;
        if (total === 0) logger.info('Nada pendiente');
        else for (const linea of informe(p).split('\n').filter((l) => l.startsWith('#') || l.startsWith('-'))) logger.warn(linea);
        if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, informe(p));
      },
    },
  };
}
```

- [ ] **Step 5: Conectar y comprobar**

En `astro.config.mjs`: añadir `import informePendientes from './src/lib/informe-pendientes';` y `informePendientes(),` en `integrations`, justo después de `archivosContenido(),`.

Run: `npm test && npm run build 2>&1 | grep -A3 informe-pendientes`
Expected: pruebas en PASS; el informe dice `Nada pendiente` (todas las páginas de SOM y SI tienen su `.es.md`).

- [ ] **Step 6: Commit**

```bash
git add src astro.config.mjs tests
git commit -m "Informe de traducciones y nombres pendientes al compilar

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Guías, memoria del proyecto y verificación completa

**Files:**
- Create: `CLAUDE.md`, `docs/guia-edicion.md`
- Modify: `src/content/docs/docencia/smr/proyecto-intermodular/index.md`

- [ ] **Step 1: Enlace a Aules en la portada de cada módulo**

Añadir al final de `src/content/docs/docencia/smr/proyecto-intermodular/index.md`:
```md

:::aules
El calendario de entregas y las rúbricas de evaluación están en el curso de Aules.
:::
```
Añadir al final de `src/content/docs/docencia/smr/som/index.md`:
```md

:::aules
Assessment criteria, solutions and marks are in the Aules course.
:::
```
Añadir al final de `src/content/docs/docencia/dam/sistemas-informaticos/index.md`:
```md

:::aules
Els criteris d'avaluació, les solucions i les qualificacions són al curs d'Aules.
:::
```
Añadir al final de `src/content/docs/docencia/smr/som/index.es.md` y de `src/content/docs/docencia/dam/sistemas-informaticos/index.es.md`:
```md

:::aules
Los criterios de evaluación, las soluciones y las calificaciones están en el curso de Aules.
:::
```
Run: `npm run build`
Expected: `Complete!` y las cinco portadas contienen `class="bloque-aules"`.

- [ ] **Step 2: `docs/guia-edicion.md` (para el titular)**

```md
# Guía de edición de la web

## Dónde está cada cosa

- Cada módulo es una carpeta en `src/content/docs/docencia/…` (SOM: `smr/som`, Sistemas Informáticos: `dam/sistemas-informaticos`, Proyecto Intermodular: `smr/proyecto-intermodular`).
- Cada tema es una carpeta dentro del módulo (`ud01-introduccion`). Dentro van sus páginas `.md`, sus descargas y su carpeta `laboratorios/`.
- El orden del menú lo marca el número del principio del nombre (`01-…`, `02-…`).

## Nombres

Minúsculas, sin acentos ni espacios, con guiones: `02-instalacion-windows.md`, `p3-particiones.pdf`. El informe de pendientes avisa si alguno no cumple.

## Páginas e idiomas

- Original: `nombre.md` (inglés en SOM, valenciano en Sistemas Informáticos). Castellano: `nombre.es.md` al lado.
- Cabecera mínima de cada página:
  ```
  ---
  title: Título de la página
  ---
  ```
- Enlaces a otras páginas: siempre desde la raíz, `/docencia/smr/som/ud01-introduccion/01-teoria/` (en castellano, acabados en `/es/`).

## Bloques especiales

| Qué | Cómo |
|---|---|
| Laboratorio (tarjeta) | `::artefacto{src="numeracion"}` |
| Laboratorio incrustado | `::artefacto{src="numeracion" modo="incrustado" alto="600"}` |
| Descarga | `::descarga[Práctica 3]{src="p3-particiones.pdf"}` |
| Vídeo de YouTube | `::video[Instalar Ubuntu]{youtube="IDENTIFICADOR"}` |
| Material en Aules | `:::aules` + texto + `:::` |
| Avisos | `:::note`, `:::tip`, `:::caution`, `:::danger` + texto + `:::` |

## Editar desde github.com (retoques)

1. Abre el archivo en el repositorio y pulsa el lápiz.
2. Cambia el texto y pulsa «Commit changes».
3. La web se actualiza sola en uno o dos minutos. Si algo está mal escrito, la publicación se detiene, la web anterior sigue visible y GitHub te avisa por correo.

## Material reservado

Soluciones y exámenes, nunca en el repositorio (es público). Van en la carpeta `privado/` (no se sube) y de ahí a Aules.

## Fin de curso

`git tag curso-2026-27 && git push origin curso-2026-27` guarda el estado del curso para poder recuperarlo.
```

- [ ] **Step 3: `CLAUDE.md` (memoria para futuras sesiones de Claude)**

```md
# moisesmas.com — web de docencia

Diseño: `docs/superpowers/specs/2026-09-30-web-docencia-design.md`. Guía del titular: `docs/guia-edicion.md`.

## Comandos

- `npm test` — pruebas unitarias (rápidas).
- `npm run verificar` — compila y prueba la salida en `dist/`.
- `npx astro dev --port 4321` — se lanza en segundo plano en shells no interactivos; `npx astro dev stop` para pararlo.

## Convenciones

- Contenido en `.md`, nunca `.mdx`. Nombres en minúsculas, sin acentos, con guiones.
- Módulos definidos solo en `src/config/modulos.ts`.
- Traducción de `x.md` → `x.es.md` (publicada en `…/x/es/`). Todo el contenido de SOM (inglés) y Sistemas Informáticos (valenciano) lleva versión en castellano.
- Bloques: `src/lib/directivas/` (plugin Sätteri). Laboratorios: `<tema>/laboratorios/<nombre>/index.html`, contrato en la cabecera de `public/comun/lab.js`.
- Nada de soluciones ni exámenes en el repo: `privado/`.

## Trampas conocidas

- Starlight con `lang: 'es-ES'`, no `'es'` (si no, 404 en `/es/` en desarrollo).
- Astro 7 usa Sätteri: los plugins remark no se aplican.
- El validador de enlaces no entiende `…/es`; lo resuelve `src/lib/enlaces.ts`.
- `archivosContenido()` debe ir antes que Starlight en `integrations`.
- Al renombrar un tema ya publicado, añadir `redirects` en `astro.config.mjs` para no romper enlaces de Aules.

## Integrar un laboratorio nuevo

1. Comprobar que es autónomo (sin `window.claude`, sin peticiones a terceros).
2. Copiarlo a `<tema>/laboratorios/<nombre>/index.html`.
3. Cabecera según el contrato de `lab.js` (idioma original, metadatos `lab:*:es`, `/comun/lab.js` antes que otros scripts, `/comun/fuentes.css`).
4. Controles `data-lab-volver`, `data-lab-idioma`, `data-lab-zoom`; memoria con `Lab.leer/guardar`.
5. Texto original en el HTML, castellano en `#lab-textos` (`data-t`, `data-t-html`, `data-t-attr`); JavaScript con `Lab.t`.
6. Añadirlo a `tests/unit/laboratorios-reales.test.ts` y `::artefacto{src="<nombre>"}` en la página del tema.
7. `npm test && npm run verificar` y revisión en el navegador.
```

- [ ] **Step 4: Verificación completa**

Run: `npm test && npm run verificar`
Expected: todas las pruebas en PASS, compilación sin errores, sin enlaces rotos, informe `Nada pendiente`.

Con `npx astro dev --port 4321`, recorrer en el navegador integrado (escritorio y 375 px, modo claro y oscuro) según la sección 13 del diseño:
- `/` portada personal → enlace a Docencia.
- `/docencia/` tarjetas de los tres módulos.
- `/docencia/smr/som/` → conmutador, «Laboratorios del módulo» con el Laboratorio de Bits; cambiar a Castellano y pasar páginas con «Página siguiente»: se mantiene el castellano; entrar desde el menú: se abre el original.
- Tarjeta del laboratorio → abre a pantalla completa en el idioma de la página; «Volver» regresa; `…/numeracion/#kib` abre directamente la pestaña (simula el enlace desde Aules).
- Lo mismo en Sistemas Informáticos con la Placa Base (valenciano).
- `/docencia/smr/proyecto-intermodular/` sin conmutador y con la caja 🔒 de Aules.
- Buscador: encuentra «binary» y «binario».
`npx astro dev stop` al terminar.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md docs src
git commit -m "Guía de edición, memoria del proyecto y ejemplo de material en Aules

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
