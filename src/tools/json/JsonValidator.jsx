import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import StatusBar from '../../components/ui/StatusBar'

export default function JsonValidator() {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState('')

  const handleValidate = (value) => {
    setInput(value)
    if (!value.trim()) {
      setIsValid(true)
      setError('')
      return
    }

    try {
      JSON.parse(value)
      setIsValid(true)
      setError('')
    } catch (err) {
      setIsValid(false)
      setError(err.message)
    }
  }

  return (
    <ToolLayout
      category="json"
      toolName="JSON Validator"
      description="Validasi JSON dengan pesan error informatif."
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => handleValidate(e.target.value)}
          placeholder="Paste JSON to validate..."
          style={{ height: 'calc(100vh - 280px)' }}
          className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
        />
      </div>

      <StatusBar
        isValid={isValid}
        message={error}
        bytes={input ? new Blob([input]).size : 0}
      />
    </ToolLayout>
  )
}
