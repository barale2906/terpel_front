import './SectionPage.css'
import './BackendPage.css'

interface BackendBugsPageProps {
  onBack: () => void
}

export function BackendBugsPage({ onBack }: BackendBugsPageProps) {
  return (
    <div className="section-page">
      <header className="section-page__header section-page__header--backend">
        <button className="section-page__back" onClick={onBack} type="button" aria-label="Volver al panel principal backend">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="section-page__title">Sección 3: Lógica en solución de bugs</h1>
        <span className="section-page__context-badge">Backend</span>
      </header>

      <main className="section-page__content">
        <article className="section-page__block">
          <h2>7.1 — El bug: <code>BigDecimal.add()</code> es inmutable</h2>
          <p>
            El problema ocurre porque <code>BigDecimal</code> en Java es <strong>inmutable</strong>.
            El método <code>add()</code> no modifica el objeto original sino que retorna un
            <strong> nuevo objeto</strong> con el resultado. Si no se reasigna, el valor calculado
            se pierde.
          </p>
          <div className="section-page__code-example section-page__code-example--bad">
            <p>Código con bug:</p>
            <pre><code>{`public BigDecimal calculateTotal(List<BigDecimal> items) {
    BigDecimal total = BigDecimal.ZERO;
    for (BigDecimal item : items) {
        total.add(item);  // ← BUG: el resultado se descarta
    }
    return total; // Siempre retorna ZERO
}`}</code></pre>
          </div>
          <p>
            <strong>¿Por qué falla?</strong> Es como si hicieras <code>"3 + 5"</code> pero nunca
            guardaras el resultado. La calculadora muestra 8, pero tu variable sigue valiendo 3.
            En este caso, <code>total</code> siempre vale <code>ZERO</code> porque el resultado
            de <code>total.add(item)</code> nunca se asigna de vuelta a <code>total</code>.
          </p>
        </article>

        <article className="section-page__block">
          <h2>7.2 — Corrección: reasignar el resultado</h2>
          <div className="section-page__code-example section-page__code-example--good">
            <p>Código corregido (enfoque funcional con Streams):</p>
            <pre><code>{`public BigDecimal calculateTotal(List<BigDecimal> items) {
    if (items == null || items.isEmpty()) {
        return BigDecimal.ZERO;
    }
    return items.stream()
        .filter(Objects::nonNull)     // ignora nulls
        .reduce(BigDecimal.ZERO, BigDecimal::add);
}`}</code></pre>
          </div>
          <p>
            <strong>Mejoras sobre el código original:</strong>
          </p>
          <ul>
            <li>Maneja lista <code>null</code> sin lanzar <code>NullPointerException</code></li>
            <li>Maneja lista vacía retornando <code>BigDecimal.ZERO</code></li>
            <li>Ignora elementos <code>null</code> dentro de la lista con <code>filter(Objects::nonNull)</code></li>
            <li>Usa Streams para un código más limpio, declarativo y funcional</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>7.3 — Solución implementada en el proyecto</h2>
          <p>
            En la implementación real, el servicio <code>CalculateTotalService</code> vive en la
            capa de dominio (<code>domain/service/</code>), sin dependencia de frameworks.
            Esto permite testearlo con JUnit puro en milisegundos.
          </p>
          <div className="section-page__code-example section-page__code-example--good">
            <p>Implementación real en <code>domain/service/CalculateTotalService.java</code>:</p>
            <pre><code>{`@Service
public class CalculateTotalService {

    public BigDecimal calculateTotal(List<BigDecimal> items) {
        if (items == null || items.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return items.stream()
            .filter(Objects::nonNull)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}`}</code></pre>
          </div>
          <p><strong>Ventajas de esta ubicación:</strong></p>
          <ul>
            <li>Vive en la capa de dominio → sin dependencias de Spring para testear</li>
            <li>Tests corren en ~0.1s (JUnit puro, sin levantar contexto)</li>
            <li>Reutilizable: cualquier otro servicio del dominio puede invocarla</li>
            <li>Inmutable y thread-safe: <code>BigDecimal</code> es inherentemente seguro para concurrencia</li>
          </ul>
        </article>

        <article className="section-page__block">
          <h2>7.4 — Tests que validan la corrección</h2>
          <p>
            Se implementaron <strong>5 tests</strong> en <code>CalculateTotalTest</code> que cubren
            todos los escenarios edge-case:
          </p>
          <table className="section-page__table">
            <thead>
              <tr><th>#</th><th>Caso</th><th>Entrada</th><th>Resultado esperado</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Valores normales</td><td><code>[10.50, 20.30, 5.20]</code></td><td><code>36.00</code></td></tr>
              <tr><td>2</td><td>Lista vacía</td><td><code>[]</code></td><td><code>0</code></td></tr>
              <tr><td>3</td><td>Lista null</td><td><code>null</code></td><td><code>0</code></td></tr>
              <tr><td>4</td><td>Valores con nulls</td><td><code>[10, null, 20, null]</code></td><td><code>30</code></td></tr>
              <tr><td>5</td><td>Un solo elemento</td><td><code>[42.50]</code></td><td><code>42.50</code></td></tr>
            </tbody>
          </table>
          <div className="section-page__code-example">
            <p>Ejemplo de test:</p>
            <pre><code>{`@Test
void shouldCalculateTotalWithNormalValues() {
    List<BigDecimal> items = List.of(
        new BigDecimal("10.50"),
        new BigDecimal("20.30"),
        new BigDecimal("5.20")
    );

    BigDecimal result = service.calculateTotal(items);

    assertThat(result)
        .isEqualByComparingTo(new BigDecimal("36.00"));
}

@Test
void shouldReturnZeroForNullList() {
    BigDecimal result = service.calculateTotal(null);
    assertThat(result).isEqualByComparingTo(BigDecimal.ZERO);
}

@Test
void shouldIgnoreNullElements() {
    List<BigDecimal> items = Arrays.asList(
        new BigDecimal("10"), null,
        new BigDecimal("20"), null
    );

    BigDecimal result = service.calculateTotal(items);

    assertThat(result)
        .isEqualByComparingTo(new BigDecimal("30"));
}`}</code></pre>
          </div>
          <p>
            <strong>Metodología TDD:</strong> Los tests se escribieron <em>antes</em> del código
            de corrección. Primero se verificó que el test del bug fallaba (RED), luego se aplicó
            la corrección hasta que pasara (GREEN), y finalmente se refactorizó al estilo funcional
            con Streams (REFACTOR).
          </p>
        </article>
      </main>
    </div>
  )
}
