import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useSearchStore } from '../../store/searchStore'
import { tools } from '../../data/tools'
import EmptyState from './EmptyState'

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
    <div
      className="dt-overlay fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-20 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSearch()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        className="dt-dialog w-full max-w-2xl overflow-hidden rounded-[var(--dt-radius)] border-2 border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] shadow-[var(--dt-shadow)]"
      >
        <h2 id="search-dialog-title" className="sr-only">Search tools</h2>
        {/* Search Input */}
        <div className="dt-dialog-header flex items-center gap-3 border-b-2 border-[var(--dt-line)] p-4">
          <Search size={20} className="text-[var(--dt-muted)]" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            aria-label="Search tools"
            autoFocus
            className="dt-search-input min-w-0 flex-1 bg-transparent text-sm text-[var(--dt-ink)] placeholder:text-[var(--dt-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="dt-icon-button grid h-9 w-9 place-items-center rounded-[var(--dt-radius)] border border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] transition-transform hover:-translate-y-0.5"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Results */}
        <div className="dt-search-results max-h-96 overflow-y-auto p-2" aria-live="polite">
          {results.length === 0 && query && (
            <EmptyState
              icon="SearchX"
              title="No tools found"
              description={`No results for "${query}"`}
              className="py-8"
            />
          )}
          {results.map((tool) => {
            const Icon = Icons[tool.icon]
            return (
              <button
                type="button"
                key={tool.id}
                onClick={() => handleSelect(tool)}
                className="dt-search-result flex w-full items-center gap-3 rounded-[var(--dt-radius)] border border-transparent p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--dt-line)] hover:bg-[var(--dt-acid)] hover:text-[#161816]"
              >
                <div className="dt-tool-glyph grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[var(--dt-ink)] text-[var(--dt-paper)]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{tool.name}</p>
                  <p className="truncate text-xs opacity-65">{tool.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="dt-dialog-footer flex items-center justify-between border-t-2 border-[var(--dt-line)] px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[var(--dt-muted)]">
          <span>Type to search</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}
