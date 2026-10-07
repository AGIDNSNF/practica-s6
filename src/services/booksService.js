import axios from 'axios'
import { API_URL } from '../utils/constants'

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Transforma un usuario de jsonplaceholder en un "libro" de la biblioteca.
 */
function mapUserToBook(user) {
  const categories = ['novela', 'cuento', 'poesia', 'ensayo', 'ciencia-ficcion', 'historia']
  const randomCategory = categories[user.id % categories.length]

  return {
    id: `api-${user.id}`,
    title: `Crónicas de ${user.name.split(' ')[0]}`,
    author: user.name,
    category: randomCategory,
    year: 1980 + (user.id % 40),
    email: user.email,
    city: user.address.city,
    source: 'api',
  }
}

/**
 * Obtiene la lista de libros desde la API.
 * @param {AbortSignal} signal - señal para cancelar la petición
 * @returns {Promise<Array>}
 */
export async function fetchBooks(signal) {
  const response = await apiClient.get('/users', { signal })
  return response.data.map(mapUserToBook)
}

/**
 * Obtiene un libro por id (simula detalle).
 * @param {string} id
 * @param {AbortSignal} signal
 */
export async function fetchBookById(id, signal) {
  const numericId = id.replace('api-', '')
  const response = await apiClient.get(`/users/${numericId}`, { signal })
  return mapUserToBook(response.data)
}

export default apiClient