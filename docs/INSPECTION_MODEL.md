# FFT Industrial Safety Checklists

## INSPECTION_MODEL

**Estado:** Draft
**Versión:** 0.1
**Fecha:** 2026-08-25

---

# 1. Propósito

Este documento define el modelo funcional común utilizado por todas las inspecciones del sistema.

Su propósito es evitar que cada formulario implemente de manera independiente conceptos como:

* inspección;
* criterio;
* resultado;
* evidencia;
* identificación;
* no conformidad;
* criterio bloqueante;
* elemento inspeccionado.

Este documento define el **dominio** y las reglas comunes de envío a Formspree. Cada Spec detalla los parámetros particulares de su formulario.

---

# 2. Unidad principal: Inspection

La unidad principal del sistema es una `Inspection`.

Una `Inspection` representa:

> La evaluación de una herramienta, equipo, conjunto, sistema, área u operación realizada por una persona en un momento determinado.

Cada envío del formulario debe representar una inspección independiente.

---

# 3. Regla temporal

Los checklists físicos pueden contener:

* días;
* semanas;
* turnos;
* múltiples columnas de inspección.

La aplicación no debe replicar ese almacenamiento acumulativo.

Cada inspección digital debe registrar su propio momento.

Como mínimo:

```text
inspectionDate
inspectionTime
```

o un valor equivalente:

```text
inspectionTimestamp
```

La implementación debe permitir reconstruir posteriormente cuándo ocurrió la inspección.

---

# 4. Identificador de inspección

Cada submission debería contar con un identificador único de inspección.

Conceptualmente:

```text
inspectionId
```

Ejemplo:

```text
INSP-20260825-135403-A7F2
```

El formato exacto puede definirse posteriormente.

El identificador debe:

* generarse antes del envío;
* ser suficientemente único;
* viajar junto con la submission;
* poder mostrarse posteriormente en la consulta.

---

# 5. Identificación del formulario

Toda inspección debe indicar qué formulario la produjo.

Como mínimo:

```text
formId
formRevision
```

Ejemplo conceptual:

```text
formId: 02040p54
formRevision: 03
```

Opcionalmente:

```text
formSlug: taladro-electrico
formName: Check List - Taladro Eléctrico
```

Esto permite distinguir posteriormente registros creados mediante diferentes revisiones de un mismo checklist.

---

# 6. Estructura conceptual de una inspección

El dominio debe poder representarse de manera equivalente a:

```text
Inspection
│
├── identity
│   ├── inspectionId
│   ├── formId
│   ├── formRevision
│   └── timestamp
│
├── context
│   ├── worker
│   ├── project
│   ├── location
│   └── activity
│
├── inspectedItems[]
│
├── responses[]
│
├── generalObservation
│
└── resultMetadata
```

No todos los campos aplican a todos los formularios.

---

# 7. Contexto de inspección

Todos los formularios deben solicitar y enviar los tres campos obligatorios del Taladro Eléctrico.

| Campo visible | Campo del modelo | Parámetro de Formspree |
|---|---|---|
| Nombre del trabajador | `worker` | `worker_name` |
| Proyecto | `project` | `project` |
| Área / Ubicación | `location` | `location` |

Según la inspección, se podrán solicitar datos de contexto adicionales como:

```text
building
activity
shift
contractor
```

Los campos adicionales se definen en `FORM_LOGIC_MATRIX.md` y en la Spec correspondiente.

---

# 8. InspectedItem

`InspectedItem` representa un elemento que forma parte de la inspección.

Puede ser:

* herramienta;
* máquina;
* componente;
* equipo;
* EPP;
* accesorio;
* rack;
* elemento de izaje.

Ejemplo conceptual:

```text
InspectedItem
│
├── itemType
├── itemName
├── identifier
└── metadata
```

---

# 9. Identificación manual

V1 no contará con un catálogo centralizado de activos.

Por ello, un `InspectedItem` puede obtener su identidad mediante datos capturados manualmente.

Ejemplos:

```text
economicNumber
serialNumber
model
type
diameter
capacity
wll
manufacturingDate
```

El conjunto exacto depende del checklist.

---

# 10. inspectedItems es una colección

Incluso cuando un formulario utilice solamente un equipo, el modelo conceptual debe admitir varios elementos:

