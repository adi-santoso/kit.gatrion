import { Search, Sun, Moon, Menu } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useSearchStore } from '../../store/searchStore'
import { useSidebarStore } from '../../store/sidebarStore'
import { tools } from '../../data/tools'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const openSearch = useSearchStore((state) => state.openSearch)
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b-2 border-[var(--dt-line)] bg-[color-mix(in_srgb,var(--dt-paper)_91%,transparent)] px-3 backdrop-blur-xl sm:px-5 lg:px-7">
      <button type="button" onClick={toggleSidebar} className="grid h-10 w-10 shrink-0 place-items-center rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] shadow-[2px_2px_0_var(--dt-line)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden" aria-label="Open navigation"><Menu size={19} /></button>
      <span className="hidden text-sm font-extrabold sm:block lg:hidden">DT/</span>
      <button type="button" onClick={openSearch} className="flex h-10 min-w-0 max-w-[680px] flex-1 items-center gap-2.5 rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] px-3 text-left shadow-[3px_3px_0_var(--dt-line)] transition-transform hover:-translate-y-0.5">
        <Search size={16} className="shrink-0 text-[var(--dt-muted)]" />
        <span className="min-w-0 flex-1 truncate text-xs text-[var(--dt-muted)]">Find a tool, action, or format...</span>
        <kbd className="hidden rounded-[3px] border border-[var(--dt-muted)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--dt-muted)] sm:block">CTRL K</kbd>
      </button>
      <div className="ml-auto hidden items-center gap-2 whitespace-nowrap font-mono text-[10px] text-[var(--dt-muted)] md:flex"><span className="h-2 w-2 rounded-full border border-[var(--dt-line)] bg-green-500 shadow-[0_0_0_3px_rgb(34_197_94_/_0.18)]" />{tools.length} tools ready</div>
      <button type="button" onClick={toggleTheme} className="grid h-10 w-10 shrink-0 place-items-center rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] shadow-[2px_2px_0_var(--dt-line)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
    </header>
  )
}
