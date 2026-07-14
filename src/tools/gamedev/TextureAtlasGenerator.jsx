import { useState, useRef } from 'react'
import { Upload, Download, Grid3x3, Package, Trash2 } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function TextureAtlasGenerator() {
  const [images, setImages] = useState([])
  const [atlasUrl, setAtlasUrl] = useState(null)
  const [atlasData, setAtlasData] = useState(null)
  const [padding, setPadding] = useState(2)
  const [maxWidth, setMaxWidth] = useState(2048)
  const [powerOfTwo, setPowerOfTwo] = useState(true)
  const canvasRef = useRef(null)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    loadImages(files)
  }

  const loadImages = (files) => {
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
            img: img,
            width: img.width,
            height: img.height
          }])
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const generateAtlas = () => {
    if (images.length === 0) return

    // Sort by height (tallest first) for better packing
    const sorted = [...images].sort((a, b) => b.height - a.height)

    // Simple bin packing algorithm (shelf packing)
    let x = padding
    let y = padding
    let rowHeight = 0
    let atlasWidth = 0
    let atlasHeight = 0

    const positions = []

    sorted.forEach((img) => {
      // Check if need new row
      if (x + img.width + padding > maxWidth) {
        x = padding
        y += rowHeight + padding
        rowHeight = 0
      }

      positions.push({
        name: img.name,
        x,
        y,
        width: img.width,
        height: img.height,
        img: img.img
      })

      x += img.width + padding
      rowHeight = Math.max(rowHeight, img.height)
      atlasWidth = Math.max(atlasWidth, x)
      atlasHeight = Math.max(atlasHeight, y + rowHeight + padding)
    })

    // Round to power of 2 if enabled
    if (powerOfTwo) {
      atlasWidth = nextPowerOfTwo(atlasWidth)
      atlasHeight = nextPowerOfTwo(atlasHeight)
    }

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = atlasWidth
    canvas.height = atlasHeight
    const ctx = canvas.getContext('2d')

    // Fill with transparent
    ctx.clearRect(0, 0, atlasWidth, atlasHeight)

    // Draw all images
    positions.forEach((pos) => {
      ctx.drawImage(pos.img, pos.x, pos.y)
    })

    // Generate output
    const dataUrl = canvas.toDataURL('image/png')
    setAtlasUrl(dataUrl)

    // Generate JSON mapping
    const data = {
      meta: {
        image: 'atlas.png',
        format: 'RGBA8888',
        size: { w: atlasWidth, h: atlasHeight },
        scale: 1
      },
      frames: {}
    }

    positions.forEach((pos) => {
      data.frames[pos.name] = {
        frame: { x: pos.x, y: pos.y, w: pos.width, h: pos.height },
        rotated: false,
        trimmed: false,
        spriteSourceSize: { x: 0, y: 0, w: pos.width, h: pos.height },
        sourceSize: { w: pos.width, h: pos.height }
      }
    })

    setAtlasData(data)
  }

  const nextPowerOfTwo = (n) => {
    return Math.pow(2, Math.ceil(Math.log2(n)))
  }

  const downloadAtlas = () => {
    if (!atlasUrl) return
    const link = document.createElement('a')
    link.href = atlasUrl
    link.download = 'atlas.png'
    link.click()
  }

  const downloadJSON = () => {
    if (!atlasData) return
    const blob = new Blob([JSON.stringify(atlasData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'atlas.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadXML = () => {
    if (!atlasData) return
    
    // Convert to XML format (TexturePacker format)
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += `<TextureAtlas imagePath="atlas.png" width="${atlasData.meta.size.w}" height="${atlasData.meta.size.h}">\n`
    
    Object.entries(atlasData.frames).forEach(([name, frame]) => {
      xml += `  <sprite n="${name}" x="${frame.frame.x}" y="${frame.frame.y}" w="${frame.frame.w}" h="${frame.frame.h}"/>\n`
    })
    
    xml += '</TextureAtlas>'

    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'atlas.xml'
    link.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setImages([])
    setAtlasUrl(null)
    setAtlasData(null)
  }

  return (
    <ToolLayout
      title="Texture Atlas Generator"
      description="Gabungkan banyak image jadi 1 texture atlas + JSON/XML map."
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="atlas-upload"
          />
          <label htmlFor="atlas-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Upload images to pack
            </p>
            <p className="text-sm text-slate-500">Select multiple PNG/JPG files</p>
          </label>
        </div>

        {/* Settings */}
        {images.length > 0 && (
          <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Grid3x3 size={16} />
              Atlas Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Padding: {padding}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={padding}
                  onChange={(e) => setPadding(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Max Width
                </label>
                <select
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 rounded-lg text-sm"
                >
                  <option value="512">512</option>
                  <option value="1024">1024</option>
                  <option value="2048">2048</option>
                  <option value="4096">4096</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 pt-8">
                  <input
                    type="checkbox"
                    checked={powerOfTwo}
                    onChange={(e) => setPowerOfTwo(e.target.checked)}
                    className="rounded"
                  />
                  Power of 2 dimensions
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={generateAtlas}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                <Package size={18} />
                Generate Atlas
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Trash2 size={18} />
                Clear All
              </button>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {images.length} image{images.length > 1 ? 's' : ''} loaded
              </div>
            </div>
          </div>
        )}

        {/* Image List */}
        {images.length > 0 && !atlasUrl && (
          <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Loaded Images
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden"
                >
                  <div className="aspect-square bg-slate-100 dark:bg-gray-900 p-2 flex items-center justify-center">
                    <img
                      src={img.img.src}
                      alt={img.name}
                      className="max-w-full max-h-full object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <div className="p-2 text-xs text-slate-600 dark:text-slate-400 truncate">
                    {img.name}
                  </div>
                  <div className="px-2 pb-2 text-[10px] text-slate-500">
                    {img.width}×{img.height}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generated Atlas */}
        {atlasUrl && atlasData && (
          <>
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Generated Atlas
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={downloadAtlas}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Download size={14} />
                    PNG
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Download size={14} />
                    JSON
                  </button>
                  <button
                    onClick={downloadXML}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Download size={14} />
                    XML
                  </button>
                </div>
              </div>

              <div className="flex justify-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-white/10 overflow-auto">
                <img
                  src={atlasUrl}
                  alt="Texture Atlas"
                  className="max-w-full h-auto border border-slate-300 dark:border-white/20"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                {atlasData.meta.size.w} × {atlasData.meta.size.h} pixels • {Object.keys(atlasData.frames).length} sprites packed
              </div>
            </div>

            {/* JSON Preview */}
            <details className="bg-slate-50 dark:bg-white/5 rounded-xl p-4">
              <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
                Preview JSON Data
              </summary>
              <pre className="mt-3 p-4 bg-white dark:bg-gray-900 rounded-lg text-xs overflow-auto max-h-96 border border-slate-200 dark:border-white/10">
                {JSON.stringify(atlasData, null, 2)}
              </pre>
            </details>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
