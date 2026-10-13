---
title: "2.4.1 Google Docs y la suite colaborativa"
description: "Cómo trabajar varias personas en un mismo documento en la nube: edición simultánea, comentarios y sugerencias, historial de versiones, permisos y formas de compartir, plantillas y carpeta compartida de equipo."
---

El documento clásico viajaba por correo: «te lo paso, me lo devuelves con tus cambios». Resultado: tres versiones, cambios que se pierden y nadie sabe cuál es la buena. Las **suites ofimáticas en la nube**, como la de **Google** (Documentos, Hojas de cálculo, Presentaciones), cambian la lógica: **hay un único documento**, alojado en la nube, que todo el equipo abre y edita a la vez. Esta página explica los conceptos; sirven en Google Docs y, con otros nombres, en cualquier editor colaborativo.

:::note[Las interfaces cambian]
Los menús, las funciones y los límites de uso de estas aplicaciones cambian con frecuencia. Aquí se explican los **conceptos y hábitos de trabajo**, no las pantallas. Para una opción concreta, usa la ayuda oficial de la aplicación.
:::

## 1. Edición simultánea

Varias personas pueden abrir el mismo documento **al mismo tiempo**. Cada una ve el cursor de las demás (con su color y su nombre) y los cambios aparecen en tiempo real. Se guarda automáticamente; no hay botón «Guardar» ni archivos duplicados.

Ventajas para un proyecto: nadie tiene que esperar a que otro termine, el documento siempre está actualizado y se evita el «¿cuál es la última versión?». Pero también hay que ponerse de acuerdo para no pisarse:

- **Reparte secciones**: cada persona es responsable de unos apartados; no reescribas el de otro sin avisar.
- **Estructura primero**: acordad el índice (títulos y subtítulos) antes de escribir. Los estilos de título permiten generar el índice automático.
- **Usa los estilos** (Título 1, Título 2, texto normal) en lugar de ajustar tamaños a mano: así el documento mantiene coherencia aunque lo toquen cuatro personas.
- **Comunícate en el propio documento** con comentarios, no por mensajes externos.

## 2. Comentarios y sugerencias

Son las dos herramientas clave para revisar el trabajo de otra persona **sin modificar su texto**.

| Herramienta | Qué hace | Cuándo usarla |
|---|---|---|
| **Comentario** | Se ancla a un fragmento de texto; la conversación queda debajo | Preguntas, dudas, aclaraciones: «¿de dónde sale este dato?» |
| **Mención en comentario** | Avisa a una persona (`@nombre`) y puede asignarle una acción | «@Marta, ¿puedes completar la tabla?» |
| **Sugerencia** (modo sugerir) | Tus cambios aparecen como propuestas que el propietario acepta o rechaza | Correcciones concretas: cambiar una frase, arreglar una errata |
| **Resolver** | Cierra el hilo de un comentario cuando está atendido | Al terminar la discusión |

El **modo sugerencia** es lo equivalente a «control de cambios»: el texto original sigue visible y cada propuesta se puede aceptar o rechazar por separado. Cuando revises el trabajo de otras personas, **sugiere, no sobrescribas**.

:::tip[Buen comentario]
«Falta la fuente de este porcentaje; añade el enlace o la referencia.» es accionable. «No me convence» no lo es.
:::

## 3. Historial de versiones

El documento recuerda su evolución. En el **historial de versiones** puedes:

- Ver **quién cambió qué y cuándo**, con un color por persona.
- **Volver** a una versión anterior si alguien borró algo por error.
- **Darle nombre** a una versión importante («Entrega 1», «Versión revisada por el profesor») para poder encontrarla.
- **Copiar** una versión antigua como documento nuevo sin perder la actual.

Esto cambia la forma de trabajar: **perder cambios es difícil**, y atreverse a editar es menos arriesgado. Aun así, antes de una gran reestructuración, nombra la versión actual.

## 4. Permisos y formas de compartir

Un documento no lo ve nadie salvo su propietario hasta que lo compartes. Los niveles de permiso habituales son:

| Permiso | Puede |
|---|---|
| **Lector** | Ver el documento |
| **Comentarista** | Ver y comentar o sugerir |
| **Editor** | Ver, editar y, según la configuración, compartir con otras personas |

Hay dos formas de compartir:

1. **Con personas concretas** (por su correo). Es lo más seguro: solo entran quienes tú indiques y quedan identificados en el historial.
2. **Con un enlace**: cualquiera que lo tenga (o cualquiera de una organización) puede abrir el documento con el permiso que fijes. Es cómodo, pero **un enlace circula**: si se reenvía, el acceso se amplía sin que lo controles.

Buenas prácticas:

