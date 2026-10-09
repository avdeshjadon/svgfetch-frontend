import { useState } from 'react'
import { Search, Copy, Check, Terminal, Code, Eye, X } from 'lucide-react'
import { BRANDS_DATA } from '../data/siteData'
import Reveal from './Reveal'

const VARIANTS = [
  { label: 'All variants', value: 'all' },
  { label: 'Icon', value: 'icon' },
  { label: 'Wordmark', value: 'wordmark' },
  { label: 'Full', value: 'full' },
  { label: 'Mascot', value: 'mascot' },
]

export default function Playground() {
  const [query, setQuery] = useState('')
  const [variant, setVariant] = useState('all')
  const [copied, setCopied] = useState(null)
  const [preview, setPreview] = useState(null)

  const filtered = BRANDS_DATA.filter((item) => {
    const q = query.toLowerCase()
    const matches =
      item.name.toLowerCase().includes(q) ||
      item.id.includes(q) ||
      item.category.toLowerCase().includes(q)
    return matches && (variant === 'all' || item.variant === variant)
  })

  const cli = `svgfetch ${(query.trim() || 'instagram').toLowerCase()}${
    variant !== 'all' ? ` --variant ${variant}` : ''
  }`

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="section tint" id="playground">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">Interactive demo</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Test svgfetch right in your browser</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Search popular brands, toggle exact variants, and copy the CLI command or the raw SVG
              markup instantly.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale">
          <div className="playground">
            <div className="pg-controls">
              <div className="search-wrap">
                <Search className="search-ico" size={18} />
                <input
                  className="search-input"
                  type="text"
                  value={query}
                  placeholder="Search brands (instagram, docker, meta, tux…)"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="pg-chips">
                {VARIANTS.map((v) => (
                  <button
                    key={v.value}
                    className={`chip ${variant === v.value ? 'active' : ''}`}
                    onClick={() => setVariant(v.value)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cli-bar">
              <div className="cli-text">
                <Terminal size={16} />
                <span>{cli}</span>
              </div>
              <button
                className={`copy-btn ${copied === 'cli' ? 'copied' : ''}`}
                onClick={() => copy(cli, 'cli')}
              >
                {copied === 'cli' ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied === 'cli' ? 'Copied' : 'Copy CLI'}</span>
              </button>
            </div>

            <div className="brands-grid">
              {filtered.length ? (
                filtered.map((brand, i) => (
                  <div
                    key={brand.id}
                    className="brand-card"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <div
                      className="svg-box"
                      role="button"
                      tabIndex={0}
                      title="Inspect full vector"
                      onClick={() => setPreview(brand)}
                      onKeyDown={(e) => e.key === 'Enter' && setPreview(brand)}
                      dangerouslySetInnerHTML={{ __html: brand.svgContent }}
                    />
                    <h3 className="brand-name">{brand.name}</h3>
                    <span className="badge">variant: {brand.variant}</span>

                    <div className="brand-actions">
                      <button
                        className={`mini-btn ${copied === `cmd-${brand.id}` ? 'copied' : ''}`}
                        title="Copy CLI command"
                        onClick={() => copy(brand.cliCommand, `cmd-${brand.id}`)}
                      >
                        {copied === `cmd-${brand.id}` ? <Check size={13} /> : <Terminal size={13} />}
                        <span>{copied === `cmd-${brand.id}` ? 'Copied' : 'Command'}</span>
                      </button>
                      <button
                        className={`mini-btn ${copied === `svg-${brand.id}` ? 'copied' : ''}`}
                        title="Copy raw SVG"
                        onClick={() => copy(brand.svgContent, `svg-${brand.id}`)}
                      >
                        {copied === `svg-${brand.id}` ? <Check size={13} /> : <Code size={13} />}
                        <span>{copied === `svg-${brand.id}` ? 'Copied' : 'SVG'}</span>
                      </button>
                      <button
                        className="mini-btn icon"
                        title="Inspect"
                        onClick={() => setPreview(brand)}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty">
                  No assets matched your search. Try another brand or reset the variant filter.
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreview(null)} aria-label="Close">
              <X size={18} />
            </button>

            <h3 className="heading-display" style={{ fontSize: '1.5rem' }}>
              {preview.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              {preview.fileName}
            </p>

            <div className="modal-preview" dangerouslySetInnerHTML={{ __html: preview.svgContent }} />

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => copy(preview.cliCommand, 'modal-cmd')}
              >
                {copied === 'modal-cmd' ? <Check size={16} /> : <Terminal size={16} />}
                <span>{copied === 'modal-cmd' ? 'Copied' : 'Copy CLI'}</span>
              </button>
              <button
                className="btn btn-ghost"
                style={{ flex: 1 }}
                onClick={() => copy(preview.svgContent, 'modal-svg')}
              >
                {copied === 'modal-svg' ? <Check size={16} /> : <Code size={16} />}
                <span>{copied === 'modal-svg' ? 'Copied' : 'Copy SVG'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
