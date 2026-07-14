import { useState } from 'react'
import { Upload, X, Plus, Trash2, Download, FolderOpen } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function AssetSizeCalculator() {
  const [assets, setAssets] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    addFiles(files)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }

  const addFiles = (files) => {
    const newAssets = files.map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      size: file.size,
      type: file.type || 'unknown',
      category: categorizeFile(file.name, file.type)
    }))
    setAssets([...assets, ...newAssets])
  }

  const categorizeFile = (name, type) => {
    const ext = name.split('.').pop().toLowerCase()
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return 'Image'
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) return 'Audio'
    if (['mp4', 'webm', 'avi', 'mov'].includes(ext)) return 'Video'
    if (['json', 'xml', 'txt', 'csv', 'yml', 'yaml'].includes(ext)) return 'Data'
    if (['js', 'ts', 'jsx', 'tsx', 'css', 'html'].includes(ext)) return 'Code'
    if (['ttf', 'woff', 'woff2', 'otf', 'eot'].includes(ext)) return 'Font'
    return 'Other'
  }

  const removeAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAssets([])
  }

  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0)

  const groupByCategory = () => {
    const groups = {}
    assets.forEach(asset => {
      if (!groups[asset.category]) {
        groups[asset.category] = { count: 0, size: 0, files: [] }
      }
      groups[asset.category].count++
      groups[asset.category].size += asset.size
      groups[asset.category].files.push(asset)
    })
    return groups
  }

  const categoryGroups = groupByCategory()

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalAssets: assets.length,
      totalSize: totalSize,
      totalSizeFormatted: formatSize(totalSize),
      categories: Object.entries(categoryGroups).map(([cat, data]) => ({
        category: cat,
        count: data.count,
        size: data.size,
        sizeFormatted: formatSize(data.size),
        percentage: ((data.size / totalSize) * 100).toFixed(2) + '%'
      })),
      assets: assets.map(a => ({
        name: a.name,
        category: a.category,
        size: a.size,
        sizeFormatted: formatSize(a.size)
      }))
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `asset-report-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Asset Size Calculator"
      description="Hitung total size game assets dan breakdown per kategori."
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="asset-upload"
          />
          <label htmlFor="asset-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-slate-500">Multiple files supported</p>
          </label>
        </div>

        {/* Summary Stats */}
        {assets.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  Total Assets
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {assets.length}
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                  Total Size
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatSize(totalSize)}
                </div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                  Categories
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {Object.keys(categoryGroups).length}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderOpen size={16} />
                  Breakdown by Category
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Download size={14} />
                    Export JSON
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(categoryGroups).map(([category, data]) => {
                  const percentage = ((data.size / totalSize) * 100).toFixed(1)
                  return (
                    <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {category}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({data.count} file{data.count > 1 ? 's' : ''})
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {formatSize(data.size)}
                          </span>
                          <span className="text-sm text-slate-500">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Asset List */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                All Assets ({assets.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-slate-200 dark:border-white/10"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        {asset.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {asset.category} • {formatSize(asset.size)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeAsset(asset.id)}
                      className="ml-3 p-1.5 hover:bg-red-500/10 text-red-500 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
