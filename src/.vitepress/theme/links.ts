import type { Component } from 'vue'

import Mail from '~icons/lucide/mail'
import Globe from '~icons/lucide/globe'
import FileText from '~icons/lucide/file-text'
import FileDown from '~icons/lucide/file-down'
import Video from '~icons/lucide/video'
import Code from '~icons/lucide/code'
import Database from '~icons/lucide/database'
import Presentation from '~icons/lucide/presentation'
import LinkIcon from '~icons/lucide/link'
import GitHub from '~icons/simple-icons/github'
import Scholar from '~icons/simple-icons/googlescholar'
import Orcid from '~icons/simple-icons/orcid'
import LinkedIn from '~icons/simple-icons/linkedin'
import Mastodon from '~icons/simple-icons/mastodon'
import Bluesky from '~icons/simple-icons/bluesky'

/** Stands in wherever a link type has no icon of its own. */
export const FALLBACK_ICON = LinkIcon

export interface ResolvedLink {
  key: string
  label: string
  href: string
  icon: Component | null
}

// Every link type the quick-links panel knows how to label and illustrate.
// Adding a type is one line here plus the matching `~icons/...` import above.
const REGISTRY: Record<string, { label: string; icon: Component }> = {
  email: { label: 'Email', icon: Mail },
  website: { label: 'Website', icon: Globe },
  paper: { label: 'Paper', icon: FileText },
  pdf: { label: 'PDF', icon: FileDown },
  video: { label: 'Video', icon: Video },
  code: { label: 'Code', icon: Code },
  data: { label: 'Data', icon: Database },
  slides: { label: 'Slides', icon: Presentation },
  github: { label: 'GitHub', icon: GitHub },
  scholar: { label: 'Google Scholar', icon: Scholar },
  orcid: { label: 'ORCID', icon: Orcid },
  linkedin: { label: 'LinkedIn', icon: LinkedIn },
  mastodon: { label: 'Mastodon', icon: Mastodon },
  bluesky: { label: 'Bluesky', icon: Bluesky }
}

// Turns `links: { key: url }` frontmatter into what the panel renders. An
// unrecognised key is never fatal: it keeps its url, gets a readable label and
// no icon, and warns once during the build so it can be registered later.
export function resolveLinks(
  links: Record<string, string> | undefined,
  pagePath = ''
): ResolvedLink[] {
  if (!links) return []

  return Object.entries(links)
    .filter(([, url]) => typeof url === 'string' && url.length > 0)
    .map(([key, url]) => {
      const known = REGISTRY[key]
      if (!known) warnUnknown(key, pagePath)
      return {
        key,
        label: known?.label ?? humanize(key),
        href: normalizeHref(key, url),
        icon: known?.icon ?? null
      }
    })
}

// Email is written as a bare address in frontmatter, which is friendlier to
// type than a mailto: url, so add the scheme here rather than asking authors to.
function normalizeHref(key: string, url: string): string {
  if (key === 'email' && !url.includes(':')) return `mailto:${url}`
  return url
}

function humanize(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1)
}

const warned = new Set<string>()

function warnUnknown(key: string, pagePath: string) {
  if (!import.meta.env.SSR) return
  const id = `${key}@${pagePath}`
  if (warned.has(id)) return
  warned.add(id)
  console.warn(
    `[quick-links] unknown link type "${key}"${pagePath ? ` in ${pagePath}` : ''} — ` +
      `rendering it without an icon. Add it to src/.vitepress/theme/links.ts to give it one.`
  )
}
