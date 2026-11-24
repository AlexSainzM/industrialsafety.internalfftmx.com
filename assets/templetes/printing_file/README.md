# FFT México — Printing File Template

**Template Version: 1.0.0**

Base estática para documentos internos imprimibles de FFT México, conforme a [Spec 002](../../../docs/specs/002-Printing-File-Templete.md). Sigue la organización para agentes de [`form_v1`](../form_v1/README.md), con contenido documental en lugar de captura y envío de formularios.

## Archivos y responsabilidades

| Archivo | Contenido |
| --- | --- |
| `index.html` | Identidad, configuración, metadatos, tabla neutral, notas y pie. |
| `styles.css` | Estilos de pantalla, móvil, Carta/A4 y paginación. |
| `main.js` | Botón de impresión, espera acotada de imágenes y recuperación. |
| `README.md` | Contrato de uso y comprobaciones para agentes. |

HTML5 + CSS + JavaScript vanilla, sin dependencias remotas, compilación ni instalación. La fuente conserva intencionalmente marcadores `{{...}}`; es necesario configurar una copia antes de usarla. Abrirla sin configurar no es una previsualización de producción.

| Área marcada en el código | Regla |
| --- | --- |
| `TEMPLATE CORE` | Preservar en las instancias; contiene estructura, accesibilidad e impresión. |
| `TEMPLATE CONFIGURATION` | Sustituir valores y rutas sin alterar la estructura que los rodea. |
| `DOCUMENT-SPECIFIC CONTENT` | Adaptar secciones, columnas, filas y notas; estilos particulares al final del CSS. |
| `DOCUMENT-SPECIFIC LOGIC` | Agregar comportamiento del servicio al final de `main.js`, si es necesario. |

## Crear una instancia

1. Leer esta guía, la spec y los tres archivos fuente.
2. Copiar esta carpeta al servicio, por ejemplo `support/mi-servicio/print/`. No crear documentos reales dentro de la plantilla fuente.
3. Conservar el comentario y metadato de versión de origen. Definir el contenido y los datos que el servicio debe mostrar.
4. Reemplazar todos los marcadores de configuración del HTML. Escapar los valores según su contexto HTML: por ejemplo `&` → `&amp;`, `<` → `&lt;` y comillas de atributos → `&quot;`. Usar rutas locales o destinos de confianza, nunca URLs ejecutables.
5. Adaptar únicamente las áreas específicas; sustituir o eliminar los textos ficticios de la tabla, su `caption` y las notas.
6. Verificar las rutas desde la carpeta de destino: logo, `styles.css`, `main.js` y regreso. No copiar automáticamente las rutas de `form_v1`: su profundidad de destino puede ser distinta.
7. Validar una copia con datos ficticios siguiendo la lista de esta guía. Una instancia terminada no debe contener marcadores pendientes ni información del antiguo ejemplo de factura.

No se requiere un motor de interpolación. Los marcadores son instrucciones de edición para el agente, no variables JavaScript ni campos de un backend.

## Configuración: ejemplo completo

Este ejemplo supone una copia en `support/mi-servicio/print/` dentro del repositorio y una página del servicio en `support/mi-servicio/index.html`. Ajustar las rutas si cambia el destino.

| Marcador | Valor ficticio de ejemplo |
| --- | --- |
| `{{DOCUMENT_TITLE}}` | Documento de prueba |
| `{{DOCUMENT_META_DESCRIPTION}}` | Documento de prueba de impresión de FFT México. |
| `{{DOCUMENT_TYPE}}` | Comprobante interno |
| `{{DOCUMENT_REFERENCE}}` | DEMO-001 |
| `{{DOCUMENT_DATE}}` | 2 de noviembre de 2026 |
| `{{ISSUER_AREA}}` | Área de ejemplo |
| `{{RECIPIENT_LABEL}}` | Área receptora |
| `{{RECIPIENT_NAME}}` | Equipo de ejemplo |
| `{{DETAIL_TITLE}}` | Detalle del documento |
| `{{FOOTER_DESCRIPTION}}` | Servicios Internos · Documento de prueba |
| `{{LOGO_SRC}}` | ../../../assets/img/common/fft_logonormal_headers.webp |
| `{{RETURN_URL}}` | ../index.html |
| `{{RETURN_LABEL}}` | Volver al servicio |

`DOCUMENT_TITLE` se utiliza en dos lugares: reemplazar todas sus apariciones. El nombre FFT México permanece en la identidad y el título de la pestaña. No inventar RFC, domicilio, razón social fiscal ni textos legales.

La fecha y el folio pertenecen al documento: no generarlos con la fecha actual ni cambiarlos al imprimir. No hay datos reales, consultas, almacenamiento ni envíos en esta versión.

## Contenido y estados vacíos

- **Destinatario no aplicable:** eliminar toda la sección `.recipient`, incluido su encabezado. No dejar una etiqueta sin valor.
- **Folio o fecha no aplicable:** eliminar el `div` completo que contiene su `dt` y `dd`. Si se eliminan ambos, retirar el `dl.metadata` vacío. Si tampoco hay destinatario, retirar `.document-summary`.
- **Notas no aplicables:** eliminar toda la sección `.notes`.
- **Detalle no aplicable:** eliminar toda la sección `.detail`.
- **Detalle aplicable sin filas:** reemplazar el contenido de `tbody` por lo siguiente; ajustar `colspan` al número real de columnas y retirar el `caption` ficticio:

```html
<tr><td colspan="3">Sin información de detalle</td></tr>
```

