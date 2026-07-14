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
  'timestamp': lazy(() => import('../tools/misc/TimestampConverter')),
  'number-base': lazy(() => import('../tools/misc/NumberBase')),
  'html-entities': lazy(() => import('../tools/misc/HtmlEntities')),
  'css-minifier': lazy(() => import('../tools/misc/CssMinifier')),
}

export default function ToolPage() {
  const { category, toolId } = useParams()
  const tool = tools.find(t => t.path === `/${category}/${toolId}`)

  if (!tool) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Tool Not Found</h2>
          <p className="text-slate-400">The tool you're looking for doesn't exist.</p>
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
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">{tool.name}</h2>
          <p className="text-slate-400">{tool.description}</p>
          <p className="text-sm text-slate-500 mt-4">Tool implementation coming soon...</p>
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
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-slate-400">Loading...</div>
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
