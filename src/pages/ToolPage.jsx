import { useParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { tools, categories } from '../data/tools'
import SEO from '../components/SEO'
import { ToolSchema, BreadcrumbSchema } from '../components/StructuredData'

const toolComponents = {
  'json-prettier': lazy(() => import('../tools/json/JsonPrettier')),
  'json-compare': lazy(() => import('../tools/json/JsonCompare')),
  'json-to-csv': lazy(() => import('../tools/json/JsonToCsv')),
  'json-to-yaml': lazy(() => import('../tools/json/JsonToYaml')),
  'json-validator': lazy(() => import('../tools/json/JsonValidator')),
  'hash-generator': lazy(() => import('../tools/crypto/HashGenerator')),
  'uuid-generator': lazy(() => import('../tools/crypto/UuidGenerator')),
  'jwt-decoder': lazy(() => import('../tools/crypto/JwtDecoder')),
  'password-generator': lazy(() => import('../tools/crypto/PasswordGenerator')),
  'base64': lazy(() => import('../tools/text/Base64Tool')),
  'url-encoder': lazy(() => import('../tools/text/UrlEncoder')),
  'diff-checker': lazy(() => import('../tools/text/DiffChecker')),
  'markdown-preview': lazy(() => import('../tools/text/MarkdownPreview')),
  'word-counter': lazy(() => import('../tools/text/WordCounter')),
  'string-case': lazy(() => import('../tools/text/StringCase')),
  'lorem-ipsum': lazy(() => import('../tools/text/LoremIpsum')),
  'gradient-generator': lazy(() => import('../tools/css/GradientGenerator')),
  'box-shadow': lazy(() => import('../tools/css/BoxShadowGenerator')),
  'color-converter': lazy(() => import('../tools/css/ColorConverter')),
  'border-radius': lazy(() => import('../tools/css/BorderRadius')),
  'html-formatter': lazy(() => import('../tools/formatter/HtmlFormatter')),
  'js-minifier': lazy(() => import('../tools/formatter/JsMinifier')),
  'regex-tester': lazy(() => import('../tools/formatter/RegexTester')),
  'image-compressor': lazy(() => import('../tools/image/ImageCompressor')),
  'qr-code-generator': lazy(() => import('../tools/image/QRCodeGenerator')),
  'image-to-base64': lazy(() => import('../tools/image/ImageToBase64')),
  'image-format-converter': lazy(() => import('../tools/image/ImageFormatConverter')),
  'image-resizer': lazy(() => import('../tools/image/ImageResizer')),
  'image-filter': lazy(() => import('../tools/image/ImageFilter')),
  'image-metadata': lazy(() => import('../tools/image/ImageMetadata')),
  'color-picker': lazy(() => import('../tools/image/ColorPicker')),
  'barcode-generator': lazy(() => import('../tools/image/BarcodeGenerator')),
  'sprite-sheet-splitter': lazy(() => import('../tools/gamedev/SpriteSheetSplitter')),
  'asset-size-calculator': lazy(() => import('../tools/gamedev/AssetSizeCalculator')),
  'pixel-art-palette': lazy(() => import('../tools/gamedev/PixelArtPalette')),
  'sprite-animation-preview': lazy(() => import('../tools/gamedev/SpriteAnimationPreview')),
  'texture-atlas-generator': lazy(() => import('../tools/gamedev/TextureAtlasGenerator')),
  'tilemap-editor': lazy(() => import('../tools/gamedev/TilemapEditor')),
}

export default function ToolPage() {
  const { category, toolId } = useParams()
  const tool = tools.find(t => t.path === `/${category}/${toolId}`)

  if (!tool) {
    return (
      <div className="dt-page">
        <div className="dt-panel dt-hard-shadow py-16 text-center">
          <div className="dt-eyebrow mb-4 justify-center">Error / 404</div>
          <h2 className="dt-page-heading mb-3">Tool not found</h2>
          <p className="dt-page-copy">The instrument you requested does not exist.</p>
        </div>
      </div>
    )
  }

  const ToolComponent = toolComponents[tool.id]
  const categoryData = categories.find(c => c.id === tool.category)

  const breadcrumbItems = [
    { name: 'Home', url: 'https://kit.gatrion.my.id' },
    { name: categoryData?.label || tool.category, url: `https://kit.gatrion.my.id/${tool.category}` },
    { name: tool.name, url: `https://kit.gatrion.my.id${tool.path}` }
  ]

  if (!ToolComponent) {
    return (
      <div className="dt-page">
        <div className="dt-panel dt-hard-shadow py-16 text-center">
          <div className="dt-eyebrow mb-4 justify-center">Instrument / pending</div>
          <h2 className="dt-page-heading mb-3">{tool.name}</h2>
          <p className="dt-page-copy">{tool.description}</p>
          <p className="mt-4 font-mono text-[10px] uppercase text-[var(--dt-coral)]">Implementation coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${tool.name} | DevToolkit`}
        description={`${tool.description} — Online tool gratis, 100% client-side processing.`}
        canonical={`https://kit.gatrion.my.id${tool.path}`}
      />
      <ToolSchema tool={tool} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Suspense fallback={
        <div className="dt-page flex h-64 items-center justify-center">
          <div className="dt-panel flex items-center gap-3 px-5 py-4 font-mono text-[10px] uppercase tracking-wider shadow-[3px_3px_0_var(--dt-line)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--dt-acid)] ring-1 ring-[var(--dt-line)]" />Loading instrument
          </div>
        </div>
      }>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ToolComponent />
        </motion.div>
      </Suspense>
    </>
  )
}
