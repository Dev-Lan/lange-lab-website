# Blog posts

Every post is one markdown file in this folder. Adding a post means adding one
file — nothing else in the repo needs to change. The [blog page](index.md)
builds its list from whatever files are here, newest `date` first.

## Add a post

1. Copy [`TEMPLATE.md`](TEMPLATE.md) to a new file in this folder named
   `<date>-<short-title>.md`, lowercase with dashes:
   `2026-09-21-welcoming-new-students.md`. That filename becomes the page
   address (`/blog/2026-09-21-welcoming-new-students`).
2. Fill in the frontmatter. See the field table below.
3. Write the post in the body. It is plain markdown.
4. For images, put the file in `src/public/images/blog/` and reference it from
   the site root: `![Alt text](/images/blog/your-image.png)`.
5. Preview it (see below), then commit both your markdown file and any images.

## Edit a post

Open the file and change it. For a published post, prefer adding a correction
or an update note over silently rewriting what people already read.

The date in the filename is only a naming convention — the `date` field in the
frontmatter is what actually orders the blog index. If you change one, change
both, so the folder stays readable.

## Frontmatter fields

| Field         | Required | What it does                                                           |
| ------------- | -------- | ---------------------------------------------------------------------- |
| `title`       | yes      | Post title, shown on the blog index and as the page heading.           |
| `date`        | yes      | `YYYY-MM-DD`, unquoted. Sorts the index and is shown as the post date. |
| `author`      | yes      | Who wrote it, shown beside the date.                                   |
| `description` | yes      | One sentence shown under the title on the blog index.                  |

## What you can and cannot change

You can:

- Add, edit, or delete a post file in this folder.
- Add images to `src/public/images/blog/`.
- Use any markdown you like in the body of your own post.

Please don't, without asking first:

- Edit someone else's post.
- Edit `index.md` or `blog.data.mts` — those build the listing for every post,
  and a mistake there breaks the whole blog page rather than one post.
- Rename a published post's file. That changes its address and breaks any link
  anyone has shared to it.

## Preview your changes

```sh
pnpm install   # first time only
pnpm dev       # then open the printed URL and visit /blog/
```

The page reloads as you save. Before committing, run `pnpm build` — it fails on
broken internal links, which catches most mistakes.

## Using a coding agent

If you use Claude Code, the `add-blog-post` skill walks through all of this: it
asks what the post is about, writes the file, and checks that the site still
builds.
