import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, FileText, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgColor, setFgColor] = useState('#000000')
  const [level, setLevel] = useState('M')
  const [copied, setCopied] = useState(false)
  const qrRef = useRef(null)

  const handleDownloadPNG = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `qrcode-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const handleDownloadSVG = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `qrcode-${Date.now()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const errorLevels = [
    { value: 'L', label: 'Low (7%)', description: '~7% correction' },
    { value: 'M', label: 'Medium (15%)', description: '~15% correction' },
    { value: 'Q', label: 'Quartile (25%)', description: '~25% correction' },
    { value: 'H', label: 'High (30%)', description: '~30% correction' }
  ]

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text or URLs with customization"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Content</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." className="w-full h-32 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 resize-none" />
            <button onClick={handleCopy} disabled={!text} className="mt-2 flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors disabled:opacity-50">
              {copied ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy text</>}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Size: {size}px</h3>
            <input type="range" min="128" max="512" step="64" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-500 mt-1"><span>128px</span><span>512px</span></div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Foreground</label><div className="flex gap-2"><input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 h-10 rounded border border-slate-200 dark:border-slate-700 cursor-pointer" /><input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm" /></div></div>
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Background</label><div className="flex gap-2"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 rounded border border-slate-200 dark:border-slate-700 cursor-pointer" /><input type="text" value={bgColor} onChange=(e) => setBgColor(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm" /></div></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Error Correction Level</h3>
            <div className="grid grid-cols-2 gap-2">{errorLevels.map((lvl) => (<button key={lvl.value} onClick={() => setLevel(lvl.value)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${level === lvl.value ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><div>{lvl.label}</div><div className="text-xs opacity-75">{lvl.description}</div></button>))}</div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Preview</h3>
            <div ref={qrRef} className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg" style={{ minHeight: size + 64 }}>{text ? <QRCodeSVG value={text} size={size} bgColor={bgColor} fgColor={fgColor} level={level} includeMargin={true} /> : <div className="text-center text-slate-400"><FileText size={48} className="mx-auto mb-2 opacity-50" /><p className="text-sm">Enter text to generate QR code</p></div>}</div>
          </div>
          {text && (<div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6"><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Download</h3><div className="grid grid-cols-2 gap-3"><button onClick={handleDownloadPNG} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Download size={16} />PNG</button><button onClick={handleDownloadSVG} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Download size={16} />SVG</button></div></div>)}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><FileText size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Tips:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• Higher error correction = larger QR code</li><li>• PNG for print, SVG for scalability</li><li>• Test QR code before using in production</li></ul></div></div></div>
        </div>
      </div>
    </ToolLayout>
  )
}
