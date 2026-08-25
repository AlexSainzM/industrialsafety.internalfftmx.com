# SPEC-01 — MVP Taladro Eléctrico

**Estado:** Ready for implementation  
**Tipo:** Feature  
**Formulario origen:** 02040p54 — Check List Taladro Eléctrico  
**Revisión origen:** Rev. 03  
**Fecha documento origen:** 13.10.2025  
**Iteración:** 01

---

# 1. Objetivo

Implementar la primera inspección funcional del proyecto:

**Check List — Taladro Eléctrico**

Esta implementación servirá como referencia inicial para validar:

- estructura de formularios;
- reutilización de la plantilla FFT;
- modelo de inspección;
- respuestas normalizadas;
- validaciones;
- evidencia de no conformidades;
- generación de metadata;
- integración con Formspree;
- navegación desde el catálogo principal.

Esta Spec NO debe intentar resolver todavía autenticación,
usuarios, roles, catálogo de activos ni consulta de submissions.

---

# 2. Documentación obligatoria

Antes de realizar cualquier cambio, leer en este orden:

1. `docs/PROJECT_OVERVIEW.md`
2. `docs/INSPECTION_MODEL.md`
3. `docs/FORM_LOGIC_MATRIX.md`
4. esta Spec
5. `assets/templates/form_v1/`
6. código existente relacionado

La implementación debe respetar las invariantes definidas en
`INSPECTION_MODEL.md`.

Si existe una contradicción entre esta Spec y los documentos
estables, detener la implementación y reportarla.

---

# 3. Alcance

La iteración debe:

1. crear el formulario digital de Taladro Eléctrico;
2. utilizar la plantilla existente `form_v1` como referencia;
3. implementar los diez criterios del documento oficial;
4. utilizar respuestas normalizadas;
5. solicitar evidencia cuando exista un `No cumple`;
6. impedir el envío mientras falte evidencia requerida;
7. preparar el formulario para utilizar su propio endpoint de Formspree;
8. conservar metadata del documento oficial;
9. mostrar una imagen de referencia del taladro y sus componentes;
10. permitir regresar al catálogo principal;
11. añadir el Taladro Eléctrico al catálogo de inspecciones disponible.

---

# 4. Fuera de alcance

NO implementar en esta iteración:

- login;
- logout;
- usuarios;
- roles;
- permisos;
- backend propio;
- base de datos propia;
- API de lectura de Formspree;
- dashboard de Seguridad Industrial;
- historial de inspecciones;
- catálogo de taladros;
- catálogo de activos;
- códigos QR;
- edición de submissions;
- criterios bloqueantes;
- cálculo de APTO / NO APTO;
- notificaciones;
- firma digital;
- firma manuscrita;
- semanas acumulativas;
- matrices de lunes a domingo.

---

# 5. Archivos esperados

Crear:

```text
forms/
└── taladro-electrico/
    ├── index.html
    ├── main.js
    └── styles.css
```

Utilizar como referencia:

```text
assets/templates/form_v1/
```

Utilizar la imagen:

```text
assets/images/forms/taladro-electrico/
└── taladro-electrico-referencia.png
```

Modificar el `index.html` principal únicamente lo necesario para
agregar el acceso al formulario Taladro Eléctrico.

---

# 6. Regla sobre la plantilla

`assets/templates/form_v1/` es una plantilla.

NO modificar directamente los archivos de la plantilla para construir
este formulario.

El formulario de Taladro Eléctrico debe implementarse dentro de:

`forms/taladro-electrico/`

Si durante la implementación se identifica una mejora que debería
convertirse en comportamiento común de la plantilla, documentarla,
pero no modificar la plantilla dentro de esta Spec salvo que sea
absolutamente necesario.

---

# 7. Unidad de inspección

Una submission representa:

> La inspección de un taladro eléctrico específico realizada por un
> trabajador en un momento determinado antes de su utilización.

NO representar varias semanas ni varios días dentro de una misma
submission.

---

# 8. Metadata del formulario

La submission debe conservar como mínimo:

```text
form_id = 02040p54
form_revision = 03
form_slug = taladro-electrico
form_name = Check List - Taladro Eléctrico
inspection_id
inspection_timestamp
```

`inspection_id` debe generarse antes del envío.

No es necesario que sea criptográficamente seguro.

Debe ser suficientemente único para poder distinguir registros.

---

# 9. Datos generales

Solicitar al usuario:

### Nombre del trabajador

Campo:

```text
worker_name
```

Obligatorio.

---

### Proyecto

Campo:

```text
project
```

Obligatorio.

---

### Área / Ubicación

Campo:

```text
location
```

Obligatorio.

---

### Modelo

Campo:

```text
drill_model
```

Obligatorio.

