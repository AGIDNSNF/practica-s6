import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import StatsBar from '../components/StatsBar'

function Home() {
  const { stats, lastFetch, loading, books } = useLibrary()

  const recentBooks = books.slice(0, 3)

  return (
    <section className="fade-in">
      <header style={styles.hero}>
        <h2 style={styles.heroTitle}>Bienvenido a la Biblioteca Virtual 📚</h2>
        <p style={styles.heroText}>
          Explora el catálogo, registra tus propios libros y audita el comportamiento
          de la SPA. Todo integrado en una sola experiencia.
        </p>
      </header>

      <StatsBar />

      <div style={styles.actions}>
        <Link to="/libros" style={{ ...styles.actionCard, ...styles.actionPrimary }}>
          <span style={styles.actionIcon}>📖</span>
          <h3 style={styles.actionTitle}>Explorar catálogo</h3>
          <p style={styles.actionText}>
            {loading ? 'Cargando libros...' : `${stats.total} libros disponibles`}
          </p>
        </Link>

        <Link to="/registrar" style={styles.actionCard}>
          <span style={styles.actionIcon}>📝</span>
          <h3 style={styles.actionTitle}>Registrar libro</h3>
          <p style={styles.actionText}>Añade un nuevo título a la biblioteca</p>
        </Link>

        <Link to="/auditoria" style={styles.actionCard}>
          <span style={styles.actionIcon}>🔍</span>
          <h3 style={styles.actionTitle}>Auditoría SPA</h3>
          <p style={styles.actionText}>Verifica CSR, red y rendimiento</p>
        </Link>
      </div>

      {recentBooks.length > 0 && (
        <div style={styles.recentSection}>
          <h3 style={styles.sectionTitle}>📌 Libros recientes</h3>
          <div style={styles.recentGrid}>
            {recentBooks.map((book) => (
              <div key={book.id} style={styles.recentCard}>
                <p style={styles.recentTitle}>{book.title}</p>
                <p style={styles.recentAuthor}>✍️ {book.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {lastFetch && (
        <p style={styles.footerNote}>
          Última sincronización: {lastFetch.at.toLocaleTimeString()} · {lastFetch.count} libros en {lastFetch.duration}ms
        </p>
      )}
    </section>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #4338ca 0%, #0ea5e9 100%)',
    color: '#fff',
    padding: '2rem 1.8rem',
    borderRadius: '16px',
    marginBottom: '1.8rem',
    boxShadow: '0 8px 24px rgba(67, 56, 202, 0.25)',
  },
  heroTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  heroText: {
    fontSize: '0.95rem',
    opacity: 0.9,
    maxWidth: '640px',
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  actionCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.3rem',
    textDecoration: 'none',
    color: '#1e1b4b',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  actionPrimary: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    color: '#fff',
    border: 'none',
  },
  actionIcon: {
    fontSize: '1.8rem',
    display: 'block',
    marginBottom: '0.6rem',
  },
  actionTitle: {
    fontSize: '1rem',
    marginBottom: '0.3rem',
  },
  actionText: {
    fontSize: '0.85rem',
    opacity: 0.85,
  },
  recentSection: {
    marginTop: '1rem',
  },
  sectionTitle: {
    fontSize: '1.05rem',
    color: '#1e1b4b',
    marginBottom: '0.8rem',
  },
  recentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '0.8rem',
  },
  recentCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '0.9rem',
  },
  recentTitle: {
    fontWeight: '600',
    color: '#1e1b4b',
    fontSize: '0.92rem',
    marginBottom: '0.2rem',
  },
  recentAuthor: {
    fontSize: '0.82rem',
    color: '#6b7280',
  },
  footerNote: {
    marginTop: '1.5rem',
    fontSize: '0.78rem',
    color: '#9ca3af',
    textAlign: 'center',
  },
}

export default Home