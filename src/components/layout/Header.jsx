import { Search, Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useSearchStore } from '../../store/searchStore'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { openSearch } = useSearchStore()

  return (
    <header className="sticky top-0 h-14 bg-gray-900/80 backdrop-blur-sm border-b border-white/[0.06] z-10">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <button
            onClick={openSearch}
            className="w-full relative flex items-center"
          >
            <Search className="absolute left-3 text-slate-400" size={16} />
            <div className="w-full bg-gray-800 border border-white/[0.06] rounded-lg pl-10 pr-16 py-2 text-sm text-slate-500 text-left hover:border-white/20 transition-colors">
              Search tools...
            </div>
            <kbd className="absolute right-3 px-2 py-0.5 bg-gray-700 border border-white/[0.06] rounded text-xs text-slate-400 font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-lg bg-gray-800 border border-white/[0.06] text-slate-400 hover:text-slate-300 hover:border-white/20 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
