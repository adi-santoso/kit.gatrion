import { useState, useRef, useEffect } from 'react'
import { Upload, Grid3x3, Save, Trash2, Download, Move, Eraser, Paintbrush } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { readImageFile } from '../../utils/imageResourceValidation'

export default function TilemapEditor() {
  const [tileset, setTileset] = useState(null)
  const [tilesetUrl, setTilesetUrl] = useState(null)
  const [tileSize, setTileSize] = useState(16)
  const [gridWidth, setGridWidth] = useState(20)
  const [gridHeight, setGridHeight] = useState(15)
  const [tiles, setTiles] = useState([])
  const [selectedTile, setSelectedTile] = useState(null)
  const [map, setMap] = useState({})
  const [tool, setTool] = useState('paint') // paint, erase, fill
  const [showGrid, setShowGrid] = useState(true)
  const canvasRef = useRef(null)
  const tilesetCanvasRef = useRef(null)

  const handleTilesetUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const { dataUrl, image } = await readImageFile(file)
      setTileset(image)
      setTilesetUrl(dataUrl)
      extractTiles(image)
    } catch (error) {
      alert(error.message)
    }
  }

  const extractTiles = (img) => {
    const cols = Math.floor(img.width / tileSize)
    const rows = Math.floor(img.height / tileSize)
    
    const extractedTiles = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const canvas = document.createElement('canvas')
        canvas.width = tileSize
        canvas.height = tileSize
        const ctx = canvas.getContext('2d')
        
        ctx.drawImage(
          img,
          col * tileSize, row * tileSize, tileSize, tileSize,
          0, 0, tileSize, tileSize
        )
        
        extractedTiles.push({
          id: row * cols + col,
          dataUrl: canvas.toDataURL('image/png')
        })
      }
    }
    
    setTiles(extractedTiles)
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = gridWidth * tileSize
    canvas.height = gridHeight * tileSize

    // Clear
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw tiles
    Object.entries(map).forEach(([key, tileId]) => {
      const [x, y] = key.split(',').map(Number)
      const tile = tiles.find(t => t.id === tileId)
      if (tile) {
        const img = new Image()
        img.src = tile.dataUrl
        img.onload = () => {
          ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize)
        }
      }
    })

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      for (let x = 0; x <= gridWidth; x++) {
        ctx.beginPath()
        ctx.moveTo(x * tileSize, 0)
        ctx.lineTo(x * tileSize, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= gridHeight; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * tileSize)
        ctx.lineTo(canvas.width, y * tileSize)
        ctx.stroke()
      }
    }
  }

  useEffect(() => {
    if (tiles.length > 0) {
      drawCanvas()
    }
  }, [map, tiles, gridWidth, gridHeight, showGrid])

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / tileSize)
    const y = Math.floor((e.clientY - rect.top) / tileSize)
    const key = `${x},${y}`

    if (tool === 'paint' && selectedTile !== null) {
      setMap(prev => ({ ...prev, [key]: selectedTile }))
    } else if (tool === 'erase') {
      setMap(prev => {
        const newMap = { ...prev }
        delete newMap[key]
        return newMap
      })
    } else if (tool === 'fill' && selectedTile !== null) {
      // Simple flood fill (fill all empty cells)
      const newMap = { ...map }
      for (let fy = 0; fy < gridHeight; fy++) {
        for (let fx = 0; fx < gridWidth; fx++) {
          const fkey = `${fx},${fy}`
          if (!newMap[fkey]) {
            newMap[fkey] = selectedTile
          }
        }
      }
      setMap(newMap)
    }
  }

  const exportMap = () => {
    const mapData = {
      width: gridWidth,
      height: gridHeight,
      tileSize: tileSize,
      layers: [{
        name: 'layer1',
        data: []
      }]
    }

    // Convert map object to 2D array
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const key = `${x},${y}`
        mapData.layers[0].data.push(map[key] ?? -1)
      }
    }

    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tilemap-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tilemap-${Date.now()}.png`
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  const clearMap = () => {
    setMap({})
  }

  return (
    <ToolLayout
      title="Tilemap Editor"
      description="Simple grid editor untuk level design dengan tileset."
    >
      <div className="space-y-6">
        {/* Upload Tileset */}
        {!tileset ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleTilesetUpload}
              className="hidden"
              id="tileset-upload"
            />
            <label htmlFor="tileset-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Upload tileset image
              </p>
              <p className="text-sm text-slate-500">Grid-based tileset PNG (16x16, 32x32, etc)</p>
            </label>
          </div>
        ) : (
          <>
            {/* Settings */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Grid3x3 size={16} />
                Grid Settings
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tile Size
                  </label>
                  <select
                    value={tileSize}
                    onChange={(e) => setTileSize(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 rounded-lg text-sm"
                  >
                    <option value="8">8x8</option>
                    <option value="16">16x16</option>
                    <option value="32">32x32</option>
                    <option value="64">64x64</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Width: {gridWidth}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={gridWidth}
                    onChange={(e) => setGridWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Height: {gridHeight}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={gridHeight}
                    onChange={(e) => setGridHeight(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="rounded"
                    />
                    Show Grid
                  </label>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Tools
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTool('paint')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    tool === 'paint'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Paintbrush size={16} />
                  Paint
                </button>
                <button
                  onClick={() => setTool('erase')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    tool === 'erase'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Eraser size={16} />
                  Erase
                </button>
                <button
                  onClick={clearMap}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors ml-auto"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
                <button
                  onClick={exportMap}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export JSON
                </button>
                <button
                  onClick={exportImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export PNG
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Tileset Palette */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 sticky top-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Tileset ({tiles.length} tiles)
                  </h3>
                  <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg p-2 border border-slate-200 dark:border-white/10">
                    {tiles.map((tile) => (
                      <button
                        key={tile.id}
                        onClick={() => {
                          setSelectedTile(tile.id)
                          setTool('paint')
                        }}
                        className={`aspect-square border-2 rounded transition-all hover:scale-110 ${
                          selectedTile === tile.id
                            ? 'border-blue-500 ring-2 ring-blue-500/50'
                            : 'border-transparent hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <img
                          src={tile.dataUrl}
                          alt={`Tile ${tile.id}`}
                          className="w-full h-full"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div className="lg:col-span-3">
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Map Editor ({gridWidth} × {gridHeight})
                  </h3>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-white/10 overflow-auto">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="cursor-crosshair"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
