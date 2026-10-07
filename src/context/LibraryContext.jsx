import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { fetchBooks } from '../services/booksService'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetch, setLastFetch] = useState(null)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const controllerRef = useRef(null)

  /**
   * Carga los libros desde la API.
   * - Cancela cualquier petición previa en vuelo.
   * - Maneja loading / error / data.
   * - Guarda la fecha de última carga.
   */
  const loadBooks = useCallback(async (options = {}) => {
    const { silent = false } = options

    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller

    if (!silent) setLoading(true)
    setError(null)

    const start = performance.now()

    try {
      const data = await fetchBooks(controller.signal)
      setBooks(data)
      setLastFetch({
        at: new Date(),
        duration: Math.round(performance.now() - start),
        count: data.length,
      })
      setHasLoadedOnce(true)
      return { ok: true, data }
    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        return { ok: false, canceled: true }
      }
      const message =
        err.code === 'ECONNABORTED'
          ? 'La petición tardó demasiado. Verifica tu conexión.'
          : err.response
            ? `Error ${err.response.status}: ${err.response.statusText}`
            : 'No se pudo conectar con la API. Revisa tu conexión a internet.'
      setError(message)
      return { ok: false, error: message }
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  /**
   * Agrega un libro localmente (registrado por el usuario).
   */
  const addBook = useCallback((book) => {
    const newBook = {
      ...book,
      id: `local-${crypto.randomUUID()}`,
      source: 'local',
      createdAt: new Date().toISOString(),
    }
    setBooks((prev) => [newBook, ...prev])
    return newBook
  }, [])

  /**
   * Elimina un libro por id.
   */
  const removeBook = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  /**
   * Limpia el error actual.
   */
  const clearError = useCallback(() => setError(null), [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (controllerRef.current) controllerRef.current.abort()
    }
  }, [])

  // Carga inicial automática (una sola vez)
  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const value = useMemo(
    () => ({
      books,
      loading,
      error,
      lastFetch,
      hasLoadedOnce,
      loadBooks,
      addBook,
      removeBook,
      clearError,
      stats: {
        total: books.length,
        fromApi: books.filter((b) => b.source === 'api').length,
        local: books.filter((b) => b.source === 'local').length,
        categories: [...new Set(books.map((b) => b.category))].length,
      },
    }),
    [books, loading, error, lastFetch, hasLoadedOnce, loadBooks, addBook, removeBook, clearError]
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) {
    throw new Error('useLibrary debe usarse dentro de <LibraryProvider>')
  }
  return ctx
}