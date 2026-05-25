# DevToolkit — AI Coding Prompt

> Attach file ini + kedua gambar mockup ke AI coding (Cursor, Claude, Copilot, dll).
> File ini adalah instruksi lengkap, padat, dan action-oriented — bukan dokumen panjang.

---

## KONTEKS PROYEK

Kamu diminta membangun **DevToolkit** — web app kumpulan tools untuk developer.
- URL live: `https://kit.gatrion.my.id` (subdomain dari gatrion.my.id)
- 100% frontend, tidak ada backend, tidak ada API call eksternal
- Lihat mockup yang dilampirkan sebagai referensi visual utama

---

## TECH STACK — JANGAN DIGANTI

```
React 18 + Vite
Tailwind CSS v3 (class dark mode strategy)
React Router v6
Zustand (state management)
CodeMirror 6 (code editor)
Lucide React (icons)
Framer Motion (animasi)
crypto-js (hashing)
diff (text diff)
marked + DOMPurify (markdown)
Font: Inter (UI), JetBrains Mono (editor/code)
```

Install semua dependensi ini di awal. Jangan pakai alternatif lain kecuali diminta.

---

## STRUKTUR FOLDER — IKUTI PERSIS INI

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── ToolLayout.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── CodeEditor.jsx
│       ├── CopyButton.jsx
│       ├── Badge.jsx
│       ├── StatusBar.jsx
│       └── Tooltip.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── ToolPage.jsx
├── tools/
│   ├── json/
│   │   ├── JsonPrettier.jsx
│   │   ├── JsonCompare.jsx
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
│   │   ├── HashGenerator.jsx
│   │   ├── UuidGenerator.jsx
│   │   ├── JwtDecoder.jsx
│   │   └── PasswordGenerator.jsx
│   ├── css/
│   │   ├── GradientGenerator.jsx
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
│   └── tools.js
├── App.jsx
└── main.jsx
```

---

## DESIGN TOKENS — PAKAI NILAI INI PERSIS

### Tailwind config — tambahkan ke `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      dark: {
        bg:      '#0f172a',
        surface: '#111827',
        card:    '#1e293b',
        border:  'rgba(255,255,255,0.06)',
      },
      light: {
        bg:      '#f8fafc',
        surface: '#ffffff',
        card:    '#ffffff',
        border:  '#e2e8f0',
      },
      accent: {
        blue:   '#3b82f6',
        violet: '#8b5cf6',
        green:  '#22c55e',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
  }
}
```

### Kelas Tailwind yang sering dipakai

```
Background halaman  : bg-slate-950 dark:bg-slate-950 / bg-slate-50
Surface/card        : bg-gray-900 dark:bg-gray-900 / bg-white
Border              : border border-white/[0.06] dark / border-slate-200
Text utama          : text-slate-100 dark / text-slate-900
Text sekunder       : text-slate-400 dark / text-slate-500
Accent blue         : text-blue-500 / bg-blue-500
Accent violet       : text-violet-500 / bg-violet-500
Rounded card        : rounded-xl atau rounded-2xl
Shadow card         : shadow-sm (light) / shadow-none (dark, pakai border)
Sidebar width       : w-64 (260px)
Header height       : h-14
```

---

## KOMPONEN UTAMA — SPESIFIKASI

### `Sidebar.jsx`
- Fixed, `w-64`, full height, background `bg-gray-900` (dark) / `bg-white` (light)
- Border kanan: `border-r border-white/[0.06]`
- Logo di atas: icon `</>` + teks **DevToolkit**
- Navigasi: label "KATEGORI" (uppercase, text-xs, text-slate-500)
- Menu item: icon Lucide (16px) + label
- **Active state**: `bg-blue-500/10 border-l-2 border-blue-500 text-blue-400`
- Hover state: `bg-white/5`
- Section bawah: Favorites, About
- App info card paling bawah:
  ```
  DevToolkit v1.0.0   🛡
  100% Client-side
  No data leaves your browser
  ← gatrion.my.id   (link ke parent site)
  ```

### `Header.jsx`
- Sticky top, `h-14`, `bg-gray-900/80 backdrop-blur-sm` (dark) / `bg-white/80` (light)
- Border bawah: `border-b border-white/[0.06]`
- Kiri: Logo (hanya di mobile, hidden di desktop)
- Tengah: Search bar dengan hint `Ctrl K`
- Kanan: theme toggle (sun/moon icon, smooth transition)

### `Dashboard.jsx`
Hero section:
- Heading: `text-4xl font-bold` dengan gradient `bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent`
- Teks: *"All-in-One Toolkit for Developers"*
- Subheading `text-slate-400`: *"Kumpulan tools gratis dan lengkap untuk developer..."*
- Ilustrasi kanan: floating icon cards (emoji/SVG `{}` `</>` `Aa` `🔐` `🎨`)

Popular Tools grid:
- Label: "Popular Tools" + link "View all tools →"
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-3`
- Isi: 8 tools dengan `popular: true` dari registry

