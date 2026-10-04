import type { MdastContent } from 'satteri';
import { escapar, fallo, html, type Manejador } from './comun';

/** :::aules … ::: — aviso de material reservado con enlace al curso de Aules del módulo. */
export const aules: Manejador = (nodo, archivo) => {
  const modulo = archivo.modulo;
  if (!modulo) fallo('aules', archivo, 'Solo se puede usar dentro de un módulo');
  return {
    type: 'paragraph',
    data: { hName: 'aside', hProperties: { class: 'bloque-aules', 'aria-label': 'Material en Aules' } },
    children: [
      html('<p class="bloque-aules__titulo" lang="es"><span aria-hidden="true">🔒</span> Material en Aules</p>'),
      { type: 'paragraph', data: { hName: 'div', hProperties: { class: 'bloque-aules__contenido' } }, children: [...nodo.children] },
      html(`<p class="bloque-aules__enlace" lang="es"><a href="${escapar(modulo.aules)}">Abrir el curso en Aules</a></p>`),
    ],
  } as MdastContent;
};
