# Spec 003 — Sesión local de inspectores

- **Estado** Implementada y validada en local
- **Fecha** 2026-11-24
- **Specs relacionadas** [Spec 001 — MVP Taladro Eléctrico](001-form-taladroElectrico.md) y [Spec 002 — Actualización del formulario](002-formUpdate-taladroElectrico.md)

## 1. Problema y resultado esperado

Un grupo pequeño de inspectores contestará los checklists durante el piloto. Actualmente, cada persona tiene que escribir su nombre al comenzar una inspección. Con esta actualización, el inspector inicia sesión en el catálogo, selecciona un checklist y encuentra su nombre completo en un campo de solo lectura. Formspree recibe ese nombre como parte de la inspección y los revisores consultan los registros desde Notion.

## 2. Contexto y alcance

El sitio sigue siendo estático. La entrada por el catálogo y el formulario de Taladro Eléctrico, único checklist publicado en el catálogo actual, comparten el manejo de sesión en JavaScript. Los formularios que se incorporen al catálogo deben aplicar la misma regla para `worker_name`. Cada formulario mantiene su endpoint de Formspree.

La captura se limita a la sesión local y al envío a Formspree. El piloto prescinde de un backend, permisos por rol, recuperación de claves, administración de cuentas en el sitio y un visor de registros. La consulta desde Notion se realiza fuera del sitio y la configuración de su integración queda fuera de esta iteración.

- [Catálogo](../../index.html)
- [Formulario de Taladro Eléctrico](../../forms/taladro-electrico/index.html)
- [Módulo compartido de sesión](../../assets/js/inspector-session.js)

## 3. Comportamiento requerido

| ID | Situación | Resultado esperado |
| --- | --- | --- |
| RF-01 | Se abre el catálogo sin una sesión. | Se muestran los campos Usuario y Clave. Al coincidir ambos con un registro que tenga nombre completo, aparece el catálogo con el nombre del inspector y la acción Cerrar sesión. |
| RF-02 | Las credenciales son incorrectas o falla la carga del directorio. | Se informa el error, se borra la clave del campo y se puede volver a intentar. El catálogo sigue oculto. |
| RF-03 | Se navega o recarga dentro de la misma pestaña. | La sesión local se conserva. Cerrar sesión en el catálogo vuelve a mostrar el acceso y elimina el perfil de la pestaña. |
| RF-04 | Se abre un formulario sin sesión, o la sesión cambia antes de enviarlo. | El sitio dirige al catálogo y evita el envío desde ese formulario. |
| RF-05 | Se abre un formulario con una sesión activa. | El nombre completo de la sesión se muestra en **Nombre del trabajador** como solo lectura y aparece en el resumen de Taladro Eléctrico. |
| RF-06 | Se envía una inspección válida. | El único dato del perfil que se envía a Formspree es el nombre completo en `worker_name`. |

## 4. Datos y operación del piloto

[El directorio](../../data/users.json) contiene un arreglo de objetos. Cada perfil tiene tres cadenas.

| Clave | Uso |
| --- | --- |
| `usuario` | Identificador único. La interfaz recorta espacios al principio y al final del valor escrito y compara exactamente el resto. |
| `clave` | Clave de acceso del piloto. La comparación conserva mayúsculas, minúsculas y espacios. |
| `nombre` | Nombre completo que se muestra en el catálogo y se envía como `worker_name`. |

El navegador lee el directorio en cada intento de inicio de sesión. Para dar de alta o actualizar un perfil, editar `data/users.json` y volver a publicar el archivo junto con el sitio. Los cambios se aplican al iniciar sesión de nuevo. La pestaña conserva únicamente el usuario y el nombre completo en `sessionStorage`.

El archivo JSON y sus claves son legibles desde el navegador. Las claves deben ser específicas de este piloto y quedar separadas de cualquier contraseña corporativa o de otro servicio. La sesión local facilita la captura y puede modificarse desde el navegador. La aplicación carece de verificación de identidad en el servidor.

Para probar el flujo en local, servir la raíz del repositorio por HTTP, por ejemplo con `python3 -m http.server 8000`, y abrir `http://localhost:8000/`. Los módulos JavaScript y el directorio deben quedar disponibles desde el mismo origen.

## 5. Criterios de aceptación

| ID | Comprobación |
| --- | --- |
| CA-01 | Una cuenta del directorio abre el catálogo y muestra su nombre. La clave incorrecta, un directorio inaccesible o un JSON con estructura inválida dejan disponible el acceso para reintentar. |
| CA-02 | Una recarga conserva la sesión en la misma pestaña. En una pestaña nueva independiente, el enlace directo a Taladro Eléctrico vuelve al catálogo para iniciar sesión. |
| CA-03 | Al cerrar sesión se oculta el catálogo. Al entrar con otra cuenta, el siguiente formulario muestra el nombre de esa cuenta. Si se borra la sesión antes de enviar, no se realiza la solicitud. |
| CA-04 | El campo **Nombre del trabajador** muestra el nombre completo, es de solo lectura y coincide con el resumen. |
| CA-05 | La solicitud multipart simulada incluye `worker_name` y carece de campos de acceso. La exigencia de evidencia por **No cumple**, el reintento tras un error y la confirmación tras el éxito siguen operativos. |

## 6. Validación

Se verificaron los criterios CA-01 a CA-05 en Brave con anchos de 1280 y 390 píxeles. Las pruebas cargaron el directorio local y simularon respuestas exitosas y fallidas de Formspree para inspeccionar el contenido del envío y comprobar la confirmación. Se comprobó la sintaxis de los módulos JavaScript con `node --check`.

## 7. Documentación relacionada

- [Visión general y alcance de V1](../PROJECT_OVERVIEW.md)
- [Contexto y campos comunes de inspección](../INSPECTION_MODEL.md#7-contexto-de-inspección)
- [Matriz de lógica de formularios](../FORM_LOGIC_MATRIX.md#27-datos-generales-comunes)
