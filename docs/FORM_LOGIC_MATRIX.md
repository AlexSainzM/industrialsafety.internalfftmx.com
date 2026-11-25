# FFT Industrial Safety Checklists

## FORM_LOGIC_MATRIX

**Estado:** Draft  
**Versión:** 0.2
**Fecha:** 2026-11-25

---

## 1. Propósito

Este documento traduce los formatos oficiales de Seguridad Industrial a una definición funcional digital, sin intentar replicar su distribución física en papel.

Debe utilizarse junto con:

- `docs/PROJECT_OVERVIEW.md`
- `docs/INSPECTION_MODEL.md`
- la Spec correspondiente a cada iteración
- `assets/templetes/form_v1/`

La prioridad es preservar la intención de cada formato oficial y hacer explícitas las decisiones digitales antes de implementar.

---

## 2. Convenciones de esta matriz

### 2.1 Fuente

Cada formulario conserva su código documental y revisión oficial.

### 2.2 Resultado común

Por cada criterio respondido, el parámetro enviado a Formspree debe contener el valor literal en español correspondiente a la opción seleccionada.

| Valor enviado a Formspree | Código interno |
|---|---|
| `Cumple` | `COMPLIANT` |
| `No cumple` | `NON_COMPLIANT` |
| `No aplica` | `NOT_APPLICABLE` |

El valor enviado debe conservar las mayúsculas, minúsculas y espacios de la tabla.

### 2.3 Evidencia

Toda respuesta `NON_COMPLIANT` requiere evidencia antes del envío.

### 2.4 Criterios bloqueantes

La propiedad `blocking` debe permanecer sin clasificar hasta que Seguridad Industrial determine formalmente cuáles criterios son bloqueantes.

### 2.5 Identificación

Aunque V1 no tenga catálogo centralizado de activos, se conservan los datos de identificación presentes en el formato oficial: número económico, serie, modelo, tipo, WLL, capacidad, diámetro, fecha de fabricación, etc.

### 2.6 Tiempo

Las cuadrículas por días, semanas o múltiples fechas del documento físico no deben reproducirse como matriz digital. Cada submission representa una inspección realizada en un momento determinado.

El campo **Semana** de los formatos físicos no se solicita en ningún formulario digital de V1. La fecha y hora de la inspección lo sustituyen. [Spec 004](specs/004-form-extensionElectrica.md)

Los conceptos de **turno** que aparezcan en documentos oficiales deben tratarse como dato de contexto solamente si Seguridad Industrial confirma que siguen siendo necesarios en V1.

### 2.7 Datos generales comunes

Todos los formularios deben enviar **Nombre del trabajador**, **Proyecto** y **Área / Ubicación** como campos obligatorios. Taladro Eléctrico toma el nombre completo de la sesión local y lo muestra en modo de solo lectura. Los nuevos formularios siguen esta misma regla aunque el formato físico tenga un campo de nombre o firma. Proyecto, Área / Ubicación y los datos adicionales se capturan según cada inspección. [Spec 003](specs/003-UsersManagement.md)

---

## 3. Resumen de formularios

| Código | Formulario | Revisión | Familia funcional | Unidad digital de inspección |
|---|---|---:|---|---|
| 02040p51 | Equipo de Oxicorte | 03 | `OPERATION_INSPECTION` | Una operación/equipo de oxicorte en un área y momento determinados |
| 02040p50 | Orden y Limpieza | 02 | `AREA_INSPECTION` | Un área/actividad inspeccionada |
| 02040p49 | Máquina de Soldar | 03 | `SINGLE_EQUIPMENT` | Una máquina de soldar |
| 02040p47 | Herramienta Manual | 02 | `MULTI_ITEM` | El conjunto de herramientas manuales que utilizará el trabajador |
| 02040p45 | Extensión Eléctrica | 03 | `SINGLE_EQUIPMENT` | Una extensión eléctrica |
| 02040p44 | Esmeril Angular | 03 | `SINGLE_EQUIPMENT` | Un esmeril angular |
| 02040p43 | Escaleras | 04 | `CONDITIONAL_EQUIPMENT` | Una escalera de un tipo específico |
| 02040p40 | Equipo de Protección Personal | 02 | `COMPOSITE_EQUIPMENT` | El conjunto de EPP aplicable al trabajador/uso actual |
| 02040p29 | Eslingas | 08 | `SINGLE_EQUIPMENT` | Una eslinga |
| 02040p18 | Racks | 02 | `TYPED_ASSET` | Un rack específico |
| 02040p69 | Cáncamos | 01 | `SINGLE_EQUIPMENT` | Un cáncamo |
| 02040p68 | Grilletes | 01 | `SINGLE_EQUIPMENT` | Un grillete |
| 02040p71 | Patín Hidráulico | 02 | `SINGLE_EQUIPMENT` | Un patín hidráulico |
| 02040p11 | Equipo de Protección contra Caídas | 03 | `COMPOSITE_EQUIPMENT` | Un sistema de protección contra caídas compuesto por los elementos que se utilizarán |
| 02040p54 | Taladro Eléctrico | 03 | `SINGLE_EQUIPMENT` | Un taladro eléctrico |

