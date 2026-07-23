import { useState, useRef, useEffect } from 'react'
import { Upload, Download, RotateCcw, Image as ImageIcon } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { MAX_CANVAS_DIMENSION, readImageFile } from '../../utils/imageResourceValidation'

export default function ImageFilter() {
  const [image, setImage] = useState(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [grayscale, setGrayscale] = useState(0)
  const [sepia, setSepia] = useState(0)
  const [hueRotate, setHueRotate] = useState(0)
  const [invert, setInvert] = useState(0)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const filterPresets = [
    { name: 'Normal', values: { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
    { name: 'Vintage', values: { brightness: 110, contrast: 90, saturation: 80, blur: 0, grayscale: 0, sepia: 50, hueRotate: 0, invert: 0 } },
    { name: 'B&W', values: { brightness: 100, contrast: 120, saturation: 0, blur: 0, grayscale: 100, sepia: 0, hueRotate: 0, invert: 0 } },
    { name: 'Vibrant', values: { brightness: 110, contrast: 110, saturation: 150, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
    { name: 'Cool', values: { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0, hueRotate: 180, invert: 0 } },
    { name: 'Warm', values: { brightness: 110, contrast: 100, saturation: 110, blur: 0, grayscale: 0, sepia: 30, hueRotate: 20, invert: 0 } },
    { name: 'Dramatic', values: { brightness: 90, contrast: 150, saturation: 120, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
    { name: 'Soft', values: { brightness: 110, contrast: 80, saturation: 90, blur: 1, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
  ]

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { dataUrl } = await readImageFile(file, { maxDimension: MAX_CANVAS_DIMENSION })
      setImage(dataUrl)
    } catch (error) {
      alert(error.message)
    }
  }

  const applyPreset = (preset) => {
    setBrightness(preset.values.brightness)
    setContrast(preset.values.contrast)
    setSaturation(preset.values.saturation)
    setBlur(preset.values.blur)
    setGrayscale(preset.values.grayscale)
    setSepia(preset.values.sepia)
    setHueRotate(preset.values.hueRotate)
    setInvert(preset.values.invert)
  }

  const resetFilters = () => {
    applyPreset(filterPresets[0])
  }

  const getFilterString = () => {
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg) invert(${invert}%)`
  }

  const handleDownload = () => {
    if (!image) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      canvas.width = img.width
      canvas.height = img.height

      ctx.filter = getFilterString()
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `filtered-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    }
    img.onerror = () => alert('Failed to decode the image for export.')
    img.src = image
  }

  return (
    <ToolLayout title="Image Filter & Editor" description="Apply filters dan adjustment ke gambar">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Upload Image</h3>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Upload size={18} />Choose Image</button>
          </div>

          {image && (
            <>
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Filter Presets</h3>
                  <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"><RotateCcw size={14} />Reset</button>
                </div>
                <div className="grid grid-cols-4 gap-2">{filterPresets.map((preset) => (<button key={preset.name} onClick={() => applyPreset(preset)} className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-medium">{preset.name}</button>))}</div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Adjustments</h3>
                <div className="space-y-4">
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Brightness: {brightness}%</label><input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>200%</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Contrast: {contrast}%</label><input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>200%</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Saturation: {saturation}%</label><input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>200%</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Blur: {blur}px</label><input type="range" min="0" max="10" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0px</span><span>10px</span></div></div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Effects</h3>
                <div className="space-y-4">
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Grayscale: {grayscale}%</label><input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>100%</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Sepia: {sepia}%</label><input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>100%</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Hue Rotate: {hueRotate}°</label><input type="range" min="0" max="360" value={hueRotate} onChange={(e) => setHueRotate(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0°</span><span>360°</span></div></div>
                  
                  <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Invert: {invert}%</label><input type="range" min="0" max="100" value={invert} onChange={(e) => setInvert(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>0%</span><span>100%</span></div></div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {image ? (
            <>
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Preview</h3>
                <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4"><img src={image} alt="Filtered" style={{ filter: getFilterString() }} className="max-w-full max-h-96 object-contain" /></div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Download</h3>
                <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Download size={18} />Download Filtered Image</button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><ImageIcon size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">CSS Filter String:</p><code className="text-xs text-blue-800 dark:text-blue-200 break-all">{getFilterString()}</code></div></div></div>
            </>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><ImageIcon size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Tips:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• Real-time preview dengan CSS filters</li><li>• 8 preset filters siap pakai</li><li>• Kombinasikan multiple adjustments</li><li>• Export CSS filter string</li></ul></div></div></div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
