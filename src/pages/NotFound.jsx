import { Link, useLocation } from 'react-router-dom'

function NotFound() {
  const { pathname } = useLocation()

  return (
    <section style={styles.wrapper} className="fade-in">
      <div style={styles.code}>404</div>
      <h2 style={styles.title}>Página no encontrada</h2>
      <p style={styles.message}>
        La ruta <code>{pathname}</code> no existe en la Biblioteca Virtual.
      </p>
      <Link to="/" style={styles.button}>
        ← Volver al inicio
      </Link>
    </section>
  )
}

const styles = {
  wrapper: {
    textAlign: 'center',
    padding: '4rem 1.5rem',
  },
  code: {
    fontSize: '5rem',
    fontWeight: '800',
    color: '#4338ca',
    lineHeight: 1,
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.4rem',
    color: '#1e1b4b',
    marginBottom: '0.5rem',
  },
  message: {
    color: '#6b7280',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },
  button: {
    display: 'inline-block',
    background: '#4338ca',
    color: '#fff',
    padding: '0.7rem 1.4rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
}

export default NotFound