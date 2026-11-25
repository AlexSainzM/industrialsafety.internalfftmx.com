# Spec 004 — Formulario de Extensión Eléctrica

- **Estado** Implementada y validada en local
- **Fecha** 2026-11-25
- **Formulario** 02040p45 — Extensión Eléctrica, Rev. 03, documento del 13.10.2025
- **Specs relacionadas** [Spec 002 — Actualización del Taladro Eléctrico](002-formUpdate-taladroElectrico.md) y [Spec 003 — Sesión local de inspectores](003-UsersManagement.md)

## 1. Problema y resultado esperado

El catálogo solo publica el Taladro Eléctrico. El inspector necesita registrar la inspección de una extensión eléctrica concreta antes de usarla y enviar ese registro a su propio endpoint de Formspree.

El formulario sigue la estructura del [Taladro Eléctrico](../../forms/01-taladro-electrico/index.html). La primera sección pide el nombre del trabajador, el proyecto y el área / ubicación. La siguiente pide el modelo y el número económico. Después queda un espacio reservado para la imagen de referencia, los seis criterios y el envío.

## 2. Contexto y fuentes

- [Contexto general](../PROJECT_OVERVIEW.md)
- [Modelo común](../INSPECTION_MODEL.md)
- [Extensión eléctrica en la matriz](../FORM_LOGIC_MATRIX.md#8-02040p45--extensión-eléctrica)
- [Convención de nombres numerados](002-formUpdate-taladroElectrico.md#9-convención-para-los-demás-formularios)
- [Formulario de referencia](../../forms/01-taladro-electrico/index.html), [envío](../../forms/01-taladro-electrico/main.js) y [confirmación](../../forms/01-taladro-electrico/thanks/index.html)
- [Plantilla `form_v1`](../../assets/templetes/form_v1/index.html) y [plantilla `thanks`](../../assets/templetes/form_v1/thanks/index.html)

## 3. Alcance

La implementación crea `forms/extension-electrica/` con `index.html`, `main.js`, `styles.css` y `thanks/`, tomando como referencia `forms/01-taladro-electrico/` y sin modificar `assets/templetes/form_v1/`.

También agrega la tarjeta del catálogo en `index.html`, con el código `02040p45 · Rev. 03`, el título «Extensión Eléctrica» y el enlace `forms/extension-electrica/`.

## 4. Fuera de alcance y restricciones

Quedan fuera la firma del trabajador, el campo Semana, los criterios bloqueantes, el cálculo de APTO / NO APTO, el catálogo de activos y cualquier cambio a otros formularios. El campo Semana del formato físico no se solicita en este formulario ni en ningún otro de V1.

La redacción de los criterios 1 a 4 se conserva tal como está transcrita en la matriz. Esta spec no la reescribe ni invierte su significado.

## 5. Comportamiento requerido

| ID | Situación | Resultado esperado |
| --- | --- | --- |
| RF-01 | Se abre el formulario sin sesión, o la sesión deja de existir antes del envío. | El sitio vuelve al catálogo y no envía la inspección. |
| RF-02 | Se abre el formulario con una sesión activa. | **Nombre del trabajador** muestra el nombre completo en solo lectura. El inspector captura **Proyecto** y **Área / Ubicación** en esa primera sección. |
| RF-03 | Se identifica la extensión. | La sección siguiente exige **Modelo** y **Número económico**. Los dos campos son obligatorios. |
| RF-04 | Se muestra la referencia visual. | La sección queda visible con un placeholder para la imagen. El envío no depende de que el archivo ya exista. |
| RF-05 | Se responden los criterios 1 a 4. | Cada uno ofrece solo `Cumple`, `No cumple` y `No aplica`. **No cumple** pide evidencia antes del envío. |
| RF-06 | Se responden los criterios 5 y 6. | Cada uno es una pregunta de sí o no, obligatoria, con las opciones `Sí` y `No`. Ninguna de las dos respuestas pide evidencia. |
| RF-07 | Se envía una inspección válida. | Un solo `POST` usa el `action` del formulario. Formspree recibe los valores literales de la sección 6. Si la respuesta es exitosa, se abre `thanks/index.html` con el identificador. Si falla, el inspector conserva los datos y puede reintentar. |

### 5.1 Orden de la captura

1. Datos generales: Nombre del trabajador, Proyecto y Área / Ubicación.
2. Identificación de la extensión: Modelo y Número económico.
3. Referencia visual, con el placeholder de la imagen.
4. Criterios de inspección, del 01 al 06.
5. Resumen, validación y envío, con el mismo comportamiento de evidencia, observación opcional y confirmación que el Taladro Eléctrico.

«Nave y ubicación» del formato físico se captura en **Área / Ubicación**. No se agrega un campo separado de nave. La fecha y hora se registran en `inspection_timestamp`; no se pide Semana ni una fecha manual.

### 5.2 Imagen de referencia

Reservar la sección «Referencia visual del equipo». Mostrar un placeholder visible, con el texto «Imagen de referencia pendiente» y el texto alternativo preparado para el diagrama de la extensión eléctrica.

La ruta prevista del archivo, cuando se incorpore, es `assets/img/forms/extension-electrica/extension-electrica-referencia.png`. Hasta entonces el marcado apunta a esa ruta y el placeholder permanece visible si el archivo no carga. Esta spec no crea la imagen.

## 6. Datos e integraciones

El endpoint exclusivo de este formulario es `https://formspree.io/f/maeoagqk`. Se configura una sola vez, en el atributo `action` de `#mainForm`. JavaScript usa `form.action` como destino del `POST`.

### 6.1 Metadatos y datos generales

| Campo visible | `name` enviado a Formspree | Regla |
| --- | --- | --- |
| — | `form_id` | Valor fijo `02040p45` |
| — | `form_revision` | Valor fijo `03` |
| — | `form_slug` | Valor fijo `extension-electrica` |
| — | `form_name` | Valor fijo `Check List - Extensión Eléctrica` |
| — | `inspection_id` | Generado antes del envío |
| — | `inspection_timestamp` | Fecha y hora del evento |
| Nombre del trabajador | `worker_name` | Obligatorio, solo lectura, tomado de la sesión |
| Proyecto | `project` | Obligatorio |
| Área / Ubicación | `location` | Obligatorio |

### 6.2 Identificación

Los dos campos son obligatorios. El `name` es el texto visible, para que Formspree lo muestre de forma legible.

| Campo visible y `name` enviado a Formspree |
| --- |
| `Modelo` |
| `Número económico` |

### 6.3 Criterios

La leyenda y el `name` de las opciones comparten el texto numerado. El identificador técnico asocia la evidencia y la observación; no se envía como nombre del criterio.

| Identificador técnico | Texto visible y `name` enviado a Formspree | Opciones enviadas |
| --- | --- | --- |
| `extension_dano_cableado` | `01 - Existe daño en cableado y extensiones` | `Cumple`, `No cumple`, `No aplica` |
| `extension_dano_conector` | `02 - Existe daño en conector o clavijas` | `Cumple`, `No cumple`, `No aplica` |
| `extension_puesta_tierra` | `03 - Asegurar que cuente con cable puesta a tierra` | `Cumple`, `No cumple`, `No aplica` |
| `extension_capacidad_cable` | `04 - Capacidad del cable de acuerdo a carga de energía` | `Cumple`, `No cumple`, `No aplica` |
| `extension_carrete` | `05 - Es extensión de carrete` | `Sí`, `No` |
| `extension_gfci` | `06 - Cuenta con GFCI` | `Sí`, `No` |

Los criterios 1 a 4 conservan la lógica interna `COMPLIANT`, `NON_COMPLIANT` y `NOT_APPLICABLE`, y el envío sustituye esos códigos por `Cumple`, `No cumple` y `No aplica`. Los criterios 5 y 6 envían exactamente `Sí` o `No`, con acento en la afirmación. Esas dos respuestas no usan los tres resultados de cumplimiento y no exigen evidencia.

La evidencia de un **No cumple** en los criterios 1 a 4 viaja como `evidence_<identificador>`. La observación opcional viaja como `observation_<identificador>`.

## 7. Criterios de aceptación

| ID | Requisito | Comprobación verificable |
| --- | --- | --- |
| CA-01 | RF-01, RF-02 | Sin sesión, el enlace directo vuelve al catálogo. Con sesión, el nombre coincide con el perfil, es de solo lectura y se envía en `worker_name`. |
| CA-02 | RF-03 | El formulario muestra primero Nombre, Proyecto y Área / Ubicación, y después Modelo y Número económico. Omitir Modelo o Número económico bloquea el envío. |
| CA-03 | RF-04 | La sección de referencia muestra el placeholder. El formulario puede enviarse aunque la imagen no cargue. |
| CA-04 | RF-05 | Un criterio 01 a 04 sin respuesta, o con **No cumple** sin archivo, bloquea el envío e indica el criterio. Con evidencia, el archivo viaja asociado a ese criterio. |
| CA-05 | RF-06 | Los criterios 05 y 06 solo ofrecen `Sí` y `No`. Elegir `No` no muestra evidencia y no bloquea el envío. |
| CA-06 | RF-07 | La solicitud de prueba va por `POST` a `https://formspree.io/f/maeoagqk` e incluye `Modelo`, `Número económico`, los seis `name` de la sección 6.3 y los valores literales elegidos. No incluye Semana ni firma. Una respuesta exitosa simulada abre la confirmación con el mismo `inspection_id`. |

## 8. Plan de validación

1. Revisar el diff y ejecutar `node --check forms/extension-electrica/main.js`.
2. Servir la raíz del repositorio por HTTP e iniciar sesión en el catálogo. Abrir Extensión Eléctrica y comprobar el orden de las secciones, el nombre de solo lectura y el placeholder de la imagen.
3. Completar Proyecto, Área / Ubicación, Modelo y Número económico. Dejar vacío cada campo obligatorio por separado y confirmar que el envío se bloquea.
4. Responder los criterios 01, 02 y 03 con `Cumple`, `No cumple` y `No aplica`. Adjuntar un archivo solo al criterio 02. Responder 04 con `Cumple`, 05 con `Sí` y 06 con `No`.
5. Interceptar `fetch` en local y comprobar la URL, el método y los valores de `FormData`. Confirmar que 05 y 06 envían `Sí` y `No`, y que no aparece evidencia del criterio 06. Simular éxito y error. El éxito debe abrir `thanks/index.html`; el error debe conservar la captura.

Durante la validación local, la solicitud se intercepta y no se envía al endpoint real.

## 9. Documentación y rutas afectadas

- [Matriz, sección de Extensión Eléctrica](../FORM_LOGIC_MATRIX.md#8-02040p45--extensión-eléctrica) y [regla de Semana](../FORM_LOGIC_MATRIX.md#26-tiempo)
- [Contexto general](../PROJECT_OVERVIEW.md)
- [Regla temporal del modelo](../INSPECTION_MODEL.md#3-regla-temporal)

La implementación prevista toca `forms/extension-electrica/` y la tarjeta correspondiente en `index.html`.

## 10. Decisiones abiertas y riesgos

| Tema | Decisión | ¿Bloquea implementación? |
| --- | --- | --- |
| Criterios 5 y 6 | Se responden y se envían como `Sí` o `No`. | No |
| Modelo y número económico | Ambos obligatorios, con `name` `Modelo` y `Número económico`. | No |
| Nave y ubicación | Se usa solo **Área / Ubicación**, como en el Taladro Eléctrico. | No |
| Semana | No se solicita en este ni en ningún otro formulario. | No |
| Firma | Fuera de alcance. | No |
| Endpoint | `https://formspree.io/f/maeoagqk`, solo en el `action`. | No |
| Imagen | Placeholder visible hasta incorporar el archivo. | No |
| Redacción de los criterios 1 y 2 | Se conserva el texto de la fuente. No se sustituye por una frase en positivo. | No |
| Criterios bloqueantes | Siguen sin clasificar, como en el resto de V1. | No |

## 11. Cierre de la iteración

- **Estado final** Disponible desde el catálogo en `forms/extension-electrica/`.
- **Criterios satisfechos** CA-01 a CA-06, verificados en Brave con vistas de escritorio y móvil.
- **Informe de validación** `node --check` pasó en ambos scripts. Se verificaron la sesión, los campos obligatorios, la evidencia por criterio y las claves y valores del `POST` interceptado. Un error HTTP 503 conservó la captura y el reintento mostró el mismo `inspection_id` en la confirmación.
- **Pendiente** Incorporar el archivo de la imagen de referencia. El formulario muestra «Imagen de referencia pendiente» hasta que cargue.

## 12. Historial de decisiones

| Fecha | Decisión |
| --- | --- |
| 2026-11-25 | Los criterios 5 y 6 se envían como `Sí` o `No`. Modelo y número económico son obligatorios y usan esos nombres legibles en Formspree. |
| 2026-11-25 | La primera sección repite Nombre, Proyecto y Área / Ubicación del Taladro Eléctrico. Semana no se solicita en ningún formulario. La firma queda fuera de alcance. |
| 2026-11-25 | El endpoint es `https://formspree.io/f/maeoagqk`. La referencia visual queda como placeholder. Los criterios 1 a 4 conservan la redacción de la fuente. |
