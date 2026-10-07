import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import BookForm from '../components/BookForm'
import BookCard from '../components/BookCard'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

function Register() {
  const { addBook, books, removeBook } = useLibrary()
  const [lastAdded, setLastAdded] = useState(null)
  const [toast, setToast] = useState(null)

  const localBooks = books.filter((b) => b.source === 'local')

  const handleSubmit = (bookData) => {
    const newBook = addBook(bookData)
    setLastAdded(newBook)
    setToast({ message: `"${newBook.title}" registrado correctamente`, type: 'success' })
  }

  const handleRemove = (id) => {
    removeBook(id)
    setToast({ message: 'Libro eliminado', type: 'info' })
  }

  return (
    <section className="fade-in">
      <header style={styles.header}>
        <h2 style={styles.title}>📝 Registrar Libro</h2>
        <p style={styles.subtitle}>
          Formulario controlado con <code>useState</code>. Los libros se guardan en el estado global
          y aparecen también en el catálogo.
        </p>
      </header>

      <div style={styles.layout}>
        <div>
          <BookForm onSubmit={handleSubmit} />
        </div>

        {lastAdded && (
          <aside style={styles.preview}>
            <p style={styles.previewLabel}>Vista previa del último registro</p>
            <BookCard book={lastAdded} highlight />
            <Link to="/libros" style={styles.linkToCatalog}>
              Ver en el catálogo →
            </Link>
          </aside>
        )}
      </div>

      <div style={styles.localSection}>
        <h3 style={styles.sectionTitle}>
          ✍️ Libros registrados localmente ({localBooks.length})
        </h3>

        {localBooks.length === 0 ? (
          <EmptyState
            icon="📝"
            title="Aún no has registrado libros"
            message="Usa el formulario de arriba para añadir tu primer libro."
          />
        ) : (
          <div style={styles.grid}>
            {localBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
  layout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
    gap: '1.5rem',
    alignItems: 'start',
    marginBottom: '2rem',
  },
  preview: {
    background: '#f9fafb',
    border: '1px dashed #d1d5db',
    borderRadius: '12px',
    padding: '1rem',
  },
  previewLabel: {
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#9ca3af',
    marginBottom: '0.6rem',
    fontWeight: '600',
  },
  linkToCatalog: {
    display: 'inline-block',
    marginTop: '0.8rem',
    color: '#4338ca',
    fontWeight: '600',
    fontSize: '0.85rem',
    textDecoration: 'none',
  },
  localSection: {
    marginTop: '1rem',
  },
  sectionTitle: {
    fontSize: '1.05rem',
    color: '#1e1b4b',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
  },
}

export default Register