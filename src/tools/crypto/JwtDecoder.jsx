import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState(null)
  const [payload, setPayload] = useState(null)
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')

  const handleDecode = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const decodeBase64Url = (str) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        const padding = '='.repeat((4 - (base64.length % 4)) % 4)
        return atob(base64 + padding)
      }

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]))
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]))

      setHeader(decodedHeader)
      setPayload(decodedPayload)
      setSignature(parts[2])
      setError('')
    } catch (err) {
      setError('Failed to decode JWT: ' + err.message)
      setHeader(null)
      setPayload(null)
      setSignature('')
    }
  }

  const handleClear = () => {
    setToken('')
    setHeader(null)
    setPayload(null)
    setSignature('')
    setError('')
  }

  return (
    <ToolLayout
      category="crypto"
      toolName="JWT Decoder"
      description="Decode & inspect JWT."
    >
      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          JWT Token
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here..."
          className="w-full h-24 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-6">
        <Button variant="primary" onClick={handleDecode}>
          Decode
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {header && (
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">Header</label>
              <CopyButton text={JSON.stringify(header, null, 2)} />
            </div>
            <pre className="bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-sm text-slate-300 font-mono overflow-x-auto">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">Payload</label>
              <CopyButton text={JSON.stringify(payload, null, 2)} />
            </div>
            <pre className="bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-sm text-slate-300 font-mono overflow-x-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">Signature</label>
              <CopyButton text={signature} />
            </div>
            <div className="bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-sm text-slate-400 font-mono break-all">
              {signature}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
