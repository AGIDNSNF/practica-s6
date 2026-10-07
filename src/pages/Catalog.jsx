import { useState } from 'react'
import { useBooks } from '../hooks/useBooks'
import BookCard from '../components/BookCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import SearchBar from '../components/SearchBar'
import Toast from '../components/Toast'

function Catalog() {
  const {
    books,
    allBooks,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    loadBooks,
    removeBook,
  } = useBooks()

  const [toast, setToast] = useState(null)

  const handleReload = async () => {
    const result = await loadBooks()
    if (result.ok) {
      setToast({ message: `Catálogo actualizado: ${result.data.length} libros`, type: 'success' })
    } else if (result.error) {
      setToast({ message: result.error, type: 'error' })
    }
  }

  const handleRemove = (id) => {
    const book = allBooks.find((b) => b.id === id)
    removeBook(id)
    setToast({ message: `"${book?.title}" eliminado`, type: 'info' })
  }

  return (
    <section className="fade-in">
      <header style={styles.header}>
        <h2 style={styles.title}>📖 Catálogo de Libros</h2>
        <p style={styles.subtitle}>
          Datos cargados desde <code>jsonplaceholder.typicode.com</code> con Axios y async/await.
        </p>
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={books.length}
        totalAll={allBooks.length}
        onReload={handleReload}
        loading={loading}
      />

      {loading && <Loader message="Cargando libros desde la API..." hint="GET /users" />}

      {!loading && error && (
        <ErrorMessage
          message={error}
          hint="GET /users — verifica tu conexión"
          onRetry={handleReload}
        />
      )}

      {!loading && !error && allBooks.length === 0 && (
        <EmptyState
          icon="📭"
          title="No hay libros en la biblioteca"
          message="Recarga el catálogo o registra un libro nuevo."
        />
      )}

      {!loading && !error && allBooks.length > 0 && books.length === 0 && (
        <EmptyState
          icon="🔍"
          title="Sin resultados"
          message={`No se encontraron libros con "${query}" en la categoría seleccionada.`}
        />
      )}

      {!loading && !error && books.length > 0 && (
        <div style={styles.grid}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} onRemove={handleRemove} />
          ))}
        </div>
      )}

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
    marginBottom: '1.2rem',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1rem',
  },
}

export default Catalog