---
title: "Ferret: Reviewing Tabular Datasets for Manipulation"
authors:
  - "Devin Lange"
  - "Shaurya Sahai"
  - "Jeff M. Phillips"
  - "Alexander Lex"
venue: "Computer Graphics Forum (EuroVis)"
year: 2023
type: journal  # journal | conference | workshop | preprint
doi: "10.1111/cgf.14822"
links:
  paper: "https://doi.org/10.1111/cgf.14822"
  pdf: "https://www.devinlange.com/publication/pdf/2023-ferret.pdf"
  video: "https://www.youtube.com/watch?v=NcKqIBiipvA"
  website: "https://ferret.sci.utah.edu/"
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
