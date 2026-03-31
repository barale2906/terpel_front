import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/paths.ts'
import './StationsPage.css'
import './BackendPage.css'

export function BackendStationsPage() {
  const navigate = useNavigate()

  return (
    <div className="stations-page">
      <header className="stations-page__header stations-page__header--backend">
        <div className="stations-page__header-left">
          <button
            className="backend-page__back-btn"
            onClick={() => navigate(ROUTES.home)}
            type="button"
            aria-label="Volver a la prueba frontend"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="stations-page__title">Service Orders API — Terpel</h1>
        </div>
        <div className="backend-page__badge">
          <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="backend-page__badge-icon">
            <path d="M30 8c-8 0-16 2-16 6v4c0 4 8 6 16 6s16-2 16-6v-4c0-4-8-6-16-6z" fill="currentColor" opacity="0.3"/>
            <path d="M14 18v6c0 4 8 6 16 6s16-2 16-6v-6" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M14 30v6c0 4 8 6 16 6s16-2 16-6v-6" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M14 18c0 4 8 6 16 6s16-2 16-6" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M14 14c0 4 8 6 16 6s16-2 16-6" stroke="currentColor" strokeWidth="2.5"/>
            <ellipse cx="30" cy="14" rx="16" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          </svg>
          <span>Backend</span>
        </div>
      </header>

      <main className="stations-page__content">
        <div className="backend-landing">
          {/* Subtítulo */}
          <p className="backend-landing__subtitle">
            API REST para gestión de órdenes de servicio de estaciones
          </p>

          {/* Link al repo */}
          <div className="backend-landing__links">
            <a
              href="https://github.com/barale2906/terpel_back"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-landing__link-btn backend-landing__link-btn--github"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Ver código fuente
            </a>
            <a
              href="/openapi.json"
              download="openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="backend-landing__link-btn backend-landing__link-btn--openapi"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Descargar OpenAPI JSON
            </a>
          </div>

          {/* Cards de resumen */}
          <div className="backend-landing__cards">
            <div className="backend-landing__card">
              <div className="backend-landing__card-icon backend-landing__card-icon--api">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="backend-landing__card-value">4</div>
              <div className="backend-landing__card-label">Endpoints</div>
            </div>
            <div className="backend-landing__card">
              <div className="backend-landing__card-icon backend-landing__card-icon--tests">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="backend-landing__card-value">43</div>
              <div className="backend-landing__card-label">Tests (34 unit + 9 integración)</div>
            </div>
            <div className="backend-landing__card">
              <div className="backend-landing__card-icon backend-landing__card-icon--coverage">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="backend-landing__card-value">94.2%</div>
              <div className="backend-landing__card-label">Cobertura</div>
            </div>
            <div className="backend-landing__card">
              <div className="backend-landing__card-icon backend-landing__card-icon--arch">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="6" y1="18" x2="6.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="backend-landing__card-value">Hexagonal</div>
              <div className="backend-landing__card-label">Arquitectura + Facade</div>
            </div>
          </div>

          {/* Badges de tecnologías */}
          <div className="backend-landing__tech">
            <h3 className="backend-landing__tech-title">Stack Tecnológico</h3>
            <div className="backend-landing__badges">
              {[
                'Java 21', 'Spring Boot 3.4.4', 'PostgreSQL 16', 'Docker',
                'Flyway', 'Swagger/OpenAPI', 'JUnit 5 + Mockito', 'Testcontainers',
                'MapStruct', 'Lombok', 'JaCoCo', 'Actuator',
              ].map((tech) => (
                <span key={tech} className="backend-landing__badge">{tech}</span>
              ))}
            </div>
          </div>

          {/* Texto introductorio */}
          <blockquote className="backend-landing__intro">
            API REST desarrollada en Java 21 con Spring Boot 3.4.4 que permite crear, consultar,
            filtrar y actualizar órdenes de servicio para estaciones Terpel. Implementa arquitectura
            hexagonal con patrón Facade, siguiendo principios SOLID y metodología TDD. Incluye 43
            tests automatizados con 94.2% de cobertura, logging estructurado con Correlation ID,
            documentación Swagger/OpenAPI, y despliegue 100% Docker.
          </blockquote>

          {/* Diagrama de arquitectura */}
          <div className="backend-landing__architecture">
            <h3 className="backend-landing__section-title">Flujo de una Petición</h3>
            <div className="backend-landing__flow">
              <div className="backend-landing__flow-step backend-landing__flow-step--external">
                <span className="backend-landing__flow-label">Petición HTTP</span>
                <span className="backend-landing__flow-desc">Cliente / Postman</span>
              </div>
              <div className="backend-landing__flow-arrow">↓</div>
              <div className="backend-landing__flow-step">
                <span className="backend-landing__flow-label">OrderController</span>
                <span className="backend-landing__flow-desc">Adaptador REST — Solo HTTP</span>
              </div>
              <div className="backend-landing__flow-arrow">↓</div>
              <div className="backend-landing__flow-step">
                <span className="backend-landing__flow-label">OrderFacade</span>
                <span className="backend-landing__flow-desc">Capa Aplicación — Patrón FACADE</span>
              </div>
              <div className="backend-landing__flow-arrow">↓</div>
              <div className="backend-landing__flow-step">
                <span className="backend-landing__flow-label">OrderService</span>
                <span className="backend-landing__flow-desc">Dominio — Reglas de negocio puras</span>
              </div>
              <div className="backend-landing__flow-arrow">↓</div>
              <div className="backend-landing__flow-step">
                <span className="backend-landing__flow-label">OrderRepositoryPort</span>
                <span className="backend-landing__flow-desc">Puerto de salida — Interfaz (contrato)</span>
              </div>
              <div className="backend-landing__flow-arrow">↓</div>
              <div className="backend-landing__flow-step backend-landing__flow-step--external">
                <span className="backend-landing__flow-label">PostgreSQL 16</span>
                <span className="backend-landing__flow-desc">Base de datos</span>
              </div>
            </div>
          </div>

          {/* Estructura de paquetes */}
          <div className="backend-landing__packages">
            <h3 className="backend-landing__section-title">Estructura de Paquetes</h3>
            <pre className="backend-landing__tree"><code>{`com.terpel.serviceorders/
├── domain/                      ← Corazón: CERO dependencias de frameworks
│   ├── model/                   ← EstacionOrder, OrderStatus, OrderType
│   ├── exception/               ← OrderNotFoundException, InvalidTransitionException
│   ├── port/in/                 ← Interfaces de casos de uso
│   ├── port/out/                ← Interfaz del repositorio
│   └── service/                 ← OrderService, CalculateTotalService
├── application/                 ← OrderFacade (patrón Facade)
└── infrastructure/              ← Adaptadores (REST, JPA, configuración)
    ├── adapter/in/rest/         ← Controller, DTOs, Mapper
    ├── adapter/out/persistence/ ← JPA Entity, Repository, Mapper
    ├── config/                  ← AppConfig, CorrelationIdFilter
    └── exception/               ← GlobalExceptionHandler`}</code></pre>
          </div>
        </div>
      </main>
    </div>
  )
}
