---
title: "Trajectory Mapper: Interactive Widgets and Artist-Designed Encodings for Visualizing Multivariate Trajectory Data"
authors:
  - "Devin Lange"
  - "Francesca Samsel"
  - "Ioannis Karamouzas"
  - "S. J. Guy"
  - "Rodney Dockter"
  - "Timothy Kowalewski"
  - "Daniel F. Keefe"
venue: "EuroVis 2017 – Short Papers"
year: 2017
type: conference  # journal | conference | workshop | preprint
links:
  paper: "https://diglib.eg.org/handle/10.2312/eurovisshort20171141"
  pdf: "https://www.devinlange.com/publication/pdf/2017-trajectory.pdf"
  video: "https://www.youtube.com/watch?v=IlOVqapORuk"
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
