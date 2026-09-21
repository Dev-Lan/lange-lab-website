---
title: "Troubling Collaboration: Matters of Care for Visualization Design Study"
authors:
  - "Derya Akbaba"
  - "Devin Lange"
  - "Michael Correll"
  - "Alexander Lex"
  - "Miriah Meyer"
venue: "SIGCHI Conference on Human Factors in Computing Systems (CHI)"
year: 2023
type: conference  # journal | conference | workshop | preprint
doi: "10.1145/3544548.3581168"
links:
  paper: "https://doi.org/10.1145/3544548.3581168"
  pdf: "https://www.devinlange.com/publication/pdf/2023-troubling.pdf"
  website: "https://vdl.sci.utah.edu/publications/2023_chi_troubling/"
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
