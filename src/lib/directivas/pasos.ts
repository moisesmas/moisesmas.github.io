import type { MdastContent } from 'satteri';
import { fallo, type ArchivoMd, type Manejador } from './comun';

export interface NodoMdast {
  type: string;
  name?: string;
  data?: { hName?: string; hProperties?: Record<string, unknown> };
  children?: NodoMdast[];
}

export function soloDiapositivas(nombre: string, archivo: ArchivoMd): void {
  if (!archivo.diapositivas) fallo(nombre, archivo, 'Solo se puede usar en las diapositivas (carpeta diapositivas/)');
}

export function bloque(clase: string, children: NodoMdast[]): NodoMdast {
  return { type: 'paragraph', data: { hName: 'div', hProperties: { class: clase } }, children };
}

function conClase(nodo: NodoMdast, clase: string): NodoMdast {
  const props = nodo.data?.hProperties ?? {};
  const previa = typeof props.class === 'string' ? `${props.class} ` : '';
  return { ...nodo, data: { ...nodo.data, hProperties: { ...props, class: previa + clase } } };
}

/** Las listas se escalonan elemento a elemento; el resto de bloques, enteros. */
function escalonar(hijos: NodoMdast[]): NodoMdast[] {
  return hijos.map((h) =>
    h.type === 'list' ? { ...h, children: (h.children ?? []).map((li) => conClase(li, 'fragment')) } : bloque('fragment', [h]),
  );
}

/** :::pasos … ::: — el contenido aparece al pulsar, paso a paso (fragments de reveal.js). */
export const pasos: Manejador = (nodo, archivo) => {
  soloDiapositivas('pasos', archivo);
  return bloque('pasos', escalonar(nodo.children as NodoMdast[])) as unknown as MdastContent;
};
