export type CodigoIdioma = 'es' | 'en' | 'ca-valencia';

export interface Modulo {
  /** Identificador corto, también id del tema del menú. */
  id: string;
  /** Carpeta dentro de src/content/docs, sin barras al principio ni al final. */
  ruta: string;
  nombre: string;
  ciclo: string;
  curso: string;
  /** Idioma original del contenido. Si no es «es», cada página lleva versión en castellano. */
  idioma: CodigoIdioma;
  /** Enlace a Aules del módulo (material reservado). Es la portada genérica de Aules, no la del curso. */
  aules: string;
}

export const ETIQUETA_IDIOMA: Record<CodigoIdioma, string> = {
  es: 'Castellano',
  en: 'English',
  'ca-valencia': 'Valencià',
};

// Enlace genérico a Aules a propósito: la web es pública y no debe revelar la dirección de cada curso
// (decisión del titular, 2026-10-14). El alumnado entra en su curso desde Aules.
export const MODULOS: Modulo[] = [
  {
    id: 'som',
    ruta: 'docencia/smr/som',
    nombre: 'Sistemas Operativos Monopuesto',
    ciclo: 'CFGM Sistemas Microinformáticos y Redes',
    curso: '1º',
    idioma: 'en',
    aules: 'https://aules.edu.gva.es/',
  },
  {
    id: 'sistemas-informaticos',
    ruta: 'docencia/dam/sistemas-informaticos',
    nombre: 'Sistemas Informáticos',
    ciclo: 'CFGS Desarrollo de Aplicaciones Multiplataforma (semipresencial)',
    curso: '1º',
    idioma: 'ca-valencia',
    aules: 'https://aules.edu.gva.es/',
  },
  {
    id: 'proyecto-intermodular',
    ruta: 'docencia/smr/proyecto-intermodular',
    nombre: 'Proyecto Intermodular',
    ciclo: 'CFGM Sistemas Microinformáticos y Redes',
    curso: '2º',
    idioma: 'es',
    aules: 'https://aules.edu.gva.es/',
  },
];

export function moduloDeId(id: string): Modulo | undefined {
  return MODULOS.find((m) => id === m.ruta || id.startsWith(`${m.ruta}/`));
}

/** Configuración de starlight-sidebar-topics: un menú lateral por módulo. */
export function temasMenu() {
  return MODULOS.map((m) => ({
    id: m.id,
    label: m.nombre,
    link: `/${m.ruta}/`,
    items: [{ autogenerate: { directory: m.ruta } }],
  }));
}
