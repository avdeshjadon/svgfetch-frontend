import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { COMMANDS, FLAGS } from '../data/siteData'
import Reveal from './Reveal'

export default function CommandsReference() {
  const [copied, setCopied] = useState(null)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="section" id="commands">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">CLI command matrix</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title heading-display">Complete command reference</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="section-desc">
              Clean, composable subcommands built for interactive developers and automated CI
              pipelines alike.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale">
          <div className="table-wrap" style={{ marginBottom: 52, overflowX: 'auto' }}>
            <table className="cmd-table">
              <thead>
                <tr>
                  <th>Command &amp; example</th>
                  <th>Aliases</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Copy</th>
                </tr>
              </thead>
              <tbody>
                {COMMANDS.map((item) => (
                  <tr key={item.command}>
                    <td>
                      <div className="cmd-name">{item.command}</div>
                      <div className="cmd-example">$ {item.example}</div>
                    </td>
                    <td>
                      <span className="cmd-alias">{item.alias}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{item.description}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className={`copy-btn ${copied === item.example ? 'copied' : ''}`}
                        onClick={() => copy(item.example)}
                        aria-label="Copy command"
                      >
                        {copied === item.example ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="heading-display" style={{ fontSize: '1.35rem', marginBottom: 20 }}>
            Global options &amp; flags
          </h3>
        </Reveal>

        <div className="flags-grid">
          {FLAGS.map((f, i) => (
            <Reveal key={f.flag} delay={i * 55} className="flag-card">
              <div className="flag-name">{f.flag}</div>
              <div className="flag-desc">{f.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
