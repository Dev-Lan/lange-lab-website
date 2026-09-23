import fs from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { teamProfileHrefs } from './team-pages.mts'

// bibtex-parse is CommonJS, and it only ever runs here — in Node, at build
// time — so nothing about it reaches the browser.
const require = createRequire(import.meta.url)
const bibtexParse = require('bibtex-parse')

const BIB_PATH = fileURLToPath(
  new URL('../../publications/publications.bib', import.meta.url)
)

/** IEEE shortens author lists longer than this to "First Author et al." */
const IEEE_MAX_AUTHORS = 6

export interface PublicationAuthor {
  name: string
  href: string | null
}

export interface Publication {
  slug: string
  url: string
  key: string
  title: string
  authors: PublicationAuthor[]
  venue: string
  year: number
  /** journal | conference | workshop | preprint | dissertation | other */
  kind: string
  doi: string | null
  abstract: string | null
  image: string | null
  award: string | null
  links: Record<string, string>
  /** The entry exactly as written in the .bib, for copying. */
  bibtex: string
  /** The same work as an IEEE-style plain-text citation. */
  ieee: string
}

/**
 * The publication list, newest first.
 *
 * `publications.bib` is the single source of truth: standard BibTeX fields so
 * the file also works in LaTeX, plus a few custom ones this site needs (`slug`,
 * `image`, `award`, `venuename`, `link_*`), which BibTeX styles ignore.
 */
export function loadPublications(): Publication[] {
  const source = fs.readFileSync(BIB_PATH, 'utf8')
  const raw = sliceEntries(source)
  const authorHrefs = teamProfileHrefs()

  return bibtexParse
    .entries(source)
    .map((entry: Record<string, string>) => toPublication(entry, raw, authorHrefs))
    .sort(
      (a: Publication, b: Publication) =>
        b.year - a.year || a.title.localeCompare(b.title)
    )
}

function toPublication(
  entry: Record<string, string>,
  raw: Map<string, string>,
  authorHrefs: Map<string, string>
): Publication {
  const slug = entry.SLUG ?? entry.key
  const doi = entry.DOI ?? null
  const authors = splitAuthors(entry.AUTHOR ?? '').map((name) => ({
    name,
    href: authorHrefs.get(name) ?? null
  }))

  const publication: Publication = {
    slug,
    url: `/publications/${slug}`,
    key: entry.key,
    title: deLatex(entry.TITLE ?? '(untitled)'),
    authors,
    venue: deLatex(
      entry.VENUENAME ??
        entry.JOURNAL ??
        entry.BOOKTITLE ??
        entry.SCHOOL ??
        entry.HOWPUBLISHED ??
        ''
    ),
    year: Number(entry.YEAR) || 0,
    kind: KIND_BY_TYPE[entry.type] ?? 'other',
    doi,
    abstract: entry.ABSTRACT ? deLatex(entry.ABSTRACT) : null,
    image: entry.IMAGE ?? null,
    award: entry.AWARD ? deLatex(entry.AWARD) : null,
    links: collectLinks(entry, doi),
    bibtex: forCitation(raw.get(entry.key) ?? ''),
    ieee: ''
  }

  publication.ieee = ieeeCitation(publication)
  return publication
}

const KIND_BY_TYPE: Record<string, string> = {
  article: 'journal',
  inproceedings: 'conference',
  incollection: 'workshop',
  misc: 'preprint',
  unpublished: 'preprint',
  phdthesis: 'dissertation'
}

/**
 * `link_pdf = {...}` becomes `links.pdf`, where the suffix is a key the link
 * registry in theme/links.ts already knows how to label and illustrate.
 */
function collectLinks(entry: Record<string, string>, doi: string | null) {
  const links: Record<string, string> = {}
  for (const [field, value] of Object.entries(entry)) {
    if (field.startsWith('LINK_') && value) {
      links[field.slice('LINK_'.length).toLowerCase()] = value
    }
  }
  // A DOI is a link to the paper, so it need not be written out twice.
  if (doi && !links.paper) links.paper = `https://doi.org/${doi}`
  return links
}

