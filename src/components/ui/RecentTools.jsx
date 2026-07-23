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
    <section className="dt-recent-tools" aria-labelledby="recent-tools-title">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-[var(--dt-coral)]" aria-hidden="true" />
        <h3 id="recent-tools-title" className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--dt-muted)]">
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
                className="dt-recent-tool group flex items-center gap-3 rounded-[var(--dt-radius)] border border-transparent p-2 text-[var(--dt-ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--dt-line)] hover:bg-[var(--dt-panel)] hover:shadow-[2px_2px_0_var(--dt-line)]"
              >
                <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--dt-ink)] text-[var(--dt-paper)]">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold">
                    {tool.name}
                  </p>
                  <p className="truncate font-mono text-[9px] uppercase tracking-wider text-[var(--dt-muted)]">
                    {tool.category}
                  </p>
                </div>
                <ArrowRight 
                  size={14} 
                  className="text-[var(--dt-coral)] opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
