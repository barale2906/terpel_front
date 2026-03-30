import './SectionPage.css'
import './BackendPage.css'

interface BackendDeliverablesPageProps {
  onBack: () => void
}

export function BackendDeliverablesPage({ onBack }: BackendDeliverablesPageProps) {
  return (
    <div className="section-page">
      <header className="section-page__header section-page__header--backend">
        <button className="section-page__back" onClick={onBack} type="button" aria-label="Volver al panel principal backend">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 4: Entregables finales</h1>
        <span className="section-page__context-badge">Backend</span>
      </header>

      <main className="section-page__content">
        {/* Endpoints de la API */}
        <article className="section-page__block">
          <h2>Endpoints de la API</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Método</th><th>Endpoint</th><th>Descripción</th><th>Éxito</th><th>Errores</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code className="http-method http-method--post">POST</code></td>
                <td><code>/service-orders</code></td>
                <td>Crear orden</td>
                <td>201</td>
                <td>400</td>
              </tr>
              <tr>
                <td><code className="http-method http-method--get">GET</code></td>
                <td><code>/service-orders/&#123;id&#125;</code></td>
                <td>Consultar por ID</td>
                <td>200</td>
                <td>404</td>
              </tr>
              <tr>
                <td><code className="http-method http-method--get">GET</code></td>
                <td><code>/service-orders?stationId=&amp;status=</code></td>
                <td>Buscar con filtros + paginación</td>
                <td>200</td>
                <td>—</td>
              </tr>
              <tr>
                <td><code className="http-method http-method--patch">PATCH</code></td>
                <td><code>/service-orders/&#123;id&#125;/status</code></td>
                <td>Actualizar estado</td>
                <td>200</td>
                <td>404, 409</td>
              </tr>
            </tbody>
          </table>

          <div className="section-page__code-example">
            <p>POST /service-orders — Request:</p>
            <pre><code>{`{
  "stationId": "ST-001",
  "type": "INVOICE",
  "status": "CREATED",
  "description": "Factura de combustible diesel"
}`}</code></pre>
          </div>
          <div className="section-page__code-example section-page__code-example--good">
            <p>Response 201 Created:</p>
            <pre><code>{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "stationId": "ST-001",
  "type": "INVOICE",
  "description": "Factura de combustible diesel",
  "status": "CREATED",
  "createdAt": "2026-03-29T14:30:00",
  "updatedAt": "2026-03-29T14:30:00"
}`}</code></pre>
          </div>
          <div className="section-page__code-example section-page__code-example--bad">
            <p>Response 409 Conflict — Transición inválida:</p>
            <pre><code>{`{
  "type": "https://api.terpel.com/errors/invalid-transition",
  "title": "Transición de estado no permitida",
  "status": 409,
  "detail": "Transición de estado no permitida: DONE -> IN_PROGRESS"
}`}</code></pre>
          </div>

          <div className="backend-landing__links" style={{ marginTop: '16px' }}>
            <a href="/openapi.json" download="openapi.json" className="backend-landing__link-btn backend-landing__link-btn--openapi">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Descargar OpenAPI JSON
            </a>
          </div>
        </article>

        {/* Reglas de negocio */}
        <article className="section-page__block">
          <h2>Reglas de Negocio — Máquina de Estados</h2>
          <p>
            Las órdenes de servicio siguen una máquina de estados con transiciones controladas.
            No todos los cambios están permitidos:
          </p>
          <table className="section-page__table">
            <thead>
              <tr><th>Estado actual</th><th>→ CREATED</th><th>→ IN_PROGRESS</th><th>→ DONE</th><th>→ CANCELLED</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>CREATED</strong></td>
                <td className="state-same">— (mismo)</td>
                <td className="state-allowed">Permitido</td>
                <td className="state-allowed">Permitido</td>
                <td className="state-allowed">Permitido</td>
              </tr>
              <tr>
                <td><strong>IN_PROGRESS</strong></td>
                <td className="state-denied">No permitido</td>
                <td className="state-same">— (mismo)</td>
                <td className="state-allowed">Permitido</td>
                <td className="state-allowed">Permitido</td>
              </tr>
              <tr>
                <td><strong>DONE</strong></td>
                <td className="state-denied">No permitido</td>
                <td className="state-denied">No permitido</td>
                <td className="state-same">— (mismo)</td>
                <td className="state-allowed">Permitido</td>
              </tr>
              <tr>
                <td><strong>CANCELLED</strong></td>
                <td className="state-denied">No permitido</td>
                <td className="state-denied">No permitido</td>
                <td className="state-denied">No permitido</td>
                <td className="state-same">— (mismo)</td>
              </tr>
            </tbody>
          </table>

          <div className="section-page__callout section-page__callout--warning">
            <strong>Reglas clave:</strong>
            <ul>
              <li><strong>DONE → IN_PROGRESS:</strong> No permitido. Una orden terminada no puede volver a "en progreso".</li>
              <li><strong>CANCELLED → cualquiera:</strong> No permitido. Una orden cancelada es un estado final e irreversible.</li>
              <li><strong>Mismo estado → mismo estado:</strong> Permitido (idempotente, no lanza error).</li>
            </ul>
          </div>
        </article>

        {/* Tests y Cobertura */}
        <article className="section-page__block">
          <h2>Testing — Cobertura</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Tipo</th><th>Cantidad</th><th>Tiempo</th><th>Qué valida</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Unit — Dominio</strong></td><td>14</td><td>~0.1s</td><td>Reglas de transición de estado</td></tr>
              <tr><td><strong>Unit — Servicio</strong></td><td>10</td><td>~1s</td><td>Orquestación del servicio (mocks)</td></tr>
              <tr><td><strong>Unit — Facade</strong></td><td>5</td><td>~0.5s</td><td>Coordinación controller ↔ service</td></tr>
              <tr><td><strong>Unit — BigDecimal</strong></td><td>5</td><td>~0.1s</td><td>Corrección del bug de suma</td></tr>
              <tr><td><strong>Integración</strong></td><td>9</td><td>~30s</td><td>Flujo HTTP → BD con Testcontainers</td></tr>
            </tbody>
          </table>
          <p style={{ marginTop: '8px' }}>
            Total: <strong>43 tests</strong> — todos pasando.
          </p>

          <h3 className="section-page__subheading">Cobertura JaCoCo</h3>
          <div className="backend-coverage-bars">
            <div className="backend-coverage-bar">
              <span className="backend-coverage-bar__label">Instrucciones</span>
              <div className="backend-coverage-bar__track">
                <div className="backend-coverage-bar__fill" style={{ width: '94.2%' }} />
              </div>
              <span className="backend-coverage-bar__value">94.2%</span>
            </div>
            <div className="backend-coverage-bar">
              <span className="backend-coverage-bar__label">Líneas</span>
              <div className="backend-coverage-bar__track">
                <div className="backend-coverage-bar__fill" style={{ width: '93.1%' }} />
              </div>
              <span className="backend-coverage-bar__value">93.1%</span>
            </div>
            <div className="backend-coverage-bar">
              <span className="backend-coverage-bar__label">Métodos</span>
              <div className="backend-coverage-bar__track">
                <div className="backend-coverage-bar__fill" style={{ width: '94.7%' }} />
              </div>
              <span className="backend-coverage-bar__value">94.7%</span>
            </div>
            <div className="backend-coverage-bar">
              <span className="backend-coverage-bar__label">Clases</span>
              <div className="backend-coverage-bar__track">
                <div className="backend-coverage-bar__fill" style={{ width: '100%' }} />
              </div>
              <span className="backend-coverage-bar__value">100%</span>
            </div>
          </div>

          <h3 className="section-page__subheading">Pirámide de Tests</h3>
          <div className="backend-pyramid">
            <div className="backend-pyramid__level backend-pyramid__level--integration">
              <span className="backend-pyramid__count">9</span>
              <span className="backend-pyramid__desc">Integración (Testcontainers + PostgreSQL real)</span>
            </div>
            <div className="backend-pyramid__level backend-pyramid__level--service">
              <span className="backend-pyramid__count">15</span>
              <span className="backend-pyramid__desc">Servicio + Facade (Mockito)</span>
            </div>
            <div className="backend-pyramid__level backend-pyramid__level--domain">
              <span className="backend-pyramid__count">19</span>
              <span className="backend-pyramid__desc">Dominio (JUnit puro, sin frameworks)</span>
            </div>
          </div>
        </article>

        {/* Stack tecnológico */}
        <article className="section-page__block">
          <h2>Stack Tecnológico</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Componente</th><th>Tecnología</th><th>Versión</th><th>Justificación</th></tr>
            </thead>
            <tbody>
              <tr><td>Lenguaje</td><td>Java</td><td>21 (LTS)</td><td>Versión LTS más reciente, virtual threads</td></tr>
              <tr><td>Framework</td><td>Spring Boot</td><td>3.4.4</td><td>Estándar de facto para APIs REST en Java</td></tr>
              <tr><td>Base de datos</td><td>PostgreSQL</td><td>16</td><td>Robusta, buen soporte UUID, profesional</td></tr>
              <tr><td>Migraciones</td><td>Flyway</td><td>Incluida</td><td>Control de versiones del esquema de BD</td></tr>
              <tr><td>ORM</td><td>Spring Data JPA</td><td>Incluida</td><td>Paginación y queries derivadas integradas</td></tr>
              <tr><td>Validación</td><td>Jakarta Validation</td><td>Incluida</td><td>Validación declarativa con anotaciones</td></tr>
              <tr><td>Documentación</td><td>Springdoc OpenAPI</td><td>2.8.6</td><td>OpenAPI 3.0 automático con Swagger UI</td></tr>
              <tr><td>Monitoreo</td><td>Actuator</td><td>Incluida</td><td>Endpoints health/info</td></tr>
              <tr><td>Logging</td><td>SLF4J + MDC</td><td>Incluida</td><td>Logging estructurado con correlationId</td></tr>
              <tr><td>Mapeo DTO</td><td>MapStruct</td><td>1.6.3</td><td>Generación en compilación, sin reflexión</td></tr>
              <tr><td>Boilerplate</td><td>Lombok</td><td>1.18.36</td><td>Getters, setters, builders automáticos</td></tr>
              <tr><td>Tests unit</td><td>JUnit 5 + Mockito</td><td>Incluida</td><td>Incluidos en spring-boot-starter-test</td></tr>
              <tr><td>Tests integ.</td><td>Testcontainers</td><td>1.20.4</td><td>BD real en contenedor Docker para tests</td></tr>
              <tr><td>Cobertura</td><td>JaCoCo</td><td>0.8.12</td><td>Reportes de cobertura de código</td></tr>
              <tr><td>Contenedores</td><td>Docker Compose</td><td>v5.x</td><td>Entorno reproducible</td></tr>
            </tbody>
          </table>
        </article>

        {/* Principios SOLID */}
        <article className="section-page__block">
          <h2>Principios SOLID aplicados</h2>
          <table className="section-page__table">
            <thead>
              <tr><th>Principio</th><th>Cómo se aplica</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>S</strong> — Responsabilidad Única</td><td>Cada clase tiene un único propósito (Controller = HTTP, Service = lógica, Adapter = persistencia)</td></tr>
              <tr><td><strong>O</strong> — Abierto/Cerrado</td><td>Nuevos tipos de orden o estados se agregan sin modificar clases existentes (enums extensibles)</td></tr>
              <tr><td><strong>L</strong> — Sustitución Liskov</td><td>El adaptador implementa el puerto sin alterar el comportamiento esperado</td></tr>
              <tr><td><strong>I</strong> — Segregación de Interfaces</td><td>Tres use cases separados (Create, Get, UpdateStatus) en vez de una interfaz monolítica</td></tr>
              <tr><td><strong>D</strong> — Inversión de Dependencias</td><td>El dominio define interfaces (ports), la infraestructura las implementa</td></tr>
            </tbody>
          </table>
        </article>

        {/* Comandos */}
        <article className="section-page__block">
          <h2>Comandos del Proyecto</h2>
          <div className="section-page__code-example">
            <p>Instalación y ejecución:</p>
            <pre><code>{`# Primera vez — configura y levanta todo
make init

# Reconstruir y levantar
make up

# Ver logs en tiempo real
make logs app

# Abrir consola PostgreSQL
make db

# Ejecutar todos los tests (43 tests)
make test

# Solo tests unitarios (34 tests, rápidos)
make test-unit

# Solo tests de integración (9 tests, con Testcontainers)
make test-integration

# Detener contenedores (conserva datos)
make stop

# Detener y eliminar contenedores
make down`}</code></pre>
          </div>
        </article>

        {/* Anexos — Manuales y OpenAPI */}
        <article className="section-page__block">
          <h2>Anexos</h2>
          <div className="backend-annexes">
            <a
              href="https://github.com/barale2906/terpel_back/blob/main/manuales/manual_instalacion.md"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7h8M8 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Manual de Instalación</strong>
                <span>Guía paso a paso para instalar y ejecutar el proyecto</span>
              </div>
            </a>
            <a
              href="https://github.com/barale2906/terpel_back/blob/main/manuales/manual_usuario.md"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Manual de Usuario</strong>
                <span>Guía para usar la API desde el punto de vista del usuario</span>
              </div>
            </a>
            <a
              href="/openapi.json"
              download="openapi.json"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M10 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>OpenAPI JSON</strong>
                <span>Especificación de la API — importable en Postman</span>
              </div>
            </a>
            <a
              href="https://github.com/barale2906/terpel_back"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-annex-card"
            >
              <div className="backend-annex-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div className="backend-annex-card__text">
                <strong>Repositorio GitHub</strong>
                <span>Código fuente completo del backend</span>
              </div>
            </a>
          </div>
        </article>
      </main>
    </div>
  )
}
