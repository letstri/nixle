import { createApp, createRouter, createModule, nitroProvider } from '../../../../dist/scalex.cjs';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'get',
    handler() {
      return 'hello nuxt';
    },
  },
]);

const usersModule = createModule({
  routers: [usersRouter],
});

export default defineNitroPlugin((nitroApp) => {
  createApp(nitroProvider(nitroApp), {
    modules: [usersModule],
  });
});
