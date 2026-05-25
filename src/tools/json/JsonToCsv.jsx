import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function JsonToCsv() {
  const [json, setJson] = useState('')
  const [csv, setCsv] = useState('')
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      const data = JSON.parse(json)
      if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects')
      }
      if (data.length === 0) {
        throw new Error('Array is empty')
      }

      const headers = Object.keys(data[0])
      const csvRows = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header]
            const escaped = String(value).replace(/"/g, '""')
            return `"${escaped}"`
          }).join(',')
        )
      ]

      setCsv(csvRows.join('\n'))
      setError('')
    } catch (err) {
      setError(err.message)
      setCsv('')
    }
  }

  return (
    <ToolLayout
      category="json"
      toolName="JSON to CSV"
      description="Konversi array of objects ke CSV."
    >
      <div className="flex gap-2 mb-4">
        <Button variant="primary" onClick={handleConvert}>
          Convert to CSV
        </Button>
        {csv && <CopyButton text={csv} />}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            JSON Input (Array of Objects)
          </label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            CSV Output
          </label>
          <textarea
            value={csv}
            readOnly
            placeholder="CSV will appear here..."
            className="w-full h-96 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  )
}
