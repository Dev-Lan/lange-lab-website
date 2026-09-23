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

function hasOverrideUrl(file: string): boolean {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(file, 'utf8'))
  return frontmatter ? /^overrideUrl:\s*\S/m.test(frontmatter[1]) : false
}