---

# 4. 02040p51 — Equipo de Oxicorte

## Fuente

- Código: `02040p51`
- Revisión: `03`
- Fecha del documento: `13.10.2025`
- Título: `CHECK LIST - OXICORTE`

## Familia

`OPERATION_INSPECTION`

## Unidad digital

Una inspección corresponde a una operación/equipo de oxicorte en un área y momento determinados.

No se deben mantener columnas para varias semanas dentro de una misma submission.

## Datos generales presentes en la fuente

- Proyecto
- Nombre del trabajador
- Área y ubicación
- DC3: Sí / No
- Tipo de máquina
- Modelo
- Semana
- Nota / observaciones

## Secciones y criterios de la fuente

### Condiciones del equipo

1. Boquilla de soplete
2. Soplete
3. Manómetro de Oxígeno
4. Manómetro del acetileno
5. Válvula de cierre rápido
6. Arrestador de flama en la salida del manómetro
7. Cilindro de Acetileno
8. Mangueras
9. Cilindro de oxígeno

### Sección de sujeción / componentes del cilindro

La fuente numera:

- 2.1 Arrestador de flama en la llegada del soplete
- 2.2 Válvula de cierre rápido
- 2.3 Válvula del cilindro del oxígeno

La denominación de la sección en el documento es `SEJECIÓN DEL CILINDRO`.

### Precauciones requeridas dentro de un radio de 10 m

- El piso se encuentra limpio y libre de combustible.
- Se han retirado los líquidos inflamables del área.
- Los rociadores y mangueras se encuentran en servicio.
- Se ha eliminado el riesgo de explosión.
- Los rociadores y mangueras se encuentran en servicio.
- Se han retirado los combustibles del otro lado de la pared.
- El personal conoce cómo operar los extintores.
- Se ha informado al personal afectado durante el trabajo.
- Se han cubierto las zonas aledañas con mantas antiflama.

### Controles posteriores

La fuente incluye:

- Se vigila el área hasta 30 min. después de terminar el trabajo.
- Se cuenta con bombero auxiliar de guardia.
- Nombre y firma del trabajador.

## Comportamiento digital propuesto

Flujo recomendado:

`Datos de operación → Identificación de equipo → Condiciones del equipo → Condiciones del área → Controles posteriores → Evidencias/observaciones → Envío`

El dato DC3 debe conservarse porque aparece explícitamente en el documento oficial.

## Evidencia

Una evidencia debe hacerse obligatoria por cada criterio marcado `NON_COMPLIANT`.

## Puntos que requieren validación

1. La fuente repite literalmente el criterio `Los rociadores y mangueras se encuentran en servicio` en 3.3 y 3.5. No debe corregirse o eliminarse silenciosamente; Seguridad Industrial debe confirmar si es una duplicidad documental o si uno de los textos debería ser distinto.
2. La sección `SEJECIÓN DEL CILINDRO` contiene criterios cuyo texto no describe únicamente sujeción. Se debe preservar el contenido oficial y validar la intención antes de renombrar la sección en UI.
3. `Nombre y Firma del trabajador` aparece dentro de la numeración final del checklist. En V1 debe tratarse como dato de cierre, no como criterio, salvo indicación contraria.

---

# 5. 02040p50 — Orden y Limpieza

## Fuente

- Código: `02040p50`
- Revisión: `02`
- Fecha del documento: `05.06.2024`
- Título: `FORMATO DE INSPECCION DE ORDEN Y ASEO`

## Familia

`AREA_INSPECTION`

## Unidad digital

Una inspección representa un área/actividad concreta revisada en un momento determinado.

## Datos generales presentes en la fuente

- Proyecto
- Área y ubicación
- No. de trabajadores
- Fecha de inicio
- Semana
- Actividad
- Nombre de los trabajadores

## Criterios

1. Los productos están bien apilados y ordenados en forma adecuada.
2. Realizan reuniones de seguridad para analizar accidentes de trabajo e incidentes.
3. Los sitios para ordenamiento de basura y residuos peligrosos están ordenados.
4. Los resguardos que hay en la maquinaria están debidamente empotrados.
5. Los pisos tienen superficies seguras y adecuadas para el trabajador.
6. Los pisos están limpios y secos.
7. Los pisos están libres de obstáculos.
8. Los pasillos, entradas de almacén y planta de producción están libres de obstrucción.
9. Los pasillos y áreas de trabajo están debidamente señalizados y demarcados.
10. Los extintores están debidamente señalizados y libres de obstrucciones.
11. Las máquinas y equipos están debidamente protegidos.
12. Las herramientas están libres de suciedad.
13. Las áreas de almacenamiento están señalizadas.
14. El personal utiliza los elementos de protección personal y están en buen estado.

La fila 15 del formato corresponde a `Nombre de los trabajadores`, no a un criterio de inspección.

## Comportamiento digital propuesto

No debe presentarse como una herramienta física en el dominio. Debe aparecer en el catálogo como una inspección de área.

