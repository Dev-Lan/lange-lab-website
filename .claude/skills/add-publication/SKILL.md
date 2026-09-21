---
name: add-publication
description: Add or update a paper on the Vizoic Lab website's publications page. Use when someone wants to add a publication, record a new paper, import a citation or BibTeX entry, or edit an existing publication's authors, venue, DOI, award, or links.
---

# Add a publication

Creates one markdown file in `src/publications/`. The publications listing picks
it up automatically — no other file should be touched.

Read `src/publications/README.md` and `src/publications/TEMPLATE.md` first; they
are the source of truth for the field names and conventions.
`src/publications/2024-aardvark.md` is a filled-in example with every optional
field in use.

## Steps

1. **Gather the details.** If the person pasted a citation, BibTeX entry, DOI, or
   paper URL, parse what you can from it and confirm the parsed result rather
   than asking them to retype it. You need:
   - `title` (required) — exactly as published.
   - `authors` (required) — full list, **in publication order**.
   - `venue` (required) — journal, conference, or workshop, spelled out.
   - `year` (required).
   - `type` (required) — `journal`, `conference`, `workshop`, or `preprint`.
     Infer it from the venue and confirm; use AskUserQuestion if genuinely
     ambiguous.
   - `doi` (optional) — bare, e.g. `10.1109/TVCG.2024.3456193`.
   - `award` (optional) — ask only if the venue suggests one, or they mention it.
   - `links` (optional) — `paper`, `pdf`, `video`, `website`.

   Ask in as few rounds as possible, and only for what you could not parse.

2. **Keep the data unformatted.** This is the part most likely to go wrong,
   because these files are meant to generate a CV later as well as this site:
   - `authors` is a YAML list, one name per line — never a single joined string,
     never `et al.`
   - `doi` is bare — strip any `https://doi.org/` prefix into the `doi` field and
     put the full URL under `links.paper` if you want it clickable.
   - `venue` has no `In `, no `Proceedings of`, no year appended.
   - Omit optional fields entirely rather than writing empty values.

3. **Pick the filename.** `<year>-<short-name>.md`, lowercase with dashes, where
   the short name is the system or one memorable word from the title:
   `2024-aardvark.md`. Check the folder first — if it exists, this is an edit;
   confirm before changing it.

4. **Write the file.** Copy `TEMPLATE.md`'s structure and leave the body as it
   is: it reads title, authors, venue, and links back out of the frontmatter, so
   none of that gets retyped. Only fill in the Summary section if the person
   gives you one — do not write an abstract yourself, and never invent a DOI,
   award, or link that you have not been given or verified.

5. **Verify.** Run `pnpm build`, confirm it succeeds, and check that the paper
   appears under the right year on the publications listing. Report the file
   path and the page address (`/publications/<slug>`).

## Rules

- Create or modify exactly one publication file.
- Never edit `src/publications/index.md` or
  `src/publications/publications.data.mts`. If the request seems to need that,
  stop and explain why.
- Never rename an existing publication file — that breaks its published address.
