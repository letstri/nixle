import { createApp, createModule, createRouter } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Elysia!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: elysiaProvider(),
  modules: [usersModule],
});

app.listen(4000);