La cuadrícula semanal se elimina y se reemplaza por el timestamp de la submission.

## Evidencia

Obligatoria por cada criterio `NON_COMPLIANT`.

## Punto que requiere validación

La fuente permite registrar `Nombre de los trabajadores` en una sola hoja. Debe confirmarse si V1 necesita conservar una lista de trabajadores presentes o solamente a la persona que realiza la inspección.

---

# 6. 02040p49 — Máquina de Soldar

## Fuente

- Código: `02040p49`
- Revisión: `03`
- Fecha del documento: `13.10.2025`
- Título: `CHECK LIST - MAQUINA DE SOLDAR`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Una máquina de soldar específica.

## Datos generales presentes en la fuente

- Proyecto
- Nombre del trabajador
- Área y ubicación
- Tipo de máquina
- Semana
- Cuenta con DC3: Sí / No

## Criterios

1. Carcaza de la máquina
2. Manija de transporte
3. Pintura y limpieza
4. Ruedas
5. Cable conductor 440-220 V
6. Cable de porta electrodo, bornes, zapatas
7. Cable conexión a tierra, bornes, zapatas
8. Estado de la ploga
9. Regulador de amperaje
10. Interruptor de encendido
11. Funcionamiento de ventilador
12. Selector cambio de fundición
13. Porta electrodo y pinza de tierra
14. Manguera suministro de gas
15. Regulador y flujómetro de gas

La fila 16 corresponde a nombre/firma del trabajador, no a un criterio.

## Comportamiento digital propuesto

Formulario estándar de equipo individual.

Debe conservar el dato `Cuenta con DC3`.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Punto que requiere validación

La fuente contiene la expresión `Estado de la ploga`. Debe conservarse como referencia documental; cualquier corrección de término visible en UI debe ser validada, no inferida silenciosamente.

---

# 7. 02040p47 — Herramienta Manual

## Fuente

- Código: `02040p47`
- Revisión: `02`
- Fecha del documento: `05.06.2024`
- Título: `CHECK LIST - HERRAMIENTA MANUAL`

## Familia

`MULTI_ITEM`

## Unidad digital

Una inspección representa **el conjunto de herramientas manuales que el trabajador utilizará en ese evento**.

Esta decisión está confirmada para V1.

## Datos generales presentes en la fuente

- Proyecto
- Nombre del trabajador
- Fecha de inicio
- No. económico
- Área y ubicación
- Estado actual
- Tipo de trabajo
- Semana
- Notas

## Herramientas listadas en la fuente

1. Nivel de mano
2. Flexómetro
3. Martillo
4. Marro
5. Arco con segueta
6. Machuelos
7. Maneral
8. Perico / Stilson
9. Brocas
10. Pinzas de presión, mecánicas y de electricista, etc.
11. Desarmadores planos y de cruz
12. Llaves mixtas, españolas y Allen
13. Lima redondas o planas y/o limatones
14. Cepillos de alambre

La fuente contiene filas 15 a 26 sin nombre de herramienta.

## Comportamiento digital confirmado

Primero se seleccionan las herramientas que se utilizarán. Solamente las seleccionadas se presentan para evaluación.

Ejemplo conceptual:

`Seleccionar herramientas → Evaluar herramientas seleccionadas → Evidencias → Enviar una sola inspección`

No se genera una submission independiente por herramienta.

## Identificación

Debe conservarse la identificación disponible en la fuente. La relación exacta entre `No. económico` y un conjunto de varias herramientas requiere validación, porque el documento físico contiene un único campo para dicho dato.

## Evidencia

Obligatoria para cada herramienta evaluada como `NON_COMPLIANT`.

## Puntos que requieren validación

1. Definir si las filas vacías 15–26 representan capacidad para agregar herramientas no listadas. Si Seguridad Industrial confirma que sí, V1 debería permitir `Otra herramienta` como elemento repetible.
2. Definir cómo aplica `No. económico` cuando una misma inspección incluye varias herramientas.

---

# 8. 02040p45 — Extensión Eléctrica

## Fuente

- Código: `02040p45`
- Revisión: `03`
- Fecha del documento: `13.10.2025`
- Título: `CHECK LIST - EXTENSIÓN ELECTRICA`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Una extensión eléctrica específica.

## Datos generales presentes en la fuente

- Nombre del trabajador
- Modelo
- Fecha
- Nave y ubicación
- No. económico
- Proyecto
- Semana

## Criterios

1. Existe daño en cableado y extensiones.
2. Existe daño en conector o clavijas.
3. Asegurar que cuente con cable puesta a tierra.
4. Capacidad del cable de acuerdo a carga de energía.
5. Es extensión de carrete.
6. Cuenta con GFCI.

La fila 7 corresponde a firma del trabajador.

## Comportamiento digital

Definido en la [Spec 004](specs/004-form-extensionElectrica.md).

La captura sigue al Taladro Eléctrico: primero Nombre del trabajador, Proyecto y Área / Ubicación; después Modelo y Número económico. «Nave y ubicación» se registra en Área / Ubicación. Semana no se solicita. La firma queda fuera de alcance. La referencia visual usa un placeholder hasta que exista la imagen.

