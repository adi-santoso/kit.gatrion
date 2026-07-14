import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div 
      className="p-4 md:p-6 max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center text-white font-mono text-2xl mb-4 shadow-lg">
          &lt;/&gt;
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            About DevToolkit
          </span>
        </h1>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">27</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Tools</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1">100%</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Free</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-violet-500 mb-1">6</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Categories</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">27</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Tools</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1">100%</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Free</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-violet-500 mb-1">6</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Categories</div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 md:mb-3">What is DevToolkit?</h2>
          <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed mb-2 md:mb-3">
            DevToolkit adalah web app yang menyediakan kumpulan tools produktivitas untuk developer sehari-hari. 
            Semua pemrosesan dilakukan di sisi client (browser) — tidak ada data yang dikirim ke server.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
            Aman, cepat, dan privat. 100% berjalan di browser Anda.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 md:mb-3">Features</h2>
          <ul className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>28 developer tools across 6 categories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>100% client-side processing - your data never leaves your browser</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Dark/Light theme support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Fast search with Ctrl+K</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>No registration required</span>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 md:mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'Vite', 'Tailwind CSS', 'Zustand', 'CodeMirror 6', 'Lucide Icons'].map(tech => (
              <span key={tech} className="px-2 md:px-3 py-1 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/[0.06] rounded-lg text-xs text-slate-700 dark:text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 md:mb-3">Version</h2>
          <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm">v0.1.0</p>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-xl p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 md:mb-3">Built by</h2>
          <a
            href="https://gatrion.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-xs md:text-sm"
          >
            gatrion.my.id →
          </a>
        </section>
      </div>
    </motion.div>
  )
}
