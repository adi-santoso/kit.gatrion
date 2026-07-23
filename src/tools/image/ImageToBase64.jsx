import { useState, useRef } from 'react'
import { Upload, Copy, Check, Download, ArrowLeftRight } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { readImageFile } from '../../utils/imageResourceValidation'

export default function ImageToBase64() {
  const [mode, setMode] = useState('encode') // encode or decode
  const [image, setImage] = useState(null)
  const [base64, setBase64] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { dataUrl } = await readImageFile(file)
      setImage(dataUrl)
      setBase64(dataUrl)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleBase64Input = (value) => {
    setBase64(value)
    
    // Try to decode if it looks like base64
    if (value.startsWith('data:image/')) {
      setImage(value)
    } else if (value.length > 0) {
      // Try adding data URI prefix
      try {
        const withPrefix = `data:image/png;base64,${value}`
        setImage(withPrefix)
      } catch (e) {
        setImage(null)
      }
    } else {
      setImage(null)
    }
  }

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (!image) return

    const link = document.createElement('a')
    link.href = image
    link.download = `image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClear = () => {
    setImage(null)
    setBase64('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getBase64Size = () => {
    if (!base64) return '0 KB'
    const bytes = base64.length * 0.75
    return `${(bytes / 1024).toFixed(2)} KB`
  }

  return (
    <ToolLayout
      title="Image ↔ Base64"
      description="Convert images to Base64 and vice versa"
    >
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Image → Base64
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Base64 → Image
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="space-y-6">
            {mode === 'encode' ? (
              /* Upload Image */
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
                    Click to upload image
                  </span>
                </button>

                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Paste Base64 */
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
                  Paste Base64 String
                </h3>
                <textarea
                  value={base64}
                  onChange={(e) => handleBase64Input(e.target.value)}
                  placeholder="Paste base64 string here..."
                  className="w-full h-64 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-mono resize-none"
                />
                <div className="mt-2 text-xs text-slate-500">
                  Supports: data:image/... or raw base64 string
                </div>
              </div>
            )}

            {/* Actions */}
            {(image || base64) && (
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeftRight size={16} />
                  Switch
                </button>
              </div>
            )}
          </div>

          {/* Right: Output */}
          <div className="space-y-6">
            {mode === 'encode' ? (
              /* Base64 Output */
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Base64 Output
                  </h3>
                  {base64 && (
                    <span className="text-xs text-slate-500">{getBase64Size()}</span>
                  )}
                </div>
                <textarea
                  value={base64}
                  readOnly
                  placeholder="Base64 string will appear here..."
                  className="w-full h-64 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-mono resize-none"
                />
                {base64 && (
                  <button
                    onClick={handleCopy}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              /* Image Output */
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
                  Decoded Image
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[16rem] flex items-center justify-center">
                  {image ? (
                    <img
                      src={image}
                      alt="Decoded"
                      className="max-w-full rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Upload size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Paste base64 to see image</p>
                    </div>
                  )}
                </div>
                {image && (
                  <button
                    onClick={handleDownload}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <Download size={16} />
                    Download Image
                  </button>
                )}
              </div>
            )}

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-2">Use Cases:</p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
                  <li>• Embed images in HTML/CSS</li>
                  <li>• Store images in JSON/databases</li>
                  <li>• Share images as text</li>
                  <li>• Email templates with inline images</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
