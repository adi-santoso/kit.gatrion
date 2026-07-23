import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const styles = {
  success: 'text-[var(--dt-ink)] [&>svg]:text-green-600',
  error: 'text-[var(--dt-ink)] [&>svg]:text-[var(--dt-coral)]',
  warning: 'text-[var(--dt-ink)] [&>svg]:text-amber-600',
  info: 'text-[var(--dt-ink)] [&>svg]:text-cyan-600',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="dt-toast-region pointer-events-none fixed bottom-4 right-4 z-[110] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite" aria-relevant="additions">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          const style = styles[toast.type]

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role={toast.type === 'error' ? 'alert' : 'status'}
              className={`dt-toast pointer-events-auto flex items-start gap-3 rounded-[var(--dt-radius)] border-2 border-[var(--dt-line)] bg-[var(--dt-panel)] p-4 shadow-[3px_3px_0_var(--dt-line)] ${style}`}
            >
              <Icon size={20} className="flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                type="button"
                className="flex-shrink-0 transition-opacity hover:opacity-60"
                aria-label="Dismiss notification"
              >
                <X size={18} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
