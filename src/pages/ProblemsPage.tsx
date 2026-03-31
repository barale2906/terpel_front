/**
 * Página de la Sección 2 — Problemas y Trabajo en equipo.
 *
 * Presenta las respuestas situacionales a escenarios de trabajo
 * colaborativo: minimizar impacto de cambios, coordinación con
 * backend/CMS y estrategias para evitar rupturas en producción.
 *
 */
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/paths.ts'
import './SectionPage.css'
import './BackendPage.css'

export function ProblemsPage() {
  const navigate = useNavigate()

  return (
    <div className="section-page">
      <header className="section-page__header">
        <button
          className="section-page__back"
          onClick={() => navigate(ROUTES.home)}
          type="button"
          aria-label="Volver al panel principal"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 2: Problemas y Trabajo en equipo</h1>
        <span className="section-page__context-badge">Frontend</span>
      </header>

      <main className="section-page__content">
        <div className="section-page__intro">
          <p>
            <strong>Contexto del caso:</strong> El equipo de diseño decide cambiar el layout de
            cards a tabla y el CMS cambia el campo <code>status</code> a <code>state</code>.
          </p>
        </div>

        <article className="section-page__block">
          <h2>6.1 — ¿Cómo minimizar el impacto del cambio?</h2>
          <p>
            La arquitectura por capas que implementamos (<code>types/ → services/ → hooks/ → components/ → pages/</code>)
            ya aísla el impacto de los cambios. Si el CMS renombra <code>status</code> a <code>state</code>,
            solo necesitamos modificar el <strong>mapper</strong> en la capa de servicios, que es exactamente
            el punto donde normalizamos las inconsistencias de la API.
          </p>
          <ul>
            <li><strong>Adapter Pattern:</strong> Los mappers actúan como adaptadores. El cambio de campo se absorbe
            en <code>stationMapper.ts</code> sin que las capas superiores se enteren.</li>
            <li><strong>Feature Flags:</strong> Se puede implementar un flag que alterne entre el campo antiguo y
            el nuevo durante la transición, facilitando un despliegue gradual.</li>
            <li><strong>Backward Compatibility:</strong> Temporalmente el mapper puede aceptar ambos campos
            (<code>status || state</code>) hasta confirmar la migración completa.</li>
          </ul>
          <div className="section-page__code-example">
            <p>Ejemplo de adaptación en el mapper:</p>
            <pre><code>{`// stationMapper.ts — El cambio se absorbe aquí
function mapStation(raw: RawStation): ContentItem {
  return {
    ...otros_campos,
    // Soporta ambos campos durante la transición
    status: raw.state ?? raw.status ?? 'draft',
  };
}`}</code></pre>
          </div>
        </article>

        <article className="section-page__block">
          <h2>6.2 — ¿Cómo coordinar el contrato con backend/CMS?</h2>
          <ul>
            <li><strong>Contrato de API documentado:</strong> Definir los tipos compartidos (OpenAPI/Swagger o al menos
            interfaces TypeScript compartidas) para que cualquier cambio sea explícito y rastreable.</li>
            <li><strong>Reunión de alineación:</strong> Antes del cambio, reunión breve entre frontend, backend y diseño
            para acordar el alcance, timeline y plan de migración.</li>
            <li><strong>Versionado de API:</strong> Implementar versionado (v1, v2) para que el frontend pueda migrar
            gradualmente sin romper la versión actual en producción.</li>
            <li><strong>Periodo de deprecación:</strong> El campo antiguo (<code>status</code>) se mantiene activo
            durante un sprint completo mientras el frontend adopta el nuevo (<code>state</code>).</li>
            <li><strong>Comunicación:</strong> Notificar cambios en el canal del equipo con anticipación,
            documentando qué cambia, por qué y cuándo.</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>6.3 — ¿Cómo evitar que cambios rompan producción?</h2>
          <ul>
            <li><strong>Tests automatizados:</strong> Los 3 niveles de tests que implementamos (mappers, hooks,
            componentes) detectarían inmediatamente si un cambio de API rompe la normalización de datos.</li>
            <li><strong>CI/CD con pipeline:</strong> Cada push ejecuta tests + build + lint automáticamente.
            Si falla algo, el merge se bloquea.</li>
            <li><strong>Feature branches + Code Review:</strong> Todo cambio pasa por PR con revisión de al menos
            un compañero antes de llegar a main.</li>
            <li><strong>Despliegues graduales:</strong> Canary deployment o blue/green para validar con un
            porcentaje pequeño de usuarios antes de impactar a todos.</li>
            <li><strong>Monitoreo post-deploy:</strong> Alertas en métricas clave (error rate, tiempo de respuesta)
            para detectar problemas rápidamente.</li>
            <li><strong>Rollback strategy:</strong> Tener siempre la capacidad de revertir al último deploy estable
            en menos de 5 minutos.</li>
          </ul>
        </article>
      </main>
    </div>
  )
}
