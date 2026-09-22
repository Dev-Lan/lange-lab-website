---
outline: false
---

<script setup>
import { data as posts } from './blog.data.mts'
</script>

# Blog

<div v-for="post in posts" :key="post.url">
  <h2><a :href="post.url">{{ post.title }}</a></h2>
  <p>{{ post.date }} — {{ post.author }}</p>
  <p>{{ post.description }}</p>
</div>