### Tool Card (reusable)
```jsx
<div className="group bg-gray-900 border border-white/[0.06] rounded-xl p-4
                hover:border-white/20 hover:scale-[1.02]
                transition-all duration-200 cursor-pointer">
  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClass}`}>
    <Icon size={20} />
  </div>
  <p className="font-medium text-sm text-slate-100">{name}</p>
  <p className="text-xs text-slate-400 mt-1">{description}</p>
</div>
```

### `ToolLayout.jsx`
- Breadcrumb: `Dashboard > [Kategori] > [Nama Tool]`
- Tool title: `text-2xl font-semibold`
- Tool description: `text-slate-400 text-sm`
- Action buttons (kanan atas): `Clear`, `Minify`, `Copy Output` dll — sesuai tiap tool

---

## TOOL LAYOUTS — SPESIFIKASI VISUAL

### JSON Prettier
```
Action bar (kanan atas): [Clear] [Minify] [Copy Output ✦ biru]

┌─ Input JSON ──────────┐  ┌─ Formatted JSON ──────────┐
│ CodeMirror editable   │  │ CodeMirror read-only       │
│ syntax: JSON          │  │ syntax: JSON               │
│ theme: one-dark       │  │ theme: one-dark            │
│                       │  │                            │
└───────────────────────┘  └────────────────────────────┘
└─ ✓ Valid JSON ─────────────────────── 105 bytes ──────┘
  (StatusBar: green = valid, red = invalid + pesan error)
```

### JSON Compare
```
Action bar: [Clear] [Compare ✦ biru]

┌─ JSON A ──────[□][↗]─┐  ┌─ JSON B ──────[□][↗]─┐
│ CodeMirror editable   │  │ CodeMirror editable    │
└───────────────────────┘  └────────────────────────┘

Diff Result:
Legend: [🟢 Added] [🔴 Removed] [🟡 Modified]
┌──────────────────────────────────────────────────┐
│ Line diff: hijau bg = added, merah bg = removed  │
│ font-mono, text-sm                               │
└──────────────────────────────────────────────────┘
```

### Hash Generator
```
Label: "Input Text"
┌─ Textarea ─────────────────────────────────────┐
│ (input bebas, font-mono)                        │
└─────────────────────────────────────────────────┘

┌─ MD5 ──── [hash value font-mono] ──── [Copy] ─┐
├─ SHA1 ─── [hash value font-mono] ──── [Copy] ─┤
├─ SHA256 ── [hash value font-mono] ──── [Copy] ─┤
└─ SHA512 ── [hash value font-mono] ──── [Copy] ─┘
```

### CSS Gradient Generator
```
Action bar: [Random] [Copy CSS ✦ biru]

Kiri:                          Kanan:
Gradient Type:                 Preview:
  [Linear ✓] [Radial]         ┌──────────────────┐
                               │                  │
Direction: [135deg ▾]          │  gradient box    │
                               │                  │
Color Stops:                   └──────────────────┘
  [🟣] #667eea  [0  ] [%]
  [🟣] #764ba2  [100] [%]
  [+ Add Color Stop]

CSS Output:
┌────────────────────────────────────────── [copy]─┐
│ background: linear-gradient(135deg, ...);         │
└──────────────────────────────────────────────────┘
```

---

## DATA REGISTRY — `data/tools.js`

Buat array lengkap dengan struktur ini untuk semua 27 tools:

```js
export const tools = [
  {
    id: 'json-prettier',
    name: 'JSON Prettier',
    description: 'Format & beautify JSON dengan syntax highlight.',
    category: 'json',
    icon: 'Braces',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    tags: ['json', 'format', 'beautify'],
    path: '/json/prettier',
    component: () => import('../tools/json/JsonPrettier'),
    popular: true,
  },
  // ... (isi semua 27 tools)
]

