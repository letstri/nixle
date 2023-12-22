import { createApp, createRouter, createService } from 'nixle';
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
    usersService,
  },
  routes: ({ route }, { usersService }) => [
    route.get('/', {
      handler: () => usersService.create(),
    }),
  ],
});

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    routers: [usersRouter],
  });
});
