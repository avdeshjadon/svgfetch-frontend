# AI Agent Operating Guidelines: svgfetch-frontend

> **CRITICAL INSTRUCTION**: This repository (`svgfetch-frontend`) is the official discovery web application for:
> 1. `svg-fetch` (Rust CLI core at `/Users/avdeshjadon/svg-fetch`)
> 2. `svgfetch-icons` (Asset CDN repository at `/Users/avdeshjadon/svgfetch-icons`)
>
> You MUST read [`ECOSYSTEM.md`](ECOSYSTEM.md) before making changes.

## Mandatory Agent Rules:

1. **CDN Asset Paths**:
   - `svgfetch-icons` organizes logos in categorized folders: `logos/<category>/<file>.svg`.
   - All CDN asset URLs must be constructed preserving category subfolders:
     ```javascript
     const fileUrl = (file) => `${CDN_BASE_URL}/${file.split('/').map(encodeURIComponent).join('/')}`;
     ```

2. **Clean Downloads**:
   - When a user downloads an SVG from the browser interface, clean the filename to its base leaf name (`file.split('/').pop()`), avoiding folder prefixes in the downloaded filename.

3. **Validation & Quality Gates**:
   - Always run `npm run build` before committing changes to ensure no broken imports or compilation errors.
