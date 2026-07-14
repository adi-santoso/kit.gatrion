import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useFavoritesStore } from '../store/favoritesStore'
import { tools } from '../data/tools'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Favorites() {
  const { favorites } = useFavoritesStore()
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id))

  return (
    <motion.div 
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Favorites</h1>
      <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6">Your favorite tools for quick access.</p>

      {favoriteTools.length === 0 ? (
        <EmptyState
          icon="Star"
          title="No favorites yet"
          description="Star your favorite tools to see them here for quick access."
          action={
            <Link to="/">
              <Button>Explore Tools</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {favoriteTools.map((tool) => {
            const Icon = Icons[tool.icon]
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-slate-300 dark:hover:border-white/20 hover:scale-[1.02] transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${tool.iconBg}`}>
                  <Icon size={20} className={tool.iconColor} />
                </div>
                <p className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-1">{tool.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{tool.description}</p>
              </Link>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