Los criterios 1 a 4 conservan la redacción de esta sección y se responden con `Cumple`, `No cumple` o `No aplica`. No se reescriben en positivo. Los criterios 5 y 6 se responden y se envían como `Sí` o `No`.

## Evidencia

Obligatoria por cada `No cumple` de los criterios 1 a 4. Las respuestas `Sí` y `No` de los criterios 5 y 6 no piden evidencia.

## Decisión de redacción

Los criterios 1 y 2 siguen redactados como existencia de daño. La spec conserva ese texto y no lo invierte. El endpoint de Formspree de este formulario queda definido en la Spec 004.

---

# 9. 02040p44 — Esmeril Angular

## Fuente

- Código: `02040p44`
- Revisión: `03`
- Fecha del documento: `13.10.2025`
- Título: `LISTA DE REVISIÓN DE ESMERIL ANGULAR`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Un esmeril angular específico.

## Datos generales presentes en la fuente

- Proyecto
- Nombre del trabajador
- Fecha
- Área / ubicación
- Modelo
- Semana

## Criterios

1. Tiene guarda protector.
2. Guarda original.
3. Disco correspondiente al equipo.
4. Las R.P.M. son las correspondientes al equipo.
5. La tuerca de fijación del disco se encuentra en buen estado.
6. La contra tuerca del disco está en buenas condiciones.
7. Posee soporte manual auxiliar.
8. Posee botón de freno del engranaje del disco.
9. La carcaza del equipo se encuentra en buenas condiciones.
10. Enchufe industrial macho en buen estado.
11. Cordón conductor eléctrico en buen estado.
12. Interruptor de accionamiento en buen estado.
13. La entrada del conductor cuenta con su protección.

## Comportamiento digital propuesto

Formulario estándar de equipo individual.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Observación

No se identifica una dependencia condicional explícita entre criterios en el documento fuente.

---

# 10. 02040p43 — Escaleras

## Fuente

- Código: `02040p43`
- Revisión: `04`
- Fecha del documento: `13.10.2025`
- Título: `02040p43_Checklist_Escaleras`

## Familia

`CONDITIONAL_EQUIPMENT`

## Unidad digital

Una escalera específica de un tipo determinado.

## Datos generales presentes en la fuente

- Área / proyecto
- Semana
- Fecha
- Tipo de escalera
- Tamaño
- Capacidad
- Material
- Turno (1o. / 2o. en la matriz física)

## Tipos identificados en la fuente

- Escalera de extensión
- Escalera de tijera
- Escalera marina

## Criterios generales

1. Estado general (aseo, contaminación, rupturas, etc.).
2. Rotulación/instrucciones de fabricante (peso, altura, etc.).
3. Peldaños en buen estado.
4. Largueros de una sola pieza (sin defectos).
5. Zapatas antiderrapante.
6. Abrazaderas o dispositivos de sujeción.

## Criterios — escalera de extensión

7. Etiqueta de clasificación visible.
8. Estado físico de las cuerdas o cable de extensión sin nudos.
9. Guías externas.
10. Ambos largueros (fijo y móvil) en buen estado, sin curvaturas.
11. Trabas o ganchos de seguridad funcionan y se enganchan firmemente.
12. Zapata antideslizante en buen estado.

## Criterios — escalera de tijera

13. No presenta torsión o arqueo de los largueros.
14. Peldaños fijos, sin movimiento o juego.
15. Superficie antideslizante en los peldaños.
16. Tope central o cinta de seguridad en buen estado.
17. Las bisagras de la parte superior se abren completamente y funcionan sin fricción.
18. No hay juego excesivo en las uniones o remaches.

## Criterios — escalera marina

La fuente vuelve a utilizar el número 18 para el primer criterio de esta sección y continúa hasta 25:

- ¿Está firmemente anclada a la estructura o muro?
- Sin corrosión, soldaduras deterioradas, fisuras o deformaciones.
- Cuenta con 90 cm extendida sobre el punto de apoyo en el borde de la superficie y con aro de protección seguro.
- Peldaños completos y firmes (sin movimiento ni desgaste).
- ¿Todos los anclajes están bien ajustados, sin óxido ni aflojamiento?
- Aro de protección o jaula de seguridad si la altura supera 3 m.
- ¿Tiene plataforma de llegada o descenso seguro?
- ¿Hay barandales en la salida y entrada?

## Comportamiento digital confirmado/propuesto

El usuario selecciona el tipo de escalera.

La aplicación muestra:

`Criterios generales + criterios del tipo seleccionado`

No deben mostrarse los criterios de los otros tipos para obligar al usuario a marcarlos `No aplica`.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Puntos que requieren validación

1. El documento tiene numeración duplicada en el criterio 18. Los IDs técnicos digitales deben ser únicos y no depender de ese número.
2. La fuente registra 1o. y 2o. turno. Debe confirmarse si `turno` seguirá capturándose como dato de contexto en V1 o si timestamp es suficiente.
3. La nota oficial indica que daños físicos considerables deben notificarse inmediatamente a Seguridad Industrial y que las escaleras pueden darse de baja o repararse. Esto no debe convertirse automáticamente en lógica `blocking` hasta recibir la clasificación formal de Seguridad Industrial.