No mostrar `None`, `null`, `undefined` ni valores inventados. La tabla inicial solo demuestra «Concepto», «Descripción» y «Cantidad». Al cambiar columnas, actualizar `colgroup`, encabezados, clases de alineación y `colspan`. Utilizar `th scope="col"` y, cuando corresponda, `th scope="row"`. Mantener etiquetas, títulos y orden de encabezados semánticos.

Usar `.preserve-lines` para texto con saltos de línea significativos. Los bloques largos deben fluir normalmente: no agregar alturas fijas ni `break-inside: avoid` a secciones completas de varias páginas. Las reglas existentes evitan cortar filas que caben en una página; el navegador puede dividir las que exceden una hoja.

Si una integración futura aporta datos, conservar sus nombres de origen, documentar el mapeo del servicio por separado e insertar valores como texto (`textContent`). No usar `innerHTML` con datos recibidos. Esta plantilla no agrega esa integración ni cálculos de negocio.

## Impresión y recuperación

- Abrir la página solo muestra el documento. El botón **Imprimir / Guardar como PDF** abre el diálogo nativo por acción del usuario; también funciona con teclado.
- Antes de llamar a `window.print()`, se espera la carga de las imágenes del documento hasta cinco segundos. Las imágenes fallidas o que exceden ese tiempo se ocultan; el texto FFT México permanece visible.
- Cerrar o cancelar el diálogo conserva el documento y permite repetir la acción. No se presenta una confirmación de impresión exitosa: el navegador no permite verificar ese resultado.
- Sin JavaScript, el botón permanece oculto y aparece una indicación para usar la impresión del navegador. El documento sigue siendo HTML legible e imprimible.
- La impresión nativa directa aplica los mismos estilos; si se invoca antes de terminar la carga, el navegador administra sus recursos pendientes.
- `@page` propone Carta vertical con 15 mm de margen. En el diálogo se puede elegir A4; revisar la vista previa antes de imprimir. Utilizar escala 100 % o ajustar al área imprimible según el navegador.
- Seleccionar «Guardar como PDF» como destino cuando corresponda. No hay descarga automática ni una biblioteca de PDF.
- Desactivar los encabezados/pies automáticos del navegador si se desea evitar fecha, URL o numeración añadidas por este. Estas opciones, papel, márgenes, escala y destino son decisiones del usuario en el diálogo.
- Botones y navegación no se imprimen. El pie documental fluye después del contenido; no se repite encima de las filas. Los encabezados de tabla se repiten en páginas siguientes.
- La salida debe seguir siendo legible en escala de grises y con gráficos de fondo desactivados. No se garantiza paginación idéntica entre navegadores.

## Validación antes de entregar una instancia

Servir la copia desde la raíz del repositorio con un servidor estático local, por ejemplo `python3 -m http.server 8000 --bind 127.0.0.1`, y abrir su ruta. No ejecutar envíos reales para probar esta plantilla.

- Buscar marcadores con `rg -n '\{\{[^}]+\}\}' <carpeta-de-instancia> -g '*.html' -g '*.css' -g '*.js'`; en una instancia terminada no debe haber coincidencias.
- Revisar logo, CSS, JavaScript y enlace de regreso, sin errores de consola ni peticiones externas.
- Probar escritorio y 375 px, teclado, foco visible y desplazamiento de la tabla en móvil.
- Confirmar que abrir no imprime; probar botón, cancelación, repetición y regreso al servicio.
- Probar sin JavaScript, con logo fallido, metadatos omitidos, tabla vacía, acentos, saltos de línea y palabras extensas.
- Probar una hoja y al menos tres páginas, incluyendo notas mayores que una página. Verificar filas, encabezados repetidos, pie y contenido final sin recortes ni superposiciones.
- Probar Chromium y Firefox, registrar versiones y diferencias. Generar PDF en Carta y A4, con fondos desactivados y en escala de grises; revisar visualmente todas las páginas.
- Conservar capturas, PDFs y resultados junto al informe de implementación. Distinguir pruebas automatizadas con `window.print` simulado de pruebas del diálogo nativo.

## Versionado

Usar `MAJOR.MINOR.PATCH`: corrección compatible, incremento de PATCH; capacidad reutilizable, MINOR; cambio incompatible de contrato o estructura, MAJOR. Conservar en cada instancia la versión de origen. Las mejoras comunes se realizan primero en la fuente y se propagan deliberadamente; no duplicar cambios de núcleo entre servicios.

## Validación de la versión 1.0.0 (2026-11-02)

Se verificó una copia configurada con datos ficticios en Chromium 156.0.8078.48 (Brave) y Firefox 153.0: apertura sin impresión automática, teclado, llamada de impresión repetida simulada, regreso, vista de 375 px, estilos de impresión, contenido opcional, tabla vacía, logo fallido/demorado y lectura sin JavaScript. No se detectaron errores JavaScript ni peticiones externas.

En Chromium se generaron y revisaron PDFs con fondos desactivados: documento corto de una página, 80 filas en ocho páginas en Carta y A4, notas extensas en cuatro páginas y detalle vacío. Se comprobó la conservación de las 80 filas, encabezados repetidos y márgenes. La legibilidad en gris se revisó mediante una simulación CSS de escala de grises exclusiva de las pruebas.

**Límites de la validación:** la automatización sustituyó `window.print()` al comprobar el botón. El intento de controlar la aplicación nativa agotó el tiempo de respuesta, por lo que quedan pendientes la apertura/cancelación real del diálogo, la selección manual de A4 y la salida PDF de Firefox. Las pruebas de PDF usaron el motor de impresión de Chromium; A4 se configuró mediante una regla `@page` de prueba. No se realizó despliegue ni impresión física.
