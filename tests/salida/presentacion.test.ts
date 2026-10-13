import { globSync } from 'node:fs';
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
    expect(en().match(/<section[\s>]/g)).toHaveLength(15);
    expect(es().match(/<section[\s>]/g)).toHaveLength(15);
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

const DIST = 'dist/';
const presentaciones = globSync(`${DIST}**/presentacion/index.html`)
  .map((r) => r.slice(DIST.length))
  .sort();

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