---

# 11. 02040p40 — Equipo de Protección Personal

## Fuente

- Código: `02040p40`
- Revisión: `02`
- Fecha del documento: `05.06.2024`
- Título: `LISTA DE EPP PARA REVISIÓN Y MANTENIMIENTO`

## Familia

`COMPOSITE_EQUIPMENT`

## Unidad digital

El conjunto de EPP aplicable al trabajador/uso actual.

## Datos generales presentes en la fuente

- Proyecto / ubicación
- Semana
- Fecha
- Nombre
- Tipo asociado a los elementos de EPP
- Observaciones de Seguridad Industrial

## Componentes de EPP listados

- Casco
- Tapones auditivos
- Respirador
- Gafas claras / obscuras
- Camisa
- Guantes
- Chaleco
- Zapatos
- Otro

## Comportamiento digital propuesto

Primero se seleccionan los componentes de EPP que aplican al trabajo actual.

Solamente los componentes seleccionados se evalúan.

Para cada componente seleccionado debe conservarse el campo `Tipo` cuando corresponda, ya que la fuente dispone de ese dato bajo los elementos.

## Evidencia

Obligatoria para cada componente evaluado `NON_COMPLIANT`.

## Puntos que requieren validación

1. El documento físico permite registrar hasta 12 nombres en una misma matriz. La propuesta V1 es una inspección por trabajador/uso actual, pero Seguridad Industrial debe confirmar que no necesita una captura masiva de varios trabajadores dentro de una sola submission.
2. Debe definirse si `Tipo` es obligatorio para todos los componentes o solamente cuando el usuario tenga información aplicable.

---

# 12. 02040p29 — Eslingas

## Fuente

- Código: `02040p29`
- Revisión: `08`
- Fecha del documento: `13.10.2025`
- Título: `02040p29_checklist_eslingas`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Una eslinga específica.

## Identificación presente en la fuente

- Área / proyecto
- Tipo de eslinga
- Longitud
- Capacidad de carga (WLL)
- Semana
- Turno (1o. / 2o. en la matriz física)

## Criterios

1. La eslinga cuenta con etiqueta de seguridad del fabricante legible con peso máximo de carga identificado.
2. Presenta desgaste excesivo.
3. Presenta signos de abrasión.
4. Hilos rotos y/o partes con cortes.
5. Putrefacción en la fibra y/o sequedad excesiva.
6. El cuerpo de la eslinga cuenta con agujeros, quemaduras, partículas incrustadas, residuos de pintura, grasas, solventes, etc.
7. La eslinga está expuesta a calor excesivo con riesgo de deterioro o degradación.
8. La eslinga se encuentra anudada y/o retorcida en alguna sección.
9. Se utilizan elementos para proteger la eslinga de bordes filosos y abrasivos al roce de la carga, para evitar un corte repentino.
10. Se almacena la eslinga textil en lugares limpios y secos y lejos de fuentes de calor, rayos ultravioleta o luz solar.
11. Daños químicos.

## Comportamiento digital propuesto

Formulario estándar de un elemento, conservando Tipo, Longitud y WLL como identificación manual.

La interfaz debe normalizar la respuesta a `Cumple / No cumple / No aplica`, aunque algunos criterios estén redactados como presencia de daño.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Puntos que requieren validación

1. Confirmar si `turno` sigue siendo necesario en V1.
2. La nota oficial indica que una eslinga con daños físicos considerables debe notificarse inmediatamente y darse de baja. Esta instrucción se conserva como requisito documental, pero no debe convertirse automáticamente en `blocking` hasta que Seguridad Industrial clasifique los criterios.

---

# 13. 02040p18 — Racks

## Fuente

- Código: `02040p18`
- Revisión: `02`
- Fecha del documento: `05.06.2024`
- Título: `Check List Rack`

## Familia

`TYPED_ASSET`

## Unidad digital confirmada

Cada inspección corresponde a **un rack específico**.

## Datos generales presentes en la fuente

- Semana
- Fecha
- Nave
- Observaciones

## Tipos de rack presentes en la fuente

- Rack Logística
- Rack Fabricación
- Rack Medición
- Rack Componentes

## Criterios

1. Se encuentra anclado al piso.
2. Se encuentran todos los pernos de anclaje.
3. Se encuentran en buen estado los protectores anti impacto.
4. Se encuentran debidamente anclados al piso los protectores anti impacto.
5. Se encuentran instalados todos los pernos de uniones entre las estructuras del rack.
6. Se encuentra en buen estado las uniones del rack.
7. Se encuentran en buen estado las vigas.
8. Se encuentran todos los elementos de fijación en las vigas.
9. Las vigas se encuentran alineadas horizontalmente.
10. Se encuentran en buen estado los pilares.
11. Los pedestales se encuentran alineados verticalmente.
12. Se encuentran debidamente anclados o sujetados los largueros en los pedestales.
14. Protección anti caídas se encuentra en buen estado.
15. Cuenta con travesaños.
16. Los travesaños se encuentran en buen estado.
17. El rack se encuentra nivelado.
18. El área se encuentra ordenada y limpia.
19. Se encuentra en buen estado la base soldada del pilar.
20. Las soldaduras que unen las piezas se encuentran en buen estado.

