# 🛠️ DevToolkit

> All-in-One Developer Toolkit — 28 Tools, 100% Client-Side

**Live Demo:** [kit.gatrion.my.id](https://kit.gatrion.my.id)

DevToolkit adalah web app lengkap yang menyediakan 28 developer tools untuk produktivitas sehari-hari. Semua processing dilakukan 100% di browser — tidak ada data yang dikirim ke server, tidak ada tracking, tidak ada registrasi.

---

## ✨ Features

- 🛠️ **28 Tools** tersebar di 6 kategori (JSON, Text, Crypto, CSS, Formatter, Misc)
- 🔒 **100% Client-side** — data tidak pernah keluar dari browser kamu
- 🌓 **Dark/Light Theme** dengan transisi smooth
- ⚡ **Fast Search** dengan `Ctrl+K` atau `Cmd+K`
- ⭐ **Favorites System** — pin tools yang sering dipakai
- 📱 **Fully Responsive** — mobile & desktop friendly
- 🚀 **No Registration** — buka langsung pakai
- ⚙️ **Recent Tools** — quick access ke tools terakhir digunakan
- 🎨 **Modern UI** — clean design dengan Tailwind CSS + Framer Motion

---

## 🧰 Available Tools

### 📊 JSON (5 tools)
- **JSON Prettier** — format & beautify JSON dengan syntax highlight
- **JSON Compare** — bandingkan dua JSON, highlight diff
- **JSON to CSV** — konversi array of objects ke CSV
- **JSON ↔ YAML** — konversi dua arah JSON dan YAML
- **JSON Validator** — validasi JSON dengan pesan error informatif

### 📝 Text & String (7 tools)
- **Base64 Tool** — encode/decode Base64
- **URL Encoder** — encode/decode URL dan query string
- **Diff Checker** — bandingkan dua teks line-by-line
- **Markdown Preview** — live preview Markdown ke HTML
- **Word Counter** — hitung kata, karakter, kalimat, paragraf
- **String Case Converter** — camelCase, snake_case, PascalCase, kebab-case
- **Lorem Ipsum Generator** — generate placeholder text

### 🔐 Crypto & Security (4 tools)
- **Hash Generator** — MD5, SHA1, SHA256, SHA512
- **UUID Generator** — generate UUID v4, v1, ULID
- **JWT Decoder** — decode & inspect JWT token
- **Password Generator** — generate strong password dengan konfigurasi

### 🎨 CSS & Design (4 tools)
- **CSS Gradient Generator** — visual builder gradient CSS
- **Box Shadow Generator** — visual builder CSS box-shadow
- **Color Converter** — HEX ↔ RGB ↔ HSL ↔ HSB
- **Border Radius Preview** — slider visual preview border-radius

### 🔧 Formatter (3 tools)
- **HTML Formatter** — beautify / minify HTML
- **JS Minifier** — minify JavaScript code
- **Regex Tester** — test regex dengan highlight match real-time

### ⚙️ Misc / Utilities (4 tools)
- **Timestamp Converter** — Unix ↔ human-readable datetime
- **Number Base Converter** — Binary, Octal, Decimal, Hex
- **HTML Entities** — encode/decode HTML entities
- **CSS Minifier** — minify CSS code

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18, Vite |
| **Styling** | Tailwind CSS v3 |
| **Routing** | React Router v6 |
| **State** | Zustand (lightweight state management) |
| **Code Editor** | CodeMirror 6 with syntax highlighting |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Utils** | crypto-js, diff, marked, DOMPurify, js-yaml |

---

## 🏗️ Development

### Quick Start

```bash
# Clone repository
git clone <repo-url>
cd devtoolkit

# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Build optimized production bundle
npm run preview  # Preview production build locally
```

---

## 📦 Project Structure

```
devtoolkit/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── layout/      # Sidebar, Header, ToolLayout
│   │   └── ui/          # Reusable UI components
│   ├── pages/           # Dashboard, ToolPage, Favorites, About
│   ├── tools/           # 28 tool implementations
│   │   ├── json/        # JSON tools (5)
│   │   ├── text/        # Text & String tools (7)
│   │   ├── crypto/      # Crypto & Security tools (4)
│   │   ├── css/         # CSS & Design tools (4)
│   │   ├── formatter/   # Formatter tools (3)
│   │   └── misc/        # Misc / Utilities (4)
│   ├── store/           # Zustand stores (theme, favorites, recent, search)
│   ├── data/            # Tools registry & categories
│   └── App.jsx          # Main app component
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔐 Privacy & Security

### 100% Client-Side Processing
Semua operasi dilakukan di browser kamu. Tidak ada data yang dikirim ke server eksternal. Semua state disimpan di `localStorage`.

### No Tracking
- ❌ No analytics
- ❌ No cookies (kecuali localStorage untuk preferences)
- ❌ No third-party scripts
- ❌ No telemetry

### Open Source
Kamu bisa audit sendiri source code untuk memverifikasi bahwa tidak ada data exfiltration.

---

## 🎯 Use Cases

- **JSON Wrangling** — format, validate, compare, convert JSON/YAML/CSV
- **Text Processing** — encode/decode, diff, markdown preview, word count
- **Security & Crypto** — hash, UUID, JWT decode, password generation
- **CSS Utilities** — gradients, shadows, colors, border radius
- **Code Formatting** — HTML/JS/CSS formatter & minifier
- **Quick Conversions** — timestamp, number base, HTML entities

---

## 📝 TODO / Roadmap

- [ ] Export/import favorites & settings
- [ ] More tools: SQL formatter, cron expression parser, JWT encoder
- [ ] Keyboard shortcuts untuk semua tools
- [ ] PWA support (offline mode)
- [ ] Dark mode improvements
- [ ] Multi-language support (EN/ID)

---

## 🤝 Contributing

Kontribusi welcome! Silakan:
1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingTool`)
3. Commit changes (`git commit -m 'Add AmazingTool'`)
4. Push ke branch (`git push origin feature/AmazingTool`)
5. Open Pull Request

---

## 📄 License

MIT License — feel free to use for personal or commercial projects.

---

## 👨‍💻 Built By

[gatrion.my.id](https://gatrion.my.id)

**Version:** v0.1.0
