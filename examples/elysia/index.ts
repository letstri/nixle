import { Elysia } from 'elysia';
import { createApp, createModule, createRouter } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

const usersRouter = createRouter('/users', ({ route }) => [route.get('/', () => 'Hello Elysia!')]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: elysiaProvider(new Elysia()),
  modules: [usersModule],
});

app.listen(4000);
