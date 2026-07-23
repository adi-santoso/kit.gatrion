import { motion, AnimatePresence } from 'framer-motion'
import { X, Command, Search } from 'lucide-react'
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
        { keys: ['Ctrl / Cmd', 'K'], description: 'Open search', icon: Search },
        { keys: ['?'], description: 'Show shortcuts', icon: Command },
        { keys: ['Esc'], description: 'Close modal', icon: X },
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
            className="dt-overlay fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose()
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-dialog-title"
              aria-describedby="shortcuts-dialog-description"
              className="dt-dialog max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-[var(--dt-radius)] border-2 border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] shadow-[var(--dt-shadow)]"
            >
              {/* Header */}
              <div className="dt-dialog-header flex items-center justify-between border-b-2 border-[var(--dt-line)] p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--dt-acid)] text-[#161816]">
                    <Command size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="shortcuts-dialog-title" className="text-xl font-extrabold tracking-tight">
                      Keyboard Shortcuts
                    </h2>
                    <p id="shortcuts-dialog-description" className="text-sm text-[var(--dt-muted)]">
                      Quick access to all features
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="dt-icon-button grid h-9 w-9 place-items-center rounded-[var(--dt-radius)] border border-[var(--dt-line)] bg-[var(--dt-panel)] transition-transform hover:-translate-y-0.5"
                  aria-label="Close keyboard shortcuts"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="space-y-6">
                  {shortcuts.map((section) => (
                    <div key={section.category}>
                      <h3 className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--dt-muted)]">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, idx) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={idx}
                              className="dt-shortcut-row flex items-center justify-between gap-4 rounded-[var(--dt-radius)] border border-[var(--dt-line)] bg-[var(--dt-paper)] p-3"
                            >
                              <div className="min-w-0 flex items-center gap-3">
                                <div className="grid h-8 w-8 place-items-center rounded-full bg-[var(--dt-ink)] text-[var(--dt-paper)]">
                                  <Icon size={16} aria-hidden="true" />
                                </div>
                                <span className="text-sm font-medium">
                                  {item.description}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {item.keys.map((key, i) => (
                                  <span key={i} className="flex items-center gap-1">
                                    <kbd className="rounded-[3px] border border-[var(--dt-line)] bg-[var(--dt-panel)] px-2 py-1 font-mono text-[10px] font-medium shadow-[2px_2px_0_var(--dt-line)]">
                                      {key}
                                    </kbd>
                                    {i < item.keys.length - 1 && (
                                      <span className="text-xs text-[var(--dt-muted)]">+</span>
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
              <div className="dt-dialog-footer border-t-2 border-[var(--dt-line)] bg-[var(--dt-paper)] p-4">
                <p className="text-center font-mono text-[10px] uppercase tracking-wider text-[var(--dt-muted)]">
                  Press <kbd className="rounded-[3px] border border-[var(--dt-line)] bg-[var(--dt-panel)] px-1.5 py-0.5">?</kbd> anytime to view shortcuts
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