## Comportamiento digital confirmado

Flujo:

`Seleccionar tipo de rack → Identificar rack/ubicación → Evaluar criterios → Evidencias → Enviar`

No se deben evaluar cuatro tipos de rack en paralelo dentro de la misma submission.

## Identificación adicional propuesta

La fuente no muestra un identificador único explícito del rack. Para cumplir con la decisión de conservar identificación, la Spec deberá definir cómo se capturará un identificador/ubicación suficientemente discriminante sin inventar un catálogo centralizado.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Punto que requiere validación

La numeración oficial salta del 12 al 14. No debe inventarse un criterio 13. Los IDs técnicos digitales deben ser independientes de la numeración visual.

---

# 14. 02040p69 — Cáncamos

## Fuente

- Código: `02040p69`
- Revisión: `01`
- Fecha del documento: `13.10.2025`
- Título: `02040p69_Checklist_Cancamos`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Un cáncamo específico.

## Identificación presente en la fuente

- Tipo
- Diámetro
- Capacidad (WLL)
- Área / proyecto
- Semana
- Fecha
- Nombre del trabajador
- Turno (1o. / 2o. en la matriz física)

## Criterios

1. ¿El cáncamo tiene identificación legible del fabricante, tipo, grado y carga nominal (WLL)?
2. ¿El tipo de cáncamo es adecuado para la aplicación? (roscado estándar, de anillo giratorio, tipo articulado, etc.)
3. ¿Hay picaduras, corrosión, muescas o fisuras visibles?
4. ¿La rosca es compatible con el equipo o pieza a levantar (tipo y profundidad correctas)?
5. ¿El cáncamo no presenta grietas, desgastes, deformaciones ni corrosión excesiva?
6. ¿La rosca no está dañada, aplastada, desgastada ni contaminada con suciedad o pintura?
7. ¿El anillo, si es giratorio o tipo articulado, se mueve libremente y no está deformado?
8. ¿Se ha utilizado una arandela o espaciador solo si es aprobado por el fabricante?
9. ¿La dirección de carga está dentro del rango permitido por el fabricante (normalmente 0° a 45° para cáncamos con hombro)?
10. ¿Los cáncamos defectuosos se retiran de inmediato del servicio?
11. ¿Existe lugar de almacenamiento definido?

## Comportamiento digital propuesto

Formulario estándar de un elemento, conservando Tipo, Diámetro y WLL.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Puntos que requieren validación

1. Confirmar si `turno` sigue siendo necesario en V1.
2. La nota oficial indica que un cáncamo con daños físicos considerables debe notificarse inmediatamente y darse de baja. La clasificación `blocking` queda pendiente de Seguridad Industrial.

---

# 15. 02040p68 — Grilletes

## Fuente

- Código: `02040p68`
- Revisión: `01`
- Fecha del documento: `13.10.2025`
- Título: `02040p68_Checklist_Grilletes`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Un grillete específico.

## Identificación presente en la fuente

- Recto / Omega
- Diámetro
- Capacidad (WLL)
- Área / proyecto
- Semana
- Fecha
- Nombre del trabajador
- Turno (1o. / 2o. en la matriz física)

## Criterios

1. Cuerpo del grillete: ¿Está marcado con el nombre o marca registrada del fabricante, la carga nominal (WLL) y el tamaño?
2. Pasador del grillete: ¿Está marcado con el nombre o marca registrada del fabricante, el grado, tipo de material o capacidad de carga?
3. ¿Hay picaduras, corrosión, muescas o fisuras visibles?
4. Desgaste: ¿Alguna parte del grillete presenta un desgaste mayor al 10% de sus dimensiones originales?
5. ¿El grillete presenta torceduras, elongaciones, dobleces, grietas o roturas?
6. ¿Se observan indicios de daño por calor, como decoloración azul o salpicaduras de soldadura?
7. ¿Abertura de la garganta sin distorsión excesiva?
8. ¿El pasador está completamente encajado y apretado, con el hombro en contacto con el cuerpo del grillete?
9. ¿El pasador está libre de daños, como deformaciones o rosca dañada?
10. ¿La carga aplicada no excede la capacidad nominal del grillete?
11. ¿Existe lugar de almacenamiento definido?

## Comportamiento digital propuesto

Formulario estándar de un elemento.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Puntos que requieren validación

1. Confirmar si `turno` sigue siendo necesario en V1.
2. La nota oficial indica que un grillete con daños físicos considerables debe notificarse inmediatamente y darse de baja. `blocking` queda pendiente de Seguridad Industrial.

---

# 16. 02040p71 — Patín Hidráulico

## Fuente

