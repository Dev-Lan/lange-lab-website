---
name: add-team-member
description: Add or update a person's profile on the Vizoic Lab website. Use when someone wants to add themselves or another person to the team page, create a lab profile, or edit an existing profile's name, role, photo, or links.
---

# Add a team member

Creates one markdown file in `src/team/`. The team listing picks it up
automatically — no other file should be touched.

Read `src/team/README.md` and `src/team/TEMPLATE.md` first; they are the source
of truth for the field names and conventions, and this skill should not drift
from them. `src/team/devin-lange.md` is a filled-in example.

## Steps

1. **Gather the details.** Ask for anything the person has not already given,
   using AskUserQuestion where the options are predictable. You need:
   - `name` (required) — their full name as they want it shown.
   - `group` (required) — which section of the team page they appear under:
     `pi`, `member`, or `alumni`. Infer it from what they tell you and confirm;
     `member` is the usual answer.
   - `position` (required) — their title, e.g. PhD Student, Postdoc,
     Research Assistant, Assistant Professor.
   - `order` (optional) — where they sit on the team page, lowest first. If
     unspecified, leave it out and let it default, or offer a sensible value
     based on the `order` values already used by files in `src/team/`.
   - `photo` (optional) — ask whether they have one and where the file is. The
     card crops it to a square on a tinted panel, so either a plain headshot or
     a cut-out with a transparent background works.
   - `links` (optional) — email, website, github, scholar, linkedin, and so on.
     Ask once for whichever they want; do not interrogate them field by field.
     Recognised link keys: `email`, `website`, `paper`, `pdf`, `video`, `code`,
     `github`, `scholar`, `orcid`, `linkedin`, `mastodon`, `bluesky`. Another key
     still renders, without an icon and with a build warning.
     `email` is a bare address, not a `mailto:` url.
   - `overrideUrl` (optional, rare) — only if their card should link somewhere
     else entirely rather than to a profile page here. Setting it means no page
     is built from the file, so do not write a bio into one that has it.
   - The bio itself. Offer to draft it from what they tell you, and make clear
     they can rewrite it — it is their page.

   Ask in as few rounds as possible. One batched question is better than six.

2. **Pick the filename.** Lowercase, dashes, derived from their name:
   `jane-doe.md`. Check the folder first — if that file already exists, this is
   an edit, not a new profile, so confirm before changing anything in it.

3. **Handle the photo.** If they gave you an image path, copy it to
   `src/public/images/team/<slug>.<ext>` and set `photo` to
   `/images/team/<slug>.<ext>` (a site-root path, not a relative one). If they
   have no photo, omit the `photo` field entirely — do not point it at a
   placeholder file that does not exist.

4. **Write the file** by copying the structure of `TEMPLATE.md`: frontmatter,
   then `# Name`, then the role line, then the bio. Links belong in the `links`
   frontmatter and nowhere else — the site renders them as the quick-links
   panel, so a hand-written list in the body would show up twice. Do not invent
   credentials, affiliations, or publications — use only what the person
   actually told you.

5. **Verify.** Run `pnpm build` and confirm it succeeds, then report what you
   created: the file path, the page address (`/team/<slug>`), and the image path
   if there is one. Mention that the team listing updates itself.

## Rules

- Create or modify exactly one profile file, plus at most one image file.
- Never edit `src/team/index.md`, `src/team/team.data.mts`, or another person's
  profile. If the request seems to need that, stop and explain why.
- Never rename an existing profile file — that breaks its published address.
