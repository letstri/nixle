import { Elysia } from 'elysia';
import { createApp, createRouter, createService } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

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
  provider: elysiaProvider(new Elysia()),
  routers: [usersRouter],
});

app.listen(4000);
