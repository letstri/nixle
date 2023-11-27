import { viteConfig } from '../../configs/vite.config.base';

export default viteConfig({
  name: 'nitro',
  entry: 'src/index.ts',
  package: await import('./package.json'),
});