/**
 * The .bib is written to be valid LaTeX as well as a data file, so it carries
 * LaTeX's escapes and dash conventions. Undo the few that would otherwise show
 * up literally on the page. The raw entry the citation widget copies is left
 * untouched — that one should stay exactly as written.
 */
function deLatex(value: string): string {
  return value
    .replace(/\\([&%$#_{}])/g, '$1')
    .replace(/---/g, '\u2014')
    .replace(/--/g, '\u2013')
    .trim()
}

/**
 * BibTeX separates authors with " and " and writes them "Last, First"; this
 * site shows them the way people write their own names.
 */
function splitAuthors(field: string): string[] {
  return field
    .split(/\s+and\s+/)
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => {
      const [last, first] = name.split(',').map((part) => part.trim())
      return first ? `${first} ${last}` : name
    })
}

/**
 * The raw text of each entry, taken straight from the file by matching braces.
 *
 * The parser strips the braces that protect capitalisation, so re-serialising
 * its output would hand people a subtly different entry from the one on disk.
 */
function sliceEntries(source: string): Map<string, string> {
  const entries = new Map<string, string>()
  const header = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g
  let match: RegExpExecArray | null

  while ((match = header.exec(source))) {
    const start = match.index
    let depth = 0
    for (let i = source.indexOf('{', start); i < source.length; i++) {
      if (source[i] === '{') depth++
      else if (source[i] === '}' && --depth === 0) {
        entries.set(match[2], source.slice(start, i + 1))
        break
      }
    }
  }
  return entries
}

/**
 * The entry as someone would want it in their own bibliography: the standard
 * fields exactly as written here, without the ones that only mean something to
 * this website, and without the abstract — which is on the page anyway and
 * would otherwise be most of what the copy button hands over.
 *
 * Whole lines are dropped rather than the entry being re-serialised, so the
 * fields that remain keep their original braces and spacing.
 */
const SITE_ONLY_FIELDS = /^\s*(slug|image|award|venuename|abstract|link_[a-z]+)\s*=/i

function forCitation(raw: string): string {
  if (!raw) return ''
  const kept: string[] = []
  let depth = 0
  let dropping = false

  for (const line of raw.split('\n')) {
    // Field lines sit one level inside the entry's own braces.
    if (depth === 1 && SITE_ONLY_FIELDS.test(line)) dropping = true
    if (!dropping) kept.push(line)
    // A field can wrap across lines, so follow the braces to know where it ends.
    depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length
    if (dropping && depth <= 1) dropping = false
  }

  // Whatever field ends up last should not keep a dangling comma.
  const closing = kept.pop()
  const last = kept.length - 1
  if (last >= 0) kept[last] = kept[last].replace(/,\s*$/, '')
  return [...kept, closing].join('\n')
}

function ieeeCitation(publication: Publication): string {
  const names = publication.authors.map((author) => toInitials(author.name))
  let authorList = ''
  if (names.length > IEEE_MAX_AUTHORS) authorList = `${names[0]} et al.`
  else if (names.length === 2) authorList = `${names[0]} and ${names[1]}`
  else if (names.length > 2)
    authorList = `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
  else authorList = names[0] ?? ''

  const parts = [`${authorList}, "${publication.title},"`]
  if (publication.venue) parts.push(`${publication.venue},`)
  parts.push(`${publication.year}.`)
  if (publication.doi) parts.push(`doi: ${publication.doi}.`)
  return parts.join(' ')
}

/**
 * "Devin Lange" becomes "D. Lange"; "Thomas A. Zangle" becomes "T. A. Zangle".
 *
 * Lowercase particles belong to the surname, not the given names — otherwise
 * "Astrid van den Brandt" would come out as "A. v. d. Brandt".
 */
function toInitials(name: string): string {
  const parts = name.split(/\s+/)
  const surname = [parts.pop() ?? name]
  while (parts.length && /^[a-z]/.test(parts[parts.length - 1])) {
    surname.unshift(parts.pop() as string)
  }
  if (!parts.length) return surname.join(' ')
  return `${parts.map((part) => `${part[0]}.`).join(' ')} ${surname.join(' ')}`
}
