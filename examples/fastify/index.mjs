import fastify from 'fastify';
import { createApp, createRouter, createService } from 'nixle';
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
    usersService,
  },
  routes: ({ route }, { usersService }) => [
    route.get('/', {
      handler: () => usersService.create(),
    }),
  ],
});

const { app } = createApp({
  provider: fastifyProvider(fastify()),
  routers: [usersRouter],
});

app.listen({ port: 4000 });
