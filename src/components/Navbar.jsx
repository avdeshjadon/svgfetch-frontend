import { useState } from 'react'
import { Menu, X, ExternalLink, Star, Sun, Moon } from 'lucide-react'
import { NAV_LINKS, GITHUB_URL, NPM_URL } from '../data/siteData'
import { GithubIcon, NpmIcon } from './icons'
import { useScrollY } from '../hooks'

export default function Navbar({ currentView = 'home', onNavigate, theme = 'light', onToggleTheme }) {
  const scrolled = useScrollY(10)
  const [open, setOpen] = useState(false)

  const handleLinkClick = (e, link) => {
    if (link.external) return
    e.preventDefault()
    setOpen(false)

    if (link.label === 'Logo library') {
      if (onNavigate) onNavigate('library')
    } else if (link.label === 'Home') {
      if (onNavigate) onNavigate('home')
    } else if (link.label === 'Features') {
      if (onNavigate) onNavigate('home', '#features')
    } else if (link.label === 'Docs') {
      if (onNavigate) onNavigate('docs')
    }
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    setOpen(false)
    if (onNavigate) onNavigate('home')
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="brand" aria-label="svgfetch home" onClick={handleBrandClick}>
          <img className="brand-logo" src="/full_logo.svg" alt="svgfetch" height="42" />
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => {
            const isLibActive = link.label === 'Logo library' && currentView === 'library'
            const isHomeActive = link.label === 'Home' && currentView === 'home'
            const isDocsActive = link.label === 'Docs' && currentView === 'docs'
            const isActive = isLibActive || isHomeActive || isDocsActive

            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link)}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                {link.external && <ExternalLink size={12} className="nav-link-ext" />}
              </a>
            )
          })}
        </nav>

        <div className="nav-actions">
          <button
            className="btn btn-ghost btn-icon-only"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-icon-only"
            title="View on npm"
            aria-label="View on npm"
          >
            <NpmIcon size={17} />
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            title="Star on GitHub"
          >
            <Star size={15} />
            <span>Star</span>
          </a>

          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="container mobile-menu-inner">
          {NAV_LINKS.map((link) => {
            const isLibActive = link.label === 'Logo library' && currentView === 'library'
            const isHomeActive = link.label === 'Home' && currentView === 'home'
            const isDocsActive = link.label === 'Docs' && currentView === 'docs'
            const isActive = isLibActive || isHomeActive || isDocsActive

            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link)}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                {link.external && <ExternalLink size={13} className="nav-link-ext" />}
              </a>
            )
          })}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            <GithubIcon size={15} />
            GitHub repository
          </a>
        </div>
      </div>
    </header>
  )
}
