import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { TEXTOS_PRESENTACION } from '../diapositivas';
import { idiomaContenido } from '../idiomas';
import { leerFicha } from '../laboratorios';
import { hrefLaboratorio } from './artefacto';
import { atributo, escapar, fallo, html, type Manejador } from './comun';
import { soloDiapositivas } from './pasos';

/** ::laboratorio{src="nombre" pestana="id"} — tarjeta que abre el laboratorio de la unidad en otra pestaña. */
export const laboratorio: Manejador = (nodo, archivo) => {
  soloDiapositivas('laboratorio', archivo);
  const nombre = atributo(nodo, 'src');
  if (!nombre || !/^[a-z0-9-]+$/.test(nombre)) {
    fallo('laboratorio', archivo, `src debe ser el nombre de la carpeta del laboratorio (minúsculas y guiones): «${nombre ?? ''}»`);
  }
  const indice = path.join(archivo.dir, 'laboratorios', nombre, 'index.html');
  if (!existsSync(indice)) fallo('laboratorio', archivo, `No existe laboratorios/${nombre}/index.html en la unidad`);
  const codigo = readFileSync(indice, 'utf8');
  const pestana = atributo(nodo, 'pestana');
  if (pestana && !codigo.includes(`data-tab="${pestana}"`)) {
    fallo('laboratorio', archivo, `El laboratorio ${nombre} no tiene la pestaña «${pestana}» (data-tab)`);
  }
  const ficha = leerFicha(codigo, archivo.traduccion);
  const textos = TEXTOS_PRESENTACION[idiomaContenido(archivo.id, archivo.modulo)];
  const href = hrefLaboratorio(archivo.hrefDir, nombre, archivo.traduccion) + (pestana ? `#${pestana}` : '');
  return html(
    `<a class="diapositiva-laboratorio" href="${escapar(href)}" target="_blank" rel="noopener">` +
      `<span class="diapositiva-laboratorio__marca">${escapar(textos.laboratorio)}</span>` +
      `<strong class="diapositiva-laboratorio__titulo">${escapar(ficha.titulo)}</strong>` +
      (ficha.descripcion ? `<span class="diapositiva-laboratorio__descripcion">${escapar(ficha.descripcion)}</span>` : '') +
      `<span class="diapositiva-laboratorio__abrir">${escapar(textos.abrirLab)} ↗</span></a>`,
  );
};
