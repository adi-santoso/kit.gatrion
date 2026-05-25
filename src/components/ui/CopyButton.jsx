import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg bg-gray-800 border border-white/[0.06] text-slate-400 hover:text-slate-300 hover:border-white/20 transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
    </button>
  )
}
