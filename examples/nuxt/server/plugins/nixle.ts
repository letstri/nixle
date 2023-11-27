import { createApp, createRouter, createModule } from '../../../../packages/nixle/src';
import { nitroProvider } from '@nixle/nitro';

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
