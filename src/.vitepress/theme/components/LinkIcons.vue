<script setup lang="ts">
import { computed } from 'vue'
import { FALLBACK_ICON, resolveLinks } from '../links'

const props = defineProps<{
  links?: Record<string, string>
  /** Named for the page the links belong to, so build warnings can point at it. */
  context?: string
}>()

const links = computed(() => resolveLinks(props.links, props.context ?? ''))
</script>

<template>
  <!-- The same links as the quick-links panel, reduced to their icons. The
       label moves to the tooltip and the accessible name, so the row stays
       compact without becoming a row of unlabelled buttons for a screen
       reader. -->
  <p v-if="links.length" class="LinkIcons">
    <a
      v-for="link in links"
      :key="link.key"
      class="icon-link"
      :href="link.href"
      :title="link.label"
      :aria-label="link.label"
      target="_blank"
      rel="noreferrer"
    >
      <component :is="link.icon ?? FALLBACK_ICON" aria-hidden="true" />
    </a>
  </p>
</template>
