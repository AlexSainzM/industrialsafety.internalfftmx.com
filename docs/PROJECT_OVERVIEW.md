# FFT Industrial Safety Checklists

## PROJECT_OVERVIEW

**Estado:** Draft
**Versión:** 0.2
**Fecha:** 2026-11-25

---

## 1. Propósito del documento

Este documento describe el propósito, alcance, principios y arquitectura general del proyecto **FFT Industrial Safety Checklists**.

Su objetivo es funcionar como una fuente estable de contexto para:

* desarrollo manual;
* agentes de programación;
* generación de Specs;
* revisión de cambios;
* futuras iteraciones del proyecto.

Las reglas específicas relacionadas con qué representa una inspección y cómo deben comportarse las respuestas se encuentran en:

`docs/INSPECTION_MODEL.md`

Las particularidades de cada checklist oficial deberán documentarse posteriormente en:

`docs/FORM_LOGIC_MATRIX.md`

---

# 2. Contexto

FFT México utiliza diferentes formatos de Seguridad Industrial para verificar herramientas, equipos, elementos de protección, áreas y determinadas operaciones antes o durante su utilización.

Actualmente estos registros provienen de documentos diseñados principalmente para impresión.

Muchos de ellos utilizan matrices por:

* día;
* semana;
* turno;
* trabajador;
* tipo de equipo.

La aplicación **NO DEBE replicar literalmente esas matrices**.

El sistema debe digitalizar el **evento de inspección realizado en el momento en que una herramienta, equipo, conjunto o área va a ser utilizado o revisado**.

Por lo tanto:

> Una submission digital representa una inspección concreta realizada en un momento determinado.

La fecha y hora del evento reemplazan la necesidad de conservar columnas físicas correspondientes a días o semanas. El campo Semana de los formatos físicos no se solicita en ningún formulario. [Spec 004](specs/004-form-extensionElectrica.md)

---

# 3. Objetivo general

Digitalizar los checklists de Seguridad Industrial de FFT México mediante una aplicación web que permita:

1. iniciar sesión en el catálogo con el perfil de inspector del piloto;
2. consultar y seleccionar una inspección disponible;
3. registrar las condiciones encontradas con el nombre del inspector precargado;
4. adjuntar evidencia cuando exista una no conformidad;
5. enviar cada inspección al endpoint correspondiente de Formspree;
6. consultar posteriormente los registros desde Notion, fuera del sitio de captura.

La [Spec 003](specs/003-UsersManagement.md) define la sesión local para el grupo inicial de inspectores.

---

# 4. Principios del proyecto

## 4.1 Digitalizar el proceso, no el papel

Los documentos originales son la referencia para:

* criterios;
* datos requeridos;
* identificación del equipo;
* instrucciones de Seguridad Industrial;
* estructura lógica de la inspección.

No son una especificación de interfaz.

La aplicación puede reorganizar la información siempre que conserve su intención funcional.

---

## 4.2 Una inspección representa un evento

La unidad principal del sistema es `Inspection`.

Cada envío debe representar una inspección realizada en un momento concreto.

No se deben generar formularios digitales que acumulen semanas completas de resultados dentro de una sola submission.

---

## 4.3 Frontend primero

La V1 debe funcionar principalmente como una aplicación frontend estática.

Tecnologías permitidas inicialmente:

* HTML;
* CSS;
* JavaScript;
* Bootstrap;
* Formspree.

No debe introducirse un framework frontend si no existe una necesidad claramente documentada en una Spec.

---

## 4.4 Formspree como persistencia inicial

Todos los formularios de inspección enviarán sus registros a Formspree. Cada formulario tendrá su propio endpoint.

Ejemplo conceptual:

```text
Taladro eléctrico
        ↓
Formspree endpoint A

Esmeril angular
        ↓
Formspree endpoint B

Extensión eléctrica
        ↓
Formspree endpoint C
```