- **Mínimo permiso necesario.** Lector o comentarista por defecto; editor solo a quien trabaja en el documento.
- **Para entregar trabajos**, comparte con quien corresponda siguiendo las instrucciones del profesor (a veces se pide enlace y a veces el archivo exportado en PDF).
- **Revisa quién tiene acceso** antes de dar el documento por cerrado, y retira permisos cuando ya no hagan falta.
- **Documentos con datos sensibles** (credenciales, datos de clientes): no los compartas con enlace público.
- **Cuidado con el propietario:** si el creador del documento se va del centro o borra su cuenta, el documento puede quedar inaccesible. Para trabajos de equipo, lo mejor es crearlo en una **carpeta compartida** del equipo.

## 5. Plantillas

Si el equipo hace siempre el mismo tipo de documento (acta de reunión, informe de avance, manual), crea una **plantilla**: un documento modelo con la estructura y los estilos, que se copia para cada nuevo caso. Ventajas: coherencia, ahorro de tiempo y que nadie olvide apartados. Un ejemplo para actas:

```text
Acta de reunión · Proyecto «Portal de incidencias»
Fecha:                Asistentes:
Orden del día:
Acuerdos (qué, quién, cuándo):
Pendiente para la próxima reunión:
```

Las páginas del bloque 3 de esta unidad (documentación del proyecto) te darán más modelos.

## 6. Trabajar en una carpeta compartida

Una **carpeta compartida** en la nube es la «mesa» del equipo. Una estructura propuesta:

```text
Portal de incidencias/
├── 01-gestion/        (actas, plan, planificación)
├── 02-diseno/         (requisitos, diagramas, prototipos)
├── 03-desarrollo/     (documentación técnica, instalación)
├── 04-entregas/       (versiones finales en PDF)
└── 99-archivo/        (lo obsoleto, por si acaso)
```

Y unas normas de uso:

1. **Nombres de archivo con criterio**: `2026-10-14-acta-reunion.docx` o `manual-usuario-v1`. Sin espacios raros, sin «definitivo_final2».
2. **Una sola ubicación** por documento: no tengas copias sueltas.
3. **Edita los documentos en línea**, no descargues, modifiques y subas otra copia: así se rompe el trabajo simultáneo.
4. **Entregas en PDF** en la carpeta de entregas, para que nadie las modifique por error.
5. **No guardes en la carpeta compartida** contraseñas o datos personales.
6. Si el proyecto usa código, **el código vive en el repositorio (Git)**, no en una carpeta de documentos: los documentos son una cosa; el código, otra.

## 7. Otras ventajas y precauciones

- **Exportar:** casi siempre se puede descargar el documento como PDF, como formato de procesador de texto o como texto sin formato. Hazlo para entregas.
- **Trabajo sin conexión:** algunas aplicaciones lo permiten si lo habilitas con antelación. No des por hecho que funcione.
- **Hojas de cálculo y presentaciones:** funcionan con los mismos principios. Es habitual llevar en una hoja compartida el presupuesto del proyecto, los registros de horas o el inventario de equipos.
- **Privacidad:** el contenido vive en servidores de terceros. Respeta la política del centro y no subas información de clientes reales.

## Comprueba lo aprendido

1. ¿Cuál es la diferencia entre comentar y sugerir?

   <details><summary>Respuesta</summary>

   El comentario abre una conversación sobre un fragmento sin tocar el texto. La sugerencia propone un cambio concreto dentro del texto, que el propietario acepta o rechaza.

   </details>

2. Alguien borra por error dos páginas del documento compartido. ¿Cómo se soluciona?

   <details><summary>Respuesta</summary>

   Abriendo el historial de versiones, localizando una versión anterior a la eliminación y restaurándola, o copiando de ella el fragmento necesario.

   </details>

3. ¿Por qué es mejor compartir con personas concretas que con un enlace abierto?

   <details><summary>Respuesta</summary>

   Porque solo accede quien tú indicas y queda identificado. El enlace puede reenviarse y ampliar el acceso sin que lo controles.

   </details>

4. ¿Por qué conviene crear el documento en una carpeta compartida del equipo y no en tu espacio personal?

   <details><summary>Respuesta</summary>

   Porque si el propietario se va o borra su cuenta, el documento podría perderse. En una carpeta del equipo el acceso no depende de una sola persona.

   </details>

## Glosario

| Término | Definición |
|---|---|
| Edición simultánea | Varias personas editan a la vez el mismo documento |
| Comentario | Nota anclada a un fragmento que abre una conversación |
| Sugerencia | Cambio propuesto que se acepta o se rechaza sin perder el original |
| Historial de versiones | Registro de cambios que permite ver y restaurar versiones antiguas |
| Permiso | Nivel de acceso a un documento: lector, comentarista o editor |
| Plantilla | Documento modelo que se copia para crear otros con la misma estructura |
