<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { resolveLinks } from './links'

const { frontmatter, page, params } = useData()

// Generated pages (publication detail routes) carry their links in route
// params rather than frontmatter, since one markdown template serves them all.
const links = computed(() =>
  resolveLinks(
    frontmatter.value.links ?? params.value?.links,
    page.value.relativePath
  )
)
</script>

<template>
  <!-- Rendered into the default theme's `doc-after` slot, so on narrow screens
       this simply follows the content. custom.css lifts it into a right-hand
       rail once the viewport is wide enough for the theme to show its gutters. -->
  <nav v-if="links.length" class="QuickLinks" aria-label="Quick links">
    <div class="quick-links-sticky">
      <p class="quick-links-title">Links</p>
      <ul>
        <li v-for="link in links" :key="link.key">
          <a :href="link.href" target="_blank" rel="noreferrer">
            <!-- The icon cell keeps its width when there is no icon, so labels
                 stay aligned whether or not a link type is registered. -->
            <span class="quick-links-icon" aria-hidden="true">
              <component :is="link.icon" v-if="link.icon" />
            </span>
            <span class="quick-links-label">{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
