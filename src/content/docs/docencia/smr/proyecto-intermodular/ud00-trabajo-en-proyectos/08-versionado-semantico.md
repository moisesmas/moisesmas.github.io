---
title: "1.3.4 Versionado semántico"
description: "Cómo numerar las versiones con MAYOR.MENOR.PARCHE según la especificación Semantic Versioning 2.0.0: cuándo subir cada número, preversiones, precedencia y cómo se relaciona con el registro de cambios."
---

Si una aplicación pasa de la versión «3» a la «4», ¿qué ha cambiado? ¿Hay que reinstalar todo? ¿Se romperá la integración que hicimos el año pasado? Sin un criterio común, el número de versión es solo un adorno. El **versionado semántico** (*Semantic Versioning*, abreviado **SemVer**) le da **significado** al número: con solo mirarlo sabes qué riesgo tiene actualizar.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 25 minutos de lectura y 15 de práctica.

1. Lee las secciones 1 a 4.
2. Abre la pestaña «Versionado» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#versionado): marca cambios y mira qué versión resulta.
3. Lee las secciones 5 y 6 y responde a las preguntas.
:::

## 1. La idea: tres números con significado

La especificación **Semantic Versioning 2.0.0** propone numerar las versiones con tres números separados por puntos:

```text
MAYOR.MENOR.PARCHE
  2  .  4  .  1
```

| Número | Se sube cuando… | Ejemplo |
|---|---|---|
| **MAYOR** (*major*) | Haces cambios **incompatibles** con lo anterior | Cambias el formato en que otros programas piden datos al portal |
| **MENOR** (*minor*) | Añades funcionalidad **compatible** con lo anterior | Añades el filtro por estado en el listado de incidencias |
| **PARCHE** (*patch*) | Corriges errores **sin cambiar** lo que ofrece el programa | Arreglas que el correo de aviso salía con la fecha mal |

La palabra clave es **compatible**. Decimos que un cambio es compatible si quien ya usaba tu programa (o tu biblioteca, o tu API) puede actualizar sin tener que cambiar nada por su lado.

### La «interfaz pública»

Para hablar de compatibilidad hay que decidir **qué se considera público**: las funciones que otros pueden llamar, los formatos de datos, las órdenes de línea de comandos, los puntos de acceso de una API web... Eso es la **interfaz pública** (en la especificación, la *API pública*). Un cambio interno que nadie ve (reorganizar el código) no la afecta.

En un proyecto de clase, decide qué es público en tu producto y anótalo en la documentación: es lo que te permite decir si un cambio es compatible o no.

## 2. Las reglas, paso a paso

Estas son las reglas más importantes de la especificación, explicadas con nuestras palabras:

1. **Una versión publicada no se modifica.** Si hay que cambiar algo, se publica una versión nueva. Es lo que permite confiar en que «la 1.4.2» es siempre lo mismo.
2. Los tres números son **enteros no negativos**, sin ceros a la izquierda (1.04.0 no es válido).
3. **Al subir un número, los de su derecha vuelven a cero.** De 1.4.7 con una funcionalidad nueva se pasa a 1.5.0, no a 1.5.7. De 1.5.0 con un cambio incompatible se pasa a 2.0.0.
4. **Parche (1.4.1 → 1.4.2):** solo correcciones de errores compatibles.
5. **Menor (1.4.2 → 1.5.0):** funcionalidad nueva compatible. También se sube cuando algo se declara **obsoleto** (*deprecated*: se avisa de que desaparecerá en el futuro). Puede incluir correcciones de errores.
6. **Mayor (1.5.0 → 2.0.0):** cualquier cambio incompatible. Puede incluir también cambios menores y parches.
7. **Versión 0.y.z: desarrollo inicial.** Todo puede cambiar en cualquier momento, y no hay garantías de estabilidad. Se pasa a **1.0.0** cuando se publica la primera versión estable que otros usan, y a partir de ahí se siguen las reglas anteriores.

### Ejemplo con el portal de Byte Alacant

Imagina que el portal de incidencias de *Reparaciones Byte Alacant* (empresa ficticia) ofrece una interfaz para que la aplicación del taller consulte el estado de las reparaciones. Esta es su historia:

