import { createApp, createRouter, createModule, nitroProvider } from 'scalex';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
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