- Código: `02040p71`
- Revisión: `02`
- Fecha del documento: `05.06.2024`
- Título: `Check List Patin Hidraulico`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Un patín hidráulico específico.

## Datos generales presentes en la fuente

- Nave
- Área
- Semana
- Fecha
- Capacidad máxima
- Observaciones

## Criterios

1. Cuenta con identificación de capacidad máxima.
2. La empuñadura se encuentra en buen estado.
3. Se encuentra en buen estado la palanca de elevación, punto muerto y descenso.
4. Barra de tracción en buen estado.
5. Muelle de retorno a vertical cuenta con grasa y en buen estado.
6. Conjunto hidráulico cuenta con grasa y en buen estado.
7. Ruedas directrices en buen estado.
8. Leva de mecanismo de elevación en buen estado.
9. Las dos barras de empuje de elevación en buen estado.
10. Ruedas traseras en buen estado.
11. Chasis en buen estado.
12. Tiene sus protecciones y guardas instaladas.
13. Las cadenas y sistema se encuentran lubricados.

## Comportamiento digital propuesto

Formulario estándar de equipo individual.

Debe conservar `Capacidad máxima` como dato de identificación.

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Punto que requiere validación

La fuente muestra una fila numerada 15 sin criterio. No se debe crear una pregunta adicional para rellenar la secuencia.

---

# 17. 02040p11 — Equipo de Protección contra Caídas

## Fuente

- Código: `02040p11`
- Revisión: `03`
- Fecha del documento: `08.05.2025`
- Título: `02040p11_checklist_Equipo_de_protección_contra_caídas`

## Familia

`COMPOSITE_EQUIPMENT`

## Unidad digital

Un sistema de protección contra caídas compuesto por los elementos que se utilizarán en el evento actual.

## Datos generales presentes en la fuente

- FFT o Contratista
- Fecha
- Observaciones
- Firma del inspector por cada día de trabajo

## Componentes principales identificados

### A. Arnés

Identificación:

- Marca arnés
- N° serie
- Fecha de fabricación

Criterios / elementos visibles en la fuente:

**Elementos de polyester/nylon**

- Tirantes/bandas
- Hombros
- Muslos
- Subpélvica/subglútea
- Costuras
- Correa y extremos en hombros
- Correa y extremos en muslos
- Etiquetas legibles
- Correas subpélvicas

**Elementos metálicos**

- Anillo "D" de espalda
- Ajustador/hebillas
- Hebillas de correas en muslos

**Elementos de plástico**

- Galleta de anillo "D"
- Guía para correa del tórax
- Trabilla
- Etiquetas legibles

### B. Línea de vida y amortiguador

Identificación:

- Marca línea de vida y amortiguador
- N° serie
- Fecha de fabricación

Criterios / elementos visibles:

- Estructura general
- Forro del cable
- Cuerpo de línea
- Costuras
- Amortiguador de caída
- Forro plástico
- Forro textil
- Unión con ganchos en ambos extremos

**Mosquetones/ganchos**

- Deformación
- Oxidación
- Golpes

**Seguros**

- Rígidos
- Manejables
- Cierran bien
- Doble seguro

### C. Línea de vida autorretráctil

Identificación:

- Marca línea de vida autorretráctil
- N° serie
- Fecha de fabricación

Criterios / elementos visibles:

- Estructura general
- Carcaza plástica
- Costuras
- Unión con gancho
- Cuerpo de línea

**Mosquetones/ganchos**

- Deformación
- Oxidación
- Golpes

**Seguros**

- Rígidos
- Manejables
- Cierran bien
- Doble seguro

### D. Conector punto fijo

Identificación:

- Marca conector punto fijo
- N° serie
- Fecha de fabricación

Criterios / elementos visibles:

- Estructura general
- Forro del cable
- Cuerpo de línea
- Costuras

**Elemento metálico/conexión**

- Deformación
- Oxidación
- Golpes

## Comportamiento digital propuesto

Primero se seleccionan los componentes que formarán parte del sistema de protección contra caídas actual.

Solamente los bloques seleccionados se muestran y validan.

Cada componente debe conservar su propia identificación cuando la fuente la contempla.

Ejemplo:

`Seleccionar componentes → Identificar cada componente → Evaluar criterios de cada componente → Evidencias → Enviar una sola inspección`

## Evidencia

Obligatoria por cada criterio `NON_COMPLIANT`.

## Puntos que requieren validación

1. La fuente indica que un elemento en mal estado debe ser retirado de forma inmediata del área de trabajo. La clasificación concreta de criterios `blocking` debe ser entregada por Seguridad Industrial antes de automatizar esta disposición.
2. Confirmar si en V1 es obligatorio capturar marca, N° de serie y fecha de fabricación para todos los componentes seleccionados o si algunos pueden carecer legítimamente de esos datos.

---

# 18. 02040p54 — Taladro Eléctrico

## Fuente

- Código: `02040p54`
- Revisión: `03`
- Fecha del documento: `13.10.2025`
- Título: `CHECK LIST - TALADRO ELÉCTRICO`

## Familia

`SINGLE_EQUIPMENT`

