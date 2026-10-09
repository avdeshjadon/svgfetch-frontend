import { Search, Layers, Compass, Gauge, Shield, Palette } from 'lucide-react'
import { FEATURES } from '../data/siteData'
import Reveal from './Reveal'

const ICONS = { search: Search, layers: Layers, compass: Compass, gauge: Gauge, shield: Shield, palette: Palette }

function onMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function FeatureGrid() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">Why svgfetch</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Everything you need, nothing you don't</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              A tiny CLI that solves the boring, error-prone parts of sourcing vector assets so you
              can stay in flow.
            </p>
          </Reveal>
        </div>

        <div className="features">
          {FEATURES.slice(0, 3).map((feat, i) => {
            const Icon = ICONS[feat.icon]
            return (
              <Reveal key={feat.title} delay={i * 80} className="card" onMouseMove={onMove}>
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{feat.title}</h3>
                <p className="card-desc">{feat.desc}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
