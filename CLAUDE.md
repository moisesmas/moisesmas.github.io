# moisesmas.com — web de docencia

Diseño: `docs/superpowers/specs/2026-09-30-web-docencia-design.md`. Guía del titular: `docs/guia-edicion.md`.

## Comandos

- `npm test` — pruebas unitarias (rápidas).
- `npm run verificar` — compila y prueba la salida en `dist/`.
- `npx astro dev --port 4321` — se lanza en segundo plano en shells no interactivos; `npx astro dev stop` para pararlo.

## Convenciones

- Contenido en `.md`, nunca `.mdx`. Nombres en minúsculas, sin acentos, con guiones.
- Módulos definidos solo en `src/config/modulos.ts`.
- Traducción de `x.md` → `x.es.md` (publicada en `…/x/es/`). Todo el contenido de SOM (inglés) y Sistemas Informáticos (valenciano) lleva versión en castellano.
- Bloques: `src/lib/directivas/` (plugin Sätteri). Laboratorios: `<tema>/laboratorios/<nombre>/index.html`, contrato en la cabecera de `public/comun/lab.js`.
- Diapositivas: toda página de teoría lleva su presentación en `<unidad>/diapositivas/<pagina>.md` (y `.es.md` si la página tiene traducción), según `docs/guia-diapositivas.md`. Lo comprueba `tests/unit/diapositivas.test.ts`; `src/config/diapositivas.ts` es una lista temporal que solo se vacía.
- Nada de soluciones ni exámenes en el repo: `privado/`.

## Trampas conocidas

- Starlight con `lang: 'es-ES'`, no `'es'` (si no, 404 en `/es/` en desarrollo).
- Astro 7 usa Sätteri: los plugins remark no se aplican.
- El validador de enlaces no entiende `…/es`; lo resuelve `src/lib/enlaces.ts`.
- `archivosContenido()` debe ir antes que Starlight en `integrations`.
- Al renombrar un tema ya publicado, añadir `redirects` en `astro.config.mjs` para no romper enlaces de Aules.
- El validador de enlaces de Starlight solo acepta enlaces a archivos; los enlaces a la carpeta de un laboratorio los excluye `carpetaConIndiceExiste` (`src/lib/enlaces.ts`) solo cuando la carpeta tiene un `index.html`.
- Happy-dom nunca dispara `DOMContentLoaded` tras `document.write`, y el comentario de cabecera de `public/comun/lab.js` contiene un `</script>` literal: `tests/unit/laboratorios-humo.test.ts` resuelve ambos casos.
- Las presentaciones no son páginas de Starlight: las genera `src/pages/docencia/[...presentacion].astro` con reveal.js. No uses temas de `reveal.js/theme/` (importan Google Fonts); los estilos van en `src/styles/presentacion.css`.
- En las diapositivas, `---` necesita una línea en blanco antes, y un `:::pasos` dentro de columnas obliga a abrir y cerrar con `::::columnas`.

## Integrar un laboratorio nuevo

1. Comprobar que es autónomo (sin `window.claude`, sin peticiones a terceros).
2. Copiarlo a `<tema>/laboratorios/<nombre>/index.html`.
3. Cabecera según el contrato de `lab.js` (idioma original, metadatos `lab:*:es`, `/comun/lab.js` antes que otros scripts, `/comun/fuentes.css`).
4. Controles `data-lab-volver`, `data-lab-idioma`, `data-lab-zoom`; memoria con `Lab.leer/guardar`.
5. Texto original en el HTML, castellano en `#lab-textos` (`data-t`, `data-t-html`, `data-t-attr`); JavaScript con `Lab.t`.
6. Las pruebas `tests/unit/laboratorios-contrato.test.ts` y `tests/unit/laboratorios-humo.test.ts` descubren el laboratorio solas; ejecútalas.
7. Añadirlo a `::artefacto{src="<nombre>"}` en la página del tema.
8. `npm test && npm run verificar` y revisión en el navegador.
9. Consulta `docs/guia-laboratorios.md` para más detalles.

## Integrar una presentación nueva

1. Crear `<unidad>/diapositivas/<pagina>.md` (y `.es.md`) siguiendo `docs/guia-diapositivas.md`.
2. Gráficos nuevos en SVG en la carpeta de la unidad (con `-es.svg`).
3. Si la unidad ya tiene todas sus presentaciones, quitarla de `src/config/diapositivas.ts`.
4. `npm test && npm run verificar` y revisión en el navegador (`…/<pagina>/presentacion/`).

## Publicación

- Repositorio público `moisesmas/moisesmas.github.io` (nombre de «sitio de usuario» para servir en la raíz). Dominio `moisesmas.com` con HTTPS (DNS en DonDominio apuntando a GitHub Pages).
- Cada push a `main` ejecuta `.github/workflows/desplegar.yml`: `npm test`, `npm run verificar` y despliegue. Si algo falla no se publica y sigue la versión anterior.

## Estado del proyecto y continuidad

La memoria del proyecto (qué está hecho, qué falta, dónde está cada copia del repositorio, decisiones y proceso de trabajo) está en `~/Documents/Claude/Proyectos/Web Formación/privado/ESTADO-DEL-PROYECTO.md`, fuera de git porque contiene material privado. **Léela al empezar cualquier sesión y actualízala al terminar cada bloque de trabajo.** Antes de publicar nada (push a `main` = despliegue público) pide confirmación al titular.
