import { defineConfig } from 'vitepress';

const providers = [
  { text: 'Nuxt', link: '/providers/nuxt' },
  { text: 'Express', link: '/providers/express' },
  { text: 'Fastify', link: '/providers/fastify' },
  { text: 'Elysia (Bun)', link: '/providers/elysia' },
  { text: 'Custom', link: '/providers/custom' },
];

const overview = [
  { text: 'Modules', link: '/overview/modules' },
  { text: 'Routers', link: '/overview/routers' },
  { text: 'Services', link: '/overview/services' },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ScaleX',
  description: 'Universal server-side architectural framework',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction/getting-started' },
      {
        text: 'Providers',
        items: providers,
      },
      {
        text: 'Overview',
        items: overview,
      },
      {
        text: 'Examples',
        link: 'https://github.com/letstri/scalex/tree/main/examples',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why ScaleX?', link: '/introduction/why' },
          { text: 'Getting Started', link: '/introduction/getting-started' },
        ],
      },
      {
        text: 'Providers',
        items: [{ text: 'What is Provider?', link: '/providers/index' }, ...providers],
      },
      {
        text: 'Overview',
        items: overview,
      },
      {
        text: 'Examples',
        link: 'https://github.com/letstri/scalex/tree/main/examples',
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/letstri/scalex' }],
  },
});
