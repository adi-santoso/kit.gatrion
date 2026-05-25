import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useSearchStore } from '../../store/searchStore'
import { tools } from '../../data/tools'

export default function SearchModal() {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore()
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setResults(filtered)
  }, [query])

  const handleSelect = (tool) => {
    navigate(tool.path)
    closeSearch()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            autoFocus
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 && query && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No tools found
            </div>
          )}
          {results.map((tool) => {
            const Icon = Icons[tool.icon]
            return (
              <button
                key={tool.id}
                onClick={() => handleSelect(tool)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.iconBg}`}>
                  <Icon size={18} className={tool.iconColor} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-100">{tool.name}</p>
                  <p className="text-xs text-slate-400">{tool.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] text-xs text-slate-500">
          <span>Type to search</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  )
}
