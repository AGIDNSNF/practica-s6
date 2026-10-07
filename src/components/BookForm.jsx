import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'

const initialState = {
  title: '',
  author: '',
  category: '',
  year: '',
  email: '',
  city: '',
}

function BookForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const validate = () => {
    const newErrors = {}
    const currentYear = new Date().getFullYear()

    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio'
    else if (formData.title.trim().length < 3)
      newErrors.title = 'El título debe tener al menos 3 caracteres'

    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio'

    if (!formData.category) newErrors.category = 'Selecciona una categoría'

    if (!formData.year) newErrors.year = 'El año es obligatorio'
    else if (isNaN(formData.year)) newErrors.year = 'El año debe ser numérico'
    else if (formData.year < 1000 || formData.year > currentYear)
      newErrors.year = `El año debe estar entre 1000 y ${currentYear}`

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Email inválido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      year: Number(formData.year),
      email: formData.email.trim() || undefined,
      city: formData.city.trim() || undefined,
    })

    setFormData(initialState)
    setErrors({})
    setTouched({})
  }

  const showError = (field) =>
    (touched[field] || errors[field]) && errors[field]

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <div style={styles.grid}>
        <Field
          label="Título *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Cien años de soledad"
          error={showError('title')}
        />

        <Field
          label="Autor *"
          name="author"
          value={formData.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Gabriel García Márquez"
          error={showError('author')}
        />

        <div>
          <label style={styles.label} htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              ...(showError('category') ? styles.inputError : {}),
            }}
          >
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {showError('category') && (
            <span style={styles.error}>{errors.category}</span>
          )}
        </div>

        <Field
          label="Año *"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: 1967"
          error={showError('year')}
        />

        <Field
          label="Email (opcional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="contacto@biblioteca.com"
          error={showError('email')}
        />

        <Field
          label="Ciudad (opcional)"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Lima"
          error={showError('city')}
        />
      </div>

      <div style={styles.actions}>
        <button type="submit" style={styles.submitBtn}>
          ➕ Registrar libro
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

function Field({ label, name, value, onChange, onBlur, placeholder, type = 'text', error }) {
  return (
    <div>
      <label style={styles.label} htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {}),
        }}
      />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  )
}

const styles = {
  form: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.35rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '0.65rem 0.85rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.92rem',
    outline: 'none',
    background: '#f9fafb',
    transition: 'all 0.2s ease',
  },
  inputError: {
    borderColor: '#dc2626',
    background: '#fef2f2',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.78rem',
    marginTop: '0.3rem',
    display: 'block',
  },
  actions: {
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },
  submitBtn: {
    padding: '0.75rem 1.5rem',
    background: '#4338ca',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.92rem',
  },
  cancelBtn: {
    padding: '0.75rem 1.5rem',
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.92rem',
  },
}

export default BookForm