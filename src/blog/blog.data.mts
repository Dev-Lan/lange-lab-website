import { createContentLoader } from 'vitepress'
import { isContentPage } from '../.vitepress/lib/content.mts'

// One markdown file per post in this folder, named <date>-<slug>.md by
// convention. The `date` frontmatter field is what actually orders the list.
// See README.md for how to add one; TEMPLATE.md is the file to copy.
export default createContentLoader('blog/*.md', {
  transform(raw) {
    return raw
      .filter((page) => isContentPage(page.url))
      .map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title,
        // YAML parses an unquoted date into a Date, so format it here at build
        // time rather than in the browser — that also keeps the rendered string
        // identical between the prerendered HTML and the hydrated page.
        date: formatDate(frontmatter.date),
        author: frontmatter.author,
        description: frontmatter.description,
        sortKey: +new Date(frontmatter.date)
      }))
      .sort((a, b) => b.sortKey - a.sortKey)
  }
})

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
