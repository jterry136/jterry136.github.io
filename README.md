# TypeScript + Vite + Tailwind Blog

This repository is a simple self-hosted blog built with Vite, React, TypeScript, and Tailwind CSS.

Features
- Markdown posts live in the `posts/` directory as `.md` files.
- Frontmatter support (title, date, tags, excerpt, featured_image).
- Client-side rendering using Vite's `import.meta.glob` to load markdown files.

Development

Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
```

Notes
- This repo was migrated from a ReScript-based template to a TypeScript/React stack for simplicity.
- If you want server-side rendering or pre-rendering for SEO, we can add a static generation step later.
