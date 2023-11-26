import { createApp, createRouter, createModule, nitroProvider } from '../../../../dist/scalex.cjs';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'GET',
    handler() {
      return 'Hello Nuxt!';
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
