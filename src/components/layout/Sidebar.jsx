import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Braces, Type, Lock, Palette, Code2, Wrench, Star, Info, X, ImageIcon, Gamepad2 } from 'lucide-react'
import { categories, tools } from '../../data/tools'
import { useSidebarStore } from '../../store/sidebarStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useRecentStore } from '../../store/recentStore'

const icons = { Braces, Type, Lock, Palette, Code2, ImageIcon, Gamepad2, Wrench }

export default function Sidebar() {
  const location = useLocation()
  const { isOpen, closeSidebar } = useSidebarStore()
  const favoriteCount = useFavoritesStore((state) => state.favorites.length)
  const recentCount = useRecentStore((state) => state.recents.length)

  useEffect(() => {
    if (!isOpen || window.innerWidth >= 1024) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) closeSidebar()
  }

  const navClass = (active) => `group flex items-center gap-2.5 rounded-[3px] px-2.5 py-2 text-xs transition-[background-color,color,transform] hover:translate-x-0.5 ${
    active ? 'bg-[var(--dt-acid)] font-extrabold text-[#161816]' : 'text-[#f4f1e8]/70 hover:bg-white/10 hover:text-[#f4f1e8]'
  }`

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity lg:hidden ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r-2 border-[#232621] bg-[#161816] text-[#f4f1e8] transition-transform duration-200 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-[105%]'}`}>
        <div className="flex h-[72px] items-center gap-3 border-b border-white/20 px-[18px]">
          <Link to="/" onClick={handleLinkClick} className="flex min-w-0 items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 -rotate-6 place-items-center rounded-full bg-[var(--dt-acid)] font-mono text-xs font-medium text-[#161816]">&lt;/&gt;</div>
            <div className="min-w-0"><strong className="block text-sm tracking-[-0.03em]">DevToolkit</strong><small className="block truncate font-mono text-[8px] tracking-[0.08em] opacity-50">LOCAL UTILITY SYSTEM</small></div>
          </Link>
          <button type="button" onClick={closeSidebar} className="ml-auto grid h-8 w-8 place-items-center rounded-[3px] hover:bg-white/10 lg:hidden" aria-label="Close menu"><X size={18} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">Workspace</p>
          <div className="space-y-0.5">
            <Link to="/" onClick={handleLinkClick} className={navClass(location.pathname === '/')}><Home size={16} /><span>Overview</span><span className="ml-auto font-mono text-[9px] opacity-55">{tools.length}</span></Link>
            <Link to="/favorites" onClick={handleLinkClick} className={navClass(location.pathname === '/favorites')}><Star size={16} /><span>Favorites</span><span className="ml-auto font-mono text-[9px] opacity-55">{favoriteCount}</span></Link>
            <Link to="/#recent" onClick={handleLinkClick} className={navClass(false)}><span className="w-4 text-center font-mono">↺</span><span>Recent</span><span className="ml-auto font-mono text-[9px] opacity-55">{recentCount}</span></Link>
          </div>

          <p className="mb-2 mt-6 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">Collections</p>
          <div className="space-y-0.5">
            {categories.map((category) => {
              const Icon = icons[category.icon] || Wrench
              const count = tools.filter((tool) => tool.category === category.id).length
              return <Link key={category.id} to={`/${category.id}`} onClick={handleLinkClick} className={navClass(location.pathname.startsWith(`/${category.id}`))}><Icon size={16} /><span>{category.label}</span><span className="ml-auto font-mono text-[9px] opacity-55">{String(count).padStart(2, '0')}</span></Link>
            })}
          </div>

          <div className="mt-6 border-t border-white/15 pt-4">
            <Link to="/about" onClick={handleLinkClick} className={navClass(location.pathname === '/about')}><Info size={16} /><span>About</span></Link>
          </div>
        </nav>

        <div className="p-3.5"><div className="rounded-[3px] bg-[var(--dt-cyan)] p-3 text-[10px] leading-relaxed text-[#161816]"><b className="mb-1 block text-[11px]">● PRIVATE BY DEFAULT</b>Files stay inside this browser. No uploads. No tracking.</div></div>
      </aside>
    </>
  )
}