Debe conservarse aunque todavía no exista un catálogo centralizado
de herramientas.

---

# 10. Fecha y hora

No solicitar al usuario que complete manualmente columnas de:

- semana;
- lunes;
- martes;
- miércoles;
- jueves;
- viernes;
- sábado;
- domingo.

Registrar automáticamente la fecha y hora correspondientes al evento
de inspección mediante:

```text
inspection_timestamp
```

Puede mostrarse la fecha al usuario como información de contexto.

---

# 11. Criterios

Implementar exactamente los siguientes diez conceptos del documento
oficial.

Cada criterio debe tener un `criterionId` estable.

---

## TAL-01

**Texto visible**

Verificar el tope de profundidad.

**ID**

```text
taladro_tope_profundidad
```

---

## TAL-02

**Texto visible**

Verificar la condición de la broca.

**ID**

```text
taladro_condicion_broca
```

---

## TAL-03

**Texto visible**

Verificar el interruptor.

**ID**

```text
taladro_interruptor
```

---

## TAL-04

**Texto visible**

Verificar el estado del mango auxiliar.

**ID**

```text
taladro_mango_auxiliar
```

---

## TAL-05

**Texto visible**

Verificar el botón de cambio de marcha.

**ID**

```text
taladro_cambio_marcha
```

---

## TAL-06

**Texto visible**

Verificar el botón de uso continuo.

**ID**

```text
taladro_uso_continuo
```

---

## TAL-07

**Texto visible**

Verificar el estado del broquero y revisión de muelas.

**ID**

```text
taladro_broquero_muelas
```

---

## TAL-08

**Texto visible**

Verificar cable de alimentación y clavija.

**ID**

```text
taladro_cable_alimentacion_clavija
```

---

## TAL-09

**Texto visible**

Verificar botón selector (taladro-rotomartillo).

**ID**

```text
taladro_selector_modo
```

---

## TAL-10

**Texto visible**

Verificar ruidos extraños en el motor.

**ID**

```text
taladro_ruidos_motor
```

---

# 12. Estados de respuesta

Cada criterio debe permitir únicamente:

```text
COMPLIANT
NON_COMPLIANT
NOT_APPLICABLE
```

Mostrar al usuario:

```text
Cumple
No cumple
No aplica
```

NO utilizar como valores internos:

```text
P
X
✓
SI
NO
NA
```

---

# 13. Comportamiento de no conformidad

Cuando el usuario seleccione:

```text
NON_COMPLIANT
```

para cualquier criterio, debe aparecer inmediatamente un campo de
evidencia asociado a ese criterio.

Ejemplo conceptual:

```text
Cable de alimentación y clavija

[ Cumple ] [ No cumple ] [ No aplica ]

No cumple seleccionado

Evidencia de la condición encontrada *
[ Seleccionar archivo ]
```

---

# 14. Evidencia obligatoria

Debe cumplirse la invariante:

```text
NON_COMPLIANT => evidence required
```

Si existe cualquier criterio con:

```text
result = NON_COMPLIANT
```

sin evidencia asociada:

```text
SUBMISSION INVALID
```

El formulario NO debe enviarse.

La validación debe indicar al usuario claramente en qué criterio falta
la evidencia.

---

# 15. Archivos de evidencia

Implementar el campo mediante un mecanismo compatible con el envío de
archivos utilizado por Formspree.

No implementar almacenamiento propio.

No utilizar servicios adicionales.

No incrustar credenciales o secretos en JavaScript.

---

# 16. Observaciones

No hacer obligatorio un comentario textual para una no conformidad.

Puede incluirse un campo opcional de observaciones asociado a la
no conformidad si la plantilla ya soporta este comportamiento de
forma sencilla.

La evidencia continúa siendo obligatoria.

No convertir observación y evidencia en el mismo concepto.

---

# 17. Imagen de referencia

Mostrar al usuario la imagen:

```text
assets/images/forms/taladro-electrico/
taladro-electrico-referencia.png
```

La imagen tiene como objetivo ayudar a identificar visualmente los
componentes del taladro relacionados con la inspección.

Debe mostrarse dentro del formulario en una sección como:

```text
Referencia visual del equipo
```

La imagen:

- debe ser responsive;
- no debe deformarse;
- debe ser legible en desktop;
- debe adaptarse a pantallas móviles;
- no debe bloquear el llenado del formulario;
- no debe convertirse en fondo del formulario;
- debe conservar su proporción original.

Puede utilizarse:

```css
max-width: 100%;
height: auto;
```

o el mecanismo equivalente de Bootstrap.

No es necesario implementar zoom en esta iteración.

---

# 18. Orden recomendado de interfaz

Mantener aproximadamente este flujo:

