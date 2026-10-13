---
title: "3.3 Documentación técnica"
description: "Los cuatro documentos técnicos de un proyecto informático: documento de diseño, plan de pruebas, guía de instalación y despliegue, y documentación del código, con plantillas y ejemplos."
---

Cuando un técnico se va de vacaciones, enferma o cambia de empresa, lo único que queda de su trabajo es lo que dejó **escrito**. La documentación técnica es el seguro de continuidad de un proyecto: permite que otra persona entienda cómo está hecho (diseño), compruebe que funciona (pruebas), lo ponga en marcha (instalación) y lo modifique (código documentado). Esta página presenta los cuatro documentos básicos.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 50 minutos de lectura y 2 horas de práctica.

1. Lee las secciones 1 y 2. Rellena la pestaña «Plan de pruebas» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#pruebas).
2. Lee las secciones 3 y 4 y busca los errores del ejemplo en la pestaña «Guía de instalación» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/documentos-del-proyecto/#instalacion).
3. Haz el reto 3 de las [actividades](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/actividades-documentacion/).
:::

El ejemplo de la página es el **portal de incidencias** de la empresa ficticia **Reparaciones Byte Alacant, S. L.**: una aplicación web donde los clientes abren y consultan incidencias.

## 1. Documento de diseño

El **documento de diseño** explica **cómo** se va a construir (o se ha construido) el producto. Se escribe para tres lectores: el equipo (para ponerse de acuerdo), quien lo mantenga en el futuro y quien evalúe el proyecto. Se centra en decisiones y en el porqué, no en repetir el código.

### Estructura recomendada

| Apartado | Qué contiene | Ejemplo |
|---|---|---|
| **Alcance y contexto** | Qué problema resuelve y qué queda fuera | Portal para clientes; no incluye facturación |
| **Arquitectura** | Piezas del sistema y cómo se comunican | Navegador, servidor web, base de datos |
| **Modelo de datos** | Qué información se guarda y cómo se relaciona | Cliente, Equipo, Incidencia |
| **Interfaces** | Pantallas principales y conexiones con otros sistemas | Formulario de alta, listado, detalle |
| **Decisiones** | Alternativas consideradas y por qué se eligió una | Base de datos relacional por su sencillez de copia |
| **Seguridad y datos personales** | Quién accede a qué y cómo se protegen los datos | Acceso con usuario y contraseña |

### Arquitectura: un diagrama vale más que tres párrafos

Un diagrama sencillo de cajas y flechas, acompañado de una frase por caja, suele bastar:

```text
[ Navegador del cliente ] --HTTPS--> [ Servidor web ] ---> [ Base de datos ]
                                           |
                                           +---> [ Servicio de correo ]
```

Cada flecha debería tener una etiqueta (protocolo, tipo de dato). Si no sabes etiquetarla, probablemente aún no has decidido cómo se comunican las dos piezas.

### Modelo de datos

Basta con las **entidades**, sus campos principales y las relaciones:

```text
Cliente (id, nombre_empresa, correo_contacto, telefono)
Equipo (id, cliente_id, tipo, modelo, numero_serie)
Incidencia (id, equipo_id, descripcion, urgencia, estado, fecha_alta)

Un Cliente tiene muchos Equipos.
Un Equipo tiene muchas Incidencias.
```

Para las interfaces, un **boceto** a mano de cada pantalla (en papel, escaneado) es suficiente en un proyecto pequeño. Lo importante es que el equipo vea lo mismo.

:::note[El diseño cambia]
El documento de diseño no es un papel que se firma y se olvida. Si durante el desarrollo cambia una decisión, se actualiza el documento y se anota el motivo. Un diseño que no coincide con el producto es peor que no tener ninguno.
:::

## 2. Plan de pruebas

Probar es comprobar que el producto hace lo que los requisitos dicen. El **plan de pruebas** es el documento que dice **qué** se prueba, **cómo**, **dónde** y **cuándo se considera superado**. Cada criterio de aceptación del backlog (véase 3.1 Requisitos y Product Backlog) da lugar a uno o más casos de prueba.

### Partes del plan

| Parte | Qué responde |
|---|---|
| **Objetivo y alcance** | ¿Qué parte del producto se prueba y cuál no? |
| **Entorno** | ¿En qué máquina, con qué versión y con qué datos de prueba? |
| **Casos de prueba** | ¿Qué pruebas concretas se ejecutan? |
| **Criterios de entrada y salida** | ¿Cuándo empezamos y cuándo damos por buena la prueba? |
| **Responsables y calendario** | ¿Quién prueba y cuándo? |
| **Registro de resultados** | ¿Qué salió y qué fallos se abrieron? |

### Casos de prueba

Un **caso de prueba** es una receta que cualquier persona pueda repetir y que da siempre el mismo veredicto. Debe llevar:

| Campo | Ejemplo (CP-03) |
|---|---|
| **Identificador** | CP-03 |
| **Requisito que comprueba** | PB-02 Consultar el estado |
| **Precondiciones** | Existe el cliente «Taller Sur» con una incidencia en estado «En reparación» |
| **Pasos** | 1. Iniciar sesión como Taller Sur. 2. Abrir «Mis incidencias». 3. Pulsar sobre la incidencia |
| **Resultado esperado** | Se muestra el estado «En reparación» y la fecha del último cambio |
| **Resultado obtenido** | (se rellena al ejecutar) |
| **Estado** | Pendiente / Superado / Fallido / Bloqueado |

Buenos hábitos al diseñar casos:

- Prueba el **camino normal** y también los **errores**: un campo vacío, un dato absurdo, un usuario sin permiso.
- Prueba los **límites**: el valor más pequeño y el mayor admitidos.
- Un caso comprueba **una cosa**. Si el resultado esperado tiene tres «y», trocea el caso.
- El resultado esperado se escribe **antes** de ejecutar la prueba, no después de ver qué ha pasado.

### Tipos de prueba

| Tipo | Qué comprueba | Quién la hace |
|---|---|---|
| **Unitaria** | Una función o pieza pequeña de forma aislada | Quien programa |
| **De integración** | Que varias piezas funcionan juntas (aplicación y base de datos) | El equipo |
| **Funcional / de aceptación** | Que se cumplen los criterios de aceptación | El equipo y el cliente |
| **No funcional** | Rendimiento, seguridad, usabilidad | Quien tenga los medios |
| **De regresión** | Que lo que funcionaba sigue funcionando tras un cambio | El equipo, repitiendo casos anteriores |

### Resumen de la ejecución

Al terminar, se resume: casos totales, superados, fallidos, bloqueados y pendientes, y qué fallos se han abierto. El laboratorio calcula este resumen por ti. Un porcentaje de superados no vale por sí solo: un solo fallo grave en un caso crítico puede impedir la entrega aunque el 95 % haya pasado.

## 3. Guía de instalación y despliegue

La **guía de instalación** permite que alguien que no ha participado en el proyecto lo ponga en marcha por su cuenta. **Despliegue** es llevar el producto a un entorno donde se usa de verdad (el servidor de la empresa, no tu portátil). Una guía incompleta es la causa más habitual de que «en mi máquina funciona».

### Estructura

| Apartado | Qué contiene |
|---|---|
| **Qué se instala** | Nombre y versión del producto, y una frase de qué es |
| **Requisitos previos** | Sistema operativo, software con su versión, espacio, puertos, cuentas y permisos necesarios |
| **Obtención** | De dónde se descarga o clona el producto, y cómo comprobar que es el correcto |
| **Pasos de instalación** | Numerados, en orden, con las órdenes exactas y el resultado esperado de cada paso |
| **Configuración** | Qué ajustes hay que cambiar (nunca con contraseñas reales en el documento) |
| **Verificación** | Cómo comprobar que quedó bien instalado |
| **Actualización y copia de seguridad** | Cómo actualizar sin perder datos y qué copiar antes |
| **Solución de problemas** | Los fallos más probables, su causa y su remedio |
| **Desinstalación** | Cómo retirarlo limpiamente |

### Cómo escribir los pasos

Una orden por paso, con el resultado esperado a continuación:

```bash
# Paso 3. Instalar las dependencias (debe terminar sin errores)
npm install

# Paso 4. Copiar el archivo de configuración de ejemplo
cp .env.ejemplo .env
# Edita .env y escribe la dirección de tu base de datos.

# Paso 5. Arrancar la aplicación
npm start
# Resultado esperado: "Servidor escuchando en el puerto 3000"
```

### Verificación y problemas

Después de instalar, el lector debe poder responder «sí» a una comprobación concreta: «al abrir `http://localhost:3000` aparece la pantalla de acceso». Y una tabla de problemas conocidos le ahorra una llamada:

| Síntoma | Causa probable | Solución |
|---|---|---|
| `EADDRINUSE` al arrancar | El puerto 3000 ya lo usa otro programa | Cierra el otro programa o cambia el puerto en `.env` |
| La página carga pero no muestra datos | La aplicación no conecta con la base de datos | Revisa la dirección y las credenciales en `.env` |

:::caution[Nunca secretos en la documentación]
Contraseñas, claves y tokens **no** se escriben en la guía ni se suben al repositorio. Se documenta **dónde** se configuran («pídele la contraseña al administrador») y se entregan por un canal aparte.
:::

### Errores típicos de una guía

- Dar por hecho un programa que no se menciona entre los requisitos.
- Omitir la versión («instala Node» sin decir cuál).
- Saltarse un paso que «es obvio».
- Orden mal puesto: configurar antes de instalar.
- No decir cómo se comprueba que ha funcionado.
- Copiar órdenes que solo valen para un sistema operativo sin avisar.

