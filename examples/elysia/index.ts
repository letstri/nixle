import { Elysia } from 'elysia';
import { createApp, createError, createModule, createRouter, route } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';
import * as zod from 'zod';

const validateQuery = (query: any) =>
  zod
    .object({
      name: zod.string().min(1, { message: 'Name must be at least 1 character long' }),
    })
    .parseAsync(query);

const usersRouter = createRouter('/users', ({ log }) => [
  route.get('/', {
    queryValidation: validateQuery,
    handler: () => {
      return 'Hello Elysia!';
    },
  }),
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: elysiaProvider(new Elysia()),
  modules: [usersModule],
});

app.listen(4000);
