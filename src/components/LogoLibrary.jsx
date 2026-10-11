import { useEffect, useMemo, useState } from 'react'
import { Search, Copy, Check, Download, X, ExternalLink, Code, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'

const PAGE_SIZE = 60

const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/avdeshjadon/svgfetch-icons@main"
const RAW_BASE_URL = "https://raw.githubusercontent.com/avdeshjadon/svgfetch-icons/main"
const fileUrl = (file) => `${CDN_BASE_URL}/logos/${file.split("/").map(encodeURIComponent).join("/")}`
const rawFileUrl = (file) => `${RAW_BASE_URL}/logos/${file.split("/").map(encodeURIComponent).join("/")}`

// Aliases and synonym mappings for brand search
const ALIAS_MAP = {
  amazon: ['aws', 'amzn', 'dynamodb', 'ec2', 's3', 'lambda', 'elastic', 'chime'],
  aws: ['amazon', 'cloud'],
  google: ['youtube', 'android', 'alphabet', 'chrome', 'gmail', 'gcp'],
  facebook: ['meta', 'instagram', 'whatsapp', 'messenger'],
  meta: ['facebook', 'instagram', 'whatsapp'],
  microsoft: ['windows', 'azure', 'vscode', 'office', 'github', 'xbox'],
  ecommerce: ['e-commerce', 'shop', 'store', 'cart', 'retail', 'myntra', 'meesho', 'flipkart'],
  shop: ['e-commerce', 'ecommerce', 'store', 'cart', 'shopify'],
  food: ['zomato', 'swiggy', 'delivery', 'eats'],
}

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

    const loadManifest = async () => {
      let data = null

      // 1. Try real-time GitHub raw manifest first with timestamp to bypass CDN caching
      try {
        const rawRes = await fetch(`${RAW_BASE_URL}/manifest.json?t=${Date.now()}`)
        if (rawRes.ok) {
          data = await rawRes.json()
        }
      } catch (_) {}

            // 2. Fallback to jsDelivr CDN
      if (!data) {
        try {
          const cdnRes = await fetch(CDN_BASE_URL + "/manifest.json");
          if (cdnRes.ok) data = await cdnRes.json();
        } catch (_) {}
      }

      // 3. Fallback to local bundled manifest
      if (!data) {
        try {
          const localRes = await fetch("/manifest.json");
          if (localRes.ok) data = await localRes.json();
        } catch (_) {}
      }

      if (!data || !alive) {
        if (alive) setLoading(false)
        return
      }

      const flat = []
      for (const entry of data) {
        const files = entry.files && entry.files.length ? entry.files : []
        const category =
          entry.category ||
          (files[0] && files[0].includes('/') ? files[0].split('/')[0] : 'general')

        for (const file of files) {
          flat.push({
            name: entry.name || entry.shortname || file.replace(/\.svg$/i, ''),
            shortname: entry.shortname || '',
            category,
            url: entry.url || '',
            file,
          })
        }
      }

      flat.sort((a, b) => a.name.localeCompare(b.name))
      if (alive) {
        setItems(flat)
        setLoading(false)
      }
    }

    loadManifest()

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

  // Smart multi-token, category & alias aware search
  const filtered = useMemo(() => {
    const rawQ = query.trim().toLowerCase()
    if (!rawQ) return items

    const tokens = rawQ.split(/[\s_-]+/).filter(Boolean)

    return items.filter((it) => {
      const name = (it.name || '').toLowerCase()
      const shortname = (it.shortname || '').toLowerCase()
      const file = (it.file || '').toLowerCase()
      const category = (it.category || '').toLowerCase()

      const haystack = `${name} ${shortname} ${file} ${category}`
      const cleanHaystack = haystack.replace(/[-_.]/g, ' ')

      return tokens.every((token) => {
        if (haystack.includes(token) || cleanHaystack.includes(token)) return true

        const aliases = ALIAS_MAP[token]
        if (aliases && aliases.some((a) => haystack.includes(a) || cleanHaystack.includes(a))) {
          return true
        }

        for (const [key, list] of Object.entries(ALIAS_MAP)) {
          if (list.includes(token) && (haystack.includes(key) || cleanHaystack.includes(key))) {
            return true
          }
        }

        return false
      })
    })
  }, [items, query])

  // Dynamic rounded stats (rounded down to nearest 100: e.g. 1900+, 1400+)
  const stats = useMemo(() => {
    const rawTotal = items.length || 1965
    const roundedSvgs = Math.floor(rawTotal / 100) * 100
    const rawBrands = new Set(items.map((i) => i.shortname || i.name)).size || 1483
    const roundedBrands = Math.floor(rawBrands / 100) * 100

    return [
      { value: roundedSvgs, suffix: '+', label: 'Brand SVGs' },
      { value: roundedBrands, suffix: '+', label: 'Curated brands' },
      { value: 100, suffix: '%', label: 'Free to use' },
      { value: 0, label: 'Sign-up required' },
    ]
  }, [items])

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
      let res = await fetch(fileUrl(it.file))
      if (!res.ok) res = await fetch(rawFileUrl(it.file))
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
    a.href = failedImages[it.file] ? rawFileUrl(it.file) : fileUrl(it.file)
    a.download = it.file.split("/").pop()
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const openItem = async (it) => {
    setActive(it)
    setActiveCode('')
    try {
      let res = await fetch(fileUrl(it.file))
      if (!res.ok) res = await fetch(rawFileUrl(it.file))
      setActiveCode(await res.text())
    } catch {
      setActiveCode('Failed to load SVG source.')
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
              {items.length ? `${Math.floor(items.length / 100) * 100}+` : '1,900+'} Official Brand Vectors
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Browse the curated library of official vectors, copy raw SVG code with one click, or
              download the exact file for your production builds.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="lib-stats">
            {stats.map((s) => (
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
              <Search size={18} className="search-ico" />
              <input
                className="search-input"
                type="search"
                placeholder="Search brand by name, e.g. Amazon, Myntra, Zomato..."
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
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="search-tags" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <span className="search-tags-label">Popular:</span>
                {['Amazon', 'Myntra', 'Zomato', 'Google', 'Microsoft', 'Docker', 'React', 'Rust'].map((tag) => (
                  <button
                    key={tag}
                    className={`search-tag-chip ${query.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
                    onClick={() => {
                      setQuery(query.toLowerCase() === tag.toLowerCase() ? '' : tag)
                      setCurrentPage(1)
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <a
                href="https://github.com/avdeshjadon/svgfetch-icons/issues/new?template=curate-brand.yml"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "0.82rem", color: "var(--faint)", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}
                title="Request a brand to be auto-curated by our CI"
              >
                <span>+ Request Brand</span>
                <ExternalLink size={12} />
              </a>
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
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setQuery('')
                  setCurrentPage(1)
                }}
              >
                Clear search
              </button>
              {query && (
                <a
                  className="btn btn-primary"
                  href={`https://github.com/avdeshjadon/svgfetch-icons/issues/new?template=curate-brand.yml&title=%5Bcurate%5D%3A+${encodeURIComponent(query)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <ExternalLink size={14} /> Request “{query}”
                </a>
              )}
            </div>
            {query && (
              <p style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Missing from the registry? Our autonomous CI engine can fetch and validate it automatically.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="lib-grid">
              {shown.map((it) => {
                const isFailed = failedImages[it.file] === 'failed'
                const currentImgSrc = failedImages[it.file] === 'raw' ? rawFileUrl(it.file) : fileUrl(it.file)

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
                          src={currentImgSrc}
                          alt={it.name}
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            setFailedImages((prev) => {
                              if (!prev[it.file]) {
                                return { ...prev, [it.file]: 'raw' }
                              }
                              return { ...prev, [it.file]: 'failed' }
                            })
                          }}
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
              <img
                src={failedImages[active.file] === 'raw' ? rawFileUrl(active.file) : fileUrl(active.file)}
                alt={active.name}
              />
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
