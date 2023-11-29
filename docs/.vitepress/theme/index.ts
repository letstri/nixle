import type { Theme } from 'vitepress';
import theme from 'vitepress/theme';
import { inject } from '@vercel/analytics';
import './custom.css';

export default {
  ...theme,
  enhanceApp() {
    inject();
  },
} satisfies Theme;
