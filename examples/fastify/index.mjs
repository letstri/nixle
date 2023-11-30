import { createApp, createModule, createRouter, createError, createService } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const usersService = createService(({ log }) => {
  const getUsers = async () => {
    createError('User not found');

    return [
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Jane',
      },
    ];
  };

  return {
    getUsers,
  };
});

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler: usersService.getUsers,
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp({
  // provider: fastifyProvider(),
  modules: [usersModule],
});

server.listen({ port: 4000 });
