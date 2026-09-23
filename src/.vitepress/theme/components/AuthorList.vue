<script setup lang="ts">
interface Author {
  name: string
  href?: string | null
}

defineProps<{ authors?: Author[] }>()
</script>

<template>
  <!-- Authors with a profile on this site link to it; everyone else is plain
       text. The separators sit outside the links so a hovered name underlines
       only itself, not the comma after it. -->
  <p v-if="authors?.length" class="AuthorList">
    <template v-for="(author, index) in authors" :key="author.name">
      <span v-if="index > 0">, </span>
      <a v-if="author.href" :href="author.href">{{ author.name }}</a>
      <span v-else>{{ author.name }}</span>
    </template>
  </p>
</template>
