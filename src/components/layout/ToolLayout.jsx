import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useRecentStore } from '../../store/recentStore'
import { tools, categories } from '../../data/tools'

export default function ToolLayout({ title, description, children }) {
  const location = useLocation()
  const { favorites, toggleFavorite } = useFavoritesStore()
  const { addRecent } = useRecentStore()

  // Auto-detect tool from URL path
  const tool = tools.find(t => location.pathname === t.path)
  const categoryData = tool ? categories.find(c => c.id === tool.category) : null
  const isFavorite = tool && favorites.includes(tool.id)

  // Track recent tool usage
  useEffect(() => {
    if (tool) {
      addRecent(tool.id)
    }
  }, [tool, addRecent])

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
        <Link to="/" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        {categoryData && (
          <>
            <Link to={`/${tool.category}`} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors capitalize">
              {categoryData.label}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-slate-700 dark:text-slate-300">{title}</span>
      </div>

      {/* Tool Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        {tool && (
          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500 dark:text-yellow-400'
                : 'bg-slate-100 dark:bg-gray-800 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            aria-label="Toggle favorite"
          >
            <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {/* Tool Content */}
      {children}
    </div>
  )
}
