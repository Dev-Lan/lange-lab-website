import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import QuickLinks from './QuickLinks.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // Bottom of the content column. See custom.css for how it becomes a rail.
      'doc-after': () => h(QuickLinks)
    })
} satisfies Theme
