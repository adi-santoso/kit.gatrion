import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tools, categories } from '../data/tools'
import * as Icons from 'lucide-react'

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
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <CategoryIcon className="text-blue-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{categoryData.label}</h1>
            <p className="text-slate-400 text-sm">{categoryTools.length} tools available</p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map((tool) => {
            const ToolIcon = Icons[tool.icon]
            return (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={tool.path}
                  className="block p-4 bg-gray-800/50 border border-white/[0.06] rounded-lg hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${tool.iconBg} rounded-lg`}>
                      <ToolIcon className={tool.iconColor} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
