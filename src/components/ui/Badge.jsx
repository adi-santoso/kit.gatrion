import { motion } from 'framer-motion'

const variants = {
  popular: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20 dark:border-purple-500/30',
    icon: '🔥'
  },
  new: {
    bg: 'bg-green-500/10 dark:bg-green-500/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500/20 dark:border-green-500/30',
    icon: '✨'
  },
  beta: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20 dark:border-blue-500/30',
    icon: '🧪'
  },
  updated: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/20 dark:border-orange-500/30',
    icon: '⚡'
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
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border
        ${style.bg} ${style.text} ${style.border}
        ${className}
      `}
    >
      {showIcon && <span className="text-[10px]">{style.icon}</span>}
      {label || variant.toUpperCase()}
    </motion.span>
  )
}

export function ToolBadge({ tool }) {
  if (!tool.badge) return null

  return <Badge variant={tool.badge.type} label={tool.badge.label} />
}
