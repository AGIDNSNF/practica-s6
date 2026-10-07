import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LibraryProvider } from './context/LibraryContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Register from './pages/Register'
import Audit from './pages/Audit'
import NotFound from './pages/NotFound'

function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <Navbar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/libros" element={<Catalog />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/auditoria" element={<Audit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LibraryProvider>
  )
}

const styles = {
  main: {
    padding: '1.8rem 2rem',
    maxWidth: '1180px',
    margin: '0 auto',
  },
}

export default App