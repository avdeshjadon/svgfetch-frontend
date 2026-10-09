import {
  INSTALL_COMMANDS,
  SECURITY,
  FEATURES,
  GITHUB_URL,
  NPM_URL,
  WM_URL,
} from './siteData'

const REPO = GITHUB_URL.replace('https://github.com/', '')

/* ------------------------------------------------------------------ *
 * Block helpers — keep the page definitions compact and readable.
 * ------------------------------------------------------------------ */
const LEAD = (text) => ({ type: 'lead', text })
const P = (text) => ({ type: 'p', text })
const H2 = (text) => ({ type: 'h2', text })
const CODE = (code, opts = {}) => ({ type: 'code', code, ...opts })
const TABS = (items) => ({ type: 'tabs', items })
const NOTE = (title, text) => ({ type: 'callout', variant: 'note', title, text })
const TIP = (title, text) => ({ type: 'callout', variant: 'tip', title, text })
const WARN = (title, text) => ({ type: 'callout', variant: 'warning', title, text })
const IMPORTANT = (title, text) => ({ type: 'callout', variant: 'important', title, text })
const LIST = (items) => ({ type: 'list', items })
const OLIST = (items) => ({ type: 'list', items, ordered: true })
const TABLE = (head, rows) => ({ type: 'table', head, rows })
const DEFS = (items) => ({ type: 'deflist', items })
const STEPS = (items) => ({ type: 'steps', items })
const ACTIONS = (items) => ({ type: 'actions', items })
const CARDS = (items) => ({ type: 'cards', items })

const featureCards = FEATURES.map((f) => ({ icon: f.icon, title: f.title, desc: f.desc }))
const securityCards = SECURITY.map((s) => ({ icon: s.icon, title: s.title, desc: s.desc }))

const related = (...items) => ACTIONS(items)

/* ------------------------------------------------------------------ *
 * Documentation tree
 * ------------------------------------------------------------------ */
