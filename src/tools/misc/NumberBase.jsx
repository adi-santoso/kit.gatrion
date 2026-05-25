import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function NumberBase() {
  const [decimal, setDecimal] = useState('')

  const convert = (dec) => {
    const num = parseInt(dec)
    if (isNaN(num)) return { binary: '', octal: '', hex: '' }
    
    return {
      binary: num.toString(2),
      octal: num.toString(8),
      hex: num.toString(16).toUpperCase(),
    }
  }

  const conversions = convert(decimal)

  const handleInputChange = (base, value) => {
    try {
      const num = parseInt(value, base)
      if (!isNaN(num)) {
        setDecimal(num.toString())
      }
    } catch (err) {
      // ignore
    }
  }

  return (
    <ToolLayout
      category="misc"
      toolName="Number Base Converter"
      description="Binary, Octal, Decimal, Hex."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Decimal (Base 10)
          </label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="Enter decimal number..."
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Binary (Base 2)
          </label>
          <input
            type="text"
            value={conversions.binary}
            onChange={(e) => handleInputChange(2, e.target.value)}
            placeholder="Binary..."
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Octal (Base 8)
          </label>
          <input
            type="text"
            value={conversions.octal}
            onChange={(e) => handleInputChange(8, e.target.value)}
            placeholder="Octal..."
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Hexadecimal (Base 16)
          </label>
          <input
            type="text"
            value={conversions.hex}
            onChange={(e) => handleInputChange(16, e.target.value)}
            placeholder="Hex..."
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
