import { defineConfig } from 'vite';
import { viteConfig } from '../../configs/vite.config.base';

export default defineConfig(
  viteConfig({
    name: 'ofetch',
    entry: 'src/index.ts',
    package: await import('./package.json'),
  }),
);
