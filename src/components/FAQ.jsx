import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../data/siteData'
import Reveal from './Reveal'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">FAQ</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Questions, answered</h2>
          </Reveal>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <div className={`faq-item ${open === i ? 'open' : ''}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <ChevronDown size={17} />
                  </span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
