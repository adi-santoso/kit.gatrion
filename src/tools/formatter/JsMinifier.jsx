import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function JsMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const minify = () => {
    let result = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*/g, '') // Remove single-line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces
      .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators
      .trim()
    setOutput(result)
  }

  return (
    <ToolLayout
      category="formatter"
      toolName="JS Minifier"
      description="Minify JavaScript."
    >
      <div className="flex gap-2 mb-4">
        <Button variant="primary" onClick={minify}>
          Minify
        </Button>
        {output && <CopyButton text={output} />}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            JavaScript Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter JavaScript to minify..."
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Minified JavaScript
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Minified JavaScript will appear here..."
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
