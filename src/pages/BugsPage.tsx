/**
 * Página de la Sección 3 — Lógica en solución de bugs.
 *
 * Documenta el bug del useEffect con dependencias vacías,
 * su corrección básica, la solución implementada con React Query
 * y mejoras adicionales como cleanup con AbortController.
 *
 * @param onBack - Callback para regresar a la vista principal
 */
import './SectionPage.css'

interface BugsPageProps {
  onBack: () => void
}

export function BugsPage({ onBack }: BugsPageProps) {
  return (
    <div className="section-page">
      <header className="section-page__header">
        <button className="section-page__back" onClick={onBack} type="button" aria-label="Volver al panel principal">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 3: Lógica en solución de bugs</h1>
      </header>

      <main className="section-page__content">
        <article className="section-page__block">
          <h2>7.1 — El bug: <code>useEffect</code> con dependencias vacías</h2>
          <p>
            El problema clásico ocurre cuando se usa <code>useEffect</code> con un array de
            dependencias vacío <code>[]</code> para hacer fetching de datos que dependen de
            un parámetro variable (como <code>stationId</code>).
          </p>
          <div className="section-page__code-example section-page__code-example--bad">
            <p>Código con bug:</p>
            <pre><code>{`// ❌ Bug: el efecto solo se ejecuta al montar
const [services, setServices] = useState([]);

useEffect(() => {
  fetch(\`/api/services?stationId=\${stationId}\`)
    .then(res => res.json())
    .then(data => setServices(data));
}, []); // ← dependencias vacías`}</code></pre>
          </div>
          <p>
            <strong>¿Por qué falla?</strong> React solo ejecuta el efecto cuando las dependencias
            cambian. Con <code>[]</code>, el efecto se ejecuta <em>una sola vez</em> al montar
            el componente. Si el usuario selecciona otra estación, <code>stationId</code> cambia
            pero el efecto no se re-ejecuta → los servicios mostrados son siempre los de la
            primera estación.
          </p>
        </article>

        <article className="section-page__block">
          <h2>7.2 — Corrección básica: agregar la dependencia</h2>
          <div className="section-page__code-example section-page__code-example--good">
            <p>Código corregido:</p>
            <pre><code>{`// ✅ Corrección: stationId en las dependencias
useEffect(() => {
  if (!stationId) return;

  fetch(\`/api/services?stationId=\${stationId}\`)
    .then(res => res.json())
    .then(data => setServices(data));
}, [stationId]); // ← ahora React re-ejecuta cuando cambia`}</code></pre>
          </div>
          <p>
            Al incluir <code>stationId</code> en el array de dependencias, React detecta el cambio
            y re-ejecuta el efecto cada vez que el usuario selecciona una estación diferente.
          </p>
        </article>

        <article className="section-page__block">
          <h2>7.3 — Solución con React Query (implementada en la app)</h2>
          <p>
            En nuestra implementación eliminamos la necesidad del <code>useEffect</code> manual
            usando <code>useQuery</code> de React Query. La <code>queryKey</code> incluye
            el <code>stationId</code>, así que React Query automáticamente refetcha cuando
            este cambia.
          </p>
          <div className="section-page__code-example section-page__code-example--good">
            <p>Implementación real en <code>src/hooks/useStationServices.ts</code>:</p>
            <pre><code>{`export function useStationServices(stationId: string | null) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['services', stationId],
    queryFn: () => getServicesByStationId(stationId!),
    enabled: !!stationId,   // no ejecuta si stationId es null
    staleTime: 30 * 1000,   // datos frescos por 30s
    gcTime: 5 * 60 * 1000,  // cache vive 5min
  });

  return { services: data, isLoading, isError };
}`}</code></pre>
          </div>
          <p><strong>Ventajas sobre useEffect manual:</strong></p>
          <ul>
            <li>Refetch automático cuando <code>stationId</code> cambia (vía <code>queryKey</code>)</li>
            <li>Cache inteligente: si el usuario vuelve a una estación ya visitada, los datos se muestran
            instantáneamente mientras se revalidan en background</li>
            <li><code>enabled: !!stationId</code> evita queries innecesarias sin necesidad de guards manuales</li>
            <li>Manejo de loading/error integrado, sin estados manuales adicionales</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>7.4 — Mejora: cleanup con AbortController</h2>
          <p>
            Un problema adicional del <code>useEffect</code> sin cleanup es la <strong>race condition</strong>:
            si el usuario cambia rápidamente de estación, múltiples requests se disparan en paralelo
            y la respuesta que llega primero puede no ser la correcta.
          </p>
          <div className="section-page__code-example">
            <p>Solución con AbortController (enfoque manual):</p>
            <pre><code>{`useEffect(() => {
  if (!stationId) return;

  const controller = new AbortController();

  fetch(\`/api/services?stationId=\${stationId}\`, {
    signal: controller.signal
  })
    .then(res => res.json())
    .then(data => setServices(data))
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  // Cleanup: cancela el request anterior al cambiar
  return () => controller.abort();
}, [stationId]);`}</code></pre>
          </div>
          <p>
            <strong>React Query maneja esto internamente:</strong> cuando la <code>queryKey</code> cambia,
            automáticamente cancela el request anterior y solo procesa la respuesta más reciente.
            Esta es otra razón por la que elegimos React Query sobre <code>useEffect</code> manual.
          </p>
        </article>
      </main>
    </div>
  )
}
