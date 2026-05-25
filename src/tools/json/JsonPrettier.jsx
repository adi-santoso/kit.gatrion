import { useState, useEffect } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'
import CodeEditor from '../../components/ui/CodeEditor'
import StatusBar from '../../components/ui/StatusBar'

export default function JsonPrettier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState('')
  const [isMinified, setIsMinified] = useState(false)

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setIsValid(true)
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = isMinified 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setIsValid(true)
      setError('')
    } catch (err) {
      setIsValid(false)
      setError(err.message)
      setOutput('')
    }
  }, [input, isMinified])

  const handleClear = () => {
    setInput('')
    setOutput('')
    setIsValid(true)
    setError('')
  }

  const handleToggleMinify = () => {
    setIsMinified(!isMinified)
  }

  return (
    <ToolLayout
      category="json"
      toolName="JSON Prettier"
      description="Format & beautify JSON dengan syntax highlight."
    >
      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="secondary" onClick={handleToggleMinify}>
          {isMinified ? 'Beautify' : 'Minify'}
        </Button>
        <div className="ml-auto">
          <CopyButton text={output} />
        </div>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Input JSON
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="json"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Formatted JSON
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            language="json"
            readOnly
          />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar
        isValid={isValid}
        message={error}
        bytes={output ? new Blob([output]).size : 0}
      />
    </ToolLayout>
  )
}
