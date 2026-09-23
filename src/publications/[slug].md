---
outline: false
---

<!--
  One template for every publication page. The data comes from the matching
  entry in publications.bib by way of [slug].paths.mts, so there is no markdown
  file per paper — see README.md.

  Keep HTML here flat and unindented: four spaces or a blank line inside an
  HTML block turns the rest of it into a markdown code block.
-->
<img v-if="$params.image" class="publication-teaser" :src="$params.image" :alt="`Teaser image for ${$params.title}`" />

# {{ $params.title }}

<AuthorList :authors="$params.authors" />
<p class="publication-venue"><strong>{{ $params.venue }}</strong>, {{ $params.year }}</p>
<AwardBadge :award="$params.award" />
<LinkIcons :links="$params.links" :context="$params.slug" />

## Abstract

<p v-if="$params.abstract">{{ $params.abstract }}</p>
<p v-else><em>No abstract is available for this entry.</em></p>

## Citation

<CitationWidget :bibtex="$params.bibtex" :ieee="$params.ieee" :slug="$params.slug" />
<dl class="publication-meta">
<dt>Venue</dt>
<dd>{{ $params.venue }}</dd>
<dt>Year</dt>
<dd>{{ $params.year }}</dd>
<dt>Type</dt>
<dd>{{ $params.kind }}</dd>
<template v-if="$params.doi">
<dt>DOI</dt>
<dd><a :href="`https://doi.org/${$params.doi}`">{{ $params.doi }}</a></dd>
</template>
</dl>
