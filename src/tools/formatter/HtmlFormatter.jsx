import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function HtmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('beautify')

  const beautify = (html) => {
    let formatted = ''
    let indent = 0
    const tab = '  '
    
    html.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) indent--
      formatted += tab.repeat(indent) + '<' + node + '>\n'
      if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('input')) indent++
    })
    
    return formatted.substring(1, formatted.length - 2)
  }

  const minify = (html) => {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim()
  }

  const handleProcess = () => {
    if (mode === 'beautify') {
      setOutput(beautify(input))
    } else {
      setOutput(minify(input))
    }
  }

  return (
    <ToolLayout
      category="formatter"
      toolName="HTML Formatter"
      description="Beautify / minify HTML."
    >
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={mode === 'beautify' ? 'primary' : 'secondary'}
          onClick={() => setMode('beautify')}
        >
          Beautify
        </Button>
        <Button
          variant={mode === 'minify' ? 'primary' : 'secondary'}
          onClick={() => setMode('minify')}
        >
          Minify
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="primary" onClick={handleProcess}>
            Format
          </Button>
          {output && <CopyButton text={output} />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            HTML Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HTML..."
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Formatted HTML
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted HTML will appear here..."
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
