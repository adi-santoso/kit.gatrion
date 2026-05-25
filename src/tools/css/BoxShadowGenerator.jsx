import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function BoxShadowGenerator() {
  const [shadow, setShadow] = useState({
    x: 0,
    y: 4,
    blur: 6,
    spread: 0,
    color: '#000000',
    opacity: 25,
    inset: false,
  })

  const generateCSS = () => {
    const { x, y, blur, spread, color, opacity, inset } = shadow
    const alpha = (opacity / 100).toFixed(2)
    const rgb = color.match(/\w\w/g).map(x => parseInt(x, 16))
    const colorWithAlpha = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    return `box-shadow: ${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${colorWithAlpha};`
  }

  const updateShadow = (key, value) => {
    setShadow({ ...shadow, [key]: value })
  }

  return (
    <ToolLayout
      category="css"
      toolName="Box Shadow Generator"
      description="Visual builder CSS box-shadow."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* X Offset */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Horizontal Offset: {shadow.x}px
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={shadow.x}
              onChange={(e) => updateShadow('x', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Y Offset */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Vertical Offset: {shadow.y}px
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={shadow.y}
              onChange={(e) => updateShadow('y', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Blur */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Blur Radius: {shadow.blur}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={shadow.blur}
              onChange={(e) => updateShadow('blur', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Spread */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Spread Radius: {shadow.spread}px
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={shadow.spread}
              onChange={(e) => updateShadow('spread', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Color & Opacity */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Color
              </label>
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => updateShadow('color', e.target.value)}
                className="w-full h-10 rounded border border-slate-200 dark:border-white/[0.06] cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Opacity: {shadow.opacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={shadow.opacity}
                onChange={(e) => updateShadow('opacity', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Inset */}
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={shadow.inset}
              onChange={(e) => updateShadow('inset', e.target.checked)}
              className="w-4 h-4"
            />
            Inset
          </label>

          {/* CSS Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CSS Output</label>
              <CopyButton text={generateCSS()} />
            </div>
            <pre className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 font-mono overflow-x-auto">
              {generateCSS()}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Preview
          </label>
          <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center">
            <div
              className="w-48 h-48 bg-gray-900 rounded-xl"
              style={{ boxShadow: generateCSS().replace('box-shadow: ', '').replace(';', '') }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
