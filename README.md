<div align="center">

  <img src="public/full_logo.svg" alt="svgfetch Logo" width="340" />

  <p><strong>⚡ Official web app, interactive logo playground & docs for <a href="https://github.com/avdeshjadon/svgfetch">svgfetch</a></strong></p>

  <p>
    <a href="https://github.com/avdeshjadon/svgfetch-frontend/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://oxc.rs/"><img src="https://img.shields.io/badge/Linter-oxlint-orange?style=flat-square" alt="Oxlint" /></a>
    <a href="https://github.com/avdeshjadon/svgfetch"><img src="https://img.shields.io/badge/CLI-svgfetch-DEA584?style=flat-square&logo=rust&logoColor=white" alt="Companion CLI" /></a>
  </p>

</div>

---

## 📖 Overview

**`svgfetch-frontend`** is the official web application, interactive playground, and documentation portal for [**svgfetch**](https://github.com/avdeshjadon/svgfetch) — the blazing-fast, pure-Rust CLI tool for finding, inspecting, and downloading official vector assets directly from Wikimedia Commons.

This web portal allows developers and designers to:
- 🔍 **Explore & Search Brands:** Search hundreds of official brand logos and icons with real-time vector previews.
- 📋 **One-Click Commands & SVG Markup:** Copy ready-to-run `svgfetch` terminal commands or grab raw SVG code instantly.
- 🖥️ **Interactive Terminal Demo:** Experience the command-line workflow directly inside the browser.
- 📚 **Comprehensive Documentation:** Read full CLI guides, variant resolution rules, installation instructions, security details, and FAQs.
- 🌓 **Theme-Aware:** Seamless toggle between sleek Dark Mode and clean Light Mode, with automatic system preference detection.

---

## ✨ Features

- **⚡ Instant Vector Library:** Filter by brand category (Tech, DevOps, Social, OS, Language) and variant (`icon`, `wordmark`, `mascot`, `lockup`).
- **🎯 Exact Entity Matching:** Sourced directly from verified Wikimedia Commons entities without tracking or bloated wrappers.
- **💻 Interactive Command Playground:** Simulate `svgfetch <brand> --variant <type>` queries and preview output formats before running them locally.
- **🎨 Modern Design & Micro-animations:** Built with custom vanilla CSS tokens, glassmorphism cards, responsive marquee, and smooth layout transitions.
- **⚡ Performance-First Stack:** Powered by **React 19** and **Vite 8** for sub-second build times and optimal bundle size.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Component architecture & modern state primitives |
| **[Vite 8](https://vite.dev/)** | Fast development server & production bundler |
| **[Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)** | Curated design system tokens, themes, and responsive layouts |
| **[Lucide React](https://lucide.dev/)** | Minimalist and consistent interface icons |
| **[Oxlint](https://oxc.rs/)** | High-performance JavaScript/JSX linting |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/avdeshjadon/svgfetch-frontend.git
cd svgfetch-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Visit [`http://localhost:5173`](http://localhost:5173) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production |
| `npm run preview` | Runs a local server to preview the production build |
| `npm run lint` | Runs `oxlint` across all source files for fast static analysis |

---

## 📁 Project Structure

```text
svgfetch-frontend/
├── public/                  # Static assets & brand vectors
│   ├── full_logo.svg        # Brand logo with typography
│   ├── logo.svg             # Brand icon mark
│   ├── favicon.svg          # Favicon asset
│   └── logos/               # Vector brand assets
├── src/
│   ├── components/          # Reusable UI & view components
│   │   ├── Navbar.jsx       # Navigation bar & theme switcher
│   │   ├── Hero.jsx         # Hero section with quick-install tabs
│   │   ├── LogoMarquee.jsx  # Animated brand banner
│   │   ├── FeatureGrid.jsx  # Feature overview cards
│   │   ├── LogoLibrary.jsx  # Interactive logo directory & search
│   │   ├── TerminalDemo.jsx # Interactive CLI terminal demo
│   │   ├── Docs.jsx         # Documentation viewer
│   │   ├── Footer.jsx       # Footer links & copyright
│   │   └── ...
│   ├── data/                # Documentation & site datasets
│   │   ├── siteData.js      # Brand list, features, install scripts
│   │   └── docsData.js      # Full CLI documentation content
│   ├── hooks/               # Custom React hooks (in-view, typewriter, count-up)
│   ├── App.jsx              # Main routing & application state
│   ├── main.jsx             # React DOM root entrypoint
│   └── index.css            # Global design tokens & styling
├── index.html               # Main HTML entrypoint with metadata & fonts
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies and npm scripts
```

---

## 🔌 Companion CLI Tool

Want to use `svgfetch` from your terminal? You can install or run it via multiple package managers:

```bash
# Run instantly with NPX
npx svgfetch <brand>

# Global installation via NPM
npm install -g svgfetch

# Install via Cargo (Rust)
cargo install svgfetch --locked

# Install via Homebrew
brew install avdeshjadon/tap/svgfetch

# Install via Shell Script (macOS / Linux)
curl -fsSL https://raw.githubusercontent.com/avdeshjadon/svgfetch/main/install.sh | bash

# Install via PowerShell (Windows)
irm https://raw.githubusercontent.com/avdeshjadon/svgfetch/main/install.ps1 | iex
```

👉 Check out the CLI repository: **[github.com/avdeshjadon/svgfetch](https://github.com/avdeshjadon/svgfetch)**

---

## 🏷️ GitHub Topics

This repository is categorized under:
- `developer-tools`
- `documentation`
- `icons`
- `playground`
- `react`
- `svg`
- `svgfetch`
- `vector-graphics`
- `vite`
- `wikimedia-commons`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) (or corresponding project license). See repository for details.

---

<div align="center">
  Crafted with ❤️ for developers by <a href="https://github.com/avdeshjadon">Avdesh Jadon</a>
</div>
