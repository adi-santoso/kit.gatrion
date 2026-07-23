import { useState, useRef, useEffect } from 'react'
import { Download, FileText, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import JsBarcode from 'jsbarcode'

export default function BarcodeGenerator() {
  const [text, setText] = useState('')
  const [format, setFormat] = useState('CODE128')
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)

  const formats = [
    { value: 'CODE128', label: 'Code 128', desc: 'Alphanumeric' },
    { value: 'CODE39', label: 'Code 39', desc: 'Alphanumeric' },
    { value: 'EAN13', label: 'EAN-13', desc: '13 digits' },
    { value: 'EAN8', label: 'EAN-8', desc: '8 digits' },
    { value: 'UPC', label: 'UPC', desc: '12 digits' },
    { value: 'ITF14', label: 'ITF-14', desc: '14 digits' },
  ]

  useEffect(() => {
    if (text && canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, { format, width, height, displayValue, margin: 10 })
        setError(null)
      } catch (err) {
        setError(err.message || 'Invalid barcode format')
      }
    }
  }, [text, format, width, height, displayValue])

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return

    canvasRef.current.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `barcode-${text}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  const handleDownloadSVG = () => {
    try {
      const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      JsBarcode(svgNode, text, { format, width, height, displayValue, margin: 10, xmlDocument: document })
      const svg = new XMLSerializer().serializeToString(svgNode)
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `barcode-${text}-${Date.now()}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message || 'SVG export failed')
    }
  }

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getFormatExample = (fmt) => {
    const examples = {
      CODE128: 'ABC123456',
      CODE39: 'HELLO123',
      EAN13: '1234567890128',
      EAN8: '12345670',
      UPC: '123456789012',
      ITF14: '12345678901231',
    }
    return examples[fmt] || ''
  }

  return (
    <ToolLayout title="Barcode Generator" description="Generate barcode dari text dengan berbagai format">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Barcode Content</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or numbers..." className="w-full h-24 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 resize-none" />
            <button onClick={handleCopy} disabled={!text} className="mt-2 flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors disabled:opacity-50">{copied ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy text</>}</button>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Format</h3>
            <div className="grid grid-cols-2 gap-2">{formats.map((fmt) => (<button key={fmt.value} onClick={() => { setFormat(fmt.value); setText(getFormatExample(fmt.value)); }} className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${format === fmt.value ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><div className="font-medium">{fmt.label}</div><div className={`text-xs ${format === fmt.value ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{fmt.desc}</div></button>))}</div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Customization</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Width: {width}</label><input type="range" min="1" max="5" step="1" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>1</span><span>5</span></div></div>
              
              <div><label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Height: {height}px</label><input type="range" min="50" max="200" step="10" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full" /><div className="flex justify-between text-xs text-slate-500 mt-1"><span>50px</span><span>200px</span></div></div>
              
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer"><input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} className="rounded" />Show text below barcode</label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Preview</h3>
            {text ? (
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <canvas ref={canvasRef} className={error ? 'hidden' : ''} />
                {error && <div className="text-center text-red-600 dark:text-red-400"><FileText size={48} className="mx-auto mb-2 opacity-50" /><p className="text-sm">{error}</p></div>}
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400"><FileText size={48} className="mx-auto mb-2 opacity-50" /><p className="text-sm">Enter text to generate barcode</p></div>
            )}
          </div>

          {text && !error && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6"><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Download</h3><div className="grid grid-cols-2 gap-3"><button onClick={handleDownloadPNG} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Download size={16} />PNG</button><button onClick={handleDownloadSVG} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Download size={16} />SVG</button></div></div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><FileText size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Format Tips:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• CODE128: paling fleksibel, alphanumeric</li><li>• EAN13/EAN8: untuk retail products</li><li>• UPC: standar Amerika untuk produk</li><li>• ITF14: untuk shipping containers</li></ul></div></div></div>
        </div>
      </div>
    </ToolLayout>
  )
}