Todos los formularios deben enviar **Nombre del trabajador**, **Proyecto** y **Área / Ubicación** como campos obligatorios. El nombre completo viene de la sesión y aparece en un campo de solo lectura. Proyecto y Área / Ubicación se capturan en cada inspección.

El valor enviado por cada criterio respondido debe ser `Cumple`, `No cumple` o `No aplica`. Las claves de los campos comunes y la correspondencia de los resultados se detallan en el [modelo de inspección](INSPECTION_MODEL.md).

---

## 4.5 Separar dominio y transporte

La forma en que Formspree recibe un formulario no debe convertirse en el modelo del dominio.

Conceptualmente:

```text
Inspection
    ↓
Formspree Adapter
    ↓
Formspree
```

Esto permitirá reemplazar Formspree en el futuro sin rediseñar todos los formularios.

---

## 4.6 No exponer secretos

La aplicación frontend NO DEBE contener:

* API keys privadas;
* tokens administrativos;
* contraseñas corporativas o reutilizadas en otros servicios;
* secretos de Formspree;
* credenciales de servicios futuros.

El piloto define sus usuarios, nombres y claves en `data/users.json`. El navegador descarga ese archivo y valida el acceso localmente. Cualquiera que pueda abrir el sitio puede leer el archivo, por lo que las claves deben ser exclusivas del piloto. La sesión sirve para precargar el nombre en la interfaz. El frontend carece de verificación de identidad y permisos del lado del servidor.

La captura usa Formspree y la revisión se realiza en Notion. El sitio estático prescinde de credenciales de ambos servicios.

---

# 5. Usuarios funcionales

En V1 existen dos casos de uso principales.

## 5.1 Inspector

Persona que realiza una inspección antes o durante la utilización de una herramienta, equipo, conjunto o área.

Puede:

* iniciar y cerrar sesión desde el catálogo;
* visualizar inspecciones disponibles;
* seleccionar una;
* revisar el nombre precargado y completar los datos de la inspección;
* identificar el elemento inspeccionado;
* responder los criterios;
* adjuntar evidencias;
* enviar la inspección.

---

## 5.2 Revisor

Persona que consulta en Notion las inspecciones previamente registradas.

Puede:

* visualizar submissions;
* identificar formulario;
* consultar trabajador;
* consultar equipo o elemento inspeccionado;
* revisar resultados;
* identificar no conformidades;
* consultar evidencias.

En V1, `Inspector` y `Revisor` describen casos de uso. La sesión local se usa para la captura.

---

# 6. Alcance de V1

Los formularios de V1 aplican los requisitos de campos obligatorios y valores de envío a Formspree de la sección 4.4.

La V1 DEBE incluir:

* inicio y cierre de sesión local para el piloto;
* catálogo de inspecciones disponibles;
* formularios individuales;
* reutilización de la plantilla visual existente;
* identificación de equipo o elemento;
* respuestas normalizadas;
* evidencia obligatoria cuando exista un `No cumple`;
* observaciones cuando corresponda;
* envío a Formspree;
* un endpoint diferente de Formspree por formulario;
* conservación del documento/revisión que originó cada formulario digital.

---

# 7. Fuera de alcance de V1

No deben implementarse salvo que exista una Spec que modifique explícitamente este alcance:

* autenticación del lado del servidor y gestión centralizada de cuentas;
* recuperación de contraseña;
* roles y permisos;
* administración de usuarios;
* catálogo centralizado de herramientas;
* catálogo centralizado de activos;
* historial por activo;
* códigos QR;
* aprobación de inspecciones;
* workflow de remediación;
* firmas digitales avanzadas;
* backend propio;
* base de datos propia;
* edición administrativa de submissions;
* notificaciones automáticas;
* dashboards analíticos avanzados;
* visor de registros e integración con Notion desde el sitio de captura.

---

# 8. Identificación de equipos

La ausencia de un catálogo centralizado NO elimina la necesidad de identificar el elemento inspeccionado.

Los formularios deben conservar, cuando corresponda, datos como:

