import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import CopyButton from '../../components/ui/CopyButton'

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6')

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgb = hexToRgb(hex)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  return (
    <ToolLayout
      category="css"
      toolName="Color Converter"
      description="HEX ↔ RGB ↔ HSL ↔ HSB."
    >
      {/* Color Picker */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Pick a Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-24 h-24 rounded-lg border border-slate-200 dark:border-white/[0.06] cursor-pointer"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Conversions */}
      <div className="space-y-3">
        {/* HEX */}
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-16">HEX</span>
          <div className="flex-1 font-mono text-sm text-slate-600 dark:text-slate-400">{hex}</div>
          <CopyButton text={hex} />
        </div>

        {/* RGB */}
        {rgb && (
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-16">RGB</span>
            <div className="flex-1 font-mono text-sm text-slate-600 dark:text-slate-400">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
            <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
          </div>
        )}

        {/* HSL */}
        {hsl && (
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-16">HSL</span>
            <div className="flex-1 font-mono text-sm text-slate-600 dark:text-slate-400">
              hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
            </div>
            <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
