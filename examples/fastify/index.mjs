import { createApp, createModule, createRouter } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Express!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: fastifyProvider(),
  modules: [usersModule],
});

app.listen({ port: 4000 });
