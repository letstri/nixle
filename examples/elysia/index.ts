import { Elysia } from 'elysia';
import { createApp, createModule, createRouter, elysiaProvider } from 'nixle';

const app = new Elysia();

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
const server = createApp(elysiaProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
