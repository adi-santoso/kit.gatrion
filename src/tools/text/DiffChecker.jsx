import { useState } from 'react'
import { diffLines } from 'diff'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function DiffChecker() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [diff, setDiff] = useState([])
  const [showDiff, setShowDiff] = useState(false)

  const handleCompare = () => {
    const differences = diffLines(textA, textB)
    setDiff(differences)
    setShowDiff(true)
  }

  const handleClear = () => {
    setTextA('')
    setTextB('')
    setDiff([])
    setShowDiff(false)
  }

  return (
    <ToolLayout
      category="text"
      toolName="Diff Checker"
      description="Bandingkan dua teks baris per baris."
    >
      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleCompare}>
          Compare
        </Button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Text A
          </label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            className="w-full h-64 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Text B
          </label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            className="w-full h-64 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500/50 resize-none"
          />
        </div>
      </div>

      {/* Diff Result */}
      {showDiff && (
        <div>
          <div className="flex items-center gap-4 mb-2">
            <label className="text-sm font-medium text-slate-300">
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
            </div>
          </div>
          <div className="bg-gray-900 border border-white/[0.06] rounded-lg p-4 font-mono text-sm overflow-x-auto">
            {diff.map((part, index) => {
              const bgColor = part.added
                ? 'bg-green-500/20 text-green-300'
                : part.removed
                ? 'bg-red-500/20 text-red-300'
                : 'text-slate-300'
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
