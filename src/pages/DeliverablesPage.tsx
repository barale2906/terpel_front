import './SectionPage.css'
import './BackendPage.css'

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
        <span className="section-page__context-badge">Frontend</span>
      </header>

      <main className="section-page__content">
        {/* Arquitectura */}
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

        {/* Stack tecnológico */}
        <article className="section-page__block">
          <h2>Stack Tecnológico</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Tecnología</th><th>Versión</th><th>Propósito</th></tr>
            </thead>
            <tbody>
              <tr><td>React</td><td>19.2.4</td><td>UI declarativa con componentes funcionales</td></tr>
              <tr><td>TypeScript</td><td>5.9.3</td><td>Tipado estático para prevenir errores en compilación</td></tr>
              <tr><td>Vite</td><td>8.0.1</td><td>Build tool rápido con HMR instantáneo</td></tr>
              <tr><td>TanStack React Query</td><td>5.95.2</td><td>Fetching, cache, stale data, mutations</td></tr>
              <tr><td>Vitest</td><td>4.1.2</td><td>Testing con soporte nativo de TypeScript y JSX</td></tr>
              <tr><td>Testing Library</td><td>16.3.2</td><td>Tests centrados en el usuario, no en implementación</td></tr>
              <tr><td>ESLint</td><td>9.39.4</td><td>Linting y calidad de código</td></tr>
              <tr><td>Docker</td><td>20.x+</td><td>Entorno consistente y reproducible</td></tr>
            </tbody>
          </table>
        </article>

        {/* Decisiones técnicas */}
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

        {/* Testing — Cobertura */}
        <article className="section-page__block">
          <h2>Testing — Cobertura</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Suite</th><th>Tests</th><th>Capa validada</th></tr>
            </thead>
            <tbody>
              <tr><td><code>mappers.test.ts</code></td><td>10</td><td>Normalización de datos (stations, services, relaciones)</td></tr>
              <tr><td><code>StationCard.test.tsx</code></td><td>8</td><td>Render + interacción + accesibilidad</td></tr>
              <tr><td><code>useStations.test.tsx</code></td><td>3</td><td>Hook + mock API (data, loading, error)</td></tr>
              <tr><td><code>setup.test.ts</code></td><td>2</td><td>Configuración del entorno de test</td></tr>
            </tbody>
          </table>
          <p style={{ marginTop: '8px' }}>
            Total: <strong>23 tests</strong> — todos pasando.
          </p>

          <h3 className="section-page__subheading">Pirámide de Tests</h3>
          <div className="backend-pyramid">
            <div className="backend-pyramid__level backend-pyramid__level--integration">
              <span className="backend-pyramid__count">8</span>
              <span className="backend-pyramid__desc">Componente — StationCard (render + interacción + a11y)</span>
            </div>
            <div className="backend-pyramid__level backend-pyramid__level--service">
              <span className="backend-pyramid__count">3</span>
              <span className="backend-pyramid__desc">Hook — useStations (React Query + mock API)</span>
            </div>
            <div className="backend-pyramid__level backend-pyramid__level--domain">
              <span className="backend-pyramid__count">12</span>
              <span className="backend-pyramid__desc">Unitarios — Mappers + Setup (normalización de datos)</span>
            </div>
          </div>
        </article>

        {/* Requisitos cumplidos */}
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

        {/* Comandos */}
        <article className="section-page__block">
          <h2>Comandos del proyecto</h2>
          <div className="section-page__code-example">
            <pre><code>{`# Desarrollo
docker compose exec app npm run dev

# Build de producción
docker compose exec app npm run build

# Ejecutar tests (23 tests)
docker compose exec app npm run test

# Tests en modo watch
docker compose exec app npm run test:watch

# Lint
docker compose exec app npm run lint

# Type checking
docker compose exec app npx tsc -b`}</code></pre>
          </div>
        </article>

        {/* Anexos */}
        <article className="section-page__block">
          <h2>Anexos</h2>
          <div className="backend-annexes">
            <a
              href="https://github.com/barale2906/terpel_front/blob/main/manuales/manual_instalacion.md"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon" style={{ color: 'var(--color-primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7h8M8 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Manual de Instalación</strong>
                <span>Guía paso a paso para instalar y ejecutar el frontend</span>
              </div>
            </a>
            <a
              href="https://github.com/barale2906/terpel_front/blob/main/manuales/manual_usuario.md"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon" style={{ color: 'var(--color-primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Manual de Usuario</strong>
                <span>Guía de uso de la aplicación y navegación</span>
              </div>
            </a>
            <a
              href="https://github.com/barale2906/terpel_front"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon" style={{ color: 'var(--color-primary)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Repositorio GitHub</strong>
                <span>Código fuente completo del frontend</span>
              </div>
            </a>
          </div>
        </article>
      </main>
    </div>
  )
}