export const categories = [
  { id: 'json',      label: 'JSON',              icon: 'Braces'   },
  { id: 'text',      label: 'Text & String',     icon: 'Type'     },
  { id: 'crypto',    label: 'Crypto & Security', icon: 'Lock'     },
  { id: 'css',       label: 'CSS & Design',      icon: 'Palette'  },
  { id: 'formatter', label: 'Formatter',         icon: 'Code2'    },
  { id: 'misc',      label: 'Misc / Utilities',  icon: 'Wrench'   },
]
```

Warna icon per kategori:
- JSON → `text-blue-400 bg-blue-500/10`
- Text & String → `text-green-400 bg-green-500/10`
- Crypto → `text-violet-400 bg-violet-500/10`
- CSS & Design → `text-pink-400 bg-pink-500/10`
- Formatter → `text-orange-400 bg-orange-500/10`
- Misc → `text-slate-400 bg-slate-500/10`

---

## STATE MANAGEMENT — Zustand

```js
// themeStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(persist(
  (set) => ({
    theme: 'dark',
    toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  }),
  { name: 'devtoolkit-theme' }
))

// favoritesStore.js — sama pola, persist ke localStorage
// recentStore.js — array max 5 items, persist ke localStorage
```

Apply theme di `App.jsx`:
```jsx
useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, [theme])
```

---

## ROUTING — `App.jsx`

```jsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/:category/:toolId" element={<ToolPage />} />
</Routes>
```

Semua tool route: `/:category/:toolId`
Contoh: `/json/prettier`, `/crypto/hash-generator`, `/css/gradient-generator`

Gunakan `React.lazy` + `Suspense` untuk semua tool components.

---

## URUTAN PENGERJAAN (IKUTI FASE INI)

### FASE 1 — Foundation (kerjakan ini dulu, jangan lompat ke tools)
1. `vite create` + install semua dependencies
2. Setup `tailwind.config.js` dengan design tokens di atas
3. Setup Google Fonts: Inter + JetBrains Mono di `index.html`
4. Buat Zustand stores (theme, favorites, recent)
5. Buat `Sidebar.jsx` — pastikan active state dan app info card benar
6. Buat `Header.jsx` — search bar + theme toggle berfungsi
7. Buat `Dashboard.jsx` — hero section + popular tools grid
8. Buat `data/tools.js` — registry lengkap semua 27 tools
9. Setup routing di `App.jsx`
10. Pastikan dark/light toggle bekerja di semua komponen

### FASE 2 — Core Tools (setelah Fase 1 selesai)
1. `JsonPrettier.jsx` — dual panel + CodeMirror + status bar
2. `JsonCompare.jsx` — side-by-side + diff result
3. `HashGenerator.jsx` — textarea + 4 output rows
4. `UuidGenerator.jsx`
5. `Base64Tool.jsx`
6. `TimestampConverter.jsx`

### FASE 3 — Extended Tools
Kerjakan satu per satu: JWT Decoder, CSS Gradient Generator, Markdown Preview, Regex Tester, URL Encoder, Word Counter, Color Converter

### FASE 4 — Polish
Fuzzy search (Ctrl+K), Favorites, Recent tools, drag & drop file, animasi Framer Motion

---

## ATURAN PENTING — JANGAN DILANGGAR

1. **Jangan pakai warna hardcode** — selalu gunakan Tailwind classes atau CSS variables
2. **Dark mode wajib** — setiap komponen harus punya dark variant
3. **Jangan buat backend** — semua proses di browser, tidak ada fetch ke server
4. **Code editor pakai CodeMirror** — jangan pakai `<textarea>` biasa untuk input JSON/code
5. **Ikuti folder structure** — jangan buat file di lokasi lain
6. **Lazy load semua tools** — gunakan `React.lazy()` agar bundle awal kecil
7. **CopyButton** harus ada di setiap output — icon swap `Copy → Check` 2 detik
8. **Referensi visual** — selalu lihat mockup yang dilampirkan, bukan imajinasi sendiri

---

## SEO & META (di `index.html`)

```html
<title>DevToolkit — All-in-One Toolkit for Developers</title>
<meta name="description" content="Kumpulan tools gratis untuk developer. JSON Prettier, Hash Generator, JWT Decoder, dan 24+ tools lainnya. 100% berjalan di browser.">
<meta name="author" content="gatrion.my.id">
<link rel="canonical" href="https://kit.gatrion.my.id">
<meta property="og:title" content="DevToolkit by gatrion.my.id">
<meta property="og:url" content="https://kit.gatrion.my.id">
<meta property="og:type" content="website">
```

---

## CATATAN AKHIR

- Selalu refer ke **mockup image** yang dilampirkan untuk detail visual
- Jika ada ambigu antara prompt ini dan mockup → **mockup yang menang**
- Tanya dulu jika ada bagian yang tidak jelas sebelum mulai coding
- Target: output yang bisa langsung di-deploy ke `kit.gatrion.my.id`
