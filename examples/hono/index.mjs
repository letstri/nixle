import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createApp, createModule, createRouter, createService } from 'nixle';
import { honoProvider } from '@nixle/hono';

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
  provider: honoProvider(new Hono()),
  modules: [usersModule],
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
