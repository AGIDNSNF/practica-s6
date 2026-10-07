import { CATEGORIES } from '../utils/constants'

function BookCard({ book, onRemove, highlight = false }) {
  const categoryLabel =
    CATEGORIES.find((c) => c.value === book.category)?.label || book.category

  const isLocal = book.source === 'local'

  return (
    <article
      className="fade-in"
      style={{
        ...styles.card,
        ...(highlight ? styles.cardHighlight : {}),
      }}
    >
      <div style={styles.header}>
        <span style={{
          ...styles.badge,
          ...(isLocal ? styles.badgeLocal : styles.badgeApi),
        }}>
          {isLocal ? '✍️ Local' : '🌐 API'}
        </span>
        {onRemove && (
          <button
            onClick={() => onRemove(book.id)}
            style={styles.removeBtn}
            title="Eliminar"
          >
            ✕
          </button>
        )}
      </div>

      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>✍️ {book.author}</p>

      <div style={styles.meta}>
        <span style={styles.metaItem}>🏷️ {categoryLabel}</span>
        <span style={styles.metaItem}>📅 {book.year}</span>
      </div>

      {book.email && (
        <p style={styles.contact}>📧 {book.email}</p>
      )}
      {book.city && (
        <p style={styles.contact}>📍 {book.city}</p>
      )}
    </article>
  )
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.1rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  cardHighlight: {
    borderColor: '#0ea5e9',
    boxShadow: '0 4px 16px rgba(14, 165, 233, 0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.3rem',
  },
  badge: {
    fontSize: '0.7rem',
    padding: '0.2rem 0.55rem',
    borderRadius: '999px',
    fontWeight: '600',
  },
  badgeApi: {
    background: '#eef2ff',
    color: '#4338ca',
  },
  badgeLocal: {
    background: '#dcfce7',
    color: '#166534',
  },
  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '0.9rem',
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
  },
  title: {
    fontSize: '1rem',
    color: '#1e1b4b',
    fontWeight: '700',
    lineHeight: '1.3',
  },
  author: {
    fontSize: '0.88rem',
    color: '#4b5563',
  },
  meta: {
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
    marginTop: '0.3rem',
  },
  metaItem: {
    fontSize: '0.78rem',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '0.2rem 0.5rem',
    borderRadius: '6px',
  },
  contact: {
    fontSize: '0.78rem',
    color: '#9ca3af',
    marginTop: '0.1rem',
  },
}

export default BookCard