# Manual de Instalacion — Frontend Terpel (SPA)

## 1. Descripcion General

**Terpel Front** es una Single Page Application (SPA) desarrollada en React 19 con TypeScript 5.9 que presenta la prueba tecnica de desarrollo. Permite visualizar estaciones de servicio, gestionar sus estados y navegar por las secciones de la evaluacion tecnica (frontend y backend).

**Tecnologias principales:**

| Componente | Tecnologia | Version |
|---|---|---|
| Libreria UI | React | 19.2.4 |
| Lenguaje | TypeScript | 5.9.3 |
| Build tool | Vite | 8.0.1 |
| Data fetching | TanStack React Query | 5.95.2 |
| Testing | Vitest + Testing Library | 4.1.2 / 16.3.2 |
| Contenedor | Docker + Docker Compose | 20.x+ / v2.x+ |
| Servidor de desarrollo | Vite Dev Server | 8.0.1 |

---

## 2. Prerequisitos

Antes de instalar, asegurate de tener instalado:

| Software | Version minima | Como verificar |
|---|---|---|
| Docker | 20.10+ | `docker --version` |
| Docker Compose | v2.0+ | `docker compose version` |
| Git | 2.x | `git --version` |

> **Nota:** NO es necesario instalar Node.js ni npm localmente. Todo se ejecuta dentro del contenedor Docker.

### Verificacion rapida de prerequisitos

```bash
docker --version
docker compose version
git --version
```

Los tres comandos deben responder con sus respectivas versiones sin errores.

---

## 3. Instalacion Paso a Paso

### Paso 1 — Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd terpel_front
```

### Paso 2 — Levantar la aplicacion

```bash
docker compose up -d --build
```

Este comando:
1. Construye la imagen Docker basada en Node 20
2. Instala las dependencias (`npm install` via volumen)
3. Levanta el servidor de desarrollo Vite con HMR
4. Expone la aplicacion en el puerto 5173

### Paso 3 — Instalar dependencias (primera vez)

Si es la primera vez que levantas el proyecto, ejecuta:

```bash
docker compose exec app npm install
```

Esto instala las dependencias en el volumen `node_modules` del contenedor.

### Paso 4 — Verificar que todo funciona

**a) Verificar que el contenedor esta corriendo:**

```bash
docker compose ps
```

Resultado esperado: servicio `app` con estado "running".

**b) Abrir la aplicacion en el navegador:**

Abrir: [http://localhost:5173](http://localhost:5173)

Debe mostrarse la pagina principal con el grid de estaciones de servicio.

**c) Verificar que el HMR funciona:**

Modifica cualquier archivo `.tsx` y verifica que el navegador se actualiza automaticamente sin recargar la pagina.

---

## 4. URLs de Acceso

| Recurso | URL |
|---|---|
| Aplicacion (desarrollo) | http://localhost:5173 |
| Prueba Frontend | http://localhost:5173 (vista por defecto) |
| Prueba Backend | Boton "Prueba Backend" en esquina superior derecha |

---

## 5. Comandos Utiles

| Comando | Descripcion |
|---|---|
| `docker compose up -d --build` | Construir y levantar el contenedor |
| `docker compose exec app npm run dev` | Iniciar servidor de desarrollo |
| `docker compose exec app npm run build` | Build de produccion |
| `docker compose exec app npm run test` | Ejecutar todos los tests (23 tests) |
| `docker compose exec app npm run test:watch` | Tests en modo watch (re-ejecuta al cambiar archivos) |
| `docker compose exec app npm run lint` | Ejecutar linter (ESLint) |
| `docker compose exec app npx tsc -b` | Verificacion de tipos TypeScript |
| `docker compose down` | Detener y eliminar contenedores |
| `docker compose logs -f app` | Ver logs en tiempo real |

---

## 6. Estructura del Proyecto

```
terpel_front/
├── docker/
│   └── node/
│       └── Dockerfile              ← Imagen Docker (Node 20)
├── public/
│   ├── favicon.svg                 ← Icono de la aplicacion
│   ├── icons.svg                   ← Sprite de iconos
│   └── openapi.json                ← Especificacion OpenAPI del backend
├── src/
│   ├── types/                      ← Interfaces TypeScript
│   │   ├── station.ts              ← Station, StationStatus
│   │   ├── service.ts              ← Service
│   │   ├── stationService.ts       ← StationService (relacion)
│   │   └── contentItem.ts          ← ContentItem (modelo normalizado)
│   ├── services/
│   │   ├── data/mockData.ts        ← Datos mock con errores intencionales
│   │   ├── mappers/                ← Normalizan inconsistencias de la API
│   │   └── stationService.ts       ← Simula API async con delay
│   ├── hooks/                      ← Custom hooks (React Query)
│   │   ├── useStations.ts          ← Lista de estaciones
│   │   ├── useStationServices.ts   ← Servicios por estacion
│   │   └── useToggleStationStatus.ts ← Mutacion de estado
│   ├── components/                 ← Componentes reutilizables
│   │   ├── StationList.tsx         ← Grid de estaciones
│   │   ├── StationCard.tsx         ← Card individual
│   │   ├── ServiceList.tsx         ← Lista de servicios
│   │   ├── ServiceIcon.tsx         ← Icono SVG por servicio
│   │   ├── Modal.tsx               ← Modal accesible con portal
│   │   ├── FloatingMenu.tsx        ← Menu FAB radial
│   │   ├── LoadingSpinner.tsx      ← Indicador de carga
│   │   └── ErrorMessage.tsx        ← Mensaje de error
│   ├── pages/                      ← Paginas de la aplicacion
│   │   ├── StationsPage.tsx        ← Panel principal (Seccion 1)
│   │   ├── ProblemsPage.tsx        ← Seccion 2: Problemas
│   │   ├── BugsPage.tsx            ← Seccion 3: Bugs
│   │   ├── DeliverablesPage.tsx    ← Seccion 4: Entregables
│   │   ├── BackendStationsPage.tsx ← Backend: Resumen
│   │   ├── BackendProblemsPage.tsx ← Backend: Problemas
│   │   ├── BackendBugsPage.tsx     ← Backend: Bugs
│   │   └── BackendDeliverablesPage.tsx ← Backend: Entregables
│   ├── __tests__/                  ← Tests automatizados
│   │   ├── mappers.test.ts         ← 10 tests de normalizacion
│   │   ├── useStations.test.tsx    ← 3 tests del hook
│   │   ├── StationCard.test.tsx    ← 8 tests del componente
│   │   └── setup.test.ts           ← 2 tests de configuracion
│   ├── App.tsx                     ← Componente raiz + enrutamiento
│   ├── main.tsx                    ← Punto de entrada
│   └── index.css                   ← Tema visual global
├── docker-compose.yml              ← Orquestacion del contenedor
├── package.json                    ← Dependencias y scripts
├── tsconfig.json                   ← Configuracion TypeScript
├── vite.config.ts                  ← Configuracion Vite
└── openapi.json                    ← OpenAPI JSON (fuente)
```

---

## 7. Arquitectura

La aplicacion usa una **arquitectura por capas** con flujo unidireccional de datos:

```
Datos Mock (API simulada)
    ↓
