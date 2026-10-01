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
