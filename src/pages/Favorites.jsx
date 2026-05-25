import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { useFavoritesStore } from '../store/favoritesStore'
import { tools } from '../data/tools'

export default function Favorites() {
  const { favorites } = useFavoritesStore()
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">Favorites</h1>
      <p className="text-slate-400 text-sm mb-6">Your favorite tools for quick access.</p>

      {favoriteTools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">No favorites yet. Star your favorite tools to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {favoriteTools.map((tool) => {
            const Icon = Icons[tool.icon]
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group bg-gray-900 border border-white/[0.06] rounded-xl p-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${tool.iconBg}`}>
                  <Icon size={20} className={tool.iconColor} />
                </div>
                <p className="font-medium text-sm text-slate-100 mb-1">{tool.name}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{tool.description}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
