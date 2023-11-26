import type { Theme } from 'vitepress';
import theme from 'vitepress/theme';
import { inject } from '@vercel/analytics';

export default {
  ...theme,
  enhanceApp() {
    inject();
  },
} satisfies Theme;
