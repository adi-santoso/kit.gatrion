import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { tools, categories } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'
import RecentTools from '../components/ui/RecentTools'
import SEO from '../components/SEO'
import { WebSiteSchema, SoftwareApplicationSchema } from '../components/StructuredData'

const tickerTools = ['JSON Prettier', 'Image Compressor', 'JWT Decoder', 'Regex Tester', 'Sprite Sheet Splitter', 'Color Converter']

export default function Dashboard() {
  const navigate = useNavigate()
  const popularTools = tools.filter((tool) => tool.popular)
  const randomTool = () => navigate(tools[Math.floor(Math.random() * tools.length)].path)

  return (
    <>
      <SEO />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <div className="dt-page">
        <section className="dt-hero">
          <div className="dt-hero-copy">
            <div className="dt-eyebrow">Browser-native utilities / v0.4</div>
            <h1 className="dt-hero-title">BUILD <span className="dt-outline">FASTER.</span><br /><span className="dt-slash">/</span> STAY LOCAL.</h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--dt-muted)]">{tools.length} focused instruments for formatting, converting, inspecting, and shipping. No accounts. No round-trips. Your data never leaves the machine.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/all" className="dt-button inline-flex items-center gap-2 rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-acid)] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#161816] shadow-[3px_3px_0_var(--dt-line)] transition-transform hover:-translate-y-0.5">Open tool index <ArrowRight size={15} /></Link>
              <button type="button" onClick={randomTool} className="inline-flex items-center gap-2 rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide shadow-[3px_3px_0_var(--dt-line)] transition-transform hover:-translate-y-0.5">Surprise me <Sparkles size={15} /></button>
            </div>
          </div>
          <div className="dt-hero-visual" aria-hidden="true">
            <div className="dt-orb dt-orb-one" /><div className="dt-orb dt-orb-two" /><div className="dt-orb dt-orb-three" />
            <div className="dt-visual-code"><span className="dt-code-acid">const</span> toolkit = {'{'}<br />&nbsp;&nbsp;<span className="dt-code-cyan">runtime</span>: <span className="dt-code-coral">'browser'</span>,<br />&nbsp;&nbsp;<span className="dt-code-cyan">latency</span>: 0,<br />&nbsp;&nbsp;<span className="dt-code-cyan">uploads</span>: false,<br />&nbsp;&nbsp;<span className="dt-code-cyan">tools</span>: {tools.length}<br />{'}'}<br /><br /><span className="dt-code-acid">toolkit</span>.ship()</div>
            <div className="dt-visual-label">ZERO SERVER REQUIRED</div>
          </div>
        </section>

        <div className="dt-ticker" aria-hidden="true"><div className="dt-ticker-track">{[...tickerTools, ...tickerTools].map((name, index) => <span key={`${name}-${index}`}>{name} ◆</span>)}</div></div>

        <section id="recent" className="dt-panel mb-10 p-4 sm:p-5"><RecentTools /></section>

        <section aria-labelledby="popular-heading">
          <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div><div className="dt-eyebrow mb-3">Curated instruments</div><h2 id="popular-heading" className="dt-page-heading">Popular utilities</h2></div>
            <Link to="/all" className="font-mono text-[10px] uppercase tracking-wider text-[var(--dt-muted)] hover:text-[var(--dt-coral)]">View all {tools.length} tools ↗</Link>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <Link key={category.id} to={`/${category.id}`} className="dt-chip">{category.label}</Link>)}</div>
          <div className="dt-tool-grid">{popularTools.map((tool, index) => <ToolCard key={tool.id} tool={tool} featured={index === 0} />)}</div>
        </section>

        <footer className="mt-12 flex flex-col justify-between gap-3 border-t-[1.5px] border-[var(--dt-line)] pt-5 font-mono text-[9px] uppercase tracking-wider text-[var(--dt-muted)] sm:flex-row"><span>DevToolkit / {tools.length} browser-native utilities</span><span>No logins · No uploads · No nonsense</span><span>Built by Gatrion</span></footer>
      </div>
    </>
  )
}
