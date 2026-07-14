import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { tools } from '../data/tools'
import { ToolBadge } from '../components/ui/Badge'
import RecentTools from '../components/ui/RecentTools'
import SEO from '../components/SEO'
import { WebSiteSchema, SoftwareApplicationSchema } from '../components/StructuredData'

export default function Dashboard() {
  const popularTools = tools.filter(tool => tool.popular)

  return (
    <>
      <SEO />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <motion.div
        className="p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
      {/* Hero Section */}
      <div className="mb-8 md:mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
        <div className="flex-1 w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              All-in-One Toolkit
            </span>
            <br />
            <span className="text-slate-900 dark:text-slate-100">for Developers</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mb-6">
            Kumpulan tools gratis dan lengkap untuk developer. Semua berjalan di browser. Cepat, aman, dan privat.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/all"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              Browse All Tools
              <ArrowRight size={16} />
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>27 Tools</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
              <span>100% Free</span>
            </div>
          </div>
        </div>

        {/* Floating Icons Illustration */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-3 w-full max-w-[200px]">
          <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 cursor-default">
            {'{}'}
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-violet-500/10 hover:bg-violet-500/20 transition-all duration-300 hover:scale-110 cursor-default delay-100">
            {'</>'}
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 cursor-default delay-200">
            Aa
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-pink-500/10 hover:bg-pink-500/20 transition-all duration-300 hover:scale-110 cursor-default delay-300">
            🔐
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-orange-500/10 hover:bg-orange-500/20 transition-all duration-300 hover:scale-110 cursor-default delay-500">
            🎨
          </div>
        </div>
      </div>
      {/* Recent Tools Section */}
      <div className="mb-8 md:mb-10">
        <RecentTools />
      </div>

      {/* Popular Tools Section */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">Popular Tools</h2>
        <Link
          to="/all"
          className="flex items-center gap-1 text-xs md:text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
        >
          View all tools
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Tools Grid */}
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
        {popularTools.map((tool) => {
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
                className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer block"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${tool.iconBg}`}>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                    <Icon size={20} className={tool.iconColor} />
                  </motion.div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{tool.name}</p>
                  <ToolBadge tool={tool} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{tool.description}</p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
    </>
  )
}
