import { createContentLoader } from 'vitepress'

// One markdown file per publication in this directory. The frontmatter is kept
// as unformatted data (authors as a list, bare DOI, venue and year separate) so
// the same files can later be the single source of truth for a CV as well.
export default createContentLoader('publications/*.md', {
  transform(raw) {
    return raw
      .filter((page) => !isSectionIndex(page.url))
      .map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title,
        authors: frontmatter.authors ?? [],
        venue: frontmatter.venue,
        year: frontmatter.year,
        type: frontmatter.type,
        doi: frontmatter.doi,
        award: frontmatter.award
      }))
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
  }
})

// The glob also matches publications/index.md, which is the listing page itself.
function isSectionIndex(url: string) {
  return url === '/publications/' || url === '/publications/index.html'
}
