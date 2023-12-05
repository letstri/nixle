import { createApp as createExpress } from 'express';
import { createApp, createModule, createRouter } from 'nixle';
import { expressProvider } from '@nixle/express';

const usersRouter = createRouter('/users', () => [
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
  provider: expressProvider(createExpress()),
  modules: [usersModule],
});

app.listen(4000);
