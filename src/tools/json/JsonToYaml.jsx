import { useState } from 'react'
import yaml from 'js-yaml'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function JsonToYaml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('toYaml')
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      if (mode === 'toYaml') {
        const data = JSON.parse(input)
        const yamlStr = yaml.dump(data)
        setOutput(yamlStr)
      } else {
        const data = yaml.load(input)
        const jsonStr = JSON.stringify(data, null, 2)
        setOutput(jsonStr)
      }
      setError('')
    } catch (err) {
      setError(err.message)
      setOutput('')
    }
  }

  return (
    <ToolLayout
      category="json"
      toolName="JSON ↔ YAML"
      description="Konversi dua arah JSON dan YAML."
    >
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={mode === 'toYaml' ? 'primary' : 'secondary'}
          onClick={() => setMode('toYaml')}
        >
          JSON → YAML
        </Button>
        <Button
          variant={mode === 'toJson' ? 'primary' : 'secondary'}
          onClick={() => setMode('toJson')}
        >
          YAML → JSON
        </Button>
        <div className="ml-auto">
          <Button variant="primary" onClick={handleConvert}>
            Convert
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {mode === 'toYaml' ? 'JSON Input' : 'YAML Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'toYaml' ? 'Enter JSON...' : 'Enter YAML...'}
            style={{ height: 'calc(100vh - 320px)' }}
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {mode === 'toYaml' ? 'YAML Output' : 'JSON Output'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            style={{ height: 'calc(100vh - 320px)' }}
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
