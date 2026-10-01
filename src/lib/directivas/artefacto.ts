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
