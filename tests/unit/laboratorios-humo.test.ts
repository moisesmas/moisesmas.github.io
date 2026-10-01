import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Window } from 'happy-dom';
import { describe, expect, it } from 'vitest';
import { LABORATORIOS } from './laboratorios-web';

// El kit se incrusta dentro de un <script>: el «</script>» de su comentario de cabecera cerraría la etiqueta antes de tiempo.
const KIT = readFileSync('public/comun/lab.js', 'utf8').replace(/<\/script/gi, '<\\/script');

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
  // Al escribir un documento, happy-dom no pasa por «loading» ni lanza DOMContentLoaded: sin esto el kit se ejecutaría
  // antes de que exista el <body> (no traduciría nada) y el código del laboratorio en DOMContentLoaded no correría nunca.
  const documento = window.document;
  const estado = (valor: string) => Object.defineProperty(documento, 'readyState', { configurable: true, get: () => valor });
  estado('loading');
  documento.write(html);
  estado('interactive');
  documento.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));
  estado('complete');
  await window.happyDOM.waitUntilComplete();
  const pestanas = [...window.document.querySelectorAll('[role="tab"]')];
  for (const pestana of pestanas) (pestana as unknown as HTMLElement).click();
  await window.happyDOM.waitUntilComplete();
  const consola = window.happyDOM.virtualConsolePrinter.readAsString();
  await window.happyDOM.close();
  return { errores, consola, pestanas: pestanas.length };
}

// Comprueba que la propia prueba no es ciega: un laboratorio roto a propósito tiene que hacerla fallar. Así también hay
// siempre alguna prueba en el archivo aunque aún no exista ningún laboratorio.
describe('autocomprobación de la prueba de humo', () => {
  const PAGINA = `<!doctype html><html lang="en" data-lab="roto" data-idioma-original="en"><head>
<script src="/comun/lab.js"></script>
<script type="application/json" id="lab-textos">{"es":{"hola":"Hola"}}</script>
</head><body><p data-t="hola">Hello</p><p data-t="sin-traducir">Untranslated</p>
<button role="tab">Uno</button><script>funcionQueNoExiste();</script></body></html>`;

  it('detecta un error de JavaScript y una traducción que falta', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'humo-'));
    try {
      const archivo = path.join(dir, 'index.html');
      writeFileSync(archivo, PAGINA);
      const original = await abrir(archivo, 'docencia/roto/laboratorios/roto/index.html', '');
      expect(original.errores.join('\n')).toContain('funcionQueNoExiste');
      const castellano = await abrir(archivo, 'docencia/roto/laboratorios/roto/index.html', '?lang=es');
      expect(castellano.consola).toContain('[lab] Falta la traducción de «sin-traducir»');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe.each(LABORATORIOS)('humo de $nombre', ({ archivo, relativo, original }) => {
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
