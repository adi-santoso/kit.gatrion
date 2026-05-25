import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [datetime, setDatetime] = useState('')
  const [mode, setMode] = useState('toHuman')

  const handleConvert = () => {
    try {
      if (mode === 'toHuman') {
        const ts = parseInt(timestamp)
        if (isNaN(ts)) {
          alert('Invalid timestamp')
          return
        }
        const date = new Date(ts * 1000)
        setDatetime(date.toISOString())
      } else {
        const date = new Date(datetime)
        if (isNaN(date.getTime())) {
          alert('Invalid datetime')
          return
        }
        setTimestamp(Math.floor(date.getTime() / 1000).toString())
      }
    } catch (err) {
      alert('Conversion failed: ' + err.message)
    }
  }

  const handleNow = () => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    setDatetime(new Date().toISOString())
  }

  const handleClear = () => {
    setTimestamp('')
    setDatetime('')
  }

  return (
    <ToolLayout
      category="misc"
      toolName="Timestamp Converter"
      description="Unix ↔ human-readable datetime."
    >
      {/* Controls */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant={mode === 'toHuman' ? 'primary' : 'secondary'}
          onClick={() => setMode('toHuman')}
        >
          Unix → Human
        </Button>
        <Button
          variant={mode === 'toUnix' ? 'primary' : 'secondary'}
          onClick={() => setMode('toUnix')}
        >
          Human → Unix
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="secondary" onClick={handleNow}>
            Current Time
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleConvert}>
            Convert
          </Button>
        </div>
      </div>

      {/* Unix Timestamp */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Unix Timestamp (seconds)
        </label>
        <input
          type="text"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1234567890"
          className="w-full bg-gray-900 border border-white/[0.06] rounded-lg px-4 py-3 text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {/* Human Readable */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Human Readable (ISO 8601)
        </label>
        <input
          type="text"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          placeholder="2023-01-01T00:00:00.000Z"
          className="w-full bg-gray-900 border border-white/[0.06] rounded-lg px-4 py-3 text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
        />
      </div>
    </ToolLayout>
  )
}
