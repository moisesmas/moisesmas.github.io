# Guía de edición de la web

## Dónde está cada cosa

- Cada módulo es una carpeta en `src/content/docs/docencia/…` (SOM: `smr/som`, Sistemas Informáticos: `dam/sistemas-informaticos`, Proyecto Intermodular: `smr/proyecto-intermodular`).
- Cada tema es una carpeta dentro del módulo (`ud01-introduccion`). Dentro van sus páginas `.md`, sus descargas y su carpeta `laboratorios/`.
- El orden del menú lo marca el número del principio del nombre (`01-…`, `02-…`).

## Nombres

Minúsculas, sin acentos ni espacios, con guiones: `02-instalacion-windows.md`, `p3-particiones.pdf`. El informe de pendientes avisa si alguno no cumple.

## Páginas e idiomas

- Original: `nombre.md` (inglés en SOM, valenciano en Sistemas Informáticos). Castellano: `nombre.es.md` al lado.
- Cabecera mínima de cada página:
  ```
  ---
  title: Título de la página
  ---
  ```
- Enlaces a otras páginas: siempre desde la raíz, `/docencia/smr/som/ud01-introduccion/01-teoria/` (en castellano, acabados en `/es/`).

## Bloques especiales

| Qué | Cómo |
|---|---|
| Laboratorio (tarjeta) | `::artefacto{src="numeracion"}` |
| Laboratorio incrustado | `::artefacto{src="numeracion" modo="incrustado" alto="600"}` |
| Descarga | `::descarga[Práctica 3]{src="p3-particiones.pdf"}` |
| Vídeo de YouTube | `::video[Instalar Ubuntu]{youtube="IDENTIFICADOR"}` |
| Material en Aules | `:::aules` + texto + `:::` |
| Avisos | `:::note`, `:::tip`, `:::caution`, `:::danger` + texto + `:::` |

## Presentaciones para clase

Cada página de teoría tiene su presentación para proyectar: se abre con el botón **«Presentar»** que hay bajo el título de la página (en inglés, *Present*).

- Se edita en la carpeta `diapositivas/` de la unidad, en un archivo con el mismo nombre que la página (`diapositivas/02-hypervisors.md` y `diapositivas/02-hypervisors.es.md`).
- Es Markdown normal: cada diapositiva empieza con `##` y se separa de la siguiente con una línea `---` (con una línea en blanco antes).

  ```
  ## Qué aprenderás

  - Qué hace un hipervisor
  - Tipo 1 y tipo 2

  ---

  ## Tipo 1 frente a tipo 2

  ![Dos pilas de capas](../hypervisor-types-es.svg)
  ```

- Pasos, columnas, tarjetas de laboratorio, pautas de redacción y teclas para usarla en clase: `docs/guia-diapositivas.md`.
- Si añades una página de teoría nueva, añade también su presentación: si falta, la publicación se detiene.

## Editar desde github.com (retoques)

1. Abre el archivo en el repositorio y pulsa el lápiz.
2. Cambia el texto y pulsa «Commit changes».
3. La web se actualiza sola en uno o dos minutos. Si algo está mal escrito, la publicación se detiene, la web anterior sigue visible y GitHub te avisa por correo.

## Material reservado

Soluciones y exámenes, nunca en el repositorio (es público). Van en la carpeta `privado/` (no se sube) y de ahí a Aules.

## Fin de curso

`git tag curso-2026-27 && git push origin curso-2026-27` guarda el estado del curso para poder recuperarlo.
