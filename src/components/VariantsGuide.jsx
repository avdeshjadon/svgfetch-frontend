import { useRef } from 'react'
import { CircleCheck, CircleX, ChevronLeft, ChevronRight } from 'lucide-react'
import { VARIANTS, ENTITIES } from '../data/siteData'
import Reveal from './Reveal'

export default function VariantsGuide() {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="section tint" id="variants">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">Exact asset variants</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">No more wrong logos</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Never download a giant wordmark when you just wanted the app icon. Explicit flags and
              natural-language parsing give you exactly what you need.
            </p>
          </Reveal>
        </div>

        <div className="variant-cards-wrap">
          <div className="variant-scroll-header">
            <span className="variant-scroll-hint">Scroll horizontally to explore variants</span>
            <div className="variant-scroll-controls">
              <button
                className="variant-scroll-btn"
                onClick={() => handleScroll('left')}
                title="Scroll left"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="variant-scroll-btn"
                onClick={() => handleScroll('right')}
                title="Scroll right"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="variant-cards" ref={scrollRef}>
            {VARIANTS.map((v, i) => (
              <div key={v.name} className="variant-card">
                <div className="variant-head">
                  <span className="variant-flag">{v.flag}</span>
                  <span className="variant-aliases">aliases: {v.aliases.join(', ')}</span>
                </div>
                <p className="variant-desc">{v.desc}</p>
                <div className="variant-cmd">{v.example}</div>
              </div>
            ))}
          </div>
        </div>

        <Reveal variant="scale">
          <div className="entity-panel" id="entities">
            <div style={{ maxWidth: 640, marginBottom: 30 }}>
              <span className="section-tag" style={{ color: 'var(--emerald)' }}>
                Entity resolution engine
              </span>
              <h3 className="heading-display" style={{ fontSize: '1.7rem', margin: '10px 0' }}>
                Entity separation over fuzzy chaos
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Unlike generic scrapers that confuse parent companies with their products, svgfetch
                uses curated disambiguation rules.
              </p>
            </div>

            <div className="entity-grid">
              {ENTITIES.map((item, i) => (
                <Reveal key={item.query} delay={i * 90} className="entity-card">
                  <div className="entity-query">
                    <span>$</span>
                    <span>{item.query}</span>
                  </div>
                  <div className="entity-row ok">
                    <CircleCheck size={16} />
                    <span>{item.resolved}</span>
                  </div>
                  <div className="entity-row no">
                    <CircleX size={16} />
                    <span>{item.rejected}</span>
                  </div>
                  <span className="entity-status">{item.status}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
