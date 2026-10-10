import { useEffect, useMemo, useState } from 'react'
import { Search, Copy, Check, Download, X, ExternalLink, Code, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { LIBRARY_STATS } from '../data/siteData'
import Reveal from './Reveal'

const PAGE_SIZE = 60

const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/avdeshjadon/svgfetch-icons@main"
const fileUrl = (file) => `${CDN_BASE_URL}/logos/${encodeURIComponent(file)}`

export default function LogoLibrary({ onBack }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages)
  const startIndex = (validCurrentPage - 1) * PAGE_SIZE
  const shown = filtered.slice(startIndex, startIndex + PAGE_SIZE)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === validCurrentPage) return
    setCurrentPage(page)
    const target = document.getElementById('library')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getPaginationRange = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total]
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    }
    return [1, '...', current - 1, current, current + 1, '...', total]
  }

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
                placeholder="Search brand by name..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setCurrentPage(1)
                }}
                aria-label="Search logos"
              />
              {query && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setQuery('')
                    setCurrentPage(1)
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
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
              onClick={() => {
                setQuery('')
                setCurrentPage(1)
              }}
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

            {totalPages > 1 && (
              <div className="lib-pagination-wrap">
                <nav className="lib-pagination" aria-label="Pagination Navigation">
                  <button
                    className="page-nav-btn"
                    disabled={validCurrentPage === 1}
                    onClick={() => handlePageChange(validCurrentPage - 1)}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <div className="page-numbers">
                    {getPaginationRange(validCurrentPage, totalPages).map((p, idx) =>
                      p === '...' ? (
                        <span key={`ellipsis-${idx}`} className="page-ellipsis" aria-hidden="true">
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          className={`page-num-btn ${validCurrentPage === p ? 'active' : ''}`}
                          onClick={() => handlePageChange(p)}
                          aria-label={`Page ${p}`}
                          aria-current={validCurrentPage === p ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className="page-nav-btn"
                    disabled={validCurrentPage === totalPages}
                    onClick={() => handlePageChange(validCurrentPage + 1)}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>

                <div className="lib-pagination-info">
                  Page {validCurrentPage} of {totalPages}
                </div>
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
