import { useState } from 'react'
import { Upload, Copy, Check, Download, Palette } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { MAX_CANVAS_DIMENSION, readImageFile } from '../../utils/imageResourceValidation'

export default function PixelArtPalette() {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [palette, setPalette] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [sortBy, setSortBy] = useState('frequency') // frequency, hue, brightness

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const { dataUrl, image } = await readImageFile(file, { maxDimension: MAX_CANVAS_DIMENSION })
      setImage(image)
      setImageUrl(dataUrl)
      extractPalette(image)
    } catch (error) {
      alert(error.message)
    }
  }

  const extractPalette = (img) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const colorMap = new Map()

    // Extract all unique colors
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      // Skip fully transparent pixels
      if (a === 0) continue

      const hex = rgbToHex(r, g, b)
      const count = colorMap.get(hex) || 0
      colorMap.set(hex, count + 1)
    }

    // Convert to array with color data
    const colors = Array.from(colorMap.entries()).map(([hex, count]) => {
      const rgb = hexToRgb(hex)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      return {
        hex,
        rgb,
        hsl,
        count,
        percentage: ((count / (pixels.length / 4)) * 100).toFixed(2)
      }
    })

    setPalette(colors)
  }

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
  }

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
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
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

  const sortPalette = (colors) => {
    const sorted = [...colors]
    if (sortBy === 'frequency') {
      sorted.sort((a, b) => b.count - a.count)
    } else if (sortBy === 'hue') {
      sorted.sort((a, b) => a.hsl.h - b.hsl.h)
    } else if (sortBy === 'brightness') {
      sorted.sort((a, b) => b.hsl.l - a.hsl.l)
    }
    return sorted
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const exportPalette = (format) => {
    let content = ''
    const sorted = sortPalette(palette)

    if (format === 'json') {
      content = JSON.stringify(sorted.map(c => ({
        hex: c.hex,
        rgb: c.rgb,
        hsl: c.hsl,
        percentage: c.percentage
      })), null, 2)
    } else if (format === 'css') {
      content = ':root {\n' + sorted.map((c, i) => 
        `  --color-${i + 1}: ${c.hex};`
      ).join('\n') + '\n}'
    } else if (format === 'ase') {
      // Adobe Swatch Exchange format (simplified text representation)
      content = 'Adobe Swatch Exchange\n\n' + sorted.map((c, i) =>
        `Color ${i + 1}\nRGB: ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}\nHex: ${c.hex}`
      ).join('\n\n')
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `palette-${Date.now()}.${format}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const sortedPalette = palette.length > 0 ? sortPalette(palette) : []

  return (
    <ToolLayout
      title="Pixel Art Color Palette Extractor"
      description="Extract semua unique colors dari pixel art dengan frequency count."
    >
      <div className="space-y-6">
        {/* Upload Section */}
        {!image ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="pixel-upload"
            />
            <label htmlFor="pixel-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Click to upload pixel art
              </p>
              <p className="text-sm text-slate-500">PNG recommended for exact colors</p>
            </label>
          </div>
        ) : (
          <>
            {/* Image Preview */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Original Image
              </h3>
              <div className="flex justify-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-white/10">
                <img
                  src={imageUrl}
                  alt="Pixel art"
                  className="max-w-full h-auto"
                  style={{ imageRendering: 'pixelated', maxHeight: '300px' }}
                />
              </div>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-center">
                {image.width} × {image.height} pixels • {palette.length} unique colors
              </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-slate-300"
                  >
                    <option value="frequency">Frequency</option>
                    <option value="hue">Hue</option>
                    <option value="brightness">Brightness</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => exportPalette('json')}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Export JSON
                  </button>
                  <button
                    onClick={() => exportPalette('css')}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Export CSS
                  </button>
                  <button
                    onClick={() => {
                      setImage(null)
                      setImageUrl(null)
                      setPalette([])
                    }}
                    className="px-3 py-1.5 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 text-sm rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Palette size={16} />
                Color Palette ({sortedPalette.length} colors)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {sortedPalette.map((color, index) => (
                  <div
                    key={color.hex}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden"
                  >
                    {/* Color swatch */}
                    <div
                      className="h-20 w-full"
                      style={{ backgroundColor: color.hex, imageRendering: 'pixelated' }}
                    />
                    
                    {/* Color info */}
                    <div className="p-3 space-y-2">
                      <button
                        onClick={() => copyToClipboard(color.hex, index)}
                        className="w-full flex items-center justify-between text-xs font-mono font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-500 transition-colors"
                      >
                        <span>{color.hex}</span>
                        {copiedIndex === index ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                      
                      <div className="text-[10px] text-slate-500 space-y-0.5">
                        <div>RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</div>
                        <div>HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%</div>
                        <div className="font-semibold text-slate-600 dark:text-slate-400">
                          {color.percentage}% ({color.count}px)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
