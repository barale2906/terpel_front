import './SectionPage.css'
import './BackendPage.css'

interface BackendProblemsPageProps {
  onBack: () => void
}

export function BackendProblemsPage({ onBack }: BackendProblemsPageProps) {
  return (
    <div className="section-page">
      <header className="section-page__header section-page__header--backend">
        <button className="section-page__back" onClick={onBack} type="button" aria-label="Volver al panel principal backend">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 2: Problemas y Trabajo en equipo</h1>
        <span className="section-page__context-badge">Backend</span>
      </header>

      <main className="section-page__content">
        <div className="section-page__intro">
          <p>
            <strong>Contexto del caso:</strong> El equipo de móviles reporta que{' '}
            <code>GET /service-orders?stationId=...</code> responde lento y a veces retorna
            error <code>500</code>. Hay presión de operación para resolverlo.
          </p>
        </div>

        <article className="section-page__block">
          <h2>6.1 — ¿Qué datos pedir para reproducir el error?</h2>
          <p>
            Antes de tocar código, necesitamos información precisa para reproducir el problema
            de forma controlada:
          </p>
          <ul>
            <li>
              <strong>Logs del servidor</strong> con timestamps y <code>correlationId</code> —
              nuestro filtro de correlación ya inyecta un ID único en cada request, lo que permite
              trazar toda la cadena de la petición fallida.
            </li>
            <li>
              <strong>El <code>stationId</code> exacto</strong> que causa el error — no es lo mismo
              que un stationId con 10 órdenes falle vs uno con 10,000.
            </li>
            <li>
              <strong>Headers de la petición</strong> — verificar si envían paginación (<code>page</code>,{' '}
              <code>size</code>) o están solicitando todos los registros sin límite.
            </li>
            <li>
              <strong>Volumen de datos</strong> en la tabla <code>estacion_orders</code> para ese
              stationId — ¿cuántos registros tiene?
            </li>
            <li>
              <strong>Métricas de infraestructura</strong> — CPU, memoria, conexiones activas a la BD,
              pool de hilos de Tomcat.
            </li>
            <li>
              <strong>Patrón del error:</strong> ¿Es intermitente o constante? ¿Desde cuándo ocurre?
              ¿Coincide con un deploy reciente?
            </li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>6.2 — Hotfix inmediato vs Solución estructural</h2>

          <h3 className="section-page__subheading section-page__subheading--warning">
            Fase 1 — Hotfix (desplegable en horas)
          </h3>
          <ul>
            <li>
              <strong>Índice en BD:</strong> Agregar índice compuesto sobre{' '}
              <code>station_id + status</code> — ya implementado en la migración Flyway{' '}
              <code>V1__create_estacion_orders.sql</code>.
            </li>
            <li>
              <strong>Timeout y circuit breaker:</strong> Configurar timeout máximo en el endpoint
              y un circuit breaker (ej: Resilience4j) para evitar que peticiones lentas colapsen
              al servidor.
            </li>
            <li>
              <strong>Comunicar al equipo</strong> que hay un parche temporal con mejora de rendimiento
              esperada, y se está trabajando en la solución definitiva.
            </li>
          </ul>

          <h3 className="section-page__subheading section-page__subheading--success">
            Fase 2 — Solución estructural (planificada en sprint)
          </h3>
          <ul>
            <li>
              <strong>Analizar query plan:</strong> Ejecutar <code>EXPLAIN ANALYZE</code> en las
              consultas generadas por Spring Data JPA para identificar full table scans.
            </li>
            <li>
              <strong>Optimizar consultas:</strong> Evitar N+1, usar projections si solo necesitamos
              algunos campos, considerar queries nativas si el ORM genera SQL ineficiente.
            </li>
            <li>
              <strong>Cache (Redis):</strong> Para stationIds con alta frecuencia de consulta,
              implementar cache con TTL corto (30s-60s).
            </li>
            <li>
              <strong>Load testing:</strong> Antes de liberar, ejecutar pruebas de carga con JMeter
              o Gatling para validar que la mejora es real bajo concurrencia.
            </li>
          </ul>

          <div className="section-page__code-example">
            <p>Ejemplo — Índice compuesto en la migración Flyway:</p>
            <pre><code>{`-- V2__add_performance_indexes.sql
CREATE INDEX idx_estacion_orders_station_status
    ON estacion_orders(station_id, status);

-- Verificar el plan de la consulta
EXPLAIN ANALYZE
SELECT * FROM estacion_orders
WHERE station_id = 'ST-001' AND status = 'CREATED'
ORDER BY created_at DESC
LIMIT 10;`}</code></pre>
          </div>
        </article>

        <article className="section-page__block">
          <h2>6.3 — Coordinación con DevOps y QA</h2>
          <ul>
            <li>
              <strong>Observabilidad:</strong> Dashboards con métricas de latencia por endpoint
              (percentil 50, 95 y 99), alertas automáticas cuando la latencia supere el umbral.
              Spring Boot Actuator ya expone métricas que se pueden integrar con Prometheus + Grafana.
            </li>
            <li>
              <strong>Rollback plan:</strong> Versión anterior de la aplicación lista para desplegar
              si el fix causa regresión. Docker tags inmutables (<code>v1.2.3</code>) facilitan
              revertir con un simple <code>docker compose up -d</code>.
            </li>
            <li>
              <strong>Feature flag:</strong> Desplegar la solución gradualmente detrás de un flag.
              Si se detectan problemas, se desactiva sin necesidad de redeploy.
            </li>
            <li>
              <strong>QA:</strong> Definir casos de prueba de carga antes de liberar — documento
              con escenarios, volúmenes esperados y tiempos de respuesta aceptables.
            </li>
            <li>
              <strong>Comunicación estructurada:</strong> Canal en Slack/Teams con actualizaciones
              cada 2 horas mientras se resuelve el incidente. Postmortem documentado después.
            </li>
          </ul>
        </article>
      </main>
    </div>
  )
}
