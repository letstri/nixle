import { defineConfig } from 'vitepress';

const providers = [
  { text: 'Nitro (Nuxt)', link: '/providers/nitro' },
  { text: 'Express', link: '/providers/express' },
  { text: 'Fastify', link: '/providers/fastify' },
  { text: 'Elysia (Bun)', link: '/providers/elysia' },
  { text: 'Custom', link: '/providers/custom' },
];

const overview = [
  { text: 'App', link: '/overview/app' },
  { text: 'Modules', link: '/overview/modules' },
  { text: 'Routers', link: '/overview/routers' },
  { text: 'Services', link: '/overview/services' },
  { text: 'Logger', link: '/overview/logger' },
  { text: 'Errors', link: '/overview/errors' },
  { text: 'Plugins', link: '/overview/plugins' },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nixle',
  description: 'Universal server-side framework',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
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
        link: 'https://github.com/letstri/nixle/tree/main/examples',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Nixle?', link: '/introduction/why' },
          { text: 'Getting Started', link: '/introduction/getting-started' },
          { text: 'Roadmap', link: '/introduction/roadmap' },
        ],
      },
      {
        text: 'Providers',
        items: [{ text: 'What is Provider?', link: '/providers/what' }, ...providers],
      },
      {
        text: 'Overview',
        items: overview,
      },
      {
        text: 'Examples',
        link: 'https://github.com/letstri/nixle/tree/main/examples',
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/letstri/nixle' }],
  },
});
