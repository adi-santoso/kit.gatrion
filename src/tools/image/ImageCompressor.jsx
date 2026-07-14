import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, FileText, Loader2 } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import ToolLayout from '../../components/layout/ToolLayout'

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [quality, setQuality] = useState(0.8)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [maxHeight, setMaxHeight] = useState(1080)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target.result)
      setCompressedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const handleCompress = async () => {
    if (!originalImage) return

    setIsCompressing(true)
    try {
      // Convert base64 to File
      const response = await fetch(originalImage)
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })

      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        quality: quality
      }

      const compressedFile = await imageCompression(file, options)
      setCompressedSize(compressedFile.size)

      const reader = new FileReader()
      reader.onload = (e) => {
        setCompressedImage(e.target.result)
      }
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      console.error('Compression failed:', error)
      alert('Failed to compress image')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImage) return

    const link = document.createElement('a')
    link.href = compressedImage
    link.download = `compressed-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const compressionRatio = compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images to reduce file size while maintaining quality"
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
            Upload Image
          </h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <Upload size={20} className="text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">
              Click to upload image (JPG, PNG, WebP)
            </span>
          </button>
        </div>

        {/* Settings */}
        {originalImage && (
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
              Compression Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Max Width (px)
                  </label>
                  <input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(parseInt(e.target.value) || 1920)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Max Height (px)
                  </label>
                  <input
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(parseInt(e.target.value) || 1080)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isCompressing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <ImageIcon size={16} />
                    Compress Image
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Preview */}
        {(originalImage || compressedImage) && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Original */}
            {originalImage && (
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Original
                  </h3>
                  <span className="text-xs text-slate-500">
                    {formatSize(originalSize)}
                  </span>
                </div>
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>
            )}

            {/* Compressed */}
            {compressedImage && (
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Compressed
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-500 font-medium">
                      -{compressionRatio}%
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatSize(compressedSize)}
                    </span>
                  </div>
                </div>
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700"
                />
                <button
                  onClick={handleDownload}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex gap-2">
            <FileText size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-1">Tips:</p>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>• Lower quality = smaller file size</li>
                <li>• Reduce max dimensions for even smaller files</li>
                <li>• 100% client-side processing - no upload to server</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
