const fastify = require('fastify');
const { createApp, createModule, createRouter } = require('nixle');
const { fastifyProvider } = require('@nixle/fastify');

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
const server = createApp(fastifyProvider(app), {
  modules: [usersModule],
});

server.listen({ port: 4000 });