* número económico;
* número de serie;
* modelo;
* tipo;
* diámetro;
* capacidad;
* WLL;
* fecha de fabricación.

Los campos de identificación del elemento dependen del formulario y se añaden a los datos generales comunes.

Estos valores serán capturados manualmente en V1.

En versiones futuras podrán sustituirse parcialmente mediante:

* catálogo de activos;
* selector de equipos;
* búsqueda;
* código QR;
* NFC;
* datos precargados.

---

# 9. Catálogo de inspecciones

El usuario no debe acceder normalmente mediante enlaces directos proporcionados manualmente.

La página de entrada habilita el catálogo después del inicio de sesión. Si alguien abre un formulario directamente sin una sesión activa, vuelve al catálogo para iniciar sesión.

Conceptualmente:

```text
/
│
├── Taladro eléctrico
├── Extensión eléctrica
├── Esmeril angular
├── Máquina de soldar
├── Herramienta manual
├── EPP
├── Escaleras
├── Eslingas
├── Grilletes
├── Cáncamos
├── Protección contra caídas
├── Patín hidráulico
├── Racks
├── Orden y limpieza
└── Oxicorte
```

El catálogo debe representar **inspecciones disponibles**, no exclusivamente herramientas físicas.

Esto permite incorporar correctamente formularios relacionados con:

* áreas;
* operaciones;
* sistemas;
* conjuntos de elementos.

---

# 10. Tipos funcionales de inspección

No todos los formularios tienen el mismo comportamiento.

El sistema debe poder representar al menos las siguientes familias.

## 10.1 SINGLE_EQUIPMENT

Una inspección corresponde a un equipo o elemento específico.

Ejemplos:

* taladro;
* extensión eléctrica;
* esmeril;
* máquina de soldar;
* patín hidráulico;
* eslinga;
* grillete;
* cáncamo;
* rack específico.

---

## 10.2 MULTI_ITEM

Una inspección representa varios elementos utilizados conjuntamente en un mismo evento.

Caso principal:

* herramienta manual.

El trabajador selecciona las herramientas que utilizará y solamente inspecciona las seleccionadas.

---

## 10.3 COMPOSITE_EQUIPMENT

Una inspección representa un sistema compuesto por varios elementos opcionales.

Ejemplos:

* EPP;
* equipo de protección contra caídas.

La selección de componentes determina qué bloques deben mostrarse.

---

## 10.4 CONDITIONAL_EQUIPMENT

El tipo de equipo determina qué criterios aplican.

Caso principal:

* escaleras.

La interfaz debe mostrar:

1. criterios generales;
2. criterios específicos del tipo seleccionado.

---

## 10.5 AREA_INSPECTION

La unidad inspeccionada es un área o condición de trabajo.

Caso principal:

* orden y limpieza.

---

## 10.6 OPERATION_INSPECTION

La inspección combina:

* herramienta/equipo;
* condiciones del entorno;
* requisitos operativos.

Caso principal:

* oxicorte.

---

# 11. Racks

Cada inspección debe representar **un rack específico**.

El formulario original puede contener diferentes tipos de rack dentro de una misma matriz, pero la aplicación no debe registrar varios racks dentro de la misma submission.

El flujo esperado es:

```text
Seleccionar tipo
        ↓
Identificar rack
        ↓
Inspeccionar
        ↓
Enviar
```

---

# 12. Herramienta manual

Una inspección de herramienta manual representa **el conjunto de herramientas que utilizará el trabajador en ese evento**.

Ejemplo:

```text
Herramientas seleccionadas:

✓ Martillo
✓ Flexómetro
✓ Desarmadores
```

La submission seguirá siendo una sola inspección.

No deben crearse tres submissions independientes.

---

# 13. Evidencias

Todos los formularios deben soportar evidencia.

La evidencia es **obligatoria cuando exista un resultado `No cumple`**.

Los requisitos detallados se encuentran en `INSPECTION_MODEL.md`.

---