export const DOC_GROUPS = [
  /* ================================================================ *
   * GETTING STARTED
   * ================================================================ */
  {
    title: 'Getting Started',
    items: [
      {
        id: 'introduction',
        title: 'Introduction',
        description: 'What svgfetch is, why it exists, and the problems it solves.',
        icon: 'book',
        keywords: 'overview about what is rust cli wikimedia install quick tour principles',
        blocks: [
          LEAD(
            'svgfetch is a blazing-fast, dependency-free command-line tool that discovers, inspects, and downloads official SVG vector assets from Wikimedia Commons — straight into your project.',
          ),
          NOTE(
            'One binary, zero runtime',
            'svgfetch ships as a single statically-linked binary. No Node, Python, or JVM required. It starts instantly and idles at near-zero memory.',
          ),
          H2('What is svgfetch?'),
          P(
            'Finding the right logo is annoying. You open a browser, search a dozen tabs, guess which file is the current version, and download something that is either a giant banner or a low-resolution PNG. svgfetch removes that entire loop.',
          ),
          P(
            'Type a brand name and svgfetch resolves the exact Wikimedia Commons asset in milliseconds. Ask for a specific variant with `--variant icon`, inspect metadata without downloading, or pipe machine-readable JSON into your build pipeline.',
          ),
          CARDS(featureCards),
          H2('Why another asset fetcher?'),
          P('Most icon tooling is either tied to one design system or silently returns the wrong logo. svgfetch is built around three ideas:'),
          LIST([
            '**Exact entity matching** — `facebook` never resolves to `Meta`, and `linux` never resolves to `Tux` unless you ask for it.',
            '**Explicit variants** — request `icon`, `wordmark`, `full`, or `mascot` and always get what you asked for.',
            '**Trustworthy provenance** — every download records its source file, author, and license so attribution is never a mystery.',
          ]),
          H2('The 30-second tour'),
          P('Install with the package manager you already use, then fetch something:'),
          TABS([
            { label: 'npm', code: INSTALL_COMMANDS.npm, prompt: true },
            { label: 'npx', code: INSTALL_COMMANDS.npx, prompt: true },
            { label: 'Homebrew', code: INSTALL_COMMANDS.brew, prompt: true },
            { label: 'Cargo', code: INSTALL_COMMANDS.cargo, prompt: true },
          ]),
          CODE('svgfetch instagram --variant icon', { prompt: true, title: 'Fetch an app icon' }),
          H2('At a glance'),
          TABLE(
            ['Attribute', 'Value'],
            [
              ['Language', 'Rust (statically linked)'],
              ['Runtime dependencies', 'None'],
              ['Asset source', 'Wikimedia Commons'],
              ['License', 'Free & open source (MIT)'],
              ['Platforms', 'macOS, Linux, Windows'],
              ['Distribution', 'npm, Cargo, Homebrew, install script'],
              ['Subcommands', '8+ composable commands'],
              ['Config format', 'TOML with environment overrides'],
            ],
          ),
          H2('Design principles'),
          DEFS([
            { term: 'Fast by default', desc: 'Startup and resolution are measured in milliseconds. There is no daemon and no background process.' },
            { term: 'Deterministic', desc: 'The same query and flags always resolve to the same asset, on every machine.' },
            { term: 'Explicit over clever', desc: 'Inference is a convenience, never a trap. An explicit flag always wins.' },
            { term: 'Safe with input', desc: 'Every remote filename and byte of markup is validated before touching your disk.' },
            { term: 'Transparent', desc: 'svgfetch tells you exactly which entity, file, and variant it resolved.' },
            { term: 'Free forever', desc: 'MIT-licensed, community-driven, and open to contributions of every size.' },
          ]),
          IMPORTANT(
            'Assets have their own licenses',
            'The svgfetch tool is MIT-licensed, but each SVG you download carries its own Wikimedia Commons license. svgfetch records it for you automatically.',
          ),
          H2('Where to go next'),
          related(
            { label: 'Install svgfetch', href: '#docs/installation', variant: 'primary' },
            { label: 'Quick start', href: '#docs/quick-start' },
            { label: 'Core concepts', href: '#docs/concepts' },
            { label: 'Star on GitHub', href: GITHUB_URL, external: true },
          ),
        ],
      },
      {
        id: 'installation',
        title: 'Installation',
        description: 'Install svgfetch on macOS, Linux, or Windows in seconds.',
        icon: 'download',
        keywords: 'install setup npm cargo brew homebrew curl powershell npx completions from source',
        blocks: [
          LEAD(
            'svgfetch installs in one command on every major platform. Pick the package manager you already use — there is nothing else to configure.',
          ),
          TIP(
            'No runtime required',
            'You do not need Rust, Node, or Python installed to use svgfetch. The installers below fetch a prebuilt binary for your platform.',
          ),
          H2('Requirements'),
          LIST([
            'A modern terminal (any shell — bash, zsh, fish, PowerShell).',
            'Network access to Wikimedia Commons for first-time fetches.',
            'That is it. svgfetch has **no runtime dependencies**.',
          ]),
          H2('Install'),
          TABS([
            { label: 'npm', title: 'npm (recommended)', code: INSTALL_COMMANDS.npm, prompt: true },
            { label: 'npx', title: 'Run without installing', code: INSTALL_COMMANDS.npx, prompt: true },
            { label: 'Cargo', title: 'Cargo (Rust toolchain)', code: INSTALL_COMMANDS.cargo, prompt: true },
            { label: 'Homebrew', title: 'Homebrew (macOS & Linux)', code: INSTALL_COMMANDS.brew, prompt: true },
            { label: 'Shell', title: 'Shell installer', code: INSTALL_COMMANDS.curl, prompt: true },
            { label: 'PowerShell', title: 'PowerShell (Windows)', code: INSTALL_COMMANDS.powershell, prompt: true },
          ]),
          NOTE(
            'About --locked',
            'When installing from source with Cargo, always pass `--locked` so the build uses the exact dependency versions svgfetch was tested with.',
          ),
          H2('Verify the install'),
          CODE('svgfetch --version', { prompt: true, title: 'Check the version' }),
          CODE('svgfetch doctor', { prompt: true, title: 'Run the diagnostics' }),
          P(
            'The doctor command checks network connectivity, cache integrity, write permissions, and terminal color support — so you know svgfetch is ready before you rely on it.',
          ),
          H2('Upgrade'),
          TABLE(
            ['Installed with', 'Upgrade command'],
            [
              ['npm', '`npm update -g svgfetch`'],
              ['Cargo', '`cargo install svgfetch --locked`'],
              ['Homebrew', '`brew upgrade svgfetch`'],
              ['Shell script', 'Re-run the install script'],
            ],
          ),
          H2('Uninstall'),
          CODE('svgfetch uninstall --yes', { prompt: true }),
          WARN(
            'Dry-run by default',
            'Running `svgfetch uninstall` without `--yes` performs an interactive dry-run first, showing exactly which binaries, caches, and config files would be removed.',
          ),
          H2('Where things are installed'),
          TABLE(
            ['Manager', 'Binary location', 'Cache location'],
            [
              ['npm', 'npm global `bin`', '`~/.cache/svgfetch`'],
              ['Cargo', '`~/.cargo/bin`', '`~/.cache/svgfetch`'],
              ['Homebrew', '`/opt/homebrew/bin`', '`~/Library/Caches/svgfetch`'],
              ['Shell script', '`~/.local/bin`', '`~/.cache/svgfetch`'],
            ],
          ),
          H2('Shell completions'),
          P('svgfetch can generate completion scripts for your shell. See [Shell completions](#docs/completions) for the full guide.'),
          CODE('svgfetch completions zsh > ~/.zfunc/_svgfetch', { prompt: true }),
          H2('Platform support'),
          TABLE(
            ['Platform', 'Architectures', 'Status'],
            [
              ['macOS', 'arm64, x86_64', 'Fully supported'],
              ['Linux', 'x86_64, aarch64', 'Fully supported'],
              ['Windows', 'x86_64', 'Fully supported'],
            ],
          ),
          H2('Building from source'),
          CODE(
            [
              `git clone ${GITHUB_URL}.git`,
              'cd svgfetch',
              'cargo build --release --locked',
              './target/release/svgfetch --version',
            ].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          H2('Troubleshooting install'),
          LIST([
            'Command not found after install — open a new shell, or confirm the binary directory is on your `PATH`.',
            'Permission denied when writing the binary — use `--global` with npm or a user-writable prefix with Cargo.',
            'Wrong architecture on Apple Silicon — install the `arm64` build (npm and Homebrew pick this automatically).',
          ]),
          related(
            { label: 'Quick start', href: '#docs/quick-start', variant: 'primary' },
            { label: 'Shell completions', href: '#docs/completions' },
            { label: 'Troubleshooting', href: '#docs/troubleshooting' },
          ),
        ],
      },
      {
        id: 'quick-start',
        title: 'Quick start',
        description: 'Go from zero to a downloaded SVG in under a minute.',
        icon: 'rocket',
        keywords: 'quick start first command tutorial walkthrough workflow search info download automate',
        blocks: [
          LEAD(
            'This five-minute walkthrough takes you from a fresh install to downloading assets, inspecting metadata, and wiring svgfetch into a script.',
          ),
          H2('The five commands you will use'),
          STEPS([
            { title: 'Search', text: 'List matching Commons files without downloading.', code: 'svgfetch search "Amazon"' },
            { title: 'Inspect', text: 'Review author, license, and variants before committing.', code: 'svgfetch info docker' },
            { title: 'Fetch', text: 'Download a specific variant into your project.', code: 'svgfetch instagram --variant icon' },
            { title: 'Verify', text: 'Confirm the file and its provenance were written.', code: 'svgfetch info docker --variant wordmark' },
            { title: 'Automate', text: 'Embed svgfetch in scripts and CI with JSON output.', code: 'svgfetch redis --variant icon --dry-run --json' },
          ]),
          H2('1. Search for an asset'),
          P('Use `svgfetch search` to list matching Commons files. Add `--json` for machine-readable output.'),
          CODE('svgfetch search "Amazon" --json', { prompt: true, title: 'Search Wikimedia Commons' }),
          H2('2. Inspect before you download'),
          P('Use `svgfetch info` to review the author, license, file title, and available variants.'),
          CODE('svgfetch info docker --variant wordmark', { prompt: true, title: 'Review metadata and variants' }),
          H2('3. Download the exact variant'),
          P('Use a direct query with `--variant` to write a clean SVG into your project.'),
          CODE('svgfetch instagram --variant icon', { prompt: true, title: 'Fetch an icon into your assets' }),
          P(
            'svgfetch auto-detects your project assets directory, verifies the SVG markup, and writes a clean, optimization-ready file — then records provenance alongside it.',
          ),
          H2('4. Verify the output'),
          CODE('ls -la ./src/assets', { prompt: true, title: 'Confirm the file was written' }),
          P('You should see the SVG plus a `svgfetch-metadata.json` file containing author, license, and source URL.'),
          H2('5. Automate it'),
          CODE('svgfetch docker --variant icon --dry-run --json', {
            prompt: true,
            title: 'Resolve without writing (safe for CI validation)',
          }),
          H2('Common workflows'),
          TABLE(
            ['Goal', 'Command'],
            [
              ['Grab an app icon', '`svgfetch instagram --variant icon`'],
              ['Grab a full lockup', '`svgfetch github --variant full`'],
              ['Fetch an OS mascot', '`svgfetch linux --variant mascot`'],
              ['Download a known file', "`svgfetch download 'File:Amazon logo.svg'`"],
              ['Bundle several at once', '`svgfetch docker --zip`'],
              ['Work entirely offline', '`svgfetch redis --offline`'],
              ['Pick interactively', '`svgfetch`'],
            ],
          ),
          TIP(
            'Prefer the TUI?',
            'Run `svgfetch` with no arguments to open the interactive terminal explorer with live search, arrow-key selection, and instant vector preview.',
          ),
          H2('What svgfetch wrote'),
          LIST([
            'The resolved SVG, named after the Commons file title.',
            'A `svgfetch-metadata.json` file recording author, license, source, and variant.',
            'Optionally, a `.zip` archive when you pass `--zip`.',
          ]),
          related(
            { label: 'Explore the TUI', href: '#docs/terminal', variant: 'primary' },
            { label: 'Full command reference', href: '#docs/commands' },
            { label: 'Scripting guide', href: '#docs/scripting' },
          ),
        ],
      },
      {
        id: 'concepts',
        title: 'Core concepts',
        description: 'The mental model behind entities, variants, and resolution.',
        icon: 'compass',
        keywords: 'concepts mental model entity variant asset resolution provenance cache vocabulary',
        blocks: [
          LEAD(
            'svgfetch is small, but a handful of concepts make everything else click. Read this once and the rest of the docs become obvious.',
          ),
          H2('The mental model'),
          P(
            'Think of svgfetch as a resolver. You give it a query plus optional constraints, it returns one canonical asset. Everything else — search, inspect, download, cache — is a variation on that single resolution step.',
          ),
          H2('Core vocabulary'),
          DEFS([
            { term: 'Entity', desc: 'A distinct brand, product, organisation, or operating system. `Facebook` and `Meta` are separate entities.' },
            { term: 'Asset', desc: 'A single SVG file on Wikimedia Commons belonging to an entity.' },
            { term: 'Variant', desc: 'The presentation of an asset: `icon`, `wordmark`, `full`, or `mascot`.' },
            { term: 'Resolution', desc: 'The process of turning a query plus constraints into one concrete asset.' },
            { term: 'Provenance', desc: 'The recorded origin of an asset: file title, author, license, and source URL.' },
            { term: 'Cache', desc: 'A local store of network responses and assets that makes repeat runs instant.' },
          ]),
          H2('The resolution pipeline'),
          STEPS([
            { title: 'Normalise', text: 'The query is lowercased, trimmed, and tokenised.' },
            { title: 'Match', text: 'Candidates in the curated index are scored against the query.' },
            { title: 'Disambiguate', text: 'Blocking rules remove entities you did not ask for.' },
            { title: 'Constrain', text: 'An explicit `--variant` narrows the candidate set to one presentation.' },
            { title: 'Resolve', text: 'The winning asset is reported, then downloaded or returned as JSON.' },
          ]),
          H2('Variants at a glance'),
          TABLE(
            ['Variant', 'Use it for', 'Typical size'],
            [
              ['`icon`', 'App marks and avatars', 'Small, square'],
              ['`wordmark`', 'Text-only typography', 'Wide'],
              ['`full`', 'Mark plus text lockups', 'Wide'],
              ['`mascot`', 'Characters and OS mascots', 'Variable'],
            ],
          ),
          H2('Entity separation'),
          P(
            'Generic scrapers confuse parent companies with their products. svgfetch uses a curated index with explicit blocking rules, so `facebook` and `meta` stay distinct, and `linux` stays separate from `Tux` unless you request the mascot.',
          ),
          H2('The output model'),
          LIST([
            'By default svgfetch writes files and prints a human-readable summary.',
            'With `--json` it prints structured data and, unless you also pass `--dry-run`, still writes files.',
            'With `--dry-run` it resolves and reports but never touches disk.',
            'Every write appends to `svgfetch-metadata.json` for provenance.',
          ]),
          NOTE(
            'Determinism is a promise',
            'The same query, flags, and cache state always resolve to the same asset. This is what makes svgfetch safe to use in reproducible builds.',
          ),
          related(
            { label: 'Entity resolution', href: '#docs/entities', variant: 'primary' },
            { label: 'Asset variants', href: '#docs/variants' },
            { label: 'Architecture', href: '#docs/architecture' },
          ),
        ],
      },
    ],
  },

  /* ================================================================ *
   * GUIDES
   * ================================================================ */
  {
    title: 'Guides',
    items: [
      {
        id: 'terminal',
        title: 'Interactive TUI',
        description: 'Live search, arrow-key navigation, and halfblock vector preview.',
        icon: 'terminal',
        keywords: 'tui interactive terminal explorer preview keyboard search multi-select',
        blocks: [
          LEAD(
            'Run svgfetch with no arguments to launch the interactive terminal explorer — a full-screen TUI with live search, arrow-key selection, and instant vector preview rendered right in your terminal.',
          ),
          { type: 'terminal' },
          H2('What the TUI gives you'),
          LIST([
            'Live, incremental search across the curated brand index.',
            'Halfblock vector previews rendered in true color.',
            'Arrow-key selection with multi-pick support.',
            'In-place metadata and license inspection before download.',
            'Batch download of everything you selected, in one action.',
          ]),
          H2('Keyboard shortcuts'),
          TABLE(
            ['Key', 'Action'],
            [
              ['{{↑}} / {{↓}}', 'Move the selection'],
              ['{{/}}', 'Focus the search field'],
              ['{{Space}}', 'Toggle selection of the highlighted result'],
              ['{{V}}', 'Toggle the vector preview pane'],
              ['{{Enter}}', 'Download the selected result(s)'],
              ['{{Tab}}', 'Cycle through result columns'],
              ['{{Esc}} or {{q}}', 'Quit the explorer'],
            ],
          ),
          H2('Preview modes'),
          DEFS([
            { term: 'Halfblock', desc: 'The default. Renders the vector using Unicode half-block characters — works in almost every terminal.' },
            { term: 'True color', desc: 'Full 24-bit color output when your terminal supports it.' },
            { term: 'Plain', desc: 'A text-only summary for very limited terminals or logging.' },
          ]),
          H2('Multi-select and batch download'),
          P(
            'Highlight a result and press `Space` to add it to your selection. Repeat for as many results as you need, then press `Enter` to download them all at once. svgfetch writes each asset and updates provenance in a single pass.',
          ),
          TIP(
            'Search is instant',
            'The TUI filters the curated index locally as you type, so results appear without a round-trip to Wikimedia. Network access is only needed when you actually download.',
          ),
          WARN(
            'Terminal requirements',
            'The preview uses 24-bit true color and Unicode half-blocks. Run `svgfetch doctor` to confirm your terminal supports both; the TUI degrades gracefully when it does not.',
          ),
          H2('If the TUI does not open'),
          LIST([
            'Make sure stdout is a TTY — piping `svgfetch` into another program disables the TUI.',
            'Set `SVGFETCH_NO_COLOR=1` for monochrome rendering in limited terminals.',
            'Fall back to non-interactive commands like `svgfetch search` and `svgfetch <query>`.',
          ]),
          related(
            { label: 'Search command', href: '#docs/cmd-search', variant: 'primary' },
            { label: 'Downloading assets', href: '#docs/downloading' },
            { label: 'Doctor', href: '#docs/cmd-doctor' },
          ),
        ],
      },
      {
        id: 'variants',
        title: 'Asset variants',
        description: 'Request icon, wordmark, full lockup, or mascot explicitly.',
        icon: 'layers',
        keywords: 'variant icon wordmark full mascot logo lockup symbol mark resolution fallback',
        blocks: [
          LEAD(
            'A single brand often has several official vectors — an app icon, a typographic wordmark, a full lockup, and sometimes a mascot. svgfetch lets you pick exactly which one you want, every time.',
          ),
          WARN(
            'Never ship the wrong logo',
            'Without a variant flag, svgfetch uses smart inference — but an explicit `--variant` always wins. When precision matters, be explicit.',
          ),
          H2('Available variants'),
          { type: 'variants' },
          H2('How variant resolution works'),
          STEPS([
            { title: 'Explicit flag first', text: 'If you pass `--variant`, svgfetch resolves only that variant and errors clearly if it is unavailable.' },
            { title: 'Natural-language inference', text: 'Otherwise the parser reads your query — words like `mark`, `logo`, `text`, or `mascot` bias the resolution.' },
            { title: 'Curated fallback', text: 'If nothing is specified, svgfetch falls back to the brand\u2019s best-known presentation and tells you which variant it chose.' },
          ]),
          H2('Choosing a variant'),
          TABLE(
            ['You want…', 'Use', 'Example'],
            [
              ['A 24px app mark', '`--variant icon`', '`svgfetch slack --variant icon`'],
              ['Text-only typography', '`--variant wordmark`', '`svgfetch docker --variant wordmark`'],
              ['Mark + text together', '`--variant full`', '`svgfetch github --variant full`'],
              ['The character/mascot', '`--variant mascot`', '`svgfetch linux --variant mascot`'],
            ],
          ),
          H2('Aliases'),
          P('Each variant accepts friendly aliases so natural queries feel natural:'),
          DEFS([
            { term: 'icon', desc: 'Also matched by `symbol` and `mark`.' },
            { term: 'wordmark', desc: 'Also matched by `text` and `logotype`.' },
            { term: 'full', desc: 'Also matched by `lockup`.' },
            { term: 'mascot', desc: 'Also matched by `character`.' },
          ]),
          H2('When a variant is unavailable'),
          P(
            'If you request a variant that an entity does not publish, svgfetch exits with a clear message and a non-zero code. Use `svgfetch info <query>` first to see which variants exist.',
          ),
          CODE('svgfetch info docker --variant wordmark', { prompt: true, title: 'Check available variants before downloading' }),
          TIP(
            'Variant + entity = precision',
            'The most reliable svgfetch command is `svgfetch <entity> --variant <variant>`. It removes every guess from the process.',
          ),
          related(
            { label: 'Entity resolution', href: '#docs/entities', variant: 'primary' },
            { label: 'Inspecting assets', href: '#docs/inspecting' },
            { label: 'Downloading assets', href: '#docs/downloading' },
          ),
        ],
      },
      {
        id: 'entities',
        title: 'Entity resolution',
        description: 'How svgfetch keeps related-but-different brands apart.',
        icon: 'compass',
        keywords: 'entity disambiguation facebook meta linux tux separation matching blocking rules',
        blocks: [
          LEAD(
            'Generic scrapers confuse parent companies with their products, or mascots with logos. svgfetch uses curated disambiguation rules so the entity you asked for is the entity you get.',
          ),
          H2('Worked examples'),
          { type: 'entities' },
          H2('How resolution works'),
          STEPS([
            { title: 'Normalise the query', text: 'The query is lowercased, trimmed, and matched against the curated brand index.' },
            { title: 'Score candidates', text: 'Each candidate receives a score based on exact name, aliases, category, and desired variant.' },
            { title: 'Apply separation rules', text: 'Explicitly blocked pairs (for example, Meta when you asked for Facebook) are filtered out entirely.' },
            { title: 'Confirm and report', text: 'svgfetch prints which entity and variant it resolved, so there are no silent surprises.' },
          ]),
          H2('Explicit vs inferred'),
          TABLE(
            ['Input', 'Resolves to', 'Why'],
            [
              ['`facebook`', 'Facebook blue F mark', 'Meta is strictly blocked for this query'],
              ['`meta`', 'Meta Platforms wordmark', 'Distinct entity with its own rules'],
              ['`linux`', 'Linux Foundation vector', 'Tux requires an explicit mascot request'],
              ['`linux --variant mascot`', 'Tux the penguin', 'Explicit variant overrides the default'],
              ['`kali linux`', 'Kali dragon shield', 'Exact distribution match wins over base Linux'],
            ],
          ),
          H2('Disambiguation rules'),
          LIST([
            'Parent companies and their products are separate entities with separate rules.',
            'Distributions and forks are matched before their upstream project.',
            'Mascots are treated as a variant, never the default.',
            'Ambiguous short names resolve to the most widely recognised entity, with the choice reported.',
          ]),
          NOTE(
            'Transparent by default',
            'Run `svgfetch info <query>` to see exactly which entity, file, and variant svgfetch would resolve before you commit to a download.',
          ),
          H2('Reporting a wrong match'),
          P(
            'Found a query that resolves to the wrong entity? Open an issue with the query you ran and the result you expected — the curated index is community-maintained.',
          ),
          related(
            { label: 'Report an issue', href: `${GITHUB_URL}/issues/new`, variant: 'primary', external: true },
            { label: 'Core concepts', href: '#docs/concepts' },
            { label: 'Resolution engine', href: '#docs/resolution-engine' },
          ),
        ],
      },
      {
        id: 'searching',
        title: 'Searching',
        description: 'Find assets on Wikimedia Commons without downloading them.',
        icon: 'search',
        keywords: 'search find query json jsonl table results filter limit pagination',
        blocks: [
          LEAD(
            'The `search` command queries Wikimedia Commons and returns matching files. It never writes to disk, which makes it the safe first step in any workflow.',
          ),
          H2('Basic search'),
          CODE('svgfetch search "visual studio code"', { prompt: true }),
          P('Results print as a clean ASCII table with the file title, size, and license.'),
          H2('Structured output'),
          CODE('svgfetch search "rust" --json', { prompt: true, title: 'JSON output' }),
          CODE('svgfetch search "rust" --jsonl', { prompt: true, title: 'Newline-delimited JSON (streaming)' }),
          P('`--jsonl` emits one JSON object per line — ideal for piping into `jq`, `while read`, or a log processor.'),
          H2('Filtering results'),
          TABLE(
            ['Flag', 'Effect'],
            [
              ['`--variant <V>`', 'Only return candidates that can satisfy the variant'],
              ['`--limit <N>`', 'Cap the number of results'],
              ['`--json` / `--jsonl`', 'Machine-readable output'],
              ['`--no-cache`', 'Ignore cached responses for a fresh search'],
            ],
          ),
          H2('Reading the results'),
          DEFS([
            { term: 'title', desc: 'The Wikimedia file title, e.g. `File:Rust programming language black logo.svg`.' },
            { term: 'size', desc: 'The byte size of the SVG on Commons.' },
            { term: 'license', desc: 'The license attached to that file.' },
            { term: 'variant', desc: 'The variant svgfetch would assign to this result.' },
          ]),
          TIP(
            'Search then fetch',
            'Copy a file title from `search` and pass it to `download` for a precise, URL-free fetch: `svgfetch download "File:...svg"`.',
          ),
          related(
            { label: 'Download command', href: '#docs/cmd-download', variant: 'primary' },
            { label: 'Search command reference', href: '#docs/cmd-search' },
            { label: 'Output formats', href: '#docs/output-formats' },
          ),
        ],
      },
      {
        id: 'downloading',
        title: 'Downloading assets',
        description: 'Write the exact SVG you need into your project.',
        icon: 'download',
        keywords: 'download fetch write output directory zip dry-run overwrite naming variant',
        blocks: [
          LEAD(
            'Direct queries are the heart of svgfetch: give it an entity and optional variant, and it writes a verified SVG into your project.',
          ),
          H2('Basic download'),
          CODE('svgfetch instagram', { prompt: true }),
          H2('Choose the output directory'),
          CODE('svgfetch docker --variant icon -o ./public/brands', { prompt: true }),
          P('Without `-o`, svgfetch auto-detects your assets directory (for example `./src/assets`, `./public`, or `./static`).'),
          H2('Choose a variant'),
          CODE('svgfetch github --variant full', { prompt: true }),
          H2('Bundle multiple assets'),
          CODE('svgfetch docker --zip', { prompt: true, title: 'Package the download into a ZIP archive' }),
          H2('Preview without writing'),
          CODE('svgfetch redis --variant icon --dry-run', { prompt: true, title: 'Resolve and report, but write nothing' }),
          H2('Overwrite behavior'),
          TABLE(
            ['Situation', 'Default behavior'],
            [
              ['File does not exist', 'Write the new file'],
              ['File exists, identical', 'Skip (no change)'],
              ['File exists, differs', 'Report a conflict; use `--force` to overwrite'],
              ['Dry-run', 'Never write'],
            ],
          ),
          H2('File naming'),
          P(
            'Files are named after the Wikimedia file title, trimmed of the `File:` prefix. This keeps names stable and traceable back to their source.',
          ),
          H2('After the download'),
          LIST([
            'The SVG is verified as UTF-8 XML before being written.',
            'Provenance is appended to `svgfetch-metadata.json`.',
            'If `--zip` was set, an archive is written next to the assets.',
          ]),
          TIP(
            'Optimize after fetching',
            'svgfetch writes clean markup, but you can still run SVGO or `svgo --config` over the output for maximum compression.',
          ),
          related(
            { label: 'Download command reference', href: '#docs/cmd-download', variant: 'primary' },
            { label: 'Offline & caching', href: '#docs/offline-caching' },
            { label: 'Recipes', href: '#docs/recipes' },
          ),
        ],
      },
      {
        id: 'inspecting',
        title: 'Inspecting assets',
        description: 'Review metadata, licenses, and variants before downloading.',
        icon: 'info',
        keywords: 'info inspect metadata license author attribution provenance before download',
        blocks: [
          LEAD(
            'The `info` command resolves a query and prints everything svgfetch knows — without downloading a byte. It is the safest way to confirm you are about to fetch the right asset.',
          ),
          H2('Using info'),
          CODE('svgfetch info docker --variant wordmark', { prompt: true }),
          H2('Fields returned'),
          DEFS([
            { term: 'Brand', desc: 'The resolved entity name.' },
            { term: 'Variant', desc: 'The resolved variant and whether it was explicit or inferred.' },
            { term: 'Title', desc: 'The Wikimedia file title.' },
            { term: 'Author', desc: 'The credited author or organisation.' },
            { term: 'License', desc: 'The license attached to the file.' },
            { term: 'Direct URL', desc: 'The canonical Commons download URL.' },
          ]),
          H2('Machine-readable metadata'),
          CODE('svgfetch info docker --json', { prompt: true }),
          H2('Checking the license before you ship'),
          P(
            'Licenses vary across Wikimedia files — some require attribution, some are public domain. `info` surfaces the license so you can decide before the asset enters your repository.',
          ),
          NOTE(
            'Provenance is recorded on download',
            'When you do download, the same fields are written into `svgfetch-metadata.json` so attribution survives long after the terminal session ends.',
          ),
          related(
            { label: 'Info command reference', href: '#docs/cmd-info', variant: 'primary' },
            { label: 'Metadata & provenance', href: '#docs/metadata' },
            { label: 'Licensing of assets', href: '#docs/wikimedia-etiquette' },
          ),
        ],
      },
      {
        id: 'offline-caching',
        title: 'Offline & caching',
        description: 'Run svgfetch without touching the network.',
        icon: 'package',
        keywords: 'offline cache caching air-gapped reproducible no-cache warm pre-seed',
        blocks: [
          LEAD(
            'svgfetch caches network responses and resolved assets locally. That makes repeat runs instant and lets you run the tool with no network at all.',
          ),
          H2('How caching works'),
          P(
            'Every successful Wikimedia request and every resolved asset is stored in the local cache directory. Subsequent runs check the cache first, so the same fetch costs nothing.',
          ),
          H2('Using offline mode'),
          CODE('svgfetch redis --variant icon --offline', { prompt: true }),
          P('With `--offline`, svgfetch never makes a network request. If the asset is not cached, it fails cleanly instead of hanging.'),
          H2('Refreshing the cache'),
          CODE('svgfetch redis --no-cache', { prompt: true, title: 'Bypass the cache for the newest Commons revision' }),
          H2('Cache lifecycle'),
          STEPS([
            { title: 'Warm', text: 'Fetch assets normally while online to populate the cache.' },
            { title: 'Reuse', text: 'Later runs resolve from the cache instantly.' },
            { title: 'Prune', text: 'Run `svgfetch cache prune` to remove stale entries.' },
            { title: 'Clear', text: 'Run `svgfetch cache clear` to empty the cache entirely.' },
          ]),
          H2('Related commands'),
          TABLE(
            ['Command', 'Purpose'],
            [
              ['`svgfetch cache`', 'Show cache location and size'],
              ['`svgfetch cache prune`', 'Remove stale entries'],
              ['`svgfetch cache clear`', 'Empty the cache'],
              ['`svgfetch <query> --offline`', 'Resolve from cache only'],
              ['`svgfetch <query> --no-cache`', 'Ignore cache for this run'],
            ],
          ),
          H2('Air-gapped and reproducible builds'),
          P(
            'Pre-seed the cache on a connected machine, copy the cache directory to the isolated environment, then fetch with `--offline`. Combined with `--json --dry-run`, this produces deterministic, auditable builds.',
          ),
          CODE(
            [
              'svgfetch cache --print-path',
              '# copy that directory to the air-gapped host',
              'svgfetch docker --variant full --offline',
            ].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          TIP(
            'Offline is safe for CI',
            'In constrained CI environments, pre-seeding plus `--offline` eliminates flaky network failures from your pipeline.',
          ),
          related(
            { label: 'Caching internals', href: '#docs/caching', variant: 'primary' },
            { label: 'CI/CD integration', href: '#docs/ci-cd' },
            { label: 'Air-gapped usage', href: '#docs/air-gapped' },
          ),
        ],
      },
      {
        id: 'configuration',
        title: 'Configuration',
        description: 'Config files, environment variables, and provenance metadata.',
        icon: 'settings',
        keywords: 'configuration config toml env environment variables metadata provenance project global',
        blocks: [
          LEAD(
            'svgfetch works with zero configuration, but you can tune defaults, set a preferred output directory, and control caching through a small config file or environment variables.',
          ),
          H2('Config resolution order'),
          P('Values are merged in order, with later sources overriding earlier ones:'),
          OLIST([
            'Built-in defaults',
            'Global config file (`~/.config/svgfetch/config.toml`)',
            'Project config file (`./.svgfetch.toml`)',
            'Environment variables',
            'Command-line flags',
          ]),
          H2('Project config'),
          CODE(
            [
              '# .svgfetch.toml — committed with your project',
              'out = "./src/assets"',
              'variant = "icon"',
              '',
              '[network]',
              'cache = true',
              'offline = false',
              'retries = 3',
              'timeout = 20',
              '',
              '[download]',
              'zip = false',
              'force = false',
            ].join('\n'),
            { title: '.svgfetch.toml', lang: 'toml' },
          ),
          H2('Global config'),
          CODE(
            [
              '# ~/.config/svgfetch/config.toml — your personal defaults',
              'out = "~/Projects/assets"',
              'no_color = false',
            ].join('\n'),
            { title: 'config.toml', lang: 'toml' },
          ),
          H2('All configuration keys'),
          TABLE(
            ['Key', 'Type', 'Default', 'Description'],
            [
              ['`out`', 'string', 'auto', 'Default download directory'],
              ['`variant`', 'string', 'inferred', 'Default variant when none is passed'],
              ['`network.cache`', 'bool', '`true`', 'Enable the HTTP/asset cache'],
              ['`network.offline`', 'bool', '`false`', 'Never make network requests'],
              ['`network.retries`', 'int', '`3`', 'Retry attempts on transient failures'],
              ['`network.timeout`', 'int', '`20`', 'Per-request timeout in seconds'],
              ['`download.zip`', 'bool', '`false`', 'Package downloads into a ZIP'],
              ['`download.force`', 'bool', '`false`', 'Overwrite existing differing files'],
              ['`no_color`', 'bool', '`false`', 'Disable ANSI color output'],
            ],
          ),
          H2('Environment variables'),
          DEFS([
            { term: 'SVGFETCH_OUT', desc: 'Default download directory.' },
            { term: 'SVGFETCH_CACHE_DIR', desc: 'Override the cache location.' },
            { term: 'SVGFETCH_OFFLINE', desc: 'When set, never make network requests.' },
            { term: 'SVGFETCH_NO_COLOR', desc: 'Disable ANSI color output.' },
            { term: 'SVGFETCH_CONFIG', desc: 'Path to an explicit config file.' },
          ]),
          H2('Provenance metadata'),
          P(
            'Every download appends a record to `svgfetch-metadata.json` next to your assets. Records are appended, never overwritten, so earlier attribution stays intact.',
          ),
          CODE(
            [
              '{',
              '  "Instagram_icon.svg": {',
              '    "title": "File:Instagram icon.svg",',
              '    "author": "Instagram",',
              '    "license": "CC BY-SA 4.0",',
              '    "source": "https://commons.wikimedia.org/wiki/File:Instagram_icon.svg",',
              '    "variant": "icon",',
              '    "fetchedAt": "2026-01-01T00:00:00Z"',
              '  }',
              '}',
            ].join('\n'),
            { title: 'svgfetch-metadata.json', lang: 'json' },
          ),
          NOTE(
            'Config is optional',
            'If no config file exists, svgfetch auto-detects your assets directory and behaves deterministically. You only need a config file to override defaults.',
          ),
          related(
            { label: 'Environment variables', href: '#docs/environment', variant: 'primary' },
            { label: 'Metadata schema', href: '#docs/metadata' },
            { label: 'Flags & options', href: '#docs/flags' },
          ),
        ],
      },
      {
        id: 'scripting',
        title: 'Scripting & JSON',
        description: 'Use svgfetch in shell scripts, Node, and Python.',
        icon: 'braces',
        keywords: 'scripting json parse jq bash node python automation exit codes machine readable',
        blocks: [
          LEAD(
            'svgfetch is built to be scripted. Structured output, stable exit codes, and a `--dry-run` mode make it safe to drop into any automation.',
          ),
          H2('Why JSON output'),
          LIST([
            'Parse exactly the fields you need with `jq` or a JSON parser.',
            'Branch on structured results instead of scraping human text.',
            'Log fully reproducible, auditable records.',
          ]),
          H2('Resolve and parse with jq'),
          CODE(
            [
              'svgfetch docker --json | jq -r .file',
              'svgfetch search "rust" --jsonl | jq -r .title',
            ].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          H2('Bash loop'),
          CODE(
            [
              'for brand in instagram github redis postgresql; do',
              '  svgfetch "$brand" --variant icon --json > /dev/null || exit 1',
              'done',
              'echo "all assets fetched"',
            ].join('\n'),
            { title: 'fetch-many.sh', lang: 'bash', prompt: true },
          ),
          H2('Node script'),
          CODE(
            [
              "import { execFileSync } from 'node:child_process';",
              '',
              'const raw = execFileSync(\'svgfetch\', [\'docker\', \'--json\'], {',
              '  encoding: \'utf8\',',
              '});',
              'const asset = JSON.parse(raw);',
              'console.log(asset.title, asset.variant);',
            ].join('\n'),
            { title: 'fetch.mjs', lang: 'javascript' },
          ),
          H2('Python script'),
          CODE(
            [
              'import json, subprocess',
              '',
              'out = subprocess.check_output(["svgfetch", "redis", "--json"], text=True)',
              'asset = json.loads(out)',
              'print(asset["title"], asset["variant"])',
            ].join('\n'),
            { title: 'fetch.py', lang: 'python' },
          ),
          H2('Exit codes in scripts'),
          P('Use stable exit codes to distinguish failure types — see [Exit codes](#docs/exit-codes) for the full table.'),
          NOTE(
            'Dry-run is your friend',
            'In CI validation, prefer `--dry-run --json`. It resolves and validates without writing files, so a failing job never leaves a half-populated directory.',
          ),
          related(
            { label: 'Exit codes', href: '#docs/exit-codes', variant: 'primary' },
            { label: 'Output formats', href: '#docs/output-formats' },
            { label: 'CI/CD integration', href: '#docs/ci-cd' },
          ),
        ],
      },
      {
        id: 'ci-cd',
        title: 'CI/CD integration',
        description: 'Wire svgfetch into GitHub Actions, GitLab, Make, and npm.',
        icon: 'git',
        keywords: 'ci cd github actions gitlab makefile package.json pipeline automation cache',
        blocks: [
          LEAD(
            'svgfetch fits cleanly into any pipeline. This page shows the patterns we recommend for the most common CI systems.',
          ),
          H2('GitHub Actions'),
          CODE(
            [
              'name: fetch-assets',
              'on: [push]',
              'jobs:',
              '  assets:',
              '    runs-on: ubuntu-latest',
              '    steps:',
              '      - uses: actions/checkout@v4',
              '      - uses: actions/setup-node@v4',
              '        with: { node-version: 20 }',
              '      - run: npm install -g svgfetch',
              '      - run: svgfetch docker --variant full -o ./public',
              '      - run: git diff --exit-code ./public',
            ].join('\n'),
            { title: '.github/workflows/assets.yml', lang: 'yaml' },
          ),
          TIP(
            'Cache the svgfetch cache',
            'Persist `~/.cache/svgfetch` with `actions/cache` to make asset fetching near-instant across runs.',
          ),
          H2('GitLab CI'),
          CODE(
            [
              'assets:',
              '  image: node:20',
              '  script:',
              '    - npm install -g svgfetch',
              '    - svgfetch redis --variant icon --offline',
            ].join('\n'),
            { title: '.gitlab-ci.yml', lang: 'yaml' },
          ),
          H2('Makefile'),
          CODE(
            [
              'ASSETS = instagram github redis',
              '',
              'assets:',
              '\t@for a in $(ASSETS); do svgfetch $$a --variant icon; done',
              '',
              '.PHONY: assets',
            ].join('\n'),
            { title: 'Makefile', lang: 'makefile' },
          ),
          H2('package.json scripts'),
          CODE(
            [
              '{',
              '  "scripts": {',
              '    "assets": "svgfetch docker --variant full",',
              '    "assets:check": "svgfetch docker --variant full --dry-run --json"',
              '  }',
              '}',
            ].join('\n'),
            { title: 'package.json', lang: 'json' },
          ),
          H2('Best practices'),
          LIST([
            'Pin the svgfetch version in CI for reproducible assets.',
            'Validate with `--dry-run --json` before writing.',
            'Fail the build on a git diff so assets cannot drift silently.',
            'Cache the svgfetch cache directory between runs.',
          ]),
          related(
            { label: 'Offline & caching', href: '#docs/offline-caching', variant: 'primary' },
            { label: 'Scripting & JSON', href: '#docs/scripting' },
            { label: 'Exit codes', href: '#docs/exit-codes' },
          ),
        ],
      },
      {
        id: 'recipes',
        title: 'Recipes',
        description: 'Copy-paste integrations for popular frameworks.',
        icon: 'sparkles',
        keywords: 'recipes react next vue nuxt svelte astro html css optimize svgo framework integration',
        blocks: [
          LEAD(
            'Download once into your assets directory and import the SVG like any other file. These recipes cover the most common stacks.',
          ),
          H2('React & Next.js'),
          CODE('svgfetch slack --variant icon -o ./src/assets', { prompt: true }),
          CODE(
            [
              "import Slack from './assets/Slack_icon.svg';",
              '',
              'export function Brand() {',
              '  return <img src={Slack} alt="Slack" width={24} height={24} />;',
              '}',
            ].join('\n'),
            { title: 'Brand.jsx', lang: 'jsx' },
          ),
          H2('Vue & Nuxt'),
          CODE('svgfetch vue --variant icon -o ./public/brands', { prompt: true }),
          CODE(
            ['<template>', '  <img src="/brands/Vue_icon.svg" alt="Vue" width="24" />', '</template>'].join('\n'),
            { title: 'Brand.vue', lang: 'html' },
          ),
          H2('Svelte & SvelteKit'),
          CODE('svgfetch svelte --variant icon -o ./static/brands', { prompt: true }),
          CODE(
            ['<img src="/brands/Svelte_icon.svg" alt="Svelte" width={24} />'].join('\n'),
            { title: 'Brand.svelte', lang: 'html' },
          ),
          H2('Astro'),
          CODE('svgfetch astro --variant icon -o ./public/brands', { prompt: true }),
          CODE('<img src="/brands/Astro_icon.svg" alt="Astro" width="24" />', { title: 'Brand.astro', lang: 'html' }),
          H2('Plain HTML & CSS'),
          CODE('svgfetch github --variant icon -o ./assets', { prompt: true }),
          CODE('<img src="./assets/GitHub_icon.svg" alt="GitHub" class="icon" />', { title: 'index.html', lang: 'html' }),
          CODE('.icon { width: 24px; height: 24px; }', { title: 'styles.css', lang: 'css' }),
          H2('Optimize after fetching'),
          CODE('npx svgo ./src/assets --recursive', { prompt: true, title: 'Optional: run SVGO over the output' }),
          NOTE(
            'One directory per project',
            'Commit the resolved assets and the `svgfetch-metadata.json` file together so every logo in your repo has a traceable origin.',
          ),
          related(
            { label: 'Downloading assets', href: '#docs/downloading', variant: 'primary' },
            { label: 'Configuration', href: '#docs/configuration' },
            { label: 'Metadata & provenance', href: '#docs/metadata' },
          ),
        ],
      },
      {
        id: 'completions',
        title: 'Shell completions',
        description: 'Generate tab-completion for bash, zsh, fish, and PowerShell.',
        icon: 'filecode',
        keywords: 'completions bash zsh fish powershell autocomplete tab',
        blocks: [
          LEAD(
            'svgfetch ships a `completions` subcommand that prints a completion script for your shell. Install it once and every command, flag, and entity name becomes tab-completable.',
          ),
          H2('Generate a completion script'),
          TABS([
            { label: 'zsh', title: 'zsh', code: 'svgfetch completions zsh > ~/.zfunc/_svgfetch', prompt: true },
            { label: 'bash', title: 'bash', code: 'svgfetch completions bash > /etc/bash_completion.d/svgfetch', prompt: true },
            { label: 'fish', title: 'fish', code: 'svgfetch completions fish > ~/.config/fish/completions/svgfetch.fish', prompt: true },
            { label: 'PowerShell', title: 'PowerShell', code: 'svgfetch completions powershell | Out-String | Invoke-Expression', prompt: true },
          ]),
          H2('Install on zsh'),
          P('Add the completions directory to `fpath` in your `~/.zshrc`, then rebuild the completion cache:'),
          CODE(
            ['fpath=(~/.zfunc $fpath)', 'autoload -Uz compinit && compinit'].join('\n'),
            { title: '~/.zshrc', lang: 'bash' },
          ),
          H2('Verify'),
          CODE('svgfetch com<TAB>', { prompt: true, title: 'Press Tab after typing part of a command' }),
          TIP(
            'Completions cover entities too',
            'The generated script completes subcommands, flags, and known entity names — so `svgfetch insta<TAB>` suggests `instagram`.',
          ),
          related(
            { label: 'Installation', href: '#docs/installation', variant: 'primary' },
            { label: 'Commands', href: '#docs/commands' },
            { label: 'Flags & options', href: '#docs/flags' },
          ),
        ],
      },
    ],
  },

  /* ================================================================ *
   * CLI REFERENCE
   * ================================================================ */
  {
    title: 'CLI Reference',
    items: [
      {
        id: 'commands',
        title: 'Commands overview',
        description: 'Every subcommand, alias, and example in one place.',
        icon: 'filecode',
        keywords: 'commands subcommands get info search download cache doctor uninstall completions aliases synopsis',
        blocks: [
          LEAD(
            'svgfetch exposes clean, composable subcommands built for interactive developers and automated CI pipelines alike. Every command supports `--help`.',
          ),
          H2('Which command should I use?'),
          TABLE(
            ['I want to…', 'Use'],
            [
              ['Download a brand asset', '`svgfetch <query>`'],
              ['Browse interactively', '`svgfetch`'],
              ['Inspect before downloading', '`svgfetch info <query>`'],
              ['Find files without writing', '`svgfetch search <query>`'],
              ['Fetch a known Commons file', '`svgfetch download <file>`'],
              ['Manage the cache', '`svgfetch cache`'],
              ['Check my environment', '`svgfetch doctor`'],
              ['Remove everything', '`svgfetch uninstall`'],
              ['Generate completions', '`svgfetch completions <shell>`'],
            ],
          ),
          H2('Full command matrix'),
          { type: 'commands' },
          H2('Global synopsis'),
          CODE('svgfetch [OPTIONS] [QUERY]\nsvgfetch <COMMAND> [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('Aliases'),
          TABLE(
            ['Command', 'Aliases'],
            [
              ['`svgfetch <query>`', '`get-svg`, `getsvg`'],
              ['`svgfetch cache clear`', '`svgfetch cache reset`'],
              ['`svgfetch uninstall`', '`svgfetch dlt`'],
            ],
          ),
          H2('Getting help'),
          CODE(
            ['svgfetch --help', 'svgfetch cache --help', 'svgfetch info --help'].join('\n'),
            { prompt: true, title: 'Inline help for any command' },
          ),
          TIP(
            'Discover commands inline',
            'Append `--help` to any command — for example `svgfetch cache --help` — to print usage, flags, and examples without leaving the terminal.',
          ),
          related(
            { label: 'Global flags', href: '#docs/flags', variant: 'primary' },
            { label: 'Exit codes', href: '#docs/exit-codes' },
            { label: 'Output formats', href: '#docs/output-formats' },
          ),
        ],
      },
      {
        id: 'cmd-get',
        title: 'svgfetch <query>',
        description: 'The default command: resolve and download a brand asset.',
        icon: 'download',
        keywords: 'get fetch download default command query variant out zip dry-run force',
        blocks: [
          LEAD(
            'Running `svgfetch <query>` (the implicit `get` command) resolves a query and downloads the cleanest matching SVG into your assets directory.',
          ),
          H2('Synopsis'),
          CODE('svgfetch <QUERY> [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('Arguments'),
          TABLE(
            ['Argument', 'Required', 'Description'],
            [
              ['`<QUERY>`', 'Yes', 'A brand, product, or entity name, e.g. `instagram` or `kali linux`.'],
            ],
          ),
          H2('Options'),
          TABLE(
            ['Flag', 'Description'],
            [
              ['`-v, --variant <V>`', '`default`, `icon`, `wordmark`, `full`, or `mascot`.'],
              ['`-o, --out <DIR>`', 'Target download directory.'],
              ['`--zip`', 'Package the download into a ZIP archive.'],
              ['`--dry-run`', 'Resolve and report without writing files.'],
              ['`--force`', 'Overwrite an existing differing file.'],
              ['`--offline`', 'Resolve from the local cache only.'],
              ['`--no-cache`', 'Ignore cached responses.'],
              ['`--json`', 'Emit machine-readable JSON.'],
              ['`-v, --verbose`', 'Enable detailed debug logging.'],
            ],
          ),
          H2('Examples'),
          CODE(
            [
              'svgfetch instagram',
              'svgfetch instagram --variant icon',
              'svgfetch docker --variant full --out ./public/brands',
              'svgfetch linux --variant mascot --zip',
              'svgfetch redis --dry-run --json',
            ].join('\n'),
            { prompt: true },
          ),
          H2('Behavior'),
          LIST([
            'Resolves the entity, then the variant (explicit flag wins over inference).',
            'Auto-detects the output directory unless `-o` is given.',
            'Verifies the SVG as UTF-8 XML before writing.',
            'Appends provenance to `svgfetch-metadata.json`.',
          ]),
          related(
            { label: 'Downloading guide', href: '#docs/downloading', variant: 'primary' },
            { label: 'Download known file', href: '#docs/cmd-download' },
            { label: 'Flags & options', href: '#docs/flags' },
          ),
        ],
      },
      {
        id: 'cmd-info',
        title: 'svgfetch info',
        description: 'Inspect metadata, author, license, and variants without downloading.',
        icon: 'info',
        keywords: 'info inspect metadata license author variants no download json',
        blocks: [
          LEAD('The `info` command resolves a query and prints its metadata without writing anything to disk.'),
          H2('Synopsis'),
          CODE('svgfetch info <QUERY> [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('Options'),
          TABLE(
            ['Flag', 'Description'],
            [
              ['`--variant <V>`', 'Inspect a specific variant.'],
              ['`--json`', 'Emit structured JSON metadata.'],
              ['`--offline`', 'Resolve from cache only.'],
              ['`--no-cache`', 'Ignore cached responses.'],
            ],
          ),
          H2('Examples'),
          CODE(
            [
              'svgfetch info docker',
              'svgfetch info docker --variant wordmark',
              'svgfetch info amazon --json',
            ].join('\n'),
            { prompt: true },
          ),
          H2('Output fields'),
          DEFS([
            { term: 'Brand', desc: 'The resolved entity.' },
            { term: 'Variant', desc: 'The variant and how it was chosen.' },
            { term: 'Title', desc: 'The Wikimedia file title.' },
            { term: 'Author', desc: 'The credited author.' },
            { term: 'License', desc: 'The license attached to the file.' },
            { term: 'Direct URL', desc: 'The canonical Commons URL.' },
          ]),
          TIP(
            'Inspect is free and instant',
            'Because `info` resolves locally and only fetches metadata, it is the fastest way to validate a query before a download.',
          ),
          related(
            { label: 'Inspecting guide', href: '#docs/inspecting', variant: 'primary' },
            { label: 'Metadata & provenance', href: '#docs/metadata' },
            { label: 'Output formats', href: '#docs/output-formats' },
          ),
        ],
      },
      {
        id: 'cmd-search',
        title: 'svgfetch search',
        description: 'Return matching Commons files as a table, JSON, or JSONL.',
        icon: 'search',
        keywords: 'search command query json jsonl table limit results',
        blocks: [
          LEAD('The `search` command queries Wikimedia Commons for matching files and never writes to disk.'),
          H2('Synopsis'),
          CODE('svgfetch search <QUERY> [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('Options'),
          TABLE(
            ['Flag', 'Description'],
            [
              ['`--json`', 'Emit a JSON array of results.'],
              ['`--jsonl`', 'Emit one JSON object per line (streaming).'],
              ['`--limit <N>`', 'Cap the number of results.'],
              ['`--variant <V>`', 'Filter to candidates that satisfy a variant.'],
              ['`--no-cache`', 'Ignore cached responses.'],
            ],
          ),
          H2('Examples'),
          CODE(
            [
              'svgfetch search "visual studio"',
              'svgfetch search "rust" --json',
              'svgfetch search "database" --jsonl | jq -r .title',
              'svgfetch search "logo" --limit 5',
            ].join('\n'),
            { prompt: true },
          ),
          related(
            { label: 'Searching guide', href: '#docs/searching', variant: 'primary' },
            { label: 'Download known file', href: '#docs/cmd-download' },
            { label: 'Scripting & JSON', href: '#docs/scripting' },
          ),
        ],
      },
      {
        id: 'cmd-download',
        title: 'svgfetch download',
        description: 'Fetch a specific Wikimedia Commons file by title or URL.',
        icon: 'download',
        keywords: 'download command file url title known file direct',
        blocks: [
          LEAD(
            'When you already know the exact Commons file (for example from a `search` result), `download` fetches it directly — no entity resolution involved.',
          ),
          H2('Synopsis'),
          CODE('svgfetch download <FILE|URL> [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('Arguments'),
          TABLE(
            ['Argument', 'Description'],
            [
              ['`<FILE>`', 'A Commons file title, e.g. `File:Amazon logo.svg`.'],
              ['`<URL>`', 'A direct `upload.wikimedia.org` URL.'],
            ],
          ),
          H2('Options'),
          TABLE(
            ['Flag', 'Description'],
            [
              ['`-o, --out <DIR>`', 'Target download directory.'],
              ['`--zip`', 'Package the file into a ZIP archive.'],
              ['`--dry-run`', 'Resolve without writing.'],
              ['`--force`', 'Overwrite an existing differing file.'],
              ['`--json`', 'Emit machine-readable JSON.'],
            ],
          ),
          H2('Examples'),
          CODE(
            [
              'svgfetch download "File:Amazon logo.svg"',
              'svgfetch download "File:Docker (container engine) logo.svg" -o ./assets',
              'svgfetch download "https://upload.wikimedia.org/.../Example.svg"',
            ].join('\n'),
            { prompt: true },
          ),
          NOTE(
            'Filenames are sanitised',
            'Even when you pass an explicit title, svgfetch strips path traversal, null bytes, and reserved names before writing.',
          ),
          related(
            { label: 'Searching', href: '#docs/searching', variant: 'primary' },
            { label: 'Security & privacy', href: '#docs/security' },
            { label: 'Downloading assets', href: '#docs/downloading' },
          ),
        ],
      },
      {
        id: 'cmd-cache',
        title: 'svgfetch cache',
        description: 'Inspect, prune, and clear the local cache.',
        icon: 'package',
        keywords: 'cache command clear prune show path size reset',
        blocks: [
          LEAD('The `cache` command manages the local HTTP and asset cache that keeps svgfetch fast.'),
          H2('Synopsis'),
          CODE(
            ['svgfetch cache', 'svgfetch cache prune', 'svgfetch cache clear', 'svgfetch cache --print-path'].join('\n'),
            { title: 'usage', lang: 'text' },
          ),
          H2('Subcommands and flags'),
          TABLE(
            ['Form', 'Description'],
            [
              ['`svgfetch cache`', 'Show cache location and size'],
              ['`svgfetch cache prune`', 'Remove stale entries'],
              ['`svgfetch cache clear`', 'Remove all cached data'],
              ['`--print-path`', 'Print the cache directory and exit'],
            ],
          ),
          H2('Examples'),
          CODE(
            [
              'svgfetch cache',
              'svgfetch cache --print-path',
              'svgfetch cache prune',
              'svgfetch cache clear',
            ].join('\n'),
            { prompt: true },
          ),
          TIP(
            'Safe to clear',
            'Clearing the cache never deletes assets you have already downloaded into your project — only svgfetch\u2019s internal network and resolution data.',
          ),
          related(
            { label: 'Offline & caching', href: '#docs/offline-caching', variant: 'primary' },
            { label: 'Caching internals', href: '#docs/caching' },
            { label: 'Troubleshooting', href: '#docs/troubleshooting' },
          ),
        ],
      },
      {
        id: 'cmd-doctor',
        title: 'svgfetch doctor',
        description: 'Diagnose network, cache, permissions, and terminal support.',
        icon: 'wrench',
        keywords: 'doctor diagnose check network cache permissions terminal truecolor health',
        blocks: [
          LEAD('The `doctor` command runs a series of environment checks and prints a clear pass/fail for each.'),
          H2('Synopsis'),
          CODE('svgfetch doctor [OPTIONS]', { title: 'usage', lang: 'text' }),
          H2('What it checks'),
          TABLE(
            ['Check', 'What it verifies'],
            [
              ['Network', 'Wikimedia Commons API reachability'],
              ['Cache', 'Local cache directory exists and is valid'],
              ['Permissions', 'Current directory is writable'],
              ['Terminal', '24-bit true color and half-block support'],
              ['Config', 'Config files parse without errors'],
            ],
          ),
          H2('Example output'),
          CODE(
            [
              '=== SVGFetch Doctor Diagnostics ===',
              '✔ Network Connectivity: Reachable (Wikimedia Commons API 200 OK)',
              '✔ Local Disk Cache: Valid',
              '✔ Terminal Capabilities: 24-bit TrueColor & Halfblock UTF-8 OK',
              '✔ Write Permissions: Current directory is writable',
              'All checks passed. System ready.',
            ].join('\n'),
            { title: 'output', lang: 'text' },
          ),
          related(
            { label: 'Troubleshooting', href: '#docs/troubleshooting', variant: 'primary' },
            { label: 'Proxy & networks', href: '#docs/proxy-networks' },
            { label: 'Interactive TUI', href: '#docs/terminal' },
          ),
        ],
      },
      {
        id: 'cmd-uninstall',
        title: 'svgfetch uninstall',
        description: 'Cleanly remove binaries, cache, and config.',
        icon: 'wrench',
        keywords: 'uninstall remove cleanup dlt dry-run yes binaries cache config',
        blocks: [
          LEAD('The `uninstall` command removes svgfetch cleanly, with an interactive dry-run by default.'),
          H2('Synopsis'),
          CODE('svgfetch uninstall [--yes] [--keep-config]', { title: 'usage', lang: 'text' }),
          H2('Options'),
          TABLE(
            ['Flag', 'Description'],
            [
              ['`--yes`', 'Skip the confirmation prompt'],
              ['`--keep-config`', 'Preserve configuration files'],
              ['`--keep-cache`', 'Preserve the cache directory'],
            ],
          ),
          H2('Examples'),
          CODE(
            ['svgfetch uninstall', 'svgfetch uninstall --yes', 'svgfetch uninstall --yes --keep-config'].join('\n'),
            { prompt: true },
          ),
          WARN(
            'Preview first',
            'Run `svgfetch uninstall` without `--yes` to see exactly what would be removed before anything happens.',
          ),
          related(
            { label: 'Installation', href: '#docs/installation', variant: 'primary' },
            { label: 'Configuration', href: '#docs/configuration' },
            { label: 'Caching internals', href: '#docs/caching' },
          ),
        ],
      },
      {
        id: 'cmd-completions',
        title: 'svgfetch completions',
        description: 'Print a shell completion script.',
        icon: 'filecode',
        keywords: 'completions command bash zsh fish powershell generate',
        blocks: [
          LEAD('Generate a completion script for your shell and install it once.'),
          H2('Synopsis'),
          CODE('svgfetch completions <SHELL>', { title: 'usage', lang: 'text' }),
          H2('Supported shells'),
          TABLE(
            ['Shell', 'Command'],
            [
              ['bash', '`svgfetch completions bash`'],
              ['zsh', '`svgfetch completions zsh`'],
              ['fish', '`svgfetch completions fish`'],
              ['PowerShell', '`svgfetch completions powershell`'],
            ],
          ),
          H2('Example'),
          CODE('svgfetch completions zsh > ~/.zfunc/_svgfetch', { prompt: true }),
          related(
            { label: 'Shell completions guide', href: '#docs/completions', variant: 'primary' },
            { label: 'Commands overview', href: '#docs/commands' },
          ),
        ],
      },
      {
        id: 'flags',
        title: 'Flags & options',
        description: 'Global flags for output, caching, and scripting.',
        icon: 'sliders',
        keywords: 'flags options variant out dry-run zip offline cache verbose json force precedence',
        blocks: [
          LEAD(
            'These global options work across commands. Combine them freely — explicit flags always take precedence over inferred behaviour.',
          ),
          H2('All global flags'),
          { type: 'flags' },
          H2('Flag details'),
          DEFS([
            { term: '--variant <V>', desc: 'Pin the presentation: `default`, `icon`, `wordmark`, `full`, or `mascot`.' },
            { term: '-o, --out <DIR>', desc: 'Write downloads into a specific directory instead of the auto-detected one.' },
            { term: '--dry-run', desc: 'Resolve and report, but never write files. Ideal for CI validation.' },
            { term: '--zip', desc: 'Bundle resolved vectors into a single archive.' },
            { term: '--offline', desc: 'Use only the local cache; never touch the network.' },
            { term: '--no-cache', desc: 'Ignore cached data and fetch the newest Commons revision.' },
            { term: '-v, --verbose', desc: 'Print detailed debug logs and HTTP tracing.' },
            { term: '--json', desc: 'Emit machine-readable JSON for scripts and pipelines.' },
            { term: '--force', desc: 'Overwrite an existing file that differs from the resolved asset.' },
          ]),
          H2('Combining flags'),
          CODE('svgfetch docker --variant full --zip --offline -o ./dist/assets', {
            prompt: true,
            title: 'Resolve a bundle for a release pipeline',
          }),
          CODE('svgfetch redis --variant icon --dry-run --verbose', {
            prompt: true,
            title: 'Dry-run a write with verbose tracing',
          }),
          H2('Precedence'),
          TABLE(
            ['Precedence', 'Source'],
            [
              ['Highest', 'Command-line flags'],
              ['', 'Environment variables'],
              ['', 'Project config (`.svgfetch.toml`)'],
              ['', 'Global config'],
              ['Lowest', 'Built-in defaults'],
            ],
          ),
          H2('Common combinations'),
          TABLE(
            ['Combination', 'Use case'],
            [
              ['`--json --dry-run`', 'Validate in CI without writing files'],
              ['`--offline`', 'Reproducible builds from the local cache'],
              ['`--no-cache`', 'Always fetch the newest Commons revision'],
              ['`--zip -o <dir>`', 'Bundle multiple vectors into an archive'],
              ['`--force --offline`', 'Re-write cached assets in place'],
            ],
          ),
          related(
            { label: 'Output formats', href: '#docs/output-formats', variant: 'primary' },
            { label: 'Environment variables', href: '#docs/environment' },
            { label: 'Exit codes', href: '#docs/exit-codes' },
          ),
        ],
      },
      {
        id: 'environment',
        title: 'Environment variables',
        description: 'Configure svgfetch for shells, containers, and CI.',
        icon: 'settings',
        keywords: 'environment variables env SVGFETCH_OUT CACHE_DIR OFFLINE NO_COLOR CONFIG container',
        blocks: [
          LEAD('Every config key has an environment equivalent, which makes svgfetch easy to configure in containers and CI without writing files.'),
          H2('Supported variables'),
          TABLE(
            ['Variable', 'Equivalent config', 'Description'],
            [
              ['`SVGFETCH_OUT`', '`out`', 'Default download directory'],
              ['`SVGFETCH_CACHE_DIR`', '—', 'Cache directory location'],
              ['`SVGFETCH_OFFLINE`', '`network.offline`', 'Disable all network requests'],
              ['`SVGFETCH_NO_COLOR`', '`no_color`', 'Disable ANSI color'],
              ['`SVGFETCH_CONFIG`', '—', 'Path to an explicit config file'],
            ],
          ),
          H2('Precedence'),
          OLIST([
            'Command-line flags (highest)',
            'Environment variables',
            'Project config file',
            'Global config file',
            'Built-in defaults (lowest)',
          ]),
          H2('Examples'),
          CODE(
            [
              'SVGFETCH_OUT=./public/assets svgfetch github --variant icon',
              'SVGFETCH_OFFLINE=1 svgfetch redis',
              'SVGFETCH_NO_COLOR=1 svgfetch search rust',
            ].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          TIP(
            'Great for containers',
            'Set `SVGFETCH_OFFLINE` and `SVGFETCH_OUT` in your Docker image to get deterministic, filesystem-only asset resolution.',
          ),
          related(
            { label: 'Configuration', href: '#docs/configuration', variant: 'primary' },
            { label: 'Flags & options', href: '#docs/flags' },
            { label: 'CI/CD integration', href: '#docs/ci-cd' },
          ),
        ],
      },
      {
        id: 'output-formats',
        title: 'Output formats',
        description: 'Human tables, JSON, JSONL, and quiet mode.',
        icon: 'braces',
        keywords: 'output format json jsonl table quiet color machine readable stdout',
        blocks: [
          LEAD('svgfetch adapts its output to the task: readable tables for humans, structured JSON for machines.'),
          H2('Human-readable (default)'),
          P('Downloads print a concise summary with the resolved entity, variant, file, and provenance line.'),
          H2('JSON'),
          CODE('svgfetch docker --json', { prompt: true }),
          CODE(
            [
              '{',
              '  "query": "docker",',
              '  "entity": "Docker",',
              '  "variant": "icon",',
              '  "file": "Docker_icon.svg",',
              '  "title": "File:Docker (container engine) logo.svg",',
              '  "license": "Apache-2.0",',
              '  "path": "./src/assets/Docker_icon.svg"',
              '}',
            ].join('\n'),
            { title: 'output.json', lang: 'json' },
          ),
          H2('JSON Lines'),
          CODE('svgfetch search "rust" --jsonl', { prompt: true }),
          P('Search supports `--jsonl` for streaming one object per line.'),
          H2('Choosing a format'),
          TABLE(
            ['Situation', 'Recommended format'],
            [
              ['Interactive terminal use', 'Default (table)'],
              ['Piping into `jq`', '`--json`'],
              ['Streaming large result sets', '`--jsonl`'],
              ['CI logs', '`--json --dry-run`'],
              ['Degraded terminals', '`--no-color` (env: `SVGFETCH_NO_COLOR`)'],
            ],
          ),
          related(
            { label: 'Scripting & JSON', href: '#docs/scripting', variant: 'primary' },
            { label: 'Flags & options', href: '#docs/flags' },
            { label: 'Exit codes', href: '#docs/exit-codes' },
          ),
        ],
      },
      {
        id: 'exit-codes',
        title: 'Exit codes',
        description: 'Stable exit codes for scripting and CI.',
        icon: 'hash',
        keywords: 'exit code status scripting ci automation error branch success',
        blocks: [
          LEAD('svgfetch uses stable, documented exit codes so your scripts can branch on failure types without parsing output.'),
          TABLE(
            ['Code', 'Meaning', 'Typical cause'],
            [
              ['`0`', 'Success', 'Asset resolved and written'],
              ['`1`', 'General error', 'Unexpected failure'],
              ['`2`', 'Usage error', 'Unknown flag or malformed command'],
              ['`3`', 'No match', 'Query resolved to nothing'],
              ['`4`', 'Network error', 'Commons unreachable after retries'],
              ['`5`', 'Filesystem error', 'Destination not writable'],
            ],
          ),
          H2('Using exit codes in a script'),
          CODE(
            [
              'if svgfetch redis --variant icon --json > /dev/null; then',
              '  echo "asset ready"',
              'else',
              '  case $? in',
              '    4) echo "network unavailable" ;;',
              '    *) echo "fetch failed" ;;',
              '  esac',
              'fi',
            ].join('\n'),
            { title: 'bash', lang: 'bash', prompt: true },
          ),
          TIP(
            'Pair with --json',
            'Combine exit codes with `--json` for scripts that need both reliable branching and structured data.',
          ),
          related(
            { label: 'Scripting & JSON', href: '#docs/scripting', variant: 'primary' },
            { label: 'CI/CD integration', href: '#docs/ci-cd' },
            { label: 'Troubleshooting', href: '#docs/troubleshooting' },
          ),
        ],
      },
    ],
  },

  /* ================================================================ *
   * OPERATIONS
   * ================================================================ */
  {
    title: 'Operations',
    items: [
      {
        id: 'security',
        title: 'Security & privacy',
        description: 'Defensive engineering from network requests to file permissions.',
        icon: 'shield',
        keywords: 'security privacy zip slip traversal provenance license rate limit safe validate threat',
        blocks: [
          LEAD(
            'svgfetch treats downloaded assets as untrusted input. Every remote filename, archive entry, and byte of markup is validated before it ever touches your disk.',
          ),
          CARDS(securityCards),
          H2('What is validated'),
          LIST([
            'Filenames are sanitised against path traversal (`../`), null bytes, control characters, and reserved names.',
            'Archive entries are checked against Zip Slip before extraction.',
            'SVG payloads are verified as UTF-8 XML before being written.',
            'Destination directories are confirmed writable before the download begins.',
          ]),
          H2('Threat model'),
          DEFS([
            { term: 'Malicious filenames', desc: 'Remote titles cannot escape the target directory.' },
            { term: 'Archive traversal', desc: 'Zip Slip-style paths are rejected before extraction.' },
            { term: 'Malformed markup', desc: 'Non-XML or invalid UTF-8 payloads are refused.' },
            { term: 'Unwritable targets', desc: 'Permission problems are detected before any write.' },
          ]),
          H2('Privacy'),
          LIST([
            'svgfetch contacts only Wikimedia Commons — no analytics, no telemetry.',
            'The cache lives entirely on your machine.',
            'No account, token, or sign-up is ever required.',
          ]),
          H2('Provenance you can trust'),
          P(
            'Each download records the Commons file title, author, license, and source URL. Because records are appended rather than replaced, your attribution trail is never lost.',
          ),
          H2('Reporting a vulnerability'),
          IMPORTANT(
            'Responsible disclosure',
            'Please report security issues privately via the GitHub security policy rather than opening a public issue. See `SECURITY.md` in the repository for the full process.',
          ),
          related(
            { label: 'Security policy', href: `${GITHUB_URL}/blob/main/SECURITY.md`, variant: 'primary', external: true },
            { label: 'Wikimedia etiquette', href: '#docs/wikimedia-etiquette' },
            { label: 'License', href: '#docs/license' },
          ),
        ],
      },
      {
        id: 'wikimedia-etiquette',
        title: 'Wikimedia etiquette',
        description: 'How svgfetch respects Commons infrastructure and licenses.',
        icon: 'scale',
        keywords: 'wikimedia commons rate limit backoff respect user agent license attribution etiquette',
        blocks: [
          LEAD(
            'Wikimedia Commons is a community-run public resource. svgfetch is built to use it responsibly — and to make it easy for you to do the same.',
          ),
          H2('Rate limiting & backoff'),
          LIST([
            'A built-in rate limiter keeps request volume low.',
            'Exponential backoff retries failed requests on HTTP 429 and 5xx responses.',
            'Caching means repeat fetches never hit the network again.',
          ]),
          H2('Prefer the cache and offline mode'),
          P('The single easiest way to be a good citizen is to let the cache do its job, and to use `--offline` when you already have what you need.'),
          CODE('svgfetch redis --variant icon --offline', { prompt: true }),
          H2('Asset licensing'),
          P(
            'Files on Commons carry many different licenses — some public domain, some requiring attribution, some share-alike. svgfetch surfaces the license with `info` and records it on download.',
          ),
          TABLE(
            ['License type', 'What it usually means'],
            [
              ['Public domain', 'No attribution required'],
              ['CC0', 'No rights reserved'],
              ['CC BY', 'Attribution required'],
              ['CC BY-SA', 'Attribution and share-alike required'],
              ['Trademarked logos', 'Usage may be restricted by trademark law'],
            ],
          ),
          WARN(
            'Logos and trademarks',
            'A file being free to download does not make it free to use as a trademark. Check the brand\u2019s guidelines for commercial use.',
          ),
          NOTE(
            'Attribution is recorded for you',
            'Every download writes author, license, and source into `svgfetch-metadata.json`, so you always have what you need to comply.',
          ),
          related(
            { label: 'Metadata & provenance', href: '#docs/metadata', variant: 'primary' },
            { label: 'Inspecting assets', href: '#docs/inspecting' },
            { label: 'Wikimedia Commons', href: WM_URL, external: true },
          ),
        ],
      },
      {
        id: 'caching',
        title: 'Caching internals',
        description: 'Where the cache lives, what it stores, and how to control it.',
        icon: 'package',
        keywords: 'cache internals location prune clear invalidation size ttl http asset',
        blocks: [
          LEAD('Understanding the cache helps you debug, optimize, and run offline. This page explains the details.'),
          H2('Cache location'),
          TABLE(
            ['Platform', 'Default cache directory'],
            [
              ['macOS', '`~/Library/Caches/svgfetch`'],
              ['Linux', '`~/.cache/svgfetch`'],
              ['Windows', '`%LOCALAPPDATA%\\svgfetch\\cache`'],
            ],
          ),
          CODE('svgfetch cache --print-path', { prompt: true, title: 'Print the exact location' }),
          H2('What is cached'),
          LIST([
            'Resolved entity → file mappings.',
            'Wikimedia API and metadata responses.',
            'Downloaded SVG assets, keyed by file identity.',
          ]),
          H2('Invalidation'),
          P(
            'Cached responses have a freshness window. Use `--no-cache` to bypass the cache for a single run when you need the latest revision, or `cache clear` to reset everything.',
          ),
          CODE('svgfetch docker --variant icon --no-cache', { prompt: true }),
          H2('Size & pruning'),
          CODE(
            ['svgfetch cache', 'svgfetch cache prune'].join('\n'),
            { prompt: true, title: 'Inspect size, then remove stale entries' },
          ),
          TIP(
            'Override the location',
            'Set `SVGFETCH_CACHE_DIR` to move the cache onto a faster disk, or into a path you persist in CI.',
          ),
          related(
            { label: 'Offline & caching', href: '#docs/offline-caching', variant: 'primary' },
            { label: 'Cache command', href: '#docs/cmd-cache' },
            { label: 'Air-gapped usage', href: '#docs/air-gapped' },
          ),
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Diagnose and fix the most common issues.',
        icon: 'wrench',
        keywords: 'troubleshooting errors doctor network cache permissions debug offline tui proxy',
        blocks: [
          LEAD('Most issues are environmental. Start with the built-in doctor, then check the symptoms below.'),
          H2('Run the doctor first'),
          CODE('svgfetch doctor', { prompt: true }),
          P(
            'The doctor checks network connectivity, cache integrity, write permissions, and terminal capabilities — and prints a clear pass or fail for each.',
          ),
          H2('Common problems'),
          TABLE(
            ['Symptom', 'Likely cause', 'Fix'],
            [
              ['Command not found', 'Binary not on `PATH`', 'Re-run the installer or open a new shell'],
              ['`network error` (exit 4)', 'Commons unreachable', 'Check connectivity or use `--offline`'],
              ['`filesystem error` (exit 5)', 'Destination not writable', 'Pass `-o <writable-dir>`'],
              ['Stale result', 'Outdated HTTP cache', 'Retry with `--no-cache`'],
              ['No preview in TUI', 'Terminal lacks true color', 'Use a 24-bit terminal, or `--no-color`'],
              ['Wrong entity', 'Ambiguous query', 'Add `--variant` or use the exact name'],
              ['Slow first run', 'Cold cache', 'Subsequent runs are instant'],
            ],
          ),
          H2('Verbose logging'),
          CODE('svgfetch docker --verbose', { prompt: true, title: 'Trace HTTP requests and resolution steps' }),
          H2('Network issues'),
          LIST([
            'Confirm internet access with `svgfetch doctor`.',
            'Behind a proxy? See [Proxy & networks](#docs/proxy-networks).',
            'In restricted environments, pre-seed the cache and use `--offline`.',
          ]),
          H2('Permission issues'),
          LIST([
            'Ensure the output directory exists and is writable.',
            'Use `-o` to target a directory you control.',
            'On managed machines, avoid installing into system directories.',
          ]),
          H2('Still stuck?'),
          P('Search existing issues or open a new one with your `svgfetch doctor` output and the command you ran.'),
          related(
            { label: 'Search issues', href: `${GITHUB_URL}/issues`, variant: 'primary', external: true },
            { label: 'Open an issue', href: `${GITHUB_URL}/issues/new` },
            { label: 'Doctor command', href: '#docs/cmd-doctor' },
          ),
        ],
      },
      {
        id: 'performance',
        title: 'Performance',
        description: 'Why svgfetch is fast, and how to keep it that way.',
        icon: 'gauge',
        keywords: 'performance speed startup memory benchmark cache latency fast',
        blocks: [
          LEAD('svgfetch is designed to be imperceptible. Here is where the speed comes from and how to preserve it.'),
          H2('Startup'),
          P(
            'A single statically-linked binary with no runtime means startup is measured in single-digit milliseconds — fast enough to call from a Makefile or a pre-commit hook without thinking about it.',
          ),
          H2('Network'),
          P(
            'The only slow operation is the first network fetch. Caching removes it entirely on subsequent runs, and `--offline` guarantees it.',
          ),
          H2('Where caching wins'),
          TABLE(
            ['Scenario', 'Cold cache', 'Warm cache'],
            [
              ['Resolve + download an icon', 'Network-bound', 'Near-instant'],
              ['Repeat fetch of same asset', 'Network-bound', 'Near-instant'],
              ['Offline build', 'Fails if uncached', 'Near-instant'],
            ],
          ),
          H2('Tips'),
          LIST([
            'Warm the cache once, then run with `--offline` in CI.',
            'Keep the cache on fast local storage.',
            'Use `--json --dry-run` for validation-only passes.',
            'Batch related assets so the cache is reused across them.',
          ]),
          NOTE(
            'No background processes',
            'svgfetch never runs a daemon. It only exists for the duration of the command, which keeps memory and CPU usage near zero.',
          ),
          related(
            { label: 'Offline & caching', href: '#docs/offline-caching', variant: 'primary' },
            { label: 'Caching internals', href: '#docs/caching' },
            { label: 'Architecture', href: '#docs/architecture' },
          ),
        ],
      },
      {
        id: 'proxy-networks',
        title: 'Proxy & networks',
        description: 'Use svgfetch behind corporate proxies and firewalls.',
        icon: 'shield',
        keywords: 'proxy network http https no_proxy certificate ca firewall corporate air gapped',
        blocks: [
          LEAD('svgfetch honours standard proxy environment variables, so it usually works behind a corporate proxy with no extra configuration.'),
          H2('HTTP and HTTPS proxy'),
          CODE(
            ['export HTTP_PROXY=http://proxy.example.com:8080', 'export HTTPS_PROXY=http://proxy.example.com:8080'].join('\n'),
            { title: 'shell', lang: 'bash' },
          ),
          H2('Bypass the proxy for certain hosts'),
          CODE('export NO_PROXY=localhost,127.0.0.1,internal.example.com', { title: 'shell', lang: 'bash' }),
          H2('Custom certificate authorities'),
          P(
            'If your network intercepts TLS, point svgfetch at your CA bundle using the standard `SSL_CERT_FILE` environment variable before running it.',
          ),
          CODE('export SSL_CERT_FILE=/etc/ssl/certs/corporate-ca.pem', { title: 'shell', lang: 'bash' }),
          H2('Corporate firewalls'),
          LIST([
            'Ensure `upload.wikimedia.org` and the Commons API are allowed.',
            'If only the cache is reachable, pre-seed it and run with `--offline`.',
            'Run `svgfetch doctor` to see exactly which check fails.',
          ]),
          TIP(
            'Air-gapped environments',
            'When no network is available at all, pre-seed the cache on a connected host and copy it over — see [Air-gapped usage](#docs/air-gapped).',
          ),
          related(
            { label: 'Air-gapped usage', href: '#docs/air-gapped', variant: 'primary' },
            { label: 'Troubleshooting', href: '#docs/troubleshooting' },
            { label: 'Environment variables', href: '#docs/environment' },
          ),
        ],
      },
      {
        id: 'air-gapped',
        title: 'Air-gapped usage',
        description: 'Run svgfetch with no network at all.',
        icon: 'package',
        keywords: 'air gapped offline isolated pre-seed cache reproducible docker no network',
        blocks: [
          LEAD('In fully isolated environments, svgfetch works entirely from a pre-seeded cache.'),
          H2('Pre-seed on a connected host'),
          CODE(
            [
              'svgfetch instagram --variant icon',
              'svgfetch github --variant full',
              'svgfetch cache --print-path   # note this directory',
            ].join('\n'),
            { title: 'connected host', lang: 'bash', prompt: true },
          ),
          H2('Copy the cache to the isolated host'),
          CODE('rsync -a ~/.cache/svgfetch/ isolated-host:~/.cache/svgfetch/', { title: 'shell', lang: 'bash' }),
          H2('Run fully offline'),
          CODE('svgfetch instagram --variant icon --offline', { prompt: true }),
          H2('Reproducible builds'),
          CODE('svgfetch github --variant full --offline --dry-run --json', {
            prompt: true,
            title: 'Validate deterministically in an isolated build',
          }),
          H2('Caveats'),
          LIST([
            'Only cached assets are available offline.',
            'Use `--no-cache` never works offline — it requires the network.',
            'Keep the cache version consistent across hosts for reproducible results.',
          ]),
          related(
            { label: 'Offline & caching', href: '#docs/offline-caching', variant: 'primary' },
            { label: 'Caching internals', href: '#docs/caching' },
            { label: 'Proxy & networks', href: '#docs/proxy-networks' },
          ),
        ],
      },
    ],
  },

  /* ================================================================ *
   * ARCHITECTURE
   * ================================================================ */
  {
    title: 'Architecture',
    items: [
      {
        id: 'architecture',
        title: 'Architecture overview',
        description: 'How svgfetch is put together, end to end.',
        icon: 'braces',
        keywords: 'architecture internals modules data flow design rust resolver cache network',
        blocks: [
          LEAD('This page is for contributors and the curious. It explains how a query becomes a file on disk.'),
          H2('High-level flow'),
          CODE(
            [
              'query + flags',
              '      │',
              '      ▼',
              '  [ resolver ]──► curated index (entity + variant scoring)',
              '      │',
              '      ▼',
              '  [ source ]────► cache? ──► Wikimedia Commons API',
              '      │',
              '      ▼',
              '  [ writer ]────► sanitise → verify → write → provenance',
            ].join('\n'),
            { title: 'pipeline', lang: 'text' },
          ),
          H2('Modules'),
          TABLE(
            ['Module', 'Responsibility'],
            [
              ['CLI parser', 'Parse commands, flags, and config into a request'],
              ['Resolver', 'Turn a query into an entity + variant + file'],
              ['Index', 'The curated entity/variant knowledge base'],
              ['Source', 'Fetch from cache first, then Wikimedia Commons'],
              ['Cache', 'Store and serve network and asset data'],
              ['Writer', 'Sanitise, verify, and write files safely'],
              ['Provenance', 'Append metadata records'],
            ],
          ),
          H2('Design goals'),
          LIST([
            'Deterministic resolution for reproducible builds.',
            'No background processes or persistent daemons.',
            'Defensive handling of all remote input.',
            'A tiny, predictable surface area.',
          ]),
          NOTE(
            'Nothing hidden',
            'There is no magic service behind svgfetch — it is one binary talking directly to Commons, with a local cache as the only state.',
          ),
          related(
            { label: 'Resolution engine', href: '#docs/resolution-engine', variant: 'primary' },
            { label: 'Caching internals', href: '#docs/caching' },
            { label: 'Contributing', href: '#docs/contributing' },
          ),
        ],
      },
      {
        id: 'resolution-engine',
        title: 'Resolution engine',
        description: 'The scoring and disambiguation that picks the right asset.',
        icon: 'compass',
        keywords: 'resolution engine scoring index blocking determinism candidate disambiguation',
        blocks: [
          LEAD('The resolver is the heart of svgfetch. This page documents how it chooses an asset.'),
          H2('Pipeline'),
          STEPS([
            { title: 'Normalise', text: 'Lowercase, trim, strip punctuation, and tokenise the query.' },
            { title: 'Lookup', text: 'Gather candidate entities from the curated index.' },
            { title: 'Score', text: 'Rank candidates by name, alias, category, and variant fit.' },
            { title: 'Block', text: 'Remove candidates matched by disambiguation rules.' },
            { title: 'Select', text: 'Pick the highest-scoring candidate and its best variant.' },
          ]),
          H2('Scoring signals'),
          DEFS([
            { term: 'Exact name match', desc: 'The strongest signal — an exact entity name always wins.' },
            { term: 'Alias match', desc: 'Common alternate names and short forms.' },
            { term: 'Category match', desc: 'Words like “linux distribution” narrow the field.' },
            { term: 'Variant fit', desc: 'Candidates that can satisfy the requested variant score higher.' },
          ]),
          H2('Blocking pairs'),
          TABLE(
            ['If you ask for', 'These are blocked'],
            [
              ['`facebook`', 'Meta, Meta Platforms'],
              ['`linux`', 'Tux (mascot only)'],
              ['`kali linux`', 'Base Linux, generic kernel art'],
            ],
          ),
          H2('Determinism'),
          P(
            'Given the same query, flags, and index version, the resolver always returns the same asset. This is the property that makes svgfetch usable in reproducible builds.',
          ),
          related(
            { label: 'Entity resolution guide', href: '#docs/entities', variant: 'primary' },
            { label: 'Architecture', href: '#docs/architecture' },
            { label: 'Contributing', href: '#docs/contributing' },
          ),
        ],
      },
      {
        id: 'metadata',
        title: 'Metadata & provenance',
        description: 'The svgfetch-metadata.json schema and how it is maintained.',
        icon: 'filecheck',
        keywords: 'metadata provenance schema json author license source append attribution',
        blocks: [
          LEAD('Provenance is a first-class feature. Every download writes a durable, append-only record.'),
          H2('Schema'),
          CODE(
            [
              '{',
              '  "Instagram_icon.svg": {',
              '    "title": "File:Instagram icon.svg",',
              '    "author": "Instagram",',
              '    "license": "CC BY-SA 4.0",',
              '    "source": "https://commons.wikimedia.org/wiki/File:Instagram_icon.svg",',
              '    "variant": "icon",',
              '    "fetchedAt": "2026-01-01T00:00:00Z"',
              '  }',
              '}',
            ].join('\n'),
            { title: 'svgfetch-metadata.json', lang: 'json' },
          ),
          H2('Fields'),
          DEFS([
            { term: 'title', desc: 'The Wikimedia Commons file title.' },
            { term: 'author', desc: 'The credited author or organisation.' },
            { term: 'license', desc: 'The license attached to the file.' },
            { term: 'source', desc: 'The canonical Commons page URL.' },
            { term: 'variant', desc: 'The variant that was downloaded.' },
            { term: 'fetchedAt', desc: 'When the asset was fetched, in ISO 8601 UTC.' },
          ]),
          H2('Append-only by design'),
          P(
            'Records are appended, never replaced. Downloading the same asset twice updates its entry; downloading a new asset never clobbers existing provenance.',
          ),
          H2('Best practices'),
          LIST([
            'Commit `svgfetch-metadata.json` alongside your assets.',
            'Reference it in your attribution or license page.',
            'Keep it in the same directory as the assets for easy discovery.',
          ]),
          related(
            { label: 'Wikimedia etiquette', href: '#docs/wikimedia-etiquette', variant: 'primary' },
            { label: 'Configuration', href: '#docs/configuration' },
            { label: 'License', href: '#docs/license' },
          ),
        ],
      },
    ],
  },

  /* ================================================================ *
   * PROJECT
   * ================================================================ */
  {
    title: 'Project',
    items: [
      {
        id: 'contributing',
        title: 'Contributing',
        description: 'Help make svgfetch better for everyone.',
        icon: 'git',
        keywords: 'contributing development setup pull request code of conduct build tests',
        blocks: [
          LEAD(
            'svgfetch is community-driven and welcomes contributions of every size — from typo fixes to new resolution rules. Here is how to get involved.',
          ),
          H2('Ways to contribute'),
          LIST([
            'Report bugs and request features via GitHub issues.',
            'Improve the curated brand index and disambiguation rules.',
            'Write or refine documentation.',
            'Submit pull requests with tests for new behaviour.',
          ]),
          H2('Development workflow'),
          STEPS([
            { title: 'Fork & clone', text: `Fork the repository, then clone it: \`git clone ${GITHUB_URL}.git\`.` },
            { title: 'Branch', text: 'Create a focused branch off `main` with a descriptive name.' },
            { title: 'Implement', text: 'Keep changes scoped and add tests for new behaviour.' },
            { title: 'Verify', text: 'Run `cargo fmt`, `cargo clippy`, and `cargo test` locally.' },
            { title: 'Open a PR', text: 'Describe the change and link any related issue.' },
          ]),
          H2('Development setup'),
          CODE(
            ['cargo build', 'cargo test', 'cargo clippy', 'cargo fmt --check'].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          H2('Pull request checklist'),
          LIST([
            'The change is focused and reviewed against the docs.',
            'New behaviour has tests.',
            '`cargo fmt`, `cargo clippy`, and `cargo test` pass.',
            'The PR description explains the why, not just the what.',
          ]),
          NOTE(
            'Code of conduct',
            `All participation is governed by our Code of Conduct. Read it at ${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md.`,
          ),
          related(
            { label: 'Contributing guide', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`, variant: 'primary', external: true },
            { label: 'Browse issues', href: `${GITHUB_URL}/issues`, external: true },
            { label: 'Development setup', href: '#docs/development' },
          ),
        ],
      },
      {
        id: 'development',
        title: 'Development setup',
        description: 'Build, run, and debug svgfetch locally.',
        icon: 'filecode',
        keywords: 'development build run debug cargo layout rust prerequisites local',
        blocks: [
          LEAD('Everything you need to build and hack on svgfetch locally.'),
          H2('Prerequisites'),
          LIST([
            'A recent stable Rust toolchain (`rustup` recommended).',
            '`cargo` on your `PATH`.',
            'Git.',
          ]),
          H2('Clone & build'),
          CODE(
            [
              `git clone ${GITHUB_URL}.git`,
              'cd svgfetch',
              'cargo build --release --locked',
            ].join('\n'),
            { title: 'shell', lang: 'bash', prompt: true },
          ),
          H2('Project layout'),
          CODE(
            [
              'svgfetch/',
              '├── src/            # CLI, resolver, source, cache, writer',
              '├── tests/          # integration tests',
              '├── docs/           # documentation sources',
              '└── Cargo.toml',
            ].join('\n'),
            { title: 'layout', lang: 'text' },
          ),
          H2('Running locally'),
          CODE('./target/release/svgfetch instagram --variant icon --dry-run', {
            prompt: true,
            title: 'Run your build',
          }),
          H2('Debugging'),
          CODE('RUST_LOG=debug ./target/release/svgfetch docker --verbose', { prompt: true }),
          H2('Useful commands'),
          TABLE(
            ['Command', 'Purpose'],
            [
              ['`cargo build`', 'Compile in debug mode'],
              ['`cargo test`', 'Run the test suite'],
              ['`cargo clippy`', 'Lint'],
              ['`cargo fmt`', 'Format'],
              ['`cargo run -- --help`', 'Run the local build'],
            ],
          ),
          related(
            { label: 'Contributing', href: '#docs/contributing', variant: 'primary' },
            { label: 'Architecture', href: '#docs/architecture' },
            { label: 'Roadmap', href: '#docs/roadmap' },
          ),
        ],
      },
      {
        id: 'roadmap',
        title: 'Roadmap',
        description: 'What we are working on and where we are heading.',
        icon: 'rocket',
        keywords: 'roadmap now next later future plans ideas issues',
        blocks: [
          LEAD('svgfetch is actively developed. Here is a transparent view of what is in progress and what is planned.'),
          H2('Now'),
          LIST([
            'Broadening the curated brand index and disambiguation rules.',
            'Deeper offline and caching guarantees.',
            'Documentation expansion and translations.',
          ]),
          H2('Next'),
          LIST([
            'Additional output formats for pipelines.',
            'Richer TUI preview modes.',
            'More shell integration niceties.',
          ]),
          H2('Later'),
          LIST([
            'Optional asset optimization hooks.',
            'Community-contributed entity packs.',
            'Expanded platform coverage.',
          ]),
          H2('Suggest an idea'),
          P('Have a feature in mind? Open an issue and describe the workflow you are trying to unblock.'),
          related(
            { label: 'Request a feature', href: `${GITHUB_URL}/issues/new`, variant: 'primary', external: true },
            { label: 'Release notes', href: `${GITHUB_URL}/releases`, external: true },
            { label: 'Contributing', href: '#docs/contributing' },
          ),
        ],
      },
      {
        id: 'comparison',
        title: 'Comparison',
        description: 'How svgfetch compares to manual downloads and other tools.',
        icon: 'scale',
        keywords: 'comparison curl manual download icon packs alternatives wikimedia pros cons',
        blocks: [
          LEAD('svgfetch is not the only way to get a logo. Here is an honest comparison.'),
          TABLE(
            ['Approach', 'Speed', 'Correctness', 'Provenance'],
            [
              ['svgfetch', 'Instant', 'Entity + variant aware', 'Automatic'],
              ['Manual browser download', 'Slow', 'Guesswork', 'Manual'],
              ['Plain `curl`', 'Fast', 'None', 'Manual'],
              ['Fuzzy scrapers', 'Fast', 'Frequently wrong', 'Usually none'],
            ],
          ),
          H2('When svgfetch shines'),
          LIST([
            'You need the exact variant, not just “a logo”.',
            'You want provenance recorded automatically.',
            'You are scripting asset fetches in CI.',
            'You want a fast, repeatable, offline-capable workflow.',
          ]),
          H2('When to use something else'),
          LIST([
            'You need a hand-curated, JSON-based URL service — use Simple Icons.',
            'You need full-color brand kits with guidelines — go to the brand\u2019s press page.',
            'You need pixel-perfect design-system icons — use an icon library.',
          ]),
          NOTE(
            'Different tools, different jobs',
            'svgfetch is optimised for fetching official vectors from Commons with precision and provenance — not for replacing design-system icon packs.',
          ),
          related(
            { label: 'Introduction', href: '#docs/introduction', variant: 'primary' },
            { label: 'Entity resolution', href: '#docs/entities' },
            { label: 'FAQ', href: '#docs/faq' },
          ),
        ],
      },
      {
        id: 'glossary',
        title: 'Glossary',
        description: 'Definitions for every term used across these docs.',
        icon: 'book',
        keywords: 'glossary definitions terms entity variant asset resolution provenance cache ttl zip slip',
        blocks: [
          LEAD('A quick reference for the vocabulary used throughout svgfetch and this documentation.'),
          DEFS([
            { term: 'Asset', desc: 'A single SVG file from Wikimedia Commons belonging to an entity.' },
            { term: 'Backoff', desc: 'Increasing the delay between retries to avoid hammering an API.' },
            { term: 'Cache', desc: 'Local storage of network responses and assets for fast, repeatable runs.' },
            { term: 'Commons', desc: 'Wikimedia Commons, the free media repository svgfetch sources from.' },
            { term: 'Disambiguation', desc: 'Keeping similarly named but distinct entities apart.' },
            { term: 'Entity', desc: 'A distinct brand, product, organisation, or OS.' },
            { term: 'JSONL', desc: 'JSON Lines — one JSON object per line, for streaming.' },
            { term: 'Mascot', desc: 'A variant describing an official character illustration.' },
            { term: 'Provenance', desc: 'The recorded origin of an asset (author, license, source).' },
            { term: 'Resolver', desc: 'The component that turns a query into a concrete asset.' },
            { term: 'TUI', desc: 'Text User Interface — the interactive terminal explorer.' },
            { term: 'Variant', desc: 'The presentation of an asset: icon, wordmark, full, or mascot.' },
            { term: 'Zip Slip', desc: 'An archive extraction attack mitigated by entry sanitisation.' },
          ]),
          related(
            { label: 'Core concepts', href: '#docs/concepts', variant: 'primary' },
            { label: 'Architecture', href: '#docs/architecture' },
            { label: 'FAQ', href: '#docs/faq' },
          ),
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        description: 'Answers to the questions we hear most.',
        icon: 'help',
        keywords: 'faq questions node runtime provenance variants ci metadata license free troubleshooting',
        blocks: [
          LEAD('Quick answers to the questions we get most often. Cannot find yours? Open an issue and we will add it here.'),
          { type: 'faq' },
          H2('More questions'),
          P('Still stuck? The community is happy to help — search existing issues first, then open a new one with your `svgfetch doctor` output.'),
          related(
            { label: 'Open an issue', href: `${GITHUB_URL}/issues/new`, variant: 'primary', external: true },
            { label: 'Troubleshooting', href: '#docs/troubleshooting' },
            { label: 'Glossary', href: '#docs/glossary' },
          ),
        ],
      },
      {
        id: 'license',
        title: 'License',
        description: 'Free and open source, for everyone.',
        icon: 'scale',
        keywords: 'license mit open source free contribute terms attribution copyright',
        blocks: [
          LEAD(
            'svgfetch is 100% free and open source, released under the MIT license. Inspect the code, customize it for your workflow, and contribute features freely.',
          ),
          H2('What the license means'),
          LIST([
            '**Use it anywhere** — personal, commercial, or educational projects.',
            '**Modify it** — fork and adapt svgfetch to your own needs.',
            '**Distribute it** — include it in your products and tooling.',
            '**Attribution** — keep the copyright notice and license text when redistributing.',
          ]),
          NOTE(
            'Assets are separate',
            'The svgfetch tool is MIT-licensed, but every SVG you download from Wikimedia Commons carries its own license. svgfetch records that license in `svgfetch-metadata.json` for you.',
          ),
          H2('At a glance'),
          TABLE(
            ['Item', 'Details'],
            [
              ['Tool license', 'MIT'],
              ['Asset source', 'Wikimedia Commons'],
              ['Attribution', 'Recorded automatically per download'],
              ['Cost', 'Free — forever'],
            ],
          ),
          related(
            { label: 'Read the license', href: `${GITHUB_URL}/blob/main/LICENSE`, variant: 'primary', external: true },
            { label: 'Security policy', href: `${GITHUB_URL}/blob/main/SECURITY.md`, external: true },
            { label: 'Star on GitHub', href: GITHUB_URL, external: true },
          ),
        ],
      },
      {
        id: 'changelog',
        title: 'Changelog',
        description: 'Release history and versioning policy.',
        icon: 'clock',
        keywords: 'changelog releases versions history semver breaking changes',
        blocks: [
          LEAD('A summary of notable changes. Full release notes live on GitHub.'),
          H2('Versioning policy'),
          LIST([
            'svgfetch follows semantic versioning.',
            'Breaking CLI changes bump the major version.',
            'New commands and flags bump the minor version.',
            'Bug fixes and docs bump the patch version.',
          ]),
          H2('v0.1.0 — Initial release'),
          LIST([
            'Initial public release.',
            'Entity and variant resolution engine.',
            'Interactive TUI with live search and preview.',
            'Search, info, download, cache, doctor, and uninstall commands.',
            'Offline caching and provenance metadata.',
          ]),
          NOTE(
            'Full release notes',
            `Every release is documented on GitHub Releases: ${GITHUB_URL}/releases.`,
          ),
          related(
            { label: 'Release notes', href: `${GITHUB_URL}/releases`, variant: 'primary', external: true },
            { label: 'Roadmap', href: '#docs/roadmap' },
            { label: 'Contributing', href: '#docs/contributing' },
          ),
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        description: 'What svgfetch does — and does not — send.',
        icon: 'lock',
        keywords: 'privacy telemetry data tracking analytics no telemetry account',
        blocks: [
          LEAD('svgfetch is private by default. It collects nothing about you and sends nothing except the requests needed to fetch assets you explicitly ask for.'),
          H2('What svgfetch sends'),
          LIST([
            'Requests to Wikimedia Commons for the assets you ask for.',
            'Nothing else. No analytics, no telemetry, no accounts.',
          ]),
          H2('What stays local'),
          LIST([
            'Your cache, config, and downloaded assets.',
            'Your provenance metadata.',
            'Your query history is never transmitted or stored beyond the cache.',
          ]),
          H2('Third parties'),
          P('The only third party involved is Wikimedia Commons, and only for assets you request. Their privacy practices are described on their own site.'),
          related(
            { label: 'Security & privacy', href: '#docs/security', variant: 'primary' },
            { label: 'Wikimedia Commons', href: WM_URL, external: true },
            { label: 'License', href: '#docs/license' },
          ),
        ],
      },
    ],
  },
]

export const DOC_PAGES = DOC_GROUPS.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title })),
)

export const DOC_INDEX = Object.fromEntries(DOC_PAGES.map((page) => [page.id, page]))

export const DEFAULT_DOC_ID = DOC_PAGES[0].id

export const REPO_SLUG = REPO

export const DOC_STATS = {
  pages: DOC_PAGES.length,
  groups: DOC_GROUPS.length,
}

export { GITHUB_URL, NPM_URL, WM_URL }
