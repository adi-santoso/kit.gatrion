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
  success: 'bg-green-500/90 text-white border-green-600',
  error: 'bg-red-500/90 text-white border-red-600',
  warning: 'bg-yellow-500/90 text-white border-yellow-600',
  info: 'bg-blue-500/90 text-white border-blue-600',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
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
              className={`${style} rounded-lg border shadow-lg backdrop-blur-sm p-4 flex items-start gap-3 pointer-events-auto`}
            >
              <Icon size={20} className="flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Close"
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
