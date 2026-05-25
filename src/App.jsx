import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from './store/themeStore'
import { useSearchStore } from './store/searchStore'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import SearchModal from './components/ui/SearchModal'
import Dashboard from './pages/Dashboard'
import CategoryPage from './pages/CategoryPage'
import ToolPage from './pages/ToolPage'
import Favorites from './pages/Favorites'
import About from './pages/About'

function App() {
  const theme = useThemeStore((state) => state.theme)
  const { openSearch, closeSearch } = useSearchStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      if (e.key === 'Escape') {
        closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openSearch, closeSearch])

  return (
    <Router>
      <div className="flex h-screen bg-slate-950 text-slate-100">
        <Sidebar />
        <motion.div 
          className="flex-1 ml-64 flex flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/:category/:toolId" element={<ToolPage />} />
            </Routes>
          </main>
        </motion.div>
        <SearchModal />
      </div>
    </Router>
  )
}

export default App
