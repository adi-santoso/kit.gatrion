import { useState, useRef } from 'react'
import { Download, ImageIcon, FileImage } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function ImageFormatConverter() {
  const [image, setImage] = useState(null)
  const [originalFormat, setOriginalFormat] = useState('')
  const [targetFormat, setTargetFormat] = useState('png')
  const [quality, setQuality] = useState(0.92)
  const [converting, setConverting] = useState(false)
  const [convertedUrl, setConvertedUrl] = useState(null)
  const [fileSize, setFileSize] = useState({ original: 0, converted: 0 })
  const canvasRef = useRef(null)

  const formats = [
    { value: 'png', label: 'PNG', mime: 'image/png', hasQuality: false },
    { value: 'jpeg', label: 'JPEG', mime: 'image/jpeg', hasQuality: true },
    { value: 'webp', label: 'WebP', mime: 'image/webp', hasQuality: true },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const type = file.type.split('/')[1]
    setOriginalFormat(type)
    setFileSize(prev => ({ ...prev, original: file.size }))

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setConvertedUrl(null)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleConvert = async () => {
    if (!image) return
    setConverting(true)

    try {
      const canvas = canvasRef.current
      canvas.width = image.width
      canvas.height = image.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0)

      const targetMime = formats.find(f => f.value === targetFormat)?.mime || 'image/png'
      const hasQuality = formats.find(f => f.value === targetFormat)?.hasQuality

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setConvertedUrl(url)
            setFileSize(prev => ({ ...prev, converted: blob.size }))
          }
          setConverting(false)
        },
        targetMime,
        hasQuality ? quality : undefined
      )
    } catch (error) {
      console.error('Conversion error:', error)
      setConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedUrl) return

    const link = document.createElement('a')
    link.href = convertedUrl
    link.download = `converted-${Date.now()}.${targetFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getSavingsPercent = () => {
    if (!fileSize.original || !fileSize.converted) return 0
    return Math.round((1 - fileSize.converted / fileSize.original) * 100)
  }

  return (
    <ToolLayout
      title="Image Format Converter"
      description="Convert images between PNG, JPEG, and WebP formats"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Upload Image</h3>
            <label className="block">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <ImageIcon size={48} className="text-slate-400 mb-3" />
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">PNG, JPEG, WebP, GIF</p>
              </div>
            </label>
            {originalFormat && (
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Original format: <span className="font-medium uppercase">{originalFormat}</span>
              </div>
            )}
          </div>

          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Target Format</h3>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((format) => (
                  <button key={format.value} onClick={() => setTargetFormat(format.value)} className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${targetFormat === format.value ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                    {format.label}
                  </button>
                ))}
              </div>

              {formats.find(f => f.value === targetFormat)?.hasQuality && (
                <div className="mt-4">
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Quality: {Math.round(quality * 100)}%</label>
                  <input type="range" min="0.1" max="1" step="0.01" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>Lower size</span><span>Higher quality</span></div>
                </div>
              )}
            </div>
          )}

          {image && (
            <button onClick={handleConvert} disabled={converting} className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {converting ? 'Converting...' : 'Convert Image'}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Original</h3>
              <div className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <img src={image.src} alt="Original" className="max-w-full h-auto max-h-64 rounded" />
              </div>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">Size: {formatBytes(fileSize.original)}</div>
            </div>
          )}

          {convertedUrl && (
            <>
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Converted</h3>
                <div className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <img src={convertedUrl} alt="Converted" className="max-w-full h-auto max-h-64 rounded" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Size: {formatBytes(fileSize.converted)}</span>
                  {getSavingsPercent() !== 0 && (
                    <span className={`font-medium ${getSavingsPercent() > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getSavingsPercent() > 0 ? '-' : '+'}{Math.abs(getSavingsPercent())}%
                    </span>
                  )}
                </div>
              </div>

              <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <Download size={18} />Download {targetFormat.toUpperCase()}
              </button>
            </>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-2">
              <FileImage size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Format Guide:</p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• <strong>PNG:</strong> Lossless, transparency support</li>
                  <li>• <strong>JPEG:</strong> Small size, no transparency</li>
                  <li>• <strong>WebP:</strong> Modern format, best compression</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  )
}
