import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { INSTALL_COMMANDS, GITHUB_URL, NPM_URL } from '../data/siteData'
import { GithubIcon, NpmIcon } from './icons'
import { useCountUp, useInView, useTypewriter } from '../hooks'
import Reveal from './Reveal'

function Stat({ value, suffix = '', label }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const numeric = typeof value === 'number'
  const count = useCountUp(numeric ? value : 0, { active: inView })

  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">
        {numeric ? count : value}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Hero() {
  const tabs = Object.keys(INSTALL_COMMANDS)
  const [activeTab, setActiveTab] = useState('npx')
  const [copied, setCopied] = useState(false)
  const typed = useTypewriter(INSTALL_COMMANDS[activeTab], { speed: 42 })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMANDS[activeTab])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="hero" id="top">
      <div className="container hero-inner content">
        <Reveal>
          <h1 className="hero-title heading-display">
            <span className="line">Discover, Inspect &amp;</span>
            <span className="line text-gradient">Download SVGs</span>
            <span className="line">From Your Terminal</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero-sub">
            The blazing-fast, pure-Rust CLI that fetches official vector assets from Wikimedia
            Commons straight into your project — with smart variants and zero configuration.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="install">
            <div className="install-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`install-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab)
                    setCopied(false)
                  }}
                >
                  {tab === 'powershell' ? 'PowerShell' : tab}
                </button>
              ))}
            </div>
            <div className="install-row">
              <div className="install-code">
                <span className="prompt">$</span>
                <span>{typed}</span>
                <span className="cli-caret" />
              </div>
              <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="hero-cta">
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <NpmIcon size={16} />
              Install from npm
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <GithubIcon size={16} />
              View on GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="stats">
            <Stat value="Rust" label="Zero-cost memory & speed" />
            <Stat value={0} label="Runtime dependencies" />
            <Stat value={8} suffix="+" label="Composable subcommands" />
            <Stat value={100} suffix="%" label="Free & open source" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
