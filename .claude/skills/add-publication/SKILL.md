---
name: add-publication
description: Add or update a paper on the Vizoic Lab website's publications page. Use when someone wants to add a publication, record a new paper, import a citation or BibTeX entry, or edit an existing publication's authors, venue, DOI, award, or links.
---

# Add a publication

Appends one entry to `src/publications/publications.bib`. Everything else — the
listing entry and the publication's own page — is generated from it, so that
file is the only one to touch.

Read `src/publications/README.md` and `src/publications/TEMPLATE.md` first; they
are the source of truth for the field names and conventions. The
`lange2024aardvark` entry in the .bib is a filled-in example using every
optional field.

## Steps

1. **Gather the details.** If the person pasted a citation, BibTeX entry, DOI, or
   paper URL, parse what you can from it and confirm the parsed result rather
   than asking them to retype it. You need:
   - `title` (required) — exactly as published.
   - `authors` (required) — full list, **in publication order**.
   - `venue` (required) — journal, conference, or workshop, spelled out.
   - `year` (required).
   - entry type (required) — `@article`, `@inproceedings`, `@misc` for a
     preprint, `@phdthesis`. Infer it from the venue and confirm; use
     AskUserQuestion if genuinely ambiguous.
   - `abstract` (optional but wanted) — retrieve it from the record rather than
     asking; quote it verbatim.
   - `doi` (optional) — bare, e.g. `10.1109/TVCG.2024.3456193`.
   - `award` (optional) — ask only if the venue suggests one, or they mention it.
   - `link_*` (optional) — usually `link_pdf`, `link_video`, `link_website`.
     Recognised suffixes: `paper`, `pdf`, `video`, `website`, `code`, `data`,
     `slides`. Another suffix still renders, with a generic icon and a build
     warning.
   - `image` (optional) — ask whether there is a teaser image and where it is;
     it goes in `src/public/images/publications/`.

   Ask in as few rounds as possible, and only for what you could not parse.

2. **Keep the data unformatted.** This is the part most likely to go wrong,
   because the file is meant to work as a real bibliography as well as the
   site's data:
   - `author` is BibTeX's `Last, First and Last, First` — never a joined
     display string, never `et al.`
   - `doi` is bare — no `https://doi.org/` prefix. The site builds the link,
     and it doubles as the paper link, so `link_paper` is only needed when the
     paper lives somewhere the DOI does not reach.
   - `journal` / `booktitle` carry the canonical venue name; use `venuename`
     only when the site should display something different.
   - Omit optional fields entirely rather than writing empty values.

3. **Pick the key and slug.** The citation key is `lastname` + year + a short
   name (`lange2024aardvark`) — something worth typing in a `\cite{}`. The
   `slug` is `<year>-<short-name>`, lowercase with dashes, and becomes the page
   address. Check the .bib first — if the work is already there, this is an
   edit; confirm before changing it, and never change the slug of an entry
   that is already published.

4. **Write the entry**, appending it to `publications.bib` in the shape
   `TEMPLATE.md` shows. Pick the entry type to match the work: `@article`,
   `@inproceedings`, `@misc` for a preprint, `@phdthesis`. Include the
   `abstract` when you can retrieve it from the DOI, arXiv, OpenReview, or
   Crossref record — quote it verbatim, never write one yourself — and never
   invent a DOI, award, or link you have not been given or verified.

   Write accents directly (`Pettré`), escape `&` as `\&`, and keep the
   author list in publication order.

5. **Verify.** Run `pnpm build`, confirm it succeeds with no warnings about
   unrecognised link types, and check that the paper appears under the right
   year on the publications listing and that its page renders. Report the page
   address (`/publications/<slug>`).

## Rules

- Add or edit exactly one entry in `publications.bib`, and any teaser image it
  needs in `src/public/images/publications/`.
- Never edit `index.md`, `[slug].md`, `[slug].paths.mts`, or
  `publications.data.mts`. Those generate every publication page; if the
  request seems to need changing them, stop and explain why.
- Never change the `slug` of an entry that is already published.
