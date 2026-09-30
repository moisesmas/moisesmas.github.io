# Fase C · Materiales del primer trimestre — Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Task C1 is code with complete text; the content tasks (C3–C10) are writing tasks with acceptance criteria instead of code. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Materiales completos (apuntes, laboratorios interactivos y actividades) de las unidades del primer trimestre de SOM, Sistemas Informáticos y Proyecto Intermodular, más el esqueleto del resto del curso.

**Architecture:** Cada unidad es una carpeta de `src/content/docs/docencia/<ciclo>/<módulo>/`. Los laboratorios siguen el contrato de `public/comun/lab.js`. Dos pruebas automáticas descubren todos los laboratorios de la web (contrato y humo en happy-dom) para que ningún laboratorio nuevo necesite tocar las pruebas.

**Spec:** `docs/superpowers/specs/2026-10-01-materiales-primer-trimestre-design.md` (y el diseño general `docs/superpowers/specs/2026-09-30-web-docencia-design.md`).

**Prerrequisito:** fase A completa hasta la Task 10 (kit de laboratorios, directivas y los dos laboratorios integrados).

## Global Constraints

- Idiomas: SOM original `en` + castellano; Sistemas Informáticos original `ca-valencia` + castellano; Proyecto Intermodular solo `es`.
- Contenido solo en `.md`; nombres en minúsculas, sin acentos ni espacios, con guiones.
- Nunca publicar soluciones, exámenes ni material de terceros: soluciones en `privado/soluciones/<módulo>/<unidad>.md` (carpeta ignorada por git).
- Laboratorios: sin peticiones a terceros, sin `<canvas>` (la prueba de humo usa happy-dom), sin `localStorage` directo (usar `Lab.leer/guardar`), pestañas con `role="tablist"`/`role="tab"`/`role="tabpanel"`, recursos comunes `/comun/lab.js` y `/comun/fuentes.css`.
- Commits terminan con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

### Task C1: Pruebas automáticas para todos los laboratorios y guía de laboratorios

**Files:**
- Create: `tests/unit/laboratorios-web.ts`, `tests/unit/laboratorios-contrato.test.ts`, `tests/unit/laboratorios-humo.test.ts`, `docs/guia-laboratorios.md`
- Delete: `tests/unit/laboratorios-reales.test.ts` (sustituida por la prueba de contrato, que descubre los laboratorios sola)

**Interfaces:**
- Consumes: `moduloDeId` (`src/config/modulos.ts`), `comprobarTextos`, `leerFicha` (`src/lib/laboratorios.ts`), `public/comun/lab.js`.
- Produces: `LABORATORIOS: { archivo: string; relativo: string; nombre: string; original: CodigoIdioma }[]` en `tests/unit/laboratorios-web.ts`.

- [ ] **Step 1: Descubrimiento de laboratorios**

