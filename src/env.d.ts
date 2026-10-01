declare namespace App {
  interface Locals {
    idiomaContenido: import('./config/modulos').CodigoIdioma;
    conmutador: import('./lib/idiomas').EstadoIdioma | undefined;
  }
}
