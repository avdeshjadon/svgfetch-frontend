import { Rocket, ArrowUpRight } from 'lucide-react'
import { GITHUB_URL, NPM_URL } from '../data/siteData'
import { GithubIcon, NpmIcon } from './icons'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal variant="scale">
          <div className="cta">
            <span className="section-tag">
              <Rocket size={13} />
              Start in seconds
            </span>
            <h2 className="cta-title heading-display">
              Ship better vector assets, <span className="text-gradient">faster</span>
            </h2>
            <p className="cta-sub">
              Install svgfetch with a single command and fetch your first official logo straight
              into your project.
            </p>
            <div className="cta-actions">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <GithubIcon size={16} />
                View on GitHub
                <ArrowUpRight size={16} />
              </a>
              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <NpmIcon size={16} />
                Install from npm
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
