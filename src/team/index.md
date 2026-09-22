---
outline: false
---

<script setup>
import { data as groups } from './team.data.mts'
</script>

# Team

<template v-for="group in groups" :key="group.key">
  <h2>{{ group.label }}</h2>
  <div class="team-grid">
    <a v-for="person in group.people" :key="person.url" class="team-card" :href="person.url">
      <span class="team-card-photo">
        <img v-if="person.photo" :src="person.photo" :alt="person.name" loading="lazy" />
      </span>
      <span class="team-card-name">{{ person.name }}</span>
      <span v-if="person.position" class="team-card-position">{{ person.position }}</span>
    </a>
  </div>
</template>
