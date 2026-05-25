import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function StringCase() {
  const [input, setInput] = useState('')

  const conversions = {
    camelCase: (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, ''),
    PascalCase: (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
      word.toUpperCase()
    ).replace(/\s+/g, ''),
    snake_case: (str) => str.replace(/\s+/g, '_').toLowerCase(),
    'kebab-case': (str) => str.replace(/\s+/g, '-').toLowerCase(),
    UPPER_CASE: (str) => str.replace(/\s+/g, '_').toUpperCase(),
    'lower case': (str) => str.toLowerCase(),
  }

  return (
    <ToolLayout
      category="text"
      toolName="String Case Converter"
      description="camelCase, snake_case, PascalCase, kebab-case."
    >
      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="w-full h-24 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Conversions */}
      <div className="space-y-3">
        {Object.entries(conversions).map(([name, fn]) => (
          <div key={name} className="bg-gray-900 border border-white/[0.06] rounded-lg p-4">
            <div className="text-sm font-semibold text-slate-300 mb-2">{name}</div>
            <div className="font-mono text-sm text-slate-400 break-all">
              {input ? fn(input) : '—'}
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
