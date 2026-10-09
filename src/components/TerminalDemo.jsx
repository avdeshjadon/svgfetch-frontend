import { useEffect, useState } from 'react'
import { TERMINAL_SCENARIOS } from '../data/siteData'
import { useTypewriter } from '../hooks'
import Reveal from './Reveal'

export default function TerminalDemo() {
  const [active, setActive] = useState('direct')
  const scenario = TERMINAL_SCENARIOS[active]
  const [visible, setVisible] = useState(0)
  const typedCmd = useTypewriter(scenario.cmd, { speed: 38, start: true })

  useEffect(() => {
    setVisible(0)
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setVisible(i)
      if (i >= scenario.output.length) clearInterval(timer)
    }, 260)
    return () => clearInterval(timer)
  }, [active, scenario.output.length])

  return (
    <section className="section" id="terminal">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">Interactive terminal</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Feels like second nature</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Pure-Rust ergonomics with instant execution, crystal-clear output, and zero background
              baggage.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="term-tabs">
            {Object.entries(TERMINAL_SCENARIOS).map(([key, item]) => (
              <button
                key={key}
                className={`chip ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div className="terminal">
            <div className="term-head">
              <div className="term-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="term-title">svgfetch — terminal session</div>
            </div>

            <div className="term-body">
              <div className="term-line">
                <span className="term-prompt">$</span>
                <span className="term-cmd">{typedCmd}</span>
              </div>

              <div style={{ marginTop: 12 }}>
                {scenario.output.slice(0, visible).map((line, idx) => (
                  <div
                    key={idx}
                    className={`term-out ${line.type}`}
                    style={{ animation: 'fade 0.4s ease both' }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
