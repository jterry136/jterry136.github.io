This repository is a small ReScript + React site built with Vite and Tailwind.

Keep guidance short and actionable so AI agents can make safe, correct edits quickly.

1) Big picture
- Source language: ReScript (.res) compiled to ES modules (.bs.mjs) via `rescript` (see `bsconfig.json`).
- Build/runtime: Vite serves the compiled `.bs.mjs` files and static assets. The dev loop runs two commands: `npm run res:dev` (ReScript watcher) and `npm run dev` (Vite).
- Styling: Tailwind configured in `tailwind.config.cjs` and imported from `src/index.css` / `App.css`.

2) Primary files and patterns to reference
- `bsconfig.json` — ReScript compiler config: sources in `src/`, `in-source` JS output (`.bs.mjs`), JSX automatic mode. Respect this when renaming/moving files.
- `package.json` — scripts: `res:dev`, `res:build`, `dev`, `build`, `preview`.
- `vite.config.js` — Vite plugin includes `**/*.bs.mjs` so changes to compiled filenames matter.
- `src/*.res` and companion interface files `*.resi` — ReScript components follow `@react.component` pattern and often have `.resi` interfaces for Fast Refresh stability. When adding components, add `.resi` where appropriate.
- Tracked compiled outputs (`*.bs.mjs`) are present in `src/` — do not delete compiled artifacts unless you update `.gitignore` and understand the intent (see README note).

3) Developer workflows (what to run)
- Start ReScript watcher (needed for dev): `npm run res:dev`.
- Start Vite dev server in another terminal: `npm run dev`.
- Full build (production): `npm run build` (runs Vite build). Ensure ReScript sources were built (`npm run res:build`) beforehand if CI does not run `res:build`.

4) Project-specific conventions
- Keep `.bs.mjs` JS output checked in. PRs should show both `.res` and `.bs.mjs` diffs for meaningful review.
- Use `.resi` for component interfaces to avoid Fast Refresh breakage. Example: `src/Button.res` + `src/Button.resi`.
- Exports: Components should be the only exported React values from a file to maintain Fast Refresh behavior (see README Fast Refresh note in `README.md`).

5) Safe edit rules for AI agents
- Prefer editing `.res` source files, not the emitted `.bs.mjs`. If you change `.res`, update the `.bs.mjs` output to match or run the compiler locally.
- For superficial styling edits, prefer `App.css` / `index.css` or Tailwind classes in component JSX rather than touching build configs.
- When adding new files, update `bsconfig.json` only if adding new source directories. Otherwise put code under `src/`.
- Avoid removing tracked compiled files; if needed, propose the change in the PR and explain why.

6) Example edits
- Fixing a button prop: edit `src/Button.res` and its `.resi` if the public API changes, then run `rescript` to regenerate `src/Button.bs.mjs`.
- Adding a new component: create `src/MyComp.res` and `src/MyComp.resi`, export the component with `@react.component`, then commit both `.res` and `.bs.mjs` outputs.

7) Integration & dependencies
- Key runtime deps: `react`, `react-dom`, `@rescript/react` — avoid bumping major versions without testing compiled outputs.
- Tooling: `vite`, `tailwindcss`, `postcss`, and `autoprefixer` are used for dev server and CSS pipeline.

8) Where to look for context
- Read `bsconfig.json`, `package.json`, `vite.config.js`, and `README.md` first. Then open `src/App.res`, `src/Main.res`, and `src/Button.res` for idiomatic patterns.

If anything here is unclear or you want me to add more examples (tests, CI, or PR expectations), tell me which area to expand.
