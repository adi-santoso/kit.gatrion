import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useRecentStore } from '../../store/recentStore'
import { tools } from '../../data/tools'
import EmptyState from './EmptyState'

export default function RecentTools() {
  const { recents } = useRecentStore()
  const recentTools = recents.map(id => tools.find(t => t.id === id)).filter(Boolean)

  if (recentTools.length === 0) {
    return (
      <EmptyState
        icon="Clock"
        title="No recent tools"
        description="Tools you use will appear here for quick access"
        className="py-8"
      />
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-slate-500 dark:text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Recent Tools
        </h3>
      </div>

      <div className="space-y-2">
        {recentTools.slice(0, 5).map((tool, index) => {
          const Icon = Icons[tool.icon]
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                to={tool.path}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                  <Icon size={16} className={tool.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {tool.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {tool.category}
                  </p>
                </div>
                <ArrowRight 
                  size={14} 
                  className="text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
