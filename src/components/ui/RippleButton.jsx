import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RippleButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  ...props 
}) {
  const [ripples, setRipples] = useState([])

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/30',
    secondary: 'bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-gray-700',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5',
  }

  const handleClick = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    }
    
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
    
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-lg px-4 py-2 font-medium
        transition-all duration-200 
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: 'ripple 0.6s ease-out',
          }}
        />
      ))}
      {children}
    </motion.button>
  )
}
