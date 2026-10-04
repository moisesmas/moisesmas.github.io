// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';

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
  describe('destinoVolver(referrer, origen, ruta, historial, paginaTema)', () => {
    const RUTA = '/docencia/smr/som/ud01/laboratorios/prueba/';
    const volver = (referrer: string, historial = 2) => {
      const { destinoVolver } = cargar(LAB, '')._internos;
      return destinoVolver(referrer, 'http://localhost', RUTA, historial, '/t/');
    };
    it('atrás si se llegó desde otra página de la web y hay historial, si no la página del tema', () => {
      expect(volver('http://localhost/docencia/x/')).toBe('atras');
      expect(volver('https://aules.edu.gva.es/')).toBe('/t/');
      expect(volver('')).toBe('/t/');
    });
    it('referrer propio (tras cambiar de idioma con location.replace): la página del tema', () => {
      expect(volver(`http://localhost${RUTA}`)).toBe('/t/');
      expect(volver(`http://localhost${RUTA}?lang=es#kib`)).toBe('/t/');
    });
    it('sin historial (pestaña nueva abierta desde Aules): la página del tema', () => {
      expect(volver('http://localhost/docencia/x/', 1)).toBe('/t/');
    });
    it('referrer no válido: la página del tema', () => {
      expect(volver('esto no es una url')).toBe('/t/');
    });
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
  it('volver con idioma original español: no añade es/ al href', () => {
    cargar(LAB, '<a data-lab-volver href="#">←</a>', 'es');
    expect(document.querySelector('[data-lab-volver]')!.getAttribute('href')).toBe('http://localhost/docencia/smr/som/ud01/');
  });
  it('cambio de idioma usa location.replace para no contaminar el historial', () => {
    const replaceSpy = vi.spyOn(window.location, 'replace').mockImplementation(() => {});
    cargar(LAB, '<button data-lab-idioma="es"></button>');
    (document.querySelector('[data-lab-idioma="es"]') as HTMLButtonElement).click();
    expect(replaceSpy).toHaveBeenCalledWith(`${LAB}?lang=es`);
    replaceSpy.mockRestore();
  });
});

describe('volver (clic)', () => {
  /** Pulsa «← Volver» con el referrer y la longitud de historial dados. */
  function pulsarVolver(referrer: string, historial: number, url = LAB) {
    Object.defineProperty(document, 'referrer', { configurable: true, get: () => referrer });
    Object.defineProperty(window.history, 'length', { configurable: true, get: () => historial });
    const atras = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    cargar(url, '<a data-lab-volver href="#">←</a>');
    let evitado = false;
    // Lo ve después del manejador del kit; evita que happy-dom siga el enlace.
    const observar = (e: Event) => {
      evitado = e.defaultPrevented;
      e.preventDefault();
    };
    document.addEventListener('click', observar);
    document.querySelector('[data-lab-volver]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    document.removeEventListener('click', observar);
    return { atras, evitado };
  }
  afterEach(() => {
    delete (document as any).referrer;
    delete (window.history as any).length;
    vi.restoreAllMocks();
  });

  it('llegado desde otra página de la web: history.back() y no sigue el enlace', () => {
    const { atras, evitado } = pulsarVolver('http://localhost/docencia/smr/som/ud01/', 3);
    expect(atras).toHaveBeenCalledTimes(1);
    expect(evitado).toBe(true);
  });
  it('tras cambiar de idioma el referrer es el propio laboratorio: sigue el enlace a la unidad', () => {
    const { atras, evitado } = pulsarVolver(LAB, 3, `${LAB}?lang=es`);
    expect(atras).not.toHaveBeenCalled();
    expect(evitado).toBe(false);
  });
  it('en una pestaña nueva (historial de una página): sigue el enlace a la unidad', () => {
    const { atras, evitado } = pulsarVolver('http://localhost/docencia/smr/som/ud01/', 1);
    expect(atras).not.toHaveBeenCalled();
    expect(evitado).toBe(false);
  });
});
