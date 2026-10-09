import { Fragment, useState } from 'react'
import {
  BookOpen,
  Download,
  Rocket,
  SquareTerminal,
  Layers,
  Compass,
  FileCode,
  SlidersHorizontal,
  Settings,
  Hash,
  Shield,
  Wrench,
  GitPullRequest,
  HelpCircle,
  Scale,
  Sparkles,
  Package,
  Zap,
  Gauge,
  Palette,
  Search,
  ListTree,
  FolderTree,
  Info,
  Lightbulb,
  TriangleAlert,
  Clock,
  MemoryStick,
  Braces,
  Play,
  Copy,
  Check,
  ChevronDown,
  Lock,
  FileCheck,
  CircleCheck,
  ExternalLink,
} from 'lucide-react'
import { COMMANDS, FLAGS, VARIANTS, ENTITIES, FAQS } from '../data/siteData'
import TerminalDemo from './TerminalDemo'

export const ICONS = {
  book: BookOpen,
  download: Download,
  rocket: Rocket,
  terminal: SquareTerminal,
  layers: Layers,
  compass: Compass,
  filecode: FileCode,
  sliders: SlidersHorizontal,
  settings: Settings,
  hash: Hash,
  shield: Shield,
  wrench: Wrench,
  git: GitPullRequest,
  help: HelpCircle,
  scale: Scale,
  sparkles: Sparkles,
  package: Package,
  zap: Zap,
  gauge: Gauge,
  palette: Palette,
  search: Search,
  list: ListTree,
  folder: FolderTree,
  info: Info,
  lightbulb: Lightbulb,
  warning: TriangleAlert,
  clock: Clock,
  memory: MemoryStick,
  braces: Braces,
  play: Play,
  lock: Lock,
  filecheck: FileCheck,
  check: CircleCheck,
}

const CALLOUTS = {
  note: { icon: Info, label: 'Note' },
  tip: { icon: Lightbulb, label: 'Tip' },
  warning: { icon: TriangleAlert, label: 'Warning' },
  important: { icon: Zap, label: 'Important' },
  danger: { icon: TriangleAlert, label: 'Danger' },
}

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{\{[^}]+\}\})/g

export function renderInline(text, keyPrefix = 'i') {
  const nodes = []
  let last = 0
  let match
  let n = 0
  INLINE.lastIndex = 0
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={`${keyPrefix}-t${n++}`}>{text.slice(last, match.index)}</Fragment>)
    }
    const token = match[0]
    if (token.startsWith('`')) {
      nodes.push(
        <code key={`${keyPrefix}-c${n++}`} className="doc-inline-code">
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={`${keyPrefix}-b${n++}`}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('{{')) {
      nodes.push(
        <kbd key={`${keyPrefix}-k${n++}`} className="doc-kbd-inline">
          {token.slice(2, -2)}
        </kbd>,
      )
    } else {
      const link = /\[([^\]]+)\]\(([^)]+)\)/.exec(token)
      const external = link[2].startsWith('http')
      nodes.push(
        <a
          key={`${keyPrefix}-l${n++}`}
          className="doc-link"
          href={link[2]}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {link[1]}
        </a>,
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-t${n++}`}>{text.slice(last)}</Fragment>)
  }
  return nodes
}

function CopyButton({ value, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button className={`doc-copy-btn ${copied ? 'copied' : ''}`} onClick={copy} aria-label={label}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}

function CodeBlock({ title, code, lang, prompt }) {
  return (
    <figure className="doc-code">
      {(title || lang) && (
        <figcaption className="doc-code-head">
          <span className="doc-code-title">{title || lang}</span>
          <span className="doc-code-lang">{lang || 'shell'}</span>
        </figcaption>
      )}
      <div className="doc-code-body">
        <pre>
          <code>
            {prompt && <span className="doc-code-prompt">$ </span>}
            {code}
          </code>
        </pre>
        <CopyButton value={code} />
      </div>
    </figure>
  )
}

function Callout({ variant = 'note', title, text }) {
  const conf = CALLOUTS[variant] || CALLOUTS.note
  const Icon = conf.icon
  return (
    <div className={`doc-callout ${variant}`}>
      <span className="doc-callout-icon">
        <Icon size={18} />
      </span>
      <div className="doc-callout-body">
        <strong className="doc-callout-title">{title || conf.label}</strong>
        <p>{renderInline(text)}</p>
      </div>
    </div>
  )
}

function Steps({ items }) {
  return (
    <ol className="doc-steps">
      {items.map((item, i) => (
        <li key={item.title || i} className="doc-step">
          <span className="doc-step-num">{i + 1}</span>
          <div className="doc-step-content">
            <strong className="doc-step-title">{item.title}</strong>
            {item.text && <p>{renderInline(item.text)}</p>}
            {item.code && (
              <pre className="doc-step-code">
                <code>{item.code}</code>
              </pre>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

function List({ ordered, items }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="doc-list">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text
        const sub = typeof item === 'object' ? item.items : null
        return (
          <li key={i}>
            {renderInline(text)}
            {sub && (
              <ul className="doc-list doc-sublist">
                {sub.map((s, j) => (
                  <li key={j}>{renderInline(typeof s === 'string' ? s : s.text)}</li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </Tag>
  )
}

function DefList({ items }) {
  return (
    <dl className="doc-deflist">
      {items.map((item) => (
        <div key={item.term} className="doc-defrow">
          <dt>
            <code className="doc-inline-code">{item.term}</code>
          </dt>
          <dd>{renderInline(item.desc)}</dd>
        </div>
      ))}
    </dl>
  )
}

function Tabs({ items }) {
  const [active, setActive] = useState(0)
  const item = items[active] || items[0]
  return (
    <div className="doc-tabs">
      <div className="doc-tabs-bar" role="tablist">
        {items.map((it, i) => (
          <button
            key={it.label}
            role="tab"
            aria-selected={i === active}
            className={`doc-tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <CodeBlock title={item.title} code={item.code} lang={item.lang} prompt={item.prompt} />
    </div>
  )
}

