# DevToolkit — System Design Document

> Rancangan lengkap web app kumpulan tools untuk developer, dibangun dengan React + Tailwind CSS.
> Visual direction mengacu pada mockup final: modern SaaS dashboard, terinspirasi Linear, Raycast, Vercel, GitHub, dan modern IDE.
> Sub-aplikasi dari ekosistem **gatrion.my.id** — live di `kit.gatrion.my.id`.

---

## 1. Visi & Tujuan

**DevToolkit** adalah web app yang menyediakan kumpulan tools produktivitas untuk developer sehari-hari. Semua pemrosesan dilakukan di sisi client (browser) — tidak ada data yang dikirim ke server. Aman, cepat, dan privat.

DevToolkit merupakan **sub-aplikasi independen** dari ekosistem [gatrion.my.id](https://gatrion.my.id). Branding tetap "DevToolkit" namun berada di bawah domain gatrion sebagai bagian dari portofolio/ekosistem produk.

**Tagline:** *"All-in-One Toolkit for Developers"*

**URL Produksi:** `https://kit.gatrion.my.id`

**Parent Site:** `https://gatrion.my.id`

**Target pengguna:** Frontend dev, backend dev, fullstack dev, DevOps.

---

## 2. Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| State Management | Zustand |
| Routing | React Router v6 |
| Code Editor | CodeMirror 6 |
| Icons | Lucide React |
| Diff Engine | `diff` (pure JS) |
| Hash | `crypto-js` |
| Markdown | `marked` + `DOMPurify` |
| Animation | Framer Motion |
| Theme | Tailwind `class` strategy + CSS Variables |
| Font | Inter / Geist (UI), JetBrains Mono (editor) |
| Deployment | Vercel / Netlify (custom domain) |
| Domain | `kit.gatrion.my.id` |
| DNS Setup | CNAME `kit` → Vercel/Netlify deployment target |

---

## 3. Arsitektur Folder

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx           # Fixed sidebar 260px, VSCode+Linear hybrid
│   │   ├── Header.jsx            # Sticky top bar: search + theme toggle
│   │   └── ToolLayout.jsx        # Wrapper: breadcrumb + tool content
│   └── ui/
│       ├── Button.jsx
│       ├── CodeEditor.jsx        # CodeMirror wrapper dengan syntax highlight
│       ├── CopyButton.jsx        # Copy to clipboard dengan toast feedback
│       ├── Badge.jsx
│       ├── StatusBar.jsx         # Valid/error indicator di bawah editor
│       └── Tooltip.jsx
├── pages/
│   ├── Dashboard.jsx             # Home: hero + popular tools grid
│   └── ToolPage.jsx              # Wrapper page per tool dengan breadcrumb
├── tools/
│   ├── json/
│   │   ├── JsonPrettier.jsx      # Dual panel: input | output + format/minify
│   │   ├── JsonCompare.jsx       # Side-by-side + diff result (added/removed/modified)
│   │   ├── JsonToCsv.jsx
│   │   └── JsonToYaml.jsx
│   ├── text/
│   │   ├── Base64Tool.jsx
│   │   ├── UrlEncoder.jsx
│   │   ├── DiffChecker.jsx
│   │   ├── MarkdownPreview.jsx
│   │   ├── WordCounter.jsx
│   │   ├── StringCase.jsx
│   │   └── LoremIpsum.jsx
│   ├── crypto/
│   │   ├── HashGenerator.jsx     # Textarea input + output cards MD5/SHA1/SHA256/SHA512
│   │   ├── UuidGenerator.jsx
│   │   ├── JwtDecoder.jsx
│   │   └── PasswordGenerator.jsx
│   ├── css/
│   │   ├── GradientGenerator.jsx # Preview box + color stops + linear/radial toggle + CSS output
│   │   ├── BoxShadowGenerator.jsx
│   │   └── ColorConverter.jsx
│   ├── formatter/
│   │   ├── HtmlFormatter.jsx
│   │   ├── JsMinifier.jsx
│   │   └── CssMinifier.jsx
│   └── misc/
│       ├── TimestampConverter.jsx
│       ├── RegexTester.jsx
│       ├── NumberBase.jsx
│       └── HtmlEntities.jsx
├── store/
│   ├── themeStore.js
│   ├── favoritesStore.js
│   └── recentStore.js
├── hooks/
│   ├── useCopyToClipboard.js
│   └── useLocalStorage.js
├── utils/
│   ├── json.utils.js
│   ├── text.utils.js
│   └── hash.utils.js
├── data/
│   └── tools.js                  # Registry semua tools (metadata terpusat)
├── App.jsx
└── main.jsx
```

---

## 4. Daftar Tools Lengkap

### 🗂️ JSON (5 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| json-prettier | JSON Prettier | Format & beautify JSON, syntax highlight, validasi |
| json-compare | JSON Compare | Diff dua JSON — added/removed/modified per baris |
| json-to-csv | JSON → CSV | Konversi array of objects ke CSV |
| json-to-yaml | JSON ↔ YAML | Konversi dua arah JSON dan YAML |
| json-validator | JSON Validator | Validasi JSON dengan pesan error yang informatif |

### 📝 Text & String (7 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| base64 | Base64 Encode/Decode | Encode/decode ke Base64 |
| url-encoder | URL Encode/Decode | Encode/decode URL dan query string |
| diff-checker | Diff Checker | Bandingkan dua teks baris per baris |
| markdown-preview | Markdown Preview | Live preview Markdown ke HTML |
| word-counter | Word Counter | Hitung kata, karakter, kalimat, paragraf |
| string-case | String Case Converter | camelCase, snake_case, PascalCase, kebab-case |
| lorem-ipsum | Lorem Ipsum Generator | Generate placeholder text |

### 🔐 Crypto & Security (4 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| hash-generator | Hash Generator | MD5, SHA1, SHA256, SHA512 — copy per baris |
| uuid-generator | UUID Generator | Generate UUID v4, v1, ULID |
| jwt-decoder | JWT Decoder | Decode header + payload + signature JWT |
| password-generator | Password Generator | Generate password dengan konfigurasi kekuatan |

### 🎨 CSS & Design (4 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| gradient-generator | CSS Gradient Generator | Preview box + color stops + linear/radial + CSS output |
| box-shadow | Box Shadow Generator | Visual builder CSS box-shadow |
| color-converter | Color Converter | HEX ↔ RGB ↔ HSL ↔ HSB |
| border-radius | Border Radius Preview | Slider visual preview border-radius |

### ⚙️ Formatter (3 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| html-formatter | HTML Formatter | Beautify / minify HTML |
| js-minifier | JS Minifier | Minify JavaScript |
| regex-tester | Regex Tester | Test regex dengan highlight match real-time |

### 🕐 Misc / Utilities (4 tools)
| ID | Nama | Deskripsi |
|---|---|---|
| timestamp | Timestamp Converter | Unix ↔ human-readable datetime |
| number-base | Number Base Converter | Binary, Octal, Decimal, Hex |
| html-entities | HTML Entities | Encode/decode HTML entities |
| css-minifier | CSS Minifier | Minify CSS code |

**Total: 27 tools**

---

## 5. Desain UI/UX

### 5.1 Layout Utama

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky): Logo | Search "Ctrl+K" | Theme Toggle     │
├──────────────────────┬──────────────────────────────────────┤
│                      │                                      │
│  SIDEBAR (260px)     │   MAIN CONTENT                       │
│  fixed               │                                      │
│  ─────────────────   │   Dashboard:                         │
│  Logo: DevToolkit    │     Hero section (heading + illus.)  │
│  ─────────────────   │     Popular Tools grid (2x4 cards)   │
│  • Dashboard ←active │                                      │
│                      │   Tool Page:                         │
│  KATEGORI            │     Breadcrumb: Dashboard > Cat > Tool│
│  • JSON              │     Tool title + description         │
│  • Text & String     │     Tool-specific panel layout       │
│  • Crypto & Security │                                      │
│  • CSS & Design      │                                      │
│  • Formatter         │                                      │
│  • Misc / Utilities  │                                      │
│  ─────────────────   │                                      │
│  ☆ Favorites         │                                      │
│  ⓘ About             │                                      │
│  ─────────────────   │                                      │
│  [App info card]     │                                      │
│  DevToolkit v1.0.0   │                                      │
│  100% client-side    │                                      │
└──────────────────────┴──────────────────────────────────────┘
```

### 5.2 Color System

#### Dark Mode (default)
| Token | Nilai |
|---|---|
| Background | `#0b1020` / `#0f172a` |
| Surface / Card | `#111827` / `#1e293b` |
| Border | `rgba(255,255,255,0.06)` |
| Primary Accent | `#3b82f6` (blue-500) |
| Secondary Accent | `#8b5cf6` (violet-500) |
| Success | `#22c55e` (green-500) |
| Text Primary | `#f8fafc` |
| Text Secondary | `#94a3b8` |
| Sidebar active glow | `rgba(59,130,246,0.15)` bg + `#3b82f6` left border |

#### Light Mode
| Token | Nilai |
|---|---|
| Background | `#f8fafc` |
| Surface / Card | `#ffffff` |
| Border | `#e2e8f0` |
| Primary Accent | `#2563eb` (blue-600) |
| Secondary Accent | `#7c3aed` (violet-600) |
| Text Primary | `#0f172a` |
| Text Secondary | `#64748b` |

### 5.3 Typography
- **UI Font**: `Inter` atau `Geist` — clean, modern, SaaS feel
- **Code/Editor Font**: `JetBrains Mono` — semua code area, line numbers, hash output
- **Title hierarchy**: `text-3xl font-bold` (hero), `text-2xl font-semibold` (tool title), `text-sm font-medium` (label)

### 5.4 Visual Style
- Rounded corners: `rounded-xl` / `rounded-2xl` untuk card dan panel
- Soft shadows: `shadow-sm` di light, subtle glow di dark
- Glassmorphism-lite: `backdrop-blur-sm` pada header/sidebar
- Subtle gradients pada accent elements (bukan background dominan)
- Thin borders everywhere: `border border-white/[0.06]` (dark) / `border border-slate-200` (light)
- Hover: `scale-[1.02]` smooth transition pada tool cards
- Active sidebar item: bg biru transparan + left border biru

### 5.5 Layout per Tool

#### JSON Prettier
```
[Clear]  [Minify]  [Copy Output] ← action buttons di kanan atas
┌──────────────────┐  ┌──────────────────┐
│  Input JSON      │  │  Formatted JSON  │
│                  │  │                  │
│  (CodeMirror)    │  │  (CodeMirror     │
│  editable        │  │   read-only,     │
│                  │  │   syntax color)  │
│                  │  │                  │
├──────────────────┤  └──────────────────┘
│ ✓ Valid JSON · 105 bytes              │
└───────────────────────────────────────┘
```

#### JSON Compare
```
[Clear]  [Compare] ← di kanan atas
┌──────────────────┐  ┌──────────────────┐
│  JSON A          │  │  JSON B          │
│  (editable)  [□↗]│  │  (editable)  [□↗]│
└──────────────────┘  └──────────────────┘

Diff Result:
  Legend: [🟢 Added] [🔴 Removed] [🟡 Modified]
┌──────────────────────────────────────────────┐
│  Line-by-line diff dengan color highlight    │
│  green bg = added, red bg = removed          │
└──────────────────────────────────────────────┘
```

#### Hash Generator
```
Input Text:
┌─────────────────────────────────────┐
│  (textarea)                         │
└─────────────────────────────────────┘

MD5    [hash value monospace........] [copy]
SHA1   [hash value monospace........] [copy]
SHA256 [hash value monospace........] [copy]
SHA512 [hash value monospace........] [copy]
```

#### CSS Gradient Generator
```
[Random]  [Copy CSS] ← di kanan atas

Gradient Type: [Linear] [Radial]
Direction: [135deg ▾]
Color Stops:
  [🟣 #667eea] [0%] [%]
  [🟣 #764ba2] [100%] [%]
  [+ Add Color Stop]

Preview:           ← right panel, large gradient box
┌──────────────┐
│              │
│  (gradient)  │
│              │
└──────────────┘
CSS Output:
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  [copy]
```

### 5.6 Dashboard Hero Section
- Heading besar: **"All-in-One Toolkit for Developers"** dengan gradient text (blue → purple)
- Subheading: "Kumpulan tools gratis dan lengkap untuk developer. Semua berjalan di browser. Cepat, aman, dan privat."
- Ilustrasi floating 3D-like icons (emoji/SVG: `{}`, `</>`, `Aa`, `🔐`, `🎨`) di sisi kanan
- Section "Popular Tools" — grid 2 baris × 4 kolom (8 tools)
- Link "View all tools →"

### 5.7 Tool Cards (Dashboard Grid)
Setiap card berisi:
- Icon box berwarna (warna per kategori)
- Nama tool (font-medium)
- Deskripsi singkat (text-secondary, text-sm)
- Hover: `scale-[1.02]`, shadow naik, border highlight

### 5.8 Sidebar App Info Card (bottom)
```
┌──────────────────────────┐
│ DevToolkit v1.0.0   🛡️  │
│ 100% Client-side         │
│ No data leaves your      │
│ browser                  │
└──────────────────────────┘
```

---

## 6. State Management (Zustand)

```js
// themeStore.js
{ theme: 'dark' | 'light', toggleTheme }

// favoritesStore.js
{ favorites: string[], toggleFavorite(id) }

// recentStore.js
{ recents: string[], addRecent(id) }   // max 5, persisted localStorage
```

Local state per tool: `useState` / `useReducer`.

---

## 7. Tools Registry (`data/tools.js`)

```js
export const tools = [
  {
    id: 'json-prettier',
    name: 'JSON Prettier',
    description: 'Format & beautify JSON',
    category: 'json',
    icon: 'Braces',             // nama icon Lucide
    color: 'blue',              // warna icon box
    tags: ['json', 'format', 'beautify'],
    path: '/json/prettier',
    component: () => import('../tools/json/JsonPrettier'),
    popular: true
  },
  // ...
]

export const categories = [
  { id: 'json',      label: 'JSON',             icon: 'Braces'    },
  { id: 'text',      label: 'Text & String',    icon: 'Type'      },
  { id: 'crypto',    label: 'Crypto & Security',icon: 'Lock'      },
  { id: 'css',       label: 'CSS & Design',     icon: 'Palette'   },
  { id: 'formatter', label: 'Formatter',        icon: 'Code2'     },
  { id: 'misc',      label: 'Misc / Utilities', icon: 'Wrench'    },
]
```

---

## 8. Responsiveness

| Breakpoint | Behavior |
|---|---|
| Desktop `≥1280px` | Full layout: sidebar 260px + content |
| Tablet `768–1279px` | Sidebar mini (icon only, 64px) |
| Mobile `<768px` | Sidebar menjadi drawer overlay + hamburger |

---

## 9. Animasi & Micro-interactions

- **Card hover**: `scale-[1.02]` + shadow + border highlight — via Framer Motion atau Tailwind transition
- **Sidebar active**: soft glow background + left border
- **Copy button**: icon swap `Copy → Check` selama 2 detik
- **Theme toggle**: smooth icon transition sun ↔ moon
- **Tool load**: fade-in panel saat navigasi ke tool
- **Status bar**: color transition merah → hijau saat JSON valid

---

## 10. Fitur Tambahan (Nice to Have)

| Fitur | Prioritas |
|---|---|
| PWA / Installable | Medium |
| Ctrl+K global search | Medium |
| Drag & drop file ke input | Medium |
| Share via URL (encode state ke params) | Low |
| Keyboard shortcut per tool | Low |
| Offline mode (Service Worker) | Low |

---

## 11. Branding & Subdomain

### Identitas Produk
| Atribut | Nilai |
|---|---|
| Nama App | DevToolkit |
| Parent Brand | gatrion.my.id |
| URL Live | `https://kit.gatrion.my.id` |
| Posisi | Sub-aplikasi independen (branding sendiri, domain gatrion) |
| Tagline | *"All-in-One Toolkit for Developers"* |

### Relasi dengan gatrion.my.id
- DevToolkit tampil sebagai produk/project milik gatrion
- Di sidebar **App Info Card** (bawah): tampilkan link balik `← gatrion.my.id`
- Di `<footer>` atau halaman About: "Built by [gatrion.my.id](https://gatrion.my.id)"
- Favicon dan og:image boleh menggunakan aset gatrion atau DevToolkit sendiri — konsistensi visual tetap dijaga

### DNS Setup
```
# Di DNS manager domain gatrion.my.id (misal Cloudflare / Niagahoster)
Type : CNAME
Name : kit
Value: cname.vercel-dns.com   ← jika deploy ke Vercel
       OR
       [your-app].netlify.app  ← jika deploy ke Netlify
TTL  : Auto
```

### Deployment ke Vercel (Rekomendasi)
```bash
# 1. Push repo ke GitHub
# 2. Import project di vercel.com
# 3. Build settings:
#    Framework: Vite
#    Build Command: npm run build
#    Output Dir: dist
# 4. Add custom domain: kit.gatrion.my.id
# 5. Vercel akan generate SSL otomatis
```

### SEO & Meta Tags
```html
<!-- index.html -->
<title>DevToolkit — All-in-One Toolkit for Developers</title>
<meta name="description" content="Kumpulan tools gratis untuk developer. JSON Prettier, Hash Generator, JWT Decoder, dan 24+ tools lainnya. 100% berjalan di browser.">
<meta name="author" content="gatrion.my.id">
<link rel="canonical" href="https://kit.gatrion.my.id">

<!-- Open Graph -->
<meta property="og:title" content="DevToolkit by gatrion.my.id">
<meta property="og:description" content="All-in-One Toolkit for Developers">
<meta property="og:url" content="https://kit.gatrion.my.id">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="DevToolkit — kit.gatrion.my.id">
```

### vite.config.js (base URL)
```js
export default defineConfig({
  base: '/',   // karena pakai custom subdomain, bukan path prefix
  // ...
})
```

---

## 12. Roadmap

### Phase 1 — MVP
- [ ] Vite + React + Tailwind + Router setup
- [ ] Dark/light theme (Zustand + localStorage)
- [ ] Layout: Sidebar, Header, ToolLayout, Dashboard
- [ ] Tools registry + React.lazy code splitting
- [ ] JSON Prettier
- [ ] JSON Compare
- [ ] Hash Generator
- [ ] UUID Generator
- [ ] Base64 Encode/Decode
- [ ] Timestamp Converter

### Phase 2 — Core Tools
- [ ] JWT Decoder
- [ ] CSS Gradient Generator
- [ ] Markdown Preview
- [ ] Regex Tester
- [ ] URL Encoder/Decoder
- [ ] Word Counter
- [ ] Color Converter

### Phase 3 — Polish
- [ ] Fuzzy search (Ctrl+K)
- [ ] Favorites & Recent tools
- [ ] Drag & drop file import
- [ ] PWA support
- [ ] Framer Motion animations
- [ ] SEO meta per halaman

---

## 13. Catatan Teknis

- **Code splitting**: `React.lazy` + `Suspense` per tool — bundle awal tetap kecil
- **No backend**: 100% client-side, tidak ada API call ke server
- **Privacy**: tidak ada analytics, tracking, atau data collection
- **Persisted state**: theme, recents, favorites → `localStorage`
- **Accessibility**: label pada semua input, keyboard navigable, ARIA roles
- **Font loading**: Google Fonts atau Fontsource (self-hosted)
- **CodeMirror**: pakai extension `@codemirror/lang-json`, `@codemirror/theme-one-dark`
