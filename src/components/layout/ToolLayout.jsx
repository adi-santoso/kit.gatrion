import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useRecentStore } from '../../store/recentStore'
import { tools } from '../../data/tools'

export default function ToolLayout({ category, toolName, description, children }) {
  const { favorites, toggleFavorite } = useFavoritesStore()
  const { addRecent } = useRecentStore()
  const tool = tools.find(t => t.category === category && t.name === toolName)
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
        <span className="capitalize">{category}</span>
        <ChevronRight size={14} />
        <span className="text-slate-700 dark:text-slate-300">{toolName}</span>
      </div>

      {/* Tool Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{toolName}</h1>
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
