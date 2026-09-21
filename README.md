# Vizoic Lab website

The [VitePress](https://vitepress.dev/) source for the Vizoic Lab website — a static site built from the markdown files in `src/`.

## Quick start

Requires Node.js 18 or newer.

```sh
npm install     # once, to install dependencies
npm run dev     # start the local dev server, then open the printed URL
```

The dev server hot-reloads as you edit anything under `src/`.

To check the production build — the exact static files that get deployed:

```sh
npm run build     # writes src/.vitepress/dist
npm run preview   # serve that build locally
```
