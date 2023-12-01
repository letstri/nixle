import { createApp, createModule, createRouter } from 'nixle';
import { expressProvider } from '@nixle/express';

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
  provider: expressProvider(),
  modules: [usersModule],
});

app.listen(4000);
