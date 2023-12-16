import fastify from 'fastify';
import { createApp, createModule, createRouter } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const usersRouter = createRouter('/users', ({ route }) => [route.get('/', () => 'Hello Fastify!')]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: fastifyProvider(fastify()),
  modules: [usersModule],
});

app.listen({ port: 4000 });
