import StatsBar from '../components/StatsBar'
import { useLibrary } from '../context/LibraryContext'

const CHECKLIST = [
  'La navegación entre rutas NO recarga la página (verificado en Network).',
  'El HTML inicial está vacío (#root) → confirma CSR.',
  'Cada petición a la API se cancela al desmontar (AbortController).',
  'Las listas usan key única y estable (book.id, no index).',
  'Los formularios son controlados con useState + onChange.',
  'El renderizado condicional usa && y ternario.',
  'No hay warnings de key duplicada en consola.',
  'No hay peticiones duplicadas en Network (gracias al cleanup).',
  'El estado global se comparte vía Context API entre páginas.',
  'Los libros registrados localmente aparecen en el catálogo.',
]

function Audit() {
  const { lastFetch, books, stats } = useLibrary()

  return (
    <section className="fade-in">
      <header style={styles.header}>
        <h2 style={styles.title}>🔍 Auditoría de la SPA</h2>
        <p style={styles.subtitle}>
          Validación del flujo de datos, auditoría de red en DevTools y estados de UI en transiciones.
        </p>
      </header>

      <StatsBar />

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Métricas actuales</h3>
          <ul style={styles.metrics}>
            <li><span>Total de libros</span><strong>{stats.total}</strong></li>
            <li><span>Desde API</span><strong>{stats.fromApi}</strong></li>
            <li><span>Locales</span><strong>{stats.local}</strong></li>
            <li><span>Categorías distintas</span><strong>{stats.categories}</strong></li>
            <li>
              <span>Última sincronización</span>
              <strong>{lastFetch ? lastFetch.at.toLocaleTimeString() : '—'}</strong>
            </li>
            <li>
              <span>Duración de la última petición</span>
              <strong>{lastFetch ? `${lastFetch.duration}ms` : '—'}</strong>
            </li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🧪 Checklist de auditoría</h3>
          <ul style={styles.checklist}>
            {CHECKLIST.map((item) => (
              <li key={item} style={styles.checkItem}>
                <span style={styles.checkIcon}>✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🧠 Cómo se evita el renderizado innecesario</h3>
        <ol style={styles.steps}>
          <li>
            <strong>AbortController</strong> cancela la petición anterior antes de lanzar una nueva
            o al desmontar el componente.
          </li>
          <li>
            <strong>finally</strong> garantiza que <code>loading</code> vuelva a <code>false</code> una sola vez.
          </li>
          <li>
            Los estados se actualizan solo cuando hay cambios reales (React hace bailout si el valor es idéntico).
          </li>
          <li>
            El custom hook <code>useLibrary</code> centraliza el estado; los componentes solo se
            re-renderizan si cambian <code>books</code>, <code>loading</code> o <code>error</code>.
          </li>
          <li>
            El filtrado y ordenamiento se hacen con <code>useMemo</code> para no recalcular en cada render.
          </li>
        </ol>
      </div>

      <div style={styles.codeBlock}>
        <p style={styles.codeTitle}>🔬 Cómo verificar en DevTools</p>
        <pre style={styles.pre}>{`// 1. Network (F12 → Network → Fetch/XHR)
//    - Al entrar a /libros se dispara UNA sola petición GET /users.
//    - Si cambias de ruta mientras carga, la petición aparece como (canceled).

// 2. Console
//    - Sin warnings de "key" duplicada.
//    - Sin errores rojos.

// 3. React DevTools → Components
//    - Inspecciona LibraryProvider: verás books, loading, error, stats.
//    - Usa el Profiler para ver qué componentes se re-renderizan.

// 4. Ver código fuente (Ctrl+U)
//    - <div id="root"></div> vacío → confirma CSR.

// 5. Performance
//    - Graba mientras navegas: no hay recargas completas de página.`}</pre>
      </div>

      <p style={styles.footer}>
        Actualmente hay <strong>{books.length}</strong> libros cargados en memoria.
      </p>
    </section>
  )
}

const styles = {
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.4rem',
    color: '#1e1b4b',
    marginBottom: '0.3rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.2rem',
    marginBottom: '1.5rem',
  },
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.3rem',
    marginBottom: '1.2rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '1rem',
    color: '#1e1b4b',
    marginBottom: '0.9rem',
  },
  metrics: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  checklist: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  checkItem: {
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.86rem',
    color: '#374151',
    lineHeight: '1.4',
  },
  checkIcon: {
    flexShrink: 0,
  },
  steps: {
    paddingLeft: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    fontSize: '0.88rem',
    color: '#374151',
    lineHeight: '1.5',
  },
  codeBlock: {
    background: '#1e1b4b',
    color: '#c7d2fe',
    borderRadius: '12px',
    padding: '1.3rem',
    marginBottom: '1.2rem',
  },
  codeTitle: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: '0.8rem',
    fontSize: '0.95rem',
  },
  pre: {
    fontFamily: 'Fira Code, Consolas, monospace',
    fontSize: '0.8rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    color: '#c7d2fe',
  },
  footer: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#6b7280',
    marginTop: '1rem',
  },
}

// estilos extra para los <li> de métricas
const _metricsStyles = `
  li { display: flex; justify-content: space-between; }
`

export default Audit