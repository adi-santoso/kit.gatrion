import { CheckCircle, XCircle } from 'lucide-react'

export default function StatusBar({ isValid, message, bytes }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/[0.06] rounded-lg text-sm">
      <div className="flex items-center gap-2">
        {isValid ? (
          <>
            <CheckCircle size={16} className="text-green-500 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400">Valid JSON</span>
          </>
        ) : (
          <>
            <XCircle size={16} className="text-red-500 dark:text-red-400" />
            <span className="text-red-600 dark:text-red-400">{message || 'Invalid JSON'}</span>
          </>
        )}
      </div>
      {bytes !== undefined && (
        <span className="text-slate-600 dark:text-slate-400">{bytes} bytes</span>
      )}
    </div>
  )
}
