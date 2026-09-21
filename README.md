# Vizoic Lab website

The [VitePress](https://vitepress.dev/) source for the Vizoic Lab website — a static site built from the markdown files in `src/`.

## Quick start

Requires Node.js 18 or newer and [pnpm](https://pnpm.io/installation).

```sh
pnpm install    # once, to install dependencies
pnpm dev        # start the local dev server, then open the printed URL
```

The dev server hot-reloads as you edit anything under `src/`.

To check the production build — the exact static files that get deployed:

```sh
pnpm build     # writes src/.vitepress/dist
pnpm preview   # serve that build locally
```

## Editing content

Each content folder documents itself, and each has a `TEMPLATE.md` to copy:

- [`src/team/`](src/team/README.md) — one file per person
- [`src/publications/`](src/publications/README.md) — one file per paper
- [`src/blog/`](src/blog/README.md) — one file per post

Adding anything is adding one file to the right folder; the listing pages build
themselves from whatever is there. If you work with Claude Code, the
`add-team-member`, `add-publication`, and `add-blog-post` skills in
`.claude/skills/` walk through the same steps interactively.
