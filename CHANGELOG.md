# Changelog

All notable changes to DevToolkit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-25

### Added

#### Core Features
- Initial release of DevToolkit
- 28 developer tools across 6 categories
- Dark/Light theme support with persistent storage
- Global search with `Ctrl+K` keyboard shortcut
- Favorites system with star/unstar functionality
- About page with project information

#### JSON Tools (5)
- JSON Prettier - Format & beautify JSON with syntax highlighting
- JSON Compare - Side-by-side JSON diff with color coding
- JSON to CSV - Convert array of objects to CSV format
- JSON ↔ YAML - Bidirectional JSON/YAML conversion
- JSON Validator - Real-time JSON validation with error messages

#### Text & String Tools (7)
- Base64 Tool - Encode/decode Base64
- URL Encoder - Encode/decode URLs and query strings
- Diff Checker - Line-by-line text comparison
- Markdown Preview - Live Markdown to HTML preview
- Word Counter - Count words, characters, sentences, paragraphs
- String Case Converter - Convert between camelCase, snake_case, PascalCase, etc.
- Lorem Ipsum Generator - Generate placeholder text

#### Crypto & Security Tools (4)
- Hash Generator - Generate MD5, SHA1, SHA256, SHA512 hashes
- UUID Generator - Generate UUID v4 with bulk generation
- JWT Decoder - Decode and inspect JWT tokens
- Password Generator - Generate secure passwords with custom options

#### CSS & Design Tools (4)
- CSS Gradient Generator - Visual gradient builder with live preview
- Box Shadow Generator - Interactive box-shadow builder
- Color Converter - Convert between HEX, RGB, and HSL
- Border Radius Preview - Visual border-radius builder

#### Formatter Tools (3)
- HTML Formatter - Beautify/minify HTML
- JS Minifier - Minify JavaScript code
- Regex Tester - Test regex patterns with real-time highlighting

#### Misc / Utilities (5)
- Timestamp Converter - Convert Unix timestamp to human-readable format
- Number Base Converter - Convert between Binary, Octal, Decimal, Hex
- HTML Entities - Encode/decode HTML entities
- CSS Minifier - Minify CSS code

#### Technical Features
- 100% client-side processing (no data sent to server)
- Code splitting with React.lazy() for optimal performance
- Persistent state management with Zustand
- CodeMirror 6 integration for code editing
- Framer Motion animations
- Responsive design (desktop-first)
- SEO-optimized meta tags

### Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- Zustand (state management)
- React Router v6
- CodeMirror 6
- Lucide React (icons)
- Framer Motion (animations)
- crypto-js, diff, marked, DOMPurify, js-yaml

### Security
- All processing happens in browser
- No analytics or tracking
- No data collection
- Privacy-first approach

---

[0.1.0]: https://github.com/adi-santoso/kit.gatrion/releases/tag/v0.1.0
