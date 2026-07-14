import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, Download, Grid3x3, Package } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function SpriteSheetSplitter() {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [columns, setColumns] = useState(4)
  const [rows, setRows] = useState(4)
  const [spacing, setSpacing] = useState(0)
  const [padding, setPadding] = useState(0)
  const [frames, setFrames] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [fps, setFps] = useState(12)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [loop, setLoop] = useState(true)
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setImageUrl(event.target.result)
        splitFrames(img, columns, rows, spacing, padding)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const splitFrames = (img, cols, rows, sp, pad) => {
    if (!img) return

    const totalFrames = cols * rows
    const frameWidth = (img.width - (cols - 1) * sp - 2 * pad) / cols
    const frameHeight = (img.height - (rows - 1) * sp - 2 * pad) / rows

    const newFrames = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const canvas = document.createElement('canvas')
        canvas.width = frameWidth
        canvas.height = frameHeight
        const ctx = canvas.getContext('2d')

        const sx = pad + col * (frameWidth + sp)
        const sy = pad + row * (frameHeight + sp)

        ctx.drawImage(img, sx, sy, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight)

        newFrames.push({
          index: row * cols + col,
          dataUrl: canvas.toDataURL('image/png')
        })
      }
    }

    setFrames(newFrames)
    setCurrentFrame(0)
  }

  useEffect(() => {
    if (image) {
      splitFrames(image, columns, rows, spacing, padding)
    }
  }, [columns, rows, spacing, padding, image])

  useEffect(() => {
    if (isPlaying && frames.length > 0) {
      const interval = 1000 / fps
      animationRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= frames.length - 1) {
            if (loop) return 0
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, interval)
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isPlaying, fps, frames.length, loop])

  const downloadFrame = (frame) => {
    const link = document.createElement('a')
    link.href = frame.dataUrl
    link.download = `sprite_frame_${String(frame.index).padStart(3, '0')}.png`
    link.click()
  }

  const downloadAllFrames = async () => {
    // For browser compatibility, download frames sequentially with small delay
    for (const frame of frames) {
      downloadFrame(frame)
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  const resetTool = () => {
    setImage(null)
    setImageUrl(null)
    setFrames([])
    setIsPlaying(false)
    setCurrentFrame(0)
    setColumns(4)
    setRows(4)
    setSpacing(0)
    setPadding(0)
  }

  return (
    <ToolLayout
      title="Sprite Sheet Splitter"
      description="Split sprite sheets into individual frames dengan animation preview."
    >
      <div className="space-y-6">
        {/* Upload Section */}
        {!image ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="sprite-upload"
            />
            <label htmlFor="sprite-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Click to upload sprite sheet
              </p>
              <p className="text-sm text-slate-500">PNG, JPG, WebP up to 10MB</p>
            </label>
          </div>
        ) : (
          <>
            {/* Grid Controls */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Grid3x3 size={16} />
                Grid Settings
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Columns: {columns}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={columns}
                    onChange={(e) => setColumns(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Rows: {rows}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Spacing: {spacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={spacing}
                    onChange={(e) => setSpacing(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Padding: {padding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={padding}
                    onChange={(e) => setPadding(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-white/10">
                Total frames: {frames.length} ({columns} × {rows})
              </div>
            </div>

            {/* Animation Preview */}
            {frames.length > 0 && (
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Play size={16} />
                  Animation Preview
                </h3>

                {/* Preview Canvas */}
                <div className="flex justify-center items-center bg-white dark:bg-gray-900 rounded-lg p-8 border border-slate-200 dark:border-white/10">
                  <div className="relative" style={{ imageRendering: 'pixelated' }}>
                    {frames[currentFrame] && (
                      <img
                        src={frames[currentFrame].dataUrl}
                        alt={`Frame ${currentFrame}`}
                        className="max-w-full h-auto"
                        style={{ maxHeight: '300px', imageRendering: 'pixelated' }}
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Frame {currentFrame + 1}/{frames.length}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        FPS: {fps}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={fps}
                        onChange={(e) => setFps(parseInt(e.target.value))}
                        className="w-32"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={loop}
                        onChange={(e) => setLoop(e.target.checked)}
                        className="rounded"
                      />
                      Loop
                    </label>
                  </div>

                  {/* Frame Scrubber */}
                  <div>
                    <input
                      type="range"
                      min="0"
                      max={frames.length - 1}
                      value={currentFrame}
                      onChange={(e) => {
                        setCurrentFrame(parseInt(e.target.value))
                        setIsPlaying(false)
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Grid Preview */}
            {frames.length > 0 && (
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Grid3x3 size={16} />
                  All Frames
                </h3>

                <div 
                  className="grid gap-2 bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-white/10 max-h-96 overflow-y-auto"
                  style={{ 
                    gridTemplateColumns: `repeat(${Math.min(columns, 8)}, minmax(0, 1fr))`
                  }}
                >
                  {frames.map((frame) => (
                    <button
                      key={frame.index}
                      onClick={() => {
                        setCurrentFrame(frame.index)
                        setIsPlaying(false)
                      }}
                      className={`relative group aspect-square bg-slate-100 dark:bg-gray-800 rounded border-2 transition-all hover:scale-105 ${
                        currentFrame === frame.index
                          ? 'border-blue-500'
                          : 'border-transparent hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <img
                        src={frame.dataUrl}
                        alt={`Frame ${frame.index}`}
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                        {frame.index}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={downloadAllFrames}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
              >
                <Package size={18} />
                Download All Frames ({frames.length})
              </button>
              <button
                onClick={resetTool}
                className="px-4 py-3 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Individual Frame Downloads (optional) */}
            <details className="bg-slate-50 dark:bg-white/5 rounded-xl p-4">
              <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
                Download Individual Frames
              </summary>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {frames.map((frame) => (
                  <button
                    key={frame.index}
                    onClick={() => downloadFrame(frame)}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Download size={14} />
                    Frame {frame.index}
                  </button>
                ))}
              </div>
            </details>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
