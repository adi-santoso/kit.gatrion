import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function GradientGenerator() {
  const [type, setType] = useState('linear')
  const [angle, setAngle] = useState(135)
  const [colors, setColors] = useState([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ])

  const generateCSS = () => {
    const colorStops = colors.map(c => `${c.color} ${c.position}%`).join(', ')
    if (type === 'linear') {
      return `background: linear-gradient(${angle}deg, ${colorStops});`
    }
    return `background: radial-gradient(circle, ${colorStops});`
  }

  const addColor = () => {
    setColors([...colors, { color: '#ffffff', position: 50 }])
  }

  const updateColor = (index, field, value) => {
    const newColors = [...colors]
    newColors[index][field] = value
    setColors(newColors)
  }

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const randomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setColors([
      { color: randomColor(), position: 0 },
      { color: randomColor(), position: 100 },
    ])
  }

  return (
    <ToolLayout
      category="css"
      toolName="CSS Gradient Generator"
      description="Build dan preview gradient CSS visual."
    >
      {/* Actions */}
      <div className="flex gap-2 mb-6">
        <Button variant="secondary" onClick={randomGradient}>
          Random
        </Button>
        <div className="ml-auto">
          <CopyButton text={generateCSS()} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Gradient Type
            </label>
            <div className="flex gap-2">
              <Button
                variant={type === 'linear' ? 'primary' : 'secondary'}
                onClick={() => setType('linear')}
              >
                Linear
              </Button>
              <Button
                variant={type === 'radial' ? 'primary' : 'secondary'}
                onClick={() => setType('radial')}
              >
                Radial
              </Button>
            </div>
          </div>

          {/* Angle (Linear only) */}
          {type === 'linear' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Direction: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Color Stops */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Color Stops
            </label>
            <div className="space-y-2">
              {colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={c.color}
                    onChange={(e) => updateColor(i, 'color', e.target.value)}
                    className="w-12 h-10 rounded border border-slate-200 dark:border-white/[0.06] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={c.color}
                    onChange={(e) => updateColor(i, 'color', e.target.value)}
                    className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={c.position}
                    onChange={(e) => updateColor(i, 'position', parseInt(e.target.value))}
                    className="w-16 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-2 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
                  />
                  <span className="text-slate-600 dark:text-slate-400 text-sm">%</span>
                  {colors.length > 2 && (
                    <button
                      onClick={() => removeColor(i)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button variant="secondary" onClick={addColor} className="mt-2 w-full">
              + Add Color Stop
            </Button>
          </div>

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
          <div
            className="w-full h-64 rounded-xl border border-slate-200 dark:border-white/[0.06]"
            style={{ background: generateCSS().replace('background: ', '').replace(';', '') }}
          />
        </div>
      </div>
    </ToolLayout>
  )
}
