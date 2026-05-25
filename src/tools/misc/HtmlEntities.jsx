import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function HtmlEntities() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  const handleEncode = () => {
    let result = input
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      result = result.replace(new RegExp(char, 'g'), entity)
    })
    setOutput(result)
  }

  const handleDecode = () => {
    let result = input
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      result = result.replace(new RegExp(entity, 'g'), char)
    })
    setOutput(result)
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
      category="misc"
      toolName="HTML Entities"
      description="Encode/decode HTML entities."
    >
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter HTML to encode...' : 'Enter entities to decode...'}
            className="w-full h-96 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-96 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