`tests/unit/laboratorios-web.ts`:
```ts
import { globSync } from 'node:fs';
import { moduloDeId, type CodigoIdioma } from '../../src/config/modulos';

const RAIZ = 'src/content/docs/';

/** Todos los laboratorios de la web, con el idioma original de su módulo. */
export const LABORATORIOS: { archivo: string; relativo: string; nombre: string; original: CodigoIdioma }[] = globSync(
  `${RAIZ}**/laboratorios/*/index.html`,
)
  .sort()
  .map((archivo) => {
    const relativo = archivo.slice(RAIZ.length);
    return {
      archivo,
      relativo,
      nombre: relativo.split('/').at(-2) ?? '',
      original: moduloDeId(relativo)?.idioma ?? 'es',
    };
  });
```

- [ ] **Step 2: Prueba de contrato**

`tests/unit/laboratorios-contrato.test.ts`:
```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { comprobarTextos, leerFicha } from '../../src/lib/laboratorios';
import { LABORATORIOS } from './laboratorios-web';

it('la web tiene laboratorios', () => {
  expect(LABORATORIOS.length).toBeGreaterThan(0);
});

describe.each(LABORATORIOS)('contrato de $relativo', ({ archivo, nombre, original }) => {
  const html = readFileSync(archivo, 'utf8');
  const bilingue = original !== 'es';

  it('declara nombre e idioma original', () => {
    expect(html).toMatch(new RegExp(`<html lang="${original}" data-lab="${nombre}" data-idioma-original="${original}">`));
  });
  it('carga el kit antes que cualquier otro script', () => {
    const kit = html.indexOf('<script src="/comun/lab.js"></script>');
    expect(kit).toBeGreaterThan(-1);
    expect(kit).toBe(html.indexOf('<script'));
  });
  it('usa los recursos comunes y nada externo', () => {
    expect(html).toContain('href="/comun/fuentes.css"');
    expect(html).not.toMatch(/\.\.\/\.\.\/assets|localStorage|<canvas/);
    expect(html.match(/https?:\/\/[^"'\s)<]+/g)?.filter((u) => !u.startsWith('http://www.w3.org/')) ?? []).toEqual([]);
  });
  it('tiene los controles del kit', () => {
    expect(html).toContain('data-lab-volver');
    expect(html).toContain('data-lab-zoom="+"');
    expect(html).toContain('data-lab-zoom="-"');
    if (bilingue) {
      expect(html).toContain(`data-lab-idioma="${original}"`);
      expect(html).toContain('data-lab-idioma="es"');
    }
  });
  it('pestañas accesibles', () => {
    expect(html).toContain('role="tablist"');
    expect((html.match(/role="tab"/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).toContain('role="tabpanel"');
  });
  it.runIf(bilingue)('todas las claves traducidas y ninguna sobrante', () => {
    expect(comprobarTextos(html)).toEqual({ faltan: [], sobran: [] });
  });
  it('ficha completa', () => {
    const fichas = bilingue ? [leerFicha(html, false), leerFicha(html, true)] : [leerFicha(html, false)];
    for (const f of fichas) {
      expect(f.titulo).not.toBe('');
      expect(f.descripcion).not.toBe('');
      expect(f.etiquetas.length).toBeGreaterThan(0);
    }
    if (bilingue) expect(fichas[0].titulo).not.toBe(fichas[1].titulo);
  });
});
```

- [ ] **Step 3: Prueba de humo**

`tests/unit/laboratorios-humo.test.ts`:
```ts
import { readFileSync } from 'node:fs';
import { Window } from 'happy-dom';
import { describe, expect, it } from 'vitest';
import { LABORATORIOS } from './laboratorios-web';

const KIT = readFileSync('public/comun/lab.js', 'utf8');

/** Abre un laboratorio en un navegador simulado, pulsa todas sus pestañas y devuelve lo que falló. */
async function abrir(archivo: string, relativo: string, consulta: string) {
  const html = readFileSync(archivo, 'utf8').replace('<script src="/comun/lab.js"></script>', () => `<script>${KIT}</script>`);
  const window = new Window({
    url: `http://localhost/${relativo.replace(/index\.html$/, '')}${consulta}`,
    settings: {
      enableJavaScriptEvaluation: true,
      suppressInsecureJavaScriptEnvironmentWarning: true,
      disableJavaScriptFileLoading: true,
      disableCSSFileLoading: true,
      handleDisabledFileLoadingAsSuccess: true,
      navigation: { disableMainFrameNavigation: true, disableChildFrameNavigation: true, disableChildPageNavigation: true },
      timer: { maxTimeout: 50, maxIntervalTime: 50, maxIntervalIterations: 3 },
    },
  });
  const errores: string[] = [];
  window.addEventListener('error', (evento) => {
    const e = evento as unknown as { error?: Error; message?: string };
    errores.push(String(e.error?.message ?? e.message));
  });
  window.document.write(html);
  await window.happyDOM.waitUntilComplete();
  const pestanas = [...window.document.querySelectorAll('[role="tab"]')];
  for (const pestana of pestanas) (pestana as unknown as HTMLElement).click();
  await window.happyDOM.waitUntilComplete();
  const consola = window.happyDOM.virtualConsolePrinter.readAsString();
  await window.happyDOM.close();
  return { errores, consola, pestanas: pestanas.length };
}

describe.each(LABORATORIOS)('humo de $relativo', ({ archivo, relativo, original }) => {
  it('se abre y recorre sus pestañas sin errores en el idioma original', async () => {
    const r = await abrir(archivo, relativo, '');
    expect(r.errores).toEqual([]);
    expect(r.consola).not.toMatch(/Error/);
    expect(r.pestanas).toBeGreaterThan(0);
  });
  it.runIf(original !== 'es')('igual en castellano, sin traducciones que falten', async () => {
    const r = await abrir(archivo, relativo, '?lang=es');
    expect(r.errores).toEqual([]);
    expect(r.consola).not.toMatch(/Error|\[lab\] Falta/);
  });
});
```

- [ ] **Step 4: Comprobar con los laboratorios existentes**

Run: `npx vitest run tests/unit/laboratorios-contrato.test.ts tests/unit/laboratorios-humo.test.ts`
Expected: PASS para `numeracion` y `placa-base` (contrato y humo en los dos idiomas).

Comprobar que la prueba de humo detecta errores: copiar temporalmente un laboratorio a `src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/roto/index.html`, cambiar su `data-lab` a `roto`, añadir `<script>funcionQueNoExiste();</script>` antes de `</body>` y ejecutar la prueba de humo → debe FALLAR en `roto`. Borrar la copia y volver a ejecutar → PASS.

- [ ] **Step 5: Borrar la prueba antigua y ejecutar todo**

Run: `git rm tests/unit/laboratorios-reales.test.ts && npm test`
Expected: PASS en todas las pruebas unitarias.

- [ ] **Step 6: `docs/guia-laboratorios.md`**

Guía para crear laboratorios nuevos. Debe contener: el contrato (lo que exige `public/comun/lab.js` y comprueban las dos pruebas), el esqueleto HTML mínimo (cabecera con metadatos `lab:*:es`, `/comun/lab.js` primero, `/comun/fuentes.css`, diccionario `#lab-textos`, cabecera visible con `data-lab-volver`, botones `data-lab-zoom` y `data-lab-idioma`, `role="tablist"`, pestañas `role="tab"` con `data-tab`, secciones `role="tabpanel"`, pestaña final de práctica con corrección), las reglas (sin `<canvas>`, sin URLs externas, sin `localStorage` directo, `Lab.t` para textos generados, `data-t` solo en elementos sin hijos, `data-t-html` para texto con marcado), la identidad visual (tokens `--bg`, `--surface`, `--surface2`, `--ink`, `--muted`, `--line`, `--accent`, `--pcb` con sus valores claros y oscuros de los laboratorios existentes; fuentes Chakra Petch, Atkinson Hyperlegible y JetBrains Mono), cómo enlazarlo (`::artefacto{src="<nombre>"}`) y los comandos de verificación. Tomar como referencia real `src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/index.html`.

