import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input))
    } catch (err) {
      alert('Failed to encode: ' + err.message)
    }
  }

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input))
    } catch (err) {
      alert('Failed to decode: ' + err.message)
    }
  }

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  return (
    <ToolLayout
      category="text"
      toolName="URL Encoder"
      description="Encode/decode URL dan query string."
    >
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={mode === 'encode' ? 'primary' : 'secondary'}
          onClick={() => setMode('encode')}
        >
          Encode
        </Button>
        <Button
          variant={mode === 'decode' ? 'primary' : 'secondary'}
          onClick={() => setMode('decode')}
        >
          Decode
        </Button>
        <div className="ml-auto">
          <Button variant="primary" onClick={handleProcess}>
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
          className="w-full h-32 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Output
        </label>
        <textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="w-full h-32 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none resize-none"
        />
      </div>
    </ToolLayout>
  )
}
