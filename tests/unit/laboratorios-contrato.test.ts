import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { comprobarTextos, leerFicha } from '../../src/lib/laboratorios';
import { LABORATORIOS } from './laboratorios-web';

// Estas dos pruebas valen también sin laboratorios: así el archivo nunca queda sin pruebas (Vitest lo daría por fallido).
it('cada carpeta de laboratorio tiene un nombre válido para ::artefacto', () => {
  expect(LABORATORIOS.filter((l) => !/^[a-z0-9-]+$/.test(l.nombre)).map((l) => l.relativo)).toEqual([]);
});
it('no hay dos laboratorios con el mismo nombre (su memoria local se guarda por nombre)', () => {
  const nombres = LABORATORIOS.map((l) => l.nombre);
  expect(nombres.filter((n, i) => nombres.indexOf(n) !== i)).toEqual([]);
});

// Se titula con el nombre y no con la ruta: Vitest recorta a 40 caracteres lo que interpola y todos quedarían iguales.
describe.each(LABORATORIOS)('contrato de $nombre', ({ archivo, nombre, original }) => {
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
