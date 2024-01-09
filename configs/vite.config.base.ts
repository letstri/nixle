import { UserConfig } from 'vite';

export const viteConfig = ({
  name,
  entry,
  package: _package,
}: {
  name: string;
  entry: string;
  package: Record<string, any>;
}): UserConfig => ({
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
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'consola/utils',
        ...Object.keys(_package.dependencies || {}),
        ...Object.keys(_package.devDependencies || {}),
        ...Object.keys(_package.peerDependencies || {}),
        /^node:.*/,
      ],
    },
  },
});
