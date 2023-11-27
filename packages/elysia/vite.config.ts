import { viteConfig } from '../../configs/vite.config.base';

export default viteConfig({
  name: 'elysia',
  entry: 'src/index.ts',
  package: await import('./package.json'),
});