| Versión | Qué cambió | Por qué ese número |
|---|---|---|
| **0.1.0** | Primera versión de prueba: registrar incidencia | Desarrollo inicial |
| **0.2.0** | Se añade ver mis incidencias | Funcionalidad nueva (todavía en 0.x) |
| **1.0.0** | Primera versión estable para clientes | Se declara estable la interfaz pública |
| **1.0.1** | Se corrige que el estado «Cerrada» se mostraba como «Cerrado» | Corrección sin cambiar la interfaz |
| **1.1.0** | Se añade el filtro por fecha | Funcionalidad nueva, compatible |
| **1.1.1** | Se corrige un error en el filtro por fecha | Parche |
| **1.2.0** | Se marca como obsoleto el campo `telefono` (se usará `contacto`); sigue funcionando | Obsolescencia: menor |
| **2.0.0** | Se elimina el campo `telefono` | Cambio incompatible: mayor |

## 3. Preversiones y metadatos de compilación

Antes de publicar una versión definitiva se pueden publicar versiones de prueba. La especificación permite añadir una **preversión** con un guion detrás del PARCHE:

```text
1.0.0-alpha
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1
```

Se suelen usar estas etiquetas (por convención, no obligatorias): `alpha` (muy inestable, circulación interna), `beta` (casi completa, se prueba con usuarios voluntarios) y `rc` (*release candidate*: candidata a definitiva; si no aparecen fallos, será la versión final).

También se pueden añadir **metadatos de compilación** con un `+`:

```text
1.0.0+20260930
1.0.0-beta.1+build.42
```

Los metadatos de compilación **no influyen** en el orden de las versiones.

### Cómo se ordenan las versiones (precedencia)

Para saber cuál es más nueva, se comparan en este orden: MAYOR, luego MENOR, luego PARCHE (como números, no como texto: 1.10.0 es mayor que 1.9.0). Una **preversión es menor** que la versión definitiva a la que precede. Un ejemplo de orden creciente:

```text
1.0.0-alpha  <  1.0.0-alpha.1  <  1.0.0-beta  <  1.0.0-beta.2  <  1.0.0-beta.11  <  1.0.0-rc.1  <  1.0.0
```

Las partes de la preversión separadas por puntos se comparan una a una: las numéricas como números (`beta.2` < `beta.11`) y las que tienen letras, alfabéticamente. Una parte numérica es siempre menor que una con letras.

## 4. ¿Qué número toca? Reglas prácticas

Cuando varios cambios van en la misma versión, **manda el más fuerte**:

| Si entre los cambios hay… | La versión sube… |
|---|---|
| Al menos un cambio incompatible | MAYOR (y MENOR y PARCHE a 0) |
| Ninguno incompatible, pero alguna función nueva compatible (u obsolescencia) | MENOR (y PARCHE a 0) |
| Solo correcciones de errores | PARCHE |
| Solo documentación, comentarios o reorganización interna sin efecto externo | Normalmente no hace falta versión nueva; si se publica, PARCHE |

Ejemplos desde la versión **2.3.4**:

| Cambios incluidos | Siguiente versión |
|---|---|
| Un error corregido | 2.3.5 |
| Un error corregido + una función nueva compatible | 2.4.0 |
| Una función nueva + un cambio incompatible | 3.0.0 |
| Una función obsoleta | 2.4.0 |

:::caution[Un error frecuente]
Cuando el cambio incompatible es pequeño («solo he cambiado el nombre de un campo»), la tentación es hacer parche. Pero si alguien que ya usaba el campo actualiza, su programa se rompe: eso es MAYOR. El tamaño del cambio no importa; importa si **rompe** algo a quien ya lo usaba.
:::

## 5. Versiones y registro de cambios

El número de versión dice *cuánto riesgo* hay, pero no *qué* cambió. Para eso existe el **registro de cambios** (*changelog*): un archivo (normalmente `CHANGELOG.md`) donde se anota, versión por versión, lo que se ha hecho. Un formato muy extendido agrupa los cambios en categorías:

| Categoría | Qué se anota |
|---|---|
| **Añadido** | Funciones nuevas |
| **Cambiado** | Cambios en funciones existentes |
| **Obsoleto** | Funciones que desaparecerán |
| **Eliminado** | Funciones que se han quitado |
| **Corregido** | Errores arreglados |
| **Seguridad** | Cambios por vulnerabilidades |

