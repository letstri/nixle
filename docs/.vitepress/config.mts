import { defineConfig } from 'vitepress';

const providers = [
  { text: 'What is Provider?', link: '/providers/what' },
  { text: 'Nitro (Nuxt)', link: '/providers/nitro' },
  { text: 'Express', link: '/providers/express' },
  { text: 'Fastify', link: '/providers/fastify' },
  { text: 'Elysia (Bun)', link: '/providers/elysia' },
  { text: 'Hono', link: '/providers/hono' },
  { text: 'Custom', link: '/providers/custom' },
];

const overview = [
  { text: 'App', link: '/overview/app' },
  { text: 'Routers', link: '/overview/routers' },
  { text: 'Services', link: '/overview/services' },
  { text: 'Logger', link: '/overview/logger' },
  { text: 'Errors', link: '/overview/errors' },
  { text: 'Environment Variables', link: '/overview/env' },
];

const plugins = [
  { text: 'Create Plugin', link: '/plugins/custom' },
  { text: 'Zod', link: '/plugins/zod' },
  { text: 'ofetch', link: '/plugins/ofetch' },
  { text: 'CORS', link: '/plugins/cors' },
  { text: 'Swagger', link: '/plugins/swagger' },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nixle',
  description: 'Universal server-side framework. Backend for everyone and everywhere.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    search: {
      provider: 'algolia',
      options: {
        appId: 'DROL3EC08C',
        apiKey: '976689f629ffbbec502d2ad03c7f76a6',
        indexName: 'nixle',
      },
    },
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
        text: 'Plugins',
        items: plugins,
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
        items: providers,
      },
      {
        text: 'Overview',
        items: overview,
      },
      {
        text: 'Plugins',
        items: plugins,
      },
      {
        text: 'Examples',
        link: 'https://github.com/letstri/nixle/tree/main/examples',
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/letstri/nixle',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/nixlejs',
      },
    ],
  },
});
