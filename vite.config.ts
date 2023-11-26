import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  build: {
    target: 'node18',
    lib: {
      entry: 'src/index.ts',
      name: 'scalex',
      fileName: 'scalex',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    rollupOptions: {
      external: [...Object.keys(pkg.devDependencies), /^node:.*/],
    },
  },
});