La pestaña «Guía de instalación» del laboratorio te da una guía con varios de estos fallos para que los detectes.

## 4. Documentación del código

El código se lee muchas más veces de las que se escribe. Documentarlo bien no significa llenarlo de comentarios, sino ayudar a quien venga después (o a ti dentro de seis meses).

### Nombres que explican

El mejor comentario es un nombre claro. Compara:

```text
x = f(d, 0.21)                      # ¿qué es x, f y d?
total_con_iva = sumar_iva(base, 0.21)
```

Reglas prácticas: nombres descriptivos y consistentes, mismo idioma en todo el proyecto, y funciones cortas que hagan una sola cosa.

### Comentarios útiles

Un comentario debe aportar lo que el código **no** dice: el **porqué**.

| Comentario inútil | Comentario útil |
|---|---|
| `# suma 1 al contador` | `# El servidor cuenta desde 1 porque el sistema antiguo numeraba así` |
| `# bucle de clientes` | `# Se procesa en lotes de 50 para no saturar el servicio de correo` |

Si el código es tan confuso que necesita un comentario para entenderse, primero intenta reescribirlo; si no es posible, entonces coméntalo.

### README

El **README** es la puerta de entrada del repositorio. Debe responder en una pantalla:

1. **Qué es** el proyecto y para qué sirve.
2. **Cómo instalarlo y ejecutarlo** (o un enlace a la guía de instalación).
3. **Cómo usarlo**, con un ejemplo mínimo.
4. **Cómo contribuir** o a quién preguntar.
5. **Licencia** y autoría.

### Documentación de una API

Si el producto ofrece una **API** (un conjunto de operaciones que otros programas pueden invocar), cada operación se documenta con: para qué sirve, qué parámetros recibe y de qué tipo, qué devuelve y qué errores puede dar, con un ejemplo de petición y respuesta. Muchos lenguajes permiten escribir esa documentación junto al código con comentarios de formato especial y generar un documento a partir de ellos. Consulta la ayuda de tu lenguaje para el formato exacto.

```text
Operación: abrir una incidencia
Dirección: POST /incidencias
Recibe (JSON): { "equipo_id": 12, "descripcion": "No arranca", "urgencia": "parado" }
Devuelve (201): { "id": 481, "estado": "recibida" }
Errores: 400 si falta la descripción; 401 si no hay sesión iniciada
```

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre el documento de diseño y la guía de instalación?

   <details><summary>Respuesta</summary>

   El de **diseño** explica cómo está construido el producto y por qué (para entenderlo y modificarlo). La **guía de instalación** explica cómo ponerlo en marcha (para usarlo). Se dirigen a lectores y momentos distintos.
   </details>

2. Este caso de prueba es defectuoso: «Pasos: probar que el login funciona. Resultado esperado: que funcione bien». ¿Por qué?

   <details><summary>Respuesta</summary>

   Los pasos no son repetibles (no dice con qué usuario ni qué datos) y el resultado esperado no es verificable («bien» no es un resultado concreto). Debe indicar usuario, contraseña de prueba, acciones exactas y qué pantalla o mensaje aparece.
   </details>

3. Señala dos fallos de esta orden de una guía: «Instala la base de datos y configúrala».

   <details><summary>Respuesta</summary>

   Falta la **versión** y las **órdenes concretas** (agrupa dos acciones en un paso), y no indica cómo **comprobar** que quedó bien. Debe dividirse en pasos con una orden cada uno y su resultado esperado.
   </details>

4. ¿Por qué no se deben escribir contraseñas en un README?

   <details><summary>Respuesta</summary>

   Porque el repositorio puede verlo mucha gente y queda guardado en el historial. Se documenta dónde se configuran y se entregan por un canal seguro aparte.
   </details>

5. ¿Qué comentario es mejor: «# incrementa i» o «# se reintenta tres veces porque el servicio de correo falla a veces»?

   <details><summary>Respuesta</summary>

   El segundo: explica el **porqué**, que no se deduce del código. El primero repite lo que ya dice la instrucción.
   </details>

## Glosario

| Término | Definición |
|---|---|
| Documento de diseño | Documento que describe la arquitectura, los datos y las interfaces de un producto, y las decisiones tomadas |
| Arquitectura | Piezas principales de un sistema y la forma en que se comunican |
| Modelo de datos | Descripción de la información que se guarda y de sus relaciones |
| Plan de pruebas | Documento que define qué se prueba, cómo, dónde y cuándo se supera |
| Caso de prueba | Receta repetible con precondiciones, pasos y resultado esperado |
| Prueba de regresión | Repetición de pruebas para comprobar que un cambio no estropeó lo que funcionaba |
| Despliegue | Puesta del producto en el entorno donde se usará de verdad |
| README | Archivo de entrada del repositorio que explica qué es el proyecto y cómo usarlo |
| API | Conjunto de operaciones que un programa ofrece para que otros programas las usen |
