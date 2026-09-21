// Every listing page globs the markdown files in its own folder, which also
// matches files that are not content: the listing page itself (index.md), the
// human-facing docs (README.md), and the copy-me starting point (TEMPLATE.md).
//
// Keep this in sync with `srcExclude` in config.mts.
export function isContentPage(url: string): boolean {
  const path = url.replace(/\.html$/, '')
  if (path.endsWith('/')) return false // the folder's own listing page
  const slug = path.split('/').pop()!.toLowerCase()
  return slug !== 'index' && slug !== 'readme' && slug !== 'template'
}
