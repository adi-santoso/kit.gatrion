export default function About() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">About DevToolkit</h1>
      <p className="text-slate-400 text-sm mb-6">All-in-One Toolkit for Developers</p>

      <div className="space-y-6">
        <section className="bg-gray-900 border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">What is DevToolkit?</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            DevToolkit adalah web app yang menyediakan kumpulan tools produktivitas untuk developer sehari-hari. 
            Semua pemrosesan dilakukan di sisi client (browser) — tidak ada data yang dikirim ke server.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Aman, cepat, dan privat. 100% berjalan di browser Anda.
          </p>
        </section>

        <section className="bg-gray-900 border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">Features</h2>
          <ul className="space-y-2 text-sm text-slate-300">
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

        <section className="bg-gray-900 border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'Vite', 'Tailwind CSS', 'Zustand', 'CodeMirror 6', 'Lucide Icons'].map(tech => (
              <span key={tech} className="px-3 py-1 bg-gray-800 border border-white/[0.06] rounded-lg text-xs text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">Version</h2>
          <p className="text-slate-300 text-sm">v0.1.0</p>
        </section>

        <section className="bg-gray-900 border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">Built by</h2>
          <a
            href="https://gatrion.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            gatrion.my.id →
          </a>
        </section>
      </div>
    </div>
  )
}
