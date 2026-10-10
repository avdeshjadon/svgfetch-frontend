export const GITHUB_URL = 'https://github.com/avdeshjadon/svgfetch'
export const NPM_URL = 'https://www.npmjs.com/package/svgfetch'
export const WM_URL = 'https://commons.wikimedia.org'

export const INSTALL_COMMANDS = {
  npx: 'npx svgfetch',
  npm: 'npm install -g svgfetch',
  cargo: 'cargo install svgfetch --locked',
  brew: 'brew install avdeshjadon/tap/svgfetch',
  curl: 'curl -fsSL https://raw.githubusercontent.com/avdeshjadon/svgfetch/main/install.sh | bash',
  powershell: 'irm https://raw.githubusercontent.com/avdeshjadon/svgfetch/main/install.ps1 | iex',
}

export const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Logo library', href: '#library' },
  { label: 'Docs', href: '#docs' },
]

export const MARQUEE_BRANDS = [
  { name: 'GitHub', file: 'microsoft/github-icon.svg' },
  { name: 'Docker', file: 'devops/docker-icon.svg' },
  { name: 'React', file: 'meta/react.svg' },
  { name: 'Python', file: 'languages/python.svg' },
  { name: 'Rust', file: 'languages/rust.svg' },
  { name: 'Figma', file: 'design/figma.svg' },
  { name: 'Slack', file: 'social/slack-icon.svg' },
  { name: 'TypeScript', file: 'microsoft/typescript-icon.svg' },
  { name: 'Tailwind CSS', file: 'general/tailwindcss-icon.svg' },
  { name: 'Next.js', file: 'frameworks/nextjs-icon.svg' },
  { name: 'Redis', file: 'databases/redis.svg' },
  { name: 'Kubernetes', file: 'devops/kubernetes.svg' },
  { name: 'PostgreSQL', file: 'databases/postgresql.svg' },
  { name: 'Linux', file: 'linux/linux-tux.svg' },
  { name: 'Apple', file: 'apple/apple.svg' },
  { name: 'Android', file: 'google/android-icon.svg' },
  { name: 'Node.js', file: 'general/nodejs-icon.svg' },
  { name: 'Vue.js', file: 'frameworks/vue.svg' },
  { name: 'AWS', file: 'amazon/aws.svg' },
  { name: 'Cloudflare', file: 'devops/cloudflare-icon.svg' },
  { name: 'Supabase', file: 'databases/supabase-icon.svg' },
  { name: 'Vercel', file: 'devops/vercel-icon.svg' },
]

