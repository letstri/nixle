import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createApp, createRouter, createService } from 'nixle';
import { honoProvider } from '@nixle/hono';

const usersService = createService('users', ({ log }) => {
  const create = async () => {
    log.info('Creating user');

    return {};
  };

  return {
    create,
  };
});

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => usersService().create()),
]);

const { app } = createApp({
  provider: honoProvider(new Hono()),
  routers: [usersRouter],
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
