import { useBooks } from '../hooks/useBooks'
import BookCard from '../components/BookCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function List() {
  const { books, loading, error, fetchBooks } = useBooks()

  return (
    <section>
      <h2 style={{ marginBottom: '0.5rem' }}>📖 Catálogo de Libros</h2>
      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Fetch de datos desde <code>jsonplaceholder.typicode.com</code> con manejo de estados <strong>loading / data / error</strong>.
      </p>

      {/* Botonera del simulador */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => fetchBooks(false)}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#0ea5e9',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Simular Loading
        </button>
        <button
          onClick={() => fetchBooks(false)}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ✅ Simular Éxito
        </button>
        <button
          onClick={() => fetchBooks(true)}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ❌ Simular Error
        </button>
      </div>

      {/* Renderizado condicional según el estado */}
      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={() => fetchBooks(false)} />
      )}

      {!loading && !error && books.length === 0 && (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
          Aún no hay libros cargados. Usa los botones para simular una petición.
        </p>
      )}

      {!loading && !error && books.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}

export default List