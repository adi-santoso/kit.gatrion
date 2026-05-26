import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div 
      className="p-4 md:p-6 max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">About DevToolkit</h1>
      <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6">All-in-One Toolkit for Developers</p>

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
