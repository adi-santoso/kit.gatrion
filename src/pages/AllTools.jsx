import { useState } from 'react'
import { Search } from 'lucide-react'
import { tools, categories } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'

export default function AllTools() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const filteredTools = tools.filter((tool) => (category === 'all' || tool.category === category) && [tool.name, tool.description, ...tool.tags].join(' ').toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="dt-page">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div><div className="dt-eyebrow mb-3">Full collection / {tools.length}</div><h1 className="dt-page-heading">Utility index</h1><p className="dt-page-copy mt-3">Every tool opens instantly and runs locally.</p></div>
        <label className="flex h-11 w-full max-w-md items-center gap-2 rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] px-3 shadow-[3px_3px_0_var(--dt-line)]"><Search size={16} className="text-[var(--dt-muted)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by name or intent..." className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label>
      </div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2"><button type="button" onClick={() => setCategory('all')} className={`dt-chip ${category === 'all' ? 'dt-chip-active' : ''}`}>All / {tools.length}</button>{categories.map((item) => <button type="button" key={item.id} onClick={() => setCategory(item.id)} className={`dt-chip ${category === item.id ? 'dt-chip-active' : ''}`}>{item.label}</button>)}</div>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-wider text-[var(--dt-muted)]">Showing {filteredTools.length} instruments</div>
      <div className="dt-tool-grid">{filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
    </div>
  )
}
