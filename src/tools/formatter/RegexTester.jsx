import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState([])
  const [error, setError] = useState('')

  const handleTest = () => {
    try {
      if (!pattern) {
        setMatches([])
        setError('')
        return
      }

      const regex = new RegExp(pattern, flags)
      const found = [...testString.matchAll(regex)]
      setMatches(found.map(m => ({ match: m[0], index: m.index })))
      setError('')
    } catch (err) {
      setError(err.message)
      setMatches([])
    }
  }

  const highlightMatches = () => {
    if (!matches.length || !testString) return testString

    let result = ''
    let lastIndex = 0

    matches.forEach(({ match, index }) => {
      result += testString.slice(lastIndex, index)
      result += `<mark class="bg-yellow-500/30 text-yellow-200">${match}</mark>`
      lastIndex = index + match.length
    })
    result += testString.slice(lastIndex)

    return result
  }

  return (
    <ToolLayout
      category="formatter"
      toolName="Regex Tester"
      description="Test regex dengan highlight match real-time."
    >
      {/* Pattern */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Regular Expression
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pattern}
            onChange={(e) => { setPattern(e.target.value); handleTest(); }}
            placeholder="Enter regex pattern..."
            className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
          <input
            type="text"
            value={flags}
            onChange={(e) => { setFlags(e.target.value); handleTest(); }}
            placeholder="flags"
            className="w-20 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Test String */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => { setTestString(e.target.value); handleTest(); }}
          placeholder="Enter text to test..."
          className="w-full h-32 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Results */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Matches: {matches.length}
        </label>
        <div
          className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm min-h-[100px] whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlightMatches() }}
        />
      </div>

      {/* Match Details */}
      {matches.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Match Details
          </label>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-3 text-sm">
                <span className="text-slate-600 dark:text-slate-400">Match {i + 1}:</span>{' '}
                <span className="text-yellow-600 dark:text-yellow-300 font-mono">{m.match}</span>{' '}
                <span className="text-slate-500 dark:text-slate-500">at index {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
