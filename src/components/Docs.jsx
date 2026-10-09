import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  PanelLeft,
  ExternalLink,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { DOC_GROUPS, DOC_PAGES, DOC_INDEX, DEFAULT_DOC_ID } from '../data/docsData'
import { GITHUB_URL, NPM_URL } from '../data/siteData'
import { DocBlock, ICONS } from './DocBlocks'
import { GithubIcon, NpmIcon } from './icons'

const VERSION = 'v0.1.0'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractToc(blocks) {
  const used = {}
  const toc = []
  blocks.forEach((block, index) => {
    if (block.type === 'h2' || block.type === 'h3') {
      const base = block.id || slugify(block.text)
      let id = base
      if (used[base] != null) {
        used[base] += 1
        id = `${base}-${used[base]}`
      } else {
        used[base] = 0
      }
      toc.push({ id, text: block.text, level: block.type === 'h3' ? 3 : 2, index })
    }
  })
  return toc
}

function resolveIdFromHash() {
  if (typeof window === 'undefined') return DEFAULT_DOC_ID
  const hash = window.location.hash
  if (hash.startsWith('#docs/')) {
    const id = hash.slice('#docs/'.length)
    return DOC_INDEX[id] ? id : DEFAULT_DOC_ID
  }
  return DEFAULT_DOC_ID
}

