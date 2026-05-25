import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { tools } from '../data/tools'

export default function Dashboard() {
  const popularTools = tools.filter(tool => tool.popular)

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              All-in-One Toolkit
            </span>
            <br />
            <span className="text-slate-900 dark:text-slate-100">for Developers</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Kumpulan tools gratis dan lengkap untuk developer. Semua berjalan di browser. Cepat, aman, dan privat.
          </p>
        </div>

        {/* Floating Icons Illustration */}
        <div className="hidden lg:flex items-center justify-center gap-4 flex-wrap max-w-xs">
          <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl animate-bounce">
            {'{}'}
          </div>
          <div className="w-16 h-16 bg-violet-500/10 rounded-xl flex items-center justify-center text-2xl animate-bounce delay-100">
            {'</>'}
          </div>
          <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center text-2xl animate-bounce delay-200">
            Aa
          </div>
          <div className="w-16 h-16 bg-pink-500/10 rounded-xl flex items-center justify-center text-2xl animate-bounce delay-300">
            🔐
          </div>
          <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center text-2xl animate-bounce delay-500">
            🎨
          </div>
        </div>
      </div>

      {/* Popular Tools Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Popular Tools</h2>
        <Link
          to="/all"
          className="flex items-center gap-1 text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
        >
          View all tools
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {popularTools.map((tool) => {
          const Icon = Icons[tool.icon]
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-slate-300 dark:hover:border-white/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
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
    </motion.div>
  )
}
