import { viteConfig } from '../../configs/vite.config.base';

export default viteConfig({
  name: 'nixle',
  entry: 'src/index.ts',
  package: await import('./package.json'),
});
