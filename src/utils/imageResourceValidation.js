export const MAX_FILE_SIZE = 10 * 1024 * 1024
export const MAX_IMAGE_PIXELS = 40_000_000
export const MAX_CANVAS_DIMENSION = 8192
export const MAX_ATLAS_DIMENSION = 4096
export const MAX_ATLAS_FILES = 100
export const MAX_SPRITE_FRAMES = 100

export function validateResourceFile(file, { image = false } = {}) {
  if (!file) throw new Error('No file selected.')
  if (file.size > MAX_FILE_SIZE) throw new Error(`${file.name} exceeds the 10 MiB file limit.`)
  if (image && !file.type.startsWith('image/')) throw new Error(`${file.name} is not an image MIME type.`)
}

export function validateCanvasDimensions(width, height, maxDimension = MAX_CANVAS_DIMENSION, label = 'Canvas') {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error(`${label} dimensions must be positive numbers.`)
  }
  if (width > maxDimension || height > maxDimension) {
    throw new Error(`${label} dimensions cannot exceed ${maxDimension}x${maxDimension}.`)
  }
}

export function readImageFile(file, { maxDimension } = {}) {
  validateResourceFile(file, { image: true })

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`))
    reader.onabort = () => reject(new Error(`Reading ${file.name} was cancelled.`))
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error(`Failed to read ${file.name}.`))
        return
      }

      const image = new Image()
      image.onerror = () => reject(new Error(`${file.name} could not be decoded as an image.`))
      image.onload = () => {
        const width = image.naturalWidth || image.width
        const height = image.naturalHeight || image.height
        if (!width || !height) {
          reject(new Error(`${file.name} has invalid image dimensions.`))
          return
        }
        if (width * height > MAX_IMAGE_PIXELS) {
          reject(new Error(`${file.name} exceeds the 40 megapixel image limit.`))
          return
        }
        try {
          if (maxDimension) validateCanvasDimensions(width, height, maxDimension, file.name)
          resolve({ dataUrl: reader.result, image, width, height })
        } catch (error) {
          reject(error)
        }
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
