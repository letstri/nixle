import { createApp, createRouter, createModule, createService } from 'nixle';
import { nitroProvider } from '@nixle/nitro';

const usersService = createService(({ log }) => {
  const create = async () => {
    log.info('Creating user');

    return {};
  };

  return {
    create,
  };
});

const usersRouter = createRouter('/users', {
  services: {
    users: usersService,
  },
  routes: ({ route }, { users }) => [
    route.get('/', {
      handler: () => users.create(),
    }),
  ],
});

const usersModule = createModule({
  routers: [usersRouter],
});

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    modules: [usersModule],
  });
});