function DocTable({ head, rows }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        {head && (
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{renderInline(String(cell))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cards({ items }) {
  return (
    <div className="doc-cards">
      {items.map((item) => {
        const Icon = ICONS[item.icon] || Sparkles
        return (
          <div key={item.title} className="doc-card">
            <span className="doc-card-icon">
              <Icon size={18} />
            </span>
            <strong className="doc-card-title">{item.title}</strong>
            <p className="doc-card-desc">{item.desc}</p>
          </div>
        )
      })}
    </div>
  )
}

function Actions({ items }) {
  return (
    <div className="doc-actions">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`btn ${item.variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {item.label}
          {item.external && <ExternalLink size={14} />}
        </a>
      ))}
    </div>
  )
}

function CommandList() {
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
    <div className="doc-commands">
      {COMMANDS.map((item) => (
        <div key={item.command} className="doc-command">
          <div className="doc-command-main">
            <code className="doc-command-name">{item.command}</code>
            {item.alias && item.alias !== '—' && (
              <span className="doc-command-alias">aliases: {item.alias}</span>
            )}
            <p className="doc-command-desc">{item.description}</p>
            <code className="doc-command-example">$ {item.example}</code>
          </div>
          <button
            className={`doc-copy-btn ${copied === item.example ? 'copied' : ''}`}
            onClick={() => copy(item.example)}
            aria-label="Copy example"
          >
            {copied === item.example ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied === item.example ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      ))}
    </div>
  )
}

function FlagList() {
  return (
    <div className="doc-flags">
      {FLAGS.map((f) => (
        <div key={f.flag} className="doc-flag">
          <code className="doc-flag-name">{f.flag}</code>
          <p className="doc-flag-desc">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

function VariantList() {
  return (
    <div className="doc-variants">
      {VARIANTS.map((v) => (
        <div key={v.name} className="doc-variant">
          <div className="doc-variant-head">
            <code className="doc-variant-flag">{v.flag}</code>
          </div>
          <p className="doc-variant-desc">{v.desc}</p>
          <div className="doc-variant-foot">
            <span className="doc-variant-aliases">aliases: {v.aliases.join(', ')}</span>
            <code className="doc-variant-example">$ {v.example}</code>
          </div>
        </div>
      ))}
    </div>
  )
}

function EntityList() {
  return (
    <div className="doc-entities">
      {ENTITIES.map((item) => (
        <div key={item.query} className="doc-entity">
          <code className="doc-entity-query">
            <span>$</span> {item.query}
          </code>
          <div className="doc-entity-row ok">
            <CircleCheck size={15} /> <span>{item.resolved}</span>
          </div>
          <div className="doc-entity-row no">
            <TriangleAlert size={15} /> <span>{item.rejected}</span>
          </div>
          <span className="doc-entity-status">{item.status}</span>
        </div>
      ))}
    </div>
  )
}

function FaqList() {
  const [open, setOpen] = useState(0)
  return (
    <div className="doc-faq">
      {FAQS.map((item, i) => (
        <div key={item.q} className={`doc-faq-item ${open === i ? 'open' : ''}`}>
          <button
            className="doc-faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <ChevronDown size={17} className="doc-faq-icon" />
          </button>
          <div className="doc-faq-a">
            <div className="doc-faq-a-inner">
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DocBlock({ block, headingId }) {
  switch (block.type) {
    case 'lead':
      return <p className="doc-lead">{renderInline(block.text)}</p>
    case 'h2':
      return (
        <h2 id={headingId} className="doc-h2">
          {block.text}
          <a className="doc-anchor" href={`#${headingId}`} aria-label="Link to section">
            #
          </a>
        </h2>
      )
    case 'h3':
      return (
        <h3 id={headingId} className="doc-h3">
          {block.text}
          <a className="doc-anchor" href={`#${headingId}`} aria-label="Link to section">
            #
          </a>
        </h3>
      )
    case 'h4':
      return <h4 className="doc-h4">{block.text}</h4>
    case 'p':
      return <p className="doc-p">{renderInline(block.text)}</p>
    case 'code':
      return (
        <CodeBlock
          title={block.title}
          code={block.code}
          lang={block.lang}
          prompt={block.prompt}
        />
      )
    case 'tabs':
      return <Tabs items={block.items} />
    case 'callout':
      return <Callout variant={block.variant} title={block.title} text={block.text} />
    case 'list':
      return <List ordered={block.ordered} items={block.items} />
    case 'deflist':
      return <DefList items={block.items} />
    case 'steps':
      return <Steps items={block.items} />
    case 'table':
      return <DocTable head={block.head} rows={block.rows} />
    case 'cards':
      return <Cards items={block.items} />
    case 'actions':
      return <Actions items={block.items} />
    case 'securityCards':
      return <Cards items={block.items} />
    case 'commands':
      return <CommandList />
    case 'flags':
      return <FlagList />
    case 'variants':
      return <VariantList />
    case 'entities':
      return <EntityList />
    case 'faq':
      return <FaqList />
    case 'terminal':
      return (
        <div className="doc-terminal">
          <TerminalDemo />
        </div>
      )
    default:
      return null
  }
}
