# Publication pages

Every publication is one markdown file in this folder. Adding a paper means
adding one file — nothing else in the repo needs to change. The
[publications page](index.md) builds its list from whatever files are here,
newest year first.

The frontmatter is deliberately stored as plain data — authors as a list, the
DOI without a URL around it, venue and year in separate fields — so these files
can later generate a CV as well as this website. Keep that shape even when it
feels fussier than writing a formatted citation.

## Add a publication

1. Copy [`TEMPLATE.md`](TEMPLATE.md) to a new file in this folder named
   `<year>-<short-name>.md`, lowercase with dashes: `2026-aardvark.md`. That
   filename becomes the page address (`/publications/2026-aardvark`).
2. Fill in the frontmatter. See the field table below.
3. Delete any optional lines that do not apply, rather than leaving them blank —
   an empty `award:` still renders as an empty award line.
4. Leave the body as it is unless you want to write a summary. It reads the
   title, authors, and venue back out of the frontmatter, and the links appear
   in the quick-links panel, so you do not retype any of that.
5. Preview it (see below), then commit.

## Edit a publication

Open the file and change it. Correcting an author list or adding a link that
did not exist yet — a DOI once the paper is out, a video after the talk — is
just editing the frontmatter.

## Frontmatter fields

| Field     | Required | What it does                                                                   |
| --------- | -------- | ------------------------------------------------------------------------------ |
| `title`   | yes      | Full title as published. Quote it — titles often contain a colon.              |
| `authors` | yes      | A YAML list, one author per line, **in publication order**. Not one string.    |
| `venue`   | yes      | Journal, conference, or workshop name, spelled out.                            |
| `year`    | yes      | Four-digit year, unquoted. Groups the publication on the listing page.         |
| `type`    | yes      | One of `journal`, `conference`, `workshop`, `preprint`.                        |
| `doi`     | no       | Bare DOI such as `10.1109/TVCG.2024.3456193` — no `https://doi.org/` prefix.   |
| `award`   | no       | Award text, shown on the listing and the page. Omit the line if there is none. |
| `links`   | no       | Named links shown as the quick-links panel. See below.                         |

## Quick links

Anything under `links` in the frontmatter is rendered as the quick-links panel:
an icon and a name per link, in the right-hand margin on a wide screen, and at
the bottom of the page on a narrow one. Do not also write these links into the
body — the panel is the one place they belong now.

Recognised keys, each with its own icon and label:

`email`, `website`, `paper`, `pdf`, `video`, `code`, `github`, `scholar`,
`orcid`, `linkedin`, `mastodon`, `bluesky`

Any other key still works. It keeps its url, takes a capitalised version of the
key as its label, and renders with a blank space where the icon would be, so it
stays lined up with the rest. `pnpm build` prints a warning naming the key, which
is the cue to add it to `src/.vitepress/theme/links.ts` if it deserves an icon.

`email` takes a bare address — `you@example.com`, not `mailto:you@example.com`.

Publications generally use `paper`, `pdf`, `video`, and `website`.

## What you can and cannot change

You can:

- Add, edit, or delete a publication file in this folder.
- Add a summary section to the body of a publication page.

Please don't, without asking first:

- Pre-format the data: no `et al.` in `authors`, no full URL in `doi`, no
  `In Proceedings of…` prefix in `venue`. A CV generator will read these fields.
- Edit `index.md` or `publications.data.mts` — those build the listing for every
  paper, and a mistake there breaks the whole publications page.
- Rename an existing file. That changes the page address and breaks any link
  anyone has shared to it.

## Preview your changes

```sh
pnpm install   # first time only
pnpm dev       # then open the printed URL and visit /publications/
```

The page reloads as you save. Before committing, run `pnpm build` — it fails on
broken internal links, which catches most mistakes.

## Using a coding agent

If you use Claude Code, the `add-publication` skill walks through all of this:
it asks for the paper's details, writes the file, and checks that the site still
builds.
