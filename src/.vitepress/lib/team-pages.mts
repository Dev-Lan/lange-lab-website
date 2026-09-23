import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const TEAM_DIR = fileURLToPath(new URL('../../team', import.meta.url))

/**
 * Profiles that send their card somewhere else with `overrideUrl` have no page
 * of their own, so their markdown is kept out of the build entirely — otherwise
 * VitePress would publish a profile page nothing links to.
 *
 * Read from disk rather than from frontmatter at render time because
 * `srcExclude` is resolved when the config loads, before any page is built.
 * Paths are returned relative to srcDir, which is what `srcExclude` expects.
 */
export function profilesWithOverrideUrl(): string[] {
  return fs
    .readdirSync(TEAM_DIR)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => hasOverrideUrl(path.join(TEAM_DIR, file)))
    .map((file) => `team/${file}`)
}

/**
 * Every team member's display name mapped to where their card points, so other
 * parts of the site (publication author lists) can link people without keeping
 * a second list of names in sync.
 */
export function teamProfileHrefs(): Map<string, string> {
  const hrefs = new Map<string, string>()
  for (const file of fs.readdirSync(TEAM_DIR)) {
    if (!file.endsWith('.md') || file === 'index.md') continue
    if (file === 'README.md' || file === 'TEMPLATE.md') continue
    const frontmatter = readFrontmatter(path.join(TEAM_DIR, file))
    const name = field(frontmatter, 'name')
    if (!name) continue
    hrefs.set(name, field(frontmatter, 'overrideUrl') ?? `/team/${file.replace(/\.md$/, '')}`)
  }
  return hrefs
}

function readFrontmatter(file: string): string {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(file, 'utf8'))
  return match ? match[1] : ''
}

function field(frontmatter: string, name: string): string | undefined {
  const match = new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(frontmatter)
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined
}

function hasOverrideUrl(file: string): boolean {
  return /^overrideUrl:\s*\S/m.test(readFrontmatter(file))
}
