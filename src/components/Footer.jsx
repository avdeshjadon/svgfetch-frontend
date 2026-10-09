import { Heart } from 'lucide-react'
import { GITHUB_URL, NPM_URL, WM_URL } from '../data/siteData'
import { GithubIcon, NpmIcon } from './icons'

const YEAR = new Date().getFullYear()

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, link) => {
    if (link.external) return
    if (link.label === 'Logo library') {
      e.preventDefault()
      if (onNavigate) onNavigate('library')
    } else if (link.label === 'Features') {
      e.preventDefault()
      if (onNavigate) onNavigate('home', '#features')
    } else if (link.label === 'Documentation' || link.label === 'CLI reference') {
      e.preventDefault()
      if (onNavigate) onNavigate('docs')
    }
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate('home')
  }

  const COLUMNS = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Logo library', href: '#library' },
        { label: 'Install', href: NPM_URL, external: true },
        { label: 'Release notes', href: `${GITHUB_URL}/releases`, external: true },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'CLI reference', href: '#docs' },
        { label: 'Wikimedia Commons', href: WM_URL, external: true },
        { label: 'Roadmap', href: `${GITHUB_URL}/issues`, external: true },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: GITHUB_URL, external: true },
        { label: 'Report an issue', href: `${GITHUB_URL}/issues/new`, external: true },
        { label: 'Contributing guide', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`, external: true },
        { label: 'Code of conduct', href: `${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`, external: true },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'License', href: `${GITHUB_URL}/blob/main/LICENSE`, external: true },
        { label: 'Security policy', href: `${GITHUB_URL}/blob/main/SECURITY.md`, external: true },
        { label: 'Asset licensing', href: WM_URL, external: true },
        { label: 'Attribution', href: `${GITHUB_URL}#attribution`, external: true },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="brand" aria-label="svgfetch home" onClick={handleBrandClick}>
              <img className="brand-logo" src="/full_logo.svg" alt="svgfetch" height="38" />
            </a>
            <p className="footer-desc">
              A fast, pure-Rust CLI to discover, inspect, and safely download official vector assets
              from Wikimedia Commons straight into your project.
            </p>
            <div className="footer-socials">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub repository"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="npm package"
              >
                <NpmIcon size={18} />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="footer-title">{col.title}</h4>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="footer-link"
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div>
            © {YEAR} Avdesh Jadon · Free &amp; open source for developers
          </div>
          <div className="footer-made">
            <span>Free &amp; open source</span>
            <span className="footer-dot" />
            <span>Crafted with</span>
            <Heart size={13} className="footer-heart" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
