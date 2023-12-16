import { createApp, createRouter, createModule } from 'nixle';
import { nitroProvider } from '@nixle/nitro';

const usersRouter = createRouter('/users', ({ route }) => [route.get('/', () => 'Hello Nuxt!')]);

const usersModule = createModule({
  routers: [usersRouter],
});

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    modules: [usersModule],
  });
});
