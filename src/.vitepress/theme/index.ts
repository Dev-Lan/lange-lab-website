import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import QuickLinks from './QuickLinks.vue'
import AuthorList from './components/AuthorList.vue'
import AwardBadge from './components/AwardBadge.vue'
import CitationWidget from './components/CitationWidget.vue'
import LinkIcons from './components/LinkIcons.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // Bottom of the content column. See custom.css for how it becomes a rail.
      'doc-after': () => h(QuickLinks)
    }),

  // Registered globally so markdown pages and the generated publication route
  // can use them without importing in each file.
  enhanceApp({ app }) {
    app.component('AuthorList', AuthorList)
    app.component('AwardBadge', AwardBadge)
    app.component('CitationWidget', CitationWidget)
    app.component('LinkIcons', LinkIcons)
  }
} satisfies Theme
