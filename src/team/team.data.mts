import { createContentLoader } from 'vitepress'
import { isContentPage } from '../.vitepress/lib/content.mts'

// One markdown file per person in this folder. See README.md for how to add
// yourself; TEMPLATE.md is the file to copy.
export default createContentLoader('team/*.md', {
  transform(raw) {
    return raw
      .filter((page) => isContentPage(page.url))
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
