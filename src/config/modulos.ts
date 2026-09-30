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
  /** Curso de Aules del módulo (material reservado). */
  aules: string;
}

export const ETIQUETA_IDIOMA: Record<CodigoIdioma, string> = {
  es: 'Castellano',
  en: 'English',
  'ca-valencia': 'Valencià',
};

// Los enlaces de Aules son provisionales: sustituirlos por la dirección de cada curso.
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
