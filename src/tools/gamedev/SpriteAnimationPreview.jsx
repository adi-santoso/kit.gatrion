import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, X, Download, Plus } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'

export default function SpriteAnimationPreview() {
  const [frames, setFrames] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [fps, setFps] = useState(12)
  const [loop, setLoop] = useState(true)
  const [scale, setScale] = useState(2)
  const animationRef = useRef(null)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    addFrames(files)
  }

  const addFrames = (files) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'))
    
    imageFiles.forEach((file, idx) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFrames(prev => [...prev, {
          id: Date.now() + idx,
          name: file.name,
          dataUrl: event.target.result
        }])
      }
      reader.readAsDataURL(file)
    })
  }

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

  const removeFrame = (id) => {
    setFrames(frames.filter(f => f.id !== id))
    if (currentFrame >= frames.length - 1) {
      setCurrentFrame(Math.max(0, frames.length - 2))
    }
  }

  const moveFrame = (index, direction) => {
    const newFrames = [...frames]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= frames.length) return
    
    [newFrames[index], newFrames[targetIndex]] = [newFrames[targetIndex], newFrames[index]]
    setFrames(newFrames)
    
    if (currentFrame === index) setCurrentFrame(targetIndex)
    else if (currentFrame === targetIndex) setCurrentFrame(index)
  }

  const exportAsGif = () => {
    alert('GIF export requires additional library (e.g., gif.js). For now, use screen recording or external tools.')
  }

  const downloadAllFrames = async () => {
    for (let i = 0; i < frames.length; i++) {
      const link = document.createElement('a')
      link.href = frames[i].dataUrl
      link.download = `frame_${String(i).padStart(3, '0')}.png`
      link.click()
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  return (
    <ToolLayout
      title="Sprite Animation Preview"
      description="Upload multiple frames → preview sebagai animasi dengan playback control."
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="frames-upload"
          />
          <label htmlFor="frames-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Upload animation frames
            </p>
            <p className="text-sm text-slate-500">Select multiple images (frames will be ordered by filename)</p>
          </label>
        </div>

        {frames.length > 0 && (
          <>
            {/* Animation Preview */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Play size={16} />
                Animation Preview
              </h3>

              {/* Canvas */}
              <div className="flex justify-center items-center bg-white dark:bg-gray-900 rounded-lg p-8 border border-slate-200 dark:border-white/10 min-h-[300px]">
                <div className="relative" style={{ imageRendering: 'pixelated' }}>
                  {frames[currentFrame] && (
                    <img
                      src={frames[currentFrame].dataUrl}
                      alt={`Frame ${currentFrame}`}
                      style={{
                        imageRendering: 'pixelated',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center'
                      }}
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Frame {currentFrame + 1}/{frames.length}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
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

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Scale: {scale}x
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={scale}
                      onChange={(e) => setScale(parseInt(e.target.value))}
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

            {/* Frame List */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Frames ({frames.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={downloadAllFrames}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Download size={14} />
                    Download All
                  </button>
                  <label htmlFor="frames-upload" className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors">
                    <Plus size={14} />
                    Add More
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {frames.map((frame, index) => (
                  <div
                    key={frame.id}
                    className={`relative group bg-white dark:bg-gray-800 rounded-lg border-2 overflow-hidden transition-all ${
                      currentFrame === index
                        ? 'border-blue-500 ring-2 ring-blue-500/50'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setCurrentFrame(index)
                        setIsPlaying(false)
                      }}
                      className="w-full aspect-square p-2"
                    >
                      <img
                        src={frame.dataUrl}
                        alt={`Frame ${index}`}
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </button>
                    
                    {/* Frame controls */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                      {index > 0 && (
                        <button
                          onClick={() => moveFrame(index, -1)}
                          className="p-1 bg-blue-500 text-white rounded text-xs"
                          title="Move left"
                        >
                          ←
                        </button>
                      )}
                      <button
                        onClick={() => removeFrame(frame.id)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <X size={12} />
                      </button>
                      {index < frames.length - 1 && (
                        <button
                          onClick={() => moveFrame(index, 1)}
                          className="p-1 bg-blue-500 text-white rounded text-xs"
                          title="Move right"
                        >
                          →
                        </button>
                      )}
                    </div>
                    
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                      {index}
                    </div>
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
