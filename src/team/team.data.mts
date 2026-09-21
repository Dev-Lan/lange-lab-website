import { createContentLoader } from 'vitepress'

// One markdown file per person in this directory. Add yourself by copying
// example-student.md — no other file needs to change.
export default createContentLoader('team/*.md', {
  transform(raw) {
    return raw
      .filter((page) => !isSectionIndex(page.url))
      .map(({ url, frontmatter }) => ({
        url,
        name: frontmatter.name,
        role: frontmatter.role,
        photo: frontmatter.photo,
        order: frontmatter.order ?? 99
      }))
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
  }
})

// The glob also matches team/index.md, which is the listing page itself.
function isSectionIndex(url: string) {
  return url === '/team/' || url === '/team/index.html'
}
