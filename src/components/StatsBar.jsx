import { useLibrary } from '../context/LibraryContext'

function StatsBar() {
  const { stats, lastFetch, loading, hasLoadedOnce } = useLibrary()

  const items = [
    {
      icon: '✅',
      label: 'CSR Detectado',
      detail: 'HTML inicial vacío, renderizado por React',
      color: '#16a34a',
    },
    {
      icon: '🔄',
      label: '0 Recargas',
      detail: 'Navegación 100% client-side',
      color: '#0ea5e9',
    },
    {
      icon: '📡',
      label: loading ? 'Cargando...' : hasLoadedOnce ? 'API OK' : 'Sin cargar',
      detail: lastFetch
        ? `GET /users — ${lastFetch.duration}ms · ${lastFetch.count} items`
        : 'Aún no se ha consultado la API',
      color: '#f59e0b',
    },
    {
      icon: '🧩',
      label: `${stats.total} Libros`,
      detail: `${stats.fromApi} de API · ${stats.local} locales`,
      color: '#7c3aed',
    },
  ]

  return (
    <div style={styles.grid}>
      {items.map((s) => (
        <div
          key={s.label}
          style={{ ...styles.card, borderLeft: `4px solid ${s.color}` }}
        >
          <p style={styles.label}>
            {s.icon} {s.label}
          </p>
          <p style={styles.detail}>{s.detail}</p>
        </div>
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1rem 1.1rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  label: {
    fontWeight: '700',
    color: '#1e1b4b',
    marginBottom: '0.3rem',
    fontSize: '0.92rem',
  },
  detail: {
    fontSize: '0.82rem',
    color: '#6b7280',
  },
}

export default StatsBar