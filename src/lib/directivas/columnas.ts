import type { MdastContent } from 'satteri';
import { fallo, type Manejador, type NodoDirectiva } from './comun';
import { bloque, pasos, soloDiapositivas, type NodoMdast } from './pasos';

/** ::::columnas … :::: — el primer bloque a la izquierda y el resto a la derecha. */
export const columnas: Manejador = (nodo, archivo) => {
  soloDiapositivas('columnas', archivo);
  // Un :::pasos interior puede llegar sin transformar, según el orden en que Sätteri visite los nodos.
  const hijos = (nodo.children as NodoMdast[]).map((h) =>
    h.type === 'containerDirective' && h.name === 'pasos'
      ? (pasos(h as unknown as NodoDirectiva, archivo) as unknown as NodoMdast)
      : h,
  );
  if (hijos.length < 2) {
    fallo('columnas', archivo, 'Necesita al menos dos bloques: el primero va a la izquierda y el resto a la derecha');
  }
  return bloque('columnas', [
    bloque('columnas__izquierda', [hijos[0]]),
    bloque('columnas__derecha', hijos.slice(1)),
  ]) as unknown as MdastContent;
};
