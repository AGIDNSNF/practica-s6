import { CATEGORIES } from '../utils/constants'

function SearchBar({
  query,
  setQuery,
  category,
  setCategory,
  sortBy,
  setSortBy,
  totalResults,
  totalAll,
  onReload,
  loading,
}) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>
        <div style={styles.inputWrap}>
          <span style={styles.icon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por título, autor, email o ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          {query && (
            <button onClick={() => setQuery('')} style={styles.clearBtn}>
              ✕
            </button>
          )}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="all">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="recent">Más recientes</option>
          <option value="title">Título (A-Z)</option>
          <option value="author">Autor (A-Z)</option>
          <option value="year">Año (desc)</option>
        </select>

        <button
          onClick={onReload}
          disabled={loading}
          style={styles.reloadBtn}
          title="Recargar desde la API"
        >
          {loading ? '⏳' : '🔄'} Recargar
        </button>
      </div>

      <p style={styles.results}>
        Mostrando <strong>{totalResults}</strong> de <strong>{totalAll}</strong> libros
      </p>
    </div>
  )
}

const styles = {
  wrapper: {
    background: '#fff',
    padding: '1rem 1.2rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  row: {
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },
  inputWrap: {
    position: 'relative',
    flex: '1 1 260px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '0.8rem',
    fontSize: '0.95rem',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.6rem 2.2rem 0.6rem 2.3rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    background: '#f9fafb',
  },
  clearBtn: {
    position: 'absolute',
    right: '0.6rem',
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '0.8rem',
  },
  select: {
    padding: '0.6rem 0.8rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.88rem',
    background: '#f9fafb',
    outline: 'none',
    cursor: 'pointer',
  },
  reloadBtn: {
    padding: '0.6rem 1rem',
    background: '#4338ca',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.88rem',
    whiteSpace: 'nowrap',
  },
  results: {
    marginTop: '0.8rem',
    fontSize: '0.82rem',
    color: '#6b7280',
  },
}

export default SearchBar