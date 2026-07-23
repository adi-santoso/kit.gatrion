import { useState, useRef } from 'react'
import { Upload, Copy, Check, Pipette, Image as ImageIcon } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { MAX_CANVAS_DIMENSION, readImageFile } from '../../utils/imageResourceValidation'

export default function ColorPicker() {
  const [image, setImage] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [palette, setPalette] = useState([])
  const [copiedColor, setCopiedColor] = useState(null)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const imgRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { dataUrl } = await readImageFile(file, { maxDimension: MAX_CANVAS_DIMENSION })
      setImage(dataUrl)
      setPalette([])
      setSelectedColor(null)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleImageLoad = (e) => {
    imgRef.current = e.target
    extractPalette(e.target)
  }

  const extractPalette = (img) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const colorMap = {}

    // Sample every 10 pixels untuk performa
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      if (a < 128) continue // Skip transparent

      // Round ke 32 untuk grouping
      const rr = Math.round(r / 32) * 32
      const gg = Math.round(g / 32) * 32
      const bb = Math.round(b / 32) * 32
      const key = `${rr},${gg},${bb}`

      colorMap[key] = (colorMap[key] || 0) + 1
    }

    // Sort by frequency, ambil top 8
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([rgb]) => {
        const [r, g, b] = rgb.split(',').map(Number)
        return { r, g, b }
      })

    setPalette(sortedColors)
  }

  const handleCanvasClick = (e) => {
    if (!imgRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = imgRef.current

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    const rect = e.target.getBoundingClientRect()
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    const x = Math.floor((e.clientX - rect.left) * scaleX)
    const y = Math.floor((e.clientY - rect.top) * scaleY)

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const color = {
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
    }

    setSelectedColor(color)
  }

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
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
      l: Math.round(l * 100),
    }
  }

  const copyColor = (format, color) => {
    let text = ''
    if (format === 'hex') {
      text = rgbToHex(color.r, color.g, color.b)
    } else if (format === 'rgb') {
      text = `rgb(${color.r}, ${color.g}, ${color.b})`
    } else if (format === 'hsl') {
      const hsl = rgbToHsl(color.r, color.g, color.b)
      text = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }

    navigator.clipboard.writeText(text)
    setCopiedColor(format)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <ToolLayout title="Color Picker from Image" description="Extract color palette dan pick warna dari gambar">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Upload Image</h3>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Upload size={18} />Choose Image</button>
          </div>

          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4"><Pipette size={16} className="text-indigo-500" /><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Click to Pick Color</h3></div>
              <div className="cursor-crosshair bg-slate-50 dark:bg-slate-800 rounded-lg p-2"><img ref={canvasRef} src={image} alt="Pick color" onLoad={handleImageLoad} onClick={handleCanvasClick} className="w-full rounded" /></div>
            </div>
          )}

          {palette.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Dominant Colors</h3>
              <div className="grid grid-cols-4 gap-3">{palette.map((color, idx) => {
                const hex = rgbToHex(color.r, color.g, color.b)
                return (<button key={idx} onClick={() => setSelectedColor(color)} className="group relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors" style={{ backgroundColor: hex }}><div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"><span className="text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">{hex}</span></div></button>)
              })}</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {selectedColor ? (
            <>
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Selected Color</h3>
                <div className="aspect-video rounded-lg mb-4" style={{ backgroundColor: rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) }}></div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2"><span className="text-sm text-slate-600 dark:text-slate-400">HEX</span><div className="flex items-center gap-2"><code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">{rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)}</code><button onClick={() => copyColor('hex', selectedColor)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">{copiedColor === 'hex' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}</button></div></div>
                  
                  <div className="flex items-center justify-between gap-2"><span className="text-sm text-slate-600 dark:text-slate-400">RGB</span><div className="flex items-center gap-2"><code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">rgb({selectedColor.r}, {selectedColor.g}, {selectedColor.b})</code><button onClick={() => copyColor('rgb', selectedColor)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">{copiedColor === 'rgb' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}</button></div></div>
                  
                  <div className="flex items-center justify-between gap-2"><span className="text-sm text-slate-600 dark:text-slate-400">HSL</span><div className="flex items-center gap-2"><code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">hsl({rgbToHsl(selectedColor.r, selectedColor.g, selectedColor.b).h}, {rgbToHsl(selectedColor.r, selectedColor.g, selectedColor.b).s}%, {rgbToHsl(selectedColor.r, selectedColor.g, selectedColor.b).l}%)</code><button onClick={() => copyColor('hsl', selectedColor)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">{copiedColor === 'hsl' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}</button></div></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><ImageIcon size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Tips:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• Upload gambar untuk extract palette</li><li>• Click gambar untuk pick warna spesifik</li><li>• 8 warna dominan otomatis terdeteksi</li><li>• Copy HEX, RGB, atau HSL format</li></ul></div></div></div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
