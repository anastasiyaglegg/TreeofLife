# The Tree of Career

An interactive personal portfolio shaped like a tree.

- **Roots** (click to open) — three formative background moments
- **Branches** (click to open) — three personal qualities
- **Fruit** (click to make it fall) — three professional skills, animated tumbling to the ground

Built with plain **HTML, CSS, and TypeScript** — no framework, no build tool beyond `tsc`.

## Run it

No build step is required to view the site — `dist/main.js` is already compiled and committed.

```bash
# just open it
open index.html

# or serve it locally
npm run serve
```

## Edit it

The interaction logic lives in `src/main.ts`. All of the copy (root/branch/fruit text) lives at the
top of that file in the `CONTENT` object, so it's easy to update without touching markup.

```bash
npm install        # installs the TypeScript compiler
npm run build       # compiles src/main.ts -> dist/main.js
npm run watch        # recompiles on save while you edit
```

## Structure

```
index.html          the SVG tree + page markup
css/style.css        all styling, palette, and the fruit-fall animation
src/main.ts           TypeScript: click handling, panel, fall animation
dist/main.js           compiled output (committed — see .gitignore note)
tsconfig.json          TypeScript compiler config
package.json            scripts (build / watch / serve)
```

## Customize

- **Copy**: edit the `CONTENT` object in `src/main.ts`.
- **Colors/type**: edit the `:root` custom properties at the top of `css/style.css`.
- **Tree shape**: the roots, trunk, branches, and fruit are hand-drawn SVG paths in `index.html` —
  nudge the coordinates to reshape the tree.
- **Fall distance**: tweak `FALL_TARGETS` in `src/main.ts` if you reshape the tree and the fruit
  needs to land somewhere new.
