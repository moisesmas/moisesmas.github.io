import type { MdastContent, MdastPluginEntry } from 'satteri';
import { artefacto } from './artefacto';
import { aules } from './aules';
import { columnas } from './columnas';
import { archivoMd, type Manejador, type NodoDirectiva } from './comun';
import { descarga } from './descarga';
import { laboratorio } from './laboratorio';
import { laboratorios } from './laboratorios';
import { modulos } from './modulos';
import { pasos } from './pasos';
import { video } from './video';

const HOJAS: Record<string, Manejador> = { descarga, video, modulos, artefacto, laboratorios, laboratorio };
const CONTENEDORES: Record<string, Manejador> = { aules, pasos, columnas };

/**
 * Bloques especiales de la web (plugin mdast de Sätteri, trampa 2).
 * Las directivas que no son nuestras se dejan para Starlight (avisos) o para su restauración como texto.
 */
export const directivas: MdastPluginEntry = ({ fileURL }) => {
  const archivo = archivoMd(fileURL);
  if (!archivo) return null;
  return {
    name: 'directivas-docencia',
    leafDirective(nodo) {
      return HOJAS[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
    containerDirective(nodo) {
      return CONTENEDORES[nodo.name]?.(nodo as NodoDirectiva, archivo) as MdastContent | undefined;
    },
  };
};
