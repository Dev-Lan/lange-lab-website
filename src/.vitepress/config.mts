import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vizoic Lab',
  description: 'A research lab studying data visualization.',

  // Served from a custom domain (see src/public/CNAME), so the site lives at the
  // domain root. If this ever moves to a project page, change this to '/<repo>/'.
  base: '/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Team', link: '/team/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Blog', link: '/blog/' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Dev-Lan' }]
  }
})
