import { Link, useParams } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { tools, categories } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'
import EmptyState from '../components/ui/EmptyState'
import SEO from '../components/SEO'

export default function CategoryPage() {
  const { category } = useParams()
  const categoryData = categories.find((item) => item.id === category)
  const categoryTools = tools.filter((tool) => tool.category === category)

  if (!categoryData) return <div className="dt-page"><EmptyState icon="SearchX" title="Category not found" description="This collection does not exist." /></div>
  const Icon = Icons[categoryData.icon]

  return <><SEO title={`${categoryData.label} Tools | DevToolkit`} description={`${categoryTools.length} ${categoryData.label} tools gratis untuk developer. 100% client-side processing, no registration required.`} canonical={`https://kit.gatrion.my.id/${category}`} /><div className="dt-page"><header className="dt-panel dt-hard-shadow mb-9 flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-end sm:p-8"><div><div className="dt-eyebrow mb-4">Collection / {String(categoryTools.length).padStart(2, '0')}</div><div className="flex items-center gap-4"><div className="dt-tool-glyph h-12 w-12"><Icon size={22} /></div><h1 className="dt-page-heading">{categoryData.label}</h1></div><p className="dt-page-copy mt-4">Focused browser-native instruments. Data stays on device.</p></div><Link to="/all" className="font-mono text-[10px] uppercase tracking-wider text-[var(--dt-muted)] hover:text-[var(--dt-coral)]">All collections ↗</Link></header><div className="dt-tool-grid">{categoryTools.map((tool, index) => <ToolCard key={tool.id} tool={tool} featured={index === 0 && categoryTools.length > 3} />)}</div></div></>
}
