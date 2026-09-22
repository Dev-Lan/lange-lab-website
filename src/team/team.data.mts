import { createContentLoader } from 'vitepress'
import { isContentPage } from '../.vitepress/lib/content.mts'

// The sections of the team page, in the order they appear. A person's `group`
// frontmatter picks one; adding a section is one line here.
const GROUPS = [
  { key: 'pi', label: 'Principal Investigator' },
  { key: 'member', label: 'Members' },
  { key: 'alumni', label: 'Alumni' }
]

// What a profile with no `group`, or an unrecognised one, is filed under.
const FALLBACK = 'member'

// One markdown file per person in this folder. See README.md for how to add
// yourself; TEMPLATE.md is the file to copy.
export default createContentLoader('team/*.md', {
  transform(raw) {
    const people = raw
      .filter((page) => isContentPage(page.url))
      .map(({ url, frontmatter }) => ({
        url,
        name: frontmatter.name,
        // The granular title shown on the card: Postdoc, PhD Student, and so on.
        position: frontmatter.position ?? '',
        group: resolveGroup(frontmatter.group, url),
        photo: frontmatter.photo ?? null,
        order: frontmatter.order ?? 99
      }))
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))

    // Sections with nobody in them are dropped rather than rendered empty.
    return GROUPS.map((group) => ({
      ...group,
      people: people.filter((person) => person.group === group.key)
    })).filter((group) => group.people.length > 0)
  }
})

// An unknown group is never fatal — the person still appears, filed under the
// fallback section, and the build says so.
function resolveGroup(group: string | undefined, url: string) {
  if (!group) return FALLBACK
  if (GROUPS.some((g) => g.key === group)) return group
  console.warn(
    `[team] unknown group "${group}" in ${url} — filing under "${FALLBACK}". ` +
      `Known groups: ${GROUPS.map((g) => g.key).join(', ')}.`
  )
  return FALLBACK
}
