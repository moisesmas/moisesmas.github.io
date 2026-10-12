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
- Nada de soluciones ni exámenes en el repo: `privado/`.

## Trampas conocidas

- Starlight con `lang: 'es-ES'`, no `'es'` (si no, 404 en `/es/` en desarrollo).
- Astro 7 usa Sätteri: los plugins remark no se aplican.
- El validador de enlaces no entiende `…/es`; lo resuelve `src/lib/enlaces.ts`.
- `archivosContenido()` debe ir antes que Starlight en `integrations`.
- Al renombrar un tema ya publicado, añadir `redirects` en `astro.config.mjs` para no romper enlaces de Aules.
- El validador de enlaces de Starlight solo acepta enlaces a archivos; los enlaces a la carpeta de un laboratorio los excluye `carpetaConIndiceExiste` (`src/lib/enlaces.ts`) solo cuando la carpeta tiene un `index.html`.
- Happy-dom nunca dispara `DOMContentLoaded` tras `document.write`, y el comentario de cabecera de `public/comun/lab.js` contiene un `</script>` literal: `tests/unit/laboratorios-humo.test.ts` resuelve ambos casos.

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

## Publicación

- Repositorio público `moisesmas/moisesmas.github.io` (nombre de «sitio de usuario» para servir en la raíz). Dominio `moisesmas.com` con HTTPS (DNS en DonDominio apuntando a GitHub Pages).
- Cada push a `main` ejecuta `.github/workflows/desplegar.yml`: `npm test`, `npm run verificar` y despliegue. Si algo falla no se publica y sigue la versión anterior.
