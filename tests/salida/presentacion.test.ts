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
