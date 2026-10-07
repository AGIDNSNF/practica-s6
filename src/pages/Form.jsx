import { useState } from 'react'

function Form() {
  // Estado del formulario (un solo objeto controlado)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    year: '',
  })

  // Estado de la lista de libros registrados
  const [books, setBooks] = useState([])

  // Estado para saber si ya se envió (feedback visual)
  const [submitted, setSubmitted] = useState(false)

  // Estado de errores de validación
  const [errors, setErrors] = useState({})

  // Manejador genérico de cambios (controlled inputs)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Validación simple
  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio'
    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio'
    if (!formData.category) newErrors.category = 'Selecciona una categoría'
    if (!formData.year || isNaN(formData.year)) newErrors.year = 'Año inválido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejo del submit
  const handleSubmit = (e) => {
    e.preventDefault() // evita la recarga de la página
    if (!validate()) return

    // Creamos el nuevo libro con id único y estable
    const newBook = {
      id: crypto.randomUUID(), // key única y estable
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      year: Number(formData.year),
    }

    setBooks((prev) => [newBook, ...prev])
    setFormData({ title: '', author: '', category: '', year: '' })
    setErrors({})
    setSubmitted(true)

    // Ocultamos el mensaje de éxito tras 3s
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section>
      <h2 style={{ marginBottom: '0.5rem' }}>📝 Registrar Libro</h2>
      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Formulario controlado con <code>useState</code> y renderizado iterativo con <code>.map()</code>.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* ============ FORMULARIO ============ */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label htmlFor="title" style={labelStyle}>Título *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Cien años de soledad"
              style={inputStyle}
            />
            {errors.title && <span style={errorStyle}>{errors.title}</span>}
          </div>

          <div>
            <label htmlFor="author" style={labelStyle}>Autor *</label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Ej: Gabriel García Márquez"
              style={inputStyle}
            />
            {errors.author && <span style={errorStyle}>{errors.author}</span>}
          </div>

          <div>
            <label htmlFor="category" style={labelStyle}>Categoría *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Seleccionar...</option>
              <option value="novela">Novela</option>
              <option value="cuento">Cuento</option>
              <option value="poesia">Poesía</option>
              <option value="ensayo">Ensayo</option>
            </select>
            {errors.category && <span style={errorStyle}>{errors.category}</span>}
          </div>

          <div>
            <label htmlFor="year" style={labelStyle}>Año *</label>
            <input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="Ej: 1967"
              style={inputStyle}
            />
            {errors.year && <span style={errorStyle}>{errors.year}</span>}
          </div>

          <button
            type="submit"
            style={{
              padding: '0.7rem 1.2rem',
              background: '#0ea5e9',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}
          >
            Enviar (useState)
          </button>

          {/* Renderizado condicional con && */}
          {submitted && (
            <p style={{
              background: '#dcfce7',
              color: '#166534',
              padding: '0.6rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              ✅ Libro registrado correctamente
            </p>
          )}
        </form>

        {/* ============ ESTADO REACT (debug) ============ */}
        <div style={{
          background: '#1e1b4b',
          color: '#c7d2fe',
          padding: '1.5rem',
          borderRadius: '10px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          whiteSpace: 'pre-wrap',
        }}>
          <strong style={{ color: '#fff' }}>📊 Estado React (useState)</strong>
          <pre style={{ marginTop: '0.8rem' }}>
{JSON.stringify({ ...formData, submitted }, null, 2)}
          </pre>
        </div>
      </div>

      {/* ============ LISTA ITERATIVA ============ */}
      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          📚 Libros registrados ({books.length})
        </h3>

        {/* Renderizado condicional con ternario */}
        {books.length === 0 ? (
          <p style={{
            color: '#6b7280',
            textAlign: 'center',
            padding: '2rem',
            background: '#fff',
            borderRadius: '10px',
            border: '1px dashed #d1d5db'
          }}>
            Aún no has registrado libros. Usa el formulario 👆
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {/* Renderizado iterativo con .map() y key única */}
            {books.map((book) => (
              <article
                key={book.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '1rem',
                }}
              >
                <h4 style={{ color: '#1e1b4b', marginBottom: '0.3rem' }}>
                  {book.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                  ✍️ {book.author}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  🏷️ {book.category} — 📅 {book.year}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Estilos reutilizables
const labelStyle = {
  display: 'block',
  marginBottom: '0.3rem',
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#374151',
}

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.95rem',
  outline: 'none',
}

const errorStyle = {
  color: '#dc2626',
  fontSize: '0.8rem',
  marginTop: '0.25rem',
  display: 'block',
}

export default Form