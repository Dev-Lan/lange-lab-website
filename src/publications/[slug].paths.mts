import { loadPublications } from '../.vitepress/lib/publications.mts'

/**
 * One page per entry in publications.bib, at the slug the entry declares.
 * The whole record rides along in params, so [slug].md can render the page
 * without a markdown file per paper.
 */
export default {
  paths() {
    return loadPublications().map((publication) => ({
      params: publication
    }))
  }
}
