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
