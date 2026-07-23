import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const variants = {
    primary: 'border-[var(--dt-line)] bg-[var(--dt-acid)] text-[#161816] shadow-[3px_3px_0_var(--dt-line)] hover:shadow-[4px_4px_0_var(--dt-line)]',
    secondary: 'border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] shadow-[3px_3px_0_var(--dt-line)] hover:bg-[var(--dt-cyan)] hover:text-[#161816] hover:shadow-[4px_4px_0_var(--dt-line)]',
    ghost: 'border-transparent bg-transparent text-[var(--dt-muted)] hover:border-[var(--dt-line)] hover:bg-[var(--dt-paper)] hover:text-[var(--dt-ink)]',
  }

  return (
    <motion.button
      onClick={onClick}
      className={`dt-button inline-flex items-center justify-center gap-2 rounded-[5px] border-[1.5px] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.03em] transition-[color,background-color,border-color,box-shadow,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dt-cyan)] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
