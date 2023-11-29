import fastify from 'fastify';
import { createApp, createModule, createRouter } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const app = fastify();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Fastify!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp({
  provider: fastifyProvider(app),
  modules: [usersModule],
});

server.listen({ port: 4000 });
