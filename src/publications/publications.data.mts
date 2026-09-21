import { createContentLoader } from 'vitepress'
import { isContentPage } from '../.vitepress/lib/content.mts'

// One markdown file per publication in this folder. The frontmatter is kept as
// unformatted data (authors as a list, bare DOI, venue and year separate) so the
// same files can later be the single source of truth for a CV as well. See
// README.md for how to add one; TEMPLATE.md is the file to copy.
export default createContentLoader('publications/*.md', {
  transform(raw) {
    return raw
      .filter((page) => isContentPage(page.url))
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
