# Manual de Usuario — Frontend Terpel (SPA)

## 1. Introduccion

La **SPA Terpel Front** es una aplicacion web que permite visualizar y gestionar estaciones de servicio Terpel. Ademas, sirve como plataforma de presentacion de la prueba tecnica, mostrando las respuestas a los escenarios planteados tanto para frontend como para backend.

Con esta aplicacion puedes:

- **Visualizar** estaciones de servicio en un grid interactivo
- **Consultar** los servicios de cada estacion activa
- **Cambiar el estado** de una estacion (activa/inactiva)
- **Navegar** por las secciones de la prueba tecnica (frontend y backend)
- **Descargar** la documentacion de la API (OpenAPI JSON)

---

## 2. Acceso a la Aplicacion

| Recurso | URL |
|---|---|
| Aplicacion | `http://localhost:5173` |
| Prueba Frontend | Vista por defecto al cargar |
| Prueba Backend | Boton verde "Prueba Backend" en esquina superior derecha |

### Requisitos del navegador

La aplicacion es compatible con navegadores modernos:

| Navegador | Version minima |
|---|---|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

---

## 3. Navegacion General

La aplicacion tiene dos contextos principales: **Frontend** y **Backend**. Cada uno tiene su propio contenido pero comparte la misma estructura de secciones.

### Cambiar entre Frontend y Backend

- **Boton esquina superior derecha:** Siempre visible. Muestra "Prueba Backend" (verde) cuando estas en el contexto frontend, y "Prueba Frontend" (rojo) cuando estas en el contexto backend.

### Menu flotante (esquina inferior derecha)

Un boton circular en la esquina inferior derecha despliega un menu radial con acceso a las secciones:

| Seccion | Contenido |
|---|---|
| Seccion 2 | Problemas y Trabajo en equipo |
| Seccion 3 | Logica en solucion de bugs |
| Seccion 4 | Entregables finales |

El menu se adapta automaticamente al contexto: en frontend muestra las secciones frontend, en backend las secciones backend.

### Volver al inicio

Desde cualquier seccion, el boton de flecha izquierda en la barra superior te lleva de vuelta al panel principal del contexto actual.

---

## 4. Contexto Frontend — Seccion 1: Panel Principal

### Vista general

Al cargar la aplicacion se muestra el **panel principal** con un grid de estaciones de servicio. Cada estacion se presenta como una tarjeta (card) con:

| Elemento | Descripcion |
|---|---|
| Nombre | Nombre de la estacion (ej: "Estacion Norte Bogota") |
| Estado | Badge verde (activa/publicada) o gris (inactiva/borrador) |
| Fecha | Tiempo relativo desde la ultima actualizacion |
| Boton toggle | Cambia el estado entre activa e inactiva |
| Boton "Ver servicios" | Abre el modal con los servicios (solo si esta activa) |

### Interacciones

**Ver servicios de una estacion:**
1. Verificar que la estacion tenga estado "Publicada" (badge verde)
2. Hacer clic en "Ver servicios"
3. Se abre un modal con los iconos de los servicios disponibles

**Cambiar estado de una estacion:**
1. Hacer clic en el boton toggle de la tarjeta
2. El estado cambia entre "Publicada" y "Borrador"
3. Aparece un indicador "Guardando..." en la barra superior mientras se procesa

**Cerrar el modal:**
- Hacer clic en la X del modal
- Hacer clic fuera del modal (en el fondo oscuro)
- Presionar la tecla Escape

### Servicios disponibles

Los servicios se muestran como iconos sin texto. Al pasar el cursor sobre cada icono aparece el nombre del servicio:

| Icono | Servicio |
|---|---|
| Gasolina | Combustible |
| Llama | Gas |
| Tienda | Minimercado |
| Auto | Lavadero |

---

## 5. Contexto Frontend — Seccion 2: Problemas y Trabajo en equipo

Presenta las respuestas a escenarios de trabajo colaborativo:

**Escenario:** El equipo de diseno decide cambiar el layout de cards a tabla y el CMS cambia el campo `status` a `state`.

| Subseccion | Pregunta |
|---|---|
| 6.1 | ¿Como minimizar el impacto del cambio? |
| 6.2 | ¿Como coordinar el contrato con backend/CMS? |
| 6.3 | ¿Como evitar que cambios rompan produccion? |

Cada subseccion incluye respuestas detalladas con estrategias, ejemplos de codigo y listas de buenas practicas.

---

## 6. Contexto Frontend — Seccion 3: Logica en solucion de bugs

Documenta el bug de `useEffect` con dependencias vacias y su solucion:

| Subseccion | Contenido |
|---|---|
| 7.1 | El bug: `useEffect` con `[]` no refetcha al cambiar parametros |
| 7.2 | Correccion basica: agregar `stationId` a las dependencias |
| 7.3 | Solucion con React Query (implementada en la app) |
| 7.4 | Mejora: cleanup con AbortController para evitar race conditions |

Incluye bloques de codigo con highlighting de errores (rojo) y soluciones (verde).

---

## 7. Contexto Frontend — Seccion 4: Entregables finales

Resumen ejecutivo de todo lo entregado:

| Bloque | Que muestra |
|---|---|
| Arquitectura | Arbol de carpetas con la estructura por capas |
| Stack tecnologico | Tabla de todas las tecnologias con justificacion |
| Decisiones tecnicas | Lista de patrones y decisiones clave |
| Testing | Distribucion de tests, piramide visual |
| Requisitos cumplidos | Checklist de todos los requisitos de la prueba |
| Comandos | Bloque de codigo con todos los comandos del proyecto |
| Anexos | Links a manuales y repositorio |

---

## 8. Contexto Backend

El contexto backend presenta la prueba tecnica desde la perspectiva del desarrollo backend (Java / Spring Boot). Se accede haciendo clic en el boton verde "Prueba Backend" en la esquina superior derecha.

### Panel principal (Resumen)

Muestra una vista general del proyecto backend:
- 4 tarjetas de resumen (Endpoints, Tests, Cobertura, Arquitectura)
- Badges de tecnologias (Java 21, Spring Boot, PostgreSQL, etc.)
- Diagrama de flujo de una peticion HTTP
- Estructura de paquetes del proyecto
- Links a GitHub, Swagger UI y OpenAPI JSON

### Secciones del backend

Las secciones siguen la misma estructura que el frontend:

| Seccion | Contenido backend |
|---|---|
| Seccion 2 | Caso situacional: endpoint lento con error 500 |
| Seccion 3 | Bug de BigDecimal (inmutabilidad en Java) |
| Seccion 4 | Entregables: endpoints, reglas de negocio, tests, stack, manuales |

---

## 9. Accesibilidad

La aplicacion implementa las siguientes caracteristicas de accesibilidad:

| Caracteristica | Implementacion |
|---|---|
| `aria-label` | En todos los botones interactivos |
| `role` | En elementos semanticos (status, presentation) |
| `focus-visible` | Outline global para navegacion con teclado |
| Modal accesible | Trap de foco, cierre con Escape, portal de React |
| Contraste | Tema dark con texto claro sobre fondo oscuro |

### Navegacion con teclado

- **Tab:** Navegar entre elementos interactivos
- **Enter / Space:** Activar botones y links
- **Escape:** Cerrar modal y menu flotante

---

## 10. Tema Visual

La aplicacion usa un tema futurista dark inspirado en la identidad visual de Terpel:

| Elemento | Valor |
|---|---|
| Color primario | Rojo Terpel (#E30613) |
| Color secundario | Amarillo Terpel (#FFD100) |
| Fondo principal | Dark (#0A0A0F) |
| Superficie | Dark elevada (#14141F) |
| Texto principal | Blanco suave (#F5F5F5) |
| Acento backend | Verde (#1A6B3C) |

El tema esta implementado con CSS custom properties en `src/index.css`, lo que facilita su modificacion o la creacion de temas alternativos.