# 14. Criterios bloqueantes

No todos los criterios deben asumirse automáticamente como bloqueantes.

Seguridad Industrial será responsable de definir cuáles criterios implican que el elemento no puede utilizarse.

Hasta que dicha clasificación exista:

* el sistema debe registrar la no conformidad;
* debe registrar la evidencia;
* no debe inventar automáticamente una disposición operacional.

---

# 15. Plantilla de formulario

Existe una plantilla base del proyecto ubicada actualmente en:

```text
assets/templetes/form_v1/
├── index.html
├── main.js
└── styles.css
```

Esta plantilla debe considerarse la referencia inicial de:

* identidad visual;
* estructura;
* componentes reutilizables;
* comportamiento esperado del formulario.

Las Specs pueden modificar o evolucionar la plantilla.

Una implementación individual no debe alterar directamente la plantilla base sin que la Spec lo solicite.

---

# 16. Arquitectura conceptual

```text
                 ┌──────────────────────────┐
                 │ Sesión del inspector     │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │ Catálogo de inspecciones │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │       Formulario         │
                 │                          │
                 │ Datos                    │
                 │ Equipo                   │
                 │ Criterios                │
                 │ Evidencias               │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │       Validación         │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │ Formspree endpoint       │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │ Formspree submissions    │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │ Revisión en Notion       │
                 └──────────────────────────┘
```

---

# 17. Harness Engineering

El repositorio debe proporcionar suficiente contexto para que un agente de desarrollo no tenga que inferir las reglas del sistema desde cero.

El flujo esperado para cualquier nueva implementación es:

```text
Documento oficial
        ↓
Análisis funcional
        ↓
FORM_LOGIC_MATRIX
        ↓
Spec ejecutable
        ↓
Implementación
        ↓
Validaciones
        ↓
Revisión
```

El PDF oficial NO debe entregarse como única instrucción a un agente esperando que éste determine libremente la implementación.

---

# 18. Jerarquía de documentación

Cuando un agente trabaje en el proyecto debe consultar, en este orden:

```text
1. docs/PROJECT_OVERVIEW.md
2. docs/INSPECTION_MODEL.md
3. docs/FORM_LOGIC_MATRIX.md
4. Spec correspondiente
5. assets/templetes/form_v1/
6. Código existente
```

Una Spec puede añadir o cambiar comportamiento para una iteración concreta.

No debe contradecir silenciosamente los documentos estables.

Si existe una contradicción, debe señalarse antes de implementar.

---

# 19. Principio de implementación

Debe preferirse:

* código simple;
* comportamiento explícito;
* funciones pequeñas;
* contratos predecibles;
* reutilización donde exista comportamiento realmente común;
* validaciones deterministas.

Debe evitarse:

* abstracción prematura;
* motores genéricos innecesarios;
* lógica oculta;
* formularios construidos mediante grandes cadenas de condiciones;
* copiar y pegar reglas críticas en numerosos formularios;
* depender de la estructura visual de los PDFs.

---

# 20. Estrategia de implementación inicial

El primer formulario recomendado para validar el modelo común es:

**Taladro eléctrico**

Razones:

* corresponde a un equipo individual;
* tiene identificación;
* contiene un conjunto reducido de criterios;
* utiliza respuestas estándar;
* permite validar evidencia;
* permite validar Formspree;
* no requiere lógica condicional compleja.

Una vez validado el flujo estándar, debe implementarse un formulario con comportamiento compuesto o condicional para comprobar que la arquitectura no depende exclusivamente del caso simple.

---

# 21. Fuente de verdad

Para la implementación funcional:

**Documento oficial**
define qué debe inspeccionarse.

**FORM_LOGIC_MATRIX**
define cómo se interpreta digitalmente.

**INSPECTION_MODEL**
define las reglas comunes.

**Spec**
define qué se implementa en una iteración.

**Código**
implementa esas decisiones.

El código no debe convertirse en la única fuente de conocimiento del proyecto.
