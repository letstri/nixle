import { Elysia } from 'elysia';
import { createApp, createModule, createRouter, createService } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

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

const usersModule = createModule({
  routers: [usersRouter],
});

const { app } = createApp({
  provider: elysiaProvider(new Elysia()),
  modules: [usersModule],
});

app.listen(4000);
