import { loadPublications } from '../.vitepress/lib/publications.mts'

/**
 * The listing data. Everything comes from publications.bib — see
 * lib/publications.mts for the parsing and README.md for how to add an entry.
 *
 * The abstract and the raw BibTeX are dropped here: the overview does not show
 * them, and shipping 18 abstracts to every visitor of the listing page would be
 * most of its weight. The detail pages carry their own copy.
 */
export default {
  watch: ['./publications.bib'],
  load() {
    return loadPublications().map(({ abstract, bibtex, ieee, ...rest }) => rest)
  }
}
