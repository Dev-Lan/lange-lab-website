---
title: "DQVis Dataset: Natural Language to Biomedical Visualization"
authors:
  - "Devin Lange"
  - "Pengwei Sui"
  - "Shanghua Gao"
  - "Marinka Zitnik"
  - "Nils Gehlenborg"
venue: "39th Conference on Neural Information Processing Systems (NeurIPS 2025) Track on Datasets and Benchmarks"
year: 2025
type: conference  # journal | conference | workshop | preprint
links:
  paper: "https://openreview.net/forum?id=4b20780b4cc521df9459f434e1f957a52bf6416d"
  pdf: "https://openreview.net/pdf/4b20780b4cc521df9459f434e1f957a52bf6416d.pdf"
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
