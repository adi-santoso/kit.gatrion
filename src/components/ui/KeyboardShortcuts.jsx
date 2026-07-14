import { motion, AnimatePresence } from 'framer-motion'
import { X, Command, Search, Moon, Sun, Star, ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function KeyboardShortcuts({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['/', 'Ctrl', 'K'], description: 'Open search', icon: Search },
        { keys: ['?'], description: 'Show shortcuts', icon: Command },
        { keys: ['Esc'], description: 'Close modal', icon: X },
        { keys: ['Alt', '←'], description: 'Go back', icon: ArrowLeft },
      ]
    },
    {
      category: 'Actions',
      items: [
        { keys: ['Ctrl', 'D'], description: 'Toggle dark mode', icon: Moon },
        { keys: ['Ctrl', 'S'], description: 'Add to favorites', icon: Star },
      ]
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Command size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Keyboard Shortcuts
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Quick access to all features
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="space-y-6">
                  {shortcuts.map((section) => (
                    <div key={section.category}>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, idx) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/[0.06] flex items-center justify-center">
                                  <Icon size={16} className="text-slate-600 dark:text-slate-400" />
                                </div>
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {item.description}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {item.keys.map((key, i) => (
                                  <span key={i} className="flex items-center gap-1">
                                    <kbd className="px-2 py-1 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-gray-800 border border-slate-300 dark:border-white/[0.12] rounded shadow-sm">
                                      {key}
                                    </kbd>
                                    {i < item.keys.length - 1 && (
                                      <span className="text-slate-400 dark:text-slate-500 text-xs">+</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/5">
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-gray-800 border border-slate-300 dark:border-white/[0.12] rounded">?</kbd> anytime to view shortcuts
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