Ejemplo:

```md
## [1.2.0] - 2026-10-14
### Añadido
- Filtro por fecha en el listado de incidencias.
### Obsoleto
- El campo `telefono`; usa `contacto`.

## [1.1.1] - 2026-10-02
### Corregido
- El estado «Cerrada» se mostraba como «Cerrado».
```

Consejos:

- La versión más reciente va **arriba**.
- Cada versión lleva su **fecha**.
- Está escrito **para personas**, no es un volcado de los mensajes del repositorio.
- Una buena práctica: ir anotando en una sección «Sin publicar» durante el trabajo y pasarla a una versión concreta al publicar.

### Etiquetas en Git

En un repositorio Git, cada versión publicada se marca con una **etiqueta** (*tag*), normalmente con una `v` delante: `v1.2.0`. Verás cómo se crean en 2.2 Git: fundamentos. Así se puede volver exactamente a lo que se publicó.

### Mensajes de commit y versión (opcional)

Algunos equipos escriben los mensajes de los *commits* con un formato convencional (por ejemplo, `feat:` para una función nueva, `fix:` para un error) que permite deducir la versión: `fix` → PARCHE, `feat` → MENOR, y un cambio incompatible indicado de forma especial → MAYOR. Es una práctica opcional y complementaria; el versionado semántico no la exige.

## 6. Limitaciones

- **No es una ciencia exacta.** Decidir qué es «público» y qué «incompatible» requiere criterio, sobre todo en sistemas complejos.
- **No vale para todo.** En una aplicación que solo usan personas (sin que otros programas dependan de ella) a veces se numera por fecha o por hitos del producto. Lo importante es que el criterio sea claro y esté explicado.
- **Las versiones mayores no son marketing.** Subir a 2.0.0 no significa «mucho mejor»: significa «incompatible con lo anterior».

## Comprueba lo aprendido

1. La versión actual es 3.7.2. Se corrige un error sin tocar la interfaz. ¿Cuál es la siguiente?

   <details>
   <summary>Respuesta</summary>

   3.7.3 (parche).
   </details>

2. La versión actual es 3.7.3 y se añade una función nueva compatible. ¿Y ahora?

   <details>
   <summary>Respuesta</summary>

   3.8.0: sube el MENOR y el PARCHE vuelve a 0.
   </details>

3. Desde 3.8.0 se elimina una función de la interfaz pública y además se añade otra nueva. ¿Qué versión resulta?

   <details>
   <summary>Respuesta</summary>

   4.0.0: hay un cambio incompatible, que manda sobre los demás; MENOR y PARCHE vuelven a 0.
   </details>

4. Ordena de menor a mayor: 1.0.0, 1.0.0-rc.1, 0.9.5, 1.0.0-beta.2.

   <details>
   <summary>Respuesta</summary>

   0.9.5 < 1.0.0-beta.2 < 1.0.0-rc.1 < 1.0.0.
   </details>

5. ¿Qué significa que la versión sea 0.x.y?

   <details>
   <summary>Respuesta</summary>

   Que el producto está en desarrollo inicial: cualquier cosa puede cambiar y no hay garantía de compatibilidad.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **Versionado semántico (SemVer)** | Criterio de numeración MAYOR.MENOR.PARCHE donde cada número tiene un significado. |
| **MAYOR** | Número que sube con cambios incompatibles. |
| **MENOR** | Número que sube con funcionalidad nueva compatible. |
| **PARCHE** | Número que sube con correcciones de errores compatibles. |
| **Interfaz pública (API)** | Lo que otros usan de tu producto y que debe mantenerse estable. |
| **Preversión** | Versión previa a la definitiva (`alpha`, `beta`, `rc`). |
| **Obsoleto (*deprecated*)** | Función que sigue existiendo pero se avisa de que desaparecerá. |
| **Registro de cambios (*changelog*)** | Archivo que explica qué cambió en cada versión. |
| **Etiqueta (*tag*)** | Marca en el repositorio que señala una versión publicada. |
| **Precedencia** | Orden entre versiones. |
