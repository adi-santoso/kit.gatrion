# DevToolkit

> All-in-One Toolkit for Developers

**Live:** [kit.gatrion.my.id](https://kit.gatrion.my.id)

DevToolkit adalah web app yang menyediakan 28 developer tools untuk produktivitas sehari-hari. 100% client-side processing — tidak ada data yang dikirim ke server.

## ✨ Features

- 🛠️ **28 Tools** across 6 categories (JSON, Text, Crypto, CSS, Formatter, Misc)
- 🔒 **100% Client-side** — your data never leaves your browser
- 🌓 **Dark/Light Theme** support
- ⚡ **Fast Search** with `Ctrl+K`
- ⭐ **Favorites** system
- 📱 **Responsive** design
- 🚀 **No registration** required

## 🧰 Tools

### JSON (5 tools)
- JSON Prettier
- JSON Compare
- JSON to CSV
- JSON ↔ YAML
- JSON Validator

### Text & String (7 tools)
- Base64 Encode/Decode
- URL Encoder/Decoder
- Diff Checker
- Markdown Preview
- Word Counter
- String Case Converter
- Lorem Ipsum Generator

### Crypto & Security (4 tools)
- Hash Generator (MD5, SHA1, SHA256, SHA512)
- UUID Generator
- JWT Decoder
- Password Generator

### CSS & Design (4 tools)
- CSS Gradient Generator
- Box Shadow Generator
- Color Converter (HEX/RGB/HSL)
- Border Radius Preview

### Formatter (3 tools)
- HTML Formatter
- JS Minifier
- Regex Tester

### Misc / Utilities (5 tools)
- Timestamp Converter
- Number Base Converter
- HTML Entities Encoder/Decoder
- CSS Minifier

## 🚀 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** v3
- **Zustand** (state management)
- **React Router** v6
- **CodeMirror 6** (code editor)
- **Lucide React** (icons)
- **Framer Motion** (animations)
- **crypto-js**, **diff**, **marked**, **DOMPurify**, **js-yaml**

## 🏗️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, ToolLayout
│   └── ui/              # Button, CodeEditor, CopyButton, etc.
├── pages/               # Dashboard, ToolPage, Favorites, About
├── tools/               # 28 tool implementations
│   ├── json/
│   ├── text/
│   ├── crypto/
│   ├── css/
│   ├── formatter/
│   └── misc/
├── store/               # Zustand stores (theme, favorites, search)
├── data/                # Tools registry
└── App.jsx
```

## 🔐 Privacy

All processing happens in your browser. No data is sent to any server. No analytics. No tracking.

## 📄 License

MIT

## 👨‍💻 Built by

[gatrion.my.id](https://gatrion.my.id)

---

**Version:** v0.1.0
