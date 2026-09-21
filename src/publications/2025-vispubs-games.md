---
title: "VisPubs Games: Joyful Discovery of Visualization Research(ers)"
authors:
  - "Devin Lange"
  - "Zach Cutler"
  - "Maxim Lisnic"
venue: "alt.VIS, a workshop co-located with IEEE VIS"
year: 2025
type: workshop  # journal | conference | workshop | preprint
doi: "10.48550/arXiv.2509.16427"
links:
  paper: "https://doi.org/10.48550/arXiv.2509.16427"
  pdf: "https://arxiv.org/pdf/2509.16427"
  website: "https://games.vispubs.com"
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
