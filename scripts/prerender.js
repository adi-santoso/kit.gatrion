#!/usr/bin/env node
/**
 * Simple pre-rendering script for SEO
 * Generates static HTML files with correct meta tags for major routes
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, '../dist')
const baseUrl = 'https://kit.gatrion.my.id'

// Read tools data
const toolsData = fs.readFileSync(path.join(__dirname, '../src/data/tools.js'), 'utf-8')

// Extract tools array (simple regex parse)
const toolsMatch = toolsData.match(/export const tools = (\[[\s\S]*?\n\])/m)
const categoriesMatch = toolsData.match(/export const categories = (\[[\s\S]*?\n\])/m)

if (!toolsMatch || !categoriesMatch) {
  console.error('Failed to parse tools.js')
  process.exit(1)
}

// Eval to get actual data (safe in build script context)
const tools = eval(toolsMatch[1])
const categories = eval(categoriesMatch[1])

console.log(`📦 Found ${tools.length} tools and ${categories.length} categories`)

// Read the base index.html
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

/**
 * Generate HTML with custom meta tags
 */
function generateHtml(route) {
  let html = baseHtml

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  )

  // Replace description
  html = html.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${route.desc}">`
  )

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?">/,
    `<link rel="canonical" href="${baseUrl}${route.path}">`
  )

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${route.title}">`
  )
  html = html.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${route.desc}">`
  )
  html = html.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${baseUrl}${route.path}">`
  )

  // Replace Twitter title
  html = html.replace(
    /<meta name="twitter:title" content=".*?">/,
    `<meta name="twitter:title" content="${route.title}">`
  )

  return html
}

/**
 * Write HTML file to disk
 */
function writeRoute(route) {
  const html = generateHtml(route)
  const routePath = route.path === '/' ? '/index.html' : `${route.path}/index.html`
  const filePath = path.join(distDir, routePath)

  // Create directory if needed
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, html, 'utf-8')
  console.log(`  ✓ ${route.path}`)
}

console.log('\n🚀 Pre-rendering HTML files...\n')

// Homepage already exists, skip it
console.log('📄 Static pages:')
const staticRoutes = [
  { path: '/all', title: 'All Tools | DevToolkit', desc: '28 developer tools dalam satu tempat. Free, fast, dan 100% client-side.' },
  { path: '/favorites', title: 'Favorites | DevToolkit', desc: 'Tools favorit kamu.' },
  { path: '/about', title: 'About | DevToolkit', desc: 'Tentang DevToolkit - All-in-One Developer Toolkit.' }
]

staticRoutes.forEach(writeRoute)

// Generate category pages
console.log('\n📂 Category pages:')
categories.forEach(cat => {
  const catTools = tools.filter(t => t.category === cat.id)
  writeRoute({
    path: `/${cat.id}`,
    title: `${cat.label} Tools | DevToolkit`,
    desc: `${catTools.length} ${cat.label} tools gratis untuk developer. 100% client-side processing.`
  })
})

// Generate tool pages
console.log('\n🔧 Tool pages:')
tools.forEach(tool => {
  writeRoute({
    path: tool.path,
    title: `${tool.name} | DevToolkit`,
    desc: `${tool.description} — Online tool gratis, 100% client-side processing.`
  })
})

console.log(`\n✅ Pre-rendering complete! Generated ${3 + categories.length + tools.length} HTML files\n`)
