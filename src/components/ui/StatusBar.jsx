import { CheckCircle, XCircle } from 'lucide-react'

export default function StatusBar({ isValid, message, bytes }) {
  return (
    <div
      className="dt-status-bar flex flex-wrap items-center justify-between gap-2 rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-paper)] px-4 py-2.5 text-xs text-[var(--dt-ink)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex min-w-0 items-center gap-2">
        {isValid ? (
          <>
            <CheckCircle size={16} className="shrink-0 text-[var(--dt-acid)]" />
            <span className="font-bold">Valid JSON</span>
          </>
        ) : (
          <>
            <XCircle size={16} className="shrink-0 text-[var(--dt-coral)]" />
            <span className="break-words font-bold text-[var(--dt-coral)]">{message || 'Invalid JSON'}</span>
          </>
        )}
      </div>
      {bytes !== undefined && (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--dt-muted)]">{bytes} bytes</span>
      )}
    </div>
  )
}
