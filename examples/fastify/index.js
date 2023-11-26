const fastify = require('fastify');
const { createApp, createModule, createRouter, fastifyProvider } = require('../../');

const app = fastify();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'GET',
    handler() {
      return 'Hello Fastify!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp(fastifyProvider(app), {
  modules: [usersModule],
});

server.listen({ port: 4000 });
