# Spec 002 — Actualización del formulario de Taladro Eléctrico

- **Estado** Lista para implementar
- **Fecha** 2026-11-24
- **Formulario** 02040p54 — Taladro Eléctrico, Rev. 03
- **Spec relacionada** [Spec 001 — MVP Taladro Eléctrico](001-form-taladroElectrico.md)

## 1. Problema y resultado esperado

El endpoint se configura dos veces, en el atributo `action` del formulario y en una constante de JavaScript. El envío con `fetch` usa la constante, por lo que editar solo el HTML no cambia el destino. Además, Formspree recibe códigos como `COMPLIANT` en parámetros sin numerar como `taladro_tope_profundidad`.

Con esta actualización, el endpoint se configura una sola vez y Formspree recibe el resultado en español bajo el mismo nombre numerado que aparece en el formulario. Por ejemplo, al seleccionar **Cumple** en el primer criterio, el parámetro `01 - Verificar el tope de profundidad` lleva el valor `Cumple`.

El encabezado actual muestra la marca como texto y usa una jerarquía distinta a la de `form_v1`. La actualización aplica el encabezado de esa plantilla con el logo de FFT México. Al confirmar el envío, la página `thanks` muestra el mensaje de éxito, el identificador de la inspección y la acción para volver al catálogo.

## 2. Contexto y fuentes