## Unidad digital

Un taladro eléctrico específico.

## Datos generales presentes en la fuente

- Proyecto
- Nombre del trabajador
- Área y ubicación
- Modelo
- Fecha de inicio
- Semana

## Criterios

1. Verificar el tope de profundidad.
2. Verificar la condición de la broca.
3. Verificar el interruptor.
4. Verificar estado de mango auxiliar.
5. Verificar el botón de cambio de marcha.
6. Verificar el botón de uso continuo.
7. Verificar el estado del broquero y revisión de muelas.
8. Verificar cable de alimentación y clavija.
9. Verificar botón selector (taladro-rotomartillo).
10. Verificar ruidos extraños en el motor.

## Comportamiento digital propuesto

Formulario estándar de equipo individual y candidato recomendado para la primera implementación funcional.

Permite validar el core de:

- identificación
- criterios normalizados
- evidencia obligatoria por no conformidad
- validación
- envío a Formspree
- metadatos de formulario/revisión

## Evidencia

Obligatoria por criterio `NON_COMPLIANT`.

## Observación

No se identifica en la fuente una dependencia condicional explícita entre los diez criterios.

---

# 19. Reglas transversales derivadas de la matriz

## 19.1 No replicar semanas/días

Las matrices de semanas y días pertenecen al soporte papel. V1 registra una inspección por submission y conserva su fecha/hora. El campo Semana no se solicita en ningún formulario.

## 19.2 No usar el número de fila como único ID

Existen anomalías reales de numeración en los documentos fuente, entre ellas:

- Escaleras: número 18 duplicado.
- Racks: no existe criterio 13.
- Patín hidráulico: aparece una fila 15 sin criterio.
- Herramienta manual: filas 15–26 vacías.

Por ello, cada criterio debe tener un `criterionId` semántico y estable.

## 19.3 No corregir silenciosamente el documento oficial

Si un criterio está duplicado, tiene una redacción ambigua o contiene un término aparentemente erróneo, la implementación debe:

1. conservar la referencia al original;
2. registrar la duda en la documentación/Spec;
3. recibir validación antes de modificar el significado.

## 19.4 Evidencia por no conformidad

La evidencia debe asociarse al criterio o elemento concreto que genera el `NON_COMPLIANT`.

## 19.5 Identificación sin catálogo

Los campos de identificación se capturan manualmente en V1. Su futura sustitución por catálogo, QR u otro mecanismo no debe alterar el significado histórico de las inspecciones existentes.

---

# 20. Pendientes globales antes de completar todas las Specs

| ID | Tema | Formularios afectados | Estado |
|---|---|---|---|
| P-01 | Definir criterios bloqueantes | Todos | Pendiente Seguridad Industrial |
| P-02 | Confirmar si `turno` se conserva como dato de contexto | Escaleras, Eslingas, Cáncamos, Grilletes y cualquier otro formato con 1o./2o. turno | Pendiente |
| P-03 | Resolver duplicidad 3.3 / 3.5 | Oxicorte | Pendiente Seguridad Industrial |
| P-04 | Definir función de filas vacías 15–26 | Herramienta Manual | Pendiente Seguridad Industrial |
| P-05 | Definir cómo se identifica cada herramienta dentro de un conjunto | Herramienta Manual | Pendiente |
| P-06 | Confirmar inspección individual vs captura masiva | EPP | Pendiente Seguridad Industrial |
| P-07 | Definir identificador discriminante del rack | Racks | Pendiente de diseño/validación |
| P-08 | Validar obligatoriedad de marca/serie/fecha de fabricación | Protección contra Caídas | Pendiente Seguridad Industrial |
| P-09 | Validar wording digital de criterios redactados como presencia de daño | Eslingas y otros criterios negativos. Extensión eléctrica conserva el texto de la fuente, según la [Spec 004](specs/004-form-extensionElectrica.md) | Pendiente fuera de Extensión Eléctrica |
| P-10 | Confirmar lista de trabajadores en inspección de área | Orden y Limpieza | Pendiente Seguridad Industrial |

---

# 21. Criterio para pasar un formulario a Spec

Un formulario puede considerarse listo para una Spec de implementación cuando:

- su unidad digital está definida;
- sus campos generales están identificados;
- sus datos de identificación están definidos;
- sus criterios están transcritos y validados;
- sus condiciones de aplicabilidad están definidas;
- se conocen sus campos requeridos;
- sus dudas documentales relevantes están resueltas o explícitamente fuera del alcance de la iteración;
- cuenta con endpoint/placeholder de Formspree definido por la Spec;
- no contradice `PROJECT_OVERVIEW.md` ni `INSPECTION_MODEL.md`.

La Spec debe incluir los campos generales obligatorios de la sección 2.7 y el envío de resultados a Formspree según la sección 2.2.

---

# 22. Próxima iteración recomendada

La siguiente Spec del Taladro Eléctrico definirá la actualización del envío a Formspree conforme a las secciones 2.2 y 2.7. La primera implementación se documenta en la [Spec 001](specs/001-form-taladroElectrico.md).
