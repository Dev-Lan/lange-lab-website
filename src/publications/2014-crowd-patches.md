---
title: "Optimization-based Computation of Locomotion Trajectories for Crowd Patches"
authors:
  - "Jose Guillermo Rangel Ramirez"
  - "Devin Lange"
  - "Panayiotis Charalambous"
  - "Claudia Esteves"
  - "Julien Pettré"
venue: "Proceedings of the Seventh International Conference on Motion in Games (MIG '14)"
year: 2014
type: conference  # journal | conference | workshop | preprint
links:
  paper: "https://dl.acm.org/citation.cfm?id=2668094"
  pdf: "https://www.devinlange.com/publication/pdf/2014-optimization.pdf"
  video: "https://www.youtube.com/watch?v=Zlqvp6et9cU"
---

# {{ $frontmatter.title }}

{{ $frontmatter.authors.join(', ') }}

In {{ $frontmatter.venue }}, {{ $frontmatter.year }}

<p v-if="$frontmatter.award">{{ $frontmatter.award }}</p>

<ul>
  <li v-for="(href, label) in $frontmatter.links" :key="label">
    <a :href="href">{{ label }}</a>
  </li>
</ul>

## Summary

_Add a plain-language summary of this publication here._
