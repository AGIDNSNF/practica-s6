import { NavLink } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/libros', label: 'Catálogo' },
  { to: '/registrar', label: 'Registrar' },
  { to: '/auditoria', label: 'Auditoría' },
]

function Navbar() {
  const { stats, loading } = useLibrary()

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>📚</span>
        <div>
          <h1 style={styles.title}>Biblioteca Virtual</h1>
          <p style={styles.subtitle}>
            {loading ? 'Sincronizando...' : `${stats.total} libros en línea`}
          </p>
        </div>
      </div>

      <div style={styles.links}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.linkActive : {}),
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    flexWrap: 'wrap',
    gap: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  logo: {
    fontSize: '2rem',
  },
  title: {
    fontSize: '1.15rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.75rem',
    color: '#c7d2fe',
    marginTop: '0.1rem',
  },
  links: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  link: {
    color: '#c7d2fe',
    padding: '0.55rem 1.1rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  linkActive: {
    color: '#fff',
    background: '#4338ca',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(67, 56, 202, 0.4)',
  },
}

export default Navbar