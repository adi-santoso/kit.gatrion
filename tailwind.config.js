/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#111827',
          card: '#1e293b',
          border: 'rgba(255,255,255,0.06)',
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e2e8f0',
        },
        accent: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
          green: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    }
  },
  plugins: [],
}