```text
Encabezado FFT
     ↓
Título del formulario
     ↓
Información breve
     ↓
Datos generales
     ↓
Identificación del taladro
     ↓
Referencia visual
     ↓
Criterios de inspección
     ↓
Validación
     ↓
Resumen
     ↓
Enviar
```

La plantilla existente debe seguir siendo la principal referencia
visual.

---

# 19. Resumen antes del envío

Antes del envío debe existir un paso o sección de confirmación que
permita al usuario revisar como mínimo:

- trabajador;
- proyecto;
- ubicación;
- modelo;
- fecha;
- criterios con `No cumple`;
- cantidad de no conformidades.

No es necesario construir un wizard complejo si la plantilla actual
no lo requiere.

El objetivo es evitar envíos accidentales.

---

# 20. Resultado agregado

Calcular antes del envío:

```text
total_criteria
compliant_count
non_compliant_count
not_applicable_count
has_non_compliances
```

Para este formulario:

```text
total_criteria = 10
```

No calcular:

```text
APTO
NO APTO
```

Seguridad Industrial todavía no ha definido los criterios bloqueantes.

---

# 21. Formspree

Este formulario tendrá un endpoint exclusivo de Formspree.

No utilizar el endpoint de otro formulario.

Como todavía puede no estar definido el endpoint definitivo, utilizar
un placeholder claramente identificable:

```text
FORMSPREE_TALADRO_ENDPOINT
```

o equivalente.

Debe ser sencillo localizarlo y reemplazarlo posteriormente.

No ocultarlo dentro de lógica innecesariamente compleja.

---

# 22. Payload

Además de los valores necesarios para Formspree, la submission debe
permitir identificar claramente:

```text
form_id
form_revision
form_slug

inspection_id
inspection_timestamp

worker_name
project
location
drill_model

taladro_tope_profundidad
taladro_condicion_broca
taladro_interruptor
taladro_mango_auxiliar
taladro_cambio_marcha
taladro_uso_continuo
taladro_broquero_muelas
taladro_cable_alimentacion_clavija
taladro_selector_modo
taladro_ruidos_motor

compliant_count
non_compliant_count
not_applicable_count
has_non_compliances
```

Cuando exista evidencia debe poder relacionarse inequívocamente con
el criterio correspondiente.

---

# 23. Catálogo principal

El `index.html` principal debe mostrar al menos una opción para:

```text
Taladro Eléctrico
```

que dirija a:

```text
forms/taladro-electrico/
```

No construir todavía un sistema complejo de búsqueda, filtros o
categorías.

Esta primera tarjeta/enlace servirá también como referencia para
futuros formularios.

---

# 24. Navegación

El formulario debe incluir una opción clara para volver al catálogo
principal.

No depender exclusivamente del botón Back del navegador.

---

# 25. Responsive

La implementación debe funcionar correctamente como mínimo en:

- desktop;
- tablet;
- smartphone.

Evitar reproducir la tabla horizontal del documento PDF.

Cada criterio debe ser legible y seleccionable cómodamente en móvil.

---

# 26. Accesibilidad básica

Los controles deben:

- tener labels;
- ser navegables mediante teclado;
- mantener contraste adecuado;
- no depender únicamente del color;
- asociar correctamente mensajes de error con sus campos.

Los estados:

```text
Cumple
No cumple
No aplica
```

deben incluir texto visible.

---

# 27. Validación

Antes del envío comprobar:

```text
worker_name != empty
project != empty
location != empty
drill_model != empty
```

Los 10 criterios deben tener una respuesta.

Por cada:

```text
NON_COMPLIANT
```

debe existir evidencia.

No permitir envío si alguna de estas condiciones falla.

---

# 28. Manejo de errores

Si Formspree responde con error:

- no limpiar el formulario;
- informar al usuario;
- conservar los datos capturados mientras sea posible;
- permitir intentar nuevamente.

No mostrar únicamente errores técnicos como:

```text
HTTP 422
```

Mostrar un mensaje comprensible para el usuario.

---

# 29. Envío exitoso

Después de una submission exitosa:

mostrar una confirmación clara.

Como mínimo:

```text
Inspección registrada correctamente.
```

Mostrar también el `inspection_id` si resulta práctico.

No redirigir inmediatamente sin confirmación.

---

# 30. JavaScript

Mantener JavaScript simple y explícito.

Puede contener funciones independientes para:

```text
initializeInspection()
generateInspectionId()
handleCriterionChange()
updateEvidenceRequirement()
validateForm()
calculateSummary()
prepareSubmission()
handleSubmit()
```

Los nombres son orientativos.

No construir todavía un framework o motor universal de formularios.

---

# 31. CSS

El formulario debe reutilizar la mayor cantidad razonable de la
identidad visual existente.

