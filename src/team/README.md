# Team pages

Every person on the team is one markdown file in this folder. Adding yourself
means adding one file — nothing else in the repo needs to change. The
[team page](index.md) builds its list from whatever files are here.

## Add yourself

1. Copy [`TEMPLATE.md`](TEMPLATE.md) to a new file in this folder named after
   you, in lowercase with dashes: `jane-doe.md`. That filename becomes your page
   address (`/team/jane-doe`), so pick it once and keep it.
2. Fill in the frontmatter — the block between the `---` lines at the top. See
   the field table below.
3. Write your bio in the body, below the frontmatter. It is plain markdown.
4. If you want a photo, put the image file in `src/public/images/team/` and set
   the `photo` field to `/images/team/<your-file>.jpg`. Leave `photo` out
   entirely if you would rather not have one — the team page handles that.
5. Preview it (see below), then commit both your markdown file and your image.

## Edit your page

Open your file and change it. Editing the body changes only your own page;
editing `name`, `role`, `photo`, or `order` also changes how your card looks on
the team listing. Deleting your file removes you from the site.

## Frontmatter fields

| Field   | Required | What it does                                                             |
| ------- | -------- | ------------------------------------------------------------------------ |
| `name`  | yes      | Your name, shown on your card on the team page.                          |
| `role`  | yes      | Your position, e.g. `PhD Student`. Shown under your name.                |
| `order` | no       | Sort position on the team page, lowest first. Defaults to `99`.          |
| `photo` | no       | Site-root path to your image, e.g. `/images/team/jane-doe.jpg`.          |
| `links` | no       | Named links (email, website, github, scholar, …). Stored for later use.  |

## What you can and cannot change

You can:

- Add, edit, or delete your own file in this folder.
- Add your image to `src/public/images/team/`.
- Write whatever markdown you like in the body of your own page.

Please don't, without asking first:

- Edit someone else's profile file.
- Edit `index.md` or `team.data.mts` — those build the listing for everyone, and
  a mistake there breaks the whole team page rather than one profile.
- Rename an existing person's file. That changes their page address and breaks
  any link anyone has shared to it.

## Preview your changes

```sh
pnpm install   # first time only
pnpm dev       # then open the printed URL and visit /team/
```

The page reloads as you save. Before committing, run `pnpm build` — it fails on
broken internal links, which catches most mistakes.

## Using a coding agent

If you use Claude Code, the `add-team-member` skill walks through all of this:
it asks for your details, writes the file, and checks that the site still
builds.
