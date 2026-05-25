import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.trim().split(/\n\n+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
  }

  return (
    <ToolLayout
      category="text"
      toolName="Word Counter"
      description="Hitung kata, karakter, kalimat, paragraf."
    >
      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Text Input
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-64 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-gray-900 border border-white/[0.06] rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-400 mb-1">{value.toLocaleString()}</div>
            <div className="text-sm text-slate-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