```text
inspectedItems[]
```

Esto permite representar sin cambiar el dominio:

* una extensión;
* varias herramientas manuales;
* varios componentes de EPP;
* un sistema de protección contra caídas.

---

# 11. SINGLE_EQUIPMENT

Cuando una inspección corresponde a un solo equipo:

```text
inspectedItems:
    - Taladro eléctrico
```

La inspección continúa utilizando el mismo contrato general.

---

# 12. MULTI_ITEM

Cuando una inspección representa un conjunto de herramientas:

```text
inspectedItems:
    - Martillo
    - Flexómetro
    - Desarmadores
```

Todos forman parte de la misma `Inspection`.

No deben generarse submissions independientes por cada herramienta seleccionada.

---

# 13. COMPOSITE_EQUIPMENT

Un sistema puede estar compuesto por varios componentes.

Ejemplo conceptual:

```text
Protección contra caídas

inspectedItems:
    - Arnés
    - Línea de vida
    - Amortiguador
```

El usuario debe evaluar únicamente los componentes que formen parte de la inspección actual.

---

# 14. Criterio de inspección

Cada pregunta o condición evaluada debe representarse conceptualmente mediante un `InspectionCriterion`.

```text
InspectionCriterion
│
├── criterionId
├── label
├── section
├── blocking
└── applicability
```

---

# 15. criterionId

Cada criterio debe contar con un identificador técnico estable.

Ejemplo:

```text
taladro_condicion_broca
taladro_cable_alimentacion
taladro_ruidos_motor
```

El identificador NO debería depender exclusivamente de:

* número de fila;
* posición visual;
* texto completo del criterio.

Debe poder sobrevivir a pequeños cambios de texto sin perder el significado del dato.

---

# 16. Texto del criterio

`label` contiene la pregunta o condición mostrada al usuario.

Debe preservar la intención del documento oficial.

Cuando la redacción original pueda generar ambigüedad en una interfaz digital, su transformación deberá documentarse en `FORM_LOGIC_MATRIX.md`.

No debe modificarse silenciosamente durante la implementación.

---

# 17. Resultados normalizados

Todas las inspecciones deben utilizar internamente los mismos tres resultados:

```text
COMPLIANT
NON_COMPLIANT
NOT_APPLICABLE
```

