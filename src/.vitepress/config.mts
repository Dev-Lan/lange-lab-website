import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  title: 'Vizoic Lab',
  description: 'A research lab studying data visualization.',

  // Served from a custom domain (see src/public/CNAME), so the site lives at the
  // domain root. If this ever moves to a project page, change this to '/<repo>/'.
  base: '/',
  cleanUrls: true,

  // Repo docs and copy-me templates live beside the content they describe, but
  // they are not pages. Keep this in sync with isContentPage() in lib/content.mts.
  srcExclude: ['**/README.md', '**/TEMPLATE.md'],

  // Light theme only: this also removes the appearance toggle from the nav bar.
  appearance: false,

  vite: {
    // Icons are imported as components (`~icons/lucide/mail`) and bundled at
    // build time, so nothing is fetched at runtime. Sets: lucide for generic
    // glyphs, simple-icons for brand marks.
    plugins: [Icons({ compiler: 'vue3' })]
  },

  markdown: {
    // Anchor every heading except the page title, so the clickable "#" links
    // line up exactly with the range the outline lists (see themeConfig.outline).
    anchor: { level: 2 }
  },

  themeConfig: {
    // Put the outline in the left gutter. The quick-links panel takes the right
    // one (see theme/custom.css); the theme itself only manages this one.
    aside: 'left',

    // h2 through h6 — the same headings that get a clickable "#" anchor.
    outline: 'deep',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Team', link: '/team/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Blog', link: '/blog/' }
    ]
  }
})
