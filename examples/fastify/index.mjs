import fastify from 'fastify';
import { createApp, createModule, createRouter, createService } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

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

const { app } = createApp({
  provider: fastifyProvider(fastify()),
  modules: [usersModule],
});

app.listen({ port: 4000 });
