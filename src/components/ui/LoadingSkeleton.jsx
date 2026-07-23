export function ToolCardSkeleton() {
  return (
    <div className="dt-tool-card animate-pulse">
      <div className="mb-auto h-10 w-10 rounded-full bg-[color-mix(in_srgb,var(--dt-ink)_20%,transparent)]" />
      <div className="mb-2 mt-8 h-4 w-3/4 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_20%,transparent)]" />
      <div className="mb-1 h-3 w-full rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_12%,transparent)]" />
      <div className="h-3 w-2/3 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_12%,transparent)]" />
    </div>
  )
}

export function ToolGridSkeleton({ count = 8 }) {
  return (
    <div className="dt-tool-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_16%,transparent)]"
          style={{ width: `${100 - (i * 10)}%` }}
        />
      ))}
    </div>
  )
}

export function CodeEditorSkeleton() {
  return (
    <div className="dt-panel h-64 w-full animate-pulse p-4">
      <div className="space-y-3">
        <div className="h-3 w-1/4 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_16%,transparent)]" />
        <div className="h-3 w-3/4 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_16%,transparent)]" />
        <div className="h-3 w-1/2 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_16%,transparent)]" />
        <div className="h-3 w-2/3 rounded-[2px] bg-[color-mix(in_srgb,var(--dt-ink)_16%,transparent)]" />
      </div>
    </div>
  )
}
