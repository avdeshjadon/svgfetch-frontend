import { useEffect, useMemo, useState } from 'react'
import { Search, Copy, Check, Download, X, ExternalLink, Code, ArrowLeft } from 'lucide-react'
import { LIBRARY_STATS } from '../data/siteData'
import Reveal from './Reveal'

const PAGE_SIZE = 60

const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/avdeshjadon/svgfetch-icons@main"
const fileUrl = (file) => `${CDN_BASE_URL}/logos/${encodeURIComponent(file)}`

export default function LogoLibrary({ onBack }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [copied, setCopied] = useState('')
  const [active, setActive] = useState(null)
  const [activeCode, setActiveCode] = useState('')
  const [failedImages, setFailedImages] = useState({})

  useEffect(() => {
    let alive = true
    fetch(`${CDN_BASE_URL}/manifest.json`)
      .then((res) => res.json())
      .then((data) => {
        const flat = []
        for (const entry of data) {
          const files = entry.files && entry.files.length ? entry.files : []
          for (const file of files) {
            flat.push({
              name: entry.name || entry.shortname || file.replace(/\.svg$/i, ''),
              shortname: entry.shortname || '',
              url: entry.url || '',
              file,
            })
          }
        }
        flat.sort((a, b) => a.file.localeCompare(b.file))
        if (alive) {
          setItems(flat)
          setLoading(false)
        }
      })
      .catch(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.file.toLowerCase().includes(q) ||
        it.name.toLowerCase().includes(q) ||
        it.shortname.toLowerCase().includes(q),
    )
  }, [items, query])

  const shown = filtered.slice(0, visible)

  const copyCode = async (it) => {
    try {
      const res = await fetch(fileUrl(it.file))
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setCopied(it.file)
      setTimeout(() => setCopied((c) => (c === it.file ? '' : c)), 1800)
    } catch {
      setCopied('')
    }
  }

  const download = (it) => {
    const a = document.createElement('a')
    a.href = fileUrl(it.file)
    a.download = it.file
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const openItem = async (it) => {
    setActive(it)
    setActiveCode('')
    try {
      const res = await fetch(fileUrl(it.file))
      setActiveCode(await res.text())
    } catch {
      setActiveCode('')
    }
  }

  return (
    <section className="section lib-page" id="library">
      <div className="container">
        {onBack && (
          <div className="lib-back-wrap">
            <button className="lib-back-btn" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
            </button>
          </div>
        )}

        <div className="section-header">
          <Reveal>
            <span className="section-tag">Vector Repository</span>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="section-title heading-display">
              {items.length ? items.length.toLocaleString() : '1,960+'} Official Brand Vectors
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Browse the curated library of official vectors, copy raw SVG code with one click, or
              download the exact file for your production builds.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="lib-stats">
            {LIBRARY_STATS.map((s) => (
              <div className="lib-stat" key={s.label}>
                <div className="lib-stat-value">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="lib-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="lib-toolbar">
            <div className="search-wrap">
              <Search size={16} className="search-ico" />
              <input
                className="search-input"
                type="search"
                placeholder="Search 1,900+ brands by name or file…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setVisible(PAGE_SIZE)
                }}
                aria-label="Search logos"
              />
              {query && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setQuery('')
                    setVisible(PAGE_SIZE)
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <span className="lib-count">
              {loading ? 'Loading…' : `${filtered.length.toLocaleString()} results`}
            </span>
          </div>
        </Reveal>

        {loading ? (
          <div className="lib-grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <div className="lib-card lib-skeleton" key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <p>No logos found matching “{query}”.</p>
            <button
              className="btn btn-ghost"
              onClick={() => setQuery('')}
              style={{ marginTop: 14 }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="lib-grid">
              {shown.map((it) => {
                const isFailed = failedImages[it.file]
                return (
                  <div className="lib-card" key={it.file}>
                    <button
                      className="lib-thumb"
                      onClick={() => openItem(it)}
                      title={`Preview ${it.name}`}
                      aria-label={`Preview ${it.name}`}
                    >
                      {isFailed ? (
                        <div className="lib-fallback">
                          <span>{it.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                      ) : (
                        <img
                          src={fileUrl(it.file)}
                          alt={it.name}
                          loading="lazy"
                          decoding="async"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [it.file]: true }))
                          }
                        />
                      )}
                    </button>
                    <div className="lib-name" title={it.name}>
                      {it.name}
                    </div>
                    <div className="lib-actions">
                      <button
                        className={`mini-btn ${copied === it.file ? 'copied' : ''}`}
                        onClick={() => copyCode(it)}
                      >
                        {copied === it.file ? <Check size={13} /> : <Copy size={13} />}
                        {copied === it.file ? 'Copied' : 'Copy'}
                      </button>
                      <button
                        className="mini-btn icon"
                        onClick={() => download(it)}
                        title="Download SVG"
                        aria-label={`Download ${it.file}`}
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {visible < filtered.length && (
              <div className="lib-more">
                <button
                  className="btn btn-primary"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  Load {Math.min(PAGE_SIZE, filtered.length - visible)} more
                </button>
                <span className="lib-more-info">
                  Showing {shown.length.toLocaleString()} of {filtered.length.toLocaleString()}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal lib-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="lib-modal-head">
              <div>
                <h3 className="card-title">{active.name}</h3>
                <span className="badge">{active.file}</span>
              </div>
              {active.url && (
                <a
                  className="mini-btn"
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={13} /> Website
                </a>
              )}
            </div>

            <div className="modal-preview">
              <img src={fileUrl(active.file)} alt={active.name} />
            </div>

            <div className="lib-modal-actions">
              <button
                className={`btn btn-primary ${copied === active.file ? 'copied' : ''}`}
                onClick={() => copyCode(active)}
              >
                {copied === active.file ? <Check size={15} /> : <Copy size={15} />}
                {copied === active.file ? 'Copied' : 'Copy SVG code'}
              </button>
              <button className="btn btn-ghost" onClick={() => download(active)}>
                <Download size={15} /> Download SVG
              </button>
            </div>

            <div className="lib-code-head">
              <Code size={14} />
              <span>SVG source</span>
            </div>
            <pre className="lib-code">{activeCode || 'Loading source…'}</pre>
          </div>
        </div>
      )}
    </section>
  )
}
