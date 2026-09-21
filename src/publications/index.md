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

<template v-for="group in byYear" :key="group.year">
  <h2>{{ group.year }}</h2>
  <div v-for="pub in group.publications" :key="pub.url">
    <h3><a :href="pub.url">{{ pub.title }}</a></h3>
    <p>{{ pub.authors.join(', ') }}</p>
    <p>In {{ pub.venue }}</p>
    <p v-if="pub.award">{{ pub.award }}</p>
  </div>
</template>
