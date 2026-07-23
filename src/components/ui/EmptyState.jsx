import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function EmptyState({
  icon = 'Inbox',
  title = 'Nothing here yet',
  description = '',
  action = null,
  className = ''
}) {
  const Icon = Icons[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`dt-empty-state flex flex-col items-center justify-center px-4 py-16 text-center text-[var(--dt-ink)] ${className}`}
    >
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full border-2 border-[var(--dt-line)] bg-[var(--dt-acid)] text-[#161816] shadow-[3px_3px_0_var(--dt-line)]">
        <Icon size={30} aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-lg font-extrabold tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[var(--dt-muted)]">
          {description}
        </p>
      )}

      {action && action}
    </motion.div>
  )
}