- [ ] **Step 7: Commit**

```bash
git add tests/unit/laboratorios-web.ts tests/unit/laboratorios-contrato.test.ts tests/unit/laboratorios-humo.test.ts docs/guia-laboratorios.md
git commit -m "Pruebas de contrato y humo para todos los laboratorios y guía para crearlos

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task C2: Esqueleto del resto del curso

Portadas (`index.md` y, donde toque, `index.es.md`) de SOM UD4–UD9, SI UD4–UD7 y PI UD3–UD5 con: título oficial de la programación, trimestre, horas, contenidos de la programación convertidos en lista para el alumnado y un aviso `:::note` de «en preparación». Fuentes: `privado/analisis/{som,si,pi}.md` y las programaciones. Carpetas según la tabla de la sección 3 del diseño de la fase C. Verificación: `npm run build` sin enlaces rotos y el informe de pendientes sin traducciones pendientes.

---

### Tasks C3–C10: Una unidad completa por tarea

| Tarea | Unidad |
|---|---|
| C3 | SOM UD1 Introduction to computer systems (`ud01-introduccion`) |
| C4 | SOM UD2 Virtualization (`ud02-virtualizacion`) |
| C5 | SOM UD3 Operating System Functions (`ud03-funciones-sistema-operativo`) |
| C6 | SI UD1 Arquitectura d'equips i components de maquinari (`ud01-hardware`) |
| C7 | SI UD2 Instal·lació de sistemes operatius (`ud02-instalacion-sistemas-operativos`) |
| C8 | SI UD3 Automatització de tasques i shell scripting (`ud03-automatizacion-scripting`) |
| C9 | PI UD1 Sector productivo (`ud01-sector-productivo`) |
| C10 | PI UD2 Diseño de proyecto (`ud02-diseno-proyecto`) |

Cada tarea tiene un encargo propio (`privado/fase-c/encargo-<unidad>.md`) con los datos de la unidad extraídos del análisis. Criterios de aceptación comunes:

1. Páginas según la sección 4 del diseño de la fase C: `index.md`, 2–5 páginas de apuntes, `actividades.md`, en SI `planificacion.md`; todas con su `.es.md` en SOM y SI.
2. Un laboratorio nuevo por unidad (5–8 pestañas, una por concepto clave, y una pestaña final de práctica con corrección) que cumple el contrato; en SOM UD1 y SI UD1 complementa al laboratorio existente sin repetirlo.
3. Cobertura de todos los contenidos y criterios de evaluación de la unidad en la programación (tabla de cobertura en el informe de la tarea).
4. Soluciones de las actividades en `privado/soluciones/<módulo>/<unidad>.md`.
5. `npm test` y `npm run build` en verde; informe de pendientes sin nada de la unidad.
6. Commit con el mensaje «<Módulo>: <unidad> — apuntes, laboratorio y actividades».

### Task C11: Portadas de módulo

Portada de cada módulo (`index.md` y `index.es.md`): presentación, cómo se evalúa (porcentajes de las unidades según la programación), temporalización por trimestres con horas, enlace a Aules y «Laboratorios del módulo». En SI, además, el calendario de sesiones presenciales y exámenes del curso.

### Task C12: Verificación final e informe

`npm test`, `npm run verificar`, revisión en el navegador de una unidad de cada módulo y `docs/revision-pendiente.md` con la lista de lo que debe revisar el titular.
