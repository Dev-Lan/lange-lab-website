<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import Copy from '~icons/lucide/copy'
import Download from '~icons/lucide/download'

const props = defineProps<{
  bibtex?: string
  ieee?: string
  /** Used to name the downloaded file. */
  slug?: string
}>()

const FORMATS = [
  { key: 'bibtex', label: 'BibTeX', extension: 'bib' },
  { key: 'ieee', label: 'IEEE style', extension: 'txt' }
] as const

const format = ref<(typeof FORMATS)[number]['key']>('bibtex')
const current = computed(() => FORMATS.find((f) => f.key === format.value)!)
const text = computed(() =>
  format.value === 'bibtex' ? (props.bibtex ?? '') : (props.ieee ?? '')
)

// Hidden rather than disabled when unavailable: a copy button that cannot copy
// is worse than no button. Guarded for SSR, where there is no navigator.
const canCopy = computed(
  () => typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText
)

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  await navigator.clipboard.writeText(text.value)
  copied.value = true
  // Restarts on every click, so repeated copying does not flicker the badge.
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1500)
}

function download() {
  const blob = new Blob([text.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${props.slug ?? 'citation'}.${current.value.extension}`
  anchor.click()
  URL.revokeObjectURL(url)
}

onUnmounted(() => clearTimeout(copiedTimer))
</script>

<template>
  <div v-if="bibtex || ieee" class="CitationWidget">
    <div class="citation-header">
      <div class="citation-formats" role="group" aria-label="Citation format">
        <button
          v-for="option in FORMATS"
          :key="option.key"
          type="button"
          :class="{ active: format === option.key }"
          :aria-pressed="format === option.key"
          @click="format = option.key"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="citation-actions">
        <Transition>
          <span v-if="copied" class="citation-copied">Copied to clipboard</span>
        </Transition>
        <button
          v-if="canCopy"
          type="button"
          :title="`Copy ${current.label} to clipboard`"
          :aria-label="`Copy ${current.label} to clipboard`"
          @click="copy"
        >
          <Copy aria-hidden="true" />
        </button>
        <button
          type="button"
          :title="`Download as .${current.extension}`"
          :aria-label="`Download ${current.label} as .${current.extension}`"
          @click="download"
        >
          <Download aria-hidden="true" />
        </button>
      </div>
    </div>

    <pre>{{ text }}</pre>
  </div>
</template>
