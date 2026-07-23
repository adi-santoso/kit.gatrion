import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToastStore } from '../../store/toastStore'

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef(null)
  const addToast = useToastStore((state) => state.addToast)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(text ?? ''))
      setCopied(true)
      addToast({ type: 'success', message: 'Copied to clipboard!' })
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      addToast({ type: 'error', message: 'Failed to copy' })
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      className={`dt-copy-button grid h-10 w-10 place-items-center rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] text-[var(--dt-ink)] shadow-[2px_2px_0_var(--dt-line)] transition-[color,background-color,box-shadow] hover:bg-[var(--dt-cyan)] hover:text-[#161816] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dt-cyan)] ${className}`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? <Check size={16} className="text-[#161816]" /> : <Copy size={16} />}
    </motion.button>
  )
}