export const BRANDS_DATA = [
  {
    id: 'instagram',
    name: 'Instagram',
    variant: 'icon',
    category: 'Social',
    fileName: 'Instagram_icon.svg',
    cliCommand: 'svgfetch instagram --variant icon',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
        <stop stop-color="#fdf497" offset="0%" /><stop stop-color="#fdf497" offset="5%" />
        <stop stop-color="#fd5949" offset="45%" /><stop stop-color="#d6249f" offset="60%" />
        <stop stop-color="#285AEB" offset="90%" /></radialGradient></defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" stroke="#ffffff" stroke-width="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" stroke-width="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" /></svg>`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    variant: 'icon',
    category: 'Social',
    fileName: 'Facebook_logo_(2019).svg',
    cliCommand: 'svgfetch facebook',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path d="M13.5 8H15V5.5C14.7 5.5 13.8 5.4 12.8 5.4C10.7 5.4 9.3 6.7 9.3 9V11H7V13.8H9.3V21.5C9.8 21.6 10.4 21.6 11 21.6C11.5 21.6 12 21.5 12.5 21.5V13.8H14.8L15.2 11H12.5V9.3C12.5 8.5 12.7 8 13.5 8Z" fill="#ffffff" /></svg>`,
  },
  {
    id: 'meta',
    name: 'Meta',
    variant: 'icon',
    category: 'Tech',
    fileName: 'Meta_Platforms_Inc._logo.svg',
    cliCommand: 'svgfetch meta',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9 7.2C15.3 7.2 13.8 8.1 12.9 9.5C12 8.1 10.5 7.2 8.9 7.2C5.9 7.2 3.5 9.7 3.5 12.7C3.5 16.5 6.7 18.8 9.5 18.8C11.1 18.8 12.5 18 13.4 16.6C14.3 18 15.7 18.8 17.3 18.8C20.1 18.8 23.3 16.5 23.3 12.7C23.3 9.7 20 7.2 16.9 7.2ZM8.9 16.4C7.1 16.4 5.7 14.7 5.7 12.7C5.7 10.8 7.1 9.4 8.9 9.4C10.6 9.4 11.9 11 12.8 12.7C11.9 14.5 10.6 16.4 8.9 16.4ZM17 16.4C15.3 16.4 14 14.5 13.1 12.7C14 11 15.3 9.4 17 9.4C18.8 9.4 20.2 10.8 20.2 12.7C20.2 14.7 18.8 16.4 17 16.4Z" fill="#0081FB" /></svg>`,
  },
  {
    id: 'docker',
    name: 'Docker',
    variant: 'icon',
    category: 'DevOps',
    fileName: 'Docker_(container_engine)_logo.svg',
    cliCommand: 'svgfetch docker --variant icon',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5 11.8C22.1 11.7 20.8 11.6 20 12.2C19.4 11.4 18.4 10.8 17.4 10.9L17.1 11.1C17.1 9.9 16.5 7.4 14.2 7.2L13.8 7.3C13.5 7.9 13.4 8.7 13.7 9.4C13.2 9.7 12.6 10.2 12.3 10.8H10.5V9.1H12.2V7.4H10.5V5.7H8.8V7.4H7.1V9.1H8.8V10.8H5.4V9.1H3.7V10.8H2V11.9C2 14.5 3.5 16.8 5.7 17.7C8.2 18.7 12.8 18.7 15.6 17.3C18 16.1 19.9 13.8 20.3 12.7C21.1 12.8 22.1 12.6 22.5 11.8Z" fill="#2496ED" /></svg>`,
  },
  {
    id: 'github',
    name: 'GitHub',
    variant: 'icon',
    category: 'Development',
    fileName: 'Octicons-mark-github.svg',
    cliCommand: 'svgfetch github --variant icon',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.843 20.198 8.796 21.52C9.296 21.611 9.479 21.303 9.479 21.036C9.479 20.8 9.47 20.165 9.466 19.324C6.684 19.932 6.096 17.973 6.096 17.973C5.641 16.815 4.985 16.505 4.985 16.505C4.076 15.882 5.054 15.895 5.054 15.895C6.058 15.966 6.587 16.93 6.587 16.93C7.479 18.47 8.927 18.026 9.497 17.771C9.588 17.118 9.847 16.673 10.133 16.42C7.913 16.166 5.578 15.305 5.578 11.455C5.578 10.358 5.968 9.46 6.608 8.756C6.505 8.5 6.162 7.479 6.706 6.095C6.706 6.095 7.545 5.825 9.458 7.129C10.256 6.906 11.107 6.795 11.954 6.791C12.8 6.795 13.652 6.906 14.452 7.129C16.363 5.825 17.201 6.095 17.201 6.095C17.746 7.479 17.403 8.5 17.3 8.756C17.942 9.46 18.329 10.358 18.329 11.455C18.329 15.317 15.989 16.163 13.761 16.411C14.12 16.721 14.439 17.332 14.439 18.266C14.439 19.605 14.428 20.686 14.428 21.036C14.428 21.306 14.607 21.619 15.118 21.517C19.07 20.192 21.91 16.443 21.91 12.017C21.91 6.484 17.433 2 12 2Z" fill="#24292f" /></svg>`,
  },
  {
    id: 'linux',
    name: 'Tux (Linux)',
    variant: 'mascot',
    category: 'OS',
    fileName: 'Tux.svg',
    cliCommand: 'svgfetch linux --variant mascot',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 8 4 8 6.5V11C6.5 12 5 14 5 17C5 19 6 21 8 21.5C9.5 22 14.5 22 16 21.5C18 21 19 19 19 17C19 14 17.5 12 16 11V6.5C16 4 14.5 2 12 2Z" fill="#22272E" />
      <path d="M12 9C10.5 9 9.5 11 9.5 13.5C9.5 16 10.5 18 12 18C13.5 18 14.5 16 14.5 13.5C14.5 11 13.5 9 12 9Z" fill="#FFFFFF" />
      <path d="M10.5 6C10.2 6 10 6.4 10 7C10 7.6 10.2 8 10.5 8C10.8 8 11 7.6 11 7C11 6.4 10.8 6 10.5 6Z" fill="#000000" />
      <path d="M13.5 6C13.2 6 13 6.4 13 7C13 7.6 13.2 8 13.5 8C13.8 8 14 7.6 14 7C14 6.4 13.8 6 13.5 6Z" fill="#000000" />
      <ellipse cx="12" cy="8.2" rx="2" ry="1.2" fill="#FFA500" />
      <ellipse cx="8.5" cy="21.5" rx="2.5" ry="1.2" fill="#FFA500" />
      <ellipse cx="15.5" cy="21.5" rx="2.5" ry="1.2" fill="#FFA500" /></svg>`,
  },
  {
    id: 'python',
    name: 'Python',
    variant: 'icon',
    category: 'Language',
    fileName: 'Python-logo-notext.svg',
    cliCommand: 'svgfetch python --variant icon',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 2C8.7 2 6.8 3.4 6.8 5.6V7.4H12.1V8.3H4.7C2.5 8.3 1.5 10 1.5 12.3C1.5 14.9 3.2 16.1 5.4 16.1H6.8V14.1C6.8 11.9 8.6 10.3 10.8 10.3H16.2C16.8 10.3 17.3 9.8 17.3 9.2V5.6C17.3 3.4 15.1 2 11.9 2ZM9.7 3.8C10.3 3.8 10.7 4.2 10.7 4.8C10.7 5.4 10.3 5.8 9.7 5.8C9.1 5.8 8.7 5.4 8.7 4.8C8.7 4.2 9.1 3.8 9.7 3.8Z" fill="#3776AB" />
      <path d="M12.1 22C15.3 22 17.2 20.6 17.2 18.4V16.6H11.9V15.7H19.3C21.5 15.7 22.5 14 22.5 11.7C22.5 9.1 20.8 7.9 18.6 7.9H17.2V9.9C17.2 12.1 15.4 13.7 13.2 13.7H7.8C7.2 13.7 6.7 14.2 6.7 14.8V18.4C6.7 20.6 8.9 22 12.1 22ZM14.3 20.2C13.7 20.2 13.3 19.8 13.3 19.2C13.3 18.6 13.7 18.2 14.3 18.2C14.9 18.2 15.3 18.6 15.3 19.2C15.3 19.8 14.9 20.2 14.3 20.2Z" fill="#FFD43B" /></svg>`,
  },
  {
    id: 'rust',
    name: 'Rust',
    variant: 'icon',
    category: 'Language',
    fileName: 'Rust_programming_language_black_logo.svg',
    cliCommand: 'svgfetch rust',
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="#DEA584" stroke-width="1.8" />
      <circle cx="12" cy="12" r="6" stroke="#DEA584" stroke-width="1.2" stroke-dasharray="2 2" />
      <text x="7" y="16.5" font-family="sans-serif" font-weight="900" font-size="12" fill="#DEA584">R</text></svg>`,
  },
]

export const CLIENT_LOGOS = [
  'Instagram', 'Facebook', 'Meta', 'Docker', 'GitHub',
  'Tux', 'Python', 'Rust', 'Figma', 'Slack', 'Redis', 'Kubernetes',
]

export const FEATURES = [
  {
    icon: 'search',
    title: 'Instant Vector Search',
    desc: 'Type a brand or product name and svgfetch resolves the exact Wikimedia Commons asset in milliseconds — no browser, no manual downloads.',
  },
  {
    icon: 'layers',
    title: 'Exact Variant Resolution',
    desc: 'Request icon, wordmark, full lockup, or mascot explicitly. Never accidentally ship a giant banner when you wanted a 24px mark.',
  },
  {
    icon: 'compass',
    title: 'Entity Disambiguation',
    desc: 'Curated matching rules keep related-but-different entities apart. Facebook never resolves to Meta, and Linux never resolves to Tux by accident.',
  },
  {
    icon: 'gauge',
    title: 'Zero Runtime Bloat',
    desc: 'A single statically-linked binary with no Node, Python, or JVM required. Starts instantly and idles at near-zero memory.',
  },
  {
    icon: 'shield',
    title: 'Secure By Design',
    desc: 'Path traversal and Zip Slip defenses, deterministic provenance metadata, and respectful Wikimedia API etiquette out of the box.',
  },
  {
    icon: 'palette',
    title: 'Drops Into Any Project',
    desc: 'Auto-detects your assets directory, verifies SVG markup, and writes clean, optimization-ready files ready for your build.',
  },
]

export const COMMANDS = [
  {
    command: 'svgfetch <QUERY>',
    alias: 'get-svg, getsvg',
    description: 'Search or directly match a query and download the cleanest SVG straight into your project assets directory.',
    example: 'svgfetch instagram --variant icon',
  },
  {
    command: 'svgfetch',
    alias: '—',
    description: 'Launch the rich interactive terminal TUI with live search, arrow-key selection, and halfblock vector preview.',
    example: 'svgfetch',
  },
  {
    command: 'svgfetch info <QUERY>',
    alias: '—',
    description: 'Inspect brand metadata, Wikimedia file details, author attribution, and available variants without downloading.',
    example: 'svgfetch info docker --variant wordmark',
  },
  {
    command: 'svgfetch search <QUERY>',
    alias: '—',
    description: 'Return search results directly in the terminal as an ASCII table, JSON, or a JSONL stream.',
    example: "svgfetch search 'Amazon' --json",
  },
  {
    command: 'svgfetch download <FILE>',
    alias: '—',
    description: 'Download a specific Wikimedia Commons file by filename or URL into your destination folder.',
    example: "svgfetch download 'File:Amazon logo.svg'",
  },
  {
    command: 'svgfetch cache',
    alias: 'cache clear, cache prune',
    description: 'Manage the local HTTP and asset cache to keep disk storage lean and blazing fast.',
    example: 'svgfetch cache clear',
  },
  {
    command: 'svgfetch doctor',
    alias: '—',
    description: 'Run diagnostics on network connectivity, cache integrity, write permissions, and terminal color support.',
    example: 'svgfetch doctor',
  },
  {
    command: 'svgfetch uninstall',
    alias: 'svgfetch dlt',
    description: 'Safely clean up svgfetch binaries, cache directories, and config files with an interactive dry-run.',
    example: 'svgfetch uninstall --yes',
  },
]

export const FLAGS = [
  { flag: '--variant <V>', desc: 'Request an exact variant: default, icon, wordmark, full, or mascot.' },
  { flag: '-o, --out <DIR>', desc: 'Target download directory (defaults to auto-detected project assets).' },
  { flag: '--dry-run', desc: 'Resolve the entity and simulate a download without writing files.' },
  { flag: '--zip', desc: 'Package downloaded vectors into a clean ZIP archive.' },
  { flag: '--offline', desc: 'Operate purely from the local cache without network requests.' },
  { flag: '--no-cache', desc: 'Bypass the HTTP cache and fetch the newest vector from Wikimedia.' },
  { flag: '-v, --verbose', desc: 'Enable detailed debug logs and HTTP request tracing.' },
  { flag: '--json', desc: 'Emit machine-readable JSON for scripts and CI pipelines.' },
]

export const VARIANTS = [
  {
    name: 'icon',
    flag: '--variant icon',
    aliases: ['symbol', 'mark'],
    desc: 'Fetches an isolated app symbol or standalone badge without surrounding logotype text.',
    example: 'svgfetch instagram --variant icon',
  },
  {
    name: 'wordmark',
    flag: '--variant wordmark',
    aliases: ['text', 'logotype'],
    desc: 'Fetches the typographic or textual logo without mascots or badges attached.',
    example: 'svgfetch docker --variant wordmark',
  },
  {
    name: 'full',
    flag: '--variant full',
    aliases: ['lockup'],
    desc: 'Fetches the complete brand presentation containing both mark and wordmark together.',
    example: 'svgfetch github --variant full',
  },
  {
    name: 'mascot',
    flag: '--variant mascot',
    aliases: ['character'],
    desc: 'Fetches the official brand or OS character illustration instead of the formal logo.',
    example: 'svgfetch linux --variant mascot',
  },
]

export const ENTITIES = [
  {
    query: 'svgfetch facebook',
    resolved: 'Facebook logo (blue circle / F mark)',
    rejected: 'Meta Platforms logo is strictly blocked',
    status: 'Separated Entities',
  },
  {
    query: 'svgfetch linux',
    resolved: 'Official Linux Foundation vector banner',
    rejected: 'Tux penguin is only chosen when requested as mascot',
    status: 'Semantic Precision',
  },
  {
    query: 'svgfetch kali linux',
    resolved: 'Kali Linux dragon shield logo',
    rejected: 'Base Linux or generic kernel graphics are excluded',
    status: 'Exact Distribution Match',
  },
]

export const SECURITY = [
  {
    icon: 'lock',
    title: 'Zip Slip & Traversal Defense',
    desc: 'Every remote filename and archive entry is sanitized against path traversal (../), null bytes, control characters, and reserved names before writing to disk.',
  },
  {
    icon: 'filecheck',
    title: 'Deterministic Provenance',
    desc: 'Downloads record author, source URL, Wikimedia file title, and license inside svgfetch-metadata.json without clobbering prior provenance.',
  },
  {
    icon: 'zap',
    title: 'Wikimedia API Etiquette',
    desc: 'A built-in rate limiter with exponential backoff retry on HTTP 429/5xx errors respects Wikimedia Commons community infrastructure.',
  },
  {
    icon: 'scale',
    title: 'Free & Open Source',
    desc: '100% free and community-driven. Anyone can inspect, customize, and contribute to keep the tool accessible to everyone.',
  },
]

export const TERMINAL_SCENARIOS = {
  direct: {
    name: 'Direct Fetch',
    cmd: 'svgfetch instagram --variant icon',
    output: [
      { type: 'info', text: '✓ Found curated brand match: Instagram (icon)' },
      { type: 'dim', text: '→ Source: File:Instagram icon.svg on Wikimedia Commons' },
      { type: 'dim', text: '→ Detected project directory: ./src/assets/' },
      { type: 'dim', text: '→ Streaming vector content and verifying UTF-8 XML...' },
      { type: 'success', text: '✔ Downloaded ./src/assets/Instagram_icon.svg (1.4 KiB)' },
      { type: 'success', text: '✔ Updated provenance: ./src/assets/svgfetch-metadata.json' },
    ],
  },
  tui: {
    name: 'Interactive TUI',
    cmd: 'svgfetch',
    output: [
      { type: 'info', text: '┌── SVGFetch Interactive Terminal Explorer ────────────────────────┐' },
      { type: 'dim', text: '│ Query: docker [3 results]                                        │' },
      { type: 'highlight', text: '│ > [1] Docker (container engine) logo.svg  (5.2 KB, CC BY-SA 4.0) │' },
      { type: 'dim', text: '│   [2] Docker wordmark.svg                 (2.1 KB, Apache-2.0)   │' },
      { type: 'dim', text: '│   [3] Docker Moby whale mascot.svg        (6.8 KB, CC BY-SA 4.0) │' },
      { type: 'info', text: '│ [Preview: V] [Select: Space] [Download: Enter] [Quit: Esc/q]     │' },
      { type: 'success', text: '└──────────────────────────────────────────────────────────────────┘' },
    ],
  },
  info: {
    name: 'Inspect Info',
    cmd: 'svgfetch info docker --variant wordmark',
    output: [
      { type: 'info', text: '=== SVGFetch Asset Metadata ===' },
      { type: 'dim', text: 'Brand:        Docker' },
      { type: 'dim', text: 'Variant:      wordmark (resolved via explicit flag)' },
      { type: 'dim', text: 'Title:        File:Docker wordmark.svg' },
      { type: 'dim', text: 'Author:       Docker Inc.' },
      { type: 'dim', text: 'License:      Apache-2.0' },
      { type: 'dim', text: 'Direct URL:   https://upload.wikimedia.org/.../Docker_wordmark.svg' },
      { type: 'success', text: 'Attribution:  Safe for commercial or educational citation' },
    ],
  },
  doctor: {
    name: 'CLI Doctor',
    cmd: 'svgfetch doctor',
    output: [
      { type: 'info', text: '=== SVGFetch Doctor Diagnostics ===' },
      { type: 'success', text: '✔ Network Connectivity: Reachable (Wikimedia Commons API 200 OK)' },
      { type: 'success', text: '✔ Local Disk Cache: Valid (~/Library/Caches/svgfetch)' },
      { type: 'success', text: '✔ Terminal Capabilities: 24-bit TrueColor & Halfblock UTF-8 OK' },
      { type: 'success', text: '✔ Write Permissions: Current directory is writable' },
      { type: 'success', text: 'All checks passed. System ready.' },
    ],
  },
}

export const FAQS = [
  {
    q: 'Does svgfetch require Node.js or a runtime?',
    a: 'No. svgfetch is a single statically-linked Rust binary. There is no Node, Python, or JVM dependency — it starts instantly and runs with near-zero memory overhead.',
  },
  {
    q: 'Where do the vectors come from?',
    a: "All assets are resolved from Wikimedia Commons, the world's largest repository of freely-licensed media. svgfetch records the source file, author, and license for every download.",
  },
  {
    q: 'How does variant matching actually work?',
    a: 'You can pass an explicit --variant flag (icon, wordmark, full, mascot) or let the smart parser infer intent from natural language. Explicit flags always win.',
  },
  {
    q: 'Can I use svgfetch in CI pipelines?',
    a: 'Yes. Use --json for machine-readable output, --dry-run to resolve without writing, and --offline to run entirely from the local cache in cached environments.',
  },
  {
    q: 'Is my project provenance preserved?',
    a: 'Downloads append to svgfetch-metadata.json rather than overwriting it, so previously recorded assets and attribution stay intact.',
  },
  {
    q: 'Is svgfetch free and open source?',
    a: 'Yes, svgfetch is 100% free and open source. You can view the code, report issues, and contribute directly on GitHub.',
  },
]

export const LIBRARY_STATS = [
  { value: 1900, suffix: '+', label: 'Brand SVGs' },
  { value: 1400, suffix: '+', label: 'Curated brands' },
  { value: 100, suffix: '%', label: 'Free to use' },
  { value: 0, label: 'Sign-up required' },
]
