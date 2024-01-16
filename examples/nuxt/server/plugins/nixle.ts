import { createApp, createRouter, createService } from 'nixle';
import { nitroProvider } from '@nixle/nitro';

const usersService = createService('users', ({ log }) => {
  const create = async () => {
    log.info('Creating user');

    return {};
  };

  return {
    create,
  };
});

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', {
    // queryValidation: (q) => {
    //   return { f: 1 };
    // },
    handler: () => usersService().create(),
  }),
]);

export default defineNitroPlugin((nitroApp) => {
  const { $inferRouters } = createApp({
    provider: nitroProvider(nitroApp),
    routers: [usersRouter],
  });

  type InferRouters = typeof $inferRouters;

  type Users = InferRouters['/users']['/']['GET']['query'];
});
