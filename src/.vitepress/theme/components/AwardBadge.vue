<script setup lang="ts">
import Award from '~icons/lucide/award'

defineProps<{ award?: string | null }>()
</script>

<template>
  <p v-if="award" class="AwardBadge">
    <span>
      <Award aria-hidden="true" />
      {{ award }}
    </span>
  </p>
</template>
