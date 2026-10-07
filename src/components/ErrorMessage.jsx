function ErrorMessage({ message, onRetry, hint }) {
  return (
    <div style={styles.wrapper} className="fade-in">
      <div style={styles.icon}>⚠️</div>
      <h3 style={styles.title}>No se pudo cargar el catálogo</h3>
      <p style={styles.message}>{message}</p>
      {hint && <p style={styles.hint}>{hint}</p>}
      {onRetry && (
        <button onClick={onRetry} style={styles.button}>
          🔄 Reintentar
        </button>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderLeft: '4px solid #dc2626',
    color: '#991b1b',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    margin: '1.5rem 0',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#7f1d1d',
  },
  message: {
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  hint: {
    fontSize: '0.8rem',
    color: '#b91c1c',
    fontFamily: 'monospace',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.6rem 1.4rem',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
}

export default ErrorMessage