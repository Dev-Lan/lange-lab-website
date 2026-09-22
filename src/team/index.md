---
outline: false
---

<script setup>
import { data as people } from './team.data.mts'
</script>

# Team

<div v-for="person in people" :key="person.url">
  <img v-if="person.photo" :src="person.photo" :alt="person.name" width="120" height="120" />
  <h2><a :href="person.url">{{ person.name }}</a></h2>
  <p>{{ person.role }}</p>
</div>

## You could be here

We are looking for students and postdocs interested in visualization for
biomedical data. If that sounds like you, get in touch.

Lab members maintain their own profile page: copy `src/team/TEMPLATE.md` in the
site repository, rename it, and edit it. `src/team/README.md` in the same folder
walks through the whole process. The listing above updates itself.
