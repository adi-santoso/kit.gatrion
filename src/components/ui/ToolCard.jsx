import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { categories } from '../../data/tools'
import { ToolBadge } from './Badge'

export default function ToolCard({ tool, featured = false }) {
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const Icon = Icons[tool.icon]
  const category = categories.find((item) => item.id === tool.category)
  const isFavorite = favorites.includes(tool.id)

  return (
    <article className={`dt-tool-card ${featured ? 'dt-tool-card-featured' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="dt-tool-glyph"><Icon size={19} /></div>
        <button type="button" onClick={() => toggleFavorite(tool.id)} className={`dt-favorite ${isFavorite ? 'text-[var(--dt-coral)]' : ''}`} aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`} aria-pressed={isFavorite}><Star size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      </div>
      {featured && <div className="dt-mini-editor my-4"><span className="dt-code-coral">{'{'}</span><br />&nbsp;&nbsp;<span className="dt-code-cyan">&quot;runtime&quot;</span>: <span className="dt-code-acid">&quot;browser&quot;</span>,<br />&nbsp;&nbsp;<span className="dt-code-cyan">&quot;private&quot;</span>: true<br /><span className="dt-code-coral">{'}'}</span></div>}
      <Link to={tool.path} className="mt-auto block pt-6 focus-visible:outline-none">
        <div className="mb-1.5 flex flex-wrap items-center gap-2"><h3 className="text-sm font-extrabold tracking-[-0.025em]">{tool.name}</h3><ToolBadge tool={tool} /></div>
        <p className="text-[11px] leading-relaxed text-[color-mix(in_srgb,var(--dt-ink)_62%,transparent)]">{tool.description}</p>
        <div className="dt-tool-meta">{category?.label || tool.category} · local</div>
      </Link>
    </article>
  )
}
