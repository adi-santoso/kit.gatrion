import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tools, categories } from '../data/tools'
import { ToolBadge } from '../components/ui/Badge'
import * as Icons from 'lucide-react'
import SEO from '../components/SEO'

export default function CategoryPage() {
  const { category } = useParams()
  const categoryData = categories.find((c) => c.id === category)
  const categoryTools = tools.filter((t) => t.category === category)

  if (!categoryData) {
    return (
      <div className="p-8">
        <p className="text-slate-400">Category not found</p>
      </div>
    )
  }

  const CategoryIcon = Icons[categoryData.icon]

  return (
    <>
      <SEO
        title={`${categoryData.label} Tools | DevToolkit`}
        description={`${categoryTools.length} ${categoryData.label} tools gratis untuk developer. 100% client-side processing, no registration required.`}
        canonical={`https://kit.gatrion.my.id/${category}`}
      />
      <motion.div
        className="p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 md:p-3 bg-blue-500/10 rounded-lg">
          <CategoryIcon className="text-blue-400" size={20} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{categoryData.label}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">{categoryTools.length} tools available</p>
        </div>
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
        {categoryTools.map((tool) => {
          const ToolIcon = Icons[tool.icon]
          return (
            <motion.div
              key={tool.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Link to={tool.path}
                className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ease-out block"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${tool.iconBg}`}>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                    <ToolIcon className={tool.iconColor} size={20} />
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
