# Publications

Every publication is one entry in [`publications.bib`](publications.bib). There
is no markdown file per paper: the listing on
[the publications page](index.md) and the page for each paper are both generated
from that file.

The point of keeping it as BibTeX is that the same file is a real bibliography —
you can hand it to LaTeX for a CV or a related-work section without maintaining
the list twice. So the standard fields stay standard, and the handful of things
only this website cares about ride along as extra fields, which BibTeX styles
ignore.

## Add a publication

1. Open `publications.bib` and add an entry. Copy [`TEMPLATE.md`](TEMPLATE.md)
   for a filled-in specimen with every field explained.
2. Give it a citation key you would be happy to type in a `\cite{}` —
   `lastname` + year + a short name, e.g. `lange2024aardvark`.
3. Set `slug`. That becomes the page address, `/publications/<slug>`. The
   convention here is `<year>-<short-name>`. **Do not change a slug once the
   page is public** — it is someone else's bookmark.
4. Add the teaser image, if there is one, to
   `src/public/images/publications/` and point `image` at it.
5. Preview it (see below), then commit.

## Edit a publication

Edit its entry. Everything on the site follows: the listing, the page, the
abstract, the citation widget. Deleting the entry removes the page.

## Fields

Standard BibTeX fields, used as you would expect:

| Field | Required | Notes |
| --- | --- | --- |
| entry type | yes | `@article`, `@inproceedings`, `@misc` for a preprint, `@phdthesis`. It sets the "Type" shown on the page. |
| `title` | yes | |
| `author` | yes | `Last, First and Last, First` — BibTeX's own format. The site flips them for display. |
| `journal` / `booktitle` / `school` / `howpublished` | yes | Whichever suits the entry type. |
| `year` | yes | Groups the listing. |
| `doi` | no | Bare, no `https://doi.org/` — the site builds the link. |
| `abstract` | no | Shown on the page. Kept out of the copied citation. |
| `eprint`, `archiveprefix`, `primaryclass` | no | For arXiv preprints. |

Custom fields, read only by this site:

| Field | Notes |
| --- | --- |
| `slug` | The page address. |
| `venuename` | How the venue is shown, when it differs from the canonical field — e.g. `journal` is `IEEE Transactions on Visualization and Computer Graphics` but the site says `… (VIS)`. |
| `image` | Teaser image path, e.g. `/images/publications/2024-aardvark.png`. Entries without one use the full width of the row rather than leaving a gap. |
| `award` | Award text, shown as a badge on both the listing and the page. |
| `link_*` | One per link. The suffix is a key the site knows how to label and illustrate: `paper`, `pdf`, `video`, `website`, `code`, `data`, `slides`. An unknown suffix still renders, with a generic icon and a build warning. |

A `doi` doubles as the paper link, so `link_paper` is only needed when the paper
lives somewhere a DOI does not point.

## Writing the file

- **Accents go in directly** — `Pettré`, `Kouřil` — not as LaTeX escapes.
  Modern LaTeX reads UTF-8, and escapes would show up literally on the site.
- **`&` is escaped** as `\&`, which LaTeX needs; the site unescapes it. Same for
  `%`, `$`, `#`, `_`.
- `---` and `--` render as em and en dashes.
- Braces that protect capitalisation, like `{DQVis}`, are stripped for display
  and kept in the copied citation.

## What you can and cannot change

You can:

- Add, edit, or remove entries in `publications.bib`.
- Add teaser images to `src/public/images/publications/`.

Please don't, without asking first:

- Change the `slug` of a published entry, which breaks its address.
- Pre-format the data: no `et al.` in `author`, no URL in `doi`, no `In
  Proceedings of…` in `booktitle`. The site and any LaTeX bibliography both
  reformat these themselves.
- Edit `index.md`, `[slug].md`, `[slug].paths.mts`, or `publications.data.mts` —
  those build every publication page, so a mistake there takes out the whole
  section rather than one entry.

## Preview your changes

```sh
pnpm install   # first time only
pnpm dev       # then open the printed URL and visit /publications/
```

Editing `publications.bib` updates both the listing and each publication's page
while the dev server runs — the page addresses are generated from the file, so a
custom watcher in `.vitepress/config.mts` refreshes them on every save.

Before committing, run `pnpm build`. It fails on broken internal links and
prints a warning for any unrecognised `link_*` type.

## Using a coding agent

If you use Claude Code, the `add-publication` skill walks through this: it can
take a DOI, arXiv link, or pasted citation, work out the fields, append the
entry, and check that the site still builds.
