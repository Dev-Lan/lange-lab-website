---
title: "Full Title of the Paper, Exactly as Published"
authors:
  - "First Author"
  - "Second Author"
venue: "Name of the Journal, Conference, or Workshop"
year: 2026
type: journal  # journal | conference | workshop | preprint
# Optional. The bare DOI, with no https://doi.org/ prefix.
doi: "10.1000/example"
# Optional. Omit this line entirely if the paper did not win anything.
award: "Best Paper Award"
# Every link below is optional — delete the ones that do not apply.
links:
  paper: "https://doi.org/10.1000/example"
  pdf: "https://example.com/paper.pdf"
  video: "https://www.youtube.com/watch?v=EXAMPLE"
  website: "https://example.com/project/"
---

# {{ $frontmatter.title }}

{{ $frontmatter.authors.join(', ') }}

In {{ $frontmatter.venue }}, {{ $frontmatter.year }}

<p v-if="$frontmatter.award">{{ $frontmatter.award }}</p>

## Summary

_Add a plain-language summary of this publication here._