export default function Docs({ onBack }) {
  const [activePage, setActivePage] = useState(resolveIdFromHash)
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [activeHeading, setActiveHeading] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState(() => new Set())
  const searchRef = useRef(null)

  const page = DOC_INDEX[activePage] || DOC_INDEX[DEFAULT_DOC_ID]
  const toc = useMemo(() => extractToc(page.blocks || []), [page])

  const pageIndex = DOC_PAGES.findIndex((p) => p.id === page.id)
  const prev = pageIndex > 0 ? DOC_PAGES[pageIndex - 1] : null
  const next = pageIndex < DOC_PAGES.length - 1 ? DOC_PAGES[pageIndex + 1] : null

  const expandGroup = (title) =>
    setCollapsedGroups((prev) => {
      if (!prev.has(title)) return prev
      const next = new Set(prev)
      next.delete(title)
      return next
    })

  const toggleGroup = (title) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })

  const goToPage = (id, { push = true } = {}) => {
    if (!DOC_INDEX[id]) return
    setActivePage(id)
    setNavOpen(false)
    if (DOC_INDEX[id].group) expandGroup(DOC_INDEX[id].group)
    if (push && typeof window !== 'undefined') {
      window.history.pushState(null, '', `#docs/${id}`)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleHash = () => {
      const id = resolveIdFromHash()
      setActivePage(id)
      if (DOC_INDEX[id]?.group) expandGroup(DOC_INDEX[id].group)
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePage])

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === 'Escape' && typing) {
        setQuery('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const ids = toc.map((t) => t.id)
    if (!ids.length) return
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 150) current = id
      }
      setActiveHeading(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [toc, activePage])

  const scrollToHeading = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveHeading(id)
    }
  }

  const results = query.trim()
    ? DOC_PAGES.filter((p) => {
        const q = query.trim().toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.group.toLowerCase().includes(q) ||
          (p.keywords || '').includes(q)
        )
      })
    : []

  return (
    <div className="docs-page">
      <div className="container docs-container">
        <div className="docs-topbar">
          {onBack && (
            <button className="lib-back-btn" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Home</span>
            </button>
          )}

          <div className="docs-topbar-meta">
            <span className="docs-version">{VERSION}</span>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="docs-topbar-link"
            >
              <NpmIcon size={15} />
              <span>npm</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="docs-topbar-link"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>
            <button
              className="docs-nav-toggle"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={navOpen}
            >
              <PanelLeft size={17} />
            </button>
          </div>
        </div>

        <div className="docs-grid">
          <aside className={`docs-sidebar ${navOpen ? 'open' : ''}`}>
            <div className="docs-search">
              <Search size={16} className="docs-search-ico" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder="Search docs…"
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search documentation"
              />
              <kbd className="docs-kbd">/</kbd>

              {results.length > 0 && (
                <div className="docs-search-results">
                  {results.map((r) => {
                    const Icon = ICONS[r.icon] || BookOpen
                    return (
                      <button
                        key={r.id}
                        className="docs-search-result"
                        onClick={() => {
                          goToPage(r.id)
                          setQuery('')
                        }}
                      >
                        <Icon size={15} />
                        <span className="docs-search-result-text">
                          <strong>{r.title}</strong>
                          <small>{r.group}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
              {query.trim() && results.length === 0 && (
                <div className="docs-search-results">
                  <div className="docs-search-empty">No matches for “{query}”</div>
                </div>
              )}
            </div>

            <nav className="docs-nav">
              {DOC_GROUPS.map((group) => {
                const collapsed = collapsedGroups.has(group.title)
                return (
                  <div key={group.title} className={`docs-nav-group ${collapsed ? 'collapsed' : ''}`}>
                    <button
                      className="docs-nav-group-title"
                      onClick={() => toggleGroup(group.title)}
                      aria-expanded={!collapsed}
                    >
                      <span>{group.title}</span>
                      <ChevronDown size={14} className="docs-nav-group-chevron" />
                    </button>
                    <ul>
                      {group.items.map((item) => {
                        const Icon = ICONS[item.icon] || BookOpen
                        return (
                          <li key={item.id}>
                            <button
                              className={`docs-nav-link ${item.id === page.id ? 'active' : ''}`}
                              onClick={() => goToPage(item.id)}
                            >
                              <Icon size={15} />
                              <span>{item.title}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </nav>
          </aside>

          {navOpen && <div className="docs-sidebar-scrim" onClick={() => setNavOpen(false)} />}

          <article className="docs-article">
            <nav className="docs-breadcrumb" aria-label="Breadcrumb">
              <span>Docs</span>
              <ChevronRight size={13} />
              <span>{page.group}</span>
              <ChevronRight size={13} />
              <span className="current">{page.title}</span>
            </nav>

            <header className="docs-article-head">
              <span className="docs-article-tag">{page.group}</span>
              <h1 className="docs-article-title">{page.title}</h1>
              <p className="docs-article-desc">{page.description}</p>
            </header>

            <div className="docs-body">
              {(page.blocks || []).map((block, i) => (
                <DocBlock
                  key={i}
                  block={block}
                  headingId={toc.find((t) => t.index === i)?.id}
                />
              ))}
            </div>

            {(prev || next) && (
              <nav className="docs-pager">
                {prev ? (
                  <button className="docs-pager-link prev" onClick={() => goToPage(prev.id)}>
                    <span className="docs-pager-label">
                      <ArrowLeft size={14} /> Previous
                    </span>
                    <strong>{prev.title}</strong>
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button className="docs-pager-link next" onClick={() => goToPage(next.id)}>
                    <span className="docs-pager-label">
                      Next <ArrowRight size={14} />
                    </span>
                    <strong>{next.title}</strong>
                  </button>
                ) : (
                  <span />
                )}
              </nav>
            )}

            <div className="docs-article-foot">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="docs-foot-link"
              >
                <GithubIcon size={15} />
                Edit this page on GitHub
                <ExternalLink size={12} />
              </a>
            </div>
          </article>

          <aside className="docs-toc">
            <div className="docs-toc-inner">
              <span className="docs-toc-title">On this page</span>
              {toc.length ? (
                <ul className="docs-toc-list">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`docs-toc-link ${item.level === 3 ? 'sub' : ''} ${
                          activeHeading === item.id ? 'active' : ''
                        }`}
                        onClick={(e) => scrollToHeading(e, item.id)}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="docs-toc-empty">No sections on this page.</p>
              )}

              <div className="docs-toc-cta">
                <Sparkles size={14} />
                <span>Found a typo? Send a PR.</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
