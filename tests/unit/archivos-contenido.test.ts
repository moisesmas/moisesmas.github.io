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
    writeFileSync(path.join(path.dirname(raiz), 'secreto.txt'), 'x');
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
