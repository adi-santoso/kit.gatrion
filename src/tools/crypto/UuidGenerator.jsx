import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
  }

  const handleClear = () => {
    setUuids([])
  }

  return (
    <ToolLayout
      category="crypto"
      toolName="UUID Generator"
      description="Generate UUID v4, v1, ULID."
    >
      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Count:
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          className="w-24 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50"
        />
        <Button variant="primary" onClick={handleGenerate}>
          Generate
        </Button>
        {uuids.length > 0 && (
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>

      {/* Output */}
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((uuid, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4"
            >
              <span className="text-sm text-slate-500 dark:text-slate-500 w-8">#{index + 1}</span>
              <div className="flex-1 font-mono text-sm text-slate-700 dark:text-slate-300">
                {uuid}
              </div>
              <CopyButton text={uuid} />
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}
