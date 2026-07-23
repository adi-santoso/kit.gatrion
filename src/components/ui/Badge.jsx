import { motion } from 'framer-motion'

const variants = {
  popular: {
    color: 'bg-[var(--dt-coral)]',
  },
  new: {
    color: 'bg-[var(--dt-acid)]',
  },
  beta: {
    color: 'bg-[var(--dt-violet)]',
  },
  updated: {
    color: 'bg-[var(--dt-cyan)]',
  }
}

export default function Badge({ variant = 'new', label, showIcon = true, className = '' }) {
  const style = variants[variant]

  if (!style) return null

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`dt-badge inline-flex items-center gap-1.5 rounded-full border border-[var(--dt-line)] bg-[var(--dt-panel)] px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-[var(--dt-ink)] ${className}`}
    >
      {showIcon && <span className={`h-1.5 w-1.5 rounded-full ${style.color}`} aria-hidden="true" />}
      {label || variant.toUpperCase()}
    </motion.span>
  )
}

export function ToolBadge({ tool }) {
  if (!tool.badge) return null

  return <Badge variant={tool.badge.type} label={tool.badge.label} />
}