Mappers                   ← Normalizan inconsistencias
    ↓
stationService            ← Simula delay de red (async)
    ↓
Custom Hooks              ← React Query (cache, stale, refetch)
    ↓
Componentes               ← UI declarativa (cards, modal, iconos)
    ↓
Pages                     ← Composicion de componentes
    ↓
App                       ← Enrutamiento + estado global
```

**Beneficios:**
- Cada capa solo depende de la inferior
- Los mappers absorben cambios de API sin afectar la UI
- React Query maneja cache, estados de carga y errores
- Tests independientes por capa

---

## 8. Ejecucion de Tests

### Todos los tests (23 tests)

```bash
docker compose exec app npm run test
```

### Tests en modo watch (desarrollo)

```bash
docker compose exec app npm run test:watch
```

### Distribucion de tests

| Suite | Cantidad | Capa validada |
|---|---|---|
| `mappers.test.ts` | 10 | Normalizacion de datos |
| `StationCard.test.tsx` | 8 | Componente: render + interaccion + accesibilidad |
| `useStations.test.tsx` | 3 | Hook + mock API (data, loading, error) |
| `setup.test.ts` | 2 | Configuracion del entorno de test |
| **Total** | **23** | Todas las capas |

---

## 9. Solucion de Problemas Comunes

| Problema | Causa | Solucion |
|---|---|---|
| Puerto 5173 ocupado | Otra aplicacion usa el puerto | Cambiar el puerto en `docker-compose.yml` |
| `npm install` falla | Volumen corrupto | `docker compose down -v && docker compose up -d --build` |
| HMR no funciona | Contenedor no detecta cambios | Verificar que el volumen `.:/app` esta montado |
| Tests fallan | Dependencias no instaladas | `docker compose exec app npm install` |
| Pagina en blanco | Error de compilacion | Ver consola del navegador y logs: `docker compose logs -f app` |
| TypeScript error | Tipos desactualizados | `docker compose exec app npx tsc -b` |

---

## 10. Requisitos de Hardware

| Recurso | Minimo | Recomendado |
|---|---|---|
| RAM | 2 GB | 4 GB |
| Disco | 1 GB libre | 3 GB libres |
| CPU | 2 nucleos | 4 nucleos |
| SO | Linux, macOS, Windows (con Docker Desktop) | Linux |