- [Uso de Formspree y campos comunes](../PROJECT_OVERVIEW.md#44-formspree-como-persistencia-inicial)
- [Valores enviados a Formspree](../INSPECTION_MODEL.md#41-valores-enviados-a-formspree)
- [Sección 2.2 Resultado común](../FORM_LOGIC_MATRIX.md#22-resultado-común)
- [Formulario actual](../../forms/taladro-electrico/index.html) y [lógica de envío actual](../../forms/taladro-electrico/main.js)
- [Encabezado de `form_v1`](../../assets/templetes/form_v1/index.html) y [estilos base](../../assets/templetes/form_v1/styles.css)
- [Plantilla `thanks`](../../assets/templetes/form_v1/thanks/index.html), [estilos de confirmación](../../assets/templetes/form_v1/thanks/styles.css) y [guía de adaptación](../../assets/templetes/form_v1/thanks/README.md)

## 3. Alcance

La implementación abarca `forms/taladro-electrico/index.html`, `main.js` y `styles.css` para el endpoint, los resultados, la numeración y el encabezado. La confirmación se implementa en `forms/taladro-electrico/thanks/`, con una copia adaptada del HTML, CSS y JavaScript de `form_v1/thanks`. Ambas pantallas comparten el logo corporativo de `assets/img/common/`.

## 4. Fuera de alcance y restricciones

La numeración se aplica únicamente a los criterios de inspección de la herramienta. Quedan fuera los datos generales, el modelo, las evidencias, las observaciones, los metadatos, las plantillas y los demás formularios. Se conserva el orden y el contenido de los criterios existentes, así como la revisión oficial 03.

## 5. Comportamiento requerido

| ID | Situación | Resultado esperado |
| --- | --- | --- |
| RF-01 | Se configura el endpoint del Taladro Eléctrico. | El atributo `action` de `#mainForm` contiene el único marcador de configuración. JavaScript usa `form.action` como destino del `POST` y elimina su constante de endpoint. |
| RF-02 | Se muestra un criterio de inspección. | Su `legend` y el atributo `name` de las tres opciones usan el mismo texto numerado de la sección 6. El indicador visual de obligatoriedad queda fuera de `name`. |
| RF-03 | Se envía una inspección válida. | El cuerpo multipart contiene un parámetro por criterio con el valor exacto `Cumple`, `No cumple` o `No aplica`. |
| RF-04 | Se selecciona **No cumple**, cambia la respuesta o queda un criterio vacío. | Se mantiene la evidencia obligatoria por cada **No cumple**, la observación opcional, el recuento del resumen y el bloqueo del envío cuando faltan datos requeridos. El resumen y los mensajes que citan un criterio usan su texto numerado. |
| RF-05 | Formspree responde al envío. | Si la respuesta es exitosa, se abre `thanks/index.html` con el identificador de la inspección enviada. En caso de error, el usuario sigue en el formulario, conserva sus datos y puede reintentar. |
| RF-06 | Se abre el formulario en escritorio o móvil. | El encabezado sigue la barra fija y la jerarquía visual de `form_v1`, con el logo corporativo y el acceso al catálogo. |
| RF-07 | Se abre la página de confirmación después del envío. | La tarjeta de `form_v1/thanks` muestra «Inspección registrada correctamente», el identificador enviado y el botón «Volver al catálogo». |

### 5.1 Encabezado del formulario

Usar las clases y los estilos compartidos de `form_v1` para la barra fija, sus espacios y la navegación colapsable. La marca usa el logo corporativo con texto alternativo `FFT México`, altura de 30 px y proporciones originales. Tanto la marca como «Volver al catálogo» enlazan a `../../index.html`.

Aplicar la jerarquía de `form_v1` al bloque introductorio. Usar `fft-eyebrow` para el contexto documental, seguido del título del formulario, la introducción, las instrucciones y el aviso de campos obligatorios. Conservar el código 02040p54, la revisión y la fecha del documento. La barra fija y el menú móvil deben dejar visible y accesible el contenido del encabezado.

### 5.2 Pantalla de confirmación

Adaptar la cabecera de marca, el ícono de éxito, la tarjeta centrada, el bloque de detalle y el pie de página de `form_v1/thanks`. Mostrar «Inspección registrada correctamente» como encabezado principal y el identificador del registro en el bloque de detalle. El botón «Volver al catálogo» enlaza a `../../../index.html`.

La página carga Bootstrap, Bootstrap Icons, la hoja compartida `../../../assets/templetes/form_v1/styles.css`, la hoja del formulario `../styles.css` y sus propios `styles.css` y `main.js`. Resolver los marcadores de la copia para el Taladro Eléctrico.

## 6. Datos e integraciones

### 6.1 Nombres de los diez criterios

El texto de la segunda columna se usa literalmente en pantalla y en el atributo `name` de cada grupo de opciones. Incluye un espacio a cada lado del guion y conserva los acentos. El identificador técnico existente vincula cada respuesta con sus controles de evidencia y observación.

| Identificador técnico existente | Texto visible y `name` enviado a Formspree |
| --- | --- |
| `taladro_tope_profundidad` | `01 - Verificar el tope de profundidad` |
| `taladro_condicion_broca` | `02 - Verificar la condición de la broca` |
| `taladro_interruptor` | `03 - Verificar el interruptor` |
| `taladro_mango_auxiliar` | `04 - Verificar el estado del mango auxiliar` |
| `taladro_cambio_marcha` | `05 - Verificar el botón de cambio de marcha` |
| `taladro_uso_continuo` | `06 - Verificar el botón de uso continuo` |
| `taladro_broquero_muelas` | `07 - Verificar el estado del broquero y revisión de muelas` |
| `taladro_cable_alimentacion_clavija` | `08 - Verificar cable de alimentación y clavija` |
| `taladro_selector_modo` | `09 - Verificar botón selector (taladro-rotomartillo)` |
| `taladro_ruidos_motor` | `10 - Verificar ruidos extraños en el motor` |

JavaScript identifica el criterio mediante el `data-criterion-id` del `fieldset` y lee la opción marcada dentro de ese bloque. El cambio de selección, la validación, el foco, la evidencia y los conteos deben seguir funcionando con los nuevos nombres de grupo.

### 6.2 Valores enviados

Los valores de las opciones se mantienen como códigos internos para la lógica del formulario. Tras la validación y antes de ejecutar el `POST`, construir el `FormData` del formulario y sustituir el valor de cada criterio bajo el `name` de su opción marcada mediante `FormData.set`.

| Valor interno de la opción | Valor literal en la solicitud |
| --- | --- |
| `COMPLIANT` | `Cumple` |
| `NON_COMPLIANT` | `No cumple` |
| `NOT_APPLICABLE` | `No aplica` |

El cambio de nombre afecta únicamente las claves de respuesta de los diez criterios. Los archivos y observaciones conservan las claves `evidence_<identificador>` y `observation_<identificador>`. Los registros previos conservan las claves y valores de la Spec 001. El nuevo envío contiene solamente las claves numeradas para las respuestas de criterios.

### 6.3 Navegación tras el envío

Mantener el `POST` mediante `fetch` al `action` del formulario. Cuando `response.ok` confirma el envío, JavaScript guarda en `sessionStorage` únicamente el `inspection_id` enviado y navega a la ruta local `thanks/index.html`. La navegación se controla desde JavaScript y prescinde del campo `_next` del ejemplo de la plantilla.

La página `thanks` lee el identificador de esa pestaña y lo muestra como texto. Si se abre sin un registro confirmado en la pestaña, muestra un mensaje neutro y el acceso al catálogo. Un error de envío mantiene la captura abierta con el aviso y el botón para reintentar. Si falla el guardado del identificador tras la aceptación de Formspree, mostrar la confirmación en la página del formulario con el identificador y el acceso al catálogo para evitar un reenvío.

## 7. Criterios de aceptación

| ID | Requisito | Comprobación verificable |
| --- | --- | --- |
| CA-01 | RF-01 | Hay un único marcador de endpoint entre el HTML y JavaScript. Al cambiar solo `action` en el formulario de prueba, la solicitud interceptada se dirige a la nueva URL con el método `POST`. |
| CA-02 | RF-02 | Los diez criterios se muestran de `01` a `10` en el orden de la sección 6.1. Las tres opciones de cada criterio comparten el `name` exacto de su fila. Los campos ajenos a los criterios conservan sus nombres. |
| CA-03 | RF-03 | La solicitud de prueba incluye exactamente una entrada por cada clave de la sección 6.1. Para los criterios 01, 02 y 03, los valores son respectivamente `Cumple`, `No cumple` y `No aplica`. Los otros siete envían `Cumple`. |
| CA-04 | RF-04 | Omitir una respuesta o marcar **No cumple** sin evidencia bloquea el envío y señala el número del criterio. Con evidencia en el criterio 02, el resumen muestra 8 Cumple, 1 No cumple y 1 No aplica. La solicitud incluye el archivo asociado a la broca. Al cambiar ese criterio a **No aplica**, se retira la evidencia del envío y se actualiza el resumen. |
| CA-05 | RF-05 | Una respuesta exitosa simulada abre `thanks/index.html` después de un único `POST`. Un error simulado mantiene el formulario y los valores capturados, muestra el aviso y permite reintentar. |
| CA-06 | RF-06 | En escritorio y móvil, el encabezado reproduce la jerarquía y los estilos base de `form_v1`. El logo carga con las proporciones correctas, el menú móvil se abre y el vínculo de regreso lleva al catálogo. |
| CA-07 | RF-07 | La pantalla de confirmación reproduce la tarjeta, el ícono y la marca de `form_v1/thanks`. Muestra el mismo `inspection_id` del `FormData`, el botón abre el catálogo y la apertura directa en una pestaña sin confirmación muestra el mensaje neutro. |

## 8. Plan de validación

1. Revisar el diff de la futura implementación y ejecutar `node --check forms/taladro-electrico/main.js`.
2. Abrir el formulario en local, verificar las diez leyendas y completar una inspección con datos ficticios. Seleccionar **No cumple** en el criterio 02, **No aplica** en el 03 y **Cumple** en los demás.
3. Probar primero un criterio sin responder y luego una no conformidad sin archivo. Adjuntar un archivo de prueba al criterio 02 y comprobar los conteos.
4. Interceptar `fetch` en local para inspeccionar la URL, el método y las entradas de `FormData`. Simular una respuesta exitosa y un error. Repetir tras cambiar el `action` para verificar que esa configuración basta.
5. Comparar el formulario y la confirmación con sus plantillas en escritorio y móvil. Comprobar la carga del logo, los estilos, el funcionamiento del menú y los enlaces al catálogo desde ambas rutas. Verificar el identificador en la confirmación y probar su apertura directa en una pestaña sin un envío previo. Con un envío aceptado y el almacenamiento de sesión simulado como no disponible, verificar la confirmación en la página del formulario.

## 9. Convención para los demás formularios

Cada spec nueva o de actualización debe asignar un número correlativo a los criterios de inspección, empezando en `01` y con al menos dos dígitos. La leyenda y el `name` de las opciones deben compartir el formato `NN - Texto del criterio`. Cada criterio mantiene el número asignado cuando se oculta un criterio condicional. Los campos generales, la identificación, los adjuntos, las observaciones y los metadatos quedan fuera de esta numeración. Cada criterio usa un identificador técnico estable para su lógica y sus asociaciones, según el [modelo de inspección](../INSPECTION_MODEL.md#15-criterionid).

## 10. Decisiones y dependencias

La URL real del endpoint se configura en el `action` cuando esté disponible. El marcador permite implementar y validar el flujo en local con una solicitud simulada.

La ruta del logo desde el formulario es `../../assets/img/common/fft_logonormal_headers.webp` y desde la confirmación es `../../../assets/img/common/fft_logonormal_headers.webp`. Incluir el archivo en el despliegue para que cargue en las dos páginas. [Logo corporativo de FFT México](../../assets/img/common/fft_logonormal_headers.webp)

## 11. Cierre de la iteración

La implementación se dará por completada al verificar los criterios CA-01 a CA-07. La validación está pendiente de la implementación.

## 12. Historial de decisiones

| Fecha | Decisión |
| --- | --- |
| 2026-11-24 | Centralizar el endpoint en el HTML, enviar los resultados en español y usar el texto numerado como nombre de parámetro en Formspree. |
| 2026-11-24 | Aplicar el encabezado de `form_v1` y su logo corporativo, y adaptar `form_v1/thanks` para mostrar la confirmación y el identificador tras un envío exitoso. |
