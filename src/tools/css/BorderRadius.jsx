import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function BorderRadius() {
  const [radius, setRadius] = useState({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  })

  const generateCSS = () => {
    const { topLeft, topRight, bottomRight, bottomLeft } = radius
    return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`
  }

  const updateRadius = (corner, value) => {
    setRadius({ ...radius, [corner]: value })
  }

  const setAll = (value) => {
    setRadius({
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value,
    })
  }

  return (
    <ToolLayout
      category="css"
      toolName="Border Radius Preview"
      description="Slider visual preview border-radius."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* All Corners */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              All Corners
            </label>
            <input
              type="range"
              min="0"
              max="100"
              onChange={(e) => setAll(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Individual Corners */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Top Left: {radius.topLeft}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius.topLeft}
              onChange={(e) => updateRadius('topLeft', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Top Right: {radius.topRight}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius.topRight}
              onChange={(e) => updateRadius('topRight', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bottom Right: {radius.bottomRight}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius.bottomRight}
              onChange={(e) => updateRadius('bottomRight', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bottom Left: {radius.bottomLeft}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius.bottomLeft}
              onChange={(e) => updateRadius('bottomLeft', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* CSS Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">CSS Output</label>
              <CopyButton text={generateCSS()} />
            </div>
            <pre className="bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-sm text-slate-300 font-mono overflow-x-auto">
              {generateCSS()}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Preview
          </label>
          <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center">
            <div
              className="w-48 h-48 bg-blue-500"
              style={{
                borderTopLeftRadius: `${radius.topLeft}px`,
                borderTopRightRadius: `${radius.topRight}px`,
                borderBottomRightRadius: `${radius.bottomRight}px`,
                borderBottomLeftRadius: `${radius.bottomLeft}px`,
              }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
