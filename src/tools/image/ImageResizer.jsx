import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, Maximize2 } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function ImageResizer() {
  const [image, setImage] = useState(null)
  const [resizedImage, setResizedImage] = useState(null)
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })
  const [newWidth, setNewWidth] = useState(800)
  const [newHeight, setNewHeight] = useState(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [mode, setMode] = useState('resize')
  const fileInputRef = useRef(null)

  const presets = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Portrait', width: 1080, height: 1350 },
    { name: 'Facebook Cover', width: 820, height: 312 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'HD 720p', width: 1280, height: 720 },
    { name: 'Full HD 1080p', width: 1920, height: 1080 },
    { name: 'Avatar', width: 256, height: 256 },
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(event.target.result)
        setOriginalSize({ width: img.width, height: img.height })
        setNewWidth(img.width)
        setNewHeight(img.height)
        setResizedImage(null)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (width) => {
    setNewWidth(width)
    if (maintainAspect && originalSize.width > 0) {
      const ratio = originalSize.height / originalSize.width
      setNewHeight(Math.round(width * ratio))
    }
  }

  const handleHeightChange = (height) => {
    setNewHeight(height)
    if (maintainAspect && originalSize.height > 0) {
      const ratio = originalSize.width / originalSize.height
      setNewWidth(Math.round(height * ratio))
    }
  }

  const applyPreset = (preset) => {
    setNewWidth(preset.width)
    setNewHeight(preset.height)
    setMaintainAspect(false)
  }

  const processImage = () => {
    if (!image) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (mode === 'resize') {
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.drawImage(img, 0, 0, newWidth, newHeight)
      } else {
        canvas.width = newWidth
        canvas.height = newHeight

        const sourceRatio = img.width / img.height
        const targetRatio = newWidth / newHeight

        let sx, sy, sWidth, sHeight

        if (sourceRatio > targetRatio) {
          sHeight = img.height
          sWidth = img.height * targetRatio
          sx = (img.width - sWidth) / 2
          sy = 0
        } else {
          sWidth = img.width
          sHeight = img.width / targetRatio
          sx = 0
          sy = (img.height - sHeight) / 2
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, newWidth, newHeight)
      }

      setResizedImage(canvas.toDataURL('image/png'))
    }
    img.src = image
  }

  const handleDownload = () => {
    if (!resizedImage) return

    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-${newWidth}x${newHeight}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFileSizeEstimate = () => {
    if (!resizedImage) return null
    const base64Length = resizedImage.length - 'data:image/png;base64,'.length
    const sizeInBytes = (base64Length * 3) / 4
    return (sizeInBytes / 1024).toFixed(2)
  }

  return (
    <ToolLayout title="Image Resizer & Crop" description="Resize atau crop gambar dengan preset dimensi populer">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Upload Image</h3>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Upload size={18} />Choose Image</button>
          </div>
          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Mode</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setMode('resize')} className={`px-4 py-2.5 rounded-lg font-medium transition-all ${mode === 'resize' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><Maximize2 size={16} className="inline mr-2" />Resize</button>
                <button onClick={() => setMode('crop')} className={`px-4 py-2.5 rounded-lg font-medium transition-all ${mode === 'crop' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><ImageIcon size={16} className="inline mr-2" />Crop</button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{mode === 'resize' ? 'Scale image to fit dimensions' : 'Crop image to exact dimensions'}</p>
            </div>
          )}
          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Preset Dimensions</h3>
              <div className="grid grid-cols-2 gap-2">{presets.map((preset) => (<button key={preset.name} onClick={() => applyPreset(preset)} className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-left"><div className="font-medium">{preset.name}</div><div className="text-slate-500 dark:text-slate-400">{preset.width} × {preset.height}</div></button>))}</div>
            </div>
          )}
          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Custom Dimensions</h3>
              <div className="space-y-4">
                <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Width: {newWidth}px</label><input type="number" value={newWidth} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100" /></div>
                <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Height: {newHeight}px</label><input type="number" value={newHeight} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100" /></div>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer"><input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="rounded" />Maintain aspect ratio</label>
              </div>
              <button onClick={processImage} className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">Apply Changes</button>
            </div>
          )}
        </div>
        <div className="space-y-6">
          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Original ({originalSize.width} × {originalSize.height})</h3>
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4"><img src={image} alt="Original" className="max-w-full max-h-64 object-contain" /></div>
            </div>
          )}
          {resizedImage && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Result ({newWidth} × {newHeight}) • ~{getFileSizeEstimate()}KB</h3>
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4"><img src={resizedImage} alt="Resized" className="max-w-full max-h-64 object-contain" /></div>
              <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Download size={18} />Download Image</button>
            </div>
          )}
          {!image && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><ImageIcon size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Tips:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• Resize: scales image proportionally or stretches</li><li>• Crop: cuts image to exact dimensions from center</li><li>• Use presets for social media formats</li></ul></div></div></div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