`styles.css` del formulario debe contener principalmente ajustes
específicos necesarios para Taladro Eléctrico.

Evitar copiar grandes cantidades de CSS sin necesidad.

---

# 32. No modificar innecesariamente

Evitar cambios fuera de:

```text
forms/taladro-electrico/
assets/images/forms/taladro-electrico/
index.html
```

Si se identifica la necesidad de cambiar archivos globales adicionales,
reportarlo antes de expandir el alcance.

---

# 33. Criterios bloqueantes

Todos los criterios permanecen inicialmente con:

```text
blocking = null
```

No inferir criticidad.

No impedir conceptualmente el uso del equipo por decisión automática
del software.

El sistema únicamente debe registrar objetivamente las no
conformidades.

---

# 34. Pruebas manuales obligatorias

Antes de considerar terminada la Spec comprobar los siguientes casos.

## TC-01 — Happy path

Completar todos los datos.

Marcar los 10 criterios como `Cumple`.

Resultado esperado:

```text
submission válida
non_compliant_count = 0
```

---

## TC-02 — No aplica

Marcar al menos un criterio:

```text
NOT_APPLICABLE
```

Resultado esperado:

se permite el envío.

---

## TC-03 — No cumple sin evidencia

Marcar:

```text
taladro_cable_alimentacion_clavija =
NON_COMPLIANT
```

No adjuntar archivo.

Resultado esperado:

```text
submission bloqueada
```

y mensaje indicando que falta evidencia.

---

## TC-04 — No cumple con evidencia

Marcar:

```text
taladro_cable_alimentacion_clavija =
NON_COMPLIANT
```

Adjuntar evidencia.

Resultado esperado:

se permite continuar.

---

## TC-05 — Varias no conformidades

Marcar dos criterios:

```text
NON_COMPLIANT
```

Adjuntar evidencia solamente a uno.

Resultado esperado:

```text
submission bloqueada
```

Debe identificar cuál criterio continúa sin evidencia.

---

## TC-06 — Criterio sin responder

Dejar uno de los diez criterios vacío.

Resultado esperado:

```text
submission bloqueada
```

---

## TC-07 — Campo general vacío

Eliminar `worker_name`, `project`, `location` o `drill_model`.

Resultado esperado:

```text
submission bloqueada
```

---

## TC-08 — Error Formspree

Simular o provocar un fallo de envío.

Resultado esperado:

- mensaje de error;
- información capturada conservada;
- posibilidad de reintentar.

---

## TC-09 — Responsive

Probar visualmente aproximadamente en:

```text
375px
768px
>= 1200px
```

La imagen y los criterios deben permanecer utilizables.

---

## TC-10 — Navegación

Entrar desde:

```text
/
```

al formulario y regresar nuevamente al catálogo.

Resultado esperado:

navegación funcional sin conocer directamente la URL del formulario.

---

# 35. Definition of Done

La Spec se considera completada únicamente cuando:

- existe `forms/taladro-electrico/`;
- funciona desde el catálogo principal;
- contiene los diez criterios;
- utiliza estados normalizados;
- todos los criterios son obligatorios;
- `No cumple` activa evidencia;
- evidencia es obligatoria para cada no conformidad;
- funciona con múltiples no conformidades;
- muestra la imagen de referencia;
- genera `inspection_id`;
- registra timestamp;
- genera los conteos de resultados;
- mantiene metadata de 02040p54 Rev. 03;
- existe placeholder claramente identificable para Formspree;
- no contiene secretos;
- funciona en móvil;
- muestra confirmación de envío;
- maneja errores de envío;
- supera TC-01 a TC-10;
- no implementa elementos fuera del alcance.

---

# 36. Restricciones para el agente

NO:

- rediseñar todo el repositorio;
- introducir React, Vue, Angular u otro framework;
- introducir dependencias sin necesidad;
- crear un backend;
- inventar criterios;
- eliminar criterios;
- decidir criterios bloqueantes;
- replicar la cuadrícula semanal;
- implementar autenticación;
- construir la pantalla de revisión;
- modificar silenciosamente la plantilla global.

Si algún requisito resulta técnicamente incompatible con el código
actual, informar el problema antes de sustituirlo por otra solución.

---

# 37. Resultado esperado de la iteración

Al terminar esta Spec debe existir el primer flujo completo:

```text
Catálogo
   ↓
Taladro Eléctrico
   ↓
Identificación
   ↓
Referencia visual
   ↓
10 criterios
   ↓
No conformidad
   ↓
Evidencia obligatoria
   ↓
Resumen
   ↓
Formspree
   ↓
Confirmación
```

Esta implementación será utilizada como referencia para decidir qué
comportamiento debe posteriormente promoverse al formulario base y qué
comportamiento debe permanecer específico de cada checklist.
