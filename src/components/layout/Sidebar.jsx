import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Braces, Type, Lock, Palette, Code2, Wrench, Star, Info, X, ImageIcon, Gamepad2, FolderOpen, Film, Package, Grid3x3 } from 'lucide-react'
import { categories } from '../../data/tools'
import { useSidebarStore } from '../../store/sidebarStore'

const categoryColors = {
  json: { icon: 'text-blue-500', bg: 'bg-blue-500/10' },
  text: { icon: 'text-green-500', bg: 'bg-green-500/10' },
  crypto: { icon: 'text-violet-500', bg: 'bg-violet-500/10' },
  css: { icon: 'text-pink-500', bg: 'bg-pink-500/10' },
  formatter: { icon: 'text-orange-500', bg: 'bg-orange-500/10' },
  misc: { icon: 'text-slate-500', bg: 'bg-slate-500/10' },
  image: { icon: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  gamedev: { icon: 'text-purple-500', bg: 'bg-purple-500/10' },
}


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
      <motion.aside
        drag={false}
        dragConstraints={{ left: -256, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset }) => {
          if (offset.x < -100) closeSidebar()
        }}
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-white/[0.06] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-mono text-sm shadow-sm">
            &lt;/&gt;
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">DevToolkit</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('Close button clicked')
            closeSidebar()
          }}
          onTouchEnd={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('Touch end on close button')
            closeSidebar()
          }}
          className="lg:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 relative z-10"
          style={{ touchAction: 'none', pointerEvents: 'auto' }}
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
            ImageIcon,
            Gamepad2,
            FolderOpen,
            Film,
            Package,
            Grid3x3,
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
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${categoryColors[cat.id]?.bg || 'bg-slate-100'}`}>
                <Icon size={14} className={categoryColors[cat.id]?.icon || 'text-slate-500'} />
              </div>
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
      <div className="p-3 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
        <div className="text-xs text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="font-semibold">DevToolkit</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">v0.4.0</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            🛡️ 100% Private • No data sent
          </p>
          <a
            href="https://gatrion.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-medium"
          >
            Built by gatrion →
          </a>
        </div>
      </div>
    </motion.aside>
    </>
  )
}
