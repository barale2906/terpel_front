/**
 * Página de la Sección 4 — Entregables finales.
 *
 * Resume la arquitectura, stack tecnológico, decisiones técnicas
 * y documentación del proyecto. Funciona como presentación ejecutiva
 * de todo lo entregado.
 *
 * @param onBack - Callback para regresar a la vista principal
 */
import './SectionPage.css'

interface DeliverablesPageProps {
  onBack: () => void
}

export function DeliverablesPage({ onBack }: DeliverablesPageProps) {
  return (
    <div className="section-page">
      <header className="section-page__header">
        <button className="section-page__back" onClick={onBack} type="button" aria-label="Volver al panel principal">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 4: Entregables finales</h1>
      </header>

      <main className="section-page__content">
        <article className="section-page__block">
          <h2>Arquitectura del proyecto</h2>
          <div className="section-page__code-example">
            <pre><code>{`src/
├── types/          ← Interfaces TypeScript (Station, Service, ContentItem)
├── services/
│   ├── data/       ← Datos mock con errores originales preservados
│   ├── mappers/    ← Normalizan inconsistencias de la API
│   └── stationService.ts  ← Simula API async con delay
├── hooks/          ← useStations, useStationServices, useToggleStationStatus
├── components/     ← StationCard, ServiceIcon, Modal, FloatingMenu...
├── pages/          ← StationsPage, ProblemsPage, BugsPage, DeliverablesPage
└── __tests__/      ← 3 suites: mappers, hook, componente (TDD)`}</code></pre>
          </div>
          <p>
            Cada capa solo depende de la capa inferior, lo que permite cambios aislados
            y testing independiente por nivel.
          </p>
        </article>

        <article className="section-page__block">
          <h2>Stack tecnológico</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Tecnología</th><th>Propósito</th></tr>
            </thead>
            <tbody>
              <tr><td>React 19</td><td>UI declarativa con componentes funcionales</td></tr>
              <tr><td>TypeScript 5.9</td><td>Tipado estático para prevenir errores en compilación</td></tr>
              <tr><td>Vite 8</td><td>Build tool rápido con HMR instantáneo</td></tr>
              <tr><td>React Query (TanStack) 5</td><td>Fetching, cache, stale data, mutations</td></tr>
              <tr><td>Vitest 4</td><td>Testing con soporte nativo de TypeScript y JSX</td></tr>
              <tr><td>Testing Library</td><td>Tests centrados en el usuario, no en implementación</td></tr>
              <tr><td>Docker</td><td>Entorno consistente y reproducible</td></tr>
            </tbody>
          </table>
        </article>

        <article className="section-page__block">
          <h2>Decisiones técnicas clave</h2>
          <ul>
            <li><strong>Mapper Pattern:</strong> Los datos del mock tienen inconsistencias intencionales
            (<code>idServicio</code> vs <code>idServicios</code>, <code>stationId</code> vs <code>idEstacion</code>).
            Los mappers normalizan todo en la capa de servicios, manteniendo las capas superiores limpias.</li>
            <li><strong>TDD (RED → GREEN → REFACTOR):</strong> Los tests se escribieron <em>antes</em> del código
            en las fases 2, 3 y 4. Esto garantiza que cada pieza funciona desde el primer momento.</li>
            <li><strong>React Query sobre useEffect:</strong> Elimina el bug de dependencias vacías,
            agrega cache inteligente, y simplifica el manejo de estados async.</li>
            <li><strong>Iconos SVG custom:</strong> Los servicios se representan con iconos diseñados a medida
            (sin texto visible), cumpliendo el requisito y mejorando la UX.</li>
            <li><strong>Accesibilidad:</strong> <code>aria-label</code> en todos los botones interactivos,
            <code>role</code> en elementos semánticos, <code>focus-visible</code> global, modal con trap de foco.</li>
            <li><strong>Tema visual Terpel:</strong> Paleta basada en terpel.com con aire futurista dark,
            implementada con CSS custom properties para fácil mantenimiento.</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>Testing — Cobertura</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Suite</th><th>Tests</th><th>Capa validada</th></tr>
            </thead>
            <tbody>
              <tr><td><code>mappers.test.ts</code></td><td>10 tests</td><td>Normalización de datos (stations, services, relaciones)</td></tr>
              <tr><td><code>useStations.test.tsx</code></td><td>3 tests</td><td>Hook + mock API (data, loading, error)</td></tr>
              <tr><td><code>StationCard.test.tsx</code></td><td>8 tests</td><td>Render + interacción + accesibilidad</td></tr>
            </tbody>
          </table>
          <p>Total: <strong>23 tests</strong> (incluyendo 2 de setup) — todos pasando.</p>
        </article>

        <article className="section-page__block">
          <h2>Requisitos cumplidos</h2>
          <ul className="section-page__checklist">
            <li>Listar estaciones por <code>stationId</code></li>
            <li>Usar <code>useState</code> para selección</li>
            <li>Renderizar con <code>map()</code></li>
            <li>Fetching con React Query</li>
            <li>Modificar estado activa/inactiva</li>
            <li>Servicios con iconos (sin texto)</li>
            <li>Estructura: <code>pages/ components/ services/ hooks/ types/</code></li>
            <li>1 test de componente (render + interacción)</li>
            <li>1 test de hook/service (mock API)</li>
            <li>Accesibilidad mínima (labels, botones, focus)</li>
            <li><strong>Plus:</strong> Cache y manejo de stale data</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>Comandos del proyecto</h2>
          <div className="section-page__code-example">
            <pre><code>{`# Desarrollo
docker compose exec app npm run dev

# Build de producción
docker compose exec app npm run build

# Ejecutar tests
docker compose exec app npm run test

# Tests en modo watch
docker compose exec app npm run test:watch

# Lint
docker compose exec app npm run lint

# Type checking
docker compose exec app npx tsc -b`}</code></pre>
          </div>
        </article>
      </main>
    </div>
  )
}
