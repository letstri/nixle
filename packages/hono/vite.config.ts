import { defineConfig } from 'vite';
import { viteConfig } from '../../configs/vite.config.base';

export default defineConfig(
  viteConfig({
    name: 'hono',
    entry: 'src/index.ts',
    package: await import('./package.json'),
  }),
);
