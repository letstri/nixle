import type { Theme } from 'vitepress';
import theme from 'vitepress/theme';
import { inject } from '@vercel/analytics';
import './custom.scss';
import Layout from './Layout.vue';

export default {
  ...theme,
  enhanceApp() {
    inject();
  },
  Layout,
} satisfies Theme;
