import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, Camera, MapPin, Calendar, Info } from 'lucide-react'
import ToolLayout from '../../components/layout/ToolLayout'
import { readImageFile } from '../../utils/imageResourceValidation'
import exifr from 'exifr'

export default function ImageMetadata() {
  const [image, setImage] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)

    try {
      const { dataUrl, width, height } = await readImageFile(file)
      setImage(dataUrl)
      const basicMeta = {
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + ' KB',
        fileType: file.type,
        width,
        height,
        aspectRatio: (width / height).toFixed(2),
        megapixels: ((width * height) / 1000000).toFixed(2) + ' MP',
        lastModified: new Date(file.lastModified).toLocaleString(),
      }
      extractExif(file, basicMeta)
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  const extractExif = async (file, basicMeta) => {
    try {
      const exifData = await exifr.parse(file, {
        tiff: true,
        exif: true,
        gps: true,
        iptc: true,
        icc: true,
      })

      if (exifData) {
        setMetadata({
          ...basicMeta,
          exif: {
              make: exifData.Make || 'N/A',
              model: exifData.Model || 'N/A',
              software: exifData.Software || 'N/A',
              dateTime: exifData.DateTimeOriginal || exifData.DateTime || 'N/A',
              exposureTime: exifData.ExposureTime ? `1/${Math.round(1/exifData.ExposureTime)}s` : 'N/A',
              fNumber: exifData.FNumber ? `f/${exifData.FNumber}` : 'N/A',
              iso: exifData.ISO || 'N/A',
              focalLength: exifData.FocalLength ? `${exifData.FocalLength}mm` : 'N/A',
              flash: exifData.Flash !== undefined ? (exifData.Flash ? 'Yes' : 'No') : 'N/A',
              orientation: exifData.Orientation || 'N/A',
              whiteBalance: exifData.WhiteBalance || 'N/A',
              latitude: exifData.latitude ? exifData.latitude.toFixed(6) : null,
              longitude: exifData.longitude ? exifData.longitude.toFixed(6) : null,
          }
        })
      } else {
        setMetadata({ ...basicMeta, exif: null })
      }
    } catch (error) {
      console.error('EXIF parsing error:', error)
      setMetadata({ ...basicMeta, exif: null })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout title="Image Metadata Viewer" description="Lihat metadata dan EXIF data dari gambar">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Upload Image</h3>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"><Upload size={18} />Choose Image</button>
          </div>

          {image && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Preview</h3>
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4"><img src={image} alt="Preview" className="max-w-full max-h-64 object-contain" /></div>
            </div>
          )}

          {!metadata && !loading && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div className="flex gap-2"><Info size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-blue-900 dark:text-blue-100"><p className="font-medium mb-1">Tentang EXIF:</p><ul className="space-y-1 text-blue-800 dark:text-blue-200"><li>• EXIF data berisi info kamera dan pengaturan</li><li>• GPS data menunjukkan lokasi foto diambil</li><li>• Tidak semua gambar memiliki EXIF</li><li>• Screenshot biasanya tidak ada EXIF</li></ul></div></div></div>
          )}
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6 text-center"><div className="text-slate-500">Loading metadata...</div></div>
          )}

          {metadata && (
            <>
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4"><Info size={16} className="text-indigo-500" /><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Basic Info</h3></div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">File Name:</span><span className="text-slate-900 dark:text-slate-100 font-mono text-xs">{metadata.fileName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">File Size:</span><span className="text-slate-900 dark:text-slate-100">{metadata.fileSize}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Type:</span><span className="text-slate-900 dark:text-slate-100">{metadata.fileType}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Dimensions:</span><span className="text-slate-900 dark:text-slate-100">{metadata.width} × {metadata.height}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Aspect Ratio:</span><span className="text-slate-900 dark:text-slate-100">{metadata.aspectRatio}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Resolution:</span><span className="text-slate-900 dark:text-slate-100">{metadata.megapixels}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Modified:</span><span className="text-slate-900 dark:text-slate-100 text-xs">{metadata.lastModified}</span></div>
                </div>
              </div>

              {metadata.exif ? (
                <>
                  <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4"><Camera size={16} className="text-indigo-500" /><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Camera Info</h3></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Make:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.make}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Model:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.model}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Software:</span><span className="text-slate-900 dark:text-slate-100 text-xs">{metadata.exif.software}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Date Taken:</span><span className="text-slate-900 dark:text-slate-100 text-xs">{metadata.exif.dateTime}</span></div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4"><Camera size={16} className="text-indigo-500" /><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Camera Settings</h3></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Exposure:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.exposureTime}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Aperture:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.fNumber}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">ISO:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.iso}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Focal Length:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.focalLength}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Flash:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.flash}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">White Balance:</span><span className="text-slate-900 dark:text-slate-100">{metadata.exif.whiteBalance}</span></div>
                    </div>
                  </div>

                  {(metadata.exif.latitude && metadata.exif.longitude) && (
                    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4"><MapPin size={16} className="text-indigo-500" /><h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">GPS Location</h3></div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Latitude:</span><span className="text-slate-900 dark:text-slate-100 font-mono text-xs">{metadata.exif.latitude}</span></div>
                        <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Longitude:</span><span className="text-slate-900 dark:text-slate-100 font-mono text-xs">{metadata.exif.longitude}</span></div>
                        <a href={`https://www.google.com/maps?q=${metadata.exif.latitude},${metadata.exif.longitude}`} target="_blank" rel="noopener noreferrer" className="block w-full mt-3 px-4 py-2 text-center bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">View on Google Maps →</a>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"><div className="flex gap-2"><Info size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-yellow-900 dark:text-yellow-100"><p className="font-medium mb-1">No EXIF Data</p><p className="text-yellow-800 dark:text-yellow-200">Gambar ini tidak memiliki EXIF metadata. Ini normal untuk screenshot atau gambar yang sudah diedit.</p></div></div></div>
              )}
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
