import { useMemo, useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

/**
 * Hook que expone los libros del contexto + utilidades de búsqueda/filtro.
 */
export function useBooks() {
  const { books, loading, error, loadBooks, addBook, removeBook, stats } = useLibrary()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filtered = useMemo(() => {
    let result = [...books]

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.email?.toLowerCase().includes(q) ||
          b.city?.toLowerCase().includes(q)
      )
    }

    if (category !== 'all') {
      result = result.filter((b) => b.category === category)
    }

    switch (sortBy) {
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        result.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'year':
        result.sort((a, b) => b.year - a.year)
        break
      default:
        break
    }

    return result
  }, [books, query, category, sortBy])

  return {
    books: filtered,
    allBooks: books,
    loading,
    error,
    stats,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    loadBooks,
    addBook,
    removeBook,
  }
}