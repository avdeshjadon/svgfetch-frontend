import { Lock, FileCheck, Zap, Scale, ArrowUpRight } from 'lucide-react'
import { SECURITY, GITHUB_URL } from '../data/siteData'
import Reveal from './Reveal'

const ICONS = { lock: Lock, filecheck: FileCheck, zap: Zap, scale: Scale }

export default function SecuritySection() {
  return (
    <section className="section tint" id="security">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag" style={{ color: 'var(--emerald)' }}>
              Security &amp; licensing
            </span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Built with integrity</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Production-grade defensive engineering at every layer — from network requests to local
              file permissions.
            </p>
          </Reveal>
        </div>

        <div className="features">
          {SECURITY.map((feat, i) => {
            const Icon = ICONS[feat.icon]
            return (
              <Reveal key={feat.title} delay={i * 80} className="card">
                <div className="card-icon">
                  <Icon size={22} />
                </div>
                <h3 className="card-title">{feat.title}</h3>
                <p className="card-desc">{feat.desc}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal variant="scale">
          <div className="license-callout">
            <Scale size={34} style={{ color: 'var(--indigo)', marginBottom: 16 }} />
            <h3 className="heading-display" style={{ fontSize: '1.55rem', marginBottom: 10 }}>
              Free &amp; Open Source for Everyone
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                maxWidth: 660,
                margin: '0 auto 24px',
                fontSize: '0.95rem',
              }}
            >
              svgfetch is built for the global developer community. Inspect the code, customize it
              for your workflow, and contribute features freely on GitHub.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`${GITHUB_URL}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on GitHub
                <ArrowUpRight size={16} />
              </a>
              <a
                href={`${GITHUB_URL}/blob/main/SECURITY.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Security policy
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
