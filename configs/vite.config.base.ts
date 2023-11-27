import { defineConfig } from 'vite';

export const viteConfig = ({
  name,
  entry,
  package: _package,
}: {
  name: string;
  entry: string;
  package: Record<string, any>;
}) =>
  defineConfig({
    resolve: {
      alias: {
        '~': '/src',
      },
    },
    build: {
      target: 'node18',
      lib: {
        entry,
        name,
        fileName: name,
        formats: ['es', 'cjs', 'umd', 'iife'],
      },
      rollupOptions: {
        external: [
          ...Object.keys(_package.devDependencies || {}),
          ...Object.keys(_package.peerDependencies || {}),
          /^node:.*/,
        ],
      },
    },
  });
