export function ToolCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-gray-800 mb-3" />
      <div className="h-4 bg-slate-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-full mb-1" />
      <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-2/3" />
    </div>
  )
}

export function ToolGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          className="h-4 bg-slate-200 dark:bg-gray-800 rounded animate-pulse"
          style={{ width: `${100 - (i * 10)}%` }}
        />
      ))}
    </div>
  )
}

export function CodeEditorSkeleton() {
  return (
    <div className="w-full h-64 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 animate-pulse">
      <div className="space-y-3">
        <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-1/4" />
        <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="h-3 bg-slate-200 dark:bg-gray-800 rounded w-2/3" />
      </div>
    </div>
  )
}
