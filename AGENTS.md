<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Component placement

- Colocate route-specific components in a private `_components/` folder next to the route that uses them (e.g. `app/_components/` for `/`, `app/products/_components/` for `/products`). The `_` prefix keeps the folder out of routing.
- Only when a component is genuinely shared across multiple routes, move that specific component to the root `components/` folder and import it via `@/components/...`. Don't pre-emptively put things there.
- One component per file. Helpers used by a single component still get their own file in the same folder (e.g. `hero/header.tsx`, `hero/footer-bar.tsx`). Small non-component constants and types can stay with the component that uses them.
- File names are kebab-case: `search-bar.tsx`, `honeycomb.module.css`. Component identifiers stay PascalCase (`export default function SearchBar`).
- A component split across a folder uses `index.tsx` as its entry (e.g. `hero/index.tsx`), so it's imported by folder: `./_components/hero`.

# Working process

- Never act on an assumption. If something isn't stated (design, behaviour, scope, placement), ask before writing code.
- Work in four steps: **discuss** the goal, **interview** the user about anything unclear, **plan** the change and get it confirmed, then **execute**.
- Don't abstract or share code ahead of a confirmed need.
