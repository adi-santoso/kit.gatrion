import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')

  const handleEncode = () => {
    try {
      const encoded = btoa(input)
      setOutput(encoded)
      setError('')
    } catch (err) {
      setError('Failed to encode: ' + err.message)
      setOutput('')
    }
  }

  const handleDecode = () => {
    try {
      const decoded = atob(input)
      setOutput(decoded)
      setError('')
    } catch (err) {
      setError('Failed to decode: Invalid Base64 string')
      setOutput('')
    }
  }

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <ToolLayout
      category="text"
      toolName="Base64 Tool"
      description="Encode/decode Base64."
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
        <div className="ml-auto flex gap-2">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleProcess}>
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          style={{ height: 'calc(100vh - 380px)' }}
          className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Output */}
      <div className="flex-1 flex flex-col">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Output
        </label>
        <textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          style={{ height: 'calc(100vh - 380px)' }}
          className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none"
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    </ToolLayout>
  )
}
