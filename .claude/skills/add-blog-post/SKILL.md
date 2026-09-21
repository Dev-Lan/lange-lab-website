---
name: add-blog-post
description: Add or update a post on the Vizoic Lab website's blog. Use when someone wants to write a blog post, publish lab news or an update, draft a post from notes, or edit an existing post's title, date, author, or description.
---

# Add a blog post

Creates one markdown file in `src/blog/`. The blog listing picks it up
automatically — no other file should be touched.

Read `src/blog/README.md` and `src/blog/TEMPLATE.md` first; they are the source
of truth for the field names and conventions. The existing posts in `src/blog/`
show the expected shape.

## Steps

1. **Gather the details.** Ask for what you need in as few rounds as possible:
   - `title` (required).
   - `author` (required) — default to the person you are talking to, and confirm.
   - `date` (required) — default to today unless they say otherwise. Format
     `YYYY-MM-DD`, unquoted.
   - `description` (required) — one sentence for the blog index. Offer to write
     it from the post itself rather than making them compose it.
   - The post content: ask what they want to say, or work from notes, a draft, or
     a link they give you.

2. **Pick the filename.** `<date>-<short-title>.md`, lowercase with dashes:
   `2026-09-21-welcoming-new-students.md`. The date in the filename must match
   the `date` field. Check the folder first — if it exists, this is an edit;
   confirm before changing it.

3. **Write the post.** Frontmatter, then `# Title`, then a byline line in the
   form `September 21, 2026 — Author Name` (the date spelled out, matching how
   the blog index formats it), then the body in plain markdown.

   Write from what the person actually tells you. Do not invent lab news,
   results, names, or dates to pad a post out. If the post is thin, say so and
   ask what else they want to include.

4. **Handle images.** If they want one, put the file in
   `src/public/images/blog/` and reference it from the site root:
   `![Alt text](/images/blog/<file>)`. Always write real alt text.

5. **Verify.** Run `pnpm build`, confirm it succeeds, and check that the post
   appears at the top of the blog listing if it is the newest. Report the file
   path and the page address (`/blog/<slug>`).

## Rules

- Create or modify exactly one post file, plus any images it needs.
- Never edit `src/blog/index.md` or `src/blog/blog.data.mts`. If the request
  seems to need that, stop and explain why.
- Never rename or silently rewrite a published post — offer a correction or an
  update note instead.
