import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { tools } from '../data/tools'
import { ToolBadge } from '../components/ui/Badge'

export default function AllTools() {
  return (
    <motion.div 
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">All Tools</h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          {tools.length} tools tersedia untuk membantu pekerjaan Anda
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {tools.map((tool) => {
          const Icon = Icons[tool.icon]
          return (
            <motion.div
              key={tool.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Link to={tool.path}
              className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${tool.iconBg}`}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                <Icon size={20} className={tool.iconColor} />
                </motion.div>
                </motion.div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{tool.name}</p>
                  <ToolBadge tool={tool} />
                </div>
                  <ToolBadge tool={tool} />
                </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{tool.description}</p>
            </Link>
          
            </motion.div>)
        })}
      </div>
    </motion.div>
  )
}
