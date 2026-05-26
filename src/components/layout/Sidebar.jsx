import { Link, useLocation } from 'react-router-dom'
import { Home, Braces, Type, Lock, Palette, Code2, Wrench, Star, Info, X } from 'lucide-react'
import { categories } from '../../data/tools'
import { useSidebarStore } from '../../store/sidebarStore'

export default function Sidebar() {
  const location = useLocation()
  const { isOpen, closeSidebar } = useSidebarStore()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-white/[0.06] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="text-blue-500 dark:text-blue-400 font-mono text-xl">&lt;/&gt;</div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">DevToolkit</span>
        </div>
        <button
          onClick={closeSidebar}
          className="lg:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Dashboard */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
            isActive('/')
              ? 'bg-blue-500/10 border-l-2 border-blue-500 text-blue-500 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <Home size={16} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        {/* Categories */}
        <div className="mt-6 px-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Kategori
          </p>
        </div>

        {categories.map((cat) => {
          const Icon = {
            Braces,
            Type,
            Lock,
            Palette,
            Code2,
            Wrench,
          }[cat.icon]

          return (
            <Link
              key={cat.id}
              to={`/${cat.id}`}
              className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
                location.pathname.startsWith(`/${cat.id}`)
                  ? 'bg-blue-500/10 border-l-2 border-blue-500 text-blue-500 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{cat.label}</span>
            </Link>
          )
        })}

        {/* Favorites & About */}
        <div className="mt-6 border-t border-slate-200 dark:border-white/[0.06] pt-4">
          <Link
            to="/favorites"
            className="flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
          >
            <Star size={16} />
            <span className="text-sm font-medium">Favorites</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
          >
            <Info size={16} />
            <span className="text-sm font-medium">About</span>
          </Link>
        </div>
      </nav>

      {/* App Info Card */}
      <div className="p-4 border-t border-slate-200 dark:border-white/[0.06]">
        <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900 dark:text-slate-300">DevToolkit v0.1.0</span>
            <span>🛡️</span>
          </div>
          <p>100% Client-side</p>
          <p>No data leaves your browser</p>
          <a
            href="https://gatrion.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors mt-2"
          >
            <span>←</span>
            <span>gatrion.my.id</span>
          </a>
        </div>
      </div>
    </aside>
    </>
  )
}
