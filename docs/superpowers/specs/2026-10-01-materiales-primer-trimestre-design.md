# Materiales del primer trimestre — diseño (fase C)

**Fecha:** 2026-10-01 · **Estado:** decidido de forma autónoma durante la noche por encargo del titular («ante la duda, que no sea crítica o sea corregible, avanza»). Pendiente de revisión por el titular.

## 1. Objetivo

Llenar la web con los materiales de las unidades del primer trimestre de los tres módulos: apuntes, laboratorios interactivos para los conceptos clave y actividades. Además, dejar el esqueleto (portada de cada unidad) del resto del curso para que el alumnado vea el mapa completo.

## 2. Alcance

| Módulo | Unidades con material completo (1.er trimestre) | Resto (solo portada de unidad) |
|---|---|---|
| SOM (inglés + castellano) | UD1 Introduction to computer systems · UD2 Virtualization · UD3 Operating System Functions | UD4–UD9 |
| Sistemas Informáticos (valenciano + castellano) | UD1 Arquitectura d'equips i components de maquinari · UD2 Instal·lació de sistemes operatius · UD3 Automatització de tasques i shell scripting | UD4–UD7 |
| Proyecto Intermodular (castellano) | UD1 Sector productivo · UD2 Diseño de proyecto | UD3–UD5 |

Los nombres, contenidos, RA y CE salen de las programaciones didácticas 2026-27. Fuentes: las programaciones, los materiales del titular (copia de Moodle de SOM 25-26; materiales de SI 25-26 y 26-27, incluido su generador de sesiones) y conocimiento técnico general. El análisis de las fuentes vive en `privado/analisis/` (no se publica).

## 3. Carpetas de unidad

| Módulo | Carpetas |
|---|---|
| SOM | `ud01-introduccion`, `ud02-virtualizacion`, `ud03-funciones-sistema-operativo`, `ud04-introduccion-windows`, `ud05-introduccion-linux`, `ud06-gestion-basica-gui`, `ud07-gestion-avanzada-linux-cli`, `ud08-gestion-avanzada-windows-cli`, `ud09-sistemas-nueva-generacion` |
| SI | `ud01-hardware`, `ud02-instalacion-sistemas-operativos`, `ud03-automatizacion-scripting`, `ud04-administracion-so-usuarios`, `ud05-redes-locales`, `ud06-servicios-red`, `ud07-seguridad` |
| PI | `ud01-sector-productivo`, `ud02-diseno-proyecto`, `ud03-planificacion`, `ud04-seguimiento-control`, `ud05-sintesis-comunicacion` |

## 4. Qué lleva cada unidad del primer trimestre

| Página | Archivo | Contenido |
|---|---|---|
| Presentación | `index.md` | Para qué sirve la unidad, qué vas a aprender (RA/CE de la programación en lenguaje del alumno), duración y trimestre, mapa de la unidad con enlaces, tarjetas de sus laboratorios. |
| Apuntes | `01-…md`, `02-…md`, … (2–5 páginas) | Teoría clara con ejemplos, tablas, avisos (`:::tip`, `:::caution`), bloques de código para órdenes, un glosario de términos clave al final y 3–5 preguntas de «Comprueba lo aprendido» con la respuesta desplegable (`<details>`). 1.200–2.500 palabras por página. |
| Actividades | `actividades.md` | 4–8 actividades por unidad: objetivo, pasos, entregable (se entrega en Aules), criterios de evaluación de la programación que trabaja y dificultad. Las soluciones van a `privado/soluciones/<módulo>/<unidad>.md` y nunca se publican. |
| Laboratorios | `laboratorios/<nombre>/index.html` | 1–2 por unidad, con el estilo de los dos ejemplos: pestañas por concepto clave, simuladores, y una pestaña final de práctica con corrección al momento (hace de test de autoevaluación). |
| Planificación (solo SI) | `planificacion.md` | Plan sesión a sesión para el grupo semipresencial: fecha, presencial u online, qué se trabaja, qué hace el alumno y qué entrega. Sale del calendario y la temporalización del titular. |

Todas las páginas de SOM y SI llevan su versión `.es.md`. PI se escribe solo en castellano.

Las unidades del resto del curso llevan solo `index.md` (y `.es.md` donde toque): título, trimestre, horas, contenidos de la programación y un aviso de «en preparación».

## 5. Estilo

- **SOM:** alumnado de 1.º de CFGM (16–17 años) en programa bilingüe. Inglés claro, nivel B1–B2, frases cortas, vocabulario técnico estándar; cada página de apuntes cierra con un glosario English–Castellano. La versión en castellano es una traducción fiel, no un resumen.
- **SI:** alumnado de 1.º de CFGS DAM semipresencial: estudian sobre todo por su cuenta, así que los apuntes son más completos y autoexplicativos. Valenciano normativo (AVL/Generalitat: «este», «servix», «ací», «eixida», «maquinari»/«hardware», «programari»); términos técnicos universales sin traducir (UEFI, BIOS, SATA, PCIe, shell, script).
- **PI:** alumnado de 2.º de CFGM; castellano; orientado a producir entregables del proyecto.
- Tono cercano y directo (tú/tu/you), sin relleno. Ejemplos del mundo real y del aula.
- Nada copiado de libros ni de terceros; los materiales propios del titular sí se adaptan y traducen.
- Diagramas: si hacen falta, SVG sencillos junto a la página (`![texto alternativo](./diagrama.svg)`), legibles en modo claro y oscuro (fondo propio claro).

## 6. Laboratorios

- Contrato del kit (`public/comun/lab.js`): idioma original en el HTML, castellano en `#lab-textos`, `Lab.t` en JavaScript, controles `data-lab-*`, memoria con `Lab.leer/guardar`, metadatos `lab:*:es`.
- Identidad visual de los ejemplos (paleta verde placa + ámbar, Chakra Petch / Atkinson Hyperlegible / JetBrains Mono desde `/comun/fuentes.css`), modo claro y oscuro, móvil, teclado y lectores de pantalla.
- Autónomos: sin peticiones a terceros ni funciones de claude.ai. Tamaño orientativo ≤ 150 KB.
- Última pestaña «Practica / Pràctica / Practice» con ejercicios generados o de banco y corrección inmediata.

## 7. Verificación

- Pruebas automáticas: todos los laboratorios pasan la comprobación de contrato (descubiertos automáticamente, sin lista a mano) y una prueba de humo que los carga sin errores de JavaScript y recorre sus pestañas.
- `npm test` y `npm run verificar` en verde; enlaces sin romper; informe de pendientes sin traducciones pendientes en las unidades completadas.
- Revisión de cada unidad por un agente distinto del que la escribió: exactitud técnica, cobertura de la programación, calidad del idioma, que no haya soluciones publicadas.

## 8. Qué debe revisar el titular

1. El inglés de SOM y el valenciano de SI (prioridad: presentaciones de unidad y laboratorios).
2. La planificación semipresencial de SI (fechas).
3. Que las actividades encajan con su forma de evaluar en Aules.
4. Los nombres de las carpetas (se pueden cambiar gratis hasta publicar).
