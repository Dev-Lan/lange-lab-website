---
title: "A BRN2:MYC Transcriptional Axis Regulates Interconversion Between Therapy-Resistant and Tumorigenic Phenotypes in Melanoma"
authors:
  - "Yuntian Zhang"
  - "Marcus A. Urquijo"
  - "Rebecca G. Zitnay"
  - "Kayla Marks"
  - "Rachel L. Belote"
  - "Maike M.K. Hansen"
  - "Montana Ferita"
  - "Hannah Neuendorf"
  - "Tong Liu"
  - "Eric A. Smith"
  - "Elnaz Mirzaei Mehrabad"
  - "Miroslav Hejna"
  - "Tarek E. Moustafa"
  - "Devin Lange"
  - "Min Hu"
  - "Fatemeh Vand-Rajabpour"
  - "Anne Done"
  - "Carly A. Becker"
  - "Matthew Lieberman"
  - "Matthew Chang"
  - "Brian K. Lohman"
  - "Chris J. Stubben"
  - "Melissa Q. Reeves"
  - "Xiaoyang Zhang"
  - "Leor S. Weinberger"
  - "Matthew W. VanBrocklin"
  - "Dekker C. Deacon"
  - "Douglas Grossman"
  - "Benjamin T. Spike"
  - "Alexander Lex"
  - "Glen M. Boyle"
  - "Rajan Kulkarni"
  - "Thomas A. Zangle"
  - "Robert L. Judson-Torres"
venue: "Cell Reports"
year: 2025
type: journal  # journal | conference | workshop | preprint
doi: "10.1016/j.celrep.2025.116675"
links:
  paper: "https://doi.org/10.1016/j.celrep.2025.116675"
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
