import { Elysia } from 'elysia';
import { createApp, createModule, createRouter, elysiaProvider } from '../../';

const app = new Elysia();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'get',
    handler() {
      return 'hello elysia';
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

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