La interfaz muestra `Cumple`, `No cumple` y `No aplica`. Los valores enviados a Formspree se detallan en la [sección 41](#41-valores-enviados-a-formspree).

---

# 18. No utilizar P / X como contrato interno

Los documentos de origen utilizan diferentes convenciones visuales.

El código NO debe almacenar como modelo principal:

```text
P
X
✓
NA
SI
NO
```

El dominio usa los códigos de la sección 17 y el envío a Formspree utiliza los valores de la sección 41.

---

# 19. InspectionResponse

Cada respuesta debe poder representarse como:

```text
InspectionResponse
│
├── criterionId
├── result
├── observation
├── evidence
└── blocking
```

Ejemplo:

```text
criterionId:
    taladro_cable_alimentacion

result:
    NON_COMPLIANT

observation:
    opcional

evidence:
    requerida
```

---

# 20. Evidencia

Todos los criterios deben ser técnicamente capaces de asociarse con evidencia cuando exista una no conformidad.

La evidencia puede corresponder, según lo que soporte Formspree, a:

* fotografía;
* archivo;
* documento;
* otro archivo aceptado por la implementación.

---

# 21. Regla obligatoria de evidencia

La siguiente regla es universal:

```text
IF result == NON_COMPLIANT
THEN evidence IS REQUIRED
```

Por lo tanto:

### COMPLIANT

```text
evidence:
    opcional / no requerida
```

### NOT_APPLICABLE

```text
evidence:
    opcional / no requerida
```

### NON_COMPLIANT

```text
evidence:
    obligatoria
```

El formulario NO debe enviarse si existe una respuesta `NON_COMPLIANT` sin su evidencia requerida.

---

# 22. Asociación de evidencia

La evidencia debe asociarse con el criterio que produjo la no conformidad.

Debe evitarse depender únicamente de un campo general como:

```text
Evidencia general
```

porque posteriormente el revisor debe poder identificar:

```text
Criterio
    ↓
No cumple
    ↓
Evidencia correspondiente
```

Puede existir adicionalmente un campo de evidencia general si un checklist lo requiere.

---

# 23. Observaciones

Las observaciones y la evidencia son conceptos diferentes.

`observation` describe textualmente una condición.

`evidence` documenta visualmente o mediante archivo la condición.

En V1, una observación no debe considerarse automáticamente obligatoria cuando exista una no conformidad, salvo que una regla específica del formulario lo requiera.

---

# 24. No conformidad

Existe una no conformidad cuando:

```text
result == NON_COMPLIANT
```

Una inspección puede contener:

```text
0..n nonConformities
```

La presencia de una no conformidad no significa automáticamente que el equipo sea bloqueado.

---

# 25. Criterios bloqueantes

Cada criterio debe admitir conceptualmente:

```text
blocking: true
blocking: false
blocking: null
```

Significado:

### true

Una no conformidad en ese criterio provoca una condición bloqueante definida por Seguridad Industrial.

### false

El criterio fue evaluado por Seguridad Industrial y se determinó que no es bloqueante.

### null

Seguridad Industrial todavía no ha clasificado el criterio.

---

# 26. No inferir criterios bloqueantes

El equipo de desarrollo NO debe decidir qué criterios son bloqueantes basándose únicamente en:

* severidad percibida;
* experiencia técnica;
* interpretación del PDF;
* opinión del desarrollador;
* recomendación de un agente de IA.

La clasificación debe proceder de Seguridad Industrial.

---

# 27. Estado operacional

Hasta que la clasificación de criterios bloqueantes haya sido definida, el sistema no debe inferir automáticamente:

```text
APTO
NO APTO
```

Puede registrar datos objetivos como:

```text
hasNonCompliances: true
nonComplianceCount: 2
```

sin inventar una disposición operacional.

---

# 28. Futuro cálculo de disposition

Cuando los criterios bloqueantes estén definidos, el sistema podrá incorporar una propiedad como:

```text
disposition
```

Posibles estados deberán definirse posteriormente por Seguridad Industrial.

Por ejemplo, pero NO establecidos todavía como contrato:

```text
FIT_FOR_USE
NOT_FIT_FOR_USE
REQUIRES_REVIEW
```

Estos valores no deben implementarse hasta contar con una decisión formal.

---

# 29. Aplicabilidad

Algunos criterios aplican solamente bajo determinadas condiciones.

Ejemplo conceptual:

```text
Escalera
│
├── criterios generales
│
└── tipo
    ├── extensión
    ├── tijera
    └── marina
```

Los criterios que no corresponden al tipo seleccionado no deben necesariamente mostrarse para que el usuario marque manualmente `No aplica`.

Preferiblemente deben excluirse del flujo cuando la lógica permita conocer de antemano que no corresponden.

---

# 30. Diferencia entre condición no aplicable y criterio oculto

Son conceptos distintos.

## Criterio no aplicable

El criterio pertenece a la inspección pero, debido a la condición real encontrada, el inspector selecciona:

```text
NOT_APPLICABLE
```

## Criterio fuera del formulario

La propia configuración determina que el criterio no forma parte de esa variante.

Ejemplo:

Un criterio exclusivo de escalera marina no debe mostrarse al inspeccionar una escalera de tijera.

---

# 31. Selecciones previas

Los formularios pueden utilizar selecciones para determinar los bloques posteriores.

Ejemplos:

```text
Tipo de escalera
        ↓
Criterios correspondientes
```

```text
Herramientas que utilizarás
        ↓
Herramientas a inspeccionar
```

```text
EPP que utilizarás
        ↓
Componentes a revisar
```

Las dependencias exactas serán documentadas en `FORM_LOGIC_MATRIX.md`.

---

# 32. Validación mínima

Antes de permitir el envío, el formulario debe validar como mínimo:

1. campos generales obligatorios;
2. identificación requerida;
3. selección de elementos requerida;
4. respuesta de criterios obligatorios;
5. evidencia para cada `NON_COMPLIANT`;
6. consistencia de campos condicionales.

---

# 33. Regla de completitud

Una inspección no debe enviarse si existen criterios visibles y obligatorios sin respuesta.

Ejemplo inválido:

```text
Criterio 1 → COMPLIANT
Criterio 2 → sin respuesta
Criterio 3 → NOT_APPLICABLE
```

Debe solicitarse resolver el criterio pendiente antes del envío.

---

# 34. Evidencia y validación

Ejemplo:

```text
Cable de alimentación

Resultado:
    No cumple

Evidencia:
    [vacío]
```

Resultado:

```text
SUBMISSION BLOCKED
```

Después:

```text
Cable de alimentación

Resultado:
    No cumple

Evidencia:
    cable_danado.jpg
```

Resultado:

```text
VALID
```

si todos los demás campos obligatorios también están completos.

---

# 35. Resultado agregado de la inspección

Aunque todavía no exista una disposición operacional, la aplicación puede calcular metadatos descriptivos.

Ejemplo:

```text
totalCriteria
compliantCount
nonCompliantCount
notApplicableCount
hasNonCompliances
```

Estos valores pueden facilitar posteriormente:

* revisión;
* filtros;
* dashboards;
* análisis.

No reemplazan las respuestas individuales.

---

# 36. FormRevision

`formRevision` debe corresponder a la revisión del documento oficial utilizado para construir el formulario.

Cuando un documento oficial cambie de revisión:

```text
Rev 03
    ↓
Rev 04
```

no debe modificarse silenciosamente la interpretación del formulario existente.

Debe analizarse el cambio y generar una Spec.

---

# 37. Compatibilidad histórica

Las submissions antiguas deben conservar su:

```text
formId
formRevision
```

Por lo tanto, registros producidos bajo Rev. 03 pueden distinguirse de registros producidos bajo Rev. 04.

No debe reescribirse retrospectivamente el significado de submissions antiguas.

---

# 38. Campos comunes y campos particulares

Cada formulario incluye los datos generales de la sección 7 y puede capturar datos particulares del elemento inspeccionado.

Ejemplo:

### Taladro

```text
model
```

### Eslinga

```text
type
length
wll
```

### Cáncamo

```text
type
diameter
wll
```

### Protección contra caídas

```text
serialNumber
manufacturingDate
```

Estos campos pertenecen al `metadata` correspondiente al elemento inspeccionado.

No se debe crear un formulario universal que muestre todos esos campos.

---

# 39. Transporte a Formspree

Cada formulario envía las inspecciones a su propio endpoint de Formspree. El envío incluye los campos generales de la sección 7 y el valor en español de cada criterio respondido según la sección 41.

El flujo debe entenderse como:

```text
Domain model
      ↓
Mapping
      ↓
Formspree payload
```

El código que realiza el mapping debe evitar cambiar el significado de los datos.

---

# 40. Convención de nombres

Los nombres enviados a Formspree deben ser:

* identificables;
* estables;
* legibles;
* predecibles.

Evitar:

```text
question1
question2
input5
checkbox9
```

Preferir:

```text
taladro_condicion_broca
taladro_cable_alimentacion
taladro_ruidos_motor
```

La convención exacta podrá definirse en una Spec o documento técnico posterior.

---

# 41. Valores enviados a Formspree

El valor del parámetro de cada criterio respondido debe coincidir exactamente con el texto de la opción seleccionada, incluidas las mayúsculas, minúsculas y los espacios.

| Resultado interno | Valor enviado a Formspree |
|---|---|
| `COMPLIANT` | `Cumple` |
| `NON_COMPLIANT` | `No cumple` |
| `NOT_APPLICABLE` | `No aplica` |

Por ejemplo, una respuesta de **No cumple** para el criterio de la broca se envía con el parámetro `taladro_condicion_broca` y el valor `No cumple`.

---

# 42. Separación entre configuración y comportamiento

Un criterio debería definir principalmente:

* qué se pregunta;
* dónde aparece;
* cuándo aplica;
* si es bloqueante.

El comportamiento común como:

* seleccionar estado;
* mostrar evidencia;
* exigir evidencia;
* validar;
* generar errores;

debe reutilizarse cuando sea técnicamente razonable.

---

# 43. No crear un motor genérico innecesario

Este modelo común NO significa que todos los formularios deban construirse mediante un único generador dinámico.

Puede existir código específico por formulario.

La reutilización debe enfocarse primero en reglas verdaderamente comunes:

```text
response state
evidence requirement
validation
submission metadata
Formspree mapping
```

No debe sacrificarse claridad por abstracción.

---

# 44. Invariantes del dominio

Las siguientes reglas deben considerarse invariantes salvo que este documento sea modificado explícitamente.

### INV-01

Una submission representa una inspección realizada en un momento determinado.

### INV-02

Cada formulario utiliza un endpoint de Formspree independiente.

### INV-03

Todos los resultados del dominio utilizan:

```text
COMPLIANT
NON_COMPLIANT
NOT_APPLICABLE
```

Los resultados enviados a Formspree usan los valores literales de la sección 41.

### INV-04

Toda respuesta `NON_COMPLIANT` requiere evidencia.

### INV-05

Una inspección no puede enviarse si existe una no conformidad sin evidencia.

### INV-06

Los criterios bloqueantes son definidos por Seguridad Industrial.

### INV-07

El sistema no debe inventar criterios bloqueantes.

### INV-08

La identificación del equipo se conserva aunque no exista un catálogo centralizado.

### INV-09

Una inspección de herramienta manual puede contener múltiples herramientas en una sola submission.

### INV-10

Una inspección de rack representa un único rack.

### INV-11

Los formularios compuestos deben evaluar solamente los componentes seleccionados/aplicables.

### INV-12

El documento y revisión de origen deben conservarse con la inspección.

---

# 45. Ejemplo conceptual: Taladro eléctrico

```text
Inspection
│
├── formId
│   └── 02040p54
│
├── formRevision
│   └── 03
│
├── worker
│   └── Juan Pérez
│
├── project
│   └── Proyecto A
│
├── location
│   └── Nave 2
│
├── inspectedItems
│   └── Taladro
│       └── model: ABC-123
│
├── responses
│   │
│   ├── condicion_broca
│   │   └── COMPLIANT
│   │
│   ├── interruptor
│   │   └── COMPLIANT
│   │
│   └── cable_alimentacion
│       ├── NON_COMPLIANT
│       └── evidence: cable.jpg
│
└── resultMetadata
    ├── nonCompliantCount: 1
    └── hasNonCompliances: true
```

El modelo registra objetivamente la no conformidad.

No determina todavía si el taladro queda operacionalmente bloqueado.

---

# 46. Ejemplo conceptual: Herramienta manual

```text
Inspection
│
├── inspectedItems
│   ├── Martillo
│   ├── Flexómetro
│   └── Desarmadores
│
└── responses
    ├── martillo
    │   └── COMPLIANT
    │
    ├── flexometro
    │   └── NON_COMPLIANT
    │       └── evidence
    │
    └── desarmadores
        └── COMPLIANT
```

La inspección continúa siendo una sola submission.

---

# 47. Ejemplo conceptual: EPP

```text
Elementos seleccionados:

Casco
Gafas
Guantes
Zapatos
```

El sistema no debería mostrar obligatoriamente:

```text
Respirador
Tapones
Chaleco
Otro
```

para obligar al usuario a marcar cada uno como `No aplica`.

Los elementos seleccionados definen el alcance de la inspección.

---

# 48. Ejemplo conceptual: Escaleras

```text
Tipo:
    Escalera de tijera
```

Criterios mostrados:

```text
Elementos generales
+
Elementos de escalera de tijera
```

No deben mostrarse como preguntas normales los criterios exclusivos de:

```text
Escalera marina
Escalera de extensión
```

---

# 49. Fuente de verdad de la lógica específica

Este documento define reglas comunes.

No define:

* las preguntas exactas;
* el número de criterios;
* los campos específicos;
* los criterios condicionales exactos;
* los criterios bloqueantes;
* los textos finales.

Esos elementos deben documentarse en:

`docs/FORM_LOGIC_MATRIX.md`

---

# 50. Regla para agentes de desarrollo

Cuando una Spec solicite implementar o modificar un checklist, el agente debe:

1. leer `PROJECT_OVERVIEW.md`;
2. leer este documento;
3. localizar el formulario en `FORM_LOGIC_MATRIX.md`;
4. leer la Spec;
5. revisar la plantilla;
6. inspeccionar el código existente;
7. implementar únicamente lo solicitado;
8. validar las invariantes de este documento.

Si una instrucción requiere romper una invariante, el agente debe señalar la contradicción antes de continuar.
