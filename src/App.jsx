import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoMarquee from './components/LogoMarquee'
import FeatureGrid from './components/FeatureGrid'
import LogoLibrary from './components/LogoLibrary'
import Docs from './components/Docs'
import Footer from './components/Footer'

function resolveView() {
  if (typeof window === 'undefined') return 'home'
  const h = window.location.hash
  if (h === '#library' || h === '#logos') return 'library'
  if (h === '#docs' || h.startsWith('#docs/') || h === '#commands' || h === '#terminal') {
    return 'docs'
  }
  return 'home'
}

function resolveTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('svgfetch-theme')
  if (saved === 'dark' || saved === 'light') return saved
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export default function App() {
  const [view, setView] = useState(resolveView)
  const [theme, setTheme] = useState(resolveTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('svgfetch-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleHash = () => {
      setView(resolveView())
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  const navigate = (newView, hash = '') => {
    setView(newView)
    if (newView === 'library') {
      window.location.hash = 'library'
    } else if (newView === 'docs') {
      window.location.hash = 'docs'
    } else {
      if (hash) {
        window.location.hash = hash
      } else {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname)
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page">
      <div className="content">
        <Navbar
          currentView={view}
          onNavigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main>
          {view === 'library' ? (
            <LogoLibrary onBack={() => navigate('home')} />
          ) : view === 'docs' ? (
            <Docs onBack={() => navigate('home')} />
          ) : (
            <>
              <Hero
                onExploreLibrary={() => navigate('library')}
                onOpenDocs={() => navigate('docs')}
              />
              <LogoMarquee onSelectBrand={() => navigate('library')} />
              <FeatureGrid />
            </>
          )}
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </div>
  )
}
