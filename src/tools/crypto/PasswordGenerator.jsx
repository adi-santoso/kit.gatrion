import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    }

    let charset = ''
    Object.keys(options).forEach(key => {
      if (options[key]) charset += chars[key]
    })

    if (!charset) {
      alert('Please select at least one character type')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }

  return (
    <ToolLayout
      category="crypto"
      toolName="Password Generator"
      description="Generate password dengan konfigurasi kekuatan."
    >
      {/* Length */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Length: {length}
        </label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Options */}
      <div className="mb-6 space-y-2">
        {Object.keys(options).map(key => (
          <label key={key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="capitalize">{key}</span>
          </label>
        ))}
      </div>

      {/* Generate Button */}
      <Button variant="primary" onClick={generatePassword} className="mb-4">
        Generate Password
      </Button>

      {/* Output */}
      {password && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Generated Password</label>
            <CopyButton text={password} />
          </div>
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-lg text-slate-900 dark:text-slate-100 font-mono break-all">
            {password}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
