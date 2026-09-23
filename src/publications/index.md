---
outline: 'deep'
---

<script setup>
import { computed } from 'vue'
import { data as publications } from './publications.data.mts'

// Already sorted newest-first by the loader, so grouping preserves that order.
const byYear = computed(() => {
  const groups = []
  for (const pub of publications) {
    const last = groups[groups.length - 1]
    if (last && last.year === pub.year) last.publications.push(pub)
    else groups.push({ year: pub.year, publications: [pub] })
  }
  return groups
})
</script>

# Publications

<!-- Indentation is kept shallow and blank lines avoided on purpose: four
spaces or a blank line inside an HTML block turns the rest into a markdown code
block rather than markup. -->
<template v-for="group in byYear" :key="group.year">
<h2 :id="`year-${group.year}`" tabindex="-1">
{{ group.year }}
<a class="header-anchor" :href="`#year-${group.year}`" :aria-label="`Permalink to &quot;${group.year}&quot;`">&#8203;</a>
</h2>
<div v-for="pub in group.publications" :key="pub.slug" class="publication-entry" :class="{ 'has-teaser': !!pub.image }">
<a v-if="pub.image" class="publication-entry-teaser" :href="pub.url">
<img :src="pub.image" :alt="`Teaser image for ${pub.title}`" loading="lazy" />
</a>
<div class="publication-entry-body">
<h3><a :href="pub.url">{{ pub.title }}</a></h3>
<AuthorList :authors="pub.authors" />
<p class="publication-venue"><strong>{{ pub.venue }}</strong>, {{ pub.year }}</p>
<AwardBadge :award="pub.award" />
<LinkIcons :links="pub.links" :context="pub.slug" />
</div>
</div>
</template>
