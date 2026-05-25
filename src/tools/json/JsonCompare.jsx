import { useState } from 'react'
import { diffLines } from 'diff'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CodeEditor from '../../components/ui/CodeEditor'

export default function JsonCompare() {
  const [jsonA, setJsonA] = useState('')
  const [jsonB, setJsonB] = useState('')
  const [diff, setDiff] = useState([])
  const [showDiff, setShowDiff] = useState(false)

  const handleCompare = () => {
    try {
      const parsedA = JSON.parse(jsonA || '{}')
      const parsedB = JSON.parse(jsonB || '{}')
      const formattedA = JSON.stringify(parsedA, null, 2)
      const formattedB = JSON.stringify(parsedB, null, 2)
      const differences = diffLines(formattedA, formattedB)
      setDiff(differences)
      setShowDiff(true)
    } catch (err) {
      alert('Invalid JSON: ' + err.message)
    }
  }

  const handleClear = () => {
    setJsonA('')
    setJsonB('')
    setDiff([])
    setShowDiff(false)
  }

  return (
    <ToolLayout
      category="json"
      toolName="JSON Compare"
      description="Bandingkan dua JSON — added/removed/modified."
    >
      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleCompare}>
          Compare
        </Button>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            JSON A
          </label>
          <CodeEditor
            value={jsonA}
            onChange={setJsonA}
            language="json"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            JSON B
          </label>
          <CodeEditor
            value={jsonB}
            onChange={setJsonB}
            language="json"
          />
        </div>
      </div>

      {/* Diff Result */}
      {showDiff && (
        <div>
          <div className="flex items-center gap-4 mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Diff Result
            </label>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500/20 border border-green-500 rounded"></span>
                Added
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></span>
                Removed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-yellow-500/20 border border-yellow-500 rounded"></span>
                Modified
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 font-mono text-sm overflow-x-auto">
            {diff.map((part, index) => {
              const bgColor = part.added
                ? 'bg-green-500/20 text-green-600 dark:text-green-300'
                : part.removed
                ? 'bg-red-500/20 text-red-600 dark:text-red-300'
                : 'text-slate-700 dark:text-slate-300'
              return (
                <div key={index} className={`${bgColor} whitespace-pre`}>
                  {part.value}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
