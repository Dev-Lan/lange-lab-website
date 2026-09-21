import { createContentLoader } from 'vitepress'

// One markdown file per post in this directory, named <date>-<slug>.md by
// convention. The `date` frontmatter field is what actually orders the list.
export default createContentLoader('blog/*.md', {
  transform(raw) {
    return raw
      .filter((page) => !isSectionIndex(page.url))
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

// The glob also matches blog/index.md, which is the listing page itself.
function isSectionIndex(url: string) {
  return url === '/blog/' || url === '/blog/index.html'
}
