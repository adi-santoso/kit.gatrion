import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useRecentStore } from '../../store/recentStore'
import { tools, categories } from '../../data/tools'

export default function ToolLayout({ title, toolName, category, description, children }) {
  const location = useLocation()
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const addRecent = useRecentStore((state) => state.addRecent)

  const tool = tools.find(t => location.pathname === t.path)
  const categoryId = tool?.category || category
  const categoryData = categories.find(c => c.id === categoryId)
  const isFavorite = tool && favorites.includes(tool.id)
  const resolvedTitle = title || toolName || tool?.name || 'Tool'
  const resolvedDescription = description || tool?.description
  const toolNumber = tool ? String(tools.indexOf(tool) + 1).padStart(2, '0') : '--'

  useEffect(() => {
    if (tool) {
      addRecent(tool.id)
    }
  }, [tool, addRecent])

  return (
    <div className="dt-tool-layout mx-auto w-full max-w-[1450px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <nav
        className="dt-tool-breadcrumb mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--dt-muted)]"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="transition-colors hover:text-[var(--dt-ink)]">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        {categoryData && (
          <>
            <Link to={`/${categoryId}`} className="capitalize transition-colors hover:text-[var(--dt-ink)]">
              {categoryData.label}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-[var(--dt-ink)]" aria-current="page">{resolvedTitle}</span>
      </nav>

      <section className="dt-workspace grid min-w-0 grid-cols-1 overflow-hidden rounded-[5px] border-2 border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] shadow-[var(--dt-shadow)] lg:grid-cols-[220px_minmax(0,1fr)]">
        <header className="dt-workspace-info relative border-b-2 border-[var(--dt-line)] p-5 sm:p-6 lg:min-h-[260px] lg:border-b-0 lg:border-r-2">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--dt-coral)]">
              Workspace / {toolNumber}
            </span>
            {tool && (
              <button
                type="button"
                onClick={() => toggleFavorite(tool.id)}
                className={`dt-icon-button grid h-10 w-10 shrink-0 place-items-center rounded-[5px] border-[1.5px] border-[var(--dt-line)] transition-[transform,box-shadow,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dt-cyan)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                  isFavorite
                    ? 'bg-[var(--dt-coral)] text-[#161816] shadow-[2px_2px_0_var(--dt-line)]'
                    : 'bg-[var(--dt-paper)] text-[var(--dt-ink)] shadow-[2px_2px_0_var(--dt-line)] hover:bg-[var(--dt-acid)] hover:text-[#161816]'
                }`}
                aria-label={isFavorite ? `Remove ${resolvedTitle} from favorites` : `Add ${resolvedTitle} to favorites`}
                aria-pressed={Boolean(isFavorite)}
              >
                <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
          <div className="mt-5 lg:mt-10">
            <h1 className="text-3xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-4xl lg:text-[2.65rem]">
              {resolvedTitle}
            </h1>
            {resolvedDescription && (
              <p className="mt-4 text-xs leading-relaxed text-[var(--dt-muted)]">{resolvedDescription}</p>
            )}
          </div>
          <span className="mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.1em] text-[var(--dt-muted)] lg:absolute lg:bottom-6">
            <i className="h-1.5 w-1.5 rounded-full bg-[var(--dt-acid)] ring-1 ring-[var(--dt-line)]" />
            Local / browser native
          </span>
        </header>

        <div className="dt-workspace-main min-w-0">
          <div className="dt-workspace-strip flex h-10 items-center border-b border-[var(--dt-line)] px-4 text-[9px] uppercase tracking-[0.12em] text-[var(--dt-muted)] sm:px-6">
            <span className="mr-3 h-2 w-2 rounded-full bg-[var(--dt-coral)]" />
            Instrument ready
            <span className="ml-auto hidden sm:inline">Data stays on device</span>
          </div>
          <div className="dt-tool-content min-w-0 p-4 sm:p-6 lg:p-7">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}
