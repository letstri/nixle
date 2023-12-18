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

const usersRouter = createRouter('/user', {
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

const { app } = createApp({
  provider: elysiaProvider(new Elysia()),
  modules: [usersModule],
});

app.listen(4000);
