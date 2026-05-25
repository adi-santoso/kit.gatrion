import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import ToolLayout from '../../components/layout/ToolLayout'
import CopyButton from '../../components/ui/CopyButton'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  })

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' })
      return
    }

    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
      sha512: CryptoJS.SHA512(input).toString(),
    })
  }, [input])

  return (
    <ToolLayout
      category="crypto"
      toolName="Hash Generator"
      description="Generate MD5, SHA1, SHA256, SHA512."
    >
      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
        />
      </div>

      {/* Hash Outputs */}
      <div className="space-y-3">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div
            key={algo}
            className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4"
          >
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase w-20">
              {algo}
            </span>
            <div className="flex-1 font-mono text-sm text-slate-600 dark:text-slate-400 break-all">
              {hash || '—'}
            </div>
            {hash && <CopyButton text={hash} />}
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
